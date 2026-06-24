import { Check, Zap, ScrollText, Building2, Network } from "lucide-react";
import OCTableMock from "./mocks/OCTableMock";

interface RowProps {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  body: string;
  bullets: string[];
  flip?: boolean;
  visual: React.ReactNode;
  Icon: typeof Zap;
}

const Row = ({ index, eyebrow, title, body, bullets, flip, visual, Icon }: RowProps) => (
  <article className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center py-20 md:py-28 border-b border-[var(--hairline)] last:border-b-0">
    <div className={`lg:col-span-5 ${flip ? "lg:col-start-8" : ""}`}>
      <div className="flex items-center gap-3 mb-4">
        <span className="h-9 w-9 grid place-items-center bg-amber-400/10 border border-amber-400/25 rounded-md">
          <Icon className="h-4 w-4 text-amber-400" strokeWidth={1.6} />
        </span>
        <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-amber-400">
          {index} · {eyebrow}
        </span>
      </div>
      <h2 className="font-display font-medium text-[36px] md:text-[48px] lg:text-[56px] leading-[1.02] tracking-[-0.035em] text-cream-50">
        {title}
      </h2>
      <p className="mt-5 font-sans text-[16px] md:text-[17px] leading-[1.5] text-cream-200 max-w-[520px]">
        {body}
      </p>
      <ul className="mt-7 space-y-2.5">
        {bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-2.5 text-[14px] text-cream-100">
            <Check className="h-4 w-4 text-amber-400 flex-shrink-0 mt-0.5" strokeWidth={2.2} />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
    <div className={`lg:col-span-7 ${flip ? "lg:col-start-1 lg:row-start-1" : ""}`}>
      {visual}
    </div>
  </article>
);

const DetectionMock = () => (
  <div className="surface rounded-xl overflow-hidden shadow-[0_24px_60px_-20px_rgba(10,10,10,0.12)]">
    <div className="px-5 py-3 border-b border-[var(--hairline)] flex items-center justify-between bg-ink-900/40">
      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-cream-400">
        Filtros activos · perfil consultora
      </div>
      <div className="flex items-center gap-1.5 font-mono text-[10px] text-amber-400">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse-soft" />
        Live
      </div>
    </div>
    <div className="grid grid-cols-2 gap-3 p-5">
      <div className="border border-[var(--hairline)] rounded-md p-3 bg-ink-950/30">
        <div className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-cream-400">Servicios</div>
        <div className="mt-1.5 flex flex-wrap gap-1">
          {["Consultoría", "Auditoría", "Inspección"].map((s) => (
            <span key={s} className="font-mono text-[10px] px-1.5 py-0.5 border border-amber-400/30 bg-amber-400/[0.05] text-amber-400 rounded">
              {s}
            </span>
          ))}
        </div>
      </div>
      <div className="border border-[var(--hairline)] rounded-md p-3 bg-ink-950/30">
        <div className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-cream-400">Regiones</div>
        <div className="mt-1.5 flex flex-wrap gap-1">
          {["RM", "V", "VI", "VIII"].map((s) => (
            <span key={s} className="font-mono text-[10px] px-1.5 py-0.5 border border-cream-300 bg-cream-50/[0.04] text-cream-100 rounded">
              {s}
            </span>
          ))}
        </div>
      </div>
      <div className="border border-[var(--hairline)] rounded-md p-3 bg-ink-950/30">
        <div className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-cream-400">Monto</div>
        <div className="num font-display font-medium text-[18px] text-cream-50 mt-1">
          $20M – $300M
        </div>
      </div>
      <div className="border border-[var(--hairline)] rounded-md p-3 bg-ink-950/30">
        <div className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-cream-400">Score mínimo</div>
        <div className="num font-display font-medium text-[18px] text-amber-400 mt-1">
          70 / 100
        </div>
      </div>
    </div>
    <div className="border-t border-[var(--hairline)] px-5 py-3.5">
      <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-cream-400 mb-2.5">
        Resultado · 42 licitaciones matched · de 6.062
      </div>
      <div className="space-y-1.5">
        {[
          { l: "MINSAL · Insumos clínicos", s: 92 },
          { l: "MOP · Estudio carga vial", s: 84 },
          { l: "JUNAEB · Auditoría PAE", s: 71 },
        ].map((r, i) => (
          <div key={i} className="flex items-center gap-3 py-1.5 border-b border-[var(--hairline)] last:border-b-0">
            <span className={`num font-display font-medium text-[16px] leading-none ${r.s >= 85 ? "text-amber-400" : "text-cream-50"}`}>
              {r.s}
            </span>
            <span className="font-sans text-[12px] text-cream-100 flex-1 truncate">{r.l}</span>
            <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-amber-400">match</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ChatMock = () => (
  <div className="surface rounded-xl overflow-hidden shadow-[0_24px_60px_-20px_rgba(10,10,10,0.12)]">
    <div className="px-5 py-3 border-b border-[var(--hairline)] flex items-center justify-between bg-ink-900/40">
      <div>
        <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-cream-400">
          Lic. ID · 1057-887-LP25
        </div>
        <div className="font-display font-medium text-[14px] text-cream-50 mt-0.5">
          Estudio de carga vial Ruta CH-225
        </div>
      </div>
      <span className="font-mono text-[10px] text-amber-400 flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
        Score 84
      </span>
    </div>
    <div className="p-5 space-y-4">
      <div className="flex justify-end">
        <div className="max-w-[78%] bg-amber-400/10 border border-amber-400/25 rounded-2xl rounded-br-sm px-4 py-2.5">
          <p className="font-sans text-[13.5px] text-cream-50">
            ¿Qué acreditaciones técnicas exigen?
          </p>
        </div>
      </div>
      <div className="flex justify-start">
        <div className="max-w-[88%] border-l-2 border-amber-400 pl-4 py-1">
          <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-amber-400 mb-1.5">IAutoLicita · IA</div>
          <p className="font-sans text-[14px] leading-[1.55] text-cream-100">
            ISO 9001:2015 vigente, registro en MOP categoría 2A o superior, mínimo 3 obras similares en últimos 5 años. Las bases admiten consorcios siempre que el líder cumpla individualmente con el registro MOP.
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {["ISO 9001", "Registro MOP 2A", "3+ obras similares"].map((c) => (
              <span key={c} className="font-mono text-[9.5px] px-1.5 py-0.5 border border-amber-400/30 bg-amber-400/[0.06] text-amber-400 rounded">
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <div className="max-w-[78%] bg-amber-400/10 border border-amber-400/25 rounded-2xl rounded-br-sm px-4 py-2.5">
          <p className="font-sans text-[13.5px] text-cream-50">
            Resúmeme los riesgos.
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-cream-400 pl-4">
        <span className="flex gap-0.5">
          <span className="h-1 w-1 rounded-full bg-amber-400 animate-pulse-soft" />
          <span className="h-1 w-1 rounded-full bg-amber-400 animate-pulse-soft [animation-delay:0.2s]" />
          <span className="h-1 w-1 rounded-full bg-amber-400 animate-pulse-soft [animation-delay:0.4s]" />
        </span>
        Analizando bases técnicas · 847 KB
      </div>
    </div>
    <div className="border-t border-[var(--hairline)] px-5 py-3 flex items-center justify-between bg-ink-900/30">
      <span className="font-sans text-[12.5px] text-cream-400">Pregunta sobre esta licitación…</span>
      <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-cream-400">⌘ ↵</span>
    </div>
  </div>
);

const MultiOrgMock = () => (
  <div className="surface rounded-xl overflow-hidden shadow-[0_24px_60px_-20px_rgba(10,10,10,0.12)] p-7">
    <div className="flex items-center justify-between pb-5 border-b border-[var(--hairline)]">
      <div className="flex items-center gap-2.5">
        <span className="h-8 w-8 grid place-items-center bg-amber-400 text-ink-950 rounded-md font-bold text-[12px]">FN</span>
        <div>
          <div className="font-display font-medium text-[15px] text-cream-50">felipe@iautolicita.cl</div>
          <div className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-cream-400">cuenta principal · admin</div>
        </div>
      </div>
      <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-sage-400 flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-sage-400 animate-pulse-soft" />
        RLS aislado
      </span>
    </div>
    <div className="hidden md:block absolute left-1/2 mt-8 h-6 w-px bg-amber-400/30" />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-7">
      {[
        { name: "Consultora Andina", lic: 12, score: 75 },
        { name: "Lab. Etcheverry", lic: 28, score: 60 },
        { name: "Distrib. Sur", lic: 17, score: 70 },
      ].map((o, i) => (
        <div key={i} className="relative border border-[var(--hairline)] rounded-md p-4 bg-ink-950/30 hover:border-amber-400/40 transition-colors">
          <span className="hidden md:block absolute -top-1.5 left-4 h-1.5 w-1.5 bg-amber-400 rounded-full" />
          <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-cream-400 mb-2">org · {String(i + 1).padStart(2, "0")}</div>
          <div className="font-display font-medium text-[16px] text-cream-50 leading-tight">{o.name}</div>
          <div className="mt-3 pt-3 border-t border-[var(--hairline)] grid grid-cols-2 gap-2 font-mono text-[10px]">
            <div>
              <div className="text-cream-400">Score min.</div>
              <div className="num text-amber-400 mt-0.5">{o.score}</div>
            </div>
            <div>
              <div className="text-cream-400">Lic. activas</div>
              <div className="num text-cream-50 mt-0.5">{o.lic}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default function Features() {
  return (
    <section id="producto" className="py-8 md:py-16 relative">
      <div className="container-edge">
        {/* Section header */}
        <div className="text-center max-w-[720px] mx-auto mb-10 md:mb-16">
          <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-amber-400">
            Producto · capacidades
          </span>
          <h2 className="mt-5 font-display font-medium text-[40px] md:text-[60px] leading-[1.02] tracking-[-0.04em] text-cream-50">
            Todo el ciclo. <span className="text-cream-300">En un solo lugar.</span>
          </h2>
          <p className="mt-5 font-sans text-[17px] leading-[1.5] text-cream-200">
            Cinco capacidades operando en producción, una sobre la otra. Desde la ingesta hasta el seguimiento del pago, sin saltar a otra herramienta.
          </p>
        </div>

        <Row
          index="01"
          eyebrow="Detección + matching"
          Icon={Zap}
          title={
            <>
              Te entrega lo que <span className="text-amber-400">debes ver</span>. Filtra el resto.
            </>
          }
          body="Configura tu perfil con 20+ atributos: servicios, regiones, keywords, monto, acreditaciones. El motor de matching puntúa cada licitación nueva y te avisa solo cuando vale la pena."
          bullets={[
            "13 workflows sincronizando 24/7 con la API oficial",
            "Score automático por licitación + asignación multi-org",
            "Trigger Postgres asigna sin intervención manual",
          ]}
          visual={<DetectionMock />}
        />

        <Row
          index="02"
          eyebrow="Chat IA documental"
          Icon={ScrollText}
          flip
          title={
            <>
              No leas la base. <span className="text-amber-400">Conversa con ella.</span>
            </>
          }
          body="Cada licitación tiene su propio hilo IA con contexto completo de las bases técnicas. Pregunta en lenguaje natural sobre requisitos, plazos, criterios, riesgos y estrategia de postulación."
          bullets={[
            "6.061 bases técnicas enriquecidas con IA",
            "Persistencia por organización con RLS",
            "Tracking de tokens, cache y modelo usado",
          ]}
          visual={<ChatMock />}
        />

        <Row
          index="03"
          eyebrow="Único en Chile"
          Icon={Building2}
          title={
            <>
              Los demás se quedan en la licitación. Nosotros seguimos al{" "}
              <span className="text-amber-400">proveedor adjudicado</span>.
            </>
          }
          body="El módulo de Órdenes de Compra captura, vincula y expone toda la información que ocurre después de adjudicar. Es la pieza que ningún competidor del mercado chileno implementa."
          bullets={[
            "35.500 OCs históricas con 40+ campos por orden",
            "Calificación al proveedor + tiempo de cierre",
            "Vínculo OC ↔ licitación origen automático",
          ]}
          visual={<OCTableMock />}
        />

        <Row
          index="04"
          eyebrow="Multi-organización nativo"
          Icon={Network}
          flip
          title={
            <>
              Una cuenta. <span className="text-amber-400">Varias razones sociales.</span>
            </>
          }
          body="Si operas varias razones sociales o eres una consultora con varios clientes, los gestionas todos desde una sola cuenta. Cada perfil con su propio matching, equipo, notas y datos aislados."
          bullets={[
            "Row Level Security a nivel de base de datos",
            "Perfiles independientes por organización",
            "Routing automático según matching score",
          ]}
          visual={<MultiOrgMock />}
        />
      </div>
    </section>
  );
}
