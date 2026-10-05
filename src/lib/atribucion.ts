/* ════════════════════════════════════════════════════════════════
   De dónde vino la visita — y que no se pierda en el camino.

   El problema que resuelve
   ────────────────────────
   Alguien llega desde un anuncio con `?gclid=…&utm_source=google`,
   lee dos páginas y recién ahí pide reunión o aprieta «Probar». Para
   entonces la URL ya no trae nada: si no se guardó al llegar, el lead
   y el registro quedan como «directo» y Google Ads cuenta 0 aunque el
   anuncio haya funcionado (le pasó a SVEA el 28-sep-2026).

   Peor: los enlaces a la app ponían `utm_source=sitio` ENCIMA del
   origen real, así que un registro que venía de un anuncio quedaba
   atribuido al sitio.

   Cómo funciona
   ─────────────
   · `capturarAtribucion()` corre una vez por carga: si la URL trae
     gclid/gbraid/wbraid o algún utm_*, lo guarda (gana el último
     clic: un anuncio nuevo pisa uno viejo; una visita sin marcas NO
     borra la anterior). Vence a los 90 días, como la cookie de Ads.
   · `atribucion()` lo devuelve para el formulario y la app.
   · `conAtribucion(url)` le cuelga esos datos a un enlace a la app.

   Aguanta que no haya `window` (prerender) ni localStorage (modo
   privado, bloqueos): en esos casos simplemente no hay atribución.
═══════════════════════════════════════════════════════════════════ */

const CLAVE = "ial_atribucion";
const VIGENCIA_MS = 90 * 24 * 3600 * 1000;

/** Los identificadores de clic de Google Ads. gbraid/wbraid son los de iOS. */
const CLICS = ["gclid", "gbraid", "wbraid"] as const;
const UTMS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;

export type Atribucion = Partial<Record<(typeof CLICS)[number] | (typeof UTMS)[number], string>> & {
  /** Primera página donde aterrizó con estas marcas. */
  landing?: string;
  /** Cuándo se guardó (ms). */
  t?: number;
};

function leer(): Atribucion | null {
  try {
    const crudo = localStorage.getItem(CLAVE);
    if (!crudo) return null;
    const a = JSON.parse(crudo) as Atribucion;
    if (!a.t || Date.now() - a.t > VIGENCIA_MS) {
      localStorage.removeItem(CLAVE);
      return null;
    }
    return a;
  } catch {
    return null;
  }
}

/** Guarda las marcas de la URL actual, si las trae. */
export function capturarAtribucion() {
  if (typeof window === "undefined") return;
  const p = new URLSearchParams(window.location.search);
  const nueva: Atribucion = {};
  for (const k of [...CLICS, ...UTMS]) {
    const v = p.get(k);
    if (v) nueva[k] = v.slice(0, 300);
  }
  if (!Object.keys(nueva).length) return; // visita sin marcas: se conserva la anterior
  nueva.landing = window.location.pathname;
  nueva.t = Date.now();
  try {
    localStorage.setItem(CLAVE, JSON.stringify(nueva));
  } catch {
    /* sin almacenamiento: la atribución vive sólo en esta URL */
  }
}

/** La atribución vigente, o null si la visita no trae ninguna. */
export function atribucion(): Atribucion | null {
  if (typeof window === "undefined") return null;
  return leer();
}

/** ¿La visita vino de un anuncio de Google? */
export function vieneDeAnuncio(a = atribucion()): boolean {
  if (!a) return false;
  return Boolean(a.gclid || a.gbraid || a.wbraid) ||
    (a.utm_source === "google" && /^(cpc|ppc|paid)/.test(a.utm_medium ?? ""));
}

/**
 * Le cuelga la atribución a un enlace a la app.
 *
 * Si la visita trae origen propio (anuncio, campaña), ese origen
 * reemplaza al `utm_source=sitio` del enlace, y el lugar del sitio
 * donde se apretó pasa a `cta` para no perderlo. Si no trae nada, el
 * enlace queda tal cual (sitio / lici + el lugar).
 */
export function conAtribucion(href: string): string {
  const a = atribucion();
  if (!a) return href;
  let u: URL;
  try {
    u = new URL(href, window.location.origin);
  } catch {
    return href;
  }
  // Lo propio del sitio no se pierde: el lugar del clic va a `cta` y
  // la ficha del glosario (utm_campaign del enlace) a `termino`.
  const lugar = u.searchParams.get("utm_medium");
  const ficha = u.searchParams.get("utm_campaign");
  if (lugar && !u.searchParams.get("cta")) u.searchParams.set("cta", lugar);
  if (a.utm_source && ficha && !u.searchParams.get("termino")) u.searchParams.set("termino", ficha);
  for (const k of CLICS) if (a[k]) u.searchParams.set(k, a[k]!);
  if (a.utm_source) {
    for (const k of UTMS) {
      if (a[k]) u.searchParams.set(k, a[k]!);
      else u.searchParams.delete(k);
    }
  }
  return u.toString();
}
