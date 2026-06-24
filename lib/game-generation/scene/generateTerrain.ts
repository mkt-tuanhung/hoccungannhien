import { TerrainConfig } from "@/types/game";
import { mulberry32, randomRange } from "../utils/seedLogic";

export interface TerrainLayer {
  path: string; // SVG path d
  color: string;
  speedMultiplier: number; // For parallax
  zIndex: number;
}

/**
 * Sinh các lớp SVG Terrain (Hills, Ocean waves, Cave ceilings) bằng hàm sóng
 * @param config Cấu hình từ Blueprint
 * @param width Độ rộng sân khấu (thường 1000px base)
 * @param height Độ cao sân khấu (thường 600px base)
 */
export function generateTerrain(config: TerrainConfig, width: number = 1200, height: number = 800): TerrainLayer[] {
  const rng = mulberry32(config.noiseSeed);
  const layers: TerrainLayer[] = [];

  const numLayers = config.parallaxLayers;
  
  for (let i = 0; i < numLayers; i++) {
    const isBackLayer = i === 0;
    const isFrontLayer = i === numLayers - 1;
    
    const color = config.colors[i % config.colors.length];
    const speed = 0.2 + (i * 0.3); // Layer càng gần chạy càng nhanh
    const zIndex = 200 + i; // Dưới 400 (interactive area)

    // Generate Path
    let d = `M 0,${height} L 0,`;
    
    // Y cơ bản của lớp này
    let baseY = height * 0.5 + (i * (height * 0.15));
    if (config.type === 'caves' && isBackLayer) {
      baseY = height * 0.1; // Trần hang
    } else if (config.type === 'ocean') {
      baseY = height * 0.6 + (i * 60);
    } else if (config.type === 'clouds') {
      baseY = height * 0.4 + (i * 80);
    }

    d += `${baseY} `;

    // Tạo các điểm lượn sóng
    const segments = 10;
    const segmentWidth = width / segments;

    for (let s = 1; s <= segments; s++) {
      const x = s * segmentWidth;
      
      let variance = 0;
      if (config.type === 'hills') {
        variance = randomRange(rng, -100, 100);
      } else if (config.type === 'ocean') {
        variance = randomRange(rng, -30, 30);
      } else if (config.type === 'caves') {
        variance = randomRange(rng, -150, 150);
      } else if (config.type === 'clouds') {
        variance = randomRange(rng, -50, 50);
      } else if (config.type === 'city') {
        // Vẽ khối hộp vuông vức thay vì sóng mượt
        variance = randomRange(rng, -200, 50);
        d += `L ${x - segmentWidth/2},${baseY + variance} L ${x},${baseY + variance} `;
        continue;
      } else if (config.type === 'space') {
        // Địa hình mặt trăng lõm lồi mạnh hoặc tiểu hành tinh
        variance = randomRange(rng, -80, 80);
      } else if (config.type === 'underwater') {
        // Đáy biển dốc và uốn lượn như san hô
        variance = randomRange(rng, -120, 100);
      } else if (config.type === 'forest') {
        // Địa hình rừng cây với gò đất nhấp nhô
        variance = randomRange(rng, -90, 90);
      } else {
        variance = 0; // flat
      }

      const pointY = baseY + variance;
      // Dùng Bezier Curve (Q hoặc C) để tạo sóng mượt
      const cx = x - segmentWidth / 2;
      const cy = pointY - (variance * 0.5); // control point
      
      d += `Q ${cx},${cy} ${x},${pointY} `;
    }

    d += `L ${width},${height} Z`;

    // Đối với Hang động, lớp cuối cùng có thể vẽ thêm trần nhà
    if (config.type === 'caves' && isBackLayer) {
      d += ` M 0,0 L 0,${baseY} Q ${width/2},${baseY + randomRange(rng, -100, 100)} ${width},${baseY} L ${width},0 Z`;
    }

    layers.push({
      path: d,
      color,
      speedMultiplier: speed,
      zIndex
    });
  }

  return layers;
}
