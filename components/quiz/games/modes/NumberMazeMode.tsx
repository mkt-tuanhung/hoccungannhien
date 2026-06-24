"use client";
import { assetUrl } from "@/lib/assets";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useGameMode } from "@/lib/hooks/useGameMode";
import { useModeExtras } from "@/lib/hooks/useModeExtras";
import { celebrate } from "@/lib/confetti";
import { GameModeProps } from "../BaseGameShell";
import GardenScene from "../ui/GardenScene";
import ModeHeader from "../ui/ModeHeader";
import GlossySprite from "../ui/GlossySprite";

interface Props extends GameModeProps { bg?: string; objects?: string[]; }

// MÊ CUNG SỐ: lưới 3x3, ô tường + ô số. Chuột chạy tới ô đáp án đúng.
export default function NumberMazeMode({ question, onAnswer, bg, objects }: Props) {
  const g = useGameMode(question, onAnswer);
  const { displayPrompt, speak } = useModeExtras(g, question);
  const [petCell, setPetCell] = useState(0);
  const fired = useRef(false);

  const layout = useMemo(() => {
    const cells: ({ opt: any } | { wall: true })[] = Array(9).fill(null).map(() => ({ wall: true as const }));
    let seed = 0; for (const c of question.id) seed = (seed * 31 + c.charCodeAt(0)) | 0;
    const pos = [0,1,2,3,4,5,6,7,8].sort(() => ((seed = (seed * 9301 + 49297) % 233280) / 233280) - 0.5);
    g.options.slice(0, 4).forEach((opt, i) => { cells[pos[i]] = { opt }; });
    return cells;
  }, [question.id, g.options]);

  useEffect(() => { setPetCell(0); fired.current = false; }, [question.id]);
  useEffect(() => { if (g.isCorrect && !fired.current) { fired.current = true; celebrate(); } }, [g.isCorrect]);

  const cellPos = (idx: number) => ({ left: `${(idx % 3) * 33.33 + 16.6}%`, top: `${Math.floor(idx / 3) * 33.33 + 16.6}%` });

  return (
    <div className="relative w-full min-h-[100dvh] overflow-hidden">
      <GardenScene src={bg} />
      <div className="relative z-10 flex flex-col min-h-[100dvh] px-4 pt-16 pb-6 max-w-xl mx-auto">
        <ModeHeader g={g} displayPrompt={displayPrompt} speak={speak} objects={objects} hint="🐭 Chạm ô có đáp án đúng để chuột chạy tới" />

        <div className="flex-1 flex items-center justify-center">
          <div className="relative rounded-3xl p-2" style={{ width: 320, height: 320, background: "rgba(90,70,50,0.35)", boxShadow: "inset 0 0 24px rgba(0,0,0,0.3)" }}>
            <div className="grid grid-cols-3 grid-rows-3 gap-2 w-full h-full">
              {layout.map((cell, i) => (
                "wall" in cell ? (
                  <div key={i} className="rounded-2xl flex items-center justify-center" style={{ background: "rgba(60,45,35,0.55)", boxShadow: "inset 0 2px 6px rgba(0,0,0,0.4)" }}>
                    <GlossySprite src=assetUrl('/sprites/magnifier.png') size={48} />
                  </div>
                ) : (
                  <motion.button key={i} onClick={() => { if (!g.isAnswered) { setPetCell(i); g.handleSelect(cell.opt); } }}
                    disabled={g.isAnswered} whileTap={{ scale: 0.9 }}
                    animate={g.isAnswered && String(cell.opt) === String(g.correctAnswer) ? { scale: [1, 1.1, 1] } : g.isAnswered && String(cell.opt) === String(g.selectedOption) ? { x: [0, -6, 6, 0] } : {}}
                    className="rounded-2xl flex items-center justify-center font-black text-3xl"
                    style={{
                      color: "#fff", fontFamily: "'Mochiy Pop One', system-ui",
                      background: g.isAnswered && String(cell.opt) === String(g.correctAnswer)
                        ? "linear-gradient(180deg,#8fe0a3,#6FD08C)"
                        : g.isAnswered && String(cell.opt) === String(g.selectedOption)
                        ? "linear-gradient(180deg,#ffa98f,#FF7A5C)"
                        : "linear-gradient(180deg,rgba(255,255,255,0.55),rgba(255,255,255,0.25))",
                      boxShadow: "0 4px 0 rgba(0,0,0,0.2), inset 0 2px 4px rgba(255,255,255,0.5)",
                      border: "2px solid rgba(255,255,255,0.7)",
                    }}>
                    {cell.opt}
                  </motion.button>
                )
              ))}
            </div>
            {/* Chuột chạy */}
            <motion.div className="absolute z-20 pointer-events-none" style={{ transform: "translate(-50%,-50%)" }}
              animate={cellPos(petCell)} transition={{ type: "spring", stiffness: 200, damping: 18 }}>
              <GlossySprite src=assetUrl('/sprites/mouse.png') size={56} />
            </motion.div>
            {/* Phô mai đích */}
            <div className="absolute z-10" style={{ right: 6, bottom: 6 }}>
              <GlossySprite src=assetUrl('/sprites/cheese.png') size={48} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
