"use client";
import { assetUrl } from "@/lib/assets";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2 } from "lucide-react";
import { useGameMode } from "@/lib/hooks/useGameMode";
import { playTTSAudio } from "@/lib/tts";
import { toSpeechText } from "@/lib/speech-text";
import { HighlightText } from "@/components/ui/HighlightText";
import { celebrate } from "@/lib/confetti";
import { ANSWER_SCHEMES } from "@/lib/design/palette";
import { GameModeProps } from "../BaseGameShell";
import GardenScene from "../ui/GardenScene";
import AnswerButton from "../ui/AnswerButton";
import MathVisual from "../ui/MathVisual";
import GlossySprite from "../ui/GlossySprite";

interface Props extends GameModeProps { bg?: string; objects?: string[]; }

// ĐÁNH BOSS: boss rồng có 3 tim, trả lời đúng → ném bóng → boss mất tim & rung lắc.
export default function BossBattleMode({ question, onAnswer, bg, objects }: Props) {
  const g = useGameMode(question, onAnswer);
  const [hearts, setHearts] = useState(3);
  const [throwing, setThrowing] = useState(false);
  const fired = useRef(false);

  const displayPrompt =
    g.renderMode === "addition" ? `${g.targetCount} + ${g.targetCount2 || 0} = ?`
    : g.renderMode === "subtraction" ? `${g.targetCount} - ${g.targetCount2 || 0} = ?`
    : g.prompt;
  const speak = () => playTTSAudio(toSpeechText(displayPrompt), () => {});

  useEffect(() => { setHearts(3); fired.current = false; const t = setTimeout(speak, 450); return () => clearTimeout(t); }, [question.id, g.prompt]);

  useEffect(() => {
    if (g.isCorrect === true && !fired.current) {
      fired.current = true;
      setThrowing(true);
      setTimeout(() => { setHearts(0); celebrate(); }, 500);
    }
  }, [g.isCorrect]);

  return (
    <div className="relative w-full min-h-[100dvh] overflow-hidden">
      <GardenScene src={bg} />
      <div className="relative z-10 flex flex-col min-h-[100dvh] px-4 pt-14 pb-6 max-w-xl mx-auto">
        {/* Boss */}
        <div className="flex flex-col items-center mb-2">
          <div className="flex gap-1 mb-1">
            {[0, 1, 2].map((i) => (
              <motion.span key={i} animate={{ scale: hearts <= i ? 0 : 1 }} className="text-2xl">❤️</motion.span>
            ))}
          </div>
          <GlossySprite src=assetUrl('/sprites/dragon.png') size={160}
            animate={g.isAnswered && g.isCorrect ? { x: [0, -12, 12, -8, 8, 0], rotate: [0, -5, 5, 0] } : { y: [0, -8, 0] }}
            transition={g.isAnswered ? { duration: 0.5 } : { repeat: Infinity, duration: 2 }}
            className={hearts === 0 ? "grayscale brightness-90" : ""} />
        </div>

        {/* Prompt */}
        <div className="bg-white rounded-[26px] p-4 shadow-[0_10px_28px_rgba(80,60,100,0.22)] border-2 border-white mb-3">
          <div className="flex items-center gap-3">
            <button onClick={speak} className="flex-shrink-0 w-11 h-11 bg-pink-100 rounded-full flex items-center justify-center active:scale-90 transition">
              <Volume2 className="w-5 h-5 text-pink-500" />
            </button>
            <p className="text-base font-extrabold text-[#5A4A6A] leading-snug"><HighlightText text={displayPrompt} /></p>
          </div>
        </div>

        {/* Vật đếm (nếu có) */}
        {g.targetCount > 0 && g.targetCount <= 20 && (
          <div className="rounded-[32px] px-4 py-3 w-full mb-3" style={{ background: "rgba(255,255,255,0.4)", backdropFilter: "blur(10px)", border: "2px solid rgba(255,255,255,0.6)" }}>
            <MathVisual renderMode={g.renderMode} count={g.targetCount} count2={g.targetCount2}
              icon={objects?.length ? objects[0] : g.objectIcon} icon2={objects?.[1] || g.objectIcon2} compact />
          </div>
        )}

        {/* Quả bóng bay tới boss khi đúng */}
        <AnimatePresence>
          {throwing && (
            <motion.div
              initial={{ bottom: 200, left: "50%", opacity: 1 }}
              animate={{ bottom: "75%", opacity: [1, 1, 0] }}
              transition={{ duration: 0.5 }}
              className="absolute text-4xl z-40"
            >⚡</motion.div>
          )}
        </AnimatePresence>

        <div className="flex-1" />

        {/* Banner */}
        <AnimatePresence>
          {g.isAnswered && (
            <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }}
              className="mx-auto mb-3 px-6 py-2.5 rounded-3xl font-black text-lg shadow-lg"
              style={{ background: g.isCorrect ? "#6FD08C" : "#FFCF5C", color: g.isCorrect ? "#fff" : "#7A560F", fontFamily: "'Mochiy Pop One', system-ui" }}>
              {g.isCorrect ? "Hạ gục Boss! 🎉" : "Hụt rồi, thử lại 💪"}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Đáp án = đòn tấn công */}
        <div className="grid grid-cols-2 gap-3.5">
          {g.options.map((opt, i) => (
            <AnswerButton key={`${opt}-${i}`} label={opt} scheme={ANSWER_SCHEMES[i % ANSWER_SCHEMES.length]}
              state={!g.isAnswered ? "idle" : String(opt) === String(g.correctAnswer) ? (g.isCorrect ? "correct" : "reveal") : String(opt) === String(g.selectedOption) ? "wrong" : "dimmed"}
              disabled={g.isAnswered} onClick={() => g.handleSelect(opt)} />
          ))}
        </div>
      </div>
    </div>
  );
}
