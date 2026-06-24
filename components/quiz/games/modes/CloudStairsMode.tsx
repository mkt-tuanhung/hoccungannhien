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
const STEPS = [{ x: 14, y: 80 }, { x: 38, y: 60 }, { x: 62, y: 40 }, { x: 84, y: 20 }];

// LEO CẦU THANG MÂY: 4 đám mây bậc thang dâng cao, chạm mây đáp án đúng → thỏ nhảy lên đó.
export default function CloudStairsMode({ question, onAnswer, bg, objects }: Props) {
  const g = useGameMode(question, onAnswer);
  const { displayPrompt, speak } = useModeExtras(g, question);
  const selIdx = g.options.findIndex((o) => String(o) === String(g.selectedOption));
  const rabbit = selIdx >= 0 ? STEPS[selIdx] : { x: 6, y: 94 };

  return (
    <div className="relative w-full min-h-[100dvh] overflow-hidden">
      <GardenScene src={bg} />
      <div className="relative z-10 flex flex-col min-h-[100dvh] px-4 pt-16 pb-6 max-w-xl mx-auto">
        <ModeHeader g={g} displayPrompt={displayPrompt} speak={speak} objects={objects} hint="☁️ Chạm mây có đáp án đúng để thỏ leo lên" />
        <div className="relative flex-1">
          <img src=assetUrl('/sprites/castle.png') alt="" className="absolute w-14 h-14 object-contain" style={{ left: "84%", top: "2%", filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.25))" }} />
          {g.options.slice(0, 4).map((opt, i) => {
            const s = STEPS[i];
            let face = PALETTE[ANSWER_SCHEMES[i % ANSWER_SCHEMES.length]];
            if (g.isAnswered && String(opt) === String(g.correctAnswer)) face = PALETTE.mint;
            else if (g.isAnswered && String(opt) === String(g.selectedOption)) face = PALETTE.coral;
            return (
              <motion.button key={i} onClick={() => g.handleSelect(opt)} disabled={g.isAnswered} whileTap={{ scale: 0.92 }}
                animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 2.5 + i * 0.3 }}
                className="absolute flex items-center justify-center font-black"
                style={{ left: `${s.x}%`, top: `${s.y}%`, transform: "translate(-50%,-50%)", width: 92, height: 64, borderRadius: 40,
                  color: "#fff", fontSize: "2rem", fontFamily: "'Mochiy Pop One', system-ui",
                  background: `radial-gradient(circle at 40% 30%, #fff, ${face.face} 80%)`,
                  boxShadow: `0 8px 16px rgba(80,50,100,0.2), inset 0 -4px 8px ${face.lip}55`, border: "2px solid #fff" }}>
                {opt}
              </motion.button>
            );
          })}
          <motion.div className="absolute z-20 pointer-events-none" style={{ transform: "translate(-50%,-90%)" }}
            animate={{ left: `${rabbit.x}%`, top: `${rabbit.y}%` }} transition={{ type: "spring", stiffness: 180, damping: 16 }}>
            <GlossySprite src=assetUrl('/sprites/rabbit.png') size={64} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
