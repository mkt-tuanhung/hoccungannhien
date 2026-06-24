"use client";
import { assetUrl } from "@/lib/assets";

import { motion } from "framer-motion";
import { useGameMode } from "@/lib/hooks/useGameMode";
import { useModeExtras } from "@/lib/hooks/useModeExtras";
import { PALETTE, ANSWER_SCHEMES } from "@/lib/design/palette";
import { GameModeProps } from "../BaseGameShell";
import GardenScene from "../ui/GardenScene";
import ModeHeader from "../ui/ModeHeader";
import { TwinkleStars } from "../overlays";
import GlossySprite from "../ui/GlossySprite";

interface Props extends GameModeProps { bg?: string; objects?: string[]; }
// 4 vị trí quanh cổng tròn (trên, phải, dưới, trái)
const POS = [{ x: 50, y: 8 }, { x: 92, y: 50 }, { x: 50, y: 92 }, { x: 8, y: 50 }];

// CỔNG THỜI GIAN: vòng cổng ma thuật xoay liên tục, 4 ô số quanh cổng, chạm ô đáp án đúng.
export default function SpinPortalMode({ question, onAnswer, bg, objects }: Props) {
  const g = useGameMode(question, onAnswer);
  const { displayPrompt, speak } = useModeExtras(g, question);

  return (
    <div className="relative w-full min-h-[100dvh] overflow-hidden">
      <GardenScene src={bg} />
      <div className="absolute inset-0 z-[5] pointer-events-none"><TwinkleStars /></div>
      <div className="relative z-10 flex flex-col min-h-[100dvh] px-4 pt-16 pb-6 max-w-xl mx-auto">
        <ModeHeader g={g} displayPrompt={displayPrompt} speak={speak} objects={objects} hint="⏳ Chạm ô số có đáp án đúng quanh cổng" />
        <div className="flex-1 flex items-center justify-center">
          <div className="relative" style={{ width: 300, height: 300 }}>
            {/* Vòng cổng xoay */}
            <motion.div className="absolute inset-6 rounded-full"
              style={{ border: "14px solid", borderColor: "#B49BEC #7CC9F0 #FF9CC2 #FFCF5C", boxShadow: "0 0 40px rgba(150,120,230,0.6), inset 0 0 30px rgba(255,255,255,0.4)" }}
              animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 8, ease: "linear" }} />
            <div className="absolute inset-16 rounded-full" style={{ background: "radial-gradient(circle, rgba(180,155,236,0.5), rgba(80,60,140,0.2))" }} />
            <GlossySprite src={assetUrl('/sprites/portal.png')} size={112} className="absolute inset-0 m-auto" />
            {/* 4 ô số */}
            {g.options.slice(0, 4).map((opt, i) => {
              const p = POS[i];
              let face = PALETTE[ANSWER_SCHEMES[i % ANSWER_SCHEMES.length]];
              if (g.isAnswered && String(opt) === String(g.correctAnswer)) face = PALETTE.mint;
              else if (g.isAnswered && String(opt) === String(g.selectedOption)) face = PALETTE.coral;
              return (
                <motion.button key={i} onClick={() => g.handleSelect(opt)} disabled={g.isAnswered} whileTap={{ scale: 0.9 }}
                  animate={g.isAnswered && String(opt) === String(g.correctAnswer) ? { scale: [1, 1.2, 1] } : {}}
                  className="absolute flex items-center justify-center font-black"
                  style={{ left: `${p.x}%`, top: `${p.y}%`, transform: "translate(-50%,-50%)", width: 64, height: 64, borderRadius: "50%",
                    color: "#fff", fontSize: "1.8rem", fontFamily: "'Mochiy Pop One', system-ui",
                    background: `radial-gradient(circle at 38% 30%, #fff, ${face.face} 90%)`,
                    boxShadow: `0 0 16px ${face.face}, inset 0 -3px 6px ${face.lip}66`, border: "2px solid #fff" }}>
                  {opt}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
