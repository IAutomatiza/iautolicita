import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import WhatsAppButton from "./ui/WhatsAppButton";

// Wrangle-inspired IA: one grouped dropdown for the product surface,
// two flat trust-signal links, and a 3-tier CTA cascade on the right.

const productLinks = [
  { href: "#capacidades", title: "Capacidades", desc: "Detección, precio real, comprador y alertas" },
  { href: "#como",        title: "Cómo funciona", desc: "El flujo end-to-end" },
  { href: "#resultados",  title: "Con y sin IAutoLicita", desc: "Lo que cambia cuando conoces el precio real" },
  { href: "#ventajas",    title: "Solo acá lo tienes", desc: "Seis cosas que la competencia no puede darte" },
];

// "Lici." va como wordmark —negrita con el punto azul— igual que en la app.
const LiciWordmark = () => (
  <span className="font-bold">
    Lici<span className="text-amber-400">.</span>
  </span>
);

const flatLinks: {
  href: string;
  /** Ruta propia (se navega tal cual) o ancla de una sección. */
  isRoute?: boolean;
  /** La marca va con más peso; el resto en el gris del menú.
      Antes lo decidía isRoute, y al agregar «Planes» heredó el
      tratamiento de Lici y parecía otra marca. */
  marca?: boolean;
  /** Vive fuera del sitio: se abre en pestaña nueva. */
  externo?: boolean;
  label: React.ReactNode;
}[] = [
  { href: "/lici", label: <LiciWordmark />, isRoute: true, marca: true },
  { href: "/precios", label: "Planes", isRoute: true },
  { href: "#faq", label: "FAQ" },
];

export default function Nav({ conTicker = true }: { conTicker?: boolean } = {}) {
  // Las secciones viven en el home: fuera de él, un "#faq" pelado
  // no lleva a ninguna parte, así que se resuelven contra "/".
  const enHome = useLocation().pathname === "/";
  const aSeccion = (href: string) => (enHome ? href : `/${href}`);

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Grace period so the cursor can travel from trigger → menu.
  const openProduct = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setProductOpen(true);
  };
  const closeProduct = () => {
    closeTimer.current = window.setTimeout(() => setProductOpen(false), 120);
  };

  return (
    <header
      className={`fixed inset-x-0 ${conTicker ? "top-8" : "top-0"} z-40 transition-all duration-300 ${
        scrolled
          ? "bg-ink-950/85 backdrop-blur-md border-b border-[var(--hairline)]"
          : "bg-transparent"
      }`}
    >
      <div className="container-edge flex h-16 items-center justify-between gap-6">
        {/* Logo */}
        <Link to={aSeccion("#top")} className="flex items-baseline gap-2 group shrink-0">
          <span className="font-display font-medium text-[22px] tracking-tightest leading-none text-cream-50">
            <span className="text-amber-400">IA</span>utoLicita<span className="text-amber-400">.</span>
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream-400 hidden sm:inline">
            by iautomatiza
          </span>
        </Link>

        {/* Left-center nav (Wrangle layout) */}
        <nav className="hidden lg:flex items-center gap-1 flex-1 pl-6">
          {/* Producto dropdown */}
          <div
            className="relative"
            onMouseEnter={openProduct}
            onMouseLeave={closeProduct}
          >
            <button
              type="button"
              onClick={() => setProductOpen((v) => !v)}
              aria-expanded={productOpen}
              className={`inline-flex items-center gap-1 px-3 h-9 rounded-md text-[13.5px] font-sans transition-colors ${
                productOpen ? "text-amber-400" : "text-cream-200 hover:text-cream-50"
              }`}
            >
              Producto
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-200 ${
                  productOpen ? "rotate-180" : ""
                }`}
                strokeWidth={2}
              />
            </button>

            <div
              className={`absolute left-0 top-[calc(100%+4px)] w-[340px] transition-all duration-150 ease-out ${
                productOpen
                  ? "opacity-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 -translate-y-1 pointer-events-none"
              }`}
            >
              <div className="p-2 rounded-xl bg-ink-950 border border-[var(--hairline-strong)] shadow-[0_20px_60px_-20px_rgba(10,10,10,0.18),0_4px_12px_rgba(10,10,10,0.06)]">
                {productLinks.map((l) => (
                  <Link
                    key={l.href}
                    to={aSeccion(l.href)}
                    onClick={() => setProductOpen(false)}
                    className="block px-3 py-2.5 rounded-lg hover:bg-amber-400/[0.06] transition-colors group/item"
                  >
                    <div className="text-[13.5px] font-sans text-cream-50 group-hover/item:text-amber-400 transition-colors leading-tight">
                      {l.title}
                    </div>
                    <div className="mt-0.5 text-[11.5px] font-mono text-cream-400 leading-tight">
                      {l.desc}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {flatLinks.map((l) =>
            l.externo ? (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 h-9 inline-flex items-center rounded-md text-[13.5px] font-sans text-cream-200 hover:text-cream-50 transition-colors"
              >
                {l.label}
              </a>
            ) : l.isRoute ? (
              <Link
                key={l.href}
                to={l.href}
                className={`px-3 h-9 inline-flex items-center rounded-md text-[13.5px] font-sans transition-colors ${
                  l.marca
                    ? "text-cream-50 hover:text-amber-400"
                    : "text-cream-200 hover:text-cream-50"
                }`}
              >
                {l.label}
              </Link>
            ) : (
              <Link
                key={l.href}
                to={aSeccion(l.href)}
                className="px-3 h-9 inline-flex items-center rounded-md text-[13.5px] font-sans text-cream-200 hover:text-cream-50 transition-colors"
              >
                {l.label}
              </Link>
            )
          )}
        </nav>

        {/* Right: 3-CTA cascade */}
        <div className="flex items-center gap-1 lg:gap-2">
          <a
            href="https://app.iautolicita.cl/login"
            className="hidden md:inline-flex items-center h-9 px-3 text-[13.5px] font-sans text-cream-200 hover:text-cream-50 transition-colors"
          >
            Iniciar sesión
          </a>
          <WhatsAppButton variant="primary" label="¡Prueba gratis!" />

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Abrir menú"
            className="lg:hidden h-10 w-10 grid place-items-center border border-cream-300/20 text-cream-100 ml-1"
          >
            <span className="block h-px w-4 bg-current relative before:content-[''] before:absolute before:-top-1.5 before:left-0 before:h-px before:w-4 before:bg-current after:content-[''] after:absolute after:top-1.5 after:left-0 after:h-px after:w-4 after:bg-current" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="lg:hidden border-t border-[var(--hairline)] bg-ink-950">
          <div className="container-edge py-4 flex flex-col">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-cream-400 pt-1 pb-2">
              Producto
            </div>
            {productLinks.map((l) => (
              <Link
                key={l.href}
                to={aSeccion(l.href)}
                onClick={() => setMobileOpen(false)}
                className="py-2.5 border-b border-[var(--hairline)] text-[14px] text-cream-100"
              >
                {l.title}
              </Link>
            ))}
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-cream-400 pt-4 pb-2">
              Más
            </div>
            {flatLinks.map((l) =>
              l.externo ? (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="py-2.5 border-b border-[var(--hairline)] text-[14px] text-cream-200"
                >
                  {l.label}
                </a>
              ) : l.isRoute ? (
                <Link
                  key={l.href}
                  to={l.href}
                  onClick={() => setMobileOpen(false)}
                  className={`py-2.5 border-b border-[var(--hairline)] text-[14px] ${
                    l.marca ? "text-cream-100" : "text-cream-200"
                  }`}
                >
                  {l.label}
                </Link>
              ) : (
                <Link
                  key={l.href}
                  to={aSeccion(l.href)}
                  onClick={() => setMobileOpen(false)}
                  className="py-2.5 border-b border-[var(--hairline)] text-[14px] text-cream-100"
                >
                  {l.label}
                </Link>
              )
            )}
            <a
              href="https://app.iautolicita.cl/login"
              className="py-2.5 text-[14px] text-cream-100"
            >
              Iniciar sesión
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
