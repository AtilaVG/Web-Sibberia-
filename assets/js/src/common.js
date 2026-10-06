/* SIBBERIA — common.js (fuente)
   Piezas compartidas por las escenas 3D: renderer, cielo opaco (lo que
   refracta el hielo) y entorno de luz de estudio. */
import {
  Mesh, SphereGeometry, ShaderMaterial, BackSide, Color, PMREMGenerator,
  ACESFilmicToneMapping, SRGBColorSpace, WebGLRenderer, UniformsLib, UniformsUtils
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
  uniform vec3 fogColor;
  varying vec3 vDir;
  void main(){
    float h = vDir.y * 0.5 + 0.5;
    vec3 col = mix(uBottom, uTop, smoothstep(0.5, 0.95, h));
    // resplandor cálido detrás del cristal
    float glow = pow(max(dot(vDir, normalize(vec3(0.15, 0.05, -1.0))), 0.0), 28.0);
    col += uWarm * glow * 0.12;
    gl_FragColor = vec4(col, 1.0);
    // mismo tone mapping y espacio de color que el resto de la escena
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
    // En el horizonte, el mismo color de niebla que el suelo lejano
    // (Three mezcla la niebla tras el espacio de color: igual aquí),
    // así no queda una línea entre suelo y cielo.
    gl_FragColor.rgb = mix(gl_FragColor.rgb, fogColor, 1.0 - smoothstep(0.5, 0.62, h));
  }
`;

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
      fog: true, // Three rellena fogColor con el color de la niebla de la escena
      uniforms: {
        ...UniformsUtils.clone(UniformsLib.fog),
        uTop: { value: new Color("#22358B") },
        uBottom: { value: new Color("#0d1338") },
        uWarm: { value: new Color("#FFB511") }
      }
    })
  );
}

