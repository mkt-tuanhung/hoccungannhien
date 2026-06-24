"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect } from "react";
import confetti from "canvas-confetti";

interface LessonCompleteProps {
  score: number;
  totalQuestions: number;
  subject: string;
}

export function LessonComplete({ score, totalQuestions, subject }: LessonCompleteProps) {
  useEffect(() => {
    // Tự động phát âm thanh chúc mừng
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance("Tuyệt vời quá! Chúc mừng con đã hoàn thành bài học!");
      utterance.lang = "vi-VN";
      utterance.rate = 0.9;
      utterance.pitch = 1.2;
      window.speechSynthesis.speak(utterance);
    }

    // Hiệu ứng pháo hoa
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto text-center py-12 space-y-8">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", bounce: 0.5 }}
      >
        <span className="text-9xl">🌟</span>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-4xl font-extrabold text-primary mb-4">Tuyệt vời quá!</h2>
        <p className="text-xl text-muted-foreground">
          Bé đã hoàn thành xuất sắc bài học hôm nay!
        </p>
      </motion.div>

      <motion.div 
        className="bg-white p-8 rounded-3xl border-4 border-primary/20 flex justify-center gap-12 shadow-xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div className="text-center">
          <p className="text-lg text-muted-foreground mb-2">Điểm XP</p>
          <p className="text-5xl font-black text-blue-500">+{score * 10}</p>
        </div>
        <div className="text-center">
          <p className="text-lg text-muted-foreground mb-2">Sao Thưởng</p>
          <p className="text-5xl font-black text-yellow-500">+{score}</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="pt-8"
      >
        <Link href="/home">
          <Button size="lg" className="text-2xl px-16 py-8 rounded-full shadow-lg bg-primary hover:bg-primary/90 text-white font-bold transition-transform hover:scale-105 active:scale-95">
            Tiếp tục học
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
