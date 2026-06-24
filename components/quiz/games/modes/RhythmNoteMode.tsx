"use client";

import { motion } from "framer-motion";
import { useGameMode } from "@/lib/hooks/useGameMode";
import { useModeExtras } from "@/lib/hooks/useModeExtras";
import { PALETTE, ANSWER_SCHEMES } from "@/lib/design/palette";
import { GameModeProps } from "../BaseGameShell";
import GardenScene from "../ui/GardenScene";
import ModeHeader from "../ui/ModeHeader";
import { TwinkleStars } from "../overlays";

interface Props extends GameModeProps { bg?: string; objects?: string[]; }

const NOTE_ICONS = ["🎵", "🎶", "🎼", "🎵"];

// VŨ ĐIỆU NHỊP PHÁCH: các nốt nhạc mang số nhún nhảy trên khuông nhạc, chạm nốt đáp án đúng theo nhịp.
export default function RhythmNoteMode({ question, onAnswer, bg, objects }: Props) {
  const g = useGameMode(question, onAnswer);
  const { displayPrompt, speak } = useModeExtras(g, question);

  return (
    <div className="relative w-full min-h-[100dvh] overflow-hidden">
      <GardenScene src={bg} />
      <div className="absolute inset-0 z-[5] pointer-events-none"><TwinkleStars /></div>
      <div className="relative z-10 flex flex-col min-h-[100dvh] px-4 pt-16 pb-6 max-w-xl mx-auto">
        <ModeHeader g={g} displayPrompt={displayPrompt} speak={speak} objects={objects} hint="🎵 Chạm nốt nhạc có đáp án đúng theo nhịp" />

        <div className="flex-1 flex items-center justify-center">
          <div className="relative w-full max-w-md rounded-3xl py-12 px-4"
            style={{ background: "rgba(255,255,255,0.18)", backdropFilter: "blur(8px)", border: "1.5px solid rgba(255,255,255,0.4)" }}>
            {/* Khuông nhạc */}
            {[0, 1, 2, 3, 4].map((l) => (
              <div key={l} className="absolute left-4 right-4 h-px bg-white/50" style={{ top: `${20 + l * 15}%` }} />
            ))}

            <div className="relative flex justify-between items-end px-2 pb-2">
              {g.options.slice(0, 4).map((opt, i) => {
                const isAns = g.isAnswered && String(opt) === String(g.correctAnswer);
                const isSel = g.isAnswered && String(opt) === String(g.selectedOption);
                const face = isAns ? PALETTE.mint : isSel ? PALETTE.coral : PALETTE[ANSWER_SCHEMES[i % ANSWER_SCHEMES.length]];
                return (
                  <motion.button key={i} onClick={() => g.handleSelect(opt)} disabled={g.isAnswered} whileTap={{ scale: 0.88 }}
                    animate={{ y: [0, -22, 0] }}
                    transition={{ repeat: Infinity, duration: 0.85, delay: i * 0.21, ease: "easeInOut" }}
                    className="relative flex flex-col items-center gap-1 select-none">
                    {/* Nốt nhạc icon */}
                    <span className="text-2xl">{NOTE_ICONS[i]}</span>
                    {/* Bóng nốt glossy */}
                    <div className="relative overflow-hidden flex items-center justify-center font-black"
                      style={{ width: 68, height: 68, borderRadius: "50%", color: "#fff", fontSize: "2rem",
                        fontFamily: "'Mochiy Pop One', system-ui",
                        background: `radial-gradient(circle at 38% 30%, rgba(255,255,255,0.9), ${face.face} 56%, ${face.lip})`,
                        boxShadow: isAns
                          ? `0 0 24px 8px ${face.face}, 0 6px 12px rgba(80,50,100,0.25)`
                          : `0 6px 14px rgba(80,50,100,0.28), inset 0 2px 5px rgba(255,255,255,0.5)`,
                        border: "2px solid rgba(255,255,255,0.72)" }}>
                      {/* Gloss */}
                      <div className="absolute rounded-full pointer-events-none"
                        style={{ top: 7, left: "20%", width: "55%", height: "24%", background: "rgba(255,255,255,0.72)", filter: "blur(3px)" }} />
                      <span className="relative z-10">{opt}</span>
                    </div>
                    {/* Đuôi nốt */}
                    <div className="w-1 rounded-full" style={{ height: 28 + i * 6, background: "rgba(255,255,255,0.65)" }} />
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
