# Posicionamiento: SIBBERIA, referencia en selección de perfiles técnicos e industriales

Objetivo del cliente: que quien busque en Google la selección de perfiles
industriales y técnicos encuentre a SIBBERIA (6-oct-2026), posicionada como
**«Especialistas en selección de perfiles técnicos e industriales en España»**
(PDF de cambios, 7-oct-2026). El posicionamiento debe salir de contenido bueno,
específico y útil, sin repetir palabras clave de forma artificial.

## Una página para cada búsqueda

Cada búsqueda objetivo tiene una página que la responde. Así las páginas no
compiten entre sí: la home y Selección, por ejemplo, ya no llevan el mismo H1.

| Página | Búsquedas objetivo | H1 |
|---|---|---|
| `/` | selección de perfiles técnicos e industriales, selección de perfiles industriales | Selección de perfiles técnicos e industriales |
| `/seleccion-personas/` | consultora de selección industrial, headhunter industrial, selección de perfiles industriales | Consultora de selección industrial |
| `/seleccion-personas/mantenimiento-y-sat/` | selección técnicos de mantenimiento, selección electromecánicos, técnicos SAT | Selección de técnicos de mantenimiento, electromecánicos y SAT |
| `/seleccion-personas/automatizacion-y-robotica/` | selección ingenieros de automatización, selección programadores PLC, SCADA, robótica | Selección de ingenieros de automatización y programadores PLC |
| `/seleccion-personas/produccion/` | selección responsables de producción, jefes de turno, encargados | Selección de responsables de producción y jefes de turno |
| `/seleccion-personas/calidad-prl-medioambiente/` | selección técnicos de calidad, calidad de proveedores, técnico PRL | Selección de técnicos de calidad, PRL y medioambiente |
| `/seleccion-personas/ingenieria-y-proyectos/` | selección ingenieros de proyectos, ingeniero de procesos, mejora continua, oficina técnica | Selección de ingenieros de proyectos, procesos y oficina técnica |
| `/seleccion-personas/almacen-logistica-planificacion-compras/` | selección personal logística y almacén, planificador, técnico de compras | Selección de personal de almacén, logística, planificación y compras |
| `/seleccion-personas/programadores/` | selección programadores | Selección de programadores para empresas técnicas e industriales |

Las búsquedas de cada familia están en `data/areas.json → busquedas` (no se
muestran en la web).

## Qué tiene cada página

- **Título y meta description propios** (≤60 y ≤155 caracteres), con la búsqueda
  principal al principio.
- **Contenido propio**:
  - Selección explica por qué trabajar con SIBBERIA, la base de talento, cómo
    trabajamos y las preguntas frecuentes (headhunting, plazos, modelo a éxito,
    garantía).
  - Cada familia tiene sus perfiles, qué solemos valorar (tecnologías, normas,
    herramientas) y por qué cuesta encontrar esos perfiles.
- **Enlazado interno**:
  - El menú «Perfiles técnicos» y la columna de familias en el pie de todas las páginas.
  - La rejilla de familias en la home y en Selección.
  - «Otros perfiles técnicos» en cada familia.
  - Cada oferta enlaza a su familia y cada familia a sus ofertas.
  - Programadores enlaza a Automatización para PLC.
  - Las familias enlazan a «Cómo trabajamos» y la historia de Nosotros a los tres servicios.
- **Datos estructurados**:
  - `ProfessionalService` con la descripción de posicionamiento.
  - `Service` con catálogo (Selección con sus siete familias; cada familia con sus perfiles; Estrategia y Formación con su lista).
  - `FAQPage` en Selección.
  - `JobPosting` en las ofertas cuando tengan fecha y descripción.
  - Migas de pan.
- **ALT de imágenes** descriptivos y sin relleno de palabras clave
  (`docs/textos-para-validar.md`).
- **URLs**: se mantienen las de las familias para no perder lo que ya esté
  indexado.

## Lo que más va a mover el posicionamiento (siguientes pasos)

1. **Publicar en sibberia.com** (variable `SITE_URL`). En github.io no va a
   posicionar: Google da autoridad al dominio, no a esta copia.
2. **Ofertas reales y frescas** con descripción y fecha: son el contenido que más
   búsquedas atrae («técnico de mantenimiento Asturias», etc.) y Google las muestra
   en su buscador de empleo solo con los datos completos.
3. **Artículos de blog útiles** escritos o validados por SIBBERIA («Cómo contratar
   un técnico de mantenimiento electromecánico», «Qué pedir a un programador PLC»…).
   No inventamos casos ni cifras.
4. **Google Business Profile** de SIBBERIA con categoría «Agencia de selección de
   personal» y enlace a la web.
5. **Search Console**: alta del dominio, envío de `sitemap.xml` y seguimiento de
   qué búsquedas traen visitas para reforzar las páginas que funcionen.
6. **Páginas por zona** cuando haya volumen (p. ej. «Selección de técnicos de
   mantenimiento en Asturias»), solo donde de verdad trabajéis.
