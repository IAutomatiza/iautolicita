/* ════════════════════════════════════════════════════════════════
   El aviso de cookies y el permiso para medir (Consent Mode v2).

   Qué resuelve
   ────────────
   La política de privacidad dice que la persona puede aceptar o
   rechazar las cookies de medición, y hasta el 11-oct-2026 no había
   dónde hacerlo: Analytics y el píxel de Meta cargaban sin preguntar.

   Dónde vive cada mitad
   ─────────────────────
   · index.html  decide el permiso ANTES de que cargue nada: lee la
                 elección guardada y declara `gtag('consent','default')`
                 y `fbq('consent', …)`. Tiene que ir ahí porque esos
                 dos scripts corren antes que React.
   · este archivo guarda la elección y avisa el cambio a Google y a
                 Meta cuando la persona aprieta un botón.

   El modo (`window.IAL_COOKIES_MODO`, definido en index.html)
   ──────────────────────────────────────────────────────────
   · "aviso"    se mide salvo que la persona rechace.
   · "permiso"  no se mide hasta que la persona acepte.
   Se cambia en UN lugar: la primera línea del script de index.html.
═══════════════════════════════════════════════════════════════════ */

export const LLAVE_COOKIES = "ial_cookies";
export type EleccionCookies = "aceptadas" | "rechazadas";

/** Evento que abre de nuevo el aviso (lo dispara el enlace del pie). */
export const EVENTO_ABRIR_COOKIES = "cookies:abrir";

type Cola = (...args: unknown[]) => void;
const deVentana = (nombre: "gtag" | "fbq"): Cola | null => {
  if (typeof window === "undefined") return null;
  const f = (window as unknown as Record<string, unknown>)[nombre];
  return typeof f === "function" ? (f as Cola) : null;
};

/** Lo que la persona eligió, o null si todavía no elige. */
export function eleccionCookies(): EleccionCookies | null {
  try {
    const v = window.localStorage.getItem(LLAVE_COOKIES);
    return v === "aceptadas" || v === "rechazadas" ? v : null;
  } catch {
    return null; // navegación privada o almacenamiento bloqueado
  }
}

/** Guarda la elección y la avisa a Google (Consent Mode) y a Meta. */
export function elegirCookies(eleccion: EleccionCookies) {
  try {
    window.localStorage.setItem(LLAVE_COOKIES, eleccion);
  } catch {
    /* sin almacenamiento la elección vale para esta visita */
  }
  const valor = eleccion === "aceptadas" ? "granted" : "denied";
  deVentana("gtag")?.("consent", "update", {
    ad_storage: valor,
    ad_user_data: valor,
    ad_personalization: valor,
    analytics_storage: valor,
  });
  deVentana("fbq")?.("consent", eleccion === "aceptadas" ? "grant" : "revoke");
}
