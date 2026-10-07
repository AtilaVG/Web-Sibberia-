/* SIBBERIA — ofertas.js
   Las listas [data-ofertas] ya vienen en el HTML (generadas desde
   data/ofertas.json). Aquí se vuelven a leer del JSON en el navegador,
   para que un panel pueda actualizar las ofertas sin regenerar la web,
   y se activan los filtros por familia y zona (reflejados en la URL:
   ?familia=…&zona=…). Si la petición falla, se queda la lista del HTML. */
(function () {
  "use strict";
  var lists = document.querySelectorAll("[data-ofertas]");
  if (!lists.length) return;
  var root = lists[0].getAttribute("data-root") || "";
  var filtros = document.querySelector("[data-filtros]");
  var count = document.querySelector("[data-ofertas-count]");
  var empty = document.querySelector("[data-ofertas-empty]");
  var state = { area: "", zona: "" };

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  var pin = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>';
  var arrow = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>';

  function render(ofertas, nombres) {
    lists.forEach(function (ul) {
      var limit = parseInt(ul.getAttribute("data-limit"), 10) || ofertas.length;
      var h = ul.getAttribute("data-h") || "h3";
      ul.innerHTML = ofertas.slice(0, limit).map(function (o) {
        var area = nombres[o.area];
        return '<li class="oferta" data-area="' + esc(o.area || "") + '" data-zona="' + esc(o.ubicacion) + '">' +
          '<a href="' + root + "ofertas-de-trabajo/" + esc(o.slug) + '/">' +
          '<div class="oferta-main"><' + h + ">" + esc(o.titulo) + "</" + h + ">" +
          (area ? '<span class="tag">' + esc(area) + "</span>" : "") + "</div>" +
          '<p class="oferta-loc">' + pin + "<span>" + esc(o.ubicacion) + "</span></p>" +
          '<span class="oferta-cta">Ver oferta ' + arrow + "</span></a></li>";
      }).join("");
    });
    apply();
  }

  /* ---- Filtros ---- */
  function apply() {
    if (!filtros) return;
    var shown = 0;
    lists.forEach(function (ul) {
      ul.querySelectorAll(".oferta").forEach(function (li) {
        var ok = (!state.area || li.getAttribute("data-area") === state.area) &&
                 (!state.zona || li.getAttribute("data-zona") === state.zona);
        li.hidden = !ok;
        if (ok) shown++;
      });
    });
    filtros.querySelectorAll("button[data-f]").forEach(function (b) {
      b.setAttribute("aria-pressed", state[b.getAttribute("data-f")] === b.getAttribute("data-v") ? "true" : "false");
    });
    if (count) count.textContent = shown === 1 ? "1 oferta abierta" : shown + " ofertas abiertas";
    if (empty) empty.hidden = shown > 0;
    var params = new URLSearchParams(location.search);
    ["area", "zona"].forEach(function (k) {
      var key = k === "area" ? "familia" : "zona";
      if (state[k]) params.set(key, state[k]); else params.delete(key);
    });
    var qs = params.toString();
    history.replaceState(null, "", location.pathname + (qs ? "?" + qs : "") + location.hash);
  }

  if (filtros) {
    var params = new URLSearchParams(location.search);
    // solo valores que existen como filtro (un enlace antiguo no deja la lista vacía)
    var valid = function (f, v) {
      return [].some.call(filtros.querySelectorAll('button[data-f="' + f + '"]'), function (b) { return b.getAttribute("data-v") === v; }) ? v : "";
    };
    state.area = valid("area", params.get("familia") || "");
    state.zona = valid("zona", params.get("zona") || "");
    filtros.hidden = false;
    filtros.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-f]");
      if (!b) return;
      state[b.getAttribute("data-f")] = b.getAttribute("data-v");
      apply();
    });
    var reset = document.querySelector("[data-reset]");
    if (reset) reset.addEventListener("click", function () { state.area = ""; state.zona = ""; apply(); });
    apply();
  }

  if (!window.fetch) return;
  Promise.all([
    fetch(root + "data/ofertas.json", { cache: "no-cache" }).then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); }),
    fetch(root + "data/areas.json").then(function (r) { return r.ok ? r.json() : { areas: [] }; }).catch(function () { return { areas: [] }; })
  ]).then(function (res) {
    var nombres = {};
    (res[1].areas || []).forEach(function (a) { nombres[a.slug] = a.nombre; });
    render((res[0].ofertas || []).filter(function (o) { return o.estado === "abierta"; }), nombres);
  }).catch(function () { /* se mantiene la lista generada */ });
})();
