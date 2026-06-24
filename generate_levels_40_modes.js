const fs = require('fs');

const allModes = [
  // 20 Basic
  'gen_living_math_garden', 'gen_infinite_island_archipelago', 'gen_cloud_city_numbers',
  'gen_crystal_cave_explorer', 'gen_ocean_reef_math', 'gen_dinosaur_valley_math',
  'gen_fairy_forest_quest', 'gen_toy_factory_automata', 'gen_train_route_builder',
  'gen_dragon_farm_math', 'gen_weather_wizard_math', 'gen_treasure_map_undersea',
  'gen_robot_city_constructor', 'gen_candy_biome_world', 'gen_storybook_popup_world',
  'gen_number_maze', 'gen_festival_parade_math', 'gen_dream_room_builder',
  'gen_time_portal_math', 'gen_mini_zoo_ecosystem',
  // 10 Supplementary
  'math_kingdom_builder', 'pet_evolution_math', 'math_adventure_map', 'magic_shop_math',
  'detective_math_mystery', 'rhythm_math_dance', 'math_cooking_lab', 'space_rescue_math',
  'puzzle_room_math', 'ai_coop_boss_battle',
  // 10 Standard
  'std_flashcard_sprint', 'std_quiz_ladder', 'std_matching_cards', 'std_drag_worksheet',
  'std_audio_math', 'std_error_clinic', 'std_mini_exam', 'std_parent_assignment',
  'std_number_trace', 'std_sticker_board'
];

let content = `import { SubjectData } from '../types/game';\n\nexport const mathData: SubjectData = {\n  id: 'math',\n  name: 'Toán Học',\n  themeColor: 'blue',\n  levels: [\n`;

let modeIndex = 0;
for (let i = 1; i <= 30; i++) {
  const modesForLevel = [];
  for (let j = 0; j < 3; j++) {
    modesForLevel.push(`"${allModes[modeIndex % allModes.length]}"`);
    modeIndex++;
  }

  content += `    {
      id: "l${String(i).padStart(2, '0')}",
      number: ${i},
      title: "Bài ${i}: Ôn tập Toán Lớp 1",
      description: "Vượt qua thử thách với 3 game mode thú vị.",
      assignedGameModes: [${modesForLevel.join(', ')}]
    },\n`;
}

content += `  ]\n};\n`;

fs.writeFileSync('data/math/levels.ts', content);
console.log('Successfully wrote data/math/levels.ts');
