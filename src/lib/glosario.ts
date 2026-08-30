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
    vecinos: ["gran-compra", "trato-directo", "compra-agil"],
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
    vecinos: ["licitacion-privada", "convenio-marco", "compra-agil"],
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
    vecinos: ["bases-administrativas", "criterios-de-evaluacion", "unspsc"],
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
    vecinos: ["readjudicacion", "criterios-de-evaluacion", "licitacion-desierta"],
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
    vecinos: ["certificado-de-inscripcion", "declaracion-jurada", "bases-administrativas"],
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
    vecinos: ["reglamento-ds-250", "ley-21634", "decreto-661"],
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
    vecinos: ["subasta-inversa-electronica", "ley-19886", "dialogo-competitivo"],
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
    vecinos: ["tribunal-de-contratacion-publica", "ley-19886", "ley-21634"],
  },

  /* ══ Tanda 2 · las que destapó el Planificador ════════════════
     Ninguna estaba en la lista original de 52. «Licitación qué es»
     tiene 5.000 búsquedas al mes con competencia baja: es la mejor
     página individual del proyecto y se nos había pasado por medir
     el vocabulario técnico y no la pregunta del que recién llega. */

  {
    slug: "que-es-una-licitacion-publica",
    termino: "Licitación pública",
    familia: "Tipos de proceso",
    definicion:
      "Es el procedimiento por el que un organismo del Estado publica lo que necesita comprar, cualquier proveedor puede ofertar, y gana la oferta que obtiene más puntaje según reglas escritas de antemano.",
    cuerpo: [
      "La idea de fondo es que la plata es de todos, así que la compra tiene que ser abierta y comparable. Por eso el organismo publica: qué necesita, con qué características, hasta cuándo se reciben ofertas y con qué fórmula va a decidir. Todo eso queda escrito antes de que llegue la primera oferta y no se puede cambiar después.",
      "Cualquier empresa o persona con inicio de actividades puede ofertar. No hace falta ser grande, ni tener contactos, ni haber vendido antes al Estado. Lo que sí hace falta es cumplir lo que piden las bases: si un requisito no se cumple, la oferta queda fuera aunque el precio sea el mejor.",
      "Todo pasa por Mercado Público, la plataforma de ChileCompra. Ahí se publica la licitación, se hacen las preguntas, se suben las ofertas, se abre el proceso y se publica quién ganó y por qué. Es público: cualquiera puede mirar cómo se decidió.",
      "El tamaño cambia las reglas. Una licitación chica puede cerrar en cinco días y sin garantías; una grande da veinte o treinta días y exige boleta y antecedentes. El código de dos letras al final del ID —L1, LE, LP, LQ, LR— dice en qué tramo está.",
      "No es el único camino. El Estado también compra por convenio marco, por Compra Ágil y, en los casos que la ley permite, por trato directo. Pero la licitación pública es la regla general: todo lo demás es excepción.",
    ],
    paraTi: [
      "Se puede partir sin experiencia previa. Los tramos chicos y la Compra Ágil casi nunca piden historial, y ahí es donde se construye el primero.",
      "No se gana por ser el más barato. Se gana por puntaje, y el precio suele pesar entre 40% y 80% según el rubro. Leer los criterios antes de cotizar cambia el precio que pones.",
      "Perder también sirve. El cuadro comparativo se publica con el puntaje de todos, así que puedes ver exactamente en qué línea te ganaron.",
    ],
    error:
      "Postular a todo lo que suene parecido a lo que vendes. Preparar una oferta cuesta días; postular a tres que calzan de verdad rinde más que a veinte que calzan a medias.",
    cierre: {
      texto:
        "Con tu RUT armamos tu perfil y te mostramos qué licitaciones calzan con lo que vendes hoy — sin que tengas que revisar el portal.",
      boton: "Ver las que calzan contigo",
    },
    vecinos: ["tipos-de-licitacion-l1-le-lp", "compras-publicas", "compra-agil"],
  },

  {
    slug: "compras-publicas",
    termino: "Compras públicas",
    familia: "El proceso",
    definicion:
      "Es todo lo que el Estado compra para funcionar: desde insumos de un consultorio hasta obras y servicios profesionales. En Chile se rige por la Ley 19.886 y pasa casi todo por Mercado Público.",
    cuerpo: [
      "Cada organismo público —ministerios, municipalidades, hospitales, universidades estatales, Fuerzas Armadas— necesita comprar para operar. Como esa plata sale de impuestos, la ley obliga a que las compras sean transparentes, comparables y abiertas a quien quiera participar.",
      "El sistema tiene cuatro puertas. La licitación pública es la regla general. El convenio marco funciona como un catálogo donde ChileCompra ya licitó y los organismos compran directo. La Compra Ágil resuelve lo chico con tres cotizaciones. Y el trato directo es la excepción, sólo en las causales que la ley señala.",
      "Todo se publica. Qué se compró, a quién, por cuánto y con qué fundamento: eso es información pública y cualquiera puede consultarla. Es una de las diferencias grandes con vender al sector privado.",
      "El volumen es alto y constante. Se publican miles de procesos al día en todo el país, en todos los rubros imaginables, y el Estado sigue comprando aunque la economía se enfríe. Es de los pocos clientes que no desaparece.",
      "También hay reglas de pago. La normativa fija plazos, y desde la reforma de 2025 se reforzó ese punto, que históricamente ha sido el dolor más grande de los proveedores.",
    ],
    paraTi: [
      "Es un cliente distinto al privado: no negocias, cumples reglas. A cambio, el proceso es predecible y quien lo entiende compite en igualdad con empresas mucho más grandes.",
      "La información pública juega a tu favor. Puedes ver a qué precio se adjudicó antes lo mismo que vas a ofertar, y con quién trabaja habitualmente cada organismo.",
      "No todos los organismos pagan igual de bien ni de rápido. Antes de comprometer capital de trabajo, vale la pena mirar el historial del comprador.",
    ],
    error:
      "Tratarlo como una venta comercial normal. Acá no hay reunión que resuelva un requisito faltante: lo que dicen las bases es lo que manda, y se aplica igual para todos.",
    cierre: {
      texto:
        "Puedes ver todo lo que el Estado publica filtrado por lo que tú vendes, y con el precio al que se adjudicó antes lo mismo.",
      boton: "Ver el mercado",
    },
    vecinos: ["que-es-una-licitacion-publica", "convenio-marco", "orden-de-compra"],
  },

  {
    slug: "orden-de-compra",
    termino: "Orden de compra",
    nombreLargo: "OC",
    familia: "El proceso",
    definicion:
      "Es el documento que emite el organismo y que formaliza la compra. Hay que aceptarlo en Mercado Público, y recién ahí queda autorizado entregar y facturar.",
    cuerpo: [
      "Es el paso que más gente se salta mentalmente. Ganar una licitación no es vender: la adjudicación declara al ganador, pero lo que autoriza a entregar y a facturar es la orden de compra emitida y aceptada.",
      "Llega a tu cuenta de Mercado Público y hay que aceptarla ahí. Si no la aceptas dentro del plazo, el sistema la puede dejar sin efecto — y hay proveedores que han perdido negocios ya ganados simplemente por no revisar la plataforma.",
      "Antes de aceptar, conviene leerla. Lleva el detalle de lo que se compra, el monto, el plazo de entrega y las condiciones. Si algo no calza con lo que ofertaste, el momento de decirlo es antes de aceptar, no después de despachar.",
      "No sólo salen de licitaciones. Compra Ágil, convenio marco y trato directo también terminan en una orden de compra: es el documento común a todos los canales.",
      "Después de entregar viene la recepción conforme del organismo, y eso es lo que habilita el pago. La orden de compra aceptada es el respaldo de todo el ciclo.",
    ],
    paraTi: [
      "Revisa la plataforma aunque no estés esperando nada. Una orden de compra que nadie aceptó es un negocio ganado que se pierde solo.",
      "No produzcas ni despaches antes de tener la OC aceptada. Sin ella no hay respaldo formal de lo que estás gastando.",
      "Tu historial de órdenes de compra es tu currículum ante el Estado: queda público y es lo que otros organismos miran para saber si cumples.",
    ],
    error:
      "Confundir adjudicación con venta. Entre una y otra pueden pasar semanas, y hay casos donde la adjudicación se deja sin efecto antes de que llegue la orden.",
    cierre: {
      texto:
        "Tus órdenes de compra se siguen desde la misma pantalla donde detectaste la licitación, sin saltar entre el portal y tu planilla.",
      boton: "Ver cómo se siguen",
    },
    vecinos: ["multas-y-sanciones", "adjudicacion", "compras-publicas"],
  },

  /* ══ Tanda 3 · el cluster de proveedores ══════════════════════
     8.750 búsquedas/mes entre «chile proveedores», «registro de
     proveedores», «mercado publico proveedores» y sus variantes, y
     sólo teníamos ChileProveedores.

     ⚠️ Intención mezclada: parte de ese tráfico son COMPRADORES
     buscando a quién comprarle, no proveedores buscando herramienta.
     Estas fichas le hablan al segundo sin prometerle nada al
     primero. */

  {
    slug: "proveedor-del-estado",
    termino: "Proveedor del Estado",
    familia: "Quién es quién",
    definicion:
      "Es cualquier empresa o persona con inicio de actividades que le vende bienes o servicios a un organismo público. No es una categoría que se solicite: se es proveedor desde la primera venta.",
    cuerpo: [
      "Hay una confusión frecuente: mucha gente cree que «ser proveedor del Estado» es un título que hay que sacar, con requisitos y espera. No lo es. Basta tener inicio de actividades en el SII y registrarse gratis en Mercado Público para poder ofertar el mismo día.",
      "Lo que sí existe es un registro adicional, ChileProveedores, que guarda tus documentos legales y financieros para no tener que subirlos en cada proceso. Tiene costo anual y algunas licitaciones lo exigen para adjudicar — pero no se necesita para empezar.",
      "Tampoco hace falta ser una empresa grande. Personas naturales con boleta, empresas individuales y sociedades de cualquier tamaño pueden vender. Lo que decide es cumplir lo que piden las bases, no el tamaño.",
      "Sí hay inhabilidades: no puede contratar quien tenga deudas laborales o previsionales impagas, quien haya sido condenado por prácticas antisindicales, o quien tenga un socio que sea funcionario del organismo que compra. Eso se declara bajo juramento al ofertar.",
      "El historial se construye y queda público. Cada orden de compra cumplida es un antecedente visible, y es lo que otros organismos miran para saber si te conviene contratar.",
    ],
    paraTi: [
      "Se puede partir la misma semana. Registro gratis en Mercado Público, elegir bien los rubros, y ya puedes cotizar Compra Ágil y postular a licitaciones chicas.",
      "Los rubros que declaras deciden qué te llega. Es el error más común al empezar: elegir mal ahí significa no enterarse de lo que sí te calzaba.",
      "El primer negocio es el más difícil, no por competencia sino por historial. Los tramos chicos y la Compra Ágil casi nunca piden experiencia previa: por ahí se entra.",
    ],
    error:
      "Esperar a «estar listo» para empezar. No hay un trámite de habilitación: el registro es gratis y toma minutos, y la acreditación paga sólo se justifica cuando ya persigues procesos que la exigen.",
    cierre: {
      texto:
        "Con tu RUT armamos tu perfil solo y te mostramos qué está publicado hoy que calce con lo que vendes.",
      boton: "Ver qué hay para ti",
    },
    vecinos: ["chileproveedores", "acreditacion", "unspsc"],
  },

  {
    slug: "organismo-comprador",
    termino: "Organismo comprador",
    familia: "Quién es quién",
    definicion:
      "Es la institución pública que compra: ministerios, municipalidades, hospitales, servicios de salud, universidades estatales, Fuerzas Armadas y todo el resto del aparato del Estado.",
    cuerpo: [
      "No compra «el Estado» como un bloque: compran más de mil organismos distintos, cada uno con su presupuesto, sus necesidades y su forma de trabajar. Un hospital regional y una municipalidad chica se comportan de manera completamente diferente aunque los dos compren lo mismo.",
      "Cada uno decide qué canal usa. Hay organismos que licitan casi todo, otros que resuelven la mayor parte por convenio marco, y otros que usan mucho la Compra Ágil. Esa costumbre es estable en el tiempo y se puede observar.",
      "Todo lo que compran es público: qué, a quién, por cuánto y con qué fundamento. Eso permite entender a un comprador antes de acercarse — con quién trabaja habitualmente, cuánto gasta en tu rubro, si suele adjudicar o dejar desierto.",
      "También varían en cómo pagan. Los plazos están normados, pero en la práctica hay organismos más rápidos que otros, y eso es información que conviene tener antes de comprometer capital de trabajo.",
    ],
    paraTi: [
      "Elegir a quién perseguir es tan importante como cotizar bien. Un organismo que compra tu rubro todos los meses vale más que diez que lo compraron una vez.",
      "Mira su historial antes de invertir tiempo. Si siempre le adjudica al mismo proveedor y hace años que no cambia, tus posibilidades reales son bajas aunque la licitación esté abierta.",
      "Las licitaciones que le quedan desiertas son una señal fuerte: significa que su necesidad no está siendo cubierta por el mercado actual.",
    ],
    error:
      "Tratar a todos los organismos igual. Las bases, los plazos y hasta el nivel de exigencia documental cambian mucho entre uno y otro, y la costumbre de cada uno se aprende mirando lo que ya compró.",
    cierre: {
      texto:
        "Puedes revisar cualquier organismo antes de postularle: en qué gasta, con quién trabaja y qué tan seguido deja licitaciones desiertas.",
      boton: "Mirar un organismo",
    },
    vecinos: ["unidad-de-compra", "proveedor-del-estado", "compras-publicas"],
  },

  {
    slug: "unidad-de-compra",
    termino: "Unidad de compra",
    familia: "Quién es quién",
    definicion:
      "Es cada oficina con autorización propia para comprar dentro de un organismo. Por eso un mismo ministerio aparece en Mercado Público con decenas de códigos distintos.",
    cuerpo: [
      "Un ministerio no compra desde un solo escritorio. Cada dirección regional, cada servicio dependiente, cada establecimiento tiene su unidad de compra con su propio código, su propio presupuesto y sus propias personas decidiendo.",
      "El caso más claro es salud: un servicio de salud regional puede tener una unidad por hospital, más la del servicio central. Cada una publica por su cuenta y no necesariamente compran lo mismo ni de la misma forma.",
      "El código de la unidad es el primer bloque del ID de una licitación. En `1234-56-LE26`, ese `1234` identifica la unidad que publicó.",
      "Esto explica algo que confunde a quien empieza: haber vendido a «la municipalidad» no significa tener relación con todas sus unidades, y ganar en un hospital no abre puertas automáticas en el hospital de al lado.",
    ],
    paraTi: [
      "Tu cliente real es la unidad, no la institución. Es ahí donde se decide, y es ahí donde el historial cuenta.",
      "Si vendes a nivel nacional, mapear las unidades de tu rubro es más útil que mirar organismos: son más, son más chicas y compran más seguido.",
      "Una unidad que te compró una vez es la más probable segunda venta que tienes. Vale más seguirla a ella que buscar clientes nuevos.",
    ],
    error:
      "Contar «un cliente» cuando en realidad son unidades separadas del mismo organismo — o al revés, no volver a ofrecerle a una unidad porque «ya le vendimos a ese ministerio».",
    cierre: {
      texto:
        "Puedes seguir a las unidades que te compran y enterarte cuando publican algo nuevo de tu rubro.",
      boton: "Seguir a mis compradores",
    },
    vecinos: ["id-de-licitacion", "organismo-comprador", "tipos-de-licitacion-l1-le-lp"],
  },

  {
    slug: "acreditacion",
    termino: "Acreditación",
    familia: "Quién es quién",
    definicion:
      "Es tener los documentos legales, tributarios y financieros cargados y vigentes en ChileProveedores. Muchas licitaciones la exigen para poder adjudicar, aunque no para ofertar.",
    cuerpo: [
      "El registro tiene estados. Estar inscrito es una cosa; estar hábil o acreditado es otra: significa que tus documentos están arriba, vigentes y validados. Es lo que permite al organismo verificar tus antecedentes sin pedírtelos.",
      "Los documentos vencen. Certificados de vigencia de la sociedad, antecedentes financieros, poderes del representante legal: todos tienen fecha, y cuando uno vence el estado cambia sin que nadie te avise en el momento justo.",
      "Ahí está el riesgo real: puedes ganar una licitación y perderla porque al momento de adjudicar tu registro no estaba hábil. No es un tecnicismo — pasa, y el organismo tiene que readjudicar al segundo.",
      "Las bases dicen cuándo se exige. Algunas piden estar hábil al ofertar, otras sólo al adjudicar. La diferencia importa: si lo piden al ofertar y no lo tienes, ni siquiera puedes participar.",
    ],
    paraTi: [
      "Revisa el estado antes de cada postulación importante, no una vez al año. Un certificado vencido la semana pasada cuesta el negocio completo.",
      "Si estás partiendo, no la necesitas: la Compra Ágil y muchas licitaciones chicas piden sólo estar inscrito, que es gratis.",
      "Cuando ya persigues procesos que la exigen, ponle recordatorio a los vencimientos. Es de los costos más tontos que existen: perder por papeles, no por precio.",
    ],
    error:
      "Acreditarse y darlo por resuelto. Es un estado que se mantiene, no un trámite que se hace una vez.",
    cierre: {
      texto:
        "Puedes ver de antemano qué licitaciones exigen acreditación y cuáles no, y decidir si te conviene pagarla.",
      boton: "Ver qué exigen",
    },
    vecinos: ["chileproveedores", "proveedor-del-estado", "declaracion-jurada"],
  },

  {
    slug: "plan-anual-de-compras",
    termino: "Plan Anual de Compras",
    nombreLargo: "PAC",
    familia: "El proceso",
    definicion:
      "Es el documento donde cada organismo público declara, a comienzos de año, qué piensa comprar, cuánto y en qué mes. Se publica en Mercado Público y cualquiera puede consultarlo.",
    cuerpo: [
      "La ley obliga a los organismos a planificar sus compras y a publicar ese plan. La idea era transparencia, pero para un proveedor es otra cosa: es la lista de lo que se va a licitar antes de que se licite.",
      "Cada línea del plan trae el rubro, un monto estimado y el mes en que se espera comprar. No es un compromiso —los planes se modifican durante el año— pero indica la intención y el orden de magnitud.",
      "Es información pública y gratuita, y aun así casi nadie la usa. La mayoría de los proveedores se entera de una licitación el día que se publica, cuando ya hay que correr; el plan permite saberlo meses antes.",
      "Se puede contrastar con lo que el organismo lleva ejecutado. Si declaró comprar en marzo y estamos en julio sin que haya salido, esa compra está pendiente y probablemente salga pronto.",
    ],
    paraTi: [
      "Es lo más cerca que vas a estar de ver el futuro. Si tu rubro aparece en el plan de un organismo, sabes que va a comprar y aproximadamente cuándo.",
      "Sirve para preparar con tiempo: sacar la garantía sin apuro, tener los papeles al día, cotizar con tus proveedores antes de que corra el reloj.",
      "También sirve para decidir a quién perseguir. Un organismo cuyo plan tiene tu rubro con monto alto vale más que diez que no lo mencionan.",
    ],
    error:
      "Tomarlo como una promesa. Los planes se modifican, se atrasan y a veces la compra no se hace. Es una señal de intención, no un contrato.",
    cierre: {
      texto:
        "El plan de compras de todo el país se puede revisar por rubro: qué declaró comprar cada institución y cuánto lleva ejecutado.",
      boton: "Ver el plan de compras",
    },
    vecinos: ["organismo-comprador", "compras-publicas", "que-es-una-licitacion-publica"],
  },

  {
    slug: "unspsc",
    termino: "UNSPSC",
    nombreLargo: "Código de producto",
    familia: "El proceso",
    definicion:
      "Es el código internacional con que se clasifica cada producto y servicio en Mercado Público. Aparece en las fichas de licitación y define, en la práctica, qué avisos te llegan y cuáles no.",
    cuerpo: [
      "Es un estándar mundial de clasificación, con una estructura de cuatro niveles que va de lo general a lo específico: segmento, familia, clase y producto. Chile lo adoptó para que las compras públicas sean comparables y clasificables.",
      "Cada ítem de una licitación lleva su código. Eso permite que el sistema —y cualquiera que lo consulte— sepa que dos compras de organismos distintos son del mismo producto aunque estén descritas con palabras diferentes.",
      "Acá está la parte que afecta directamente a un proveedor: los rubros que declaras en tu perfil se traducen a estos códigos, y de ahí sale lo que te llega. Un rubro mal elegido significa no enterarse de licitaciones que sí te calzaban.",
      "El problema práctico es que la clasificación no siempre calza con cómo la gente nombra las cosas. Un mismo producto puede estar en códigos distintos según quién lo cargó, y hay categorías amplias que agrupan cosas que no se parecen en nada.",
    ],
    paraTi: [
      "Revisa qué códigos tienes declarados. Es la causa número uno de «no me llega nada» o «me llega todo lo que no vendo».",
      "No basta con un código. La mayoría de las empresas vende cosas que caen en varios, y quedarse con uno solo deja fuera una parte del mercado.",
      "Si buscas oportunidades a mano en el portal, buscar por código encuentra cosas que la búsqueda por palabras se pierde — y al revés.",
    ],
    error:
      "Elegir el código más general pensando que así llega más. Llega más ruido, no más oportunidades, y el ruido termina haciendo que dejes de mirar los avisos.",
    cierre: {
      texto:
        "Con tu RUT deducimos tus productos y sus códigos solos, a partir de lo que ya le has vendido al Estado.",
      boton: "Ver mi perfil",
    },
    vecinos: ["rubro", "bases-tecnicas", "proveedor-del-estado"],
  },

  {
    slug: "bases-tipo",
    termino: "Bases tipo",
    familia: "Documentos",
    definicion:
      "Son bases ya aprobadas por Contraloría que los organismos pueden usar tal cual para comprar cosas frecuentes, sin tener que redactarlas ni mandarlas a revisar cada vez.",
    cuerpo: [
      "Redactar bases desde cero es lento y cada juego nuevo puede tener que pasar por toma de razón en Contraloría. Para las compras que se repiten en todo el Estado —aseo, alimentación, vigilancia, suministros de oficina— se aprobaron plantillas listas.",
      "Cuando un organismo las usa, el proceso se acelera mucho: no hay redacción propia ni revisión previa, y la licitación sale antes.",
      "Para el proveedor tienen una ventaja enorme que casi nadie aprovecha: son siempre iguales. Los requisitos, los anexos, la forma de evaluar y los plazos no cambian entre un organismo y otro.",
      "Eso significa que la primera vez que preparas una oferta contra bases tipo haces el trabajo completo; de ahí en adelante, reutilizas. Y el organismo puede agregar anexos específicos, pero el cuerpo se mantiene.",
    ],
    paraTi: [
      "Si tu rubro tiene bases tipo, arma tu carpeta una vez y bien. Cada licitación siguiente te va a costar una fracción del tiempo.",
      "Revisa igual los anexos propios del organismo. Es ahí donde meten lo específico, y es lo único que cambia entre un proceso y otro.",
      "Como el formato es conocido, la competencia también lo tiene resuelto. La diferencia se juega en precio y en los criterios que suman puntos, no en armar bien los papeles.",
    ],
    error:
      "Asumir que por ser tipo son idénticas y no leerlas. Se actualizan, y hay versiones distintas según el año y el rubro.",
    cierre: {
      texto:
        "Lici te dice si una licitación usa bases tipo y qué anexos propios agregó el organismo, sin que tengas que leerlas de nuevo.",
      boton: "Revisar una licitación",
    },
    vecinos: ["bases-administrativas", "anexos", "bases-tecnicas"],
  },

  {
    slug: "anexos",
    termino: "Anexos",
    familia: "Documentos",
    definicion:
      "Son los formularios que el organismo adjunta a las bases y que hay que llenar, firmar y subir junto con la oferta. Un anexo mal llenado o faltante deja la oferta fuera.",
    cuerpo: [
      "Las bases dicen qué se pide; los anexos son donde tú lo respondes. Suelen incluir la identificación del oferente, la declaración jurada de inhabilidades, el detalle de la experiencia, la oferta económica en su formato y a veces certificados específicos del rubro.",
      "Vienen numerados —Anexo 1, Anexo 2, y así— y las bases dicen cuáles son obligatorios y cuáles opcionales. Los opcionales normalmente suman puntaje: no llenarlos no descalifica, pero regala puntos.",
      "El formato importa. Muchas bases exigen usar el formulario exacto que entregó el organismo; presentar la misma información en un documento propio se puede rechazar por forma aunque el contenido sea correcto.",
      "Y hay que revisar quién firma. Normalmente el representante legal según la escritura vigente, y a veces con firma electrónica avanzada. Un anexo firmado por quien no correspondía es un anexo inválido.",
    ],
    paraTi: [
      "Es la causa más frecuente y más evitable de quedar fuera. No se pierde por precio ni por técnica: se pierde por un formulario.",
      "Haz la lista de anexos antes de empezar a cotizar. Si alguno pide algo que no tienes —una certificación, un balance auditado— mejor saberlo el primer día.",
      "Los opcionales que suman puntaje son la forma más barata de subir. Muchos competidores los dejan en blanco por apuro.",
    ],
    error:
      "Dejar los anexos para el final. Se llenan rápido sólo si todo está a mano; si falta una firma o un certificado, ya no hay tiempo.",
    cierre: {
      texto:
        "Lici lee las bases y te lista los anexos que piden, cuáles son obligatorios y cuáles suman puntos.",
      boton: "Ver qué anexos piden",
    },
    vecinos: ["bases-administrativas", "declaracion-jurada", "bases-tipo"],
  },

  {
    slug: "oferta-tecnica",
    termino: "Oferta técnica",
    familia: "Documentos",
    definicion:
      "Es la parte de tu propuesta que describe qué vas a entregar y cómo: características del producto o servicio, plazos, equipo, metodología y todo lo que las bases técnicas pidan demostrar.",
    cuerpo: [
      "Se evalúa aparte de la económica y muchas veces antes. En procesos grandes hay apertura técnica primero: si tu oferta técnica no pasa, la económica ni se abre — nadie llega a mirar tu precio.",
      "Lo primero que se revisa es la admisibilidad: si cumples las especificaciones excluyentes. Ahí no hay puntaje parcial, es sí o no. Recién después se puntúa el resto.",
      "Lo que suma varía según el rubro: experiencia comprobable en trabajos similares, plazo de entrega más corto que el máximo, certificaciones, composición del equipo, o una metodología mejor explicada.",
      "Y hay una regla que sorprende a quien viene del mundo privado: lo que no está escrito no existe. Si tienes diez años de experiencia pero no adjuntaste los certificados que las bases piden como respaldo, para la evaluación esa experiencia no cuenta.",
    ],
    paraTi: [
      "Documenta todo lo que afirmes, en el formato que pidan. La comisión evalúa papeles, no confianza.",
      "Si hay especificaciones excluyentes que no cumples, es mejor no postular: perder tiempo armando una oferta inadmisible cuesta más que dejarla pasar.",
      "Ofrecer más de lo pedido no siempre suma. Si el criterio no premia esa mejora, es margen regalado.",
    ],
    error:
      "Escribirla pensando en convencer, como una propuesta comercial. La comisión no evalúa persuasión: revisa si cumples cada punto que las bases enumeran.",
    cierre: {
      texto:
        "Lici te dice qué exige la oferta técnica de una licitación y qué documentos hay que adjuntar para respaldarla.",
      boton: "Ver qué exigen",
    },
    vecinos: ["bases-tecnicas", "oferta-economica", "criterios-de-evaluacion"],
  },

  {
    slug: "oferta-economica",
    termino: "Oferta económica",
    familia: "Documentos",
    definicion:
      "Es el precio que ofreces, presentado en el formato que exijan las bases. Se evalúa con una fórmula publicada de antemano y casi nunca decide sola: pesa junto a los otros criterios.",
    cuerpo: [
      "El primer punto que confunde es si el precio va neto o con IVA. Las bases lo dicen, y equivocarse cambia tu oferta en un 19%: puedes quedar fuera por caro o ganar con un precio que no te da el margen que calculaste.",
      "También hay que revisar qué incluye. Despacho, instalación, capacitación, garantía extendida: si las bases lo piden y tú no lo incluiste, ese costo lo vas a poner igual, sólo que de tu bolsillo.",
      "La fórmula de evaluación importa tanto como el número. No es lo mismo que el puntaje se reparta en proporción al precio que se calcule dividiendo el menor precio ofertado entre el tuyo — en la segunda, bajar mucho da menos ventaja de la que uno cree.",
      "Y existe el precio demasiado bajo. Muchas bases permiten al organismo pedir explicaciones o rechazar una oferta que parece inviable, porque un proveedor que no puede cumplir a ese precio es un problema para el contrato.",
    ],
    paraTi: [
      "Antes de fijar el precio, lee la fórmula. Si el precio pesa 40%, bajarlo agresivamente sacrifica margen a cambio de pocos puntos.",
      "Mete el costo de postular en el precio: garantías, tiempo de preparación y los procesos que no vas a ganar. Si ganas uno de cada cinco, ese es el costo real de cada venta.",
      "Mira a qué precio se adjudicó lo mismo antes. Es información pública y es la mejor referencia que existe para no ofertar a ciegas.",
    ],
    error:
      "Cotizar como al sector privado, dejando espacio para negociar. Acá no hay negociación posterior: el precio que pones es el que se evalúa y con el que quedas.",
    cierre: {
      texto:
        "Puedes ver a qué precio se adjudicó antes lo mismo que vas a ofertar, con su rango real, antes de decidir el tuyo.",
      boton: "Ver el precio real",
    },
    vecinos: ["oferta-tecnica", "criterios-de-evaluacion", "adjudicacion"],
  },

  {
    slug: "certificado-de-inscripcion",
    termino: "Certificado de inscripción",
    familia: "Documentos",
    definicion:
      "Es el documento que emite ChileProveedores acreditando que estás inscrito y en qué estado. Varias licitaciones lo piden como respaldo, y algunas lo exigen vigente al momento de adjudicar.",
    cuerpo: [
      "Se descarga desde la plataforma y muestra tu identificación, tu estado en el registro y los rubros en que estás inscrito. Sirve para que el organismo verifique tus antecedentes sin pedírtelos uno por uno.",
      "Tiene fecha de emisión, y ahí está lo importante: muchas bases exigen que sea reciente —treinta o sesenta días— así que uno de hace medio año se puede rechazar aunque tu registro esté al día.",
      "No es lo mismo que estar hábil. El certificado dice cuál es tu estado; si ese estado es «no hábil» porque un documento venció, el certificado lo va a mostrar tal cual.",
      "En procesos chicos y en Compra Ágil normalmente no se pide. Aparece en licitaciones donde el organismo quiere respaldo formal antes de adjudicar.",
    ],
    paraTi: [
      "Descárgalo el mismo día que armas la oferta, no antes. Así la fecha de emisión siempre queda dentro del plazo que exijan.",
      "Revisa que los rubros que aparecen incluyan el de la licitación. Si no está, el organismo puede cuestionar que estés inscrito para eso.",
      "Si sale «no hábil», ahí tienes el aviso: hay un documento vencido que hay que renovar antes de seguir.",
    ],
    error:
      "Guardar uno y reutilizarlo en varias licitaciones durante meses. La fecha de emisión lo delata y las bases suelen exigir que sea reciente.",
    cierre: {
      texto:
        "Puedes ver de antemano qué licitaciones exigen certificado y con qué antigüedad, antes de comprometerte a postular.",
      boton: "Ver qué exigen",
    },
    vecinos: ["chileproveedores", "acreditacion", "anexos"],
  },

  {
    slug: "foro-de-aclaraciones",
    termino: "Foro de aclaraciones",
    familia: "El proceso",
    definicion:
      "Es la instancia formal donde los proveedores hacen preguntas sobre una licitación y el organismo responde por escrito. Las respuestas son públicas y pasan a formar parte de las bases.",
    cuerpo: [
      "Tiene un plazo acotado que las bases fijan: unos días desde la publicación para preguntar, y otros para que el organismo responda. Pasado eso, se cierra y ya no se admiten consultas.",
      "Lo que se responde ahí tiene peso legal. Si el organismo aclara que una especificación se puede cumplir de otra forma, esa aclaración manda igual que las bases originales — y aplica para todos.",
      "Todas las preguntas y respuestas son públicas, sin identificar quién preguntó. Eso significa dos cosas: que puedes leer lo que preguntaron los demás, y que lo que tú preguntes lo van a leer ellos.",
      "Es la única vía formal. Llamar por teléfono al organismo no sirve: lo que no está en el foro no obliga a nadie y no se puede invocar después.",
    ],
    paraTi: [
      "Léelo aunque no vayas a preguntar. Las respuestas suelen aclarar exactamente lo que a ti también te daba dudas, y a veces revelan que un requisito era más flexible de lo que parecía.",
      "Si una especificación parece hecha a la medida de un proveedor —una marca sin «o equivalente», una certificación rarísima— el foro es donde se cuestiona. A veces el organismo corrige.",
      "Cuidado con lo que preguntas. Una pregunta muy específica le muestra a la competencia por dónde vas.",
    ],
    error:
      "Dejarlo pasar por apuro. Es gratis, toma minutos, y es la única oportunidad de que el organismo aclare por escrito algo que después puede costarte la oferta.",
    cierre: {
      texto:
        "Te avisamos cuando se abre y cuando se cierra el foro de una licitación que estás siguiendo, para que no se te pase el plazo.",
      boton: "Que me avisen",
    },
    vecinos: ["bases-administrativas", "publicacion", "apertura-de-ofertas"],
  },

  {
    slug: "apertura-de-ofertas",
    termino: "Apertura de ofertas",
    familia: "El proceso",
    definicion:
      "Es el momento en que se abren las ofertas recibidas y se hace visible quién participó. En procesos grandes hay dos: primero la técnica y después, sólo para quienes pasaron, la económica.",
    cuerpo: [
      "Es un acto electrónico en la plataforma, a la hora exacta que dicen las bases. No hay prórroga ni tolerancia: una oferta subida un minuto después no entra, aunque el sistema estuviera lento.",
      "En la apertura técnica se revisa la admisibilidad —si cumples los requisitos y presentaste todo— y ahí queda visible la lista de oferentes. Es el primer momento en que sabes contra quiénes estás compitiendo.",
      "La apertura económica viene después y sólo incluye a los que pasaron la técnica. Ahí se hacen públicos los precios de todos.",
      "En procesos chicos las dos aperturas ocurren juntas. Y todo queda en un acta pública que cualquiera puede consultar, incluidas las observaciones de por qué alguna oferta quedó inadmisible.",
    ],
    paraTi: [
      "Sube tu oferta con horas de anticipación, no minutos. La plataforma se pone lenta cerca del cierre de procesos grandes, y esa es una excusa que no existe.",
      "Después de la apertura, mira el acta aunque hayas perdido: ver quién ofertó y por cuánto es información que no se paga en ninguna parte.",
      "Si una oferta quedó inadmisible, el acta dice por qué. Esas razones son la mejor lista de errores a no repetir.",
    ],
    error:
      "Calcular el plazo hasta la hora de cierre. Hay que calcularlo hasta unas horas antes: subir documentos pesados toma tiempo y no se puede correr la hora.",
    cierre: {
      texto:
        "Los cierres y las aperturas de las licitaciones que sigues quedan en un calendario, con aviso antes de que corra el plazo.",
      boton: "Ver el calendario",
    },
    vecinos: ["foro-de-aclaraciones", "evaluacion-de-ofertas", "adjudicacion"],
  },

  {
    slug: "evaluacion-de-ofertas",
    termino: "Evaluación de ofertas",
    familia: "El proceso",
    definicion:
      "Es la etapa en que la comisión revisa las ofertas admisibles y les asigna puntaje según los criterios publicados en las bases. De ahí sale el orden que define quién gana.",
    cuerpo: [
      "Se hace en dos pasos. Primero admisibilidad: quién cumple los requisitos formales y las especificaciones excluyentes. Las ofertas que no pasan quedan fuera y ya no se evalúan.",
      "Después el puntaje. Cada criterio tiene su peso y su forma de calcularse, y todo eso estaba publicado antes de recibir ofertas. La comisión no puede inventar criterios nuevos ni cambiar los pesos.",
      "El resultado queda en un informe de evaluación con el detalle de cada oferente en cada criterio. Ese cuadro se publica junto con la adjudicación y es información pública.",
      "Durante la evaluación el organismo puede pedir aclaraciones o documentos que faltaban, siempre que no alteren la oferta. Se puede completar un certificado; no se puede cambiar el precio.",
    ],
    paraTi: [
      "El cuadro comparativo es gratis y es la mejor escuela que hay. Cuando pierdas, léelo: te dice si fue por precio, por un criterio en blanco o por algo que no podías cumplir.",
      "Si te piden una aclaración, responde rápido y exactamente lo que preguntan. Es una oportunidad de arreglar algo, no de mejorar la oferta.",
      "Perder por poco margen en un criterio que sí podías cumplir es la señal más clara de dónde mejorar para la próxima.",
    ],
    error:
      "No revisar el resultado cuando pierdes. Ahí está escrito exactamente por qué, y es la única forma de que la siguiente oferta sea mejor.",
    cierre: {
      texto:
        "Puedes ver contra quién competiste, por cuánto ganó el adjudicado y qué diferencia hubo con tu oferta.",
      boton: "Ver el resultado",
    },
    vecinos: ["criterios-de-evaluacion", "comision-evaluadora", "adjudicacion"],
  },

  {
    slug: "comision-evaluadora",
    termino: "Comisión evaluadora",
    familia: "El proceso",
    definicion:
      "Es el grupo de funcionarios que evalúa las ofertas y propone a quién adjudicar. Sus integrantes se designan antes de abrir las ofertas y sus decisiones quedan en un acta pública.",
    cuerpo: [
      "Se conforma para dar garantías: que no sea una sola persona la que decide, y que quede constancia escrita de cómo se llegó al resultado. En procesos grandes suele ser obligatoria.",
      "Sus integrantes se designan antes de conocer las ofertas, justamente para que la designación no dependa de quién se presentó.",
      "Tienen obligaciones de probidad: si alguien tiene conflicto de interés con un oferente —parentesco, relación comercial, participación en la empresa— debe inhabilitarse. La Ley 21.634 reforzó bastante este punto.",
      "Su decisión es una propuesta, no la adjudicación misma. La autoridad del organismo es la que adjudica formalmente, normalmente siguiendo la recomendación.",
    ],
    paraTi: [
      "Que exista comisión te conviene: significa que hay un acta escrita explicando por qué ganó quien ganó, y eso lo puedes leer.",
      "Si crees que hubo un conflicto de interés, hay vía formal para reclamar. No es habitual, pero existe y tiene plazos cortos.",
      "El acta también muestra el criterio con que interpretaron las bases, y eso sirve para futuras licitaciones del mismo organismo.",
    ],
    error:
      "Suponer que la evaluación la hace una persona a la que se puede convencer. Es un grupo, con acta, evaluando contra una pauta escrita antes de que existieran las ofertas.",
    cierre: {
      texto:
        "Puedes revisar cómo evalúa cada organismo mirando sus procesos anteriores: qué pesó, qué observaciones hicieron y a quién adjudicaron.",
      boton: "Mirar un organismo",
    },
    vecinos: ["evaluacion-de-ofertas", "criterios-de-evaluacion", "ley-21634"],
  },

  {
    slug: "publicacion",
    termino: "Publicación",
    familia: "El proceso",
    definicion:
      "Es el momento en que la licitación aparece en Mercado Público y empieza a correr el plazo para ofertar. Desde ahí las bases son públicas y cualquiera puede participar.",
    cuerpo: [
      "El plazo mínimo depende del tramo. En una L1 pueden ser cinco días corridos; desde LE hacia arriba, diez o más; en los tramos grandes, veinte o treinta. Ese mínimo es legal: el organismo puede dar más tiempo, nunca menos.",
      "Ese plazo es el tiempo real que tienes para todo: leer las bases, hacer preguntas en el foro, cotizar con tus proveedores, sacar la garantía si corresponde, llenar los anexos y subir la oferta.",
      "El organismo puede modificar las bases después de publicar, y cuando lo hace suele ampliar el plazo. Esas modificaciones se publican y hay que revisarlas: cambian las reglas del proceso en curso.",
      "También puede haber prórrogas, sobre todo si en el foro aparecieron dudas que obligan a aclarar algo importante.",
    ],
    paraTi: [
      "Enterarse el día uno o el día siete cambia todo. Con diez días de plazo, llegar al quinto significa la mitad del tiempo para hacer lo mismo.",
      "Revisa si hubo modificaciones antes de subir tu oferta. Preparar contra una versión antigua de las bases es un error caro y silencioso.",
      "Cuenta hacia atrás desde el cierre: si necesitas garantía, resta una semana; si necesitas cotizar con un proveedor, resta lo que él tarde.",
    ],
    error:
      "Empezar a trabajar la oferta cuando quedan dos días. La mayoría de las cosas que hacen falta —garantías, certificados, cotizaciones— dependen de terceros que no corren a tu ritmo.",
    cierre: {
      texto:
        "Te avisamos el mismo día que se publica algo que calza contigo, no cuando ya quedan dos días.",
      boton: "Que me avisen a tiempo",
    },
    vecinos: ["licitacion-revocada", "foro-de-aclaraciones", "apertura-de-ofertas"],
  },

  {
    slug: "readjudicacion",
    termino: "Readjudicación",
    familia: "El proceso",
    definicion:
      "Es cuando el organismo deja sin efecto la adjudicación y se la da al oferente que quedó en segundo lugar, normalmente porque el ganador no cumplió los pasos posteriores.",
    cuerpo: [
      "Ganar no es el final. Después hay que entregar la garantía de fiel cumplimiento, firmar el contrato cuando corresponde y aceptar la orden de compra. Si el adjudicado no hace alguno de esos pasos en plazo, el organismo puede dejar sin efecto la adjudicación.",
      "También ocurre si el ganador se desiste, si se descubre que estaba inhábil, o si no puede cumplir lo que ofertó.",
      "En esos casos las bases suelen permitir readjudicar al siguiente en el orden de evaluación, sin repetir el proceso. Se hace por resolución fundada y se publica igual que la adjudicación original.",
      "Para el que se desiste hay costo: pierde la garantía de seriedad, y el incumplimiento queda registrado en su historial.",
    ],
    paraTi: [
      "Quedar segundo no es perder del todo. La readjudicación pasa más seguido de lo que la gente cree, sobre todo cuando el ganador ofertó demasiado barato.",
      "No cierres el caso ni liberes el stock apenas se publica la adjudicación. Vale la pena esperar a que el ganador acepte la orden de compra.",
      "Y si el que gana eres tú, cumple los plazos posteriores con la misma seriedad que la oferta: perder ahí cuesta la garantía y el historial.",
    ],
    error:
      "Olvidarse de una licitación apenas se adjudica a otro. Si quedaste segundo, sigue publicada la posibilidad de que te llegue a ti.",
    cierre: {
      texto:
        "Las licitaciones que sigues quedan en tu tablero con su estado, así que si algo cambia después de la adjudicación te enteras.",
      boton: "Ver cómo se siguen",
    },
    vecinos: ["adjudicacion", "garantia-de-fiel-cumplimiento", "licitacion-desierta"],
  },

  {
    slug: "licitacion-revocada",
    termino: "Licitación revocada",
    familia: "El proceso",
    definicion:
      "Es cuando el organismo deja sin efecto una licitación en curso por decisión propia, antes de adjudicar. Es distinto de declararla desierta, que ocurre por falta de ofertas admisibles.",
    cuerpo: [
      "Las razones son del organismo, no del mercado: se le acabó el presupuesto, cambió la necesidad, detectó un error en las bases, o una instrucción superior le cambió la prioridad.",
      "Se hace por resolución fundada y se publica. Puede ocurrir antes o después del cierre de ofertas, pero siempre antes de adjudicar.",
      "La diferencia con desierta importa. Desierta significa que el proceso llegó hasta el final y no hubo oferta adjudicable; revocada significa que el organismo lo detuvo. Y hay una consecuencia práctica: quedar desierta habilita causales de trato directo, revocarla no.",
      "Si ya habías entregado garantía de seriedad, se devuelve.",
    ],
    paraTi: [
      "Es frustrante porque el trabajo ya está hecho, pero la oferta no se pierde: si el organismo republica —y suele hacerlo cuando fue por un error de bases— llegas con todo listo.",
      "Cuando se revoca por error en las bases, la republicación suele venir corregida. Vale la pena leer qué cambió: ahí está lo que el mercado le hizo notar.",
      "Pide la devolución de la garantía. No siempre vuelve sola.",
    ],
    error:
      "Confundirla con desierta. Son cosas distintas, con causas distintas y con consecuencias distintas para lo que viene después.",
    cierre: {
      texto:
        "Te avisamos si una licitación que estabas trabajando se revoca o se republica, sin que tengas que revisar el portal.",
      boton: "Que me avisen",
    },
    vecinos: ["licitacion-desierta", "publicacion", "adjudicacion"],
  },

  {
    slug: "multas-y-sanciones",
    termino: "Multas y sanciones",
    familia: "El proceso",
    definicion:
      "Son las consecuencias de incumplir un contrato público: descuentos sobre lo facturado, cobro de la garantía, término anticipado y, en los casos graves, quedar inhabilitado para contratar con el Estado.",
    cuerpo: [
      "Las multas están en las bases y suelen ser por atraso: un porcentaje del valor por cada día hábil de retraso, con un tope. También las hay por entregar algo distinto a lo ofertado o por incumplir condiciones del servicio.",
      "Se descuentan de lo que te van a pagar, o se cobran de la garantía de fiel cumplimiento si el descuento no alcanza.",
      "En incumplimientos graves el organismo puede terminar el contrato anticipadamente, cobrar la garantía completa y dejar constancia en el registro. Esa constancia es pública.",
      "Y ahí está el costo mayor, que no es el dinero: un historial con incumplimientos pesa en las evaluaciones futuras de todos los organismos, no sólo del que te sancionó.",
    ],
    paraTi: [
      "Antes de ofertar, lee las multas y calcula el peor escenario. Un plazo apretado con multa diaria alta puede convertir un buen negocio en pérdida.",
      "Si vas a atrasarte, avisa antes y por escrito. Muchas bases permiten justificar atrasos por causas no imputables, pero sólo si se informan a tiempo.",
      "El historial vale más que cualquier contrato individual. Cumplir un contrato chico bien vale más que ganar uno grande y quedar mal.",
    ],
    error:
      "Comprometer plazos optimistas para ganar puntaje. El plazo ofertado es exigible, y las multas se calculan sobre él, no sobre lo que era razonable.",
    cierre: {
      texto:
        "Lici te dice qué multas contempla una licitación y sobre qué se calculan, antes de que comprometas un plazo.",
      boton: "Revisar antes de ofertar",
    },
    vecinos: ["bases-administrativas", "garantia-de-fiel-cumplimiento", "orden-de-compra"],
  },

  {
    slug: "gran-compra",
    termino: "Gran compra",
    familia: "Tipos de proceso",
    definicion:
      "Es la mini-licitación que se hace dentro del convenio marco cuando el monto supera cierto tope: en vez de comprar directo del catálogo, el organismo invita a competir a los proveedores que ya están adentro.",
    cuerpo: [
      "El convenio marco funciona como catálogo: el organismo elige y compra. Pero cuando el monto es alto, dejarlo a elección libre sería demasiada discrecionalidad, así que la ley obliga a competir.",
      "El organismo publica su requerimiento dentro del convenio y los proveedores del catálogo presentan su oferta. Se evalúa con criterios publicados y se adjudica al mejor puntaje.",
      "Es más rápido que una licitación pública normal —no hay que hacer todo el proceso desde cero— pero más exigente que comprar del catálogo.",
      "Sólo pueden participar los que ya están en el convenio marco de ese rubro. Es una competencia cerrada al grupo que ganó su cupo en su momento.",
    ],
    paraTi: [
      "Si estás en el convenio marco, las grandes compras son de los negocios más interesantes que hay: montos altos y competencia limitada a los del catálogo.",
      "Hay que estar atento, porque se publican dentro del convenio y no aparecen mezcladas con las licitaciones normales. Muchos proveedores del catálogo se las pierden por no mirar ahí.",
      "El precio del catálogo es tu punto de partida, pero en una gran compra puedes mejorarlo. Ahí es donde se define.",
    ],
    error:
      "Estar en el convenio marco y no revisar las grandes compras. Es plata que se reparte entre pocos y se pierde por no mirar el lugar correcto.",
    cierre: {
      texto:
        "Las grandes compras del convenio marco llegan junto con las licitaciones y las Compras Ágiles, en un solo lugar.",
      boton: "Ver todos los canales",
    },
    vecinos: ["convenio-marco", "compra-agil", "tipos-de-licitacion-l1-le-lp"],
  },

  {
    slug: "subasta-inversa-electronica",
    termino: "Subasta inversa electrónica",
    familia: "Tipos de proceso",
    definicion:
      "Es un procedimiento de la Ley 21.634 donde los proveedores compiten bajando el precio en vivo, en una sesión con hora de inicio y de término, y gana el precio más bajo al cerrar.",
    cuerpo: [
      "Al revés de una subasta común, acá no sube: baja. El organismo define qué compra y con qué especificaciones, y los proveedores van mejorando su oferta durante la sesión, viendo si están arriba o abajo.",
      "Sirve para productos estandarizados donde lo único que diferencia es el precio: insumos, materiales, equipamiento común. No sirve para servicios complejos, donde la calidad de la propuesta importa.",
      "Antes de la subasta hay una etapa de admisibilidad: el organismo verifica que cumples las especificaciones. Sólo los admisibles participan en la puja.",
      "Es una de las figuras que trajo la reforma de 2025, así que todavía se usa poco y muchos proveedores no saben que existe.",
    ],
    paraTi: [
      "Antes de entrar, define tu piso y no lo cruces. En vivo y viendo que te pasan, la tentación de bajar «un poquito más» es enorme, y ahí se pierde el margen.",
      "Conocer el precio histórico del producto es la mejor preparación posible: te dice hasta dónde puede llegar la puja antes de dejar de tener sentido para todos.",
      "Como es un procedimiento nuevo, hay menos competencia preparada. Eso es una ventaja mientras dure.",
    ],
    error:
      "Entrar sin haber calculado el costo real. En una subasta el precio se define en minutos, y no hay tiempo de rehacer los números mientras corre.",
    cierre: {
      texto:
        "Los procedimientos nuevos de la Ley 21.634 aparecen mezclados con todo lo demás en el portal. Puedes recibirlos identificados y aparte.",
      boton: "Ver cómo llegan",
    },
    vecinos: ["ley-21634", "dialogo-competitivo", "oferta-economica"],
  },

  {
    slug: "licitacion-privada",
    termino: "Licitación privada",
    familia: "Tipos de proceso",
    definicion:
      "Es una licitación en que el organismo invita a participar a proveedores determinados en vez de publicarla abierta. Sólo procede en los casos que la ley señala y hay que fundamentarla.",
    cuerpo: [
      "El nombre confunde: no tiene nada de privado en el sentido de secreto. Se publica igual en Mercado Público y el resultado es público; lo que cambia es que sólo pueden ofertar los invitados.",
      "Procede en situaciones acotadas: cuando una licitación pública quedó desierta, cuando hay pocos proveedores capaces de proveer lo que se necesita, o en las causales que el reglamento enumera.",
      "El organismo debe invitar a un mínimo de proveedores y justificar por escrito por qué usa esta vía y por qué eligió a esos. Esa resolución es pública.",
      "Se evalúa igual que una pública: con criterios definidos antes, comisión evaluadora cuando corresponde, y adjudicación fundada.",
    ],
    paraTi: [
      "Para que te inviten tienen que conocerte. Y te conocen por el historial: haberle vendido antes a ese organismo o tener antecedentes visibles en tu rubro.",
      "Si una licitación pública de tu rubro queda desierta, es probable que venga una privada. Ese es el momento de estar visible para ese organismo.",
      "El registro completo y al día en ChileProveedores también ayuda: es donde miran cuando arman la lista.",
    ],
    error:
      "Creer que las invitaciones se consiguen conversando. Se consiguen apareciendo en el historial del rubro y del organismo — o sea, habiendo participado antes aunque no ganaras.",
    cierre: {
      texto:
        "Puedes ver qué licitaciones de tu rubro quedaron desiertas, que es donde suele aparecer después una privada.",
      boton: "Ver las desiertas",
    },
    vecinos: ["licitacion-desierta", "trato-directo", "que-es-una-licitacion-publica"],
  },

  {
    slug: "poliza-de-seguro",
    termino: "Póliza de seguro de ejecución inmediata",
    familia: "Garantías",
    definicion:
      "Es una alternativa a la boleta bancaria: una aseguradora emite un documento que el organismo puede cobrar de inmediato si incumples. Sale más rápido que la boleta y no inmoviliza plata.",
    cuerpo: [
      "Cumple la misma función que la boleta —respaldar tu oferta o tu contrato— y las bases suelen aceptar cualquiera de las dos. La diferencia está en cómo se consigue y qué te cuesta.",
      "Con la boleta, el banco te pide respaldo y normalmente inmoviliza el monto completo si no tienes línea de crédito. Con la póliza pagas una prima —un porcentaje del monto garantizado— y no congelas capital.",
      "Los plazos también difieren. Una póliza puede salir en uno o dos días; una boleta, si es tu primera vez en ese banco, puede tomar una semana.",
      "El costo es distinto en naturaleza: la prima no se recupera nunca, mientras que la plata tomada de la boleta vuelve cuando se libera. Cuál conviene depende de cuánta liquidez tengas y de cuántas garantías necesites a la vez.",
    ],
    paraTi: [
      "Si no tienes línea bancaria, esta suele ser la vía. Muchas pymes trabajan sólo con pólizas justamente por eso.",
      "Si vas a postular a varias licitaciones al mismo tiempo, la póliza gana: cuatro boletas simultáneas inmovilizan mucho capital de trabajo.",
      "Revisa siempre qué formas acepta cada licitación. Algunas bases exigen boleta bancaria y punto.",
    ],
    error:
      "Comparar sólo el precio. La boleta parece más barata porque la plata vuelve, pero el costo real incluye no poder usarla durante meses.",
    cierre: {
      texto:
        "Lici lee las bases y te dice qué formas de garantía acepta cada licitación, por cuánto y hasta cuándo.",
      boton: "Ver qué aceptan",
    },
    vecinos: ["que-es-una-boleta-de-garantia", "certificado-de-fianza", "garantia-de-seriedad-de-la-oferta"],
  },

  {
    slug: "certificado-de-fianza",
    termino: "Certificado de fianza",
    familia: "Garantías",
    definicion:
      "Es una garantía emitida por una sociedad de garantía recíproca. Funciona como la boleta pero sin banco: la sociedad responde por ti, y tú pagas una comisión.",
    cuerpo: [
      "Las sociedades de garantía recíproca existen justamente para esto: dar respaldo financiero a empresas chicas que no tienen acceso fácil al crédito bancario.",
      "Para el organismo el efecto es el mismo que una boleta: si incumples, cobra el certificado y le pagan. Por eso las bases suelen aceptarlo entre las formas válidas.",
      "Para ti la diferencia es el acceso. No necesitas línea de crédito ni inmovilizar el monto: la sociedad evalúa tu empresa y, si te aprueba, emite. A cambio pagas una comisión que no se recupera.",
      "Suele ser la vía más accesible para quien está partiendo, y varias de estas sociedades tienen convenios con organismos públicos de fomento que abaratan el costo.",
    ],
    paraTi: [
      "Si el banco te dijo que no o te pidió inmovilizar plata que no tienes, esta es la puerta que queda.",
      "Vale la pena tener la relación abierta antes de necesitarla. La primera evaluación toma tiempo; las siguientes emisiones son rápidas.",
      "Compara la comisión contra el costo de tener el capital inmovilizado. Si postulas seguido, casi siempre conviene.",
    ],
    error:
      "Descubrir que existe el día que el banco te rechazó la boleta y quedan tres días para el cierre. La relación se abre antes, no durante.",
    cierre: {
      texto:
        "Lici te dice qué garantía te piden en cada licitación y con cuánta anticipación conviene empezar el trámite.",
      boton: "Ver qué piden",
    },
    vecinos: ["poliza-de-seguro", "que-es-una-boleta-de-garantia", "garantia-de-fiel-cumplimiento"],
  },

  {
    slug: "reglamento-ds-250",
    termino: "Reglamento DS 250",
    nombreLargo: "Decreto Supremo 250",
    familia: "Normativa",
    definicion:
      "Es el reglamento de la Ley 19.886: donde están los detalles operativos que la ley no dice. Plazos exactos por tramo, montos, reglas de garantías y procedimientos.",
    cuerpo: [
      "La ley fija los principios —licitar es la regla, el trato directo es excepción, todo se publica— y el reglamento dice cómo se aplican en la práctica.",
      "Ahí están las respuestas que uno de verdad necesita: cuántos días mínimos de publicación tiene cada tramo, desde qué monto se exige garantía, cómo se calcula, qué plazos corren después de adjudicar, qué causales de trato directo existen y qué hay que fundamentar en cada una.",
      "Es la norma que más se consulta y la que menos se nombra: cuando alguien discute un plazo en el foro de aclaraciones, casi siempre está discutiendo el reglamento.",
      "Con la Ley 21.634 quedó desfasado en varias partes, y el Decreto 661 lo actualizó para incorporar los procedimientos nuevos. Hoy hay que leerlos juntos.",
    ],
    paraTi: [
      "No hay que leerlo entero. Sirve saber que existe y en qué parte está lo tuyo: plazos por tramo y reglas de garantías es el 90% de lo que un proveedor consulta.",
      "Es tu respaldo cuando algo no calza. Si un organismo exige algo que el reglamento no contempla, ahí está el fundamento para consultarlo formalmente.",
      "Léelo junto con el Decreto 661. Guiarse sólo por el reglamento antiguo lleva a aplicar plazos que ya cambiaron.",
    ],
    error:
      "Buscar los plazos en la ley. La ley no los tiene: están en el reglamento, y por eso mucha gente concluye que «no está normado» cuando sí lo está.",
    cierre: {
      texto:
        "No necesitas seguir la normativa: cada licitación llega con sus plazos y exigencias ya leídos y en castellano.",
      boton: "Que Lici lo lea",
    },
    vecinos: ["ley-19886", "decreto-661", "ley-21634"],
  },

  {
    slug: "tribunal-de-contratacion-publica",
    termino: "Tribunal de Contratación Pública",
    familia: "Normativa",
    definicion:
      "Es el tribunal especial donde un proveedor puede reclamar contra actos ilegales o arbitrarios ocurridos en una licitación, entre la publicación y la adjudicación.",
    cuerpo: [
      "Lo creó la Ley 19.886 para que los proveedores tuvieran una vía real de reclamo, distinta de quejarse ante el propio organismo que tomó la decisión.",
      "Su competencia está acotada en el tiempo: cubre lo que ocurre entre la publicación de las bases y la adjudicación. Lo que pasa después —problemas de ejecución del contrato, pagos atrasados— va por otras vías.",
      "El plazo para reclamar es corto: diez días hábiles desde que conociste el acto que impugnas. Pasado eso, la vía se cierra aunque tengas razón.",
      "Se puede reclamar contra bases que direccionan hacia un proveedor, contra una evaluación que no siguió los criterios publicados, o contra una adjudicación sin fundamento.",
    ],
    paraTi: [
      "Existe y funciona, pero el plazo es el problema: diez días hábiles pasan rápido cuando uno está decidiendo si vale la pena pelear.",
      "Antes de llegar acá está el foro de aclaraciones. Muchos problemas de bases se resuelven ahí, gratis y sin conflicto.",
      "Reclamar tiene un costo relacional con ese organismo. Es legítimo y a veces necesario, pero conviene tenerlo presente.",
    ],
    error:
      "Dejar pasar el plazo mientras se evalúa si conviene reclamar. Los diez días hábiles corren igual, y después ya no hay dónde ir.",
    cierre: {
      texto:
        "Puedes revisar cómo evalúa y adjudica un organismo antes de postularle, y evitar los procesos donde el resultado se ve venir.",
      boton: "Mirar un organismo",
    },
    vecinos: ["ley-19886", "foro-de-aclaraciones", "adjudicacion"],
  },

  {
    slug: "rubro",
    termino: "Rubro",
    familia: "El proceso",
    definicion:
      "Es la categoría de productos o servicios en que te inscribes en Mercado Público. Define qué licitaciones te aparecen y en qué procesos puedes ofertar.",
    cuerpo: [
      "Al registrarte eliges los rubros que corresponden a lo que vendes. Esa elección se traduce internamente a códigos de producto, y de ahí sale lo que el sistema te muestra y lo que te notifica.",
      "El problema es que la lista de rubros no siempre calza con cómo uno describe su negocio. Una empresa que vende uniformes puede tener que buscar entre vestuario, textiles, equipos de protección personal y confección, y ninguna categoría cubre todo lo que hace.",
      "Elegir de menos deja fuera oportunidades que sí te calzaban. Elegir de más llena de ruido: llegan avisos de cosas que no vendes, y el ruido termina en que dejas de mirar los avisos, que es peor.",
      "Se pueden modificar cuando quieras. No es una decisión permanente, aunque mucha gente los deja como los puso el primer día y nunca los revisa.",
    ],
    paraTi: [
      "Revisa tus rubros mirando licitaciones reales que sí te calzaban: fíjate en qué categoría estaban clasificadas. Es la forma más directa de descubrir cuál te falta.",
      "Un competidor que gana cosas que a ti no te llegan probablemente tiene un rubro que tú no declaraste.",
      "Si te llega mucho ruido, el problema no es que la plataforma funcione mal: es que hay un rubro demasiado amplio en tu perfil.",
    ],
    error:
      "Elegirlos el primer día y no volver a mirarlos. Es la causa más común de «Mercado Público no sirve para lo mío».",
    cierre: {
      texto:
        "Con tu RUT deducimos tus rubros y productos solos, a partir de lo que ya le has vendido al Estado — sin que tengas que adivinar categorías.",
      boton: "Ver mi perfil",
    },
    vecinos: ["unspsc", "proveedor-del-estado", "plan-anual-de-compras"],
  },

  {
    slug: "adjudicatario",
    termino: "Adjudicatario",
    familia: "Quién es quién",
    definicion:
      "Es el proveedor que ganó una licitación. Su nombre, su RUT y el monto adjudicado son información pública desde el momento en que se publica la adjudicación.",
    cuerpo: [
      "Cuando un organismo adjudica, publica la resolución con el ganador y el cuadro comparativo de la evaluación. Eso significa que se puede saber quién ganó, por cuánto, y qué puntaje sacó cada oferente en cada criterio.",
      "Esa transparencia es parte del diseño del sistema: la plata es pública, así que quién la recibe también lo es.",
      "Ser adjudicatario abre obligaciones inmediatas: entregar la garantía de fiel cumplimiento, firmar el contrato cuando corresponde y aceptar la orden de compra dentro de los plazos. No cumplirlas puede costar la adjudicación y la garantía de seriedad.",
      "Y el historial de adjudicaciones de una empresa queda visible. Es, en la práctica, su currículum ante el Estado.",
    ],
    paraTi: [
      "Mirar quién gana habitualmente en tu rubro te dice contra quién compites de verdad, y a qué nivel de precio se está adjudicando.",
      "Si un organismo le adjudica siempre al mismo proveedor hace años, eso es una señal: puede ser un incumbente difícil de mover, o puede ser que nadie más se presenta.",
      "Tu propio historial también lo miran a ti. Cumplir bien es lo que hace que la segunda venta cueste menos que la primera.",
    ],
    error:
      "Ignorar quién ganó cuando pierdes. Es información pública y gratuita que dice exactamente a qué precio y con qué puntaje se gana en tu rubro.",
    cierre: {
      texto:
        "Puedes revisar las adjudicaciones de tu rubro: quién ganó, por cuánto y con qué diferencia respecto de las otras ofertas.",
      boton: "Ver adjudicaciones",
    },
    vecinos: ["adjudicacion", "organismo-comprador", "competencia-en-licitaciones"],
  },

  {
    slug: "precio-de-referencia",
    termino: "Precio de referencia",
    familia: "El proceso",
    definicion:
      "Es el precio al que se ha adjudicado antes un producto o servicio parecido en compras públicas. No es un precio oficial: es lo que el historial muestra que el Estado ha pagado.",
    cuerpo: [
      "En compras públicas el precio no se negocia: se oferta una vez y se evalúa. Por eso saber a cuánto se adjudicó antes lo mismo es la diferencia entre ofertar con criterio y ofertar a ciegas.",
      "Toda esa historia es pública. Cada adjudicación y cada orden de compra dice qué se compró, a quién y por cuánto, y eso permite construir un rango: dónde está el precio bajo, la mediana y el alto.",
      "El rango importa más que el promedio. Un promedio se distorsiona con una compra grande o con una unidad de medida distinta; el rango muestra dónde se mueve el mercado de verdad.",
      "Y hay una trampa clásica: la cantidad. Cuando una compra dice «1 unidad» a veces esa unidad es un lote completo, no una pieza. Comparar precios sin mirar eso lleva a conclusiones equivocadas.",
      "El precio también varía por región y por organismo. Lo mismo puede costar distinto en Santiago que en una zona extrema, y eso no siempre es sobreprecio: puede ser logística.",
    ],
    paraTi: [
      "Ofertar sin mirar el histórico es la forma más rápida de dejar plata en la mesa o de perder por caro sin saber por cuánto.",
      "Si tu costo está muy por encima del rango histórico, esa licitación no es tuya. Reconocerlo temprano ahorra días de trabajo.",
      "Y si está muy por debajo, revisa: puede que estés omitiendo un costo que las bases exigen incluir.",
    ],
    error:
      "Guiarse por un solo caso. Una adjudicación aislada puede tener condiciones particulares; lo que sirve es el rango de varias.",
    cierre: {
      texto:
        "Puedes ver el rango real de precio de lo que vas a ofertar —mínimo, mediana y máximo— antes de decidir el tuyo.",
      boton: "Ver el precio real",
    },
    vecinos: ["oferta-economica", "adjudicatario", "unspsc"],
  },

  {
    slug: "competencia-en-licitaciones",
    termino: "Competencia en licitaciones",
    familia: "El proceso",
    definicion:
      "Es cuántos proveedores ofertan en un proceso. Es información pública que aparece en el acta de apertura, y varía muchísimo entre rubros, regiones y organismos.",
    cuerpo: [
      "Hay licitaciones con quince oferentes y otras con uno solo. La diferencia no es azar: depende del rubro, del tamaño del contrato, de qué tan exigentes son las bases y de cuántos proveedores hay en esa región.",
      "Los procesos con pocos oferentes suelen tener una razón. A veces son requisitos que casi nadie cumple; a veces es un rubro con poca oferta; y a veces simplemente nadie se enteró.",
      "Ese último caso es el interesante. Miles de procesos se publican al día y la mayoría de los proveedores mira sólo los que le aparecen por casualidad, así que hay licitaciones perfectamente ganables que reciben dos ofertas.",
      "También pasa lo contrario: procesos muy visibles, de organismos conocidos, donde compiten diez y el precio se hunde. Ganar ahí a veces significa ganar un contrato que no deja margen.",
    ],
    paraTi: [
      "Menos competencia no significa peor negocio: significa que hay que mirar por qué. Si es porque las bases piden algo que tú sí tienes, es tu licitación.",
      "Los rubros y regiones donde hay poca oferta son los mejores lugares para empezar. Menos competencia y más chance de construir historial.",
      "Mirar cuántos ofertaron en procesos anteriores del mismo organismo y rubro es la mejor forma de estimar contra cuántos vas a competir.",
    ],
    error:
      "Perseguir sólo las licitaciones grandes y visibles. Son las que todos miran, y el precio se define ahí abajo.",
    cierre: {
      texto:
        "Puedes ver cuántos suelen ofertar en tu rubro y en qué procesos hay menos competencia, antes de decidir dónde poner el esfuerzo.",
      boton: "Ver la competencia",
    },
    vecinos: ["adjudicatario", "apertura-de-ofertas", "precio-de-referencia"],
  },

  {
    slug: "id-de-licitacion",
    termino: "ID de licitación",
    familia: "El proceso",
    definicion:
      "Es el código único de cada proceso en Mercado Público, con la forma 1234-56-LE26. Identifica la unidad que compra, el número del proceso, su tipo y el año.",
    cuerpo: [
      "Cada bloque dice algo. El primero es el código de la unidad de compra que publicó; el segundo, el correlativo de ese proceso dentro de la unidad en el año; las dos letras, el tipo y tramo; y los dos últimos dígitos, el año.",
      "Sirve para buscar. Si alguien te pasa un ID, con eso llegas directo a la ficha sin tener que adivinar el nombre del proceso.",
      "También sirve para leer de un vistazo. Ver un ID que termina en LR26 dice, sin abrir nada, que es un proceso grande y de este año.",
      "Las letras no siempre son de tramo: TD es trato directo, CO es cotización de Compra Ágil. En esos casos el código habla del mecanismo, no del monto.",
    ],
    paraTi: [
      "Guarda el ID de las licitaciones que trabajas. Es la única referencia que no cambia y con la que siempre vas a poder volver a la ficha.",
      "Al hacer seguimiento interno, ordenar por ID es más confiable que por nombre: los nombres se repiten y se parecen entre organismos.",
      "El ID también te dice si dos procesos son del mismo organismo, aunque los títulos no se parezcan.",
    ],
    error:
      "Referirse a una licitación por su nombre. Hay decenas llamadas «Adquisición de insumos» al año; el ID es el único que no se confunde.",
    cierre: {
      texto:
        "Las licitaciones que sigues quedan con su ID en tu tablero, con su estado y sus fechas, sin planillas paralelas.",
      boton: "Ver cómo se siguen",
    },
    vecinos: ["tipos-de-licitacion-l1-le-lp", "unidad-de-compra", "publicacion"],
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
  // Tres escalones, del más completo al más corto. El nombre del
  // sitio es lo primero que se sacrifica: vale más la palabra que la
  // marca cuando Google sólo muestra sesenta caracteres.
  if (conMarca.length <= 60) return conMarca;
  if (base.length <= 60) return base;
  return t.termino;
}

export function descripcionTermino(t: Termino): string {
  return t.definicion.length <= 158
    ? t.definicion
    : t.definicion.slice(0, 155).replace(/\s+\S*$/, "") + "…";
}
