/* SIBBERIA — contenido de las páginas.
   Regla de contenido: solo datos verificados en sibberia.com o facilitados
   por el cliente. Cualquier texto redactado para esta web está listado en
   docs/textos-para-validar.md. */
import { esc, icon, picture, organization, NAV, telTxt } from "./layout.mjs";

const SERVICIOS = [
  {
    path: "seleccion-personas/",
    nombre: "Selección de personas",
    corto: "Selección",
    foto: { name: "bloques-personas", widths: [960, 1600], alt: "Una mano elige un bloque de madera con la figura de una persona entre varios bloques iguales." },
    resumen: "Especialistas en perfiles técnicos e industriales: buscamos y evaluamos a los profesionales que tu empresa necesita, para su puesto y para su equipo.",
    intro: "Especialistas en selección de perfiles técnicos e industriales: mantenimiento, producción, calidad, logística, ingeniería, automatización y programación. Trabajamos a éxito y diseñamos cada proceso a medida."
  },
  {
    path: "estrategia-y-gestion-del-capital-humano/",
    nombre: "Estrategia y gestión del capital humano",
    corto: "Estrategia",
    foto: { name: "equipo-colaborando", widths: [640, 960], alt: "Equipo de seis personas revisa en un portátil un proyecto común alrededor de una mesa." },
    resumen: "Te ayudamos a definir y gestionar la estrategia de personas de tu organización.",
    intro: "Acompañamos a la dirección y al área de personas en la estrategia y la gestión del capital humano, con proyectos diseñados a medida de cada organización."
  },
  {
    path: "formacion-y-desarrollo-de-personas/",
    nombre: "Formación y desarrollo de personas",
    corto: "Formación",
    foto: { name: "formacion-sesion", widths: [640, 960], alt: "Formador sentado en una mesa habla con un grupo de profesionales en una sala luminosa." },
    resumen: "Diseñamos formación para que las personas de tu equipo desarrollen todo su potencial.",
    intro: "Diseñamos e impartimos programas de formación y desarrollo a la medida de las necesidades de cada equipo."
  }
];

const CIFRAS = [
  { valor: "+15", texto: "años de experiencia" },
  { valor: "+20", texto: "consultores especializados" },
  { valor: "100%", texto: "proyectos a medida" }
];

const VALORES = [
  { nombre: "Humildad", texto: "Escuchamos antes de proponer y aprendemos de cada empresa y de cada persona." },
  { nombre: "Integridad", texto: "Decimos lo que hacemos y hacemos lo que decimos, con transparencia en cada proceso." },
  { nombre: "Excelencia", texto: "Cuidamos cada detalle del proceso para que el resultado sea el que necesitas." }
];

const cifrasHTML = (cls = "") => `<dl class="cifras ${cls}">${CIFRAS.map((c) =>
  `<div><dt>${c.texto}</dt><dd>${c.valor}</dd></div>`).join("")}</dl>`;

/* Iconos de línea por familia de perfiles (24×24, trazo) */
const AREA_ICON = {
  "mantenimiento-y-sat": '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
  "produccion": '<path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M17 18h1M12 18h1M7 18h1"/>',
  "calidad-prl-medioambiente": '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
  "almacen-logistica-planificacion-compras": '<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/>',
  "ingenieria-y-proyectos": '<path d="M12 2v4"/><circle cx="12" cy="8" r="2"/><path d="m10.5 9.8-6 11.2M13.5 9.8l6 11.2M6 17h12"/>',
  "automatizacion-y-robotica": '<rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4M8 16h.01M16 16h.01"/>',
  "programadores": '<path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/>'
};
const areaIcon = (slug) => `<svg class="area-ico" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${AREA_ICON[slug] || AREA_ICON.produccion}</svg>`;

let AREA_NAMES = {};

/* Formulario «Envíanos tu CV». Con destino configurado (formularios.candidaturas)
   se adjunta el CV; sin él, se prepara un correo y se pide adjuntarlo. */
function cvForm(root, cfg, { id, oferta = null, ofertas = [], areas = [] }) {
  const endpoint = cfg.formularios.candidaturas || "";
  const sinJs = endpoint
    ? `action="${esc(endpoint)}" method="post" enctype="multipart/form-data"`
    : `action="mailto:${cfg.email}" method="post" enctype="text/plain"`;
  const nombreOferta = (o) => `${o.titulo} (${o.ubicacion})`;
  return `<form class="cform cvform" data-form="candidatura" data-endpoint="${esc(endpoint)}" ${sinJs} novalidate>
      ${oferta ? `<input type="hidden" name="oferta" value="${esc(nombreOferta(oferta))}">` : `<div class="frow">
        <div class="ffield"><label for="${id}-oferta">Oferta</label><select id="${id}-oferta" name="oferta">
          <option value="">Candidatura espontánea</option>
          ${ofertas.map((o) => `<option value="${esc(nombreOferta(o))}">${esc(o.titulo)} · ${esc(o.ubicacion)}</option>`).join("")}
        </select></div>
        <div class="ffield"><label for="${id}-familia">Familia profesional</label><select id="${id}-familia" name="familia">
          <option value="">Elige una (opcional)</option>
          ${areas.map((a) => `<option>${esc(a.nombre)}</option>`).join("")}
        </select></div>
      </div>`}
      <div class="frow">
        <div class="ffield"><label for="${id}-name">Nombre y apellidos *</label><input id="${id}-name" name="nombre" type="text" required autocomplete="name"><p class="ferr"></p></div>
        <div class="ffield"><label for="${id}-email">Email *</label><input id="${id}-email" name="email" type="email" required autocomplete="email" spellcheck="false" inputmode="email"><p class="ferr"></p></div>
      </div>
      <div class="frow">
        <div class="ffield"><label for="${id}-phone">Teléfono</label><input id="${id}-phone" name="telefono" type="tel" autocomplete="tel" inputmode="tel"></div>
        ${endpoint ? `<div class="ffield"><label for="${id}-cv">Tu CV (PDF o Word, máx. 5&nbsp;MB) *</label><input id="${id}-cv" name="cv" type="file" required accept=".pdf,.doc,.docx,.odt"><p class="ferr"></p></div>` : ""}
      </div>
      <div class="ffield"><label for="${id}-msg">Cuéntanos algo de ti (opcional)</label><textarea id="${id}-msg" name="mensaje" rows="4"></textarea></div>
      ${endpoint ? "" : `<p class="cv-note">Al enviar se abrirá tu programa de correo con estos datos: adjunta tu CV antes de enviarlo.</p>`}
      <label class="check"><input type="checkbox" name="privacidad" required> <span>He leído y acepto la <a href="${root}legal/#privacidad">política de privacidad</a>. *</span></label>
      <div class="hp" aria-hidden="true"><label>No rellenar <input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>
      <button class="btn btn-primary" type="submit">Enviar mi CV ${icon.arrow}</button>
      <p class="form-status" role="status" aria-live="polite"></p>
    </form>`;
}

function ofertaCard(root, o, h = "h3") {
  const area = AREA_NAMES[o.area];
  return `<li class="oferta" data-area="${esc(o.area || "")}" data-zona="${esc(o.ubicacion)}">
  <a href="${root}ofertas-de-trabajo/${o.slug}/">
    <div class="oferta-main"><${h}>${esc(o.titulo)}</${h}>${area ? `<span class="tag">${esc(area)}</span>` : ""}</div>
    <p class="oferta-loc">${icon.pin}<span>${esc(o.ubicacion)}</span></p>
    <span class="oferta-cta">Ver oferta ${icon.arrow}</span>
  </a>
</li>`;
}

function ofertasList(root, ofertas, attrs = "", h = "h3") {
  return `<ul class="ofertas" ${attrs}>${ofertas.map((o) => ofertaCard(root, o, h)).join("")}</ul>`;
}

function areasGrid(root, areas, current) {
  // En la página de una familia se muestran las otras 6 (rejilla de 3);
  // en el resto, las 7 más una tarjeta de contacto para completar la rejilla de 4.
  const otro = current ? "" : `<li class="area area-cta">
  <a href="${root}contacto/">
    <h3>¿Buscas otro perfil técnico?</h3>
    <p>Cuéntanos qué necesitas y lo vemos contigo.</p>
    <span class="more">Escríbenos ${icon.arrow}</span>
  </a>
</li>`;
  return `<ul class="areas${current ? " six" : ""}">${areas.filter((a) => a.slug !== current).map((a) => `<li class="area">
  <a href="${root}seleccion-personas/${a.slug}/">
    ${areaIcon(a.slug)}
    <h3>${esc(a.nombre)}</h3>
    <p>${a.perfiles.map(esc).join(", ")}</p>
    <span class="more">Ver perfiles ${icon.arrow}</span>
  </a>
</li>`).join("")}${otro}</ul>`;
}

function phero(root, { kicker, title, sub, foto, crumbs, actions = "" }) {
  const bc = crumbs ? `<nav class="crumb" aria-label="Ruta"><ol>${crumbs.map((c, i) =>
    i === crumbs.length - 1 ? `<li aria-current="page">${esc(c.name)}</li>` : `<li><a href="${root}${c.path}">${esc(c.name)}</a></li>`).join("")}</ol></nav>` : "";
  return `<section class="phero${foto ? " has-photo" : ""}">
  ${foto ? `<div class="phero-media">${picture(root, { ...foto, eager: true, sizes: "100vw" })}</div>` : ""}
  <div class="wrap">
    ${bc}
    ${kicker ? `<p class="kicker">${kicker}</p>` : ""}
    <h1>${title}</h1>
    ${sub ? `<p class="sub">${sub}</p>` : ""}
    ${actions}
  </div>
</section>`;
}

/* Título para Google: el primer candidato de ≤60 caracteres */
const fit = (...candidates) => candidates.find((t) => t.length <= 60) || candidates[candidates.length - 1];

const crumb = (...items) => [{ name: "Inicio", path: "" }, ...items];

function contactoCTA(root, cfg, titulo = "¿Hablamos?") {
  return `<section class="sec cta">
  <div class="wrap">
    <h2 class="giant-sm">${titulo}</h2>
    <p>Cuéntanos qué necesitas y te respondemos.</p>
    <div class="acts">
      <a class="btn btn-primary" href="${root}contacto/">Escríbenos ${icon.arrow}</a>
      <a class="btn btn-out" href="mailto:${cfg.email}">${cfg.email}</a>
      <a class="btn btn-out" href="tel:${cfg.telefonos[0].tel}">${telTxt(cfg.telefonos[0])}</a>
    </div>
  </div>
</section>`;
}

/* ---------- Páginas ---------- */

export function buildPages(cfg, data) {
  const url = cfg.siteUrl;
  const areas = data.areas || [];
  const areaBySlug = Object.fromEntries(areas.map((a) => [a.slug, a]));
  AREA_NAMES = Object.fromEntries(areas.map((a) => [a.slug, a.nombre]));
  const org = organization(cfg, url);
  const ofertas = data.ofertas.filter((o) => o.estado === "abierta");
  const articulos = data.articulos.filter((a) => a.titulo && a.cuerpo);
  const pages = [];

  /* HOME */
  pages.push({
    path: "",
    nav: "",
    title: "Sibberia · Selección de perfiles técnicos e industriales",
    description: "Selección de perfiles técnicos e industriales: mantenimiento y SAT, producción, calidad, logística, ingeniería, automatización y programación.",
    css: ["home.css"],
    bodyClass: "home",
    scripts: ["assets/vendor/gsap.min.js", "assets/vendor/ScrollTrigger.min.js", "assets/js/ofertas.js?v=3", "assets/js/pages/home.js?v=7"],
    jsonld: [org, { "@type": "WebSite", "@id": `${url}/#web`, url: `${url}/`, name: "Sibberia", inLanguage: "es", publisher: { "@id": `${url}/#organizacion` } }],
    body: (root) => `
<div class="stage" aria-hidden="true">
  <canvas id="ice3d"></canvas>
  <div class="stage-fallback">${picture(root, { name: "bloques-personas", widths: [960, 1600], alt: "", eager: true })}</div>
</div>

<section class="hero chapter" id="hero" data-step="0">
  <div class="wrap">
    <h1><span class="kicker">Selección de</span> <span class="giant">Perfiles técnicos<br>e industriales</span></h1>
    <p class="sub">Mantenimiento y SAT, producción, calidad y PRL, logística, ingeniería, automatización y programación. Encontramos a quien encaja en tu planta, en tu proyecto y en tu equipo.</p>
    <div class="paths">
      <a class="path" href="${root}seleccion-personas/">
        <span class="path-kicker">Para empresas</span>
        <strong>Busco talento</strong>
        <span class="path-text">Necesito incorporar perfiles técnicos o industriales en mi empresa.</span>
        ${icon.arrow}
      </a>
      <a class="path" href="${root}ofertas-de-trabajo/">
        <span class="path-kicker">Para candidatos</span>
        <strong>Busco empleo</strong>
        <span class="path-text">Quiero ver las ofertas abiertas y presentar mi candidatura.</span>
        ${icon.arrow}
      </a>
    </div>
  </div>
</section>

<section class="chapter lema" id="lema" aria-labelledby="t-lema">
  <div class="wrap">
    <h2 class="sr-only" id="t-lema">Cómo trabajamos: compartir, crear, crecer</h2>
    <ol class="lema-steps">
      <li class="lema-step" id="compartir" data-step="1">
        <h3 class="word">Compartir</h3>
        <p class="lead">Empezamos escuchando. Compartimos contigo el día a día de tu empresa para entender a quién necesitas de verdad.</p>
        <p class="stat"><b>+15</b> años de experiencia</p>
      </li>
      <li class="lema-step" id="crear" data-step="2">
        <h3 class="word">Crear</h3>
        <p class="lead">Diseñamos cada proyecto desde cero, a la medida de tu empresa, para que cada persona encaje en su puesto y en su equipo.</p>
        <p class="stat"><b>100%</b> proyectos a medida</p>
      </li>
      <li class="lema-step" id="crecer" data-step="3">
        <h3 class="word">Crecer</h3>
        <p class="lead">Un equipo de consultores especializados acompaña a las personas y a la empresa para que crezcan juntas.</p>
        <p class="stat"><b>+20</b> consultores especializados</p>
      </li>
    </ol>
  </div>
</section>

<section class="sec perfiles-sec" id="perfiles" aria-labelledby="t-perfiles">
  <div class="wrap">
    <div class="sec-head">
      <div>
        <h2 class="giant-sm" id="t-perfiles">Perfiles técnicos e industriales</h2>
        <p class="sec-lead">Somos especialistas en seleccionar los perfiles que hacen funcionar una empresa industrial.</p>
      </div>
      <a class="btn btn-ghost" href="${root}seleccion-personas/">Selección de perfiles técnicos ${icon.arrow}</a>
    </div>
    ${areasGrid(root, areas)}
  </div>
</section>

<section class="sec servicios" id="servicios" aria-labelledby="t-servicios">
  <div class="wrap">
    <h2 class="giant-sm" id="t-servicios">Qué hacemos</h2>
    <div class="serv-grid">
      ${SERVICIOS.map((s) => `<article class="serv">
        <a href="${root}${s.path}">
          <figure>${picture(root, { ...s.foto, sizes: "(min-width: 900px) 33vw, 100vw" })}</figure>
          <h3>${s.nombre}</h3>
          <p>${s.resumen}</p>
          <span class="more">Ver servicio ${icon.arrow}</span>
        </a>
      </article>`).join("")}
    </div>
  </div>
</section>

<section class="sec valores-sec" aria-labelledby="t-valores">
  <div class="wrap">
    <h2 class="giant-sm" id="t-valores">Nuestros valores</h2>
    <ul class="valores">${VALORES.map((v) => `<li><h3>${v.nombre}</h3><p>${v.texto}</p></li>`).join("")}</ul>
    <p class="exito"><b>Trabajamos a éxito.</b> Así nuestro objetivo es el mismo que el tuyo.</p>
  </div>
</section>

<section class="sec ofertas-sec" aria-labelledby="t-ofertas">
  <div class="wrap">
    <div class="sec-head">
      <h2 class="giant-sm" id="t-ofertas">Ofertas de trabajo</h2>
      <div class="acts">
        <a class="btn btn-ghost" href="${root}ofertas-de-trabajo/">Ver todas las ofertas ${icon.arrow}</a>
        <a class="btn btn-primary" href="${root}ofertas-de-trabajo/#envia-tu-cv">Envíanos tu CV ${icon.arrow}</a>
      </div>
    </div>
    ${ofertasList(root, ofertas.slice(0, 5), `data-ofertas data-limit="5" data-root="${root}"`)}
  </div>
</section>

${articulos.length ? `<section class="sec blog-sec" aria-labelledby="t-blog">
  <div class="wrap">
    <div class="sec-head"><h2 class="giant-sm" id="t-blog">Blog</h2><a class="btn btn-ghost" href="${root}blog/">Ver el blog ${icon.arrow}</a></div>
    <ul class="posts">${articulos.slice(0, 3).map((a) => `<li><a href="${root}blog/${a.slug}/"><h3>${esc(a.titulo)}</h3>${a.resumen ? `<p>${esc(a.resumen)}</p>` : ""}<span class="more">Leer ${icon.arrow}</span></a></li>`).join("")}</ul>
  </div>
</section>` : ""}

${contactoCTA(root, cfg)}`
  });

  /* SERVICIOS */
  SERVICIOS.forEach((s, i) => {
    const hub = i === 0;
    const faq = hub ? [
      { q: "¿Qué perfiles técnicos e industriales seleccionáis?", a: "Seleccionamos perfiles de " + areas.map((a) => a.nombre).join(", ").replace(/, ([^,]*)$/, " y $1") + "." },
      { q: "¿Cómo trabajáis los procesos de selección?", a: "Trabajamos a éxito y diseñamos cada proceso a la medida de tu empresa. Te lo explicamos con detalle antes de empezar." },
      { q: "¿Los proyectos son a medida?", a: "Sí. Todos nuestros proyectos se diseñan a medida de cada empresa." },
      { q: "Busco empleo, ¿cómo me presento?", a: "Consulta nuestras ofertas de trabajo abiertas y sigue las instrucciones de cada oferta, o escríbenos a " + cfg.email + "." }
    ] : null;
    const otros = SERVICIOS.filter((x) => x !== s);
    pages.push({
      path: s.path,
      nav: s.path,
      title: hub ? "Selección de perfiles técnicos e industriales | Sibberia" : fit(`${s.nombre} | Sibberia`, s.nombre),
      description: hub ? "Especialistas en selección de perfiles técnicos e industriales: mantenimiento, producción, calidad, logística, ingeniería y automatización." : `${s.resumen} Más de 15 años de experiencia y proyectos a medida.`,
      css: ["subpage.css"],
      crumbs: crumb({ name: s.nombre, path: s.path }),
      jsonld: [{
        "@type": "Service",
        name: s.nombre,
        serviceType: s.nombre,
        description: s.intro,
        url: `${url}/${s.path}`,
        provider: org,
        areaServed: { "@type": "Country", name: "España" }
      }].concat(faq ? [{
        "@type": "FAQPage",
        mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } }))
      }] : []),
      body: (root) => `
${phero(root, {
  kicker: hub ? s.nombre : "Servicio",
  title: hub ? "Selección de perfiles técnicos e industriales" : s.nombre,
  sub: s.intro,
  foto: s.foto,
  crumbs: crumb({ name: s.nombre, path: s.path }),
  actions: `<div class="acts"><a class="btn btn-primary" href="${root}contacto/">Cuéntanos tu caso ${icon.arrow}</a></div>`
})}
${hub ? `<section class="sec" aria-labelledby="t-areas">
  <div class="wrap">
    <h2 class="giant-sm" id="t-areas">Perfiles que seleccionamos</h2>
    ${areasGrid(root, areas)}
  </div>
</section>` : ""}
<section class="sec${hub ? " soft" : ""}">
  <div class="wrap">
    <h2 class="giant-sm">Cómo trabajamos</h2>
    <ol class="steps">
      <li><h3>Compartir</h3><p>Escuchamos tu necesidad y conocemos tu empresa, tu equipo y su cultura.</p></li>
      <li><h3>Crear</h3><p>Diseñamos un proyecto a medida, con objetivos y plazos acordados contigo.</p></li>
      <li><h3>Crecer</h3><p>Te acompañamos durante el proyecto para que el resultado se consolide.</p></li>
    </ol>
    ${cifrasHTML("light")}
  </div>
</section>
${faq ? `<section class="sec soft" aria-labelledby="t-faq">
  <div class="wrap narrow">
    <h2 class="giant-sm" id="t-faq">Preguntas frecuentes</h2>
    <div class="faq">${faq.map((f) => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join("")}</div>
  </div>
</section>` : ""}
<section class="sec">
  <div class="wrap">
    <h2 class="giant-sm">Otros servicios</h2>
    <div class="serv-grid two">${otros.map((o) => `<article class="serv">
      <a href="${root}${o.path}"><figure>${picture(root, { ...o.foto, sizes: "(min-width: 900px) 50vw, 100vw" })}</figure><h3>${o.nombre}</h3><p>${o.resumen}</p><span class="more">Ver servicio ${icon.arrow}</span></a>
    </article>`).join("")}</div>
  </div>
</section>
${contactoCTA(root, cfg)}`
    });
  });

  /* SELECCIÓN POR FAMILIA DE PERFILES (páginas de aterrizaje SEO) */
  areas.forEach((a) => {
    const p = `seleccion-personas/${a.slug}/`;
    const intro = `En Sibberia seleccionamos ${a.descripcion} para empresas industriales y técnicas. Diseñamos cada proceso a la medida del puesto y del equipo, y trabajamos a éxito.`;
    const suyas = ofertas.filter((o) => o.area === a.slug);
    const crumbs = crumb({ name: "Selección de perfiles técnicos", path: "seleccion-personas/" }, { name: a.nombre, path: p });
    pages.push({
      path: p,
      nav: "seleccion-personas/",
      title: a.seoTitulo || fit(`${a.titulo} | Sibberia`, a.titulo),
      description: a.seoDescripcion || intro,
      css: ["subpage.css"],
      crumbs,
      jsonld: [{
        "@type": "Service",
        name: a.titulo,
        serviceType: "Selección de personal",
        category: a.nombre,
        description: intro,
        url: `${url}/${p}`,
        provider: org,
        areaServed: { "@type": "Country", name: "España" },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `Perfiles de ${a.nombre}`,
          itemListElement: a.perfiles.map((perfil) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: `Selección de ${perfil}` } }))
        }
      }],
      body: (root) => `
${phero(root, {
  kicker: "Selección de perfiles técnicos",
  title: esc(a.titulo),
  sub: intro,
  crumbs,
  actions: `<div class="acts"><a class="btn btn-primary" href="${root}contacto/">Busco este perfil ${icon.arrow}</a><a class="btn btn-out" href="${root}ofertas-de-trabajo/${suyas.length ? `?familia=${a.slug}` : ""}">Busco empleo</a></div>`
})}
<section class="sec" aria-labelledby="t-perf">
  <div class="wrap">
    <h2 class="giant-sm" id="t-perf">Perfiles que seleccionamos</h2>
    <ul class="perfiles">${a.perfiles.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
  </div>
</section>
<section class="sec soft">
  <div class="wrap">
    <h2 class="giant-sm">Cómo trabajamos</h2>
    <ol class="steps">
      <li><h3>Compartir</h3><p>Escuchamos tu necesidad y conocemos tu empresa, tu equipo y su cultura.</p></li>
      <li><h3>Crear</h3><p>Diseñamos un proceso a medida, con objetivos y plazos acordados contigo.</p></li>
      <li><h3>Crecer</h3><p>Te acompañamos hasta que la incorporación se consolida.</p></li>
    </ol>
    ${cifrasHTML("light")}
  </div>
</section>
${suyas.length ? `<section class="sec" aria-labelledby="t-of">
  <div class="wrap">
    <div class="sec-head"><h2 class="giant-sm" id="t-of">Ofertas abiertas</h2><a class="btn btn-ghost" href="${root}ofertas-de-trabajo/">Todas las ofertas ${icon.arrow}</a></div>
    ${ofertasList(root, suyas)}
  </div>
</section>` : ""}
<section class="sec${suyas.length ? " soft" : ""}" aria-labelledby="t-otros">
  <div class="wrap">
    <h2 class="giant-sm" id="t-otros">Otros perfiles técnicos</h2>
    ${areasGrid(root, areas, a.slug)}
  </div>
</section>
${contactoCTA(root, cfg, "¿Buscas este perfil?")}`
    });
  });

  /* NOSOTROS */
  pages.push({
    path: "nosotros/",
    nav: "nosotros/",
    title: "Nosotros | Sibberia",
    description: "Sibberia: compartir, crear, crecer. Más de 15 años de experiencia, más de 20 consultores especializados y valores de humildad, integridad y excelencia.",
    css: ["subpage.css"],
    crumbs: crumb({ name: "Nosotros", path: "nosotros/" }),
    jsonld: [org],
    body: (root) => `
${phero(root, {
  kicker: "Nosotros",
  title: `<span translate="no">Compartir. Crear. Crecer.</span>`,
  sub: "Más de 15 años ayudando a empresas a encontrar, desarrollar y acompañar a las personas que las hacen crecer.",
  foto: { name: "taller-asistentes", widths: [640, 960], alt: "Grupo de profesionales sonríe mientras escucha a un ponente durante un taller." },
  crumbs: crumb({ name: "Nosotros", path: "nosotros/" })
})}
<section class="sec">
  <div class="wrap">
    ${cifrasHTML("light")}
  </div>
</section>
<section class="sec soft" id="valores" aria-labelledby="t-val">
  <div class="wrap">
    <h2 class="giant-sm" id="t-val">Nuestros valores</h2>
    <ul class="valores light">${VALORES.map((v) => `<li><h3>${v.nombre}</h3><p>${v.texto}</p></li>`).join("")}</ul>
    <p class="exito"><b>Trabajamos a éxito.</b> Así nuestro objetivo es el mismo que el tuyo.</p>
  </div>
</section>
${contactoCTA(root, cfg)}`
  });

  /* OFERTAS: listado */
  pages.push({
    path: "ofertas-de-trabajo/",
    nav: "ofertas-de-trabajo/",
    title: "Ofertas de trabajo técnicas e industriales | Sibberia",
    description: "Ofertas de trabajo para perfiles técnicos e industriales: mantenimiento, ingeniería, producción y más. Consulta las posiciones abiertas.",
    css: ["subpage.css"],
    scripts: ["assets/js/ofertas.js?v=3"],
    crumbs: crumb({ name: "Ofertas de trabajo", path: "ofertas-de-trabajo/" }),
    jsonld: [{
      "@type": "ItemList",
      itemListElement: ofertas.map((o, i) => ({ "@type": "ListItem", position: i + 1, url: `${url}/ofertas-de-trabajo/${o.slug}/`, name: o.titulo }))
    }],
    body: (root) => `
${phero(root, {
  kicker: "Para candidatos",
  title: "Ofertas de trabajo",
  sub: "Estas son las posiciones que tenemos abiertas ahora mismo.",
  crumbs: crumb({ name: "Ofertas de trabajo", path: "ofertas-de-trabajo/" }),
  actions: `<div class="acts"><a class="btn btn-primary" href="#envia-tu-cv">Envíanos tu CV ${icon.arrow}</a></div>`
})}
<section class="sec">
  <div class="wrap">
    <div class="filtros" data-filtros hidden>
      <div class="filtro" role="group" aria-label="Filtrar por familia">
        <span class="filtro-l">Familia</span>
        <button type="button" data-f="area" data-v="" aria-pressed="true">Todas</button>
        ${[...new Set(ofertas.map((o) => o.area).filter(Boolean))].map((a) => `<button type="button" data-f="area" data-v="${a}" aria-pressed="false">${esc(areaBySlug[a].nombre)}</button>`).join("")}
      </div>
      <div class="filtro" role="group" aria-label="Filtrar por zona">
        <span class="filtro-l">Zona</span>
        <button type="button" data-f="zona" data-v="" aria-pressed="true">Todas</button>
        ${[...new Set(ofertas.map((o) => o.ubicacion))].map((z) => `<button type="button" data-f="zona" data-v="${esc(z)}" aria-pressed="false">${esc(z)}</button>`).join("")}
      </div>
    </div>
    <p class="count" data-ofertas-count aria-live="polite">${ofertas.length} ofertas abiertas</p>
    ${ofertasList(root, ofertas, `data-ofertas data-root="${root}" data-h="h2"`, "h2")}
    <p class="empty" data-ofertas-empty hidden>No hay ofertas abiertas con estos filtros. <button type="button" class="linkish" data-reset>Ver todas</button></p>
  </div>
</section>
<section class="sec soft cv-sec" id="envia-tu-cv" aria-labelledby="t-cv">
  <div class="wrap narrow">
    <h2 class="giant-sm" id="t-cv">¿No encuentras tu oferta? Envíanos tu CV</h2>
    <p class="cv-lead">Puedes enviarnos tu candidatura aunque ahora no veas una oferta para tu perfil. También puedes escribirnos a <a href="mailto:${cfg.email}">${cfg.email}</a>.</p>
    ${cvForm(root, cfg, { id: "cv", ofertas, areas })}
  </div>
</section>`
  });

  /* OFERTAS: fichas */
  ofertas.forEach((o) => {
    const p = `ofertas-de-trabajo/${o.slug}/`;
    const desc = o.descripcion || `Sibberia selecciona ${o.titulo} en ${o.ubicacion}.`;
    const job = {
      "@type": "JobPosting",
      title: o.titulo,
      description: `<p>${esc(desc)}</p>`,
      hiringOrganization: { "@type": "Organization", name: "Sibberia", sameAs: `${url}/`, logo: `${url}/assets/img/sibberia-logo-azul.svg` },
      jobLocation: {
        "@type": "Place",
        address: Object.fromEntries(Object.entries({
          "@type": "PostalAddress",
          addressLocality: o.localidad || undefined,
          addressRegion: o.region || undefined,
          addressCountry: o.pais
        }).filter(([, v]) => v !== undefined))
      },
      directApply: false,
      identifier: { "@type": "PropertyValue", name: "Sibberia", value: o.slug }
    };
    // Google exige fecha y descripción reales: sin ellas el JobPosting daría error
    // en Search Console, así que no se publica hasta tenerlas.
    const jobCompleto = Boolean(o.fechaPublicacion && o.descripcion);
    if (o.fechaPublicacion) job.datePosted = o.fechaPublicacion;
    if (o.validaHasta) job.validThrough = o.validaHasta;
    if (o.contrato) job.employmentType = o.contrato;
    if (o.remoto) job.jobLocationType = "TELECOMMUTE";
    if (areaBySlug[o.area]) job.occupationalCategory = areaBySlug[o.area].nombre;
    pages.push({
      path: p,
      nav: "ofertas-de-trabajo/",
      title: fit(`${o.titulo} en ${o.ubicacion} | Sibberia`, `${o.titulo} en ${o.ubicacion}`, `${o.titulo} | Sibberia`, o.titulo),
      description: `Oferta de empleo de ${o.titulo} en ${o.ubicacion}. Envía tu candidatura a Sibberia.`,
      css: ["subpage.css"],
      crumbs: crumb({ name: "Ofertas de trabajo", path: "ofertas-de-trabajo/" }, { name: o.titulo, path: p }),
      jsonld: jobCompleto ? [job] : [],
      warnings: [
        !o.fechaPublicacion && `Oferta "${o.titulo}": falta fechaPublicacion (sin ella no se publica el JobPosting para Google).`,
        !o.descripcion && `Oferta "${o.titulo}": falta la descripción real (sin ella no se publica el JobPosting para Google).`
      ].filter(Boolean),
      body: (root) => `
${phero(root, {
  kicker: "Oferta de trabajo",
  title: esc(o.titulo),
  sub: `${icon.pin} ${esc(o.ubicacion)}`,
  crumbs: crumb({ name: "Ofertas de trabajo", path: "ofertas-de-trabajo/" }, { name: o.titulo, path: p }),
  actions: `<div class="acts"><a class="btn btn-primary" href="#candidatura">Envíanos tu CV ${icon.arrow}</a></div>`
})}
<section class="sec">
  <div class="wrap narrow">
    <dl class="ficha">
      <div><dt>Puesto</dt><dd>${esc(o.titulo)}</dd></div>
      <div><dt>Ubicación</dt><dd>${esc(o.ubicacion)}</dd></div>
      ${areaBySlug[o.area] ? `<div><dt>Área</dt><dd><a href="${root}seleccion-personas/${o.area}/">${esc(areaBySlug[o.area].nombre)}</a></dd></div>` : ""}
      ${o.jornada ? `<div><dt>Jornada</dt><dd>${esc(o.jornada)}</dd></div>` : ""}
      ${o.contrato ? `<div><dt>Contrato</dt><dd>${esc(o.contrato)}</dd></div>` : ""}
    </dl>
    ${o.descripcion ? `<div class="prose">${esc(o.descripcion)}</div>` : ""}
    ${o.requisitos && o.requisitos.length ? `<h2>Requisitos</h2><ul class="prose">${o.requisitos.map((r) => `<li>${esc(r)}</li>`).join("")}</ul>` : ""}
    <p class="back"><a href="${root}ofertas-de-trabajo/">← Todas las ofertas</a></p>
  </div>
</section>
<section class="sec soft cv-sec" id="candidatura" aria-labelledby="t-cv">
  <div class="wrap narrow">
    <h2 class="giant-sm" id="t-cv">Envíanos tu CV</h2>
    <p class="cv-lead">Déjanos tus datos para optar a esta oferta. Si lo prefieres, escríbenos a <a href="mailto:${cfg.email}?subject=${encodeURIComponent("Candidatura: " + o.titulo + " (" + o.ubicacion + ")")}">${cfg.email}</a> con el nombre de la oferta en el asunto.</p>
    ${cvForm(root, cfg, { id: "cv", oferta: o })}
  </div>
</section>`
    });
  });

  /* BLOG: listado y artículos (solo si hay artículos publicables) */
  if (articulos.length) pages.push({
    path: "blog/",
    nav: "blog/",
    title: "Blog | Sibberia",
    description: "Artículos de Sibberia sobre selección, gestión y desarrollo de personas.",
    css: ["subpage.css"],
    crumbs: crumb({ name: "Blog", path: "blog/" }),
    jsonld: [{ "@type": "Blog", name: "Blog de Sibberia", url: `${url}/blog/`, publisher: { "@id": `${url}/#organizacion` } }],
    body: (root) => `
${phero(root, { kicker: "Blog", title: "Blog", sub: "Ideas sobre selección, gestión y desarrollo de personas.", crumbs: crumb({ name: "Blog", path: "blog/" }) })}
<section class="sec">
  <div class="wrap">
    <ul class="posts">${articulos.map((a) => `<li><a href="${root}blog/${a.slug}/"><h2>${esc(a.titulo)}</h2>${a.resumen ? `<p>${esc(a.resumen)}</p>` : ""}<span class="more">Leer artículo ${icon.arrow}</span></a></li>`).join("")}</ul>
  </div>
</section>`
  });
  articulos.forEach((a) => {
    const p = `blog/${a.slug}/`;
    const art = {
      "@type": "Article",
      headline: a.titulo,
      description: a.resumen || undefined,
      url: `${url}/${p}`,
      mainEntityOfPage: `${url}/${p}`,
      image: `${url}/assets/img/og-sibberia.jpg`,
      author: { "@type": "Organization", name: a.autor || "Sibberia", url: `${url}/` },
      publisher: { "@type": "Organization", name: "Sibberia", logo: { "@type": "ImageObject", url: `${url}/assets/img/sibberia-logo-azul.svg` } },
      inLanguage: "es"
    };
    if (a.fecha) art.datePublished = a.fecha;
    pages.push({
      path: p,
      nav: "blog/",
      ogType: "article",
      title: fit(`${a.titulo} | Blog | Sibberia`, `${a.titulo} | Sibberia`, a.titulo),
      description: a.resumen || a.titulo,
      css: ["subpage.css"],
      crumbs: crumb({ name: "Blog", path: "blog/" }, { name: a.titulo, path: p }),
      jsonld: [art],
      body: (root) => `
${phero(root, { kicker: "Blog", title: esc(a.titulo), crumbs: crumb({ name: "Blog", path: "blog/" }, { name: a.titulo, path: p }) })}
<article class="sec"><div class="wrap narrow prose">${a.cuerpo}</div></article>
<p class="wrap narrow back"><a href="${root}blog/">← Volver al blog</a></p>`
    });
  });

  /* CONTACTO */
  pages.push({
    path: "contacto/",
    nav: "contacto/",
    title: "Contacto | Sibberia",
    description: `Contacta con Sibberia: ${cfg.email}, ${cfg.telefonos.map((t) => t.texto).join(" y ")}.`,
    css: ["subpage.css"],
    crumbs: crumb({ name: "Contacto", path: "contacto/" }),
    jsonld: [{ "@type": "ContactPage", url: `${url}/contacto/`, about: org }],
    body: (root) => `
${phero(root, { kicker: "Contacto", title: "Hablemos", sub: "Cuéntanos qué necesitas. Si buscas empleo, revisa antes nuestras ofertas abiertas.", crumbs: crumb({ name: "Contacto", path: "contacto/" }) })}
<section class="sec">
  <div class="wrap contact-grid">
    <aside class="cinfo">
      <h2>Contacto directo</h2>
      <ul>
        <li>${icon.mail}<a href="mailto:${cfg.email}">${cfg.email}</a></li>
        ${cfg.telefonos.map((t) => `<li>${icon.phone}<a href="tel:${t.tel}">${telTxt(t)}</a></li>`).join("")}
      </ul>
      <a class="btn btn-ghost" href="${root}ofertas-de-trabajo/">Ver ofertas de trabajo ${icon.arrow}</a>
    </aside>
    <form class="cform" data-form="contacto" data-endpoint="${esc(cfg.formularios.contacto)}" ${cfg.formularios.contacto ? `action="${esc(cfg.formularios.contacto)}" method="post"` : `action="mailto:${cfg.email}" method="post" enctype="text/plain"`} novalidate>
      <fieldset class="who">
        <legend>Te escribo como</legend>
        <label><input type="radio" name="perfil" value="empresa" checked> Empresa</label>
        <label><input type="radio" name="perfil" value="candidato"> Candidato/a</label>
      </fieldset>
      <p class="cv-note" data-solo-candidato hidden>¿Buscas empleo? <a href="${root}ofertas-de-trabajo/#envia-tu-cv">Envíanos tu CV</a> desde la página de ofertas.</p>
      <div class="frow">
        <div class="ffield"><label for="f-name">Nombre *</label><input id="f-name" name="nombre" type="text" required autocomplete="name"><p class="ferr"></p></div>
        <div class="ffield"><label for="f-company">Empresa</label><input id="f-company" name="empresa" type="text" autocomplete="organization"></div>
      </div>
      <div class="frow">
        <div class="ffield"><label for="f-email">Email *</label><input id="f-email" name="email" type="email" required autocomplete="email" spellcheck="false" inputmode="email"><p class="ferr"></p></div>
        <div class="ffield"><label for="f-phone">Teléfono</label><input id="f-phone" name="telefono" type="tel" autocomplete="tel" inputmode="tel"></div>
      </div>
      <div class="ffield"><label for="f-msg">Mensaje *</label><textarea id="f-msg" name="mensaje" required rows="6"></textarea><p class="ferr"></p></div>
      <label class="check"><input type="checkbox" name="privacidad" required> <span>He leído y acepto la <a href="${root}legal/#privacidad">política de privacidad</a>. *</span></label>
      <div class="hp" aria-hidden="true"><label>No rellenar <input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>
      <button class="btn btn-primary" type="submit">Enviar mensaje ${icon.arrow}</button>
      <p class="form-status" role="status" aria-live="polite"></p>
    </form>
  </div>
</section>`
  });

  /* LEGAL */
  const dato = (k, label) => cfg.pendienteDeValidar[k] ? `<li>${label}: ${esc(cfg.pendienteDeValidar[k])}</li>` : "";
  pages.push({
    path: "legal/",
    nav: "",
    title: "Aviso legal, privacidad y cookies | Sibberia",
    description: "Aviso legal, política de privacidad y política de cookies de Sibberia.",
    css: ["subpage.css"],
    crumbs: crumb({ name: "Aviso legal", path: "legal/" }),
    noindex: !cfg.pendienteDeValidar.cif,
    warnings: cfg.pendienteDeValidar.cif ? [] : ["Aviso legal sin razón social, CIF ni domicilio (site/config.json → pendienteDeValidar)."],
    body: (root) => `
${phero(root, { kicker: "Legal", title: "Aviso legal y privacidad", crumbs: crumb({ name: "Aviso legal", path: "legal/" }) })}
<section class="sec">
  <div class="wrap narrow prose legal">
    <h2>Aviso legal</h2>
    <p>En cumplimiento de la Ley 34/2002, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa de los datos del titular de este sitio web:</p>
    <ul>
      ${dato("razonSocial", "Titular")}
      ${dato("cif", "CIF")}
      ${dato("direccion", "Domicilio")}
      <li>Email: <a href="mailto:${cfg.email}">${cfg.email}</a> · Teléfonos: ${cfg.telefonos.map((t) => `<a href="tel:${t.tel}">${telTxt(t)}</a>`).join(" y ")}</li>
    </ul>
    <p>El acceso y uso de este sitio web atribuye la condición de usuario e implica la aceptación de las presentes condiciones. Los contenidos de esta web (textos, imágenes, diseño) son propiedad de Sibberia o de sus legítimos titulares y no podrán ser reproducidos sin autorización expresa.</p>
    <h2 id="privacidad">Política de privacidad</h2>
    <p>Los datos personales facilitados a través de los formularios de este sitio son tratados por el titular indicado en el aviso legal como responsable del tratamiento, conforme al Reglamento (UE) 2016/679 (RGPD) y la LO 3/2018 (LOPDGDD).</p>
    <ul>
      <li>Finalidad: atender tu consulta, gestionar tu candidatura o enviarte la newsletter si te suscribes.</li>
      <li>Legitimación: consentimiento del interesado.</li>
      <li>Conservación: el tiempo necesario para la finalidad o el exigido legalmente.</li>
      <li>Destinatarios: no se ceden datos a terceros salvo obligación legal.</li>
      <li>Derechos: puedes ejercer acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo a <a href="mailto:${cfg.email}">${cfg.email}</a>.</li>
    </ul>
    <p>Si consideras vulnerados tus derechos puedes reclamar ante la Agencia Española de Protección de Datos (www.aepd.es).</p>
    <h2 id="cookies">Política de cookies</h2>
    <p>Este sitio web no utiliza cookies de seguimiento ni de publicidad. Las tipografías se sirven desde el propio sitio, sin peticiones a terceros.</p>
  </div>
</section>`
  });

  /* 404 */
  pages.push({
    path: "404.html",
    file: "404.html",
    nav: "",
    title: "Página no encontrada | Sibberia",
    description: "La página que buscas no existe.",
    css: ["subpage.css"],
    noindex: true,
    sitemap: false,
    absoluteRoot: true,
    body: (root) => `
${phero(root, { kicker: "Error 404", title: "Esta página no existe", sub: "Puede que la dirección haya cambiado." })}
<section class="sec"><div class="wrap acts">
  <a class="btn btn-primary" href="${root}">Ir al inicio ${icon.arrow}</a>
  <a class="btn btn-ghost" href="${root}ofertas-de-trabajo/">Ver ofertas de trabajo</a>
</div></section>`
  });

  return pages;
}

export { SERVICIOS, NAV };
