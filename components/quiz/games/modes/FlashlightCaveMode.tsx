"use client";
import { assetUrl } from "@/lib/assets";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useGameMode } from "@/lib/hooks/useGameMode";
import { useModeExtras } from "@/lib/hooks/useModeExtras";
import { PALETTE, ANSWER_SCHEMES } from "@/lib/design/palette";
import { GameModeProps } from "../BaseGameShell";
import GardenScene from "../ui/GardenScene";
import ModeHeader from "../ui/ModeHeader";
import GlossySprite from "../ui/GlossySprite";

interface Props extends GameModeProps { bg?: string; objects?: string[]; }

const SPOTS = [{ x: 24, y: 28 }, { x: 72, y: 24 }, { x: 28, y: 68 }, { x: 74, y: 64 }];
const GEM_SPRITES = [assetUrl('/sprites/gemgreen.png'), assetUrl('/sprites/gempink.png'), assetUrl('/sprites/diamond.png'), assetUrl('/sprites/gemgreen.png')];

// ĐÈN PIN HANG PHA LÊ: cả vùng tối, quầng sáng đèn pin theo ngón tay — rọi trúng pha lê để thấy số.
export default function FlashlightCaveMode({ question, onAnswer, bg, objects }: Props) {
  const g = useGameMode(question, onAnswer);
  const { displayPrompt, speak } = useModeExtras(g, question);
  const areaRef = useRef<HTMLDivElement>(null);
  const [light, setLight] = useState({ x: 50, y: 50 });

  const move = (e: React.PointerEvent) => {
    const r = areaRef.current?.getBoundingClientRect();
    if (!r) return;
    setLight({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };

  return (
    <div className="relative w-full min-h-[100dvh] overflow-hidden">
      <GardenScene src={bg} />
      <div className="relative z-10 flex flex-col min-h-[100dvh] px-4 pt-16 pb-6 max-w-xl mx-auto">
        <ModeHeader g={g} displayPrompt={displayPrompt} speak={speak} objects={objects} hint="🔦 Rê ngón tay tìm pha lê có đáp án đúng" />

        {/* Vùng hang tối + đèn pin */}
        <div ref={areaRef} onPointerMove={move} className="relative flex-1 rounded-3xl overflow-hidden my-2"
          style={{ minHeight: 320, touchAction: "none", background: "rgba(20,12,40,0.3)" }}>

          {/* Pha lê (options) */}
          {g.options.slice(0, 4).map((opt, i) => {
            const sp = SPOTS[i];
            const isAns = g.isAnswered && String(opt) === String(g.correctAnswer);
            const isSel = g.isAnswered && String(opt) === String(g.selectedOption);
            const face = isAns ? PALETTE.mint : isSel ? PALETTE.coral : PALETTE[ANSWER_SCHEMES[i % ANSWER_SCHEMES.length]];
            return (
              <motion.button key={i} onClick={() => g.handleSelect(opt)} disabled={g.isAnswered}
                animate={isAns ? { scale: [1, 1.2, 1] } : {}}
                className="absolute flex flex-col items-center gap-1"
                style={{ left: `${sp.x}%`, top: `${sp.y}%`, transform: "translate(-50%,-50%)" }}>
                <GlossySprite src={GEM_SPRITES[i]} size={72} />
                {/* Label số nổi bên dưới gem */}
                <div className="flex items-center justify-center font-black"
                  style={{ width: 52, height: 36, borderRadius: 12, color: "#fff", fontSize: "1.6rem",
                    fontFamily: "'Mochiy Pop One', system-ui",
                    background: `linear-gradient(180deg,${face.face},${face.lip})`,
                    boxShadow: `0 4px 0 ${face.lip}, inset 0 1px 3px rgba(255,255,255,0.5)`,
                    border: "2px solid rgba(255,255,255,0.65)" }}>
                  {opt}
                </div>
              </motion.button>
            );
          })}

          {/* Lớp tối + lỗ sáng theo ngón tay */}
          {!g.isAnswered && (
            <div className="absolute inset-0 pointer-events-none" style={{
              background: `radial-gradient(circle at ${light.x}% ${light.y}%, rgba(0,0,0,0) 75px, rgba(12,6,30,0.96) 150px)`,
            }} />
          )}
        </div>
      </div>
    </div>
  );
}
