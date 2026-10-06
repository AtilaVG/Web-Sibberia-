/* SIBBERIA — hero3d.js (fuente)
   "Mercado de talento" en WebGL: miles de perfiles que, al hacer scroll,
   se filtran hasta dejar una shortlist conectada y, al final, una sola
   persona encendida. Se compila con `npm run build` a assets/js/hero3d.js.

   API (window.SibHero3D):
     const hero = SibHero3D.create(canvas, { count, offsetX })
     hero.setProgress(0..1)   fase de la historia (scroll)
     hero.setIntro(0..1)      aparición inicial
     hero.setPointer(x, y)    inclinación con el ratón (-1..1)
     hero.render(timeSec)     dibuja un frame
     hero.resize()            recalcula tamaño
     hero.dispose()
*/
import {
  WebGLRenderer, Scene, PerspectiveCamera, Group,
  BufferGeometry, Float32BufferAttribute, Points, LineSegments,
  ShaderMaterial, AdditiveBlending, NormalBlending, Color
} from "three";

const SHORTLIST = 36;

/* Desplazamiento compartido por puntos y líneas: así las conexiones
   siempre siguen a los perfiles que unen. */
const MOTION = /* glsl */ `
  uniform float uTime;
  uniform float uProgress;
  uniform float uIntro;
  attribute vec3 aBase;
  attribute float aSeed;
  attribute float aRole; // 0 mercado, 1 shortlist, 2 elegido
  attribute vec3 aShell; // posición final de la shortlist: esfera alrededor del elegido

  float band(float a, float b, float x){ return smoothstep(a, b, x); }

  vec3 motion(out float filtered, out float chosen){
    float sift = band(0.28, 0.62, uProgress);
    float focus  = band(0.66, 0.96, uProgress);
    filtered = sift;
    chosen = focus;

    vec3 p = aBase * mix(0.15, 1.0, uIntro);

    // deriva lenta, distinta para cada perfil
    float t = uTime * 0.25 + aSeed * 6.2831;
    p += vec3(sin(t), cos(t * 0.8), sin(t * 0.6)) * 0.06;

    if (aRole < 0.5) {
      // el mercado se abre y se aleja
      p *= 1.0 + sift * 0.55;
      p.z -= sift * 1.6;
    } else if (aRole < 1.5) {
      // la shortlist se agrupa y luego rodea al elegido
      p = mix(p, p * 0.6, sift);
      p = mix(p, aShell, focus);
    } else {
      p = mix(p, vec3(0.0), max(sift, focus));
    }
    return p;
  }
`;

const POINTS_VS = /* glsl */ `
  ${MOTION}
  uniform float uPixel;
  varying float vAlpha;
  varying float vRole;
  varying float vChosen;
  void main(){
    float filtered, chosen;
    vec3 p = motion(filtered, chosen);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;

    float size = 3.0 + fract(aSeed * 13.7) * 2.6;
    float alpha = 0.8;
    if (aRole < 0.5) {
      alpha = mix(0.8, 0.14, filtered);
    } else if (aRole < 1.5) {
      size = mix(size, 6.5, filtered);
      alpha = mix(0.8, 1.0, filtered);
    } else {
      size = mix(size, 8.0, filtered) + chosen * 46.0;
      alpha = 1.0;
    }
    vAlpha = alpha * uIntro;
    vRole = aRole;
    vChosen = chosen;
    gl_PointSize = size * uPixel * (7.0 / -mv.z);
  }
`;

const POINTS_FS = /* glsl */ `
  uniform vec3 uCrowd;
  uniform vec3 uShort;
  uniform vec3 uChosen;
  uniform float uProgress;
  varying float vAlpha;
  varying float vRole;
  varying float vChosen;
  void main(){
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float core = smoothstep(0.5, 0.18, d);
    float halo = smoothstep(0.5, 0.0, d) * 0.35;
    // el elegido: núcleo nítido y un halo amplio y suave
    if (vRole > 1.5) {
      float k = vChosen;
      core = mix(core, smoothstep(0.2, 0.12, d), k);
      halo = mix(halo, pow(smoothstep(0.5, 0.0, d), 1.5) * 1.1, k);
    }

    float sift = smoothstep(0.28, 0.62, uProgress);
    vec3 col = uCrowd;
    if (vRole > 0.5) col = mix(uCrowd, uShort, sift);
    if (vRole > 1.5) col = mix(col, uChosen, vChosen);

    float a = (core + halo * step(0.5, vRole)) * vAlpha;
    gl_FragColor = vec4(col, a);
  }
`;

const LINES_VS = /* glsl */ `
  ${MOTION}
  attribute float aKind; // 0 shortlist-shortlist, 1 shortlist-elegido
  varying float vKind;
  void main(){
    float filtered, chosen;
    vec3 p = motion(filtered, chosen);
    vKind = aKind;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const LINES_FS = /* glsl */ `
  uniform vec3 uShort;
  uniform vec3 uChosen;
  uniform float uProgress;
  uniform float uIntro;
  varying float vKind;
  void main(){
    float mesh  = smoothstep(0.40, 0.62, uProgress) * (1.0 - smoothstep(0.70, 0.90, uProgress));
    float spoke = smoothstep(0.70, 0.95, uProgress);
    float a = vKind < 0.5 ? mesh * 0.3 : spoke * 0.45;
    vec3 col = vKind < 0.5 ? uShort : uChosen;
    gl_FragColor = vec4(col, a * uIntro);
  }
`;

/* PRNG determinista: la constelación es la misma en cada visita */
function rng(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildPoints(count, rand) {
  const base = new Float32Array(count * 3);
  const seed = new Float32Array(count);
  const role = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    // disco grueso y algo achatado: un "mercado" visto en perspectiva
    const r = Math.pow(rand(), 0.62) * 4.6;
    const a = rand() * Math.PI * 2;
    const y = (rand() - 0.5) * 2.4 * (1 - r / 7);
    base[i * 3] = Math.cos(a) * r;
    base[i * 3 + 1] = y;
    base[i * 3 + 2] = Math.sin(a) * r * 0.75;
    seed[i] = rand();
    role[i] = i === 0 ? 2 : i <= SHORTLIST ? 1 : 0;
  }
  // el elegido y la shortlist nacen cerca del centro
  for (let i = 0; i <= SHORTLIST; i++) {
    base[i * 3] *= 0.5; base[i * 3 + 1] *= 0.6; base[i * 3 + 2] *= 0.5;
  }
  // shortlist: puntos repartidos en una esfera (Fibonacci) alrededor del elegido
  const shell = new Float32Array(count * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 1; i <= SHORTLIST; i++) {
    const k = (i - 0.5) / SHORTLIST;
    const y = 1 - 2 * k;
    const rr = Math.sqrt(1 - y * y);
    const th = golden * i;
    const R = 1.35 + (rand() - 0.5) * 0.35;
    shell[i * 3] = Math.cos(th) * rr * R;
    shell[i * 3 + 1] = y * R * 0.85;
    shell[i * 3 + 2] = Math.sin(th) * rr * R;
  }
  return { base, seed, role, shell };
}

function buildLines(pts, rand) {
  const pairs = [];
  // red entre candidatos de la shortlist
  for (let i = 1; i <= SHORTLIST; i++) {
    for (let k = 0; k < 2; k++) {
      const j = 1 + Math.floor(rand() * SHORTLIST);
      if (j !== i) pairs.push([i, j, 0]);
    }
  }
  // todos convergen en el elegido
  for (let i = 1; i <= SHORTLIST; i++) pairs.push([i, 0, 1]);

  const n = pairs.length * 2;
  const base = new Float32Array(n * 3);
  const seed = new Float32Array(n);
  const role = new Float32Array(n);
  const kind = new Float32Array(n);
  const shell = new Float32Array(n * 3);
  pairs.forEach(([a, b, k], idx) => {
    [a, b].forEach((src, e) => {
      const v = idx * 2 + e;
      base.set(pts.base.subarray(src * 3, src * 3 + 3), v * 3);
      shell.set(pts.shell.subarray(src * 3, src * 3 + 3), v * 3);
      seed[v] = pts.seed[src];
      role[v] = pts.role[src];
      kind[v] = k;
    });
  });
  return { base, seed, role, kind, shell, n };
}

function geometry(data, n) {
  const g = new BufferGeometry();
  // "position" es obligatorio para three; el vertex shader usa aBase
  g.setAttribute("position", new Float32BufferAttribute(data.base, 3));
  g.setAttribute("aBase", new Float32BufferAttribute(data.base, 3));
  g.setAttribute("aSeed", new Float32BufferAttribute(data.seed, 1));
  g.setAttribute("aRole", new Float32BufferAttribute(data.role, 1));
  g.setAttribute("aShell", new Float32BufferAttribute(data.shell, 3));
  if (data.kind) g.setAttribute("aKind", new Float32BufferAttribute(data.kind, 1));
  g.setDrawRange(0, n);
  return g;
}

export function create(canvas, opts = {}) {
  const count = opts.count || 2400;
  const rand = rng(20111);

  const renderer = new WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: "high-performance" });
  renderer.setClearColor(0x000000, 0);
  const pixel = Math.min(window.devicePixelRatio || 1, 2);
  renderer.setPixelRatio(pixel);

  const scene = new Scene();
  const camera = new PerspectiveCamera(42, 1, 0.1, 60);
  const field = new Group();
  scene.add(field);

  const uniforms = {
    uTime: { value: 0 },
    uProgress: { value: 0 },
    uIntro: { value: 0 },
    uPixel: { value: pixel },
    uCrowd: { value: new Color("#d5deea") },
    uShort: { value: new Color("#f5a623") },
    uChosen: { value: new Color("#f0741e") }
  };

  const pts = buildPoints(count, rand);
  const lines = buildLines(pts, rand);

  const pointsMat = new ShaderMaterial({
    uniforms, vertexShader: POINTS_VS, fragmentShader: POINTS_FS,
    transparent: true, depthWrite: false, blending: AdditiveBlending
  });
  const linesMat = new ShaderMaterial({
    uniforms, vertexShader: LINES_VS, fragmentShader: LINES_FS,
    transparent: true, depthWrite: false, blending: NormalBlending
  });

  const pointsObj = new Points(geometry(pts, count), pointsMat);
  const linesObj = new LineSegments(geometry(lines, lines.n), linesMat);
  pointsObj.frustumCulled = false;
  linesObj.frustumCulled = false;
  field.add(linesObj, pointsObj);

  let offsetX = opts.offsetX || 0;
  const pointer = { x: 0, y: 0 };

  function resize() {
    const w = canvas.clientWidth || 1;
    const h = canvas.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  function render(t) {
    const p = uniforms.uProgress.value;
    uniforms.uTime.value = t;

    // la cámara entra en el mercado; solo se centra en el elegido
    // cuando el texto del hero ya ha desaparecido
    const dolly = 1 - Math.pow(1 - p, 2);
    const c = Math.min(Math.max((p - 0.55) / 0.35, 0), 1);
    const center = offsetX * (1 - c * c * (3 - 2 * c));
    camera.position.set(-center + pointer.x * 0.35, 1.8 - dolly * 1.5 + pointer.y * 0.25, 10.5 - dolly * 4.6);
    camera.lookAt(-center, 0, 0);

    field.rotation.y = t * 0.035 + p * 1.4 + pointer.x * 0.12;
    field.rotation.x = 0.12 + pointer.y * 0.06;
    renderer.render(scene, camera);
  }

  resize();

  return {
    setProgress(v) { uniforms.uProgress.value = v; },
    setIntro(v) { uniforms.uIntro.value = v; },
    setPointer(x, y) { pointer.x = x; pointer.y = y; },
    setOffset(x) { offsetX = x; },
    resize,
    render,
    dispose() {
      pointsObj.geometry.dispose(); linesObj.geometry.dispose();
      pointsMat.dispose(); linesMat.dispose(); renderer.dispose();
    }
  };
}
