/* SIBBERIA — core.js
   Nav, burger, overlay, scroll progress, reveal, contadores, marquee, año */
(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Header scrolled ---- */
  var header = document.querySelector("header.site");
  function onScroll() {
    if (header) header.classList.toggle("scrolled", window.scrollY > 24);
    var p = document.getElementById("sprogress");
    if (p) {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      p.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + "%";
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Burger / mobile menu ---- */
  var burger = document.querySelector(".burger");
  var menu = document.querySelector(".mobile-menu");
  var overlay = document.getElementById("overlay");
  function closeMenu() {
    if (burger) burger.classList.remove("open");
    if (menu) menu.classList.remove("open");
    if (overlay) overlay.classList.remove("show");
  }
  if (burger && menu) {
    burger.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      burger.classList.toggle("open", open);
      if (overlay) overlay.classList.toggle("show", open);
    });
    if (overlay) overlay.addEventListener("click", closeMenu);
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeMenu);
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
