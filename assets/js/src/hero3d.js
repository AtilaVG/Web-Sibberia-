/* SIBBERIA — hero3d.js (fuente)
   "Personas que encajan": cubos de hielo con una persona grabada.
   La escena acompaña el lema a lo largo de la home:
     0 hero       cubos dispersos sobre el hielo; uno se eleva (el elegido)
     1 Compartir  se acercan y forman un círculo alrededor del elegido
     2 Crear      encajan en un bloque compacto: el equipo
     3 Crecer     el bloque se convierte en una torre que sube
   Se compila con `npm run build:hero` a assets/js/hero3d.js.

   API (window.SibHero3D):
     const s = SibHero3D.create(canvas, { count, offsetX })
     s.setProgress(0..3)  s.setIntro(0..1)  s.setPointer(x, y)
     s.render(timeSec)  s.resize()  s.dispose()
*/
import {
  Scene, PerspectiveCamera, Group, Mesh, PlaneGeometry,
  MeshPhysicalMaterial, MeshStandardMaterial, MeshBasicMaterial,
  CanvasTexture, SRGBColorSpace, DirectionalLight, PointLight, Fog,
  Color, Vector3, Quaternion, Euler
} from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { smooth, rng, makeRenderer, studioEnvironment, makeSky } from "./common.js";

const FLOOR_Y = -1.6;
const SIZE = 0.9;

/* Figura de persona grabada (como en los bloques de la foto del cliente) */
function personTexture(color) {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const ctx = c.getContext("2d");
  ctx.strokeStyle = color; ctx.fillStyle = color;
  ctx.lineWidth = 9; ctx.lineCap = "round"; ctx.lineJoin = "round";
  ctx.beginPath(); ctx.arc(128, 70, 34, 0, Math.PI * 2); ctx.stroke();            // cabeza
  ctx.beginPath(); ctx.moveTo(70, 196); ctx.lineTo(70, 140); ctx.quadraticCurveTo(70, 118, 96, 116); ctx.stroke();   // hombro izq.
  ctx.beginPath(); ctx.moveTo(186, 196); ctx.lineTo(186, 140); ctx.quadraticCurveTo(186, 118, 160, 116); ctx.stroke(); // hombro der.
  ctx.beginPath(); ctx.moveTo(116, 122); ctx.lineTo(140, 122); ctx.lineTo(136, 136); ctx.lineTo(146, 190); ctx.lineTo(128, 206); ctx.lineTo(110, 190); ctx.lineTo(120, 136); ctx.closePath(); ctx.fill(); // corbata
  ctx.beginPath(); ctx.moveTo(84, 226); ctx.lineTo(172, 226); ctx.stroke();      // base
  const t = new CanvasTexture(c);
  t.colorSpace = SRGBColorSpace;
  return t;
}

export function create(canvas, opts = {}) {
  const N = opts.count || 27;
  const rand = rng(1337);
  const { renderer } = makeRenderer(canvas, opts.maxPixelRatio);
  // la refracción se calcula a media resolución: casi no se nota y cuesta la mitad
  renderer.transmissionResolutionScale = 0.5;

  const scene = new Scene();
  scene.fog = new Fog(new Color("#17246a"), 10, 26);
  const camera = new PerspectiveCamera(38, 1, 0.1, 80);
  const envTex = studioEnvironment(renderer, scene, 1.25);
  const sky = makeSky();
  sky.material.uniforms.uBottom.value = new Color("#17246a"); // = niebla: horizonte sin corte
  scene.add(sky);

  const key = new DirectionalLight(0xffffff, 1.6);
  key.position.set(-4, 7, 6);
  scene.add(key);
  const warm = new PointLight(0xffb511, 6, 9, 1.6);
  scene.add(warm);

  // Hielo: opaco al fondo (suelo) para que la transmisión tenga algo que refractar
  const floor = new Mesh(new PlaneGeometry(80, 80), new MeshStandardMaterial({ color: new Color("#1d2d7a"), roughness: 0.42, metalness: 0.1 }));
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = FLOOR_Y - SIZE / 2;
  scene.add(floor);

  const geo = new RoundedBoxGeometry(SIZE, SIZE, SIZE, 2, 0.09);
  const ice = new MeshPhysicalMaterial({
    color: new Color("#f4f9ff"), transmission: 1, roughness: 0.22, thickness: 0.9, ior: 1.31,
    attenuationColor: new Color("#d6e9ff"), attenuationDistance: 5,
    clearcoat: 1, clearcoatRoughness: 0.18, envMapIntensity: 1.1, specularIntensity: 1
  });
  const chosenIce = ice.clone();
  chosenIce.attenuationColor = new Color("#ffd27a");
  chosenIce.attenuationDistance = 2.4;

  const iconGeo = new PlaneGeometry(SIZE * 0.72, SIZE * 0.72);
  const iconTex = personTexture("#ffffff");
  const iconGold = personTexture("#FFB511");
  const iconMat = new MeshBasicMaterial({ map: iconTex, transparent: true, opacity: 0.82, depthWrite: false });
  const iconChosen = new MeshBasicMaterial({ map: iconGold, transparent: true, opacity: 1, depthWrite: false, toneMapped: false });

  const group = new Group();
  scene.add(group);

  const cubes = [];
  for (let i = 0; i < N; i++) {
    const chosen = i === 0;
    const cube = new Mesh(geo, chosen ? chosenIce : ice);
    [1, -1].forEach((side) => {
      const decal = new Mesh(iconGeo, chosen ? iconChosen : iconMat);
      decal.position.z = side * (SIZE / 2 + 0.004);
      if (side < 0) decal.rotation.y = Math.PI;
      cube.add(decal);
    });
    cubes.push({ mesh: cube, chosen, f: [], q: [], delay: rand() * 0.35, bob: rand() * 6.28 });
    group.add(cube);
  }

  /* --- Formaciones: posición y giro de cada cubo en cada paso --- */
  const others = cubes.filter((c) => !c.chosen);
  const chosen = cubes[0];
  const e = new Euler();
  const q = (x, y, z) => new Quaternion().setFromEuler(e.set(x, y, z));

  // 0 · dispersos sobre el hielo
  others.forEach((c) => {
    const a = rand() * Math.PI * 2, r = 1.6 + Math.pow(rand(), 0.8) * 5;
    c.f[0] = new Vector3(Math.cos(a) * r, FLOOR_Y, Math.sin(a) * r * 0.7 - 1);
    c.q[0] = q(0, rand() * Math.PI * 2, 0);
  });
  chosen.f[0] = new Vector3(0, 0.25, 0.8);
  chosen.q[0] = q(0.15, -0.5, 0.05);

  // 1 · Compartir: en círculo, mirando al centro
  others.forEach((c, i) => {
    const a = (i / others.length) * Math.PI * 2;
    const r = 2.9;
    c.f[1] = new Vector3(Math.cos(a) * r, FLOOR_Y + 0.25, Math.sin(a) * r);
    c.q[1] = q(0, -a - Math.PI / 2, 0);
  });
  chosen.f[1] = new Vector3(0, -0.6, 0);
  chosen.q[1] = q(0, 0.4, 0);

  // 2 · Crear: encajan en un bloque compacto (el elegido, delante y arriba)
  const side = Math.ceil(Math.cbrt(N));
  const gap = SIZE * 1.04;
  const slots = [];
  for (let y = 0; y < side; y++) for (let z = 0; z < side; z++) for (let x = 0; x < side; x++) {
    slots.push(new Vector3((x - (side - 1) / 2) * gap, FLOOR_Y + y * gap, (z - (side - 1) / 2) * gap));
  }
  const front = slots.reduce((best, s) => (s.y >= best.y && s.z >= best.z && Math.abs(s.x) <= Math.abs(best.x) ? s : best), slots[0]);
  chosen.f[2] = front.clone();
  chosen.q[2] = q(0, 0, 0);
  slots.filter((s) => s !== front).slice(0, others.length).forEach((s, i) => {
    others[i].f[2] = s.clone();
    others[i].q[2] = q(0, 0, 0);
  });
  others.forEach((c) => { if (!c.f[2]) { c.f[2] = c.f[1].clone(); c.q[2] = c.q[1].clone(); } });

  // 3 · Crecer: torre en espiral que sube; el elegido en la cima
  others.forEach((c, i) => {
    const a = i * 0.62;
    c.f[3] = new Vector3(Math.cos(a) * 1.25, FLOOR_Y + i * 0.3, Math.sin(a) * 1.25);
    c.q[3] = q(0, -a, 0);
  });
  chosen.f[3] = new Vector3(0, FLOOR_Y + others.length * 0.3 + 0.6, 0);
  chosen.q[3] = q(0, 0.3, 0);

  // Cámara: posición y punto de mira por paso
  const cams = [
    { p: new Vector3(0, 1.4, 10.5), t: new Vector3(0, -0.4, 0) },
    { p: new Vector3(0, 4.6, 9.2), t: new Vector3(0, -0.9, 0) },
    { p: new Vector3(1.2, 1.6, 8.6), t: new Vector3(0, -0.3, 0) },
    { p: new Vector3(0, 3.2, 12.5), t: new Vector3(0, 2.4, 0) }
  ];
  // desplazamiento lateral del grupo: deja sitio al texto (a la derecha en "Crear")
  const offsetX = opts.offsetX || 0;
  const shift = [offsetX * 1.45, offsetX * 1.15, -offsetX * 1.5, offsetX * 1.1];

  let progress = 0, intro = 0;
  const pointer = { x: 0, y: 0 };
  const pos = new Vector3(), camP = new Vector3(), camT = new Vector3(), qq = new Quaternion();

  function resize() {
    const w = canvas.clientWidth || 1, h = canvas.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  function render(t) {
    const p = Math.min(Math.max(progress, 0), 3);
    const k = Math.min(Math.floor(p), 2);
    const u = p - k;

    cubes.forEach((c, i) => {
      // cada cubo arranca con un pequeño retraso: el movimiento fluye
      const local = smooth(c.delay * 0.6, 0.6 + c.delay * 0.4 + 0.0001, u);
      pos.lerpVectors(c.f[k], c.f[k + 1], local);
      qq.slerpQuaternions(c.q[k], c.q[k + 1], local);
      // salto en arco entre formaciones
      pos.y += Math.sin(local * Math.PI) * (c.chosen ? 0.4 : 0.8);
      // entrada: caen sobre el hielo
      pos.y += (1 - smooth(c.delay, 1, intro)) * 6;
      if (c.chosen) pos.y += Math.sin(t * 1.2) * 0.08;
      else if (p < 0.5) pos.y += Math.max(0, Math.sin(t * 0.8 + c.bob)) * 0.03;
      c.mesh.position.copy(pos);
      c.mesh.quaternion.copy(qq);
      if (c.chosen) c.mesh.rotateY(Math.sin(t * 0.5) * 0.25);
    });

    warm.position.set(chosen.mesh.position.x + 0.4, chosen.mesh.position.y + 0.8, chosen.mesh.position.z + 1.6);

    const cu = smooth(0, 1, u);
    camP.lerpVectors(cams[k].p, cams[k + 1].p, cu);
    camT.lerpVectors(cams[k].t, cams[k + 1].t, cu);
    group.position.x = shift[k] + (shift[k + 1] - shift[k]) * cu;
    camera.position.set(camP.x + pointer.x * 0.5, camP.y + pointer.y * 0.3, camP.z);
    camera.lookAt(camT);
    group.rotation.y = t * 0.02 + p * 0.35;
    renderer.render(scene, camera);
  }

  resize();
  return {
    setProgress(v) { progress = v; },
    setIntro(v) { intro = v; },
    setPointer(x, y) { pointer.x = x; pointer.y = y; },
    resize,
    render,
    dispose() {
      geo.dispose(); iconGeo.dispose(); ice.dispose(); chosenIce.dispose();
      iconTex.dispose(); iconGold.dispose(); iconMat.dispose(); iconChosen.dispose();
      floor.geometry.dispose(); floor.material.dispose();
      sky.geometry.dispose(); sky.material.dispose();
      envTex.dispose(); renderer.dispose();
    }
  };
}
