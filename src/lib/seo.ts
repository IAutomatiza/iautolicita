import { FAQS } from "./faqs";
import { PLAN, enPesos } from "./planes";
import {
  TERMINOS,
  RUTA_GLOSARIO,
  rutaTermino,
  tituloTermino,
  descripcionTermino,
} from "./glosario";

/* Todo lo que Google y las redes leen de cada página, en un lugar.

   Lo usa dos veces:
   · al compilar, el prerenderizador lo escribe dentro del HTML de
     cada ruta, para que el buscador lo vea sin ejecutar JavaScript;
   · al navegar dentro del sitio, `useSeo` lo actualiza en vivo.

   Antes cada página cambiaba `document.title` a mano y la
   descripción nunca cambiaba: las tres decían la misma. */

/* El sitio vive en www, no en el dominio pelado.

   No es un capricho de estilo: con www el sitio se sirve por CNAME,
   y el registro A del dominio raíz —del que cuelga el correo— no
   hay que tocarlo. La raíz redirige a www. */
export const SITIO = "https://www.iautolicita.cl";
export const NOMBRE = "IAutoLicita";
export const OG_IMAGEN = `${SITIO}/og.png`;

export type MetaPagina = {
  titulo: string;
  descripcion: string;
  ruta: string;
};

export const PAGINAS: Record<string, MetaPagina> = {
  "/": {
    ruta: "/",
    titulo:
      "Alertas de licitaciones de Mercado Público — IAutoLicita",
    descripcion:
      "Vigilamos Mercado Público y te avisamos solo las licitaciones que calzan con lo que vendes. Te leemos las bases y te decimos a qué precio se adjudicó antes. Plan gratis, sin tarjeta.",
  },
  "/lici": {
    ruta: "/lici",
    titulo: "Lici — la IA que te lee las bases de una licitación",
    descripcion:
      "Lici lee las bases completas de una licitación o compra ágil y te responde qué piden, qué garantía y qué fechas — citando la página exacta. Pruébala gratis.",
  },
  "/precios": {
    ruta: "/precios",
    titulo: "Planes y precios — IAutoLicita",
    descripcion:
      `Plan gratis para siempre y sin tarjeta. Pro ${enPesos(PLAN.pro.neto)} + IVA al mes con alertas al instante y Lici sin tope. Max ${enPesos(PLAN.max.neto)} con varias empresas, presupuestos y cobranza.`,
  },
  "/contacto": {
    ruta: "/contacto",
    titulo: "Pide una reunión — IAutoLicita",
    descripcion:
      "Media hora con tus propias licitaciones en pantalla, no una demo genérica. Déjanos tu RUT y llegamos con tu perfil ya calculado.",
  },
  "/privacidad": {
    ruta: "/privacidad",
    titulo: "Política de privacidad — IAutoLicita",
    descripcion:
      "Qué datos recogemos en IAutoLicita, para qué los usamos, qué cookies instalamos y cómo pedir que los eliminemos.",
  },
  "/terminos": {
    ruta: "/terminos",
    titulo: "Términos y condiciones — IAutoLicita",
    descripcion:
      "Las reglas del servicio: planes, pagos, cancelación, origen de los datos de ChileCompra y límites de responsabilidad.",
  },
  [RUTA_GLOSARIO]: {
    ruta: RUTA_GLOSARIO,
    titulo: "Glosario de Mercado Público — IAutoLicita",
    descripcion:
      "Qué significa cada palabra que aparece en una licitación de Mercado Público: tipos de proceso, garantías, documentos y plazos, explicados para quien vende.",
  },

  /* Cada término entra solo. Si se escribe una ficha nueva en
     `glosario.ts`, su ruta queda prerenderizada y en el sitemap sin
     tocar nada acá — que es justo lo que evita que una entrada
     quede publicada pero invisible para Google. */
  ...Object.fromEntries(
    TERMINOS.map((t) => [
      rutaTermino(t.slug),
      {
        ruta: rutaTermino(t.slug),
        titulo: tituloTermino(t),
        descripcion: descripcionTermino(t),
      },
    ]),
  ),
};

/* ── Datos estructurados ──────────────────────────────────────
   Sin esto Google no sabe que somos una empresa con un producto
   que cuesta una cifra concreta. Con esto puede mostrar el precio
   y las preguntas frecuentes dentro del propio resultado. */

export const jsonLdOrganizacion = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: NOMBRE,
  url: SITIO,
  logo: OG_IMAGEN,
  description:
    "Plataforma chilena que detecta, analiza y gestiona licitaciones de Mercado Público (ChileCompra) con inteligencia artificial.",
  areaServed: { "@type": "Country", name: "Chile" },
  parentOrganization: { "@type": "Organization", name: "IAutomatiza" },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "ventas",
    email: "contacto@iautolicita.cl",
    availableLanguage: ["Spanish"],
  },
});

export const jsonLdProducto = () => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: NOMBRE,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: SITIO,
  description:
    "Detecta las licitaciones de Mercado Público que calzan con lo que vendes, lee las bases con IA y muestra a qué precio se adjudicó antes.",
  offers: [
    {
      "@type": "Offer",
      name: "Free",
      price: "0",
      priceCurrency: "CLP",
      description: "Explorar el mercado completo y probar Lici. Sin tarjeta.",
    },
    {
      "@type": "Offer",
      name: "Pro",
      price: String(PLAN.pro.neto),
      priceCurrency: "CLP",
      description:
        `Alertas al instante, Lici sin tope y gestor de propuestas. Hasta ${PLAN.pro.usuarios} usuarios.`,
    },
    {
      "@type": "Offer",
      name: "Max",
      price: String(PLAN.max.neto),
      priceCurrency: "CLP",
      description:
        `Todo lo de Pro, más varias empresas, presupuestos y cobranza. Hasta ${PLAN.max.usuarios} usuarios.`,
    },
  ],
});

/** Las 7 preguntas del home, para que Google las despliegue. */
export const jsonLdFaq = () => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

/** Qué bloques lleva cada ruta. */
/* El glosario se declara con el vocabulario de schema.org para
   glosarios (`DefinedTermSet` / `DefinedTerm`). No es adorno: le dice
   a Google que esto es un cuerpo de definiciones y no una serie de
   artículos sueltos, y la definición marcada es la que puede levantar
   como respuesta directa en el resultado.

   Las migas de pan hacen que en el resultado se lea
   «iautolicita.cl › Glosario › LE» en vez de la URL cruda. */

const jsonLdGlosario = () => ({
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  name: "Glosario de Mercado Público",
  url: `${SITIO}${RUTA_GLOSARIO}`,
  hasDefinedTerm: TERMINOS.map((t) => ({
    "@type": "DefinedTerm",
    name: t.termino,
    description: t.definicion,
    url: `${SITIO}${rutaTermino(t.slug)}`,
  })),
});

const jsonLdTermino = (slug: string) => {
  const t = TERMINOS.find((x) => x.slug === slug)!;
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: t.termino,
    alternateName: t.nombreLargo,
    description: t.definicion,
    url: `${SITIO}${rutaTermino(t.slug)}`,
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: "Glosario de Mercado Público",
      url: `${SITIO}${RUTA_GLOSARIO}`,
    },
  };
};

const jsonLdMigas = (slug: string) => {
  const t = TERMINOS.find((x) => x.slug === slug)!;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: SITIO },
      {
        "@type": "ListItem",
        position: 2,
        name: "Glosario",
        item: `${SITIO}${RUTA_GLOSARIO}`,
      },
      { "@type": "ListItem", position: 3, name: t.termino },
    ],
  };
};

export function jsonLdDe(ruta: string): object[] {
  if (ruta === "/") return [jsonLdOrganizacion(), jsonLdProducto(), jsonLdFaq()];
  if (ruta === "/precios") return [jsonLdProducto()];
  if (ruta === RUTA_GLOSARIO) return [jsonLdGlosario()];
  if (ruta.startsWith(`${RUTA_GLOSARIO}/`)) {
    const slug = ruta.slice(RUTA_GLOSARIO.length + 1);
    if (TERMINOS.some((t) => t.slug === slug))
      return [jsonLdTermino(slug), jsonLdMigas(slug)];
  }
  return [jsonLdOrganizacion()];
}
