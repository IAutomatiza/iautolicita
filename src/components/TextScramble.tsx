import { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*<>{}[]";

interface Props {
  phrases: string[];
  interval?: number;
  className?: string;
}

export default function TextScramble({ phrases, interval = 4000, className = "" }: Props) {
  const [display, setDisplay] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const frameRef = useRef<number>(0);
  const queueRef = useRef<{ from: string; to: string; start: number; end: number; char?: string }[]>([]);
  const frameCountRef = useRef(0);

  useEffect(() => {
    const target = phrases[phraseIdx];
    const oldText = display || "";
    const length = Math.max(oldText.length, target.length);
    const queue: typeof queueRef.current = [];

    for (let i = 0; i < length; i++) {
      const from = oldText[i] || "";
      const to = target[i] || "";
      const start = Math.floor(Math.random() * 25);
      const end = start + Math.floor(Math.random() * 25) + 15;
      queue.push({ from, to, start, end });
    }

    queueRef.current = queue;
    frameCountRef.current = 0;

    const update = () => {
      let output = "";
      let complete = 0;
      const frame = frameCountRef.current;

      for (let i = 0; i < queue.length; i++) {
        const { from, to, start, end } = queue[i];
        if (frame >= end) {
          complete++;
          output += to;
        } else if (frame >= start) {
          if (!queue[i].char || Math.random() < 0.28) {
            queue[i].char = CHARS[Math.floor(Math.random() * CHARS.length)];
          }
          output += queue[i].char;
        } else {
          output += from;
        }
      }

      setDisplay(output);
      frameCountRef.current++;

      if (complete < queue.length) {
        frameRef.current = requestAnimationFrame(update);
      } else {
        setTimeout(() => {
          setPhraseIdx((i) => (i + 1) % phrases.length);
        }, interval);
      }
    };

    frameRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameRef.current);
  }, [phraseIdx, phrases, interval]);

  return (
    <span className={className}>
      {display.split("").map((char, i) => {
        const target = phrases[phraseIdx];
        const isResolved = i < target.length && char === target[i];
        return (
          <span
            key={i}
            className={isResolved ? "text-white" : "text-[#55b4f8]"}
            style={{
              display: "inline-block",
              minWidth: char === " " ? "0.3em" : undefined,
              transition: "color 0.1s",
            }}
          >
            {char}
          </span>
        );
      })}
    </span>
  );
}
