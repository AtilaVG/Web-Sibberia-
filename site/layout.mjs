/* SIBBERIA — plantilla común de todas las páginas.
   Cabecera, pie, metadatos (canonical, Open Graph, Twitter), JSON-LD
   y scripts. Las rutas a recursos son relativas para que el sitio
   funcione igual en github.io (subcarpeta) y en sibberia.com (raíz). */

export const esc = (s) => String(s ?? "")
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export const NAV = [
  { href: "seleccion-personas/", label: "Selección", full: "Selección de personas" },
  { href: "estrategia-y-gestion-del-capital-humano/", label: "Estrategia", full: "Estrategia y gestión del capital humano" },
  { href: "formacion-y-desarrollo-de-personas/", label: "Formación", full: "Formación y desarrollo de personas" },
  { href: "ofertas-de-trabajo/", label: "Ofertas de trabajo", full: "Ofertas de trabajo" },
  { href: "nosotros/", label: "Nosotros", full: "Nosotros" },
  { href: "blog/", label: "Blog", full: "Blog" }
];

export const icon = {
  arrow: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>',
  pin: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  mail: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
  phone: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></svg>'
};

/* Imagen responsive en WebP con alt y carga diferida */
export function picture(root, { name, widths, alt, eager = false, sizes = "100vw", cls = "" }) {
  const srcset = widths.map((w) => `${root}assets/img/${name}-${w}.webp ${w}w`).join(", ");
  const w = widths[0], h = Math.round(w * 9 / 16);
  return `<img class="${cls}" src="${root}assets/img/${name}-${w}.webp" srcset="${srcset}" sizes="${sizes}" width="${w}" height="${h}" alt="${esc(alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
}

function header(root, active) {
  const links = NAV.map((n) =>
    `<li><a href="${root}${n.href}"${active === n.href ? ' aria-current="page"' : ""}>${n.label}</a></li>`).join("");
  const mobile = NAV.map((n) =>
    `<a href="${root}${n.href}"${active === n.href ? ' aria-current="page"' : ""}>${n.full}</a>`).join("");
  return `<a class="skip" href="#main">Saltar al contenido</a>
<header class="site">
  <nav class="wrap" aria-label="Principal">
    <a class="logo" href="${root}" aria-label="Sibberia, inicio"><img src="${root}assets/img/sibberia-logo-blanco.svg" width="154" height="28" alt="Sibberia"></a>
    <ul class="nav-links">${links}</ul>
    <div class="nav-r">
      <a class="btn btn-primary btn-sm" href="${root}contacto/">Contacto</a>
      <button class="burger" type="button" aria-label="Abrir menú" aria-expanded="false" aria-controls="mobile-menu"><span></span><span></span><span></span></button>
    </div>
  </nav>
</header>
<nav class="mobile-menu" id="mobile-menu" aria-label="Menú móvil">${mobile}<a class="btn btn-primary" href="${root}contacto/">Contacto</a></nav>
<div id="overlay"></div>`;
}

function footer(root, cfg) {
  const tels = cfg.telefonos.map((t) => `<li><a href="tel:${t.tel}">${t.texto}</a></li>`).join("");
  const links = NAV.map((n) => `<li><a href="${root}${n.href}">${n.full}</a></li>`).join("");
  return `<footer class="site">
  <div class="wrap">
    <div class="foot-grid">
      <div class="foot-brand">
        <a class="logo" href="${root}"><img src="${root}assets/img/sibberia-logo-blanco.svg" width="154" height="28" alt="Sibberia" loading="lazy"></a>
        <p class="foot-motto" translate="no">${cfg.lema}</p>
        <form class="newsletter" data-form="newsletter" data-endpoint="${esc(cfg.formularios.newsletter)}" novalidate>
          <h2 class="foot-h" id="nl-title">Newsletter</h2>
          <div class="nl-row">
            <label class="sr-only" for="nl-email">Tu email</label>
            <input id="nl-email" name="email" type="email" required autocomplete="email" spellcheck="false" placeholder="tu@email.com" aria-describedby="nl-status">
            <button class="btn btn-primary btn-sm" type="submit">Suscribirme</button>
          </div>
          <label class="check"><input type="checkbox" name="privacidad" required> <span>He leído y acepto la <a href="${root}legal/#privacidad">política de privacidad</a>.</span></label>
          <div class="hp" aria-hidden="true"><label>No rellenar <input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>
          <p class="form-status" id="nl-status" role="status" aria-live="polite"></p>
        </form>
      </div>
      <div><h2 class="foot-h">Sibberia</h2><ul>${links}</ul></div>
      <div><h2 class="foot-h">Contacto</h2><ul><li><a href="mailto:${cfg.email}">${cfg.email}</a></li>${tels}<li><a href="${root}contacto/">Formulario de contacto</a></li></ul></div>
    </div>
    <div class="foot-bot">
      <p>© <span data-year>2026</span> Sibberia</p>
      <p><a href="${root}legal/">Aviso legal</a> · <a href="${root}legal/#privacidad">Privacidad</a> · <a href="${root}legal/#cookies">Cookies</a></p>
    </div>
  </div>
</footer>`;
}

export function organization(cfg, url) {
  return {
    "@type": "ProfessionalService",
    "@id": `${url}/#organizacion`,
    name: "Sibberia",
    url: `${url}/`,
    logo: `${url}/assets/img/sibberia-logo-azul.svg`,
    image: `${url}/assets/img/og-sibberia.jpg`,
    email: cfg.email,
    telephone: cfg.telefonos.map((t) => t.tel),
    slogan: "Compartir, crear, crecer",
    areaServed: { "@type": "Country", name: "España" },
    knowsAbout: NAV.slice(0, 3).map((n) => n.full)
  };
}

export function breadcrumbs(url, crumbs) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem", position: i + 1, name: c.name, item: `${url}/${c.path}`
    }))
  };
}

export function page(p, cfg) {
  const url = cfg.siteUrl;
  const depth = p.path ? p.path.split("/").filter(Boolean).length : 0;
  // 404.html se sirve en cualquier ruta: necesita enlaces absolutos
  const root = p.absoluteRoot ? `${url}/` : depth ? "../".repeat(depth) : "";
  const canonical = `${url}/${p.file ? "" : p.path}`;
  const image = `${url}/assets/img/${p.image || "og-sibberia.jpg"}`;
  const graph = [...(p.jsonld || [])];
  if (p.crumbs) graph.push(breadcrumbs(url, p.crumbs));
  const ld = graph.length ? `<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@graph": graph })}</script>` : "";
  const scripts = (p.scripts || []).map((s) => `<script src="${root}${s}" defer></script>`).join("\n");
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(p.title)}</title>
  <meta name="description" content="${esc(p.description)}">
  ${p.noindex ? '<meta name="robots" content="noindex">' : ""}
  <meta name="theme-color" content="#22358B">
  <link rel="canonical" href="${canonical}">
  <meta property="og:type" content="${p.ogType || "website"}">
  <meta property="og:site_name" content="Sibberia">
  <meta property="og:locale" content="es_ES">
  <meta property="og:title" content="${esc(p.ogTitle || p.title)}">
  <meta property="og:description" content="${esc(p.description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${image}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="Bloques de madera con figuras de personas; una mano elige uno. Logotipo de Sibberia.">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(p.ogTitle || p.title)}">
  <meta name="twitter:description" content="${esc(p.description)}">
  <meta name="twitter:image" content="${image}">
  <link rel="icon" href="${root}assets/img/favicon.svg" type="image/svg+xml">
  <link rel="preload" href="${root}assets/fonts/titillium-web-latin-700-normal.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="${root}assets/fonts/mulish-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="${root}assets/css/base.css?v=4">
  ${(p.css || []).map((c) => `<link rel="stylesheet" href="${root}assets/css/${c}?v=4">`).join("\n  ")}
  ${p.head || ""}
  ${ld}
</head>
<body class="${p.bodyClass || ""}">
${header(root, p.nav)}
<main id="main">
${p.body(root)}
</main>
${footer(root, cfg)}
<script src="${root}assets/js/core.js?v=4" defer></script>
${scripts}
</body>
</html>
`;
}
