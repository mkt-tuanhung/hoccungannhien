"use client";
import { useState } from "react";
import { QuestionTemplate } from "@/types/game";
import { AnimatePresence, motion } from "framer-motion";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import BaseGameShell from "./games/BaseGameShell";

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

interface Props {
  questions: QuestionTemplate[];
  onGameComplete: (score: number) => void;
  onProgress?: (current: number, total: number, score: number) => void;
  bg?: string;
  objects?: string[];
}

export default function GameOrchestrator({ questions, onGameComplete, onProgress, bg, objects }: Props) {
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
            <BaseGameShell question={currentQuestion} onAnswer={handleNext} bg={bg} objects={objects} />
          </ErrorBoundary>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
