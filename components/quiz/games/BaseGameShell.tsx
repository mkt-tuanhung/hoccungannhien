"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2 } from "lucide-react";
import { QuestionTemplate } from "@/types/game";
import { useGameMode } from "@/lib/hooks/useGameMode";
import { playTTSAudio } from "@/lib/tts";
import { toSpeechText } from "@/lib/speech-text";
import { HighlightText } from "@/components/ui/HighlightText";
import { celebrate } from "@/lib/confetti";
import { ANSWER_SCHEMES } from "@/lib/design/palette";
import GardenScene from "./ui/GardenScene";
import Mascot from "./ui/Mascot";
import AnswerButton, { ButtonState } from "./ui/AnswerButton";
import PathAnswers from "./ui/PathAnswers";
import BalloonAnswers from "./ui/BalloonAnswers";
import DragBasketAnswers from "./ui/DragBasketAnswers";
import MathVisual from "./ui/MathVisual";

export interface GameModeProps {
  question: QuestionTemplate;
  onAnswer: (isCorrect: boolean) => void;
}

interface BaseGameShellProps extends GameModeProps {
  showObjects?: boolean;
  bg?: string;
  objects?: string[];
  answerMode?: "grid" | "path" | "balloon" | "basket";
  sceneOverlay?: (ctx: { g: any; displayPrompt: string }) => React.ReactNode;
  customAnswers?: (ctx: { g: any; themedIcon: string }) => React.ReactNode;
  accentEmoji?: string;
  hint?: string;
}

function pickFrom(objects: string[], seed: string): string {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0;
  return objects[Math.abs(h) % objects.length];
}

export default function BaseGameShell({ question, onAnswer, showObjects = true, bg, objects, answerMode = "grid", sceneOverlay, customAnswers, hint }: BaseGameShellProps) {
  const g = useGameMode(question, onAnswer);
  const firedRef = useRef(false);
  const themedIcon = objects && objects.length ? pickFrom(objects, question.id) : g.objectIcon;

  // Prompt khớp số đếm thật cho phép cộng/trừ (vá data JSON ghi lệch)
  const displayPrompt =
    g.renderMode === "addition"
      ? `${g.targetCount} + ${g.targetCount2 || 0} = ?`
      : g.renderMode === "subtraction"
      ? `${g.targetCount} - ${g.targetCount2 || 0} = ?`
      : g.prompt;

  const speak = () => playTTSAudio(toSpeechText(displayPrompt), () => {});

  useEffect(() => {
    firedRef.current = false;
    const t = setTimeout(() => speak(), 450);
    return () => clearTimeout(t);
  }, [question.id, g.prompt]);

  useEffect(() => {
    if (g.isCorrect === true && !firedRef.current) {
      firedRef.current = true;
      celebrate();
    }
  }, [g.isCorrect]);

  const mood = !g.isAnswered ? "idle" : g.isCorrect ? "happy" : "oops";

  const buttonState = (opt: any): ButtonState => {
    if (!g.isAnswered) return "idle";
    if (String(opt) === String(g.correctAnswer)) return g.isCorrect ? "correct" : "reveal";
    if (String(opt) === String(g.selectedOption)) return "wrong";
    return "dimmed";
  };

  return (
    <div className="relative w-full min-h-[100dvh] overflow-hidden">
      <GardenScene src={bg} />
      {sceneOverlay && <div className="absolute inset-0 z-[5] pointer-events-none">{sceneOverlay({ g, displayPrompt })}</div>}

      <div className="relative z-10 flex flex-col min-h-[100dvh] px-4 pt-14 pb-6 max-w-xl mx-auto">

        {/* Câu hỏi — compact */}
        <motion.div
          key={question.id}
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/95 rounded-[22px] px-4 py-3 shadow-[0_8px_24px_rgba(80,60,100,0.2)] border border-white mb-3"
        >
          <div className="flex items-center gap-3">
            <button onClick={speak} className="flex-shrink-0 w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center active:scale-90 transition">
              <Volume2 className="w-5 h-5 text-pink-500" />
            </button>
            <p className="text-[15px] font-extrabold text-[#5A4A6A] leading-snug flex-1">
              <HighlightText text={displayPrompt} />
            </p>
          </div>
        </motion.div>

        {/* Vật đếm — nổi thẳng trên nền cảnh, không hộp kính */}
        {showObjects && g.targetCount > 0 && g.targetCount <= 20 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="flex justify-center items-center py-4 flex-1"
          >
            <MathVisual
              renderMode={g.renderMode}
              count={g.targetCount}
              count2={g.targetCount2}
              icon={g.objectIcon || (objects?.length ? pickFrom(objects, question.id) : '')}
              icon2={g.objectIcon2 || (objects && objects.length > 1 ? pickFrom(objects, question.id + "_b") : '')}
              compact={false}
            />
          </motion.div>
        )}

        {!showObjects && <div className="flex-1" />}

        {/* Banner phản hồi */}
        <AnimatePresence>
          {g.isAnswered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.7, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mx-auto mb-3 px-7 py-2.5 rounded-3xl font-black text-xl shadow-lg"
              style={{ background: g.isCorrect ? "#6FD08C" : "#FFCF5C", color: g.isCorrect ? "#fff" : "#7A560F", fontFamily: "'Mochiy Pop One', system-ui" }}
            >
              {g.isCorrect ? "Giỏi quá! 🎉" : "Thử lại nhé 💪"}
            </motion.div>
          )}
        </AnimatePresence>

        {hint && !g.isAnswered && (
          <p className="text-center text-white/90 font-bold text-sm mb-2" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}>{hint}</p>
        )}

        {/* Khu đáp án — chiếm phần dưới màn hình */}
        {customAnswers ? (
          customAnswers({ g, themedIcon })
        ) : answerMode === "path" ? (
          <PathAnswers options={g.options} correctAnswer={g.correctAnswer} selectedOption={g.selectedOption} isCorrect={g.isCorrect} onSelect={g.handleSelect} />
        ) : answerMode === "balloon" ? (
          <BalloonAnswers options={g.options} correctAnswer={g.correctAnswer} selectedOption={g.selectedOption} isCorrect={g.isCorrect} onSelect={g.handleSelect} />
        ) : answerMode === "basket" ? (
          <DragBasketAnswers options={g.options} correctAnswer={g.correctAnswer} selectedOption={g.selectedOption} isCorrect={g.isCorrect} onSelect={g.handleSelect} />
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {g.options.map((opt, i) => (
              <AnswerButton
                key={`${opt}-${i}`}
                label={opt}
                scheme={ANSWER_SCHEMES[i % ANSWER_SCHEMES.length]}
                state={buttonState(opt)}
                disabled={g.isAnswered}
                onClick={() => g.handleSelect(opt)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
