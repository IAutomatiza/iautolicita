/* El envío de una solicitud de reunión, en un solo lugar.

   Hoy el sitio no tiene backend propio. En vez de dejar un
   formulario que finge enviar y pierde el lead —el peor resultado
   posible— esto tiene dos caminos:

   · Si existe `VITE_LEADS_ENDPOINT`, hace POST ahí. Ese será el
     edge function de Supabase que escribe en `web_leads` y avisa
     por n8n. Se configura al desplegar, sin tocar código.

   · Si no existe (hoy, en local), abre el correo del visitante con
     todo escrito. Es menos elegante, pero NUNCA pierde un lead.

   Así el formulario se puede construir y probar completo antes de
   que exista el backend, y enchufarlo después es una variable. */

export type Lead = {
  nombre: string;
  empresa: string;
  rut?: string;
  correo: string;
  telefono?: string;
  mensaje?: string;
  horario?: string;
  /** Desde dónde llegó: el formulario o el chat de Lici. */
  origen: "formulario" | "lici";
};

export type Resultado =
  | { ok: true; via: "servidor" | "correo" }
  | { ok: false; error: string };

/* La edge function `web-lead`: guarda en `web_leads` y avisa por correo.
   Se puede sobreescribir con VITE_LEADS_ENDPOINT si algún día cambia. */
const ENDPOINT =
  (import.meta.env.VITE_LEADS_ENDPOINT as string | undefined) ??
  "https://yqpmthievjsxbtsndsft.supabase.co/functions/v1/web-lead";
const CORREO = "hola@iautomatiza.cl";

function comoTexto(l: Lead) {
  return [
    `Nombre: ${l.nombre}`,
    `Empresa: ${l.empresa}`,
    l.rut ? `RUT: ${l.rut}` : null,
    `Correo: ${l.correo}`,
    l.telefono ? `Teléfono: ${l.telefono}` : null,
    l.horario ? `Prefiere: ${l.horario}` : null,
    "",
    l.mensaje || "(sin mensaje)",
    "",
    `— enviado desde ${l.origen === "lici" ? "el chat de Lici" : "el formulario"} del sitio`,
  ]
    .filter((x) => x !== null)
    .join("\n");
}

export async function enviarLead(lead: Lead): Promise<Resultado> {
  if (ENDPOINT) {
    try {
      const r = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...lead,
          pagina: window.location.pathname,
          referencia: document.referrer || null,
          // Si venía conversando con Lici, la solicitud queda unida a
          // esa conversación.
          sid: (() => {
            try { return sessionStorage.getItem("lici_sid"); } catch { return null; }
          })(),
        }),
      });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return { ok: true, via: "servidor" };
    } catch (e) {
      // Si el servidor falla no se pierde el lead: cae al correo.
      const msg = e instanceof Error ? e.message : "error de red";
      console.warn("[leads] falló el envío al servidor, voy por correo:", msg);
    }
  }

  const asunto = `Solicitud de reunión — ${lead.empresa}`;
  window.location.href = `mailto:${CORREO}?subject=${encodeURIComponent(
    asunto,
  )}&body=${encodeURIComponent(comoTexto(lead))}`;
  return { ok: true, via: "correo" };
}

/** ¿Hay backend configurado? Lo usa la pantalla para decir la verdad. */
export const hayServidor = !!ENDPOINT;
