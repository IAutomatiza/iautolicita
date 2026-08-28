/* Las preguntas frecuentes, en un solo lugar.

   Las usa la sección FAQ del home y también el dato estructurado
   `FAQPage` que se inyecta en el HTML al compilar. Si vivieran en
   dos partes, tarde o temprano dirían cosas distintas — y Google
   estaría mostrando la versión vieja. */

export type Faq = { q: string; a: string; ancla?: string };

export const FAQS: Faq[] = [
  {
    q: "¿De dónde salen los datos?",
    a: "De ChileCompra, completo: 441 mil licitaciones, 7,2 millones de adjudicaciones y 6,4 millones de órdenes de compra. Todo se actualiza solo, varias veces al día — cuando entras, ya está al día.",
  },
  {
    q: "¿Necesito instalar algo?",
    a: "Nada. Entras desde el navegador y listo. Con tu RUT basta: leemos lo que ya has ganado y tu perfil queda armado en un clic — qué vendes, dónde ganas y quién te compra.",
  },
  {
    q: "¿Qué los hace distintos?",
    a: "Que sabemos cuánto pagó el Estado de verdad por lo que tú vendes, no el presupuesto que dicen las bases. Con eso Lici te sugiere el precio para ganar, se lee las bases enteras y te muestra la página exacta donde dice cada cosa.",
  },
  {
    q: "¿Sirve para varias empresas?",
    a: "Sí. Manejas todos tus RUT desde una sola cuenta, cada uno con su equipo, sus alertas y su información separada. Sin pagar una cuenta por empresa.",
  },
  {
    q: "¿Y si no entiendo de licitaciones?",
    a: "Mejor todavía: le preguntas a Lici en tu idioma — “¿me conviene?”, “¿cuánto ofertar?” — y responde en simple, con las cifras al lado. La experiencia la pone ella.",
  },
  {
    q: "¿Se me puede pasar un cierre?",
    a: "Para eso está la app: vigila cada fecha, documento y riesgo de las licitaciones que sigues, y te avisa con días de anticipación — en la plataforma y, si quieres, también por WhatsApp o correo. Nadie tiene que acordarse de revisar.",
  },
  {
    // El enlace "Planes" de la nav apunta acá: es lo único que
    // el sitio dice hoy sobre planes y precios.
    q: "¿Cuánto cuesta?",
    a: "Hay un plan gratis para siempre, y los de pago parten en $79.000 + IVA al mes. Pagando el año se pagan 10 meses y se usan 12. Sin permanencia: cancelas cuando quieras. Los tienes todos en Planes, en el menú.",
  },
];
