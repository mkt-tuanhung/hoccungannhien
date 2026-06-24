"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useGameMode } from "@/lib/hooks/useGameMode";
import { useModeExtras } from "@/lib/hooks/useModeExtras";
import { ANSWER_SCHEMES } from "@/lib/design/palette";
import { GameModeProps } from "../BaseGameShell";
import GardenScene from "../ui/GardenScene";
import ModeHeader from "../ui/ModeHeader";
import AnswerButton from "../ui/AnswerButton";

interface Props extends GameModeProps { bg?: string; objects?: string[]; }

// NHIỆM VỤ BỐ MẸ GIAO: cuộn giấy mở ra, trả lời đúng → đóng dấu ✅.
export default function MissionCardMode({ question, onAnswer, bg, objects }: Props) {
  const g = useGameMode(question, onAnswer);
  const { displayPrompt, speak } = useModeExtras(g, question);
  const [stamped, setStamped] = useState(false);

  const handleAnswer = (opt: any) => {
    if (g.isAnswered) return;
    g.handleSelect(opt);
    if (String(opt) === String(g.correctAnswer)) {
      setTimeout(() => setStamped(true), 300);
    }
  };

  return (
    <div className="relative w-full min-h-[100dvh] overflow-hidden">
      <GardenScene src={bg} />
      <div className="relative z-10 flex flex-col min-h-[100dvh] px-4 pt-16 pb-6 max-w-xl mx-auto">
        <ModeHeader g={g} displayPrompt={displayPrompt} speak={speak} objects={objects} hint="📜 Bố mẹ giao nhiệm vụ — trả lời đúng nhận con dấu!" />

        <div className="flex-1 flex flex-col items-center justify-center gap-5">
          {/* Cuộn giấy nhiệm vụ */}
          <motion.div initial={{ scaleY: 0.3, opacity: 0 }} animate={{ scaleY: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 180, damping: 18 }}
            className="w-full max-w-sm relative"
            style={{ background: "linear-gradient(180deg,#fffdf0,#fdf6d8)", borderRadius: 16, border: "3px solid #d4b57a", boxShadow: "0 8px 24px rgba(120,80,30,0.2), inset 0 2px 6px rgba(255,255,255,0.8)" }}>
            {/* Cuộn trên */}
            <div className="absolute -top-4 left-0 right-0 h-8 rounded-t-2xl" style={{ background: "linear-gradient(180deg,#c8915a,#b07a45)", boxShadow: "0 3px 0 #8a5a30" }} />
            {/* Cuộn dưới */}
            <div className="absolute -bottom-4 left-0 right-0 h-8 rounded-b-2xl" style={{ background: "linear-gradient(180deg,#b07a45,#8a5a30)", boxShadow: "0 3px 0 #6a3a18" }} />

            <div className="px-6 py-8 mt-1">
              <p className="text-center font-black text-amber-800 text-sm mb-2" style={{ fontFamily: "'Mochiy Pop One', system-ui" }}>📋 NHIỆM VỤ HÔM NAY</p>
              <div className="border-t border-amber-300 pt-3 pb-3">
                <p className="text-center font-black text-amber-900 text-2xl" style={{ fontFamily: "'Mochiy Pop One', system-ui" }}>{displayPrompt}</p>
              </div>
              <div className="border-t border-amber-300 pt-3 flex items-center justify-between">
                <span className="text-amber-600 text-xs font-bold">Bé An Nhiên ✍️</span>
                {/* Con dấu */}
                {stamped ? (
                  <motion.div initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: -8 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="flex items-center justify-center font-black text-green-700 rounded-full"
                    style={{ width: 56, height: 56, border: "3px solid #16a34a", color: "#16a34a", fontSize: "1.8rem", opacity: 0.85 }}>
                    ✅
                  </motion.div>
                ) : (
                  <div className="rounded-full flex items-center justify-center"
                    style={{ width: 56, height: 56, border: "3px dashed #d4b57a", color: "#d4b57a" }}>
                    ?
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {g.isAnswered && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="px-8 py-3 rounded-3xl font-black text-xl"
              style={{ background: g.isCorrect ? "#6FD08C" : "#FFCF5C", color: g.isCorrect ? "#fff" : "#7A560F", fontFamily: "'Mochiy Pop One', system-ui" }}>
              {g.isCorrect ? "Hoàn thành nhiệm vụ! 🏅" : `Đáp án là ${g.correctAnswer}`}
            </motion.div>
          )}
        </div>

        {!g.isAnswered && (
          <div className="grid grid-cols-2 gap-4">
            {g.options.slice(0, 4).map((opt, i) => {
              const state = !g.isAnswered ? "idle" : String(opt) === String(g.correctAnswer) ? "correct" : String(opt) === String(g.selectedOption) ? "wrong" : "dimmed";
              return <AnswerButton key={i} label={opt} scheme={ANSWER_SCHEMES[i % ANSWER_SCHEMES.length]} state={state} disabled={g.isAnswered} onClick={() => handleAnswer(opt)} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
}
