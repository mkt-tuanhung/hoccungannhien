"use client";
import { assetUrl } from "@/lib/assets";

import { motion } from "framer-motion";
import { useGameMode } from "@/lib/hooks/useGameMode";
import { useModeExtras } from "@/lib/hooks/useModeExtras";
import { ANSWER_SCHEMES, PALETTE } from "@/lib/design/palette";
import { GameModeProps } from "../BaseGameShell";
import GardenScene from "../ui/GardenScene";
import ModeHeader from "../ui/ModeHeader";
import GlossySprite from "../ui/GlossySprite";
import AnswerButton from "../ui/AnswerButton";

interface Props extends GameModeProps { bg?: string; objects?: string[]; }

// NỐI TOA TÀU: đầu tàu chờ toa, chạm toa mang đáp án đúng → toa ghép vào tàu & tàu chạy.
export default function TrainCarMode({ question, onAnswer, bg, objects }: Props) {
  const g = useGameMode(question, onAnswer);
  const { displayPrompt, speak } = useModeExtras(g, question);
  const coupled = g.isAnswered && g.isCorrect;

  return (
    <div className="relative w-full min-h-[100dvh] overflow-hidden">
      <GardenScene src={bg} />
      <div className="relative z-10 flex flex-col min-h-[100dvh] px-4 pt-16 pb-6 max-w-xl mx-auto">
        <ModeHeader g={g} displayPrompt={displayPrompt} speak={speak} objects={objects} hint="🚂 Chạm toa tàu có đáp án đúng để nối vào tàu" />
        <div className="flex-1 flex flex-col items-center justify-center gap-6">
          {/* Đầu tàu + toa đã nối */}
          <motion.div className="flex items-center gap-2" animate={coupled ? { x: [0, 14, -6, 0] } : {}} transition={{ duration: 0.6 }}>
            <GlossySprite src=assetUrl('/sprites/trainengine.png') size={120} animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 1.8 }} />
            {coupled && (
              <motion.div initial={{ scale: 0, x: -30 }} animate={{ scale: 1, x: 0 }}>
                <GlossySprite src=assetUrl('/sprites/traincar.png') size={96} />
              </motion.div>
            )}
          </motion.div>

          {/* Ray tàu */}
          <div style={{ height: 8, width: "90%", borderRadius: 4, background: "repeating-linear-gradient(90deg,#7a5a3a 0 14px,#a98c63 14px 22px)" }} />

          {/* Các toa chờ ghép */}
          {!coupled && (
            <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
              {g.options.slice(0, 4).map((opt, i) => {
                const state = !g.isAnswered ? "idle" : String(opt) === String(g.correctAnswer) ? (g.isCorrect ? "correct" : "reveal") : String(opt) === String(g.selectedOption) ? "wrong" : "dimmed";
                return (
                  <div key={i} className="relative">
                    <AnswerButton label={opt} scheme={ANSWER_SCHEMES[i % ANSWER_SCHEMES.length]} state={state} disabled={g.isAnswered} onClick={() => g.handleSelect(opt)} />
                    {/* Bánh tàu */}
                    <div className="absolute -bottom-2 left-3 right-3 flex justify-between pointer-events-none">
                      <GlossySprite src=assetUrl('/sprites/gear.png') size={20} />
                      <GlossySprite src=assetUrl('/sprites/gear.png') size={20} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
