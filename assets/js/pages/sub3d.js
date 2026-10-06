/* SIBBERIA — sub3d.js
   Pieza de cristal 3D en la cabecera de las subpáginas. La variante se
   elige con data-scene en .phero. Sin GSAP, sin WebGL o con movimiento
   reducido la cabecera queda como siempre (o con un fotograma fijo). */
(function () {
  "use strict";

  var hero = document.querySelector(".phero[data-scene]");
  if (!hero || !window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);

  function hasWebGL() {
    try {
      var c = document.createElement("canvas");
      return !!(window.WebGLRenderingContext && (c.getContext("webgl2") || c.getContext("webgl")));
    } catch (e) { return false; }
  }
  if (!hasWebGL()) return;

  var canvas = document.createElement("canvas");
  canvas.className = "phero-3d";
  canvas.setAttribute("aria-hidden", "true");
  hero.insertBefore(canvas, hero.firstChild);

  function loadScene(cb) {
    if (window.SibAccent3D) return cb();
    var s = document.createElement("script");
    s.src = "../assets/js/accent3d.js?v=1";
    s.async = true;
    s.onload = cb;
    document.head.appendChild(s);
  }

  var mm = gsap.matchMedia();
  mm.add(
    {
      desktop: "(min-width: 881px)",
      mobile: "(max-width: 880px)",
      reduce: "(prefers-reduced-motion: reduce)"
    },
    function (ctx) {
      var c = ctx.conditions;
      var scene = null, alive = true;
      var state = { intro: 0, scroll: 0 };
      var px = { x: 0, y: 0 };

      function tick(time) {
        scene.setIntro(state.intro);
        scene.setScroll(state.scroll);
        scene.setPointer(px.x, -px.y);
        scene.render(time);
      }
      function onMove(e) {
        px.toX((e.clientX / window.innerWidth) * 2 - 1);
        px.toY((e.clientY / window.innerHeight) * 2 - 1);
      }
      function onResize() { if (scene) scene.resize(); }

      loadScene(function () {
        if (!alive || !window.SibAccent3D) return;
        try {
          scene = SibAccent3D.create(canvas, {
            variant: hero.getAttribute("data-scene"),
            offsetX: c.desktop ? 2.4 : 0,
            bloom: c.desktop,
            maxPixelRatio: c.desktop ? 2 : 1.5
          });
        } catch (e) { return; }
        hero.classList.add("has-3d");
        window.addEventListener("resize", onResize);

        if (c.reduce) {
          scene.setIntro(1);
          scene.render(0);
          return;
        }

        ctx.add(function () {
          gsap.to(state, { intro: 1, duration: 2.2, ease: "power2.out", delay: 0.15 });
          gsap.to(state, {
            scroll: 1, ease: "none",
            scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 1 }
          });
          px.toX = gsap.quickTo(px, "x", { duration: 0.8, ease: "power3" });
          px.toY = gsap.quickTo(px, "y", { duration: 0.8, ease: "power3" });
          if (c.desktop) hero.addEventListener("mousemove", onMove);

          var visible = ScrollTrigger.create({
            trigger: hero,
            start: "top bottom",
            end: "bottom top",
            onToggle: function (self) {
              if (self.isActive) gsap.ticker.add(tick);
              else gsap.ticker.remove(tick);
            }
          });
          if (visible.isActive) gsap.ticker.add(tick);
        });
      });

      return function () {
        alive = false;
        gsap.ticker.remove(tick);
        hero.removeEventListener("mousemove", onMove);
        window.removeEventListener("resize", onResize);
        if (scene) { scene.dispose(); scene = null; }
        hero.classList.remove("has-3d");
      };
    }
  );
})();
