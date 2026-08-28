/* Base de conocimiento de Lici en la web.

   ⚠️ ESTO ES PROVISORIO A PROPÓSITO. En la Fase 5 este archivo se
   vacía y su contenido pasa a la tabla `lici_web_conocimiento` de
   Supabase, para que se edite sin desplegar. La forma de cada ficha
   es la misma que tendrá la fila, así que la migración es un volcado.

   REGLA DURA — lo que NUNCA puede entrar acá:
   nombres o cifras de clientes · métricas del negocio · costos y
   márgenes · infraestructura (Supabase, tablas, crons, qué modelo de
   IA corre) · seguridad · producto no lanzado · nuestro análisis
   interno de la competencia · datos concretos de ChileCompra.

   Si no lo pondrías en un aviso de Google, no va acá.

   ── EL OBJETIVO (decisión de Carlos, 28-ago-2026) ────────────
   Lici tiene UNA meta: que la persona entre a la app y la pruebe.
   El plan gratis es $0 y sin tarjeta, así que el camino más corto
   es la puerta, no una sala de espera.

   Lici NO agenda, NO captura datos y NO escribe en ninguna tabla.
   No tiene herramientas. Solo conversa y enlaza. Dos salidas:

     · quiere entender o probar        → la app (APP_URL)
     · quiere una persona, o Lici no sabe → /contacto

   REGLA DE TONO: responder primero, bien, y ofrecer después. La
   respuesta ES el argumento de venta; un agente que empuja el
   registro en cada frase irrita y no vende.

   ── DOS PROHIBICIONES DURAS (Carlos, 28-ago-2026) ────────────
   1. NUNCA nombrar a la competencia. Ni para bien ni para mal, ni
      aunque el visitante la nombre primero. Se responde por lo que
      hacemos nosotros. Los nombres que aparecen en `claves` son
      disparadores internos: sirven para RECONOCER la pregunta y no
      salen nunca en pantalla.
   2. NUNCA entregar datos del mercado: montos de proveedores, quién
      ganó qué, cuánto se adjudicó, qué factura una empresa. Eso ES
      el producto y se ve adentro, con la sesión iniciada.
   3. NUNCA dar instrucciones de configuración ni soporte: dónde se
      hace clic, cómo se activa algo, por qué no le llegó un aviso.
      Dos motivos: no es su pega —vende la entrada, no enseña a usar
      la app— y sobre todo, si la interfaz cambia, unas instrucciones
      viejas MIENTEN y nadie se entera.
      ⚠️ Pero NO es un portazo: se responde diciendo que **Lici dentro
      de la app sí lo hace**, y con sus datos. El límite es un
      argumento de venta, no una excusa.

   4. NUNCA información de clientes: quiénes son, cuántos hay, de qué
      rubro, cuánto facturan, casos de éxito con nombre. Ni siquiera
      «una empresa de aseo que usa la plataforma». Un cliente que
      descubre que hablamos de él con desconocidos, se va — y con
      razón. Si algún día hay un caso de éxito, será con permiso
      firmado y publicado en el sitio, no dicho por un chat.

   Las cuatro están resueltas con guardrails en código, ANTES del
   modelo — no con una instrucción amable en el prompt. */

import { APP_URL } from "./cta";
import { PLAN, enPesos } from "./planes";

export type Ficha = {
  id: string;
  categoria:
    | "producto"
    | "modulo"
    | "plan"
    | "ventaja"
    | "objecion"
    | "proceso";
  /** Palabras con las que la gente pregunta esto. */
  claves: string[];
  respuesta: string;
};

/* Lo que se ofrece antes de que escriban nada.

   Están escritos desde el DOLOR del visitante, no desde nuestro
   producto: «¿Qué hace exactamente?» es una pregunta que se hace
   quien ya decidió mirar; «Se me pasan licitaciones» es la frase
   que trae a alguien a la página. Cinco y no seis: en el panel
   angosto, seis se comen media pantalla antes del saludo. */
export const CHIPS_INICIALES = [
  "¿Sirve para lo que yo vendo?",
  "¿Cuánto cuesta?",
  "Se me pasan licitaciones",
  "No sé a qué precio ofertar",
  "Nunca he licitado",
];

/* Corto, una pregunta, y con una razón para contestarla.

   Tres cosas que tenía mal el anterior:
   · repetía el subtítulo de la cabecera — "te digo si te sirve"
     aparecía dos veces en dos líneas;
   · "sin vueltas" es una muletilla: un vendedor que anuncia que no
     va a dar vueltas ya dio una;
   · la pregunta no daba ningún motivo para responderla, y una
     pregunta sin motivo se lee como un formulario.

   Y ojo con lo que NO promete: nada de "te digo cuánto paga el
   Estado". Eso lo bloquea el guardrail de datos, y un saludo que
   ofrece lo que el agente tiene que negar es la peor entrada
   posible. Promete criterio, que sí puede dar. */
export const SALUDO =
  "Hola, soy Lici. ¿Qué vende tu empresa? Así te cuento lo que te sirve y nos saltamos el discurso genérico.";

export const FICHAS: Ficha[] = [
  /* ── Producto ─────────────────────────────────────────────── */
  {
    id: "que-es",
    categoria: "producto",
    claves: ["que hace", "que hacen", "que es", "que son", "para que sirve", "de que se trata", "explicame", "como funciona", "en que consiste"],
    respuesta:
      "Vigilamos todo lo que el Estado publica en ChileCompra y te avisamos solo lo que calza con lo que vendes. De cada licitación te leemos las bases completas, te decimos qué piden y a qué precio se adjudicó algo parecido antes. Tú decides si postulas; el trabajo de buscar y leer ya está hecho.",
  },
  {
    id: "alta",
    categoria: "proceso",
    claves: ["empezar", "empiezo", "partir", "parto", "registrar", "registro", "crear cuenta", "alta", "primeros pasos", "mi rut", "con el rut"],
    respuesta:
      `Con tu RUT. Leemos tu historial de ventas al Estado y armamos tu perfil solo: qué vendes, dónde ganas y quién te compra. Es lo único que haces — de ahí el radar corre solo. No hay que instalar nada: [parte acá](${APP_URL}).`,
  },

  /* ── Módulos ──────────────────────────────────────────────── */
  {
    id: "lici-bases",
    categoria: "modulo",
    claves: ["leer las bases", "las bases", "bases tecnicas", "documentos", "asistente", "letra chica", "que piden"],
    respuesta:
      "Dentro de la app, Lici se lee **los documentos completos** de la licitación o de la compra ágil —las bases, los anexos, el foro de preguntas— y te responde lo concreto: qué documentos piden, qué garantía, qué fechas, qué letra chica. Cita la página exacta de dónde lo sacó, así que no te pide fe. Y de ahí no te deja solo: con eso mismo te ayuda a armar la postulación.",
  },
  {
    id: "alertas",
    categoria: "modulo",
    claves: ["alerta", "alertas", "aviso", "avisan", "avisa", "avisar", "notificacion", "cuando sale", "sale una", "cierre", "llego tarde", "enterarme", "me entero", "se me pasan", "se me pasa", "me pierdo", "no me entero"],
    respuesta:
      "Te avisamos apenas se publica, por correo y WhatsApp — no cuando ya quedan tres días. En licitaciones llegar primero es medio negocio. El plan gratis recibe un resumen diario; las alertas al instante vienen desde el plan Pro.",
  },
  {
    id: "lineas-negocio",
    categoria: "modulo",
    claves: ["varias cosas", "rubros", "lineas", "distintos productos", "dos negocios", "perfiles"],
    respuesta:
      "Si vendes cosas distintas, cada una puede tener su propia línea de negocio: su radar, sus alertas y su porcentaje de éxito por separado. No tienes que elegir cuál vigilar.",
  },
  {
    id: "inteligencia",
    categoria: "modulo",
    claves: ["mercado", "inteligencia", "competencia", "quien gana", "reportes", "analisis"],
    respuesta:
      "Tienes reportes de mercado: quién compra, quién te compite, qué productos se mueven, convenios marco, planes de compra y contratos que están por terminar. Sirve para saber dónde vale la pena pelear antes de gastar horas en una propuesta.",
  },
  {
    id: "propuestas",
    categoria: "modulo",
    claves: ["propuesta", "postular", "postulacion", "oferta", "ofertar", "cotizacion", "cotizar", "anexos", "armar", "preparar", "me ayuda a crear", "crear la propuesta"],
    respuesta:
      "Lici lee los documentos y con eso **arma la postulación contigo**, paso a paso. Sirve para las dos vías: la **cotización de Compra Ágil** y la **propuesta de una licitación** clásica, con su kit de documentos y sus anexos. Se lanza desde la ficha misma, sin salir a otra parte. Desde el plan Pro.",
  },
  {
    id: "multi-empresa",
    categoria: "modulo",
    claves: ["varias empresas", "dos empresas", "mas de una empresa", "multi", "holding", "dos rut", "varios rut", "una cuenta"],
    respuesta:
      "Sí, varias empresas en una sola cuenta, cada una con su equipo y su información separada. Viene en el plan Max.",
  },
  {
    id: "compra-agil",
    categoria: "modulo",
    claves: ["compra agil", "agil", "cotizar"],
    respuesta:
      "Compra Ágil está incluida desde el plan gratis, y con el mismo trato que una licitación: Lici te lee la cotización y sus adjuntos, y te ayuda a armar la oferta. Es un canal enorme que varias plataformas ignoran, y para muchos proveedores es de donde sale la mayor parte de la venta.",
  },

  {
    id: "instalar",
    categoria: "proceso",
    claves: ["instalar", "descargar", "software", "programa", "app movil", "aplicacion"],
    respuesta:
      "Nada. Es una página web: entras desde el navegador y ya está. No hay que instalar ni descargar nada.",
  },
  {
    id: "me-sirve",
    categoria: "producto",
    claves: ["me sirve", "sirve para mi", "vendo", "mi rubro", "mi empresa", "nosotros vendemos", "somos", "me conviene"],
    respuesta:
      "Casi seguro que sí: el Estado compra de todo, desde uniformes hasta software. La forma barata de salir de dudas es entrar con tu RUT — en minutos ves qué está comprando el Estado de lo tuyo, gratis y sin tarjeta.",
  },

  {
    id: "probabilidad",
    categoria: "modulo",
    claves: ["probabilidad", "chance", "puedo ganar", "me conviene postular", "vale la pena", "score", "puntaje"],
    respuesta:
      "Cada licitación llega con su probabilidad de que la ganes, y con los factores que la explican — no un número suelto. Y cuando no hay datos suficientes para calcularla, te lo dice en vez de inventarte un verde. Sirve para lo más caro que hay en licitaciones: decidir a cuáles NO ir.",
  },
  {
    id: "admisibilidad",
    categoria: "modulo",
    claves: ["admisibilidad", "requisitos", "puedo postular", "califico", "me piden", "cumplo"],
    respuesta:
      "Antes de que gastes una hora leyendo, cruzamos la licitación con tu perfil en cinco cosas: el **monto** (¿está en el rango que manejas?), la **región**, la **barrera de entrada**, la **experiencia** que exigen y el **tipo de licitación**. Si algo no calza, lo ves de inmediato.",
  },
  {
    id: "gestion-equipo",
    categoria: "modulo",
    claves: ["equipo", "varias personas", "asignar", "quien lleva", "trabajar en equipo", "colaborar", "usuarios"],
    respuesta:
      "Cada licitación se asigna a alguien, se etiqueta, se le ponen notas internas y queda su historial de estados. Además hay checklist de postulación y calendario con los cierres. Deja de vivir en un Excel que solo entiende una persona.",
  },
  {
    id: "foro-similares",
    categoria: "modulo",
    claves: ["foro", "preguntas y respuestas", "aclaraciones", "consultas al organismo", "similares", "parecidas"],
    respuesta:
      "Traemos el foro oficial de preguntas y respuestas de cada licitación —donde suele estar la letra chica que cambia todo— y te mostramos convocatorias similares anteriores, con quiénes se presentaron y en qué terminaron.",
  },
  {
    id: "competidores",
    categoria: "modulo",
    claves: ["competidores", "contra quien", "quien se presenta", "oferentes", "rivales", "competir"],
    respuesta:
      "En cada licitación ves quiénes suelen presentarse a ese tipo de compra y cómo les ha ido, más la radiografía del organismo que compra: qué adjudica, a quién y cada cuánto. Sabes contra quién juegas antes de escribir la propuesta.",
  },

  {
    id: "mi-empresa-360",
    categoria: "modulo",
    claves: ["mi empresa", "360", "como voy", "mi historial", "mi desempeno", "mis resultados", "radiografia", "win rate", "tasa de exito"],
    respuesta:
      "«Mi Empresa 360°» es tu radiografía completa: lo que le has vendido al Estado —que cuadra al peso con las órdenes de compra—, tu tasa de éxito, tu brecha de precio contra quien ganó, y algo que duele ver pero sirve: **las que no postulaste** y calzaban contigo. Además te compara lado a lado contra cualquier competidor.",
  },
  {
    id: "contratos-vencen",
    categoria: "ventaja",
    claves: ["contratos", "vencen", "vencimiento", "renovacion", "re licitacion", "cuando sale de nuevo", "anticipar", "futuro"],
    respuesta:
      "Esta es de las mejores: te mostramos los contratos ya adjudicados **cuyo plazo está por vencer**, que casi siempre significa que se vuelven a licitar. Ves cuándo vence, cuánto vale y quién lo tiene hoy — o sea a quién hay que superar. Y se cruza con lo que tú vendes, así ves solo los vencimientos de tus productos. Es preparar la licitación antes de que exista.",
  },
  {
    id: "plan-compras",
    categoria: "modulo",
    claves: ["plan de compras", "pac", "que van a comprar", "presupuesto del estado", "planificado", "proyeccion"],
    respuesta:
      "El Plan de Compras es el **futuro declarado del Estado**: lo que cada institución dice que va a comprar este año. Te mostramos cuánto de ese plan ya se ejecutó, qué instituciones van aceleradas y cuáles son las líneas más grandes del país. Sirve para saber a quién tocarle la puerta antes de que publique.",
  },
  {
    id: "precio-producto",
    categoria: "modulo",
    claves: ["precio de mercado", "cuanto se paga", "precio real", "referencia de precio", "sobreprecio", "por region"],
    respuesta:
      "Por cada producto ves el precio real que ha pagado el Estado: el rango bajo, la mediana y el rango alto, cómo ha ido evolucionando, y **cuánto se paga de más en cada región**. Ese último dato no lo tiene nadie más. Con eso ofertas sabiendo dónde estás parado.",
  },
  {
    id: "conocer-comprador",
    categoria: "modulo",
    claves: ["comprador", "organismo", "municipalidad", "ministerio", "quien compra", "conocer al cliente", "senales"],
    respuesta:
      "De cada organismo ves qué compra, a quién le compra y por qué canal — más señales que casi nadie mira: cuántas de sus licitaciones quedan desiertas, qué tan abierto es a proveedores nuevos y qué tan amarrado está a su proveedor actual. Sirve para elegir dónde sí tienes chance.",
  },
  {
    id: "kanban",
    categoria: "modulo",
    claves: ["kanban", "tablero", "flujo", "seguimiento", "en que voy", "pipeline", "etapas"],
    respuesta:
      "Hay un tablero donde arrastras cada oportunidad por sus etapas: Detectada → Evaluando → Preparando → Postulada → Ganada o Perdida. Con su checklist en cada una. Es el Excel de seguimiento, pero que se actualiza solo y lo ve todo el equipo.",
  },
  {
    id: "extension",
    categoria: "modulo",
    claves: ["extension", "chrome", "navegador", "descargar documentos", "bajar bases", "adjuntos"],
    respuesta:
      "Hay una extensión de Chrome que cosecha sola los documentos adjuntos de una licitación desde Mercado Público y los deja dentro de la plataforma. Deja de bajar PDF uno por uno.",
  },

  /* ── Planes ───────────────────────────────────────────────── */
  {
    id: "precios",
    categoria: "plan",
    claves: ["cuanto cuesta", "precio", "vale", "plan", "planes", "pagar", "tarifa", "valor"],
    respuesta:
      `Tres planes. **Free** en $0, para mirar el mercado completo y probar — sin tarjeta y sin fecha de término. **Pro** a ${enPesos(PLAN.pro.neto)} + IVA al mes: alertas al instante, Lici sin tope y el gestor de propuestas, hasta ${PLAN.pro.usuarios} usuarios. **Max** a ${enPesos(PLAN.max.neto)} + IVA: suma presupuestos, cobranza y varias empresas, hasta ${PLAN.max.usuarios} usuarios.`,
  },
  {
    id: "gratis",
    categoria: "plan",
    claves: ["gratis", "free", "prueba", "probar", "tarjeta", "sin costo"],
    respuesta:
      `El plan gratis no es una prueba de 14 días: es gratis de verdad y no caduca. Traes tu RUT, ves todo lo que el Estado publica, tienes los reportes de mercado y ${PLAN.free.preguntasDia} preguntas diarias a Lici. Sin tarjeta — [entra y pruébalo](${APP_URL}).`,
  },

  /* ── Ventajas ─────────────────────────────────────────────── */
  {
    id: "diferencia",
    categoria: "ventaja",
    claves: ["diferencia", "diferencian", "por que ustedes", "mejor", "competencia", "licitalab", "vendify", "otros", "distinto", "ventaja"],
    respuesta:
      "Tres cosas. Uno: tu catálogo se arma solo desde tu RUT, no lo tipeas a mano. Dos: te decimos a qué precio se adjudicó lo mismo antes, así no ofertas a ciegas. Tres: te leemos las bases y te citamos la página. La mayoría te entrega una alerta y de ahí te las arreglas solo.",
  },
  {
    id: "precio-ganador",
    categoria: "ventaja",
    claves: ["precio", "cuanto ofertar", "a que precio", "cuanto cobrar", "margen"],
    respuesta:
      "Te mostramos a cuánto se adjudicó lo mismo antes, con el historial real de compras del Estado. Ofertar a ciegas es la forma más cara de perder.",
  },

  {
    id: "reunion",
    categoria: "proceso",
    claves: ["reunion", "demo", "hablar", "contacto", "contactar", "llamada", "telefono", "correo", "mail", "agendar", "vendedor", "persona", "ejecutivo"],
    respuesta:
      `Si quieres hablar con alguien del equipo, déjanos tus datos y coordinamos media hora: [pedir una reunión](/contacto). Aunque si es por curiosear, el plan gratis no necesita reunión ni tarjeta: [míralo tú mismo](${APP_URL}).`,
  },

  {
    id: "mas-ventas",
    categoria: "ventaja",
    claves: ["vender mas", "aumentar ventas", "mas ventas", "me sirve para vender", "potenciar", "crecer", "ganar mas", "mejorar mis ventas", "que gano", "beneficio", "para que me sirve"],
    respuesta:
      "Por tres lados. **Presentas a más**: hoy se te pasan licitaciones que calzan contigo y ni te enteraste — el radar las encuentra todas. **Presentas mejor**: llegas el primer día, no cuando quedan tres, y con las bases ya leídas. **Y presentas a las que puedes ganar**: cada una viene con su score y con a cuánto se adjudicó algo parecido, así dejas de gastar horas en las que no tenías chance.",
  },
  {
    id: "tiempo",
    categoria: "ventaja",
    claves: ["tiempo", "horas", "cuanto me demoro", "ahorro", "rapido", "demora", "me ahorra"],
    respuesta:
      "Lo que hoy se va en buscar y leer. Revisar el portal todos los días, abrir licitaciones que no calzan y leerse bases de 80 páginas para descubrir que pedían algo que no tienes — eso desaparece. Tu equipo pasa a hacer lo único que da plata: decidir a cuáles ir y armar buenas propuestas.",
  },
  {
    id: "resultado",
    categoria: "ventaja",
    claves: ["resultados", "funciona de verdad", "sirve realmente", "garantizan", "aseguran", "voy a ganar"],
    respuesta:
      "No te vamos a prometer que vas a ganar — eso no lo puede prometer nadie con seriedad. Lo que sí cambia es que dejas de perder por las dos razones evitables: enterarte tarde y ofertar a ciegas. El resto —tu precio, tu propuesta, tu experiencia— sigue siendo tuyo.",
  },

  /* ── Objeciones ───────────────────────────────────────────── */
  {
    id: "obj-caro",
    categoria: "objecion",
    claves: ["caro", "mucha plata", "no me alcanza", "presupuesto", "barato"],
    respuesta:
      `Cuesta menos que perder una licitación. Y por eso el plan gratis existe: pruébalo con tus propias licitaciones y decide después, sin poner tarjeta — [ábrelo acá](${APP_URL}).`,
  },
  {
    id: "obj-a-mano",
    categoria: "objecion",
    claves: ["a mano", "ya lo hago", "tengo a alguien", "excel", "yo reviso"],
    respuesta:
      "Perfecto — ¿cuántas horas a la semana se van en eso? Esa es exactamente la cuenta. No reemplazamos a quien decide: le sacamos de encima buscar y leer.",
  },
  {
    id: "obj-ia",
    categoria: "objecion",
    claves: ["confio", "confiar", "inventa", "alucina", "seguro", "error"],
    respuesta:
      "Lici cita la página exacta de las bases de donde sacó cada cosa. Puedes ir a verificarla en dos clics. No te pide fe.",
  },
  {
    id: "obj-no-gano",
    categoria: "objecion",
    claves: ["no gano", "nunca gano", "no me adjudican", "pierdo"],
    respuesta:
      "Es lo más común, y casi siempre es una de dos: llegas tarde o postulas a lo que no te calza. Lo primero lo arreglan las alertas; lo segundo, el score que te dice cuáles valen la pena. Y si pierdes por precio, ahí entra el historial de adjudicaciones.",
  },
  {
    id: "obj-nunca-licite",
    categoria: "objecion",
    claves: ["nunca he licitado", "no entiendo", "no entiendo nada", "no se de licitaciones", "primera vez", "complicado", "novato", "recien empiezo"],
    respuesta:
      `No necesitas saber de licitaciones. Traes tu RUT, te mostramos lo que calza contigo y Lici te explica en castellano qué pide cada una. Partir por el plan gratis es la forma barata de ver si hay mercado para lo tuyo — [pruébalo](${APP_URL}).`,
  },
];

/* ── El cerebro provisorio ─────────────────────────────────────
   Empareja la pregunta contra las claves. En la Fase 5 esta función
   se reemplaza por una llamada a la edge function, que consulta la
   tabla y responde con el modelo. La interfaz no cambia. */

const normalizar = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s]/g, " ");

/* Guardrail — «analízame esta licitación».

   Lici web NO analiza licitaciones: no tiene los datos ni debe
   tenerlos. Se detecta ANTES del modelo, así que no cuesta ni un
   token y no depende de que el prompt se porte bien.

   Formato de ChileCompra: 1234567-89-LP25 / 5678-12-COT26. */
const ID_LICITACION = /\b\d{3,7}\s*-\s*\d{1,4}\s*-\s*[A-Za-z]{2,3}\d{2}\b/;

export const RECONDUCCION_ANALISIS =
  "Eso lo hace Lici **dentro de la app**, con esa licitación abierta: se lee las bases enteras, te dice qué piden y te cita la página exacta. Acá afuera solo te cuento cómo funciona. Con el plan gratis lo pruebas con una licitación tuya, sin tarjeta.";

/* Guardrail — «dame datos del mercado».

   Quién gana, cuánto se adjudicó, cuánto vende un proveedor: eso es
   el producto, no la vitrina. Se detecta antes del modelo. */
const PIDE_DATOS =
  /\b(quien(es)?\s+(gana|ganan|gano|ganaron|adjudic\w+|vende|venden|es\s+el\s+proveedor)|cuanto\s+(vend\w+|factur\w+|se\s+adjudic\w+|gan\w+|pag\w+\s+el\s+estado)|monto[s]?\s+(de|del|adjudicad\w+)|ranking\s+de\s+proveedores|lista\s+de\s+proveedores|competidor(es)?\s+de)\b/i;

export const RECONDUCCION_DATOS =
  "Esos números son justamente el producto: quién compra, quién compite y a cuánto se adjudicó lo tuyo. Se ven **dentro de la app**, cruzados con tu RUT — acá afuera no te los puedo dar. El plan gratis te deja mirarlos sin tarjeta.";

/* Guardrail — «cómo se configura» / «no me funciona».

   Ojo con el borde: «¿cómo funciona?» es una pregunta de venta
   legítima y NO debe caer acá. Lo que se ataca es el paso a paso
   («dónde hago clic», «cómo activo») y el soporte («no me llega»). */
const PIDE_SOPORTE =
  /\b(como\s+(configur\w+|activ\w+|desactiv\w+|conect\w+|instal\w+|cambio|cambiar|edito|editar|agrego|agregar|borro|elimin\w+|cancel\w+)|donde\s+(configur\w+|activ\w+|est[aá]\s+el\s+bot[oó]n|hago\s+clic|se\s+cambia|encuentro)|paso\s+a\s+paso|tutorial|no\s+me\s+(llega|lleg[oó]|funciona|deja|carga|aparece)|no\s+funciona|me\s+da\s+error|olvid[eé]\s+mi\s+(clave|contrase))/i;

export const RECONDUCCION_SOPORTE =
  "Eso te lo enseña **Lici dentro de la app** — sí, la misma, pero adentro tiene tus datos y te responde con tu caso, no con un manual. Acá afuera te cuento qué hace y por qué te conviene; adentro te acompaña de verdad. El plan gratis parte sin tarjeta. Y si ya eres cliente y algo no anda, escríbenos: [contactar](/contacto).";

/* Guardrail — «quiénes son sus clientes».

   Ni nombres, ni cantidad, ni rubros, ni casos de éxito. */
const PIDE_CLIENTES =
  /\b(qui[eé]n(es)?\s+(son\s+)?(sus|tus|los)\s+clientes|cu[aá]ntos\s+(clientes|usuarios|empresas)\s+(tienen|tienes|hay|usan)|qui[eé]n(es)?\s+(la\s+)?(usa|usan|los\s+usa)|casos?\s+de\s+[eé]xito|referencias?\s+de\s+clientes|con\s+qui[eé]n(es)?\s+trabajan|empresas?\s+que\s+(usan|los\s+usan|trabajan\s+con)|qu[eé]\s+(empresas?|clientes?)\s+(usan?|tienen|trabajan)|nombre\s+de\s+(alg[uú]n|un)\s+cliente)/i;

export const RECONDUCCION_CLIENTES =
  "De nuestros clientes no hablo — ni quiénes son ni cuántos. Es lo mismo que haría contigo si fueras uno: tu información es tuya. Lo que sí puedo hacer es que lo veas por ti mismo, con tu propio RUT y gratis.";

export const SIN_RESPUESTA =
  "Esa no te la sé responder bien desde acá — y prefiero no inventarte nada. Te la responde alguien del equipo en la misma llamada en que te mostramos la plataforma con tus licitaciones: [pedir una reunión](/contacto).";

export function responder(pregunta: string): string {
  // Los guardrails van primero: ni siquiera se busca en las fichas.
  if (ID_LICITACION.test(pregunta)) return RECONDUCCION_ANALISIS;
  if (PIDE_DATOS.test(pregunta)) return RECONDUCCION_DATOS;
  if (PIDE_SOPORTE.test(pregunta)) return RECONDUCCION_SOPORTE;
  if (PIDE_CLIENTES.test(pregunta)) return RECONDUCCION_CLIENTES;

  // Se compara por PALABRAS COMPLETAS. Con subcadenas, la clave
  // "lici" se activaba dentro de "licitacion" y "licitalab", y esa
  // ficha secuestraba media conversación.
  const q = ` ${normalizar(pregunta)} `;
  const tiene = (frase: string) => q.includes(` ${frase} `);

  let mejor: { ficha: Ficha; puntaje: number } | null = null;

  for (const ficha of FICHAS) {
    let puntaje = 0;
    for (const clave of ficha.claves) {
      const c = normalizar(clave).trim();
      const palabras = c.split(/\s+/);
      if (tiene(c)) {
        puntaje += palabras.length * 3; // la frase entera vale más
      } else if (palabras.length > 1 && palabras.every((p) => tiene(p))) {
        puntaje += palabras.length; // todas sueltas, en cualquier orden
      }
    }
    if (puntaje > 0 && (!mejor || puntaje > mejor.puntaje))
      mejor = { ficha, puntaje };
  }

  return mejor ? mejor.ficha.respuesta : SIN_RESPUESTA;
}
