/* ════════════════════════════════════════════════════════════════
   Las páginas comerciales.

   Qué las separa del glosario
   ───────────────────────────
   Una ficha del glosario responde una duda y de paso menciona la app.
   Estas hacen lo contrario: vienen a vender, y el contenido está al
   servicio de eso. Quien llega acá ya tiene el problema identificado
   y está buscando con qué resolverlo.

   El orden salió de medir, no de opinar
   ─────────────────────────────────────
   Con el Planificador de Palabras Clave sobre cuatro competidores
   (LicitaLAB, Vendify, Licitados, Licitabien): 442 palabras, 72.250
   búsquedas/mes alcanzables. El resultado dio vuelta el plan:

     compra ágil          15.500/mes   ← la más grande, por lejos
     licitaciones públicas 11.000/mes
     proveedores/registro   7.000/mes
     buscador               3.000/mes
     software licitaciones     50/mes  ← descartada

   «Software de licitaciones» era la página estrella del plan y tiene
   50 búsquedas al mes con competencia alta. LicitaLAB rankea primero
   ahí — en una búsqueda que casi nadie hace.

   ⚠️ Dos de estas tienen intención MEZCLADA: quien busca
   «proveedores mercado público» puede ser un comprador buscando a
   quién comprarle, no un proveedor buscando herramienta. Las páginas
   le hablan al segundo sin prometerle nada al primero.

   ⛔ Y ninguna publica datos de la app: se describe qué puedes
   averiguar, nunca el resultado de averiguarlo.
═══════════════════════════════════════════════════════════════════ */

import type { OrigenCta } from "./cta";

export type Prueba = {
  /** Un número o hecho concreto. Nada de adjetivos. */
  dato: string;
  /** Qué significa para quien lee. */
  glosa: string;
};

export type Bloque = {
  titulo: string;
  parrafos: string[];
};

export type Comercial = {
  slug: string;
  /** H1 de la página. */
  titulo: string;
  /** El <title> de la pestaña. Máximo 60 caracteres. */
  tituloSeo: string;
  descripcion: string;
  /** La frase de arriba, bajo el H1. */
  bajada: string;
  /** Tres pruebas duras, arriba del pliegue. */
  pruebas: Prueba[];
  bloques: Bloque[];
  /** Preguntas frecuentes: van al texto y a los datos estructurados. */
  faqs: { q: string; a: string }[];
  cierre: { titulo: string; texto: string; boton: string };
  /** De dónde sale el clic, para la marca del enlace. */
  origen: OrigenCta;
  /** Términos del glosario que esta página enlaza. */
  glosario: string[];
};

export const COMERCIALES: Comercial[] = [
  /* ── 1 · Compra Ágil · 15.500 búsquedas/mes ─────────────────── */
  {
    slug: "compra-agil",
    titulo: "Compra Ágil: el canal donde se parte",
    tituloSeo: "Compra Ágil de Mercado Público — IAutoLicita",
    descripcion:
      "Recibe las Compras Ágiles que calzan con lo que vendes, con el precio al que se adjudicó antes lo mismo. Sin revisar el portal todos los días.",
    bajada:
      "Miles de cotizaciones bajo 100 UTM se resuelven en días, con menos competencia y sin bases que leer. El problema no es ganarlas: es enterarse a tiempo.",
    pruebas: [
      {
        dato: "Sin bases ni garantías",
        glosa:
          "Un requerimiento en pocas líneas y tu cotización. Nada de anexos ni boletas.",
      },
      {
        dato: "Días, no semanas",
        glosa:
          "Se cotiza hoy y puede haber orden de compra esta semana.",
      },
      {
        dato: "Hasta 100 UTM",
        glosa:
          "Alrededor de $6,9 millones. Es donde se construye el primer historial.",
      },
    ],
    bloques: [
      {
        titulo: "Por qué se pierden las Compras Ágiles",
        parrafos: [
          "No se pierden por precio. Se pierden porque nadie se enteró: el organismo publica, recibe tres cotizaciones en dos días y compra. Para cuando el proveedor entra al portal a mirar, el proceso ya está cerrado.",
          "Y son muchas. Todos los días se publican cotizaciones en todos los rubros del país, mezcladas con licitaciones grandes que no tienen nada que ver contigo. Revisar eso a mano es un trabajo de tiempo completo que nadie hace bien más de dos semanas seguidas.",
          "El resultado típico es que un proveedor descubre la Compra Ágil por casualidad, gana una, se entusiasma, revisa el portal religiosamente un mes, se cansa, y vuelve a perdérselas.",
        ],
      },
      {
        titulo: "Qué hace IAutoLicita con eso",
        parrafos: [
          "Traes tu RUT y armamos tu perfil solo: qué vendes, en qué rubros, a qué organismos les has vendido. No hay que tipear categorías ni adivinar códigos.",
          "Desde ahí, las Compras Ágiles que calzan contigo te llegan filtradas — junto con las licitaciones y las grandes compras del convenio marco, en un solo lugar y no en tres.",
          "Y llegan con contexto: a qué precio se adjudicó antes algo parecido, con su rango real. Cotizar sabiendo eso es distinto de cotizar adivinando.",
        ],
      },
      {
        titulo: "Para quién es",
        parrafos: [
          "Para el proveedor que ya le vende al Estado y sabe que se le pasan oportunidades, pero no tiene a nadie que pueda revisar el portal todos los días.",
          "Y para el que quiere empezar: la Compra Ágil casi nunca pide acreditación ni historial previo, así que es la puerta de entrada más realista que existe.",
        ],
      },
    ],
    faqs: [
      {
        q: "¿Necesito estar acreditado en ChileProveedores para cotizar en Compra Ágil?",
        a: "No. Basta estar inscrito en Mercado Público, que es gratis, y tener el rubro correspondiente. La acreditación se justifica más adelante, cuando persigas licitaciones que la exijan.",
      },
      {
        q: "¿Cuál es el monto máximo de una Compra Ágil?",
        a: "100 UTM, alrededor de $6,9 millones con la UTM cerca de los $69.000. Sobre ese monto, el organismo tiene que licitar.",
      },
      {
        q: "¿Cuánto se demora una Compra Ágil?",
        a: "Días. El organismo publica su requerimiento, recibe al menos tres cotizaciones y compra. Todo el ciclo puede cerrarse en la misma semana, por eso enterarse tarde equivale a no enterarse.",
      },
      {
        q: "¿Puedo probar sin pagar?",
        a: "Sí. El plan gratis deja ver el mercado completo y probar a Lici. Se parte por ahí y se cambia de plan cuando el volumen lo justifique.",
      },
    ],
    cierre: {
      titulo: "Trae tu RUT y mira qué hay hoy",
      texto:
        "En minutos ves las Compras Ágiles y licitaciones publicadas que calzan con lo que vendes, con su precio de referencia.",
      boton: "Ver qué hay para mí",
    },
    origen: "cuerpo",
    glosario: ["compra-agil", "orden-de-compra", "proveedor-del-estado"],
  },

  /* ── 2 · Licitaciones públicas · 11.000/mes ─────────────────── */
  {
    slug: "licitaciones-publicas",
    titulo: "Licitaciones públicas, sin revisar el portal",
    tituloSeo: "Licitaciones públicas de Mercado Público — IAutoLicita",
    descripcion:
      "Te avisamos sólo las licitaciones públicas que calzan con lo que vendes, con las bases ya leídas y el precio al que se adjudicó antes lo mismo.",
    bajada:
      "El Estado publica miles de procesos al día. Tuyos son unos pocos, y el trabajo real no es competir: es encontrarlos antes de que cierren.",
    pruebas: [
      {
        dato: "Todo el mercado, filtrado",
        glosa:
          "Licitaciones, Compra Ágil, convenio marco y grandes compras en un solo lugar.",
      },
      {
        dato: "Las bases, leídas",
        glosa:
          "Lici te dice qué piden, qué garantía y qué plazos — citando la página.",
      },
      {
        dato: "El precio de antes",
        glosa:
          "A cuánto se adjudicó lo mismo, con su rango real.",
      },
    ],
    bloques: [
      {
        titulo: "El problema no es la competencia",
        parrafos: [
          "Casi todos los proveedores que le venden al Estado cuentan la misma historia: se enteran tarde, o no se enteran. No porque no miren, sino porque el buscador del portal funciona por coincidencia exacta de palabras y hay que adivinar cómo tituló el organismo lo que necesita.",
          "Si buscas «aseo» no encuentras «servicio de higienización»; si buscas «computadores» no encuentras «equipamiento computacional». Cada búsqueda revela un pedazo distinto del mercado, y nadie tiene tiempo de probar diez variantes todos los días.",
          "El resultado es que las licitaciones que uno gana suelen ser las que encontró por casualidad, no las mejores que había.",
        ],
      },
      {
        titulo: "Buscar por lo que vendes, no por palabras",
        parrafos: [
          "Traes tu RUT y armamos tu perfil desde tu historial real de ventas al Estado: qué productos, en qué rubros, a qué organismos. No hay que tipear categorías ni acertarle a un código.",
          "Con eso el radar corre solo. Lo que calza contigo llega; lo que no, no aparece. Y si algo no calza, se ajusta el perfil y deja de llegar.",
          "Cada aviso viene con lo que hace falta para decidir en un minuto: qué piden las bases, qué garantía, cuándo cierra y a qué precio se adjudicó antes algo parecido.",
        ],
      },
      {
        titulo: "Y después de encontrarla",
        parrafos: [
          "Lici lee las bases completas —administrativas y técnicas— y responde en castellano qué exigen, qué documentos hay que adjuntar y qué plazos corren. Citando la página donde lo dice, para que puedas verificarlo.",
          "Las que decides trabajar quedan en un tablero con su estado y sus fechas, así que no se te pasa un cierre por tenerlo anotado en otra parte.",
        ],
      },
    ],
    faqs: [
      {
        q: "¿Qué es una licitación pública?",
        a: "Es el procedimiento por el que un organismo del Estado publica lo que necesita comprar, cualquier proveedor puede ofertar, y gana quien obtiene más puntaje según reglas escritas antes de recibir ofertas.",
      },
      {
        q: "¿Necesito experiencia previa para postular?",
        a: "No. Los tramos chicos y la Compra Ágil casi nunca piden historial. Lo que se exige es cumplir lo que digan las bases, y eso no depende del tamaño de la empresa.",
      },
      {
        q: "¿Cómo sé a qué precio ofertar?",
        a: "Mirando a cuánto se adjudicó antes algo parecido. Esa información es pública y es la mejor referencia que existe: sirve para no dejar plata en la mesa ni perder por caro sin saber por cuánto.",
      },
      {
        q: "¿Cuánto cuesta IAutoLicita?",
        a: "Hay un plan gratis para ver el mercado y probar. Los planes pagos parten en $79.000 + IVA al mes.",
      },
    ],
    cierre: {
      titulo: "Empieza con tu RUT",
      texto:
        "En minutos ves las licitaciones publicadas hoy que calzan con lo que vendes.",
      boton: "Ver las que calzan conmigo",
    },
    origen: "cuerpo",
    glosario: [
      "que-es-una-licitacion-publica",
      "tipos-de-licitacion-l1-le-lp",
      "criterios-de-evaluacion",
    ],
  },

  /* ── 3 · Registro de proveedores · 7.000/mes ────────────────── */
  {
    slug: "registro-proveedores-estado",
    titulo: "Cómo empezar a venderle al Estado",
    tituloSeo: "Registro de proveedores del Estado — IAutoLicita",
    descripcion:
      "Qué se necesita de verdad para vender al Estado, qué no se necesita, y cómo saber en el primer día si hay mercado para lo que vendes.",
    bajada:
      "No hay un título que sacar ni una lista de espera. El registro es gratis y toma minutos. Lo difícil viene después: saber dónde está tu mercado.",
    pruebas: [
      {
        dato: "El registro es gratis",
        glosa:
          "Inscribirse en Mercado Público no cuesta nada y habilita para ofertar.",
      },
      {
        dato: "No necesitas acreditarte",
        glosa:
          "ChileProveedores tiene costo, pero no hace falta para partir.",
      },
      {
        dato: "Ni experiencia previa",
        glosa:
          "Compra Ágil y los tramos chicos casi nunca la piden.",
      },
    ],
    bloques: [
      {
        titulo: "Lo que sí y lo que no hace falta",
        parrafos: [
          "Hay una idea muy extendida de que ser proveedor del Estado es un título que hay que sacar, con requisitos y espera. No lo es. Con inicio de actividades en el SII y el registro gratuito en Mercado Público ya puedes ofertar el mismo día.",
          "Lo que sí existe es ChileProveedores, un registro adicional que guarda tus documentos legales y financieros para no tener que subirlos en cada proceso. Tiene costo anual y algunas licitaciones lo exigen para adjudicar — pero no se necesita para empezar, y acreditarse antes de tiempo es plata gastada sin uso.",
          "Tampoco hace falta ser grande. Personas naturales con boleta, empresas individuales y sociedades de cualquier tamaño venden al Estado. Lo que decide es cumplir lo que piden las bases.",
        ],
      },
      {
        titulo: "El error del primer día",
        parrafos: [
          "Al registrarte eliges rubros, y esa elección define qué te llega. Es donde casi todos se equivocan: eligen de menos y se pierden lo que sí les calzaba, o eligen de más y reciben tanto ruido que dejan de mirar los avisos.",
          "El problema de fondo es que la lista de rubros no calza con cómo uno describe su propio negocio. Una empresa de uniformes tiene que buscar entre vestuario, textiles, protección personal y confección, y ninguna cubre todo.",
        ],
      },
      {
        titulo: "Empezar sabiendo si hay mercado",
        parrafos: [
          "Traes tu RUT y armamos el perfil desde tu historial real: qué has vendido, en qué rubros, a quién. Si nunca le has vendido al Estado, se arma desde lo que declaras y se va afinando.",
          "Y lo primero que ves es lo que importa: qué hay publicado hoy que calce contigo. No una promesa de que existe mercado — el mercado, en pantalla.",
        ],
      },
    ],
    faqs: [
      {
        q: "¿Cuánto cuesta registrarse como proveedor del Estado?",
        a: "Inscribirse en Mercado Público es gratis. ChileProveedores, el registro que guarda tus documentos, tiene un costo anual por tramos según el tamaño de la empresa, pero no es necesario para empezar a ofertar.",
      },
      {
        q: "¿Qué necesito para inscribirme?",
        a: "Inicio de actividades en el SII y los datos de la empresa o persona natural. El trámite es en línea y toma minutos.",
      },
      {
        q: "¿Puedo vender al Estado como persona natural?",
        a: "Sí, con inicio de actividades y boleta. El sistema no exige ser sociedad para participar.",
      },
      {
        q: "¿Por dónde conviene empezar?",
        a: "Por Compra Ágil y los tramos chicos de licitación. Casi nunca piden acreditación ni historial previo, y cada entrega cumplida construye el antecedente que después pesa en procesos más grandes.",
      },
    ],
    cierre: {
      titulo: "Mira si hay mercado para lo tuyo",
      texto:
        "Con tu RUT armamos el perfil y te mostramos qué está publicado hoy que calce contigo.",
      boton: "Ver qué hay para mí",
    },
    origen: "cuerpo",
    glosario: ["proveedor-del-estado", "chileproveedores", "rubro"],
  },

  /* ── 4 · Buscador · 3.000/mes ───────────────────────────────── */
  {
    slug: "buscador-licitaciones",
    titulo: "Un buscador que entiende lo que vendes",
    tituloSeo: "Buscador de licitaciones con IA — IAutoLicita",
    descripcion:
      "El buscador del portal funciona por coincidencia exacta de palabras. Este busca por lo que vendes, no por cómo el organismo tituló la licitación.",
    bajada:
      "Si buscas «aseo» no encuentras «servicio de higienización». Ese es el problema, y no se arregla buscando mejor: se arregla buscando distinto.",
    pruebas: [
      {
        dato: "Por producto, no por palabra",
        glosa:
          "Encuentra lo que calza aunque el organismo lo haya titulado de otra forma.",
      },
      {
        dato: "Los cuatro canales juntos",
        glosa:
          "Licitaciones, Compra Ágil, convenio marco y grandes compras.",
      },
      {
        dato: "Con precio de referencia",
        glosa:
          "A cuánto se adjudicó antes lo mismo, con su rango.",
      },
    ],
    bloques: [
      {
        titulo: "Por qué buscar a mano no funciona",
        parrafos: [
          "El buscador de Mercado Público hace coincidencia textual: encuentra las licitaciones cuyo título contiene exactamente las palabras que escribiste. Eso significa que para no perderte nada tendrías que adivinar todas las formas en que un organismo puede nombrar lo que vendes.",
          "Aseo, limpieza, higienización, sanitización, mantención de áreas comunes. Cada búsqueda revela un pedazo distinto del mercado, y ninguna revela el total. Nadie prueba diez variantes todos los días durante meses.",
          "A eso se suma el volumen: miles de procesos publicados a diario en todos los rubros del país. Revisar eso a mano no es cuestión de disciplina, es cuestión de tiempo que nadie tiene.",
        ],
      },
      {
        titulo: "Buscar por producto",
        parrafos: [
          "El enfoque distinto es no buscar por palabras sino por lo que vendes. Traes tu RUT, se arma tu perfil de productos desde tu historial real de ventas al Estado, y desde ahí el radar corre contra todo lo que se publica.",
          "Eso encuentra las licitaciones que están escritas con otras palabras — que son, en la práctica, la mayoría de las que se pierden.",
          "Y no reemplaza la búsqueda manual: la complementa. Se puede seguir buscando a mano cuando hace falta algo puntual.",
        ],
      },
      {
        titulo: "Y con Lici encima",
        parrafos: [
          "Encontrar la licitación es la mitad. La otra mitad es decidir si vale la pena, y para eso hay que leer las bases: a veces cien páginas para descubrir que piden una certificación que no tienes.",
          "Lici las lee y responde en castellano qué exigen, qué garantía, qué plazos y qué documentos — citando la página donde lo dice, para que puedas verificarlo.",
        ],
      },
    ],
    faqs: [
      {
        q: "¿Es un buscador público de licitaciones?",
        a: "No. Es una funcionalidad dentro de IAutoLicita: se abre la cuenta, se arma el perfil con tu RUT y desde ahí busca contra todo lo publicado. No hay un buscador abierto en este sitio.",
      },
      {
        q: "¿Puedo seguir buscando por palabras si quiero?",
        a: "Sí. La búsqueda por texto sigue disponible; lo que se agrega es la búsqueda por lo que vendes, que es la que encuentra lo que la textual se pierde.",
      },
      {
        q: "¿Busca también en Compra Ágil?",
        a: "Sí, y en convenio marco y grandes compras. Los cuatro canales en un solo lugar, porque el mercado no está sólo en las licitaciones.",
      },
      {
        q: "¿Cuánto cuesta probarlo?",
        a: "Hay un plan gratis para ver el mercado y probar a Lici. Se parte por ahí.",
      },
    ],
    cierre: {
      titulo: "Pruébalo con tu propio RUT",
      texto:
        "En minutos ves qué está publicado hoy que calce con lo que vendes — incluido lo que está escrito con otras palabras.",
      boton: "Probar el buscador",
    },
    origen: "cuerpo",
    glosario: ["unspsc", "rubro", "id-de-licitacion"],
  },

  /* ── 5 · Criterios de elección ──────────────────────────────
     Captura al que está comparando herramientas, SIN nombrar
     competencia — instrucción de Carlos. Es la mitad del valor de una
     comparativa, pero es la mitad que no da vergüenza. */
  {
    slug: "como-elegir-software-licitaciones",
    titulo: "Cómo elegir una herramienta de licitaciones",
    tituloSeo: "Cómo elegir un software de licitaciones",
    descripcion:
      "Ocho criterios para comparar herramientas de licitaciones en Chile: qué preguntar, qué mirar en la prueba y dónde suelen estar los costos escondidos.",
    bajada:
      "Todas prometen lo mismo: avisarte de las licitaciones que te sirven. Estas son las preguntas que separan a las que cumplen.",
    pruebas: [
      {
        dato: "Pruébala con tu RUT",
        glosa:
          "Si no puedes ver tu propio mercado antes de pagar, no sabes qué estás comprando.",
      },
      {
        dato: "Precio en pesos",
        glosa:
          "Cobrar en UF hace que la cuenta suba todos los meses sin que nadie avise.",
      },
      {
        dato: "Sin contrato anual",
        glosa:
          "Si el producto sirve, no necesita amarrarte doce meses.",
      },
    ],
    bloques: [
      {
        titulo: "1 · ¿Puedes probarla con tus datos antes de pagar?",
        parrafos: [
          "Una demo con datos de ejemplo no dice nada. Lo que importa es ver TU mercado: qué licitaciones hay hoy para lo que TÚ vendes. Si sólo ofrecen una reunión comercial y una presentación, estás comprando una promesa.",
          "La prueba honesta se hace con tu RUT y en minutos, sin coordinar agendas.",
        ],
      },
      {
        titulo: "2 · ¿Cómo arma tu perfil?",
        parrafos: [
          "Casi todas piden que tipees palabras clave y elijas categorías a mano. Eso significa que la calidad de lo que recibes depende de que le achuntes a los términos correctos — y que si eliges mal, la culpa parece tuya.",
          "Pregunta si puede armar el perfil desde tu historial real de ventas al Estado. Es información pública y cambia por completo la precisión de lo que llega.",
        ],
      },
      {
        titulo: "3 · ¿Cubre los cuatro canales?",
        parrafos: [
          "El Estado compra por licitación pública, Compra Ágil, convenio marco y trato directo. Una herramienta que sólo mira licitaciones te deja fuera de una parte grande del mercado — y la Compra Ágil es donde más se mueve el volumen chico.",
        ],
      },
      {
        titulo: "4 · ¿Te dice el precio al que se adjudicó antes?",
        parrafos: [
          "Enterarse de una licitación es la mitad. La otra mitad es saber a cuánto ofertar, y eso sale del histórico público de adjudicaciones. Sin esa referencia, ofertas adivinando.",
          "Pregunta si entrega un rango —mínimo, mediana, máximo— y no sólo un promedio: un promedio se distorsiona con una sola compra grande.",
        ],
      },
      {
        titulo: "5 · ¿Lee las bases?",
        parrafos: [
          "Las bases pueden ser cien páginas. Una herramienta que te avisa de la licitación pero te deja el trabajo de leerlas resuelve el problema chico y no el grande.",
          "Y si dice que las lee con IA, pregunta si cita la página donde encontró cada dato. Sin cita, no hay forma de verificar y hay que leerlas igual.",
        ],
      },
      {
        titulo: "6 · ¿Cuánto cuesta de verdad?",
        parrafos: [
          "Revisa tres cosas: si el precio está en pesos o en UF —en UF sube todos los meses sin aviso—, si hay contrato anual obligatorio, y cuántos usuarios incluye. Una herramienta barata para un usuario puede salir cara cuando el equipo son tres.",
        ],
      },
      {
        titulo: "7 · ¿Qué pasa cuando llega ruido?",
        parrafos: [
          "Toda herramienta de alertas manda cosas que no calzan. Lo que importa es qué tan fácil es corregirlo: si ajustar el perfil requiere soporte o se hace solo.",
          "Es el momento exacto en que la gente abandona: llegan tres avisos malos seguidos, se pierde la confianza y se deja de mirar.",
        ],
      },
      {
        titulo: "8 · ¿Y después de postular?",
        parrafos: [
          "Encontrar y decidir es el principio. Después hay que seguir cierres, armar la postulación, controlar órdenes de compra y cobrar. Pregunta hasta dónde llega la herramienta, o vas a terminar con una planilla al lado igual.",
        ],
      },
    ],
    faqs: [
      {
        q: "¿Vale la pena pagar por una herramienta de licitaciones?",
        a: "Depende del volumen. Si le vendes al Estado de forma ocasional, el portal puede bastar. Si es un canal de venta importante, el costo de perderse licitaciones que sí calzaban supera con creces el de la herramienta.",
      },
      {
        q: "¿Cuánto cuesta un software de licitaciones en Chile?",
        a: "El rango es amplio y varía según usuarios y funciones. Lo importante al comparar es fijarse si el precio está en pesos o en UF, y si hay contrato anual obligatorio.",
      },
      {
        q: "¿Puedo probar antes de decidir?",
        a: "Debería poder. Si sólo ofrecen una demo comercial con datos de ejemplo, estás evaluando una presentación y no el producto.",
      },
    ],
    cierre: {
      titulo: "Pruébalo con tus propios datos",
      texto:
        "Trae tu RUT y en minutos ves qué licitaciones hay hoy para lo que vendes. Sin reunión previa.",
      boton: "Probarlo con mi RUT",
    },
    origen: "cuerpo",
    glosario: [
      "que-es-una-licitacion-publica",
      "compra-agil",
      "precio-de-referencia",
    ],
  },
];

export const POR_SLUG_COMERCIAL: Record<string, Comercial> =
  Object.fromEntries(COMERCIALES.map((c) => [c.slug, c]));

export const rutaComercial = (slug: string) => `/${slug}`;
