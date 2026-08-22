import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import MotorBento from "./MotorBento";

/* ════════════════════════════════════════════════════════════
   "El motor, por dentro" — encabezado centrado con la banda de
   cifras (patrón Shopify Plus) y la GradientPill de ClickUp con
   Lici, seguidos del bento clonado de MagicUI: cuatro tarjetas
   con demo viva (marquee de bases, radar animado, beams que
   convergen en Lici y calendario de cierres). El chat animado
   de Lici vive ahora solo en /lici.
═══════════════════════════════════════════════════════════════ */

const CIFRAS = [
  { valor: "441K", label: "licitaciones" },
  { valor: "7,2M", label: "adjudicaciones" },
  { valor: "6,4M", label: "órdenes de compra" },
  { valor: "99,94%", label: "cobertura del día" },
];

export default function CapacidadesLici() {
  return (
    <section id="capacidades" className="py-16 md:py-28">
      <div className="container-edge">
        <div className="max-w-[860px] mx-auto text-center">
          <div className="flex items-center justify-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.22em] text-cream-300">
            <span className="h-px w-8 bg-cream-300/30" />
            <span>El motor, por dentro</span>
            <span className="h-px w-8 bg-cream-300/30" />
          </div>

          <h2 className="mt-6 font-display font-medium text-[34px] md:text-[48px] leading-[1.05] tracking-[-0.03em] text-cream-50">
            Cuatro capacidades sobre el{" "}
            <span className="text-amber-400">mismo dato.</span>
          </h2>

          <div className="mt-10 border-y border-[var(--hairline)] py-7">
            <dl className="grid grid-cols-2 md:grid-cols-4 gap-y-7 gap-x-4">
              {CIFRAS.map((c) => (
                <div key={c.label}>
                  <dt className="num font-display font-medium text-[30px] md:text-[38px] leading-none tracking-[-0.03em] text-cream-50">
                    {c.valor}
                  </dt>
                  <dd className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-cream-300 leading-[1.4]">
                    {c.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
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

        {/* El bento MagicUI, adaptado a licitaciones */}
        <div className="mt-14 md:mt-16 max-w-[1240px] mx-auto">
          <MotorBento />
        </div>
      </div>
    </section>
  );
}
