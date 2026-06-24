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
const IC = (n: string) => assetUrl(`/icons/${n}_icon.png`);

export const WORLDS: World[] = [
  { id: "garden",      name: "Vườn Cổ Tích",          bg: SC("garden"),      objects: [IC("cat"), IC("bunny"), IC("apple"), IC("star")] },
  { id: "ocean",       name: "Đại Dương Xanh",         bg: SC("ocean"),       objects: [IC("bubble"), SP("starfish"), SP("fish")] },
  { id: "candy",       name: "Xứ Sở Kẹo Ngọt",        bg: SC("candy"),       objects: [IC("candy"), IC("ball"), IC("star")] },
  { id: "fairyforest", name: "Rừng Tiên",              bg: SC("fairyforest"), objects: [IC("star"), IC("bunny"), SP("mushroom")] },
  { id: "crystalcave", name: "Hang Pha Lê",            bg: SC("crystalcave"), objects: [IC("diamond"), IC("coin"), IC("chest")] },
  { id: "dinovalley",  name: "Thung Lũng Khủng Long",  bg: SC("dinovalley"),  objects: [SP("dinoegg"), SP("dino")] },
  { id: "robotcity",   name: "Thành Phố Robot",        bg: SC("robotcity"),   objects: [SP("robot"), SP("gear")] },
  { id: "space",       name: "Vũ Trụ Diệu Kỳ",        bg: SC("space"),       objects: [IC("star"), SP("planet"), SP("rocket")] },
  { id: "castle",      name: "Vương Quốc Toán Học",    bg: SC("castle"),      objects: [IC("coin"), IC("diamond"), IC("chest")] },
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
