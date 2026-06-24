import { assetUrl } from "@/lib/assets";

// Cấu hình các thế giới — mỗi nhóm level dùng 1 nền painterly + bộ vật đếm riêng.
export interface World {
  id: string;
  name: string;
  bg: string;
  objects: string[]; // sprite vật đếm theo chủ đề thế giới
}

const SC = (n: string) => assetUrl(`/scenes/${n}.png`);
const SP = (n: string) => assetUrl(`/sprites/${n}.png`);

export const WORLDS: World[] = [
  { id: "garden",      name: "Vườn Cổ Tích",          bg: SC("garden"),      objects: [SP("cat"), SP("rabbit"), SP("apple"), SP("flower")] },
  { id: "ocean",       name: "Đại Dương Xanh",         bg: SC("ocean"),       objects: [SP("fish"), SP("starfish")] },
  { id: "candy",       name: "Xứ Sở Kẹo Ngọt",        bg: SC("candy"),       objects: [SP("candy"), SP("lollipop"), SP("cupcake")] },
  { id: "fairyforest", name: "Rừng Tiên",              bg: SC("fairyforest"), objects: [SP("mushroom"), SP("butterfly"), SP("flower")] },
  { id: "crystalcave", name: "Hang Pha Lê",            bg: SC("crystalcave"), objects: [SP("diamond"), SP("gempink"), SP("gemgreen")] },
  { id: "dinovalley",  name: "Thung Lũng Khủng Long",  bg: SC("dinovalley"),  objects: [SP("dinoegg"), SP("dino")] },
  { id: "robotcity",   name: "Thành Phố Robot",        bg: SC("robotcity"),   objects: [SP("robot"), SP("gear")] },
  { id: "space",       name: "Vũ Trụ Diệu Kỳ",        bg: SC("space"),       objects: [SP("planet"), SP("rocket"), SP("star")] },
  { id: "castle",      name: "Vương Quốc Toán Học",    bg: SC("castle"),      objects: [SP("crown"), SP("shield"), SP("diamond")] },
];

const TOTAL_LEVELS = 30;

// Trải đều toàn bộ thế giới qua các level (mỗi thế giới ~3-4 level liên tiếp).
export function getWorldForLevel(levelNumber: number): World {
  const n = Math.max(1, levelNumber);
  const idx = Math.min(
    WORLDS.length - 1,
    Math.floor(((n - 1) * WORLDS.length) / TOTAL_LEVELS)
  );
  return WORLDS[idx];
}

// Chọn 1 vật đếm theo chủ đề thế giới, ổn định theo seed (id câu hỏi).
export function pickThemedObject(world: World, seed: string): string {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0;
  const idx = Math.abs(h) % world.objects.length;
  return world.objects[idx];
}
