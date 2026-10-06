/* SIBBERIA — generador del sitio estático.
   Uso: npm run build:site            (usa site/config.json)
        SITE_URL=https://sibberia.com npm run build:site   (producción)
   Genera todas las páginas, sitemap.xml, robots.txt y redirecciones
   desde las rutas antiguas (pages/*.html). */
import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from "node:fs";
import { dirname } from "node:path";
import { page } from "./layout.mjs";
import { buildPages } from "./pages.mjs";

const cfg = JSON.parse(readFileSync("site/config.json", "utf8"));
if (process.env.SITE_URL) cfg.siteUrl = process.env.SITE_URL;
cfg.siteUrl = cfg.siteUrl.replace(/\/+$/, "");

const { ofertas } = JSON.parse(readFileSync("data/ofertas.json", "utf8"));
const { articulos } = JSON.parse(readFileSync("data/blog.json", "utf8"));
const { areas } = JSON.parse(readFileSync("data/areas.json", "utf8"));
cfg.areas = areas; // el pie y el JSON-LD de la organización las enlazan
const pages = buildPages(cfg, { ofertas, articulos, areas });

// Directorios generados: se limpian para no dejar fichas de ofertas cerradas
for (const d of ["ofertas-de-trabajo", "blog", ...areas.map((a) => `seleccion-personas/${a.slug}`)]) if (existsSync(d)) rmSync(d, { recursive: true });

const write = (file, html) => {
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
};

const warnings = [];
for (const p of pages) {
  const file = p.file || (p.path ? `${p.path}index.html` : "index.html");
  write(file, page(p, cfg));
  (p.warnings || []).forEach((w) => warnings.push(w));
}

// Sitemap
const today = new Date().toISOString().slice(0, 10);
const urls = pages.filter((p) => p.sitemap !== false && !p.noindex)
  .map((p) => `  <url><loc>${cfg.siteUrl}/${p.path}</loc><lastmod>${today}</lastmod></url>`).join("\n");
write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
write("robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${cfg.siteUrl}/sitemap.xml\n`);

// Rutas antiguas de esta web: redirección a la nueva (GitHub Pages no admite 301)
const old = {
  "pages/seleccion.html": "seleccion-personas/",
  "pages/consultoria.html": "estrategia-y-gestion-del-capital-humano/",
  "pages/formacion.html": "formacion-y-desarrollo-de-personas/",
  "pages/nosotros.html": "nosotros/",
  "pages/blog.html": "blog/",
  "pages/contacto.html": "contacto/",
  "pages/legal.html": "legal/"
};
for (const [from, to] of Object.entries(old)) {
  const target = `${cfg.siteUrl}/${to}`;
  write(from, `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><title>Redirigiendo…</title><meta name="robots" content="noindex"><link rel="canonical" href="${target}"><meta http-equiv="refresh" content="0; url=../${to}"></head><body><p>Esta página se ha movido a <a href="../${to}">${target}</a>.</p></body></html>\n`);
}

console.log(`Generadas ${pages.length} páginas para ${cfg.siteUrl}`);
if (warnings.length) {
  console.log("\nPendiente de completar:");
  warnings.forEach((w) => console.log("  - " + w));
}
