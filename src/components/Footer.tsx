import { Link } from "react-router-dom";
import { buildWAUrl, MSG_INFO } from "../lib/whatsapp";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink-950 pt-20 pb-10">
      <div className="container-edge">
        <div className="grid md:grid-cols-12 gap-10 pb-14 border-b border-[var(--hairline-strong)]">
          {/* Brand */}
          <div className="md:col-span-5">
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
            <p className="mt-6 font-sans text-[14px] leading-[1.55] text-cream-200 max-w-[420px]">
              Inteligencia y gestión integral de licitaciones de ChileCompra. Plataforma SaaS multi-organización operativa en Chile.
            </p>
          </div>

          {/* Links */}
          <div className="md:col-span-3">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream-400 mb-4">
              Producto
            </div>
            <ul className="space-y-2 font-sans text-[14px]">
              <li>
                <a
                  href="#capacidades"
                  className="text-cream-100 hover:text-amber-400 transition-colors"
                >
                  Capacidades
                </a>
              </li>
              <li>
                <a
                  href="#resultados"
                  className="text-cream-100 hover:text-amber-400 transition-colors"
                >
                  Órdenes de compra
                </a>
              </li>
              <li>
                <Link
                  to="/aria"
                  className="text-cream-100 hover:text-amber-400 transition-colors"
                >
                  Chat IA documental
                </Link>
              </li>
              <li>
                <a
                  href="#simulador"
                  className="text-cream-100 hover:text-amber-400 transition-colors"
                >
                  Benchmark de precios
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream-400 mb-4">
              Contacto
            </div>
            <ul className="space-y-3 font-sans text-[14px]">
              <li>
                <a
                  href={buildWAUrl(MSG_INFO)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream-100 hover:text-amber-400 transition-colors"
                >
                  WhatsApp directo
                </a>
              </li>
              <li>
                <a
                  href="mailto:hola@iautomatiza.cl"
                  className="text-cream-100 hover:text-amber-400 transition-colors"
                >
                  hola@iautomatiza.cl
                </a>
              </li>
              <li>
                <a
                  href="https://iautomatiza.cl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream-100 hover:text-amber-400 transition-colors"
                >
                  iautomatiza.cl ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.2em] text-cream-400">
          <div>
            © {year} iautomatiza · Santiago, Chile
          </div>
          <div className="flex items-center gap-4">
            {/* Reemplaza a la sección de status: el detalle vive en su propia página. */}
            <a
              href="https://status.iautolicita.cl"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-sage-400 animate-pulse-soft" />
              Todos los sistemas operativos ↗
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
