/* ════════════════════════════════════════════════════════════════
   Glosario de compras públicas.

   Por qué existe
   ──────────────
   Medido en Google Trends (Chile, 12 meses), «mercado público» tiene
   índice 71 contra 9 de «licitaciones» y 4 de «chilecompra». Y la
   primera búsqueda relacionada de CADA término del rubro es «mercado
   público»: nadie busca «convenio marco» a secas, busca «convenio
   marco mercado público». Por eso ese par aparece en el título de
   cada entrada, aunque el tema sea otro.

   Qué lo separa del glosario del vecino
   ─────────────────────────────────────
   El de la competencia define y ahí termina. Éste cierra con lo que
   la app hace EN ESE PUNTO — quien busca «qué garantía me piden»
   tiene el problema ahora, no en abstracto. El cierre es contextual
   al término; un botón genérico al pie sería un folleto.

   ⚠️ Regla de Carlos, sin excepciones: se muestra el RESULTADO, no
   el método. Se puede decir «pones tu RUT y el perfil sale solo».
   No se dice de dónde sale, cómo se agrupan los productos ni contra
   qué se comparan. Eso es lo único copiable.

   ⚠️ Y no se publica ningún dato que viva en la app: ni montos de
   proveedores, ni nombres de clientes, ni cifras de adjudicación.
   Un competidor publica 24.634 fichas de proveedores con RUT y
   montos; si hiciéramos lo mismo, los clientes de IAutoLicita
   terminarían con sus cifras publicadas en su propio proveedor.

   Largo mínimo
   ────────────
   Desde marzo de 2024 Google evalúa la calidad a nivel de SITIO, no
   de página: un montón de fichas flacas hunde al dominio entero. El
   piso práctico son ~300 palabras propias por entrada. Si un término
   no da para eso, no entra al glosario — se menciona dentro de otro.
═══════════════════════════════════════════════════════════════════ */

export type Termino = {
  /** Va en la URL: /glosario/{slug} */
  slug: string;
  /** Como se escribe en la ficha de Mercado Público. */
  termino: string;
  /** El nombre largo, cuando el término es una sigla. */
  nombreLargo?: string;
  /** Agrupa el índice. */
  familia: Familia;
  /** Una frase. Es lo que Google puede mostrar como respuesta. */
  definicion: string;
  /** El desarrollo. */
  cuerpo: string[];
  /** Qué significa para quien vende, que es lo que vino a saber. */
  paraTi: string[];
  /** El error que comete todo el mundo acá. */
  error?: string;
  /* Una tabla cuando el término ES una tabla.

     No es adorno: los cinco tramos de licitación en prosa obligan al
     lector a construir la comparación en la cabeza. En una grilla la
     ve de un vistazo, que es exactamente lo que vino a buscar. Sólo
     va cuando el contenido lo pide; forzarla sería decoración. */
  tabla?: { columnas: string[]; filas: string[][]; nota?: string };
  /* Una pieza interactiva, cuando el término tiene algo que se
     entiende mejor tocándolo que leyéndolo. No todas la llevan: si
     no aporta, la ficha se lee mejor sin ella. */
  visual?: "anatomia-id";
  /* Una secuencia con sus tiempos, para los términos donde lo que
     importa es el ORDEN y los DÍAS, no la definición. */
  pasos?: {
    titulo: string;
    duracion?: string;
    detalle: string;
    riesgo?: boolean;
  }[];
  /** El cierre hacia la app. Contextual al término, nunca genérico. */
  cierre: { texto: string; boton: string };
  /** Slugs de términos vecinos. Es el tejido interno del glosario. */
  vecinos: string[];
};

export type Familia =
  | "Tipos de proceso"
  | "Documentos"
  | "Garantías"
  | "El proceso"
  | "Quién es quién"
  | "Normativa";

export const FAMILIAS: Familia[] = [
  "Tipos de proceso",
  "Documentos",
  "Garantías",
  "El proceso",
  "Quién es quién",
  "Normativa",
];

export const TERMINOS: Termino[] = [
  /* ── 1 · Una sigla ────────────────────────────────────────────
     Las siglas de tipo de proceso (L1, LE, LP, LQ, LR, TD, CO) son
     el hueco más claro del rubro: el proveedor las ve en la ficha,
     no las entiende, y sólo el sitio de ChileCompra las explica —
     con una tabla sin contexto. */
  {
    slug: "tipos-de-licitacion-l1-le-lp",
    termino: "Tipos de licitación",
    nombreLargo: "L1, LE, LP, LQ y LR",
    familia: "Tipos de proceso",
    definicion:
      "En Mercado Público el tipo de licitación se identifica con dos letras al final del ID —L1, LE, LP, LQ o LR— y esas letras dicen el tramo de monto, cuántos días tienes para ofertar y qué garantías te van a pedir.",
    cuerpo: [
      "Toda licitación de Mercado Público lleva un ID con esta forma: 1234-56-LE26. Los últimos cuatro caracteres no son decorativos. Las dos letras dicen de qué tamaño es el proceso y los dos números el año en que se publicó. Ese par de letras cambia las reglas del juego antes de que abras un solo documento.",
      "Los tramos van por monto estimado en UTM, y a medida que subes se alargan los plazos, las garantías se vuelven obligatorias y el papeleo crece.",
      "El plazo mínimo de publicación también cambia con el tramo. En una L1 pueden ser 5 días corridos; desde LE hacia arriba, 10 o más. Esa diferencia es el tiempo real que tienes para leer las bases, cotizar, sacar la garantía si corresponde y armar la oferta — y es la razón por la que el tramo importa tanto como el rubro.",
      "Hay otros códigos que no son de tramo sino de mecanismo, y conviene no confundirlos: TD es trato directo, CO es cotización de Compra Ágil, y E cuando el proceso se declara de emergencia. Esos no hablan de monto, hablan de por qué el organismo compró así.",
    ],
    paraTi: [
      "El tramo es el filtro más útil que existe y casi nadie lo usa. Si vendes entre 7 y 70 millones, tu mercado es LE, y todo lo que sea LR es ruido: nunca vas a postular a un contrato de 400 millones.",
      "El código te dice qué esperar antes de abrir las bases. Ver LE es saber de entrada que tienes al menos 10 días y que la garantía es posible. Ver L1 es saber que puede cerrar en 5 y que probablemente no te pidan boleta.",
      "Si estás partiendo, L1 y LE son por donde se entra. Los tramos grandes suelen pedir experiencia previa comprobable, y sin historial las bases te dejan fuera por requisitos antes que por precio.",
    ],
    visual: "anatomia-id",
    tabla: {
      columnas: ["Código", "Tramo en UTM", "Más o menos en pesos", "Plazo mínimo"],
      filas: [
        ["L1", "hasta 100", "hasta $6,9 millones", "5 días"],
        ["LE", "100 a 1.000", "$6,9 a $69 millones", "10 días"],
        ["LP", "1.000 a 2.000", "$69 a $138 millones", "20 días"],
        ["LQ", "2.000 a 5.000", "$138 a $345 millones", "20 días"],
        ["LR", "más de 5.000", "sobre $345 millones", "30 días"],
      ],
      nota: "Los pesos son referencia con la UTM cerca de los $69.000, que se reajusta todos los meses. Los plazos son el mínimo legal: el organismo puede dar más.",
    },
    error:
      "Creer que el tramo es lo que vas a cobrar. El código sale del monto ESTIMADO por el organismo antes de publicar, no del precio de adjudicación. Una LE puede terminar adjudicándose muy por debajo de las 1.000 UTM y sigue llamándose LE.",
    cierre: {
      texto:
        "Puedes recibir sólo las licitaciones del tramo que trabajas, sin ver pasar las que te quedan grandes o chicas.",
      boton: "Ver las de tu tamaño",
    },
    vecinos: ["garantia-de-seriedad-de-la-oferta", "dialogo-competitivo"],
  },

  /* ══ Tanda 1 · vocabulario base ═══════════════════════════════
     Los términos que no necesitan que nadie los valide: son las
     palabras con que está escrita cualquier ficha de Mercado
     Público. Las dudosas esperan al Planificador. */

  {
    slug: "convenio-marco",
    termino: "Convenio marco",
    familia: "Tipos de proceso",
    definicion:
      "Es el catálogo del Estado: ChileCompra licita una vez, deja adentro a los proveedores que ganaron, y después cualquier organismo les compra directo sin volver a licitar.",
    cuerpo: [
      "Funciona como una tienda. ChileCompra hace una licitación grande para un rubro completo —computadores, aseo, alimentos, pasajes aéreos— y los proveedores que quedan seleccionados entran a un catálogo con sus productos y sus precios. De ahí en adelante, cualquier hospital, municipalidad o ministerio entra a la tienda y compra, sin proceso nuevo.",
      "Para el Estado la gracia es la velocidad: comprar por convenio marco toma días en vez de meses. Por eso la ley obliga a los organismos a revisar primero el catálogo — si lo que necesitan está ahí, en principio deben comprarlo ahí y no licitar por su cuenta.",
      "Entrar es distinto a ganar una licitación normal. No compites por un contrato puntual sino por un cupo en el catálogo, y ese cupo dura años. Las licitaciones de convenio marco se publican cada cierto tiempo por rubro, y si te la pierdes tienes que esperar a la siguiente.",
      "Estar adentro no garantiza vender. En el catálogo hay varios proveedores por producto y el comprador elige, normalmente mirando precio y plazo de entrega. Es un canal de venta abierto, no un contrato asegurado.",
      "Cuando el monto de una compra por catálogo es alto, el organismo no puede elegir a dedo: tiene que hacer una Gran Compra, que es una mini-licitación entre los proveedores del convenio.",
    ],
    paraTi: [
      "Si vendes algo que está en catálogo y no estás adentro, hay una parte del mercado a la que simplemente no llegas: esas compras nunca se publican como licitación porque se resuelven en la tienda.",
      "Es venta de bajo esfuerzo por operación pero de alto esfuerzo de entrada. Entrar cuesta —hay que preparar una postulación seria— pero una vez adentro las ventas no requieren armar una oferta cada vez.",
      "Ojo con el precio que ofreces al postular: queda en el catálogo y te va a costar moverlo. Si entras muy barato para asegurar el cupo, después vendes años a ese precio.",
    ],
    error:
      "Creer que entrar al convenio marco reemplaza a postular a licitaciones. Son canales paralelos: hay organismos que compran casi todo por catálogo y otros que licitan igual. Quedarse sólo con uno deja la mitad del mercado afuera.",
    cierre: {
      texto:
        "Puedes ver el movimiento del convenio marco y las licitaciones al mismo tiempo, sin tener que revisar dos lugares distintos.",
      boton: "Ver los dos canales",
    },
    vecinos: ["trato-directo", "compra-agil", "tipos-de-licitacion-l1-le-lp"],
  },

  {
    slug: "trato-directo",
    termino: "Trato directo",
    familia: "Tipos de proceso",
    definicion:
      "Es cuando un organismo del Estado compra sin licitar, eligiendo directamente a un proveedor. Sólo procede en las causales que fija la ley y hay que justificarlo por escrito y publicarlo.",
    cuerpo: [
      "La regla general de las compras públicas es licitar. El trato directo es la excepción, y como toda excepción está acotada: la Ley 19.886 y su reglamento enumeran las causales, y fuera de ellas no se puede usar.",
      "Las causales más frecuentes son la emergencia declarada, que exista un solo proveedor capaz de entregar lo que se necesita, que una licitación previa haya quedado desierta, que el monto sea muy bajo, o que se trate de la continuación de un servicio donde cambiar de proveedor causaría un perjuicio evidente.",
      "No es una compra a escondidas. El organismo tiene que dictar una resolución fundada explicando por qué corresponde la causal, y esa resolución se publica en Mercado Público junto con la orden de compra. Cualquiera puede leerla.",
      "En la práctica es un canal grande. Una parte importante de lo que el Estado compra cada año pasa por acá, sobre todo en montos chicos y en servicios que ya venían funcionando con un proveedor.",
    ],
    paraTi: [
      "Es el canal donde la relación previa pesa más que la oferta. Si un organismo ya te compró y quedó conforme, tienes ventaja real cuando aparezca una causal que permita el trato directo.",
      "Sirve mirar los tratos directos de un organismo para entender con quién trabaja habitualmente. Es información pública y dice mucho más que su lista de licitaciones.",
      "Si te llaman para un trato directo, revisa que la causal esté bien invocada antes de entregar. Si después se cuestiona la compra, el problema operativo lo tienes tú.",
    ],
    error:
      "Pensar que el trato directo es discrecional. No lo es: sin causal aplicable y sin resolución fundada, la compra es impugnable — y el que queda con el servicio a medias es el proveedor.",
    cierre: {
      texto:
        "Los tratos directos de un organismo se pueden revisar igual que sus licitaciones: con quién compra, en qué y cada cuánto.",
      boton: "Mirar un organismo",
    },
    vecinos: ["convenio-marco", "compra-agil", "ley-19886"],
  },

  {
    slug: "compra-agil",
    termino: "Compra Ágil",
    familia: "Tipos de proceso",
    definicion:
      "Es el canal rápido de Mercado Público para compras de hasta 100 UTM: el organismo pide al menos tres cotizaciones por la plataforma y compra a la mejor, sin bases ni garantías.",
    cuerpo: [
      "Nació para resolver el problema de las compras chicas. Licitar por algo de medio millón de pesos cuesta más en tiempo y papeleo de lo que vale la compra, así que se creó una vía corta: el organismo publica lo que necesita, los proveedores cotizan, y se compra a la que convenga.",
      "No hay bases administrativas ni técnicas: hay un requerimiento en pocas líneas. No se piden garantías. Y los plazos son de días, no de semanas. A cambio, la evaluación es mucho más simple — normalmente manda el precio y el plazo de entrega.",
      "El tope está en 100 UTM, es decir alrededor de $6,9 millones con la UTM cerca de los $69.000. Sobre eso hay que licitar.",
      "Para cotizar sólo se necesita estar registrado en Mercado Público y tener el rubro correspondiente. No hace falta estar acreditado en ChileProveedores como en las licitaciones grandes, lo que lo convierte en la puerta de entrada natural para quien nunca le ha vendido al Estado.",
    ],
    paraTi: [
      "Es donde se parte. Volumen alto, competencia menos preparada y ciclo corto: se cotiza hoy y puede haber orden de compra esta semana.",
      "La velocidad es la variable. Muchas Compras Ágiles se resuelven con las primeras cotizaciones que llegan; cotizar tarde es casi lo mismo que no cotizar.",
      "Sirve para construir historial. Cada Compra Ágil entregada a tiempo es un antecedente con ese organismo, y ese historial es lo que después pesa cuando aparezca una licitación de verdad.",
    ],
    pasos: [
      {
        titulo: "El organismo publica",
        detalle:
          "Un requerimiento en pocas líneas: qué necesita, cuánto y para cuándo. Sin bases administrativas ni técnicas.",
      },
      {
        titulo: "Se cotiza",
        duracion: "días, no semanas",
        detalle:
          "Los proveedores del rubro cotizan por la plataforma. Se piden al menos tres cotizaciones, y muchas se resuelven con las primeras que llegan.",
        riesgo: true,
      },
      {
        titulo: "El organismo elige",
        detalle:
          "Normalmente por precio y plazo de entrega. No hay comisión evaluadora ni fórmula de puntaje como en una licitación.",
      },
      {
        titulo: "Orden de compra",
        detalle:
          "Se emite y hay que aceptarla. De ahí a entregar. Todo el ciclo puede cerrarse en la misma semana.",
      },
    ],
    error:
      "Cotizar Compra Ágil con el mismo margen que una licitación grande. Son operaciones chicas y frecuentes: el margen sale del volumen y de no gastar tiempo en armarlas, no de cada una por separado.",
    cierre: {
      texto:
        "Las Compras Ágiles que calzan contigo llegan junto con las licitaciones, en el mismo aviso.",
      boton: "Ver las que calzan",
    },
    vecinos: ["convenio-marco", "trato-directo", "tipos-de-licitacion-l1-le-lp"],
  },

  {
    slug: "bases-administrativas",
    termino: "Bases administrativas",
    familia: "Documentos",
    definicion:
      "Son las reglas del proceso: quién puede participar, qué documentos hay que entregar, qué plazos corren, qué garantías se piden y con qué fórmula se van a evaluar las ofertas.",
    cuerpo: [
      "Toda licitación pública tiene dos juegos de bases. Las técnicas dicen QUÉ se compra; las administrativas dicen CÓMO se compra. Las dos son obligatorias y las dos dejan fuera si no se cumplen.",
      "En las administrativas está lo que decide si tu oferta siquiera se abre: los requisitos de admisibilidad. Ahí se define si te piden estar acreditado en ChileProveedores, si exigen garantía de seriedad, qué declaraciones juradas van, y hasta qué hora exacta se reciben las ofertas.",
      "También está la fórmula de evaluación, que es la parte que más gente se salta. Ahí se ve cuánto pesa el precio, cuánto la experiencia, cuánto el plazo de entrega y cuánto los criterios que a veces valen puntos sin costar plata, como tener personal en la región.",
      "Y está el calendario completo: cuándo cierran las preguntas, cuándo se publican las respuestas, cuándo es la apertura, cuándo se estima adjudicar. Ese calendario manda: una fecha que se te pasa no se recupera.",
    ],
    paraTi: [
      "Son lo primero que hay que leer, antes que las técnicas. Si un requisito de admisibilidad no lo cumples, no importa lo buena que sea tu propuesta — no la van a abrir.",
      "La fórmula de evaluación te dice a qué precio ofertar. Si el precio pesa 40% y la experiencia 60%, bajar el precio para ganar puede no servirte de nada.",
      "Revisa el plazo de entrega exigido antes de cotizar. Es de los compromisos más caros de incumplir, porque las multas suelen estar en estas mismas bases.",
    ],
    error:
      "Leer sólo las bases técnicas porque son las que hablan del producto. La mayoría de las ofertas que quedan fuera no fallan por técnica: fallan por un documento administrativo que faltaba.",
    cierre: {
      texto:
        "Lici lee las bases completas —administrativas y técnicas— y te dice qué te piden, qué plazos corren y con qué fórmula te van a evaluar, citando dónde lo dice.",
      boton: "Probar con una licitación",
    },
    vecinos: ["bases-tecnicas", "criterios-de-evaluacion", "declaracion-jurada"],
  },

  {
    slug: "bases-tecnicas",
    termino: "Bases técnicas",
    familia: "Documentos",
    definicion:
      "Son la descripción exacta de lo que el organismo quiere comprar: características, cantidades, plazos de entrega, normas que debe cumplir y cómo se va a verificar que se cumplió.",
    cuerpo: [
      "Si las administrativas son las reglas del juego, las técnicas son el pedido. Acá está lo que de verdad hay que entregar, con el nivel de detalle que el organismo haya decidido usar.",
      "El detalle varía muchísimo. Hay bases técnicas de una página que describen el producto en dos líneas, y hay bases de cien páginas con especificaciones, planos y normas chilenas de referencia. En las largas es donde se esconden los requisitos que descalifican.",
      "Un punto clave son las especificaciones excluyentes: características que la oferta DEBE cumplir. Si tu producto no las cumple, no hay puntaje parcial — queda fuera. Distinto de las deseables, que suman puntos si las tienes.",
      "También suelen incluir cómo se recibe lo entregado: quién verifica, con qué criterio, y qué pasa si algo no cumple. Esa parte define cuánto trabajo te va a costar de verdad el contrato después de ganarlo.",
    ],
    paraTi: [
      "Busca primero las especificaciones excluyentes. Son el filtro de vida o muerte: si hay una que no cumples, el resto de la lectura sobra.",
      "Fíjate en la unidad de medida y en las cantidades. Cotizar por unidad cuando piden por caja, o al revés, es un error que aparece más de lo que uno creería y descuadra la oferta entera.",
      "Si las bases describen una marca específica, revisa si dicen «o equivalente». Cuando no lo dicen, la licitación puede estar direccionada, y eso es materia de consulta en el foro de aclaraciones.",
    ],
    error:
      "Cotizar leyendo el título de la licitación y saltando a las cantidades. El título es un resumen del organismo, no la especificación — y no descalifica ni obliga a nadie.",
    cierre: {
      texto:
        "Lici te resume las bases técnicas y te dice si lo que vendes calza con lo que están pidiendo.",
      boton: "Ver si calzas",
    },
    vecinos: ["bases-administrativas", "criterios-de-evaluacion", "tipos-de-licitacion-l1-le-lp"],
  },

  {
    slug: "declaracion-jurada",
    termino: "Declaración jurada",
    familia: "Documentos",
    definicion:
      "Es un documento donde el proveedor declara bajo juramento que no está afecto a las inhabilidades que impiden contratar con el Estado. Se firma y se sube junto con la oferta.",
    cuerpo: [
      "El Estado no puede contratar con cualquiera. La ley enumera situaciones que inhabilitan: haber sido condenado por prácticas antisindicales, tener deudas laborales o previsionales impagas, que un socio o el representante legal sea funcionario del mismo organismo, o haber sido sancionado por incumplir un contrato público anterior.",
      "Verificar todo eso caso por caso sería impracticable, así que se invierte la carga: el proveedor declara que no está en ninguna de esas situaciones, y esa declaración tiene valor legal. Si es falsa, la consecuencia no es sólo perder la licitación.",
      "Casi todas las licitaciones traen su propio formato en los anexos. No sirve traer una declaración genérica de otra licitación: el texto cambia según lo que cada organismo exija, y usar el formato equivocado se cuenta como no haberla presentado.",
      "Algunas se piden al ofertar y otras sólo al adjudicado, antes de firmar. Las bases administrativas dicen cuál va en cada momento, y confundirlas cuesta la oferta.",
    ],
    paraTi: [
      "Es de los documentos que más ofertas dejan fuera, y siempre por lo mismo: se olvidó, se subió el formato de otra licitación, o le faltaba la firma del representante legal.",
      "Revisa quién debe firmarla. Normalmente es el representante legal según la escritura vigente, no cualquiera de la empresa — y un firmante equivocado la invalida.",
      "Si tienes juicios laborales o deudas previsionales en curso, revisa la causal exacta antes de firmar. Declarar mal es un problema bastante más serio que perder una licitación.",
    ],
    error:
      "Reutilizar la declaración de una licitación anterior. Cada organismo tiene su formato y su texto; el de otro proceso se rechaza aunque diga lo mismo.",
    cierre: {
      texto:
        "Lici revisa los anexos y te lista qué declaraciones piden en esa licitación y cuáles van al ofertar y cuáles al firmar.",
      boton: "Ver qué documentos piden",
    },
    vecinos: ["bases-administrativas", "chileproveedores", "adjudicacion"],
  },

  {
    slug: "que-es-una-boleta-de-garantia",
    termino: "Boleta de garantía",
    familia: "Garantías",
    definicion:
      "Es un documento que emite un banco a favor del organismo y que este puede cobrar de inmediato si el proveedor incumple. Es la forma más aceptada de garantizar una oferta o un contrato público.",
    cuerpo: [
      "Lo que la hace especial es que se paga a la vista: el organismo la cobra presentándola, sin tener que probar el incumplimiento ni ir a juicio. Por eso el Estado la prefiere, y por eso el banco no la entrega a cualquiera.",
      "Para emitirla el banco te pide respaldo. Si tienes línea de crédito aprobada, la descuenta de ahí. Si no la tienes, normalmente te va a exigir dejar el monto completo tomado en un depósito, es decir plata inmovilizada mientras dure la garantía.",
      "El trámite toma días, no horas. Entre la solicitud, la evaluación y la emisión pueden pasar varios días hábiles, y más si es la primera vez que la pides en ese banco. El cierre de una licitación, en cambio, no se mueve.",
      "Tiene costo. Los bancos cobran una comisión por emisión que suele ir por tramos según monto y plazo, y esa comisión no se recupera aunque no ganes.",
      "Existen alternativas que las bases suelen aceptar: la póliza de seguro de ejecución inmediata y el certificado de fianza. Salen más rápido y no congelan plata, aunque tienen prima. Muchas pymes trabajan con esas justamente por eso.",
    ],
    paraTi: [
      "El costo de la boleta es parte del costo de postular y hay que meterlo en el precio. Si sacas boletas para diez licitaciones y ganas una, pagaste diez veces por un solo negocio.",
      "Empieza el trámite el día que decides postular, no el día antes del cierre. Es el motivo más frecuente y más evitable por el que una oferta no alcanza a entrar.",
      "Si no tienes línea bancaria, cotiza póliza o certificado de fianza antes de asumir que necesitas boleta. Revisa primero qué formas acepta esa licitación en particular.",
    ],
    pasos: [
      {
        titulo: "Decides postular",
        detalle:
          "Acá empieza el reloj de verdad. Si las bases piden garantía, este es el día en que hay que iniciar el trámite — no el día antes del cierre.",
      },
      {
        titulo: "Pides la boleta",
        duracion: "1 día",
        detalle:
          "Solicitud al banco con el monto, la vigencia y el texto que exigen las bases. Si es tu primera vez en ese banco, además hay que abrir el expediente.",
      },
      {
        titulo: "El banco evalúa",
        duracion: "3 a 5 días",
        detalle:
          "Acá se cae la mayoría. Si no tienes línea de crédito, el banco va a pedir que dejes el monto completo tomado, y eso agrega trámite. Sin línea aprobada, este paso puede estirarse toda la semana.",
        riesgo: true,
      },
      {
        titulo: "Te la emiten",
        duracion: "1 día",
        detalle:
          "Sale el documento. Revisa el monto, la vigencia y el nombre del beneficiario antes de subirlo: un dato mal escrito la invalida igual que no tenerla.",
      },
      {
        titulo: "Cierre de la licitación",
        detalle:
          "Esta fecha no se mueve. Contando hacia atrás desde acá, empezar con menos de una semana es apostar — y la apuesta se pierde seguido.",
      },
    ],
    error:
      "Mirar sólo el monto y no la vigencia. Una boleta por el monto correcto pero con vigencia más corta que la exigida se rechaza igual, y es de las formas más tontas de perder una oferta.",
    cierre: {
      texto:
        "Lici lee las bases y te dice qué garantía piden, por cuánto, hasta cuándo tiene que estar vigente y qué formas acepta ese organismo.",
      boton: "Revisar una licitación",
    },
    vecinos: ["garantia-de-seriedad-de-la-oferta", "garantia-de-fiel-cumplimiento", "bases-administrativas"],
  },

  {
    slug: "garantia-de-fiel-cumplimiento",
    termino: "Garantía de fiel cumplimiento",
    familia: "Garantías",
    definicion:
      "Es la garantía que entrega el proveedor que ganó, al momento de firmar el contrato, para respaldar que va a cumplir lo comprometido. Es distinta de la de seriedad de la oferta.",
    cuerpo: [
      "Se confunden todo el tiempo, y son dos momentos distintos. La de seriedad va con la oferta y respalda que, si ganas, vas a firmar. La de fiel cumplimiento va al firmar y respalda que vas a cumplir el contrato.",
      "También son de distinto tamaño y duración. La de seriedad suele ser un porcentaje bajo del presupuesto y dura unos meses. La de fiel cumplimiento suele ser un porcentaje del contrato adjudicado y tiene que seguir vigente hasta bastante después del término, porque cubre la etapa de garantía de lo entregado.",
      "El organismo la cobra si incumples: si no entregas, si entregas fuera de plazo más allá de lo tolerado, o si lo entregado no cumple lo ofertado. También suele servir para cubrir multas.",
      "Se devuelve cuando el contrato termina conforme y venció el plazo de garantía. Ese trámite hay que pedirlo: no siempre vuelve sola.",
    ],
    paraTi: [
      "Es plata comprometida durante todo el contrato y un poco más. En contratos largos, esa inmovilización es un costo financiero real que conviene calcular antes de ofertar.",
      "Si ganas varias licitaciones seguidas, las garantías se acumulan. Es una de las razones por las que crecer rápido vendiendo al Estado aprieta la caja aunque el negocio sea bueno.",
      "Acuérdate de pedir la devolución cuando corresponda. Es plata tuya que se queda ahí simplemente porque nadie la reclamó.",
    ],
    error:
      "Presupuestar sólo la garantía de seriedad y olvidar que, si ganas, viene una segunda garantía más grande y más larga.",
    cierre: {
      texto:
        "Lici te dice las dos garantías de una licitación —la de la oferta y la del contrato— con su monto y su vigencia, antes de que decidas postular.",
      boton: "Ver antes de postular",
    },
    vecinos: ["que-es-una-boleta-de-garantia", "garantia-de-seriedad-de-la-oferta", "adjudicacion"],
  },

  {
    slug: "criterios-de-evaluacion",
    termino: "Criterios de evaluación",
    familia: "El proceso",
    definicion:
      "Son la fórmula con que se comparan las ofertas: qué se mide, cuánto pesa cada cosa y cómo se transforma en puntaje. Están en las bases administrativas y se fijan antes de recibir ofertas.",
    cuerpo: [
      "En una compra pública casi nunca gana el más barato a secas. El organismo define una tabla —precio tanto por ciento, experiencia tanto, plazo de entrega tanto— y cada oferta recibe puntaje en cada línea. Gana la suma más alta.",
      "El peso del precio varía muchísimo. En compras de productos estandarizados puede pesar 70% u 80%. En servicios profesionales o proyectos complejos puede bajar a 40% o menos, y el resto se lo llevan experiencia, metodología o equipo propuesto.",
      "Hay criterios que suman puntos sin costarte plata, y son los que más se desaprovechan: tener personal en la región, cumplir con cuotas de inclusión, presentar certificaciones que ya tienes, o entregar antes del plazo máximo. Son puntos regalados para quien lee las bases.",
      "La fórmula del precio también importa. No es lo mismo que el puntaje se reparta proporcionalmente que con la fórmula del menor precio ofertado sobre el tuyo: en la segunda, bajar mucho el precio da menos ventaja de lo que uno cree.",
    ],
    paraTi: [
      "Leer los criterios antes de cotizar cambia el precio que pones. Si el precio pesa 40%, bajarlo agresivamente sacrifica margen a cambio de pocos puntos.",
      "Busca los criterios que puedes cumplir sin costo. Es la forma más barata de subir puntaje, y mucha gente los deja en blanco por no leer.",
      "Si un criterio pide algo que no tienes y pesa mucho, ésa no es tu licitación. Reconocerlo temprano ahorra días de trabajo.",
    ],
    error:
      "Asumir que gana el más barato. Muchas ofertas se pierden por dejar en blanco criterios que no costaban nada, mientras se peleaba el precio hasta el hueso.",
    cierre: {
      texto:
        "Lici te resume los criterios de una licitación con su peso, y te dice cuáles puedes cumplir con lo que ya tienes.",
      boton: "Ver los criterios",
    },
    vecinos: ["bases-administrativas", "adjudicacion", "bases-tecnicas"],
  },

  {
    slug: "adjudicacion",
    termino: "Adjudicación",
    familia: "El proceso",
    definicion:
      "Es el acto en que el organismo declara ganadora a una oferta. Se dicta por resolución fundada, se publica en Mercado Público y desde ahí corren los plazos para firmar y empezar.",
    cuerpo: [
      "Adjudicar no es lo mismo que comprar. La adjudicación declara al ganador; lo que formaliza la venta viene después: la firma del contrato cuando corresponde, y sobre todo la orden de compra, que es el documento que autoriza a entregar y a facturar.",
      "La resolución tiene que estar fundada. Publica el cuadro comparativo con el puntaje de cada oferente en cada criterio, así que puedes ver exactamente por qué ganó quien ganó y en qué línea perdiste tú.",
      "Después de adjudicar corren plazos: entregar la garantía de fiel cumplimiento, firmar el contrato, y recibir la orden de compra que hay que aceptar en la plataforma. Si el adjudicado no cumple estos pasos, el organismo puede dejar sin efecto la adjudicación y readjudicar al que quedó segundo.",
      "También puede pasar que una licitación se adjudique parcialmente, por líneas: distintos proveedores ganan distintos ítems del mismo proceso.",
    ],
    paraTi: [
      "El cuadro comparativo es la mejor escuela que existe y es gratis. Cuando pierdas, léelo: te dice si perdiste por precio, por un criterio que no llenaste, o por algo que no podías cumplir.",
      "Ganar no es cobrar. Entre la adjudicación y la orden de compra pueden pasar semanas, y sin orden de compra aceptada no hay venta que facturar.",
      "Si quedaste segundo, no cierres el caso. La readjudicación existe y ocurre más de lo que uno cree.",
    ],
    pasos: [
      {
        titulo: "Se publica la adjudicación",
        detalle:
          "Sale la resolución con el cuadro comparativo: el puntaje de cada oferente en cada criterio. Es información pública y es la mejor escuela que hay.",
      },
      {
        titulo: "Entregas la garantía",
        duracion: "según bases",
        detalle:
          "La de fiel cumplimiento, que es distinta y más grande que la de seriedad. Si no la entregas en plazo, el organismo puede dejar sin efecto la adjudicación.",
      },
      {
        titulo: "Se firma el contrato",
        detalle:
          "Cuando corresponde: en compras chicas a veces basta la orden de compra. Las bases dicen cuál de los dos aplica.",
      },
      {
        titulo: "Llega la orden de compra",
        detalle:
          "Y hay que ACEPTARLA en la plataforma. Este es el documento que autoriza a entregar y a facturar — antes de esto no hay venta, aunque hayas ganado.",
        riesgo: true,
      },
      {
        titulo: "Entregas y facturas",
        detalle:
          "Contra la orden de compra aceptada. La recepción conforme del organismo es lo que habilita el pago.",
      },
    ],
    error:
      "Empezar a producir apenas sale la adjudicación. Hasta que no hay orden de compra aceptada, no hay respaldo para lo que estás gastando.",
    cierre: {
      texto:
        "Puedes ver contra quién competiste, por cuánto se adjudicó y qué diferencia hubo con tu oferta — para que la próxima llegues con el precio calibrado.",
      boton: "Ver adjudicaciones",
    },
    vecinos: ["criterios-de-evaluacion", "licitacion-desierta", "garantia-de-fiel-cumplimiento"],
  },

  {
    slug: "licitacion-desierta",
    termino: "Licitación desierta",
    familia: "El proceso",
    definicion:
      "Es cuando una licitación termina sin adjudicar: no llegaron ofertas, o las que llegaron no cumplían las bases o no convenían. El organismo lo declara por resolución y el proceso se cierra sin ganador.",
    cuerpo: [
      "Hay dos motivos típicos. El primero es que nadie ofertó, algo más común de lo que parece en rubros específicos o en regiones donde hay pocos proveedores. El segundo es que sí hubo ofertas pero ninguna quedó admisible: faltaban documentos, no cumplían una especificación excluyente, o superaban el presupuesto disponible.",
      "Declararla desierta no es un fracaso administrativo: es una salida prevista en la ley. Lo que no puede hacer el organismo es adjudicar a una oferta que no cumple.",
      "Lo importante viene después. La necesidad no desapareció, así que el organismo tiene que resolverla igual. Normalmente republica la licitación —a veces con las bases corregidas, plazos más largos o requisitos más realistas— y en algunos casos la ley le permite ir a trato directo justamente porque la licitación quedó desierta.",
      "Es distinto de una licitación revocada. Desierta es que terminó sin ganador; revocada es que el organismo la dejó sin efecto antes de terminar, por su propia decisión.",
    ],
    paraTi: [
      "Una licitación desierta es una oportunidad que vuelve. Si el organismo necesita eso, va a republicar — y quien está atento a la republicación llega antes que el resto.",
      "Si quedó desierta porque nadie ofertó, la segunda vuelta suele venir con condiciones mejores: más plazo, menos requisitos o más presupuesto. Es de las mejores licitaciones a las que postular.",
      "Y si quedó desierta porque todas las ofertas eran inadmisibles, ahí hay una señal: las bases pedían algo que el mercado no puede dar. Vale la pena usar el foro de aclaraciones en la republicación.",
    ],
    error:
      "Darla por perdida y no volver a mirar. Que quede desierta no elimina la necesidad del organismo: casi siempre vuelve, y el que la está esperando llega con la oferta lista.",
    cierre: {
      texto:
        "Te avisamos cuando una licitación que te interesaba se republica, sin que tengas que estar revisando el portal.",
      boton: "Que me avisen",
    },
    vecinos: ["adjudicacion", "trato-directo", "criterios-de-evaluacion"],
  },

  {
    slug: "chileproveedores",
    termino: "ChileProveedores",
    familia: "Quién es quién",
    definicion:
      "Es el registro oficial de proveedores del Estado. Guarda tus documentos legales, tributarios y financieros en un solo lugar, para no tener que presentarlos en cada licitación.",
    cuerpo: [
      "La idea es simple: en vez de subir la escritura de la sociedad, el certificado de vigencia y los antecedentes financieros en cada proceso, los cargas una vez en el registro y los organismos los consultan desde ahí.",
      "Hay dos estados que se confunden. Estar inscrito en Mercado Público es gratis y es lo mínimo para ofertar en la mayoría de los procesos. Estar acreditado o hábil en ChileProveedores es otra cosa: implica tener los documentos cargados y vigentes, tiene costo anual, y muchas licitaciones lo exigen para poder adjudicar.",
      "El costo va por tramos según el tamaño de la empresa y se paga por período. No es un trámite de una vez: los documentos vencen y hay que renovarlos, y un registro vencido puede dejarte fuera aunque hayas ganado.",
      "Algunas licitaciones piden estar hábil al momento de ofertar y otras sólo al momento de adjudicar. Las bases administrativas lo dicen, y la diferencia importa: si te lo piden al ofertar y no lo tienes, no puedes participar.",
    ],
    paraTi: [
      "Para partir no lo necesitas. Compra Ágil y muchas licitaciones chicas sólo piden estar inscrito en Mercado Público, que es gratis. Acredítate cuando el tamaño de lo que persigues lo justifique.",
      "Revisa la vigencia antes de cada postulación importante. Perder una adjudicación porque un documento venció la semana pasada es de los errores más caros y más evitables.",
      "El registro también lo miran los compradores. Un perfil completo y al día es parte de cómo te ven antes de conocerte.",
    ],
    error:
      "Creer que hay que acreditarse antes de poder vender. Se puede empezar a vender al Estado sin ChileProveedores; la acreditación se justifica cuando ya persigues procesos que la exigen.",
    cierre: {
      texto:
        "Puedes ver qué licitaciones exigen acreditación y cuáles no, antes de decidir si te conviene pagarla.",
      boton: "Ver qué exigen",
    },
    vecinos: ["declaracion-jurada", "bases-administrativas", "compra-agil"],
  },

  {
    slug: "ley-19886",
    termino: "Ley 19.886",
    nombreLargo: "Ley de Compras Públicas",
    familia: "Normativa",
    definicion:
      "Es la ley que regula cómo compra el Estado de Chile. Establece que la regla general es licitar públicamente, crea Mercado Público y ChileCompra, y fija los derechos y obligaciones de los proveedores.",
    cuerpo: [
      "Antes de esta ley cada organismo compraba a su manera. La 19.886, de 2003, unificó el sistema: creó una plataforma única donde todo se publica, definió los procedimientos y estableció que la transparencia no es opcional.",
      "Su regla central es que la licitación pública es la forma normal de comprar. Todo lo demás —licitación privada, trato directo— son excepciones que sólo proceden en los casos que la propia ley señala y que hay que fundamentar y publicar.",
      "También creó el Tribunal de Contratación Pública, que es donde un proveedor puede reclamar cuando cree que un proceso se hizo mal. Es una vía real, con plazos acotados que hay que respetar.",
      "El detalle operativo no está en la ley sino en su reglamento, el Decreto Supremo 250: ahí están los plazos exactos, los tramos de monto y las reglas de las garantías.",
      "En 2025 entró en vigencia la Ley 21.634, que la reformó bastante: incorporó procedimientos nuevos, reforzó la probidad y cambió reglas de plazos y garantías. La 19.886 sigue siendo la ley base, pero hay que leerla con la reforma encima.",
    ],
    paraTi: [
      "Te da derechos concretos, no sólo obligaciones: a que las bases sean claras, a preguntar por el foro, a conocer el resultado con su fundamento, y a reclamar si algo se hizo mal.",
      "Conocer las causales de trato directo sirve para entender por qué una compra que te interesaba nunca se licitó.",
      "Los plazos para reclamar son cortos. Si vas a impugnar algo, el momento es apenas ocurre, no cuando ya se firmó el contrato.",
    ],
    error:
      "Leer la 19.886 sola. Desde 2025 hay que leerla junto con la Ley 21.634, que le cambió varias reglas — y con el reglamento, que es donde están los plazos que uno de verdad necesita.",
    cierre: {
      texto:
        "No necesitas saberte la ley para vender al Estado: Lici lee las bases de cada licitación y te dice en castellano qué te están exigiendo.",
      boton: "Que Lici lo lea",
    },
    vecinos: ["ley-21634", "decreto-661", "trato-directo"],
  },

  {
    slug: "ley-21634",
    termino: "Ley 21.634",
    nombreLargo: "Reforma a la Ley de Compras Públicas",
    familia: "Normativa",
    definicion:
      "Es la reforma que modernizó la Ley de Compras Públicas: incorporó procedimientos nuevos como el diálogo competitivo y la subasta inversa electrónica, reforzó la probidad y cambió reglas de plazos, garantías y pago.",
    cuerpo: [
      "La reforma apuntaba a tres cosas: que el Estado pueda comprar cosas complejas sin tener que definirlas de antemano, que las pymes tengan menos barreras de entrada, y que haya más control sobre los conflictos de interés.",
      "De ahí salen las figuras nuevas. El diálogo competitivo permite conversar con el mercado antes de escribir las bases. Los contratos para la innovación abren la puerta a soluciones que todavía no existen como producto. La subasta inversa electrónica hace que los proveedores compitan bajando el precio en vivo. Y las compras coordinadas permiten que varios organismos compren juntos.",
      "También reforzó el pago a proveedores, un dolor histórico del sistema, y endureció las reglas de probidad y de conflictos de interés de quienes evalúan.",
      "Su entrada en vigencia fue gradual y buena parte rige desde 2025. Eso significa que hay bases circulando escritas con la lógica antigua y otras con la nueva, y conviene fijarse en cuál está usando cada organismo.",
    ],
    paraTi: [
      "Los procedimientos nuevos tienen mucha menos competencia, simplemente porque la mayoría de los proveedores todavía no sabe que existen.",
      "Si te interesan los procesos de innovación o el diálogo competitivo, vale la pena entenderlos ahora: en dos años van a ser normales y la ventaja se pierde.",
      "Las reglas de pago te favorecen. Conocerlas sirve cuando un organismo se demora más de lo que corresponde.",
    ],
    error:
      "Asumir que todo cambió de golpe. La vigencia fue gradual y conviven bases con reglas viejas y nuevas: lo que manda es lo que digan las bases de cada proceso.",
    cierre: {
      texto:
        "Los procedimientos nuevos aparecen mezclados con todo lo demás en el portal. Puedes recibirlos identificados y aparte.",
      boton: "Ver cómo llegan",
    },
    vecinos: ["ley-19886", "dialogo-competitivo", "decreto-661"],
  },

  {
    slug: "decreto-661",
    termino: "Decreto 661",
    familia: "Normativa",
    definicion:
      "Es el decreto que actualiza el reglamento de la Ley de Compras Públicas para adecuarlo a la reforma de la Ley 21.634. Ahí quedan los detalles operativos: procedimientos, plazos, montos y garantías.",
    cuerpo: [
      "Las leyes fijan los principios y los reglamentos fijan cómo se aplican. La Ley 19.886 dice que hay que licitar; el reglamento dice en cuántos días, sobre qué monto, con qué garantía y con qué formulario.",
      "Cuando la Ley 21.634 reformó el sistema, el reglamento antiguo quedó desfasado: hablaba de procedimientos que cambiaron y omitía los que se crearon. El Decreto 661 es la actualización que pone el reglamento al día con la ley nueva.",
      "Ahí es donde de verdad hay que mirar cuando la duda es práctica. Cuántos días mínimos de publicación tiene cada tramo, desde qué monto se exige garantía, cómo se calcula, qué plazos corren después de adjudicar: todo eso vive en el reglamento, no en la ley.",
      "Es normativa reciente y por eso está en movimiento. Es una de las razones por las que aparece cada vez más en búsquedas: hay bastante gente —proveedores y también funcionarios— tratando de entender qué cambió.",
    ],
    paraTi: [
      "Es la referencia para discutir un plazo o una exigencia. Si un organismo pide algo que el reglamento no respalda, ahí está el respaldo para consultarlo en el foro de aclaraciones.",
      "No hace falta leerlo entero. Sirve saber que existe y en qué parte está lo que necesitas: los plazos por tramo y las reglas de garantías son lo que más se consulta.",
      "Si vienes de trabajar con las reglas anteriores, revisa qué cambió en tu tramo habitual. Los plazos y los montos son justo donde se producen los errores por costumbre.",
    ],
    error:
      "Guiarse por cómo se hacía antes. Buena parte de los errores de plazo vienen de aplicar de memoria una regla que el reglamento nuevo cambió.",
    cierre: {
      texto:
        "No necesitas seguir la normativa al día: cada licitación llega con sus plazos y exigencias ya leídos y en castellano.",
      boton: "Ver una licitación",
    },
    vecinos: ["ley-19886", "ley-21634", "tipos-de-licitacion-l1-le-lp"],
  },

  /* ── 2 · Un término de la ley nueva ───────────────────────────
     La Ley 21.634 rige desde 2025. Sus figuras tienen poco más de un
     año de vida y casi nadie las ha escrito: el volcado grande del
     competidor principal es de junio de 2025 y no lo volvió a tocar. */
  {
    slug: "dialogo-competitivo",
    termino: "Diálogo competitivo",
    familia: "Tipos de proceso",
    definicion:
      "Es un procedimiento de la Ley 21.634 en el que el organismo conversa con los proveedores para definir la solución antes de pedir ofertas, porque al empezar no sabe todavía cómo resolver su problema.",
    cuerpo: [
      "En una licitación normal el organismo ya sabe qué quiere y lo escribe en las bases: tantas unidades de tal cosa, con tales características. Tú ofertas contra eso. El diálogo competitivo existe para el caso contrario — cuando la institución tiene un problema claro pero no sabe cuál es la solución técnica, y escribir bases cerradas sería adivinar.",
      "El procedimiento tiene tres tiempos. Primero el organismo publica su necesidad y los interesados postulan para participar. Después viene el diálogo propiamente tal: rondas de conversación con los seleccionados, donde cada uno propone cómo lo resolvería. Con eso el organismo arma las bases definitivas y recién ahí se piden las ofertas económicas.",
      "Es una figura nueva en Chile. La Ley 21.634 la incorporó junto con los contratos para la innovación y la subasta inversa electrónica, dentro de una reforma que buscaba darle al Estado herramientas para comprar cosas que no son commodities.",
      "Se usa poco todavía, y por eso mismo la competencia en estos procesos es baja. Los organismos que lo aplican suelen hacerlo en tecnología, servicios complejos y proyectos donde el «cómo» no está resuelto.",
    ],
    paraTi: [
      "Es de los pocos procesos donde tu conocimiento técnico entra antes de que las reglas estén escritas. Si participas del diálogo, las bases finales van a estar redactadas con lo que se conversó — y eso incluye lo que tú propusiste.",
      "Exige más tiempo que una licitación normal: son varias rondas, no un solo envío. A cambio, compites contra un grupo mucho más chico, porque la mayoría de los proveedores todavía no sabe que esta figura existe.",
    ],
    error:
      "Tratarlo como si fuera una consulta al mercado. No es lo mismo: la consulta al mercado es informal y no obliga a nada, mientras que el diálogo competitivo es un procedimiento reglado que termina en una adjudicación.",
    cierre: {
      texto:
        "Los procesos nuevos de la Ley 21.634 aparecen mezclados con todo lo demás en el portal. Puedes recibirlos identificados y aparte.",
      boton: "Ver cómo llegan",
    },
    vecinos: ["tipos-de-licitacion-l1-le-lp", "garantia-de-seriedad-de-la-oferta"],
  },

  /* ── 3 · Un clásico ───────────────────────────────────────────
     Alta demanda y competencia dura: la escribimos igual, pero con
     el ángulo que el resto no da — el costo real y el calendario. */
  {
    slug: "garantia-de-seriedad-de-la-oferta",
    termino: "Garantía de seriedad de la oferta",
    familia: "Garantías",
    definicion:
      "Es un documento financiero que entregas junto con tu oferta para respaldar que, si te adjudican, vas a firmar el contrato. Si te desistes, el organismo la cobra.",
    cuerpo: [
      "No es un pago: es un respaldo. El organismo la guarda mientras dura el proceso y te la devuelve cuando termina — si ganaste, al firmar el contrato; si perdiste, en los plazos que digan las bases. Sólo la cobra si te adjudicaron y te echaste para atrás.",
      "Puede tomar varias formas y las bases dicen cuáles acepta cada organismo: boleta de garantía bancaria, póliza de seguro de ejecución inmediata, certificado de fianza, vale vista o depósito. No todas cuestan lo mismo ni se sacan igual de rápido, y ahí está la parte que a nadie le explican.",
      "La boleta bancaria es la más aceptada y la más lenta: el banco te pide respaldo o inmoviliza el monto, y puede tomar varios días si no tienes línea. La póliza de seguro suele salir en menos tiempo y no congela plata, pero tiene una prima que no se recupera. El certificado de fianza funciona parecido y algunas pymes lo usan por eso.",
      "El monto lo fija el organismo en las bases, normalmente como un porcentaje del presupuesto estimado. La vigencia también: tiene que cubrir hasta bastante después de la fecha de adjudicación, porque si tu garantía vence antes tu oferta queda fuera aunque el precio fuera el mejor.",
    ],
    paraTi: [
      "El costo de la garantía es parte del costo de postular, y hay que meterlo en el precio. Si sacas boletas para diez licitaciones y ganas una, pagaste diez veces por un solo negocio.",
      "El plazo es lo que más gente deja fuera. Sacar una boleta puede tomar días; el cierre de una licitación no se mueve. Si empiezas el trámite dos días antes, es probable que no llegues.",
      "Revisa siempre la fecha de vigencia exigida, no sólo el monto. Una garantía por el monto correcto pero con vigencia corta se rechaza igual, y es de los motivos más tontos por los que se pierde una oferta.",
    ],
    error:
      "Leer sólo el monto y dejar la vigencia para después. Las bases piden las dos cosas, y la vigencia insuficiente descalifica igual que el monto insuficiente.",
    cierre: {
      texto:
        "Lici lee las bases completas y te dice qué garantía te piden, por cuánto y hasta cuándo tiene que estar vigente — citando la página donde lo dice.",
      boton: "Probar con una licitación",
    },
    vecinos: ["tipos-de-licitacion-l1-le-lp", "dialogo-competitivo"],
  },
];

/** Índice por slug, para resolver la ruta sin recorrer la lista. */
export const POR_SLUG: Record<string, Termino> = Object.fromEntries(
  TERMINOS.map((t) => [t.slug, t]),
);

export const RUTA_GLOSARIO = "/glosario";
export const rutaTermino = (slug: string) => `${RUTA_GLOSARIO}/${slug}`;

/**
 * El título de pestaña de cada entrada.
 *
 * Lleva «Mercado Público» a propósito: es la primera búsqueda
 * relacionada de todos los términos del rubro. Google corta cerca de
 * los 60 caracteres, así que el nombre del sitio queda fuera cuando
 * el término es largo — vale más la palabra que la marca.
 */
export function tituloTermino(t: Termino): string {
  const base = `${t.termino} en Mercado Público`;
  const conMarca = `${base} — IAutoLicita`;
  return conMarca.length <= 60 ? conMarca : `${base}: qué es`;
}

export function descripcionTermino(t: Termino): string {
  return t.definicion.length <= 158
    ? t.definicion
    : t.definicion.slice(0, 155).replace(/\s+\S*$/, "") + "…";
}
