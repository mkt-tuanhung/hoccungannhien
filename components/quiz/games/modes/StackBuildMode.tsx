"use client";

import { motion } from "framer-motion";
import { useGameMode } from "@/lib/hooks/useGameMode";
import { useModeExtras } from "@/lib/hooks/useModeExtras";
import { ANSWER_SCHEMES } from "@/lib/design/palette";
import { GameModeProps } from "../BaseGameShell";
import GardenScene from "../ui/GardenScene";
import ModeHeader from "../ui/ModeHeader";
import AnswerButton from "../ui/AnswerButton";
import GlossySprite from "../ui/GlossySprite";

interface Props extends GameModeProps { bg?: string; objects?: string[]; top?: string; hint?: string; }

// XÂY DỰNG (lâu đài/thành phố): 4 viên gạch số ở dưới, chạm gạch đúng → bay lên đặt vào công trình.
export default function StackBuildMode({ question, onAnswer, bg, objects, top = "🏰", hint = "🧱 Chạm viên gạch có đáp án đúng để xây" }: Props) {
  const g = useGameMode(question, onAnswer);
  const { displayPrompt, speak } = useModeExtras(g, question);

  return (
    <div className="relative w-full min-h-[100dvh] overflow-hidden">
      <GardenScene src={bg} />
      <div className="relative z-10 flex flex-col min-h-[100dvh] px-4 pt-16 pb-6 max-w-xl mx-auto">
        <ModeHeader g={g} displayPrompt={displayPrompt} speak={speak} objects={objects} hint={hint} />
        <div className="flex-1 flex flex-col items-center justify-between py-3">
          {top.startsWith("/") ? (
            <GlossySprite src={top} size={200}
              animate={g.isAnswered && g.isCorrect ? { scale: [1, 1.2, 1], y: [0, -10, 0] } : { y: [0, -6, 0] }}
              transition={g.isAnswered ? { duration: 0.6 } : { repeat: Infinity, duration: 2.4 }} />
          ) : (
            <motion.span className="text-8xl" animate={g.isAnswered && g.isCorrect ? { scale: [1, 1.2, 1] } : { y: [0, -6, 0] }} transition={{ repeat: g.isAnswered ? 0 : Infinity, duration: 2.4 }}>{top}</motion.span>
          )}
          <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
            {g.options.slice(0, 4).map((opt, i) => {
              const flying = g.isAnswered && String(opt) === String(g.selectedOption) && g.isCorrect;
              const state = !g.isAnswered ? "idle" : String(opt) === String(g.correctAnswer) ? (g.isCorrect ? "correct" : "reveal") : String(opt) === String(g.selectedOption) ? "wrong" : "dimmed";
              return (
                <motion.div key={i} animate={flying ? { y: -240, opacity: 0, scale: 0.4 } : {}}>
                  <AnswerButton label={opt} scheme={ANSWER_SCHEMES[i % ANSWER_SCHEMES.length]} state={state} disabled={g.isAnswered} onClick={() => g.handleSelect(opt)} />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
