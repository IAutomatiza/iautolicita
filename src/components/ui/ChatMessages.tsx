import { useCallback, useEffect, useRef, useState } from "react";
import { Send, RotateCcw } from "lucide-react";
import LiciGlifo from "../LiciGlifo";

/* ════════════════════════════════════════════════════════════
   ChatMessages — conversación que se escribe sola, clon del
   componente de Nexus UI adaptado al stack propio.

   El original usa framer-motion para las burbujas y el indicador
   de tipeo; acá van con transiciones CSS (el proyecto tiene la
   dependencia sin usar y no vale la pena cargarla por esto), y
   el avatar del asistente es la marca de Lici en vez del ícono
   genérico.

   El loop solo corre con el panel en pantalla — fuera de vista
   sería repintado perdido — y respeta prefers-reduced-motion.
═══════════════════════════════════════════════════════════════ */

export type MensajeChat = {
  id: string;
  de: "usuario" | "lici";
  texto: string;
};

type Props = {
  mensajes: MensajeChat[];
  /** Pausa entre un mensaje y el siguiente. */
  pausa?: number;
  /** Cuánto se muestra el indicador de tipeo antes de cada respuesta. */
  tipeo?: number;
  /** Botón para volver a reproducir la conversación. */
  conRepetir?: boolean;
  className?: string;
};

const Tipeando = () => (
  <div className="inline-flex items-center gap-1.5 rounded-2xl rounded-tl-md border border-white/10 bg-white/[0.06] px-4 py-3">
    {[0, 1, 2].map((i) => (
      <span
        key={i}
        className="chat-punto h-1.5 w-1.5 rounded-full bg-white/60"
        style={{ animationDelay: `${i * 0.15}s` }}
      />
    ))}
  </div>
);

export default function ChatMessages({
  mensajes,
  pausa = 2200,
  tipeo = 1300,
  conRepetir = true,
  className = "",
}: Props) {
  const [visibles, setVisibles] = useState(0);
  const [tipeando, setTipeando] = useState(false);
  const [activo, setActivo] = useState(false);
  const cajaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Solo avanza con el panel en pantalla.
  useEffect(() => {
    const caja = cajaRef.current;
    if (!caja) return;
    const obs = new IntersectionObserver(([e]) => setActivo(e.isIntersecting), {
      threshold: 0.25,
    });
    obs.observe(caja);
    return () => obs.disconnect();
  }, []);

  // Un paso por mensaje: el de Lici primero muestra el tipeo.
  useEffect(() => {
    if (!activo || visibles >= mensajes.length) return;
    const siguiente = mensajes[visibles];
    let t2 = 0;

    if (siguiente.de === "lici") {
      setTipeando(true);
      const t1 = window.setTimeout(() => {
        setTipeando(false);
        setVisibles((v) => v + 1);
      }, tipeo);
      return () => {
        window.clearTimeout(t1);
        window.clearTimeout(t2);
      };
    }

    t2 = window.setTimeout(() => setVisibles((v) => v + 1), pausa * 0.55);
    return () => window.clearTimeout(t2);
  }, [activo, visibles, mensajes, pausa, tipeo]);

  // El hilo sigue siempre el último mensaje.
  useEffect(() => {
    const s = scrollRef.current;
    if (!s) return;
    s.scrollTo({
      top: s.scrollHeight,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  }, [visibles, tipeando]);

  const repetir = useCallback(() => {
    setTipeando(false);
    setVisibles(0);
  }, []);

  const terminado = visibles >= mensajes.length;

  return (
    <div
      ref={cajaRef}
      className={`chat-lici relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0A101B] shadow-[0_24px_64px_-24px_rgba(0,0,0,0.55)] ${className}`}
    >
      {/* Cabecera */}
      <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3">
        <div className="flex items-center gap-2.5">
          <LiciGlifo alto={28} />
          <div>
            <h3 className="font-display font-medium text-[13.5px] leading-none text-white/90">
              Lici
            </h3>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-white/35">
              En línea
            </p>
          </div>
        </div>
        {conRepetir && terminado && (
          <button
            onClick={repetir}
            aria-label="Repetir la conversación"
            className="flex items-center gap-1.5 rounded-lg bg-white/[0.06] px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-white/50 transition-colors hover:bg-white/10 hover:text-white/80"
          >
            <RotateCcw className="h-3 w-3" strokeWidth={2} />
            Repetir
          </button>
        )}
      </div>

      {/* Hilo */}
      <div
        ref={scrollRef}
        role="log"
        aria-live="polite"
        className="chat-hilo flex-1 space-y-2.5 overflow-y-auto px-4 py-4"
      >
        {mensajes.slice(0, visibles).map((m) => {
          const mio = m.de === "usuario";
          return (
            <div
              key={m.id}
              className={`chat-burbuja flex w-full ${mio ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex items-end gap-2 ${mio ? "flex-row-reverse" : ""}`}>
                {!mio && (
                  <span className="mb-0.5 shrink-0">
                    <LiciGlifo alto={22} />
                  </span>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 font-sans text-[13px] leading-[1.55] ${
                    mio
                      ? "rounded-tr-md bg-[#0064E0] text-white"
                      : "rounded-tl-md border border-white/10 bg-white/[0.06] text-white/80"
                  }`}
                >
                  {m.texto}
                </div>
              </div>
            </div>
          );
        })}

        {tipeando && (
          <div className="chat-burbuja flex justify-start">
            <div className="flex items-end gap-2">
              <span className="mb-0.5 shrink-0">
                <LiciGlifo alto={22} />
              </span>
              <Tipeando />
            </div>
          </div>
        )}
      </div>

      {/* Barra de entrada (decorativa: es una demo) */}
      <div className="border-t border-white/[0.07] p-3">
        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5">
          <span className="flex-1 font-sans text-[12.5px] text-white/25">
            Pregúntale por WhatsApp…
          </span>
          <Send className="h-3.5 w-3.5 shrink-0 text-white/25" strokeWidth={1.8} />
        </div>
      </div>

      <style>{`
        .chat-hilo { scrollbar-width: thin; scrollbar-color: rgba(255,255,255,0.14) transparent; }
        .chat-hilo::-webkit-scrollbar { width: 4px; }
        .chat-hilo::-webkit-scrollbar-track { background: transparent; }
        .chat-hilo::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.14); border-radius: 2px; }
        .chat-burbuja { animation: chatEntra 0.38s cubic-bezier(0.22,1,0.36,1) backwards; }
        @keyframes chatEntra {
          from { opacity: 0; transform: translateY(10px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .chat-punto { animation: chatPunto 0.9s ease-in-out infinite; }
        @keyframes chatPunto {
          0%, 100% { opacity: 0.35; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(-3px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .chat-lici .chat-burbuja, .chat-lici .chat-punto { animation: none; }
        }
      `}</style>
    </div>
  );
}
