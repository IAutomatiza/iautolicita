import {
  BadgeDollarSign,
  FileSearch,
  ScanSearch,
  Landmark,
  Bell,
  Building2,
} from "lucide-react";
import { ContainerScroll, CardSticky } from "./ui/CardsStack";
import { buildWAUrl, MSG_DEMO } from "../lib/whatsapp";
import useInView from "../hooks/useInView";

/* ════════════════════════════════════════════════════════════
   "Solo acá lo tienes" — las ventajas que nadie más ofrece en
   Chile, montadas sobre el cards-stack: la columna izquierda
   queda fija y las tarjetas se van apilando al bajar.

   Cada tarjeta no se queda en la promesa: lleva el número, el
   dato duro que la respalda y la línea de lo que hace el resto
   del mercado, para que la comparación se lea sola.
═══════════════════════════════════════════════════════════════ */

const VENTAJAS = [
  {
    id: "precio",
    Icon: BadgeDollarSign,
    titulo: "El precio real, ítem por ítem",
    texto:
      "Lo que el Estado efectivamente pagó por lo mismo, con percentiles p25/p50/p75 calculados sobre las órdenes de compra. Ofertas sabiendo dónde está la mediana, no adivinando.",
    dato: "6,4M de órdenes de compra analizadas",
    resto: "El resto solo muestra el monto estimado de las bases.",
  },
  {
    id: "bases",
    Icon: FileSearch,
    titulo: "Lici se lee las bases enteras",
    texto:
      "Objeto, plazos, garantías, anexos y causales de inadmisibilidad extraídos en segundos — y cada respuesta llega con la cita a la página exacta para que puedas verificarla.",
    dato: "Respuesta en menos de 3 segundos",
    resto: "El resto te entrega el PDF y te desea suerte.",
  },
  {
    id: "radar",
    Icon: ScanSearch,
    titulo: "Radar puntuado desde el día 1",
    texto:
      "Cada licitación nueva se puntúa 0–100 contra tu perfil apenas se publica, armado con tu RUT y tu historial real de adjudicaciones. Las que calzan llegan solas.",
    dato: "441K licitaciones y 7,2M adjudicaciones",
    resto: "El resto manda alertas por palabra clave.",
  },
  {
    id: "organismo",
    Icon: Landmark,
    titulo: "Sabes con quién te estás metiendo",
    texto:
      "Historial del comprador antes de postular: cuánto adjudica, a quiénes, qué tan rápido paga y qué porcentaje de sus procesos termina desierto — señal de bases mal armadas.",
    dato: "4 KPIs y top 5 proveedores por organismo",
    resto: "El resto no perfila al comprador.",
  },
  {
    id: "alertas",
    Icon: Bell,
    titulo: "Las alertas llegan donde ya trabajas",
    texto:
      "Cierres, riesgos y documentos exigidos salen por WhatsApp, correo, informes PDF o Google Drive. Tu equipo se entera sin entrar a la plataforma.",
    dato: "Cuatro canales de salida, en paralelo",
    resto: "El resto te obliga a entrar a revisar.",
  },
  {
    id: "multi",
    Icon: Building2,
    titulo: "Varias razones sociales, una cuenta",
    texto:
      "Cada empresa con su propio perfil, equipo, notas y conversaciones — con los datos aislados a nivel de base de datos. Ideal si operas con más de un RUT.",
    dato: "Multi-organización nativo",
    resto: "El resto cobra una cuenta por empresa.",
  },
];

export default function SoloConNosotros() {
  const [ref, enVista] = useInView<HTMLDivElement>(0.1);

  return (
    <section id="ventajas" className="bg-ink-900 border-y border-[var(--hairline)]">
      <div className="container-edge py-16 md:py-24">
        <div className="grid md:grid-cols-2 md:gap-10 xl:gap-16">
          {/* Columna fija */}
          <div ref={ref} className="md:sticky md:top-0 md:h-svh md:flex md:flex-col md:justify-center">
            <div
              style={{
                opacity: enVista ? 1 : 0,
                transform: enVista ? "translateY(0)" : "translateY(18px)",
                transition: "opacity 0.6s ease, transform 0.75s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-amber-400">
                Solo acá lo tienes
              </span>
              <h2 className="mt-5 font-display font-medium text-[36px] md:text-[52px] leading-[1.02] tracking-[-0.04em] text-cream-50">
                Seis cosas que la competencia{" "}
                <span className="serif-em text-amber-400">no puede darte</span>.
              </h2>
              <p className="mt-6 font-sans text-[15.5px] md:text-[16.5px] leading-[1.6] text-cream-200 max-w-[440px]">
                No es un buscador con alertas: es la base de datos completa de
                ChileCompra, leída y cruzada por IA. Cada punto de acá tiene su
                cifra detrás — y ninguno existe en el resto del mercado.
              </p>

              <a
                href={buildWAUrl(MSG_DEMO)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-9 inline-flex items-center h-12 px-6 rounded-full bg-brand-600 font-sans font-medium text-[14.5px] text-white hover:bg-brand-700 transition-colors"
              >
                Lo quiero todo
              </a>

              <div className="mt-10 hidden md:flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.16em] text-cream-400">
                <span className="h-px w-6 bg-cream-400/40" />
                Desliza para verlas
              </div>
            </div>
          </div>

          {/* El mazo */}
          <ContainerScroll className="space-y-5 py-10 md:py-[18vh]">
            {VENTAJAS.map((v, i) => (
              <CardSticky
                key={v.id}
                index={i + 2}
                incrementY={16}
                className="rounded-2xl border border-[var(--hairline-strong)] bg-white p-6 md:p-8 shadow-[0_24px_60px_-32px_rgba(10,21,48,0.45)]"
              >
                <div className="flex items-start justify-between gap-5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-brand-100 bg-brand-50">
                    <v.Icon className="h-5 w-5 text-brand-600" strokeWidth={1.8} />
                  </span>
                  <span className="font-display font-medium text-[26px] leading-none tracking-tightest text-cream-50/15 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-5 font-display font-medium text-[21px] md:text-[24px] leading-[1.15] tracking-[-0.025em] text-cream-50">
                  {v.titulo}
                </h3>
                <p className="mt-3 font-sans text-[14.5px] leading-[1.6] text-cream-200">
                  {v.texto}
                </p>

                <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-3 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-600" />
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-brand-700">
                    {v.dato}
                  </span>
                </div>

                <p className="mt-4 border-t border-[var(--hairline)] pt-3 font-sans text-[12.5px] leading-[1.5] text-cream-400">
                  {v.resto}
                </p>
              </CardSticky>
            ))}
          </ContainerScroll>
        </div>
      </div>
    </section>
  );
}
