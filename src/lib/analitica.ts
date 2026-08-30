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

export const GA_ID = "G-T6H147Q2TG";

type Gtag = (...args: unknown[]) => void;

function gtag(): Gtag | null {
  if (typeof window === "undefined") return null;
  const g = (window as unknown as { gtag?: Gtag }).gtag;
  return typeof g === "function" ? g : null;
}

/** Un evento. Si no hay gtag, no pasa nada. */
export function evento(nombre: string, datos?: Record<string, unknown>) {
  gtag()?.("event", nombre, datos ?? {});
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

  document.addEventListener(
    "click",
    (e) => {
      const enlace = (e.target as HTMLElement | null)?.closest?.("a");
      if (!enlace) return;

      const href = enlace.getAttribute("href") ?? "";
      if (!href.includes("app.iautolicita.cl")) return;

      let medio: string | null = null;
      let campana: string | null = null;
      try {
        const u = new URL(href, window.location.origin);
        medio = u.searchParams.get("utm_medium");
        campana = u.searchParams.get("utm_campaign");
      } catch {
        /* href raro: se mide igual, sin el detalle */
      }

      evento("clic_probar_app", {
        origen: medio ?? "sin_marca",
        pagina: window.location.pathname,
        ...(campana ? { termino: campana } : {}),
      });
    },
    // En captura: si algo detiene la propagación más abajo, el evento
    // igual se registra antes de perderse.
    true,
  );
}
