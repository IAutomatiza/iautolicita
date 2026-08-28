/* El puente entre el widget y el cerebro de Lici.

   Llama a la edge function `lici-web-chat`, que es la que tiene el
   modelo, el conocimiento de la tabla y los guardrails.

   Si la edge no responde —está caída, no hay red, el visitante entró
   por un túnel— NO se queda muda: cae al emparejador local, que
   sigue viviendo en `liciConocimiento.ts`. Peor que la edge, mucho
   mejor que un silencio. Lo que nunca hace, en ninguno de los dos
   caminos, es inventar. */

import { responder as responderLocal } from "./liciConocimiento";

const URL_EDGE =
  (import.meta.env.VITE_LICI_CHAT_URL as string | undefined) ??
  "https://yqpmthievjsxbtsndsft.supabase.co/functions/v1/lici-web-chat";

const ESPERA_MS = 25_000;

export type RespuestaLici = {
  respuesta: string;
  intencion?: string;
  salida_sugerida?: "app" | "contacto" | "ninguna";
  /** true cuando contestó el emparejador local porque la edge falló. */
  degradado?: boolean;
  /** La conversación llegó a su tope: el widget cierra la entrada. */
  fin?: boolean;
};

export async function preguntarALici(
  sid: string | null,
  mensaje: string,
): Promise<RespuestaLici> {
  // Sin sid no hay sesión que reconstruir del lado del servidor
  // (navegación privada, almacenamiento bloqueado): se responde local.
  if (!sid) {
    return { respuesta: responderLocal(mensaje), degradado: true };
  }

  const corta = new AbortController();
  const reloj = window.setTimeout(() => corta.abort(), ESPERA_MS);

  try {
    const r = await fetch(URL_EDGE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: corta.signal,
      body: JSON.stringify({
        sid,
        mensaje,
        pagina: window.location.pathname,
        referencia: document.referrer || null,
      }),
    });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const d = await r.json();
    if (!d?.respuesta) throw new Error("respuesta vacía");
    return d as RespuestaLici;
  } catch (e) {
    console.warn("[lici] la edge no respondió, contesto local:", e);
    return { respuesta: responderLocal(mensaje), degradado: true };
  } finally {
    window.clearTimeout(reloj);
  }
}
