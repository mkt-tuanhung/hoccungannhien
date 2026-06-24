"use client";

import { motion } from "framer-motion";
import { useGameMode } from "@/lib/hooks/useGameMode";
import { useModeExtras } from "@/lib/hooks/useModeExtras";
import { PALETTE, ANSWER_SCHEMES } from "@/lib/design/palette";
import { GameModeProps } from "../BaseGameShell";
import GardenScene from "../ui/GardenScene";
import ModeHeader from "../ui/ModeHeader";

interface Props extends GameModeProps { bg?: string; objects?: string[]; }

// CỬA HÀNG PHÉP THUẬT: kệ có 4 lọ nước phép mang số, chạm lọ đáp án đúng → lọ phát sáng.
export default function PotionShopMode({ question, onAnswer, bg, objects }: Props) {
  const g = useGameMode(question, onAnswer);
  const { displayPrompt, speak } = useModeExtras(g, question);

  return (
    <div className="relative w-full min-h-[100dvh] overflow-hidden">
      <GardenScene src={bg} />
      <div className="relative z-10 flex flex-col min-h-[100dvh] px-4 pt-16 pb-6 max-w-xl mx-auto">
        <ModeHeader g={g} displayPrompt={displayPrompt} speak={speak} objects={objects} hint="🧪 Chạm lọ phép có đáp án đúng" />

        <div className="flex-1 flex items-end justify-center pb-4">
          <div className="relative w-full max-w-md">
            <div className="grid grid-cols-4 gap-3 items-end mb-1">
              {g.options.slice(0, 4).map((opt, i) => {
                const isAns = g.isAnswered && String(opt) === String(g.correctAnswer);
                const isSel = g.isAnswered && String(opt) === String(g.selectedOption);
                const face = isAns ? PALETTE.mint : isSel ? PALETTE.coral : PALETTE[ANSWER_SCHEMES[i % ANSWER_SCHEMES.length]];
                const glow = isAns;
                return (
                  <motion.button key={i} onClick={() => g.handleSelect(opt)} disabled={g.isAnswered} whileTap={{ scale: 0.92 }}
                    animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 2.4 + i * 0.35 }}
                    className="flex flex-col items-center">
                    {/* Nút chai */}
                    <div style={{ width: 16, height: 10, background: "#9b6b43", borderRadius: "4px 4px 0 0", border: "1.5px solid rgba(255,255,255,0.4)" }} />
                    <div style={{ width: 12, height: 8, background: "#7a4f25" }} />
                    {/* Thân lọ — glossy */}
                    <div className="relative overflow-hidden flex items-center justify-center font-black"
                      style={{ width: 62, height: 82, borderRadius: "28px 28px 20px 20px", color: "#fff", fontSize: "1.8rem",
                        fontFamily: "'Mochiy Pop One', system-ui",
                        background: `linear-gradient(180deg, ${face.face}dd 0%, ${face.face}99 40%, ${face.lip} 100%)`,
                        boxShadow: glow
                          ? `0 0 28px 8px ${face.face}, 0 6px 12px rgba(80,50,100,0.3)`
                          : "0 6px 14px rgba(80,50,100,0.28)",
                        border: "2px solid rgba(255,255,255,0.72)" }}>
                      {/* Gloss highlight */}
                      <div className="absolute pointer-events-none" style={{ top: 6, left: "18%", width: "36%", height: "38%", borderRadius: 12, background: "rgba(255,255,255,0.55)", filter: "blur(3px)" }} />
                      {/* Bong bóng sủi trong lọ */}
                      {[0, 1].map((b) => (
                        <motion.div key={b} className="absolute rounded-full bg-white/30"
                          style={{ width: 8, height: 8, left: `${28 + b * 22}%`, bottom: "18%" }}
                          animate={{ y: [-2, -18, -2], opacity: [0.5, 0, 0.5] }}
                          transition={{ repeat: Infinity, duration: 1.8, delay: b * 0.6 }} />
                      ))}
                      <span className="relative z-10">{opt}</span>
                    </div>
                    {/* Đế chai */}
                    <div style={{ width: 62, height: 8, background: "linear-gradient(180deg,#9b6b43,#7a4f25)", borderRadius: "0 0 6px 6px" }} />
                  </motion.button>
                );
              })}
            </div>
            {/* Tấm kệ */}
            <div className="h-5 rounded-lg" style={{ background: "linear-gradient(180deg,#c8915a,#8a5a30)", boxShadow: "0 6px 12px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.3)" }} />
            <div className="h-2 rounded-b-lg" style={{ background: "#6a4020" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
