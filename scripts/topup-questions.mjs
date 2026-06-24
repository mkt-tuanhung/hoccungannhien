// Bù câu hỏi cho mỗi level đủ 50 → tổng 1500. Câu sinh thêm hợp lệ (đáp án + options chuẩn).
import fs from "fs";
import path from "path";

const dir = path.join(process.cwd(), "public", "data", "math", "questions");
const TYPES = [
  "gen_number_maze", "gen_infinite_island_archipelago", "gen_train_route_builder", "gen_treasure_map_undersea",
  "gen_cloud_city_numbers", "math_adventure_map", "gen_ocean_reef_math", "gen_festival_parade_math",
  "gen_weather_wizard_math", "rhythm_math_dance", "gen_living_math_garden", "gen_toy_factory_automata",
  "gen_dragon_farm_math", "gen_mini_zoo_ecosystem", "gen_candy_biome_world", "magic_shop_math",
  "math_cooking_lab", "pet_evolution_math", "std_drag_worksheet", "std_matching_cards",
  "detective_math_mystery", "puzzle_room_math", "gen_storybook_popup_world", "gen_crystal_cave_explorer",
  "gen_dinosaur_valley_math", "gen_fairy_forest_quest", "gen_dream_room_builder", "gen_time_portal_math",
  "gen_robot_city_constructor", "math_kingdom_builder", "space_rescue_math", "ai_coop_boss_battle",
  "std_flashcard_sprint", "std_quiz_ladder", "std_mini_exam", "std_audio_math",
  "std_error_clinic", "std_parent_assignment", "std_sticker_board", "std_number_trace",
];

function makeOptions(ans) {
  const opts = new Set([ans]);
  let g = 0;
  while (opts.size < 4 && g++ < 80) {
    const d = Math.floor(Math.random() * 4) + 1;
    let w = Math.random() < 0.5 ? ans + d : ans - d;
    if (w < 0) w = ans + d + 1;
    opts.add(w);
  }
  return [...opts].slice(0, 4).sort(() => Math.random() - 0.5);
}
const r = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = (a) => a[Math.floor(Math.random() * a.length)];

const ALL_TYPES = TYPES.length ? TYPES : ["gen_living_math_garden"];

function genQuestion(id) {
  const mode = pick(["single", "single", "addition", "subtraction"]);
  const type = pick(ALL_TYPES);
  if (mode === "addition") {
    const a = r(1, 10), b = r(1, 9);
    return { id, type, prompt: `${a} + ${b} = ?`, correctAnswer: a + b, options: makeOptions(a + b), objectIcon: "", objectIcon2: "", targetCount: a, targetCount2: b, renderMode: "addition" };
  }
  if (mode === "subtraction") {
    const a = r(3, 12), b = r(1, a - 1);
    return { id, type, prompt: `${a} - ${b} = ?`, correctAnswer: a - b, options: makeOptions(a - b), objectIcon: "", targetCount: a, targetCount2: b, renderMode: "subtraction" };
  }
  const a = r(1, 10);
  return { id, type, prompt: "Đếm xem có bao nhiêu và chọn số đúng nhé!", correctAnswer: a, options: makeOptions(a), objectIcon: "", targetCount: a, renderMode: "single" };
}

let total = 0;
for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".json"))) {
  const fp = path.join(dir, file);
  const data = JSON.parse(fs.readFileSync(fp, "utf8"));
  const lvl = file.replace(/[^0-9]/g, "");
  let n = 0;
  while (data.length < 50) {
    data.push(genQuestion(`l${lvl}-extra-${++n}`));
  }
  fs.writeFileSync(fp, JSON.stringify(data, null, 1));
  total += data.length;
  if (n) console.log(`  ${file}: +${n} → ${data.length}`);
}
console.log(`\n🎉 Tổng câu hỏi: ${total}`);
