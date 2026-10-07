# Textos para validar por el cliente

Este documento separa los textos que vienen del cliente de los que he redactado
yo para la nueva web. Los redactados **no aparecen en sibberia.com** y el cliente
debe validarlos, corregirlos o sustituirlos antes de publicar. Se editan en `site/pages.mjs`, `data/areas.json`
(familias) y, los mensajes de los formularios, en `assets/js/core.js`; después,
`npm run build`.

## Textos del cliente (no hace falta validarlos)

- De sibberia.com y mensajes anteriores: los nombres de los tres servicios,
  «Compartir, crear, crecer», 100% proyectos a medida, «trabajo a éxito»,
  hola@sibberia.com, 91 931 97 38, 655 18 81 31 y los títulos y ubicaciones de las
  cinco ofertas.
- Del PDF de cambios (7-oct-2026), usados tal cual:
  - El subtítulo de la home.
  - El bloque «¿Por qué trabajar con SIBBERIA?» / «Una forma diferente de trabajar la selección industrial» con sus seis puntos.
  - «Primeros perfiles validados en 5–7 días» (siempre con «habitualmente»).
  - Los textos de la base de talento.
  - «¿Qué más hacemos en SIBBERIA?» con las listas de Formación y de Estrategia.
  - Las listas de perfiles de Mantenimiento y SAT, Automatización, Ingeniería, Calidad y Producción.
  - «Cuéntanos qué perfil buscas».
  - La historia de Nosotros, «¿Por qué SIBBERIA?» y las dos frases que sustituyen a «+20 consultores»: «Consultores senior especializados de verdad en perfiles industriales.» y «Consultores con más de 15 años de experiencia profesional en Recursos Humanos.»
  - El posicionamiento «Especialistas en selección de perfiles técnicos e industriales en España».

### Cambios sobre el texto del cliente que hay que confirmar

- **Base de talento: «más de 800», no «más de 1000».** El PDF dice que la cifra
  real es «800 y pico». Publicar 1000 sería una cifra que la empresa sabe que no
  es cierta (publicidad engañosa y un riesgo de credibilidad si alguien la
  contrasta), así que la web dice «más de 800» en el titular y en el texto.
- **«Busco personal»**, en minúscula como «Busco empleo» (el PDF pone «Busco
  Personal»). Ese camino lleva al formulario de contacto, con el botón «Cuéntanos
  qué perfil buscas».
- «Buscamos, no esperamos»: he añadido «(headhunting)» tras «búsqueda directa»
  para posicionar «headhunter industrial».
- Formación: «Inteligencia artificial» en minúscula y «FUNDAE» como
  «Formación bonificada (FUNDAE)».
- Nosotros: «Llegando a asumir…» pasa a «llegando» (estaba tras una coma).
- La marca se escribe **SIBBERIA** en toda la web, como en el PDF.
- «+20 consultores especializados» ya no aparece en ninguna página, y «+15 años»
  dice siempre «de experiencia profesional en Recursos Humanos».
- Los valores (Humildad, Integridad, Excelencia) ya no tienen bloque propio: la
  home es más comercial y Nosotros cuenta la historia, que habla de cercanía,
  humildad, esfuerzo y confianza. Si el cliente quiere recuperarlos, se añaden en
  Nosotros.

## Pendiente del cliente

- **Foto de Samuel** para Nosotros (profesional, discreta). El hueco está
  preparado en `site/pages.mjs → FOTO_FUNDADOR`.
- **CV adjunto en el formulario.** La web ya lo admite (PDF o Word, máx. 5 MB),
  pero necesita un servicio de formularios que reciba archivos; mientras
  `site/config.json → formularios.candidaturas` esté vacío, el formulario prepara
  un correo y pide adjuntar el CV a mano.
- **Programadores/as**: el PDF mete «Programadores PLC» en Automatización, así que
  he enfocado esta familia en programadores y desarrolladores de software para
  empresas técnicas e industriales, con un enlace a Automatización para PLC.
  Confirmar qué perfiles son.
- Razón social, CIF y dirección postal: **no se publican**. En el aviso legal esas
  líneas no aparecen hasta tenerlas y la página está en `noindex`. Se rellenan en
  `site/config.json → pendienteDeValidar`.
- Ofertas: falta la descripción, la fecha de publicación, la jornada y el tipo de
  contrato de cada una (`data/ofertas.json`). Sin fecha y descripción reales no se
  publican los datos estructurados JobPosting (Google los marcaría como erróneos);
  aparecen solos en cuanto se rellenan. «Ontólogo/a senior (España)»: confirmar si
  es en remoto.
- Blog: faltan los títulos y textos reales (`data/blog.json`). No se ha inventado
  ninguno.
- Destino de los formularios de contacto y newsletter (`site/config.json →
  formularios`).

## Inicio

- Camino empresas: «Para empresas · Busco personal · Cuéntanos qué perfil buscas».
- Camino candidatos: «Para candidatos · Busco empleo · Consulta las ofertas abiertas y envíanos tu CV.»
- Compartir: «Empezamos por entender el puesto: la planta, el equipo, los turnos y lo que de verdad tiene que saber hacer la persona.» Cifra: «+15 años de experiencia profesional en Recursos Humanos».
- Crear: «Salimos a buscar al profesional que encaja, con búsqueda directa, y te presentamos solo perfiles validados; habitualmente, los primeros en 5–7 días.» Cifra: «+800 profesionales técnicos e industriales identificados».
- Crecer: «Te acompañamos en las entrevistas, la negociación y la incorporación. Trabajamos a éxito: nuestro objetivo es el mismo que el tuyo.» Cifra: «100% proyectos a medida».
- Título oculto para lectores de pantalla: «Cómo trabajamos: compartir, crear, crecer».
- Especialidades: «Nuestras especialidades» / «Especialistas en selección de perfiles técnicos e industriales en España: los que hacen funcionar una planta.»
- Tarjeta que cierra la rejilla de familias (inicio y Selección): «¿Buscas otro perfil técnico?» / «También trabajamos otras posiciones técnicas especializadas.» / «Cuéntanos qué perfil buscas».
- Tras «¿Por qué trabajar con SIBBERIA?»: botones «Cuéntanos qué perfil buscas» y «Cómo trabajamos la selección».
- Ofertas: antetítulo «Para candidatos».
- Llamada final: «¿Qué perfil necesitas incorporar?» / «Cuéntanos el puesto, la ubicación y cuándo lo necesitas. Te respondemos lo antes posible.»

## Selección de perfiles técnicos (página comercial principal)

- Cabecera: antetítulo «Selección de perfiles técnicos e industriales», título «Consultora de selección industrial» y subtítulo «Especialistas en selección de perfiles técnicos e industriales en España. Buscamos activamente a los profesionales que más cuesta encontrar y trabajamos a éxito.»
- Orden de la página: cabecera → ¿Por qué trabajar con SIBBERIA? → base de talento → perfiles que seleccionamos → cómo trabajamos → preguntas frecuentes → ¿Qué más hacemos? → llamada final.
- Cómo trabajamos: Compartir — «Definimos contigo el perfil: funciones, conocimientos técnicos, turnos, equipo y condiciones.» / Crear — «Salimos al mercado con búsqueda directa, entrevistamos y validamos. Habitualmente buscamos presentarte los primeros perfiles validados en 5–7 días.» / Crecer — «Te acompañamos en las entrevistas, la negociación y la incorporación del profesional.»
- Preguntas frecuentes:
  - «¿Qué perfiles técnicos e industriales seleccionáis?» → «Seleccionamos perfiles de mantenimiento y SAT, producción, calidad, PRL y medioambiente, almacén, logística, planificación y compras, ingeniería y proyectos, automatización y robótica, y programación, además de otras posiciones técnicas especializadas.»
  - «¿Cómo funciona vuestro modelo a éxito?» → «Nuestro modelo está vinculado a conseguir la incorporación del profesional. Te explicamos las condiciones con detalle antes de empezar.»
  - «¿Cuánto tardáis en presentar candidatos?» → «Habitualmente buscamos presentar los primeros perfiles validados en 5–7 días, aunque cada proceso depende del perfil y del mercado.»
  - «¿Hacéis headhunting o solo publicáis ofertas?» → «No nos limitamos a publicar ofertas. Hacemos búsqueda directa y salimos activamente al mercado a localizar profesionales, también a quienes no están buscando empleo.»
  - «¿Qué garantía tienen vuestros procesos?» → «Nuestros procesos incluyen garantía de sustitución según las condiciones acordadas con cada cliente.»
  - «Busco empleo, ¿cómo me presento?» → «Consulta nuestras ofertas de trabajo y envíanos tu CV desde la propia oferta. Si ahora no ves ninguna para tu perfil, también puedes enviarnos tu candidatura.»
- Resúmenes de las tarjetas de «¿Qué más hacemos en SIBBERIA?»: Selección — «Seleccionamos perfiles técnicos e industriales con búsqueda directa y un modelo a éxito.» (con la etiqueta «Nuestro servicio principal») / Estrategia — «Apoyo a la dirección y al área de RRHH: externalización, interim y proyectos de personas a medida.» / Formación — «Formación a medida para tus equipos, presencial y online.»

## Páginas de especialidad (familias)

Cada página tiene: perfiles que trabajamos, qué solemos valorar, por qué cuesta
encontrarlos, sus ofertas abiertas, otros perfiles y la llamada final con
«Cuéntanos qué perfil buscas». Textos comunes: «Perfiles que trabajamos», «Qué
solemos valorar», «Por qué cuesta encontrarlos», «Por eso no esperamos a que
lleguen candidatos: salimos a buscarlos y solo te presentamos perfiles validados.»,
«Cómo trabajamos» y, bajo la llamada final, «Cuéntanos el puesto, la ubicación y
cuándo lo necesitas. Te respondemos lo antes posible.»

Las listas de perfiles son del cliente (PDF) salvo: Ingeniería mantiene
«Proyectistas» y «Técnicos de site» (mensaje del 6-oct); Calidad añade «Prevención
de riesgos laborales (PRL)» y «Medioambiente» (la familia es Calidad, PRL y
Medioambiente); Almacén y Programadores no venían en el PDF. Lo demás de cada
familia lo he redactado yo (`data/areas.json`):

- **Mantenimiento y SAT**
  - Título (H1): «Selección de técnicos de mantenimiento, electromecánicos y SAT»
  - Subtítulo: «Electromecánicos, técnicos de mantenimiento y técnicos SAT para plantas que no pueden permitirse una línea parada: profesionales que resuelven averías con criterio y sostienen el mantenimiento preventivo, también a turnos.»
  - Tarjeta: «Electromecánicos, técnicos de mantenimiento y SAT, responsables de mantenimiento y técnicos de campo.»
  - Perfiles: «Electromecánicos», «Técnicos de mantenimiento», «Responsables de mantenimiento», «Técnicos SAT», «Técnicos de campo»
  - Qué solemos valorar: «Base sólida en electricidad y mecánica, y soltura con neumática e hidráulica.» / «Lectura de esquemas eléctricos e interpretación de planos.» / «Conocimientos de PLC para localizar averías y, si el puesto lo pide, modificar programas.» / «Experiencia en mantenimiento preventivo y correctivo, y en GMAO si la planta la usa.» / «Disponibilidad para turnos, retenes o desplazamientos, según el puesto.» / «En SAT y técnicos de campo: autonomía, trato con el cliente y carné de conducir.»
  - Por qué cuesta encontrarlos: «Hay pocos electromecánicos completos: profesionales que dominen a la vez la parte eléctrica y la mecánica.» / «Los buenos técnicos rara vez están buscando empleo: casi siempre hay que ir a buscarlos.» / «Los turnos, los retenes y los viajes reducen mucho el número de candidatos.» / «Un CV no demuestra que alguien sepa resolver una avería: hay que validarlo antes de presentarlo.»
  - Llamada final: «¿Necesitas un electromecánico o un técnico de mantenimiento?»
- **Producción**
  - Título (H1): «Selección de responsables de producción y jefes de turno»
  - Subtítulo: «Responsables de producción, jefes de turno y encargados capaces de sacar la producción adelante cada día: con su equipo, con seguridad y con los indicadores de la planta.»
  - Tarjeta: «Responsables de producción, jefes de turno, encargados, planificación y perfiles especialistas.»
  - Perfiles: «Responsables de producción», «Jefes de turno», «Encargados», «Planificación», «Mejora de productividad», «Perfiles especialistas»
  - Qué solemos valorar: «Experiencia dirigiendo equipos en planta, también a turnos.» / «Gestión por indicadores: OEE, productividad, calidad, seguridad y costes.» / «Planificación de la producción y coordinación con mantenimiento, calidad y logística.» / «Mejora continua y Lean aplicados a la productividad del día a día.» / «Conocimiento del proceso o del sector: alimentación, automoción, metal, química, plástico…»
  - Por qué cuesta encontrarlos: «El mando intermedio es de los perfiles más difíciles: conocimiento técnico, liderazgo y capacidad de decisión en la misma persona.» / «Los turnos de noche y de fin de semana reducen mucho el número de candidatos.» / «Los mejores responsables están trabajando y no miran ofertas: hay que contarles un proyecto que les interese.» / «El encaje con la cultura de la planta y con el equipo que van a dirigir pesa tanto como el CV.»
  - Llamada final: «¿Necesitas un responsable de producción o un jefe de turno?»
- **Calidad, PRL y Medioambiente**
  - Título (H1): «Selección de técnicos de calidad, PRL y medioambiente»
  - Subtítulo: «Técnicos de calidad de planta, de proveedores y de producto, de laboratorio y de sistemas de gestión, y técnicos de PRL y medioambiente: perfiles que conocen la normativa y saben aplicarla en planta.»
  - Tarjeta: «Calidad de planta, de proveedores y de producto, laboratorio, sistemas de gestión, PRL y medioambiente.»
  - Perfiles: «Calidad de planta», «Calidad de proveedores», «Calidad de producto», «Laboratorio», «Sistemas de gestión», «Normativa», «Prevención de riesgos laborales (PRL)», «Medioambiente»
  - Qué solemos valorar: «Conocimiento de la normativa de tu sector: ISO 9001, IATF 16949 en automoción, IFS o BRCGS en alimentación, ISO 14001, ISO 45001…» / «Herramientas de calidad: 8D, AMFE, PPAP, control estadístico de procesos y análisis de causa raíz.» / «Experiencia en auditorías internas, de cliente y a proveedores.» / «Metrología y ensayos de laboratorio, en los puestos de calidad de producto.» / «En PRL, la titulación de técnico superior y la especialidad que pide el puesto: seguridad, higiene industrial o ergonomía.»
  - Por qué cuesta encontrarlos: «Cada sector tiene su normativa: un técnico de calidad de alimentación no se cambia sin más por uno de automoción.» / «Hace falta rigor y, a la vez, mano izquierda con producción y con los proveedores: no siempre van juntos.» / «En PRL y medioambiente, la titulación y la especialidad exigidas acotan mucho el mercado.»
  - Llamada final: «¿Necesitas un técnico de calidad, PRL o medioambiente?»
- **Almacén, Logística, Planificación y Compras**
  - Título (H1): «Selección de personal de almacén, logística, planificación y compras»
  - Subtítulo: «Personal de almacén, técnicos de logística, planificadores y compradores: los perfiles que conectan proveedores, producción y clientes para que el material llegue cuando tiene que llegar.»
  - Tarjeta: «Personal de almacén, técnicos de logística, planificadores y técnicos de compras.»
  - Perfiles: «Personal de almacén», «Técnicos de logística», «Planificadores», «Técnicos de compras»
  - Qué solemos valorar: «Manejo del ERP y del sistema de gestión de almacén de la empresa (SAP, SGA…).» / «Planificación de la demanda, de la producción y de los aprovisionamientos.» / «Negociación con proveedores y compras técnicas o de materia prima.» / «Control de stock, inventarios e indicadores logísticos.» / «En almacén, carné de carretillero y experiencia con terminales de radiofrecuencia.»
  - Por qué cuesta encontrarlos: «Los planificadores y compradores con experiencia industrial, y no solo comercial, escasean.» / «Cada empresa trabaja con su ERP: hay que conocerlo o aprenderlo rápido.» / «En almacén, los turnos y la rotación obligan a seleccionar pensando en la estabilidad.»
  - Llamada final: «¿Necesitas un perfil de logística, almacén, planificación o compras?»
- **Ingeniería y Proyectos**
  - Título (H1): «Selección de ingenieros de proyectos, procesos y oficina técnica»
  - Subtítulo: «Ingenieros de proyectos, de procesos y de industrialización, oficina técnica, mejora continua y diseño: perfiles que dominan la técnica y entienden cómo funciona una planta.»
  - Tarjeta: «Ingeniería de proyectos, procesos, industrialización, oficina técnica, mejora continua y diseño.»
  - Perfiles: «Ingeniería de proyectos», «Procesos», «Industrialización», «Oficina técnica», «Mejora continua», «Diseño», «Proyectistas», «Técnicos de site»
  - Qué solemos valorar: «Experiencia en el sector o en procesos parecidos a los de tu planta.» / «Gestión de proyectos: plazos, presupuesto, proveedores y coordinación con planta.» / «Herramientas de diseño (AutoCAD, SolidWorks, Inventor, CATIA…) en oficina técnica y diseño.» / «Mejora continua: Lean, 5S, SMED, kaizen.» / «Industrialización de nuevos productos, del prototipo a la producción en serie.» / «Inglés, cuando hay clientes o casa matriz fuera de España.»
  - Por qué cuesta encontrarlos: «El título no lo dice todo: hay que valorar la experiencia real en planta y en proyectos.» / «Los buenos ingenieros de procesos y de mejora continua suelen estar comprometidos con su empresa y no buscan cambio.» / «Se busca a la vez solidez técnica y capacidad para coordinar equipos, proveedores y clientes.»
  - Llamada final: «¿Necesitas un ingeniero de proyectos, de procesos o de oficina técnica?»
- **Automatización y Robótica**
  - Título (H1): «Selección de ingenieros de automatización y programadores PLC»
  - Subtítulo: «Programadores PLC, ingenieros de automatización y especialistas en SCADA, robótica y visión artificial: perfiles muy demandados que rara vez están buscando empleo. Por eso salimos a buscarlos.»
  - Tarjeta: «Programadores PLC, ingenieros de automatización, SCADA, robótica, visión artificial y puestas en marcha.»
  - Perfiles: «Programadores PLC», «Ingenieros de automatización», «SCADA», «Robótica», «Visión artificial», «Puestas en marcha»
  - Nota: «Perfiles con experiencia en Siemens, Rockwell, Schneider y otros fabricantes.»
  - Qué solemos valorar: «Programación de PLC en el entorno de tu planta: Siemens (TIA Portal), Rockwell (Studio 5000), Schneider…» / «SCADA y HMI, y comunicaciones industriales: Profinet, Ethernet/IP, Modbus…» / «Puestas en marcha reales, en planta o en casa del cliente, y temple para resolver con la línea parada.» / «Robótica industrial y visión artificial, cuando el proyecto lo pide.» / «Disponibilidad para viajar en los puestos de puesta en marcha.»
  - Por qué cuesta encontrarlos: «Es de los perfiles más escasos de la industria: hay más proyectos que profesionales.» / «Cada fabricante exige experiencia propia: no basta con «saber de PLC».» / «Integradores, ingenierías y fabricantes compiten por las mismas personas: hay que saber contarles bien el proyecto.» / «Las puestas en marcha implican viajes y picos de trabajo que no encajan con todo el mundo.»
  - Llamada final: «¿Necesitas un programador PLC o un ingeniero de automatización?»
- **Programadores/as**
  - Título (H1): «Selección de programadores para empresas técnicas e industriales»
  - Subtítulo: «Programadores y desarrolladores de software para empresas técnicas e industriales: perfiles que, además de programar bien, entienden el negocio y el proceso para el que trabajan.»
  - Tarjeta: «Desarrolladores de software, programadores de aplicaciones e integración de sistemas.»
  - Perfiles: «Desarrolladores de software», «Programadores de aplicaciones», «Software industrial», «Integración de sistemas»
  - Nota: «¿Buscas un programador PLC? Lo trabajamos dentro de Automatización y Robótica.»
  - Qué solemos valorar: «Dominio de los lenguajes y herramientas de tu equipo: C#/.NET, Java, Python, JavaScript…» / «Experiencia en software para la industria: integración con el ERP, el MES o los datos de planta, cuando el puesto lo pide.» / «Buenas prácticas: control de versiones, pruebas y documentación.» / «Capacidad para entender el proceso y hablar con planta, no solo con otros programadores.» / «Inglés técnico.»
  - Por qué cuesta encontrarlos: «Las empresas tecnológicas compiten por los mismos perfiles, con teletrabajo y salarios altos.» / «Pocos programadores conocen el entorno industrial.» / «Un CV lleno de tecnologías no garantiza el nivel: hay que validarlo antes de presentarlo.»
  - Llamada final: «¿Necesitas un programador?»

## Estrategia y Formación (servicios secundarios)

- Páginas cortas: cabecera con «Cuéntanos qué necesitas», «Qué podemos hacer por tu empresa», «¿Qué más hacemos en SIBBERIA?» (con Selección como servicio principal) y «¿Hablamos? Cuéntanos qué necesita tu empresa y te respondemos lo antes posible.»
- Estrategia — explicación de cada punto de la lista del cliente:
  - Interim HR: «Un responsable de RRHH temporal para cubrir una ausencia, una transición o un proyecto.»
  - RPO: «Externalización de tus procesos de selección: los llevamos como parte de tu equipo.»
  - BPO de Recursos Humanos: «Externalización de la gestión de Recursos Humanos y de la administración de personal.»
  - Apoyo temporal a departamentos de RRHH: «Refuerzo para tu equipo de RRHH en picos de trabajo o proyectos concretos.»
  - Evaluación y desarrollo: «Evaluación del desempeño y del potencial, y planes de desarrollo para tus equipos.»
  - Organización: «Estructura, puestos y funciones: una organización clara para que cada persona sepa qué se espera de ella.»
  - Proyectos de Recursos Humanos a medida: «Diseñamos contigo el proyecto de personas que necesita tu organización.»
- Estrategia, subtítulo: «Acompañamos a la dirección y al área de personas en la estrategia y la gestión del capital humano, con proyectos diseñados a medida de cada organización.»
- Formación: la lista del cliente en dos grupos, «Áreas de formación» y «Cómo la organizamos». Subtítulo: «Diseñamos e impartimos programas de formación y desarrollo a la medida de las necesidades de cada equipo, en formato presencial y online.»

## Nosotros

- Cabecera: «Nuestra historia» y, como subtítulo, la primera frase del cliente.
- Destacado: «Esa experiencia permitió conocer de primera mano qué espera realmente una empresa…».
- Enlaces en la historia: «selección directa», «estrategia de personas» y «formación a medida» llevan a sus servicios.
- Llamada final: «¿Hablamos? Cuéntanos qué perfil buscas y te respondemos lo antes posible.»

## Ofertas de trabajo y formulario de CV

- Listado: «Estas son las posiciones que tenemos abiertas ahora mismo.» Filtros «Familia», «Zona», «Todas», contador «N ofertas abiertas» y, si no hay resultados, «No hay ofertas abiertas con estos filtros.» con el botón «Ver todas».
- Botón «Envíanos tu CV» en la cabecera de cada oferta, del listado y en la sección de ofertas de la home.
- Ficha de oferta: «Envíanos tu CV» / «Déjanos tus datos para optar a esta oferta. Si lo prefieres, escríbenos a hola@sibberia.com con el nombre de la oferta en el asunto.» y, sobre el formulario, «Oferta: {puesto} · {ubicación}».
- Listado: «¿No encuentras tu oferta? Envíanos tu CV» / «Puedes enviarnos tu candidatura aunque ahora no veas una oferta para tu perfil. También puedes escribirnos a hola@sibberia.com.»
- Campos (los del PDF, en este orden): «Nombre y apellidos», «Email», «Teléfono», «Oferta» (solo en el listado, con «Candidatura espontánea»), «Adjunta tu CV» («PDF o Word, máximo 5 MB»; solo con destino configurado) y «Mensaje (opcional)». Casilla de privacidad y botón «Enviar mi CV». Se ha quitado «Familia profesional» para que tenga menos pasos. El teléfono es obligatorio.
- Avisos: «Escribe un teléfono de contacto (al menos 9 cifras).» / «Adjunta tu CV en PDF o Word (máximo 5 MB).» / «Gracias, hemos recibido tu candidatura.»
- Sin destino configurado: «Al enviar se abrirá tu programa de correo con estos datos: adjunta tu CV antes de enviarlo.» y, al enviar, «Hemos preparado el correo con tus datos: adjunta tu CV y envíalo. Si no se ha abierto, escríbenos a hola@sibberia.com.»

## Contacto y formularios

- Contacto: título «Cuéntanos qué perfil buscas» (es el destino de ese botón) y subtítulo «Te respondemos lo antes posible. ¿Buscas empleo? Envíanos tu CV.»
- Ejemplo en el mensaje: «Por ejemplo: técnico de mantenimiento electromecánico, a turnos, para una planta en Asturias…»
- Si se marca «Candidato/a», aparece «¿Buscas empleo? Envíanos tu CV desde la página de ofertas.»
- Mensajes: «Gracias, hemos recibido tu mensaje. Te responderemos lo antes posible.» / «Listo: te has suscrito a la newsletter.» / «Hemos preparado el mensaje en tu programa de correo; solo tienes que enviarlo. Si no se ha abierto, escríbenos a hola@sibberia.com.» (mientras no haya destino configurado) / «No hemos podido enviar el formulario. Inténtalo de nuevo o escríbenos a hola@sibberia.com.» y los avisos de cada campo.
- La newsletter del pie está oculta hasta que se configure su destino.
- Aviso legal y privacidad: las líneas de razón social, CIF y domicilio no se muestran hasta que el cliente las confirme (la página queda en noindex). Revisar con el asesor legal; si el CV se recibe a través de un servicio externo, la política de privacidad debe nombrarlo como encargado del tratamiento.

## Metadatos (SEO)

Títulos de 60 caracteres o menos y descripciones de 155 o menos (`site/pages.mjs`
y, en las familias, `data/areas.json → seoTitulo / seoDescripcion`):

- Inicio: «Selección de perfiles técnicos e industriales | SIBBERIA» / «Especialistas en selección de perfiles técnicos e industriales en España: búsqueda directa, modelo a éxito y consultores senior para tu empresa.»
- Selección: «Consultora de selección de perfiles industriales | SIBBERIA» / «Consultora de selección industrial en España: técnicos de mantenimiento, electromecánicos, programadores PLC, ingenieros y responsables de producción.»
- Mantenimiento y SAT: «Selección de técnicos de mantenimiento y electromecánicos»
- Producción: «Selección de responsables de producción y jefes de turno»
- Calidad, PRL y Medioambiente: «Selección de técnicos de calidad, PRL y medioambiente»
- Almacén, Logística, Planificación y Compras: «Selección de personal de logística y almacén | SIBBERIA»
- Ingeniería y Proyectos: «Selección de ingenieros de proyectos y procesos | SIBBERIA»
- Automatización y Robótica: «Selección de programadores PLC y automatización | SIBBERIA»
- Programadores/as: «Selección de programadores | SIBBERIA»
- Estrategia: «Estrategia y gestión del capital humano | SIBBERIA» / «Interim HR, RPO, BPO de Recursos Humanos, apoyo temporal a departamentos de RRHH, evaluación y desarrollo y proyectos de Recursos Humanos a medida.»
- Formación: «Formación y desarrollo de personas | SIBBERIA» / «Formación a medida para empresas: gestión de equipos, liderazgo, inteligencia artificial, Power BI, ventas, atención al cliente y formación técnica.»
- Nosotros: «Nosotros: nuestra historia | SIBBERIA» / «SIBBERIA nace de haber vivido los Recursos Humanos desde los dos lados de la mesa: selección industrial basada en la cercanía, el esfuerzo y la confianza.»
- Ofertas: «Ofertas de trabajo técnicas e industriales | SIBBERIA» / «Ofertas de trabajo para perfiles técnicos e industriales: mantenimiento, ingeniería, producción y más. Consulta las posiciones abiertas y envía tu CV.»
- Cada oferta: «Oferta de empleo de {puesto} en {ubicación}. Envía tu CV a SIBBERIA desde la propia oferta.»
- Contacto: «Cuéntanos qué perfil buscas. Escríbenos a hola@sibberia.com o llámanos al 91 931 97 38 o al 655 18 81 31.»
- Descripción de la empresa para Google: «Especialistas en selección de perfiles técnicos e industriales en España. También estrategia y gestión del capital humano, y formación y desarrollo de personas.»

## Imágenes

- Fotos de las cabeceras (generadas por el cliente con ChatGPT, ilustrativas; ver `docs/imagenes.md`). Textos alternativos redactados para la web (familias en `data/areas.json → foto.alt`; Selección, Ofertas y Contacto en `site/pages.mjs`):
  - Mantenimiento y SAT: «Técnico de mantenimiento con gafas de seguridad comprueba con un multímetro el cableado de un cuadro eléctrico abierto en una planta industrial.»
  - Producción: «Jefa de turno con gafas de seguridad consulta una tableta mientras recorre una línea de producción; dos operarios trabajan al fondo.»
  - Calidad, PRL y Medioambiente: «Inspector de calidad con chaleco reflectante mide una pieza mecanizada con un calibre digital en un banco de inspección.»
  - Almacén, Logística, Planificación y Compras: «Técnica de logística con chaleco reflectante escanea el código de barras de una caja en una estantería de almacén; al fondo, una carretilla.»
  - Ingeniería y Proyectos: «Ingeniero de proyectos trabaja con un portátil y planos en una mesa de una planta industrial, con un casco de seguridad al lado.»
  - Automatización y Robótica: «Técnica con gafas de seguridad programa un brazo robot industrial con la consola de programación, junto a una célula de seguridad.»
  - Programadores/as: «Programador con gafas de seguridad trabaja con un portátil y módulos de PLC en un puesto acristalado con vistas a la planta.»
  - Selección: «Una consultora de selección entrevista a un candidato con ropa de trabajo en una sala acristalada junto a la planta.»
  - Ofertas de trabajo: «Una candidata con ropa de trabajo consulta su móvil a la entrada de una nave industrial al amanecer.»
  - Contacto: «Una consultora y un responsable de planta conversan junto a un portátil en una oficina acristalada con vistas a la planta.»
