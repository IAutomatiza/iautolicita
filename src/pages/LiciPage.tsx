import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  FileText,
  BarChart3,
  Search,
  Zap,
  Shield,
  Target,
  Sparkles,
  CheckCircle2,
  Send,
  MessageSquare,
  TrendingUp,
  Users,
  Bell,
  ChevronRight,
} from "lucide-react";
import WhatsAppButton from "../components/ui/WhatsAppButton";
import DotField from "../components/DotField";
import VortexLicitaciones from "../components/VortexLicitaciones";
import Footer from "../components/Footer";

/* ═══════════════════════════════════════════════════
   TYPEWRITER EFFECT for chat demo
═══════════════════════════════════════════════════ */

const suggestions = [
  { label: "Analizar bases", query: "Analiza los criterios de evaluacion de esta licitacion" },
  { label: "Precios reales", query: "Cuanto pagan por este producto en promedio?" },
  { label: "Competencia", query: "Quienes son mis competidores en MINSAL?" },
  { label: "Alertas IA", query: "Notificame licitaciones de TI sobre $50M" },
];

function HeroChatInput() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const charRef = useRef(0);

  useEffect(() => {
    const query = suggestions[activeIdx].query;
    charRef.current = 0;
    setDisplayText("");
    setIsTyping(true);

    const typeInterval = setInterval(() => {
      charRef.current += 1;
      if (charRef.current <= query.length) {
        setDisplayText(query.slice(0, charRef.current));
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);
        setTimeout(() => {
          setActiveIdx((i) => (i + 1) % suggestions.length);
        }, 2800);
      }
    }, 45);

    return () => clearInterval(typeInterval);
  }, [activeIdx]);

  return (
    <div className="w-full max-w-[640px] mx-auto">
      {/* Input */}
      <div className="relative group">
        <div
          className="absolute -inset-[1px] rounded-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: "linear-gradient(135deg, rgba(0,100,224,0.4), rgba(87,144,245,0.2), rgba(0,100,224,0.4))",
          }}
        />
        <div className="relative flex items-center gap-3 px-5 py-4 rounded-2xl bg-[#0F1118] backdrop-blur-xl">
          <Sparkles className="h-5 w-5 text-brand-400 shrink-0" strokeWidth={1.6} />
          <span className="flex-1 text-[15px] md:text-[16px] text-white/70 font-sans truncate">
            {displayText}
            {isTyping && (
              <span className="inline-block w-[2px] h-[18px] bg-brand-400 ml-0.5 align-middle animate-blink" />
            )}
          </span>
          <button className="h-9 w-9 rounded-xl bg-brand-600 grid place-items-center shrink-0 hover:bg-brand-500 transition-colors shadow-[0_0_20px_rgba(0,100,224,0.4)]">
            <Send className="h-4 w-4 text-white" strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Suggestion chips */}
      <div className="flex flex-wrap gap-2 mt-4 justify-center">
        {suggestions.map((s, i) => (
          <button
            key={s.label}
            onClick={() => setActiveIdx(i)}
            className={`px-3.5 py-1.5 rounded-full text-[12px] font-mono uppercase tracking-[0.06em] transition-all duration-300 border ${
              i === activeIdx
                ? "border-brand-400/50 bg-brand-400/10 text-brand-300 shadow-[0_0_12px_rgba(0,100,224,0.2)]"
                : "border-white/[0.06] bg-white/[0.03] text-white/40 hover:text-white/60 hover:border-white/10"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   Lici CHAT PANEL — Deel AI-style interactive demo
═══════════════════════════════════════════════════ */

const liciChatQuestions = [
  {
    icon: FileText,
    category: "Bases",
    question: "¿Cuales son los criterios de evaluacion de esta licitacion?",
    answer: "He analizado las bases de la licitacion 4500-12-LP24. Los criterios son:\n\n• Oferta tecnica: 40% (experiencia 15%, equipo 15%, metodologia 10%)\n• Oferta economica: 35%\n• Cumplimiento administrativo: 25%\n\nPlazo de entrega maximo: 45 dias corridos. Se requiere boleta de garantia por el 10% del monto ofertado.",
  },
  {
    icon: TrendingUp,
    category: "Precios",
    question: "¿Que precios pagan las instituciones por notebooks en 2024?",
    answer: "Basado en 12.847 ordenes de compra de notebooks en 2024:\n\n• Precio promedio: $487.320 CLP\n• Rango p25-p75: $389.000 — $612.000\n• Mejor precio por volumen (>50 uds): $421.500\n\nLos 3 proveedores con mejores precios adjudicados son Comercial Ing SpA, TecnoGlobal y PC Factory Empresas.",
  },
  {
    icon: Users,
    category: "Competencia",
    question: "¿Quienes son mis competidores en licitaciones de MINSAL?",
    answer: "En los ultimos 12 meses, MINSAL ha adjudicado 847 licitaciones en tu rubro. Los 5 competidores principales:\n\n1. Comercial Medica SpA — 34% adjudicaciones\n2. HealthSupply Ltda — 21% adjudicaciones\n3. MediTech Chile — 14% adjudicaciones\n4. BioEquipos SA — 9% adjudicaciones\n5. Tu empresa — 7% adjudicaciones\n\nOportunidad: MINSAL adjudica un 23% mas en Q1.",
  },
  {
    icon: Bell,
    category: "Alertas",
    question: "Configurame alertas para licitaciones de TI sobre $50M",
    answer: "Alerta configurada exitosamente:\n\n• Rubros: Tecnologia de la informacion, Software, Hardware\n• Monto minimo: $50.000.000 CLP\n• Organismos: Todos los organismos publicos\n• Frecuencia: Tiempo real + resumen diario 8:00 AM\n\nActualmente hay 3 licitaciones activas que coinciden con estos criterios. ¿Quieres que las analice?",
  },
];

function LiciChatPanel() {
  const [activeQ, setActiveQ] = useState<number | null>(null);
  const [isTypingResponse, setIsTypingResponse] = useState(false);
  const [displayedAnswer, setDisplayedAnswer] = useState("");
  const answerRef = useRef<number>(0);

  useEffect(() => {
    if (activeQ === null) return;

    const fullAnswer = liciChatQuestions[activeQ].answer;
    setIsTypingResponse(true);
    setDisplayedAnswer("");
    answerRef.current = 0;

    const typeInterval = setInterval(() => {
      answerRef.current += 2;
      if (answerRef.current <= fullAnswer.length) {
        setDisplayedAnswer(fullAnswer.slice(0, answerRef.current));
      } else {
        setDisplayedAnswer(fullAnswer);
        setIsTypingResponse(false);
        clearInterval(typeInterval);
      }
    }, 12);

    return () => clearInterval(typeInterval);
  }, [activeQ]);

  return (
    <div className="relative w-full max-w-[420px]">
      {/* Glow behind card */}
      <div
        className="absolute -inset-8 rounded-3xl pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 30%, rgba(0,100,224,0.15) 0%, transparent 70%)",
        }}
      />

      {/* Main card */}
      <div className="relative rounded-2xl border border-white/[0.08] bg-[#0a0e1a]/90 backdrop-blur-xl overflow-hidden shadow-[0_24px_80px_-12px_rgba(0,0,0,0.6)]">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-9 w-9 rounded-xl bg-brand-500/20 grid place-items-center">
              <MessageSquare className="h-4.5 w-4.5 text-brand-400" strokeWidth={1.8} />
            </div>
            <div>
              <h3 className="font-display font-medium text-[16px] text-white/90 tracking-[-0.01em]">
                Preguntale a Lici
              </h3>
              <p className="text-[11px] text-white/35 font-sans mt-0.5">
                Inteligencia de mercado en tiempo real
              </p>
            </div>
          </div>

          {/* Category tabs */}
          <div className="flex gap-1 mt-3">
            {["Inicio", "Bases", "Precios", "Competencia"].map((tab, i) => (
              <button
                key={tab}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-sans transition-all ${
                  i === 0
                    ? "bg-white/[0.08] text-white/70"
                    : "text-white/25 hover:text-white/40 hover:bg-white/[0.03]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Questions list / Answer view */}
        <div className="min-h-[340px] max-h-[400px] overflow-y-auto">
          <AnimatePresence mode="wait">
            {activeQ === null ? (
              <motion.div
                key="questions"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="px-4 py-3"
              >
                <p className="px-2 py-2 text-[10px] font-mono uppercase tracking-[0.14em] text-white/20">
                  Preguntas sugeridas
                </p>
                {liciChatQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveQ(i)}
                    className="w-full flex items-start gap-3 px-3 py-3 rounded-xl hover:bg-white/[0.04] transition-all group text-left"
                  >
                    <div className="h-8 w-8 rounded-lg bg-white/[0.04] group-hover:bg-brand-500/10 grid place-items-center shrink-0 mt-0.5 transition-colors">
                      <q.icon className="h-4 w-4 text-white/25 group-hover:text-brand-400 transition-colors" strokeWidth={1.6} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-mono uppercase tracking-[0.1em] text-brand-400/60">
                        {q.category}
                      </span>
                      <p className="text-[13px] text-white/55 group-hover:text-white/80 transition-colors leading-[1.4] mt-0.5">
                        {q.question}
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-white/10 group-hover:text-white/30 shrink-0 mt-1 transition-colors" strokeWidth={1.5} />
                  </button>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="answer"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.25 }}
                className="px-4 py-3"
              >
                {/* Back button */}
                <button
                  onClick={() => { setActiveQ(null); setDisplayedAnswer(""); }}
                  className="flex items-center gap-1.5 px-2 py-1.5 text-[11px] text-white/30 hover:text-white/60 transition-colors mb-3"
                >
                  <ArrowRight className="h-3 w-3 rotate-180" strokeWidth={2} />
                  Volver
                </button>

                {/* User question bubble */}
                <div className="flex justify-end mb-4">
                  <div className="max-w-[85%] px-4 py-2.5 rounded-2xl rounded-br-sm bg-brand-600/80 text-[13px] text-white/90 leading-[1.5]">
                    {liciChatQuestions[activeQ].question}
                  </div>
                </div>

                {/* Lici response */}
                <div className="flex gap-2.5">
                  <div className="h-7 w-7 rounded-lg bg-brand-500/15 grid place-items-center shrink-0">
                    <svg width="15" height="15" viewBox="0 0 32 32" fill="none">
                      <rect x="6" y="13" width="2.6" height="6" rx="1.3" fill="#e0f6ff" />
                      <rect x="10.8" y="9" width="2.6" height="14" rx="1.3" fill="#55b4f8" />
                      <rect x="15.6" y="5.5" width="2.6" height="21" rx="1.3" fill="#55b4f8" />
                      <rect x="20.4" y="9" width="2.6" height="14" rx="1.3" fill="#55b4f8" />
                      <rect x="25.2" y="13" width="2.6" height="6" rx="1.3" fill="#e0f6ff" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-mono text-brand-400/60 uppercase tracking-[0.1em]">Lici</span>
                    <div className="mt-1 text-[13px] text-white/65 leading-[1.65] whitespace-pre-line">
                      {displayedAnswer}
                      {isTypingResponse && (
                        <span className="inline-block w-[2px] h-[14px] bg-brand-400 ml-0.5 align-middle animate-blink" />
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input field at bottom */}
        <div className="px-4 py-3 border-t border-white/[0.06]">
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06]">
            <Sparkles className="h-4 w-4 text-white/15 shrink-0" strokeWidth={1.6} />
            <span className="flex-1 text-[13px] text-white/20 font-sans">
              Preguntale algo a Lici...
            </span>
            <Send className="h-4 w-4 text-white/15 shrink-0" strokeWidth={1.8} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   BENTO FEATURE CARDS
═══════════════════════════════════════════════════ */

const bentoFeatures = [
  {
    icon: FileText,
    title: "Lee bases completas",
    desc: "Procesa documentos de licitacion enteros y extrae criterios, plazos y requisitos en segundos.",
    span: "col-span-1",
    accent: "from-blue-500/20 to-cyan-500/10",
    mockup: (
      <div className="mt-4 space-y-2">
        {["Criterio tecnico: 40%", "Precio: 35%", "Experiencia: 25%"].map((t) => (
          <div key={t} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06]">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" strokeWidth={2} />
            <span className="text-[12px] text-white/60 font-mono">{t}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: BarChart3,
    title: "Precios reales por item",
    desc: "Historial de precios pagados en ordenes de compra. No estimaciones — datos concretos.",
    span: "col-span-1 md:col-span-2",
    accent: "from-amber-500/20 to-orange-500/10",
    mockup: (
      <div className="mt-4 flex items-end gap-1 h-[80px]">
        {[35, 55, 42, 68, 52, 74, 61, 80, 58, 72, 65, 85].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm bg-gradient-to-t from-brand-500/60 to-brand-400/30"
            style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }}
          />
        ))}
        <div className="absolute right-6 top-6">
          <div className="text-[28px] font-display font-medium text-white/90 num tracking-tight">$42.350</div>
          <div className="text-[10px] font-mono uppercase tracking-widest text-white/30">precio promedio</div>
        </div>
      </div>
    ),
  },
  {
    icon: Target,
    title: "Analisis competitivo",
    desc: "Quien compite contigo, cuanto cobran, que tan seguido ganan.",
    span: "col-span-1 md:col-span-2",
    accent: "from-purple-500/20 to-pink-500/10",
    mockup: (
      <div className="mt-4 space-y-2">
        {[
          { name: "Comercial Medica SpA", pct: 34, color: "bg-purple-400" },
          { name: "Tu empresa", pct: 22, color: "bg-brand-400" },
          { name: "Distribuidora Sur", pct: 18, color: "bg-white/20" },
        ].map((c) => (
          <div key={c.name} className="flex items-center gap-3">
            <div className="w-[100px] text-[11px] text-white/50 font-mono truncate">{c.name}</div>
            <div className="flex-1 h-2 rounded-full bg-white/[0.06] overflow-hidden">
              <div className={`h-full rounded-full ${c.color}`} style={{ width: `${c.pct}%` }} />
            </div>
            <div className="text-[11px] text-white/40 font-mono num w-8 text-right">{c.pct}%</div>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: Search,
    title: "Busqueda semantica",
    desc: "Describe lo que necesitas — Lici encuentra licitaciones relevantes aunque usen terminologia diferente.",
    span: "col-span-1",
    accent: "from-teal-500/20 to-emerald-500/10",
    mockup: null,
  },
  {
    icon: Shield,
    title: "Perfilamiento de organismos",
    desc: "Patrones de compra, montos promedio, proveedores favoritos y temporadas de actividad.",
    span: "col-span-1",
    accent: "from-sky-500/20 to-blue-500/10",
    mockup: null,
  },
  {
    icon: Zap,
    title: "Alertas contextualizadas",
    desc: "Lici evalua cada licitacion contra tu perfil y notifica solo oportunidades con alto potencial.",
    span: "col-span-1",
    accent: "from-yellow-500/20 to-amber-500/10",
    mockup: null,
  },
];

/* ═══════════════════════════════════════════════════
   VS TABLE
═══════════════════════════════════════════════════ */

const vsItems = [
  { label: "Lectura de bases con IA", lici: true, others: "Parcial" },
  { label: "Precio real pagado por item (OC)", lici: true, others: "No" },
  { label: "Analisis competitivo automatico", lici: true, others: "No" },
  { label: "Cobertura historica completa", lici: true, others: "Limitada" },
  { label: "Busqueda semantica", lici: true, others: "Keyword" },
  { label: "Recomendacion de precio optimo", lici: true, others: "No" },
];

/* ═══════════════════════════════════════════════════
   MAIN PAGE COMPONENT
═══════════════════════════════════════════════════ */

export default function LiciPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <style>{`
        @keyframes beam-slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* ═══ NAV ═══ */}
      <header className="fixed inset-x-0 top-0 z-40 bg-[#000115]/90 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="container-edge flex h-16 items-center justify-between">
          <Link to="/" className="flex items-baseline gap-2 shrink-0">
            <span className="font-display font-medium text-[22px] tracking-tightest leading-none text-white">
              <span className="text-brand-400">IA</span>utoLicita
              <span className="text-brand-400">.</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="hidden md:inline-flex items-center h-9 px-3 text-[13.5px] font-sans text-white/50 hover:text-white/80 transition-colors"
            >
              Plataforma
            </Link>
            <a
              href="https://app.iautolicita.cl"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center h-9 px-3 text-[13.5px] font-sans text-white/50 hover:text-white/80 transition-colors"
            >
              Iniciar sesion
            </a>
            <WhatsAppButton variant="primary" label="Probar Lici" />
          </div>
        </div>
      </header>

      <main className="bg-[#000115] text-white">
        {/* ═══════════════════════════════
            HERO — Antimetal-style dot field
        ═══════════════════════════════ */}
        <section className="relative min-h-[120vh] flex flex-col items-center justify-center overflow-hidden pt-16 pb-32">
          {/* Deep blue gradient base */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(180deg, #000115 0%, #000324 10%, #000a37 20%, #001560 35%, #002494 50%, #003ab3 62%, #035dd4 72%, #0882f7 82%, #55b4f8 92%, #b1dffa 100%)",
            }}
          />

          {/* Dot field canvas — the hero effect */}
          <div className="absolute inset-0">
            <DotField />
          </div>

          {/* Dark overlay behind text for readability */}
          <div
            className="absolute inset-0 pointer-events-none z-[1]"
            style={{
              background: "radial-gradient(ellipse 60% 40% at 50% 40%, rgba(0,1,21,0.75) 0%, transparent 100%)",
            }}
          />

          <div className="relative z-10 w-full container-edge flex flex-col items-center">
            {/* Lici identity pill */}
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-[#55b4f8]/20 bg-[#55b4f8]/[0.06] backdrop-blur-md mb-10">
              {/* La marca oficial de Lici, el mismo archivo que usa la app. */}
              <img
                src={`${import.meta.env.BASE_URL}brand/lici-icon-dark-glifo.png`}
                alt=""
                aria-hidden
                width={19}
                height={19}
                style={{ width: 19, height: 19 }}
              />
              <span className="font-sans text-[12px] text-white/60">
                Lee las bases de cada licitación y te responde con citas
              </span>
            </div>

            {/* Headline — clean, confident, lets the background breathe */}
            <h1
              className="font-display font-semibold text-[52px] md:text-[76px] lg:text-[96px] leading-[0.98] tracking-[-0.04em] text-center"
              style={{ textShadow: "0 2px 8px rgba(0,0,0,0.4)" }}
            >
              <span className="text-white/70">Conoce</span>{" "}
              <span className="text-white font-bold">
                Lici<span className="text-[#55b4f8]">.</span>
              </span>
            </h1>

            {/* Tagline */}
            <p
              className="mt-5 font-display font-medium text-[20px] md:text-[26px] leading-[1.2] tracking-[-0.02em] text-center text-white/80"
              style={{ textShadow: "0 2px 10px rgba(0,0,0,0.4)" }}
            >
              Tu asistente de licitaciones que piensa como estratega.
            </p>

            {/* Subtitle */}
            <p
              className="mt-5 max-w-[520px] text-center font-sans text-[15px] md:text-[17px] leading-[1.6] text-white/50"
              style={{ textShadow: "0 1px 6px rgba(0,0,0,0.4)" }}
            >
              Analiza bases, calcula precios optimos y mapea tu competencia.
              Entrenada sobre{" "}
              <span className="text-white/90 font-medium">6.4 millones de ordenes de compra</span>{" "}
              de ChileCompra.
            </p>

            {/* Chat input */}
            <div className="mt-12 w-full">
              <HeroChatInput />
            </div>
          </div>

          {/* Bottom gradient fade to next section */}
          <div
            className="absolute bottom-0 inset-x-0 h-32 pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, transparent, #000115)",
            }}
          />

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
            <div className="w-[1px] h-8 bg-gradient-to-b from-transparent to-white/20" />
            <ArrowRight className="h-3.5 w-3.5 text-white/20 rotate-90" strokeWidth={1.5} />
          </div>
        </section>

        {/* ═══════════════════════════════
            STATS BAR
        ═══════════════════════════════ */}
        <section className="border-y border-white/[0.06] bg-[#000218]">
          <div className="container-edge py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "441K", label: "Licitaciones analizadas" },
              { value: "6.4M", label: "Ordenes de compra" },
              { value: "<3s", label: "Tiempo de respuesta" },
              { value: "100%", label: "Cobertura ChileCompra" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display font-medium text-[36px] md:text-[44px] tracking-[-0.03em] num text-white/90">
                  {s.value}
                </div>
                <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════
            VÓRTICE DE DATOS — clon del text-vortex de
            contentarchitecture.dev (vía Mobbin): mitad texto,
            mitad panel con anillos de licitaciones girando
        ═══════════════════════════════ */}
        <section className="relative border-b border-white/[0.06]">
          <div className="grid lg:grid-cols-2">
            {/* Izquierda: el argumento */}
            <div className="flex items-center px-6 md:px-14 xl:px-20 py-20 lg:py-28 bg-[#000115]">
              <div className="max-w-[480px]">
                <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#55b4f8]">
                  Datos en vivo de ChileCompra
                </div>
                <h2 className="mt-6 font-display font-semibold text-[38px] md:text-[52px] leading-[1.02] tracking-[-0.03em] text-white">
                  Todo Mercado Público, girando en torno a lo que vendes.
                </h2>
                <p className="mt-6 font-sans text-[15px] md:text-[16px] leading-[1.65] text-white/50">
                  441 mil licitaciones, 7,2 millones de adjudicaciones y 6,4
                  millones de órdenes de compra orbitando un solo punto: tu
                  próxima oferta. Lici las ordena, las lee y te dice dónde
                  está el negocio.
                </p>
                <div className="mt-9">
                  <WhatsAppButton variant="primary" label="Probar Lici" />
                </div>
              </div>
            </div>

            {/* Derecha: el vórtice */}
            <div className="relative bg-[#05070d] min-h-[420px] md:min-h-[560px] lg:min-h-0 overflow-hidden border-t lg:border-t-0 lg:border-l border-white/[0.06]">
              <VortexLicitaciones />
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════
            Lici CHAT DEMO — Deel AI-style
        ═══════════════════════════════ */}
        <section className="py-24 md:py-32 bg-[#000115] relative overflow-hidden">
          {/* Subtle gradient orb */}
          <div
            className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at 70% 20%, rgba(0,100,224,0.06) 0%, transparent 60%)",
            }}
          />

          <div className="container-edge relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left — Text */}
              <div>
                <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30 mb-6">
                  <span className="text-brand-400">[01]</span>
                  <span className="h-px w-8 bg-white/10" />
                  <span>Interfaz conversacional</span>
                </div>

                <h2 className="font-display font-medium text-[32px] md:text-[48px] leading-[1.06] tracking-[-0.03em] text-white/90">
                  Pregunta lo que necesites.
                  <br />
                  <span className="text-brand-400">Lici responde con datos.</span>
                </h2>

                <p className="mt-6 font-sans text-[15px] md:text-[17px] leading-[1.65] text-white/40 max-w-[480px]">
                  Analiza bases de licitacion, consulta precios historicos, identifica
                  competidores y configura alertas inteligentes — todo desde una conversacion
                  natural con tu asistente de inteligencia de mercado.
                </p>

                <div className="mt-10 grid grid-cols-2 gap-4">
                  {[
                    { icon: FileText, label: "Bases de licitacion", sub: "Criterios, plazos y requisitos" },
                    { icon: TrendingUp, label: "Precios de mercado", sub: "Historial real de OC" },
                    { icon: Users, label: "Competidores", sub: "Adjudicaciones y patrones" },
                    { icon: Bell, label: "Alertas IA", sub: "Notificaciones contextuales" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                      <item.icon className="h-4.5 w-4.5 text-brand-400/60 shrink-0 mt-0.5" strokeWidth={1.6} />
                      <div>
                        <div className="text-[13px] text-white/70 font-sans">{item.label}</div>
                        <div className="text-[10px] text-white/25 font-mono mt-0.5">{item.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — Chat panel */}
              <div className="flex justify-center lg:justify-end">
                <LiciChatPanel />
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════
            BENTO FEATURES — dark cards with glow
        ═══════════════════════════════ */}
        <section className="py-24 md:py-32 bg-[#000115]">
          <div className="container-edge">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30 mb-6">
                <span className="text-brand-400">[02]</span>
                <span className="h-px w-8 bg-white/10" />
                <span>Capacidades</span>
              </div>
              <h2 className="font-display font-medium text-[32px] md:text-[52px] leading-[1.04] tracking-[-0.03em] text-white/90">
                No es un chatbot.
                <br />
                <span className="text-brand-400">Es inteligencia de mercado.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {bentoFeatures.map((feat) => (
                <div
                  key={feat.title}
                  className={`group relative ${feat.span} p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] transition-all duration-500 overflow-hidden`}
                >
                  {/* Gradient bg */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feat.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />
                  {/* Glow on hover */}
                  <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: "linear-gradient(135deg, rgba(0,100,224,0.15), transparent, rgba(0,100,224,0.1))",
                    }}
                  />
                  <div className="relative">
                    <feat.icon className="h-5 w-5 text-white/40 group-hover:text-brand-400 transition-colors duration-300" strokeWidth={1.6} />
                    <h3 className="mt-4 font-display font-medium text-[17px] tracking-[-0.01em] text-white/85">
                      {feat.title}
                    </h3>
                    <p className="mt-2 text-[13px] leading-[1.6] text-white/35 group-hover:text-white/50 transition-colors">
                      {feat.desc}
                    </p>
                    {feat.mockup}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════
            VS COMPARISON
        ═══════════════════════════════ */}
        <section className="py-24 md:py-32 border-t border-white/[0.06] bg-[#000120]">
          <div className="container-edge">
            <div className="text-center mb-14">
              <div className="flex items-center justify-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30 mb-6">
                <span className="text-brand-400">[03]</span>
                <span className="h-px w-8 bg-white/10" />
                <span>Comparacion</span>
              </div>
              <h2 className="font-display font-medium text-[32px] md:text-[48px] leading-[1.05] tracking-[-0.03em] text-white/90">
                Lo que Lici hace{" "}
                <span className="text-brand-400">diferente.</span>
              </h2>
            </div>

            <div className="max-w-[700px] mx-auto">
              <div className="rounded-2xl border border-white/[0.08] overflow-hidden bg-white/[0.02]">
                <div className="grid grid-cols-[1fr_100px_100px] md:grid-cols-[1fr_140px_140px] border-b border-white/[0.08]">
                  <div className="px-5 py-4 font-mono text-[10px] uppercase tracking-[0.14em] text-white/30">
                    Funcionalidad
                  </div>
                  <div className="px-3 py-4 text-center border-l border-white/[0.08] font-mono text-[10px] uppercase tracking-[0.14em] text-brand-400 font-semibold">
                    Lici
                  </div>
                  <div className="px-3 py-4 text-center border-l border-white/[0.08] font-mono text-[10px] uppercase tracking-[0.14em] text-white/30">
                    Otros
                  </div>
                </div>
                {vsItems.map((item, i) => (
                  <div
                    key={item.label}
                    className={`grid grid-cols-[1fr_100px_100px] md:grid-cols-[1fr_140px_140px] ${
                      i < vsItems.length - 1 ? "border-b border-white/[0.06]" : ""
                    } hover:bg-white/[0.02] transition-colors`}
                  >
                    <div className="px-5 py-3.5 text-[13px] text-white/60 font-sans">
                      {item.label}
                    </div>
                    <div className="px-3 py-3.5 flex items-center justify-center border-l border-white/[0.06]">
                      <CheckCircle2 className="h-4.5 w-4.5 text-emerald-400" strokeWidth={2} />
                    </div>
                    <div className="px-3 py-3.5 flex items-center justify-center border-l border-white/[0.06] text-[12px] text-white/25 font-mono">
                      {item.others}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════
            FINAL CTA
        ═══════════════════════════════ */}
        <section className="py-24 md:py-32 relative overflow-hidden bg-[#000115]">
          {/* Background glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none"
            style={{
              background: "radial-gradient(ellipse, rgba(0,100,224,0.12) 0%, transparent 60%)",
            }}
          />

          <div className="container-edge relative">
            <div className="max-w-[640px] mx-auto text-center">
              <h2 className="font-display font-medium text-[32px] md:text-[56px] leading-[1.04] tracking-[-0.03em] text-white/90">
                Empieza a ganar
                <br />
                <span className="serif-em text-brand-400">
                  licitaciones.
                </span>
              </h2>

              <p className="mt-6 max-w-[420px] mx-auto font-sans text-[15px] md:text-[17px] leading-[1.55] text-white/40">
                Agenda una demo personalizada y descubre como Lici transforma tu
                estrategia en ChileCompra.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
                <WhatsAppButton variant="huge" label="Agendar demo con Lici" />
              </div>

              <div className="mt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-white/20">
                Sin tarjeta de credito · Demo personalizada · Respuesta en 24h
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
