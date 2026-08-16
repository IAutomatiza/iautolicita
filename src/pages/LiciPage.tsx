import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  FileText,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  Send,
  MessageSquare,
  TrendingUp,
  Users,
  Bell,
} from "lucide-react";
import WhatsAppButton from "../components/ui/WhatsAppButton";
import VortexLicitaciones from "../components/VortexLicitaciones";
import LiciGlifo from "../components/LiciGlifo";
import AsciiRain from "../components/AsciiRain";
import Footer from "../components/Footer";
import { buildWAUrl, MSG_DEMO } from "../lib/whatsapp";
import useInView from "../hooks/useInView";

/* ════════════════════════════════════════════════════════════
   Ventana terminal "Problemas de siempre" — clon del bloque
   "COMMON PROBLEMS" del original: título mono en la barra y
   líneas numeradas que se tipean al entrar en pantalla.
═══════════════════════════════════════════════════════════════ */

const PROBLEMAS = [
  "Bases de 80 páginas a las 11 de la noche",
  'Precio "por si acaso" que regala margen',
  "Inadmisible por un anexo en la página 47",
  "La licitación perfecta, descubierta tarde",
  "El portal abierto en 12 pestañas",
];

function TerminalProblemas() {
  const [ref, inView] = useInView<HTMLDivElement>(0.35);
  const total = PROBLEMAS.reduce((s, l) => s + l.length + 1, 0);
  const [chars, setChars] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setChars(total);
      return;
    }
    const t = setInterval(() => {
      setChars((c) => {
        if (c >= total) {
          clearInterval(t);
          return c;
        }
        return c + 1;
      });
    }, 26);
    return () => clearInterval(t);
  }, [inView, total]);

  let restante = chars;
  const lineas = PROBLEMAS.map((l) => {
    const visibles = Math.max(0, Math.min(l.length, restante));
    restante -= l.length + 1;
    return l.slice(0, visibles);
  });
  const activa = lineas.findIndex((l, i) => l.length < PROBLEMAS[i].length);

  return (
    <div
      ref={ref}
      className="rounded-xl bg-[#1F2126] overflow-hidden border border-black/25 shadow-[0_28px_70px_-28px_rgba(10,10,10,0.45)]"
    >
      <div className="px-5 py-3 border-b border-white/10 font-mono text-[11px] uppercase tracking-[0.18em] text-white/50">
        Problemas de siempre
      </div>
      <div className="px-5 py-6 min-h-[270px] space-y-3.5">
        {lineas.map(
          (l, i) =>
            (l.length > 0 || i === 0 || activa === i) && (
              <div key={i} className="flex gap-4 font-mono text-[13px] leading-[1.5]">
                <span className="text-white/25 shrink-0">
                  {String(i + 1).padStart(3, "0")}
                </span>
                <span className="text-white/80">
                  {l}
                  {activa === i && (
                    <span className="inline-block w-[7px] h-[13px] bg-white/70 ml-1 align-middle animate-blink" />
                  )}
                </span>
              </div>
            )
        )}
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
  const [faqAbierta, setFaqAbierta] = useState<number | null>(0);

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
            HERO — clon del split-hero de contentarchitecture.dev
            (vía Mobbin): panel crema con eyebrow mono, titular
            enorme, botones oscuros tipo GET/ACCESS y línea de
            specs con cursor; el vórtice de datos llena la derecha.
        ═══════════════════════════════ */}
        <section className="relative grid lg:grid-cols-2 min-h-[100svh]">
          {/* IZQUIERDA — panel azul Lici, cohesionado con la nav:
              el glifo y el wordmark en grande como en la app, el
              titular con el azul de "Hola, Camila" y los botones y
              specs del clon en versión oscura */}
          <div className="relative bg-[#000115] text-white flex flex-col justify-center px-6 md:px-14 xl:px-20 pt-32 pb-40 lg:py-0 overflow-hidden">
            {/* Resplandor y trama de puntos, como el módulo Lici */}
            <div
              aria-hidden
              className="absolute -bottom-48 -left-48 w-[640px] h-[640px] rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(0,58,179,0.38) 0%, transparent 65%)",
              }}
            />
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(85,180,248,0.12) 1px, transparent 1px)",
                backgroundSize: "22px 22px",
                maskImage:
                  "radial-gradient(ellipse at 15% 85%, black, transparent 60%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse at 15% 85%, black, transparent 60%)",
              }}
            />

            <div className="relative max-w-[560px]">
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/45">
                Tu analista de licitaciones.
              </div>

              {/* La marca en grande, como la cabecera del módulo en la app */}
              <div className="mt-7 flex items-center gap-3.5">
                <span className="grid place-items-center h-12 w-12 rounded-xl border border-white/25 bg-white/[0.04]">
                  <LiciGlifo alto={27} />
                </span>
                <span className="font-display font-bold text-[34px] tracking-[-0.02em] leading-none">
                  Lici<span className="text-[#55b4f8]">.</span>
                </span>
              </div>

              <h1 className="mt-7 font-display font-semibold text-[44px] md:text-[54px] xl:text-[62px] leading-[1.03] tracking-[-0.03em]">
                Se lee todo.
                <br />
                <span
                  className="text-transparent bg-clip-text"
                  style={{
                    backgroundImage:
                      "linear-gradient(92deg, #55b4f8 0%, #2f7ff0 55%, #0064E0 100%)",
                  }}
                >
                  Y te dice cómo ganar.
                </span>
              </h1>

              <p className="mt-7 font-sans text-[16px] md:text-[17px] leading-[1.6] text-white/55 max-w-[460px]">
                Analiza las bases completas, calcula el precio para ganar y
                mapea tu competencia — entrenada sobre 6,4 millones de
                órdenes de compra de ChileCompra. Y siempre responde con la
                cita a la página exacta.
              </p>

              {/* Botones al estilo GET / ACCESS del original, en claro */}
              <div className="mt-9 flex items-center gap-1.5">
                <a
                  href={buildWAUrl(MSG_DEMO)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center h-12 px-6 rounded-lg bg-[#F2F0EA] font-mono text-[12px] uppercase tracking-[0.14em] text-[#16161A] hover:bg-[#0064E0] hover:text-white transition-colors duration-200"
                >
                  Probar Lici
                </a>
                <a
                  href="https://app.iautolicita.cl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative inline-flex items-center h-12 px-6 rounded-lg bg-[#F2F0EA] font-mono text-[12px] uppercase tracking-[0.14em] text-[#16161A] hover:bg-[#0064E0] hover:text-white transition-colors duration-200"
                >
                  Acceder
                  <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-[#0064E0]" />
                </a>
              </div>
            </div>

            {/* Línea de specs abajo, como el status bar del original */}
            <div className="relative mt-16 lg:mt-0 lg:absolute lg:bottom-9 lg:left-14 xl:left-20 lg:right-10 font-mono text-[11px] uppercase tracking-[0.06em] text-white/40">
              <div className="flex flex-wrap gap-x-10 gap-y-1.5">
                <span>441K licitaciones</span>
                <span>7,2M adjudicaciones</span>
                <span>6,4M OC</span>
                <span>Respuesta: &lt;3s</span>
              </div>
              <div className="mt-1.5 flex flex-wrap gap-x-10 gap-y-1.5">
                <span>Bases: cargadas</span>
                <span>Citas: página exacta</span>
                <span>
                  Cobertura: 99,94%
                  <span className="inline-block w-[7px] h-[13px] bg-[#55b4f8] ml-1.5 align-middle animate-blink" />
                </span>
              </div>
            </div>
          </div>

          {/* DERECHA — el vórtice de datos */}
          <div className="relative bg-[#05070d] min-h-[440px] md:min-h-[560px] lg:min-h-0 overflow-hidden border-t lg:border-t-0 lg:border-l border-white/[0.06]">
            <VortexLicitaciones />
          </div>
        </section>

        {/* ═══════════════════════════════
            PROBLEMAS — sección crema con ventana terminal tipeada,
            clon del bloque "COMMON PROBLEMS" del original
        ═══════════════════════════════ */}
        <section className="bg-[#F2F0EA] text-[#0A0A0A] py-24 md:py-32">
          <div className="container-edge grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            <TerminalProblemas />
            <div>
              <h2 className="font-display font-semibold text-[34px] md:text-[46px] leading-[1.06] tracking-[-0.03em]">
                Leerse las bases enteras cuesta días. Cada vez.
              </h2>
              <p className="mt-6 font-sans text-[16px] leading-[1.65] text-[#0A0A0A]/65 max-w-[520px]">
                No es lo difícil lo que duele: son las 80 páginas por
                licitación, el anexo escondido, la garantía en la letra chica.
                Lici se las lee completas en segundos y responde con la cita a
                la página exacta — tu tiempo se gasta en ofertar, no en leer.
              </p>
              <p className="mt-5 font-sans text-[15px] leading-[1.6] text-[#0A0A0A]/45 max-w-[520px]">
                Esta es la parte que nadie cobra y todos pagan. Días perdidos
                antes de que empiece el trabajo real.
              </p>
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
                <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40 mb-6">
                  Esta es Lici — en vivo.
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
            CAPACIDADES — lluvia ASCII de fondo, declaración
            gigante y features numeradas escalonadas, clon de las
            secciones oscuras del original
        ═══════════════════════════════ */}
        <section className="relative py-28 md:py-40 bg-[#05070d] overflow-hidden border-y border-white/[0.06]">
          <AsciiRain opacidad={0.085} />
          <div className="container-edge relative">
            <h2 className="max-w-[760px] font-display font-semibold text-[38px] md:text-[58px] leading-[1.04] tracking-[-0.03em] text-white">
              Cada licitación ya viene leída. Tú solo decides.
            </h2>

            <div className="mt-20 md:mt-28 space-y-16 md:space-y-20">
              {[
                {
                  n: "001",
                  t: "Radar con score de calce",
                  d: "Cada licitación nueva se puntúa 0–100 contra tu perfil apenas se publica. Las que calzan llegan solas; el resto ni lo ves.",
                  ml: "",
                },
                {
                  n: "002",
                  t: "El precio real, ítem por ítem",
                  d: "Lo que el Estado efectivamente pagó por lo mismo, calculado sobre 6,4 millones de órdenes de compra. Ofertas sabiendo dónde está la mediana.",
                  ml: "md:ml-[24%]",
                },
                {
                  n: "003",
                  t: "Citas a la página exacta",
                  d: "Cada respuesta trae su fuente: página, sección y texto original de las bases. Nada que confiar a ciegas — todo verificable.",
                  ml: "md:ml-[7%]",
                },
                {
                  n: "004",
                  t: "Competencia mapeada",
                  d: "Quién gana en tu rubro, con qué precios y ante qué organismos. La cancha completa antes de entrar a jugar.",
                  ml: "md:ml-[32%]",
                },
                {
                  n: "005",
                  t: "Alertas antes del cierre",
                  d: "Fechas, riesgos y documentos exigidos, avisados con días de ventaja. Ninguna se cierra sin que lo sepas.",
                  ml: "md:ml-[14%]",
                },
              ].map((f) => (
                <div key={f.n} className={`max-w-[380px] ${f.ml}`}>
                  <div className="font-mono text-[13px] uppercase tracking-[0.12em] text-white">
                    {f.n} / {f.t}
                  </div>
                  <p className="mt-3 font-sans text-[14.5px] leading-[1.65] text-white/55">
                    {f.d}
                  </p>
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
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40 mb-6">
                Lici vs el resto
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
            FAQ — "Antes de probar", clon del Q.00X del original
        ═══════════════════════════════ */}
        <section className="py-24 md:py-32 border-t border-white/[0.06] bg-[#000115]">
          <div className="container-edge grid lg:grid-cols-[1fr_1.5fr] gap-14 lg:gap-20 items-start">
            <div>
              <h2 className="font-display font-semibold text-[40px] md:text-[52px] leading-[1.04] tracking-[-0.03em] text-white">
                Antes de probar
              </h2>
              <div className="mt-10 flex items-center gap-1.5">
                <a
                  href={buildWAUrl(MSG_DEMO)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center h-12 px-6 rounded-lg bg-[#F2F0EA] font-mono text-[12px] uppercase tracking-[0.14em] text-[#16161A] hover:bg-[#0064E0] hover:text-white transition-colors duration-200"
                >
                  Probar Lici
                </a>
                <a
                  href="https://app.iautolicita.cl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative inline-flex items-center h-12 px-6 rounded-lg bg-[#F2F0EA] font-mono text-[12px] uppercase tracking-[0.14em] text-[#16161A] hover:bg-[#0064E0] hover:text-white transition-colors duration-200"
                >
                  Acceder
                  <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-[#0064E0]" />
                </a>
              </div>
            </div>

            <div className="border-t border-white/10">
              {[
                {
                  q: "¿De dónde saca Lici sus datos?",
                  a: "De ChileCompra: 441 mil licitaciones, 7,2 millones de adjudicaciones y 6,4 millones de órdenes de compra, actualizadas todos los días. Nada de bases de terceros ni datos de muestra.",
                },
                {
                  q: "¿Cómo sé que no inventa?",
                  a: "Cada afirmación llega con la cita a la página exacta de las bases o al dato de origen. Puedes verificar todo contra el documento original sin salir de la conversación.",
                },
                {
                  q: "¿Sirve para mi rubro?",
                  a: "Lici cubre todo lo que compra el Estado — desde construcción e insumos médicos hasta servicios y tecnología. Tu perfil se arma con tu RUT y tu historial real de ventas.",
                },
                {
                  q: "¿Cuánto demora en leer unas bases?",
                  a: "Segundos. Bases de 80 páginas, anexos y garantías incluidos. La respuesta a una consulta llega en menos de 3 segundos.",
                },
                {
                  q: "¿Necesito saber de licitaciones?",
                  a: "No. Le preguntas en tu idioma — \"¿me conviene postular?\", \"¿cuánto ofertar?\" — y responde con los datos y su explicación. La experiencia la pone ella.",
                },
              ].map((f, i) => (
                <div key={f.q} className="border-b border-white/10">
                  <button
                    onClick={() => setFaqAbierta(faqAbierta === i ? null : i)}
                    className="w-full flex items-center gap-4 py-5 text-left group"
                  >
                    <span className="font-mono text-[12px] text-white/30 shrink-0">
                      Q.{String(i + 1).padStart(3, "0")} /
                    </span>
                    <span className="flex-1 font-mono text-[13px] uppercase tracking-[0.06em] text-white/80 group-hover:text-white transition-colors">
                      {f.q}
                    </span>
                    <span className="grid place-items-center h-7 w-7 border border-white/15 text-white/50 text-[15px] leading-none shrink-0">
                      {faqAbierta === i ? "−" : "+"}
                    </span>
                  </button>
                  {faqAbierta === i && (
                    <p className="pb-6 md:pl-[72px] pr-4 font-sans text-[14px] leading-[1.65] text-white/50">
                      {f.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════
            FINAL CTA — crema, botones GET/ACCESS y specs
        ═══════════════════════════════ */}
        <section className="bg-[#F2F0EA] text-[#0A0A0A] py-28 md:py-36">
          <div className="container-edge">
            <div className="max-w-[820px]">
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#0A0A0A]/60">
                Tu próxima licitación ya se publicó.
              </div>
              <h2 className="mt-6 font-display font-semibold text-[40px] md:text-[58px] leading-[1.03] tracking-[-0.03em]">
                Deja que Lici se la lea.{" "}
                <span className="text-[#0064E0]">Tú dedícate a ganarla.</span>
              </h2>
              <p className="mt-6 font-sans text-[16px] md:text-[17px] leading-[1.6] text-[#0A0A0A]/65 max-w-[560px]">
                Una demo de 20 minutos por WhatsApp: le cargas unas bases
                reales y ves cómo responde con citas, precios y estrategia.
              </p>
              <div className="mt-10 flex items-center gap-1.5">
                <a
                  href={buildWAUrl(MSG_DEMO)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center h-12 px-6 rounded-lg bg-[#16161A] font-mono text-[12px] uppercase tracking-[0.14em] text-[#F2F0EA] hover:bg-[#0064E0] transition-colors duration-200"
                >
                  Probar Lici
                </a>
                <a
                  href="https://app.iautolicita.cl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative inline-flex items-center h-12 px-6 rounded-lg bg-[#16161A] font-mono text-[12px] uppercase tracking-[0.14em] text-[#F2F0EA] hover:bg-[#0064E0] transition-colors duration-200"
                >
                  Acceder
                  <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-[#0064E0]" />
                </a>
              </div>
              <div className="mt-14 font-mono text-[11px] uppercase tracking-[0.06em] text-[#0A0A0A]/60 flex flex-wrap gap-x-10 gap-y-1.5">
                <span>Sin tarjeta de crédito</span>
                <span>Demo personalizada</span>
                <span>
                  Respuesta en 24h
                  <span className="inline-block w-[7px] h-[13px] bg-[#0A0A0A] ml-1.5 align-middle animate-blink" />
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
