"use client";

import { useState } from "react";
import { QuestionTemplate } from "@/types/game";
import { AnimatePresence, motion } from "framer-motion";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import BaseGameShell from "./games/BaseGameShell";
import MatchingMode from "./games/modes/MatchingMode";
import DragCountMode from "./games/modes/DragCountMode";
import NumberTraceMode from "./games/modes/NumberTraceMode";

/**
 * 5 chế độ chơi cơ bản — rõ ràng, không loạn:
 *
 *  1. CHỌN THẺ (default)  — BaseGameShell, lưới 4 nút, phù hợp mọi dạng câu hỏi trắc nghiệm
 *  2. KÉO THẢ / ĐẾM       — DragCountMode, bé chạm để bỏ đúng số lượng vào rổ
 *  3. TÔ SỐ               — NumberTraceMode, bé tô theo nét số
 *  4. GHÉP CẶP            — MatchingMode, nối số / hình tương ứng
 *  5. ĐIỀN VÀO CHỖ TRỐNG  — BaseGameShell (answerMode="path"), chọn số điền vào ô
 *
 * Routing chỉ dựa trên từ khoá trong prompt — không đoán mò theo question.type.
 */

const DRAG_KEYWORDS   = ['kéo thả', 'bỏ vào rổ', 'bỏ vào giỏ', 'thả vào', 'đặt vào', 'bỏ vào nồi', 'bỏ vào hộp'];
const TRACE_KEYWORDS  = ['tô theo', 'viết số', 'vẽ số', 'tập viết', 'tô số'];
const MATCH_KEYWORDS  = ['nối', 'ghép', 'tìm cặp', 'ghép đôi'];
const COUNT_KEYWORDS  = ['đếm xem', 'đếm số', 'có bao nhiêu', 'có mấy'];
const FILL_KEYWORDS   = ['điền vào', 'điền số', 'ô trống', 'chỗ trống', 'còn thiếu'];

type Mode = "choice" | "drag" | "trace" | "match" | "fill";

function detectMode(prompt: string): Mode {
  const p = prompt.toLowerCase();
  if (TRACE_KEYWORDS.some(k => p.includes(k)))  return "trace";
  if (MATCH_KEYWORDS.some(k => p.includes(k)))   return "match";
  if (DRAG_KEYWORDS.some(k => p.includes(k)))    return "drag";
  if (COUNT_KEYWORDS.some(k => p.includes(k)))   return "drag";  // đếm → kéo thả đếm
  if (FILL_KEYWORDS.some(k => p.includes(k)))    return "fill";
  return "choice";
}

const playTone = (freq: number, dur: number) => {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + dur);
  } catch {}
};

interface GameOrchestratorProps {
  questions: QuestionTemplate[];
  onGameComplete: (score: number) => void;
  onProgress?: (current: number, total: number, score: number) => void;
  bg?: string;
  objects?: string[];
}

export default function GameOrchestrator({ questions, onGameComplete, onProgress, bg, objects }: GameOrchestratorProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);

  const currentQuestion = questions[currentIndex];

  const handleNext = (isCorrect: boolean) => {
    const newScore = isCorrect ? score + 1 : score;
    if (isCorrect) setScore(newScore);

    if (currentIndex < questions.length - 1) {
      setTimeout(() => {
        playTone(560, 0.12);
        const next = currentIndex + 1;
        setCurrentIndex(next);
        onProgress?.(next, questions.length, newScore);
      }, 300);
    } else {
      setTimeout(() => onGameComplete(newScore), 300);
    }
  };

  if (!currentQuestion) return null;

  return (
    <div className="relative w-full h-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full"
        >
          <ErrorBoundary key={currentIndex}>
            {(() => {
              const q = currentQuestion;
              const prompt = (q as any).prompt || (q as any).promptTemplate || "";
              const mode = detectMode(prompt);

              if (mode === "trace")
                return <NumberTraceMode question={q} onAnswer={handleNext} bg={bg} objects={objects} />;

              if (mode === "match")
                return <MatchingMode question={q} onAnswer={handleNext} bg={bg} objects={objects} />;

              if (mode === "drag")
                return <DragCountMode question={q} onAnswer={handleNext} bg={bg} objects={objects} />;

              if (mode === "fill")
                return <BaseGameShell question={q} onAnswer={handleNext} bg={bg} objects={objects} answerMode="path" showObjects={true} />;

              // default: chọn thẻ
              return <BaseGameShell question={q} onAnswer={handleNext} bg={bg} objects={objects} answerMode="grid" showObjects={true} />;
            })()}
          </ErrorBoundary>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
