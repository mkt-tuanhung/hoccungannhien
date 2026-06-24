import { useState, useEffect, useCallback } from "react";
import { QuestionTemplate } from "@/types/game";
import { generateQuestionData, GameLogicResult } from "@/lib/gameLogic";
import { playTTSAudio } from "@/lib/tts";

const playTone = (freq: number, dur: number, type: OscillatorType = "sine") => {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + dur);
  } catch {}
};

export const playCorrectSound = () => {
  playTone(523, 0.15);
  setTimeout(() => playTone(659, 0.15), 100);
  setTimeout(() => playTone(784, 0.3), 200);
};

export const playWrongSound = () => {
  playTone(330, 0.2, "square");
  setTimeout(() => playTone(262, 0.3, "square"), 150);
};

export interface UseGameModeReturn extends GameLogicResult {
  selectedOption: any;
  isAnswered: boolean;
  isCorrect: boolean | null;
  handleSelect: (option: any) => void;
  playPromptAudio: () => void;
}

export function useGameMode(
  question: QuestionTemplate,
  onAnswer: (isCorrect: boolean) => void,
  numOptions = 4
): UseGameModeReturn {
  const [data, setData] = useState<GameLogicResult | null>(null);
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    const result = generateQuestionData(question, numOptions);
    setData(result);
    setSelectedOption(null);
    setIsCorrect(null);
  }, [question, numOptions]);

  const handleSelect = useCallback(
    (option: any) => {
      if (selectedOption !== null || !data) return;
      setSelectedOption(option);
      const correct = String(option) === String(data.correctAnswer);
      setIsCorrect(correct);
      if (correct) playCorrectSound();
      else playWrongSound();
      setTimeout(() => onAnswer(correct), correct ? 1500 : 2000);
    },
    [selectedOption, data, onAnswer]
  );

  const playPromptAudio = useCallback(() => {
    if (data?.prompt) playTTSAudio(data.prompt, () => {});
  }, [data]);

  const fallback: GameLogicResult = {
    prompt: "",
    correctAnswer: 0,
    options: [],
    objectIcon: "",
    targetCount: 0,
    renderMode: "single",
  };

  return {
    ...(data || fallback),
    selectedOption,
    isAnswered: selectedOption !== null,
    isCorrect,
    handleSelect,
    playPromptAudio,
  };
}
