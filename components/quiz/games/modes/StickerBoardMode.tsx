"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameMode } from "@/lib/hooks/useGameMode";
import { useModeExtras } from "@/lib/hooks/useModeExtras";
import { ANSWER_SCHEMES, PALETTE } from "@/lib/design/palette";
import { GameModeProps } from "../BaseGameShell";
import GardenScene from "../ui/GardenScene";
import ModeHeader from "../ui/ModeHeader";
import AnswerButton from "../ui/AnswerButton";

interface Props extends GameModeProps { bg?: string; objects?: string[]; }

const STICKERS = ["⭐", "🌟", "🦋", "🌸", "🍀", "🎀", "🌈", "🍭", "🎵"];
const GRID = 3;

// BẢNG STICKER: trả lời đúng → chọn sticker dán vào bảng. Đầy bảng = xong!
export default function StickerBoardMode({ question, onAnswer, bg, objects }: Props) {
  const g = useGameMode(question, onAnswer);
  const { displayPrompt, speak } = useModeExtras(g, question);
  const [board, setBoard] = useState<(string | null)[]>(Array(GRID * GRID).fill(null));
  const [pickingSticker, setPickingSticker] = useState(false);

  const emptySlot = board.findIndex(s => s === null);
  const boardFull = emptySlot === -1;

  const handleAnswer = (opt: any) => {
    if (g.isAnswered) return;
    g.handleSelect(opt);
    if (String(opt) === String(g.correctAnswer)) {
      setTimeout(() => setPickingSticker(true), 400);
    }
  };

  const placeSticker = (sticker: string) => {
    if (emptySlot === -1) return;
    const next = [...board];
    next[emptySlot] = sticker;
    setBoard(next);
    setPickingSticker(false);
    if (next.every(s => s !== null)) {
      setTimeout(() => onAnswer(true), 600);
    } else {
      // Tiếp tục màn chơi — nhưng câu hỏi mới sẽ load
      setTimeout(() => onAnswer(true), 300);
    }
  };

  return (
    <div className="relative w-full min-h-[100dvh] overflow-hidden">
      <GardenScene src={bg} />
      <div className="relative z-10 flex flex-col min-h-[100dvh] px-4 pt-16 pb-6 max-w-xl mx-auto">
        <ModeHeader g={g} displayPrompt={displayPrompt} speak={speak} objects={objects} hint="⭐ Trả lời đúng để nhận sticker dán vào bảng" />

        {/* Bảng sticker */}
        <div className="mx-auto mb-4 rounded-3xl p-3" style={{ background: "rgba(255,255,255,0.35)", backdropFilter: "blur(8px)", border: "2px solid rgba(255,255,255,0.6)" }}>
          <div className="grid grid-cols-3 gap-2">
            {board.map((sticker, i) => (
              <motion.div key={i} className="flex items-center justify-center rounded-2xl"
                style={{ width: 72, height: 72, background: sticker ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.25)", border: `2px dashed ${sticker ? "rgba(180,155,236,0.4)" : "rgba(255,255,255,0.5)"}` }}>
                {sticker && (
                  <motion.span initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    style={{ fontSize: 36 }}>{sticker}</motion.span>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Chọn sticker sau khi đúng */}
        <AnimatePresence>
          {pickingSticker && (
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
              className="absolute inset-x-4 z-30 rounded-3xl p-4" style={{ top: "35%", background: "rgba(255,255,255,0.95)", backdropFilter: "blur(16px)", boxShadow: "0 20px 40px rgba(80,50,100,0.3)" }}>
              <p className="text-center font-black text-[#5A4A6A] mb-3" style={{ fontFamily: "'Mochiy Pop One', system-ui" }}>🎉 Chọn sticker yêu thích!</p>
              <div className="grid grid-cols-3 gap-3">
                {STICKERS.map((s, i) => (
                  <motion.button key={i} onClick={() => placeSticker(s)} whileTap={{ scale: 0.88 }}
                    className="flex items-center justify-center rounded-2xl"
                    style={{ height: 64, fontSize: 34, background: "rgba(180,155,236,0.15)", border: "2px solid rgba(180,155,236,0.3)" }}>
                    {s}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex-1" />

        {/* Đáp án */}
        {!pickingSticker && !g.isAnswered && (
          <div className="grid grid-cols-2 gap-4">
            {g.options.slice(0, 4).map((opt, i) => (
              <AnswerButton key={i} label={opt} scheme={ANSWER_SCHEMES[i % ANSWER_SCHEMES.length]}
                state="idle" disabled={false} onClick={() => handleAnswer(opt)} />
            ))}
          </div>
        )}

        {g.isAnswered && !pickingSticker && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mx-auto px-8 py-3 rounded-3xl font-black text-xl"
            style={{ background: g.isCorrect ? "#6FD08C" : "#FFCF5C", color: g.isCorrect ? "#fff" : "#7A560F", fontFamily: "'Mochiy Pop One', system-ui" }}>
            {g.isCorrect ? "Chọn sticker đi! ⭐" : `Đáp án là ${g.correctAnswer}`}
          </motion.div>
        )}
      </div>
    </div>
  );
}
