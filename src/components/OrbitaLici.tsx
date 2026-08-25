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

const IconoWhatsApp = () => (
  <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" aria-hidden>
    <path
      fill="#25D366"
      d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"
    />
  </svg>
);

const IconoPdf = () => (
  <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" aria-hidden>
    <path
      fill="#E5252A"
      d="M6 1.5h8.4l5.1 5.1v11.9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-15a2 2 0 0 1 2-2z"
    />
    <path fill="#B71D22" d="M14.4 1.5v5.1h5.1z" />
    <text
      x="11.75"
      y="17"
      textAnchor="middle"
      fontFamily="Arial, Helvetica, sans-serif"
      fontWeight="700"
      fontSize="6"
      letterSpacing="0.2"
      fill="#ffffff"
    >
      PDF
    </text>
  </svg>
);

const IconoDrive = () => (
  <svg viewBox="0 0 87.3 78" className="h-[22px] w-[22px]" aria-hidden>
    <path fill="#0066da" d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8H0c0 1.55.4 3.1 1.2 4.5z" />
    <path fill="#00ac47" d="M43.65 25 29.9 1.2c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0-1.2 4.5h27.5z" />
    <path fill="#ea4335" d="M73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75L86.1 57.5c.8-1.4 1.2-2.95 1.2-4.5H59.798l5.852 11.5z" />
    <path fill="#00832d" d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2H34.4c-1.6 0-3.15.45-4.5 1.2z" />
    <path fill="#2684fc" d="M59.85 53H27.45L13.75 76.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z" />
    <path fill="#ffba00" d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3L43.65 25l16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z" />
  </svg>
);

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
      <IconoWhatsApp />,
      <Mail className="h-[21px] w-[21px] text-[#EA4335]" strokeWidth={1.9} />,
      <IconoPdf />,
      <IconoDrive />,
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
