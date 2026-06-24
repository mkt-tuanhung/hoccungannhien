"use client";
import { assetUrl } from "@/lib/assets";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useGameMode } from "@/lib/hooks/useGameMode";
import { useModeExtras } from "@/lib/hooks/useModeExtras";
import { GameModeProps } from "../BaseGameShell";
import GardenScene from "../ui/GardenScene";
import ModeHeader from "../ui/ModeHeader";

interface Props extends GameModeProps { bg?: string; objects?: string[]; }

// NHẢY Ô SỐ: KHÔNG chọn đáp án. Bé bấm nhảy để đưa ếch tới đúng ô số rồi bấm Xong.
// Cộng: ếch xuất phát ở a, nhảy thêm b bước. Trừ: lùi b bước. Đếm: nhảy từ 0.
export default function NumberLineHopMode({ question, onAnswer, bg }: Props) {
  const g = useGameMode(question, onAnswer);
  const { displayPrompt, speak } = useModeExtras(g, question);
  const a = Number(g.targetCount) || 0;
  const b = Number(g.targetCount2) || 0;
  const answer = Number(g.correctAnswer) || 0;
  const isOp = g.renderMode === "addition" || g.renderMode === "subtraction";
  const start = isOp ? a : 0;
  const max = Math.max(10, a + b, answer);
  const [pos, setPos] = useState(start);

  useEffect(() => { setPos(start); }, [question.id, start]);

  const hop = (d: number) => { if (!g.isAnswered) setPos((p) => Math.max(0, Math.min(max, p + d))); };
  const done = () => { if (!g.isAnswered) g.handleSelect(pos); };

  const hint = g.renderMode === "addition" ? `🐸 Ếch ở ${a}, nhảy thêm ${b} bước rồi bấm Xong`
    : g.renderMode === "subtraction" ? `🐸 Ếch ở ${a}, nhảy lùi ${b} bước rồi bấm Xong`
    : "🐸 Đưa ếch tới ô số đúng rồi bấm Xong";

  return (
    <div className="relative w-full min-h-[100dvh] overflow-hidden">
      <GardenScene src={bg} />
      <div className="relative z-10 flex flex-col min-h-[100dvh] px-4 pt-16 pb-6 max-w-xl mx-auto">
        <ModeHeader g={g} displayPrompt={displayPrompt} speak={speak} hint={hint} />

        <div className="flex-1 flex flex-col items-center justify-center gap-8">
          {/* Trục số */}
          <div className="relative w-full pt-12 pb-2">
            <div className="absolute left-0 right-0 top-[64px] h-1.5 bg-white/70 rounded-full" />
            <div className="flex justify-between relative">
              {Array.from({ length: max + 1 }).map((_, n) => (
                <div key={n} className="flex flex-col items-center" style={{ flex: 1, minWidth: 0 }}>
                  <motion.div className="absolute" style={{ top: 0, left: `${(n / max) * 100}%`, transform: "translateX(-50%)" }}
                    animate={pos === n ? { y: [0, -10, 0] } : {}} transition={{ duration: 0.4 }}>
                    {pos === n && <img src=assetUrl('/sprites/frog.png') alt="" className="w-9 h-9 object-contain drop-shadow" />}
                  </motion.div>
                  <div className={`rounded-full flex items-center justify-center font-black ${pos === n ? "bg-green-400 text-white" : "bg-white/80 text-[#5A4A6A]"}`}
                    style={{ width: max > 12 ? 18 : 26, height: max > 12 ? 18 : 26, fontSize: max > 12 ? "0.7rem" : "0.9rem" }}>{n}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Nút nhảy */}
          <div className="flex items-center gap-4">
            <motion.button onClick={() => hop(-1)} disabled={g.isAnswered} whileTap={{ scale: 0.9 }}
              className="w-16 h-16 rounded-full bg-white text-3xl font-black text-pink-500 shadow-lg active:translate-y-1">◀</motion.button>
            <div className="bg-white rounded-2xl px-5 py-2 font-black text-3xl text-[#5A4A6A] shadow" style={{ fontFamily: "'Mochiy Pop One', system-ui" }}>{pos}</div>
            <motion.button onClick={() => hop(1)} disabled={g.isAnswered} whileTap={{ scale: 0.9 }}
              className="w-16 h-16 rounded-full bg-white text-3xl font-black text-green-500 shadow-lg active:translate-y-1">▶</motion.button>
          </div>
        </div>

        <motion.button onClick={done} disabled={g.isAnswered} whileTap={{ y: 6 }}
          className="w-full rounded-[24px] py-4 font-black text-2xl text-white"
          style={{ background: g.isAnswered ? "#bbb" : "#6FD08C", boxShadow: g.isAnswered ? "none" : "0 7px 0 #4FB571", fontFamily: "'Mochiy Pop One', system-ui" }}>
          {g.isAnswered ? (g.isCorrect ? "Giỏi quá! 🎉" : `Chưa đúng (ếch ở ${pos})`) : "Xong ✓"}
        </motion.button>
      </div>
    </div>
  );
}
