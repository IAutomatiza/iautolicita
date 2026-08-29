/* Los dos documentos legales del sitio.

   ⚠️ SON UN BORRADOR DE TRABAJO. Están escritos para reflejar
   fielmente cómo opera IAutoLicita hoy y para cumplir lo que Google
   Ads exige antes de aprobar una campaña (política de privacidad
   publicada, con mención explícita a cookies de terceros y a Google
   Analytics/Ads). NO los revisó un abogado. Antes de publicarlos
   hay que pasarlos por revisión legal.

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

const ACTUALIZADO = "28 de agosto de 2026";

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
        "IAutoLicita es un producto de IAutomatiza, con domicilio en Santiago de Chile. Para cualquier tema de privacidad puedes escribirnos a contacto@iautolicita.cl.",
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
      titulo: "Cuánto tiempo los guardamos",
      parrafos: [
        "Los datos de contacto se guardan mientras exista una relación comercial o de interés, y hasta que nos pidas eliminarlos.",
        "Los datos de uso del sitio se conservan de forma agregada según los plazos de las herramientas de analítica que utilizamos.",
      ],
    },
    {
      titulo: "Tus derechos",
      parrafos: [
        "Puedes pedirnos en cualquier momento que te digamos qué datos tuyos tenemos, que los corrijamos si están errados, o que los eliminemos.",
        "Escríbenos a contacto@iautolicita.cl y te respondemos. No cobramos por esto y no necesitas explicar por qué.",
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
      titulo: "Ley aplicable",
      parrafos: [
        "Estos términos se rigen por la ley chilena, y cualquier controversia se somete a los tribunales de Santiago de Chile.",
      ],
    },
  ],
};

export const DOCUMENTOS = [PRIVACIDAD, TERMINOS];
