/* SIBBERIA — core.js
   Cabecera, menú móvil accesible, formularios (contacto y newsletter)
   y año del pie. Sin dependencias. */
(function () {
  "use strict";

  /* ---- Cabecera: fondo azul al hacer scroll (una lectura por frame) ---- */
  var header = document.querySelector("header.site");
  var ticking = false;
  function paint() {
    ticking = false;
    if (header) header.classList.toggle("scrolled", window.scrollY > 24);
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { ticking = true; requestAnimationFrame(paint); }
  }, { passive: true });
  paint();

  /* ---- Menú móvil ---- */
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
    burger.addEventListener("click", function () { setMenu(!menu.classList.contains("open")); });
    if (overlay) overlay.addEventListener("click", function () { setMenu(false); });
    menu.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("open")) { setMenu(false); burger.focus(); }
    });
  }

  /* ---- Formularios ----
     data-endpoint: URL que recibe un POST con FormData. Si está vacío,
     el formulario lo dice en lugar de fingir un envío. */
  var EMAIL = "hola@sibberia.com";
  var MSG = {
    nombre: "Escribe tu nombre.",
    email: "Escribe un email válido, por ejemplo nombre@empresa.com.",
    mensaje: "Cuéntanos brevemente qué necesitas.",
    privacidad: "Necesitamos que aceptes la política de privacidad para poder responderte."
  };

  function fieldError(form, input, text) {
    input.setAttribute("aria-invalid", text ? "true" : "false");
    var id = input.getAttribute("aria-describedby");
    var box = id && form.querySelector("#" + id);
    if (box && box.classList.contains("ferr")) box.textContent = text || "";
  }

  function validate(form) {
    var first = null, problems = [];
    form.querySelectorAll("input[required], textarea[required]").forEach(function (el) {
      var ok = el.type === "checkbox" ? el.checked : el.checkValidity() && el.value.trim() !== "";
      var text = ok ? "" : (MSG[el.name] || "Revisa este campo.");
      fieldError(form, el, text);
      if (!ok) { problems.push(text); if (!first) first = el; }
    });
    return { first: first, problems: problems };
  }

  function setStatus(form, text, kind) {
    var s = form.querySelector(".form-status");
    if (!s) return;
    s.textContent = text;
    s.className = "form-status" + (kind ? " " + kind : "");
  }

  document.querySelectorAll("form[data-form]").forEach(function (form) {
    // enlaza cada campo con su caja de error si existe
    ["name", "email", "msg"].forEach(function (k) {
      var input = form.querySelector("#f-" + k), box = form.querySelector("#e-" + k);
      if (input && box) input.setAttribute("aria-describedby", box.id);
    });
    var kind = form.getAttribute("data-form");
    var button = form.querySelector('button[type="submit"]');

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var v = validate(form);
      if (v.first) {
        setStatus(form, v.problems.length > 1 ? "Revisa los campos marcados." : v.problems[0], "err");
        v.first.focus();
        return;
      }
      // honeypot: los bots rellenan el campo oculto; respondemos sin enviar
      var hp = form.querySelector('input[name="website"]');
      if (hp && hp.value) { form.reset(); setStatus(form, "Gracias.", "ok"); return; }

      var endpoint = form.getAttribute("data-endpoint");
      if (!endpoint) {
        setStatus(form, "El envío online aún no está activo. Escríbenos a " + EMAIL + " y te responderemos.", "err");
        return;
      }
      button.disabled = true;
      setStatus(form, "Enviando…", "");
      fetch(endpoint, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } })
        .then(function (r) {
          if (!r.ok) throw new Error("HTTP " + r.status);
          form.reset();
          setStatus(form, kind === "newsletter"
            ? "Listo: te has suscrito a la newsletter."
            : "Gracias, hemos recibido tu mensaje. Te responderemos lo antes posible.", "ok");
        })
        .catch(function () {
          setStatus(form, "No hemos podido enviar el formulario. Inténtalo de nuevo o escríbenos a " + EMAIL + ".", "err");
        })
        .then(function () { button.disabled = false; });
    });
  });

  /* ---- Año en el pie ---- */
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
