# Textos para validar por el cliente

Todos los textos de esta lista los he redactado yo para la nueva web. **No
aparecen en sibberia.com** y el cliente debe validarlos, corregirlos o
sustituirlos antes de publicar. Se editan en `site/pages.mjs` (y los de
formularios en `assets/js/core.js`); después, `npm run build`.

Datos que sí son del cliente y no hay que validar: los nombres de los tres
servicios, «Compartir, crear, crecer», +15 años de experiencia, +20 consultores
especializados, 100% proyectos a medida, los valores (humildad, integridad,
excelencia), «trabajo a éxito», hola@sibberia.com, 91 931 97 38, 655 18 81 31 y
los títulos y ubicaciones de las cinco ofertas.

## Datos bloqueados hasta que el cliente los confirme

- Razón social, CIF y dirección postal: **no se publican**. En el aviso legal aparecen marcados como «pendiente de validar» y la página está en `noindex`. Se rellenan en `site/config.json → pendienteDeValidar`.
- Ofertas: falta la descripción, la fecha de publicación (obligatoria para Google en JobPosting), la jornada y el tipo de contrato de cada una (`data/ofertas.json`). «Ontólogo/a senior (España)»: confirmar si es en remoto.
- Blog: faltan los títulos y textos reales (`data/blog.json`). No he podido leerlos porque sibberia.com está bloqueado desde el entorno de trabajo. No se ha inventado ninguno.
- Destino de los formularios (contacto y newsletter): `site/config.json → formularios`.

## Especialización en perfiles técnicos (feedback del 6-oct-2026)

Las 7 familias y sus perfiles salen del mensaje de Samuel. He desglosado algunas
en perfiles concretos que conviene confirmar: «Técnico/a de calidad», «Técnico/a
de prevención de riesgos laborales (PRL)», «Técnico/a de medioambiente»,
«Personal de almacén», «Técnico/a de logística», «Planificador/a», «Técnico/a de
compras», «Ingeniero/a / Técnico/a de automatización», «Ingeniero/a / Técnico/a
de robótica» y «Programador/a» (¿PLC, software industrial, otro?). Se editan en
`data/areas.json`.

- Inicio, subtítulo: «Mantenimiento y SAT, producción, calidad y PRL, logística, ingeniería, automatización y programación. Encontramos a quien encaja en tu planta, en tu proyecto y en tu equipo.»
- Camino empresas: «Necesito incorporar perfiles técnicos o industriales en mi empresa.»
- Bloque de la home: «Somos especialistas en seleccionar los perfiles que hacen funcionar una empresa industrial.»
- Selección (resumen e intro): «Especialistas en perfiles técnicos e industriales: buscamos y evaluamos a los profesionales que tu empresa necesita, para su puesto y para su equipo.» / «Especialistas en selección de perfiles técnicos e industriales: mantenimiento, producción, calidad, logística, ingeniería, automatización y programación. Trabajamos a éxito y diseñamos cada proceso a medida.»
- Nueva pregunta frecuente: «¿Qué perfiles técnicos e industriales seleccionáis?» → lista de familias.
- Páginas de familia, intro: «En Sibberia seleccionamos {perfiles} para empresas industriales y técnicas. Diseñamos cada proceso a la medida del puesto y del equipo, y trabajamos a éxito.»
- Páginas de familia, «Crecer»: «Te acompañamos hasta que la incorporación se consolida.» Botones: «Busco este perfil», «Busco empleo». Llamada final: «¿Buscas este perfil?»
- Asignación de ofertas a familias (`area` en `data/ofertas.json`): Frigorista → Mantenimiento y SAT; Ingeniero/a RFQ y Técnico/a de estudios → Ingeniería y Proyectos; Técnico/a laboral y Ontólogo/a sin familia.

## Inicio

- Titular: «Selección de perfiles técnicos e industriales» (antetítulo «Selección de» y titular gigante «Perfiles técnicos e industriales»). Sustituye a «Personas que encajan».
- Subtítulo: «Selección de personas, estrategia y gestión del capital humano, y formación. Trabajamos a éxito y a la medida de cada empresa.»
- Camino empresas: «Para empresas · Busco talento · Necesito incorporar o desarrollar personas en mi empresa.»
- Camino candidatos: «Para candidatos · Busco empleo · Quiero ver las ofertas abiertas y presentar mi candidatura.»
- Compartir: «Empezamos escuchando. Compartimos contigo el día a día de tu empresa para entender a quién necesitas de verdad.»
- Crear: «Diseñamos cada proyecto desde cero, a la medida de tu empresa, para que cada persona encaje en su puesto y en su equipo.»
- Crecer: «Un equipo de consultores especializados acompaña a las personas y a la empresa para que crezcan juntas.»
- Bloque «Qué hacemos» (resúmenes de servicio, abajo).
- Valores: «Escuchamos antes de proponer y aprendemos de cada empresa y de cada persona.» / «Decimos lo que hacemos y hacemos lo que decimos, con transparencia en cada proceso.» / «Cuidamos cada detalle del proceso para que el resultado sea el que necesitas.»
- «Trabajamos a éxito. Así nuestro objetivo es el mismo que el tuyo.»
- Llamada final: «¿Hablamos? Cuéntanos qué necesitas y te respondemos.»

## Servicios

- Selección de personas — resumen: ver «Especialización en perfiles técnicos». Intro: «Nos encargamos del proceso de selección para que incorpores a la persona que tu empresa necesita. Trabajamos a éxito y diseñamos cada proceso a medida.»
- Estrategia y gestión del capital humano — resumen: «Te ayudamos a definir y gestionar la estrategia de personas de tu organización.» Intro: «Acompañamos a la dirección y al área de personas en la estrategia y la gestión del capital humano, con proyectos diseñados a medida de cada organización.»
- Formación y desarrollo de personas — resumen: «Diseñamos formación para que las personas de tu equipo desarrollen todo su potencial.» Intro: «Diseñamos e impartimos programas de formación y desarrollo a la medida de las necesidades de cada equipo.»
- «Cómo trabajamos» (los tres servicios): Compartir — «Escuchamos tu necesidad y conocemos tu empresa, tu equipo y su cultura.» / Crear — «Diseñamos un proyecto a medida, con objetivos y plazos acordados contigo.» / Crecer — «Te acompañamos durante el proyecto para que el resultado se consolide.»
- Preguntas frecuentes (Selección):
  - «¿Cómo trabajáis los procesos de selección?» → «Trabajamos a éxito y diseñamos cada proceso a la medida de tu empresa. Te lo explicamos con detalle antes de empezar.»
  - «¿Los proyectos son a medida?» → «Sí. Todos nuestros proyectos se diseñan a medida de cada empresa.»
  - «Busco empleo, ¿cómo me presento?» → «Consulta nuestras ofertas de trabajo abiertas y sigue las instrucciones de cada oferta, o escríbenos a hola@sibberia.com.»

## Nosotros

- «Más de 15 años ayudando a empresas a encontrar, desarrollar y acompañar a las personas que las hacen crecer.»

## Ofertas de trabajo

- Listado: «Estas son las posiciones que tenemos abiertas ahora mismo.» / «¿No encuentras la tuya? Escríbenos a hola@sibberia.com.»
- Ficha (mientras falte la descripción): «Estamos preparando la descripción completa de esta oferta. Si te interesa, escríbenos y te contamos los detalles.»
- Descripción provisional en el JSON-LD: «Sibberia selecciona {puesto} en {ubicación}.»
- «Cómo inscribirte: envía tu CV a hola@sibberia.com indicando en el asunto el nombre de la oferta.» (confirmar que es el canal correcto de candidaturas).

## Blog

- «Ideas sobre selección, gestión y desarrollo de personas.» / Sin artículos: «Muy pronto publicaremos aquí nuestros artículos.»

## Contacto y formularios

- «Hablemos. Cuéntanos qué necesitas. Si buscas empleo, revisa antes nuestras ofertas abiertas.»
- Mensajes: «Gracias, hemos recibido tu mensaje. Te responderemos lo antes posible.» / «Listo: te has suscrito a la newsletter.» / «El envío online aún no está activo. Escríbenos a hola@sibberia.com y te responderemos.» / «No hemos podido enviar el formulario. Inténtalo de nuevo o escríbenos a hola@sibberia.com.» y los avisos de cada campo.
- Aviso legal y privacidad: reutiliza el texto anterior; he añadido la finalidad «gestionar tu candidatura o enviarte la newsletter si te suscribes» y la frase sobre tipografías servidas desde el propio sitio. Revisar con el asesor legal.

## Metadatos (SEO)

- Títulos y descripciones de cada página (etiquetas `title` y `meta description`), definidos en `site/pages.mjs`.
- Textos alternativos de las fotos y de la imagen para redes sociales.
