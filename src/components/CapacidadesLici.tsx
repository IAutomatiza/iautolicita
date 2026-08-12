import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ScanSearch, ReceiptText, Landmark, MessageSquareDot, ChevronRight } from "lucide-react";

/* ════════════════════════════════════════════════════════════
   Capacidades — layout clonado de la sección enterprise de
   GitBook (vía Mobbin): titular centrado con subtítulo y un
   botón píldora neutro, una pieza visual grande al centro y
   cuatro características flanqueándola, dos por lado, cada una
   con su ícono en una loseta blanca.

   La pieza central es el chat de Lici animado que ya vivía en
   la sección anterior; las cuatro características son las
   capacidades más vendibles del producto.
═══════════════════════════════════════════════════════════════ */

/* ── El chat de Lici, animado en loop ─────────────────────── */

const LiciMark = ({ size = 18 }: { size?: number }) => (
  <img
    src={`${import.meta.env.BASE_URL}brand/lici-icon-dark.png`}
    alt=""
    aria-hidden
    width={size}
    height={size}
    style={{ width: size, height: size }}
  />
);

const liciScript: { from: "user" | "lici"; node: React.ReactNode }[] = [
  { from: "user", node: <>Lici, ¿qué licitación me conviene priorizar esta semana?</> },
  {
    from: "lici",
    node: (
      <>
        La <span className="font-semibold">1057-412-LP25 de MINSAL</span>. Tu match es{" "}
        <span className="font-semibold">88/100</span> y el organismo adjudica el{" "}
        <span className="font-semibold">86%</span> de este rubro — de las 3 que revisaste, es la de mayor probabilidad:{" "}
        <span className="font-semibold">74%</span>.
      </>
    ),
  },
  { from: "user", node: <>¿Y a qué precio debería ir?</> },
  {
    from: "lici",
    node: (
      <>
        Apunta a <span className="font-semibold">$139,9M</span> — 1,8% bajo la mediana que MINSAL pagó por ítems similares: ganas sin regalar margen.
      </>
    ),
  },
  { from: "user", node: <>¿Hay algún riesgo que deba revisar antes de postular?</> },
  {
    from: "lici",
    node: (
      <>
        Uno importante: tu certificación ISO 13485 vence <span className="font-semibold">3 días antes del cierre</span>. Según la nota de Camila (12 jun), hay que renovarla antes de presentar la oferta.
      </>
    ),
  },
  { from: "user", node: <>¿Y quién suele ganar en este organismo?</> },
  {
    from: "lici",
    node: (
      <>
        3 proveedores concentran el <span className="font-semibold">58%</span> de las adjudicaciones de MINSAL en tu rubro. No ganan por precio, sino por evaluación técnica — justo donde tu perfil tiene ventaja.
      </>
    ),
  },
  { from: "user", node: <>Perfecto. Prepárame el resumen para el equipo.</> },
  {
    from: "lici",
    node: (
      <>
        Listo ✅ Dejé en las notas internas el resumen con score, precio sugerido, riesgo de la ISO y los 3 competidores. Lo verá todo tu equipo.
      </>
    ),
  },
];

const LiciChat = () => {
  const [cycle, setCycle] = useState(0);
  const [shown, setShown] = useState(0);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    setShown(0);
    setTyping(false);
    const timers: number[] = [];
    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));
    at(600, () => setShown(1));
    at(2000, () => setTyping(true));
    at(3600, () => { setTyping(false); setShown(2); });
    at(6800, () => setShown(3));
    at(7700, () => setTyping(true));
    at(9100, () => { setTyping(false); setShown(4); });
    at(12000, () => setShown(5));
    at(12900, () => setTyping(true));
    at(14600, () => { setTyping(false); setShown(6); });
    at(18000, () => setShown(7));
    at(18900, () => setTyping(true));
    at(20500, () => { setTyping(false); setShown(8); });
    at(23700, () => setShown(9));
    at(24600, () => setTyping(true));
    at(26000, () => { setTyping(false); setShown(10); });
    at(31000, () => setCycle((c) => c + 1));
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [cycle]);

  return (
    <div
      className="absolute inset-0 overflow-hidden text-white"
      style={{
        background:
          "linear-gradient(180deg, #000115 0%, #000324 14%, #000a37 30%, #001560 52%, #002494 74%, #003ab3 100%)",
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 50% at 50% 32%, rgba(0,1,21,0.55) 0%, transparent 100%)" }}
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(rgba(85,180,248,0.16) 1px, transparent 1px)", backgroundSize: "16px 16px" }}
      />

      <div className="relative h-full flex flex-col">
        <div className="flex items-center gap-2.5 px-5 py-3 border-b border-white/10 flex-shrink-0">
          <span className="h-9 w-9 grid place-items-center rounded-full bg-[#55b4f8]/15 border border-[#55b4f8]/30 flex-shrink-0">
            <LiciMark size={17} />
          </span>
          <div className="min-w-0 flex-1">
            <div className="font-display font-semibold text-[15px] leading-none text-white">
              Lici<span className="text-[#55b4f8]">.</span>
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[#4ade80] animate-pulse" />
              <span className="font-mono text-[8.5px] uppercase tracking-[0.14em] text-white/45">
                en línea
              </span>
            </div>
          </div>
        </div>

        <div className="flex-1 min-h-0 overflow-hidden px-4 py-3 flex flex-col justify-end gap-2.5 [mask-image:linear-gradient(to_bottom,transparent,black_14%)]">
          {liciScript.slice(0, shown).map((m, i) =>
            m.from === "user" ? (
              <div
                key={`${cycle}-${i}`}
                className="self-end max-w-[84%] rounded-3xl rounded-br-md px-4 py-2.5 bg-[#0882f7]"
                style={{ animation: "msgIn 0.45s cubic-bezier(0.16,1,0.3,1) both" }}
              >
                <p className="font-sans text-[13px] leading-[1.4] text-white">{m.node}</p>
              </div>
            ) : (
              <div
                key={`${cycle}-${i}`}
                className="flex items-start gap-2 self-start max-w-[90%]"
                style={{ animation: "msgIn 0.45s cubic-bezier(0.16,1,0.3,1) both" }}
              >
                <span className="mt-0.5 h-6 w-6 grid place-items-center rounded-full bg-[#55b4f8]/15 border border-[#55b4f8]/30 flex-shrink-0">
                  <LiciMark size={12} />
                </span>
                <div className="rounded-2xl rounded-tl-md px-4 py-2.5 bg-white/[0.08] border border-white/10 backdrop-blur-sm">
                  <p className="font-sans text-[13px] leading-[1.5] text-white">{m.node}</p>
                </div>
              </div>
            )
          )}

          {typing && (
            <div className="flex items-end gap-2 self-start" style={{ animation: "msgIn 0.3s ease-out both" }}>
              <span className="h-6 w-6 grid place-items-center rounded-full bg-[#55b4f8]/15 border border-[#55b4f8]/30 flex-shrink-0">
                <LiciMark size={12} />
              </span>
              <div className="rounded-2xl rounded-tl-md px-4 py-3 bg-white/[0.08] border border-white/10 backdrop-blur-sm flex items-center gap-1">
                {[0, 1, 2].map((d) => (
                  <span
                    key={d}
                    className="h-1.5 w-1.5 rounded-full bg-white/70"
                    style={{ animation: `liciDot 1.1s ${d * 0.16}s infinite` }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex-shrink-0 px-4 pb-4 pt-1">
          <div className="flex items-center gap-2 rounded-full bg-white/[0.08] border border-white/15 pl-4 pr-1.5 py-1.5 backdrop-blur-sm">
            <span className="flex-1 font-sans text-[12.5px] text-white/45 truncate">Escríbele a Lici…</span>
            <span className="h-7 w-7 grid place-items-center rounded-full bg-[#0882f7] flex-shrink-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M5 12h13M12 5l7 7-7 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes msgIn {
          from { opacity: 0; transform: translateY(10px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes liciDot {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-3px); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

/* ── Las cuatro capacidades más vendibles ─────────────────── */

type Capacidad = {
  icon: typeof ScanSearch;
  title: string;
  body: string;
};

/* Íconos elegidos por lo que cuentan, no por lo que rellenan:
   la lupa que escanea (el radar que puntúa), la boleta (el precio
   efectivamente pagado en la OC), el frontis de columnas (el
   organismo público) y la burbuja con punto (la alerta que llega
   al chat donde el equipo ya está). */

const izquierda: Capacidad[] = [
  {
    icon: ScanSearch,
    title: "Radar 24/7 con score",
    body: "Cada licitación nueva se compara con tu perfil y recibe un puntaje 0–100. Las que calzan llegan solas — el resto ni lo ves.",
  },
  {
    icon: ReceiptText,
    title: "El precio real pagado",
    body: "6,4 millones de órdenes de compra te dicen cuánto pagó el Estado por lo mismo. Ofertas para ganar sin regalar margen.",
  },
];

const derecha: Capacidad[] = [
  {
    icon: Landmark,
    title: "Conoce a tu comprador",
    body: "Antes de postular sabes si el organismo paga rápido, cuánto deja desierto y quién le está ganando. Sin sorpresas.",
  },
  {
    icon: MessageSquareDot,
    title: "Alertas donde trabajas",
    body: "Cierres, adjudicaciones y cambios llegan por WhatsApp, correo o Telegram. Tu equipo deja de vigilar el portal.",
  },
];

const Feature = ({ f }: { f: Capacidad }) => (
  <div>
    <span className="inline-grid place-items-center h-12 w-12 rounded-xl bg-white border border-[var(--hairline-strong)] shadow-[0_1px_2px_rgba(10,10,10,0.05)]">
      <f.icon className="h-5 w-5 text-amber-400" strokeWidth={1.8} />
    </span>
    <h3 className="mt-5 font-display font-medium text-[20px] tracking-[-0.02em] text-cream-50">
      {f.title}
    </h3>
    <p className="mt-2 font-sans text-[14.5px] leading-[1.55] text-cream-200">
      {f.body}
    </p>
  </div>
);

/* ── La sección ───────────────────────────────────────────── */

export default function CapacidadesLici() {
  return (
    <section id="capacidades" className="py-16 md:py-28">
      <div className="container-edge">
        {/* Encabezado centrado, al patrón GitBook */}
        <div className="max-w-[760px] mx-auto text-center">
          <h2 className="font-display font-medium text-[34px] md:text-[48px] leading-[1.05] tracking-[-0.03em] text-cream-50">
            Cuatro capacidades sobre el{" "}
            <span className="text-amber-400">mismo dato.</span>
          </h2>
          <p className="mt-5 max-w-[560px] mx-auto font-sans text-[16px] md:text-[17px] leading-[1.5] text-cream-200">
            IAutoLicita conecta detección, precio, comprador y alertas a una
            sola base — y Lici te la conversa.
          </p>
          {/* La GradientPill de clickup.com ("The Best AI is Brain²"),
              clonada con Lici en el rol de Brain: borde orbitado por el
              cometa de degradado, interior blanco, wordmark y chevron. */}
          <Link to="/lici" className="pill-brain mt-7">
            <span className="pill-brain-inner">
              <span className="font-sans font-medium text-[15px] text-[#202020]">
                Conoce a
              </span>
              <span className="font-sans font-bold text-[15px] text-[#202020]">
                Lici<span className="text-amber-400">.</span>
              </span>
              <ChevronRight className="h-4 w-4 text-[#202020]" strokeWidth={2.2} />
            </span>
          </Link>
        </div>

        {/* Visual central + 2 características por lado */}
        <div className="mt-14 md:mt-16 grid gap-10 lg:gap-12 lg:grid-cols-[1fr_1.45fr_1fr] items-center max-w-[1240px] mx-auto">
          <div className="space-y-12 order-2 lg:order-1">
            {izquierda.map((f) => (
              <Feature key={f.title} f={f} />
            ))}
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative h-[520px] md:h-[600px] rounded-3xl overflow-hidden border border-[var(--hairline-strong)] shadow-[0_30px_80px_-30px_rgba(0,20,80,0.35)]">
              <LiciChat />
            </div>
          </div>

          <div className="space-y-12 order-3">
            {derecha.map((f) => (
              <Feature key={f.title} f={f} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
