"use client";

import React from "react";
import BaseGameShell, { GameModeProps } from "../BaseGameShell";
import MatchingMode from "./MatchingMode";
import { WORLDS } from "@/lib/design/worlds";
import * as OV from "../overlays";

type Mech = "grid" | "path" | "balloon" | "basket";
const worldById = (id: string) => WORLDS.find((w) => w.id === id) || WORLDS[0];

// Factory: thế giới + overlay tạo sinh + cơ chế + hướng dẫn riêng cho từng mode.
function make(worldId: string, Overlay: React.FC | null, mech: Mech, hint: string) {
  const w = worldById(worldId);
  const Comp = (props: GameModeProps) => (
    <BaseGameShell question={props.question} onAnswer={props.onAnswer} bg={w.bg} objects={w.objects}
      answerMode={mech} hint={hint} sceneOverlay={Overlay ? () => <Overlay /> : undefined} />
  );
  Comp.displayName = `Engine_${worldId}`;
  return Comp;
}
function makeMatch(worldId: string) {
  const w = worldById(worldId);
  const Comp = (props: GameModeProps) => <MatchingMode question={props.question} onAnswer={props.onAnswer} bg={w.bg} objects={w.objects} />;
  return Comp;
}

// 40 chế độ — mỗi type 1 engine với tổ hợp (thế giới + hiệu ứng + cơ chế + hướng dẫn) DUY NHẤT.
export const ENGINES: Record<string, React.ComponentType<any>> = {
  gen_living_math_garden: make("garden", OV.Fireflies, "basket", "🌱 Kéo số đúng vào chậu để tưới cây nở hoa"),
  gen_infinite_island_archipelago: make("ocean", OV.BubblesUp, "path", "⛵ Chèo thuyền tới đảo có đáp án đúng"),
  gen_cloud_city_numbers: make("space", OV.ParallaxClouds, "path", "☁️ Bước lên đám mây có đáp án đúng"),
  gen_crystal_cave_explorer: make("crystalcave", OV.FlashlightDark, "grid", "💎 Chạm viên pha lê có đáp án đúng"),
  gen_ocean_reef_math: make("ocean", OV.BubblesUp, "balloon", "🫧 Chọc bong bóng có đáp án đúng"),
  gen_dinosaur_valley_math: make("dinovalley", null, "grid", "🦕 Chạm quả trứng có đáp án đúng để nở"),
  gen_fairy_forest_quest: make("fairyforest", OV.Fireflies, "grid", "🏮 Chạm đèn lồng có đáp án đúng"),
  gen_dragon_farm_math: make("dinovalley", null, "basket", "🐲 Kéo thức ăn có đáp án đúng cho rồng"),
  gen_weather_wizard_math: make("garden", OV.RainDrops, "grid", "🌈 Chạm đám mây có đáp án đúng"),
  gen_treasure_map_undersea: make("ocean", OV.BubblesUp, "path", "🗺️ Lần theo bản đồ tới kho báu đúng"),
  gen_toy_factory_automata: make("robotcity", OV.SpinningGears, "basket", "🧸 Kéo gấu bông vào hộp có số đúng"),
  gen_robot_city_constructor: make("robotcity", OV.SpinningGears, "grid", "🤖 Chạm khối có đáp án đúng để lắp robot"),
  gen_candy_biome_world: make("candy", OV.FallingSprinkles, "basket", "🍬 Kéo kẹo có đáp án đúng vào lọ"),
  gen_storybook_popup_world: makeMatch("castle"),
  gen_number_maze: make("crystalcave", null, "path", "🐭 Dẫn chuột qua mê cung tới ô đúng"),
  gen_festival_parade_math: make("candy", OV.FallingSprinkles, "balloon", "🎉 Chọc bóng bay có đáp án đúng"),
  gen_dream_room_builder: make("garden", null, "basket", "🛋️ Kéo món đồ có đáp án đúng vào phòng"),
  gen_time_portal_math: make("space", OV.TwinkleStars, "grid", "⏰ Chạm cổng thời gian có đáp án đúng"),
  gen_mini_zoo_ecosystem: make("garden", OV.Fireflies, "basket", "🐰 Kéo cà rốt có đáp án đúng cho thú"),
  gen_train_route_builder: make("garden", null, "path", "🚂 Nối toa tàu theo đáp án đúng"),
  math_kingdom_builder: make("castle", OV.TwinkleStars, "grid", "🏰 Chạm gạch có đáp án đúng để xây lâu đài"),
  pet_evolution_math: make("garden", OV.Fireflies, "basket", "🥚 Kéo thức ăn có đáp án đúng cho thú cưng"),
  math_adventure_map: make("dinovalley", null, "path", "🗺️ Đi theo bản đồ tới chặng có đáp án đúng"),
  magic_shop_math: make("crystalcave", OV.Snow, "basket", "🧪 Kéo lọ phép có đáp án đúng vào giỏ"),
  detective_math_mystery: makeMatch("crystalcave"),
  rhythm_math_dance: make("space", OV.TwinkleStars, "balloon", "🎵 Chọc nốt nhạc có đáp án đúng theo nhịp"),
  math_cooking_lab: make("candy", OV.FallingSprinkles, "basket", "🍲 Kéo nguyên liệu có đáp án đúng vào nồi"),
  space_rescue_math: make("space", OV.TwinkleStars, "grid", "🚀 Chạm bình nhiên liệu có đáp án đúng"),
  puzzle_room_math: makeMatch("robotcity"),
  ai_coop_boss_battle: make("crystalcave", null, "grid", "⚔️ Chạm đáp án đúng để đánh boss"),

  std_flashcard_sprint: make("garden", null, "grid", "⚡ Chạm thật nhanh đáp án đúng"),
  std_quiz_ladder: make("fairyforest", null, "grid", "🪜 Trả lời đúng để leo thang"),
  std_matching_cards: makeMatch("garden"),
  std_drag_worksheet: make("garden", null, "basket", "✏️ Kéo số đúng vào ô trống"),
  std_audio_math: make("ocean", OV.BubblesUp, "grid", "👂 Nghe cô đọc rồi chạm đáp án đúng"),
  std_error_clinic: make("garden", null, "grid", "🩹 Chọn đáp án đúng để chữa lỗi"),
  std_mini_exam: make("castle", null, "grid", "📝 Chạm đáp án đúng"),
  std_parent_assignment: make("garden", null, "grid", "📋 Hoàn thành bài bố mẹ giao"),
  std_number_trace: make("fairyforest", OV.Fireflies, "grid", "✏️ Chạm số đúng"),
  std_sticker_board: make("candy", OV.FallingSprinkles, "grid", "⭐ Trả lời đúng để nhận sticker"),
};
