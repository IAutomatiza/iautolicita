// Single source of truth for WhatsApp CTA.
// Replace WA_NUMBER with the production number when confirmed.
export const WA_NUMBER = "56912345678";

export const buildWAUrl = (msg: string) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

export const MSG_DEMO =
  "Hola, vi IAutoLicita y quiero agendar una demo del módulo de Mercado Público.";

export const MSG_INFO =
  "Hola, me interesa más información sobre IAutoLicita y los planes disponibles.";
