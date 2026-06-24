import { useEffect, useRef } from "react";

export default function CursorBlob() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let targetX = window.innerWidth / 2;
    let targetY = 320;
    let x = targetX;
    let y = targetY;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY + window.scrollY;
    };
    window.addEventListener("mousemove", onMove);

    let raf = 0;
    const tick = () => {
      x += (targetX - x) * 0.08;
      y += (targetY - y) * 0.08;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="hidden lg:block pointer-events-none absolute top-0 left-0 w-[640px] h-[640px] rounded-full bg-amber-400/[0.10] blur-[120px] mix-blend-screen"
      style={{ willChange: "transform" }}
    />
  );
}
