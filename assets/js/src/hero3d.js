/* SIBBERIA — hero3d.js (fuente)
   Cubos de hielo con una persona grabada: los perfiles que encajan.
   La escena acompaña el lema en la home (hero y bloque Compartir/Crear/Crecer):
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
  DirectionalLight, PointLight, Fog,
  Color, Vector3, Quaternion, Euler
} from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { smooth, rng, makeRenderer, studioEnvironment, makeSky, personTexture } from "./common.js";

const FLOOR_Y = -1.6;
const SIZE = 0.9;

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
    c.f[3] = new Vector3(Math.cos(a) * 1.5, FLOOR_Y + i * 0.2, Math.sin(a) * 1.5);
    c.q[3] = q(0, -a, 0);
  });
  chosen.f[3] = new Vector3(0, FLOOR_Y + others.length * 0.2 + 0.6, 0);
  chosen.q[3] = q(0, 0.3, 0);

  // Cámara: posición y punto de mira por paso
  // pasos 1-3: el texto va abajo, así que la cámara mira más abajo y la
  // formación queda en la mitad superior de la pantalla
  const cams = [
    { p: new Vector3(0, 1.4, 10.5), t: new Vector3(0, -0.4, 0) },
    { p: new Vector3(0, 4.6, 9.6), t: new Vector3(0, -2.4, 0) },
    { p: new Vector3(1.2, 1.6, 9.4), t: new Vector3(0, -1.8, 0) },
    { p: new Vector3(0, 3.4, 15), t: new Vector3(0, 0.7, 0) }
  ];
  // desplazamiento lateral del grupo: deja sitio al texto (a la derecha en "Crear")
  const offsetX = opts.offsetX || 0;
  const shift = [offsetX * 1.45, 0, 0, 0];

  let progress = 0, intro = 0;
  // En pantallas verticales (móvil) el campo horizontal es estrecho:
  // la cámara se aleja para que cada formación entre completa.
  let fit = 1;
  const pointer = { x: 0, y: 0 };
  const pos = new Vector3(), camP = new Vector3(), camT = new Vector3(), qq = new Quaternion();

  function resize() {
    const w = canvas.clientWidth || 1, h = canvas.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    fit = camera.aspect < 1.2 ? Math.min(1.2 / camera.aspect, 2.1) * 0.85 : 1;
    // la niebla se aleja con la cámara (si no, la escena queda oscura)
    scene.fog.near = 10 * fit;
    scene.fog.far = 26 * fit;
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
    if (fit !== 1) camP.sub(camT).multiplyScalar(fit).add(camT);
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
