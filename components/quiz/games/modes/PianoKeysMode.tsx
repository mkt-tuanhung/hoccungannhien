"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useGameMode } from "@/lib/hooks/useGameMode";
import { useModeExtras } from "@/lib/hooks/useModeExtras";
import { GameModeProps } from "../BaseGameShell";
import GardenScene from "../ui/GardenScene";
import ModeHeader from "../ui/ModeHeader";

interface Props extends GameModeProps { bg?: string; objects?: string[]; }

const NOTES = [261, 294, 330, 349, 392, 440, 494, 523];

function playNote(freq: number, correct: boolean) {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + (correct ? 0.8 : 0.3));
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start(); osc.stop(ctx.currentTime + (correct ? 0.8 : 0.3));
  } catch {}
}

// ĐÀN PIANO: 8 phím mang số, nghe câu hỏi rồi bấm đúng phím đáp án → phát nhạc.
export default function PianoKeysMode({ question, onAnswer, bg, objects }: Props) {
  const g = useGameMode(question, onAnswer);
  const { displayPrompt, speak } = useModeExtras(g, question);
  const [pressed, setPressed] = useState<number | null>(null);

  // Phân bổ 4 options vào 8 phím (vị trí cố định theo id)
  const keyNums: (string | number | null)[] = Array(8).fill(null);
  let seed = 0;
  for (const c of question.id) seed = (seed * 31 + c.charCodeAt(0)) | 0;
  const positions: number[] = [];
  while (positions.length < 4) {
    seed = (seed * 9301 + 49297) % 233280;
    const p = Math.abs(seed) % 8;
    if (!positions.includes(p)) positions.push(p);
  }
  g.options.slice(0, 4).forEach((opt, i) => { keyNums[positions[i]] = opt; });

  const handleKey = (idx: number) => {
    if (g.isAnswered || keyNums[idx] === null) return;
    const opt = keyNums[idx];
    setPressed(idx);
    const isCorrect = String(opt) === String(g.correctAnswer);
    playNote(NOTES[idx], isCorrect);
    setTimeout(() => g.handleSelect(opt), 150);
  };

  const isBlack = [false, true, false, true, false, false, true, false];

  return (
    <div className="relative w-full min-h-[100dvh] overflow-hidden">
      <GardenScene src={bg} />
      <div className="relative z-10 flex flex-col min-h-[100dvh] px-4 pt-16 pb-6 max-w-xl mx-auto">
        <ModeHeader g={g} displayPrompt={displayPrompt} speak={speak} objects={objects} hint="🎹 Bấm phím đàn có đáp án đúng" />

        <div className="flex-1 flex flex-col items-center justify-center gap-6">
          {g.isAnswered && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
              className="px-8 py-3 rounded-3xl font-black text-xl"
              style={{ background: g.isCorrect ? "#6FD08C" : "#FFCF5C", color: g.isCorrect ? "#fff" : "#7A560F",
                boxShadow: "0 6px 0 rgba(0,0,0,0.12)", fontFamily: "'Mochiy Pop One', system-ui" }}>
              {g.isCorrect ? "Hay quá! 🎵" : `Đáp án là ${g.correctAnswer}`}
            </motion.div>
          )}

          {/* Đàn piano */}
          <div className="relative flex items-start" style={{ height: 200 }}>
            {Array.from({ length: 8 }).map((_, i) => {
              const val = keyNums[i];
              const isAns = g.isAnswered && String(val) === String(g.correctAnswer);
              const isSel = pressed === i && g.isAnswered;
              const black = isBlack[i];
              return (
                <motion.button key={i} onClick={() => handleKey(i)}
                  disabled={g.isAnswered || val === null}
                  whileTap={{ y: black ? 5 : 8 }}
                  animate={isAns ? { scale: [1, 1.05, 1] } : {}}
                  className="relative flex items-end justify-center pb-3 font-black select-none"
                  style={{
                    width: black ? 32 : 42,
                    height: black ? 120 : 190,
                    marginLeft: black ? -16 : 0,
                    marginRight: black ? -16 : 0,
                    zIndex: black ? 2 : 1,
                    borderRadius: "0 0 8px 8px",
                    background: isAns ? "#6FD08C" : isSel && !g.isCorrect ? "#FF7A5C"
                      : black ? (val !== null ? "#2d1f4a" : "#1a1a2e") : (val !== null ? "#fff" : "#f0eef8"),
                    boxShadow: black
                      ? "2px 4px 6px rgba(0,0,0,0.5), inset 0 -2px 4px rgba(255,255,255,0.1)"
                      : "2px 6px 8px rgba(0,0,0,0.2), inset 0 -3px 6px rgba(0,0,0,0.08)",
                    border: black ? "none" : "1.5px solid rgba(180,160,200,0.4)",
                    color: black ? "#fff" : "#5A4A6A",
                    fontSize: black ? "0.9rem" : "1.1rem",
                    fontFamily: "'Mochiy Pop One', system-ui",
                    cursor: val === null ? "default" : "pointer",
                  }}>
                  {val !== null ? val : ""}
                </motion.button>
              );
            })}
          </div>

          <p className="text-white/80 text-xs text-center" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.4)" }}>
            Chỉ những phím có số mới hoạt động
          </p>
        </div>
      </div>
    </div>
  );
}
