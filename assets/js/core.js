/* SIBBERIA — core.js
   Nav, menú móvil accesible, progreso de scroll, reveal, contadores, marquee, año */
(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Header scrolled + barra de progreso (una lectura por frame) ---- */
  var header = document.querySelector("header.site");
  var progress = document.getElementById("sprogress");
  var ticking = false;
  function paint() {
    ticking = false;
    var y = window.scrollY;
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    if (header) header.classList.toggle("scrolled", y > 24);
    if (progress) progress.style.transform = "scaleX(" + (max > 0 ? y / max : 0) + ")";
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { ticking = true; requestAnimationFrame(paint); }
  }, { passive: true });
  paint();

  /* ---- Burger / menú móvil ---- */
  var burger = document.querySelector(".burger");
  var menu = document.querySelector(".mobile-menu");
  var overlay = document.getElementById("overlay");
  function setMenu(open) {
    if (!burger || !menu) return;
    menu.classList.toggle("open", open);
    burger.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    burger.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    if (overlay) overlay.classList.toggle("show", open);
    if (open) {
      var first = menu.querySelector("a");
      if (first) setTimeout(function () { first.focus(); }, 50);
    }
  }
  if (burger && menu) {
    burger.addEventListener("click", function () {
      setMenu(!menu.classList.contains("open"));
    });
    if (overlay) overlay.addEventListener("click", function () { setMenu(false); });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { setMenu(false); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("open")) {
        setMenu(false);
        burger.focus();
      }
    });
  }

  /* ---- Reveal on scroll ---- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduced) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.14 }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- Contadores data-count ---- */
  function animateCount(el) {
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    var suffix = el.getAttribute("data-suffix") || "";
    var prefix = el.getAttribute("data-prefix") || "";
    if (reduced) { el.textContent = prefix + target + suffix; return; }
    var dur = 1600, t0 = null;
    function tick(t) {
      if (!t0) t0 = t;
      var k = Math.min((t - t0) / dur, 1);
      k = 1 - Math.pow(1 - k, 3);
      el.textContent = prefix + Math.round(target * k) + suffix;
      if (k < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  var counters = document.querySelectorAll("[data-count]");
  if ("IntersectionObserver" in window) {
    var cio = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            animateCount(e.target);
            cio.unobserve(e.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach(function (el) { cio.observe(el); });
  } else {
    counters.forEach(animateCount);
  }

  /* ---- Marquee: duplicar pista para loop continuo ---- */
  document.querySelectorAll(".marquee").forEach(function (m) {
    var track = m.querySelector(".mtrack");
    if (track && m.children.length === 1) {
      m.appendChild(track.cloneNode(true));
    }
  });

  /* ---- Año en footer ---- */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
