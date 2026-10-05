import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Seo from "../components/Seo";

/* 404 de verdad.

   Antes cualquier dirección inventada (/no-existe) devolvía la portada
   con código 200: para Google eran miles de copias de la home
   («soft 404»). El prerender escribe esta página en dist/404.html y
   Vercel la sirve con código 404 cuando no encuentra el archivo. */

export default function NoEncontradaPage() {
  return (
    <>
      <Seo ruta="/404" />
      <Nav />
      <main className="pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="container-edge max-w-[640px]">
          <h1 className="font-display font-medium text-[40px] md:text-[52px] leading-[1.02] tracking-[-0.04em] text-cream-50">
            Esta página no existe.
          </h1>
          <p className="mt-5 font-sans text-[16.5px] leading-[1.6] text-cream-200">
            Puede que el enlace esté mal escrito o que la hayamos movido.
          </p>
          <ul className="mt-8 space-y-3 font-sans text-[15px] text-cream-200">
            <li><Link className="text-amber-400 hover:underline" to="/">Ir al inicio</Link></li>
            <li><Link className="text-amber-400 hover:underline" to="/compra-agil">Compra Ágil</Link></li>
            <li><Link className="text-amber-400 hover:underline" to="/glosario">Glosario de Mercado Público</Link></li>
            <li><Link className="text-amber-400 hover:underline" to="/precios">Planes y precios</Link></li>
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
