/* SIBBERIA — core.js
   Cabecera, menú móvil accesible, formularios (contacto, candidaturas y
   newsletter) y año del pie. Sin dependencias. */
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

  /* ---- Menú móvil ----
     Abierto: la página de detrás no se desplaza y el foco no sale del menú
     (Tab da la vuelta entre el botón y los enlaces). Escape lo cierra. */
  var burger = document.querySelector(".burger");
  var menu = document.querySelector(".mobile-menu");
  var overlay = document.getElementById("overlay");
  var isOpen = function () { return !!menu && menu.classList.contains("open"); };
  function setMenu(open) {
    if (!burger || !menu) return;
    menu.classList.toggle("open", open);
    burger.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    burger.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    document.documentElement.classList.toggle("menu-open", open);
    if (overlay) overlay.classList.toggle("show", open);
    if (open) {
      var first = menu.querySelector("a");
      if (first) setTimeout(function () { first.focus(); }, 50);
    }
  }
  if (burger && menu) {
    burger.addEventListener("click", function () { setMenu(!isOpen()); });
    if (overlay) overlay.addEventListener("click", function () { setMenu(false); });
    menu.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
    document.addEventListener("keydown", function (e) {
      if (!isOpen()) return;
      if (e.key === "Escape") { setMenu(false); burger.focus(); return; }
      if (e.key !== "Tab") return;
      var items = [burger].concat([].slice.call(menu.querySelectorAll("a")));
      var i = items.indexOf(document.activeElement);
      if (i === -1 || (e.shiftKey && i === 0) || (!e.shiftKey && i === items.length - 1)) {
        e.preventDefault();
        items[e.shiftKey ? (i <= 0 ? items.length - 1 : i - 1) : (i === -1 || i === items.length - 1 ? 0 : i + 1)].focus();
      }
    });
    // si la ventana crece hasta mostrar el menú normal, se cierra el móvil
    var wide = window.matchMedia("(min-width: 1081px)");
    var onWide = function () { if (wide.matches && isOpen()) setMenu(false); };
    if (wide.addEventListener) wide.addEventListener("change", onWide);
  }

  /* ---- Formularios ----
     data-endpoint: URL que recibe un POST con FormData (el CV va adjunto).
     Si está vacío, se prepara el correo con los datos en el programa de
     correo de la persona, en lugar de fingir un envío. */
  var EMAIL = "hola@sibberia.com";
  var MAX_CV = 5 * 1024 * 1024;
  var MSG = {
    nombre: "Escribe tu nombre.",
    email: "Escribe un email válido, por ejemplo nombre@empresa.com.",
    telefono: "Escribe un teléfono de contacto (al menos 9 cifras).",
    mensaje: "Cuéntanos brevemente qué necesitas.",
    privacidad: "Necesitamos que aceptes la política de privacidad para poder responderte.",
    cv: "Adjunta tu CV en PDF o Word (máximo 5 MB)."
  };
  var OK = {
    contacto: "Gracias, hemos recibido tu mensaje. Te responderemos lo antes posible.",
    candidatura: "Gracias, hemos recibido tu candidatura.",
    newsletter: "Listo: te has suscrito a la newsletter."
  };

  function errorBox(el) {
    var field = el.closest(".ffield");
    return field && field.querySelector(".ferr");
  }

  function fieldError(input, text) {
    input.setAttribute("aria-invalid", text ? "true" : "false");
    var box = errorBox(input);
    if (box) box.textContent = text || "";
  }

  function fileOk(el) {
    var f = el.files && el.files[0];
    return !!f && f.size <= MAX_CV && /\.(pdf|docx?)$/i.test(f.name);
  }

  // Teléfono: al menos 9 cifras, admite espacios, guiones, paréntesis y prefijo +
  function telOk(el) {
    return el.value.replace(/\D/g, "").length >= 9;
  }

  function validate(form) {
    var first = null, problems = [];
    form.querySelectorAll("input[required], textarea[required], select[required]").forEach(function (el) {
      var ok = el.type === "checkbox" ? el.checked
        : el.type === "file" ? fileOk(el)
        : el.type === "tel" ? telOk(el)
        : el.checkValidity() && el.value.trim() !== "";
      var text = ok ? "" : (MSG[el.name] || "Revisa este campo.");
      fieldError(el, text);
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

  // Sin servidor: correo preparado con los datos (el CV hay que adjuntarlo a mano)
  function mailto(form, kind) {
    var data = new FormData(form), lines = [];
    var campos = kind === "candidatura"
      ? [["oferta", "Oferta"], ["nombre", "Nombre"], ["email", "Email"], ["telefono", "Teléfono"]]
      : [["perfil", "Escribo como"], ["nombre", "Nombre"], ["empresa", "Empresa"], ["email", "Email"], ["telefono", "Teléfono"]];
    campos.forEach(function (f) {
      var v = data.get(f[0]);
      if (v) lines.push(f[1] + ": " + v);
    });
    lines.push("", data.get("mensaje") || "");
    var subject;
    if (kind === "candidatura") {
      lines.push("", "(Adjunto mi CV.)");
      subject = "Candidatura: " + (data.get("oferta") || "candidatura espontánea");
    } else {
      subject = "Contacto web" + (data.get("empresa") ? " — " + data.get("empresa") : "");
    }
    window.location.href = "mailto:" + EMAIL + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(lines.join("\n"));
    setStatus(form, kind === "candidatura"
      ? "Hemos preparado el correo con tus datos: adjunta tu CV y envíalo. Si no se ha abierto, escríbenos a " + EMAIL + "."
      : "Hemos preparado el mensaje en tu programa de correo; solo tienes que enviarlo. Si no se ha abierto, escríbenos a " + EMAIL + ".", "ok");
  }

  document.querySelectorAll("form[data-form]").forEach(function (form, n) {
    // cada campo, enlazado con su caja de error (para lectores de pantalla),
    // sin perder la ayuda que ya tuviera (p. ej. «PDF o Word, máximo 5 MB»)
    form.querySelectorAll(".ffield").forEach(function (field, i) {
      var input = field.querySelector("input, textarea, select"), box = field.querySelector(".ferr");
      if (!input || !box) return;
      if (!box.id) box.id = "err-" + n + "-" + i;
      var prev = input.getAttribute("aria-describedby");
      input.setAttribute("aria-describedby", prev ? prev + " " + box.id : box.id);
    });
    // el CV se revisa en cuanto se elige
    form.querySelectorAll('input[type="file"]').forEach(function (el) {
      el.addEventListener("change", function () { fieldError(el, fileOk(el) ? "" : MSG.cv); });
    });
    // contacto: si escribe un candidato, se le indica dónde enviar el CV
    var aviso = form.querySelector("[data-solo-candidato]");
    if (aviso) {
      var sync = function () {
        var r = form.querySelector('input[name="perfil"]:checked');
        aviso.hidden = !r || r.value !== "candidato";
      };
      form.addEventListener("change", sync);
      sync();
    }

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
      if (!endpoint) { mailto(form, kind); return; }

      button.disabled = true;
      setStatus(form, "Enviando…", "");
      fetch(endpoint, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } })
        .then(function (r) {
          if (!r.ok) throw new Error("HTTP " + r.status);
          form.reset();
          setStatus(form, OK[kind] || OK.contacto, "ok");
        })
        .catch(function () {
          setStatus(form, "No hemos podido enviar el formulario. Inténtalo de nuevo o escríbenos a " + EMAIL + ".", "err");
        })
        .then(function () { button.disabled = false; });
    });
  });

  /* ---- Pie: en móvil, listas largas plegadas (siguen siendo enlaces normales).
     En pantallas anchas las columnas van siempre abiertas: el título no pliega
     (tampoco con teclado). ---- */
  var narrow = window.matchMedia("(max-width: 640px)");
  var footCols = document.querySelectorAll("footer details.foot-col");
  if (narrow.matches) {
    document.querySelectorAll("footer details[data-collapse]").forEach(function (d) { d.open = false; });
  }
  footCols.forEach(function (d) {
    var s = d.querySelector("summary");
    s.addEventListener("click", function (e) { if (!narrow.matches) e.preventDefault(); });
  });
  var syncFoot = function () {
    footCols.forEach(function (d) {
      d.querySelector("summary").tabIndex = narrow.matches ? 0 : -1;
      if (!narrow.matches) d.open = true;
    });
  };
  syncFoot();
  if (narrow.addEventListener) narrow.addEventListener("change", syncFoot);

  /* ---- Año en el pie ---- */
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
