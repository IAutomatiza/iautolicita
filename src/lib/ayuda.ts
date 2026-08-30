/* ════════════════════════════════════════════════════════════════
   El centro de ayuda.

   Qué es y qué NO se le puede pedir
   ─────────────────────────────────
   Estas páginas explican la app. No traen tráfico de Google y no
   deben pretenderlo: nadie teclea el nombre de una función que no
   sabe que existe. Sirven para dos cosas distintas —que el que
   dudaba vea que es fácil antes de registrarse, y que el que entró no
   se pierda— y por eso van al final de la fila, cuando ya empiece a
   llegar gente.

   ⛔ LA REGLA, sin excepciones (instrucción de Carlos)
   ────────────────────────────────────────────────────
   Se muestra QUÉ PUEDES AVERIGUAR, nunca EL RESULTADO de averiguarlo.

     ✅  «Pones el RUT de un competidor y ves en qué gana»
     ❌  una tabla con el RUT de alguien y sus montos

   Y se muestra el RESULTADO, nunca el MÉTODO:

     ✅  «Pones tu RUT y el perfil sale solo»
     ❌  de dónde sale, cómo se agrupan los productos, contra qué se
         comparan

   Lo segundo es el trabajo de meses y es lo único copiable. Lo
   primero es exactamente el dato que el cliente paga por ver: un
   competidor publica 24.634 fichas de proveedores con RUT y montos, y
   si hiciéramos lo mismo, los clientes de IAutoLicita aparecerían con
   sus cifras publicadas en su propio proveedor.

   Cuando estas páginas lleven capturas, van con cifras de ejemplo.
═══════════════════════════════════════════════════════════════════ */

export type Ficha = {
  slug: string;
  titulo: string;
  tituloSeo: string;
  descripcion: string;
  bajada: string;
  /** Reportes se consultan; tutoriales se siguen. */
  familia: "Inteligencia de Mercado" | "Cómo se usa";
  /** Qué responde esta pantalla. Tres a cinco, concretas. */
  responde: string[];
  bloques: { titulo: string; parrafos: string[] }[];
  /** Dónde está dentro de la app. */
  donde?: string;
  cierre: { texto: string; boton: string };
  vecinos: string[];
};

export const FICHAS: Ficha[] = [
  /* ══ Inteligencia de Mercado ═══════════════════════════════════ */
  {
    slug: "radiografia-de-proveedor",
    titulo: "Radiografía de Proveedor",
    tituloSeo: "Radiografía de Proveedor — IAutoLicita",
    descripcion:
      "Cómo revisar a cualquier proveedor del Estado: qué vende, por qué canales, quiénes le compran y con quién compite realmente.",
    bajada:
      "Pones un RUT y ves cómo le va a esa empresa vendiéndole al Estado. Sirve para estudiar a un competidor, a un socio o a alguien que te quiere vender.",
    familia: "Inteligencia de Mercado",
    responde: [
      "¿Qué le vende al Estado y en qué rubros se mueve?",
      "¿Por qué canales vende: licitación, Compra Ágil, convenio marco o trato directo?",
      "¿Qué organismos le compran habitualmente?",
      "¿Quiénes compiten con él en sus mismos productos?",
    ],
    bloques: [
      {
        titulo: "Para qué sirve de verdad",
        parrafos: [
          "El caso más común es mirar a un competidor. Saber en qué canales se mueve dice mucho: alguien que vende casi todo por trato directo tiene relaciones instaladas; alguien que vive de licitaciones compite por precio.",
          "El segundo caso es al revés: mirar a una empresa que te quiere vender o con la que evalúas asociarte. Su historial con el Estado es público y dice si cumple.",
          "Y el tercero, menos obvio, es descubrir a quién no tenías en el radar. La vista de competidores muestra otras empresas que venden los mismos productos, y ahí suelen aparecer nombres que uno no tenía identificados.",
        ],
      },
      {
        titulo: "Lo que muestra",
        parrafos: [
          "Sus ventas al Estado ordenadas por canal y por rubro, sus compradores más frecuentes, y el listado de competidores reales — otras empresas que venden los mismos productos, no sólo las que están en el mismo rubro genérico.",
          "Toda la información viene de lo que ChileCompra publica: adjudicaciones y órdenes de compra. Es pública y verificable.",
        ],
      },
    ],
    donde: "Menú → Inteligencia de Mercado → Proveedor",
    cierre: {
      texto:
        "Pruébalo con el RUT de un competidor y mira en qué canales se mueve.",
      boton: "Abrir la app",
    },
    vecinos: ["radiografia-de-comprador", "comparador", "mi-empresa-360"],
  },

  {
    slug: "radiografia-de-comprador",
    titulo: "Radiografía de Comprador",
    tituloSeo: "Radiografía de Comprador — IAutoLicita",
    descripcion:
      "Cómo estudiar a un organismo público antes de postularle: en qué gasta, con quién trabaja y qué tan abierto está a proveedores nuevos.",
    bajada:
      "Antes de invertir días preparando una oferta, conviene saber si ese organismo compra de verdad lo que vendes — y si le compra a alguien nuevo alguna vez.",
    familia: "Inteligencia de Mercado",
    responde: [
      "¿En qué gasta este organismo y cuánto?",
      "¿Con qué proveedores trabaja habitualmente?",
      "¿Qué tan seguido le quedan licitaciones desiertas?",
      "¿Le adjudica siempre al mismo o rota entre proveedores?",
    ],
    bloques: [
      {
        titulo: "Las señales de entrada",
        parrafos: [
          "Esta es la parte que más cambia una decisión. Un organismo que le adjudica siempre al mismo proveedor desde hace años tiene un incumbente instalado, y competir ahí cuesta mucho más de lo que parece.",
          "Al revés, un organismo al que se le declaran licitaciones desiertas seguido está diciendo algo: su necesidad no está siendo cubierta por el mercado actual. Ahí hay espacio.",
          "Y un organismo que rota entre proveedores distintos es uno donde una oferta nueva tiene chance real.",
        ],
      },
      {
        titulo: "Para qué se usa",
        parrafos: [
          "Para elegir a quién perseguir. Preparar una oferta toma días, así que la decisión de a qué organismos apuntar vale tanto como la oferta misma.",
          "Y para entender el terreno antes de una reunión o antes de una licitación específica: saber qué compró antes y a qué precio cambia la conversación.",
        ],
      },
    ],
    donde: "Menú → Inteligencia de Mercado → Comprador",
    cierre: {
      texto:
        "Revisa un organismo antes de postularle: en qué gasta y qué tan abierto está a proveedores nuevos.",
      boton: "Abrir la app",
    },
    vecinos: ["radiografia-de-proveedor", "plan-de-compras", "termino-de-contratos"],
  },

  {
    slug: "radar-de-producto",
    titulo: "Radar de Producto",
    tituloSeo: "Radar de Producto — IAutoLicita",
    descripcion:
      "El precio real de un producto en compras públicas: su rango, cómo se movió en el tiempo y cómo cambia entre regiones.",
    bajada:
      "En compras públicas el precio no se negocia: se oferta una vez. Saber a cuánto se adjudicó antes es la diferencia entre ofertar con criterio y adivinar.",
    familia: "Inteligencia de Mercado",
    responde: [
      "¿A qué precio se ha adjudicado este producto?",
      "¿Cuál es el rango: dónde está lo barato, lo normal y lo caro?",
      "¿Cómo se movió el precio en el tiempo?",
      "¿Cambia según la región?",
    ],
    bloques: [
      {
        titulo: "Por qué el rango y no el promedio",
        parrafos: [
          "Un promedio se distorsiona con facilidad: una sola compra grande o una unidad de medida distinta lo mueven entero. El rango —dónde está el precio bajo, la mediana y el alto— muestra dónde se mueve el mercado de verdad.",
          "Hay una trampa clásica en los datos de compras públicas: cuando una compra dice «1 unidad», a veces esa unidad es un lote completo y no una pieza. Comparar sin considerar eso lleva a conclusiones equivocadas.",
        ],
      },
      {
        titulo: "La diferencia por región",
        parrafos: [
          "Un mismo producto puede pagarse distinto en Santiago que en una zona extrema, y no siempre es sobreprecio: puede ser logística, disponibilidad o falta de proveedores locales.",
          "Para un proveedor con capacidad de despachar, esa diferencia es información accionable: dice dónde hay margen y dónde no.",
        ],
      },
    ],
    donde: "Menú → Inteligencia de Mercado → Productos",
    cierre: {
      texto:
        "Mira el rango real de precio de lo que vendes antes de decidir tu oferta.",
      boton: "Abrir la app",
    },
    vecinos: ["radiografia-de-proveedor", "convenio-marco-reporte", "comparador"],
  },

  {
    slug: "comparador",
    titulo: "Comparador de proveedores",
    tituloSeo: "Comparador de proveedores — IAutoLicita",
    descripcion:
      "Dos proveedores lado a lado: dónde le ganas, dónde te gana y en qué productos se cruzan realmente.",
    bajada:
      "No sirve saber que alguien es tu competencia. Sirve saber en qué te gana, por cuánto, y en qué productos se cruzan de verdad.",
    familia: "Inteligencia de Mercado",
    responde: [
      "¿En qué productos nos cruzamos con este proveedor?",
      "¿Quién gana más seguido y en qué canales?",
      "¿Hay brecha de precio entre los dos?",
      "¿Comparten compradores?",
    ],
    bloques: [
      {
        titulo: "El cruce, que es lo que importa",
        parrafos: [
          "Dos empresas del mismo rubro pueden no competir en nada: una vende insumos y la otra equipos, aunque el rubro los junte. El cruce real está a nivel de producto.",
          "El comparador muestra dónde ambos venden lo mismo, que es el único lugar donde se compite de verdad. Todo lo demás es ruido.",
        ],
      },
      {
        titulo: "Para qué se usa",
        parrafos: [
          "Para decidir dónde competir y dónde no. Si alguien te gana sistemáticamente en un producto con una brecha de precio grande, esa pelea probablemente no es tuya.",
          "Y para encontrar el hueco: los organismos que le compran a tu competidor pero a ti no, en productos que sí vendes.",
        ],
      },
    ],
    donde: "Menú → Inteligencia de Mercado → Competencia",
    cierre: {
      texto:
        "Compara tu empresa con un competidor y mira en qué productos se cruzan.",
      boton: "Abrir la app",
    },
    vecinos: ["radiografia-de-proveedor", "mi-empresa-360", "radar-de-producto"],
  },

  {
    slug: "mi-empresa-360",
    titulo: "Mi Empresa 360°",
    tituloSeo: "Mi Empresa 360° — IAutoLicita",
    descripcion:
      "Tu propia radiografía: qué has vendido, con qué tasa de éxito postulas, y las oportunidades que calzaban contigo y dejaste pasar.",
    bajada:
      "Lo mismo que puedes ver de cualquier proveedor, aplicado a ti. Incluida la parte incómoda: lo que dejaste pasar.",
    familia: "Inteligencia de Mercado",
    responde: [
      "¿Qué le he vendido al Estado y por qué canales?",
      "¿Con qué frecuencia gano cuando postulo?",
      "¿Qué diferencia de precio hubo con quien ganó cuando perdí?",
      "¿Qué oportunidades calzaban conmigo y no postulé?",
    ],
    bloques: [
      {
        titulo: "Lo que dejaste pasar",
        parrafos: [
          "Es la parte que más duele y la más útil. La pantalla muestra las oportunidades que calzaban con tu perfil y a las que no postulaste — no porque hayas decidido que no valían la pena, sino porque no te enteraste.",
          "Ese número suele ser el argumento más fuerte para ordenar el proceso: no es que falte competitividad, es que falta enterarse.",
        ],
      },
      {
        titulo: "Tu tasa de éxito y la brecha",
        parrafos: [
          "Saber en cuántas de las que postulas ganas cambia cómo se cotiza: si ganas una de cada cinco, cada venta tiene que pagar el costo de cinco postulaciones.",
          "Y la brecha de precio contra quien ganó dice si perdiste por lejos o por poco. Perder por 3% en algo que podías haber ajustado es una lección distinta a perder por 40%.",
        ],
      },
    ],
    donde: "Menú → Mi Empresa 360°",
    cierre: {
      texto:
        "Trae tu RUT y mira tu propia radiografía, incluidas las que calzaban contigo.",
      boton: "Ver mi empresa",
    },
    vecinos: ["comparador", "radiografia-de-proveedor", "el-alta-con-tu-rut"],
  },

  {
    slug: "plan-de-compras",
    titulo: "Plan de Compras",
    tituloSeo: "Plan de Compras del Estado — IAutoLicita",
    descripcion:
      "Lo que cada institución pública declara que va a comprar este año, cuánto lleva ejecutado y qué queda pendiente, filtrado por rubro.",
    bajada:
      "La mayoría se entera de una licitación el día que se publica. El plan de compras la anuncia meses antes — y casi nadie lo mira.",
    familia: "Inteligencia de Mercado",
    responde: [
      "¿Qué declaró comprar cada organismo este año en mi rubro?",
      "¿Por cuánto y en qué mes?",
      "¿Cuánto lleva ejecutado y qué queda pendiente?",
      "¿Qué organismos van acelerados y cuáles atrasados?",
    ],
    bloques: [
      {
        titulo: "Por qué casi nadie lo usa",
        parrafos: [
          "No es por acceso: el plan es público y gratuito. Es por formato. Son cientos de miles de líneas repartidas entre más de mil organismos, cada uno con su archivo, y encontrar lo tuyo ahí no es una tarde de trabajo.",
          "Y no avisa. No hay una notificación que diga «un organismo declaró que va a comprar lo que tú vendes». Hay que ir a buscarlo.",
        ],
      },
      {
        titulo: "Lo ejecutado contra lo declarado",
        parrafos: [
          "El plan solo dice intención. El dato que lo vuelve útil es compararlo con lo que el organismo ya compró: si declaró comprar en marzo y estamos en julio sin que salga, esa compra está pendiente.",
          "Los presupuestos públicos son anuales, así que hacia fin de año aparecen compras postergadas — lo no ejecutado se pierde.",
        ],
      },
    ],
    donde: "Menú → Inteligencia de Mercado → Plan de Compras",
    cierre: {
      texto:
        "Revisa qué declararon comprar este año los organismos de tu rubro.",
      boton: "Ver el plan de compras",
    },
    vecinos: ["radiografia-de-comprador", "termino-de-contratos", "mi-empresa-360"],
  },

  {
    slug: "termino-de-contratos",
    titulo: "Término de contratos",
    tituloSeo: "Contratos por vencer — IAutoLicita",
    descripcion:
      "Los contratos públicos cuyo plazo está por vencer: cuándo, cuánto valen y quién los tiene hoy. Un contrato que vence es una relicitación casi segura.",
    bajada:
      "Es saber de una licitación antes de que exista. Cuando un contrato se acaba, el organismo tiene que volver a comprar — y eso se puede ver con meses de anticipación.",
    familia: "Inteligencia de Mercado",
    responde: [
      "¿Qué contratos de mi rubro están por vencer?",
      "¿Cuándo vencen y cuánto valen?",
      "¿Quién los tiene actualmente?",
      "¿Qué organismos van a tener que volver a comprar?",
    ],
    bloques: [
      {
        titulo: "Por qué es la señal más valiosa",
        parrafos: [
          "Casi todo lo demás mira hacia atrás: qué se compró, a quién, por cuánto. Esto mira hacia adelante. Un contrato que vence deja al organismo sin proveedor, y salvo que renueve, tiene que licitar de nuevo.",
          "El tiempo de anticipación es lo que lo hace útil. Enterarse el día que se publica la licitación deja días para prepararse; saberlo con tres meses permite conocer al organismo, entender qué falló del contrato anterior y llegar con una propuesta pensada.",
        ],
      },
      {
        titulo: "Quién lo tiene hoy",
        parrafos: [
          "Saber quién es el proveedor actual cambia la estrategia. Si lleva años y renueva siempre, es un incumbente difícil. Si el contrato tuvo problemas o el organismo rota, hay espacio.",
          "Esa información es pública y está en el historial de adjudicaciones y órdenes de compra.",
        ],
      },
    ],
    donde: "Menú → Inteligencia de Mercado → Término de contratos",
    cierre: {
      texto:
        "Mira qué contratos de tu rubro están por vencer y quién los tiene hoy.",
      boton: "Ver contratos por vencer",
    },
    vecinos: ["plan-de-compras", "radiografia-de-comprador", "radiografia-de-proveedor"],
  },

  {
    slug: "convenio-marco-reporte",
    titulo: "Convenio Marco",
    tituloSeo: "Análisis de Convenio Marco — IAutoLicita",
    descripcion:
      "El catálogo del Estado por dentro: qué se mueve, quién vive de él, qué productos y a qué precio real.",
    bajada:
      "Hay una parte del mercado que nunca se publica como licitación porque se resuelve en el catálogo. Si no estás adentro, no la ves.",
    familia: "Inteligencia de Mercado",
    responde: [
      "¿Cuánto se mueve por convenio marco en mi rubro?",
      "¿Qué proveedores viven de este canal?",
      "¿Qué productos se compran más y a qué precio?",
      "¿Qué organismos compran preferentemente por catálogo?",
    ],
    bloques: [
      {
        titulo: "El canal invisible",
        parrafos: [
          "El convenio marco funciona como un catálogo: ChileCompra licita una vez, los proveedores que ganan entran, y de ahí en adelante los organismos compran directo sin volver a licitar.",
          "Para quien está afuera eso significa que hay compras que nunca aparecen como licitación. No es que se las pierda por no enterarse: es que no existen como proceso público al que postular.",
        ],
      },
      {
        titulo: "Para decidir si vale la pena entrar",
        parrafos: [
          "Entrar al convenio marco cuesta: hay que preparar una postulación seria y las licitaciones de convenio se publican cada cierto tiempo por rubro.",
          "Antes de invertir en eso, conviene ver cuánto se mueve realmente por ese canal en tu rubro y a qué precios. A veces el volumen justifica de sobra el esfuerzo; a veces no.",
        ],
      },
    ],
    donde: "Menú → Inteligencia de Mercado → Convenio Marco",
    cierre: {
      texto:
        "Revisa cuánto se mueve por convenio marco en tu rubro y a qué precios.",
      boton: "Abrir la app",
    },
    vecinos: ["radar-de-producto", "plan-de-compras", "radiografia-de-comprador"],
  },

  /* ══ Cómo se usa · los seis tutoriales ═════════════════════════ */
  {
    slug: "el-alta-con-tu-rut",
    titulo: "El alta con tu RUT",
    tituloSeo: "Cómo empezar: el alta con tu RUT — IAutoLicita",
    descripcion:
      "Traes tu RUT y el perfil se arma solo: qué vendes, en qué rubros y a qué organismos. Es el primer paso y el único que hay que hacer.",
    bajada:
      "En la mayoría de las herramientas hay que tipear palabras clave y elegir categorías a mano. Acá pones el RUT y el perfil sale armado.",
    familia: "Cómo se usa",
    responde: [
      "¿Qué necesito para empezar?",
      "¿Cuánto se demora?",
      "¿Qué pasa si nunca le he vendido al Estado?",
      "¿Puedo corregir el perfil después?",
    ],
    bloques: [
      {
        titulo: "Por qué importa tanto este paso",
        parrafos: [
          "Todo lo que te llegue después depende del perfil. Si está mal armado, te vas a perder licitaciones que sí te calzaban o vas a recibir ruido hasta que dejes de mirar los avisos. Es el punto donde la mayoría de las herramientas de alertas fracasan.",
          "El problema de fondo es que las categorías del sistema no calzan con cómo uno describe su propio negocio. Una empresa de uniformes tiene que buscar entre vestuario, textiles, protección personal y confección, y ninguna cubre todo. Elegir a mano es adivinar.",
        ],
      },
      {
        titulo: "Cómo funciona",
        parrafos: [
          "Pones tu RUT y listo. El perfil queda armado con lo que vendes, los rubros donde te mueves y los organismos a los que les has vendido.",
          "Si nunca le has vendido al Estado, el perfil parte de lo que declaras y se va afinando con el uso. No es un requisito tener historial.",
          "Y se puede corregir cuando quieras: si empieza a llegar algo que no calza, se ajusta y deja de llegar.",
        ],
      },
      {
        titulo: "Lo primero que vas a ver",
        parrafos: [
          "Apenas queda armado el perfil, la pantalla muestra lo que está publicado hoy que calza contigo. No una promesa de que existe mercado — el mercado, en pantalla.",
          "Ese es el momento en que la mayoría entiende de qué se trata: descubrir que hay cosas publicadas ahora mismo que no sabía que existían.",
        ],
      },
    ],
    donde: "Es el primer paso al abrir la cuenta.",
    cierre: {
      texto:
        "Trae tu RUT y en minutos ves qué hay publicado hoy para lo que vendes.",
      boton: "Empezar con mi RUT",
    },
    vecinos: ["ajustar-tu-perfil", "mi-empresa-360", "las-alertas"],
  },

  {
    slug: "leer-una-licitacion-con-lici",
    titulo: "Leer una licitación con Lici",
    tituloSeo: "Cómo leer una licitación con Lici — IAutoLicita",
    descripcion:
      "Lici lee las bases completas y responde qué piden, qué garantía y qué plazos, citando la página donde lo dice.",
    bajada:
      "Unas bases pueden ser cien páginas. Leerlas enteras para descubrir al final que piden algo que no tienes es la forma más cara de perder un día.",
    familia: "Cómo se usa",
    responde: [
      "¿Qué documentos exige esta licitación?",
      "¿Qué garantía piden, por cuánto y hasta cuándo?",
      "¿Qué plazos corren y cuándo cierra?",
      "¿Cumplo con los requisitos excluyentes?",
    ],
    bloques: [
      {
        titulo: "Qué se le puede preguntar",
        parrafos: [
          "Cualquier cosa que esté en las bases, en castellano. Qué garantía piden. Si exigen estar acreditado. Qué anexos hay que llenar. Cuánto pesa el precio en la evaluación. Si aceptan producto equivalente.",
          "No hay que saber formular la pregunta de una forma especial: se pregunta como uno le preguntaría a alguien que leyó el documento.",
        ],
      },
      {
        titulo: "Por qué cita la página",
        parrafos: [
          "Cada respuesta viene con la referencia de dónde salió. Eso importa más de lo que parece: una respuesta sin cita no se puede verificar, y en algo que decide si postulas o no, verificar no es opcional.",
          "También sirve para ir directo al punto de las bases cuando ya decidiste postular y necesitas el detalle exacto.",
        ],
      },
      {
        titulo: "Lo que no reemplaza",
        parrafos: [
          "Cuando ya decidiste postular, hay que leer las bases. Lici no reemplaza eso: reemplaza leer cien páginas para descubrir que no te servía.",
          "Es la diferencia entre descartar en dos minutos y descartar en dos horas — multiplicada por todas las licitaciones que uno mira en un mes.",
        ],
      },
    ],
    donde: "Desde la ficha de cualquier licitación, o desde el chat de Lici.",
    cierre: {
      texto:
        "Prueba a Lici con una licitación real y pregúntale qué te están pidiendo.",
      boton: "Probar con una licitación",
    },
    vecinos: ["el-alta-con-tu-rut", "del-tablero-a-la-postulacion", "la-extension-de-chrome"],
  },

  {
    slug: "ajustar-tu-perfil",
    titulo: "Ajustar tu perfil cuando llega ruido",
    tituloSeo: "Cómo ajustar tu perfil — IAutoLicita",
    descripcion:
      "Qué hacer cuando empiezan a llegar avisos que no calzan con lo que vendes. Es el momento exacto en que la gente abandona una herramienta de alertas.",
    bajada:
      "Toda herramienta de alertas manda cosas que no calzan. Lo que importa es qué tan fácil es corregirlo — y que lo hagas antes de dejar de mirar los avisos.",
    familia: "Cómo se usa",
    responde: [
      "¿Por qué me llega algo que no vendo?",
      "¿Cómo hago que deje de llegar?",
      "¿Y si siento que me está faltando algo?",
      "¿Cada cuánto conviene revisar el perfil?",
    ],
    bloques: [
      {
        titulo: "Por qué pasa",
        parrafos: [
          "Los rubros y productos del perfil se traducen a categorías del sistema, y esas categorías a veces son más amplias de lo que uno vende. Un rubro que agrupa cosas parecidas puede traer avisos de productos que no tienen nada que ver.",
          "También pasa al revés: un perfil demasiado estrecho deja fuera licitaciones que sí calzaban pero estaban clasificadas en otra parte.",
        ],
      },
      {
        titulo: "El momento crítico",
        parrafos: [
          "Es el punto donde se abandona una herramienta de alertas, y casi nunca de forma consciente. Llegan tres avisos que no sirven, se pierde la confianza, se dejan de abrir los correos, y a las dos semanas la herramienta dejó de existir.",
          "Por eso vale la pena ajustar apenas empieza a molestar, no cuando ya te cansaste.",
        ],
      },
      {
        titulo: "Cómo se corrige",
        parrafos: [
          "Se ajusta el perfil —los productos y rubros que lo componen— y lo que no calza deja de llegar. No hay que llamar a soporte ni esperar a nadie.",
          "Y si sientes que te está faltando algo, la señal más útil es mirar una licitación concreta que sí te calzaba y ver en qué categoría estaba clasificada. Ahí suele estar el rubro que falta.",
        ],
      },
    ],
    donde: "Menú → Mi búsqueda",
    cierre: {
      texto:
        "El perfil se ajusta solo con tu RUT, y se corrige en cualquier momento si llega algo que no calza.",
      boton: "Abrir la app",
    },
    vecinos: ["el-alta-con-tu-rut", "las-alertas", "mi-empresa-360"],
  },

  {
    slug: "del-tablero-a-la-postulacion",
    titulo: "Del tablero a la postulación",
    tituloSeo: "Seguimiento y postulación — IAutoLicita",
    descripcion:
      "Cómo se siguen las licitaciones que estás trabajando: el tablero por estados, el calendario de cierres y el armado de la propuesta.",
    bajada:
      "Encontrar la licitación es el principio. Después hay que decidir, preparar y no perder un cierre — que es donde se cae la mayoría.",
    familia: "Cómo se usa",
    responde: [
      "¿Cómo sigo las licitaciones que estoy trabajando?",
      "¿Cómo no se me pasa un cierre?",
      "¿Dónde armo la postulación?",
      "¿Sirve si somos varios en el equipo?",
    ],
    bloques: [
      {
        titulo: "El tablero",
        parrafos: [
          "Las licitaciones que decides trabajar pasan por estados: detectada, evaluando, preparando, postulada, y ganada o perdida. Cada una con su lista de lo que falta.",
          "El valor no es el orden visual: es que deja de haber una planilla paralela. Cuando el seguimiento vive en un archivo aparte, siempre está desactualizado y siempre falta algo.",
        ],
      },
      {
        titulo: "El calendario",
        parrafos: [
          "Los cierres, las aperturas técnicas y las económicas quedan en un calendario. Un cierre que se pasa es una licitación perdida sin haber competido, y es de los errores más frecuentes y más evitables.",
          "Es especialmente útil cuando se trabajan varias a la vez, que es cuando la memoria deja de alcanzar.",
        ],
      },
      {
        titulo: "Armar la propuesta",
        parrafos: [
          "Desde la ficha misma se arma la postulación, con dos vías según el canal: Compra Ágil, que es corta, y licitación clásica, que necesita los anexos y documentos.",
          "La idea es no saltar entre el portal, el correo y una carpeta de documentos: que lo que hace falta esté donde se está trabajando.",
        ],
      },
    ],
    donde: "Menú → Mis Licitaciones · Calendario · Cotizaciones y propuestas",
    cierre: {
      texto:
        "Prueba el tablero con una licitación real y mira cómo queda el seguimiento.",
      boton: "Abrir la app",
    },
    vecinos: ["leer-una-licitacion-con-lici", "la-extension-de-chrome", "las-alertas"],
  },

  {
    slug: "la-extension-de-chrome",
    titulo: "La extensión de Chrome",
    tituloSeo: "Extensión de Chrome — IAutoLicita",
    descripcion:
      "Cosecha sola los documentos adjuntos de una licitación desde Mercado Público, sin bajarlos uno por uno.",
    bajada:
      "Una licitación puede traer quince adjuntos entre bases, anexos y planos. Bajarlos a mano es media hora que no le sirve a nadie.",
    familia: "Cómo se usa",
    responde: [
      "¿Para qué sirve la extensión?",
      "¿Qué hace exactamente?",
      "¿Tengo que instalarla para usar la app?",
      "¿Reemplaza entrar a Mercado Público?",
    ],
    bloques: [
      {
        titulo: "El problema que resuelve",
        parrafos: [
          "Los documentos de una licitación están en Mercado Público, repartidos en una lista de adjuntos: bases administrativas, técnicas, anexos, a veces planos y aclaraciones posteriores.",
          "Bajarlos uno por uno, guardarlos con nombres que después se entiendan y tenerlos a mano cuando se trabaja la oferta es un trabajo mecánico que se repite en cada licitación.",
        ],
      },
      {
        titulo: "Qué hace",
        parrafos: [
          "Con la extensión instalada, los adjuntos de una licitación se traen a la plataforma sin descargarlos a mano. Desde ahí quedan disponibles para trabajar la oferta y para que Lici los lea.",
          "Es opcional: la app funciona sin ella. Lo que cambia es el tiempo que toma juntar los documentos de cada proceso.",
        ],
      },
    ],
    donde: "Se instala desde la app, en un solo paso.",
    cierre: {
      texto:
        "Prueba la app con una licitación real y mira cómo llegan sus documentos.",
      boton: "Abrir la app",
    },
    vecinos: ["leer-una-licitacion-con-lici", "del-tablero-a-la-postulacion", "el-alta-con-tu-rut"],
  },

  {
    slug: "las-alertas",
    titulo: "Las alertas",
    tituloSeo: "Cómo funcionan las alertas — IAutoLicita",
    descripcion:
      "Dónde llegan los avisos de licitaciones que calzan contigo, qué traen y cómo bajarles el volumen sin perderse nada.",
    bajada:
      "Un aviso que llega tarde no sirve, y uno que llega de más deja de leerse. El punto está en el medio.",
    familia: "Cómo se usa",
    responde: [
      "¿Dónde llegan las alertas?",
      "¿Qué información traen?",
      "¿Puedo recibir sólo lo más relevante?",
      "¿Llegan también las Compras Ágiles?",
    ],
    bloques: [
      {
        titulo: "Qué trae cada aviso",
        parrafos: [
          "No sólo el título de la licitación. El aviso viene con lo que hace falta para decidir en un minuto: qué se está comprando, cuándo cierra, y el precio al que se adjudicó antes algo parecido.",
          "Esa última parte es la que evita el paso más lento: entrar al portal a averiguar si vale la pena.",
        ],
      },
      {
        titulo: "Todos los canales, no sólo licitaciones",
        parrafos: [
          "Llegan licitaciones, Compras Ágiles, grandes compras del convenio marco y lo que se mueve en los otros canales. El mercado no está sólo en las licitaciones, y una herramienta que mira sólo ahí deja fuera buena parte del volumen chico.",
        ],
      },
      {
        titulo: "Cuando llega de más",
        parrafos: [
          "Si el volumen molesta, el problema casi siempre es el perfil, no las alertas. Un rubro demasiado amplio trae avisos de productos que no vendes.",
          "Ajustar el perfil es lo que baja el ruido sin perder cobertura. Silenciar las alertas resuelve la molestia y crea el problema de vuelta: dejas de enterarte.",
        ],
      },
    ],
    donde: "Menú → Mi búsqueda, y en la configuración de la cuenta.",
    cierre: {
      texto:
        "Arma tu perfil con tu RUT y empieza a recibir sólo lo que calza contigo.",
      boton: "Empezar con mi RUT",
    },
    vecinos: ["ajustar-tu-perfil", "el-alta-con-tu-rut", "del-tablero-a-la-postulacion"],
  },
];

export const POR_SLUG_AYUDA: Record<string, Ficha> = Object.fromEntries(
  FICHAS.map((f) => [f.slug, f]),
);

export const RUTA_AYUDA = "/ayuda";
export const rutaAyuda = (slug: string) => `${RUTA_AYUDA}/${slug}`;

export const FAMILIAS_AYUDA = [
  "Inteligencia de Mercado",
  "Cómo se usa",
] as const;
