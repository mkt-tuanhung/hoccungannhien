"use client";
import { assetUrl } from "@/lib/assets";

import { motion } from "framer-motion";
import { useGameMode } from "@/lib/hooks/useGameMode";
import { useModeExtras } from "@/lib/hooks/useModeExtras";
import { PALETTE, ANSWER_SCHEMES } from "@/lib/design/palette";
import { GameModeProps } from "../BaseGameShell";
import GardenScene from "../ui/GardenScene";
import ModeHeader from "../ui/ModeHeader";

interface Props extends GameModeProps { bg?: string; objects?: string[]; }
const ISLES = [{ x: 22, y: 30 }, { x: 70, y: 26 }, { x: 30, y: 68 }, { x: 76, y: 64 }];

// LÁI THUYỀN QUẦN ĐẢO: các hòn đảo mang số, chạm đảo đáp án đúng → thuyền chèo tới.
export default function BoatVoyageMode({ question, onAnswer, bg, objects }: Props) {
  const g = useGameMode(question, onAnswer);
  const { displayPrompt, speak } = useModeExtras(g, question);
  const selIdx = g.options.findIndex((o) => String(o) === String(g.selectedOption));
  const boat = selIdx >= 0 ? ISLES[selIdx] : { x: 50, y: 92 };

  return (
    <div className="relative w-full min-h-[100dvh] overflow-hidden">
      <GardenScene src={bg} />
      <div className="relative z-10 flex flex-col min-h-[100dvh] px-4 pt-16 pb-6 max-w-xl mx-auto">
        <ModeHeader g={g} displayPrompt={displayPrompt} speak={speak} objects={objects} hint="⛵ Chạm hòn đảo có đáp án đúng" />
        <div className="relative flex-1">
          {g.options.slice(0, 4).map((opt, i) => {
            const s = ISLES[i];
            let face = PALETTE[ANSWER_SCHEMES[i % ANSWER_SCHEMES.length]];
            if (g.isAnswered && String(opt) === String(g.correctAnswer)) face = PALETTE.mint;
            else if (g.isAnswered && String(opt) === String(g.selectedOption)) face = PALETTE.coral;
            return (
              <motion.button key={i} onClick={() => g.handleSelect(opt)} disabled={g.isAnswered} whileTap={{ scale: 0.92 }}
                animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 2.8 + i * 0.3 }}
                className="absolute flex flex-col items-center justify-center"
                style={{ left: `${s.x}%`, top: `${s.y}%`, transform: "translate(-50%,-50%)" }}>
                <img src=assetUrl('/sprites/palmtree.png') alt="" className="w-8 h-8 object-contain -mb-2 z-10" />
                <span className="flex items-center justify-center font-black"
                  style={{ width: 80, height: 56, borderRadius: "50% 50% 45% 45%", color: "#fff", fontSize: "1.9rem",
                    fontFamily: "'Mochiy Pop One', system-ui",
                    background: `radial-gradient(circle at 40% 30%, #ffe9a8, ${face.face} 90%)`,
                    boxShadow: `0 6px 12px rgba(80,50,100,0.25), inset 0 -3px 6px ${face.lip}66`, border: "2px solid #fff8" }}>{opt}</span>
              </motion.button>
            );
          })}
          <motion.img src=assetUrl('/sprites/boat.png') alt="" className="absolute w-14 h-14 object-contain z-20 pointer-events-none" style={{ transform: "translate(-50%,-50%)", filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.25))" }}
            animate={{ left: `${boat.x}%`, top: `${boat.y}%`, rotate: [0, -4, 4, 0] }} transition={{ left: { type: "spring", stiffness: 120, damping: 16 }, top: { type: "spring", stiffness: 120, damping: 16 }, rotate: { repeat: Infinity, duration: 2 } }} />
        </div>
      </div>
    </div>
  );
}
