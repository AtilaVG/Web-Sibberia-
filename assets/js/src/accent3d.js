/* SIBBERIA — accent3d.js (fuente)
   Una pieza de cristal en la cabecera de cada subpágina, de la misma
   familia que el diamante de la home:
     seleccion   diamante entre el mercado de talento
     formacion   racimo de cuarzos que crece
     consultoria cristales dispersos que se ordenan en una retícula
     nosotros    tres cristales que orbitan un núcleo
     blog        esquirlas flotando (ideas)
     contacto    dos cristales que se acercan y se conectan
   Se compila con `npm run build` a assets/js/accent3d.js.

   API (window.SibAccent3D):
     const s = SibAccent3D.create(canvas, { variant, offsetX, bloom })
     s.setIntro(0..1)  s.setScroll(0..1)  s.setPointer(x, y)
     s.render(timeSec)  s.resize()  s.dispose()
*/
import {
  Scene, PerspectiveCamera, Group, Mesh, Points, Line, LineSegments,
  BufferGeometry, Float32BufferAttribute, SphereGeometry, OctahedronGeometry,
  MeshBasicMaterial, PointsMaterial, LineBasicMaterial,
  AdditiveBlending, Color, Vector2, Vector3
} from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import {
  diamond, quartz, shard, smooth, rng,
  makeRenderer, studioEnvironment, makeSky, crystalMaterial
} from "./common.js";

const ORANGE = new Color(3.4, 1.15, 0.22);
const AMBER = new Color(2.2, 1.3, 0.35);

function glow(radius, color) {
  return new Mesh(new SphereGeometry(radius, 24, 12), new MeshBasicMaterial({ color, toneMapped: false }));
}

function dust(rand, n, spread) {
  const p = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    p[i * 3] = (rand() - 0.5) * spread;
    p[i * 3 + 1] = (rand() - 0.5) * spread * 0.5;
    p[i * 3 + 2] = (rand() - 0.5) * spread * 0.6 - 1;
  }
  const g = new BufferGeometry();
  g.setAttribute("position", new Float32BufferAttribute(p, 3));
  return new Points(g, new PointsMaterial({
    color: new Color("#d5deea"), size: 0.035, transparent: true, opacity: 0.55,
    depthWrite: false, blending: AdditiveBlending
  }));
}

/* ---------- Variantes: cada una devuelve { group, update } ---------- */

const VARIANTS = {
  seleccion(rand, glass) {
    const group = new Group();
    const gem = new Mesh(diamond(rand), glass);
    const core = glow(0.13, ORANGE);
    gem.add(core);
    for (let i = 0; i < 18; i++) {
      const s = glow(0.04, i % 3 ? AMBER : new Color(1.6, 1.6, 1.8));
      const r = 0.25 + rand() * 0.5, a = rand() * 6.28, b = (rand() - 0.5) * 3;
      s.position.set(Math.cos(a) * r, Math.sin(b) * r * 0.6, Math.sin(a) * r);
      gem.add(s);
    }
    const cloud = dust(rand, 700, 9);
    group.add(gem, cloud);
    return {
      group,
      update(t, intro, scroll) {
        gem.scale.setScalar(0.4 + 0.6 * intro);
        gem.rotation.set(0.32 + Math.sin(t * 0.3) * 0.06, t * 0.25 + scroll * 2, -0.12);
        gem.position.y = Math.sin(t * 0.6) * 0.06;
        cloud.rotation.y = t * 0.02;
        cloud.material.opacity = 0.55 * intro;
      }
    };
  },

  formacion(rand, glass) {
    const group = new Group();
    const crystals = [];
    const N = 11;
    for (let i = 0; i < N; i++) {
      // el central es el más alto; alrededor, cristales más bajos y abiertos
      const h = i === 0 ? 2.3 : 0.7 + rand() * 1.2;
      const m = new Mesh(quartz(rand, h), glass);
      const a = (i / N) * Math.PI * 2 * 2.4 + rand() * 0.5;
      const lean = i === 0 ? 0.05 : 0.3 + rand() * 0.55;
      const pivot = new Group();
      pivot.rotation.set(Math.sin(a) * lean, 0, -Math.cos(a) * lean);
      m.position.y = h * 0.5;
      pivot.add(m);
      pivot.position.set(Math.cos(a) * 0.18, 0, Math.sin(a) * 0.18);
      pivot.userData = { delay: i * 0.05, h };
      crystals.push(pivot);
      group.add(pivot);
    }
    const core = glow(0.16, ORANGE);
    core.position.y = 0.15;
    group.add(core);
    group.position.y = -1.2;
    group.rotation.x = 0.18;
    return {
      group,
      update(t, intro, scroll) {
        // crecen al entrar y siguen creciendo con el scroll
        crystals.forEach((c) => {
          const k = smooth(c.userData.delay, c.userData.delay + 0.6, intro);
          c.scale.set(0.6 + 0.4 * k, k * (0.85 + scroll * 0.35), 0.6 + 0.4 * k);
        });
        group.rotation.y = t * 0.15 + scroll * 1.2;
      }
    };
  },

  consultoria(rand, glass) {
    const group = new Group();
    const geo = new OctahedronGeometry(0.22, 0);
    const nodes = [];
    for (let x = -1; x <= 1; x++) for (let y = -1; y <= 1; y++) for (let z = -1; z <= 1; z++) {
      const m = new Mesh(geo, glass);
      const order = new Vector3(x, y, z).multiplyScalar(0.95);
      const chaos = new Vector3((rand() - 0.5) * 6, (rand() - 0.5) * 3.5, (rand() - 0.5) * 4);
      m.userData = { order, chaos, spin: rand() * 6.28 };
      nodes.push(m);
      group.add(m);
    }
    // aristas de la retícula: aparecen cuando el orden se completa
    const edges = [];
    nodes.forEach((a, i) => nodes.forEach((b, j) => {
      if (j > i && a.userData.order.distanceTo(b.userData.order) < 1.0) edges.push([a, b]);
    }));
    const lineGeo = new BufferGeometry();
    const linePos = new Float32Array(edges.length * 6);
    lineGeo.setAttribute("position", new Float32BufferAttribute(linePos, 3));
    const lines = new LineSegments(lineGeo, new LineBasicMaterial({ color: new Color("#f5a623"), transparent: true, opacity: 0 }));
    group.add(lines);
    const core = glow(0.12, ORANGE);
    group.add(core);
    return {
      group,
      update(t, intro, scroll) {
        const k = smooth(0, 1, Math.min(intro * 0.85 + scroll * 0.6, 1));
        nodes.forEach((m) => {
          m.position.lerpVectors(m.userData.chaos, m.userData.order, k);
          m.rotation.set(m.userData.spin + t * 0.3 * (1 - k), t * 0.2 * (1 - k), 0);
        });
        const attr = lineGeo.attributes.position;
        edges.forEach(([a, b], i) => {
          attr.setXYZ(i * 2, a.position.x, a.position.y, a.position.z);
          attr.setXYZ(i * 2 + 1, b.position.x, b.position.y, b.position.z);
        });
        attr.needsUpdate = true;
        lines.material.opacity = smooth(0.75, 1, k) * 0.45;
        group.rotation.set(0.35, t * 0.18 + scroll * 0.8, 0);
      }
    };
  },

  nosotros(rand, glass) {
    const group = new Group();
    const shapes = [
      new Mesh(diamond(rand), glass),
      new Mesh(quartz(rand, 1.6), glass),
      new Mesh(new OctahedronGeometry(0.8, 0), glass)
    ];
    shapes[0].scale.setScalar(0.45);
    shapes[2].scale.set(1, 1.3, 1);
    shapes.forEach((m) => group.add(m));
    const core = glow(0.2, ORANGE);
    group.add(core);
    return {
      group,
      update(t, intro, scroll) {
        const r = 1.25 * (0.4 + 0.6 * intro);
        shapes.forEach((m, i) => {
          const a = t * 0.35 + (i / 3) * Math.PI * 2 + scroll * 1.5;
          m.position.set(Math.cos(a) * r, Math.sin(a * 1.3) * 0.25, Math.sin(a) * r);
          m.rotation.set(0.3, t * 0.5 + i, 0);
        });
        group.rotation.x = 0.28;
        core.scale.setScalar(0.8 + 0.2 * intro + Math.sin(t * 2) * 0.05);
      }
    };
  },

  blog(rand, glass) {
    const group = new Group();
    const pieces = [];
    for (let i = 0; i < 14; i++) {
      const m = new Mesh(shard(rand), glass);
      const s = 0.35 + rand() * 0.55;
      m.scale.setScalar(s);
      m.userData = {
        base: new Vector3((rand() - 0.5) * 5, (rand() - 0.5) * 3, (rand() - 0.5) * 3),
        spin: new Vector3(rand(), rand(), rand()).multiplyScalar(0.6),
        phase: rand() * 6.28
      };
      pieces.push(m);
      group.add(m);
    }
    const sparks = [];
    for (let i = 0; i < 6; i++) {
      const s = glow(0.06, AMBER);
      s.position.set((rand() - 0.5) * 3, (rand() - 0.5) * 2, (rand() - 0.5) * 2);
      sparks.push(s);
      group.add(s);
    }
    return {
      group,
      update(t, intro, scroll) {
        pieces.forEach((m) => {
          const d = m.userData;
          m.position.copy(d.base).multiplyScalar(0.5 + 0.5 * intro);
          m.position.y += Math.sin(t * 0.5 + d.phase) * 0.15 - scroll * 0.8;
          m.rotation.set(t * d.spin.x, t * d.spin.y, t * d.spin.z);
        });
        group.rotation.y = t * 0.05;
      }
    };
  },

  contacto(rand, glass) {
    const group = new Group();
    const a = new Mesh(diamond(rand), glass);
    const b = new Mesh(diamond(rand), glass);
    a.scale.setScalar(0.55); b.scale.setScalar(0.55);
    b.rotation.z = Math.PI;
    const spark = glow(0.12, ORANGE);
    const lineGeo = new BufferGeometry();
    lineGeo.setAttribute("position", new Float32BufferAttribute(new Float32Array(6), 3));
    const link = new Line(lineGeo, new LineBasicMaterial({ color: new Color("#f5a623"), transparent: true, opacity: 0 }));
    group.add(a, b, spark, link);
    return {
      group,
      update(t, intro, scroll) {
        const k = smooth(0.2, 1, intro);
        const gap = 2.6 - k * 1.25 + scroll * 0.6;
        a.position.set(-gap / 2, Math.sin(t * 0.7) * 0.08, 0);
        b.position.set(gap / 2, Math.cos(t * 0.7) * 0.08, 0);
        a.rotation.y = t * 0.3; b.rotation.y = -t * 0.3;
        const attr = lineGeo.attributes.position;
        attr.setXYZ(0, a.position.x, a.position.y, 0);
        attr.setXYZ(1, b.position.x, b.position.y, 0);
        attr.needsUpdate = true;
        link.material.opacity = smooth(0.7, 1, k) * 0.7;
        spark.scale.setScalar(smooth(0.75, 1, k) * (1 + Math.sin(t * 3) * 0.1));
        group.rotation.x = 0.15;
      }
    };
  }
};

export function create(canvas, opts = {}) {
  const variant = VARIANTS[opts.variant] ? opts.variant : "seleccion";
  const rand = rng(variant.length * 7919);
  const { renderer } = makeRenderer(canvas, opts.maxPixelRatio);
  const scene = new Scene();
  const camera = new PerspectiveCamera(38, 1, 0.05, 80);
  const envTex = studioEnvironment(renderer, scene, 0.8);
  const sky = makeSky();
  scene.add(sky);

  const glass = crystalMaterial();
  const v = VARIANTS[variant](rand, glass);
  scene.add(v.group);

  let composer = null;
  if (opts.bloom !== false) {
    composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    composer.addPass(new UnrealBloomPass(new Vector2(256, 256), 0.35, 0.4, 0.95));
    composer.addPass(new OutputPass());
  }

  const offsetX = opts.offsetX || 0;
  const state = { intro: 0, scroll: 0, px: 0, py: 0 };

  function resize() {
    const w = canvas.clientWidth || 1, h = canvas.clientHeight || 1;
    renderer.setSize(w, h, false);
    if (composer) composer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  function render(t) {
    v.update(t, state.intro, state.scroll);
    camera.position.set(-offsetX + state.px * 0.35, 0.3 + state.py * 0.25, 7.5);
    camera.lookAt(-offsetX, 0, 0);
    if (composer) composer.render(); else renderer.render(scene, camera);
  }

  resize();
  return {
    setIntro(x) { state.intro = x; },
    setScroll(x) { state.scroll = x; },
    setPointer(x, y) { state.px = x; state.py = y; },
    resize,
    render,
    dispose() {
      scene.traverse((o) => {
        if (o.geometry) o.geometry.dispose();
        if (o.material && o.material !== glass) o.material.dispose();
      });
      glass.dispose();
      envTex.dispose();
      if (composer) composer.dispose();
      renderer.dispose();
    }
  };
}
