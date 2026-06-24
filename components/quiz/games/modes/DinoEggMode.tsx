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

// TRỨNG KHỦNG LONG: 4 quả trứng mang số, chạm trứng đáp án đúng → rung & nở ra khủng long con.
export default function DinoEggMode({ question, onAnswer, bg, objects }: Props) {
  const g = useGameMode(question, onAnswer);
  const { displayPrompt, speak } = useModeExtras(g, question);

  return (
    <div className="relative w-full min-h-[100dvh] overflow-hidden">
      <GardenScene src={bg} />
      <div className="relative z-10 flex flex-col min-h-[100dvh] px-4 pt-16 pb-6 max-w-xl mx-auto">
        <ModeHeader g={g} displayPrompt={displayPrompt} speak={speak} objects={objects} hint="🥚 Chạm quả trứng có đáp án đúng để nở" />
        <div className="flex-1 grid grid-cols-2 gap-4 content-center pb-4">
          {g.options.slice(0, 4).map((opt, i) => {
            const isAns = g.isAnswered && String(opt) === String(g.correctAnswer);
            const isSel = g.isAnswered && String(opt) === String(g.selectedOption);
            let face = PALETTE[ANSWER_SCHEMES[i % ANSWER_SCHEMES.length]];
            if (isAns) face = PALETTE.mint; else if (isSel) face = PALETTE.coral;
            return (
              <motion.button key={i} onClick={() => g.handleSelect(opt)} disabled={g.isAnswered} whileTap={{ scale: 0.92 }}
                animate={isAns ? { rotate: [0, -8, 8, -8, 8, 0], scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.6 }}
                className="relative flex items-center justify-center font-black mx-auto"
                style={{ width: 96, height: 116, borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
                  color: "#fff", fontSize: "2.2rem", fontFamily: "'Mochiy Pop One', system-ui",
                  background: isAns ? "transparent" : `radial-gradient(circle at 40% 30%, #fffdf5, ${face.face} 95%)`,
                  boxShadow: isAns ? "none" : "0 8px 16px rgba(80,60,40,0.3), inset 0 -6px 10px rgba(0,0,0,0.12)",
                  border: isAns ? "none" : "3px solid rgba(255,255,255,0.6)" }}>
                {isAns ? <GlossySprite src={assetUrl('/sprites/dino.png')} size={80} /> : opt}
                {/* Đốm trên trứng */}
                {!g.isAnswered && <span className="absolute" style={{ top: 18, left: 18, width: 10, height: 10, borderRadius: "50%", background: face.lip, opacity: 0.5 }} />}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
