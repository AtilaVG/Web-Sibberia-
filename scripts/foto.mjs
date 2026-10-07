/* Convierte una foto a WebP en los anchos que usa la web (640, 960 y 1600 px, 16:9).
   Uso: node scripts/foto.mjs <foto-original> <nombre>
        → assets/img/<nombre>-640.webp, -960.webp y -1600.webp
   Después se enlaza en data/areas.json (familias) o en site/pages.mjs. */
import sharp from "sharp";

const [src, name] = process.argv.slice(2);
if (!src || !name) {
  console.error("Uso: node scripts/foto.mjs <foto-original> <nombre>");
  process.exit(1);
}
for (const w of [640, 960, 1600]) {
  const info = await sharp(src)
    .resize({ width: w, height: Math.round((w * 9) / 16), fit: "cover", withoutEnlargement: true })
    .webp({ quality: 78, effort: 6 })
    .toFile(`assets/img/${name}-${w}.webp`);
  console.log(`${name}-${w}.webp  ${info.width}x${info.height}  ${Math.round(info.size / 1024)} KB`);
}
