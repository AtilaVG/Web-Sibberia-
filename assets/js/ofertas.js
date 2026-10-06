/* SIBBERIA — ofertas.js
   Las listas [data-ofertas] ya vienen en el HTML (generadas desde
   data/ofertas.json). Aquí se vuelven a leer del JSON en el navegador,
   para que un panel pueda actualizar las ofertas sin regenerar la web.
   Si la petición falla, se queda la lista del HTML. */
(function () {
  "use strict";
  var lists = document.querySelectorAll("[data-ofertas]");
  if (!lists.length || !window.fetch) return;
  var root = lists[0].getAttribute("data-root") || "";

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  var pin = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>';
  var arrow = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>';

  fetch(root + "data/ofertas.json", { cache: "no-cache" })
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(function (data) {
      var abiertas = (data.ofertas || []).filter(function (o) { return o.estado === "abierta"; });
      lists.forEach(function (ul) {
        var limit = parseInt(ul.getAttribute("data-limit"), 10) || abiertas.length;
        ul.innerHTML = abiertas.slice(0, limit).map(function (o) {
          return '<li class="oferta"><a href="' + root + "ofertas-de-trabajo/" + esc(o.slug) + '/">' +
            "<h3>" + esc(o.titulo) + "</h3>" +
            '<p class="oferta-loc">' + pin + "<span>" + esc(o.ubicacion) + "</span></p>" +
            '<span class="oferta-cta">Ver oferta ' + arrow + "</span></a></li>";
        }).join("");
      });
      var count = document.querySelector("[data-ofertas-count]");
      if (count) count.textContent = abiertas.length === 1 ? "1 oferta abierta" : abiertas.length + " ofertas abiertas";
    })
    .catch(function () { /* se mantiene la lista generada */ });
})();
