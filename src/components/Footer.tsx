import type { ReactElement } from "react";
import { Link } from "react-router-dom";
import { Mail, Globe } from "lucide-react";
import { IconoWhatsApp } from "./ui/LogosCanales";
import { buildWAUrl, MSG_PRUEBA, MSG_INFO } from "../lib/whatsapp";

/* ════════════════════════════════════════════════════════════
   Footer — patrón footer-7 de shadcnblocks: a la izquierda la
   marca con su descripción y las redes; a la derecha las
   columnas de enlaces; abajo, separada por un hairline, la
   línea legal con el copyright a un lado y los términos al otro.

   Adaptado al stack propio: el logo es el wordmark tipográfico
   del sitio (no hay archivo de imagen), los iconos vienen de
   lucide y del SVG oficial de WhatsApp en vez de react-icons, y
   los enlaces de sección se resuelven contra el home para que
   también funcionen desde /lici.
═══════════════════════════════════════════════════════════════ */

type Enlace = {
  label: string;
  href: string;
  externo?: boolean;
  interno?: boolean;
  /** Ancla de una sección del home (#faq, #capacidades…). */
  seccion?: boolean;
};

const SECCIONES: { titulo: string; links: Enlace[] }[] = [
  {
    titulo: "Producto",
    links: [
      { label: "Capacidades", href: "#capacidades", seccion: true },
      { label: "Cómo funciona", href: "#como", seccion: true },
      { label: "Con y sin IAutoLicita", href: "#resultados", seccion: true },
      { label: "Solo acá lo tienes", href: "#ventajas", seccion: true },
      { label: "Planes", href: "/precios", interno: true },
    ],
  },
  {
    titulo: "Recursos",
    links: [
      { label: "Conoce a Lici", href: "/lici", interno: true },
      { label: "Preguntas frecuentes", href: "#faq", seccion: true },
      { label: "Mercado Público", href: "https://www.mercadopublico.cl", externo: true },
      { label: "Estado del sistema", href: "https://status.iautolicita.cl", externo: true },
    ],
  },
  {
    titulo: "Empresa",
    links: [
      { label: "IAutomatiza", href: "https://iautomatiza.cl", externo: true },
      { label: "hola@iautomatiza.cl", href: "mailto:hola@iautomatiza.cl" },
      { label: "Iniciar sesión", href: "https://app.iautolicita.cl/login", externo: true },
      { label: "Hablar por WhatsApp", href: buildWAUrl(MSG_INFO), externo: true },
      { label: "Probar gratis", href: buildWAUrl(MSG_PRUEBA), externo: true },
    ],
  },
];

const REDES: { icon: ReactElement; href: string; label: string; externo?: boolean }[] = [
  {
    icon: <IconoWhatsApp className="h-[19px] w-[19px]" />,
    href: buildWAUrl(MSG_INFO),
    label: "Escríbenos por WhatsApp",
    externo: true,
  },
  {
    icon: <Mail className="h-[19px] w-[19px]" strokeWidth={1.8} />,
    href: "mailto:hola@iautomatiza.cl",
    label: "Escríbenos por correo",
  },
  {
    icon: <Globe className="h-[19px] w-[19px]" strokeWidth={1.8} />,
    href: "https://iautomatiza.cl",
    label: "Sitio de IAutomatiza",
    externo: true,
  },
];

/* El footer-7 trae una fila legal con términos y privacidad. El
   sitio todavía no tiene esas páginas, y enlazar a una que no
   existe es peor que no enlazar: la fila queda armada y se
   llena sola en cuanto haya URLs reales. */
const LEGALES: Enlace[] = [];

export default function Footer() {
  const año = new Date().getFullYear();

  const clase = "text-cream-200 hover:text-amber-400 transition-colors";

  const enlace = (l: Enlace, cn = clase) =>
    // Las secciones viven en el home: desde /lici un "#faq" pelado
    // no lleva a ninguna parte, así que se resuelven contra "/".
    l.interno || l.seccion ? (
      <Link to={l.seccion ? `/${l.href}` : l.href} className={cn}>
        {l.label}
      </Link>
    ) : (
      <a
        href={l.href}
        {...(l.externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className={cn}
      >
        {l.label}
      </a>
    );

  return (
    <footer className="bg-ink-950 border-t border-[var(--hairline-strong)] py-16 md:py-24">
      <div className="container-edge">
        <div className="flex w-full flex-col justify-between gap-12 lg:flex-row lg:items-start lg:gap-20">
          {/* ── Marca ── */}
          <div className="flex w-full flex-col gap-6 lg:max-w-[380px]">
            <Link to="/" className="inline-flex items-baseline gap-2.5">
              <span className="font-display font-medium text-[30px] leading-none tracking-tightest text-cream-50">
                <span className="text-amber-400">IA</span>utoLicita
                <span className="text-amber-400">.</span>
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream-400">
                by iautomatiza
              </span>
            </Link>

            <p className="font-sans text-[14.5px] leading-[1.6] text-cream-300 max-w-[340px]">
              Toda la base de ChileCompra leída por IA: te avisamos qué licitación
              calza contigo, qué piden las bases y cuánto pagó el Estado por lo
              mismo.
            </p>

            <ul className="flex items-center gap-5">
              {REDES.map((r) => (
                <li key={r.label}>
                  <a
                    href={r.href}
                    aria-label={r.label}
                    title={r.label}
                    {...(r.externo
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="inline-flex text-cream-200 hover:text-amber-400 transition-colors"
                  >
                    {r.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Columnas de enlaces ── */}
          <div className="grid w-full gap-10 sm:grid-cols-3 lg:gap-16">
            {SECCIONES.map((s) => (
              <div key={s.titulo}>
                <h3 className="mb-4 font-sans font-semibold text-[14px] text-cream-50">
                  {s.titulo}
                </h3>
                <ul className="space-y-3 font-sans text-[14px]">
                  {s.links.map((l) => (
                    <li key={l.label}>{enlace(l)}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── Línea legal ── */}
        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-[var(--hairline)] pt-8 font-sans text-[12.5px] text-cream-300 md:flex-row md:items-center">
          <p className="order-2 md:order-1">
            © {año} IAutomatiza · Santiago, Chile
          </p>
          {LEGALES.length > 0 ? (
            <ul className="order-1 flex flex-col gap-2 md:order-2 md:flex-row md:gap-6">
              {LEGALES.map((l) => (
                <li key={l.label}>{enlace(l, "hover:text-amber-400 transition-colors")}</li>
              ))}
            </ul>
          ) : (
            <p className="order-1 font-mono text-[10.5px] uppercase tracking-[0.16em] text-cream-400 md:order-2">
              Datos públicos de ChileCompra · al día
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}
