/* Los dos documentos legales del sitio.

   ⚠️ SON UN BORRADOR DE TRABAJO. NO los revisó un abogado.

   Qué se hizo el 31-ago-2026
   ──────────────────────────
   Se auditó la política contra la **Ley 21.719** de protección de
   datos personales —vigencia plena el 1-dic-2026— y se cubrieron las
   siete cosas que faltaban: identificación completa del responsable,
   bases de licitud, el juego completo de derechos (con oposición,
   portabilidad y bloqueo, que no estaban), el plazo de 30 días, el
   derecho a reclamar ante la Agencia, las transferencias
   internacionales y las decisiones automatizadas.

   La regla de Carlos es contrastar artículo por artículo contra la
   ley CHILENA y no adoptar una plantilla GDPR: la 21.719 se le
   parece pero cambia la autoridad, los plazos, las bases de licitud
   y el régimen de multas, y en datos económicos arrastra además la
   19.628 Título III.

   Dos cosas que la política promete y la plataforma SÍ puede cumplir
   —lo que casi nadie tiene al revés—: los derechos del titular
   tienen motor construido en la base (`dp_solicitudes_titular` con
   SLA de 30 días, `fn_dp_export_titular` para portabilidad,
   `fn_dp_eliminar_titular`, `dp_supresiones`) y la retención tiene
   su política con purga automática.

   ⚠️ LO QUE SIGUE PENDIENTE, y no lo resuelve este archivo:
   · revisión y firma de un abogado
   · el DPA con cada organización cliente (rol de ENCARGADO)
   · el banner de consentimiento de cookies — hoy Analytics carga
     antes de que nadie acepte nada, y eso contradice lo que este
     documento dice sobre poder desactivarlas
   · la EIPD por el uso de IA, y decidir si hace falta un DPO

   El texto vive acá y no dentro del componente para que se pueda
   corregir sin tocar la pantalla. */

export type Seccion = { titulo: string; parrafos: string[] };
export type Documento = {
  ruta: string;
  titulo: string;
  bajada: string;
  actualizado: string;
  secciones: Seccion[];
};

const ACTUALIZADO = "31 de agosto de 2026";

export const PRIVACIDAD: Documento = {
  ruta: "/privacidad",
  titulo: "Política de privacidad",
  bajada:
    "Qué datos tomamos, para qué los usamos y qué puedes pedirnos que hagamos con ellos.",
  actualizado: ACTUALIZADO,
  secciones: [
    {
      titulo: "Quiénes somos",
      parrafos: [
        "IAutoLicita es un producto de IAUTOMATIZA SPA, RUT 78.203.877-K, con domicilio en Av. Presidente Kennedy 7440, oficina 701, Vitacura, Santiago de Chile.",
        "Para cualquier tema de privacidad —ejercer tus derechos, hacer una consulta o presentar un reclamo— escríbenos a contacto@iautolicita.cl. Respondemos dentro de 30 días corridos.",
        "Una precisión que importa: cuando usas este sitio o nuestra plataforma, IAUTOMATIZA SPA es el responsable de tus datos. Cuando una empresa cliente carga en la plataforma datos de SUS clientes o proveedores, esa empresa es la responsable y nosotros actuamos como encargados: los tratamos por instrucción suya y sólo para prestarle el servicio.",
      ],
    },
    {
      titulo: "Qué datos recogemos",
      parrafos: [
        "Datos que nos entregas: cuando nos escribes o pides una reunión, recogemos tu nombre, el nombre y RUT de tu empresa, tu correo y, si lo dejas, tu teléfono.",
        "Datos de uso del sitio: páginas visitadas, tiempo de permanencia, desde dónde llegaste, tipo de dispositivo y navegador. Se recogen de forma agregada, mediante cookies y tecnologías similares.",
        "Conversaciones con Lici: lo que le escribes al asistente del sitio queda registrado para mejorar sus respuestas. No le entregues datos sensibles ni contraseñas — Lici no los necesita para nada.",
      ],
    },
    {
      titulo: "Datos públicos de ChileCompra",
      parrafos: [
        "La plataforma trabaja sobre información de compras públicas que el Estado de Chile publica abiertamente a través de ChileCompra: licitaciones, adjudicaciones y órdenes de compra. Esa información es pública en origen y no la generamos nosotros.",
        "Si eres proveedor del Estado y tu empresa figura en esos registros, aparece porque la publicó el organismo comprador, no porque nosotros la hayamos recogido de otra parte.",
      ],
    },
    {
      titulo: "Para qué los usamos",
      parrafos: [
        "Para responder lo que nos preguntas y contactarte si pediste una reunión.",
        "Para entender cómo se usa el sitio y mejorarlo.",
        "Para medir nuestras campañas de publicidad y mostrarte avisos relevantes.",
        "No vendemos tus datos a terceros. Nunca.",
      ],
    },
    {
      titulo: "Cookies y servicios de terceros",
      parrafos: [
        "Usamos Google Analytics para entender el uso del sitio, y las etiquetas de Google Ads para medir la efectividad de nuestros avisos. Estos servicios instalan cookies propias y de terceros en tu navegador, y pueden usarlas para mostrarte publicidad de IAutoLicita en otros sitios.",
        "Puedes desactivar las cookies desde la configuración de tu navegador, o dejar de recibir publicidad personalizada de Google desde la configuración de anuncios de tu cuenta de Google. El sitio funciona igual sin ellas.",
        "También usamos proveedores de infraestructura para alojar el sitio y la aplicación. Acceden a los datos solo en lo necesario para prestar el servicio.",
      ],
    },
    {
      titulo: "Con qué fundamento los tratamos",
      parrafos: [
        "La Ley 21.719 exige que cada tratamiento tenga una base que lo haga lícito. Estas son las nuestras, por tipo de dato.",
        "Tu consentimiento: cuando nos escribes por el formulario, cuando conversas con Lici o cuando aceptas cookies de analítica. Puedes retirarlo cuando quieras y dejamos de tratar esos datos.",
        "La ejecución del contrato: los datos de tu cuenta y de tu uso de la plataforma, que necesitamos para prestarte el servicio que contrataste.",
        "Nuestro interés legítimo: mantener el sitio seguro, prevenir abusos y entender de forma agregada cómo se usa, para mejorarlo. Es un interés que ponderamos contra tus derechos, y si consideras que no corresponde puedes oponerte.",
        "El cumplimiento de obligaciones legales: la información tributaria y contable que la ley nos obliga a conservar.",
      ],
    },
    {
      titulo: "Dónde se guardan y quién más los procesa",
      parrafos: [
        "Trabajamos con proveedores de infraestructura que están fuera de Chile, así que tus datos salen del país. Te lo decimos porque la ley lo exige y porque corresponde que lo sepas.",
        "Supabase aloja nuestra base de datos. Vercel sirve este sitio. Google presta la analítica y, cuando corresponda, la publicidad. Anthropic procesa las conversaciones con Lici para generar sus respuestas. Resend entrega los correos que te enviamos.",
        "Con todos ellos existe una relación contractual que los obliga a tratar los datos sólo por nuestra instrucción y con medidas de seguridad adecuadas. Ninguno los usa para fines propios.",
        "No vendemos, arrendamos ni cedemos tus datos a terceros con fines comerciales. Nunca.",
      ],
    },
    {
      titulo: "Decisiones automatizadas y perfilamiento",
      parrafos: [
        "Nuestra plataforma usa inteligencia artificial en dos lugares: Lici, que lee las bases de una licitación y responde preguntas sobre ellas, y el motor que arma tu perfil comercial y determina qué licitaciones te calzan.",
        "Eso significa que hay tratamiento automatizado y elaboración de perfiles. Queremos ser claros sobre su alcance: son herramientas de apoyo a tu decisión. No producen efectos jurídicos sobre ti, no deciden si contratamos contigo ni condicionan tu acceso al servicio.",
        "Tienes derecho a conocer la lógica general de estos tratamientos, a pedir la intervención de una persona de nuestro equipo y a expresar tu punto de vista o impugnar el resultado. Escríbenos a contacto@iautolicita.cl.",
        "Lici puede equivocarse, y por eso cita la página del documento de donde saca cada respuesta: para que puedas verificarla. Las decisiones comerciales —a qué postular, a qué precio— las tomas tú.",
      ],
    },
    {
      titulo: "Cuánto tiempo los guardamos",
      parrafos: [
        "Los datos de contacto se guardan mientras exista una relación comercial o de interés, y hasta que nos pidas eliminarlos.",
        "Los datos de uso del sitio se conservan de forma agregada según los plazos de las herramientas de analítica que utilizamos.",
      ],
    },
    {
      titulo: "Tus derechos",
      parrafos: [
        "La Ley 21.719 te reconoce estos derechos sobre tus datos, y los puedes ejercer todos escribiéndonos a contacto@iautolicita.cl.",
        "Acceso: que te digamos qué datos tuyos tenemos, de dónde salieron, para qué los usamos y con quién los compartimos.",
        "Rectificación: que corrijamos los que estén errados, incompletos o desactualizados.",
        "Supresión: que los eliminemos, salvo aquellos que la ley nos obliga a conservar —por ejemplo la información tributaria— en cuyo caso te decimos cuáles y por qué.",
        "Oposición: que dejemos de tratarlos cuando nos amparamos en el interés legítimo, o cuando los usemos para comunicaciones comerciales.",
        "Portabilidad: que te entreguemos los datos que nos diste en un formato estructurado y de uso común, para que puedas llevártelos a otro servicio.",
        "Bloqueo: que suspendamos temporalmente el tratamiento mientras resolvemos una disputa sobre la exactitud de un dato o sobre la legitimidad del tratamiento.",
        "No cobramos por ninguno de estos, no necesitas explicar por qué lo pides, y respondemos dentro de 30 días corridos. Sólo te vamos a pedir que acredites tu identidad, para no entregarle tus datos a otra persona.",
      ],
    },
    {
      titulo: "Si no estás conforme",
      parrafos: [
        "Si crees que no respetamos tus derechos o que tratamos tus datos indebidamente, lo primero es escribirnos: la mayoría de las cosas se resuelven así y más rápido.",
        "Si aun así no quedas conforme, puedes reclamar ante la Agencia de Protección de Datos Personales, que es la autoridad que fiscaliza el cumplimiento de la Ley 21.719 en Chile. Tu derecho a acudir a ella no depende de que nos hayas escrito antes.",
      ],
    },
    {
      titulo: "Cambios",
      parrafos: [
        "Si cambiamos esta política, actualizamos la fecha del encabezado. Si el cambio es de fondo, avisamos por correo a quienes tengan cuenta.",
      ],
    },
  ],
};

export const TERMINOS: Documento = {
  ruta: "/terminos",
  titulo: "Términos y condiciones",
  bajada: "Las reglas del servicio, en castellano y sin letra chica.",
  actualizado: ACTUALIZADO,
  secciones: [
    {
      titulo: "Qué es el servicio",
      parrafos: [
        "IAutoLicita es una plataforma que monitorea las compras públicas de Chile, detecta las licitaciones y compras ágiles que calzan con lo que vende tu empresa, y te ayuda a leer sus bases y a preparar tu oferta.",
        "Es una herramienta de apoyo. Las decisiones comerciales —a qué postular, a qué precio, con qué documentos— las tomas tú.",
      ],
    },
    {
      titulo: "Cuenta y uso",
      parrafos: [
        "Para usar la plataforma necesitas una cuenta. Eres responsable de mantener tus credenciales seguras y de lo que se haga desde tu cuenta.",
        "No está permitido revender el acceso, extraer masivamente el contenido de la plataforma por medios automatizados, ni usar el servicio para algo distinto de la gestión de compras públicas de tu propia empresa.",
      ],
    },
    {
      titulo: "Planes y pagos",
      parrafos: [
        "El plan Free es gratuito, no requiere tarjeta y no tiene fecha de término. Sus límites están publicados en la página de planes.",
        "Los planes de pago se cobran por adelantado, mensual o anualmente, en pesos chilenos y con IVA sobre el valor neto publicado. El pago anual equivale a diez meses.",
        "No hay permanencia mínima: puedes cancelar cuando quieras y el servicio sigue disponible hasta el término del período ya pagado. Los períodos ya transcurridos no se devuelven.",
        "Si cambiamos los precios, avisamos con anticipación y el cambio rige desde tu siguiente renovación.",
      ],
    },
    {
      titulo: "Sobre la información y los resultados",
      parrafos: [
        "La información proviene de fuentes públicas del Estado de Chile. Hacemos un esfuerzo permanente por mantenerla completa y al día, pero no controlamos su origen: si el organismo publica tarde, incompleto o con errores, eso se refleja.",
        "La fuente oficial de toda licitación es siempre ChileCompra. Ante cualquier diferencia, manda el documento oficial.",
        "Los análisis, resúmenes de bases, puntajes y sugerencias de precio son estimaciones generadas con inteligencia artificial a partir de esa información. Son un apoyo para decidir, no una garantía. No garantizamos adjudicaciones ni resultados comerciales de ningún tipo.",
      ],
    },
    {
      titulo: "Disponibilidad",
      parrafos: [
        "Trabajamos para que el servicio esté siempre disponible, pero puede haber interrupciones por mantenimiento, fallas de terceros o causas fuera de nuestro control. Avisamos las mantenciones programadas con anticipación.",
      ],
    },
    {
      titulo: "Propiedad",
      parrafos: [
        "La plataforma, su código, su diseño y sus modelos son de IAutomatiza. Lo que tú cargas —tus documentos, tus propuestas, tu información comercial— sigue siendo tuyo, y puedes llevártelo o pedir que lo eliminemos cuando quieras.",
      ],
    },
    {
      titulo: "Responsabilidad",
      parrafos: [
        "Respondemos por el servicio en los términos de la ley chilena. No respondemos por decisiones comerciales tomadas a partir de la información de la plataforma, ni por resultados de procesos de licitación.",
      ],
    },
    {
      titulo: "Derecho a retracto",
      parrafos: [
        "Como la contratación es a distancia, la Ley 19.496 sobre protección de los derechos de los consumidores reconoce un plazo de retracto de 10 días corridos desde la contratación, siempre que no hayas empezado a usar el servicio.",
        "En la práctica esto pesa poco, porque el plan gratis permite probar la plataforma completa antes de pagar: no hace falta contratar para saber si sirve. De todos modos, si contrataste y te arrepientes dentro del plazo, escríbenos a contacto@iautolicita.cl y lo resolvemos.",
      ],
    },
    {
      titulo: "Comunicaciones que te enviamos",
      parrafos: [
        "Te escribimos por dos motivos distintos y conviene separarlos. Las comunicaciones del servicio —avisos de licitaciones que calzan contigo, cambios en tu cuenta, temas de facturación— son parte de lo que contrataste y llegan mientras tengas cuenta activa.",
        "Las comunicaciones comerciales —novedades, contenido, promociones— sólo se envían si las aceptaste, y todas incluyen un enlace para darte de baja en un clic. Puedes hacerlo cuando quieras y sin explicar por qué, como exige el artículo 28 B de la Ley 19.496.",
        "En cada correo se identifica quién lo envía y desde qué dirección. Si alguna vez recibes uno nuestro que no cumpla esto, avísanos y lo corregimos.",
      ],
    },
    {
      titulo: "Ley aplicable",
      parrafos: [
        "Estos términos se rigen por la ley chilena, y cualquier controversia se somete a los tribunales de Santiago de Chile.",
      ],
    },
  ],
};

export const DOCUMENTOS = [PRIVACIDAD, TERMINOS];
