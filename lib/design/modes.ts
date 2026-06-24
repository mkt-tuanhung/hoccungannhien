// Đăng ký đủ 40 chế độ chơi: mỗi type → 1 cơ chế tương tác + nhãn hiển thị.
// Cơ chế dùng chung (grid/path/matching/balloon/basket) nhưng mỗi chế độ có
// tên + chủ đề riêng, route theo question.type.
export type Mechanic = "grid" | "path" | "matching" | "balloon" | "basket";

export interface ModeConfig {
  mechanic: Mechanic;
  label: string;
}

export const MODE_CONFIG: Record<string, ModeConfig> = {
  // --- Đường đi / mê cung → path ---
  gen_number_maze: { mechanic: "path", label: "Mê Cung Số" },
  gen_infinite_island_archipelago: { mechanic: "path", label: "Quần Đảo Số" },
  gen_train_route_builder: { mechanic: "path", label: "Đường Tàu" },
  gen_treasure_map_undersea: { mechanic: "path", label: "Bản Đồ Kho Báu" },
  gen_cloud_city_numbers: { mechanic: "path", label: "Thành Phố Mây" },
  math_adventure_map: { mechanic: "path", label: "Bản Đồ Phiêu Lưu" },

  // --- Bóng bay / chọc nổ → balloon ---
  gen_ocean_reef_math: { mechanic: "balloon", label: "Rạn San Hô" },
  gen_festival_parade_math: { mechanic: "balloon", label: "Lễ Hội Diễu Hành" },
  gen_weather_wizard_math: { mechanic: "balloon", label: "Phù Thuỷ Thời Tiết" },
  rhythm_math_dance: { mechanic: "balloon", label: "Vũ Điệu Toán Học" },

  // --- Kéo-thả vào rổ/chậu → basket ---
  gen_living_math_garden: { mechanic: "basket", label: "Vườn Toán Sống Động" },
  gen_toy_factory_automata: { mechanic: "basket", label: "Nhà Máy Đồ Chơi" },
  gen_dragon_farm_math: { mechanic: "basket", label: "Nông Trại Rồng" },
  gen_mini_zoo_ecosystem: { mechanic: "basket", label: "Vườn Thú Nhỏ" },
  gen_candy_biome_world: { mechanic: "basket", label: "Thế Giới Kẹo" },
  magic_shop_math: { mechanic: "basket", label: "Cửa Hàng Phép Thuật" },
  math_cooking_lab: { mechanic: "basket", label: "Bếp Ma Thuật" },
  pet_evolution_math: { mechanic: "basket", label: "Tiến Hoá Thú Cưng" },
  std_drag_worksheet: { mechanic: "basket", label: "Phiếu Bài Tập" },

  // --- Lật thẻ / ghép cặp → matching ---
  std_matching_cards: { mechanic: "matching", label: "Lật Thẻ Ghép Cặp" },
  detective_math_mystery: { mechanic: "matching", label: "Thám Tử Nhí" },
  puzzle_room_math: { mechanic: "matching", label: "Phòng Mật Mã" },
  gen_storybook_popup_world: { mechanic: "matching", label: "Sách Bật Nổi" },

  // --- Lưới chạm → grid ---
  gen_crystal_cave_explorer: { mechanic: "grid", label: "Hang Pha Lê" },
  gen_dinosaur_valley_math: { mechanic: "grid", label: "Thung Lũng Khủng Long" },
  gen_fairy_forest_quest: { mechanic: "grid", label: "Rừng Tiên" },
  gen_dream_room_builder: { mechanic: "grid", label: "Phòng Mơ Ước" },
  gen_time_portal_math: { mechanic: "grid", label: "Cổng Thời Gian" },
  gen_robot_city_constructor: { mechanic: "grid", label: "Thành Phố Robot" },
  math_kingdom_builder: { mechanic: "grid", label: "Vương Quốc Toán Học" },
  space_rescue_math: { mechanic: "grid", label: "Giải Cứu Vũ Trụ" },
  ai_coop_boss_battle: { mechanic: "grid", label: "Đánh Boss" },
  std_flashcard_sprint: { mechanic: "grid", label: "Thẻ Nhanh" },
  std_quiz_ladder: { mechanic: "grid", label: "Leo Thang" },
  std_mini_exam: { mechanic: "grid", label: "Kiểm Tra" },
  std_audio_math: { mechanic: "grid", label: "Nghe Hiểu" },
  std_error_clinic: { mechanic: "grid", label: "Phòng Khám Lỗi" },
  std_parent_assignment: { mechanic: "grid", label: "Bài Bố Mẹ Giao" },
  std_sticker_board: { mechanic: "grid", label: "Bảng Sticker" },
  std_number_trace: { mechanic: "grid", label: "Tập Viết Số" },
};

const FALLBACK: Mechanic[] = ["grid", "path", "matching", "balloon", "basket"];

export function getMechanic(type: string, index: number): Mechanic {
  return MODE_CONFIG[type]?.mechanic || FALLBACK[index % FALLBACK.length];
}

export function getModeLabel(type: string): string {
  return MODE_CONFIG[type]?.label || "Toán Vui";
}

export const MODE_COUNT = Object.keys(MODE_CONFIG).length;
