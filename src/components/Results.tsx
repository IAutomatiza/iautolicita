import { useEffect, useRef, useState } from "react";
import { Star, ArrowDownRight, ArrowUpRight } from "lucide-react";
import LiveDot from "./ui/LiveDot";

/* ════════════════════════════════════════════════════════════
   "Lo que importa" — single dramatic claim with one supporting
   visual. Built around the differentiator that no competitor in
   Chile has: tracking the OCs adjudicated to your competitors.
═══════════════════════════════════════════════════════════════ */

interface CompetitorOC {
  org: string;
  prov: string;
  monto: string;
  rating: number;
  cierre: string;
  beat?: boolean;
}

const competitorOCs: CompetitorOC[] = [
  { org: "MINSAL", prov: "Insumos Médicos Andina SpA", monto: "$142.5M", rating: 4.8, cierre: "12 d", beat: true },
  { org: "MOP", prov: "Consultora Vial Sur Ltda.", monto: "$78.2M", rating: 4.2, cierre: "—" },
  { org: "JUNAEB", prov: "Audita Servicios Profesionales", monto: "$36.0M", rating: 4.9, cierre: "8 d", beat: true },
  { org: "DGAC", prov: "RadarTech Chile S.A.", monto: "$210.5M", rating: 4.5, cierre: "21 d" },
];

export default function Results() {
  const ref = useRef<HTMLDivElement>(null);
  const [n, setN] = useState(0);

  // Animate the big number on viewport entry
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / 1800);
        const eased = 1 - Math.pow(1 - t, 3);
        setN(4.2 * eased);
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      obs.disconnect();
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // El cierre es corto: el simulador embebido continúa esta misma sección.
  return (
    <section id="resultados" ref={ref} className="pt-16 md:pt-32 pb-10 md:pb-14 relative overflow-hidden">
      {/* Atmospheric blue glow */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[600px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(0,100,224,0.08) 0%, transparent 60%)",
        }}
      />

      <div className="container-edge relative">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* LEFT — the big claim */}
          <div className="lg:col-span-6">
            {/* Eyebrow with live indicator */}
            <div className="flex items-center gap-2.5 mb-7">
              <LiveDot size={7} />
              <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-amber-400 font-medium">
                Lo que ningún competidor te muestra
              </span>
            </div>

            {/* The dollar amount — editorial serif italic (The Economist / NYT cover treatment) */}
            <div className="leading-[0.88] tracking-[-0.05em] text-cream-50">
              <span className="font-serif italic font-normal text-[88px] md:text-[152px] lg:text-[188px] block">
                <span className="text-amber-400/70 inline-block align-top mr-1 text-[58%] tracking-tight relative top-[0.18em]">
                  $
                </span>
                <span className="num">{n.toFixed(1)}</span>
                <span className="text-amber-400/70 inline-block align-baseline ml-1 text-[58%] tracking-tight relative -top-[0.05em]">
                  B
                </span>
              </span>
              <span className="text-[14px] md:text-[22px] block mt-5 font-mono uppercase tracking-[0.22em] text-cream-400 font-normal">
                CLP · año en curso · adjudicado vía Mercado Público
              </span>
            </div>

            {/* The brutal headline — editorial italic on the punchline */}
            <h2 className="mt-10 font-display font-medium text-[28px] md:text-[36px] lg:text-[44px] leading-[1.1] tracking-[-0.025em] text-cream-50 max-w-[540px]">
              Adjudicados por el Estado a otras empresas mientras tu equipo{" "}
              <span className="font-serif italic font-normal text-amber-400 tracking-[-0.015em]">
                revisaba el portal a mano.
              </span>
            </h2>

            {/* Sub */}
            <p className="mt-6 font-sans text-[16px] md:text-[17px] leading-[1.55] text-cream-200 max-w-[540px]">
              IAutoLicita es la única plataforma en Chile que cruza <span className="text-cream-50 font-medium">7.2M adjudicaciones</span> con <span className="text-cream-50 font-medium">6.4M órdenes de compra reales</span>: a quién se la adjudicaron, por cuánto se firmó, cuál fue el precio efectivamente pagado por ítem (p25/p50/p75), y cómo calificó el comprador al proveedor.
            </p>

            {/* Tag pills */}
            <div className="mt-8 flex flex-wrap gap-2">
              {[
                "6.4M OCs históricas",
                "Precio real pagado por ítem",
                "Calificación del comprador",
                "Flujo CLP región → región",
              ].map((t) => (
                <span
                  key={t}
                  className="font-mono text-[10.5px] uppercase tracking-[0.16em] px-2.5 py-1.5 border border-amber-400/25 bg-amber-400/[0.05] text-amber-400 rounded-full"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT — the supporting visual: real-feel OC table */}
          <div className="lg:col-span-6">
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                background: "#0E1118",
                border: "1px solid rgba(255,255,255,0.10)",
                boxShadow:
                  "0 30px 80px -30px rgba(0,100,224,0.30), inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
            >
              {/* Top bar */}
              <div
                className="flex items-center justify-between px-5 py-3.5 border-b"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  borderColor: "rgba(255,255,255,0.08)",
                }}
              >
                <div className="flex items-center gap-2.5">
                  <LiveDot size={6} color="bg-sage-400" ringColor="bg-sage-400" />
                  <span
                    className="font-mono text-[10.5px] uppercase tracking-[0.18em] font-medium"
                    style={{ color: "rgba(255,255,255,0.85)" }}
                  >
                    OCs adjudicadas · últimas 24h
                  </span>
                </div>
                <span
                  className="font-mono text-[9.5px]"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  ↗ = a tu competencia
                </span>
              </div>

              {/* Column headers */}
              <div
                className="grid grid-cols-[52px_1fr_72px_38px] md:grid-cols-[64px_1fr_88px_60px_46px] gap-2 px-3.5 md:px-5 py-2.5 border-b font-mono text-[9.5px] uppercase tracking-[0.18em] font-medium"
                style={{
                  borderColor: "rgba(255,255,255,0.06)",
                  background: "rgba(255,255,255,0.02)",
                  color: "rgba(255,255,255,0.50)",
                }}
              >
                <div>Org</div>
                <div>Proveedor</div>
                <div className="text-right">Monto</div>
                <div className="hidden md:block text-right">Cierre</div>
                <div className="text-right">★</div>
              </div>

              {/* Rows */}
              {competitorOCs.map((oc, i) => (
                <div
                  key={oc.org}
                  className="grid grid-cols-[52px_1fr_72px_38px] md:grid-cols-[64px_1fr_88px_60px_46px] gap-2 items-center px-3.5 md:px-5 py-3.5 border-b last:border-b-0 transition-colors hover:bg-white/[0.02]"
                  style={{
                    borderColor: "rgba(255,255,255,0.05)",
                    animation: `oc-row-in 0.5s cubic-bezier(0.22,1,0.36,1) ${0.4 + i * 0.1}s both`,
                  }}
                >
                  <div
                    className="font-mono text-[10px] uppercase tracking-[0.16em] truncate font-medium"
                    style={{ color: "rgba(255,255,255,0.65)" }}
                  >
                    {oc.org}
                  </div>
                  <div className="min-w-0 flex items-center gap-2">
                    {oc.beat && (
                      <span
                        className="flex-shrink-0 inline-flex items-center justify-center h-5 w-5 rounded-md"
                        style={{
                          background: "rgba(0,100,224,0.15)",
                          border: "1px solid rgba(0,100,224,0.40)",
                        }}
                        title="adjudicada a tu competencia"
                      >
                        <ArrowUpRight
                          className="h-3 w-3"
                          strokeWidth={2.4}
                          style={{ color: "#5790F5" }}
                        />
                      </span>
                    )}
                    <div className="min-w-0">
                      <div
                        className="font-sans text-[13px] truncate font-medium"
                        style={{ color: "rgba(255,255,255,0.95)" }}
                      >
                        {oc.prov}
                      </div>
                    </div>
                  </div>
                  <div
                    className="num font-mono text-[12px] text-right font-medium"
                    style={{ color: "#FFFFFF" }}
                  >
                    {oc.monto}
                  </div>
                  <div
                    className="hidden md:block num font-mono text-[11px] text-right"
                    style={{ color: "rgba(255,255,255,0.60)" }}
                  >
                    {oc.cierre}
                  </div>
                  <div className="flex items-center gap-0.5 justify-end">
                    <Star
                      className="h-2.5 w-2.5"
                      style={{ color: "#5790F5", fill: "#5790F5" }}
                    />
                    <span
                      className="num font-mono text-[11px] font-medium"
                      style={{ color: "#5790F5" }}
                    >
                      {oc.rating.toFixed(1)}
                    </span>
                  </div>
                </div>
              ))}

              {/* Footer with "more" indicator */}
              <div
                className="flex items-center justify-between px-5 py-3 border-t font-mono text-[10px] uppercase tracking-[0.18em]"
                style={{
                  borderColor: "rgba(255,255,255,0.10)",
                  background: "rgba(255,255,255,0.02)",
                }}
              >
                <span
                  className="flex items-center gap-1.5"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  <ArrowDownRight className="h-3 w-3" strokeWidth={2} />
                  + 6.4M OC en histórico
                </span>
                <span
                  className="flex items-center gap-1.5 font-medium"
                  style={{ color: "#5790F5" }}
                >
                  <LiveDot size={5} />
                  Refresh diario
                </span>
              </div>
            </div>

            {/* Caption below the table */}
            <p className="mt-5 font-mono text-[10.5px] uppercase tracking-[0.18em] text-cream-300 text-center">
              ↗ MINSAL y JUNAEB ya cerraron — la próxima licitación similar la podés ganar tú
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes oc-row-in {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}
