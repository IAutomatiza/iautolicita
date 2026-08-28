/* Prerenderizado — corre después de `vite build`.

   El problema que resuelve: una SPA le entrega a Google un
   `<div id="root"></div>` vacío. Google sabe ejecutar JavaScript,
   pero lo hace en una segunda pasada que puede tardar días, y los
   rastreadores de IA (ChatGPT, Perplexity) no lo hacen nunca.

   Acá se renderiza cada ruta a HTML de verdad al compilar, y se le
   escriben sus metadatos y sus datos estructurados. El visitante
   ve exactamente lo mismo: React hidrata encima del mismo marcado.

   Además deja el robots.txt y el sitemap.xml, que no existían.

   Variables:
     SITE_URL     dominio canónico (por defecto el de producción)
     VERCEL_ENV   si viene y no es "production", se marca noindex
                  para que un preview no compita con el sitio real */

import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { build } from "vite";

const RAIZ = process.cwd();
const DIST = join(RAIZ, "dist");
const SSR = join(RAIZ, ".ssr-tmp");

/* 1 · Bundle de servidor, temporal */
await build({
  logLevel: "warn",
  build: {
    ssr: "src/entry-server.tsx",
    outDir: ".ssr-tmp",
    emptyOutDir: true,
    copyPublicDir: false,
  },
});

const { render, PAGINAS, SITIO, OG_IMAGEN, jsonLdDe } = await import(
  join(SSR, "entry-server.js")
);

const BASE = (process.env.SITE_URL || SITIO).replace(/\/$/, "");
const esPreview =
  !!process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production";

const plantilla = readFileSync(join(DIST, "index.html"), "utf8");
const escapar = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");

const rutas = Object.values(PAGINAS);
const hoy = new Date().toISOString().slice(0, 10);

for (const pagina of rutas) {
  const url = `${BASE}${pagina.ruta === "/" ? "/" : pagina.ruta}`;
  const cuerpo = render(pagina.ruta);

  const bloques = jsonLdDe(pagina.ruta)
    .map(
      (b) =>
        `    <script type="application/ld+json">${JSON.stringify(b).replace(/</g, "\\u003c")}</script>`,
    )
    .join("\n");

  const cabeza = [
    `    <link rel="canonical" href="${url}" />`,
    esPreview ? `    <meta name="robots" content="noindex, nofollow" />` : "",
    `    <meta property="og:url" content="${url}" />`,
    `    <meta property="og:image" content="${OG_IMAGEN}" />`,
    `    <meta property="og:site_name" content="IAutoLicita" />`,
    bloques,
  ]
    .filter(Boolean)
    .join("\n");

  let html = plantilla
    // El título y la descripción del index son los del home; cada
    // ruta escribe los suyos.
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapar(pagina.titulo)}</title>`)
    .replace(
      /<meta\s+name="description"[\s\S]*?\/>/,
      `<meta name="description" content="${escapar(pagina.descripcion)}" />`,
    )
    .replace(
      /<meta property="og:title"[\s\S]*?\/>/,
      `<meta property="og:title" content="${escapar(pagina.titulo)}" />`,
    )
    .replace(
      /<meta\s+property="og:description"[\s\S]*?\/>/,
      `<meta property="og:description" content="${escapar(pagina.descripcion)}" />`,
    )
    .replace("</head>", `${cabeza}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${cuerpo}</div>`);

  const destino =
    pagina.ruta === "/"
      ? join(DIST, "index.html")
      : join(DIST, pagina.ruta.slice(1), "index.html");
  mkdirSync(dirname(destino), { recursive: true });
  writeFileSync(destino, html);

  const palabras = cuerpo.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  console.log(`  ✓ ${pagina.ruta.padEnd(10)} ${palabras} palabras en el HTML`);
}

/* 2 · robots.txt — no existía */
writeFileSync(
  join(DIST, "robots.txt"),
  esPreview
    ? `User-agent: *\nDisallow: /\n`
    : `User-agent: *\nAllow: /\n\nSitemap: ${BASE}/sitemap.xml\n`,
);

/* 3 · sitemap.xml — tampoco */
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${rutas
  .map(
    (p) => `  <url>
    <loc>${BASE}${p.ruta === "/" ? "/" : p.ruta}</loc>
    <lastmod>${hoy}</lastmod>
    <changefreq>${p.ruta === "/" ? "weekly" : "monthly"}</changefreq>
    <priority>${p.ruta === "/" ? "1.0" : "0.8"}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;
writeFileSync(join(DIST, "sitemap.xml"), sitemap);
console.log(`  ✓ robots.txt y sitemap.xml (${rutas.length} URL)`);

rmSync(SSR, { recursive: true, force: true });
