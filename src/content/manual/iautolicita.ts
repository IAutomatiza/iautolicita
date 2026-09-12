/* GENERADO — no editar a mano.

   Lo escribe `build/exportar.mjs` del Manual de Funcionamiento, en
   …/Clientes/Iautolicita/Manual de Funcionamiento/, leyendo indice.json + fichas/.
   Generado el 2026-09-12 · app `679d910` · relevado el 2026-09-11.

   Para cambiar un texto, reordenar una pestaña o agregar una pantalla: se edita
   el índice allá y se corre `node build/exportar.mjs`. Editar este archivo a mano
   lo deja distinto del manual en PDF y del de la web, y el próximo export lo pisa.

   Las capturas viajan aparte, a public/manual/. */

export type SubPestanaManual = { label: string; que: string };

export type PantallaManual = {
  /** Slug del tab en la app (`?tab=<id>`). Es el ancla estable: los rótulos cambian. */
  id: string;
  label: string;
  grupo: string | null;
  grupoId: string;
  url: string;
  /** Nombre del ícono de lucide-react, el MISMO que dibuja el menú real. */
  icono: string;
  /** Pantalla de plan pagado. Se MUESTRA con su chip, nunca se esconde: vende. */
  gated: boolean;
  /** Qué módulo la desbloquea, tal como lo ve el cliente. */
  modulo: string | null;
  /** Orden dentro del recorrido del primer día. `null` = sólo en el manual completo. */
  caminoCorto: number | null;
  captura: string | null;
  capturadoEn: string | null;
  para: string;
  mirar: string[];
  hacer: string[];
  detalles: string;
  subpestanas: SubPestanaManual[];
};

export type GrupoManual = { id: string; label: string | null; pantallas: string[] };

export const MANUAL_META = {
  producto: "IAutoLicita",
  basePath: "/mercado-publico",
  versionApp: "679d910",
  relevadoEn: "2026-09-11",
} as const;

/** La lámina del menú. Se DIBUJA desde estos datos, nunca de una captura:
    la captura del sidebar sale con el menú de admin, que no es el del cliente. */
export const MANUAL_LAMINA_MENU = {
  "titulo": "Dónde está cada cosa",
  "lead": "Todo lo que hace IAutoLícita está en la barra de la izquierda. Ésta es la regla que la ordena: **si es del mercado, va en Oportunidades; si ya es tuyo, va en Mi gestión.**",
  "eyebrow": "Tu menú",
  "mirar": [
    "Arriba, el **selector de tu empresa**: si tienes más de una, cambias ahí.",
    "**Oportunidades** es el mercado abierto: lo que el Estado publicó y todavía no es de nadie.",
    "**Mi gestión** es lo tuyo: lo que seguiste, tus fechas, tus órdenes y tu historia.",
    "**Inteligencia de Mercado** es para entender el terreno: quién vende, quién compra y a qué precio.",
    "Los ítems en gris con {Pro} son de un plan superior; al pincharlos te muestran qué incluyen."
  ],
  "hacer": [
    "Empezar por **Mi búsqueda**: de eso depende todo lo que la app te va a mostrar.",
    "Pinchar **«** arriba para colapsar la barra y ganar pantalla.",
    "Preguntarle a **Lici.** cuando algo no se entienda: contesta en español desde cualquier pantalla."
  ]
} as const;

export const MANUAL_GRUPOS: GrupoManual[] = [
  {
    "id": "raiz",
    "label": "Lo esencial",
    "pantallas": [
      "inicio",
      "asistente"
    ]
  },
  {
    "id": "oportunidades",
    "label": "Oportunidades",
    "pantallas": [
      "perfil",
      "explorer",
      "cotizaciones"
    ]
  },
  {
    "id": "transversal",
    "label": "Al abrir una oportunidad",
    "pantallas": [
      "ficha-licitacion",
      "ficha-compra-agil",
      "lici-chat"
    ]
  },
  {
    "id": "mi-gestion",
    "label": "Mi gestión",
    "pantallas": [
      "oportunidades",
      "mis-compra-agil",
      "mis-oc",
      "calendario",
      "mi-360",
      "informe-mensual",
      "im-puerta",
      "postulaciones",
      "documentos",
      "subestados"
    ]
  },
  {
    "id": "inteligencia-mercado",
    "label": "Inteligencia de Mercado",
    "pantallas": [
      "im-mercado",
      "im-proveedor",
      "im-comprador",
      "im-productos",
      "im-rubro",
      "im-region",
      "im-pac",
      "im-convenio",
      "im-contratos"
    ]
  },
  {
    "id": "mi-catalogo",
    "label": "Mi catálogo",
    "pantallas": [
      "catalogo"
    ]
  },
  {
    "id": "cuenta",
    "label": "Cuenta",
    "pantallas": [
      "mi-cuenta",
      "suscripcion"
    ]
  }
];

export const MANUAL_PANTALLAS: PantallaManual[] = [
  {
    "id": "inicio",
    "label": "Inicio",
    "grupo": "Lo esencial",
    "grupoId": "raiz",
    "url": "/",
    "icono": "LayoutDashboard",
    "gated": false,
    "modulo": null,
    "caminoCorto": 4,
    "captura": "/manual/inicio.png",
    "capturadoEn": "2026-09-11",
    "para": "Tu resumen del día: cuánto hay abierto que te calza, qué cierra esta semana y qué todavía no miraste.",
    "mirar": [
      "El titular: **cuántas licitaciones y cuántas compras ágiles abiertas te calzan hoy**. Los dos botones azules te llevan directo a cada lista.",
      "«Cierran esta semana», partido por canal: lo que se te vence en días.",
      "**«Compradores que aún no te compran»**: organismos que hoy están publicando algo que te calza y con los que nunca has trabajado. Es la tarjeta que abre puertas nuevas.",
      "La fila de tu historia: órdenes de compra, ventas al Estado y organismos que te han comprado."
    ],
    "hacer": [
      "Pinchar **«Lo que calza y todavía no tocaste»**: es la lista corta de lo que deberías revisar hoy, ordenada por días que quedan.",
      "Entrar a cualquier fila para abrir la ficha completa."
    ],
    "detalles": "Si tu empresa es nueva y todavía no le vendió al Estado, Inicio se ve distinto: te muestra los **próximos pasos** para dejar la búsqueda configurada. Apenas hay historial por tu RUT, cambia solo a esta vista.",
    "subpestanas": []
  },
  {
    "id": "asistente",
    "label": "Lici.",
    "grupo": "Lo esencial",
    "grupoId": "raiz",
    "url": "/asistente",
    "icono": "Sparkles",
    "gated": false,
    "modulo": null,
    "caminoCorto": 10,
    "captura": "/manual/asistente.png",
    "capturadoEn": "2026-09-11",
    "para": "Tu asistente. Le preguntas en español sobre una licitación o sus bases y te contesta con los documentos a la vista.",
    "mirar": [
      "El historial de conversaciones: cada licitación que revisaste con Lici queda guardada para retomarla.",
      "Los accesos «Explorar licitaciones» y «Ver Compra Ágil» cuando todavía no hay conversaciones."
    ],
    "hacer": [
      "Abrir una licitación y preguntarle «¿qué garantías piden?» o «¿qué documentos necesito?». La burbuja azul de abajo a la derecha abre a Lici desde cualquier pantalla."
    ],
    "detalles": "",
    "subpestanas": []
  },
  {
    "id": "perfil",
    "label": "Mi búsqueda",
    "grupo": "Oportunidades",
    "grupoId": "oportunidades",
    "url": "/mercado-publico?tab=perfil",
    "icono": "Radar",
    "gated": false,
    "modulo": null,
    "caminoCorto": 5,
    "captura": "/manual/perfil.png",
    "capturadoEn": "2026-09-11",
    "para": "Aquí le dices a IAutoLícita qué vendes. De esto depende todo lo que la app te va a mostrar.",
    "mirar": [
      "La barra de completitud arriba (ej. «10% · Incompleto») y la línea que dice exactamente qué falta y cuánto suma: «Sigue: elegir un producto del catálogo UNSPSC +20%».",
      "«Tu historial con el Estado»: si tu RUT ya vendió, la app lo detecta sola y precarga la búsqueda.",
      "Los datos de la organización (RUT, razón social, giro, región, comuna, industria, años en el mercado). Los que digan «No configurado» restan match."
    ],
    "hacer": [
      "Si aún no vendes al Estado: «Proponer mi búsqueda con IA» — indicas tu sitio web y la IA detecta tus productos y arma una propuesta que tú revisas.",
      "Usar «Probar config» para ver qué trae ANTES de guardar.",
      "Recorrer las 5 secciones: Qué vendes y dónde · Notificaciones (WhatsApp y correo) · Automatizaciones · Equipo del proyecto (quién puede preguntarle a Lici por WhatsApp) · Motor de match (cuánto pesa cada señal)."
    ],
    "detalles": "La barra de completitud cuenta campos llenos, **no mide si te van a llegar mejores licitaciones**. Un 100% no garantiza más resultados: lo que manda son tus palabras y tus productos.",
    "subpestanas": []
  },
  {
    "id": "explorer",
    "label": "Licitaciones",
    "grupo": "Oportunidades",
    "grupoId": "oportunidades",
    "url": "/mercado-publico?tab=explorer",
    "icono": "Search",
    "gated": false,
    "modulo": null,
    "caminoCorto": 6,
    "captura": "/manual/explorer.png",
    "capturadoEn": "2026-09-11",
    "para": "Todas las licitaciones abiertas de ChileCompra, filtradas para ti.",
    "mirar": [
      "Las 4 cifras de arriba: abiertas, nuevas en 24 h, cuántas cierran en 7 días y cuánta plata hay en juego (ojo: parte de las licitaciones no publica monto).",
      "«Vistas del sistema» a la izquierda: Total, Nuevas (24 h), Cerrando pronto, IA Relevantes, Mis Licitaciones.",
      "En la tabla: la columna RIESGO del comprador y CIERRA EN (rojo ≤3 días, ámbar ≤7)."
    ],
    "hacer": [
      "Filtrar y guardar el filtro como «Nueva Vista» para no rearmarlo cada día.",
      "Elegir qué columnas ver con «Columnas».",
      "Pinchar una fila abre la ficha completa; el botón **Seguir** la manda a Mis Licitaciones."
    ],
    "detalles": "El botón **Seguir** es lo que mueve una licitación a «Mis Licitaciones». Sin eso, no queda registrada en tu gestión.",
    "subpestanas": [
      {
        "label": "Total licitaciones",
        "que": "Todo lo abierto en ChileCompra ahora."
      },
      {
        "label": "Nuevas (24 h)",
        "que": "Lo publicado desde ayer — la revisión diaria."
      },
      {
        "label": "Cerrando pronto",
        "que": "Lo que vence dentro de 7 días."
      },
      {
        "label": "IA Relevantes",
        "que": "Lo que calza con tu búsqueda, ordenado por match."
      },
      {
        "label": "Mis Licitaciones",
        "que": "Las que ya marcaste para seguir."
      },
      {
        "label": "Mis vistas",
        "que": "Tus propios filtros guardados, para no rearmarlos cada día."
      }
    ]
  },
  {
    "id": "cotizaciones",
    "label": "Compra Ágil",
    "grupo": "Oportunidades",
    "grupoId": "oportunidades",
    "url": "/mercado-publico?tab=cotizaciones",
    "icono": "Zap",
    "gated": false,
    "modulo": null,
    "caminoCorto": 7,
    "captura": "/manual/cotizaciones.png",
    "capturadoEn": "2026-09-11",
    "para": "Compras chicas donde el Estado pide cotización y resuelve en días. Aquí se vende rápido.",
    "mirar": [
      "Los 4 contadores: Total, Publicadas hoy, Cierran hoy, IA Relevantes. En Compra Ágil «Cierran hoy» suele ser la mayoría — los plazos son de días, no de semanas.",
      "La columna OFERTAS: cuántos competidores ya cotizaron. Una con 0 ofertas y cierre mañana es una oportunidad real.",
      "El monto: es el techo que el organismo declaró."
    ],
    "hacer": [
      "Abrir la cotización, revisar ítems y organismo, y **Seguir** para llevarla a Mis Compra Ágil."
    ],
    "detalles": "En Compra Ágil los plazos son de días, no de semanas: lo que cierra mañana hay que verlo hoy.",
    "subpestanas": [
      {
        "label": "Total Compra Ágil",
        "que": "Todas las cotizaciones abiertas."
      },
      {
        "label": "Publicadas hoy",
        "que": "Las que entraron hoy."
      },
      {
        "label": "Cierran hoy",
        "que": "Las que vencen en el día — en Compra Ágil suele ser la mayoría."
      },
      {
        "label": "IA Relevantes",
        "que": "Las que calzan con lo que vendes."
      }
    ]
  },
  {
    "id": "ficha-licitacion",
    "label": "Ficha de una licitación",
    "grupo": "Al abrir una oportunidad",
    "grupoId": "transversal",
    "url": "/mercado-publico?tab=explorer",
    "icono": "FileText",
    "gated": false,
    "modulo": null,
    "caminoCorto": null,
    "captura": "/manual/ficha-licitacion.png",
    "capturadoEn": "2026-09-11",
    "para": "Todo lo que necesitas saber de una licitación, sin salir de la app.",
    "mirar": [
      "El **plazo de cierre** y cuánto falta, arriba de todo: es lo que decide si alcanzas.",
      "Los **ítems que piden**, con cantidades y unidades.",
      "El **comprador y su riesgo**: cuánto se demora en pagar, cuántas licitaciones deja desiertas.",
      "Los **documentos y bases** adjuntos, para leerlos aquí mismo."
    ],
    "hacer": [
      "**Seguir** para llevarla a Mis Licitaciones y empezar a trabajarla.",
      "Abrir las bases y preguntarle a **Lici** lo que no se entienda.",
      "Asignarla a alguien de tu equipo y dejar notas."
    ],
    "detalles": "El trámite de postular se hace en mercadopublico.cl. Acá preparas la decisión y el equipo.",
    "subpestanas": [
      {
        "label": "Resumen",
        "que": "El titular de la decisión: monto, cierre, ítems, reclamos del organismo, tu calce y la probabilidad de ganar."
      },
      {
        "label": "Cronograma",
        "que": "Las fechas del proceso: cuándo se preguntan dudas, cuándo se responden, cuándo cierra."
      },
      {
        "label": "Ítems y cantidades",
        "que": "Qué piden exactamente y cuánto de cada cosa."
      },
      {
        "label": "Documentos y bases",
        "que": "Las bases y anexos del organismo, para leerlos aquí. Botón **«Preguntar a Lici»** para que te los explique."
      },
      {
        "label": "Q&A",
        "que": "El foro oficial de preguntas y respuestas del proceso, con «Preguntar a Lici» al lado."
      },
      {
        "label": "Criterios y garantías",
        "que": "Con qué te van a evaluar y qué garantía piden."
      },
      {
        "label": "Comentarios",
        "que": "Notas internas de tu equipo sobre esta licitación."
      },
      {
        "label": "Convocatorias similares",
        "que": "Otras licitaciones parecidas, para comparar precios y decidir."
      },
      {
        "label": "Competidores y compradores",
        "que": "Quiénes suelen presentarse acá y quién compra."
      },
      {
        "label": "Historial de precios",
        "que": "A qué precio se adjudicó esto antes."
      },
      {
        "label": "Evaluación comprador",
        "que": "Qué tan confiable es el organismo: cuánto tarda en pagar, cuántas deja desiertas."
      },
      {
        "label": "Datos de contacto",
        "que": "A quién preguntarle en el organismo."
      },
      {
        "label": "Información general",
        "que": "Los datos formales del proceso para tu postulación."
      },
      {
        "label": "Ítems (postulación)",
        "que": "Los ítems que vas a cotizar."
      },
      {
        "label": "Documentos de postulación",
        "que": "El checklist de lo que tienes que adjuntar."
      },
      {
        "label": "Estado y responsable",
        "que": "En qué etapa interna está y quién de tu equipo la lleva."
      },
      {
        "label": "Historial",
        "que": "Todo lo que pasó con esta licitación, en orden."
      }
    ]
  },
  {
    "id": "ficha-compra-agil",
    "label": "Ficha de una Compra Ágil",
    "grupo": "Al abrir una oportunidad",
    "grupoId": "transversal",
    "url": "/mercado-publico?tab=cotizaciones",
    "icono": "Zap",
    "gated": false,
    "modulo": null,
    "caminoCorto": null,
    "captura": "/manual/ficha-compra-agil.png",
    "capturadoEn": "2026-09-11",
    "para": "La cotización completa: qué piden, cuánto tienes de plazo y quiénes más están ofertando.",
    "mirar": [
      "El **plazo**: en Compra Ágil se cuenta en días, no en semanas.",
      "Los **productos solicitados** con su cantidad.",
      "**Cuántos oferentes** ya cotizaron: si hay pocos, tienes más chance.",
      "El **monto disponible** que declaró el organismo: es tu techo."
    ],
    "hacer": [
      "**Seguir** para llevarla a Mis Compra Ágil.",
      "Revisar los ítems antes de cotizar en el portal."
    ],
    "detalles": "Compra Ágil se resuelve rápido: lo que cierra mañana hay que decidirlo hoy.",
    "subpestanas": []
  },
  {
    "id": "lici-chat",
    "label": "Preguntarle a Lici",
    "grupo": "Al abrir una oportunidad",
    "grupoId": "transversal",
    "url": "/mercado-publico?tab=explorer",
    "icono": "MessageSquare",
    "gated": false,
    "modulo": null,
    "caminoCorto": null,
    "captura": "/manual/lici-chat.png",
    "capturadoEn": null,
    "para": "Tu asistente lee las bases por ti y te contesta en español.",
    "mirar": [
      "Que Lici responde **sobre esta licitación**: tiene las bases y los anexos cargados.",
      "Las respuestas citan de dónde salieron, para que puedas verificarlas."
    ],
    "hacer": [
      "Preguntarle lo que de verdad importa: «¿qué garantías piden?», «¿qué documentos necesito?», «¿puedo postular sin experiencia previa?».",
      "La burbuja azul de abajo a la derecha abre a Lici **desde cualquier pantalla**."
    ],
    "detalles": "Cada conversación queda guardada en **Lici.** para retomarla después.",
    "subpestanas": []
  },
  {
    "id": "oportunidades",
    "label": "Mis Licitaciones",
    "grupo": "Mi gestión",
    "grupoId": "mi-gestion",
    "url": "/mercado-publico?tab=oportunidades",
    "icono": "Bookmark",
    "gated": false,
    "modulo": null,
    "caminoCorto": 8,
    "captura": "/manual/oportunidades.png",
    "capturadoEn": "2026-09-11",
    "para": "Lo que seguiste, por etapa. Nada se pierde entre lo que viste y lo que postulaste.",
    "mirar": [
      "La barra de etapas con su conteo: Todas · Detectadas · Revisadas · En preparación · En evaluación · Sin resultado · Adjudicadas · No adjudicadas · Descartadas.",
      "«Adjudicadas» y «No adjudicadas» dicen «historial oficial»: salen de tu RUT en ChileCompra aunque no las hayas seguido en la app."
    ],
    "hacer": [
      "Mover cada licitación de etapa a medida que avanzas.",
      "Si está vacío, el botón «Ver Mercado Activo» te lleva al explorador."
    ],
    "detalles": "«Adjudicadas» y «No adjudicadas» salen de tu RUT en ChileCompra, así que aparecen **aunque nunca las hayas seguido en la app**.",
    "subpestanas": [
      {
        "label": "Todas",
        "que": "Todo lo que estás siguiendo."
      },
      {
        "label": "Detectadas",
        "que": "Recién aparecieron y todavía no las miraste."
      },
      {
        "label": "Revisadas",
        "que": "Ya las leíste y decidiste seguirlas."
      },
      {
        "label": "En preparación",
        "que": "Estás armando la oferta."
      },
      {
        "label": "En evaluación",
        "que": "Ya postulaste y esperas resultado."
      },
      {
        "label": "Sin resultado",
        "que": "Se cerraron sin desenlace publicado."
      },
      {
        "label": "Adjudicadas",
        "que": "Las que ganaste — historial oficial por tu RUT."
      },
      {
        "label": "No adjudicadas",
        "que": "Las que ganó otro."
      },
      {
        "label": "Descartadas",
        "que": "Las que decidiste no seguir."
      }
    ]
  },
  {
    "id": "mis-compra-agil",
    "label": "Mis Compra Ágil",
    "grupo": "Mi gestión",
    "grupoId": "mi-gestion",
    "url": "/mercado-publico?tab=mis-compra-agil",
    "icono": "BookmarkCheck",
    "gated": false,
    "modulo": null,
    "caminoCorto": null,
    "captura": "/manual/mis-compra-agil.png",
    "capturadoEn": "2026-09-11",
    "para": "Las compras ágiles que decidiste seguir, ordenadas por etapa y con el resultado de cada una.",
    "mirar": [
      "La barra de etapas con su conteo: Todas · Detectadas · Revisadas · En preparación · En evaluación · Sin resultado · Adjudicadas · No adjudicadas · Descartadas.",
      "La columna **ESTADO**: Ganada o Perdida, con el desenlace real de cada cotización.",
      "El **SCORE**: cuánto calza cada una con lo que vendes.",
      "**MONTO DISPONIBLE**: el techo que declaró el organismo."
    ],
    "hacer": [
      "Cambiar la etapa de cada una a medida que avanzas.",
      "Filtrar por región, período o comprador.",
      "Pinchar el código para abrir la ficha de la cotización."
    ],
    "detalles": "",
    "subpestanas": []
  },
  {
    "id": "mis-oc",
    "label": "Mis OC",
    "grupo": "Mi gestión",
    "grupoId": "mi-gestion",
    "url": "/mercado-publico?tab=mis-oc",
    "icono": "ClipboardCheck",
    "gated": false,
    "modulo": null,
    "caminoCorto": null,
    "captura": "/manual/mis-oc.png",
    "capturadoEn": "2026-09-11",
    "para": "Las órdenes de compra que el Estado emitió a tu RUT, para que tu equipo sepa en qué va cada una.",
    "mirar": [
      "El total arriba: cuántas órdenes y cuánta plata, con IVA.",
      "Los filtros de estado: Todas · Enviadas a proveedor · Aceptadas · Recepción conforme · No aceptadas · Canceladas."
    ],
    "hacer": [
      "«Ingresar OC a mano» para las que no llegan por ChileCompra.",
      "«Descargar» para llevarte la planilla."
    ],
    "detalles": "La app **no reemplaza el trámite** en mercadopublico.cl: aceptar o rechazar una orden se sigue haciendo allá. Acá llevas el control interno de tu equipo.",
    "subpestanas": [
      {
        "label": "Todas",
        "que": "Todas las órdenes emitidas a tu RUT."
      },
      {
        "label": "Enviadas a proveedor",
        "que": "Te llegaron y aún no las aceptas."
      },
      {
        "label": "Aceptadas",
        "que": "Ya las aceptaste."
      },
      {
        "label": "Recepción conforme",
        "que": "El organismo recibió conforme — es el paso previo al pago."
      },
      {
        "label": "No aceptadas",
        "que": "Las que rechazaste o dejaste vencer."
      },
      {
        "label": "Canceladas",
        "que": "Las que el organismo anuló."
      }
    ]
  },
  {
    "id": "calendario",
    "label": "Calendario",
    "grupo": "Mi gestión",
    "grupoId": "mi-gestion",
    "url": "/mercado-publico?tab=calendario",
    "icono": "CalendarDays",
    "gated": false,
    "modulo": null,
    "caminoCorto": 9,
    "captura": "/manual/calendario.png",
    "capturadoEn": "2026-09-11",
    "para": "Tus fechas en un mes: cierres de licitación, aperturas de oferta y cierres de Compra Ágil.",
    "mirar": [
      "Las tarjetas de arriba: CIERRAN HOY · CIERRAN EN ≤3 DÍAS · COMPRA ÁGIL.",
      "Los puntos de color en la grilla y su leyenda.",
      "La frase que ordena la pantalla: «el calendario cuenta; la tabla detalla»."
    ],
    "hacer": [
      "Filtrar por canal, hito, período, región y monto.",
      "Pinchar un día abre el detalle de esa fecha."
    ],
    "detalles": "",
    "subpestanas": []
  },
  {
    "id": "mi-360",
    "label": "Mi Empresa 360°",
    "grupo": "Mi gestión",
    "grupoId": "mi-gestion",
    "url": "/mercado-publico?tab=mi-360",
    "icono": "Building2",
    "gated": false,
    "modulo": null,
    "caminoCorto": 3,
    "captura": "/manual/mi-360.png",
    "capturadoEn": "2026-09-11",
    "para": "Tu historia como proveedor del Estado, con cifras que cuadran: cuánto vendiste, a quién, qué productos y qué ganaste.",
    "mirar": [
      "El titular: ventas ejecutadas (OC), cuántas órdenes y cuántos organismos, con IVA.",
      "Las pestañas: Órdenes de compra · Adjudicadas · No adjudicadas · En evaluación · Sin resultado · No postuladas · Comparar · Productos · Compradores.",
      "«Salud comercial»: dependencia del top cliente, clientes nuevos y clientes perdidos en 12 meses con la plata en juego."
    ],
    "hacer": [
      "Cambiar el período (por defecto últimos 3 meses).",
      "«Exportar PDF» para el informe.",
      "Cuando un número de otra pantalla no calce, la referencia es ésta."
    ],
    "detalles": "Si un número de otra pantalla no te calza, **la referencia es ésta**. Es la única cuadrada contra lo que el Estado efectivamente pagó.",
    "subpestanas": [
      {
        "label": "Órdenes de compra",
        "que": "Lo que el Estado te pagó de verdad. Es la pestaña base: todo lo demás se compara contra ésta."
      },
      {
        "label": "Adjudicadas",
        "que": "Las licitaciones que ganaste, salgan o no de la app: se detectan por tu RUT en ChileCompra."
      },
      {
        "label": "No adjudicadas",
        "que": "Dónde ofertaste y ganó otro. Trae quién ganó y con cuánto, para saber por cuánto se te fue."
      },
      {
        "label": "En evaluación",
        "que": "Lo presentado que todavía no se resuelve."
      },
      {
        "label": "Sin resultado",
        "que": "Procesos que quedaron sin desenlace publicado."
      },
      {
        "label": "No postuladas",
        "que": "Lo que calzaba contigo y dejaste pasar. Es la pestaña que muestra el costo de no postular."
      },
      {
        "label": "Comparar",
        "que": "Te pone al lado de un competidor, en las mismas cifras."
      },
      {
        "label": "Productos",
        "que": "Qué le vendiste al Estado, con el detalle de producto de cada orden."
      },
      {
        "label": "Compradores",
        "que": "Qué organismos te compran y cuánto pesa cada uno."
      }
    ]
  },
  {
    "id": "informe-mensual",
    "label": "Informe mensual",
    "grupo": "Mi gestión",
    "grupoId": "mi-gestion",
    "url": "/mercado-publico?tab=informe-mensual",
    "icono": "FileBarChart",
    "gated": false,
    "modulo": null,
    "caminoCorto": null,
    "captura": "/manual/informe-mensual.png",
    "capturadoEn": "2026-09-11",
    "para": "Un informe mensual, guardado tal como se emitió, de lo que el Estado le compró a tu empresa.",
    "mirar": [
      "El estado de cada mes: PROVISORIO (día 1) o definitivo (día 10).",
      "Que cada versión queda archivada: el informe de agosto no se reescribe cuando cambian los datos."
    ],
    "hacer": [
      "Elegir un mes de la lista para abrirlo."
    ],
    "detalles": "Cada versión queda archivada tal como se emitió: el informe de un mes no se reescribe si después cambian los datos.",
    "subpestanas": []
  },
  {
    "id": "im-puerta",
    "label": "Mi mercado",
    "grupo": "Mi gestión",
    "grupoId": "mi-gestion",
    "url": "/mercado-publico?tab=im-puerta",
    "icono": "Target",
    "gated": true,
    "modulo": "Inteligencia de Mercado avanzada",
    "caminoCorto": null,
    "captura": "/manual/im-puerta.png",
    "capturadoEn": "2026-09-06",
    "para": "Cuánto se mueve en los mercados donde tú ya vendes, y qué porcentaje de cada uno es tuyo.",
    "mirar": [
      "**«Tu mercado hoy»**: sale solo de tus órdenes de compra, sin que tengas que decir qué vendes.",
      "Por cada categoría: el **tamaño del mercado**, cuánto vendiste tú y **«tu parte»** en porcentaje. Ahí se ve cuánto espacio queda por tomar.",
      "Si el mercado está **repartido** o se lo lleva un solo comprador: eso decide si vale la pena entrar.",
      "Cuántos proveedores compiten en cada categoría."
    ],
    "hacer": [
      "Recorrer las categorías y quedarte con las de mercado grande y tu parte chica: ahí está lo que puedes crecer.",
      "Si vendes algo que todavía no le has vendido al Estado, escribirlo en el buscador **en palabras normales** («papel higiénico», «guardias de seguridad») y ver si existe mercado."
    ],
    "detalles": "Empieza por aquí: el resto de Inteligencia de Mercado da por sabido en qué categoría del Estado caes, y **casi nadie lo sabe**. Ésta es la única pantalla que entiende lenguaje normal.",
    "subpestanas": []
  },
  {
    "id": "postulaciones",
    "label": "Cotizaciones y propuestas",
    "grupo": "Mi gestión",
    "grupoId": "mi-gestion",
    "url": "/mercado-publico?tab=postulaciones",
    "icono": "Send",
    "gated": true,
    "modulo": "Gestor de Propuestas",
    "caminoCorto": null,
    "captura": "/manual/postulaciones.png",
    "capturadoEn": "2026-09-11",
    "para": "Todo lo que presentaste a Mercado Público, con tu tasa de éxito.",
    "mirar": [
      "El titular: cuántas postulaciones, cuántas adjudicadas y tu win-rate.",
      "«Rendimiento por canal»: si ganas más en licitación o en Compra Ágil.",
      "Las columnas PROCESO · COMPRADOR · OFERTADO · VENDIDO: la diferencia entre lo que ofertaste y lo que efectivamente vendiste."
    ],
    "hacer": [
      "«Nueva postulación» para armar una desde cero.",
      "Filtrar por Todas · Adjudicadas · No adjudicadas · En evaluación."
    ],
    "detalles": "Sale de la misma fuente que Mi Empresa 360°, así que los dos números siempre coinciden.",
    "subpestanas": [
      {
        "label": "Todas",
        "que": "Todo lo que presentaste."
      },
      {
        "label": "Adjudicadas",
        "que": "Lo que ganaste."
      },
      {
        "label": "No adjudicadas",
        "que": "Lo que perdiste."
      },
      {
        "label": "En evaluación",
        "que": "Lo que sigue abierto."
      }
    ]
  },
  {
    "id": "documentos",
    "label": "Documentos",
    "grupo": "Mi gestión",
    "grupoId": "mi-gestion",
    "url": "/mercado-publico?tab=documentos",
    "icono": "FileText",
    "gated": true,
    "modulo": "Gestor de Propuestas",
    "caminoCorto": null,
    "captura": "/manual/documentos.png",
    "capturadoEn": "2026-09-11",
    "para": "Tus certificados y documentos, con aviso antes de que venzan.",
    "mirar": [
      "La lectura rápida: cuántos de los 8 documentos estándar están vigentes y cuántos faltan por cargar.",
      "El estado «Por vencer»: se marca 30 días antes."
    ],
    "hacer": [
      "Cargar los que faltan del checklist.",
      "Usar «Otros documentos» para lo que no es estándar."
    ],
    "detalles": "Los certificados con fecha se marcan «Por vencer» 30 días antes, para que no descubras el vencimiento el día que postulas.",
    "subpestanas": []
  },
  {
    "id": "subestados",
    "label": "Estados",
    "grupo": "Mi gestión",
    "grupoId": "mi-gestion",
    "url": "/mercado-publico?tab=subestados",
    "icono": "Workflow",
    "gated": true,
    "modulo": "Gestor de Propuestas",
    "caminoCorto": null,
    "captura": "/manual/subestados.png",
    "capturadoEn": "2026-09-11",
    "para": "Las etapas con las que tu equipo trabaja internamente cada licitación.",
    "mirar": [
      "Que son estados INTERNOS: no cambian nada en ChileCompra."
    ],
    "hacer": [
      "«Crear estados predeterminados» si recién partes.",
      "«Nuevo estado» para los tuyos."
    ],
    "detalles": "Son estados **internos de tu equipo**: no cambian nada en ChileCompra.",
    "subpestanas": []
  },
  {
    "id": "im-mercado",
    "label": "Mercado",
    "grupo": "Inteligencia de Mercado",
    "grupoId": "inteligencia-mercado",
    "url": "/mercado-publico?tab=im-mercado",
    "icono": "BarChart2",
    "gated": false,
    "modulo": null,
    "caminoCorto": null,
    "captura": "/manual/im-mercado.png",
    "capturadoEn": "2026-09-11",
    "para": "El mapa completo del gasto del Estado, para ubicarte en el total.",
    "mirar": [
      "El titular: cuánto gastó el Estado y en cuántas órdenes, desde junio 2024. Es monto bruto (incluye IVA).",
      "Las 6 vistas: Panorama · Rubros · Regiones · Canales · Compradores · Proveedores."
    ],
    "hacer": [
      "Cambiar de vista con las pestañas.",
      "«Exportar PDF»."
    ],
    "detalles": "Es la cifra ancla del país: todas las demás pantallas cuadran contra ésta.",
    "subpestanas": [
      {
        "label": "Panorama",
        "que": "El titular del país y cómo se mueve mes a mes."
      },
      {
        "label": "Rubros",
        "que": "Qué se compra."
      },
      {
        "label": "Regiones",
        "que": "Dónde se compra."
      },
      {
        "label": "Canales",
        "que": "Por qué vía se compra (licitación, Compra Ágil, trato directo, convenio marco)."
      },
      {
        "label": "Compradores",
        "que": "Quiénes son los que más gastan."
      },
      {
        "label": "Proveedores",
        "que": "Quiénes son los que más venden."
      }
    ]
  },
  {
    "id": "im-proveedor",
    "label": "Proveedor",
    "grupo": "Inteligencia de Mercado",
    "grupoId": "inteligencia-mercado",
    "url": "/mercado-publico?tab=im-proveedor",
    "icono": "Truck",
    "gated": false,
    "modulo": null,
    "caminoCorto": 1,
    "captura": "/manual/im-proveedor.png",
    "capturadoEn": "2026-09-11",
    "para": "La radiografía completa de cualquier proveedor del Estado: la tuya, o la de quien te está ganando.",
    "mirar": [
      "**Ventas ejecutadas**, no adjudicadas: es lo que el Estado efectivamente pagó, repartido por canal (licitación, Compra Ágil, trato directo, convenio marco) y por año.",
      "**Top compradores**: a qué organismos les vende de verdad, y cuánto pesa cada uno.",
      "**Rubros y productos**: qué vende exactamente, con el detalle de producto de cada orden.",
      "**Competidores reales**: quién compite en sus mismos productos — no una lista genérica del rubro.",
      "**Head-to-head**: el récord contra cada rival, cuántas veces le ganaste y cuántas te ganó.",
      "**Market share por rubro**: cuánto del rubro se lleva."
    ],
    "hacer": [
      "Buscar por nombre o RUT. El buscador muestra el tamaño de cada candidato antes de entrar.",
      "Acotar con los filtros: canal, región, período (por defecto últimos 3 meses) y estado de la OC.",
      "Cambiar de vista con las pestañas: Órdenes de compra · Adjudicadas · No adjudicadas · En evaluación · Sin resultado · No postuladas · Productos · Compradores.",
      "**⚔ Comparar** para ponerte al lado de un competidor.",
      "**Exportar PDF** o **Descargar** para llevártelo."
    ],
    "detalles": "Busca el RUT **sin puntos**. Con puntos puede no encontrar nada.",
    "subpestanas": [
      {
        "label": "Órdenes de compra",
        "que": "Ventas ejecutadas del proveedor que estás mirando."
      },
      {
        "label": "Adjudicadas / No adjudicadas",
        "que": "Su historial de licitaciones ganadas y perdidas."
      },
      {
        "label": "En evaluación · Sin resultado · No postuladas",
        "que": "El resto de su embudo."
      },
      {
        "label": "Comparar",
        "que": "Ponerte al lado de él en las mismas cifras."
      },
      {
        "label": "Productos",
        "que": "Qué vende exactamente."
      },
      {
        "label": "Compradores",
        "que": "A qué organismos les vende."
      }
    ]
  },
  {
    "id": "im-comprador",
    "label": "Comprador",
    "grupo": "Inteligencia de Mercado",
    "grupoId": "inteligencia-mercado",
    "url": "/mercado-publico?tab=im-comprador",
    "icono": "Landmark",
    "gated": false,
    "modulo": null,
    "caminoCorto": 2,
    "captura": "/manual/im-comprador.png",
    "capturadoEn": "2026-09-11",
    "para": "La radiografía de un organismo comprador antes de decidir si le vendes.",
    "mirar": [
      "Cuánto gasta (cuadra al peso), a quién le compra, reclamos, **apertura a proveedores nuevos** y su plan de compras."
    ],
    "hacer": [
      "Buscar el organismo por nombre o código."
    ],
    "detalles": "El índice de reclamos es **del organismo**, no de una licitación puntual: te dice con quién es más fácil o más difícil trabajar.",
    "subpestanas": [
      {
        "label": "Gasto ejecutado (OC)",
        "que": "Cuánto gastó de verdad, repartido por canal."
      },
      {
        "label": "Sus licitaciones",
        "que": "Todo lo que publicó, con cuántas terminaron desiertas."
      },
      {
        "label": "Adjudicadas",
        "que": "A quién se las dio."
      },
      {
        "label": "Desiertas",
        "que": "Las que nadie ganó — son la puerta de entrada más barata."
      },
      {
        "label": "En curso ahora",
        "que": "Lo que tiene abierto en este momento."
      },
      {
        "label": "En evaluación",
        "que": "Lo que está resolviendo."
      },
      {
        "label": "Reclamos & tiempos",
        "que": "Cuántos reclamos acumula y cuánto se demora en pagar."
      }
    ]
  },
  {
    "id": "im-productos",
    "label": "Productos",
    "grupo": "Inteligencia de Mercado",
    "grupoId": "inteligencia-mercado",
    "url": "/mercado-publico?tab=im-productos",
    "icono": "Boxes",
    "gated": false,
    "modulo": null,
    "caminoCorto": null,
    "captura": "/manual/im-productos.png",
    "capturadoEn": "2026-09-11",
    "para": "Cuánto se vende de un producto, a qué precio real y quién lo vende.",
    "mirar": [
      "El precio real en tres números: p25 / mediana / p75. No un promedio.",
      "El sobreprecio regional: el mismo producto no vale lo mismo en todas partes.",
      "Los dos modos de búsqueda: «Un producto» y «Por palabras»."
    ],
    "hacer": [
      "Escribir lo que vendes y elegir el producto de la lista."
    ],
    "detalles": "",
    "subpestanas": []
  },
  {
    "id": "im-rubro",
    "label": "Rubro",
    "grupo": "Inteligencia de Mercado",
    "grupoId": "inteligencia-mercado",
    "url": "/mercado-publico?tab=im-rubro",
    "icono": "Tag",
    "gated": false,
    "modulo": null,
    "caminoCorto": null,
    "captura": "/manual/im-rubro.png",
    "capturadoEn": "2026-09-11",
    "para": "Cómo se mueve un rubro completo: si crece, por dónde se compra y quién manda.",
    "mirar": [
      "Evolución, canal de compra, quiénes venden, quiénes compran, productos top y regiones."
    ],
    "hacer": [
      "Elegir el rubro desde el buscador."
    ],
    "detalles": "Este buscador usa los **nombres oficiales del Estado**, no los tuyos: «vestuario» no encuentra nada, hay que escribir «Ropa, Maletas y Productos de Aseo Personal». Si no aparece lo que vendes, prueba en **Mi mercado**, que sí entiende lenguaje normal.",
    "subpestanas": []
  },
  {
    "id": "im-region",
    "label": "Región",
    "grupo": "Inteligencia de Mercado",
    "grupoId": "inteligencia-mercado",
    "url": "/mercado-publico?tab=im-region",
    "icono": "MapPin",
    "gated": false,
    "modulo": null,
    "caminoCorto": null,
    "captura": "/manual/im-region.png",
    "capturadoEn": "2026-09-11",
    "para": "Cuánta plata se mueve en una región y quién la gasta.",
    "mirar": [
      "El gasto de la región cuadra al peso contra el titular del país.",
      "El reparto entre canales, los organismos compradores y los rubros."
    ],
    "hacer": [
      "Elegir la región."
    ],
    "detalles": "",
    "subpestanas": []
  },
  {
    "id": "im-pac",
    "label": "Plan de Compras",
    "grupo": "Inteligencia de Mercado",
    "grupoId": "inteligencia-mercado",
    "url": "/mercado-publico?tab=im-pac",
    "icono": "CalendarClock",
    "gated": true,
    "modulo": "Inteligencia de Mercado avanzada",
    "caminoCorto": null,
    "captura": null,
    "capturadoEn": null,
    "para": "El futuro declarado: lo que los organismos avisaron que van a comprar, antes de que salga la licitación.",
    "mirar": [
      "Las 4 cifras: plan declarado del año · ejecutado a la fecha · **pipeline restante** · instituciones.",
      "«El calendario del año — plan vs realidad»: cuánto de lo prometido se está cumpliendo.",
      "«Instituciones nuevas en el PAC» y «Quién acelera su plan»."
    ],
    "hacer": [
      "«Buscar demanda 2026» con condiciones (incluye / excluye).",
      "«Exportar PDF»."
    ],
    "detalles": "",
    "subpestanas": []
  },
  {
    "id": "im-convenio",
    "label": "Convenio Marco",
    "grupo": "Inteligencia de Mercado",
    "grupoId": "inteligencia-mercado",
    "url": "/mercado-publico?tab=im-convenio",
    "icono": "ScrollText",
    "gated": true,
    "modulo": "Inteligencia de Mercado avanzada",
    "caminoCorto": null,
    "captura": "/manual/im-convenio.png",
    "capturadoEn": "2026-09-11",
    "para": "Cuánto compra el Estado por catálogo, sin licitar, y quién vive de ese canal.",
    "mirar": [
      "El titular: cuánta plata, cuántas OC y cuántos convenios.",
      "«Quién vive del catálogo — y quién compra por él»."
    ],
    "hacer": [
      "Revisar los convenios más grandes y sus proveedores.",
      "«Exportar PDF»."
    ],
    "detalles": "",
    "subpestanas": []
  },
  {
    "id": "im-contratos",
    "label": "Término de contratos",
    "grupo": "Inteligencia de Mercado",
    "grupoId": "inteligencia-mercado",
    "url": "/mercado-publico?tab=im-contratos",
    "icono": "FileClock",
    "gated": true,
    "modulo": "Inteligencia de Mercado avanzada",
    "caminoCorto": null,
    "captura": "/manual/im-contratos.png",
    "capturadoEn": "2026-09-11",
    "para": "Los contratos que están por vencer: la re-licitación se ve venir con meses de anticipación.",
    "mirar": [
      "El titular: cuánta plata y cuántos contratos vencen en los próximos 90 días.",
      "«El calendario de vencimientos» y «Rubros con más plata en juego»."
    ],
    "hacer": [
      "Mover la ventana: 30 · 60 · 90 · 180 días · 1 año · Todos.",
      "Filtrar por rubro, región y «Solo suministro»."
    ],
    "detalles": "Un contrato que vence es una licitación que viene. Mirar los vencimientos a 90 o 180 días te da meses de ventaja sobre quien espera a que se publique.",
    "subpestanas": []
  },
  {
    "id": "catalogo",
    "label": "Catálogo de productos",
    "grupo": "Mi catálogo",
    "grupoId": "mi-catalogo",
    "url": "/mercado-publico?tab=catalogo",
    "icono": "Package",
    "gated": true,
    "modulo": "Gestor de Propuestas",
    "caminoCorto": null,
    "captura": "/manual/catalogo.png",
    "capturadoEn": "2026-09-11",
    "para": "Tu catálogo, conectado a las categorías con que compra el Estado.",
    "mirar": [
      "Los 3 contadores: total de productos, activos y categorías.",
      "«Asociar mi catálogo a Mercado Público»: vincular tus productos con las categorías oficiales es lo que mejora el match."
    ],
    "hacer": [
      "**«Traer desde mis órdenes de compra»**: si ya le vendiste al Estado, el catálogo se arma solo con lo que ya vendiste.",
      "«Nuevo producto» para cargar a mano.",
      "«Mapear productos pegados» para los que quedaron sin categoría."
    ],
    "detalles": "La vía rápida es **«Traer desde mis órdenes de compra»**: si ya le vendiste al Estado, tu catálogo se arma solo con lo que ya vendiste.",
    "subpestanas": []
  },
  {
    "id": "mi-cuenta",
    "label": "Mi cuenta",
    "grupo": "Cuenta",
    "grupoId": "cuenta",
    "url": "/settings?tab=cuenta",
    "icono": "UserCog",
    "gated": false,
    "modulo": null,
    "caminoCorto": null,
    "captura": "/manual/mi-cuenta.png",
    "capturadoEn": "2026-09-11",
    "para": "Tus datos, tu empresa y tu equipo, todo en una sola puerta.",
    "mirar": [
      "**Datos de mi empresa**: nombre, RUT, giro y representante legal. Varios de esos campos alimentan tu búsqueda, y el contador de arriba te dice cuántos llevas completos.",
      "**Mi equipo**: a quién invitaste y con qué permisos.",
      "**Ingreso y seguridad**: contraseña y verificación en dos pasos.",
      "**Cerrar sesión en todas partes**, si perdiste un equipo."
    ],
    "hacer": [
      "Completar los datos de la empresa: el representante legal es el que encabeza la declaración jurada que exige la ley.",
      "Invitar a tu equipo y elegir qué avisos recibe cada uno."
    ],
    "detalles": "Hasta hace poco esto estaba repartido entre «Mi cuenta» y «Organización y equipo». Ahora es una sola pantalla.",
    "subpestanas": []
  },
  {
    "id": "suscripcion",
    "label": "Suscripción",
    "grupo": "Cuenta",
    "grupoId": "cuenta",
    "url": "/billing",
    "icono": "CreditCard",
    "gated": false,
    "modulo": null,
    "caminoCorto": null,
    "captura": "/manual/suscripcion.png",
    "capturadoEn": "2026-09-11",
    "para": "Qué plan tienes, hasta cuándo, y cómo cambiarlo.",
    "mirar": [
      "«TU PLAN»: cuánto pagas, hasta cuándo tienes acceso y cuándo fue el último pago.",
      "El comparador Free / Pro / Max, con «Más acceso a Lici» como diferencia.",
      "El interruptor «Precio neto / Con IVA»."
    ],
    "hacer": [
      "Activar el cobro automático para no cortar el servicio.",
      "Contratar Pro o Max."
    ],
    "detalles": "Es la pantalla a la que llevan los candados del menú.",
    "subpestanas": []
  }
];

const porId = new Map(MANUAL_PANTALLAS.map((p) => [p.id, p]));
export const pantallaManual = (id: string) => porId.get(id) ?? null;

/** El recorrido del primer día, en orden. */
export const MANUAL_CAMINO: PantallaManual[] = [
  "im-proveedor",
  "im-comprador",
  "mi-360",
  "inicio",
  "perfil",
  "explorer",
  "cotizaciones",
  "oportunidades",
  "calendario",
  "asistente"
]
  .map((id) => porId.get(id)!)
  .filter(Boolean);

/** Pasos del recorrido = la lámina del menú + las pantallas. El número sale de acá
    y no se escribe a mano: si el recorrido crece, el copy de la invitación crece solo. */
export const MANUAL_PASOS = MANUAL_CAMINO.length + 1;

/** TODO el manual, grupo por grupo, para listar contenido. Incluye el grupo
    transversal («Al abrir una oportunidad»), que NO es un ítem del menú pero es
    donde el cliente pasa la mitad del tiempo: la ficha de una licitación, la de
    una Compra Ágil y preguntarle a Lici. Se llega pinchando una fila, no el
    sidebar — por eso no sale en la lámina del menú, y por eso hay que
    documentarlo igual: nadie lo va a encontrar leyendo la barra de la izquierda. */
export const MANUAL_SECCIONES: { id: string; label: string | null; pantallas: PantallaManual[] }[] =
  MANUAL_GRUPOS.map((g) => ({
    id: g.id,
    label: g.label,
    pantallas: g.pantallas.map((id) => porId.get(id)!).filter(Boolean),
  }));

/** Sólo lo que el cliente ve en su barra lateral. Es para DIBUJAR el menú:
    el grupo transversal queda fuera porque ahí no hay ítem que dibujar. */
export const MANUAL_MENU = MANUAL_SECCIONES.filter((g) => g.id !== 'transversal');
