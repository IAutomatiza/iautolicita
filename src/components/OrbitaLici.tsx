import {
  FileSearch,
  ReceiptText,
  Trophy,
  Landmark,
  Mail,
  Bell,
  TrendingUp,
  Users,
  MessagesSquare,
} from "lucide-react";
import LiciGlifo from "./LiciGlifo";
import { IconoWhatsApp, IconoPdf, IconoDrive } from "./ui/LogosCanales";
import useInView from "../hooks/useInView";

/* ════════════════════════════════════════════════════════════
   Órbitas de Lici — adaptación del stack-feature-section de
   ruixen: tres anillos punteados girando alrededor de Lici, con
   el ecosistema real del producto en vez de logos de frameworks.

   · Anillo interior: lo que entra (licitaciones, OC,
     adjudicaciones, proveedores).
   · Anillo medio: por dónde sale (WhatsApp, correo, informes
     PDF, Google Drive) — los mismos nodos del bento del home.
   · Anillo exterior: capacidades (alertas, precios, competencia,
     conversación).

   Cada chip contragira a la misma velocidad que su anillo para
   que los logos queden siempre derechos. La rotación es solo
   transform (compositor), y se pausa fuera de pantalla.
═══════════════════════════════════════════════════════════════ */

/* Diámetros con la misma separación entre anillos; los desfases
   evitan que los chips de anillos vecinos queden alineados. */
const ANILLOS = [
  {
    diam: "17rem",
    dur: 34,
    desfase: -Math.PI / 2,
    iconos: [
      <FileSearch className="h-[20px] w-[20px] text-[#2F63E8]" strokeWidth={1.9} />,
      <ReceiptText className="h-[20px] w-[20px] text-[#0882f7]" strokeWidth={1.9} />,
      <Trophy className="h-[20px] w-[20px] text-[#d97706]" strokeWidth={1.9} />,
      <Landmark className="h-[20px] w-[20px] text-[#64748b]" strokeWidth={1.9} />,
    ],
  },
  {
    diam: "25.5rem",
    dur: 48,
    desfase: -Math.PI / 4,
    iconos: [
      <IconoWhatsApp className="h-[22px] w-[22px]" />,
      <Mail className="h-[21px] w-[21px] text-[#EA4335]" strokeWidth={1.9} />,
      <IconoPdf className="h-[22px] w-[22px]" />,
      <IconoDrive className="h-[22px] w-[22px]" />,
    ],
  },
  {
    diam: "34rem",
    dur: 66,
    desfase: 0,
    iconos: [
      <Bell className="h-[20px] w-[20px] text-[#2F63E8]" strokeWidth={1.9} />,
      <TrendingUp className="h-[20px] w-[20px] text-[#0e9f6e]" strokeWidth={1.9} />,
      <Users className="h-[20px] w-[20px] text-[#7c3aed]" strokeWidth={1.9} />,
      <MessagesSquare className="h-[20px] w-[20px] text-[#0882f7]" strokeWidth={1.9} />,
    ],
  },
];

export default function OrbitaLici() {
  const [ref, enVista] = useInView<HTMLDivElement>(0.05);

  const giro = (dur: number, inverso = false) => ({
    animationName: inverso ? "orbitaGiroInv" : "orbitaGiro",
    animationDuration: `${dur}s`,
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
    animationPlayState: enVista ? ("running" as const) : ("paused" as const),
  });

  return (
    <div
      ref={ref}
      className="orbita-lici relative w-[36rem] h-[36rem] flex items-center justify-center"
    >
      {/* Lici, al centro */}
      <div className="relative z-10 drop-shadow-[0_18px_34px_rgba(10,10,10,0.3)]">
        <LiciGlifo alto={92} conBorde />
      </div>

      {ANILLOS.map((a, ai) => (
        <div
          key={ai}
          className="absolute rounded-full border-2 border-dotted border-[#0A0A0A]/[0.14]"
          style={{ width: a.diam, height: a.diam, ...giro(a.dur) }}
        >
          {a.iconos.map((ic, i) => {
            const ang = a.desfase + (i * 2 * Math.PI) / a.iconos.length;
            const x = 50 + 50 * Math.cos(ang);
            const y = 50 + 50 * Math.sin(ang);
            return (
              <div
                key={i}
                className="absolute"
                style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%,-50%)" }}
              >
                {/* Contragiro: el chip rota al revés que su anillo
                    para que el logo quede siempre derecho */}
                <div
                  className="grid place-items-center h-11 w-11 rounded-full bg-white shadow-[0_10px_26px_-10px_rgba(10,10,10,0.4)] ring-1 ring-black/[0.06]"
                  style={giro(a.dur, true)}
                >
                  {ic}
                </div>
              </div>
            );
          })}
        </div>
      ))}

      <style>{`
        @keyframes orbitaGiro {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes orbitaGiroInv {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .orbita-lici * { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
