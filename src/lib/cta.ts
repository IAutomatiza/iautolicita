/* Punto único de los CTA del sitio, y de su marca de rastreo.

   WhatsApp salió del sitio el 28-ago-2026 (decisión de Carlos): el
   número publicado era el placeholder `56912345678`, y el canal de
   conversación pasa a ser Lici.

   ── Por qué existe `enlaceApp` ──────────────────────────────────
   Hasta el 29-ago-2026 el ÚNICO enlace marcado era el del chat de
   Lici. Los otros ocho —los dos del menú, los dos del pie, el de
   planes, el del cierre del home, el del cierre de Lici y el de
   CtaButton— viajaban pelados. Con eso, alguien que llegaba por
   Google, leía el home y apretaba "Probar gratis" entraba a la app
   sin dejar rastro: del otro lado no había forma de saber que venía
   del sitio, y menos de qué anuncio.

   Eso rompe la medición justo donde importa —el registro es LA
   conversión— así que ahora todo enlace a la app pasa por acá. */

/** La app: donde se abre la cuenta gratis. */
export const APP_URL = "https://app.iautolicita.cl/login";

/** Dónde cae quien quiere hablar con alguien. */
export const RUTA_HABLAR = "/#contacto";

/** De dónde salió el clic. Es `utm_medium`: el lugar, no la página. */
export type OrigenCta =
  | "nav"          // menú de arriba
  | "nav_movil"    // menú desplegado en teléfono
  | "hero"         // primera pantalla del home
  | "cuerpo"       // botones dentro del contenido
  | "planes"       // tabla de precios
  | "cierre"       // último bloque de una página
  | "pie"          // footer
  | "login"        // "Iniciar sesión", no es registro
  | "glosario"     // páginas de glosario y guías
  | "chat";        // Lici

/**
 * Arma el enlace a la app con su marca puesta.
 *
 * `utm_source` separa las tres puertas de entrada que vamos a tener:
 * el sitio, el chat de Lici y —cuando exista— Google Ads. Sin esa
 * separación, en GA4 los registros de pago y los orgánicos caen en
 * el mismo montón y no se puede saber qué anuncio rinde.
 *
 * `sid` es la conversación de Lici: permite unir "preguntó esto" con
 * "se registró", que es lo único que dice si Lici vende o sólo
 * entretiene.
 */
export function enlaceApp(
  origen: OrigenCta,
  extra?: { sid?: string | null; campana?: string },
): string {
  const u = new URL(APP_URL);
  u.searchParams.set("utm_source", origen === "chat" ? "lici" : "sitio");
  u.searchParams.set("utm_medium", origen);
  if (extra?.campana) u.searchParams.set("utm_campaign", extra.campana);
  if (extra?.sid) u.searchParams.set("sid", extra.sid);
  return u.toString();
}
