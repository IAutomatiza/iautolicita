import {
  Scale,
  BookOpenCheck,
  Radar,
  Fingerprint,
  Send,
  Boxes,
  ChevronRight,
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
    Icon: Scale,
    titulo: "El precio que sí ganó",
    texto:
      "Cuánto pagó el Estado por lo mismo que tú vendes. Ofertas con la cifra al lado, no a ojo.",
    dato: "6,4 millones de compras revisadas",
    resto: "El resto solo te muestra el presupuesto.",
  },
  {
    id: "bases",
    Icon: BookOpenCheck,
    titulo: "Las bases, ya leídas",
    texto:
      "Plazos, garantías y anexos en segundos — y te muestra la página exacta donde lo dice.",
    dato: "212 páginas en menos de 3 segundos",
    resto: "El resto te pasa el PDF y suerte.",
  },
  {
    id: "radar",
    Icon: Radar,
    titulo: "Te avisa el primer día",
    texto:
      "Cada licitación nueva llega con nota, según lo que vendes y lo que ya has ganado.",
    dato: "441 mil licitaciones vigiladas",
    resto: "El resto avisa por palabra clave.",
  },
  {
    id: "organismo",
    Icon: Fingerprint,
    titulo: "Conoces al comprador",
    texto:
      "Cuánto adjudica, a quién le compra, si paga rápido y cuántas veces deja la licitación desierta.",
    dato: "Ficha de cada organismo del Estado",
    resto: "El resto no te dice nada de él.",
  },
  {
    id: "alertas",
    Icon: Send,
    titulo: "Llega donde ya trabajas",
    texto:
      "Cierres y documentos por WhatsApp, correo, PDF o Drive. Sin entrar a ninguna plataforma.",
    dato: "Cuatro canales a la vez",
    resto: "El resto te hace entrar a revisar.",
  },
  {
    id: "multi",
    Icon: Boxes,
    titulo: "Todas tus empresas juntas",
    texto:
      "Varios RUT en una sola cuenta, cada uno con su equipo y sus datos por separado.",
    dato: "Sin pagar una cuenta por empresa",
    resto: "El resto cobra por cada una.",
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
              <p className="mt-6 font-sans text-[15.5px] md:text-[16.5px] leading-[1.6] text-cream-200 max-w-[420px]">
                No es un buscador con alertas. Es todo lo que compra el Estado,
                leído por una IA que trabaja para ti.
              </p>

              {/* La GradientPill de ClickUp, que antes vivía en "El
                  motor, por dentro": borde orbitado por el cometa de
                  degradado e interior blanco. Acá cierra el argumento
                  de la sección. */}
              <a
                href={buildWAUrl(MSG_DEMO)}
                target="_blank"
                rel="noopener noreferrer"
                className="pill-brain mt-9"
              >
                <span className="pill-brain-inner">
                  <span className="font-sans font-bold text-[15px] text-[#202020]">
                    ¡Comienza ahora!
                  </span>
                  <ChevronRight className="h-4 w-4 text-[#202020]" strokeWidth={2.2} />
                </span>
              </a>
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
