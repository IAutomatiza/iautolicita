/* Punto único de los CTA del sitio.

   WhatsApp salió del sitio el 28-ago-2026 (decisión de Carlos): el
   número que estaba publicado era el placeholder `56912345678`, y el
   canal de conversación pasa a ser Lici, no WhatsApp.

   Hasta que Lici viva en el sitio, "hablar" baja al cierre del home,
   que ya tiene su ancla `#contacto`. Cuando exista `/contacto` — y
   después el chat — se cambia acá y se mueve todo el sitio de una. */

/** La app: es donde se abre la cuenta gratis, sin tarjeta. */
export const APP_URL = "https://app.iautolicita.cl/login";

/** Dónde cae quien quiere hablar con alguien. Hoy, el cierre del home. */
export const RUTA_HABLAR = "/#contacto";
