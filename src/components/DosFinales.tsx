import { useEffect, useRef, useState } from "react";
import { X, Check, HandCoins, Boxes, Goal, PiggyBank } from "lucide-react";
import { buildWAUrl, MSG_DEMO } from "../lib/whatsapp";
import useInView from "../hooks/useInView";

/* ════════════════════════════════════════════════════════════
   Dos finales — layout clonado de la sección "Write" de Craft
   (vía Mobbin), a pantalla casi completa. Las tarjetas rotan
   entre tres historias reales de con/sin IAutoLicita: el precio,
   la detección a tiempo y las bases. Cada 6,5s cambia la escena
   con un fundido; los puntos de abajo permiten saltar a mano y
   el ciclo se pausa al posar el cursor sobre las tarjetas.
═══════════════════════════════════════════════════════════════ */

// Milisegundos entre escenas; debe calzar con la duración de
// dotFill en index.css (5s).
const CICLO = 5000;

const MINI = [
  { icon: HandCoins, label: "Lo pagado, no lo adjudicado" },
  { icon: Boxes, label: "6,4M órdenes de compra" },
  { icon: Goal, label: "Oferta bajo la mediana" },
  { icon: PiggyBank, label: "Margen protegido" },
];

const ESCENAS = [
  {
    sin: {
      tag: "Sin datos",
      ref: "Licitación 1057-412-LP25 · MINSAL",
      cifra: "$152,4M",
      veredicto: "Perdió. Adjudicada a otro.",
      cuerpo: (
        <>
          Costos + margen{" "}
          <span className="text-white/75 font-medium">"por si acaso"</span>.
          Nadie sabía cuánto pagaba MINSAL de verdad.
        </>
      ),
    },
    con: {
      contexto: "La misma licitación, el mismo día",
      cifra: "$139,9M",
      cuerpo: (
        <>
          Sabía que el Estado venía pagando{" "}
          <span className="text-white font-medium">~$140M por lo mismo</span>.
          Ofertó 1,8% bajo la mediana.
        </>
      ),
      veredicto: "Ganó. Con el margen intacto.",
    },
  },
  {
    sin: {
      tag: "Buscando a mano",
      ref: "Licitación 2239-77-LE25 · JUNAEB",
      cifra: "Vista tarde",
      veredicto: "Cerró sin su oferta.",
      cuerpo: (
        <>
          Publicada un lunes, cerró el viernes. Entre el portal y el día a
          día, <span className="text-white/75 font-medium">nadie alcanzó a verla</span>.
        </>
      ),
    },
    con: {
      contexto: "La misma licitación, día 1",
      cifra: "Calce 94/100",
      cuerpo: (
        <>
          El radar la detectó{" "}
          <span className="text-white font-medium">apenas se publicó</span> y
          la priorizó por calce con su rubro.
        </>
      ),
      veredicto: "Ofertó con 4 días de ventaja.",
    },
  },
  {
    sin: {
      tag: "Bases sin leer",
      ref: "Licitación 3411-08-LQ25 · GORE Biobío",
      cifra: "Inadmisible",
      veredicto: "Fuera antes de competir.",
      cuerpo: (
        <>
          Una garantía exigida en la{" "}
          <span className="text-white/75 font-medium">página 47 de las bases</span>{" "}
          dejó la oferta fuera.
        </>
      ),
    },
    con: {
      contexto: "Las mismas bases, en minutos",
      cifra: "Admisible",
      cuerpo: (
        <>
          Lici resumió requisitos, anexos y garantías{" "}
          <span className="text-white font-medium">con cita a la página exacta</span>.
        </>
      ),
      veredicto: "Oferta completa a la primera.",
    },
  },
];

export default function DosFinales() {
  const [ref, inView] = useInView<HTMLDivElement>(0.25);
  const [idx, setIdx] = useState(0);
  const [cambiando, setCambiando] = useState(false);
  const [pausa, setPausa] = useState(false);
  // Token que invalida transiciones en vuelo: si un clic manual
  // llega mientras el ciclo automático estaba a mitad de fundido,
  // el temporizador viejo queda anulado y no salta una escena extra.
  const transicion = useRef(0);

  const cambiar = (destino: number | ((i: number) => number)) => {
    const t = ++transicion.current;
    setCambiando(true);
    setTimeout(() => {
      if (transicion.current !== t) return;
      setIdx((i) => (typeof destino === "function" ? destino(i) : destino));
      setCambiando(false);
    }, 300);
  };

  // Rotación automática de escenas, siempre activa (se detiene solo
  // con el cursor encima); con movimiento reducido el CSS convierte
  // el barrido en un cambio directo. CICLO en sincronía con .dot-fill.
  useEffect(() => {
    if (!inView || pausa) return;
    const t = setInterval(() => cambiar((i) => (i + 1) % ESCENAS.length), CICLO);
    return () => clearInterval(t);
  }, [inView, pausa]);

  const irA = (i: number) => {
    if (i === idx) return;
    cambiar(i);
  };

  const escena = ESCENAS[idx];

  // Entrada escalonada: la tarjeta gris llega primero, la ganadora
  // remata. Salen de lados opuestos para que el choque se sienta.
  const tarjeta = (visible: boolean, desde: string, delay: string) =>
    `transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${delay} ${
      visible ? "opacity-100 translate-x-0 translate-y-0" : `opacity-0 ${desde}`
    }`;

  // Salida: barrido hacia la izquierda. Entrada: .escena-in (CSS)
  // barre desde la derecha con desenfoque al remontar con key={idx}.
  const fundido = `escena-in transition-all duration-300 ${
    cambiando ? "opacity-0 -translate-x-6" : "opacity-100 translate-x-0"
  }`;

  return (
    <section id="resultados" className="px-3 md:px-5 py-8 md:py-12">
      {/* El contenedor azul a pantalla casi completa */}
      <div className="rounded-[2rem] md:rounded-[2.5rem] bg-[#EEF4FC] px-6 py-14 md:px-16 md:py-20 min-h-[86vh] flex items-center">
        <div
          ref={ref}
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-[1240px] mx-auto w-full"
        >
          {/* IZQUIERDA — las dos tarjetas superpuestas y animadas */}
          <div
            className="relative max-w-[520px] mx-auto w-full"
            onMouseEnter={() => setPausa(true)}
            onMouseLeave={() => setPausa(false)}
          >
            {/* Atrás: la oferta a ciegas, apagada */}
            <article
              className={`w-[88%] rounded-2xl p-6 md:p-7 bg-[#1F2126]
                shadow-[0_18px_44px_-18px_rgba(10,20,50,0.45)]
                hover:-translate-y-1 hover:shadow-[0_26px_54px_-18px_rgba(10,20,50,0.55)]
                ${tarjeta(inView, "-translate-x-10", "")}`}
            >
              <div key={idx} className={fundido}>
                <div className="flex items-center gap-2 font-mono text-[9.5px] uppercase tracking-[0.18em] text-white/40">
                  <span className="h-1.5 w-1.5 rounded-full border border-white/40" />
                  {escena.sin.tag}
                </div>
                <div className="mt-4 font-sans text-[12.5px] text-white/40">
                  {escena.sin.ref}
                </div>
                <div className="cifra-pop mt-3 num font-display font-medium text-[38px] leading-none tracking-[-0.03em] text-white/70">
                  {escena.sin.cifra}
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <span className="grid place-items-center h-6 w-6 rounded-full bg-ruby-400/15">
                    <X className="h-3.5 w-3.5 text-ruby-400" strokeWidth={2.5} />
                  </span>
                  <span className="font-sans text-[13.5px] font-medium text-white/70">
                    {escena.sin.veredicto}
                  </span>
                </div>
                <p className="mt-4 pt-4 border-t border-white/[0.08] font-sans text-[13.5px] leading-[1.55] text-white/45">
                  {escena.sin.cuerpo}
                </p>
              </div>
            </article>

            {/* Delante: la ganadora, encendida */}
            <article
              className={`relative z-10 w-[88%] ml-auto -mt-16 md:-mt-20 rounded-2xl p-6 md:p-7 overflow-hidden text-white
                shadow-[0_28px_60px_-20px_rgba(0,30,110,0.55)]
                hover:-translate-y-1 hover:shadow-[0_36px_72px_-20px_rgba(0,30,110,0.65)]
                ${tarjeta(inView, "translate-x-10 translate-y-6", "delay-200")}`}
              style={{
                background:
                  "linear-gradient(180deg, #000115 0%, #000a37 26%, #001560 52%, #002494 76%, #003ab3 100%)",
              }}
            >
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage:
                    "radial-gradient(rgba(85,180,248,0.18) 1px, transparent 1px)",
                  backgroundSize: "16px 16px",
                }}
              />
              <div key={idx} className={`relative ${fundido}`}>
                <div className="flex items-center gap-2 font-mono text-[9.5px] uppercase tracking-[0.18em] text-[#55b4f8]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#55b4f8]" />
                  Con IAutoLicita
                </div>
                <div className="mt-4 font-sans text-[12.5px] text-white/55">
                  {escena.con.contexto}
                </div>
                <div className="cifra-pop mt-3 num font-display font-medium text-[38px] leading-none tracking-[-0.03em] text-white">
                  {escena.con.cifra}
                </div>
                <p className="mt-3 font-sans text-[13.5px] leading-[1.55] text-white/75">
                  {escena.con.cuerpo}
                </p>
                <div className="mt-5 flex items-center gap-2 pt-4 border-t border-white/15">
                  <span className="grid place-items-center h-6 w-6 rounded-full bg-[#4ade80]/20">
                    <Check className="h-3.5 w-3.5 text-[#4ade80]" strokeWidth={2.5} />
                  </span>
                  <span className="font-sans text-[13.5px] font-medium text-white">
                    {escena.con.veredicto}
                  </span>
                </div>
              </div>
            </article>

            {/* Puntos para saltar entre escenas; el activo es una
                barra que se llena hasta el próximo cambio */}
            <div className="relative z-10 mt-8 flex justify-center gap-2">
              {ESCENAS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => irA(i)}
                  aria-label={`Ejemplo ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 overflow-hidden ${
                    i === idx
                      ? "w-9 bg-cream-50/20"
                      : "w-1.5 bg-cream-50/25 hover:bg-cream-50/50"
                  }`}
                >
                  {i === idx && (
                    <span
                      key={idx}
                      className="dot-fill block h-full w-full rounded-full bg-cream-50"
                      style={{ animationPlayState: pausa ? "paused" : "running" }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* DERECHA — eyebrow, titular, párrafo, mini-grilla y botón */}
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-cream-300">
              El precio real
            </div>

            <h2 className="mt-5 font-display font-medium text-[32px] md:text-[44px] leading-[1.08] tracking-[-0.03em] text-cream-50">
              La misma licitación.
              <br />
              <span className="text-amber-400">Dos finales.</span>
            </h2>

            <p className="mt-6 font-sans text-[16px] md:text-[17px] leading-[1.6] text-cream-100 max-w-[480px]">
              La diferencia no fue el precio — fue saber cuál era. Ese dato
              vive en IAutoLicita: el precio efectivamente pagado por el
              Estado, ítem por ítem. Nadie más en Chile lo tiene.
            </p>

            {/* Grilla 2×2 de mini-features, al patrón Craft */}
            <div className="mt-9 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 max-w-[480px]">
              {MINI.map((m) => (
                <div key={m.label} className="flex items-center gap-3.5">
                  <m.icon
                    className="h-6 w-6 text-cream-50 flex-shrink-0"
                    strokeWidth={1.6}
                  />
                  <span className="font-sans text-[15px] font-medium text-cream-50">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>

            <a
              href={buildWAUrl(MSG_DEMO)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center justify-center h-12 px-7 rounded-full
                bg-white text-cream-50 font-sans font-medium text-[15px]
                shadow-[0_2px_8px_rgba(10,20,50,0.10)]
                hover:-translate-y-[1px] hover:shadow-[0_6px_16px_rgba(10,20,50,0.14)]
                transition-all duration-200 ease-out"
            >
              Agendar demo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
