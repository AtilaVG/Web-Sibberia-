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

- Razón social, CIF y dirección postal: **no se publican**. En el aviso legal esas líneas no aparecen hasta tenerlas y la página está en `noindex`. Se rellenan en `site/config.json → pendienteDeValidar`.
- Ofertas: falta la descripción, la fecha de publicación, la jornada y el tipo de contrato de cada una (`data/ofertas.json`). Sin fecha y descripción reales no se publican los datos estructurados JobPosting (Google los marcaría como erróneos); aparecen solos en cuanto se rellenan. «Ontólogo/a senior (España)»: confirmar si es en remoto.
- Blog: faltan los títulos y textos reales (`data/blog.json`). No he podido leerlos porque sibberia.com está bloqueado desde el entorno de trabajo. No se ha inventado ninguno.
- Destino de los formularios (contacto, candidaturas con CV adjunto y newsletter): `site/config.json → formularios`. Para recibir el CV como archivo hace falta un servicio que acepte adjuntos (por ejemplo Formspree o Basin en un plan que los permita).

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
- Compartir, Crear y Crecer se muestran ahora en un único bloque de tres columnas, con las cifras reales (+15 años de experiencia, 100% proyectos a medida, +20 consultores especializados). Título oculto para lectores de pantalla: «Cómo trabajamos: compartir, crear, crecer».
- Tarjeta que cierra la rejilla de familias (inicio y página de Selección): «¿Buscas otro perfil técnico?» / «Cuéntanos qué necesitas y lo vemos contigo.» / «Escríbenos».
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

- Listado: «Estas son las posiciones que tenemos abiertas ahora mismo.»
- Ficha: el texto provisional «Estamos preparando la descripción…» se ha quitado; la ficha muestra la descripción solo cuando el cliente la facilite.
- Filtros del listado: «Familia», «Zona», «Todas», contador «N ofertas abiertas» y, si no hay resultados, «No hay ofertas abiertas con estos filtros.» con el botón «Ver todas». Cada oferta lleva la etiqueta de su familia profesional.
- **Envíanos tu CV** (nuevo, 7-oct-2026). Botón «Envíanos tu CV» en la cabecera de cada oferta, del listado y en la sección de ofertas de la home.
  - Ficha de oferta: título «Envíanos tu CV» y «Déjanos tus datos para optar a esta oferta. Si lo prefieres, escríbenos a hola@sibberia.com con el nombre de la oferta en el asunto.» (sustituye a «Cómo inscribirte…»; confirmar que hola@sibberia.com es el canal de candidaturas).
  - Listado: «¿No encuentras tu oferta? Envíanos tu CV» y «Puedes enviarnos tu candidatura aunque ahora no veas una oferta para tu perfil. También puedes escribirnos a hola@sibberia.com.»
  - Campos: «Oferta» (con «Candidatura espontánea»), «Familia profesional» («Elige una (opcional)»), «Nombre y apellidos», «Email», «Teléfono», «Tu CV (PDF o Word, máx. 5 MB)» (solo si hay destino configurado), «Cuéntanos algo de ti (opcional)», casilla de privacidad y botón «Enviar mi CV».
  - Sin destino configurado: «Al enviar se abrirá tu programa de correo con estos datos: adjunta tu CV antes de enviarlo.» y, al enviar, «Hemos preparado el correo con tus datos: adjunta tu CV y envíalo. Si no se ha abierto, escríbenos a hola@sibberia.com.»
  - Con destino: «Gracias, hemos recibido tu candidatura.» y el aviso del campo «Adjunta tu CV en PDF o Word (máximo 5 MB).»
  - Contacto: si se marca «Candidato/a», aparece «¿Buscas empleo? Envíanos tu CV desde la página de ofertas.»

## Blog

- «Ideas sobre selección, gestión y desarrollo de personas.» El blog está oculto (menú, pie, mapa del sitio) hasta que haya artículos reales; se ha quitado «Muy pronto publicaremos aquí nuestros artículos.»

## Contacto y formularios

- «Hablemos. Cuéntanos qué necesitas. Si buscas empleo, revisa antes nuestras ofertas abiertas.»
- Mensajes: «Gracias, hemos recibido tu mensaje. Te responderemos lo antes posible.» / «Listo: te has suscrito a la newsletter.» / «Hemos preparado el mensaje en tu programa de correo; solo tienes que enviarlo. Si no se ha abierto, escríbenos a hola@sibberia.com.» (mientras no haya destino configurado, el formulario abre el correo con los datos rellenados) / «No hemos podido enviar el formulario. Inténtalo de nuevo o escríbenos a hola@sibberia.com.» y los avisos de cada campo.
- La newsletter del pie está oculta hasta que se configure su destino.
- Aviso legal y privacidad: las líneas de razón social, CIF y domicilio no se muestran hasta que el cliente las confirme (la página queda en noindex). Reutiliza el texto anterior; he añadido la finalidad «gestionar tu candidatura o enviarte la newsletter si te suscribes» y la frase sobre tipografías servidas desde el propio sitio. Revisar con el asesor legal.

## Metadatos (SEO)

- Títulos y descripciones de cada página (etiquetas `title` y `meta description`), definidos en `site/pages.mjs`. Todos los títulos tienen 60 caracteres o menos y las descripciones 155 o menos.
- Inicio: «Selección de perfiles técnicos e industriales: mantenimiento y SAT, producción, calidad, logística, ingeniería, automatización y programación.»
- Selección (hub): «Selección de perfiles técnicos e industriales | Sibberia» / «Especialistas en selección de perfiles técnicos e industriales: mantenimiento, producción, calidad, logística, ingeniería y automatización.»
- Ofertas: «Ofertas de trabajo técnicas e industriales | Sibberia» / «Ofertas de trabajo para perfiles técnicos e industriales: mantenimiento, ingeniería, producción y más. Consulta las posiciones abiertas.»
- Cada oferta: «Oferta de empleo de {puesto} en {ubicación}. Envía tu candidatura a Sibberia.»
- Familias profesionales (`data/areas.json` → seoTitulo / seoDescripcion):
  - Mantenimiento y SAT: «Selección de técnicos de mantenimiento y SAT | Sibberia» / «Seleccionamos técnicos de mantenimiento eléctrico, mecánico y electromecánico y técnicos de SAT. Procesos a medida y a éxito.»
  - Producción: «Selección de personal de producción | Sibberia» / «Seleccionamos operarios especialistas y jefes de turno para plantas industriales. Procesos a medida y a éxito.»
  - Calidad, PRL y Medioambiente: «Selección de técnicos de calidad, PRL y medioambiente» / «Seleccionamos técnicos de calidad, de prevención de riesgos laborales (PRL) y de medioambiente. Procesos a medida y a éxito.»
  - Almacén, Logística, Planificación y Compras: «Selección de personal de logística y almacén | Sibberia» / «Seleccionamos personal de almacén, logística, planificación y compras para la industria. Procesos a medida y a éxito.»
  - Ingeniería y Proyectos: «Selección de ingenieros y técnicos de proyectos | Sibberia» / «Seleccionamos proyectistas, técnicos de site y técnicos de proyectos. Procesos a medida y a éxito.»
  - Automatización y Robótica: «Selección de técnicos de automatización y robótica» / «Seleccionamos ingenieros y técnicos de automatización y robótica industrial. Procesos a medida y a éxito.»
  - Programadores/as: «Selección de programadores | Sibberia» / «Seleccionamos programadores para empresas industriales y técnicas. Procesos a medida y a éxito.»
- Textos alternativos de las fotos y de la imagen para redes sociales.

## Imágenes

- Las cabeceras de Selección, de cada familia profesional, de Ofertas (listado y fichas) y de Contacto llevan **ilustraciones de cubos de hielo creadas para la web** con la escena 3D de la home (no son fotos ni imágenes de terceros): en el cubo elegido aparece el icono de la familia en dorado. Son decorativas (`alt=""`). Detalle y cómo regenerarlas en `docs/imagenes.md`.
- Las fotos del cliente se mantienen en la home (tarjetas de servicios y fondo sin 3D), Estrategia, Formación y Nosotros.
