"use client";
import { assetUrl } from "@/lib/assets";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameMode } from "@/lib/hooks/useGameMode";
import { useModeExtras } from "@/lib/hooks/useModeExtras";
import { GameModeProps } from "../BaseGameShell";
import GardenScene from "../ui/GardenScene";
import ModeHeader from "../ui/ModeHeader";
import GlossySprite from "../ui/GlossySprite";

interface Props extends GameModeProps { bg?: string; objects?: string[]; container?: string; }

// ĐẾM & BỎ VÀO RỔ: KHÔNG có đáp án trắc nghiệm. Bé tự chạm để bỏ ĐÚNG số lượng vật vào rổ rồi bấm "Xong".
// Đáp án được TẠO RA bằng hành động (đếm), không phải chọn.
export default function DragCountMode({ question, onAnswer, bg, objects, container = assetUrl('/sprites/basket.png') }: Props) {
  const g = useGameMode(question, onAnswer);
  const { displayPrompt, speak } = useModeExtras(g, question);
  const icon = objects?.length ? objects[0] : g.objectIcon || assetUrl('/sprites/apple.png');
  const answer = Number(g.correctAnswer) || 0;
  const [inJar, setInJar] = useState(0);
  const [trayTotal, setTrayTotal] = useState(0);

  useEffect(() => { setInJar(0); setTrayTotal(Math.min(20, answer + 4)); }, [question.id, answer]);

  const add = () => { if (!g.isAnswered && inJar < trayTotal) setInJar((n) => n + 1); };
  const remove = () => { if (!g.isAnswered && inJar > 0) setInJar((n) => n - 1); };
  const done = () => { if (!g.isAnswered) g.handleSelect(inJar); };

  return (
    <div className="relative w-full min-h-[100dvh] overflow-hidden">
      <GardenScene src={bg} />
      <div className="relative z-10 flex flex-col min-h-[100dvh] px-4 pt-16 pb-6 max-w-xl mx-auto">
        <ModeHeader g={g} displayPrompt={displayPrompt} speak={speak} objects={objects} hint="👆 Chạm để bỏ đúng số lượng vào rổ, rồi bấm Xong" />

        {/* Khay vật (chạm để bỏ vào rổ) */}
        <p className="text-center text-white/90 font-bold text-xs mb-1" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.4)" }}>Khay đồ vật — chạm để nhặt</p>
        <div className="rounded-3xl px-3 py-3 mb-3 flex flex-wrap justify-center gap-2" style={{ background: "rgba(255,255,255,0.35)", backdropFilter: "blur(6px)", border: "2px solid rgba(255,255,255,0.5)", minHeight: 70 }}>
          {Array.from({ length: trayTotal }).map((_, i) => (
            <motion.button key={i} onClick={add} disabled={g.isAnswered || i >= trayTotal - inJar} whileTap={{ scale: 0.8 }}
              animate={{ opacity: i >= trayTotal - inJar ? 0.15 : 1, scale: i >= trayTotal - inJar ? 0.7 : 1 }}
              className="active:scale-90">
              <GlossySprite src={icon} size={48} />
            </motion.button>
          ))}
        </div>

        <div className="flex-1 flex flex-col items-center justify-center">
          {/* Rổ + số đếm */}
          <div className="relative" onClick={remove}>
            <GlossySprite src={container} size={160} />
            <div className="absolute inset-x-0 top-6 flex flex-wrap justify-center gap-1 px-6">
              {Array.from({ length: inJar }).map((_, i) => (
                <motion.div key={i} initial={{ y: -40, scale: 0 }} animate={{ y: 0, scale: 1 }}>
                <GlossySprite src={icon} size={32} />
              </motion.div>
              ))}
            </div>
            <div className="absolute -top-3 -right-2 bg-white rounded-full w-12 h-12 flex items-center justify-center font-black text-2xl text-pink-500 shadow-lg border-2 border-pink-200" style={{ fontFamily: "'Mochiy Pop One', system-ui" }}>{inJar}</div>
          </div>
          <p className="text-white/80 text-xs mt-1" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.4)" }}>(Chạm vào rổ để bớt 1)</p>
        </div>

        {/* Nút Xong */}
        <motion.button onClick={done} disabled={g.isAnswered} whileTap={{ y: 6 }}
          className="w-full rounded-[24px] py-4 font-black text-2xl text-white"
          style={{ background: g.isAnswered ? "#bbb" : "#6FD08C", boxShadow: g.isAnswered ? "none" : "0 7px 0 #4FB571", fontFamily: "'Mochiy Pop One', system-ui" }}>
          {g.isAnswered ? (g.isCorrect ? "Giỏi quá! 🎉" : `Chưa đúng (bé bỏ ${inJar})`) : "Xong ✓"}
        </motion.button>
      </div>
    </div>
  );
}
