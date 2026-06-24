import { useEffect, useRef, useState } from "react";

interface Props {
  text: string;
  speed?: number; // ms per char
  startDelay?: number; // ms before typing begins
  className?: string;
  cursorClassName?: string;
  /** Render whitespace placeholder while typing so layout doesn't jump */
  reserveSpace?: boolean;
}

/**
 * Types `text` once on mount with a blinking caret.
 * Uses requestAnimationFrame for smooth scheduling and triggers
 * after a configurable startDelay so the page can settle first.
 *
 * Slight per-char jitter (±15ms) makes it feel hand-typed rather
 * than machine-perfect. Respects prefers-reduced-motion.
 */
export default function TypewriterOnce({
  text,
  speed = 55,
  startDelay = 350,
  className = "",
  cursorClassName = "",
  reserveSpace = true,
}: Props) {
  const [shown, setShown] = useState("");
  const [done, setDone] = useState(false);
  const timer = useRef<number | undefined>();

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShown(text);
      setDone(true);
      return;
    }

    let i = 0;
    const start = () => {
      const step = () => {
        i += 1;
        setShown(text.slice(0, i));
        if (i >= text.length) {
          setDone(true);
          return;
        }
        const jitter = (Math.random() - 0.5) * 30;
        timer.current = window.setTimeout(step, speed + jitter);
      };
      step();
    };
    timer.current = window.setTimeout(start, startDelay);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [text, speed, startDelay]);

  return (
    <span className={`relative inline ${className}`}>
      {reserveSpace && (
        <span aria-hidden className="invisible whitespace-pre-wrap">
          {text}
        </span>
      )}
      <span
        aria-label={text}
        className={reserveSpace ? "absolute inset-0" : ""}
      >
        {shown}
        <span
          aria-hidden
          className={`inline-block w-[0.06em] h-[0.82em] align-[-0.05em] ml-[0.04em] bg-current ${
            done ? "animate-blink" : ""
          } ${cursorClassName}`}
        />
      </span>
    </span>
  );
}
