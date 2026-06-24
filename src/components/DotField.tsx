import { useEffect, useRef } from "react";

export default function DotField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    // Video layer
    const video = document.createElement("video");
    video.src = "/hero-bg.mp4";
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.crossOrigin = "anonymous";
    video.style.display = "none";
    document.body.appendChild(video);

    // Composite offscreen — video + tech shapes combined
    const off = document.createElement("canvas");
    const oc = off.getContext("2d")!;

    let w = 0;
    let h = 0;
    const CELL = 6;
    let ready = false;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      off.width = Math.ceil(w);
      off.height = Math.ceil(h);
    };

    resize();
    window.addEventListener("resize", resize);

    // ── Tech shapes config ──
    const TAU = Math.PI * 2;

    function drawTechLayer(oc: CanvasRenderingContext2D, w: number, h: number, T: number) {
      const cx = w * 0.5;
      const cy = h * 0.5;

      oc.lineCap = "round";
      oc.lineJoin = "round";

      // ── Rotating ring systems (like radar/scanner) ──
      for (let i = 0; i < 3; i++) {
        const radius = h * (0.18 + i * 0.12);
        const angle = T * (0.12 + i * 0.06) * (i % 2 === 0 ? 1 : -1);
        const arcLen = 1.2 + Math.sin(T * 0.3 + i) * 0.6;
        const ox = cx + Math.sin(T * 0.08 + i * 2) * w * 0.04;
        const oy = cy + Math.cos(T * 0.06 + i * 1.5) * h * 0.03;

        // Main arc
        oc.beginPath();
        oc.arc(ox, oy, radius, angle, angle + arcLen);
        oc.strokeStyle = `rgba(255,255,255,${0.5 - i * 0.12})`;
        oc.lineWidth = 2;
        oc.stroke();

        // Tick marks along the arc
        for (let t = 0; t < 8; t++) {
          const tickAngle = angle + (arcLen * t) / 8;
          const inner = radius - 4;
          const outer = radius + 4;
          oc.beginPath();
          oc.moveTo(ox + Math.cos(tickAngle) * inner, oy + Math.sin(tickAngle) * inner);
          oc.lineTo(ox + Math.cos(tickAngle) * outer, oy + Math.sin(tickAngle) * outer);
          oc.strokeStyle = `rgba(255,255,255,${0.3})`;
          oc.lineWidth = 1;
          oc.stroke();
        }

        // Secondary thinner arc opposite side
        oc.beginPath();
        oc.arc(ox, oy, radius, angle + Math.PI, angle + Math.PI + arcLen * 0.6);
        oc.strokeStyle = `rgba(255,255,255,${0.2})`;
        oc.lineWidth = 1;
        oc.stroke();
      }

      // ── Data flow lines — curved paths with moving bright endpoints ──
      for (let i = 0; i < 6; i++) {
        const startAngle = T * 0.15 + i * 1.05;
        const r1 = h * (0.08 + i * 0.04);
        const r2 = h * (0.2 + i * 0.06);
        const x1 = cx + Math.cos(startAngle) * r1;
        const y1 = cy + Math.sin(startAngle) * r1 * 0.7;
        const x2 = cx + Math.cos(startAngle + 0.8 + i * 0.3) * r2;
        const y2 = cy + Math.sin(startAngle + 0.8 + i * 0.3) * r2 * 0.7;
        const cpx = (x1 + x2) * 0.5 + Math.sin(T * 0.2 + i) * 40;
        const cpy = (y1 + y2) * 0.5 + Math.cos(T * 0.15 + i) * 30;

        oc.beginPath();
        oc.moveTo(x1, y1);
        oc.quadraticCurveTo(cpx, cpy, x2, y2);
        oc.strokeStyle = `rgba(255,255,255,${0.25 + Math.sin(T * 0.5 + i) * 0.1})`;
        oc.lineWidth = 1.2;
        oc.stroke();

        // Bright endpoint node
        oc.beginPath();
        oc.arc(x2, y2, 3 + Math.sin(T * 2 + i) * 1, 0, TAU);
        oc.fillStyle = `rgba(255,255,255,${0.7})`;
        oc.fill();
      }

      // ── Corner bracket frames (HUD/scanner feel) ──
      const brackets = [
        { x: cx - w * 0.22, y: cy - h * 0.18, rot: 0 },
        { x: cx + w * 0.22, y: cy - h * 0.18, rot: Math.PI * 0.5 },
        { x: cx + w * 0.22, y: cy + h * 0.18, rot: Math.PI },
        { x: cx - w * 0.22, y: cy + h * 0.18, rot: Math.PI * 1.5 },
      ];

      for (let i = 0; i < brackets.length; i++) {
        const b = brackets[i];
        const bx = b.x + Math.sin(T * 0.1 + i) * 8;
        const by = b.y + Math.cos(T * 0.08 + i * 0.7) * 6;
        const sz = 25 + Math.sin(T * 0.3 + i) * 3;

        oc.save();
        oc.translate(bx, by);
        oc.rotate(b.rot);
        oc.beginPath();
        oc.moveTo(0, sz);
        oc.lineTo(0, 0);
        oc.lineTo(sz, 0);
        oc.strokeStyle = `rgba(255,255,255,0.4)`;
        oc.lineWidth = 1.5;
        oc.stroke();
        oc.restore();
      }

      // ── Scattered data nodes (small bright dots orbiting) ──
      for (let i = 0; i < 30; i++) {
        const orbitAngle = T * (0.05 + i * 0.008) + i * 0.21;
        const orbitR = h * (0.06 + (i / 30) * 0.38);
        const wobble = Math.sin(T * 0.3 + i * 0.5) * 0.15;
        const x = cx + Math.cos(orbitAngle + wobble) * orbitR * (1 + Math.sin(i * 1.3) * 0.25);
        const y = cy + Math.sin(orbitAngle + wobble) * orbitR * 0.65;
        const brightness = 0.3 + Math.sin(T * 1.5 + i * 0.8) * 0.25;
        const r = 1.2 + Math.sin(T * 2 + i) * 0.5;

        oc.beginPath();
        oc.arc(x, y, r, 0, TAU);
        oc.fillStyle = `rgba(255,255,255,${brightness})`;
        oc.fill();
      }

      // ── Concentric dashed circles (sonar/pulse effect) ──
      for (let i = 0; i < 2; i++) {
        const pulseR = h * (0.12 + i * 0.2) + Math.sin(T * 0.4 + i) * 10;
        oc.beginPath();
        oc.arc(cx, cy, pulseR, 0, TAU);
        oc.setLineDash([3, 8]);
        oc.strokeStyle = `rgba(255,255,255,${0.08 + i * 0.03})`;
        oc.lineWidth = 0.8;
        oc.stroke();
        oc.setLineDash([]);
      }

      // ── Horizontal scan lines (very subtle) ──
      for (let i = 0; i < 3; i++) {
        const lineY = cy + (i - 1) * h * 0.12 + Math.sin(T * 0.25 + i) * 15;
        const lineW = w * (0.25 + Math.sin(T * 0.2 + i * 2) * 0.08);
        const lineX = cx - lineW * 0.5;

        const grad = oc.createLinearGradient(lineX, 0, lineX + lineW, 0);
        grad.addColorStop(0, "rgba(255,255,255,0)");
        grad.addColorStop(0.3, `rgba(255,255,255,${0.15})`);
        grad.addColorStop(0.7, `rgba(255,255,255,${0.15})`);
        grad.addColorStop(1, "rgba(255,255,255,0)");

        oc.beginPath();
        oc.moveTo(lineX, lineY);
        oc.lineTo(lineX + lineW, lineY);
        oc.strokeStyle = grad;
        oc.lineWidth = 0.8;
        oc.stroke();
      }
    }

    const draw = () => {
      const T = performance.now() * 0.001;
      const ow = off.width;
      const oh = off.height;

      // ── Layer 1: Video base (organic flow) ──
      oc.fillStyle = "#000";
      oc.fillRect(0, 0, ow, oh);

      if (ready && !video.paused && video.readyState >= 2) {
        oc.globalAlpha = 0.7;
        oc.drawImage(video, 0, 0, ow, oh);
        oc.globalAlpha = 1;
      }

      // ── Layer 2: Tech shapes on top (high contrast) ──
      oc.globalCompositeOperation = "lighter";
      drawTechLayer(oc, ow, oh, T);
      oc.globalCompositeOperation = "source-over";

      // ── Read composited pixels ──
      const imgData = oc.getImageData(0, 0, ow, oh);
      const px = imgData.data;

      // ── Render dot matrix ──
      ctx.clearRect(0, 0, w, h);

      const cols = Math.ceil(w / CELL);
      const rows = Math.ceil(h / CELL);
      const half = CELL * 0.5;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const sx = Math.min(Math.round(col * CELL + half), ow - 1);
          const sy = Math.min(Math.round(row * CELL + half), oh - 1);
          const idx = (sy * ow + sx) * 4;

          const r = px[idx];
          const g = px[idx + 1];
          const b = px[idx + 2];

          let lum = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
          lum = (lum - 0.03) * 3.0;
          lum = Math.max(0, Math.min(1, lum));
          lum = Math.pow(lum, 0.7);

          const baseDim = 0.04;
          const finalLum = Math.max(baseDim, lum);

          const dotR = finalLum < 0.08 ? 0.5 : 0.3 + finalLum * 2.8;

          const cr = Math.round(120 + finalLum * 104);
          const cg = Math.round(170 + finalLum * 76);
          const cb = Math.round(210 + finalLum * 45);

          ctx.globalAlpha = finalLum < 0.08 ? 0.06 : 0.1 + finalLum * 0.9;
          ctx.fillStyle = `rgb(${cr},${cg},${cb})`;
          ctx.beginPath();
          ctx.arc(col * CELL + half, row * CELL + half, dotR, 0, 6.2832);
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
      animRef.current = requestAnimationFrame(draw);
    };

    video.addEventListener("canplaythrough", () => {
      ready = true;
      video.play().catch(() => {});
    });
    video.addEventListener("playing", () => { ready = true; });
    video.load();
    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      video.pause();
      video.remove();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none ${className}`}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
