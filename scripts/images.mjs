/* Genera las fotos en WebP (varios anchos) y la imagen og:image.
   Uso: node scripts/images.mjs <carpeta-con-originales-jpg> */
import sharp from "sharp";
const F = process.argv[2], OUT = "assets/img";
const jobs = [
  ["hero", "bloques-personas", [1600, 960]],
  ["s4", "formacion-sesion", [960, 640]],
  ["s5", "taller-asistentes", [960, 640]],
  ["s6", "equipo-colaborando", [960, 640]],
];
for (const [src, name, widths] of jobs) {
  for (const w of widths) {
    const info = await sharp(`${F}/${src}.jpg`).resize({ width: w, withoutEnlargement: true }).webp({ quality: 78 }).toFile(`${OUT}/${name}-${w}.webp`);
    console.log(name, w, info.width + "x" + info.height, info.size);
  }
}
// og:image 1200x630: foto de bloques con velo índigo y logo blanco
const logo = await sharp("assets/img/sibberia-logo-blanco.svg", { density: 600 }).resize({ width: 520 }).png().toBuffer();
const veil = Buffer.from(`<svg width="1200" height="630"><defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="#22358B" stop-opacity=".92"/><stop offset=".6" stop-color="#22358B" stop-opacity=".55"/><stop offset="1" stop-color="#22358B" stop-opacity=".15"/></linearGradient></defs><rect width="1200" height="630" fill="url(#g)"/><rect x="80" y="380" width="90" height="8" fill="#FFB511"/></svg>`);
const og = await sharp(`${F}/hero.jpg`).resize(1200, 630, { fit: "cover" }).composite([{ input: veil }, { input: logo, left: 80, top: 250 }]).jpeg({ quality: 84 }).toFile(`${OUT}/og-sibberia.jpg`);
console.log("og", og.size);
