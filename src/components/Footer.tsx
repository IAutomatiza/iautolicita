import { Link } from "react-router-dom";
import { MessageCircle, Mail, Globe } from "lucide-react";
import { buildWAUrl, MSG_DEMO, MSG_INFO } from "../lib/whatsapp";

/* ════════════════════════════════════════════════════════════
   Footer — layout clonado del footer de Bevel (vía Mobbin):
   bloque de marca a la izquierda con copyright e iconos debajo,
   y cuatro columnas de enlaces planos a la derecha. El bloque
   de marca conserva el wordmark y el "by iautomatiza" con el
   tamaño y estilo que ya tenía el sitio.
═══════════════════════════════════════════════════════════════ */

const COLUMNAS = [
  {
    titulo: "Producto",
    links: [
      { label: "Capacidades", href: "#capacidades", seccion: true },
      { label: "Cómo funciona", href: "#como", seccion: true },
      { label: "Con y sin IAutoLicita", href: "#resultados", seccion: true },
      { label: "Preguntas frecuentes", href: "#faq", seccion: true },
    ],
  },
  {
    titulo: "Recursos",
    links: [
      { label: "Conoce a Lici", href: "/lici", interno: true },
      { label: "Mercado Público", href: "https://www.mercadopublico.cl", externo: true },
      { label: "Estado del sistema", href: "https://status.iautolicita.cl", externo: true },
    ],
  },
  {
    titulo: "Empresa",
    links: [
      { label: "IAutomatiza", href: "https://iautomatiza.cl", externo: true },
      { label: "hola@iautomatiza.cl", href: "mailto:hola@iautomatiza.cl" },
      { label: "Iniciar sesión", href: "https://app.iautolicita.cl", externo: true },
    ],
  },
  {
    titulo: "Contacto",
    links: [
      { label: "WhatsApp directo", href: buildWAUrl(MSG_INFO), externo: true },
      { label: "Hablar con ventas", href: buildWAUrl(MSG_INFO), externo: true },
      { label: "Agendar demo", href: buildWAUrl(MSG_DEMO), externo: true },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  const enlace = (l: {
    label: string;
    href: string;
    externo?: boolean;
    interno?: boolean;
    seccion?: boolean;
  }) =>
    // Las secciones viven en el home: desde /lici un "#faq" pelado
    // no lleva a ninguna parte, así que se resuelven contra "/".
    l.interno || l.seccion ? (
      <Link
        to={l.seccion ? `/${l.href}` : l.href}
        className="text-cream-100 hover:text-amber-400 transition-colors"
      >
        {l.label}
      </Link>
    ) : (
      <a
        href={l.href}
        {...(l.externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="text-cream-100 hover:text-amber-400 transition-colors"
      >
        {l.label}
      </a>
    );

  return (
    <footer className="bg-ink-950 mt-10 md:mt-16 border-t border-[var(--hairline-strong)] pt-16 md:pt-20 pb-16 md:pb-20">
      <div className="container-edge">
        <div className="grid gap-12 lg:gap-8 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr]">
          {/* ── Marca: igual que siempre, con © e iconos debajo ── */}
          <div>
            <div className="font-display font-medium text-[44px] md:text-[56px] leading-none tracking-tightest text-cream-50">
              <span className="text-amber-400">IA</span>utoLicita<span className="text-amber-400">.</span>
            </div>
            <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-cream-400">
              by{" "}
              <a
                href="https://iautomatiza.cl"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream-100 hover:text-amber-400 transition-colors underline-offset-4 hover:underline"
              >
                iautomatiza
              </a>
            </div>
            <div className="mt-4 font-sans text-[13px] text-cream-300">
              © {year} IAutomatiza · Santiago, Chile
            </div>

            <div className="mt-10 flex items-center gap-5">
              <a
                href={buildWAUrl(MSG_INFO)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="text-cream-200 hover:text-amber-400 transition-colors"
              >
                <MessageCircle className="h-[22px] w-[22px]" strokeWidth={1.8} />
              </a>
              <a
                href="mailto:hola@iautomatiza.cl"
                aria-label="Correo"
                className="text-cream-200 hover:text-amber-400 transition-colors"
              >
                <Mail className="h-[22px] w-[22px]" strokeWidth={1.8} />
              </a>
              <a
                href="https://iautomatiza.cl"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Sitio de IAutomatiza"
                className="text-cream-200 hover:text-amber-400 transition-colors"
              >
                <Globe className="h-[22px] w-[22px]" strokeWidth={1.8} />
              </a>
            </div>
          </div>

          {/* ── Columnas de enlaces planos, al patrón Bevel ── */}
          {COLUMNAS.map((col) => (
            <div key={col.titulo}>
              <div className="font-sans text-[14.5px] text-cream-300 mb-4">
                {col.titulo}
              </div>
              <ul className="space-y-3 font-sans text-[15px]">
                {col.links.map((l) => (
                  <li key={l.label}>{enlace(l)}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
