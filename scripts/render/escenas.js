/* SIBBERIA — escenas.js (fuente de las ilustraciones)
   Imágenes fijas con los cubos de hielo de la home: una composición por
   página y, en el cubo elegido, el icono de la familia en dorado.
   No se carga en la web: `npm run images` (scripts/render-images.mjs) las
   renderiza y las guarda como WebP en assets/img/escena-*.webp.

   API (window.SibEscenas):
     SibEscenas.render(canvas, nombre, { icon, w, h }) → data URL PNG */
import {
  Scene, PerspectiveCamera, Mesh, PlaneGeometry, MeshPhysicalMaterial, MeshStandardMaterial,
  MeshBasicMaterial, CanvasTexture, SRGBColorSpace, DirectionalLight, PointLight, Fog, Color,
  Vector3, WebGLRenderer, ACESFilmicToneMapping
} from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { rng, studioEnvironment, makeSky, personTexture } from "../../assets/js/src/common.js";

const S = 0.9;        // lado del cubo
const Y = S / 2;      // altura del centro de un cubo apoyado en el suelo
const STEP = S + 0.04; // cubos que se tocan (con una holgura mínima)
const deg = (d) => (d * Math.PI) / 180;

/* Icono de línea (SVG 24×24 de site/iconos.mjs) dibujado en una textura */
function iconTexture(svg, color) {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const ctx = c.getContext("2d");
  ctx.strokeStyle = color;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.translate(32, 32);
  ctx.scale(8, 8);
  ctx.lineWidth = 1.6;
  const attrs = (s) => Object.fromEntries([...s.matchAll(/([\w-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
  for (const [, tag, rest] of svg.matchAll(/<(path|circle|rect)\b([^>]*?)\/?>/g)) {
    const a = attrs(rest);
    if (tag === "path") { ctx.stroke(new Path2D(a.d)); continue; }
    ctx.beginPath();
    if (tag === "circle") ctx.arc(+a.cx, +a.cy, +a.r, 0, Math.PI * 2);
    else ctx.roundRect(+a.x, +a.y, +a.width, +a.height, +(a.rx || 0));
    ctx.stroke();
  }
  const t = new CanvasTexture(c);
  t.colorSpace = SRGBColorSpace;
  return t;
}

/* Reparto aleatorio sin solapes (para multitudes de cubos) */
function scatter(r, n, { x: [x0, x1], z: [z0, z1] }, avoid = [], min = 1.15) {
  const pts = [];
  let guard = 0;
  while (pts.length < n && guard++ < 5000) {
    const p = [x0 + r() * (x1 - x0), z0 + r() * (z1 - z0)];
    if ([...pts, ...avoid].every((q) => Math.hypot(p[0] - q[0], p[1] - q[1]) > min)) pts.push(p);
  }
  return pts.map(([x, z]) => ({ p: [x, Y, z], ry: r() * Math.PI * 2 }));
}

/* Composiciones. Cada una devuelve los cubos ({ p, ry, rx, rz, chosen }),
   la cámara y, si hace falta, iconos en la cara superior (vistas cenitales).
   El cubo elegido mira a la cámara salvo que la escena fije su giro. */
const ESCENAS = {
  // Mantenimiento y SAT: equipos en filas ordenadas; el elegido, levantado: en revisión
  "mantenimiento-y-sat": (r) => {
    const cubes = [];
    for (let z = 0; z < 3; z++) for (let x = 0; x < 5; x++) {
      if (z === 2 && x === 3) continue;
      cubes.push({ p: [(x - 2) * 1.35, Y, (z - 2) * 1.35], ry: deg(r() * 6 - 3) });
    }
    cubes.push({ chosen: true, p: [1 * 1.35, Y + 1.2, 0.45], tilt: [deg(-4), deg(10)] });
    return { cubes, cam: { p: [-2.0, 2.7, 6.3], t: [0.5, 0.75, -0.8], fov: 32 } };
  },

  // Producción: dos líneas que se pierden al fondo; el elegido encabeza la primera
  "produccion": () => {
    const cubes = [];
    const line = (x0, z0, n) => {
      for (let i = 0; i < n; i++) cubes.push({ p: [x0 + 0.42 * i, Y, z0 - 1.3 * i], ry: Math.atan2(0.42, -1.3) });
    };
    line(0.35, 0.15, 12);
    line(2.45, -0.75, 12);
    cubes.push({ chosen: true, p: [0.45, Y + 0.45, 1.55] });
    return { cubes, cam: { p: [-5.0, 2.0, 3.4], t: [0.5, 0.75, 0.2], fov: 34 } };
  },

  // Calidad, PRL y medioambiente: un anillo que protege al elegido
  "calidad-prl-medioambiente": () => {
    const cubes = [];
    const n = 12, rad = 2.3;
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2;
      cubes.push({ p: [Math.cos(a) * rad, Y, Math.sin(a) * rad], ry: -a - Math.PI / 2 });
    }
    cubes.push({ chosen: true, p: [0, Y + 0.3, 0] });
    return { cubes, cam: { p: [0.7, 3.8, 6.4], t: [0, 0.3, -0.3], fov: 34 } };
  },

  // Almacén, logística, planificación y compras: estanterías a ambos lados de un pasillo
  "almacen-logistica-planificacion-compras": () => {
    const cubes = [];
    const alturas = [3, 2, 3, 1, 2, 3, 2, 1, 3];
    [-1.3, 1.3].forEach((x, lado) => {
      for (let k = 0; k < 8; k++) {
        const n = alturas[(k + lado * 4) % alturas.length];
        for (let j = 0; j < n; j++) cubes.push({ p: [x, Y + j * STEP, 0.5 - k * STEP], ry: 0 });
      }
    });
    cubes.push({ chosen: true, p: [0, Y + 0.12, 2.2] });
    return { cubes, cam: { p: [1.3, 1.95, 7.8], t: [-0.1, 1.1, -2.2], fov: 36 } };
  },

  // Ingeniería y proyectos: una estructura en escalera; el elegido, en lo más alto
  "ingenieria-y-proyectos": () => {
    const cubes = [];
    for (let i = 0; i < 4; i++) for (let j = 0; j <= i; j++) for (let d = 0; d < 2; d++) {
      cubes.push({ p: [(i - 1.5) * STEP, Y + j * STEP, -d * STEP], ry: 0 });
    }
    cubes.push({ chosen: true, p: [1.5 * STEP, Y + 4 * STEP, 0] });
    return { cubes, cam: { p: [-4.6, 2.6, 9.6], t: [0.5, 2.35, -0.4], fov: 36 } };
  },

  // Automatización y robótica: una matriz exacta; un cubo sale de su hueco (pick & place)
  "automatizacion-y-robotica": () => {
    const cubes = [];
    const gap = 1.22;
    for (let z = 0; z < 4; z++) for (let x = 0; x < 6; x++) {
      if (z === 3 && x === 3) continue;
      cubes.push({ p: [(x - 2.5) * gap, Y, (z - 3) * gap], ry: 0 });
    }
    cubes.push({ chosen: true, p: [0.5 * gap, Y + 1.6, 0] });
    return { cubes, cam: { p: [-1.9, 3.9, 6.3], t: [0.4, 0.75, -1.3], fov: 34 } };
  },

  // Programadores: los cubos forman líneas de código con sangría
  "programadores": () => {
    const cubes = [];
    const fila = S + 0.32;
    const lineas = [[0, 3], [1, 4], [2, 3], [2, 5], [1, 2], [0, 1]]; // [sangría, longitud]
    lineas.forEach(([ind, len], row) => {
      for (let i = 0; i < len; i++) cubes.push({ p: [(ind + i - 3.5) * STEP, Y, (row - 3) * fila], ry: 0 });
    });
    // el elegido: el cursor al final de la línea más larga
    cubes.push({ chosen: true, p: [3.5 * STEP + 0.2, Y + 0.5, 0] });
    return { cubes, cam: { p: [0.1, 9.0, 6.0], t: [0.3, 0, -0.4], fov: 34 }, top: true, shift: 0.06 };
  },

  // Ofertas de trabajo: una fila de candidatos; uno da un paso al frente
  "ofertas": () => {
    const cubes = [];
    for (let i = -4; i <= 4; i++) if (i !== 0) cubes.push({ p: [i * 1.18, Y, 0], ry: 0 });
    for (let i = -5; i <= 5; i++) cubes.push({ p: [i * 1.18 + 0.59, Y, -1.5], ry: 0 });
    cubes.push({ chosen: true, p: [0, Y + 0.4, 1.9] });
    return { cubes, cam: { p: [1.5, 2.4, 7.8], t: [0.1, 0.7, 0], fov: 34 } };
  },

  // Contacto: dos cubos frente a frente, una conversación
  "contacto": (r) => {
    const cubes = [
      { chosen: true, p: [-0.68, Y, 0.2], ry: deg(40) },
      { p: [0.68, Y, 0.2], ry: deg(-40) },
      ...scatter(r, 16, { x: [-9, 9], z: [-14, -3.5] })
    ];
    return { cubes, cam: { p: [0.1, 1.3, 4.7], t: [0, 0.55, 0], fov: 32 } };
  },

  // Selección: muchos cubos dispersos; el elegido se eleva
  "seleccion": (r) => {
    const cubes = scatter(r, 26, { x: [-6.5, 6.5], z: [-8, 1.6] }, [[0, 0.6]], 1.25);
    cubes.push({ chosen: true, p: [0, Y + 1.3, 0.6], tilt: [deg(8), deg(-6)] });
    return { cubes, cam: { p: [0, 2.3, 8.4], t: [0, 0.9, -0.6], fov: 34 } };
  }
};

export const nombres = Object.keys(ESCENAS);

export function render(canvas, nombre, { icon = null, w = 1600, h = 900, seed = 7, shift = 0.17 } = {}) {
  const def = ESCENAS[nombre];
  if (!def) throw new Error(`Escena desconocida: ${nombre}`);
  const sc = def(rng(seed));

  const renderer = new WebGLRenderer({ canvas, antialias: true, preserveDrawingBuffer: true });
  renderer.setPixelRatio(1);
  renderer.setSize(w, h, false);
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = sc.exposure || 1.12;
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.transmissionResolutionScale = 1;

  // Cámara: el tema queda a la derecha (a la izquierda va el texto de la página)
  const camP = new Vector3(...sc.cam.p), camT = new Vector3(...sc.cam.t);
  const fullW = w * (1 + 2 * (sc.shift ?? shift));
  const camera = new PerspectiveCamera(sc.cam.fov, fullW / h, 0.1, 120);
  camera.setViewOffset(fullW, h, 0, 0, w, h);
  camera.position.copy(camP);
  camera.lookAt(camT);

  const scene = new Scene();
  const dist = camP.distanceTo(camT);
  scene.fog = new Fog(new Color("#17246a"), dist * 0.95, dist * 2.8);
  studioEnvironment(renderer, scene, 1.25);
  const sky = makeSky();
  sky.material.uniforms.uBottom.value = new Color("#17246a");
  sky.position.copy(camP);
  scene.add(sky);

  const key = new DirectionalLight(0xffffff, 1.7);
  key.position.set(-4, 7, 6);
  scene.add(key);
  const rim = new DirectionalLight(0x9db8ff, 0.9);
  rim.position.set(4, 5, -7);
  scene.add(rim);

  const floor = new Mesh(new PlaneGeometry(160, 160), new MeshStandardMaterial({ color: new Color("#1d2d7a"), roughness: 0.42, metalness: 0.1 }));
  floor.rotation.x = -Math.PI / 2;
  scene.add(floor);

  const geo = new RoundedBoxGeometry(S, S, S, 3, 0.09);
  const ice = new MeshPhysicalMaterial({
    color: new Color("#f4f9ff"), transmission: 1, roughness: 0.2, thickness: 0.9, ior: 1.31,
    attenuationColor: new Color("#d6e9ff"), attenuationDistance: 5,
    clearcoat: 1, clearcoatRoughness: 0.16, envMapIntensity: 1.15, specularIntensity: 1
  });
  const chosenIce = ice.clone();
  chosenIce.attenuationColor = new Color("#ffd27a");
  chosenIce.attenuationDistance = 2.4;

  const iconGeo = new PlaneGeometry(S * 0.72, S * 0.72);
  const person = new MeshBasicMaterial({ map: personTexture("#ffffff"), transparent: true, opacity: 0.82, depthWrite: false });
  const gold = new MeshBasicMaterial({
    map: icon ? iconTexture(icon, "#FFB511") : personTexture("#FFB511"),
    transparent: true, depthWrite: false, toneMapped: false
  });
  const caras = [[0, 0, 1, 0, 0], [0, 0, -1, 0, Math.PI]];
  if (sc.top) caras.push([0, 1, 0, -Math.PI / 2, 0]);

  let chosenPos = null;
  for (const c of sc.cubes) {
    const m = new Mesh(geo, c.chosen ? chosenIce : ice);
    m.position.set(...c.p);
    if (c.chosen && c.ry === undefined) {
      m.lookAt(camP); // la cara con el icono, hacia la cámara
      if (c.tilt) { m.rotateX(c.tilt[0]); m.rotateZ(c.tilt[1]); }
    } else {
      m.rotation.set(c.rx || 0, c.ry || 0, c.rz || 0);
    }
    for (const [x, y, z, rx, ry] of caras) {
      const d = new Mesh(iconGeo, c.chosen ? gold : person);
      d.position.set(x * (S / 2 + 0.004), y * (S / 2 + 0.004), z * (S / 2 + 0.004));
      d.rotation.set(rx, ry, 0);
      m.add(d);
    }
    scene.add(m);
    if (c.chosen) chosenPos = m.position.clone();
  }

  // Luz cálida sobre el elegido (como en la home); en vistas cenitales, más
  // recogida para que no tiña el suelo
  if (chosenPos) {
    const warm = sc.top ? new PointLight(0xffb511, 4, 3.2, 1.6) : new PointLight(0xffb511, 7, 8, 1.6);
    warm.position.copy(chosenPos).add(sc.top ? new Vector3(0.2, 1.1, 0.5) : new Vector3(0.4, 0.9, 1.4));
    scene.add(warm);
  }

  renderer.render(scene, camera);
  const url = canvas.toDataURL("image/png");
  renderer.dispose();
  return url;
}
