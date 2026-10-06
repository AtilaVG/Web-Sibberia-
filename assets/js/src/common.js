/* SIBBERIA — common.js (fuente)
   Piezas compartidas por las escenas 3D: cielo opaco (lo que refracta el
   cristal), entorno de luz, material de cristal y tallas. */
import {
  Mesh, BufferGeometry, Float32BufferAttribute, SphereGeometry, ShaderMaterial,
  MeshPhysicalMaterial, BackSide, DoubleSide, Color, PMREMGenerator,
  ACESFilmicToneMapping, SRGBColorSpace, WebGLRenderer
} from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

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
export function diamond(rand) {
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

export const smooth = (a, b, x) => {
  const t = Math.min(Math.max((x - a) / (b - a), 0), 1);
  return t * t * (3 - 2 * t);
};

/* PRNG determinista: la constelación es la misma en cada visita */
export function rng(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}


export function makeRenderer(canvas, maxPixelRatio) {
  const renderer = new WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
  const pixel = Math.min(window.devicePixelRatio || 1, maxPixelRatio || 2);
  renderer.setPixelRatio(pixel);
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.outputColorSpace = SRGBColorSpace;
  return { renderer, pixel };
}

/* Reflejos de estudio sin descargar ningún HDR */
export function studioEnvironment(renderer, scene, intensity) {
  const pmrem = new PMREMGenerator(renderer);
  const tex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = tex;
  scene.environmentIntensity = intensity;
  pmrem.dispose();
  return tex;
}

export function makeSky() {
  return new Mesh(
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
}

export function crystalMaterial(extra) {
  return new MeshPhysicalMaterial(Object.assign({
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
  }, extra || {}));
}

/* Talla de cuarzo: prisma hexagonal con punta */
export function quartz(rand, h) {
  const r = 0.32, top = h * 0.5, base = -h * 0.5;
  const ring = (y, k) => {
    const out = [];
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      const j = 1 + (rand() - 0.5) * 0.12;
      out.push([Math.cos(a) * r * k * j, y, Math.sin(a) * r * k * j]);
    }
    return out;
  };
  const lo = ring(base, 0.9), hi = ring(top, 1), tip = [0, top + r * 1.6, 0], bot = [0, base - 0.05, 0];
  const v = [];
  const tri = (a, b, c) => v.push(...a, ...b, ...c);
  for (let i = 0; i < 6; i++) {
    const j = (i + 1) % 6;
    tri(lo[i], hi[j], hi[i]); tri(lo[i], lo[j], hi[j]);
    tri(hi[i], hi[j], tip);
    tri(lo[j], lo[i], bot);
  }
  const g = new BufferGeometry();
  g.setAttribute("position", new Float32BufferAttribute(v, 3));
  g.computeVertexNormals();
  return g;
}

/* Esquirla irregular: octaedro estirado y deformado */
export function shard(rand) {
  const pts = [[0, 1, 0], [0, -1, 0], [1, 0, 0], [-1, 0, 0], [0, 0, 1], [0, 0, -1]]
    .map(([x, y, z]) => [x * (0.4 + rand() * 0.3), y * (0.8 + rand() * 0.6), z * (0.3 + rand() * 0.3)]);
  const f = [[0, 2, 4], [0, 4, 3], [0, 3, 5], [0, 5, 2], [1, 4, 2], [1, 3, 4], [1, 5, 3], [1, 2, 5]];
  const v = [];
  f.forEach(([a, b, c]) => v.push(...pts[a], ...pts[b], ...pts[c]));
  const g = new BufferGeometry();
  g.setAttribute("position", new Float32BufferAttribute(v, 3));
  g.computeVertexNormals();
  return g;
}
