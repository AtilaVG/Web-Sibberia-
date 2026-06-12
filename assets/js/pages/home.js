/* SIBBERIA — home.js
   Constelación de talento (canvas), parallax del deck 3D,
   scrollytelling del proceso de selección */
(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ============ Canvas: constelación de talento ============ */
  var canvas = document.getElementById("net");
  if (canvas && !reduced) {
    var ctx = canvas.getContext("2d");
    var nodes = [], mouse = { x: -9999, y: -9999 };
    var W, H, raf;

    function resize() {
      var r = canvas.parentElement.getBoundingClientRect();
      W = canvas.width = r.width;
      H = canvas.height = r.height;
      var n = Math.min(70, Math.floor((W * H) / 22000));
      nodes = [];
      for (var i = 0; i < n; i++) {
        nodes.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          r: Math.random() * 1.6 + 0.8
        });
      }
    }

    function step() {
      ctx.clearRect(0, 0, W, H);
      var i, j, a, b, d2;
      for (i = 0; i < nodes.length; i++) {
        a = nodes[i];
        a.x += a.vx; a.y += a.vy;
        if (a.x < 0 || a.x > W) a.vx *= -1;
        if (a.y < 0 || a.y > H) a.vy *= -1;
        // leve atracción al ratón
        var dx = mouse.x - a.x, dy = mouse.y - a.y;
        var md2 = dx * dx + dy * dy;
        if (md2 < 28000) { a.x += dx * 0.004; a.y += dy * 0.004; }
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(245,166,35,.6)";
        ctx.fill();
      }
      for (i = 0; i < nodes.length; i++) {
        for (j = i + 1; j < nodes.length; j++) {
          a = nodes[i]; b = nodes[j];
          d2 = (a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y);
          if (d2 < 16900) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = "rgba(255,255,255," + (0.14 * (1 - d2 / 16900)) + ")";
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(step);
    }

    var hero = canvas.closest(".hero");
    if (hero) {
      hero.addEventListener("mousemove", function (e) {
        var r = canvas.getBoundingClientRect();
        mouse.x = e.clientX - r.left;
        mouse.y = e.clientY - r.top;
      });
      hero.addEventListener("mouseleave", function () {
        mouse.x = -9999; mouse.y = -9999;
      });
    }
    window.addEventListener("resize", resize);
    resize();
    step();

    // pausar cuando el hero no es visible
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (en) {
        en.forEach(function (e) {
          if (e.isIntersecting) { if (!raf) raf = requestAnimationFrame(step); }
          else { cancelAnimationFrame(raf); raf = null; }
        });
      }, { threshold: 0 }).observe(canvas);
    }
  }

  /* ============ Deck 3D: parallax + activación ============ */
  var deck = document.getElementById("deck");
  if (deck) {
    setTimeout(function () { deck.classList.add("live"); }, 500);
    if (!reduced) {
      var stage = deck.closest(".stage");
      var heroEl = deck.closest(".hero");
      (heroEl || stage).addEventListener("mousemove", function (e) {
        var r = stage.getBoundingClientRect();
        var rx = ((e.clientY - r.top) / r.height - 0.5) * -10;
        var ry = ((e.clientX - r.left) / r.width - 0.5) * 16;
        deck.style.transform =
          "rotateY(" + (-14 + ry) + "deg) rotateX(" + (7 + rx) + "deg)";
      });
      (heroEl || stage).addEventListener("mouseleave", function () {
        deck.style.transform = "rotateY(-14deg) rotateX(7deg)";
      });
    }
  }

  /* ============ Scrollytelling: proceso ============ */
  var story = document.querySelector(".story");
  var track = document.querySelector(".story-track");
  if (story && track && window.matchMedia("(min-width: 881px)").matches && !reduced) {
    var steps = story.querySelectorAll(".sstep");
    var bar = story.querySelector(".sprog i");
    var callouts = story.querySelectorAll(".callout");

    function update() {
      var r = track.getBoundingClientRect();
      var total = r.height - window.innerHeight;
      var p = Math.min(Math.max(-r.top / total, 0), 1);

      if (bar) bar.style.width = (p * 100) + "%";

      var phase = Math.min(Math.floor(p * 4) + 1, 4);
      story.classList.remove("s1", "s2", "s3", "s4");
      for (var i = 1; i <= phase; i++) story.classList.add("s" + i);

      steps.forEach(function (s, idx) {
        s.classList.toggle("on", idx < phase);
      });

      callouts.forEach(function (c) {
        var range = (c.getAttribute("data-r") || "0,1").split(",");
        c.classList.toggle("show", p >= +range[0] && p <= +range[1]);
      });
    }
    window.addEventListener("scroll", update, { passive: true });
    update();
  } else if (story) {
    // móvil / reduced motion: todo visible
    story.classList.add("s1", "s2", "s3", "s4");
  }
})();
