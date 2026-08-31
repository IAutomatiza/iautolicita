/* Sincroniza la CAPA DOMINIO del conocimiento de Lici.
   ═══════════════════════════════════════════════════════════════════

   El problema que resuelve: Lici sabía 37 fichas (≈1.500 palabras) y
   el contenido del sitio son 29.517 palabras de prosa. Por eso
   respondía genérico — no tenía nada más que decir.

   ⚠️ El HTML construido mide 76.836 palabras y 59.665 sin el menú,
   pero NINGUNA de las dos es el corpus: la página de cada término
   repite la ficha de sus tres vecinos, y el índice del glosario
   repite las 52 definiciones. Contra esos números el troceo parece
   perder la mitad. La cuadratura se hace contra la PROSA DE ORIGEN:
   29.517 palabras, censadas campo por campo sobre los .ts.

   Este script parte esas páginas en trozos y los deja en
   `lici_web_conocimiento` con `fuente='repo'`. La capa comercial
   (`fuente='manual'`) NO se toca: la editan personas en la tabla.

   ── Por qué se importan los .ts y no se scrapea el sitio ──────────
   Medido el 31-ago-2026: el HTML construido tiene 76.836 palabras,
   pero 17.171 (el 22%) son el menú, la cabecera y el pie repetidos en
   las 87 páginas. Un troceo sobre HTML mete el menú del sitio en uno
   de cada cinco trozos — y el menú calza con CUALQUIER pregunta, así
   que envenena la recuperación entera. Importar los datos evita el
   problema en vez de tener que limpiarlo.

   ── Sin solapamiento ──────────────────────────────────────────────
   El solapamiento es un parche para cortes arbitrarios. Acá el
   contenido trae sus unidades: un término, una sección de guía, un
   bloque de ficha. Cada trozo abre con una línea de contexto que
   hace el mismo trabajo con cero tokens duplicados.

   ── Y el md5 del cuerpo, no el nombre ─────────────────────────────
   Un check por nombre pasa en verde con el contenido cambiado. Acá
   se compara `hash_fuente`, que es el md5 de lo generado.

   Uso:
     npm run lici:sincronizar            # trocea y sube (no embebe)
     npm run lici:sincronizar -- --seco  # sólo informa, no escribe
   Los embeddings los genera la edge `lici-web-embeber`, que corre en
   Supabase con la OPENAI_API_KEY que el proyecto ya tiene. Así la
   llave de OpenAI no entra nunca al repo ni a los secrets del Action.
*/

import { createHash } from "node:crypto";
import { TERMINOS } from "../src/lib/glosario";
import { GUIAS } from "../src/lib/guias";
import { FICHAS as FICHAS_AYUDA } from "../src/lib/ayuda";
import { COMERCIALES } from "../src/lib/comerciales";
import { FAQS } from "../src/lib/faqs";
import { DOCUMENTOS } from "../src/lib/legal";

// ── Presupuesto de tamaño ──────────────────────────────────────────
// 250–450 palabras (~350–600 tokens). Medido: el término de glosario
// más corto son 748 palabras de página renderizada, así que NINGUNO
// entra en un solo trozo — todos se parten. El plan suponía que los
// cortos cabrían enteros; no es el caso.
const MAX_PALABRAS = 420;
const MIN_PALABRAS = 120; // por debajo de esto se pega al trozo anterior

type Trozo = {
  clave_trozo: string;
  categoria: "glosario" | "guia" | "ayuda" | "comercial_sitio" | "legal";
  titulo: string;
  url: string;
  claves: string[];
  contenido: string;
};

const palabras = (t: string) => t.trim().split(/\s+/).filter(Boolean).length;

/** Normaliza para las claves de búsqueda: sin tildes, sin puntuación. */
const normalizar = (t: string) =>
  t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
   .replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();

/* Parte una lista de párrafos en tandas que respetan el presupuesto,
   SIN cortar un párrafo por la mitad. Un párrafo más largo que el
   presupuesto viaja solo: partirlo por palabras rompería la frase. */
function repartir(parrafos: string[]): string[][] {
  const tandas: string[][] = [];
  let actual: string[] = [];
  let n = 0;
  for (const p of parrafos) {
    const w = palabras(p);
    if (actual.length && n + w > MAX_PALABRAS) {
      tandas.push(actual);
      actual = [];
      n = 0;
    }
    actual.push(p);
    n += w;
  }
  if (actual.length) {
    // Una cola muy corta se pega a la tanda anterior en vez de quedar
    // como un trozo de dos líneas que gana recuperaciones por ser corto.
    const cola = actual.reduce((s, p) => s + palabras(p), 0);
    if (tandas.length && cola < MIN_PALABRAS) tandas[tandas.length - 1].push(...actual);
    else tandas.push(actual);
  }
  return tandas.length ? tandas : [[]];
}

/** Arma los trozos de una unidad, con su encabezado de contexto. */
function trozar(
  base: Omit<Trozo, "clave_trozo" | "contenido">,
  claveBase: string,
  contexto: string,
  parrafos: string[],
): Trozo[] {
  const tandas = repartir(parrafos.filter((p) => p && p.trim()));
  return tandas.map((tanda, i) => {
    const de = tandas.length > 1 ? ` (parte ${i + 1} de ${tandas.length})` : "";
    return {
      ...base,
      clave_trozo: `${claveBase}:${i + 1}`,
      contenido: `${contexto}${de}:\n\n${tanda.join("\n\n")}`,
    };
  });
}

// ── Las cinco fuentes ──────────────────────────────────────────────

function delGlosario(): Trozo[] {
  return TERMINOS.flatMap((t) => {
    const url = `/glosario/${t.slug}`;
    const nombre = t.nombreLargo ? `${t.termino} (${t.nombreLargo})` : t.termino;
    const claves = [
      normalizar(t.termino),
      ...(t.nombreLargo ? [normalizar(t.nombreLargo)] : []),
      normalizar(t.slug.replace(/-/g, " ")),
    ];
    const cuerpo = [t.definicion, ...t.cuerpo];
    if (t.tabla) {
      cuerpo.push(
        `${t.tabla.columnas.join(" · ")}\n` +
          t.tabla.filas.map((f) => f.join(" · ")).join("\n") +
          (t.tabla.nota ? `\n${t.tabla.nota}` : ""),
      );
    }
    if (t.pasos) {
      cuerpo.push(
        t.pasos
          .map((p) => `${p.titulo}${p.duracion ? ` (${p.duracion})` : ""}: ${p.detalle}`)
          .join("\n"),
      );
    }
    // `paraTi` y `cierre` son lo que el término significa para quien
    // vende: es la parte comercial de la ficha y va junta.
    const paraTi = [...t.paraTi, ...(t.error ? [`Error frecuente: ${t.error}`] : []), t.cierre.texto];

    const base = { categoria: "glosario" as const, titulo: `Glosario · ${nombre}`, url, claves };
    return [
      ...trozar(base, `glosario:${t.slug}`, `Glosario IAutoLicita — ${nombre}`, cuerpo),
      ...trozar(
        { ...base, titulo: `Glosario · ${nombre} · para quien vende` },
        `glosario:${t.slug}:parati`,
        `Glosario IAutoLicita — ${nombre}, qué significa para quien vende`,
        paraTi,
      ),
    ];
  });
}

function deLasGuias(): Trozo[] {
  return GUIAS.flatMap((g) => {
    const claves = [normalizar(g.titulo), normalizar(g.slug.replace(/-/g, " "))];
    const secciones = g.secciones.flatMap((s) =>
      trozar(
        { categoria: "guia", titulo: `${g.titulo} · ${s.titulo}`, url: `/guias/${g.slug}#${s.id}`, claves: [...claves, normalizar(s.titulo)] },
        `guia:${g.slug}:${s.id}`,
        `Guía IAutoLicita «${g.titulo}» — ${s.titulo}`,
        [
          ...s.parrafos,
          ...(s.lista?.length ? [s.lista.map((x) => `· ${x}`).join("\n")] : []),
          ...(s.aviso ? [`Ojo: ${s.aviso}`] : []),
        ],
      ),
    );
    const faqs = g.faqs.length
      ? trozar(
          { categoria: "guia", titulo: `${g.titulo} · preguntas`, url: `/guias/${g.slug}`, claves },
          `guia:${g.slug}:faqs`,
          `Guía IAutoLicita «${g.titulo}» — preguntas frecuentes`,
          g.faqs.map((f) => `${f.q}\n${f.a}`),
        )
      : [];
    return [...secciones, ...faqs];
  });
}

function deLaAyuda(): Trozo[] {
  return FICHAS_AYUDA.flatMap((f) => {
    const claves = [normalizar(f.titulo), normalizar(f.slug.replace(/-/g, " "))];
    const url = `/ayuda/${f.slug}`;
    /* ⛔ `f.donde` NO entra. Es la ruta de menú dentro de la app
       («Menú → Inteligencia de Mercado → Proveedor»): operación pura.
       Lici de afuera vende capacidades, no enseña a usar la app — y
       una instrucción de menú envejece y pasa a MENTIR sin que nadie
       se entere. Está poblado en las 14 fichas, así que el filtro es
       omitir el campo: no hay heurística que pueda fallar. */
    return trozar(
      { categoria: "ayuda", titulo: `Centro de ayuda · ${f.titulo}`, url, claves },
      `ayuda:${f.slug}`,
      `Centro de ayuda IAutoLicita — ${f.titulo}`,
      [
        f.bajada,
        `Responde: ${f.responde.join(" ")}`,
        ...f.bloques.flatMap((b) => [`${b.titulo}. ${b.parrafos[0] ?? ""}`, ...b.parrafos.slice(1)]),
        f.cierre.texto,
      ],
    );
  });
}

function deLasComerciales(): Trozo[] {
  const paginas = COMERCIALES.flatMap((c) => {
    const claves = [normalizar(c.titulo), normalizar(c.slug.replace(/-/g, " "))];
    const url = `/${c.slug}`;
    return trozar(
      { categoria: "comercial_sitio", titulo: c.titulo, url, claves },
      `comercial:${c.slug}`,
      `IAutoLicita — ${c.titulo}`,
      [
        c.bajada,
        ...c.pruebas.map((p) => `${p.dato} — ${p.glosa}`),
        ...c.bloques.flatMap((b) => [`${b.titulo}. ${b.parrafos[0] ?? ""}`, ...b.parrafos.slice(1)]),
        ...c.faqs.map((f) => `${f.q}\n${f.a}`),
        c.cierre.texto,
      ],
    );
  });
  const faqsHome = trozar(
    { categoria: "comercial_sitio", titulo: "Preguntas frecuentes", url: "/", claves: ["preguntas frecuentes", "faq", "dudas"] },
    "comercial:faqs",
    "IAutoLicita — preguntas frecuentes del sitio",
    FAQS.map((f) => `${f.q}\n${f.a}`),
  );
  return [...paginas, ...faqsHome];
}

function deLoLegal(): Trozo[] {
  return DOCUMENTOS.flatMap((d) =>
    d.secciones.flatMap((s, i) =>
      trozar(
        { categoria: "legal", titulo: `${d.titulo} · ${s.titulo}`, url: d.ruta, claves: [normalizar(d.titulo), normalizar(s.titulo)] },
        `legal:${d.ruta.replace(/\//g, "")}:${i + 1}`,
        `${d.titulo} de IAutoLicita — ${s.titulo}`,
        s.parrafos,
      ),
    ),
  );
}

export function generar(): Trozo[] {
  return [...delGlosario(), ...deLasGuias(), ...deLaAyuda(), ...deLasComerciales(), ...deLoLegal()];
}

const md5 = (s: string) => createHash("md5").update(s, "utf8").digest("hex");

// ── Subida ─────────────────────────────────────────────────────────

const URL_SB = process.env.SUPABASE_URL;
const LLAVE = process.env.SUPABASE_SERVICE_ROLE_KEY;

async function rest(ruta: string, init: RequestInit = {}) {
  const r = await fetch(`${URL_SB}/rest/v1/${ruta}`, {
    ...init,
    headers: {
      apikey: LLAVE!,
      Authorization: `Bearer ${LLAVE}`,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });
  if (!r.ok) throw new Error(`${r.status} ${ruta}: ${await r.text()}`);
  // Con `Prefer: return=minimal` PostgREST responde 201 con cuerpo
  // VACÍO, no 204. Un .json() directo revienta con «Unexpected end of
  // JSON input», que no dice nada sobre lo que pasó de verdad.
  const cuerpo = await r.text();
  return cuerpo ? JSON.parse(cuerpo) : null;
}

async function main() {
  const seco = process.argv.includes("--seco");
  const trozos = generar();

  // Informe de troceo, siempre. Es la verificación del paso 3.
  const porCat = new Map<string, { n: number; w: number }>();
  for (const t of trozos) {
    const c = porCat.get(t.categoria) ?? { n: 0, w: 0 };
    c.n++; c.w += palabras(t.contenido);
    porCat.set(t.categoria, c);
  }
  console.log("── Troceo ──────────────────────────────────");
  for (const [cat, { n, w }] of [...porCat].sort((a, b) => b[1].w - a[1].w)) {
    console.log(`  ${cat.padEnd(17)} ${String(n).padStart(4)} trozos  ${String(w).padStart(7)} palabras`);
  }
  const total = trozos.reduce((s, t) => s + palabras(t.contenido), 0);
  console.log(`  ${"TOTAL".padEnd(17)} ${String(trozos.length).padStart(4)} trozos  ${String(total).padStart(7)} palabras`);

  const claves = new Set(trozos.map((t) => t.clave_trozo));
  if (claves.size !== trozos.length) {
    throw new Error(`clave_trozo repetida: ${trozos.length} trozos, ${claves.size} claves únicas`);
  }
  const gordos = trozos.filter((t) => palabras(t.contenido) > MAX_PALABRAS * 1.6);
  if (gordos.length) {
    console.log(`  ⚠️  ${gordos.length} trozos sobre el presupuesto (párrafos indivisibles):`);
    for (const g of gordos.slice(0, 5)) console.log(`      ${g.clave_trozo} · ${palabras(g.contenido)} palabras`);
  }

  if (seco) { console.log("\n(--seco: no se escribió nada)"); return; }
  if (!URL_SB || !LLAVE) throw new Error("Faltan SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY");

  // Estado actual de la capa dominio
  const vivos: { clave_trozo: string; hash_fuente: string; vigente: boolean }[] =
    await rest("lici_web_conocimiento?fuente=eq.repo&select=clave_trozo,hash_fuente,vigente&limit=5000");
  const previo = new Map(vivos.map((v) => [v.clave_trozo, v]));

  const filas = trozos.map((t) => ({
    categoria: t.categoria,
    titulo: t.titulo,
    claves: t.claves,
    contenido: t.contenido,
    url: t.url,
    clave_trozo: t.clave_trozo,
    hash_fuente: md5(t.contenido),
    fuente: "repo",
    // ⚠️ EXPLÍCITO. La columna tiene `default false`: omitirlo carga
    // los trozos, los embebe, cuadra el conteo de filas y los deja
    // invisibles para la edge, que filtra por `vigente`.
    vigente: true,
    prioridad: 500,
    actualizado_at: new Date().toISOString(),
  }));

  const cambiadas = filas.filter((f) => {
    const p = previo.get(f.clave_trozo);
    return !p || p.hash_fuente !== f.hash_fuente || !p.vigente;
  });
  const nuevas = cambiadas.filter((f) => !previo.has(f.clave_trozo)).length;

  for (let i = 0; i < cambiadas.length; i += 200) {
    const lote = cambiadas.slice(i, i + 200).map((f) => ({ ...f, embedding: null }));
    await rest("lici_web_conocimiento?on_conflict=clave_trozo", {
      method: "POST",
      headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
      body: JSON.stringify(lote),
    });
  }

  // Lo que ya no se genera se retira. Así una promesa borrada del
  // sitio muere sola en la base en vez de sobrevivir meses.
  const retirar = vivos.filter((v) => v.vigente && !claves.has(v.clave_trozo)).map((v) => v.clave_trozo);
  if (retirar.length) {
    await rest(`lici_web_conocimiento?fuente=eq.repo&clave_trozo=in.(${retirar.map((c) => `"${c}"`).join(",")})`, {
      method: "PATCH",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify({ vigente: false, actualizado_at: new Date().toISOString() }),
    });
  }

  console.log("\n── Sincronización ──────────────────────────");
  console.log(`  creados     ${nuevas}`);
  console.log(`  actualizados ${cambiadas.length - nuevas}`);
  console.log(`  retirados   ${retirar.length}`);
  console.log(`  sin cambio  ${filas.length - cambiadas.length}`);

  /* ── Y se embebe, EN EL MISMO COMANDO ──────────────────────────
     El upsert deja `embedding` en NULL a propósito, para que el trozo
     cambiado se vuelva a vectorizar. Si el embebido fuera un segundo
     paso que hay que acordarse de correr, un trozo nuevo quedaría
     cargado, contado en el informe de arriba… e invisible para la
     búsqueda por coseno. El comando diría «listo» y Lici no
     encontraría el contenido nuevo. Va acá para que no exista esa
     ventana. */
  if (!cambiadas.length && !retirar.length) {
    console.log("\n  Nada cambió: no hay nada que embeber.");
    return;
  }

  console.log("\n── Embeddings ──────────────────────────────");
  const r = await fetch(`${URL_SB}/functions/v1/lici-web-embeber`, {
    method: "POST",
    headers: { Authorization: `Bearer ${LLAVE}`, "Content-Type": "application/json" },
    body: JSON.stringify({}),
  });
  const emb = await r.json().catch(() => null);
  if (!r.ok || !emb?.ok) {
    throw new Error(`el embebedor falló: ${emb?.error ?? await r.text()}`);
  }
  console.log(`  embebidos   ${emb.embebidos}`);
  console.log(`  costo       USD ${emb.costo_usd}`);
  // Un "ok" con pendientes > 0 NO es un éxito.
  if (emb.pendientes > 0) {
    throw new Error(
      `quedaron ${emb.pendientes} trozos sin vector: están cargados pero Lici NO los encuentra. Vuelve a correr el comando.`,
    );
  }
  console.log("\n  ✅ Lici ya sabe lo nuevo.");
}

main().catch((e) => { console.error("✗", e.message); process.exit(1); });
