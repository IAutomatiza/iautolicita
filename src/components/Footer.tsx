import { Link } from "react-router-dom";
import { MessageCircle, Mail, Globe } from "lucide-react";
import { buildWAUrl, MSG_DEMO, MSG_INFO } from "../lib/whatsapp";

/* ════════════════════════════════════════════════════════════
   Footer — clon del footer de Notion (vía Mobbin): bloque de
   marca a la izquierda (logo, iconos, chip, enlaces menores y
   copyright) y cuatro columnas de enlaces, con el remate en
   negrita al final de la última columna. Fondo claro.
═══════════════════════════════════════════════════════════════ */

const COLUMNAS = [
  {
    titulo: "Producto",
    links: [
      { label: "Capacidades", href: "#capacidades" },
      { label: "Cómo funciona", href: "#como" },
      { label: "Con y sin IAutoLicita", href: "#resultados" },
      { label: "Preguntas frecuentes", href: "#faq" },
    ],
  },
  {
    titulo: "Empresa",
    links: [
      { label: "IAutomatiza", href: "https://iautomatiza.cl", externo: true },
      { label: "hola@iautomatiza.cl", href: "mailto:hola@iautomatiza.cl" },
      { label: "WhatsApp directo", href: buildWAUrl(MSG_INFO), externo: true },
    ],
  },
  {
    titulo: "Recursos",
    links: [
      { label: "Conoce a Lici", href: "/lici", interno: true },
      { label: "Estado del sistema", href: "https://status.iautolicita.cl", externo: true },
      { label: "Mercado Público", href: "https://www.mercadopublico.cl", externo: true },
    ],
  },
  {
    titulo: "IAutoLicita para",
    links: [
      { label: "Constructoras", href: buildWAUrl(MSG_DEMO), externo: true },
      { label: "Proveedores del Estado", href: buildWAUrl(MSG_DEMO), externo: true },
      { label: "Servicios y consultoras", href: buildWAUrl(MSG_DEMO), externo: true },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  const enlace = (l: { label: string; href: string; externo?: boolean; interno?: boolean }) =>
    l.interno ? (
      <Link to={l.href} className="text-cream-100 hover:text-cream-50 transition-colors">
        {l.label}
      </Link>
    ) : (
      <a
        href={l.href}
        {...(l.externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="text-cream-100 hover:text-cream-50 transition-colors"
      >
        {l.label}
      </a>
    );

  return (
    <footer className="bg-white border-t border-[var(--hairline)] pt-16 md:pt-20 pb-14">
      <div className="container-edge">
        <div className="grid gap-12 lg:gap-8 lg:grid-cols-[1.35fr_1fr_1fr_1fr_1fr]">
          {/* ── Bloque de marca ─────────────────────────────── */}
          <div>
            <div className="font-display font-bold text-[24px] leading-none tracking-tight text-cream-50">
              <span className="text-amber-400">IA</span>utoLicita<span className="text-amber-400">.</span>
            </div>

            {/* Iconos de contacto, al estilo de la fila social */}
            <div className="mt-6 flex items-center gap-4">
              <a
                href={buildWAUrl(MSG_INFO)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="text-cream-300 hover:text-cream-50 transition-colors"
              >
                <MessageCircle className="h-5 w-5" strokeWidth={1.8} />
              </a>
              <a
                href="mailto:hola@iautomatiza.cl"
                aria-label="Correo"
                className="text-cream-300 hover:text-cream-50 transition-colors"
              >
                <Mail className="h-5 w-5" strokeWidth={1.8} />
              </a>
              <a
                href="https://iautomatiza.cl"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Sitio de IAutomatiza"
                className="text-cream-300 hover:text-cream-50 transition-colors"
              >
                <Globe className="h-5 w-5" strokeWidth={1.8} />
              </a>
            </div>

            {/* Chip de estado, en el lugar del selector de idioma */}
            <a
              href="https://status.iautolicita.cl"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-lg border border-[var(--hairline-strong)] px-3.5 py-2
                font-sans text-[13.5px] text-cream-50 hover:bg-cream-50/[0.04] transition-colors"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-sage-400 animate-pulse-soft" />
              Todos los sistemas operativos
            </a>

            {/* Enlaces menores */}
            <div className="mt-6 space-y-2 font-sans text-[13.5px]">
              <div>
                <a
                  href="https://app.iautolicita.cl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream-100 hover:text-cream-50 transition-colors"
                >
                  Iniciar sesión
                </a>
              </div>
              <div>
                <a
                  href={buildWAUrl(MSG_INFO)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream-100 hover:text-cream-50 transition-colors"
                >
                  Hablar con ventas
                </a>
              </div>
            </div>

            <div className="mt-8 font-sans text-[13.5px] text-cream-300">
              © {year} IAutomatiza · Santiago, Chile
            </div>
          </div>

          {/* ── Columnas de enlaces ─────────────────────────── */}
          {COLUMNAS.map((col) => (
            <div key={col.titulo}>
              <div className="font-sans font-semibold text-[14.5px] text-cream-50 mb-4">
                {col.titulo}
              </div>
              <ul className="space-y-3 font-sans text-[14px]">
                {col.links.map((l) => (
                  <li key={l.label}>{enlace(l)}</li>
                ))}
                {col.titulo === "IAutoLicita para" && (
                  <li className="pt-4">
                    <a
                      href={buildWAUrl(MSG_DEMO)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-[14.5px] text-cream-50 hover:text-amber-400 transition-colors"
                    >
                      Agendar demo →
                    </a>
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
