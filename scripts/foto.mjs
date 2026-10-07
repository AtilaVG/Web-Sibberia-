/* Convierte una foto a WebP en los anchos que usa la web.
   Uso: node scripts/foto.mjs <foto-original> <nombre>
        → assets/img/<nombre>-640.webp, -960.webp y -1600.webp (16:9)
        node scripts/foto.mjs <foto-original> <nombre> retrato
        → assets/img/<nombre>-480.webp y -800.webp (4:5, p. ej. la foto del fundador)
   Después se enlaza en data/areas.json (familias) o en site/pages.mjs. */
import sharp from "sharp";

const [src, name, modo] = process.argv.slice(2);
if (!src || !name) {
  console.error("Uso: node scripts/foto.mjs <foto-original> <nombre> [retrato]");
  process.exit(1);
}
const retrato = modo === "retrato";
const [anchos, ratio] = retrato ? [[480, 800], 5 / 4] : [[640, 960, 1600], 9 / 16];
// Si el original es pequeño, el recorte se reduce pero mantiene la proporción
// (sin ampliar la foto, que saldría borrosa).
const { width: W, height: H } = await sharp(src).metadata();
const maxW = Math.floor(Math.min(W, H / ratio));
if (maxW < anchos[anchos.length - 1]) console.warn(`Aviso: el original (${W}x${H}) es pequeño; conviene uno de al menos ${anchos[anchos.length - 1]} px de ancho útil.`);
for (const w of anchos) {
  const ww = Math.min(w, maxW);
  const info = await sharp(src)
    .resize({ width: ww, height: Math.round(ww * ratio), fit: "cover", position: retrato ? "attention" : "centre" })
    .webp({ quality: 78, effort: 6 })
    .toFile(`assets/img/${name}-${w}.webp`);
  console.log(`${name}-${w}.webp  ${info.width}x${info.height}  ${Math.round(info.size / 1024)} KB`);
}
