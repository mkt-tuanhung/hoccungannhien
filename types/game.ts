export type GameType = 
  // NHÓM 1: 20 Basic Procedural Modes
  | 'gen_living_math_garden'
  | 'gen_infinite_island_archipelago'
  | 'gen_cloud_city_numbers'
  | 'gen_crystal_cave_explorer'
  | 'gen_ocean_reef_math'
  | 'gen_dinosaur_valley_math'
  | 'gen_fairy_forest_quest'
  | 'gen_toy_factory_automata'
  | 'gen_train_route_builder'
  | 'gen_dragon_farm_math'
  | 'gen_weather_wizard_math'
  | 'gen_treasure_map_undersea'
  | 'gen_robot_city_constructor'
  | 'gen_candy_biome_world'
  | 'gen_storybook_popup_world'
  | 'gen_number_maze'
  | 'gen_festival_parade_math'
  | 'gen_dream_room_builder'
  | 'gen_time_portal_math'
  | 'gen_mini_zoo_ecosystem'
  
  // NHÓM 2: 10 Supplementary Procedural Modes
  | 'math_kingdom_builder'
  | 'pet_evolution_math'
  | 'math_adventure_map'
  | 'magic_shop_math'
  | 'detective_math_mystery'
  | 'rhythm_math_dance'
  | 'math_cooking_lab'
  | 'space_rescue_math'
  | 'puzzle_room_math'
  | 'ai_coop_boss_battle'

  // NHÓM 3: 10 Standard Modes (No Procedural)
  | 'std_flashcard_sprint'
  | 'std_quiz_ladder'
  | 'std_matching_cards'
  | 'std_drag_worksheet'

  // UI Component Types
  | 'tap_choice'
  | 'drag_drop'
  | 'rescue_pet'
  | 'bubble_pop'
  | 'mini_boss'
  | 'toy_factory'
  | 'procedural'
  | 'std_audio_math'
  | 'std_error_clinic'
  | 'std_mini_exam'
  | 'std_parent_assignment'
  | 'std_number_trace'
  | 'std_sticker_board';

// ==========================================
// PROCEDURAL ENGINE INTERFACES
// ==========================================

export interface TerrainConfig {
  type: 'hills' | 'ocean' | 'clouds' | 'caves' | 'city' | 'flat' | 'space' | 'underwater' | 'forest';
  colors: string[];
  parallaxLayers: number;
  noiseSeed: number;
}

export interface DecorationConfig {
  type: 'l_system_tree' | 'scatter_rocks' | 'coral' | 'floating_islands' | 'crystals';
  density: number;
  scale: number;
  seed: number;
}

export interface ParticleConfig {
  type: 'fireflies' | 'snow' | 'rain' | 'bubbles' | 'sparkles' | 'confetti';
  count: number;
  speed: number;
}

export interface SceneBlueprint {
  id: string;
  seed: number; // Tái tạo cảnh bằng seed
  backgroundGradient: [string, string];
  terrain: TerrainConfig;
  decorations: DecorationConfig[];
  particles?: ParticleConfig;
  mood: 'energetic' | 'calm' | 'mysterious' | 'playful';
}


export interface GameOption {
  value: string | number;
  label?: string;
  imageUrl?: string;
  emoji?: string;
}

export interface QuestionTemplate {
  id: string;
  type: GameType;
  promptTemplate: string; // "Có {{count}} {{object}} trên màn hình. Bé hãy chọn số đúng."
  variables: Record<string, any>; // {"count": "0-10", "object": ["quả táo", "con mèo"]}
  answerLogic: string; // "correct_answer = count"
  interaction: string; // "tap_answer"
  uiGraphics: string;
  animation: string;
  sound: string;
  hints: string[];
}

export interface FixedQuestion {
  id: string;
  gameId: string;
  type: GameType;
  prompt: string;
  correctAnswer: any;
  options: any[];
  objectIcon: string;
  objectIcon2?: string;
  targetCount: number;
  targetCount2?: number;
  renderMode?: "single" | "compare" | "addition" | "subtraction" | "none";
  uiGraphics?: string;
}

export interface Game {
  id: string;
  name: string;
  type: GameType;
  questions: QuestionTemplate[];
}

export interface Level {
  id: string;
  number: number;
  title: string;
  description: string;
  assignedGameModes: GameType[]; // 3 Game Modes được cấu hình cố định cho Level này
  games?: Game[]; // (Sẽ bị deprecated khi chuyển sang lấy từ JSON hoàn toàn)
}

export interface SubjectData {
  id: string;
  name: string;
  themeColor: string;
  levels: Level[];
}
