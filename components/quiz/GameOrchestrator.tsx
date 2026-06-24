"use client";
import { assetUrl } from "@/lib/assets";

import { useState } from "react";
import { QuestionTemplate } from "@/types/game";
import { AnimatePresence, motion } from "framer-motion";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import BaseGameShell from "./games/BaseGameShell";
import MatchingMode from "./games/modes/MatchingMode";
import BossBattleMode from "./games/modes/BossBattleMode";
import NumberMazeMode from "./games/modes/NumberMazeMode";
import ConveyorMode from "./games/modes/ConveyorMode";
import FlashlightCaveMode from "./games/modes/FlashlightCaveMode";
import BubblePopOceanMode from "./games/modes/BubblePopOceanMode";
import WhackMoleMode from "./games/modes/WhackMoleMode";
import CloudStairsMode from "./games/modes/CloudStairsMode";
import BoatVoyageMode from "./games/modes/BoatVoyageMode";
import FeedAnimalMode from "./games/modes/FeedAnimalMode";
import PotionShopMode from "./games/modes/PotionShopMode";
import LanternMode from "./games/modes/LanternMode";
import StackBuildMode from "./games/modes/StackBuildMode";
import NumberTraceMode from "./games/modes/NumberTraceMode";
import CookingPotMode from "./games/modes/CookingPotMode";
import DigTreasureMode from "./games/modes/DigTreasureMode";
import DinoEggMode from "./games/modes/DinoEggMode";
import RocketFuelMode from "./games/modes/RocketFuelMode";
import SpinPortalMode from "./games/modes/SpinPortalMode";
import WeatherWizardMode from "./games/modes/WeatherWizardMode";
import RhythmNoteMode from "./games/modes/RhythmNoteMode";
import TrainCarMode from "./games/modes/TrainCarMode";
import DragCountMode from "./games/modes/DragCountMode";
import NumberLineHopMode from "./games/modes/NumberLineHopMode";
import SpinWheelMode from "./games/modes/SpinWheelMode";
import PianoKeysMode from "./games/modes/PianoKeysMode";
import BalanceScaleMode from "./games/modes/BalanceScaleMode";
import TiltCatchMode from "./games/modes/TiltCatchMode";
import DrumCountMode from "./games/modes/DrumCountMode";
import MemoryFlipMode from "./games/modes/MemoryFlipMode";
import StickerBoardMode from "./games/modes/StickerBoardMode";
import DetectiveMode from "./games/modes/DetectiveMode";
import JigsawDropMode from "./games/modes/JigsawDropMode";
import MissionCardMode from "./games/modes/MissionCardMode";
import { ENGINES } from "./games/modes/genEngines";
import { getMechanic } from "@/lib/design/modes";

// 40 chế độ chơi — mỗi type có engine riêng. Engine BESPOKE (cơ chế hoàn toàn riêng)
// ghi đè lên engine factory (thế giới + hiệu ứng + cơ chế lõi).
const ALL_ENGINES: Record<string, React.ComponentType<any>> = {
  ...ENGINES,
  ai_coop_boss_battle: BossBattleMode,
  gen_number_maze: NumberMazeMode,
  gen_toy_factory_automata: ConveyorMode,
  gen_crystal_cave_explorer: FlashlightCaveMode,
  gen_ocean_reef_math: BubblePopOceanMode,
  gen_mini_zoo_ecosystem: WhackMoleMode,
  gen_cloud_city_numbers: CloudStairsMode,
  gen_infinite_island_archipelago: BoatVoyageMode,
  gen_dragon_farm_math: FeedAnimalMode,
  magic_shop_math: PotionShopMode,
  gen_fairy_forest_quest: LanternMode,
  std_number_trace: NumberTraceMode,
  math_kingdom_builder: (p: any) => <StackBuildMode {...p} top={assetUrl('/sprites/castle.png')} hint="🧱 Chạm viên gạch đúng để xây lâu đài" />,
  gen_robot_city_constructor: (p: any) => <StackBuildMode {...p} top={assetUrl('/sprites/robot.png')} hint="🔩 Chạm khối đúng để lắp robot" />,
  pet_evolution_math: (p: any) => <StackBuildMode {...p} top={assetUrl('/sprites/egg.png')} hint="🍼 Chạm thức ăn đúng để thú cưng tiến hoá" />,
  math_cooking_lab: CookingPotMode,
  gen_treasure_map_undersea: DigTreasureMode,
  gen_dinosaur_valley_math: DinoEggMode,
  space_rescue_math: RocketFuelMode,
  gen_time_portal_math: SpinPortalMode,
  gen_weather_wizard_math: WeatherWizardMode,
  rhythm_math_dance: RhythmNoteMode,
  gen_train_route_builder: TrainCarMode,
  // Cách chơi HÀNH ĐỘNG (không chọn đáp án): tự tạo ra đáp án
  gen_living_math_garden: DragCountMode,
  gen_candy_biome_world: DragCountMode,
  std_drag_worksheet: DragCountMode,
  gen_dream_room_builder: DragCountMode,
  math_adventure_map: NumberLineHopMode,
  std_quiz_ladder: NumberLineHopMode,
  // 11 modes mới — cơ chế hoàn toàn khác
  std_flashcard_sprint: SpinWheelMode,
  std_audio_math: PianoKeysMode,
  puzzle_room_math: BalanceScaleMode,
  std_error_clinic: TiltCatchMode,
  gen_festival_parade_math: DrumCountMode,
  std_matching_cards: MemoryFlipMode,
  std_sticker_board: StickerBoardMode,
  detective_math_mystery: DetectiveMode,
  gen_storybook_popup_world: JigsawDropMode,
  std_parent_assignment: MissionCardMode,
  std_mini_exam: JigsawDropMode,
};

const playTone = (freq: number, dur: number) => {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + dur);
  } catch {}
};

interface GameOrchestratorProps {
  questions: QuestionTemplate[];
  onGameComplete: (score: number) => void;
  onProgress?: (current: number, total: number, score: number) => void;
  bg?: string;
  objects?: string[];
}

export default function GameOrchestrator({ questions, onGameComplete, onProgress, bg, objects }: GameOrchestratorProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);

  const currentQuestion = questions[currentIndex];

  const handleNext = (isCorrect: boolean) => {
    const newScore = isCorrect ? score + 1 : score;
    if (isCorrect) setScore(newScore);

    if (currentIndex < questions.length - 1) {
      setTimeout(() => {
        playTone(560, 0.12);
        const next = currentIndex + 1;
        setCurrentIndex(next);
        onProgress?.(next, questions.length, newScore);
      }, 300);
    } else {
      setTimeout(() => onGameComplete(newScore), 300);
    }
  };

  if (!currentQuestion) return null;

  return (
    <div className="relative w-full h-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full"
        >
          <ErrorBoundary key={currentIndex}>
            {(() => {
              const Engine = ALL_ENGINES[currentQuestion.type];
              if (Engine) return <Engine question={currentQuestion} onAnswer={handleNext} bg={bg} objects={objects} />;
              // Fallback an toàn (hiếm khi dùng)
              const mech = getMechanic(currentQuestion.type, currentIndex);
              return mech === "matching" ? (
                <MatchingMode question={currentQuestion} onAnswer={handleNext} bg={bg} objects={objects} />
              ) : (
                <BaseGameShell question={currentQuestion} onAnswer={handleNext} bg={bg} objects={objects} answerMode={mech} />
              );
            })()}
          </ErrorBoundary>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
