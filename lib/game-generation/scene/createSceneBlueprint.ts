import { SceneBlueprint, GameType, TerrainConfig, DecorationConfig, ParticleConfig } from "@/types/game";
import { hashString, mulberry32, randomElement, randomRange } from "../utils/seedLogic";

/**
 * Thuật toán AI mô phỏng (Pseudo-AI) sinh Scene Blueprint dựa trên Seed.
 * Đảm bảo: Cùng 1 level + cùng 1 game mode -> luôn ra 1 scene y hệt nhau.
 */
export function createSceneBlueprint(levelId: string, gameMode: GameType, customSeed?: number): SceneBlueprint {
  // Băm chuỗi định danh thành Seed
  const baseSeed = customSeed !== undefined ? customSeed : hashString(`${levelId}-${gameMode}`);
  const rng = mulberry32(baseSeed);

  // Mặc định
  let bgGradient: [string, string] = ["#e0f2fe", "#bae6fd"];
  let terrain: TerrainConfig = { type: 'hills', colors: ["#86efac", "#4ade80"], parallaxLayers: 3, noiseSeed: baseSeed };
  let decorations: DecorationConfig[] = [];
  let particles: ParticleConfig | undefined = undefined;
  let mood: 'energetic' | 'calm' | 'mysterious' | 'playful' = 'playful';

  // 1. Dựa vào Tên Game Mode để quyết định Theme chính
  if (gameMode.includes('ocean') || gameMode.includes('undersea') || gameMode.includes('archipelago')) {
    bgGradient = ["#0284c7", "#0369a1"];
    terrain = { type: 'ocean', colors: ["#0ea5e9", "#38bdf8", "#7dd3fc"], parallaxLayers: 4, noiseSeed: rng() * 1000 };
    decorations.push({ type: 'coral', density: 15, scale: 1.2, seed: rng() * 1000 });
    particles = { type: 'bubbles', count: 30, speed: 1.5 };
    mood = 'calm';
  } 
  else if (gameMode.includes('crystal') || gameMode.includes('cave')) {
    bgGradient = ["#312e81", "#1e1b4b"];
    terrain = { type: 'caves', colors: ["#4338ca", "#3730a3"], parallaxLayers: 3, noiseSeed: rng() * 1000 };
    decorations.push({ type: 'crystals', density: 10, scale: 1.5, seed: rng() * 1000 });
    particles = { type: 'sparkles', count: 20, speed: 0.8 };
    mood = 'mysterious';
  }
  else if (gameMode.includes('cloud') || gameMode.includes('weather') || gameMode.includes('space')) {
    bgGradient = ["#1e3a8a", "#1e40af"];
    terrain = { type: 'clouds', colors: ["#bfdbfe", "#dbeafe"], parallaxLayers: 5, noiseSeed: rng() * 1000 };
    decorations.push({ type: 'floating_islands', density: 5, scale: 2.0, seed: rng() * 1000 });
    particles = { type: 'snow', count: 50, speed: 2 };
    mood = 'mysterious';
  }
  else if (gameMode.includes('candy') || gameMode.includes('festival')) {
    bgGradient = ["#fce7f3", "#fbcfe8"];
    terrain = { type: 'hills', colors: ["#f9a8d4", "#f472b6"], parallaxLayers: 3, noiseSeed: rng() * 1000 };
    decorations.push({ type: 'l_system_tree', density: 8, scale: 1.0, seed: rng() * 1000 });
    particles = { type: 'confetti', count: 40, speed: 2.5 };
    mood = 'energetic';
  }
  else if (gameMode.includes('city') || gameMode.includes('robot') || gameMode.includes('factory')) {
    bgGradient = ["#f8fafc", "#e2e8f0"];
    terrain = { type: 'city', colors: ["#94a3b8", "#64748b"], parallaxLayers: 4, noiseSeed: rng() * 1000 };
    particles = { type: 'fireflies', count: 15, speed: 1 };
    mood = 'energetic';
  }
  else {
    // Mặc định: Rừng/Thảo nguyên/Nông trại
    bgGradient = ["#f0fdf4", "#dcfce7"];
    terrain = { type: 'hills', colors: ["#bbf7d0", "#86efac", "#4ade80"], parallaxLayers: 3, noiseSeed: rng() * 1000 };
    decorations.push({ type: 'l_system_tree', density: 12, scale: 1.1, seed: rng() * 1000 });
    decorations.push({ type: 'scatter_rocks', density: 20, scale: 0.8, seed: rng() * 1000 });
    particles = { type: 'fireflies', count: 25, speed: 0.5 };
    mood = 'playful';
  }

  // Nếu là Boss Battle thì auto đổi mood kịch tính
  if (gameMode.includes('boss')) {
    bgGradient = ["#7f1d1d", "#991b1b"];
    terrain.colors = ["#b91c1c", "#ef4444"];
    particles = { type: 'sparkles', count: 50, speed: 3 };
    mood = 'energetic';
  }

  return {
    id: `scene-${baseSeed}`,
    seed: baseSeed,
    backgroundGradient: bgGradient,
    terrain,
    decorations,
    particles,
    mood
  };
}
