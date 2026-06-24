"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useGameMode } from "@/lib/hooks/useGameMode";
import { useModeExtras } from "@/lib/hooks/useModeExtras";
import { PALETTE, ANSWER_SCHEMES } from "@/lib/design/palette";
import { GameModeProps } from "../BaseGameShell";
import GardenScene from "../ui/GardenScene";
import ModeHeader from "../ui/ModeHeader";

interface Props extends GameModeProps { bg?: string; objects?: string[]; }

// GHÉP TRANH: 4 mảnh puzzle rơi xuống, chạm mảnh có đáp án đúng → tranh hoàn chỉnh.
export default function JigsawDropMode({ question, onAnswer, bg, objects }: Props) {
  const g = useGameMode(question, onAnswer);
  const { displayPrompt, speak } = useModeExtras(g, question);
  const [placed, setPlaced] = useState<number | null>(null);

  // 4 mảnh puzzle — mỗi mảnh 1 góc của bức tranh
  const PIECE_POS = [
    { clipPath: "polygon(0 0, 50% 0, 48% 52%, 0 50%)", x: "0%", y: "0%" },
    { clipPath: "polygon(50% 0, 100% 0, 100% 50%, 52% 52%)", x: "50%", y: "0%" },
    { clipPath: "polygon(0 50%, 48% 52%, 50% 100%, 0 100%)", x: "0%", y: "50%" },
    { clipPath: "polygon(52% 52%, 100% 50%, 100% 100%, 50% 100%)", x: "50%", y: "50%" },
  ];

  const handlePick = (opt: any, i: number) => {
    if (g.isAnswered) return;
    setPlaced(i);
    setTimeout(() => g.handleSelect(opt), 600);
  };

  return (
    <div className="relative w-full min-h-[100dvh] overflow-hidden">
      <GardenScene src={bg} />
      <div className="relative z-10 flex flex-col min-h-[100dvh] px-4 pt-16 pb-6 max-w-xl mx-auto">
        <ModeHeader g={g} displayPrompt={displayPrompt} speak={speak} objects={objects} hint="🧩 Chạm mảnh ghép có đáp án đúng để hoàn thành tranh" />

        <div className="flex-1 flex flex-col items-center justify-center gap-6">
          {/* Khung tranh */}
          <div className="relative rounded-3xl overflow-hidden" style={{ width: 220, height: 220, background: "rgba(255,255,255,0.2)", border: "3px dashed rgba(255,255,255,0.5)" }}>
            {g.isAnswered && g.isCorrect && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-0 w-full h-full">
                  {PIECE_POS.map((_, i) => (
                    <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
                      className="flex items-center justify-center font-black text-white"
                      style={{ background: Object.values(PALETTE)[i % 5]?.face, fontSize: "1.6rem", fontFamily: "'Mochiy Pop One', system-ui" }}>
                      {i === 0 ? "🌟" : i === 1 ? "🎨" : i === 2 ? "🎪" : "🎉"}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
            {!g.isAnswered && (
              <div className="absolute inset-0 flex items-center justify-center text-white/40 text-5xl">
                🧩
              </div>
            )}
          </div>

          {g.isAnswered && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="px-8 py-3 rounded-3xl font-black text-xl"
              style={{ background: g.isCorrect ? "#6FD08C" : "#FFCF5C", color: g.isCorrect ? "#fff" : "#7A560F", fontFamily: "'Mochiy Pop One', system-ui" }}>
              {g.isCorrect ? "Tranh hoàn chỉnh! 🎉" : `Đáp án là ${g.correctAnswer}`}
            </motion.div>
          )}

          {/* Các mảnh ghép rơi */}
          {!g.isAnswered && (
            <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
              {g.options.slice(0, 4).map((opt, i) => {
                const c = PALETTE[ANSWER_SCHEMES[i % ANSWER_SCHEMES.length]];
                const isPlaced = placed === i;
                return (
                  <motion.button key={i} onClick={() => handlePick(opt, i)}
                    disabled={g.isAnswered} whileTap={{ scale: 0.9 }}
                    animate={isPlaced ? { y: -80, scale: 0.5, opacity: 0 } : { y: [0, -8, 0] }}
                    transition={isPlaced ? { duration: 0.4 } : { repeat: Infinity, duration: 2.2 + i * 0.3 }}
                    className="relative overflow-hidden flex items-center justify-center font-black"
                    style={{ height: 88, borderRadius: 18, color: "#fff", fontSize: "2rem",
                      fontFamily: "'Mochiy Pop One', system-ui",
                      background: `linear-gradient(135deg, ${c.face} 0%, ${c.face} 50%, ${c.lip} 100%)`,
                      boxShadow: `4px 4px 0 ${c.lip}, inset 0 2px 4px rgba(255,255,255,0.5)`,
                      border: "3px solid rgba(255,255,255,0.7)",
                      clipPath: i === 0 ? "polygon(0 0, 85% 0, 100% 85%, 85% 100%, 0 100%)"
                        : i === 1 ? "polygon(15% 0, 100% 0, 100% 100%, 15% 100%, 0 85%)"
                        : i === 2 ? "polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)"
                        : "polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 15%)" }}>
                    <div className="absolute left-2 right-2 pointer-events-none"
                      style={{ top: 4, height: "40%", borderRadius: 10, background: "linear-gradient(180deg,rgba(255,255,255,0.55),rgba(255,255,255,0.02))" }} />
                    <span className="relative z-10">{opt}</span>
                  </motion.button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
