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
import { Fireflies } from "../overlays";

interface Props extends GameModeProps { bg?: string; objects?: string[]; }

// RỪNG TIÊN ĐÈN LỒNG: 4 đèn lồng nấm treo lủng lẳng, chạm đèn đáp án đúng → sáng bừng.
export default function LanternMode({ question, onAnswer, bg, objects }: Props) {
  const g = useGameMode(question, onAnswer);
  const { displayPrompt, speak } = useModeExtras(g, question);

  return (
    <div className="relative w-full min-h-[100dvh] overflow-hidden">
      <GardenScene src={bg} />
      <div className="absolute inset-0 z-[5] pointer-events-none"><Fireflies /></div>
      <div className="relative z-10 flex flex-col min-h-[100dvh] px-4 pt-16 pb-6 max-w-xl mx-auto">
        <ModeHeader g={g} displayPrompt={displayPrompt} speak={speak} objects={objects} hint="🏮 Chạm đèn lồng có đáp án đúng để thắp sáng" />
        <div className="flex-1 grid grid-cols-4 gap-2 items-start pt-2">
          {g.options.slice(0, 4).map((opt, i) => {
            let face = PALETTE[ANSWER_SCHEMES[i % ANSWER_SCHEMES.length]];
            if (g.isAnswered && String(opt) === String(g.correctAnswer)) face = PALETTE.mint;
            else if (g.isAnswered && String(opt) === String(g.selectedOption)) face = PALETTE.coral;
            const lit = g.isAnswered && String(opt) === String(g.correctAnswer);
            return (
              <div key={i} className="flex flex-col items-center" style={{ marginTop: i % 2 ? 28 : 0 }}>
                <div style={{ width: 2, height: 26, background: "rgba(255,255,255,0.5)" }} />
                <motion.button onClick={() => g.handleSelect(opt)} disabled={g.isAnswered} whileTap={{ scale: 0.9 }}
                  animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 2.6 + i * 0.3 }}
                  className="flex items-center justify-center font-black"
                  style={{ width: 70, height: 82, borderRadius: "40% 40% 45% 45%", color: "#fff", fontSize: "1.8rem",
                    fontFamily: "'Mochiy Pop One', system-ui",
                    background: `radial-gradient(circle at 50% 35%, #fff6c8, ${face.face} 85%)`,
                    boxShadow: lit ? `0 0 28px 8px ${face.face}` : `0 6px 12px rgba(40,20,60,0.35)`, border: "2px solid rgba(255,255,255,0.7)" }}>{opt}</motion.button>
                <GlossySprite src={assetUrl('/sprites/mushroom.png')} size={44} className="-mt-1" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
