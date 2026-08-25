import { Mail } from "lucide-react";
import LiciGlifo from "./LiciGlifo";
import { IconoWhatsApp, IconoPdf, IconoDrive } from "./ui/LogosCanales";
import ChatMessages from "./ui/ChatMessages";
import type { MensajeChat } from "./ui/ChatMessages";
import useInView from "../hooks/useInView";

/* ════════════════════════════════════════════════════════════
   Rejilla de capacidades de Lici — clon del bloque features-11
   de tailark: cuatro tarjetas en grilla de 5 columnas (3+2 /
   2+3) pegadas entre sí, con las esquinas externas redondeadas
   y el interior a canto vivo.

   Se reconstruye sin shadcn (el proyecto no lo usa): las Card
   son divs con el hairline y la sombra del sistema propio, y
   cada tarjeta lleva contenido real del producto en vez de los
   marcadores del original.

   Entrada escalonada al hacer scroll, solo opacity/transform.
═══════════════════════════════════════════════════════════════ */

const TARJETA =
  "relative overflow-hidden border border-[#0A1530]/[0.09] bg-white shadow-[0_10px_30px_-22px_rgba(10,21,48,0.35)]";

/* La conversación de muestra recorre la decisión completa: si
   conviene postular, qué exigen las bases, cuánto ofertar y
   contra quién se compite. Cada respuesta trae su cifra. */
const CONVERSACION: MensajeChat[] = [
  {
    id: "1",
    de: "usuario",
    texto: "¿Me conviene postular a la 2239-45-LP26?",
  },
  {
    id: "2",
    de: "lici",
    texto:
      "Calza 91/100 con lo que vendes. Cierra en 6 días y exige boleta de garantía por el 10% del monto — bases administrativas, pág. 47.",
  },
  { id: "3", de: "usuario", texto: "¿Cuánto debería ofertar?" },
  {
    id: "4",
    de: "lici",
    texto:
      "Este organismo pagó una mediana de $139,9M por lo mismo. Bajo $132M ganas por precio; sobre $148M te quedas fuera.",
  },
  { id: "5", de: "usuario", texto: "¿Contra quién compito?" },
  {
    id: "6",
    de: "lici",
    texto:
      "Comercial Médica SpA se adjudicó 4 de las últimas 7 en este rubro, ofertando en promedio 8% bajo el presupuesto.",
  },
];

/* Los canales del último panel: alternan celda punteada y logo,
   igual que la grilla de integraciones del original. */
const CANALES = [
  { nombre: "WhatsApp", icono: <IconoWhatsApp className="h-7 w-7" /> },
  { nombre: "Correo", icono: <Mail className="h-7 w-7 text-[#EA4335]" strokeWidth={1.7} /> },
  { nombre: "Informes PDF", icono: <IconoPdf className="h-7 w-7" /> },
  { nombre: "Google Drive", icono: <IconoDrive className="h-7 w-7" /> },
];

export default function LiciRejilla() {
  const [ref, enVista] = useInView<HTMLDivElement>(0.12);

  const entrada = (ms: number) => ({
    opacity: enVista ? 1 : 0,
    transform: enVista ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 0.6s ease ${ms}ms, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${ms}ms`,
  });

  return (
    <section className="bg-[#F7F8FA] py-16 md:py-28 border-t border-[#0A1530]/[0.07]">
      <div ref={ref} className="mx-auto max-w-[1080px] px-6">
        <div className="max-w-[640px]" style={entrada(0)}>
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#0A1530]/45">
            Qué hace Lici
          </div>
          <h2 className="mt-5 font-display font-medium text-[30px] md:text-[42px] leading-[1.07] tracking-[-0.03em] text-[#0A0A0A]">
            Cuatro cosas que dejas de hacer{" "}
            <span className="text-[#0064E0]">a mano.</span>
          </h2>
        </div>

        <div className="mt-12 grid gap-2 sm:grid-cols-5">
          {/* ── 1 · Lee las bases (col-span-3) ─────────────── */}
          <div
            className={`${TARJETA} rounded-xl sm:col-span-3 sm:rounded-none sm:rounded-tl-xl`}
            style={entrada(90)}
          >
            <div className="p-6 md:p-10 md:pb-6">
              <p className="font-display font-medium text-[19px] tracking-[-0.02em] text-[#0A0A0A]">
                Se lee las bases completas
              </p>
              <p className="mt-3 max-w-sm font-sans text-[14px] leading-[1.6] text-[#0A1530]/55">
                Le pasas la licitación y te devuelve objeto, plazos, garantías y
                documentos exigidos — sin que abras el PDF de 80 páginas.
              </p>
            </div>

            <div className="relative h-fit pl-6 md:pl-12">
              <div
                aria-hidden
                className="absolute -inset-6 z-10 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(75% 95% at 50% 0%, transparent, #FFFFFF 100%)",
                }}
              />
              <div className="overflow-hidden rounded-tl-lg border-l border-t border-[#0A1530]/10 bg-white pl-2 pt-2">
                <img
                  src={`${import.meta.env.BASE_URL}app-lici-escritorio-v2.png`}
                  alt="Lici dentro de IAutoLicita resumiendo una licitación: objeto, plazo de cierre y garantía exigida"
                  width={1207}
                  height={929}
                  loading="lazy"
                  className="w-full rounded-tl-md"
                />
              </div>
            </div>
          </div>

          {/* ── 2 · La conversación real (col-span-2) ─────── */}
          <div
            className={`${TARJETA} rounded-xl sm:col-span-2 sm:rounded-none sm:rounded-tr-xl flex flex-col`}
            style={entrada(180)}
          >
            <p className="mx-auto mb-5 mt-6 max-w-md text-balance px-6 text-center font-display font-medium text-[19px] sm:text-[23px] leading-[1.2] tracking-[-0.02em] text-[#0A0A0A] md:px-8">
              Responde con datos, no con opiniones.
            </p>

            <div className="mt-auto px-4 pb-4 md:px-6 md:pb-6">
              <ChatMessages mensajes={CONVERSACION} className="h-[420px]" />
            </div>
          </div>

          {/* ── 3 · Vive en WhatsApp (col-span-2) ──────────── */}
          <div
            className={`${TARJETA} rounded-xl p-6 sm:col-span-2 sm:rounded-none sm:rounded-bl-xl md:p-12 flex flex-col justify-center`}
            style={entrada(270)}
          >
            <p className="mx-auto mb-10 max-w-md text-balance text-center font-display font-medium text-[19px] sm:text-[23px] leading-[1.2] tracking-[-0.02em] text-[#0A0A0A]">
              Le preguntas por WhatsApp, como a un colega.
            </p>

            <div className="flex justify-center gap-6">
              <div className="relative flex aspect-square size-16 items-center rounded-[9px] border border-[#0A1530]/12 bg-[#0A1530]/[0.03] p-3 shadow-[0_6px_16px_-8px_rgba(10,21,48,0.35)] ring-1 ring-inset ring-white">
                <span className="absolute right-2 top-1.5 font-mono text-[10px] text-[#0A1530]/40">
                  tú
                </span>
                <IconoWhatsApp className="mt-auto h-5 w-5" />
              </div>
              <div className="relative flex aspect-square size-16 items-center justify-center rounded-[9px] border border-[#0A1530]/12 bg-[#0A1530]/[0.03] p-3 shadow-[0_6px_16px_-8px_rgba(10,21,48,0.35)] ring-1 ring-inset ring-white">
                <span className="absolute right-2 top-1.5 font-mono text-[10px] text-[#0A1530]/40">
                  ella
                </span>
                <LiciGlifo alto={26} conBorde />
              </div>
            </div>

            <p className="mt-8 text-center font-mono text-[10.5px] uppercase tracking-[0.14em] text-[#0A1530]/40">
              Responde en menos de 3 s
            </p>
          </div>

          {/* ── 4 · Las alertas salen solas (col-span-3) ───── */}
          <div
            className={`${TARJETA} rounded-xl sm:col-span-3 sm:rounded-none sm:rounded-br-xl`}
            style={entrada(360)}
          >
            <div className="p-6 md:p-12 md:pb-6">
              <p className="font-display font-medium text-[19px] tracking-[-0.02em] text-[#0A0A0A]">
                Las alertas salen donde trabaja tu equipo
              </p>
              <p className="mt-2 max-w-sm font-sans text-[14px] leading-[1.6] text-[#0A1530]/55">
                Cierres, riesgos y documentos exigidos llegan al canal que ya usan
                — sin entrar a la plataforma.
              </p>
            </div>

            <div className="relative h-fit px-6 pb-6 md:px-12 md:pb-12">
              <div className="grid grid-cols-4 gap-2 md:grid-cols-8">
                {CANALES.map((c) => (
                  <div key={c.nombre} className="contents">
                    <div className="aspect-square rounded-lg border border-dashed border-[#0A1530]/15" />
                    <div
                      title={c.nombre}
                      className="flex aspect-square items-center justify-center rounded-lg border border-[#0A1530]/10 bg-[#0A1530]/[0.03] p-3"
                    >
                      {c.icono}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
