# Imágenes de la web

La web repetía la foto de los bloques de madera en la home, en Selección y en
las tarjetas de servicios. Para que cada página tenga su propia imagen se han
creado ilustraciones nuevas.

## Opciones estudiadas (7-oct-2026)

| Opción | Resultado |
| --- | --- |
| Fotos generadas con IA en ElevenLabs (conector de la cuenta) | Probado con Seedream 5 Pro: 818 créditos por imagen (unos 0,33 $ por cada serie de 4 variantes). A la cuenta le quedan 170 créditos de su cuota, así que no se pudo generar ninguna. No se ha cobrado nada. |
| Fotos generadas con IA en Higgsfield (conector de la cuenta) | Plan gratuito con 1,64 créditos: no llega para una serie de fotos. |
| Skills de generación de imágenes | No hay ninguna instalada. Instalar una exige el visto bueno del cliente y la revisión de seguridad de `CLAUDE.md`. |
| **Ilustraciones propias con la escena 3D de la home** | **Elegida.** Gratis, de la marca (los cubos de hielo y el dorado de las acciones), originales, sin personas inventadas y muy ligeras (18–39 KB cada una a 1600 px). |

Si más adelante se quieren fotos realistas por familia, hay prompts preparados al
final de este documento. Al tener créditos en ElevenLabs o Higgsfield se generan
desde Claude y se guardan como WebP en `assets/img/`. Si muestran personas, deben
presentarse como imágenes ilustrativas, nunca como el equipo de Sibberia, y el
cliente debe validarlas.

## Ilustraciones de cubos

En todas aparece un cubo «elegido» con luz cálida y el icono de su familia en
dorado (los mismos iconos que la web, `site/iconos.mjs`).

| Imagen (`assets/img/`) | Composición | Dónde se usa |
| --- | --- | --- |
| `escena-seleccion-*` | Cubos dispersos; el elegido se eleva | Cabecera de Selección de perfiles técnicos |
| `escena-mantenimiento-y-sat-*` | Equipos en filas; uno, levantado: en revisión (llave) | Familia Mantenimiento y SAT y sus ofertas |
| `escena-produccion-*` | Dos líneas que se pierden al fondo (fábrica) | Familia Producción |
| `escena-calidad-prl-medioambiente-*` | Anillo que protege al elegido (escudo) | Familia Calidad, PRL y Medioambiente |
| `escena-almacen-logistica-planificacion-compras-*` | Estanterías a ambos lados de un pasillo (camión) | Familia Almacén, Logística… |
| `escena-ingenieria-y-proyectos-*` | Estructura en escalera; el elegido arriba (compás) | Familia Ingeniería y Proyectos y sus ofertas |
| `escena-automatizacion-y-robotica-*` | Matriz exacta; un cubo sale de su hueco (robot) | Familia Automatización y Robótica |
| `escena-programadores-*` | Líneas de código con sangría; el cursor (`</>`) | Familia Programadores/as |
| `escena-ofertas-*` | Fila de candidatos; uno da un paso al frente | Listado de ofertas y ofertas sin familia |
| `escena-contacto-*` | Dos cubos frente a frente | Contacto |

Cada una existe en 640, 960 y 1600 px de ancho. El tema queda a la derecha, porque
a la izquierda va el texto, y en móvil se encuadra para que no se recorte.

Las fotos del cliente siguen en la home (tarjetas de servicios y fondo cuando no
hay 3D), en Estrategia, Formación y Nosotros, y en la imagen para redes sociales.
Las de Estrategia, Formación y Nosotros solo existen a 960 px. Si el cliente
tiene los originales en más resolución, conviene regenerarlas con
`node scripts/images.mjs <carpeta>` para que se vean nítidas en pantallas grandes.

## Cómo regenerarlas

Las composiciones están en `scripts/render/escenas.js` (posiciones, cámara e
icono de cada una). Para volver a generarlas hace falta Playwright con Chromium:

```bash
PLAYWRIGHT=/ruta/node_modules/playwright/index.mjs npm run images            # todas
PLAYWRIGHT=/ruta/node_modules/playwright/index.mjs npm run images -- produccion   # solo una
PREVIEW=/tmp/previas npm run images        # PNG pequeños para ajustar el encuadre, sin tocar assets/img
```

El render es determinista (la misma escena da siempre la misma imagen) y se hace
al doble de tamaño para que los bordes queden limpios. Después: `npm run build`.

## Prompts preparados para fotos con IA (opcional)

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
