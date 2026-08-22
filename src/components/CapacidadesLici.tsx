import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import MotorBento from "./MotorBento";
import useInView from "../hooks/useInView";

/* ════════════════════════════════════════════════════════════
   "El motor, por dentro" — encabezado centrado con la banda de
   cifras (patrón Shopify Plus) y la GradientPill de ClickUp con
   Lici, seguidos del bento clonado de MagicUI.

   Entrada al hacer scroll: el encabezado llega escalonado con el
   mismo blur-fade de las tarjetas (la clase .bento-in vive en el
   <style> del bento) y las cifras cuentan desde cero hasta su
   valor real cuando la banda entra en pantalla. La base es
   visible siempre: la animación solo corre al entrar en vista.
═══════════════════════════════════════════════════════════════ */

const CIFRAS = [
  { valor: "441K", label: "licitaciones" },
  { valor: "7,2M", label: "adjudicaciones" },
  { valor: "6,4M", label: "órdenes de compra" },
  { valor: "99,94%", label: "cobertura del día" },
];

/* Una cifra que cuenta de 0 al valor real, respetando el formato
   chileno (coma decimal) y el sufijo (K, M, %). */
const Cifra = ({
  valor,
  label,
  enVista,
  retardo,
}: {
  valor: string;
  label: string;
  enVista: boolean;
  retardo: number;
}) => {
  const m = valor.match(/^([\d.,]+)(.*)$/);
  const objetivo = m ? parseFloat(m[1].replace(",", ".")) : 0;
  const dec = m ? (m[1].split(",")[1] || "").length : 0;
  const sufijo = m ? m[2] : "";
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!enVista) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(objetivo);
      return;
    }
    const dur = 1500;
    const t0 = performance.now() + retardo * 1000;
    let raf = 0;
    const paso = (t: number) => {
      const p = Math.min(1, Math.max(0, (t - t0) / dur));
      setN(objetivo * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(paso);
    };
    raf = requestAnimationFrame(paso);
    return () => cancelAnimationFrame(raf);
  }, [enVista, objetivo, retardo]);

  return (
    <div>
      <dt className="num font-display font-medium text-[30px] md:text-[38px] leading-none tracking-[-0.03em] text-cream-50 tabular-nums">
        {n.toLocaleString("es-CL", { minimumFractionDigits: dec, maximumFractionDigits: dec })}
        {sufijo}
      </dt>
      <dd className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-cream-300 leading-[1.4]">
        {label}
      </dd>
    </div>
  );
};

export default function CapacidadesLici() {
  const [ref, enVista] = useInView<HTMLDivElement>(0.25);

  return (
    <section id="capacidades" className="py-16 md:py-28">
      <div className="container-edge">
        <div ref={ref} className="max-w-[860px] mx-auto text-center">
          <div
            className={`flex items-center justify-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.22em] text-cream-300 ${enVista ? "bento-in" : ""}`}
          >
            <span className="h-px w-8 bg-cream-300/30" />
            <span>El motor, por dentro</span>
            <span className="h-px w-8 bg-cream-300/30" />
          </div>

          <h2
            style={{ animationDelay: "0.1s" }}
            className={`mt-6 font-display font-medium text-[34px] md:text-[48px] leading-[1.05] tracking-[-0.03em] text-cream-50 ${enVista ? "bento-in" : ""}`}
          >
            Cuatro capacidades sobre el{" "}
            <span className="text-amber-400">mismo dato.</span>
          </h2>

          <div
            style={{ animationDelay: "0.2s" }}
            className={`mt-10 border-y border-[var(--hairline)] py-7 ${enVista ? "bento-in" : ""}`}
          >
            <dl className="grid grid-cols-2 md:grid-cols-4 gap-y-7 gap-x-4">
              {CIFRAS.map((c, i) => (
                <Cifra key={c.label} valor={c.valor} label={c.label} enVista={enVista} retardo={0.25 + i * 0.12} />
              ))}
            </dl>
          </div>
          {/* La GradientPill de clickup.com ("The Best AI is Brain²"),
              clonada con Lici en el rol de Brain: borde orbitado por el
              cometa de degradado, interior blanco, wordmark y chevron. */}
          <Link
            to="/lici"
            style={{ animationDelay: "0.32s" }}
            className={`pill-brain mt-7 ${enVista ? "bento-in" : ""}`}
          >
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
