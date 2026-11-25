/* ════════════════════════════════════════════════════════════
   Planes — /precios. 25-nov-2026: Carlos vio la versión de 3
   tarjetas angostas («se ve pésimo») y eligió de 3 variantes la A:
   Alertas al frente, en una tarjeta grande con el botón siempre a
   la vista; Pro y Max abajo, bajo «¿Trabajas con un equipo?».
   Pro/Max salen de `src/lib/planes.ts` (generado); Alertas
   ($9.990 IVA incluido, 14 días gratis) se escribe acá.
═══════════════════════════════════════════════════════════════ */
import { useState } from "react";
import { Check, MoveRight } from "lucide-react";
import { PLAN } from "../lib/planes";
import { enlaceApp } from "../lib/cta";

const APP = enlaceApp("planes");
const clp = (n: number) => "$" + n.toLocaleString("es-CL");
const AZUL = "#0064E0";

const ALERTAS = {
  nombre: "Alertas",
  para: "Para enterarte a tiempo de lo que el Estado compra de lo tuyo.",
  items: [
    "Licitaciones y Compras Ágiles que calzan con lo que vendes",
    "Cada mañana en tu correo, ordenadas por cierre",
    "En todo Chile o solo en tus regiones",
    "Sin RUT para empezar",
  ],
};
const PRO = {
  nombre: "Pro",
  para: "Para la empresa que postula todos los meses.",
  items: ["Todo lo de Alertas, al instante", "Lici sin límite: te lee las bases", `${PLAN.pro.usuarios} usuarios`],
};
const MAX = {
  nombre: "Max",
  para: "Para el equipo que vive de licitar.",
  items: ["Todo lo de Pro", "Varios RUT en una cuenta", "Presupuestos y cobranza"],
};

function Toggle({ anual, set }: { anual: boolean; set: (v: boolean) => void }) {
  return (
    <button type="button" onClick={() => set(!anual)} className="inline-flex items-center gap-2 font-sans text-[14px] text-cream-50">
      <span className="relative h-5 w-9 rounded-full transition-colors" style={{ background: anual ? AZUL : "#D6D3D1" }}>
        <span className="absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform" style={{ transform: `translateX(${anual ? 16 : 0}px)` }} />
      </span>
      Pago anual <span className="text-brand-600">(2 meses gratis)</span>
    </button>
  );
}
const precioPM = (neto: number, anual: boolean) => (anual ? Math.round((neto * 10) / 12) : neto);

function Boton({ txt, lleno }: { txt: string; lleno?: boolean }) {
  return (
    <a
      href={APP}
      className={`inline-flex h-12 w-full items-center justify-center gap-2 rounded-full px-6 font-sans text-[15px] font-medium transition-colors ${
        lleno ? "text-white hover:opacity-90" : "border border-[var(--hairline-strong)] bg-white text-cream-50 hover:bg-ink-900"
      }`}
      style={lleno ? { background: AZUL, boxShadow: "0 10px 30px -10px rgba(0,100,224,.55)" } : undefined}
    >
      {txt} <MoveRight className="h-4 w-4" />
    </a>
  );
}
function Lista({ items, grande }: { items: string[]; grande?: boolean }) {
  return (
    <ul className={`flex flex-col ${grande ? "gap-3" : "gap-2.5"}`}>
      {items.map((t) => (
        <li key={t} className={`flex gap-3 font-sans ${grande ? "text-[16px]" : "text-[15px]"} leading-snug text-cream-50`}>
          <Check className="mt-0.5 h-[18px] w-[18px] shrink-0 text-brand-600" strokeWidth={2.4} />
          {t}
        </li>
      ))}
    </ul>
  );
}

export default function Planes() {
  const [anual, setAnual] = useState(false);
  return (
    <section id="planes" className="container-edge scroll-mt-28 pt-10 pb-20 lg:pt-12">
      <div className="mx-auto max-w-[1080px]">
        <div>
          <h1 className="font-display text-[34px] font-semibold leading-[1.05] tracking-[-0.03em] text-cream-50 md:text-[46px]">
            Cuesta menos que perder <span className="text-brand-600 italic">una licitación.</span>
          </h1>
          <p className="mt-2 font-sans text-[16px] text-cream-300">Sin permanencia · cancelas cuando quieras</p>
        </div>

        <div className="mt-7 grid overflow-hidden rounded-2xl border-2 bg-white shadow-[0_30px_60px_-30px_rgba(0,100,224,.35)] md:grid-cols-[1fr_1.1fr]" style={{ borderColor: AZUL }}>
          <div className="flex flex-col justify-between gap-6 p-7 md:p-9" style={{ background: "linear-gradient(160deg,#F2F7FF,#FFFFFF 70%)" }}>
            <div>
              <span className="inline-flex rounded-full px-3 py-1 font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-white" style={{ background: AZUL }}>
                Para empezar
              </span>
              <h2 className="mt-4 font-display text-[30px] font-semibold tracking-[-0.02em] text-cream-50">{ALERTAS.nombre}</h2>
              <p className="mt-1 font-sans text-[15px] text-cream-300">{ALERTAS.para}</p>
            </div>
            <div>
              <p className="flex items-baseline gap-2">
                <span className="font-display text-[56px] font-semibold leading-none tracking-[-0.03em] text-cream-50 md:text-[64px]">$9.990</span>
                <span className="font-sans text-[15px] text-cream-300">al mes · IVA incluido</span>
              </p>
              <p className="mt-2 font-sans text-[15px] font-medium text-brand-600">14 días gratis, sin tarjeta</p>
            </div>
            <Boton txt="Probar 14 días gratis" lleno />
          </div>
          <div className="flex flex-col justify-center gap-5 border-t border-[var(--hairline)] p-7 md:border-l md:border-t-0 md:p-9">
            <p className="font-sans text-[13px] font-semibold uppercase tracking-[0.12em] text-cream-400">Lo que incluye</p>
            <Lista items={ALERTAS.items} grande />
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-3">
          <h3 className="font-display text-[24px] font-semibold tracking-[-0.02em] text-cream-50">¿Trabajas con un equipo?</h3>
          <Toggle anual={anual} set={setAnual} />
        </div>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {[PRO, MAX].map((p) => {
            const neto = p === PRO ? PLAN.pro.neto : PLAN.max.neto;
            return (
              <div key={p.nombre} className="flex flex-col gap-5 rounded-2xl border border-[var(--hairline)] bg-white p-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="font-display text-[24px] font-semibold text-cream-50">{p.nombre}</h4>
                    <p className="mt-1 font-sans text-[14px] text-cream-300">{p.para}</p>
                  </div>
                  <p className="text-right">
                    <span className="block font-display text-[32px] font-semibold leading-none tracking-[-0.02em] text-cream-50">{clp(precioPM(neto, anual))}</span>
                    <span className="font-sans text-[13px] text-cream-300">+ IVA / mes{anual ? " · pago anual" : ""}</span>
                  </p>
                </div>
                <Lista items={p.items} />
                <div className="mt-auto"><Boton txt={`Contratar ${p.nombre}`} /></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

