"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useGameMode } from "@/lib/hooks/useGameMode";
import { useModeExtras } from "@/lib/hooks/useModeExtras";
import { PALETTE, ANSWER_SCHEMES } from "@/lib/design/palette";
import { GameModeProps } from "../BaseGameShell";
import GardenScene from "../ui/GardenScene";
import ModeHeader from "../ui/ModeHeader";

interface Props extends GameModeProps { bg?: string; objects?: string[]; }

// QUAY SỐ: bánh xe quay liên tục, bé bấm DỪNG khi kim chỉ vào đáp án đúng.
export default function SpinWheelMode({ question, onAnswer, bg, objects }: Props) {
  const g = useGameMode(question, onAnswer);
  const { displayPrompt, speak } = useModeExtras(g, question);
  const angleRef = useRef(0);
  const rafRef = useRef<number>(0);
  const [displayAngle, setDisplayAngle] = useState(0);
  const [stopped, setStopped] = useState(false);
  const speed = 2.2; // độ/frame

  const opts = g.options.slice(0, 4);
  const sectionSize = 360 / opts.length;

  // Chạy vòng quay
  useEffect(() => {
    if (stopped) return;
    const tick = () => {
      angleRef.current = (angleRef.current + speed) % 360;
      setDisplayAngle(angleRef.current);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [stopped, question.id]);

  useEffect(() => {
    setStopped(false);
    angleRef.current = 0;
  }, [question.id]);

  const handleStop = () => {
    if (g.isAnswered || stopped) return;
    setStopped(true);
    cancelAnimationFrame(rafRef.current);
    // Kim cố định ở đỉnh (270°), bánh quay góc displayAngle
    // Section nào ở đỉnh = (270 - angle) / sectionSize
    const normalized = ((270 - angleRef.current) % 360 + 360) % 360;
    const idx = Math.floor(normalized / sectionSize) % opts.length;
    g.handleSelect(opts[idx]);
  };

  const COLORS = [PALETTE.sky, PALETTE.sun, PALETTE.coral, PALETTE.mint];

  return (
    <div className="relative w-full min-h-[100dvh] overflow-hidden">
      <GardenScene src={bg} />
      <div className="relative z-10 flex flex-col min-h-[100dvh] px-4 pt-16 pb-6 max-w-xl mx-auto">
        <ModeHeader g={g} displayPrompt={displayPrompt} speak={speak} objects={objects} hint="🎯 Bấm DỪNG khi kim chỉ vào đáp án đúng" />

        <div className="flex-1 flex flex-col items-center justify-center gap-6">
          {/* Bánh xe */}
          <div className="relative" style={{ width: 260, height: 260 }}>
            {/* Kim chỉ cố định ở đỉnh */}
            <div className="absolute z-20 left-1/2 -translate-x-1/2" style={{ top: -16 }}>
              <div style={{ width: 0, height: 0, borderLeft: "10px solid transparent", borderRight: "10px solid transparent", borderTop: "24px solid #FF4757" }} />
            </div>

            <motion.svg width={260} height={260} style={{ rotate: displayAngle }}>
              {opts.map((opt, i) => {
                const startAngle = (i * sectionSize - 90) * (Math.PI / 180);
                const endAngle = ((i + 1) * sectionSize - 90) * (Math.PI / 180);
                const cx = 130, cy = 130, r = 120;
                const x1 = cx + r * Math.cos(startAngle);
                const y1 = cy + r * Math.sin(startAngle);
                const x2 = cx + r * Math.cos(endAngle);
                const y2 = cy + r * Math.sin(endAngle);
                const midAngle = ((i + 0.5) * sectionSize - 90) * (Math.PI / 180);
                const tx = cx + r * 0.65 * Math.cos(midAngle);
                const ty = cy + r * 0.65 * Math.sin(midAngle);
                const c = COLORS[i % COLORS.length];
                const isCorrect = g.isAnswered && String(opt) === String(g.correctAnswer);
                return (
                  <g key={i}>
                    <path d={`M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2} Z`}
                      fill={isCorrect ? "#6FD08C" : c.face}
                      stroke="rgba(255,255,255,0.9)" strokeWidth={3} />
                    <text x={tx} y={ty} textAnchor="middle" dominantBaseline="middle"
                      fill="#fff" fontSize={28} fontWeight="bold" fontFamily="'Mochiy Pop One', system-ui"
                      style={{ textShadow: "0 1px 3px rgba(0,0,0,0.4)" }}>
                      {opt}
                    </text>
                  </g>
                );
              })}
              {/* Trung tâm */}
              <circle cx={130} cy={130} r={24} fill="#fff" stroke="rgba(200,180,220,0.6)" strokeWidth={3} />
              <circle cx={130} cy={130} r={10} fill="#FF4757" />
            </motion.svg>
          </div>

          {/* Feedback */}
          {g.isAnswered && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
              className="px-8 py-3 rounded-3xl font-black text-xl text-white"
              style={{ background: g.isCorrect ? "#6FD08C" : "#FFCF5C", color: g.isCorrect ? "#fff" : "#7A560F",
                boxShadow: "0 6px 0 rgba(0,0,0,0.15)", fontFamily: "'Mochiy Pop One', system-ui" }}>
              {g.isCorrect ? "Chuẩn rồi! 🎉" : `Chưa đúng — đáp án là ${g.correctAnswer}`}
            </motion.div>
          )}

          {/* Nút DỪNG */}
          {!g.isAnswered && (
            <motion.button onClick={handleStop} whileTap={{ scale: 0.92, y: 6 }}
              className="font-black text-white rounded-full"
              style={{ width: 140, height: 140, fontSize: "2rem",
                background: stopped ? "#bbb" : "linear-gradient(180deg,#FF6B6B,#FF4757)",
                boxShadow: stopped ? "none" : "0 10px 0 #C0392B", fontFamily: "'Mochiy Pop One', system-ui" }}>
              {stopped ? "..." : "DỪNG!"}
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}
