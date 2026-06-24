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

      <div className="relative z-10 flex flex-col min-h-[100dvh] px-4 pt-16 pb-7 max-w-xl mx-auto">
        {/* Speech bubble (chữ to) */}
        <motion.div
          key={question.id}
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-white rounded-[28px] p-4 pr-5 shadow-[0_12px_30px_rgba(80,60,100,0.22)] border-2 border-white"
        >
          <div className="flex items-center gap-3">
            <button
              onClick={speak}
              className="flex-shrink-0 w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center hover:bg-pink-200 active:scale-90 transition shadow-sm"
            >
              <Volume2 className="w-6 h-6 text-pink-500" />
            </button>
            <p className="text-lg font-extrabold text-[#5A4A6A] leading-snug">
              <HighlightText text={displayPrompt} />
            </p>
          </div>
        </motion.div>

        {/* Vùng tập trung: panel kính mờ làm dịu nền, vật đếm nổi trên mặt sạch */}
        <div className="flex-1 flex flex-col items-center justify-center py-4">
          {showObjects && g.targetCount > 0 && g.targetCount <= 20 && (
            <div
              className={`rounded-[40px] w-full ${answerMode !== "grid" ? "px-4 py-3" : "px-5 py-6"}`}
              style={{
                background: "rgba(255,255,255,0.4)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                border: "2px solid rgba(255,255,255,0.6)",
                boxShadow: "0 12px 36px rgba(80,50,100,0.18), inset 0 2px 6px rgba(255,255,255,0.7)",
              }}
            >
              <MathVisual
                renderMode={g.renderMode}
                count={g.targetCount}
                count2={g.targetCount2}
                icon={objects && objects.length ? pickFrom(objects, question.id) : g.objectIcon}
                icon2={objects && objects.length > 1 ? pickFrom(objects, question.id + "_b") : g.objectIcon2}
                compact={answerMode !== "grid"}
              />
            </div>
          )}
        </div>

        {/* Banner phản hồi */}
        <AnimatePresence>
          {g.isAnswered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mx-auto mb-3 px-6 py-2.5 rounded-3xl font-black text-xl shadow-lg"
              style={{
                background: g.isCorrect ? "#6FD08C" : "#FFCF5C",
                color: g.isCorrect ? "#fff" : "#7A560F",
                fontFamily: "'Mochiy Pop One', system-ui",
              }}
            >
              {g.isCorrect ? "Giỏi quá! 🎉" : "Thử lại nhé 💪"}
            </motion.div>
          )}
        </AnimatePresence>

        {hint && !g.isAnswered && (
          <p className="text-center text-white font-black text-sm mb-2" style={{ textShadow: "0 1px 3px rgba(0,0,0,0.45)" }}>{hint}</p>
        )}

        {customAnswers ? (
          customAnswers({ g, themedIcon })
        ) : answerMode === "path" ? (
          <PathAnswers
            options={g.options}
            correctAnswer={g.correctAnswer}
            selectedOption={g.selectedOption}
            isCorrect={g.isCorrect}
            onSelect={g.handleSelect}
          />
        ) : answerMode === "balloon" ? (
          <BalloonAnswers
            options={g.options}
            correctAnswer={g.correctAnswer}
            selectedOption={g.selectedOption}
            isCorrect={g.isCorrect}
            onSelect={g.handleSelect}
          />
        ) : answerMode === "basket" ? (
          <DragBasketAnswers
            options={g.options}
            correctAnswer={g.correctAnswer}
            selectedOption={g.selectedOption}
            isCorrect={g.isCorrect}
            onSelect={g.handleSelect}
          />
        ) : (
          <>
            {/* Mascot to, ngồi rõ trên cỏ phía trái */}
            <div className="flex items-end mb-2">
              <motion.div
                initial={{ scale: 0, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="-ml-1"
              >
                <Mascot mood={mood} size={155} />
              </motion.div>
            </div>

            {/* Đáp án dạng lưới */}
            <div className="grid grid-cols-2 gap-4">
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
          </>
        )}
      </div>
    </div>
  );
}
