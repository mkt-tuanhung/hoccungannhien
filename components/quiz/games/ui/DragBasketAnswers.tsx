"use client";
import { assetUrl } from "@/lib/assets";

import { useRef } from "react";
import { motion } from "framer-motion";
import { PALETTE, ANSWER_SCHEMES } from "@/lib/design/palette";

interface Props {
  options: any[];
  correctAnswer: any;
  selectedOption: any;
  isCorrect: boolean | null;
  onSelect: (opt: any) => void;
}

export default function DragBasketAnswers({ options, correctAnswer, selectedOption, isCorrect, onSelect }: Props) {
  const basketRef = useRef<HTMLDivElement>(null);
  const answered = selectedOption !== null;

  const handleEnd = (info: any, opt: any) => {
    if (answered) return;
    const r = basketRef.current?.getBoundingClientRect();
    if (r && info.point.x >= r.left && info.point.x <= r.right && info.point.y >= r.top - 30 && info.point.y <= r.bottom) {
      onSelect(opt);
    }
  };

  return (
    <div className="relative w-full flex flex-col items-center" style={{ minHeight: 300 }}>
      {/* Viên số kéo được */}
      <div className="flex justify-center gap-3 flex-wrap mb-4">
        {options.slice(0, 4).map((opt, i) => {
          const isAns = String(opt) === String(correctAnswer);
          const isSel = String(opt) === String(selectedOption);
          let face = PALETTE[ANSWER_SCHEMES[i % ANSWER_SCHEMES.length]];
          if (answered && isAns) face = PALETTE.mint;
          else if (answered && isSel) face = PALETTE.coral;
          const dim = answered && !isAns && !isSel;
          return (
            <motion.div
              key={i}
              drag={!answered}
              dragSnapToOrigin
              whileDrag={{ scale: 1.18, zIndex: 50 }}
              onDragEnd={(_, info) => handleEnd(info, opt)}
              whileTap={{ scale: 1.05 }}
              animate={{ opacity: dim ? 0.4 : 1, scale: answered && isSel && isCorrect ? 0 : 1 }}
              className="flex items-center justify-center font-black cursor-grab active:cursor-grabbing"
              style={{
                width: 72, height: 72, borderRadius: "50%", color: "#fff", fontSize: "2rem", touchAction: "none",
                fontFamily: "'Mochiy Pop One', system-ui",
                background: `radial-gradient(circle at 38% 30%, ${face.face}, ${face.lip})`,
                boxShadow: `0 6px 0 ${face.lip}, 0 10px 14px rgba(80,50,100,0.28), inset 0 2px 4px rgba(255,255,255,0.6)`,
                border: "3px solid rgba(255,255,255,0.7)", textShadow: "0 2px 3px rgba(0,0,0,0.2)",
              }}
            >
              {opt}
            </motion.div>
          );
        })}
      </div>

      {/* Rổ (vùng thả) */}
      <motion.div
        ref={basketRef}
        animate={answered && isCorrect ? { scale: [1, 1.15, 1] } : {}}
        className="relative flex items-end justify-center"
        style={{ width: 150, height: 120 }}
      >
        <img src={assetUrl('/sprites/basket.png')} alt="" className="w-32 h-32 object-contain" style={{ filter: "drop-shadow(0 8px 8px rgba(80,50,90,0.3))" }} />
        {!answered && (
          <motion.div
            className="absolute inset-x-4 bottom-2 rounded-full border-4 border-dashed border-white/70"
            style={{ height: 70 }}
            animate={{ opacity: [0.4, 0.9, 0.4] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
          />
        )}
      </motion.div>
    </div>
  );
}
