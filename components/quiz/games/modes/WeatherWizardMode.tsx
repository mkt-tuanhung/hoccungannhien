"use client";
import { assetUrl } from "@/lib/assets";

import { motion } from "framer-motion";
import { useGameMode } from "@/lib/hooks/useGameMode";
import { useModeExtras } from "@/lib/hooks/useModeExtras";
import { PALETTE, ANSWER_SCHEMES } from "@/lib/design/palette";
import { GameModeProps } from "../BaseGameShell";
import GardenScene from "../ui/GardenScene";
import ModeHeader from "../ui/ModeHeader";
import { RainDrops } from "../overlays";

interface Props extends GameModeProps { bg?: string; objects?: string[]; }

// PHÙ THUỶ THỜI TIẾT: 4 đám mây mang số, chạm mây đáp án đúng → tia nắng/cầu vồng bừng sáng.
export default function WeatherWizardMode({ question, onAnswer, bg, objects }: Props) {
  const g = useGameMode(question, onAnswer);
  const { displayPrompt, speak } = useModeExtras(g, question);

  return (
    <div className="relative w-full min-h-[100dvh] overflow-hidden">
      <GardenScene src={bg} />
      {!g.isAnswered && <div className="absolute inset-0 z-[5] pointer-events-none"><RainDrops /></div>}
      {g.isAnswered && g.isCorrect && <div className="absolute inset-0 z-[5] pointer-events-none flex items-start justify-center pt-24"><img src={assetUrl('/sprites/rainbow.png')} alt="" className="w-48 h-48 object-contain" style={{ filter: "drop-shadow(0 8px 12px rgba(180,100,255,0.3))" }} /></div>}
      <div className="relative z-10 flex flex-col min-h-[100dvh] px-4 pt-16 pb-6 max-w-xl mx-auto">
        <ModeHeader g={g} displayPrompt={displayPrompt} speak={speak} objects={objects} hint="⛈️ Chạm đám mây có đáp án đúng" />
        <div className="flex-1 grid grid-cols-2 gap-5 content-center pb-6">
          {g.options.slice(0, 4).map((opt, i) => {
            const isAns = g.isAnswered && String(opt) === String(g.correctAnswer);
            const isSel = g.isAnswered && String(opt) === String(g.selectedOption);
            let face = PALETTE[ANSWER_SCHEMES[i % ANSWER_SCHEMES.length]];
            if (isAns) face = PALETTE.mint; else if (isSel) face = PALETTE.coral;
            return (
              <motion.button key={i} onClick={() => g.handleSelect(opt)} disabled={g.isAnswered} whileTap={{ scale: 0.92 }}
                animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 2.6 + i * 0.3 }}
                className="relative flex items-center justify-center font-black mx-auto"
                style={{ width: 130, height: 78, borderRadius: 40, color: "#fff", fontSize: "2.1rem",
                  fontFamily: "'Mochiy Pop One', system-ui",
                  background: `radial-gradient(circle at 40% 30%, #fff, ${face.face} 92%)`,
                  boxShadow: isAns ? `0 0 28px 8px ${face.face}` : "0 8px 16px rgba(80,70,100,0.25)", border: "2px solid #fff" }}>
                {isAns ? <img src={assetUrl('/sprites/sun.png')} alt="" className="w-10 h-10 object-contain" /> : opt}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
