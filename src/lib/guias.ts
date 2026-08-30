/* ════════════════════════════════════════════════════════════════
   Las guías.

   Qué son y qué no
   ────────────────
   Una ficha del glosario responde «qué es esto». Una comercial dice
   «esto resuelve tu problema». Una guía hace algo distinto: acompaña
   a alguien de principio a fin en un proceso completo.

   Son las más caras de escribir —unas 2.000 palabras cada una— y las
   que más traen gente, porque responden la pregunta entera y no una
   palabra suelta. Quien busca «cómo postular a una licitación» no
   quiere una definición: quiere que le digan qué hacer.

   Por qué llevan índice
   ─────────────────────
   A partir de cierto largo la página deja de leerse de corrido y pasa
   a consultarse. El índice no es adorno: es la diferencia entre que
   alguien encuentre lo suyo en diez segundos o se devuelva a Google.
   Y Google lo puede usar para mostrar saltos a secciones dentro del
   propio resultado.

   ⛔ Misma regla que en todo el sitio: se describe qué puede hacer la
   app, nunca el resultado de hacerlo. Nada de datos de clientes, de
   proveedores ni de precios reales.
═══════════════════════════════════════════════════════════════════ */

export type Seccion = {
  /** Se usa como ancla: #paso-1 */
  id: string;
  titulo: string;
  parrafos: string[];
  /** Una lista cuando el contenido es enumerable de verdad. */
  lista?: string[];
  /** El aviso que salva de un error caro. */
  aviso?: string;
};

export type Guia = {
  slug: string;
  titulo: string;
  tituloSeo: string;
  descripcion: string;
  bajada: string;
  /** Minutos de lectura, calculados sobre el texto real. */
  secciones: Seccion[];
  faqs: { q: string; a: string }[];
  cierre: { texto: string; boton: string };
  /** Términos del glosario que la guía menciona. */
  glosario: string[];
};

export const GUIAS: Guia[] = [
  /* ── 1 · Compra Ágil ·  acompaña a la comercial de 15.500/mes ── */
  {
    slug: "guia-compra-agil",
    titulo: "Guía de Compra Ágil para proveedores",
    tituloSeo: "Compra Ágil: guía completa para proveedores",
    descripcion:
      "Cómo funciona la Compra Ágil de Mercado Público paso a paso: quién puede cotizar, cómo se elige, cuánto se demora y los errores que hacen perder cotizaciones ganables.",
    bajada:
      "Es el canal más rápido del Estado y el que menos requisitos pide. También es donde más oportunidades se pierden, y casi nunca por precio.",
    secciones: [
      {
        id: "que-es",
        titulo: "Qué es exactamente",
        parrafos: [
          "La Compra Ágil es el procedimiento que Mercado Público usa para las compras chicas: hasta 100 UTM, alrededor de $6,9 millones con la UTM cerca de los $69.000. El organismo publica lo que necesita en pocas líneas, los proveedores cotizan por la plataforma, y se compra a la que convenga.",
          "Nació de un problema práctico. Hacer una licitación completa para comprar algo de medio millón de pesos cuesta más en tiempo y papeleo de lo que vale la compra: hay que redactar bases, esperar plazos legales, formar comisión evaluadora. Para montos chicos eso no tiene sentido, y el resultado era que los organismos terminaban comprando mal o no comprando.",
          "Así que se creó una vía corta. Sin bases administrativas ni técnicas, sin garantías, sin comisión evaluadora. Un requerimiento, al menos tres cotizaciones, y una orden de compra.",
        ],
      },
      {
        id: "quien-puede",
        titulo: "Quién puede cotizar",
        parrafos: [
          "Prácticamente cualquiera con inicio de actividades. Se necesita estar registrado en Mercado Público —que es gratis y toma minutos— y tener declarado el rubro que corresponde a lo que se está comprando.",
          "Y acá está lo que mucha gente no sabe: no hace falta estar acreditado en ChileProveedores. Ese registro tiene costo anual y varias licitaciones lo exigen, pero la Compra Ágil normalmente no. Tampoco se pide experiencia previa ni historial con el Estado.",
          "Por eso es la puerta de entrada natural. Un proveedor que nunca le ha vendido al Estado puede cotizar su primera Compra Ágil la misma semana en que se registra.",
        ],
        aviso:
          "El rubro declarado es lo que decide si la cotización te aparece. Es el filtro más importante y el que casi todos configuran mal el primer día.",
      },
      {
        id: "como-funciona",
        titulo: "Cómo funciona, paso a paso",
        parrafos: [
          "El ciclo completo puede cerrarse en una semana, y a veces en días. Estos son los cuatro momentos:",
        ],
        lista: [
          "El organismo publica el requerimiento. Es breve: qué necesita, cuánto, para cuándo y a veces alguna especificación mínima. No hay bases que leer.",
          "Los proveedores cotizan por la plataforma. La ley pide al menos tres cotizaciones para poder comprar, pero nada impide que lleguen quince.",
          "El organismo compara y elige. Sin fórmula de puntaje ni comisión: normalmente manda el precio junto con el plazo de entrega y el cumplimiento de lo pedido.",
          "Se emite la orden de compra y hay que aceptarla en la plataforma. Recién ahí queda autorizado entregar y facturar.",
        ],
      },
      {
        id: "velocidad",
        titulo: "Por qué se pierden, y casi nunca es por precio",
        parrafos: [
          "La Compra Ágil no se pierde compitiendo: se pierde por no enterarse. El organismo publica, junta sus tres cotizaciones en dos días y compra. Para cuando el proveedor entra al portal a revisar, el proceso ya está cerrado.",
          "Y el volumen no ayuda. Todos los días se publican cotizaciones en todos los rubros del país, mezcladas con licitaciones enormes que no tienen nada que ver contigo. Filtrar eso a mano es un trabajo de tiempo completo.",
          "El patrón típico es siempre el mismo: alguien descubre la Compra Ágil por casualidad, gana una, se entusiasma, revisa el portal religiosamente un mes, se cansa, y vuelve a perdérselas. No es falta de disciplina — es que el portal no está hecho para que un proveedor lo monitoree.",
          "Hay un segundo motivo, menos obvio: el buscador funciona por coincidencia exacta de palabras. Si buscas «aseo» no encuentras «servicio de higienización». Cada búsqueda revela un pedazo distinto del mercado y ninguna revela el total.",
        ],
      },
      {
        id: "cotizar-bien",
        titulo: "Cómo cotizar bien",
        parrafos: [
          "Cotizar en Compra Ágil se parece más a responder rápido que a preparar una oferta. Pero hay decisiones que definen si el negocio deja algo:",
        ],
        lista: [
          "Revisa si el precio va neto o con IVA. Es un 19% de diferencia y equivocarse puede significar ganar sin margen o perder por caro.",
          "Incluye todo lo que el requerimiento pide: despacho, instalación, garantía. Si no lo incluiste y te lo exigen, ese costo lo pones tú.",
          "Comprométete a un plazo que puedas cumplir. En Compra Ágil el plazo pesa casi tanto como el precio, pero incumplirlo queda en tu historial.",
          "Mira a cuánto se compró antes lo mismo. Es información pública y es la mejor referencia que existe para no ofertar a ciegas.",
        ],
        aviso:
          "No cotices con el margen de una licitación grande. Son operaciones chicas y frecuentes: el margen sale del volumen y de no gastar horas en cada una, no de exprimir cada operación.",
      },
      {
        id: "historial",
        titulo: "Lo que construyes sin darte cuenta",
        parrafos: [
          "Cada Compra Ágil entregada a tiempo es un antecedente público con ese organismo. Y ese historial es lo que después pesa cuando aparece una licitación de verdad: cuando un comprador evalúa si contratarte, mira si has cumplido antes.",
          "Es la razón por la que conviene tomarse en serio operaciones que parecen chicas. Un millón de pesos entregado bien vale más que su margen: vale la puerta que abre.",
          "También funciona al revés. Un incumplimiento en una Compra Ágil chica queda registrado igual que uno grande, y lo ven todos los organismos, no sólo el afectado.",
        ],
      },
      {
        id: "con-iautolicita",
        titulo: "Cómo lo resuelve IAutoLicita",
        parrafos: [
          "El problema real —enterarse a tiempo de lo que calza contigo— es el que la plataforma resuelve. Traes tu RUT y armamos tu perfil solo desde tu historial de ventas al Estado: qué vendes, en qué rubros, a quién le has vendido. No hay que tipear categorías ni adivinar códigos.",
          "Desde ahí las Compras Ágiles que calzan contigo llegan filtradas, junto con las licitaciones y las grandes compras del convenio marco, en un solo lugar.",
          "Y llegan con contexto: a qué precio se adjudicó antes algo parecido, con su rango real. Cotizar sabiendo eso es distinto de cotizar adivinando.",
        ],
      },
    ],
    faqs: [
      {
        q: "¿Cuál es el monto máximo de una Compra Ágil?",
        a: "100 UTM, alrededor de $6,9 millones con la UTM cerca de los $69.000. Sobre ese monto el organismo tiene que licitar.",
      },
      {
        q: "¿Necesito estar acreditado en ChileProveedores?",
        a: "Normalmente no. Basta estar inscrito en Mercado Público, que es gratis, y tener el rubro correspondiente declarado.",
      },
      {
        q: "¿Cuántas cotizaciones se piden?",
        a: "Al menos tres para que el organismo pueda comprar. Pero pueden llegar más, y muchas compras se resuelven con las primeras que llegan.",
      },
      {
        q: "¿Piden garantía en Compra Ágil?",
        a: "No. Es una de sus diferencias principales con la licitación: sin bases, sin garantías y sin comisión evaluadora.",
      },
      {
        q: "¿Cómo me entero de las Compras Ágiles de mi rubro?",
        a: "En el portal hay que buscarlas a mano, probando variantes de palabras, todos los días. Con una herramienta de alertas llegan filtradas por lo que vendes.",
      },
    ],
    cierre: {
      texto:
        "Trae tu RUT y en minutos ves las Compras Ágiles publicadas hoy que calzan con lo que vendes, con su precio de referencia.",
      boton: "Ver las que calzan conmigo",
    },
    glosario: ["compra-agil", "orden-de-compra", "proveedor-del-estado", "rubro"],
  },

  /* ── 2 · Cómo postular paso a paso ──────────────────────────── */
  {
    slug: "guia-como-postular-licitacion",
    titulo: "Cómo postular a una licitación, paso a paso",
    tituloSeo: "Cómo postular a una licitación en Chile",
    descripcion:
      "De encontrar la licitación a enviar la oferta: qué revisar primero, qué documentos preparar, cuánto se demora cada trámite y dónde se pierde la mayoría.",
    bajada:
      "La mayoría de las ofertas que quedan fuera no fallan por precio ni por técnica. Fallan por un documento, una firma o un plazo mal calculado.",
    secciones: [
      {
        id: "antes",
        titulo: "Antes de empezar: ¿es tu licitación?",
        parrafos: [
          "Preparar una oferta toma días. Antes de invertirlos hay tres cosas que revisar, y todas están en las bases administrativas:",
        ],
        lista: [
          "Los requisitos de admisibilidad. Si piden estar acreditado en ChileProveedores y no lo estás, o exigen una certificación que no tienes, esa licitación no es tuya. No hay puntaje parcial: es sí o no.",
          "Las especificaciones excluyentes de las bases técnicas. Mismo criterio: si tu producto no las cumple, la oferta ni se evalúa.",
          "Los criterios de evaluación. Si el precio pesa 30% y el 70% restante son experiencia y certificaciones que no tienes, sabes de entrada que vas a perder aunque ofertes barato.",
        ],
        aviso:
          "Reconocer temprano que una licitación no es tuya no es rendirse: es no gastar tres días en algo que no se puede ganar.",
      },
      {
        id: "calendario",
        titulo: "Arma el calendario hacia atrás",
        parrafos: [
          "El error más caro y más común es empezar tarde. La fecha de cierre no se mueve, y casi todo lo que necesitas depende de terceros que no corren a tu ritmo.",
          "Cuenta hacia atrás desde el cierre y reserva tiempo real para cada cosa:",
        ],
        lista: [
          "Garantía de seriedad, si la piden: entre 3 y 7 días hábiles. Si es tu primera boleta en ese banco, más.",
          "Cotizaciones con tus propios proveedores: lo que ellos tarden, más un día de margen.",
          "Certificados que venzan: revisa vigencias antes, no el día antes.",
          "Subir la oferta: horas, no minutos. La plataforma se pone lenta cerca del cierre de procesos grandes.",
        ],
      },
      {
        id: "foro",
        titulo: "Usa el foro de aclaraciones",
        parrafos: [
          "Es la única instancia formal para preguntar, tiene plazo acotado, y la mayoría de los proveedores no la usa. Lo que el organismo responde ahí tiene el mismo peso que las bases y aplica para todos.",
          "Sirve para dos cosas. Para aclarar una duda propia —si una especificación admite equivalente, si un documento se puede presentar de otra forma—, y para leer lo que preguntaron los demás, que muchas veces aclara justo lo que a ti también te daba vueltas.",
          "Y si una especificación parece hecha a la medida de un proveedor —una marca sin «o equivalente», una certificación rarísima— el foro es donde se cuestiona. A veces el organismo corrige.",
        ],
        aviso:
          "Cuidado con lo que preguntas: las preguntas son públicas. Una muy específica le muestra a la competencia por dónde vas.",
      },
      {
        id: "documentos",
        titulo: "Los documentos: donde se pierde la mayoría",
        parrafos: [
          "Las bases traen anexos numerados y hay que llenarlos en el formato exacto que entregó el organismo. Presentar la misma información en un documento propio se puede rechazar por forma, aunque el contenido esté perfecto.",
          "Lo que casi siempre va: identificación del oferente, declaración jurada de inhabilidades, detalle de experiencia con sus respaldos, y la oferta económica en su formato.",
          "Revisa quién firma. Normalmente el representante legal según la escritura vigente, y a veces con firma electrónica avanzada. Un anexo firmado por quien no correspondía es un anexo inválido.",
          "Y no dejes en blanco los anexos opcionales. Suelen ser los que suman puntaje sin costar plata: tener personal en la región, certificaciones que ya tienes, plazo de entrega menor al máximo.",
        ],
      },
      {
        id: "precio",
        titulo: "Cómo decidir el precio",
        parrafos: [
          "Antes de poner un número, lee la fórmula de evaluación. No es lo mismo que el puntaje se reparta en proporción al precio que se calcule dividiendo el menor precio ofertado entre el tuyo — en la segunda, bajar mucho da bastante menos ventaja de la que uno cree.",
          "Si el precio pesa 40%, bajarlo agresivamente sacrifica margen a cambio de pocos puntos. Si pesa 80%, ahí sí se juega la licitación.",
          "Mete en el precio el costo de postular: la garantía, las horas de preparación y las licitaciones que no vas a ganar. Si ganas una de cada cinco, ése es el costo real de cada venta.",
          "Y mira a cuánto se adjudicó antes lo mismo. Es público, y es la única forma de no ofertar a ciegas.",
        ],
      },
      {
        id: "enviar",
        titulo: "Enviar, y qué pasa después",
        parrafos: [
          "La oferta se sube a la plataforma antes de la hora de cierre. No hay tolerancia: un minuto después no entra, aunque el sistema estuviera lento. Esa excusa no existe.",
          "Después viene la apertura, donde queda visible quién participó, y la evaluación, que termina en un informe con el puntaje de cada oferente en cada criterio. Ese cuadro se publica.",
          "Si ganas, corren plazos nuevos: entregar la garantía de fiel cumplimiento, firmar el contrato cuando corresponde, y aceptar la orden de compra. Hasta que la orden no está aceptada, no hay venta que facturar.",
          "Y si pierdes, lee el cuadro comparativo. Dice exactamente en qué línea te ganaron, y es la mejor escuela que existe. Es gratis y casi nadie lo mira.",
        ],
      },
    ],
    faqs: [
      {
        q: "¿Necesito experiencia previa para postular a una licitación?",
        a: "Depende del tramo. Los procesos chicos y la Compra Ágil casi nunca la piden; los grandes suelen exigir experiencia comprobable en trabajos similares. Por eso se empieza por abajo.",
      },
      {
        q: "¿Cuánto se demora sacar una garantía de seriedad?",
        a: "Una boleta bancaria puede tomar entre 3 y 7 días hábiles, más si es tu primera vez en ese banco. Una póliza de seguro o un certificado de fianza suelen salir en uno o dos días.",
      },
      {
        q: "¿Puedo corregir mi oferta después de enviarla?",
        a: "Hasta el cierre normalmente sí, reemplazándola en la plataforma. Después no. Durante la evaluación el organismo puede pedir aclaraciones o documentos faltantes, pero no se puede cambiar el precio.",
      },
      {
        q: "¿Por qué quedan fuera la mayoría de las ofertas?",
        a: "Por documentos: un anexo que faltaba, un formato equivocado, una firma que no correspondía o un certificado vencido. Casi nunca por precio o por técnica.",
      },
    ],
    cierre: {
      texto:
        "Lici lee las bases completas y te dice qué piden, qué garantía, qué plazos y qué documentos — citando la página donde lo dice.",
      boton: "Probar con una licitación",
    },
    glosario: [
      "que-es-una-licitacion-publica",
      "bases-administrativas",
      "anexos",
      "garantia-de-seriedad-de-la-oferta",
    ],
  },

  /* ── 3 · Garantías ──────────────────────────────────────────── */
  {
    slug: "guia-garantias-licitaciones",
    titulo: "Qué garantías te piden y cuánto cuestan",
    tituloSeo: "Garantías en licitaciones: cuánto cuestan y demoran",
    descripcion:
      "Boleta bancaria, póliza de seguro o certificado de fianza: qué acepta cada licitación, cuánto cuesta cada una, cuánto se demora y cuál conviene según tu caso.",
    bajada:
      "Nadie te explica que sacar una boleta puede tomar una semana. Y el cierre de la licitación no se mueve.",
    secciones: [
      {
        id: "dos-garantias",
        titulo: "Son dos garantías, no una",
        parrafos: [
          "La confusión más frecuente del rubro. La garantía de seriedad de la oferta va CON la oferta y respalda que, si te adjudican, vas a firmar. La de fiel cumplimiento va AL FIRMAR el contrato y respalda que vas a cumplir lo comprometido.",
          "Son de distinto tamaño y duración. La de seriedad suele ser un porcentaje bajo del presupuesto estimado y dura unos meses. La de fiel cumplimiento es un porcentaje del contrato adjudicado y tiene que seguir vigente hasta bastante después del término, porque cubre la etapa de garantía de lo entregado.",
          "Presupuestar sólo la primera es un error caro: si ganas, viene una segunda más grande y más larga, y hay que tener la caja para eso.",
        ],
      },
      {
        id: "formas",
        titulo: "Las cuatro formas, comparadas",
        parrafos: [
          "Las bases dicen cuáles acepta cada organismo. Casi siempre hay más de una opción, y elegir bien cambia mucho el costo real:",
        ],
        lista: [
          "Boleta de garantía bancaria. La más aceptada. El banco pide respaldo: con línea de crédito la descuenta de ahí; sin línea, normalmente exige dejar el monto completo tomado. Demora entre 3 y 7 días hábiles, más si es tu primera vez en ese banco. Tiene comisión que no se recupera.",
          "Póliza de seguro de ejecución inmediata. Sale en uno o dos días y no congela capital. Pagas una prima —un porcentaje del monto— que tampoco se recupera. Para quien postula seguido, suele ser la más conveniente.",
          "Certificado de fianza. Lo emite una sociedad de garantía recíproca. No necesita línea bancaria ni inmovilizar plata: la sociedad evalúa tu empresa y responde por ti a cambio de una comisión. Es la vía más accesible para quien está partiendo.",
          "Vale vista o depósito. Directo y sin trámite bancario complejo, pero inmoviliza el 100% del monto. Sólo tiene sentido en montos chicos o si te sobra caja.",
        ],
      },
      {
        id: "costo-real",
        titulo: "El costo real, que no es el que parece",
        parrafos: [
          "La boleta parece más barata porque la plata vuelve. Pero el costo no es sólo la comisión: es no poder usar ese capital durante meses. Si postulas a cuatro licitaciones al mismo tiempo, son cuatro montos inmovilizados a la vez.",
          "La póliza y la fianza cobran una prima que no se recupera nunca, pero no tocan tu caja. Cuál conviene depende de cuánta liquidez tengas y de cuántas garantías necesites simultáneamente.",
          "Y hay un costo que se olvida siempre: pagas la garantía aunque pierdas. Si sacas boletas para diez licitaciones y ganas una, pagaste diez veces por un solo negocio. Eso va en el precio.",
        ],
        aviso:
          "Mete el costo de las garantías en el precio de la oferta, calculado sobre tu tasa real de éxito. Si ganas una de cada cinco, cada venta paga cinco garantías.",
      },
      {
        id: "plazos",
        titulo: "El plazo es lo que deja fuera a la gente",
        parrafos: [
          "El motivo más frecuente y más evitable por el que una oferta no alcanza a entrar: se empezó el trámite tarde.",
          "Entre solicitar la boleta, que el banco evalúe y que la emita, pueden pasar varios días hábiles. Si no tienes línea aprobada, el banco además te va a pedir tomar el monto, y eso agrega pasos.",
          "La regla práctica: el día que decides postular es el día que empiezas el trámite de la garantía, no el día antes del cierre.",
        ],
      },
      {
        id: "vigencia",
        titulo: "La vigencia descalifica tanto como el monto",
        parrafos: [
          "Las bases piden dos cosas: un monto y una vigencia. Casi todo el mundo revisa el monto y deja la vigencia para después.",
          "Una garantía por el monto correcto pero con vigencia más corta que la exigida se rechaza igual. Y es de las formas más tontas de perder una oferta, porque el error se detecta cuando ya no hay tiempo de emitir otra.",
          "La vigencia tiene que cubrir hasta bastante después de la fecha estimada de adjudicación, porque el proceso puede atrasarse. Las bases dan el número exacto: hay que leerlo, no estimarlo.",
        ],
      },
      {
        id: "cuando-no-piden",
        titulo: "Cuándo no te piden garantía",
        parrafos: [
          "En Compra Ágil no se piden. Es una de sus diferencias principales con la licitación y una de las razones por las que es el mejor lugar para empezar.",
          "En licitaciones de tramo bajo tampoco es seguro que las exijan: el reglamento fija desde qué monto son obligatorias, y bajo eso queda a criterio del organismo.",
          "Ver el código de la licitación —L1, LE, LP, LQ, LR— da una primera señal del tramo antes de abrir las bases. Pero la respuesta definitiva siempre está en las bases administrativas.",
        ],
      },
    ],
    faqs: [
      {
        q: "¿Cuánto se demora sacar una boleta de garantía?",
        a: "Entre 3 y 7 días hábiles habitualmente, y más si es la primera vez que la pides en ese banco. Una póliza de seguro o un certificado de fianza suelen salir en uno o dos días.",
      },
      {
        q: "¿Puedo usar una póliza en vez de boleta?",
        a: "Depende de lo que digan las bases. La mayoría acepta póliza de ejecución inmediata y certificado de fianza, pero algunas exigen boleta bancaria específicamente.",
      },
      {
        q: "¿Me devuelven la garantía si pierdo?",
        a: "Sí. La de seriedad se devuelve a los no adjudicados en los plazos que digan las bases. Sólo se cobra si te adjudicaron y te desististe.",
      },
      {
        q: "¿Qué pasa si mi garantía tiene la vigencia equivocada?",
        a: "Se rechaza la oferta, aunque el monto esté correcto. La vigencia es un requisito tan excluyente como el monto.",
      },
    ],
    cierre: {
      texto:
        "Lici lee las bases y te dice qué garantía piden, por cuánto, hasta cuándo tiene que estar vigente y qué formas acepta ese organismo.",
      boton: "Revisar una licitación",
    },
    glosario: [
      "garantia-de-seriedad-de-la-oferta",
      "que-es-una-boleta-de-garantia",
      "poliza-de-seguro",
      "certificado-de-fianza",
    ],
  },

  /* ── 4 · Licitación desierta ────────────────────────────────── */
  {
    slug: "guia-licitacion-desierta",
    titulo: "Por qué se declara desierta y qué hacer",
    tituloSeo: "Licitación desierta: qué hacer después",
    descripcion:
      "Qué significa que una licitación quede desierta, por qué pasa, qué opciones le quedan al organismo y por qué para un proveedor suele ser una oportunidad que vuelve.",
    bajada:
      "La necesidad del organismo no desapareció. Casi siempre republica, y quien está atento llega con la oferta lista.",
    secciones: [
      {
        id: "que-significa",
        titulo: "Qué significa exactamente",
        parrafos: [
          "Una licitación queda desierta cuando el proceso llega hasta el final y no hay ninguna oferta que se pueda adjudicar. El organismo lo declara por resolución fundada y el proceso se cierra sin ganador.",
          "No es un fracaso administrativo ni una irregularidad: es una salida prevista en la ley. Lo que el organismo no puede hacer es adjudicarle a una oferta que no cumple.",
          "Es distinto de una licitación revocada. Desierta significa que terminó sin oferta adjudicable; revocada significa que el organismo la dejó sin efecto por decisión propia antes de terminar. La diferencia importa por lo que viene después.",
        ],
      },
      {
        id: "por-que",
        titulo: "Las dos razones",
        parrafos: [
          "La primera es que nadie ofertó. Pasa más de lo que parece, sobre todo en rubros muy específicos, en regiones con pocos proveedores, o cuando el plazo fue tan corto que nadie alcanzó a preparar una oferta.",
          "La segunda es que sí hubo ofertas pero ninguna quedó admisible. Faltaban documentos, no cumplían una especificación excluyente, o superaban el presupuesto disponible del organismo.",
          "Esa segunda razón es una señal fuerte del mercado: significa que las bases pedían algo que los proveedores no pueden dar, o al precio que el organismo esperaba pagar.",
        ],
      },
      {
        id: "que-hace-el-organismo",
        titulo: "Qué puede hacer el organismo después",
        parrafos: [
          "La necesidad sigue ahí, así que tiene que resolverla igual. Tiene tres caminos:",
        ],
        lista: [
          "Republicar la licitación, a veces con las bases corregidas, más plazo o requisitos más realistas. Es lo más frecuente.",
          "Hacer una licitación privada, invitando a proveedores determinados. Quedar desierta es una de las causales que habilitan esta vía.",
          "Ir a trato directo, si se cumple la causal correspondiente. Que una licitación quede desierta es precisamente una de las causales que lo permiten.",
        ],
      },
      {
        id: "oportunidad",
        titulo: "Por qué es una oportunidad, no una pérdida",
        parrafos: [
          "Si quedó desierta porque nadie ofertó, la segunda vuelta suele venir mejor: más plazo, menos requisitos, o más presupuesto. Son de las mejores licitaciones a las que postular, porque el organismo ya aprendió qué no funcionó.",
          "Si quedó desierta porque las ofertas eran inadmisibles, hay una lección publicada: puedes leer qué observaron y no repetirlo.",
          "Y si el camino que toma es licitación privada o trato directo, el organismo va a mirar a quién conoce. Estar visible en el rubro —haber participado antes, tener el registro al día— es lo que decide a quién invita.",
        ],
        aviso:
          "El error es dar el caso por cerrado. La necesidad no desapareció: sólo se corrió de fecha.",
      },
      {
        id: "como-detectarlas",
        titulo: "Cómo enterarse de las republicaciones",
        parrafos: [
          "Acá está la parte difícil. Cuando una licitación se republica, aparece como un proceso nuevo, con ID nuevo y a veces con el título cambiado. No hay un aviso que diga «esto es la republicación de aquello».",
          "Encontrarla a mano significa acordarse de un proceso que quedó desierto semanas atrás y revisar si volvió a salir. En la práctica nadie lo hace.",
          "Es exactamente el tipo de seguimiento que conviene automatizar: una licitación desierta es una oportunidad con fecha de vuelta desconocida.",
        ],
      },
      {
        id: "prevenir",
        titulo: "Y si la desierta fue por culpa de las ofertas",
        parrafos: [
          "Cuando todas las ofertas quedan inadmisibles, casi siempre es por lo mismo: documentos faltantes, formatos equivocados o una especificación que nadie leyó bien.",
          "Si tú fuiste uno de los que quedó fuera, el acta dice exactamente por qué. Esa razón es lo primero que hay que corregir antes de la republicación.",
          "Y si una especificación era imposible de cumplir para todo el mercado, el foro de aclaraciones de la republicación es el lugar para hacerlo notar. Los organismos suelen corregir cuando el problema se les muestra.",
        ],
      },
    ],
    faqs: [
      {
        q: "¿Qué pasa cuando una licitación queda desierta?",
        a: "El organismo la declara desierta por resolución y el proceso se cierra sin ganador. Como la necesidad sigue, normalmente republica, y en algunos casos la ley le permite ir a licitación privada o trato directo.",
      },
      {
        q: "¿Me devuelven la garantía si la licitación queda desierta?",
        a: "Sí. La garantía de seriedad se devuelve en los plazos que digan las bases, porque no hubo adjudicación.",
      },
      {
        q: "¿Cuánto se demora en republicarse?",
        a: "No hay plazo fijo: depende de la urgencia del organismo y de si tiene que corregir las bases. Puede ser desde algunas semanas hasta varios meses.",
      },
      {
        q: "¿Cómo sé si una licitación desierta se republicó?",
        a: "Aparece como un proceso nuevo, con ID distinto y a veces con otro título, así que hay que estar monitoreando. Es de las cosas que conviene automatizar.",
      },
    ],
    cierre: {
      texto:
        "Te avisamos cuando una licitación que te interesaba vuelve a publicarse, sin que tengas que estar revisando el portal.",
      boton: "Que me avisen",
    },
    glosario: [
      "licitacion-desierta",
      "licitacion-revocada",
      "trato-directo",
      "licitacion-privada",
    ],
  },

  /* ── 5 · Leer las bases ─────────────────────────────────────── */
  {
    slug: "guia-leer-bases-licitacion",
    titulo: "Cómo leer las bases sin perder el día",
    tituloSeo: "Cómo leer las bases de una licitación",
    descripcion:
      "Qué mirar primero en unas bases de licitación, en qué orden, y cómo descartar en diez minutos las que no te sirven en vez de leer cien páginas para descubrirlo.",
    bajada:
      "Unas bases pueden ser cien páginas. Leerlas enteras para descubrir al final que piden algo que no tienes es la forma más cara de perder un día.",
    secciones: [
      {
        id: "dos-documentos",
        titulo: "Son dos documentos y se leen al revés",
        parrafos: [
          "Toda licitación trae bases administrativas y bases técnicas. Las técnicas dicen QUÉ se compra; las administrativas dicen CÓMO se compra: plazos, garantías, documentos y con qué fórmula se evalúa.",
          "El instinto es leer primero las técnicas, porque hablan del producto. Es el orden equivocado. La mayoría de las ofertas que quedan fuera no fallan por técnica: fallan por un requisito administrativo.",
          "Empieza por las administrativas. En diez minutos sabes si esa licitación es viable para ti, y recién ahí vale la pena entrar al detalle técnico.",
        ],
      },
      {
        id: "primeros-diez-minutos",
        titulo: "Los primeros diez minutos",
        parrafos: [
          "Hay cuatro cosas que deciden si sigues leyendo o cierras el documento. En este orden:",
        ],
        lista: [
          "Requisitos de admisibilidad. ¿Piden estar acreditado en ChileProveedores? ¿Alguna certificación específica? Si hay uno que no cumples, ahí termina la lectura.",
          "Fecha de cierre. Cuéntala hacia atrás: si piden garantía y quedan cuatro días, probablemente no llegas.",
          "Criterios de evaluación con sus pesos. Si el precio pesa 30% y el resto son cosas que no tienes, vas a perder aunque ofertes barato.",
          "Presupuesto estimado, si lo publican. Si está muy por debajo de tu costo, no hay nada que hacer.",
        ],
        aviso:
          "Descartar temprano no es rendirse. Preparar una oferta toma días: postular a tres que calzan de verdad rinde más que a veinte que calzan a medias.",
      },
      {
        id: "excluyentes",
        titulo: "Buscar lo excluyente antes que lo puntuable",
        parrafos: [
          "En las bases técnicas hay dos tipos de requisito. Los excluyentes: si no los cumples, la oferta queda inadmisible y no se evalúa, sin puntaje parcial. Y los deseables: suman puntos si los tienes, no descalifican si no.",
          "Léelos en ese orden. Un excluyente que no cumples hace irrelevante todo lo demás.",
          "Los excluyentes no siempre están marcados como tales. A veces están redactados como características del producto, y hay que fijarse en el verbo: «deberá» y «obligatorio» son excluyentes; «se valorará» y «deseable» son puntaje.",
        ],
      },
      {
        id: "trampa-marca",
        titulo: "La trampa de la marca sin equivalente",
        parrafos: [
          "Si las bases técnicas describen una marca o un modelo específico, fíjate si dicen «o equivalente». Cuando no lo dicen, la licitación puede estar direccionada hacia un proveedor.",
          "Eso es materia de consulta en el foro de aclaraciones. A veces el organismo corrige y agrega el equivalente; a veces responde que la especificación se mantiene, y ahí ya sabes que esa licitación no era para ti.",
          "En cualquier caso, preguntarlo es gratis y toma dos minutos. Lo que se responde en el foro tiene el mismo peso que las bases.",
        ],
      },
      {
        id: "calendario",
        titulo: "Extrae el calendario completo",
        parrafos: [
          "Las bases traen todas las fechas y conviene sacarlas a una sola lista antes de empezar a trabajar:",
        ],
        lista: [
          "Cierre de preguntas en el foro y publicación de respuestas.",
          "Cierre de recepción de ofertas — la que no se mueve.",
          "Apertura técnica y apertura económica.",
          "Fecha estimada de adjudicación, que define la vigencia mínima de tu garantía.",
        ],
      },
      {
        id: "anexos",
        titulo: "La lista de anexos, antes de cotizar",
        parrafos: [
          "Los anexos son formularios que hay que llenar en el formato exacto del organismo. Presentar la información en un documento propio se puede rechazar por forma.",
          "Haz la lista completa el primer día. Si alguno pide algo que no tienes —un balance auditado, una certificación, un poder notarial— mejor descubrirlo ahora que el día antes del cierre.",
          "Y no dejes en blanco los opcionales. Suelen ser los que suman puntaje sin costar plata.",
        ],
      },
      {
        id: "con-lici",
        titulo: "Cómo lo hace Lici",
        parrafos: [
          "Todo lo anterior es un método que funciona, y sigue tomando tiempo. Ese es el trabajo que Lici hace por ti: lee las bases completas —administrativas y técnicas— y responde en castellano qué exigen, qué garantía piden, qué plazos corren y qué documentos hay que adjuntar.",
          "Y cita la página donde encontró cada dato. Eso importa más de lo que parece: una respuesta sin cita no se puede verificar, y en algo que decide si postulas o no, verificar no es opcional.",
          "No reemplaza leer las bases cuando ya decidiste postular. Reemplaza leer cien páginas para descubrir que no te servía.",
        ],
      },
    ],
    faqs: [
      {
        q: "¿Qué leo primero, las bases administrativas o las técnicas?",
        a: "Las administrativas. Ahí están los requisitos que descalifican, los plazos y la fórmula de evaluación. La mayoría de las ofertas que quedan fuera falla por un requisito administrativo, no por la técnica.",
      },
      {
        q: "¿Qué es un requisito excluyente?",
        a: "Uno que hay que cumplir sí o sí: si no lo cumples, la oferta queda inadmisible y no se evalúa. No hay puntaje parcial. Se distinguen por el verbo: «deberá» u «obligatorio» excluyen; «se valorará» o «deseable» dan puntaje.",
      },
      {
        q: "¿Qué hago si las bases piden una marca específica?",
        a: "Fíjate si dicen «o equivalente». Si no lo dicen, consúltalo en el foro de aclaraciones: es la instancia formal y lo que se responde ahí tiene el mismo peso que las bases.",
      },
      {
        q: "¿Puedo confiar en un resumen de las bases hecho con IA?",
        a: "Si cita la página donde encontró cada dato, sí: puedes verificarlo en segundos. Si no cita, hay que leerlas igual, así que el resumen no ahorró nada.",
      },
    ],
    cierre: {
      texto:
        "Lici lee las bases completas y te dice qué piden, qué garantía y qué plazos — citando la página donde lo dice, para que puedas verificarlo.",
      boton: "Probar con una licitación",
    },
    glosario: [
      "bases-administrativas",
      "bases-tecnicas",
      "criterios-de-evaluacion",
      "foro-de-aclaraciones",
    ],
  },

  /* ── 6 · Plan Anual de Compras ──────────────────────────────── */
  {
    slug: "guia-plan-anual-de-compras",
    titulo: "Cómo saber qué va a comprar el Estado",
    tituloSeo: "Plan Anual de Compras: qué comprará el Estado",
    descripcion:
      "El Plan Anual de Compras dice qué piensa comprar cada organismo público, cuánto y en qué mes. Es información pública, gratuita, y casi nadie la usa.",
    bajada:
      "La mayoría de los proveedores se entera de una licitación el día que se publica. El plan de compras la anuncia meses antes.",
    secciones: [
      {
        id: "que-es",
        titulo: "Qué es el PAC",
        parrafos: [
          "La ley obliga a cada organismo público a planificar sus compras del año y a publicar ese plan en Mercado Público. Se llama Plan Anual de Compras, o PAC.",
          "Cada línea trae el rubro, un monto estimado y el mes en que se espera comprar. Es una declaración de intención, no un compromiso: los planes se modifican durante el año, se atrasan, y a veces la compra no se hace.",
          "Pero como señal es lo mejor que hay. Si un organismo declaró que va a comprar tu rubro por cierto monto en agosto, esa compra probablemente exista.",
        ],
      },
      {
        id: "por-que-nadie",
        titulo: "Por qué casi nadie lo usa",
        parrafos: [
          "Es público y gratuito, así que la razón no es el acceso. Son tres cosas más simples.",
          "La primera es que mucha gente no sabe que existe. En las conversaciones sobre licitaciones se habla del portal, de las bases, de las garantías; el plan de compras rara vez aparece.",
          "La segunda es el formato. Son cientos de miles de líneas repartidas entre más de mil organismos, cada uno con su propio archivo, y encontrar lo tuyo ahí no es una tarde de trabajo.",
          "Y la tercera es que no avisa. No hay una notificación que diga «un organismo declaró que va a comprar lo que tú vendes». Hay que ir a buscarlo.",
        ],
      },
      {
        id: "para-que-sirve",
        titulo: "Para qué sirve de verdad",
        parrafos: [
          "Tres usos concretos, en orden de valor:",
        ],
        lista: [
          "Preparar con tiempo. Si sabes que en tres meses sale una licitación de tu rubro, puedes tener la garantía tramitada, los certificados vigentes y las cotizaciones de tus proveedores listas antes de que corra el reloj.",
          "Elegir a quién perseguir. Un organismo cuyo plan incluye tu rubro con monto alto vale más que diez que no lo mencionan. Es la mejor lista de clientes potenciales que existe, y es pública.",
          "Anticipar el volumen del año. Si sumas lo que declararon comprar de tu rubro todos los organismos, tienes una estimación del tamaño del mercado al que puedes apuntar.",
        ],
      },
      {
        id: "ejecutado",
        titulo: "Contrastar con lo ejecutado",
        parrafos: [
          "El plan solo dice la intención. El dato que lo vuelve útil es compararlo con lo que el organismo efectivamente ya compró.",
          "Si declaró comprar en marzo y estamos en julio sin que haya salido, esa compra está pendiente. Es una señal razonable de que va a salir pronto, sobre todo cerca del cierre del año presupuestario.",
          "Y al revés: si ya ejecutó todo lo que declaró para tu rubro, ese organismo probablemente no va a comprar más este año, por mucho que su plan lo mencione.",
        ],
        aviso:
          "Los presupuestos públicos son anuales. Hacia fin de año aparecen compras que se habían postergado, porque lo no ejecutado se pierde.",
      },
      {
        id: "limites",
        titulo: "Qué NO es",
        parrafos: [
          "No es un compromiso. El organismo puede modificar su plan cuando quiera, y lo hace: cambian las prioridades, se recorta el presupuesto, aparece una urgencia.",
          "Tampoco es preciso. Los montos son estimados y las fechas son referenciales. Un plan que dice «marzo» puede terminar publicándose en agosto.",
          "Y no reemplaza estar atento a lo que se publica. El plan te dice qué esperar; la licitación puede salir igual sin haber estado en el plan.",
        ],
      },
      {
        id: "con-iautolicita",
        titulo: "Cómo se consulta sin perder días",
        parrafos: [
          "El problema del PAC no es el acceso: es el volumen. Cientos de miles de líneas repartidas entre más de mil organismos.",
          "En IAutoLicita el plan de compras del país completo se puede revisar por rubro: qué declaró comprar cada institución, cuánto lleva ejecutado y quién va acelerado. Sin descargar archivos ni cruzar planillas.",
          "Es de las funciones que menos se conocen y de las que más cambian la forma de trabajar, porque mueve la conversación de «qué salió hoy» a «qué va a salir».",
        ],
      },
    ],
    faqs: [
      {
        q: "¿Qué es el Plan Anual de Compras?",
        a: "Es el documento donde cada organismo público declara a comienzos de año qué piensa comprar, cuánto y en qué mes. Se publica en Mercado Público y cualquiera puede consultarlo.",
      },
      {
        q: "¿El plan de compras es obligatorio para los organismos?",
        a: "Sí, la ley obliga a elaborarlo y publicarlo. Lo que no es obligatorio es cumplirlo al pie de la letra: los planes se modifican durante el año.",
      },
      {
        q: "¿Puedo confiar en las fechas del plan?",
        a: "Como referencia, no como compromiso. Una compra declarada para marzo puede publicarse en agosto. Sirve para saber qué esperar, no para agendar.",
      },
      {
        q: "¿Dónde se consulta?",
        a: "En Mercado Público, organismo por organismo. Como son más de mil instituciones y cientos de miles de líneas, revisarlo a mano por rubro es poco práctico.",
      },
    ],
    cierre: {
      texto:
        "El plan de compras de todo el país se puede revisar por rubro: qué declaró comprar cada institución y cuánto lleva ejecutado.",
      boton: "Ver el plan de compras",
    },
    glosario: [
      "plan-anual-de-compras",
      "organismo-comprador",
      "rubro",
      "compras-publicas",
    ],
  },
];

export const POR_SLUG_GUIA: Record<string, Guia> = Object.fromEntries(
  GUIAS.map((g) => [g.slug, g]),
);

export const RUTA_GUIAS = "/guias";
export const rutaGuia = (slug: string) => `${RUTA_GUIAS}/${slug}`;

/** Minutos de lectura sobre el texto real, a 200 palabras por minuto. */
export function minutosDe(g: Guia): number {
  const palabras = g.secciones
    .flatMap((s) => [...s.parrafos, ...(s.lista ?? []), s.aviso ?? ""])
    .join(" ")
    .split(/\s+/).length;
  return Math.max(3, Math.round(palabras / 200));
}
