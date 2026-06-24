"use client";

import ObjectStage from "./ObjectStage";

export type RenderMode = "single" | "compare" | "addition" | "subtraction" | undefined;

interface MathVisualProps {
  renderMode: RenderMode;
  count: number;
  count2?: number;
  icon: string;
  icon2?: string;
  compact?: boolean;
}

const Sign = ({ children }: { children: string }) => (
  <div className="flex items-center justify-center font-black text-[#8a5cc7] px-1" style={{ fontSize: 44, fontFamily: "'Mochiy Pop One', system-ui" }}>
    {children}
  </div>
);

// Hiển thị trực quan đúng theo dạng toán: đếm / cộng / trừ / so sánh.
export default function MathVisual({ renderMode, count, count2 = 0, icon, icon2, compact }: MathVisualProps) {
  const two = icon2 || icon;
  const k = compact ? 0.72 : 1;

  if (renderMode === "addition") {
    const sz = (count + count2 > 8 ? 56 : 70) * k;
    return (
      <div className="flex items-center justify-center gap-1 flex-wrap">
        <ObjectStage count={count} icon={icon} size={sz} />
        <Sign>+</Sign>
        <ObjectStage count={count2} icon={two} size={sz} />
      </div>
    );
  }

  if (renderMode === "subtraction") {
    const sz = (count > 8 ? 56 : 70) * k;
    return <ObjectStage count={count} icon={icon} size={sz} crossedFrom={count - count2} />;
  }

  if (renderMode === "compare") {
    const sz = (Math.max(count, count2) > 8 ? 52 : 66) * k;
    return (
      <div className="flex items-center justify-center gap-2 flex-wrap">
        <div className="rounded-3xl p-2" style={{ background: "rgba(124,201,240,0.25)" }}>
          <ObjectStage count={count} icon={icon} size={sz} />
        </div>
        <Sign>?</Sign>
        <div className="rounded-3xl p-2" style={{ background: "rgba(255,156,194,0.25)" }}>
          <ObjectStage count={count2} icon={two} size={sz} />
        </div>
      </div>
    );
  }

  // single
  return <ObjectStage count={count} icon={icon} size={80 * k} />;
}
