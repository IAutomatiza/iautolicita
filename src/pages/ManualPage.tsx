/* Cómo funciona IAutoLicita — el manual, abierto y sin cuenta.

   QUÉ ES Y DE DÓNDE SALE
   Todo lo que se ve acá está en `src/content/manual/iautolicita.ts`, un archivo
   GENERADO desde el manual de funcionamiento (indice.json + fichas/). Esta
   página no sabe ningún texto: reordenar una pestaña en el índice y volver a
   exportar cambia la app, el PDF y esta página a la vez. Por eso no se edita
   contenido acá — el próximo export lo pisa.

   EN QUÉ SE DIFERENCIA DE /ayuda
   El centro de ayuda explica QUÉ PUEDES AVERIGUAR con cada reporte, y está
   escrito para quien todavía no entra. Esto es el manual: el menú completo en su
   orden real, pantalla por pantalla, para quien quiere ver el producto entero
   antes de registrarse. Se enlazan entre sí en vez de competir.

   🔓 Las pantallas de plan pagado van con su chip, nunca escondidas. */
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import MarketTicker from "../components/MarketTicker";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Seo from "../components/Seo";
import Eyebrow from "../components/ui/Eyebrow";
import TextoManual, { ChipPro } from "../components/manual/TextoManual";
import { iconoManual } from "../components/manual/iconoManual";
import {
  MANUAL_CAMINO,
  MANUAL_LAMINA_MENU,
  MANUAL_MENU,
  MANUAL_META,
  MANUAL_PANTALLAS,
  MANUAL_PASOS,
  MANUAL_SECCIONES,
  type PantallaManual,
} from "../content/manual/iautolicita";
import { APP_URL } from "../lib/cta";

export const RUTA_MANUAL = "/manual";

/* Las capturas son reales y están anonimizadas. Revisadas una por una el
   11-sep-2026 contra la regla de `src/lib/ayuda.ts` —«se muestra QUÉ PUEDES
   AVERIGUAR, nunca EL RESULTADO», y las capturas «van con cifras de ejemplo»—:

   · la empresa es COMERCIAL DEMO SPA con RUT 76.543.210-K, que no existe;
   · los compradores que aparecen (Freire, Lebu, JUNAEB, FONASA) son organismos
     públicos y su gasto lo publica ChileCompra;
   · ningún tercero sale con nombre y monto: en el ranking nacional de Mercado
     los proveedores salen COLAPSADOS («otros 113.092 · ver todos»).

   ⇒ lo que se publica es una empresa de ejemplo mirando datos públicos, que es
   exactamente lo que esa regla permite. Si algún día se decide lo contrario,
   esto pasa a `false`: la página queda entera, sin imágenes. */
const MOSTRAR_CAPTURAS = true;

export default function ManualPage() {
  const conCandado = useMemo(() => MANUAL_PANTALLAS.filter((p) => p.gated).length, []);

  return (
    <>
      <MarketTicker />
      <Seo ruta={RUTA_MANUAL} />
      <Nav />

      <main className="pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="container-edge">
          <div className="mx-auto max-w-[760px]">
            <Eyebrow align="left">Cómo funciona</Eyebrow>

            <h1 className="mt-5 font-display font-medium text-[38px] md:text-[54px] leading-[1.03] tracking-[-0.04em] text-cream-50">
              IAutoLicita, pantalla por pantalla
            </h1>

            <p className="mt-5 font-sans text-[16.5px] leading-[1.6] text-cream-200">
              Esto es el manual completo, el mismo que está dentro de la app: las{" "}
              {MANUAL_PANTALLAS.length} pantallas en el orden real del menú, con para qué sirve
              cada una y qué hacer en ella. Sin cuenta y sin registrarte.
            </p>

            <p className="mt-4 font-sans text-[14.5px] leading-[1.6] text-cream-300">
              Si buscas qué responde un reporte en particular, eso está en el{" "}
              <Link to="/ayuda" className="text-amber-400 underline underline-offset-2">
                centro de ayuda
              </Link>
              .
            </p>
          </div>

          {/* ── El menú: se DIBUJA desde el índice, nunca de una captura.
                 La captura del menú sale con los ítems de administrador, que el
                 cliente no ve — mostraría un producto que no existe. */}
          <section className="mx-auto mt-16 max-w-[1100px] border-t border-[var(--hairline)] pt-12">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-amber-400">
              {MANUAL_LAMINA_MENU.eyebrow}
            </h2>
            <h3 className="mt-4 font-display font-medium text-[28px] md:text-[34px] leading-[1.1] tracking-[-0.03em] text-cream-50">
              {MANUAL_LAMINA_MENU.titulo}
            </h3>
            <p className="mt-4 max-w-[640px] font-sans text-[15.5px] leading-[1.6] text-cream-200">
              <TextoManual>{MANUAL_LAMINA_MENU.lead}</TextoManual>
            </p>

            <div className="mt-9 grid gap-10 md:grid-cols-[minmax(0,470px)_minmax(0,1fr)]">
              <div className="border border-ink-600 bg-white p-4">
                <div className="grid grid-cols-2 gap-x-5 gap-y-4">
                  {MANUAL_MENU.map((g) => (
                    <div key={g.id}>
                      {g.label && (
                        <div className="mb-1.5 px-1 font-mono text-[9.5px] uppercase tracking-[0.14em] text-cream-400">
                          {g.label}
                        </div>
                      )}
                      <ul>
                        {g.pantallas.map((p) => {
                          const Icono = iconoManual(p.icono);
                          return (
                            <li
                              key={p.id}
                              className={`flex items-center gap-1.5 px-1 py-[3px] font-sans text-[11.5px] ${
                                p.gated ? "text-cream-400" : "text-cream-200"
                              }`}
                            >
                              <Icono className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} />
                              {/* Sin `truncate`: el rótulo completo es el dato.
                                  «Cotizaciones y prop…» no le dice nada a nadie. */}
                              <span className="leading-tight">{p.label}</span>
                              {p.gated && <ChipPro titulo={p.modulo ?? undefined} />}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-8">
                <Bloque titulo="Qué mirar primero" items={[...MANUAL_LAMINA_MENU.mirar]} />
                <Bloque titulo="Qué hacer" items={[...MANUAL_LAMINA_MENU.hacer]} />
              </div>
            </div>
          </section>

          {/* ── El recorrido del primer día ── */}
          <section className="mx-auto mt-20 max-w-[760px] border-t border-[var(--hairline)] pt-12">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-amber-400">
              El primer día
            </h2>
            <h3 className="mt-4 font-display font-medium text-[28px] md:text-[34px] leading-[1.1] tracking-[-0.03em] text-cream-50">
              {MANUAL_PASOS} pasos y la app trabaja para ti
            </h3>
            <ol className="mt-7 space-y-px">
              <li className="flex gap-4 border-b border-[var(--hairline)] py-3.5">
                <span className="w-6 shrink-0 font-mono text-[12px] tabular-nums text-amber-400">01</span>
                <span className="font-sans text-[15px] leading-[1.55] text-cream-200">
                  <b className="font-medium text-cream-50">{MANUAL_LAMINA_MENU.titulo}</b> — dónde
                  vive cada cosa en el menú.
                </span>
              </li>
              {MANUAL_CAMINO.map((p, i) => (
                <li key={p.id} className="flex gap-4 border-b border-[var(--hairline)] py-3.5">
                  <span className="w-6 shrink-0 font-mono text-[12px] tabular-nums text-amber-400">
                    {String(i + 2).padStart(2, "0")}
                  </span>
                  <span className="font-sans text-[15px] leading-[1.55] text-cream-200">
                    <a href={`#${p.id}`} className="font-medium text-cream-50 hover:text-amber-400">
                      {p.label}
                    </a>{" "}
                    — {p.para}
                  </span>
                </li>
              ))}
            </ol>
          </section>

          {/* ── Las pantallas, en el orden del menú ── */}
          <section className="mx-auto mt-20 max-w-[1100px] border-t border-[var(--hairline)] pt-12">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-amber-400">
              Todas las pantallas
            </h2>
            <p className="mt-4 max-w-[640px] font-sans text-[15.5px] leading-[1.6] text-cream-200">
              Las {MANUAL_PANTALLAS.length} en el orden en que están en el menú. Las {conCandado}{" "}
              marcadas con <ChipPro /> vienen en un plan superior.
            </p>

            <div className="mt-12 space-y-16">
              {MANUAL_SECCIONES.map((g) => (
                <div key={g.id}>
                  {g.label && (
                    <h3 className="border-b border-ink-600 pb-2 font-condensed text-[26px] uppercase tracking-[0.01em] text-cream-50">
                      {g.label}
                    </h3>
                  )}
                  <div className="mt-8 space-y-14">
                    {g.pantallas.map((p) => (
                      <Pantalla key={p.id} p={p} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Cierre ── */}
          <section className="mx-auto mt-20 max-w-[760px] border-t border-[var(--hairline)] pt-12">
            <h2 className="font-display font-medium text-[28px] md:text-[34px] leading-[1.1] tracking-[-0.03em] text-cream-50">
              Ver esto con tus propias licitaciones
            </h2>
            <p className="mt-4 font-sans text-[15.5px] leading-[1.6] text-cream-200">
              El plan gratis no es una prueba de 14 días: entras con tu RUT y la app te muestra lo
              que hay para ti. Este manual queda dentro, arriba a la derecha.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={APP_URL}
                className="border border-brand-600 bg-brand-600 px-5 py-3 font-sans text-[14px] font-medium text-white transition-colors hover:bg-brand-700"
              >
                Empezar gratis
              </a>
              <Link
                to="/precios"
                className="border border-ink-600 px-5 py-3 font-sans text-[14px] font-medium text-cream-100 transition-colors hover:border-cream-300"
              >
                Ver los planes
              </Link>
            </div>
            <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.12em] text-cream-400">
              Manual al {MANUAL_META.relevadoEn}
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}

function Bloque({ titulo, items }: { titulo: string; items: string[] }) {
  if (!items.length) return null;
  return (
    <div>
      <h4 className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-cream-400">{titulo}</h4>
      <ol className="mt-4 space-y-3.5">
        {items.map((x, i) => (
          <li key={i} className="flex gap-3">
            <span className="mt-[3px] w-4 shrink-0 font-mono text-[11px] tabular-nums text-amber-400">
              {i + 1}
            </span>
            <span className="font-sans text-[14.5px] leading-[1.6] text-cream-200">
              <TextoManual>{x}</TextoManual>
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Pantalla({ p }: { p: PantallaManual }) {
  const [abierta, setAbierta] = useState(false);
  const Icono = iconoManual(p.icono);
  return (
    <article id={p.id} className="scroll-mt-28">
      <div className="flex flex-wrap items-center gap-2.5">
        <Icono className="h-5 w-5 text-cream-300" strokeWidth={1.75} />
        <h4 className="font-display font-medium text-[22px] leading-tight tracking-[-0.02em] text-cream-50">
          {p.label}
        </h4>
        {p.gated && <ChipPro titulo={p.modulo ?? undefined} />}
        {p.caminoCorto && (
          <span className="border border-brand-200 bg-brand-50 px-1.5 py-px font-mono text-[10px] uppercase tracking-[0.1em] text-brand-700">
            Día 1
          </span>
        )}
      </div>

      <p className="mt-3 max-w-[640px] font-sans text-[15.5px] leading-[1.6] text-cream-200">
        <TextoManual>{p.para}</TextoManual>
      </p>

      {/* Sin captura no hay dos columnas: dejar la izquierda vacía abre un hueco
          del alto de la pantalla y parece que algo no cargó. Hoy pasa con Plan
          de Compras, que no se pudo capturar porque la pantalla no carga. */}
      <div
        className={`mt-6 grid gap-8 ${
          MOSTRAR_CAPTURAS && p.captura ? "md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]" : "max-w-[760px]"
        }`}
      >
        <div>
          {MOSTRAR_CAPTURAS && p.captura ? (
            <figure className="border border-ink-600 bg-white">
              <figcaption className="flex items-center gap-1.5 border-b border-ink-700 bg-ink-900 px-2.5 py-1.5">
                <span className="h-2 w-2 rounded-full bg-ink-600" />
                <span className="h-2 w-2 rounded-full bg-ink-600" />
                <span className="h-2 w-2 rounded-full bg-ink-600" />
                <span className="ml-1.5 truncate font-mono text-[10px] text-cream-400">
                  app.iautolicita.cl{p.url}
                </span>
              </figcaption>
              <img
                src={p.captura}
                alt={`Pantalla ${p.label} de IAutoLicita`}
                loading="lazy"
                className="block w-full"
              />
            </figure>
          ) : null}

          {p.detalles && (
            <div className="mt-4 border-l-2 border-gold-300 bg-gold-50/50 px-4 py-3">
              <p className="font-sans text-[13.5px] leading-[1.6] text-cream-200">
                <TextoManual>{p.detalles}</TextoManual>
              </p>
            </div>
          )}
        </div>

        <div className="space-y-7">
          <Bloque titulo="Qué mirar primero" items={p.mirar} />
          <Bloque titulo="Qué hacer" items={p.hacer} />
        </div>
      </div>

      {p.subpestanas.length > 0 && (
        <div className="mt-6">
          <button
            type="button"
            onClick={() => setAbierta((v) => !v)}
            className="font-mono text-[11px] uppercase tracking-[0.12em] text-amber-400 hover:underline"
          >
            {abierta ? "Ocultar" : `Ver las ${p.subpestanas.length} pestañas de esta pantalla`}
          </button>
          {abierta && (
            <div className="mt-4 grid gap-x-8 gap-y-3 border-t border-[var(--hairline)] pt-4 sm:grid-cols-2">
              {p.subpestanas.map((s) => (
                <div key={s.label} className="font-sans text-[13.5px] leading-[1.55]">
                  <b className="font-medium text-cream-50">{s.label}</b>
                  <span className="text-cream-300">
                    {" "}
                    — <TextoManual>{s.que}</TextoManual>
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </article>
  );
}
