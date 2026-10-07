/* SIBBERIA — genera las ilustraciones de cubos de hielo (assets/img/escena-*.webp).
   Uso:  npm run images                  todas
         npm run images -- produccion    solo las que se nombren
   Necesita Playwright con Chromium. Si no está instalado en el proyecto,
   indica dónde está:  PLAYWRIGHT=/ruta/node_modules/playwright/index.mjs npm run images
   PREVIEW=carpeta  guarda PNG pequeños en esa carpeta (para ajustar encuadres)
   y no toca assets/img.
   El resultado es determinista: la misma escena da siempre la misma imagen.
   Las composiciones están en scripts/render/escenas.js. */
import { build } from "esbuild";
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { AREA_ICON } from "../site/iconos.mjs";

const pw = await import(process.env.PLAYWRIGHT ? pathToFileURL(process.env.PLAYWRIGHT).href : "playwright");
const { chromium } = pw.default || pw;

const ESCENAS = [
  ...Object.entries(AREA_ICON).map(([name, icon]) => ({ name, icon })),
  { name: "ofertas" },
  { name: "contacto" },
  { name: "seleccion" }
];
const ANCHOS = [640, 960, 1600];
const preview = process.env.PREVIEW;
const pedidas = process.argv.slice(2);

const { outputFiles } = await build({
  entryPoints: ["scripts/render/escenas.js"], bundle: true, format: "iife",
  globalName: "SibEscenas", write: false, minify: true, target: "es2020"
});

const browser = await chromium.launch({
  // WebGL por software: funciona igual en cualquier máquina (y sin GPU)
  args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"]
});
if (preview) mkdirSync(preview, { recursive: true });

for (const e of ESCENAS.filter((x) => !pedidas.length || pedidas.includes(x.name))) {
  const t0 = Date.now();
  const page = await browser.newPage();
  page.on("pageerror", (err) => console.error(`${e.name}: ${err.message}`));
  await page.setContent('<!DOCTYPE html><canvas id="c"></canvas>');
  await page.addScriptTag({ content: outputFiles[0].text });
  // Se renderiza al doble de tamaño y se reduce: bordes limpios sin dientes
  const [w, h] = preview ? [960, 540] : [3200, 1800];
  const url = await page.evaluate(
    ({ name, icon, w, h }) => SibEscenas.render(document.getElementById("c"), name, { icon, w, h }),
    { name: e.name, icon: e.icon || null, w, h }
  );
  await page.close();
  const png = Buffer.from(url.slice(url.indexOf(",") + 1), "base64");
  if (preview) {
    await sharp(png).toFile(`${preview}/${e.name}.png`);
  } else {
    for (const ancho of ANCHOS) {
      await sharp(png).resize(ancho).webp({ quality: 80, effort: 6 }).toFile(`assets/img/escena-${e.name}-${ancho}.webp`);
    }
  }
  console.log(`escena-${e.name}  ${((Date.now() - t0) / 1000).toFixed(1)} s`);
}
await browser.close();
