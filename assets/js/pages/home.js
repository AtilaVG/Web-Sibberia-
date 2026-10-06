/* SIBBERIA — home.js
   Hero 3D "mercado de talento" guiado por scroll (GSAP + ScrollTrigger),
   entrada orquestada del hero y scrollytelling del proceso de selección.
   Sin GSAP o sin WebGL la página queda completa y estática. */
(function () {
  "use strict";

  var hero = document.getElementById("hero");
  var canvas = document.getElementById("talent3d");
  var story = document.querySelector(".story");

  if (!window.gsap || !window.ScrollTrigger) {
    if (story) story.classList.add("s1", "s2", "s3", "s4");
    return;
  }
  gsap.registerPlugin(ScrollTrigger);

  function hasWebGL() {
    try {
      var c = document.createElement("canvas");
      return !!(window.WebGLRenderingContext && (c.getContext("webgl2") || c.getContext("webgl")));
    } catch (e) { return false; }
  }

  /* Carga diferida de la escena: el texto del hero nunca espera al 3D */
  function loadScene(cb) {
    if (window.SibHero3D) return cb();
    var s = document.createElement("script");
    s.src = "assets/js/hero3d.js?v=1";
    s.async = true;
    s.onload = cb;
    s.onerror = function () { hero.classList.add("no-3d"); };
    document.head.appendChild(s);
  }

  var mm = gsap.matchMedia();

  /* ============ HERO ============ */
  mm.add(
    {
      desktop: "(min-width: 881px)",
      mobile: "(max-width: 880px)",
      reduce: "(prefers-reduced-motion: reduce)"
    },
    function (ctx) {
      var c = ctx.conditions;
      var lines = hero.querySelectorAll("h1 .ln");
      var rest = hero.querySelectorAll(".motto, .sub, .hero-acts, .quick");
      var phases = hero.querySelectorAll(".hero-phases li");
      var scene = null;
      var state = { progress: 0, intro: 0 };
      var alive = true;
      var px = { x: 0, y: 0 };

      function tick(time) {
        scene.setIntro(state.intro);
        scene.setProgress(state.progress);
        scene.setPointer(px.x, -px.y);
        scene.render(time);
      }
      function onMove(e) {
        px.toX((e.clientX / window.innerWidth) * 2 - 1);
        px.toY((e.clientY / window.innerHeight) * 2 - 1);
      }
      function onResize() { if (scene) scene.resize(); }

      if (!c.reduce) {
        // Un único momento orquestado: el titular entra línea a línea
        gsap.from(lines, { yPercent: 60, autoAlpha: 0, duration: 1.1, ease: "power3.out", stagger: 0.12, delay: 0.1 });
        gsap.from(rest, { y: 18, autoAlpha: 0, duration: 0.9, ease: "power2.out", stagger: 0.08, delay: 0.45 });
      }

      if (canvas && hasWebGL()) {
        loadScene(function () {
          if (!alive || !window.SibHero3D) return;
          try {
            scene = SibHero3D.create(canvas, {
              count: c.desktop ? 2400 : 1100,
              offsetX: c.desktop ? 2.6 : 0
            });
          } catch (e) {
            hero.classList.add("no-3d");
            return;
          }
          hero.classList.add("has-3d");
          window.addEventListener("resize", onResize);

          if (c.reduce) {
            // Sin movimiento: un único fotograma con la shortlist ya formada
            scene.setIntro(1);
            scene.setProgress(0.6);
            scene.render(0);
            return;
          }

          // ctx.add registra lo creado aquí (asíncrono) en este matchMedia
          ctx.add(function () {
            gsap.to(state, { intro: 1, duration: 2.4, ease: "power2.out" });

            // Inclinación con el ratón: quickTo reutiliza un solo tween
            px.toX = gsap.quickTo(px, "x", { duration: 0.8, ease: "power3" });
            px.toY = gsap.quickTo(px, "y", { duration: 0.8, ease: "power3" });
            if (c.desktop) hero.addEventListener("mousemove", onMove);

            if (c.desktop) {
              // Escritorio: el hero se fija y el scroll cuenta el proceso
              gsap.timeline({
                scrollTrigger: {
                  trigger: hero,
                  start: "top top",
                  end: "+=150%",
                  pin: true,
                  scrub: 1,
                  onUpdate: function (self) {
                    var p = self.progress;
                    var idx = p < 0.3 ? 0 : p < 0.66 ? 1 : 2;
                    phases.forEach(function (li, i) { li.classList.toggle("on", i === idx && p > 0.04); });
                  }
                }
              })
                .to(state, { progress: 1, ease: "none", duration: 1 }, 0)
                .to(".hero-in", { autoAlpha: 0, y: -40, ease: "power1.in", duration: 0.25 }, 0.3)
                .to(".scroll-cue", { autoAlpha: 0, duration: 0.1 }, 0);
            } else {
              // Móvil: el hero ya ocupa más que la pantalla; sin fijarlo,
              // la escena avanza mientras se sale de ella
              gsap.to(state, {
                progress: 0.62, ease: "none",
                scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 1 }
              });
            }

            // Render solo mientras el hero está en pantalla. Se crea después
            // del pin para medir también el espacio que este añade.
            var visible = ScrollTrigger.create({
              trigger: c.desktop ? hero.parentNode : hero,
              start: "top bottom",
              end: "bottom top",
              onToggle: function (self) {
                if (self.isActive) gsap.ticker.add(tick);
                else gsap.ticker.remove(tick);
              }
            });
            if (visible.isActive) gsap.ticker.add(tick);

            ScrollTrigger.refresh();
          });
        });
      } else {
        hero.classList.add("no-3d");
      }

      // Limpieza al cambiar de breakpoint o de preferencia de movimiento
      return function () {
        alive = false;
        gsap.ticker.remove(tick);
        hero.removeEventListener("mousemove", onMove);
        window.removeEventListener("resize", onResize);
        if (scene) { scene.dispose(); scene = null; }
        hero.classList.remove("has-3d");
        phases.forEach(function (li) { li.classList.remove("on"); });
      };
    }
  );

  /* ============ PROCESO: scrollytelling ============ */
  mm.add("(min-width: 881px) and (prefers-reduced-motion: no-preference)", function () {
    var track = story.querySelector(".story-track");
    var steps = story.querySelectorAll(".sstep");
    var bar = story.querySelector(".sprog i");
    var callouts = story.querySelectorAll(".callout");
    var phase = 0;

    function setPhase(n) {
      if (n === phase) return;
      phase = n;
      story.classList.remove("s1", "s2", "s3", "s4");
      for (var i = 1; i <= n; i++) story.classList.add("s" + i);
      steps.forEach(function (s, idx) { s.classList.toggle("on", idx < n); });
    }

    var st = ScrollTrigger.create({
      trigger: track,
      start: "top top",
      end: "bottom bottom",
      onUpdate: function (self) {
        var p = self.progress;
        gsap.set(bar, { scaleX: p });
        setPhase(Math.min(Math.floor(p * 4) + 1, 4));
        callouts.forEach(function (el) {
          var r = (el.getAttribute("data-r") || "0,1").split(",");
          el.classList.toggle("show", p >= +r[0] && p <= +r[1]);
        });
      }
    });
    setPhase(1);

    return function () {
      st.kill();
      story.classList.add("s1", "s2", "s3", "s4");
      steps.forEach(function (s) { s.classList.add("on"); });
    };
  });

  // Móvil o movimiento reducido: el proceso se muestra completo
  mm.add("(max-width: 880px), (prefers-reduced-motion: reduce)", function () {
    story.classList.add("s1", "s2", "s3", "s4");
  });

  // Las fuentes cambian alturas: recalcular posiciones al cargarlas
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () { ScrollTrigger.refresh(); });
  }
})();
