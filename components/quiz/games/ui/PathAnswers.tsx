"use client";
import { assetUrl } from "@/lib/assets";

import { motion } from "framer-motion";
import { PALETTE, ANSWER_SCHEMES } from "@/lib/design/palette";

interface PathAnswersProps {
  options: any[];
  correctAnswer: any;
  selectedOption: any;
  isCorrect: boolean | null;
  onSelect: (opt: any) => void;
}

// Vị trí các hòn đá theo đường zigzag đi lên (toạ độ % tính từ trên).
const SPOTS = [
  { x: 18, y: 84 },
  { x: 62, y: 64 },
  { x: 20, y: 44 },
  { x: 64, y: 24 },
];
const GOAL = { x: 46, y: 8 };

export default function PathAnswers({ options, correctAnswer, selectedOption, isCorrect, onSelect }: PathAnswersProps) {
  const opts = options.slice(0, 4);
  const answered = selectedOption !== null;
  const selectedIdx = opts.findIndex((o) => String(o) === String(selectedOption));
  const petSpot = selectedIdx >= 0 ? SPOTS[selectedIdx] : { x: 46, y: 96 };

  return (
    <div className="relative w-full mx-auto" style={{ maxWidth: 380, height: 320 }}>
      {/* Đường nét đứt nối các đá tới đích */}
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
        <polyline
          points={`46,96 ${SPOTS.map((s) => `${s.x},${s.y}`).join(" ")} ${GOAL.x},${GOAL.y}`}
          fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.4" strokeDasharray="3 3" strokeLinecap="round"
        />
      </svg>

      {/* Đích */}
      <div className="absolute" style={{ left: `${GOAL.x}%`, top: `${GOAL.y}%`, transform: "translate(-50%,-50%)" }}>
        <motion.img src=assetUrl('/sprites/house.png') alt="" className="w-14 h-14 object-contain" animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 1.6 }} style={{ filter: "drop-shadow(0 4px 5px rgba(0,0,0,0.3))" }} />
      </div>

      {/* Các hòn đá = đáp án */}
      {opts.map((opt, i) => {
        const spot = SPOTS[i];
        const isAns = String(opt) === String(correctAnswer);
        const isSel = String(opt) === String(selectedOption);
        let face = PALETTE[ANSWER_SCHEMES[i % ANSWER_SCHEMES.length]];
        if (answered && isAns) face = PALETTE.mint;
        else if (answered && isSel) face = PALETTE.coral;
        const dim = answered && !isAns && !isSel;

        return (
          <motion.button
            key={i}
            onClick={() => onSelect(opt)}
            disabled={answered}
            whileTap={answered ? {} : { scale: 0.9 }}
            className="absolute flex items-center justify-center font-black rounded-full select-none"
            style={{
              left: `${spot.x}%`, top: `${spot.y}%`, transform: "translate(-50%,-50%)",
              width: 84, height: 84, fontSize: "2rem", color: "#fff",
              fontFamily: "'Mochiy Pop One', system-ui",
              background: `radial-gradient(circle at 50% 32%, ${face.face}, ${face.lip})`,
              boxShadow: `0 7px 0 ${face.lip}, 0 12px 16px rgba(80,50,100,0.3), inset 0 2px 4px rgba(255,255,255,0.6)`,
              border: "3px solid rgba(255,255,255,0.7)",
              opacity: dim ? 0.45 : 1,
              textShadow: "0 2px 3px rgba(0,0,0,0.2)",
            }}
          >
            {opt}
          </motion.button>
        );
      })}

      {/* Mèo Bông nhảy tới đá được chọn */}
      <motion.img
        src=assetUrl('/sprites/mascot.png')
        alt="Mèo Bông"
        animate={{ left: `${petSpot.x}%`, top: `${petSpot.y}%`, rotate: answered && isCorrect ? [0, -10, 10, 0] : 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 16 }}
        className="absolute w-16 h-16 object-contain z-10 pointer-events-none"
        style={{ transform: "translate(-50%,-78%)", filter: "drop-shadow(0 6px 6px rgba(60,30,70,0.35))" }}
      />
    </div>
  );
}
