"use client";

import { motion, AnimatePresence } from "framer-motion";
import { PALETTE, ANSWER_SCHEMES } from "@/lib/design/palette";

interface BalloonAnswersProps {
  options: any[];
  correctAnswer: any;
  selectedOption: any;
  isCorrect: boolean | null;
  onSelect: (opt: any) => void;
}

export default function BalloonAnswers({ options, correctAnswer, selectedOption, isCorrect, onSelect }: BalloonAnswersProps) {
  const answered = selectedOption !== null;

  return (
    <div className="flex justify-center items-end gap-2 w-full" style={{ minHeight: 300 }}>
      {options.slice(0, 4).map((opt, i) => {
        const isAns = String(opt) === String(correctAnswer);
        const isSel = String(opt) === String(selectedOption);
        const popped = answered && (isSel || isAns);
        let face = PALETTE[ANSWER_SCHEMES[i % ANSWER_SCHEMES.length]];
        if (answered && isAns) face = PALETTE.mint;
        else if (answered && isSel) face = PALETTE.coral;

        return (
          <div key={i} className="flex flex-col items-center" style={{ marginBottom: i % 2 ? 40 : 0 }}>
            <AnimatePresence>
              {!popped ? (
                <motion.button
                  onClick={() => onSelect(opt)}
                  disabled={answered}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: [0, -12, 0], opacity: answered && !isAns && !isSel ? 0.4 : 1 }}
                  exit={{ scale: 0 }}
                  transition={{ y: { repeat: Infinity, duration: 2.2 + i * 0.3, ease: "easeInOut" } }}
                  whileTap={{ scale: 0.9 }}
                  className="relative flex items-center justify-center"
                  style={{ width: 76, height: 92 }}
                >
                  {/* Thân bóng */}
                  <div
                    className="absolute inset-0 flex items-center justify-center font-black"
                    style={{
                      borderRadius: "50% 50% 50% 50% / 45% 45% 55% 55%",
                      background: `radial-gradient(circle at 38% 30%, ${face.face}, ${face.lip})`,
                      color: "#fff", fontSize: "2rem", fontFamily: "'Mochiy Pop One', system-ui",
                      boxShadow: `inset -4px -6px 10px rgba(0,0,0,0.15), 0 6px 12px rgba(80,50,100,0.25)`,
                      textShadow: "0 2px 3px rgba(0,0,0,0.2)",
                    }}
                  >
                    {opt}
                    {/* Highlight bóng */}
                    <div className="absolute rounded-full" style={{ top: 12, left: 16, width: 18, height: 24, background: "rgba(255,255,255,0.55)", filter: "blur(2px)" }} />
                  </div>
                </motion.button>
              ) : (
                <motion.div initial={{ scale: 1 }} animate={{ scale: [1, 1.4, 0] }} transition={{ duration: 0.4 }} style={{ width: 76, height: 92 }} className="flex items-center justify-center text-4xl">
                  💥
                </motion.div>
              )}
            </AnimatePresence>
            {/* Dây bóng */}
            {!popped && <div style={{ width: 2, height: 26, background: "rgba(120,90,140,0.5)" }} />}
          </div>
        );
      })}
    </div>
  );
}
