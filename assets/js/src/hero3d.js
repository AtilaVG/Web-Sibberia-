/* SIBBERIA — hero3d.js (fuente)
   "Diamante en bruto": un cristal facetado que refracta la luz gira entre
   el mercado de talento. Al hacer scroll la cámara lo atraviesa y, dentro,
   la shortlist se conecta hasta dejar a una sola persona encendida.
   Se compila con `npm run build` a assets/js/hero3d.js.

   API (window.SibHero3D):
     const hero = SibHero3D.create(canvas, { count, offsetX, bloom })
     hero.setProgress(0..1)   fase de la historia (scroll)
     hero.setIntro(0..1)      aparición inicial
     hero.setPointer(x, y)    inclinación con el ratón (-1..1)
     hero.render(timeSec)     dibuja un frame
     hero.resize()            recalcula tamaño
     hero.dispose()
*/
import {
  WebGLRenderer, Scene, PerspectiveCamera, Group, Mesh,
  BufferGeometry, Float32BufferAttribute, Points, LineSegments,
  IcosahedronGeometry, SphereGeometry,
  ShaderMaterial, MeshPhysicalMaterial, MeshBasicMaterial,
  AdditiveBlending, NormalBlending, BackSide, DoubleSide, Color, Vector2,
  PMREMGenerator, ACESFilmicToneMapping, SRGBColorSpace
} from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";

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
  uniform float uInside;
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
    if (aRole > 0.5) alpha *= uInside;
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
  uniform float uInside;
  varying float vKind;
  void main(){
    float mesh  = smoothstep(0.40, 0.62, uProgress) * (1.0 - smoothstep(0.70, 0.90, uProgress));
    float spoke = smoothstep(0.70, 0.95, uProgress);
    float a = vKind < 0.5 ? mesh * 0.3 : spoke * 0.45;
    vec3 col = vKind < 0.5 ? uShort : uChosen;
    gl_FragColor = vec4(col, a * uIntro * uInside);
  }
`;

const SKY_VS = /* glsl */ `
  varying vec3 vDir;
  void main(){
    vDir = normalize(position);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const SKY_FS = /* glsl */ `
  uniform vec3 uTop;
  uniform vec3 uBottom;
  uniform vec3 uWarm;
  varying vec3 vDir;
  void main(){
    float h = vDir.y * 0.5 + 0.5;
    vec3 col = mix(uBottom, uTop, smoothstep(0.1, 0.9, h));
    // resplandor cálido detrás del cristal
    float glow = pow(max(dot(vDir, normalize(vec3(0.15, 0.05, -1.0))), 0.0), 28.0);
    col += uWarm * glow * 0.12;
    gl_FragColor = vec4(col, 1.0);
  }
`;

/* Diamante en talla brillante (corona, rondís y pabellón), con las
   facetas ligeramente irregulares de una piedra en bruto */
function diamond(rand) {
  const SEG = 16; // facetas alrededor del rondís
  const ring = (n, r, y, twist, jitter) => {
    const out = [];
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + twist;
      const k = 1 + (rand() - 0.5) * jitter;
      out.push([Math.cos(a) * r * k, y + (rand() - 0.5) * jitter * 0.3, Math.sin(a) * r * k]);
    }
    return out;
  };
  const table = ring(SEG / 2, 0.9, 0.78, Math.PI / SEG * 2, 0.06);
  const crown = ring(SEG, 1.32, 0.42, Math.PI / SEG, 0.05);
  const girdle = ring(SEG, 1.5, 0.12, 0, 0.03);
  const pav = ring(SEG / 2, 0.75, -0.9, Math.PI / SEG * 2, 0.08);
  const top = [0, 0.8, 0], culet = [0, -1.95, 0];

  const v = [];
  const tri = (a, b, c) => v.push(...a, ...b, ...c);
  for (let i = 0; i < SEG / 2; i++) {
    const j = (i + 1) % (SEG / 2);
    tri(top, table[j], table[i]);                       // mesa
    const c0 = crown[2 * i], c1 = crown[2 * i + 1], c2 = crown[(2 * i + 2) % SEG];
    tri(table[i], table[j], c1);                        // estrellas
    tri(table[i], c1, c0);
    tri(table[j], c2, c1);
    const p0 = pav[i], p1 = pav[j];
    tri(culet, p0, p1);                                 // punta
    tri(p0, girdle[2 * i + 1], p1);
    tri(p0, girdle[2 * i], girdle[2 * i + 1]);
    tri(p1, girdle[2 * i + 1], girdle[(2 * i + 2) % SEG]);
  }
  for (let i = 0; i < SEG; i++) {                       // corona → rondís
    const j = (i + 1) % SEG;
    tri(crown[i], crown[j], girdle[j]);
    tri(crown[i], girdle[j], girdle[i]);
  }
  const g = new BufferGeometry();
  g.setAttribute("position", new Float32BufferAttribute(v, 3));
  g.computeVertexNormals();
  return g;
}

const smooth = (a, b, x) => {
  const t = Math.min(Math.max((x - a) / (b - a), 0), 1);
  return t * t * (3 - 2 * t);
};

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

  const renderer = new WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
  const pixel = Math.min(window.devicePixelRatio || 1, opts.maxPixelRatio || 2);
  renderer.setPixelRatio(pixel);
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.outputColorSpace = SRGBColorSpace;

  const scene = new Scene();
  const camera = new PerspectiveCamera(40, 1, 0.05, 80);

  // Reflejos de estudio sin descargar ningún HDR
  const pmrem = new PMREMGenerator(renderer);
  const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envTex;
  scene.environmentIntensity = 0.8;
  pmrem.dispose();

  const sky = new Mesh(
    new SphereGeometry(40, 32, 16),
    new ShaderMaterial({
      vertexShader: SKY_VS, fragmentShader: SKY_FS, side: BackSide, depthWrite: false,
      uniforms: {
        uTop: { value: new Color("#1b2c47") },
        uBottom: { value: new Color("#0b1322") },
        uWarm: { value: new Color("#f0741e") }
      }
    })
  );
  scene.add(sky);

  const field = new Group();
  scene.add(field);

  const uniforms = {
    uTime: { value: 0 },
    uProgress: { value: 0 },
    uIntro: { value: 0 },
    uInside: { value: 0 },
    uPixel: { value: pixel },
    uCrowd: { value: new Color("#d5deea") },
    uShort: { value: new Color("#f5a623") },
    uChosen: { value: new Color("#f0741e") }
  };

  // El diamante
  const crystalMat = new MeshPhysicalMaterial({
    color: new Color("#ffffff"),
    metalness: 0,
    roughness: 0,
    transmission: 1,
    thickness: 1.4,
    ior: 2.4,
    dispersion: 2.5,
    attenuationColor: new Color("#b9d2f5"),
    attenuationDistance: 9,
    specularIntensity: 1,
    envMapIntensity: 1.2,
    flatShading: true,
    side: DoubleSide
  });
  const crystal = new Mesh(diamond(rand), crystalMat);
  scene.add(crystal);

  // El talento dentro del cristal: opaco para que se refracte en las facetas
  const core = new Mesh(
    new SphereGeometry(0.13, 32, 16),
    new MeshBasicMaterial({ color: new Color(3.4, 1.15, 0.22), toneMapped: false })
  );
  scene.add(core);

  // Chispas alrededor del núcleo: al refractarse se convierten en destellos
  const sparkGeo = new SphereGeometry(0.045, 12, 8);
  const sparks = new Group();
  const sparkMats = [
    new MeshBasicMaterial({ color: new Color(2.2, 1.3, 0.35), toneMapped: false }),
    new MeshBasicMaterial({ color: new Color(1.6, 1.6, 1.8), toneMapped: false })
  ];
  for (let i = 0; i < 22; i++) {
    const m = new Mesh(sparkGeo, sparkMats[i % 3 === 0 ? 1 : 0]);
    const r = 0.25 + rand() * 0.55;
    const a = rand() * Math.PI * 2, b = (rand() - 0.5) * Math.PI;
    m.position.set(Math.cos(a) * Math.cos(b) * r, Math.sin(b) * r * 0.8, Math.sin(a) * Math.cos(b) * r);
    m.scale.setScalar(0.6 + rand() * 0.9);
    sparks.add(m);
  }
  crystal.add(sparks);

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

  // Postproceso: bloom solo en lo más brillante (núcleo y destellos)
  let composer = null, bloom = null;
  if (opts.bloom !== false) {
    composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    bloom = new UnrealBloomPass(new Vector2(256, 256), 0.35, 0.4, 0.95);
    composer.addPass(bloom);
    composer.addPass(new OutputPass());
  }

  let offsetX = opts.offsetX || 0;
  const pointer = { x: 0, y: 0 };

  function resize() {
    const w = canvas.clientWidth || 1;
    const h = canvas.clientHeight || 1;
    renderer.setSize(w, h, false);
    if (composer) composer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  let progress = 0;

  function render(t) {
    const p = progress;
    uniforms.uTime.value = t;

    // 0 → 0.55: nos acercamos y atravesamos el cristal
    // 0.5 → 1: dentro, la shortlist se conecta y converge en el elegido
    const approach = smooth(0.0, 0.55, p);
    const grow = smooth(0.24, 0.56, p);
    const scale = 1 + grow * grow * 7;
    const center = offsetX * (1 - smooth(0.1, 0.42, p));

    const intro = uniforms.uIntro.value;
    crystal.scale.setScalar(scale * (0.55 + 0.45 * intro));
    crystal.rotation.y = t * 0.22 + p * 2.2 + pointer.x * 0.3;
    crystal.rotation.x = 0.32 + Math.sin(t * 0.3) * 0.06 + pointer.y * 0.15;
    crystal.rotation.z = -0.12;
    crystal.position.y = Math.sin(t * 0.6) * 0.06 * (1 - grow);

    const camZ = 9.5 - approach * 3.6;
    camera.position.set(-center + pointer.x * 0.3, 0.5 - approach * 0.2 + pointer.y * 0.2, camZ);
    camera.lookAt(-center, 0, 0);

    // dentro del cristal sus caras se ven de espaldas: lo ocultamos
    const inside = camZ < 1.5 * scale * (0.55 + 0.45 * intro);
    crystal.visible = !inside;

    uniforms.uInside.value = smooth(0.46, 0.6, p);
    uniforms.uProgress.value = smooth(0.5, 1.0, p);
    core.scale.setScalar(1 + smooth(0.75, 1.0, p) * 0.4 + Math.sin(t * 2.0) * 0.05);

    field.rotation.y = t * 0.03 + p * 1.2 + pointer.x * 0.1;
    field.rotation.x = 0.1 + pointer.y * 0.05;

    if (bloom) bloom.strength = 0.35 + Math.exp(-Math.pow((p - 0.52) / 0.04, 2)) * 0.45;
    if (composer) composer.render();
    else renderer.render(scene, camera);
  }

  resize();

  return {
    setProgress(v) { progress = v; },
    setIntro(v) { uniforms.uIntro.value = v; },
    setPointer(x, y) { pointer.x = x; pointer.y = y; },
    setOffset(x) { offsetX = x; },
    resize,
    render,
    dispose() {
      pointsObj.geometry.dispose(); linesObj.geometry.dispose();
      pointsMat.dispose(); linesMat.dispose();
      crystal.geometry.dispose(); crystalMat.dispose();
      sparkGeo.dispose(); sparkMats.forEach((m) => m.dispose());
      core.geometry.dispose(); core.material.dispose();
      sky.geometry.dispose(); sky.material.dispose();
      envTex.dispose();
      if (composer) composer.dispose();
      renderer.dispose();
    }
  };
}
