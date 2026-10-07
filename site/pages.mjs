/* SIBBERIA — contenido de las páginas.
   Regla de contenido: solo datos verificados en sibberia.com o facilitados
   por el cliente. Cualquier texto redactado para esta web está listado en
   docs/textos-para-validar.md. */
import { esc, icon, picture, organization, NAV, telTxt } from "./layout.mjs";

/* Selección es el servicio principal; Estrategia y Formación, secundarios
   (PDF de cambios del cliente, 7-oct-2026). 'chips' resume cada servicio en
   el bloque «¿Qué más hacemos en SIBBERIA?»; los de Selección son las familias. */
const SERVICIOS = [
  {
    path: "seleccion-personas/",
    nombre: "Selección de personas",
    corto: "Selección",
    principal: true,
    foto: { name: "bloques-personas", widths: [960, 1600], alt: "Una mano elige un bloque de madera con la figura de una persona entre varios bloques iguales." },
    cabecera: { name: "foto-seleccion", widths: [640, 960, 1600], alt: "Una consultora de selección entrevista a un candidato con ropa de trabajo en una sala acristalada junto a la planta.", cls: "foco-dcha" },
    resumen: "Seleccionamos perfiles técnicos e industriales con búsqueda directa y un modelo a éxito.",
    intro: "Especialistas en selección de perfiles técnicos e industriales en España. Buscamos activamente a los profesionales que más cuesta encontrar y trabajamos a éxito."
  },
  {
    path: "estrategia-y-gestion-del-capital-humano/",
    nombre: "Estrategia y gestión del capital humano",
    corto: "Estrategia",
    foto: { name: "equipo-colaborando", widths: [640, 960], alt: "Equipo de seis personas revisa en un portátil un proyecto común alrededor de una mesa." },
    resumen: "Apoyo a la dirección y al área de RRHH: externalización, interim y proyectos de personas a medida.",
    intro: "Acompañamos a la dirección y al área de personas en la estrategia y la gestión del capital humano, con proyectos diseñados a medida de cada organización.",
    seoDescripcion: "Interim HR, RPO, BPO de Recursos Humanos, apoyo temporal a departamentos de RRHH, evaluación y desarrollo y proyectos de Recursos Humanos a medida.",
    items: [
      { t: "Interim HR", d: "Un responsable de RRHH temporal para cubrir una ausencia, una transición o un proyecto." },
      { t: "RPO", d: "Externalización de tus procesos de selección: los llevamos como parte de tu equipo." },
      { t: "BPO de Recursos Humanos", d: "Externalización de la gestión de Recursos Humanos y de la administración de personal." },
      { t: "Apoyo temporal a departamentos de RRHH", d: "Refuerzo para tu equipo de RRHH en picos de trabajo o proyectos concretos." },
      { t: "Evaluación y desarrollo", d: "Evaluación del desempeño y del potencial, y planes de desarrollo para tus equipos." },
      { t: "Organización", d: "Estructura, puestos y funciones: una organización clara para que cada persona sepa qué se espera de ella." },
      { t: "Proyectos de Recursos Humanos a medida", d: "Diseñamos contigo el proyecto de personas que necesita tu organización." }
    ]
  },
  {
    path: "formacion-y-desarrollo-de-personas/",
    nombre: "Formación y desarrollo de personas",
    corto: "Formación",
    foto: { name: "formacion-sesion", widths: [640, 960], alt: "Formador sentado en una mesa habla con un grupo de profesionales en una sala luminosa." },
    resumen: "Formación a medida para tus equipos, presencial y online.",
    intro: "Diseñamos e impartimos programas de formación y desarrollo a la medida de las necesidades de cada equipo, en formato presencial y online.",
    seoDescripcion: "Formación a medida para empresas: gestión de equipos, liderazgo, inteligencia artificial, Power BI, ventas, atención al cliente y formación técnica.",
    temas: ["Gestión de equipos", "Inteligencia artificial", "Liderazgo", "Power BI", "Ventas", "Atención al cliente", "Formación técnica"],
    formato: ["Programas a medida", "Presencial y online", "Formación bonificada (FUNDAE)"]
  }
];
SERVICIOS[1].chips = SERVICIOS[1].items.map((i) => i.t);
SERVICIOS[2].chips = [...SERVICIOS[2].temas, ...SERVICIOS[2].formato];

/* «¿Por qué trabajar con SIBBERIA?»: textos del cliente */
const POR_QUE = [
  { t: "Trabajamos a éxito", d: "Nuestro modelo está vinculado a conseguir la incorporación del profesional.", i: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>' },
  { t: "Buscamos, no esperamos", d: "No nos limitamos a publicar ofertas. Hacemos búsqueda directa (headhunting) y salimos activamente al mercado a localizar profesionales.", i: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>' },
  { t: "Especialización industrial real", d: "Trabajamos perfiles de mantenimiento, producción, ingeniería, automatización, calidad, operaciones, logística y posiciones técnicas especializadas.", i: '<path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M17 18h1M12 18h1M7 18h1"/>' },
  { t: "Consultores senior implicados directamente", d: "Los procesos están dirigidos por profesionales con experiencia real en selección y Recursos Humanos.", i: '<circle cx="9" cy="7" r="4"/><path d="M2 21v-1a6 6 0 0 1 6-6h2a6 6 0 0 1 6 6v1"/><path d="m16 11 2 2 4-4"/>' },
  { t: "Acompañamiento hasta la incorporación", d: "Estamos presentes desde la definición del perfil hasta entrevistas, negociación e incorporación.", i: '<path d="M4 22V4"/><path d="M4 4h13l-2.5 4.5L17 13H4"/>' },
  { t: "Garantía", d: "Nuestros procesos incluyen garantía de sustitución según las condiciones acordadas con cada cliente.", i: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>' }
];

/* Iconos de línea (24×24, trazo) */
const svg = (paths, cls) => `<svg class="${cls}" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;
const ICO_OK = '<path d="M20 6 9 17l-5-5"/>';
const ICO_DIF = '<circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16h.01"/>';

/* Iconos por familia de perfiles */
const AREA_ICON = {
  "mantenimiento-y-sat": '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
  "produccion": '<path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M17 18h1M12 18h1M7 18h1"/>',
  "calidad-prl-medioambiente": '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
  "almacen-logistica-planificacion-compras": '<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/>',
  "ingenieria-y-proyectos": '<path d="M12 2v4"/><circle cx="12" cy="8" r="2"/><path d="m10.5 9.8-6 11.2M13.5 9.8l6 11.2M6 17h12"/>',
  "automatizacion-y-robotica": '<rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4M8 16h.01M16 16h.01"/>',
  "programadores": '<path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/>'
};
const areaIcon = (slug) => svg(AREA_ICON[slug] || AREA_ICON.produccion, "area-ico");

let AREA_NAMES = {};

/* Foto de cabecera de una familia (data/areas.json → foto). El tema está a la
   derecha de la foto: la clase lo mantiene a la vista cuando se recorta en móvil. */
const fotoCabecera = (archivo, alt) => ({ name: archivo, widths: [640, 960, 1600], alt, cls: "foco-dcha" });
const fotoArea = (a) => (a && a.foto ? fotoCabecera(a.foto.archivo, a.foto.alt) : null);
const FOTO_OFERTAS = fotoCabecera("foto-ofertas", "Una candidata con ropa de trabajo consulta su móvil a la entrada de una nave industrial al amanecer.");
const FOTO_CONTACTO = fotoCabecera("foto-contacto", "Una consultora y un responsable de planta conversan junto a un portátil en una oficina acristalada con vistas a la planta.");

/* Foto profesional del fundador para Nosotros (pendiente de que la facilite el
   cliente). Cuando llegue: { name: "samuel-sanchez", widths: [480, 800], ratio: 5 / 4,
   alt: "Samuel Sánchez, fundador de SIBBERIA" }, con las imágenes en assets/img. */
const FOTO_FUNDADOR = null;

/* La llamada a la acción que se repite (PDF del cliente, punto 8): arriba,
   tras las especialidades, tras «cómo trabajamos» y al final de cada página. */
const btnPerfil = (root, cls = "btn btn-primary") =>
  `<a class="${cls}" href="${root}contacto/">Cuéntanos qué perfil buscas ${icon.arrow}</a>`;

/* Formulario «Envíanos tu CV». Con destino configurado (formularios.candidaturas)
   el CV se adjunta en el propio formulario; sin él, se prepara un correo y se
   pide adjuntarlo. */
const ACEPTA_CV = ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";
function cvForm(root, cfg, { id, oferta = null, ofertas = [] }) {
  const endpoint = cfg.formularios.candidaturas || "";
  const sinJs = endpoint
    ? `action="${esc(endpoint)}" method="post" enctype="multipart/form-data"`
    : `action="mailto:${cfg.email}" method="post" enctype="text/plain"`;
  const nombreOferta = (o) => `${o.titulo} (${o.ubicacion})`;
  return `<form class="cform cvform" data-form="candidatura" data-endpoint="${esc(endpoint)}" ${sinJs} novalidate>
      ${oferta ? `<p class="cv-oferta">Oferta: <b>${esc(oferta.titulo)}</b> · ${esc(oferta.ubicacion)}</p><input type="hidden" name="oferta" value="${esc(nombreOferta(oferta))}">` : ""}
      <div class="frow">
        <div class="ffield"><label for="${id}-name">Nombre y apellidos *</label><input id="${id}-name" name="nombre" type="text" required autocomplete="name"><p class="ferr"></p></div>
        <div class="ffield"><label for="${id}-email">Email *</label><input id="${id}-email" name="email" type="email" required autocomplete="email" spellcheck="false" inputmode="email"><p class="ferr"></p></div>
      </div>
      <div class="frow">
        <div class="ffield"><label for="${id}-phone">Teléfono *</label><input id="${id}-phone" name="telefono" type="tel" required autocomplete="tel" inputmode="tel"><p class="ferr"></p></div>
        ${oferta ? "" : `<div class="ffield"><label for="${id}-oferta">Oferta</label><select id="${id}-oferta" name="oferta">
          <option value="">Candidatura espontánea</option>
          ${ofertas.map((o) => `<option value="${esc(nombreOferta(o))}">${esc(o.titulo)} · ${esc(o.ubicacion)}</option>`).join("")}
        </select></div>`}
      </div>
      ${endpoint ? `<div class="ffield ffile"><label for="${id}-cv">Adjunta tu CV *</label><input id="${id}-cv" name="cv" type="file" required accept="${ACEPTA_CV}" aria-describedby="${id}-cv-hint"><p class="fhint" id="${id}-cv-hint">PDF o Word, máximo 5&nbsp;MB.</p><p class="ferr"></p></div>` : ""}
      <div class="ffield"><label for="${id}-msg">Mensaje (opcional)</label><textarea id="${id}-msg" name="mensaje" rows="3"></textarea></div>
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
    <p>También trabajamos otras posiciones técnicas especializadas.</p>
    <span class="more">Cuéntanos qué perfil buscas ${icon.arrow}</span>
  </a>
</li>`;
  return `<ul class="areas${current ? " six" : ""}">${areas.filter((a) => a.slug !== current).map((a) => `<li class="area">
  <a href="${root}seleccion-personas/${a.slug}/">
    ${areaIcon(a.slug)}
    <h3>${esc(a.nombre)}</h3>
    <p>${esc(a.resumen)}</p>
    <span class="more">Ver perfiles ${icon.arrow}</span>
  </a>
</li>`).join("")}${otro}</ul>`;
}

/* «¿Por qué trabajar con SIBBERIA?» (inicio en oscuro; Selección en claro) */
function porQue(root, { dark = false, acciones = "" } = {}) {
  return `<section class="sec por-que${dark ? " dark" : " soft"}" id="por-que" aria-labelledby="t-porque">
  <div class="wrap">
    <h2 class="giant-sm" id="t-porque"><span class="kicker">¿Por qué trabajar con SIBBERIA?</span> Una forma diferente de trabajar la selección industrial</h2>
    <ul class="ventajas">${POR_QUE.map((v) => `<li>${svg(v.i, "v-ico")}<h3>${v.t}</h3><p>${v.d}</p></li>`).join("")}</ul>
    ${acciones}
  </div>
</section>`;
}

/* Base de talento: cifra real del cliente («800 y pico»), sin desglose por
   familia y sin dar a entender que esas personas están disponibles hoy. */
const talento = () => `<section class="sec talento" aria-labelledby="t-talento">
  <div class="wrap talento-grid">
    <p class="talento-num" aria-hidden="true">+800</p>
    <div>
      <h2 id="t-talento">Más de 800 profesionales técnicos e industriales identificados</h2>
      <p>Nuestra base de talento reúne más de 800 profesionales relacionados con mantenimiento, producción, automatización, ingeniería, calidad, logística y otras especialidades industriales.</p>
      <p>Cada nueva búsqueda parte de ese conocimiento del mercado y se complementa con una búsqueda directa específica para cada posición.</p>
    </div>
  </div>
</section>`;

/* «¿Qué más hacemos en SIBBERIA?»: tarjetas con lo que incluye cada servicio.
   La tarjeta entera es el enlace del título (sin enlaces duplicados). */
function masServicios(root, servicios, { id = "t-mas", titulo = "¿Qué más hacemos en SIBBERIA?", cls = "" } = {}) {
  return `<section class="sec mas-sec ${cls}" aria-labelledby="${id}">
  <div class="wrap">
    <h2 class="giant-sm" id="${id}">${titulo}</h2>
    <div class="mas-grid">${servicios.map((s) => `<article class="mas${s.principal ? " principal" : ""}">
      ${s.principal ? `<p class="mas-tag">Nuestro servicio principal</p>` : ""}
      <h3><a href="${root}${s.path}">${s.principal ? "Selección de perfiles técnicos e industriales" : s.nombre}</a></h3>
      <p>${s.resumen}</p>
      <ul class="chips">${s.chips.map((c) => `<li>${esc(c)}</li>`).join("")}</ul>
      <span class="more" aria-hidden="true">Ver servicio ${icon.arrow}</span>
    </article>`).join("")}</div>
  </div>
</section>`;
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
const CRUMB_SEL = { name: "Selección de perfiles técnicos", path: "seleccion-personas/" };

/* Llamada final de cada página: botón principal y contacto directo */
function contactoCTA(root, cfg, { titulo = "¿Hablamos?", texto = "Cuéntanos qué perfil buscas y te respondemos lo antes posible.", boton = btnPerfil(root) } = {}) {
  return `<section class="sec cta">
  <div class="wrap">
    <h2 class="giant-sm">${titulo}</h2>
    <p>${texto}</p>
    <div class="acts">
      ${boton}
      <a class="btn btn-out" href="mailto:${cfg.email}">${cfg.email}</a>
      <a class="btn btn-out" href="tel:${cfg.telefonos[0].tel}">${telTxt(cfg.telefonos[0])}</a>
    </div>
  </div>
</section>`;
}
const TEXTO_CTA_PERFIL = "Cuéntanos el puesto, la ubicación y cuándo lo necesitas. Te respondemos lo antes posible.";

/* ---------- Páginas ---------- */

export function buildPages(cfg, data) {
  const url = cfg.siteUrl;
  const areas = data.areas || [];
  const areaBySlug = Object.fromEntries(areas.map((a) => [a.slug, a]));
  AREA_NAMES = Object.fromEntries(areas.map((a) => [a.slug, a.nombre]));
  SERVICIOS[0].chips = areas.map((a) => a.nombre);
  const org = organization(cfg, url);
  const ofertas = data.ofertas.filter((o) => o.estado === "abierta");
  const articulos = data.articulos.filter((a) => a.titulo && a.cuerpo);
  const pages = [];
  const [SELECCION, ...SECUNDARIOS] = SERVICIOS;

  /* HOME: orientada a empresas; las ofertas siguen a la vista para candidatos */
  pages.push({
    path: "",
    nav: "",
    title: "Selección de perfiles técnicos e industriales | SIBBERIA",
    description: "Especialistas en selección de perfiles técnicos e industriales en España: búsqueda directa, modelo a éxito y consultores senior para tu empresa.",
    css: ["home.css"],
    bodyClass: "home",
    scripts: ["assets/vendor/gsap.min.js", "assets/vendor/ScrollTrigger.min.js", "assets/js/ofertas.js?v=3", "assets/js/pages/home.js?v=7"],
    jsonld: [org, { "@type": "WebSite", "@id": `${url}/#web`, url: `${url}/`, name: "SIBBERIA", inLanguage: "es", publisher: { "@id": `${url}/#organizacion` } }],
    body: (root) => `
<div class="stage" aria-hidden="true">
  <canvas id="ice3d"></canvas>
  <div class="stage-fallback">${picture(root, { name: "bloques-personas", widths: [960, 1600], alt: "", eager: true })}</div>
</div>

<section class="hero chapter" id="hero" data-step="0">
  <div class="wrap">
    <h1><span class="kicker">Selección de</span> <span class="giant">Perfiles técnicos<br>e industriales</span></h1>
    <p class="sub">Encontramos los perfiles técnicos que más cuesta encontrar. Selección especializada para la industria, con un modelo a éxito y una búsqueda activa orientada a encontrar profesionales que realmente encajen.</p>
    <div class="paths">
      <a class="path path-main" href="${root}contacto/">
        <span class="path-kicker">Para empresas</span>
        <strong>Busco personal</strong>
        <span class="path-btn">Cuéntanos qué perfil buscas ${icon.arrow}</span>
      </a>
      <a class="path" href="${root}ofertas-de-trabajo/">
        <span class="path-kicker">Para candidatos</span>
        <strong>Busco empleo</strong>
        <span class="path-text">Consulta las ofertas abiertas y envíanos tu CV.</span>
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
        <p class="lead">Empezamos por entender el puesto: la planta, el equipo, los turnos y lo que de verdad tiene que saber hacer la persona.</p>
        <p class="stat"><b>+15</b> <span>años de experiencia profesional en Recursos Humanos</span></p>
      </li>
      <li class="lema-step" id="crear" data-step="2">
        <h3 class="word">Crear</h3>
        <p class="lead">Salimos a buscar al profesional que encaja, con búsqueda directa, y te presentamos solo perfiles validados; habitualmente, los primeros en 5–7&nbsp;días.</p>
        <p class="stat"><b>+800</b> <span>profesionales técnicos e industriales identificados</span></p>
      </li>
      <li class="lema-step" id="crecer" data-step="3">
        <h3 class="word">Crecer</h3>
        <p class="lead">Te acompañamos en las entrevistas, la negociación y la incorporación. Trabajamos a éxito: nuestro objetivo es el mismo que el tuyo.</p>
        <p class="stat"><b>100%</b> <span>proyectos a medida</span></p>
      </li>
    </ol>
  </div>
</section>

<section class="sec perfiles-sec" id="perfiles" aria-labelledby="t-perfiles">
  <div class="wrap">
    <div class="sec-head">
      <div>
        <h2 class="giant-sm" id="t-perfiles">Nuestras especialidades</h2>
        <p class="sec-lead">Especialistas en selección de perfiles técnicos e industriales en España: los que hacen funcionar una planta.</p>
      </div>
      <a class="btn btn-ghost" href="${root}seleccion-personas/">Selección de perfiles técnicos ${icon.arrow}</a>
    </div>
    ${areasGrid(root, areas)}
  </div>
</section>

${porQue(root, { dark: true, acciones: `<div class="acts">${btnPerfil(root)}<a class="btn btn-out" href="${root}seleccion-personas/#como-trabajamos">Cómo trabajamos la selección</a></div>` })}

${masServicios(root, [...SECUNDARIOS].reverse(), { cls: "soft" })}

<section class="sec ofertas-sec" aria-labelledby="t-ofertas">
  <div class="wrap">
    <div class="sec-head">
      <h2 class="giant-sm" id="t-ofertas"><span class="kicker">Para candidatos</span> Ofertas de trabajo</h2>
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

${contactoCTA(root, cfg, { titulo: "¿Qué perfil necesitas incorporar?", texto: TEXTO_CTA_PERFIL })}`
  });

  /* SELECCIÓN: la página comercial principal */
  {
    const s = SELECCION;
    const crumbs = crumb(CRUMB_SEL);
    const faq = [
      { q: "¿Qué perfiles técnicos e industriales seleccionáis?", a: "Seleccionamos perfiles de mantenimiento y SAT, producción, calidad, PRL y medioambiente, almacén, logística, planificación y compras, ingeniería y proyectos, automatización y robótica, y programación, además de otras posiciones técnicas especializadas." },
      { q: "¿Cómo funciona vuestro modelo a éxito?", a: "Nuestro modelo está vinculado a conseguir la incorporación del profesional. Te explicamos las condiciones con detalle antes de empezar." },
      { q: "¿Cuánto tardáis en presentar candidatos?", a: "Habitualmente buscamos presentar los primeros perfiles validados en 5–7 días, aunque cada proceso depende del perfil y del mercado." },
      { q: "¿Hacéis headhunting o solo publicáis ofertas?", a: "No nos limitamos a publicar ofertas. Hacemos búsqueda directa y salimos activamente al mercado a localizar profesionales, también a quienes no están buscando empleo." },
      { q: "¿Qué garantía tienen vuestros procesos?", a: "Nuestros procesos incluyen garantía de sustitución según las condiciones acordadas con cada cliente." },
      { q: "Busco empleo, ¿cómo me presento?", a: "Consulta nuestras ofertas de trabajo y envíanos tu CV desde la propia oferta. Si ahora no ves ninguna para tu perfil, también puedes enviarnos tu candidatura." }
    ];
    pages.push({
      path: s.path,
      nav: s.path,
      title: "Consultora de selección de perfiles industriales | SIBBERIA",
      description: "Consultora de selección industrial en España: técnicos de mantenimiento, electromecánicos, programadores PLC, ingenieros y responsables de producción.",
      css: ["subpage.css"],
      crumbs,
      jsonld: [{
        "@type": "Service",
        name: "Selección de perfiles técnicos e industriales",
        serviceType: "Selección de personal",
        description: s.intro,
        url: `${url}/${s.path}`,
        provider: org,
        areaServed: { "@type": "Country", name: "España" },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Perfiles técnicos e industriales",
          itemListElement: areas.map((a) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: a.titulo, url: `${url}/${s.path}${a.slug}/` } }))
        }
      }, {
        "@type": "FAQPage",
        mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } }))
      }],
      body: (root) => `
${phero(root, {
  kicker: "Selección de perfiles técnicos e industriales",
  title: "Consultora de selección industrial",
  sub: s.intro,
  foto: s.cabecera,
  crumbs,
  actions: `<div class="acts">${btnPerfil(root)}</div>`
})}
${porQue(root)}
${talento()}
<section class="sec" id="especialidades" aria-labelledby="t-areas">
  <div class="wrap">
    <h2 class="giant-sm" id="t-areas">Perfiles que seleccionamos</h2>
    ${areasGrid(root, areas)}
  </div>
</section>
<section class="sec soft" id="como-trabajamos" aria-labelledby="t-como">
  <div class="wrap">
    <h2 class="giant-sm" id="t-como">Cómo trabajamos</h2>
    <ol class="steps">
      <li><h3>Compartir</h3><p>Definimos contigo el perfil: funciones, conocimientos técnicos, turnos, equipo y condiciones.</p></li>
      <li><h3>Crear</h3><p>Salimos al mercado con búsqueda directa, entrevistamos y validamos. Habitualmente buscamos presentarte los primeros perfiles validados en 5–7&nbsp;días.</p></li>
      <li><h3>Crecer</h3><p>Te acompañamos en las entrevistas, la negociación y la incorporación del profesional.</p></li>
    </ol>
    <div class="acts sec-cta">${btnPerfil(root)}</div>
  </div>
</section>
<section class="sec" aria-labelledby="t-faq">
  <div class="wrap narrow">
    <h2 class="giant-sm" id="t-faq">Preguntas frecuentes</h2>
    <div class="faq">${faq.map((f) => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join("")}</div>
  </div>
</section>
${masServicios(root, [...SECUNDARIOS].reverse(), { cls: "soft" })}
${contactoCTA(root, cfg, { titulo: "¿Qué perfil necesitas incorporar?", texto: TEXTO_CTA_PERFIL })}`
    });
  }

  /* ESTRATEGIA Y FORMACIÓN: servicios secundarios, páginas cortas */
  SECUNDARIOS.forEach((s) => {
    const crumbs = crumb({ name: s.nombre, path: s.path });
    const otros = SERVICIOS.filter((x) => x !== s);
    const contenido = s.items
      ? `<ul class="items">${s.items.map((i) => `<li><h3>${esc(i.t)}</h3><p>${esc(i.d)}</p></li>`).join("")}</ul>`
      : `<div class="items-dos">
        <div><h3>Áreas de formación</h3><ul class="chips big">${s.temas.map((t) => `<li>${esc(t)}</li>`).join("")}</ul></div>
        <div><h3>Cómo la organizamos</h3><ul class="chips big">${s.formato.map((t) => `<li>${esc(t)}</li>`).join("")}</ul></div>
      </div>`;
    pages.push({
      path: s.path,
      nav: s.path,
      title: fit(`${s.nombre} | SIBBERIA`, s.nombre),
      description: s.seoDescripcion,
      css: ["subpage.css"],
      crumbs,
      jsonld: [{
        "@type": "Service",
        name: s.nombre,
        serviceType: s.nombre,
        description: s.intro,
        url: `${url}/${s.path}`,
        provider: org,
        areaServed: { "@type": "Country", name: "España" },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: s.nombre,
          itemListElement: s.chips.map((c) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: c } }))
        }
      }],
      body: (root) => `
${phero(root, {
  kicker: "Servicio",
  title: s.nombre,
  sub: s.intro,
  foto: s.foto,
  crumbs,
  actions: `<div class="acts"><a class="btn btn-primary" href="${root}contacto/">Cuéntanos qué necesitas ${icon.arrow}</a></div>`
})}
<section class="sec" aria-labelledby="t-que">
  <div class="wrap">
    <h2 class="giant-sm" id="t-que">Qué podemos hacer por tu empresa</h2>
    ${contenido}
  </div>
</section>
${masServicios(root, otros, { cls: "soft" })}
${contactoCTA(root, cfg, { texto: "Cuéntanos qué necesita tu empresa y te respondemos lo antes posible.", boton: `<a class="btn btn-primary" href="${root}contacto/">Cuéntanos qué necesitas ${icon.arrow}</a>` })}`
    });
  });

  /* SELECCIÓN POR FAMILIA DE PERFILES (páginas de aterrizaje SEO) */
  areas.forEach((a) => {
    const p = `seleccion-personas/${a.slug}/`;
    const suyas = ofertas.filter((o) => o.area === a.slug);
    const crumbs = crumb(CRUMB_SEL, { name: a.nombre, path: p });
    const enlace = a.notaEnlace && areaBySlug[a.notaEnlace];
    pages.push({
      path: p,
      nav: SELECCION.path,
      title: a.seoTitulo || fit(`${a.titulo} | SIBBERIA`, a.titulo),
      description: a.seoDescripcion || a.intro,
      css: ["subpage.css"],
      crumbs,
      jsonld: [{
        "@type": "Service",
        name: a.titulo,
        serviceType: "Selección de personal",
        category: a.nombre,
        description: a.intro,
        url: `${url}/${p}`,
        provider: org,
        areaServed: { "@type": "Country", name: "España" },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `Perfiles de ${a.nombre}`,
          itemListElement: a.perfiles.map((perfil) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: perfil } }))
        }
      }],
      body: (root) => `
${phero(root, {
  kicker: "Selección de perfiles técnicos",
  title: esc(a.titulo),
  sub: esc(a.intro),
  foto: fotoArea(a),
  crumbs,
  actions: `<div class="acts">${btnPerfil(root)}<a class="btn btn-out" href="${root}ofertas-de-trabajo/${suyas.length ? `?familia=${a.slug}` : ""}">Busco empleo</a></div>`
})}
<section class="sec" aria-labelledby="t-perf">
  <div class="wrap">
    <h2 class="giant-sm" id="t-perf">Perfiles que trabajamos</h2>
    <ul class="perfiles">${a.perfiles.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
    ${a.nota ? `<p class="perf-nota">${esc(a.nota)}${enlace ? ` <a href="${root}seleccion-personas/${enlace.slug}/">Ver ${esc(enlace.nombre)} ${icon.arrow}</a>` : ""}</p>` : ""}
  </div>
</section>
<div class="sec soft">
  <div class="wrap claves">
    <section class="clave" aria-labelledby="t-val">
      <h2 id="t-val">Qué solemos valorar</h2>
      <ul class="lista">${a.valoramos.map((v) => `<li>${svg(ICO_OK, "l-ico ok")}<span>${esc(v)}</span></li>`).join("")}</ul>
    </section>
    <section class="clave" aria-labelledby="t-dif">
      <h2 id="t-dif">Por qué cuesta encontrarlos</h2>
      <ul class="lista">${a.dificultades.map((v) => `<li>${svg(ICO_DIF, "l-ico dif")}<span>${esc(v)}</span></li>`).join("")}</ul>
      <p class="clave-nota">Por eso no esperamos a que lleguen candidatos: salimos a buscarlos y solo te presentamos perfiles validados. <a href="${root}seleccion-personas/#como-trabajamos">Cómo trabajamos</a></p>
    </section>
  </div>
</div>
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
${contactoCTA(root, cfg, { titulo: esc(a.ctaTitulo || "¿Buscas este perfil?"), texto: TEXTO_CTA_PERFIL })}`
    });
  });

  /* NOSOTROS: la historia de SIBBERIA (textos del cliente). El protagonista es
     SIBBERIA, no el fundador; la foto de Samuel, discreta, cuando llegue. */
  {
    const crumbs = crumb({ name: "Nosotros", path: "nosotros/" });
    const f = FOTO_FUNDADOR;
    pages.push({
      path: "nosotros/",
      nav: "nosotros/",
      title: "Nosotros: nuestra historia | SIBBERIA",
      description: "SIBBERIA nace de haber vivido los Recursos Humanos desde los dos lados de la mesa: selección industrial basada en la cercanía, el esfuerzo y la confianza.",
      css: ["subpage.css"],
      crumbs,
      jsonld: [org],
      body: (root) => `
${phero(root, {
  kicker: "Nosotros",
  title: "Nuestra historia",
  sub: "SIBBERIA nace de una forma muy concreta de entender los Recursos Humanos: haberlos vivido desde los dos lados de la mesa.",
  foto: { name: "taller-asistentes", widths: [640, 960], alt: "Grupo de profesionales sonríe mientras escucha a un ponente durante un taller." },
  crumbs
})}
<section class="sec" aria-labelledby="t-historia">
  <div class="wrap historia${f ? " con-foto" : ""}">
    <div class="prose">
      <h2 class="sr-only" id="t-historia">De los dos lados de la mesa</h2>
      <p>Nuestro fundador, Samuel Sánchez, desarrolla su carrera profesional en Recursos Humanos desde 2009, comenzando en selección y consultoría y pasando posteriormente a gestionar personas desde dentro de las organizaciones.</p>
      <p>A lo largo de su trayectoria ha trabajado en selección, consultoría, formación y gestión de Recursos Humanos, llegando a asumir la responsabilidad del área de RRHH de una compañía industrial de aproximadamente 350 personas, coordinando Selección, Relaciones Laborales, Formación, Administración de Personal y Prevención.</p>
      <p class="destacado">Esa experiencia permitió conocer de primera mano qué espera realmente una empresa cuando decide confiar una búsqueda a un proveedor externo: no recibir muchos currículums, sino encontrar profesionales que realmente encajen.</p>
      <p>Después de años trabajando en ambos lados del proceso, esa forma de entender la selección acaba dando forma a SIBBERIA, donde combinamos <a href="${root}seleccion-personas/">selección directa</a>, Interim de RRHH, RPO/BPO, <a href="${root}estrategia-y-gestion-del-capital-humano/">estrategia de personas</a> y <a href="${root}formacion-y-desarrollo-de-personas/">formación a medida</a>.</p>
    </div>
    ${f ? `<figure class="fundador">${picture(root, { ...f, sizes: "(min-width: 900px) 280px, 60vw" })}<figcaption>Samuel Sánchez, fundador de SIBBERIA</figcaption></figure>` : ""}
  </div>
</section>
<section class="sec soft" aria-labelledby="t-nombre">
  <div class="wrap narrow nombre">
    <h2 class="giant-sm" id="t-nombre">¿Por qué SIBBERIA?</h2>
    <p class="lead-dark">El nombre también tiene una historia.</p>
    <p>Samuel procede de <b>Valdecaballeros, Badajoz</b>, municipio situado en La Siberia Extremeña.</p>
    <p>SIBBERIA nace como un guiño a esas raíces y a una forma de trabajar basada en la cercanía, la humildad, el esfuerzo, la confianza y las relaciones construidas a largo plazo.</p>
    <p class="lema-cierre" translate="no">Compartir. Crear. Crecer.</p>
  </div>
</section>
<section class="sec" aria-labelledby="t-exp">
  <div class="wrap">
    <h2 class="sr-only" id="t-exp">Nuestra experiencia</h2>
    <ul class="claims">
      <li>Consultores senior especializados de verdad en perfiles industriales.</li>
      <li>Consultores con más de 15 años de experiencia profesional en Recursos Humanos.</li>
    </ul>
  </div>
</section>
${contactoCTA(root, cfg)}`
    });
  }

  /* OFERTAS: listado */
  pages.push({
    path: "ofertas-de-trabajo/",
    nav: "ofertas-de-trabajo/",
    title: "Ofertas de trabajo técnicas e industriales | SIBBERIA",
    description: "Ofertas de trabajo para perfiles técnicos e industriales: mantenimiento, ingeniería, producción y más. Consulta las posiciones abiertas y envía tu CV.",
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
  foto: FOTO_OFERTAS,
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
    ${cvForm(root, cfg, { id: "cv", ofertas })}
  </div>
</section>`
  });

  /* OFERTAS: fichas */
  ofertas.forEach((o) => {
    const p = `ofertas-de-trabajo/${o.slug}/`;
    const desc = o.descripcion || `SIBBERIA selecciona ${o.titulo} en ${o.ubicacion}.`;
    const job = {
      "@type": "JobPosting",
      title: o.titulo,
      description: `<p>${esc(desc)}</p>`,
      hiringOrganization: { "@type": "Organization", name: "SIBBERIA", sameAs: `${url}/`, logo: `${url}/assets/img/sibberia-logo-azul.svg` },
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
      identifier: { "@type": "PropertyValue", name: "SIBBERIA", value: o.slug }
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
      title: fit(`${o.titulo} en ${o.ubicacion} | SIBBERIA`, `${o.titulo} en ${o.ubicacion}`, `${o.titulo} | SIBBERIA`, o.titulo),
      description: `Oferta de empleo de ${o.titulo} en ${o.ubicacion}. Envía tu CV a SIBBERIA desde la propia oferta.`,
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
  foto: fotoArea(areaBySlug[o.area]) || FOTO_OFERTAS,
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
    title: "Blog | SIBBERIA",
    description: "Artículos de SIBBERIA sobre selección, gestión y desarrollo de personas.",
    css: ["subpage.css"],
    crumbs: crumb({ name: "Blog", path: "blog/" }),
    jsonld: [{ "@type": "Blog", name: "Blog de SIBBERIA", url: `${url}/blog/`, publisher: { "@id": `${url}/#organizacion` } }],
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
      author: { "@type": "Organization", name: a.autor || "SIBBERIA", url: `${url}/` },
      publisher: { "@type": "Organization", name: "SIBBERIA", logo: { "@type": "ImageObject", url: `${url}/assets/img/sibberia-logo-azul.svg` } },
      inLanguage: "es"
    };
    if (a.fecha) art.datePublished = a.fecha;
    pages.push({
      path: p,
      nav: "blog/",
      ogType: "article",
      title: fit(`${a.titulo} | Blog | SIBBERIA`, `${a.titulo} | SIBBERIA`, a.titulo),
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

  /* CONTACTO: destino de «Cuéntanos qué perfil buscas» */
  pages.push({
    path: "contacto/",
    nav: "contacto/",
    title: "Contacto | SIBBERIA",
    description: `Cuéntanos qué perfil buscas. Escríbenos a ${cfg.email} o llámanos al ${cfg.telefonos.map((t) => t.texto).join(" o al ")}.`,
    css: ["subpage.css"],
    crumbs: crumb({ name: "Contacto", path: "contacto/" }),
    jsonld: [{ "@type": "ContactPage", url: `${url}/contacto/`, about: org }],
    body: (root) => `
${phero(root, { kicker: "Contacto", title: "Cuéntanos qué perfil buscas", sub: `Te respondemos lo antes posible. ¿Buscas empleo? <a href="${root}ofertas-de-trabajo/#envia-tu-cv">Envíanos tu CV</a>.`, foto: FOTO_CONTACTO, crumbs: crumb({ name: "Contacto", path: "contacto/" }) })}
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
      <div class="ffield"><label for="f-msg">Mensaje *</label><textarea id="f-msg" name="mensaje" required rows="6" placeholder="Por ejemplo: técnico de mantenimiento electromecánico, a turnos, para una planta en Asturias…"></textarea><p class="ferr"></p></div>
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
    title: "Aviso legal, privacidad y cookies | SIBBERIA",
    description: "Aviso legal, política de privacidad y política de cookies de SIBBERIA.",
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
    <p>El acceso y uso de este sitio web atribuye la condición de usuario e implica la aceptación de las presentes condiciones. Los contenidos de esta web (textos, imágenes, diseño) son propiedad de SIBBERIA o de sus legítimos titulares y no podrán ser reproducidos sin autorización expresa.</p>
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
    title: "Página no encontrada | SIBBERIA",
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
