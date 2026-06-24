"use client";

import { motion } from "framer-motion";
import { useGameMode } from "@/lib/hooks/useGameMode";
import { useModeExtras } from "@/lib/hooks/useModeExtras";
import { PALETTE, ANSWER_SCHEMES } from "@/lib/design/palette";
import { GameModeProps } from "../BaseGameShell";
import GardenScene from "../ui/GardenScene";
import ModeHeader from "../ui/ModeHeader";
import { BubblesUp } from "../overlays";

interface Props extends GameModeProps { bg?: string; objects?: string[]; }
const XS = [18, 42, 64, 84];

// BONG BÓNG SAN HÔ: bong bóng số nổi lên từ đáy biển, bé chạm bong bóng đáp án đúng.
export default function BubblePopOceanMode({ question, onAnswer, bg, objects }: Props) {
  const g = useGameMode(question, onAnswer);
  const { displayPrompt, speak } = useModeExtras(g, question);

  return (
    <div className="relative w-full min-h-[100dvh] overflow-hidden">
      <GardenScene src={bg} />
      <div className="absolute inset-0 z-[5] pointer-events-none"><BubblesUp /></div>
      <div className="relative z-10 flex flex-col min-h-[100dvh] px-4 pt-16 pb-6 max-w-xl mx-auto">
        <ModeHeader g={g} displayPrompt={displayPrompt} speak={speak} objects={objects} hint="🫧 Chạm bong bóng có đáp án đúng" />

        <div className="relative flex-1 overflow-hidden">
          {g.options.slice(0, 4).map((opt, i) => {
            const isAns = g.isAnswered && String(opt) === String(g.correctAnswer);
            const isSel = g.isAnswered && String(opt) === String(g.selectedOption);
            const face = isAns ? PALETTE.mint : isSel ? PALETTE.coral : PALETTE[ANSWER_SCHEMES[i % ANSWER_SCHEMES.length]];
            return (
              <motion.button key={i} onClick={() => g.handleSelect(opt)} disabled={g.isAnswered} whileTap={{ scale: 0.88 }}
                className="absolute flex flex-col items-center justify-center font-black select-none"
                style={{ left: `${XS[i]}%`, transform: "translateX(-50%)", width: 84, height: 84, borderRadius: "50%",
                  color: "#fff", fontSize: "2rem", fontFamily: "'Mochiy Pop One', system-ui",
                  background: `radial-gradient(circle at 36% 28%, rgba(255,255,255,0.88), ${face.face} 58%, ${face.lip})`,
                  boxShadow: `inset -2px -4px 8px rgba(0,0,0,0.1), 0 0 18px ${face.face}88, inset 0 2px 6px rgba(255,255,255,0.9)`,
                  border: "2.5px solid rgba(255,255,255,0.75)" }}
                animate={g.isAnswered ? { bottom: "40%" } : { bottom: ["-20%", "110%"] }}
                transition={g.isAnswered ? {} : { repeat: Infinity, duration: 6 + i * 1.3, ease: "linear", delay: i * 0.8 }}>
                {/* Highlight bóng bảy */}
                <div className="absolute rounded-full pointer-events-none" style={{ top: 8, left: "22%", width: "52%", height: "22%", background: "rgba(255,255,255,0.75)", filter: "blur(3px)" }} />
                <span className="relative">{opt}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
