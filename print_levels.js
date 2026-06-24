const fs = require('fs');
const group1_2 = [
  'gen_living_math_garden', 'gen_infinite_island_archipelago', 'gen_cloud_city_numbers',
  'gen_crystal_cave_explorer', 'gen_ocean_reef_math', 'gen_dinosaur_valley_math',
  'gen_fairy_forest_quest', 'gen_toy_factory_automata', 'gen_train_route_builder',
  'gen_dragon_farm_math', 'gen_weather_wizard_math', 'gen_treasure_map_undersea',
  'gen_robot_city_constructor', 'gen_candy_biome_world', 'gen_storybook_popup_world',
  'gen_number_maze', 'gen_festival_parade_math', 'gen_dream_room_builder',
  'gen_time_portal_math', 'gen_mini_zoo_ecosystem',
  'math_kingdom_builder', 'pet_evolution_math', 'math_adventure_map', 'magic_shop_math',
  'detective_math_mystery', 'rhythm_math_dance', 'math_cooking_lab', 'space_rescue_math',
  'puzzle_room_math', 'ai_coop_boss_battle'
];

const content = fs.readFileSync('/Users/mac/Documents/Hoc cung An Nhien/data/math/levels.ts', 'utf8');

const levels = [];
const regex = /"id":\s*"([^"]+)",\s*"number":\s*(\d+),\s*"title":\s*"([^"]+)",\s*"description":\s*"([^"]+)"/g;
let match;
while ((match = regex.exec(content)) !== null) {
  levels.push({
    id: match[1],
    number: parseInt(match[2]),
    title: match[3],
    description: match[4]
  });
}

let newContent = `import { SubjectData, GameType } from "@/types/game";\n\nexport const mathData: SubjectData = {\n  id: "math",\n  name: "Toán Học",\n  themeColor: "#FF69B4",\n  levels: [\n`;

levels.forEach((lvl, index) => {
  const mode1 = group1_2[index % 30];
  const mode2 = group1_2[(index + 10) % 30];
  const mode3 = group1_2[(index + 20) % 30];

  newContent += `    {\n      id: "${lvl.id}",\n      number: ${lvl.number},\n      title: "${lvl.title}",\n      description: "${lvl.description}",\n      assignedGameModes: [\n        "${mode1}" as GameType,\n        "${mode2}" as GameType,\n        "${mode3}" as GameType\n      ],\n      games: []\n    }`;
  if (index < levels.length - 1) {
    newContent += ",\n";
  } else {
    newContent += "\n";
  }
});

newContent += `  ]\n};\n`;

console.log(newContent);
