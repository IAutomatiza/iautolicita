import { useEffect, useRef, useState } from "react";
import { Send, X } from "lucide-react";
import LiciGlifo from "./LiciGlifo";
import { CHIPS_INICIALES, SALUDO } from "../lib/liciConocimiento";
import { preguntarALici } from "../lib/liciChat";
import { evento } from "../lib/analitica";
import { APP_URL, enlaceApp } from "../lib/cta";

/* ════════════════════════════════════════════════════════════
   LiciWidget — el chat de Lici en el sitio público.

   Vive fijo abajo a la derecha en todas las páginas. El disparador
   es la marca de Lici; al abrirlo sube el panel con la conversación.

   El "Hablar con nosotros" del pie no navega: dispara el evento
   `lici:abrir` y este componente lo escucha. Así hay un solo lugar
   donde se conversa, y sumar otro botón en el futuro es una línea.

   El cerebro vive en la edge function `lici-web-chat`: ahí están el
   modelo, el conocimiento que se edita en la tabla sin desplegar, y
   los guardrails. Si esa llamada falla, `liciChat` cae solo al
   emparejador local — el chat nunca se queda mudo.
═══════════════════════════════════════════════════════════════ */

type Mensaje = { de: "lici" | "usuario"; texto: string };

const AZUL = "#0064E0";

/* Identificador de la conversación.

   El objetivo de Lici es UNO: que la persona entre a la app. Por lo
   tanto el único número que importa es cuántas conversaciones
   terminan en un registro — y eso no se puede medir si el enlace a
   la app sale pelado. El `sid` viaja en la URL y es lo que después
   permite unir «habló con Lici» con «se registró».

   Vive en sessionStorage: la misma pestaña conserva la conversación
   aunque el visitante navegue entre páginas del sitio. */
function idSesion() {
  try {
    let id = sessionStorage.getItem("lici_sid");
    if (!id) {
      id = crypto.randomUUID();
      sessionStorage.setItem("lici_sid", id);
    }
    return id;
  } catch {
    return null; // navegación privada, cookies bloqueadas
  }
}

/** Al enlace de la app se le cuelga el origen y el id de conversación. */
function conSeguimiento(href: string, sid: string | null) {
  if (!href.startsWith(APP_URL)) return href;
  return enlaceApp("chat", { sid });
}

/** Formato de las fichas: **negrita** y [texto](/ruta). */
function conFormato(texto: string, sid: string | null) {
  return texto
    .split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g)
    .map((trozo, i) => {
      if (trozo.startsWith("**") && trozo.endsWith("**"))
        return (
          <strong key={i} className="font-semibold text-[#0A0A0A]">
            {trozo.slice(2, -2)}
          </strong>
        );
      const enlace = trozo.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (enlace)
        return (
          <a
            key={i}
            href={conSeguimiento(enlace[2], sid)}
            className="font-medium underline decoration-[#0064E0]/40 underline-offset-2"
            style={{ color: AZUL }}
          >
            {enlace[1]}
          </a>
        );
      return trozo;
    });
}

export default function LiciWidget() {
  const [abierto, setAbierto] = useState(false);
  const [mensajes, setMensajes] = useState<Mensaje[]>([
    { de: "lici", texto: SALUDO },
  ]);
  const [borrador, setBorrador] = useState("");
  const [tipeando, setTipeando] = useState(false);
  const [cerrado, setCerrado] = useState(false);
  const sid = useRef<string | null>(null);
  if (sid.current === null) sid.current = idSesion();
  const medido = useRef(false);
  const finRef = useRef<HTMLDivElement>(null);
  const entradaRef = useRef<HTMLInputElement>(null);

  /* El pie y cualquier otro CTA abren el chat por evento. */
  useEffect(() => {
    const abrir = () => setAbierto(true);
    window.addEventListener("lici:abrir", abrir);
    return () => window.removeEventListener("lici:abrir", abrir);
  }, []);

  /* Se mide una sola vez por pestaña: abrir y cerrar tres veces es la
     misma persona, y contarlo tres veces inflaría justo la métrica
     que dice si Lici sirve o sólo adorna. Observar `abierto` cubre
     los dos caminos —el botón flotante y el evento `lici:abrir`— sin
     tener que medir en cada uno. */
  useEffect(() => {
    if (!abierto || medido.current) return;
    medido.current = true;
    evento("abrir_lici", { pagina: window.location.pathname });
  }, [abierto]);

  /* Escape cierra. */
  useEffect(() => {
    if (!abierto) return;
    const alTeclear = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAbierto(false);
    };
    window.addEventListener("keydown", alTeclear);
    return () => window.removeEventListener("keydown", alTeclear);
  }, [abierto]);

  useEffect(() => {
    finRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [mensajes, tipeando]);

  useEffect(() => {
    if (abierto) entradaRef.current?.focus();
  }, [abierto]);

  const preguntar = async (texto: string) => {
    const limpio = texto.trim();
    if (!limpio || tipeando || cerrado) return;
    setMensajes((m) => [...m, { de: "usuario", texto: limpio }]);
    setBorrador("");
    setTipeando(true);
    const r = await preguntarALici(sid.current, limpio);
    setMensajes((m) => [...m, { de: "lici", texto: r.respuesta }]);
    setTipeando(false);
    // La conversación llegó a su tope: se cierra la entrada, pero la
    // última respuesta ya trae las dos salidas útiles.
    if (r.fin) setCerrado(true);
  };

  const mostrarChips = mensajes.length === 1 && !tipeando;

  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3 md:bottom-6 md:right-6">
      {/* ── El panel ─────────────────────────────────────────── */}
      {abierto && (
        <div
          role="dialog"
          aria-label="Chat con Lici"
          className="lici-panel flex w-[calc(100vw-2.5rem)] max-w-[384px] flex-col overflow-hidden rounded-2xl border border-[#0A1530]/[0.09] bg-white shadow-[0_30px_70px_-30px_rgba(10,21,48,0.45)]"
          style={{ height: "min(72vh, 560px)" }}
        >
          {/* Cabecera */}
          <div className="flex shrink-0 items-center gap-3 border-b border-[#0A1530]/[0.07] px-4 py-3.5">
            <LiciGlifo alto={30} conBorde />
            <div className="min-w-0 flex-1">
              <div className="font-display text-[15px] font-semibold leading-tight text-[#0A0A0A]">
                Lici
              </div>
              <div className="font-sans text-[12.5px] leading-tight text-[#0A1530]/55">
                Del producto y los planes
              </div>
            </div>
            <button
              onClick={() => setAbierto(false)}
              aria-label="Cerrar el chat"
              className="rounded-full p-1.5 text-[#0A1530]/45 transition-colors hover:bg-[#0A1530]/[0.05] hover:text-[#0A0A0A]"
            >
              <X className="h-[18px] w-[18px]" strokeWidth={2} />
            </button>
          </div>

          {/* Conversación */}
          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {mensajes.map((m, i) =>
              m.de === "lici" ? (
                <div key={i} className="flex items-start gap-2">
                  <LiciGlifo alto={22} conBorde className="mt-0.5 shrink-0" />
                  <div className="max-w-[86%] rounded-2xl rounded-tl-md border border-[#0A1530]/[0.09] bg-[#F4F6F9] px-3.5 py-2.5 font-sans text-[14px] leading-[1.5] text-[#0A1530]/85">
                    {conFormato(m.texto, sid.current)}
                  </div>
                </div>
              ) : (
                <div key={i} className="flex justify-end">
                  <div
                    className="max-w-[86%] rounded-2xl rounded-tr-md px-3.5 py-2.5 font-sans text-[14px] leading-[1.5] text-white"
                    style={{ background: AZUL }}
                  >
                    {m.texto}
                  </div>
                </div>
              ),
            )}

            {tipeando && (
              <div className="flex items-start gap-2">
                <LiciGlifo alto={22} conBorde className="mt-0.5 shrink-0" />
                <div className="inline-flex items-center gap-1.5 rounded-2xl rounded-tl-md border border-[#0A1530]/[0.09] bg-[#F4F6F9] px-4 py-3">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="chat-punto h-1.5 w-1.5 rounded-full bg-[#0A1530]/40"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Lo que se puede preguntar, antes de escribir nada */}
            {mostrarChips && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {CHIPS_INICIALES.map((c) => (
                  <button
                    key={c}
                    onClick={() => preguntar(c)}
                    className="rounded-full border border-[#0A1530]/12 bg-white px-3 py-1.5 font-sans text-[12.5px] text-[#0A1530]/70 transition-colors hover:border-[#0064E0]/50 hover:text-[#0A0A0A]"
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}

            <div ref={finRef} />
          </div>

          {/* Entrada */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              preguntar(borrador);
            }}
            className="flex shrink-0 items-center gap-2 border-t border-[#0A1530]/[0.07] px-3 py-3"
          >
            <input
              ref={entradaRef}
              value={borrador}
              onChange={(e) => setBorrador(e.target.value)}
              maxLength={500}
              disabled={cerrado}
              placeholder={cerrado ? "Conversación cerrada" : "Pregúntame lo que quieras…"}
              aria-label="Escribe tu pregunta"
              className="min-w-0 flex-1 rounded-full border border-[#0A1530]/12 bg-[#F7F8FA] px-4 py-2.5 font-sans text-[14px] text-[#0A0A0A] outline-none transition-colors placeholder:text-[#0A1530]/40 focus:border-[#0064E0]/50 focus:bg-white"
            />
            <button
              type="submit"
              disabled={!borrador.trim() || tipeando || cerrado}
              aria-label="Enviar"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-white transition-opacity disabled:opacity-30"
              style={{ background: AZUL }}
            >
              <Send className="h-[17px] w-[17px]" strokeWidth={2} />
            </button>
          </form>
        </div>
      )}

      {/* ── El disparador ────────────────────────────────────── */}
      <button
        onClick={() => setAbierto((v) => !v)}
        aria-label={abierto ? "Cerrar el chat con Lici" : "Hablar con Lici"}
        aria-expanded={abierto}
        className="group relative grid h-14 w-14 place-items-center rounded-full border border-[#0A1530]/[0.08] bg-white shadow-[0_10px_30px_-8px_rgba(10,21,48,0.35)] transition-transform duration-200 hover:-translate-y-[2px]"
      >
        {!abierto && (
          <span
            aria-hidden
            className="absolute inset-0 rounded-full opacity-40 blur-xl animate-halo-pulse"
            style={{ background: AZUL }}
          />
        )}
        <span className="relative">
          {abierto ? (
            <X className="h-[22px] w-[22px] text-[#0A0A0A]" strokeWidth={2} />
          ) : (
            <LiciGlifo alto={30} />
          )}
        </span>
      </button>
    </div>
  );
}
