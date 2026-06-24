"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameMode } from "@/lib/hooks/useGameMode";
import { useModeExtras } from "@/lib/hooks/useModeExtras";
import { ANSWER_SCHEMES } from "@/lib/design/palette";
import { GameModeProps } from "../BaseGameShell";
import GardenScene from "../ui/GardenScene";
import ModeHeader from "../ui/ModeHeader";
import AnswerButton from "../ui/AnswerButton";
import GlossySprite from "../ui/GlossySprite";

interface Props extends GameModeProps { bg?: string; objects?: string[]; }

// THÁM TỬ SỐ: 3 manh mối xuất hiện lần lượt. Đoán sớm = nhiều sao hơn.
export default function DetectiveMode({ question, onAnswer, bg, objects }: Props) {
  const g = useGameMode(question, onAnswer);
  const { displayPrompt, speak } = useModeExtras(g, question);
  const [clueIdx, setClueIdx] = useState(0);
  const [stars, setStars] = useState(0);

  const answer = Number(g.correctAnswer);

  const clues = [
    { icon: "🔍", text: `Số cần tìm ${answer > 5 ? "lớn hơn 5" : "nhỏ hơn hoặc bằng 5"}` },
    { icon: "📌", text: `Số cần tìm ${answer % 2 === 0 ? "là số chẵn" : "là số lẻ"}` },
    { icon: "💡", text: `Gợi ý: ${displayPrompt}` },
  ];

  useEffect(() => { setClueIdx(0); }, [question.id]);

  const revealNext = () => { if (clueIdx < clues.length - 1) setClueIdx(c => c + 1); };

  const handleAnswer = (opt: any) => {
    if (g.isAnswered) return;
    const earnedStars = clueIdx === 0 ? 3 : clueIdx === 1 ? 2 : 1;
    setStars(String(opt) === String(g.correctAnswer) ? earnedStars : 0);
    g.handleSelect(opt);
  };

  return (
    <div className="relative w-full min-h-[100dvh] overflow-hidden">
      <GardenScene src={bg} />
      <div className="relative z-10 flex flex-col min-h-[100dvh] px-4 pt-16 pb-6 max-w-xl mx-auto">
        <ModeHeader g={g} displayPrompt={displayPrompt} speak={speak} objects={objects} hint="🔍 Đoán sớm sau ít manh mối → nhiều sao hơn" />

        <div className="flex-1 flex flex-col gap-4 justify-center">
          {/* Manh mối */}
          <div className="flex flex-col gap-3">
            {clues.slice(0, clueIdx + 1).map((clue, i) => (
              <motion.div key={i} initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                className="flex items-center gap-3 rounded-2xl px-4 py-3"
                style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(8px)", border: "2px solid rgba(180,155,236,0.4)" }}>
                <span style={{ fontSize: 28 }}>{clue.icon}</span>
                <p className="font-black text-[#5A4A6A]" style={{ fontFamily: "'Mochiy Pop One', system-ui", fontSize: "0.95rem" }}>{clue.text}</p>
                <div className="ml-auto bg-purple-100 text-purple-600 rounded-full px-2 py-0.5 text-xs font-black">#{i + 1}</div>
              </motion.div>
            ))}
          </div>

          {/* Nút xem thêm manh mối */}
          {clueIdx < clues.length - 1 && !g.isAnswered && (
            <motion.button onClick={revealNext} whileTap={{ scale: 0.95 }}
              className="mx-auto px-6 py-2 rounded-2xl font-black text-white text-sm"
              style={{ background: "rgba(255,255,255,0.3)", border: "2px solid rgba(255,255,255,0.7)", fontFamily: "'Mochiy Pop One', system-ui" }}>
              🔎 Xem thêm manh mối ({clues.length - 1 - clueIdx} còn lại)
            </motion.button>
          )}

          {/* Số sao có thể đạt */}
          {!g.isAnswered && (
            <div className="flex items-center justify-center gap-1">
              {[0, 1, 2].map(i => (
                <span key={i} style={{ fontSize: 28, opacity: i < (3 - clueIdx) ? 1 : 0.3 }}>⭐</span>
              ))}
              <span className="ml-2 font-black text-white text-sm" style={{ textShadow: "0 1px 3px rgba(0,0,0,0.4)" }}>đoán ngay = {3 - clueIdx} sao</span>
            </div>
          )}

          {/* Kết quả */}
          {g.isAnswered && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex flex-col items-center gap-2">
              <div className="flex gap-1">
                {[0, 1, 2].map(i => (
                  <motion.span key={i} initial={{ scale: 0 }} animate={{ scale: i < stars ? 1 : 0.6 }}
                    transition={{ delay: i * 0.15 }} style={{ fontSize: 36, opacity: i < stars ? 1 : 0.25 }}>⭐</motion.span>
                ))}
              </div>
              <div className="px-8 py-3 rounded-3xl font-black text-xl"
                style={{ background: g.isCorrect ? "#6FD08C" : "#FFCF5C", color: g.isCorrect ? "#fff" : "#7A560F", fontFamily: "'Mochiy Pop One', system-ui" }}>
                {g.isCorrect ? "Phá án thành công! 🎉" : `Đáp án là ${g.correctAnswer}`}
              </div>
            </motion.div>
          )}
        </div>

        {/* Đáp án */}
        {!g.isAnswered && (
          <div className="grid grid-cols-2 gap-4 mt-2">
            {g.options.slice(0, 4).map((opt, i) => (
              <AnswerButton key={i} label={opt} scheme={ANSWER_SCHEMES[i % ANSWER_SCHEMES.length]}
                state="idle" disabled={false} onClick={() => handleAnswer(opt)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
