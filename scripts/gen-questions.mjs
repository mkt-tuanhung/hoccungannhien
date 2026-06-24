/**
 * Sinh 1500 câu hỏi toán lớp 1 cho 30 level × 50 câu.
 * Mỗi level có 3 game mode, mỗi mode nhận ~17 câu.
 * 11 mode mới được thiết kế prompt riêng phù hợp cơ chế.
 */
import { writeFileSync, mkdirSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "../public/data/math/questions");
mkdirSync(OUT, { recursive: true });

// ─── Sprites ──────────────────────────────────────────────────────────────────
const SPRITES = [
  "/sprites/apple.png", "/sprites/star.png", "/sprites/candy.png",
  "/sprites/ball.png", "/sprites/coin.png", "/sprites/flower.png",
  "/sprites/cat.png", "/sprites/rabbit.png", "/sprites/diamond.png",
  "/sprites/frog.png", "/sprites/carrot.png", "/sprites/strawberry.png",
  "/sprites/mushroom.png", "/sprites/fish.png", "/sprites/butterfly.png",
  "/sprites/cupcake.png", "/sprites/lollipop.png", "/sprites/crown.png",
];
const sprite = (i) => SPRITES[i % SPRITES.length];

// ─── Helpers ──────────────────────────────────────────────────────────────────
let _seed = 42;
const rng = () => { _seed = (_seed * 1664525 + 1013904223) & 0xffffffff; return (_seed >>> 0) / 0xffffffff; };
const ri = (a, b) => a + Math.floor(rng() * (b - a + 1));
const pick = (arr) => arr[Math.floor(rng() * arr.length)];
const shuffle = (arr) => [...arr].sort(() => rng() - 0.5);

function makeOptions(correct, min, max, count = 4) {
  const set = new Set([correct]);
  let tries = 0;
  while (set.size < count && tries++ < 200) {
    const d = ri(1, 3) * (rng() > 0.5 ? 1 : -1);
    const v = Math.max(min, Math.min(max, correct + d));
    set.add(v);
  }
  // fill if needed
  let v = min;
  while (set.size < count) { if (!set.has(v)) set.add(v); v++; }
  return shuffle([...set]).slice(0, count);
}

const OBJECTS_VI = [
  "táo", "sao", "kẹo", "bóng", "xu", "hoa", "mèo", "thỏ",
  "kim cương", "ếch", "cà rốt", "dâu", "nấm", "cá", "bướm", "bánh"
];

// ─── Level plan (30 levels × 3 modes) ────────────────────────────────────────
// Giữ nguyên assignedGameModes từ levels.ts nhưng sắp xếp để 11 mode mới xuất hiện đều hơn
const LEVEL_MODES = [
  // L1-10: warm-up, giới thiệu các mode cũ
  ["gen_living_math_garden",      "gen_infinite_island_archipelago", "gen_cloud_city_numbers"],
  ["gen_crystal_cave_explorer",   "gen_ocean_reef_math",             "gen_dinosaur_valley_math"],
  ["gen_fairy_forest_quest",      "gen_toy_factory_automata",        "gen_train_route_builder"],
  ["gen_dragon_farm_math",        "gen_weather_wizard_math",         "gen_treasure_map_undersea"],
  ["gen_robot_city_constructor",  "gen_candy_biome_world",           "gen_storybook_popup_world"],
  ["gen_number_maze",             "gen_festival_parade_math",        "gen_dream_room_builder"],
  ["gen_time_portal_math",        "gen_mini_zoo_ecosystem",          "math_kingdom_builder"],
  ["pet_evolution_math",          "math_adventure_map",              "magic_shop_math"],
  ["detective_math_mystery",      "rhythm_math_dance",               "math_cooking_lab"],
  ["space_rescue_math",           "puzzle_room_math",                "ai_coop_boss_battle"],
  // L11-20: tăng dần độ khó, xen kẽ 11 mode mới
  ["std_flashcard_sprint",        "std_quiz_ladder",                 "std_matching_cards"],
  ["std_drag_worksheet",          "std_audio_math",                  "std_error_clinic"],
  ["std_mini_exam",               "std_parent_assignment",           "std_number_trace"],
  ["std_sticker_board",           "gen_living_math_garden",          "gen_infinite_island_archipelago"],
  ["gen_cloud_city_numbers",      "gen_crystal_cave_explorer",       "gen_ocean_reef_math"],
  ["gen_dinosaur_valley_math",    "gen_fairy_forest_quest",          "gen_toy_factory_automata"],
  ["gen_train_route_builder",     "gen_dragon_farm_math",            "gen_weather_wizard_math"],
  ["gen_treasure_map_undersea",   "gen_robot_city_constructor",      "gen_candy_biome_world"],
  ["gen_storybook_popup_world",   "gen_number_maze",                 "gen_festival_parade_math"],
  ["gen_dream_room_builder",      "gen_time_portal_math",            "gen_mini_zoo_ecosystem"],
  // L21-30: ôn tập tổng hợp, tất cả 40 mode đều xuất hiện lại
  ["math_kingdom_builder",        "pet_evolution_math",              "math_adventure_map"],
  ["magic_shop_math",             "detective_math_mystery",          "rhythm_math_dance"],
  ["math_cooking_lab",            "space_rescue_math",               "puzzle_room_math"],
  ["ai_coop_boss_battle",         "std_flashcard_sprint",            "std_quiz_ladder"],
  ["std_matching_cards",          "std_drag_worksheet",              "std_audio_math"],
  ["std_error_clinic",            "std_mini_exam",                   "std_parent_assignment"],
  ["std_number_trace",            "std_sticker_board",               "gen_living_math_garden"],
  ["gen_infinite_island_archipelago", "gen_cloud_city_numbers",      "gen_crystal_cave_explorer"],
  ["gen_ocean_reef_math",         "gen_dinosaur_valley_math",        "gen_fairy_forest_quest"],
  ["gen_toy_factory_automata",    "gen_train_route_builder",         "gen_dragon_farm_math"],
];

// ─── Difficulty bands ────────────────────────────────────────────────────────
// level 1-10: phạm vi 1-10; 11-20: 1-15; 21-30: 1-20
function band(lvl) {
  if (lvl <= 10) return { min: 1, max: 10 };
  if (lvl <= 20) return { min: 1, max: 15 };
  return { min: 1, max: 20 };
}

// ─── Prompt generators per mode ──────────────────────────────────────────────
// Trả về { prompt, correctAnswer, options, objectIcon, targetCount, renderMode, extra }

function genCount(lvl, idx) {
  const { max } = band(lvl);
  const n = ri(1, Math.min(max, 10));
  const obj = OBJECTS_VI[idx % OBJECTS_VI.length];
  const icon = sprite(idx);
  return {
    prompt: `Đếm ${obj} và chọn số đúng!`,
    correctAnswer: n, options: makeOptions(n, 1, max),
    objectIcon: icon, targetCount: n, renderMode: "single",
  };
}

function genAdd(lvl, idx) {
  const { max } = band(lvl);
  const a = ri(1, Math.floor(max * 0.7));
  const b = ri(1, max - a);
  const ans = a + b;
  return {
    prompt: `${a} + ${b} = ?`, correctAnswer: ans,
    options: makeOptions(ans, 1, max + 5),
    objectIcon: sprite(idx), targetCount: a, targetCount2: b, renderMode: "addition",
  };
}

function genSub(lvl, idx) {
  const { max } = band(lvl);
  const a = ri(2, max);
  const b = ri(1, a);
  const ans = a - b;
  return {
    prompt: `${a} - ${b} = ?`, correctAnswer: ans,
    options: makeOptions(ans, 0, a),
    objectIcon: sprite(idx), targetCount: a, targetCount2: b, renderMode: "subtraction",
  };
}

function genCompare(lvl, idx) {
  const { max } = band(lvl);
  const a = ri(1, max), b = ri(1, max);
  const ans = Math.max(a, b);
  return {
    prompt: `Số nào lớn hơn: ${a} hay ${b}?`, correctAnswer: ans,
    options: makeOptions(ans, 1, max),
    objectIcon: sprite(idx), targetCount: a, renderMode: "single",
  };
}

function genMissing(lvl, idx) {
  const { max } = band(lvl);
  const a = ri(1, Math.floor(max * 0.7));
  const b = ri(1, max - a);
  const ans = b;
  return {
    prompt: `${a} + ? = ${a + b}`, correctAnswer: ans,
    options: makeOptions(ans, 1, max),
    objectIcon: sprite(idx), targetCount: a, renderMode: "single",
  };
}

function genWordProblem(lvl, idx) {
  const { max } = band(lvl);
  const a = ri(1, Math.floor(max * 0.6));
  const b = ri(1, max - a);
  const names = ["An", "Bình", "Lan", "Mai", "Minh", "Nam"];
  const name = names[idx % names.length];
  const obj = OBJECTS_VI[idx % OBJECTS_VI.length];
  const ans = a + b;
  return {
    prompt: `${name} có ${a} ${obj}, mẹ cho thêm ${b}. Có tất cả bao nhiêu?`,
    correctAnswer: ans, options: makeOptions(ans, 1, max + 3),
    objectIcon: sprite(idx), targetCount: a, renderMode: "single",
  };
}

// ── 11 MODE MỚI với prompt chuyên biệt ────────────────────────────────────────

// SpinWheelMode: bánh xe — câu ngắn, đáp án rõ ràng
function genSpinWheel(lvl, idx) {
  return idx % 3 === 0 ? genAdd(lvl, idx) : idx % 3 === 1 ? genSub(lvl, idx) : genCompare(lvl, idx);
}

// PianoKeysMode: bấm phím đàn — prompt có âm nhạc
function genPianoKeys(lvl, idx) {
  const base = idx % 2 === 0 ? genAdd(lvl, idx) : genSub(lvl, idx);
  const notes = ["Đô", "Rê", "Mi", "Fa", "Sol", "La", "Si"];
  base.prompt = `🎵 ${base.prompt} (Bấm phím đúng!)`;
  return base;
}

// BalanceScaleMode: cân bằng — prompt về trọng lượng
function genBalance(lvl, idx) {
  const { max } = band(lvl);
  const a = ri(1, Math.floor(max * 0.7));
  const b = ri(1, max - a);
  const ans = a + b;
  const sides = [
    { prompt: `⚖️ Đĩa trái có quả nặng ${a + b}. Đặt quả nào vào đĩa phải để cân?`, ans: a + b },
    { prompt: `⚖️ ${a} + ${b} = ?`, ans },
    { prompt: `⚖️ Cân cần thêm bao nhiêu để bằng ${a + b}? (Đang có ${a})`, ans: b },
  ];
  const s = sides[idx % 3];
  return {
    prompt: s.prompt, correctAnswer: s.ans,
    options: makeOptions(s.ans, 1, max + 5),
    objectIcon: sprite(idx), targetCount: a, renderMode: "single",
  };
}

// TiltCatchMode: hứng số rơi — prompt về số cần bắt
function genTiltCatch(lvl, idx) {
  const base = idx % 2 === 0 ? genAdd(lvl, idx) : genSub(lvl, idx);
  base.prompt = `🧺 Hứng số đúng: ${base.prompt}`;
  return base;
}

// DrumCountMode: đánh trống — đáp án nhỏ (đếm được)
function genDrum(lvl, idx) {
  const max = Math.min(band(lvl).max, 10);
  const n = ri(1, max);
  const obj = OBJECTS_VI[idx % OBJECTS_VI.length];
  const prompts = [
    `🥁 Gõ trống ${n} lần!`,
    `🥁 Có ${n} ${obj} — gõ trống đúng số lần!`,
    `🥁 Đếm rồi gõ: ${n}`,
  ];
  return {
    prompt: prompts[idx % 3], correctAnswer: n,
    options: makeOptions(n, 1, max),
    objectIcon: sprite(idx), targetCount: n, renderMode: "single",
  };
}

// MemoryFlipMode: lật thẻ ghép cặp
function genMemoryFlip(lvl, idx) {
  const base = idx % 2 === 0 ? genAdd(lvl, idx) : genSub(lvl, idx);
  base.prompt = `🃏 Lật thẻ ghép cặp: ${base.prompt}`;
  return base;
}

// StickerBoardMode: dán sticker — câu vui, thưởng
function genStickerBoard(lvl, idx) {
  const base = idx % 3 === 0 ? genAdd(lvl, idx) : idx % 3 === 1 ? genSub(lvl, idx) : genCount(lvl, idx);
  const emojis = ["⭐", "🌟", "🦋", "🌸", "🍀"];
  base.prompt = `${emojis[idx % 5]} ${base.prompt} (Đúng nhận sticker!)`;
  return base;
}

// DetectiveMode: thám tử — đáp án là số nguyên để sinh manh mối
function genDetective(lvl, idx) {
  const { max } = band(lvl);
  const ans = ri(1, max);
  const prompts = [
    `🔍 Tìm số bí ẩn: nó là kết quả của phép tính này!`,
    `🔍 Phá án: ${ans > 5 ? "số lớn hơn 5" : "số nhỏ hơn hoặc bằng 5"} và ${ans % 2 === 0 ? "là số chẵn" : "là số lẻ"}. Đó là số mấy?`,
    `🔍 Thám tử ơi, tìm số ${ans}!`,
  ];
  return {
    prompt: prompts[idx % 3], correctAnswer: ans,
    options: makeOptions(ans, 1, max),
    objectIcon: sprite(idx), targetCount: ans, renderMode: "single",
  };
}

// JigsawDropMode: ghép tranh puzzle
function genJigsaw(lvl, idx) {
  const base = idx % 3 === 0 ? genAdd(lvl, idx) : idx % 3 === 1 ? genSub(lvl, idx) : genCount(lvl, idx);
  base.prompt = `🧩 Ghép tranh: ${base.prompt}`;
  return base;
}

// MissionCardMode: nhiệm vụ bố mẹ giao
function genMission(lvl, idx) {
  const { max } = band(lvl);
  const a = ri(1, Math.floor(max * 0.7));
  const b = ri(1, max - a);
  const missions = [
    { p: `📋 Bố giao: ${a} + ${b} = ?`, ans: a + b },
    { p: `📋 Mẹ giao: ${a + b} - ${b} = ?`, ans: a },
    { p: `📋 Nhiệm vụ hôm nay: tìm kết quả của ${a} + ${b}`, ans: a + b },
    { p: `📋 Hãy giải: có ${a + b} quả, ăn ${b} quả. Còn lại?`, ans: a },
  ];
  const m = missions[idx % missions.length];
  return {
    prompt: m.p, correctAnswer: m.ans,
    options: makeOptions(m.ans, 0, max + 3),
    objectIcon: sprite(idx), targetCount: a, renderMode: "single",
  };
}

// ─── Mode → generator mapping ────────────────────────────────────────────────
const MIX = [genAdd, genSub, genCount, genCompare, genMissing, genWordProblem];
const mixGen = (lvl, idx) => MIX[idx % MIX.length](lvl, idx);

const MODE_GEN = {
  // 11 mode mới
  "std_flashcard_sprint":       genSpinWheel,
  "std_audio_math":             genPianoKeys,
  "puzzle_room_math":           genBalance,
  "std_error_clinic":           genTiltCatch,
  "gen_festival_parade_math":   genDrum,
  "std_matching_cards":         genMemoryFlip,
  "std_sticker_board":          genStickerBoard,
  "detective_math_mystery":     genDetective,
  "gen_storybook_popup_world":  genJigsaw,
  "std_parent_assignment":      genMission,
  "std_mini_exam":              genJigsaw,
  // Mode đếm có vật thể
  "gen_living_math_garden":           genCount,
  "gen_infinite_island_archipelago":  genCount,
  "gen_cloud_city_numbers":           genCount,
  "gen_crystal_cave_explorer":        genCount,
  "gen_ocean_reef_math":              genCount,
  "gen_dinosaur_valley_math":         genCount,
  "gen_fairy_forest_quest":           genCount,
  "gen_mini_zoo_ecosystem":           genCount,
  "gen_candy_biome_world":            genCount,
  "gen_dream_room_builder":           genCount,
  // Mode hành động (số học thuần)
  "gen_toy_factory_automata":   genAdd,
  "gen_train_route_builder":    genAdd,
  "gen_dragon_farm_math":       genAdd,
  "gen_number_maze":            genAdd,
  "gen_robot_city_constructor": genSub,
  "gen_treasure_map_undersea":  genSub,
  "gen_weather_wizard_math":    genCompare,
  "gen_time_portal_math":       genMissing,
  "gen_storybook_popup_world":  genJigsaw,
  // Supplementary
  "math_kingdom_builder":       mixGen,
  "pet_evolution_math":         mixGen,
  "math_adventure_map":         mixGen,
  "magic_shop_math":            mixGen,
  "rhythm_math_dance":          mixGen,
  "math_cooking_lab":           mixGen,
  "space_rescue_math":          mixGen,
  "ai_coop_boss_battle":        mixGen,
  "std_quiz_ladder":            mixGen,
  "std_drag_worksheet":         mixGen,
  "std_number_trace":           mixGen,
  "std_sticker_board":          genStickerBoard,
};

// ─── Generate ─────────────────────────────────────────────────────────────────
const TOTAL_PER_LEVEL = 50;

for (let lvl = 1; lvl <= 30; lvl++) {
  _seed = lvl * 7919; // deterministic per level
  const modes = LEVEL_MODES[lvl - 1];
  const perMode = Math.floor(TOTAL_PER_LEVEL / modes.length); // 16 hoặc 17
  const questions = [];
  let globalIdx = 0;

  for (let mi = 0; mi < modes.length; mi++) {
    const mode = modes[mi];
    const count = mi < (TOTAL_PER_LEVEL % modes.length)
      ? perMode + 1
      : perMode;
    const gen = MODE_GEN[mode] || mixGen;

    for (let i = 0; i < count; i++) {
      const data = gen(lvl, globalIdx);
      questions.push({
        id: `l${String(lvl).padStart(2, "0")}-${mode.slice(0, 8)}-${i + 1}`,
        gameId: mode,
        type: mode,
        prompt: data.prompt,
        correctAnswer: data.correctAnswer,
        options: data.options,
        objectIcon: data.objectIcon || sprite(globalIdx),
        objectIcon2: "",
        targetCount: data.targetCount || 0,
        targetCount2: data.targetCount2 || 0,
        renderMode: data.renderMode || "single",
        displayPrompt: null,
      });
      globalIdx++;
    }
  }

  // Shuffle nhẹ để các mode xen kẽ nhau
  const shuffled = [];
  const buckets = modes.map((_, mi) => questions.filter(q => q.type === modes[mi]));
  const maxLen = Math.max(...buckets.map(b => b.length));
  for (let i = 0; i < maxLen; i++) {
    for (const bucket of buckets) {
      if (bucket[i]) shuffled.push(bucket[i]);
    }
  }

  const outPath = path.join(OUT, `level_${lvl}.json`);
  writeFileSync(outPath, JSON.stringify(shuffled, null, 1), "utf8");
  console.log(`Level ${lvl}: ${shuffled.length} câu — [${modes.join(", ")}]`);
}

console.log("\n✅ Xong! 30 × 50 = 1500 câu đã được sinh.");
