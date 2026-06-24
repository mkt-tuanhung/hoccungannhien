"use client";
import { assetUrl } from "@/lib/assets";

import { motion } from "framer-motion";
import { useGameMode } from "@/lib/hooks/useGameMode";
import { useModeExtras } from "@/lib/hooks/useModeExtras";
import { ANSWER_SCHEMES } from "@/lib/design/palette";
import { GameModeProps } from "../BaseGameShell";
import GardenScene from "../ui/GardenScene";
import ModeHeader from "../ui/ModeHeader";
import { TwinkleStars } from "../overlays";
import GlossySprite from "../ui/GlossySprite";
import AnswerButton from "../ui/AnswerButton";

interface Props extends GameModeProps { bg?: string; objects?: string[]; }

// GIẢI CỨU VŨ TRỤ: tên lửa chờ nhiên liệu, chạm bình nhiên liệu đáp án đúng → tên lửa phóng.
export default function RocketFuelMode({ question, onAnswer, bg, objects }: Props) {
  const g = useGameMode(question, onAnswer);
  const { displayPrompt, speak } = useModeExtras(g, question);
  const launched = g.isAnswered && g.isCorrect;

  return (
    <div className="relative w-full min-h-[100dvh] overflow-hidden">
      <GardenScene src={bg} />
      <div className="absolute inset-0 z-[5] pointer-events-none"><TwinkleStars /></div>
      <div className="relative z-10 flex flex-col min-h-[100dvh] px-4 pt-16 pb-6 max-w-xl mx-auto">
        <ModeHeader g={g} displayPrompt={displayPrompt} speak={speak} objects={objects} hint="🚀 Chạm bình nhiên liệu có đáp án đúng để phóng" />
        <div className="flex-1 flex flex-col items-center justify-between py-2">
          <motion.div className="flex flex-col items-center"
            animate={launched ? { y: [0, -400], rotate: [0, -8] } : { y: [0, -6, 0] }}
            transition={launched ? { duration: 1.2, ease: "easeIn" } : { repeat: Infinity, duration: 2 }}>
            <GlossySprite src={assetUrl('/sprites/rocket.png')} size={160} />
            {launched && <span className="text-3xl">🔥</span>}
          </motion.div>
          <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
            {g.options.slice(0, 4).map((opt, i) => {
              const state = !g.isAnswered ? "idle" : String(opt) === String(g.correctAnswer) ? (g.isCorrect ? "correct" : "reveal") : String(opt) === String(g.selectedOption) ? "wrong" : "dimmed";
              return (
                <AnswerButton key={i} scheme={ANSWER_SCHEMES[i % ANSWER_SCHEMES.length]} state={state} disabled={g.isAnswered} onClick={() => g.handleSelect(opt)}
                  label={<span className="flex items-center gap-1 justify-center"><img src={assetUrl('/sprites/fuelcan.png')} alt="" className="w-6 h-6 object-contain" />{opt}</span>} />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
