"use client";

import CountItem from "./CountItem";

interface ObjectStageProps {
  count: number;
  icon: string;
  size?: number;
  crossedFrom?: number; // gạch chéo các vật từ index này trở đi (cho phép trừ)
}

// Nhóm vật cần đếm — lưới cân đối, từng vật nổi khối.
export default function ObjectStage({ count, icon, size = 80, crossedFrom = -1 }: ObjectStageProps) {
  if (count <= 0 || count > 20) return null;
  const perRow = count <= 4 ? count : count <= 8 ? Math.ceil(count / 2) : Math.ceil(count / 3);

  return (
    <div className="mx-auto w-fit max-w-full" style={{ maxWidth: perRow * (size + 14) + 20 }}>
      <div className="flex flex-wrap justify-center gap-x-3.5 gap-y-3">
        {Array.from({ length: count }).map((_, i) => (
          <CountItem
            key={i}
            icon={icon}
            size={size}
            delay={i * 0.08}
            crossed={crossedFrom >= 0 && i >= crossedFrom}
          />
        ))}
      </div>
    </div>
  );
}
