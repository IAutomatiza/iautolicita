import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

/**
 * MacBook-style device frame. Wraps screen content with bezel, notch, hinge
 * and a soft floor glow — the "product running on a real machine" feel used
 * by Apple, Linear and Mercury landing heroes.
 */
export default function LaptopFrame({ children }: Props) {
  return (
    <div className="relative">
      {/* Lid / display */}
      <div
        className="relative mx-auto rounded-[18px] md:rounded-[22px] p-[8px] md:p-[12px] bg-gradient-to-b from-[#36363a] via-[#1a1a1c] to-[#0a0a0c]"
        style={{
          boxShadow:
            "0 60px 160px -40px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.05) inset, 0 1px 0 rgba(255,255,255,0.08) inset",
        }}
      >
        {/* Top edge specular highlight */}
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[72%] h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

        {/* Notch (MacBook Pro M-series) */}
        <div className="pointer-events-none absolute top-[8px] md:top-[12px] left-1/2 -translate-x-1/2 z-20 h-[14px] md:h-[18px] w-[92px] md:w-[112px] rounded-b-[10px] bg-[#0a0a0c] flex items-center justify-center">
          <span className="h-[5px] w-[5px] rounded-full bg-[#141416] ring-[0.5px] ring-white/10" />
        </div>

        {/* Screen content */}
        <div className="relative overflow-hidden rounded-[10px] md:rounded-[12px] bg-ink-950">
          {children}
          {/* Subtle screen glare */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent" />
        </div>
      </div>

      {/* Hinge */}
      <div
        className="relative mx-auto h-[6px] w-[101%] -mt-px bg-gradient-to-b from-[#3a3a3d] via-[#1c1c1e] to-[#0a0a0c]"
        style={{ boxShadow: "0 1px 0 rgba(255,255,255,0.04) inset" }}
      />

      {/* Base / palmrest hint */}
      <div
        className="relative mx-auto h-[16px] md:h-[20px] w-[103.5%] -mt-px rounded-b-[16px] md:rounded-b-[20px] bg-gradient-to-b from-[#202023] via-[#141416] to-[#0a0a0c]"
        style={{
          boxShadow:
            "0 8px 20px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.03) inset",
        }}
      >
        {/* Trackpad / speaker grille suggestion */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[5px] md:top-[7px] h-[3px] w-[22%] rounded-full bg-black/55" />
      </div>

      {/* Floor reflection / ambient occlusion */}
      <div
        className="pointer-events-none mx-auto -mt-[90px] h-[140px] w-[92%]"
        style={{
          background:
            "radial-gradient(ellipse at center top, rgba(0,0,0,0.55) 0%, transparent 70%)",
          filter: "blur(14px)",
          opacity: 0.45,
        }}
      />
    </div>
  );
}
