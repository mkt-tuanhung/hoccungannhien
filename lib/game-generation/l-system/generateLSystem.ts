import { mulberry32, randomRange } from "../utils/seedLogic";

export interface LSystemBranch {
  x: number;
  y: number;
  length: number;
  angle: number;
  thickness: number;
  color: string;
}

export interface LSystemResult {
  branches: LSystemBranch[];
  leaves: { x: number; y: number; size: number; color: string }[];
}

/**
 * Sinh cây/cỏ/san hô dựa trên thuật toán L-System
 * @param seed Seed ngẫu nhiên (từ Mulberry32)
 * @param type Loại cấu trúc (tree, coral, crystal)
 * @param startX Tọa độ gốc X
 * @param startY Tọa độ gốc Y
 */
export function generateLSystem(seed: number, type: 'tree' | 'coral' | 'crystal' | 'kelp', startX: number, startY: number): LSystemResult {
  const rng = mulberry32(seed);
  const branches: LSystemBranch[] = [];
  const leaves: { x: number; y: number; size: number; color: string }[] = [];

  // Rules setup
  let depth = 0;
  let angleJitter = 0;
  let colors: string[] = [];
  let baseLength = 0;

  if (type === 'tree') {
    depth = randomRange(rng, 5, 7);
    angleJitter = 25;
    colors = ['#4ade80', '#22c55e', '#16a34a']; // Xanh lá
    baseLength = randomRange(rng, 40, 60);
  } else if (type === 'coral') {
    depth = randomRange(rng, 4, 6);
    angleJitter = 35;
    colors = ['#f472b6', '#f43f5e', '#ec4899']; // Hồng san hô
    baseLength = randomRange(rng, 30, 50);
  } else if (type === 'crystal') {
    depth = randomRange(rng, 2, 4);
    angleJitter = 15;
    colors = ['#38bdf8', '#818cf8', '#c084fc']; // Tím/Xanh pha lê
    baseLength = randomRange(rng, 50, 80);
  } else {
    // Kelp (Rong biển)
    depth = randomRange(rng, 6, 9);
    angleJitter = 10;
    colors = ['#15803d', '#166534', '#14532d'];
    baseLength = randomRange(rng, 20, 35);
  }

  // Đệ quy L-System
  function branch(x: number, y: number, len: number, angle: number, currentDepth: number) {
    // Cắt góc chuyển radian
    const radian = angle * Math.PI / 180;
    const endX = x + len * Math.cos(radian);
    const endY = y + len * Math.sin(radian);

    branches.push({
      x, y,
      length: len,
      angle: radian,
      thickness: Math.max(1, currentDepth * 1.5),
      color: type === 'tree' ? '#78350f' : colors[0] // Thân cây màu nâu, còn lại lấy màu base
    });

    if (currentDepth === 0) {
      // Vẽ lá / bông ở ngọn
      if (type === 'tree' || type === 'coral') {
        leaves.push({
          x: endX,
          y: endY,
          size: randomRange(rng, 10, 20),
          color: colors[randomRange(rng, 0, colors.length - 1)]
        });
      }
      return;
    }

    // Tách nhánh
    const numBranches = type === 'crystal' ? randomRange(rng, 1, 3) : randomRange(rng, 2, 3);
    for (let i = 0; i < numBranches; i++) {
      // Góc rẽ ngẫu nhiên dựa trên jitter
      const newAngle = angle + (rng() * angleJitter * 2 - angleJitter);
      const newLength = len * (rng() * 0.3 + 0.6); // Ngắn đi 10-40%
      branch(endX, endY, newLength, newAngle, currentDepth - 1);
    }
  }

  // Gọi gốc cây chĩa lên (-90 độ)
  branch(startX, startY, baseLength, -90, depth);

  return { branches, leaves };
}
