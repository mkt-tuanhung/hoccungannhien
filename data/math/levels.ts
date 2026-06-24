import { SubjectData } from '../../types/game';

export const mathData: SubjectData = {
  id: 'math',
  name: 'Toán Học',
  themeColor: 'blue',
  levels: [
    {
      id: "l01",
      number: 1,
      title: "Đếm số từ 1 đến 10",
      description: "Nhận biết các con số và đếm đồ vật đơn giản.",
      assignedGameModes: ["gen_living_math_garden", "gen_infinite_island_archipelago", "gen_cloud_city_numbers"]
    },
    {
      id: "l02",
      number: 2,
      title: "Phép cộng trong 10",
      description: "Học cộng hai số có tổng không vượt quá 10.",
      assignedGameModes: ["gen_crystal_cave_explorer", "gen_ocean_reef_math", "gen_dinosaur_valley_math"]
    },
    {
      id: "l03",
      number: 3,
      title: "Phép trừ trong 10",
      description: "Học trừ số nhỏ từ số lớn hơn, kết quả trong 10.",
      assignedGameModes: ["gen_fairy_forest_quest", "gen_toy_factory_automata", "gen_train_route_builder"]
    },
    {
      id: "l04",
      number: 4,
      title: "So sánh hai số",
      description: "Nhận biết số lớn hơn, nhỏ hơn, bằng nhau.",
      assignedGameModes: ["gen_dragon_farm_math", "gen_weather_wizard_math", "gen_treasure_map_undersea"]
    },
    {
      id: "l05",
      number: 5,
      title: "Cộng và trừ hỗn hợp",
      description: "Luyện tập cả phép cộng lẫn phép trừ trong 10.",
      assignedGameModes: ["gen_robot_city_constructor", "gen_candy_biome_world", "gen_storybook_popup_world"]
    },
    {
      id: "l06",
      number: 6,
      title: "Toán có lời văn đơn giản",
      description: "Giải bài toán kể chuyện với phép tính trong 10.",
      assignedGameModes: ["gen_number_maze", "gen_festival_parade_math", "gen_dream_room_builder"]
    },
    {
      id: "l07",
      number: 7,
      title: "Số thứ tự và vị trí",
      description: "Học thứ nhất, thứ hai... và vị trí đồ vật.",
      assignedGameModes: ["gen_time_portal_math", "gen_mini_zoo_ecosystem", "math_kingdom_builder"]
    },
    {
      id: "l08",
      number: 8,
      title: "Ôn tập tổng hợp (1–10)",
      description: "Ôn lại toàn bộ kiến thức số học trong phạm vi 10.",
      assignedGameModes: ["pet_evolution_math", "math_adventure_map", "magic_shop_math"]
    },
    {
      id: "l09",
      number: 9,
      title: "Thử thách số học vui",
      description: "Giải đố toán học qua các thử thách thú vị.",
      assignedGameModes: ["detective_math_mystery", "rhythm_math_dance", "math_cooking_lab"]
    },
    {
      id: "l10",
      number: 10,
      title: "Boss level: Đỉnh cao phạm vi 10",
      description: "Chinh phục màn boss với mọi kỹ năng đã học!",
      assignedGameModes: ["space_rescue_math", "puzzle_room_math", "ai_coop_boss_battle"]
    },
    {
      id: "l11",
      number: 11,
      title: "Phép cộng trong 15",
      description: "Mở rộng phép cộng với kết quả lên đến 15.",
      assignedGameModes: ["std_flashcard_sprint", "std_quiz_ladder", "std_matching_cards"]
    },
    {
      id: "l12",
      number: 12,
      title: "Phép trừ trong 15",
      description: "Học trừ số trong phạm vi 15.",
      assignedGameModes: ["std_drag_worksheet", "std_audio_math", "std_error_clinic"]
    },
    {
      id: "l13",
      number: 13,
      title: "Bài tập và kiểm tra (11–15)",
      description: "Kiểm tra khả năng tính toán trong phạm vi 15.",
      assignedGameModes: ["std_mini_exam", "std_parent_assignment", "std_number_trace"]
    },
    {
      id: "l14",
      number: 14,
      title: "Cộng trừ hỗn hợp trong 15",
      description: "Luyện tập nhanh các phép tính trong 15.",
      assignedGameModes: ["std_sticker_board", "gen_living_math_garden", "gen_infinite_island_archipelago"]
    },
    {
      id: "l15",
      number: 15,
      title: "Khám phá số trong 15",
      description: "Khám phá và ứng dụng số học qua các thế giới mới.",
      assignedGameModes: ["gen_cloud_city_numbers", "gen_crystal_cave_explorer", "gen_ocean_reef_math"]
    },
    {
      id: "l16",
      number: 16,
      title: "Phép cộng trong 20",
      description: "Nâng cao: cộng hai số có tổng đến 20.",
      assignedGameModes: ["gen_dinosaur_valley_math", "gen_fairy_forest_quest", "gen_toy_factory_automata"]
    },
    {
      id: "l17",
      number: 17,
      title: "Phép trừ trong 20",
      description: "Học trừ số trong phạm vi 20.",
      assignedGameModes: ["gen_train_route_builder", "gen_dragon_farm_math", "gen_weather_wizard_math"]
    },
    {
      id: "l18",
      number: 18,
      title: "Toán có lời văn nâng cao",
      description: "Giải bài toán kể chuyện phức tạp hơn.",
      assignedGameModes: ["gen_treasure_map_undersea", "gen_robot_city_constructor", "gen_candy_biome_world"]
    },
    {
      id: "l19",
      number: 19,
      title: "Hành trình số đến 20",
      description: "Phiêu lưu qua các thế giới với phép tính đến 20.",
      assignedGameModes: ["gen_storybook_popup_world", "gen_number_maze", "gen_festival_parade_math"]
    },
    {
      id: "l20",
      number: 20,
      title: "Ôn tập tổng hợp (11–20)",
      description: "Ôn lại toàn bộ kiến thức phạm vi 11 đến 20.",
      assignedGameModes: ["gen_dream_room_builder", "gen_time_portal_math", "gen_mini_zoo_ecosystem"]
    },
    {
      id: "l21",
      number: 21,
      title: "Cộng trừ nhanh trong 20",
      description: "Luyện tốc độ tính toán trong phạm vi 20.",
      assignedGameModes: ["math_kingdom_builder", "pet_evolution_math", "math_adventure_map"]
    },
    {
      id: "l22",
      number: 22,
      title: "Giải đố toán học",
      description: "Tư duy logic và giải câu đố số học thú vị.",
      assignedGameModes: ["magic_shop_math", "detective_math_mystery", "rhythm_math_dance"]
    },
    {
      id: "l23",
      number: 23,
      title: "Toán học trong cuộc sống",
      description: "Ứng dụng toán học vào tình huống thực tế.",
      assignedGameModes: ["math_cooking_lab", "space_rescue_math", "puzzle_room_math"]
    },
    {
      id: "l24",
      number: 24,
      title: "Thử thách tư duy (16–20)",
      description: "Chinh phục các bài toán khó trong phạm vi 20.",
      assignedGameModes: ["ai_coop_boss_battle", "std_flashcard_sprint", "std_quiz_ladder"]
    },
    {
      id: "l25",
      number: 25,
      title: "Luyện tập đa dạng",
      description: "Ôn luyện với nhiều dạng bài khác nhau.",
      assignedGameModes: ["std_matching_cards", "std_drag_worksheet", "std_audio_math"]
    },
    {
      id: "l26",
      number: 26,
      title: "Kiểm tra kỹ năng",
      description: "Kiểm tra toàn diện các kỹ năng đã học.",
      assignedGameModes: ["std_error_clinic", "std_mini_exam", "std_parent_assignment"]
    },
    {
      id: "l27",
      number: 27,
      title: "Ôn luyện sáng tạo",
      description: "Luyện tập qua các hoạt động viết số và ghép sticker.",
      assignedGameModes: ["std_number_trace", "std_sticker_board", "gen_living_math_garden"]
    },
    {
      id: "l28",
      number: 28,
      title: "Phiêu lưu số học",
      description: "Khám phá thế giới toán học qua các cuộc phiêu lưu.",
      assignedGameModes: ["gen_infinite_island_archipelago", "gen_cloud_city_numbers", "gen_crystal_cave_explorer"]
    },
    {
      id: "l29",
      number: 29,
      title: "Ôn tập toàn diện",
      description: "Ôn tập tất cả kiến thức đã học trong suốt hành trình.",
      assignedGameModes: ["gen_ocean_reef_math", "gen_dinosaur_valley_math", "gen_fairy_forest_quest"]
    },
    {
      id: "l30",
      number: 30,
      title: "🏆 Boss cuối: Toán Lớp 1 Hoàn Chỉnh",
      description: "Màn cuối cùng — chứng minh bạn là nhà toán học nhí!",
      assignedGameModes: ["gen_toy_factory_automata", "gen_train_route_builder", "gen_dragon_farm_math"]
    },
  ]
};
