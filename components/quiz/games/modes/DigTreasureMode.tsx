"use client";
import { assetUrl } from "@/lib/assets";

import { motion } from "framer-motion";
import { useGameMode } from "@/lib/hooks/useGameMode";
import { useModeExtras } from "@/lib/hooks/useModeExtras";
import { PALETTE, ANSWER_SCHEMES } from "@/lib/design/palette";
import { GameModeProps } from "../BaseGameShell";
import GardenScene from "../ui/GardenScene";
import ModeHeader from "../ui/ModeHeader";
import GlossySprite from "../ui/GlossySprite";

interface Props extends GameModeProps { bg?: string; objects?: string[]; }

// ĐÀO KHO BÁU: 4 ụ cát cắm cờ số, chạm ụ đáp án đúng → đào lên kho báu 💎; sai → hòn đá.
export default function DigTreasureMode({ question, onAnswer, bg, objects }: Props) {
  const g = useGameMode(question, onAnswer);
  const { displayPrompt, speak } = useModeExtras(g, question);

  return (
    <div className="relative w-full min-h-[100dvh] overflow-hidden">
      <GardenScene src={bg} />
      <div className="relative z-10 flex flex-col min-h-[100dvh] px-4 pt-16 pb-6 max-w-xl mx-auto">
        <ModeHeader g={g} displayPrompt={displayPrompt} speak={speak} objects={objects} hint="⛏️ Chạm ụ cát có đáp án đúng để đào kho báu" />
        <div className="flex-1 grid grid-cols-2 gap-4 content-center pb-6">
          {g.options.slice(0, 4).map((opt, i) => {
            const isAns = g.isAnswered && String(opt) === String(g.correctAnswer);
            const isSel = g.isAnswered && String(opt) === String(g.selectedOption);
            const face = isAns ? PALETTE.mint : isSel ? PALETTE.coral : PALETTE[ANSWER_SCHEMES[i % ANSWER_SCHEMES.length]];
            return (
              <motion.button key={i} onClick={() => g.handleSelect(opt)} disabled={g.isAnswered} whileTap={{ scale: 0.93 }}
                animate={isAns ? { scale: [1, 1.12, 1] } : isSel ? { x: [0, -7, 7, 0] } : {}}
                transition={{ duration: 0.5 }}
                className="relative flex flex-col items-center justify-end" style={{ height: 130 }}>
                {/* Reveal: gem hoặc đá */}
                {g.isAnswered && (
                  <motion.div initial={{ scale: 0, y: 20 }} animate={{ scale: 1, y: 0 }} className="absolute top-0">
                    <GlossySprite src={isAns ? assetUrl('/sprites/diamond.png') : assetUrl('/sprites/star.png')} size={56} />
                  </motion.div>
                )}
                {/* Ụ cát */}
                <div className="w-full flex items-center justify-center font-black"
                  style={{ height: 82, borderRadius: "50% 50% 16px 16px", color: "#fff", fontSize: "2rem",
                    fontFamily: "'Mochiy Pop One', system-ui",
                    background: `linear-gradient(180deg, ${face.face}, ${face.lip})`,
                    boxShadow: `0 5px 0 ${face.lip}`, border: "3px solid rgba(255,255,255,0.65)" }}>
                  {!g.isAnswered && (
                    <>
                      <span className="absolute" style={{ top: 6, fontSize: 20 }}>🚩</span>
                      {opt}
                    </>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
