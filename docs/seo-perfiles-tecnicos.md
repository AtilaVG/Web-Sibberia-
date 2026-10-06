# Posicionamiento: Sibberia, referencia en selección de perfiles técnicos e industriales

Objetivo del cliente (6-oct-2026): que quien busque en Google la selección de
perfiles industriales y técnicos encuentre a Sibberia, igual que ilerwork.com con
«personal de obra».

## Qué hay ya en la web

- **Mensaje principal** en la home: titular «Selección de perfiles técnicos e
  industriales», bloque con las 7 familias y título de página con esa frase.
- **Una página de aterrizaje por familia** (`/seleccion-personas/<familia>/`),
  cada una con título, H1, descripción y JSON-LD `Service` propios, la lista de
  perfiles, cómo trabajamos, cifras, sus ofertas abiertas y enlaces al resto:

| Página | Búsquedas objetivo |
|---|---|
| `/seleccion-personas/` | selección de perfiles técnicos, selección de personal industrial |
| `/seleccion-personas/mantenimiento-y-sat/` | selección técnicos de mantenimiento, técnico de mantenimiento electromecánico, técnico SAT |
| `/seleccion-personas/produccion/` | selección personal de producción, operario especialista, jefe de turno |
| `/seleccion-personas/calidad-prl-medioambiente/` | técnico de calidad, técnico PRL, técnico de medioambiente |
| `/seleccion-personas/almacen-logistica-planificacion-compras/` | selección personal logística/almacén, planificador, técnico de compras |
| `/seleccion-personas/ingenieria-y-proyectos/` | selección ingenieros, proyectistas, técnico de proyectos, técnico de site |
| `/seleccion-personas/automatizacion-y-robotica/` | selección ingenieros de automatización, técnico de robótica |
| `/seleccion-personas/programadores/` | selección programadores |

- **Enlazado interno**: menú «Perfiles técnicos», columna en el pie de todas las
  páginas, cada oferta enlaza a su familia y cada familia a sus ofertas.
- **Datos estructurados**: `Service` con catálogo de perfiles por familia,
  `FAQPage` en el hub, `JobPosting` con `occupationalCategory`.
- Las familias y perfiles se editan en `data/areas.json`.

## Lo que más va a mover el posicionamiento (siguientes pasos)

1. **Publicar en sibberia.com** (variable `SITE_URL`). En github.io no va a
   posicionar: Google da autoridad al dominio, no a esta copia.
2. **Ofertas reales y frescas** con descripción y fecha: son el contenido que más
   búsquedas atrae («técnico de mantenimiento Asturias», etc.) y Google las muestra
   en su buscador de empleo solo con los datos completos.
3. **Contenido propio por familia**: 2–3 párrafos reales en cada página (qué
   perfiles habéis cubierto, sectores, zonas) y artículos de blog útiles
   («Cómo contratar un técnico de mantenimiento electromecánico», «Sueldo de un
   jefe de turno en…»). Debe escribirlo o validarlo Sibberia: no inventamos casos.
4. **Google Business Profile** de Sibberia con categoría «Agencia de selección de
   personal» y enlace a la web.
5. **Search Console**: alta del dominio, envío de `sitemap.xml` y seguimiento de
   qué búsquedas traen visitas para reforzar las páginas que funcionen.
6. **Páginas por zona** cuando haya volumen (p. ej. «Selección de técnicos de
   mantenimiento en Asturias»), solo donde de verdad trabajéis.
7. **Fotografía industrial propia** (planta, mantenimiento, almacén): hoy todas
   las fotos son de oficina; las páginas de familia no llevan foto hasta tenerlas.

No he podido revisar ilerwork.com: el entorno de trabajo bloquea ese dominio.
