// Single source of truth for WhatsApp CTA.
// Replace WA_NUMBER with the production number when confirmed.
export const WA_NUMBER = "56912345678";

export const buildWAUrl = (msg: string) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

// El sitio ofrece prueba gratis, no una demo agendada: el mensaje
// que llega por WhatsApp dice lo mismo que el botón.
export const MSG_PRUEBA =
  "Hola, vi IAutoLicita y quiero probarlo gratis con mis licitaciones.";

export const MSG_INFO =
  "Hola, me interesa más información sobre IAutoLicita y los planes disponibles.";
