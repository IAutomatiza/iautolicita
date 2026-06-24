import { Building2, Shield } from "lucide-react";
import SectionLabel from "./ui/SectionLabel";

const orgs = [
  {
    name: "Consultora Técnica",
    detail: "Servicios profesionales · 5 regiones",
    score: "min. 75",
    licCount: 12,
  },
  {
    name: "Laboratorio Clínico",
    detail: "Salud pública · sin restricción regional",
    score: "min. 60",
    licCount: 28,
  },
  {
    name: "Distribuidora Industrial",
    detail: "Insumos y suministros · zona centro",
    score: "min. 70",
    licCount: 17,
  },
];

export default function MultiOrg() {
  return (
    <section className="py-24 md:py-32 relative bg-ink-900 border-y border-[var(--hairline-strong)]">
      <div className="absolute inset-0 bg-grid-faint bg-[size:48px_48px] opacity-50 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

      <div className="container-edge relative">
        <div className="grid lg:grid-cols-12 gap-10 mb-16">
          <div className="lg:col-span-5">
            <SectionLabel index="04" label="Multi-organización" />
            <h2 className="mt-6 font-display font-medium text-[40px] md:text-[56px] leading-[0.98] tracking-tightest text-cream-50">
              Una cuenta. <span className="serif-em text-amber-400">Varias razones sociales.</span> Datos aislados.
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 self-end">
            <p className="font-sans text-[16px] leading-[1.6] text-cream-200 max-w-[520px]">
              Si operas varias razones sociales o eres una consultora con varios clientes, los gestionas todos desde una sola cuenta. Cada perfil tiene su propio matching, su propio equipo y sus propias notas — con Row Level Security a nivel de base de datos.
            </p>
          </div>
        </div>

        {/* Diagram */}
        <div className="border border-[var(--hairline-strong)] surface p-8 md:p-12 relative">
          {/* Account header */}
          <div className="flex items-center justify-between border-b border-[var(--hairline)] pb-5 mb-8">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 grid place-items-center bg-amber-400/10 border border-amber-400/30">
                <Shield className="h-4 w-4 text-amber-400" strokeWidth={1.6} />
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream-400">
                  Cuenta principal
                </div>
                <div className="font-display font-medium text-[20px] text-cream-50">
                  empresa@iautolicita.cl
                </div>
              </div>
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-sage-400 flex items-center gap-1.5 hidden md:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-sage-400 animate-pulse-soft" />
              RLS Postgres · datos aislados
            </div>
          </div>

          {/* Connection lines (decorative) */}
          <div className="hidden md:block absolute left-1/2 top-[120px] -translate-x-1/2 w-px h-12 bg-amber-400/30" />

          {/* Orgs */}
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {orgs.map((o, i) => (
              <div
                key={i}
                className="relative border border-[var(--hairline-strong)] p-5 hover:border-amber-400/50 transition-colors group"
              >
                {/* Connection node */}
                <div className="hidden md:block absolute -top-2 left-6 h-2 w-2 bg-amber-400" />

                <div className="flex items-start justify-between mb-4">
                  <div className="h-9 w-9 grid place-items-center border border-[var(--hairline-strong)] group-hover:border-amber-400/50 transition-colors">
                    <Building2 className="h-4 w-4 text-cream-100" strokeWidth={1.4} />
                  </div>
                  <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-cream-400">
                    org · {String(i + 1).padStart(2, "0")}
                  </div>
                </div>

                <div className="font-display font-medium text-[20px] text-cream-50 leading-tight">
                  {o.name}
                </div>
                <div className="mt-1 font-sans text-[12px] text-cream-300">
                  {o.detail}
                </div>

                <div className="mt-5 pt-4 border-t border-[var(--hairline)] grid grid-cols-2 gap-3 font-mono text-[10px] uppercase tracking-[0.16em]">
                  <div>
                    <div className="text-cream-400">Score</div>
                    <div className="text-amber-400 mt-0.5 num">{o.score}</div>
                  </div>
                  <div>
                    <div className="text-cream-400">Lic. activas</div>
                    <div className="text-cream-50 mt-0.5 num">{o.licCount}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
