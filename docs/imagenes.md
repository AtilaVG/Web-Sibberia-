# Fotos de la web

La web usa las fotos facilitadas por el cliente:

| Foto | Dónde se usa |
| --- | --- |
| Bloques de madera (`bloques-personas`) | Home (fondo sin 3D, tarjeta de Selección), cabecera de Selección e imagen para redes sociales |
| Equipo colaborando (`equipo-colaborando`) | Estrategia y gestión del capital humano y su tarjeta |
| Sesión de formación (`formacion-sesion`) | Formación y desarrollo de personas y su tarjeta |
| Taller con asistentes (`taller-asistentes`) | Nosotros |
| Jefa de turno con tableta (`foto-produccion`) | Familia Producción |
| Inspector con calibre (`foto-calidad-prl-medioambiente`) | Familia Calidad, PRL y Medioambiente |
| Técnica con lector en el almacén (`foto-almacen-logistica-planificacion-compras`) | Familia Almacén, Logística, Planificación y Compras |
| Ingeniero con portátil y planos (`foto-ingenieria-y-proyectos`) | Familia Ingeniería y Proyectos y sus ofertas |
| Técnica programando un robot (`foto-automatizacion-y-robotica`) | Familia Automatización y Robótica |

Las cinco fotos de familias (7-oct-2026) las ha generado el cliente con ChatGPT
a partir de los prompts de este documento. Son **imágenes ilustrativas**: no deben
presentarse como el equipo de Sibberia. Se enlazan en `data/areas.json` (campo
`foto`, con su texto alternativo) y las ofertas de esa familia usan la misma.

Pendientes: Mantenimiento y SAT, Programadores/as, Ofertas de trabajo (listado y
ofertas sin familia), Contacto y, opcionalmente, Selección. Mientras no lleguen,
esas cabeceras siguen en azul, sin foto.

Equipo colaborando, Sesión de formación y Taller con asistentes solo existen
a 960 px. Con los originales en más resolución se verían más nítidas en pantallas
grandes; se regeneran con `node scripts/images.mjs <carpeta>`.

### Añadir una foto nueva

```bash
node scripts/foto.mjs <foto-original> foto-<slug-de-la-familia>
```

Genera `assets/img/foto-<slug>-640.webp`, `-960.webp` y `-1600.webp` (16:9). Después
se añade a la familia en `data/areas.json`:
`"foto": { "archivo": "foto-<slug>", "alt": "Descripción de la foto" }` y `npm run build`.

## Cómo tener una foto distinta por página (7-oct-2026)

Se buscó cómo crear fotos nuevas, sobre todo una por familia profesional. Hoy no
es posible desde el entorno de trabajo:

| Vía | Situación |
| --- | --- |
| Fotos con IA en ElevenLabs (conector de la cuenta) | Cada imagen con Seedream 5 Pro cuesta 818 créditos (unos 0,33 $ por cada serie de 4 variantes) y a la cuenta le quedan 170. Con créditos, unas 9 fotos costarían unos 3 $. |
| Fotos con IA en Higgsfield (conector de la cuenta) | Plan gratuito con 1,64 créditos: no llega. |
| Bancos de fotos gratuitos (Unsplash, Pexels, Pixabay, Wikimedia) | Bloqueados desde el entorno de trabajo. |
| Skills de generación de imágenes | No hay ninguna instalada. Instalar una exige el visto bueno del cliente y la revisión de `CLAUDE.md`. |

Para seguir, hay dos caminos:

1. Recargar créditos en ElevenLabs o Higgsfield y pedir que se generen las fotos
   con los prompts de abajo.
2. Que el cliente facilite fotos propias o de un banco de imágenes con licencia.

Las fotos con IA que muestren personas deben presentarse como ilustrativas, nunca
como el equipo de Sibberia, y el cliente debe validarlas antes de publicarlas.

## Prompts preparados (fotos con IA)

Estilo común, para que encajen con la marca: *editorial documentary photograph,
industrial plant in Spain, cool blue ambient light with a warm amber accent,
natural skin texture, realistic hands, 35mm, shallow depth of field, subject on
the right third, no text, no logos, no watermarks*.

- **Mantenimiento y SAT:** technician kneeling beside an open electrical control cabinet, checking wiring with a multimeter, navy overalls and safety glasses.
- **Producción:** shift supervisor with a tablet walking along a modern production line, operators in the background.
- **Calidad, PRL y Medioambiente:** quality inspector measuring a machined part with a caliper at a clean inspection bench, safety vest.
- **Almacén, Logística, Planificación y Compras:** logistics technician with a handheld scanner between tall warehouse racks, forklift softly out of focus.
- **Ingeniería y Proyectos:** project engineer reviewing drawings on a laptop on an industrial site, hard hat on the table.
- **Automatización y Robótica:** engineer programming an industrial robot arm with a teach pendant inside a safety cell.
- **Programadores/as:** developer writing PLC or industrial software at a desk overlooking a factory floor through a window.
