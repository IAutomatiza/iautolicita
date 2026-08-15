import { useEffect, useRef } from "react";

/* ════════════════════════════════════════════════════════════
   Lluvia ASCII — clon del fondo de las secciones oscuras de
   contentarchitecture.dev: una trama de caracteres mono tenues
   que cubre la sección, hecha de vocabulario de licitaciones,
   con celdas que mutan de a poco. Estática con movimiento
   reducido y pausada fuera de pantalla.
═══════════════════════════════════════════════════════════════ */

const FRASES =
  "LICITACIÓN · SCORE 87/100 · $139,9M · ÍTEM POR ÍTEM · BASES LEÍDAS · PÁGINA 47 · GARANTÍA 5% · CIERRA EN 2 DÍAS · 6,4M OC · MEDIANA · ADJUDICADA · ADMISIBLE · MERCADO PÚBLICO · RADAR · ALERTA DÍA 1 · ";

export default function AsciiRain({ opacidad = 0.1 }: { opacidad?: number }) {
  const contRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cont = contRef.current;
    const canvas = canvasRef.current;
    if (!cont || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const quieto = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const CW = 9;
    const CH = 16;

    let cols = 0;
    let filas = 0;
    let raf = 0;
    let intervalo = 0;

    const pintarCelda = (c: number, f: number) => {
      const ch = FRASES[Math.floor(Math.random() * FRASES.length)];
      // brillo desigual: la mayoría muy tenue, algunas un poco más vivas
      const a = Math.random() < 0.06 ? opacidad * 2.2 : opacidad * (0.4 + Math.random() * 0.9);
      ctx.clearRect(c * CW, f * CH, CW, CH);
      ctx.fillStyle = `rgba(255,255,255,${a})`;
      ctx.fillText(ch, c * CW + CW / 2, f * CH + CH / 2);
    };

    const construir = () => {
      const rect = cont.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = '11px "Geist Mono", ui-monospace, monospace';
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      cols = Math.ceil(rect.width / CW);
      filas = Math.ceil(rect.height / CH);
      for (let f = 0; f < filas; f++) for (let c = 0; c < cols; c++) pintarCelda(c, f);
    };

    const mutar = () => {
      const n = Math.max(12, Math.floor((cols * filas) / 90));
      for (let i = 0; i < n; i++) {
        pintarCelda(Math.floor(Math.random() * cols), Math.floor(Math.random() * filas));
      }
    };

    construir();

    const io = new IntersectionObserver(
      ([e]) => {
        window.clearInterval(intervalo);
        if (e.isIntersecting && !quieto) {
          intervalo = window.setInterval(mutar, 120);
        }
      },
      { threshold: 0.02 }
    );
    io.observe(cont);

    const ro = new ResizeObserver(construir);
    ro.observe(cont);

    return () => {
      window.clearInterval(intervalo);
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, [opacidad]);

  return (
    <div ref={contRef} className="absolute inset-0 pointer-events-none" aria-hidden>
      <canvas ref={canvasRef} className="block" />
    </div>
  );
}
