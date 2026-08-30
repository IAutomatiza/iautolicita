import { Link, Navigate } from "react-router-dom";
import { ArrowUpRight, Check } from "lucide-react";
import MarketTicker from "../components/MarketTicker";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Seo from "../components/Seo";
import Eyebrow from "../components/ui/Eyebrow";
import { POR_SLUG_AYUDA, rutaAyuda, RUTA_AYUDA } from "../lib/ayuda";
import { enlaceApp } from "../lib/cta";

/* Una ficha del centro de ayuda.

   Estructura distinta al glosario y a las comerciales, porque el
   lector es otro: acá ya sabe que la app existe y viene a entender
   una pantalla concreta.

   Por eso arriba va «Qué responde esta pantalla» como lista de
   preguntas. Es lo que la persona está buscando en realidad —no una
   descripción de la función, sino saber si le sirve para lo suyo— y
   deja que descarte en cinco segundos si no era acá.

   ⛔ Ninguna de estas páginas muestra datos. Se describe qué se puede
   averiguar, nunca el resultado de averiguarlo. */

export default function AyudaFichaPage({ slug }: { slug: string }) {
  const f = POR_SLUG_AYUDA[slug];
  if (!f) return <Navigate to={RUTA_AYUDA} replace />;

  return (
    <>
      <MarketTicker />
      <Seo ruta={rutaAyuda(f.slug)} />
      <Nav />

      <main className="pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="container-edge">
          <div className="mx-auto max-w-[720px]">
            <Eyebrow align="left">{f.familia}</Eyebrow>

            <h1 className="mt-5 font-display font-medium text-[38px] md:text-[52px] leading-[1.03] tracking-[-0.04em] text-cream-50">
              {f.titulo}
            </h1>

            <p className="mt-5 max-w-[60ch] font-sans text-[17.5px] leading-[1.55] text-cream-200">
              {f.bajada}
            </p>

            {/* Las preguntas que resuelve. Van arriba porque es lo que
                la persona está buscando de verdad: no la descripción
                de la función, sino si le sirve para lo suyo. */}
            <section className="mt-11 rounded-xl border border-[var(--hairline)] p-6 md:p-7">
              <h2 className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-cream-400">
                Qué responde esta pantalla
              </h2>
              <ul className="mt-4 space-y-3">
                {f.responde.map((r) => (
                  <li key={r} className="flex gap-3">
                    <Check
                      size={16}
                      strokeWidth={2.5}
                      className="mt-[3px] shrink-0 text-amber-400"
                      aria-hidden
                    />
                    <span className="font-sans text-[15.5px] leading-[1.55] text-cream-100">
                      {r}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <div className="mt-14 space-y-11">
              {f.bloques.map((b) => (
                <section key={b.titulo}>
                  <h2 className="font-display font-medium text-[22px] md:text-[26px] leading-tight tracking-[-0.028em] text-cream-50">
                    {b.titulo}
                  </h2>
                  <div className="mt-4 space-y-3.5">
                    {b.parrafos.map((p, i) => (
                      <p
                        key={i}
                        className="font-sans text-[15.5px] leading-[1.68] text-cream-200"
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            {f.donde && (
              <p className="mt-12 rounded-lg border border-[var(--hairline)] px-5 py-4 font-mono text-[12.5px] leading-relaxed text-cream-300">
                <span className="text-cream-400">Dónde está · </span>
                {f.donde}
              </p>
            )}

            <section className="mt-12 rounded-xl border border-[var(--hairline-strong)] p-6 md:p-8">
              <p className="font-sans text-[16.5px] leading-[1.6] text-cream-100">
                {f.cierre.texto}
              </p>
              <a
                href={enlaceApp("glosario", { campana: `ayuda-${f.slug}` })}
                className="group mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-amber-400 px-6 font-sans text-[14.5px] font-medium text-white transition-all duration-200 hover:-translate-y-[1px]"
              >
                {f.cierre.boton}
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
              <p className="mt-3 font-sans text-[13.5px] text-cream-400">
                Se parte con el plan gratis.
              </p>
            </section>

            {f.vecinos.length > 0 && (
              <nav className="mt-14 border-t border-[var(--hairline)] pt-8">
                <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-cream-400">
                  Relacionados
                </h2>
                <ul className="mt-4 flex flex-wrap gap-2.5">
                  {f.vecinos
                    .map((s) => POR_SLUG_AYUDA[s])
                    .filter(Boolean)
                    .map((v) => (
                      <li key={v.slug}>
                        <Link
                          to={rutaAyuda(v.slug)}
                          className="inline-flex items-center rounded-full border border-[var(--hairline-strong)] px-4 py-2 font-sans text-[14px] text-cream-200 transition-colors hover:border-amber-400/40 hover:text-amber-400"
                        >
                          {v.titulo}
                        </Link>
                      </li>
                    ))}
                </ul>
              </nav>
            )}

            <p className="mt-10 font-sans text-[14.5px] text-cream-300">
              <Link to={RUTA_AYUDA} className="underline hover:text-amber-400">
                Volver al centro de ayuda
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
