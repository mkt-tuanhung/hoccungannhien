"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useGameMode } from "@/lib/hooks/useGameMode";
import { useModeExtras } from "@/lib/hooks/useModeExtras";
import { PALETTE, ANSWER_SCHEMES } from "@/lib/design/palette";
import { GameModeProps } from "../BaseGameShell";
import GardenScene from "../ui/GardenScene";
import ModeHeader from "../ui/ModeHeader";
import AnswerButton from "../ui/AnswerButton";

interface Props extends GameModeProps { bg?: string; objects?: string[]; }

// CÂN THẦN KỲ: một đĩa cân có số cho trước, đĩa kia rỗng. Bé chọn quả cân đúng để cân bằng.
export default function BalanceScaleMode({ question, onAnswer, bg, objects }: Props) {
  const g = useGameMode(question, onAnswer);
  const { displayPrompt, speak } = useModeExtras(g, question);
  const [selected, setSelected] = useState<any>(null);

  const leftVal = g.targetCount || Number(g.correctAnswer) || 0;
  const rightVal = selected !== null ? Number(selected) : null;
  const balanced = rightVal !== null && rightVal === Number(g.correctAnswer);
  const tilt = rightVal === null ? 0 : rightVal > leftVal ? -12 : rightVal < leftVal ? 12 : 0;

  const handlePick = (opt: any) => {
    if (g.isAnswered) return;
    setSelected(opt);
    setTimeout(() => g.handleSelect(opt), 500);
  };

  return (
    <div className="relative w-full min-h-[100dvh] overflow-hidden">
      <GardenScene src={bg} />
      <div className="relative z-10 flex flex-col min-h-[100dvh] px-4 pt-16 pb-6 max-w-xl mx-auto">
        <ModeHeader g={g} displayPrompt={displayPrompt} speak={speak} objects={objects} hint="⚖️ Chọn quả cân đúng để cân thăng bằng" />

        <div className="flex-1 flex flex-col items-center justify-center gap-8">
          {/* Cân */}
          <div className="relative flex flex-col items-center" style={{ width: 300 }}>
            {/* Trụ cân */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2" style={{ width: 12, height: 160, background: "linear-gradient(180deg,#c8915a,#8a5a30)", borderRadius: 6 }} />
            <div style={{ width: 60, height: 18, background: "#8a5a30", borderRadius: 6, position: "absolute", bottom: 0 }} />

            {/* Đòn cân xoay */}
            <motion.div animate={{ rotate: tilt }} transition={{ type: "spring", stiffness: 120, damping: 14 }}
              className="relative flex items-center justify-between"
              style={{ width: 280, height: 8, background: "linear-gradient(90deg,#c8915a,#b07a45,#c8915a)", borderRadius: 4, marginBottom: 90 }}>

              {/* Đĩa trái — số đã cho */}
              <div className="absolute -left-2 flex flex-col items-center" style={{ top: 0 }}>
                <div style={{ width: 1, height: 40, background: "rgba(200,145,90,0.7)" }} />
                <div className="flex items-center justify-center font-black text-white rounded-full"
                  style={{ width: 80, height: 80, fontSize: "2rem", fontFamily: "'Mochiy Pop One', system-ui",
                    background: "linear-gradient(180deg,#7CC9F0,#54A8D8)",
                    boxShadow: "0 6px 0 #3A88B8, inset 0 2px 4px rgba(255,255,255,0.5)",
                    border: "3px solid rgba(255,255,255,0.7)" }}>
                  {leftVal}
                </div>
              </div>

              {/* Đĩa phải — quả cân bé chọn */}
              <div className="absolute -right-2 flex flex-col items-center" style={{ top: 0 }}>
                <div style={{ width: 1, height: 40, background: "rgba(200,145,90,0.7)" }} />
                <motion.div className="flex items-center justify-center font-black text-white rounded-full"
                  animate={balanced ? { scale: [1, 1.15, 1] } : {}}
                  style={{ width: 80, height: 80, fontSize: "2rem", fontFamily: "'Mochiy Pop One', system-ui",
                    background: rightVal === null ? "rgba(255,255,255,0.25)"
                      : balanced ? "linear-gradient(180deg,#6FD08C,#4FB571)"
                      : "linear-gradient(180deg,#FFCF5C,#E8A020)",
                    boxShadow: rightVal === null ? "none" : balanced ? "0 6px 0 #3A9A5C, inset 0 2px 4px rgba(255,255,255,0.5)" : "0 6px 0 #C07A10",
                    border: "3px solid rgba(255,255,255,0.7)" }}>
                  {rightVal !== null ? rightVal : "?"}
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Feedback */}
          {g.isAnswered && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
              className="px-8 py-3 rounded-3xl font-black text-xl"
              style={{ background: g.isCorrect ? "#6FD08C" : "#FFCF5C", color: g.isCorrect ? "#fff" : "#7A560F",
                fontFamily: "'Mochiy Pop One', system-ui" }}>
              {g.isCorrect ? "Thăng bằng! ⚖️🎉" : `Đáp án là ${g.correctAnswer}`}
            </motion.div>
          )}

          {/* Các quả cân */}
          {!g.isAnswered && (
            <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
              {g.options.slice(0, 4).map((opt, i) => {
                const state = !g.isAnswered ? "idle" : String(opt) === String(g.correctAnswer) ? "correct" : String(opt) === String(g.selectedOption) ? "wrong" : "dimmed";
                return <AnswerButton key={i} label={`⚖️ ${opt}`} scheme={ANSWER_SCHEMES[i % ANSWER_SCHEMES.length]} state={state} disabled={g.isAnswered} onClick={() => handlePick(opt)} />;
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
