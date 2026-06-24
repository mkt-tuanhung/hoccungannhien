"use client";

import { motion } from "framer-motion";
import { useGameMode } from "@/lib/hooks/useGameMode";
import { useModeExtras } from "@/lib/hooks/useModeExtras";
import { ANSWER_SCHEMES, PALETTE } from "@/lib/design/palette";
import { GameModeProps } from "../BaseGameShell";
import GardenScene from "../ui/GardenScene";
import ModeHeader from "../ui/ModeHeader";
import { SpinningGears } from "../overlays";

interface Props extends GameModeProps { bg?: string; objects?: string[]; }

// BĂNG CHUYỀN: các thùng số chạy ngang trên băng chuyền, bé chạm thùng đáp án đúng.
export default function ConveyorMode({ question, onAnswer, bg, objects }: Props) {
  const g = useGameMode(question, onAnswer);
  const { displayPrompt, speak } = useModeExtras(g, question);
  const boxes = g.options.slice(0, 4);

  return (
    <div className="relative w-full min-h-[100dvh] overflow-hidden">
      <GardenScene src={bg} />
      <div className="absolute inset-0 z-[5] pointer-events-none"><SpinningGears /></div>
      <div className="relative z-10 flex flex-col min-h-[100dvh] px-4 pt-16 pb-6 max-w-xl mx-auto">
        <ModeHeader g={g} displayPrompt={displayPrompt} speak={speak} objects={objects} hint="👇 Chạm thùng có đáp án đúng" />
        <div className="flex-1" />

        {/* Băng chuyền */}
        <div className="relative overflow-hidden mb-1" style={{ height: 112 }}>
          <motion.div className="flex gap-5 absolute" style={{ left: 0 }}
            animate={g.isAnswered ? {} : { x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 9, ease: "linear" }}>
            {[...boxes, ...boxes].map((opt, i) => {
              const idx = i % boxes.length;
              const isAns = g.isAnswered && String(opt) === String(g.correctAnswer);
              const isSel = g.isAnswered && String(opt) === String(g.selectedOption);
              const face = isAns ? PALETTE.mint : isSel ? PALETTE.coral : PALETTE[ANSWER_SCHEMES[idx % ANSWER_SCHEMES.length]];
              return (
                <motion.button key={i} onClick={() => g.handleSelect(opt)} disabled={g.isAnswered} whileTap={{ scale: 0.9 }}
                  className="relative flex-shrink-0 flex items-center justify-center font-black overflow-hidden"
                  style={{ width: 92, height: 92, borderRadius: 20, color: "#fff", fontSize: "2.4rem",
                    fontFamily: "'Mochiy Pop One', system-ui",
                    background: `linear-gradient(180deg, ${face.face} 0%, ${face.face} 50%, ${face.lip} 145%)`,
                    boxShadow: `0 7px 0 ${face.lip}, inset 0 2px 4px rgba(255,255,255,0.55)`,
                    border: "3px solid rgba(255,255,255,0.6)" }}>
                  {/* Gloss */}
                  <div className="absolute left-2 right-2 pointer-events-none"
                    style={{ top: 4, height: "42%", borderRadius: 14, background: "linear-gradient(180deg,rgba(255,255,255,0.58) 0%,rgba(255,255,255,0.04) 100%)" }} />
                  <span className="relative">{opt}</span>
                </motion.button>
              );
            })}
          </motion.div>
        </div>

        {/* Mặt băng chuyền */}
        <div className="relative h-6 rounded-lg overflow-hidden mb-4" style={{ background: "linear-gradient(180deg,#666,#444)", boxShadow: "inset 0 2px 6px rgba(0,0,0,0.4)" }}>
          <motion.div className="flex h-full" animate={{ x: [-40, 0] }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
            {Array.from({ length: 30 }).map((_, i) => (
              <div key={i} className="h-full" style={{ width: 20, borderRight: "3px solid rgba(255,255,255,0.15)" }} />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
