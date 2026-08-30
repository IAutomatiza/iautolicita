import { Link, Navigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import MarketTicker from "../components/MarketTicker";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Seo from "../components/Seo";
import Eyebrow from "../components/ui/Eyebrow";
import { POR_SLUG_GUIA, rutaGuia, minutosDe, RUTA_GUIAS } from "../lib/guias";
import { POR_SLUG as TERMINOS, rutaTermino } from "../lib/glosario";
import { enlaceApp } from "../lib/cta";

/* Una guía completa.

   A partir de las dos mil palabras la página deja de leerse de
   corrido y pasa a consultarse. Por eso lleva índice: no es adorno,
   es la diferencia entre que alguien encuentre lo suyo en diez
   segundos o se devuelva a Google. Google también lo puede usar para
   mostrar saltos a secciones dentro del resultado.

   El cierre hacia la app va sólo al final, distinto de las páginas
   comerciales que lo repiten arriba. Acá la persona vino a aprender:
   interrumpirla a mitad de camino con un botón la echa. */

export default function GuiaPage({ slug }: { slug: string }) {
  const g = POR_SLUG_GUIA[slug];
  if (!g) return <Navigate to={RUTA_GUIAS} replace />;

  return (
    <>
      <MarketTicker />
      <Seo ruta={rutaGuia(g.slug)} />
      <Nav />

      <main className="pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="container-edge">
          <div className="mx-auto max-w-[720px]">
            <Eyebrow align="left">Guía</Eyebrow>

            <h1 className="mt-5 font-display font-medium text-[38px] md:text-[54px] leading-[1.03] tracking-[-0.04em] text-cream-50">
              {g.titulo}
            </h1>

            <p className="mt-5 max-w-[62ch] font-sans text-[17.5px] leading-[1.55] text-cream-200">
              {g.bajada}
            </p>

            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-cream-400">
              {minutosDe(g)} minutos de lectura
            </p>

            {/* El índice. En una página de consulta es lo primero que
                se mira, así que va antes del contenido y no al costado:
                en el teléfono una barra lateral no existe. */}
            <nav className="mt-10 rounded-xl border border-[var(--hairline)] p-5 md:p-6">
              <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-cream-400">
                En esta guía
              </p>
              <ol className="mt-4 space-y-2.5">
                {g.secciones.map((s, i) => (
                  <li key={s.id} className="flex gap-3">
                    <span className="font-mono text-[11px] tabular-nums text-amber-400">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <a
                      href={`#${s.id}`}
                      className="font-sans text-[15px] leading-snug text-cream-200 underline-offset-2 transition-colors hover:text-amber-400 hover:underline"
                    >
                      {s.titulo}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="mt-14 space-y-14">
              {g.secciones.map((s, i) => (
                <section key={s.id} id={s.id} className="scroll-mt-28">
                  <h2 className="flex items-baseline gap-3 font-display font-medium text-[24px] md:text-[29px] leading-tight tracking-[-0.03em] text-cream-50">
                    <span className="font-mono text-[11px] tabular-nums text-amber-400">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {s.titulo}
                  </h2>

                  <div className="mt-4 space-y-3.5 pl-[calc(11px+0.75rem)]">
                    {s.parrafos.map((p, j) => (
                      <p
                        key={j}
                        className="font-sans text-[16px] leading-[1.68] text-cream-200"
                      >
                        {p}
                      </p>
                    ))}

                    {s.lista && (
                      <ul className="mt-5 space-y-3">
                        {s.lista.map((li, j) => (
                          <li key={j} className="flex gap-3">
                            <span
                              aria-hidden
                              className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400"
                            />
                            <span className="font-sans text-[15.5px] leading-[1.62] text-cream-200">
                              {li}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {s.aviso && (
                      <p className="mt-5 border-l-2 border-amber-400 pl-4 font-sans text-[15.5px] leading-[1.6] text-cream-100">
                        {s.aviso}
                      </p>
                    )}
                  </div>
                </section>
              ))}
            </div>

            <section className="mt-16 border-t border-[var(--hairline)] pt-12">
              <h2 className="font-display font-medium text-[24px] md:text-[29px] leading-tight tracking-[-0.03em] text-cream-50">
                Preguntas frecuentes
              </h2>
              <dl className="mt-6 space-y-7">
                {g.faqs.map((f) => (
                  <div key={f.q}>
                    <dt className="font-sans text-[16.5px] font-medium leading-snug text-cream-50">
                      {f.q}
                    </dt>
                    <dd className="mt-2 font-sans text-[15.5px] leading-[1.65] text-cream-200">
                      {f.a}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>

            <section className="mt-14 rounded-xl border border-[var(--hairline-strong)] p-6 md:p-8">
              <p className="font-sans text-[16.5px] leading-[1.6] text-cream-100">
                {g.cierre.texto}
              </p>
              <a
                href={enlaceApp("glosario", { campana: g.slug })}
                className="group mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-amber-400 px-6 font-sans text-[14.5px] font-medium text-white transition-all duration-200 hover:-translate-y-[1px]"
              >
                {g.cierre.boton}
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
              <p className="mt-3 font-sans text-[13.5px] text-cream-400">
                Se parte con el plan gratis.
              </p>
            </section>

            {g.glosario.length > 0 && (
              <nav className="mt-14 border-t border-[var(--hairline)] pt-8">
                <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-cream-400">
                  Los términos de esta guía
                </h2>
                <ul className="mt-4 flex flex-wrap gap-2.5">
                  {g.glosario
                    .map((s) => TERMINOS[s])
                    .filter(Boolean)
                    .map((t) => (
                      <li key={t.slug}>
                        <Link
                          to={rutaTermino(t.slug)}
                          className="inline-flex items-center rounded-full border border-[var(--hairline-strong)] px-4 py-2 font-sans text-[14px] text-cream-200 transition-colors hover:border-amber-400/40 hover:text-amber-400"
                        >
                          {t.termino}
                        </Link>
                      </li>
                    ))}
                </ul>
              </nav>
            )}

            <p className="mt-10 font-sans text-[14.5px] text-cream-300">
              <Link to={RUTA_GUIAS} className="underline hover:text-amber-400">
                Ver todas las guías
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
