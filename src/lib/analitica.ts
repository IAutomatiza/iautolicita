/* ════════════════════════════════════════════════════════════════
   La medición del sitio.

   Por qué existe este archivo y no gtag suelto por ahí
   ────────────────────────────────────────────────────
   Los eventos hay que dispararlos desde media docena de sitios
   distintos —el chat, el formulario, los botones a la app, la página
   de precios— y si cada uno llama a `gtag` a su manera, el día que
   haya que renombrar un evento o agregar un parámetro hay que salir
   a buscarlos por todo el código. Acá hay UNA función.

   Los cuatro eventos, y por qué esos
   ──────────────────────────────────
   · lead_formulario  → LA conversión: alguien pidió una reunión
   · clic_probar_app  → la otra conversión: se fue a registrarse
   · abrir_lici       → si el agente sirve o sólo adorna
   · ver_precios      → interés real, no curiosidad

   El segundo es el que cierra el círculo con el SEO: como todos los
   enlaces a la app ya viajan con `utm_campaign=<término>`, se puede
   saber QUÉ FICHA del glosario trajo cada registro. Sin eso,
   escribir 30 páginas más sería apostar a ciegas.

   Aguanta que no haya gtag
   ────────────────────────
   El prerenderizado corre en Node, sin `window`. Y un visitante con
   bloqueador de anuncios nunca carga gtag. En los dos casos esto
   tiene que ser un no-op silencioso: que falte la medición es
   molesto, que se caiga la página por eso sería absurdo.
═══════════════════════════════════════════════════════════════════ */

import { conAtribucion, vieneDeAnuncio } from "./atribucion";

export const GA_ID = "G-T6H147Q2TG";

type Gtag = (...args: unknown[]) => void;

function gtag(): Gtag | null {
  if (typeof window === "undefined") return null;
  const g = (window as unknown as { gtag?: Gtag }).gtag;
  return typeof g === "function" ? g : null;
}

/* ── Píxel de Meta ─────────────────────────────────────────────────
   El conjunto de datos «IAutoLicita» (1416157013940334) se inicia en
   index.html. Acá sólo se traducen nuestros eventos a los estándar de
   Meta, que son los que sus campañas saben optimizar:

   · clic_probar_app → Lead        (se fue a registrarse)
   · lead_formulario → Contact     (pidió una reunión)
   · ver_precios     → ViewContent (interés real)

   El registro mismo (CompleteRegistration) ocurre en la app, no en
   este sitio: ése se manda desde allá. Igual que con gtag, si el
   píxel no está (bloqueador, prerenderizado) esto no hace nada. */
export const PIXEL_ID = "1416157013940334";

type Fbq = (...args: unknown[]) => void;

function fbq(): Fbq | null {
  if (typeof window === "undefined") return null;
  const f = (window as unknown as { fbq?: Fbq }).fbq;
  return typeof f === "function" ? f : null;
}

const A_META: Record<string, string> = {
  clic_probar_app: "Lead",
  lead_formulario: "Contact",
  ver_precios: "ViewContent",
};

/** Un evento. Si no hay gtag ni píxel, no pasa nada. */
export function evento(nombre: string, datos?: Record<string, unknown>) {
  gtag()?.("event", nombre, datos ?? {});
  const estandar = A_META[nombre];
  if (estandar) fbq()?.("track", estandar, { content_name: nombre });
}

/**
 * Una vista de página.
 *
 * En un sitio de una sola página, el `config` de gtag manda la
 * primera vista y ninguna más: navegar de `/glosario` a una ficha no
 * recarga nada, así que Google creería que todos entran y se quedan
 * en la misma página. Hay que avisarle a mano en cada cambio de ruta.
 */
export function vistaPagina(ruta: string) {
  gtag()?.("event", "page_view", {
    page_path: ruta,
    page_location: typeof window !== "undefined" ? window.location.href : ruta,
    page_title: typeof document !== "undefined" ? document.title : undefined,
  });
  fbq()?.("track", "PageView");
}

/**
 * Escucha los clics hacia la app en todo el sitio, de una sola vez.
 *
 * La alternativa era ponerle `onClick` a los nueve enlaces repartidos
 * entre el menú, el pie, planes, los cierres y CtaButton. Uno nuevo
 * que alguien agregue mañana quedaría sin medir y nadie se enteraría.
 * Escuchando en el documento, cualquier enlace a la app queda medido
 * por el solo hecho de existir.
 *
 * Del propio enlace se leen el origen y la campaña, que ya vienen en
 * la URL: así el evento dice desde qué parte del sitio y desde qué
 * ficha del glosario se apretó.
 */
export function escucharClicsALaApp() {
  if (typeof document === "undefined") return;

  const alClic = (e: MouseEvent) => {
    const enlace = (e.target as HTMLElement | null)?.closest?.("a");
    if (!enlace) return;

    const href = enlace.getAttribute("href") ?? "";
    if (!href.includes("app.iautolicita.cl")) return;

    let medio: string | null = null;
    let campana: string | null = null;
    try {
      const u = new URL(href, window.location.origin);
      // `cta`/`termino` existen si el enlace ya pasó por conAtribucion
      // (segundo clic): ahí utm_* ya es el origen del anuncio.
      medio = u.searchParams.get("cta") ?? u.searchParams.get("utm_medium");
      campana = u.searchParams.get("termino") ?? u.searchParams.get("utm_campaign");
    } catch {
      /* href raro: se mide igual, sin el detalle */
    }

    if (e.type === "click") {
      evento("clic_probar_app", {
        origen: medio ?? "sin_marca",
        pagina: window.location.pathname,
        anuncio: vieneDeAnuncio(),
        ...(campana ? { termino: campana } : {}),
      });
      // Secundaria en Ads: la principal es el registro, que se sube
      // desde la base (vw_ads_conversiones_registro) con el gclid.
      conversionAds("probar_app");
    }

    // Antes de que el navegador siga el enlace: que el gclid y el
    // origen real viajen a la app (ver atribucion.ts).
    enlace.setAttribute("href", conAtribucion(href));
  };

  // En captura: si algo detiene la propagación más abajo, el evento
  // igual se registra antes de perderse. `auxclick` cubre el clic con
  // la rueda (abrir en pestaña nueva), que no dispara `click`.
  document.addEventListener("click", alClic, true);
  document.addEventListener("auxclick", alClic, true);
}

/* ── Google Ads ────────────────────────────────────────────────────
   La cuenta IAutoLicita (605-308-0388) todavía no termina de crearse:
   no hay ID de conversión. Mientras ADS_ID esté vacío, todo esto no
   hace nada. Cuando exista la campaña se completan los tres valores
   (Objetivos → Conversiones → la acción → «Configurar etiqueta» →
   «Usar Google tag»: `AW-XXXXXXXXX/etiqueta`) y nada más cambia.

   Por qué la conversión va AQUÍ y no sólo importada desde GA4: en
   SVEA, con la medición sólo por GTM, llegaron 7 leads con gclid y
   Ads contó 0. El hit directo `send_to: AW-…/etiqueta` es lo que Ads
   cuenta sin depender de nadie. */
export const ADS_ID = ""; // p. ej. "AW-123456789"
const ADS_ETIQUETAS = {
  lead: "", // solicitud de reunión → página /gracias
  probar_app: "", // clic hacia la app (secundaria)
} as const;

/** Configura Ads una vez (vincula el gclid a la cookie de conversión). */
export function configurarAds() {
  if (!ADS_ID) return;
  gtag()?.("config", ADS_ID);
}

/** Dispara una conversión de Ads, si hay cuenta configurada. */
export function conversionAds(tipo: keyof typeof ADS_ETIQUETAS, valor?: number) {
  const etiqueta = ADS_ETIQUETAS[tipo];
  if (!ADS_ID || !etiqueta) return;
  gtag()?.("event", "conversion", {
    send_to: `${ADS_ID}/${etiqueta}`,
    ...(valor ? { value: valor, currency: "CLP" } : {}),
  });
}
