import { useEffect, useRef } from "react";
import { playTTSAudio } from "@/lib/tts";
import { toSpeechText } from "@/lib/speech-text";
import { celebrate } from "@/lib/confetti";

// Helper chung cho mọi engine: prompt hiển thị + đọc TTS + tự đọc khi vào + confetti khi đúng.
export function useModeExtras(g: any, question: { id: string }) {
  const fired = useRef(false);
  const displayPrompt =
    g.renderMode === "addition" ? `${g.targetCount} + ${g.targetCount2 || 0} = ?`
    : g.renderMode === "subtraction" ? `${g.targetCount} - ${g.targetCount2 || 0} = ?`
    : g.prompt;
  const speak = () => playTTSAudio(toSpeechText(displayPrompt), () => {});

  useEffect(() => {
    fired.current = false;
    const t = setTimeout(speak, 450);
    return () => clearTimeout(t);
  }, [question.id, g.prompt]);

  useEffect(() => {
    if (g.isCorrect && !fired.current) { fired.current = true; celebrate(); }
  }, [g.isCorrect]);

  return { displayPrompt, speak };
}
