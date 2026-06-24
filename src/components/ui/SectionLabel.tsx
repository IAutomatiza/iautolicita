interface Props {
  index: string; // "01" "02" etc
  label: string;
  align?: "left" | "right";
}

export default function SectionLabel({ index, label, align = "left" }: Props) {
  return (
    <div
      className={`flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-cream-300 ${
        align === "right" ? "justify-end" : ""
      }`}
    >
      <span className="text-amber-400">[{index}]</span>
      <span className="h-px w-8 bg-cream-300/30" />
      <span>{label}</span>
    </div>
  );
}
