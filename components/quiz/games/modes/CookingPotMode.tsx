"use client";
import { assetUrl } from "@/lib/assets";

import { useState } from "react";
import { motion } from "framer-motion";
import { useGameMode } from "@/lib/hooks/useGameMode";
import { useModeExtras } from "@/lib/hooks/useModeExtras";
import { ANSWER_SCHEMES } from "@/lib/design/palette";
import AnswerButton from "../ui/AnswerButton";
import { GameModeProps } from "../BaseGameShell";
import GardenScene from "../ui/GardenScene";
import ModeHeader from "../ui/ModeHeader";

interface Props extends GameModeProps { bg?: string; objects?: string[]; }
const FOODS = [assetUrl('/sprites/strawberry.png'), "🍫", assetUrl('/sprites/cheese.png'), assetUrl('/sprites/carrot.png')];

// BẾP MA THUẬT: nồi sôi sùng sục, chạm nguyên liệu đáp án đúng → rơi vào nồi.
export default function CookingPotMode({ question, onAnswer, bg, objects }: Props) {
  const g = useGameMode(question, onAnswer);
  const { displayPrompt, speak } = useModeExtras(g, question);
  const [dropped, setDropped] = useState(false);

  return (
    <div className="relative w-full min-h-[100dvh] overflow-hidden">
      <GardenScene src={bg} />
      <div className="relative z-10 flex flex-col min-h-[100dvh] px-4 pt-16 pb-6 max-w-xl mx-auto">
        <ModeHeader g={g} displayPrompt={displayPrompt} speak={speak} objects={objects} hint="🍲 Chạm nguyên liệu có đáp án đúng cho vào nồi" />
        <div className="flex-1 flex flex-col items-center justify-between py-2">
          <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
            {g.options.slice(0, 4).map((opt, i) => {
              const fall = g.isAnswered && String(opt) === String(g.selectedOption) && g.isCorrect;
              const state = !g.isAnswered ? "idle" : String(opt) === String(g.correctAnswer) ? (g.isCorrect ? "correct" : "reveal") : String(opt) === String(g.selectedOption) ? "wrong" : "dimmed";
              const foodEl = FOODS[i].startsWith("/") ? <img src={FOODS[i]} alt="" className="w-6 h-6 object-contain" /> : <span>{FOODS[i]}</span>;
              return (
                <motion.div key={i} animate={fall ? { y: 220, scale: 0.3, opacity: 0 } : {}}>
                  <AnswerButton
                    label={<span className="flex items-center gap-1 justify-center">{foodEl}{opt}</span>}
                    scheme={ANSWER_SCHEMES[i % ANSWER_SCHEMES.length]} state={state} disabled={g.isAnswered}
                    onClick={() => { setDropped(true); g.handleSelect(opt); }} />
                </motion.div>
              );
            })}
          </div>
          {/* Nồi sôi */}
          <div className="relative mt-4">
            <motion.div animate={g.isAnswered && g.isCorrect ? { scale: [1, 1.15, 1] } : {}} transition={{ duration: 0.5 }}>
              <img src=assetUrl('/sprites/pot.png') alt="" className="w-24 h-24 object-contain" style={{ filter: "drop-shadow(0 6px 6px rgba(80,50,90,0.3))" }} />
            </motion.div>
            {[0, 1, 2].map((i) => (
              <motion.div key={i} className="absolute rounded-full bg-white/70" style={{ width: 8, height: 8, left: 24 + i * 14, top: 6 }}
                animate={{ y: [-2, -16, -2], opacity: [0.7, 0, 0.7] }} transition={{ repeat: Infinity, duration: 1.6, delay: i * 0.4 }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
