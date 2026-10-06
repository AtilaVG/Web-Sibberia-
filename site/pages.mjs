/* SIBBERIA — contenido de las páginas.
   Regla de contenido: solo datos verificados en sibberia.com o facilitados
   por el cliente. Cualquier texto redactado para esta web está listado en
   docs/textos-para-validar.md. */
import { esc, icon, picture, organization, NAV } from "./layout.mjs";

const SERVICIOS = [
  {
    path: "seleccion-personas/",
    nombre: "Selección de personas",
    corto: "Selección",
    foto: { name: "bloques-personas", widths: [960, 1600], alt: "Una mano elige un bloque de madera con la figura de una persona entre varios bloques iguales." },
    resumen: "Buscamos y evaluamos a las personas que encajan en tu empresa, en su puesto y en su equipo.",
    intro: "Nos encargamos del proceso de selección para que incorpores a la persona que tu empresa necesita. Trabajamos a éxito y diseñamos cada proceso a medida."
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

function ofertaCard(root, o) {
  return `<li class="oferta">
  <a href="${root}ofertas-de-trabajo/${o.slug}/">
    <h3>${esc(o.titulo)}</h3>
    <p class="oferta-loc">${icon.pin}<span>${esc(o.ubicacion)}</span></p>
    <span class="oferta-cta">Ver oferta ${icon.arrow}</span>
  </a>
</li>`;
}

function ofertasList(root, ofertas, attrs = "") {
  return `<ul class="ofertas" ${attrs}>${ofertas.map((o) => ofertaCard(root, o)).join("")}</ul>`;
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

const crumb = (...items) => [{ name: "Inicio", path: "" }, ...items];

function contactoCTA(root, cfg, titulo = "¿Hablamos?") {
  return `<section class="sec cta">
  <div class="wrap">
    <h2 class="giant-sm">${titulo}</h2>
    <p>Cuéntanos qué necesitas y te respondemos.</p>
    <div class="acts">
      <a class="btn btn-primary" href="${root}contacto/">Escríbenos ${icon.arrow}</a>
      <a class="btn btn-out" href="mailto:${cfg.email}">${cfg.email}</a>
      <a class="btn btn-out" href="tel:${cfg.telefonos[0].tel}">${cfg.telefonos[0].texto}</a>
    </div>
  </div>
</section>`;
}

/* ---------- Páginas ---------- */

export function buildPages(cfg, data) {
  const url = cfg.siteUrl;
  const org = organization(cfg, url);
  const ofertas = data.ofertas.filter((o) => o.estado === "abierta");
  const articulos = data.articulos.filter((a) => a.titulo && a.cuerpo);
  const pages = [];

  /* HOME */
  pages.push({
    path: "",
    nav: "",
    title: "Sibberia · Selección de personas, estrategia y formación",
    description: "Sibberia: selección de personas, estrategia y gestión del capital humano, y formación y desarrollo de personas. Más de 15 años de experiencia y proyectos a medida.",
    css: ["home.css"],
    bodyClass: "home",
    scripts: ["assets/vendor/gsap.min.js", "assets/vendor/ScrollTrigger.min.js", "assets/js/ofertas.js?v=1", "assets/js/pages/home.js?v=4"],
    jsonld: [org, { "@type": "WebSite", "@id": `${url}/#web`, url: `${url}/`, name: "Sibberia", inLanguage: "es", publisher: { "@id": `${url}/#organizacion` } }],
    body: (root) => `
<div class="stage" aria-hidden="true">
  <canvas id="ice3d"></canvas>
  <div class="stage-fallback">${picture(root, { name: "bloques-personas", widths: [960, 1600], alt: "", eager: true })}</div>
</div>

<section class="hero chapter" id="hero" data-step="0">
  <div class="wrap">
    <p class="kicker" translate="no">${cfg.lema}</p>
    <h1 class="giant">Personas<br>que encajan</h1>
    <p class="sub">Selección de personas, estrategia y gestión del capital humano, y formación. Trabajamos a éxito y a la medida de cada empresa.</p>
    <div class="paths">
      <a class="path" href="${root}seleccion-personas/">
        <span class="path-kicker">Para empresas</span>
        <strong>Busco talento</strong>
        <span class="path-text">Necesito incorporar o desarrollar personas en mi empresa.</span>
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

<section class="chapter" id="compartir" data-step="1" aria-labelledby="t-compartir">
  <div class="wrap">
    <h2 class="giant word" id="t-compartir">Compartir</h2>
    <div class="chapter-body">
      <p class="lead">Empezamos escuchando. Compartimos contigo el día a día de tu empresa para entender a quién necesitas de verdad.</p>
      <p class="stat"><b>+15</b> años de experiencia</p>
    </div>
  </div>
</section>

<section class="chapter" id="crear" data-step="2" aria-labelledby="t-crear">
  <div class="wrap">
    <h2 class="giant word" id="t-crear">Crear</h2>
    <div class="chapter-body">
      <p class="lead">Diseñamos cada proyecto desde cero, a la medida de tu empresa, para que cada persona encaje en su puesto y en su equipo.</p>
      <p class="stat"><b>100%</b> proyectos a medida</p>
    </div>
  </div>
</section>

<section class="chapter" id="crecer" data-step="3" aria-labelledby="t-crecer">
  <div class="wrap">
    <h2 class="giant word" id="t-crecer">Crecer</h2>
    <div class="chapter-body">
      <p class="lead">Un equipo de consultores especializados acompaña a las personas y a la empresa para que crezcan juntas.</p>
      <p class="stat"><b>+20</b> consultores especializados</p>
    </div>
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
      <a class="btn btn-ghost" href="${root}ofertas-de-trabajo/">Ver todas las ofertas ${icon.arrow}</a>
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
    const faq = i === 0 ? [
      { q: "¿Cómo trabajáis los procesos de selección?", a: "Trabajamos a éxito y diseñamos cada proceso a la medida de tu empresa. Te lo explicamos con detalle antes de empezar." },
      { q: "¿Los proyectos son a medida?", a: "Sí. Todos nuestros proyectos se diseñan a medida de cada empresa." },
      { q: "Busco empleo, ¿cómo me presento?", a: "Consulta nuestras ofertas de trabajo abiertas y sigue las instrucciones de cada oferta, o escríbenos a " + cfg.email + "." }
    ] : null;
    const otros = SERVICIOS.filter((x) => x !== s);
    pages.push({
      path: s.path,
      nav: s.path,
      title: `${s.nombre} · Sibberia`,
      description: `${s.resumen} Sibberia: más de 15 años de experiencia y proyectos a medida.`,
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
  kicker: "Servicio",
  title: s.nombre,
  sub: s.intro,
  foto: s.foto,
  crumbs: crumb({ name: s.nombre, path: s.path }),
  actions: `<div class="acts"><a class="btn btn-primary" href="${root}contacto/">Cuéntanos tu caso ${icon.arrow}</a></div>`
})}
<section class="sec">
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

  /* NOSOTROS */
  pages.push({
    path: "nosotros/",
    nav: "nosotros/",
    title: "Nosotros · Sibberia",
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
    title: "Ofertas de trabajo · Sibberia",
    description: `Ofertas de trabajo abiertas en Sibberia: ${ofertas.map((o) => o.titulo + " (" + o.ubicacion + ")").join(", ")}.`,
    css: ["subpage.css"],
    scripts: ["assets/js/ofertas.js?v=1"],
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
  crumbs: crumb({ name: "Ofertas de trabajo", path: "ofertas-de-trabajo/" })
})}
<section class="sec">
  <div class="wrap">
    <p class="count" data-ofertas-count>${ofertas.length} ofertas abiertas</p>
    ${ofertasList(root, ofertas, `data-ofertas data-root="${root}"`)}
    <p class="note">¿No encuentras la tuya? Escríbenos a <a href="mailto:${cfg.email}">${cfg.email}</a>.</p>
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
    if (o.fechaPublicacion) job.datePosted = o.fechaPublicacion;
    if (o.validaHasta) job.validThrough = o.validaHasta;
    if (o.contrato) job.employmentType = o.contrato;
    if (o.remoto) job.jobLocationType = "TELECOMMUTE";
    pages.push({
      path: p,
      nav: "ofertas-de-trabajo/",
      title: `${o.titulo} en ${o.ubicacion} · Ofertas de trabajo · Sibberia`,
      description: `Oferta de trabajo: ${o.titulo} en ${o.ubicacion}. Presenta tu candidatura a través de Sibberia.`,
      css: ["subpage.css"],
      crumbs: crumb({ name: "Ofertas de trabajo", path: "ofertas-de-trabajo/" }, { name: o.titulo, path: p }),
      jsonld: [job],
      warnings: [
        !o.fechaPublicacion && `Oferta "${o.titulo}": falta fechaPublicacion (datePosted es obligatorio para Google).`,
        !o.descripcion && `Oferta "${o.titulo}": falta la descripción real.`
      ].filter(Boolean),
      body: (root) => `
${phero(root, {
  kicker: "Oferta de trabajo",
  title: esc(o.titulo),
  sub: `${icon.pin} ${esc(o.ubicacion)}`,
  crumbs: crumb({ name: "Ofertas de trabajo", path: "ofertas-de-trabajo/" }, { name: o.titulo, path: p })
})}
<section class="sec">
  <div class="wrap narrow">
    <dl class="ficha">
      <div><dt>Puesto</dt><dd>${esc(o.titulo)}</dd></div>
      <div><dt>Ubicación</dt><dd>${esc(o.ubicacion)}</dd></div>
      ${o.jornada ? `<div><dt>Jornada</dt><dd>${esc(o.jornada)}</dd></div>` : ""}
      ${o.contrato ? `<div><dt>Contrato</dt><dd>${esc(o.contrato)}</dd></div>` : ""}
    </dl>
    ${o.descripcion ? `<div class="prose">${esc(o.descripcion)}</div>` : `<p class="lead-dark">Estamos preparando la descripción completa de esta oferta. Si te interesa, escríbenos y te contamos los detalles.</p>`}
    ${o.requisitos && o.requisitos.length ? `<h2>Requisitos</h2><ul class="prose">${o.requisitos.map((r) => `<li>${esc(r)}</li>`).join("")}</ul>` : ""}
    <div class="apply">
      <h2>Cómo inscribirte</h2>
      <p>Envía tu CV a <a href="mailto:${cfg.email}?subject=${encodeURIComponent("Candidatura: " + o.titulo + " (" + o.ubicacion + ")")}">${cfg.email}</a> indicando en el asunto el nombre de la oferta.</p>
      <a class="btn btn-primary" href="mailto:${cfg.email}?subject=${encodeURIComponent("Candidatura: " + o.titulo + " (" + o.ubicacion + ")")}">Enviar mi candidatura ${icon.arrow}</a>
    </div>
    <p class="back"><a href="${root}ofertas-de-trabajo/">← Todas las ofertas</a></p>
  </div>
</section>`
    });
  });

  /* BLOG: listado y artículos */
  pages.push({
    path: "blog/",
    nav: "blog/",
    title: "Blog · Sibberia",
    description: "Artículos de Sibberia sobre selección, gestión y desarrollo de personas.",
    css: ["subpage.css"],
    crumbs: crumb({ name: "Blog", path: "blog/" }),
    jsonld: articulos.length ? [{ "@type": "Blog", name: "Blog de Sibberia", url: `${url}/blog/`, publisher: { "@id": `${url}/#organizacion` } }] : [],
    warnings: articulos.length ? [] : ["Blog sin artículos: añade los títulos y textos reales en data/blog.json."],
    body: (root) => `
${phero(root, { kicker: "Blog", title: "Blog", sub: "Ideas sobre selección, gestión y desarrollo de personas.", crumbs: crumb({ name: "Blog", path: "blog/" }) })}
<section class="sec">
  <div class="wrap">
    ${articulos.length ? `<ul class="posts">${articulos.map((a) => `<li><a href="${root}blog/${a.slug}/"><h2>${esc(a.titulo)}</h2>${a.resumen ? `<p>${esc(a.resumen)}</p>` : ""}<span class="more">Leer artículo ${icon.arrow}</span></a></li>`).join("")}</ul>`
      : `<p class="lead-dark">Muy pronto publicaremos aquí nuestros artículos.</p>`}
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
      title: `${a.titulo} · Blog · Sibberia`,
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
    title: "Contacto · Sibberia",
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
        ${cfg.telefonos.map((t) => `<li>${icon.phone}<a href="tel:${t.tel}">${t.texto}</a></li>`).join("")}
      </ul>
      <a class="btn btn-ghost" href="${root}ofertas-de-trabajo/">Ver ofertas de trabajo ${icon.arrow}</a>
    </aside>
    <form class="cform" data-form="contacto" data-endpoint="${esc(cfg.formularios.contacto)}" novalidate>
      <fieldset class="who">
        <legend>Te escribo como</legend>
        <label><input type="radio" name="perfil" value="empresa" checked> Empresa</label>
        <label><input type="radio" name="perfil" value="candidato"> Candidato/a</label>
      </fieldset>
      <div class="frow">
        <div class="ffield"><label for="f-name">Nombre *</label><input id="f-name" name="nombre" type="text" required autocomplete="name"><p class="ferr" id="e-name"></p></div>
        <div class="ffield"><label for="f-company">Empresa</label><input id="f-company" name="empresa" type="text" autocomplete="organization"></div>
      </div>
      <div class="frow">
        <div class="ffield"><label for="f-email">Email *</label><input id="f-email" name="email" type="email" required autocomplete="email" spellcheck="false" inputmode="email"><p class="ferr" id="e-email"></p></div>
        <div class="ffield"><label for="f-phone">Teléfono</label><input id="f-phone" name="telefono" type="tel" autocomplete="tel" inputmode="tel"></div>
      </div>
      <div class="ffield"><label for="f-msg">Mensaje *</label><textarea id="f-msg" name="mensaje" required rows="6"></textarea><p class="ferr" id="e-msg"></p></div>
      <label class="check"><input type="checkbox" name="privacidad" required> <span>He leído y acepto la <a href="${root}legal/#privacidad">política de privacidad</a>. *</span></label>
      <div class="hp" aria-hidden="true"><label>No rellenar <input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>
      <button class="btn btn-primary" type="submit">Enviar mensaje ${icon.arrow}</button>
      <p class="form-status" role="status" aria-live="polite"></p>
    </form>
  </div>
</section>`
  });

  /* LEGAL */
  const pend = (k, label) => cfg.pendienteDeValidar[k] ? esc(cfg.pendienteDeValidar[k]) : `<mark class="pending">${label}: pendiente de validar</mark>`;
  pages.push({
    path: "legal/",
    nav: "",
    title: "Aviso legal, privacidad y cookies · Sibberia",
    description: "Aviso legal, política de privacidad y política de cookies de Sibberia.",
    css: ["subpage.css"],
    crumbs: crumb({ name: "Aviso legal", path: "legal/" }),
    noindex: !cfg.pendienteDeValidar.cif,
    body: (root) => `
${phero(root, { kicker: "Legal", title: "Aviso legal y privacidad", crumbs: crumb({ name: "Aviso legal", path: "legal/" }) })}
<section class="sec">
  <div class="wrap narrow prose legal">
    <h2>Aviso legal</h2>
    <p>En cumplimiento de la Ley 34/2002, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa de los datos del titular de este sitio web:</p>
    <ul>
      <li>Titular: ${pend("razonSocial", "Razón social")}</li>
      <li>CIF: ${pend("cif", "CIF")}</li>
      <li>Domicilio: ${pend("direccion", "Dirección postal")}</li>
      <li>Email: <a href="mailto:${cfg.email}">${cfg.email}</a> · Teléfonos: ${cfg.telefonos.map((t) => `<a href="tel:${t.tel}">${t.texto}</a>`).join(" y ")}</li>
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
    title: "Página no encontrada · Sibberia",
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
