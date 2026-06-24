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
import GlossySprite from "../ui/GlossySprite";

interface Props extends GameModeProps { bg?: string; objects?: string[]; }

// CHO RỒNG ĂN: rồng há miệng, chạm viên thức ăn mang đáp án đúng → bay vào miệng rồng.
export default function FeedAnimalMode({ question, onAnswer, bg, objects }: Props) {
  const g = useGameMode(question, onAnswer);
  const { displayPrompt, speak } = useModeExtras(g, question);
  const [eaten, setEaten] = useState(false);

  return (
    <div className="relative w-full min-h-[100dvh] overflow-hidden">
      <GardenScene src={bg} />
      <div className="relative z-10 flex flex-col min-h-[100dvh] px-4 pt-16 pb-6 max-w-xl mx-auto">
        <ModeHeader g={g} displayPrompt={displayPrompt} speak={speak} objects={objects} hint="🐲 Chạm thức ăn có đáp án đúng cho rồng ăn" />
        <div className="flex-1 flex flex-col items-center justify-between py-2">
          <GlossySprite src={assetUrl('/sprites/dragon.png')} size={176}
            animate={g.isAnswered && g.isCorrect ? { scale: [1, 1.25, 1], rotate: [0, -8, 8, 0] } : { y: [0, -8, 0] }}
            transition={g.isAnswered ? { duration: 0.6 } : { repeat: Infinity, duration: 2 }} />
          <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
            {g.options.slice(0, 4).map((opt, i) => {
              const flying = g.isAnswered && String(opt) === String(g.selectedOption) && g.isCorrect;
              const state = !g.isAnswered ? "idle" : String(opt) === String(g.correctAnswer) ? (g.isCorrect ? "correct" : "reveal") : String(opt) === String(g.selectedOption) ? "wrong" : "dimmed";
              return (
                <motion.div key={i} animate={flying ? { y: -260, scale: 0.3, opacity: 0 } : {}}>
                  <AnswerButton
                    label={<span className="flex items-center gap-1 justify-center"><img src={assetUrl('/sprites/carrot.png')} alt="" className="w-6 h-6 object-contain" />{opt}</span>}
                    scheme={ANSWER_SCHEMES[i % ANSWER_SCHEMES.length]} state={state} disabled={g.isAnswered}
                    onClick={() => { setEaten(true); g.handleSelect(opt); }} />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
