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

  /* Tipografía gigante: se desplaza con el scroll (solo transform) */
  if (!reduce) {
    document.querySelectorAll(".chapter .word").forEach(function (el, i) {
      gsap.fromTo(el, { xPercent: i % 2 ? 8 : -8 }, {
        xPercent: i % 2 ? -8 : 8, ease: "none",
        scrollTrigger: { trigger: el.closest(".chapter"), start: "top bottom", end: "bottom top", scrub: true }
      });
    });
  }

  if (!canRun3D()) return;

  var first = chapters[0], last = chapters[chapters.length - 1];
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
  s.src = "assets/js/hero3d.js?v=3";
  s.async = true;
  s.onload = function () {
    try {
      scene = SibHero3D.create(canvas, {
        count: desktop ? 27 : 18,
        offsetX: desktop ? 2.4 : 0,
        maxPixelRatio: desktop ? 1.75 : 1.25
      });
    } catch (e) { return; }
    stage.classList.add("is-3d");
    window.addEventListener("resize", function () { if (scene) scene.resize(); });

    if (reduce) {
      // Un fotograma por capítulo, sin transición
      state.intro = 1;
      chapters.forEach(function (ch) {
        ScrollTrigger.create({
          trigger: ch, start: "top center", end: "bottom center",
          onToggle: function (self) {
            if (!self.isActive || !scene) return;
            scene.setIntro(1);
            scene.setProgress(+ch.getAttribute("data-step"));
            scene.render(0);
          }
        });
      });
      scene.setIntro(1); scene.setProgress(0); scene.render(0);
      return;
    }

    gsap.to(state, { intro: 1, duration: 2.4, ease: "power2.out" });

    // Cada capítulo lleva la escena de su paso anterior al suyo mientras
    // entra en pantalla: la formación está completa cuando su texto llega
    // al centro (Compartir = 1, Crear = 2, Crecer = 3)
    chapters.forEach(function (ch) {
      var step = +ch.getAttribute("data-step");
      if (!step) return;
      gsap.fromTo(state, { progress: step - 1 }, {
        progress: step, ease: "none", immediateRender: false,
        scrollTrigger: { trigger: ch, start: "top bottom", end: "center center", scrub: 1.2 }
      });
    });

    // Fuera de los capítulos la escena queda tapada: se pausa
    ScrollTrigger.create({
      trigger: first, endTrigger: last, start: "top bottom", end: "bottom top",
      onToggle: function (self) { inRange = self.isActive; sync(); }
    });

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
