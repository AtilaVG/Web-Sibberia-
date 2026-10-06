/* SIBBERIA — home.js
   Escena de cubos de hielo (assets/js/hero3d.js) ligada al scroll del
   hero y de los capítulos Compartir → Crear → Crecer.
   Principios:
   - El contenido siempre es visible: aquí no se oculta nada.
   - Sin GSAP, sin WebGL, con ahorro de datos o en móviles poco potentes
     se queda la foto fija (.stage-fallback).
   - El render se pausa fuera de los capítulos y con la pestaña oculta.
   - Con movimiento reducido: un fotograma por capítulo, sin animación. */
(function () {
  "use strict";

  var stage = document.querySelector(".stage");
  var canvas = document.getElementById("ice3d");
  var chapters = document.querySelectorAll(".chapter");
  if (!stage || !canvas || !chapters.length || !window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var desktop = window.matchMedia("(min-width: 881px)").matches;

  function canRun3D() {
    var nav = navigator, conn = nav.connection || {};
    if (conn.saveData) return false;
    if (nav.deviceMemory && nav.deviceMemory < 4) return false;
    var coarse = window.matchMedia("(pointer: coarse)").matches;
    if (coarse && nav.hardwareConcurrency && nav.hardwareConcurrency <= 4) return false;
    try {
      var c = document.createElement("canvas");
      return !!(window.WebGLRenderingContext && (c.getContext("webgl2") || c.getContext("webgl")));
    } catch (e) { return false; }
  }

  if (!canRun3D()) return;

  var first = chapters[0];
  var lema = document.querySelector(".lema");
  var steps = [].slice.call(document.querySelectorAll(".lema-step"));
  var last = lema || chapters[chapters.length - 1];

  // Resalta la columna del paso en el que está la escena (las demás, atenuadas)
  function setActive(p) {
    var idx = Math.min(Math.max(Math.round(p), 1), 3);
    steps.forEach(function (st) { st.classList.toggle("is-active", +st.getAttribute("data-step") === idx); });
  }
  var scene = null, running = false, visible = true, inRange = true;
  var state = { progress: 0, intro: 0 };
  var px = { x: 0, y: 0 };
  var slow = 0, frames = 0, lastT = 0;
  // ?3d=force desactiva la protección de rendimiento (solo para pruebas)
  var force = /[?&]3d=force\b/.test(location.search);

  function fallback() {
    stop();
    if (scene) { scene.dispose(); scene = null; }
    stage.classList.remove("is-3d");
  }

  function tick(time) {
    // Si el dispositivo no llega (frames lentos de forma sostenida), foto fija
    if (lastT) {
      var dt = time - lastT;
      frames++;
      if (dt > 0.06) slow++;
      if (!force && frames === 40 && slow > 24) { fallback(); return; }
    }
    lastT = time;
    scene.setIntro(state.intro);
    scene.setProgress(state.progress);
    scene.setPointer(px.x, -px.y);
    scene.render(time);
  }
  function start() { if (!running && scene) { running = true; lastT = 0; gsap.ticker.add(tick); } }
  function stop() { if (running) { running = false; gsap.ticker.remove(tick); } }
  function sync() { if (visible && inRange && !reduce) start(); else stop(); }

  document.addEventListener("visibilitychange", function () {
    visible = document.visibilityState === "visible";
    sync();
  });

  var s = document.createElement("script");
  s.src = "assets/js/hero3d.js?v=5";
  s.async = true;
  s.onload = function () {
    try {
      scene = SibHero3D.create(canvas, {
        count: desktop ? 27 : 18,
        // en pantallas panorámicas, los cubos más a la derecha para no quedar tras el texto
        offsetX: desktop ? Math.min(2.4 + Math.max(innerWidth / innerHeight - 1.6, 0) * 1.6, 3.6) : 0,
        maxPixelRatio: desktop ? 1.75 : 1.25
      });
    } catch (e) { return; }
    stage.classList.add("is-3d");
    window.addEventListener("resize", function () { if (scene) scene.resize(); });

    if (reduce) {
      // Un fotograma por paso, sin transición
      state.intro = 1;
      [first].concat(steps).forEach(function (el) {
        ScrollTrigger.create({
          trigger: el, start: "top center", end: "bottom center",
          onToggle: function (self) {
            if (!self.isActive || !scene) return;
            scene.setIntro(1);
            scene.setProgress(+(el.getAttribute("data-step") || 0));
            scene.render(0);
          }
        });
      });
      scene.setIntro(1); scene.setProgress(0); scene.render(0);
      return;
    }

    gsap.to(state, { intro: 1, duration: 2.4, ease: "power2.out" });

    lema.classList.add("is-live");
    setActive(1);

    // El progreso de la escena es la SUMA del avance de cada tramo de scroll.
    // (Antes había varios tweens fromTo sobre state.progress: al cargar,
    // ScrollTrigger dejaba aplicado el valor inicial del último —el anillo de
    // «Crear»— hasta que se hacía scroll.) quickTo suaviza como el scrub.
    var tramos = [];
    var toProgress = gsap.quickTo(state, "progress", { duration: 1.2, ease: "power3" });
    function target() {
      return tramos.reduce(function (sum, t) { return sum + t.st.progress * t.weight; }, 0);
    }
    function follow() { toProgress(target()); }
    function snap() { var p = target(); toProgress(p, p); }
    function tramo(vars, weight, extra) {
      vars.onUpdate = extra ? function (self) { follow(); extra(self); } : follow;
      vars.onRefresh = snap;
      var st = ScrollTrigger.create(vars);
      tramos.push({ st: st, weight: weight });
      return st;
    }

    if (desktop) {
      // Del hero al bloque del lema: paso 0 → 1
      tramo({ trigger: lema, start: "top bottom", end: "top top" }, 1);
      // Bloque fijado: el scroll recorre Compartir → Crear → Crecer (1 → 3)
      tramo({ trigger: lema, start: "top top", end: "+=200%", pin: true }, 2,
        function (self) { setActive(1 + self.progress * 2); });
    } else {
      // Móvil: sin fijar; cada paso lleva la escena al suyo al llegar al centro
      steps.forEach(function (st) {
        var step = +st.getAttribute("data-step");
        tramo({ trigger: st, start: "top bottom", end: "center center" }, 1);
        ScrollTrigger.create({
          trigger: st, start: "top center", end: "bottom center",
          onToggle: function (self) { if (self.isActive) setActive(step); }
        });
      });
    }

    // Fuera del hero y del lema la escena queda tapada: se pausa.
    // Se crea después del pin para medir también su espacio.
    ScrollTrigger.create({
      trigger: first, endTrigger: desktop ? lema.parentNode : lema, start: "top bottom", end: "bottom top",
      onToggle: function (self) { inRange = self.isActive; sync(); }
    });
    ScrollTrigger.refresh();

    if (desktop) {
      var toX = gsap.quickTo(px, "x", { duration: 0.9, ease: "power3" });
      var toY = gsap.quickTo(px, "y", { duration: 0.9, ease: "power3" });
      window.addEventListener("mousemove", function (e) {
        toX((e.clientX / window.innerWidth) * 2 - 1);
        toY((e.clientY / window.innerHeight) * 2 - 1);
      }, { passive: true });
    }
    inRange = ScrollTrigger.isInViewport(first) || ScrollTrigger.isInViewport(last) || window.scrollY < last.offsetTop + last.offsetHeight;
    sync();
  };
  document.head.appendChild(s);
})();
