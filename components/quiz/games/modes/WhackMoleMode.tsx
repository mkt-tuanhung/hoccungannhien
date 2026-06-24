"use client";
import { assetUrl } from "@/lib/assets";

import { motion } from "framer-motion";
import { useGameMode } from "@/lib/hooks/useGameMode";
import { useModeExtras } from "@/lib/hooks/useModeExtras";
import { ANSWER_SCHEMES, PALETTE } from "@/lib/design/palette";
import { GameModeProps } from "../BaseGameShell";
import GardenScene from "../ui/GardenScene";
import ModeHeader from "../ui/ModeHeader";
import GlossySprite from "../ui/GlossySprite";

interface Props extends GameModeProps { bg?: string; objects?: string[]; }

// ĐẬP CHUỘT CHŨI: các con vật mang số ló lên/thụt xuống từ hang, bé chạm con có đáp án đúng.
export default function WhackMoleMode({ question, onAnswer, bg, objects }: Props) {
  const g = useGameMode(question, onAnswer);
  const { displayPrompt, speak } = useModeExtras(g, question);
  const icon = g.objectIcon || (objects?.length ? objects[0] : assetUrl('/sprites/rabbit.png'));

  return (
    <div className="relative w-full min-h-[100dvh] overflow-hidden">
      <GardenScene src={bg} />
      <div className="relative z-10 flex flex-col min-h-[100dvh] px-4 pt-16 pb-6 max-w-xl mx-auto">
        <ModeHeader g={g} displayPrompt={displayPrompt} speak={speak} objects={objects} hint="👇 Chạm bạn mang đáp án đúng" />

        <div className="flex-1 grid grid-cols-2 gap-4 content-center pb-6">
          {g.options.slice(0, 4).map((opt, i) => {
            const isAns = g.isAnswered && String(opt) === String(g.correctAnswer);
            const isSel = g.isAnswered && String(opt) === String(g.selectedOption);
            const face = isAns ? PALETTE.mint : isSel ? PALETTE.coral : PALETTE[ANSWER_SCHEMES[i % ANSWER_SCHEMES.length]];
            return (
              <div key={i} className="relative flex flex-col items-center justify-end" style={{ height: 150 }}>
                <motion.button onClick={() => g.handleSelect(opt)} disabled={g.isAnswered} whileTap={{ scale: 0.9 }}
                  className="relative flex flex-col items-center justify-center font-black z-10 select-none"
                  style={{ width: 120, fontFamily: "'Mochiy Pop One', system-ui" }}
                  animate={g.isAnswered ? { y: 0 } : { y: [80, 0, 0, 80] }}
                  transition={g.isAnswered ? {} : { repeat: Infinity, duration: 2.4 + i * 0.5, times: [0, 0.2, 0.8, 1], delay: i * 0.4 }}>
                  <GlossySprite src={icon} size={96} />
                  <div className="mt-1 flex items-center justify-center font-black text-white rounded-2xl px-4 py-1"
                    style={{ fontSize: "1.9rem", background: `linear-gradient(180deg,${face.face},${face.lip})`, boxShadow: `0 4px 0 ${face.lip}`, border: "2.5px solid rgba(255,255,255,0.7)" }}>
                    {opt}
                  </div>
                </motion.button>
                {/* Miệng hang */}
                <div className="absolute bottom-0 w-32 h-9 rounded-[50%] z-20 pointer-events-none"
                  style={{ background: "linear-gradient(180deg,#7a5a3a,#4e3a24)", boxShadow: "inset 0 4px 8px rgba(0,0,0,0.5)" }} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
