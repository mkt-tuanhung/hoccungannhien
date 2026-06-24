"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { LessonComplete } from "./LessonComplete";

export interface Question {
  id: string;
  type: "multiple_choice" | "matching" | "fill_in_blank";
  prompt: string;
  promptLang?: "en-US" | "vi-VN";
  emoji?: string;
  imageUrl?: string;
  options: any[];
  correctAnswer: any;
  hint?: string;
  explanation?: string;
}

interface QuizEngineProps {
  subject: string;
  questions: Question[];
  onComplete: (score: number, stars: number) => void;
}

import { getTTSUrl } from "@/lib/tts";

export function QuizEngine({ subject, questions, onComplete }: QuizEngineProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<any>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const router = useRouter();

  const currentQ = questions[currentIndex];

  // Tải ngầm TẤT CẢ âm thanh ngay khi vừa mở trang (Preload)
  useEffect(() => {
    if (!questions || questions.length === 0) return;
    
    const textsToPreload = new Set<string>();
    questions.forEach(q => {
      if (q.prompt) textsToPreload.add(q.prompt);
      if (q.hint) textsToPreload.add(q.hint);
      q.options.forEach(opt => {
        const text = typeof opt === 'object' ? opt.label : opt;
        if (text) textsToPreload.add(text);
      });
    });

    // Bắt đầu tải ngầm ngay lập tức bằng thẻ Audio để browser cache
    textsToPreload.forEach(text => {
       const url = getTTSUrl(text);
       if (url) {
         const audio = new Audio();
         audio.src = url;
         audio.load();
       }
    });
  }, [questions]);

  const playAudio = async (text: string, forceLang?: string) => {
    const url = getTTSUrl(text);
    if (!url) return;

    try {
      const audio = new Audio(url);
      
      // Stop old audio if playing
      if (window as any) {
        if ((window as any).currentAudio) {
          (window as any).currentAudio.pause();
        }
        (window as any).currentAudio = audio;
      }
      
      // Sử dụng API Promise để phát mượt mà
      await audio.play();
    } catch (error) {
      console.error("Local TTS failed, falling back to browser TTS", error);
      if ('speechSynthesis' in window) {
        const cleanText = text.replace(/🔊/g, '').trim();
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = forceLang || 'vi-VN'; 
        utterance.rate = utterance.lang === 'en-US' ? 0.75 : 0.85; 
        utterance.pitch = 1.2; 
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  if (currentIndex >= questions.length && questions.length > 0) {
    return <LessonComplete score={score} totalQuestions={questions.length} subject={subject} />;
  }

  if (!currentQ) {
    return (
      <div className="w-full max-w-2xl mx-auto text-center py-12">
        <h2 className="text-2xl font-bold text-muted-foreground">Bài học này đang được chuẩn bị, bé quay lại sau nhé! 🌸</h2>
      </div>
    );
  }

  const handleCheck = () => {
    if (selectedAnswer === null) return;
    const correct = selectedAnswer === currentQ.correctAnswer;
    setIsCorrect(correct);
    setIsChecked(true);
    if (correct) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(curr => curr + 1);
      setSelectedAnswer(null);
      setIsChecked(false);
      setShowHint(false);
    } else {
      // Show complete screen (handled by render)
      setCurrentIndex(curr => curr + 1);
      onComplete(score + (isCorrect ? 1 : 0), (score + (isCorrect ? 1 : 0)) * 2);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8 bg-white/50 h-4 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-primary"
          initial={{ width: `${(currentIndex / questions.length) * 100}%` }}
          animate={{ width: `${((currentIndex + (isChecked ? 1 : 0)) / questions.length) * 100}%` }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
        >
          <Card className="border-none shadow-lg rounded-3xl overflow-hidden bg-white">
            <CardContent className="p-8 space-y-6">
              <div className="flex justify-between items-start">
                <h2 className="text-2xl font-bold text-foreground">Câu {currentIndex + 1}</h2>
                <Button variant="ghost" className="text-muted-foreground" onClick={() => setShowHint(true)}>
                  💡 Gợi ý
                </Button>
              </div>

              <div className="text-center space-y-4 py-4">
                <button 
                  onClick={() => playAudio(currentQ.prompt, currentQ.promptLang)}
                  className="bg-primary/10 text-primary px-6 py-2 rounded-full font-bold text-lg hover:bg-primary/20 active:scale-95 transition-transform flex items-center gap-2 mx-auto cursor-pointer shadow-sm border-2 border-primary/20"
                >
                  {currentQ.prompt} (Bấm để nghe)
                </button>
                
                {currentQ.imageUrl && (
                  <div className="w-48 h-48 mx-auto my-6 animate-bounce-slow bg-white rounded-3xl p-4 shadow-sm border border-primary/10">
                    <img src={currentQ.imageUrl} alt="Illustration" className="w-full h-full object-contain" />
                  </div>
                )}
                
                {currentQ.emoji && (
                  <div className="text-8xl py-6 animate-bounce-slow">
                    {currentQ.emoji}
                  </div>
                )}
              </div>

              {showHint && currentQ.hint && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }} 
                  animate={{ opacity: 1, height: 'auto' }} 
                  className="bg-yellow-50 text-yellow-800 p-4 rounded-2xl border border-yellow-200 cursor-pointer"
                  onClick={() => playAudio(currentQ.hint!, 'vi-VN')}
                >
                  <p className="flex items-center gap-2"><span>👩‍🏫</span> {currentQ.hint} 🔊</p>
                </motion.div>
              )}

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {currentQ.options.map((optRaw, i) => {
                    const isObject = typeof optRaw === 'object' && optRaw !== null;
                    const optValue = isObject ? optRaw.value : optRaw;
                    const optImageUrl = isObject ? optRaw.imageUrl : undefined;
                    const optEmoji = isObject ? optRaw.emoji : undefined;
                    const optLabel = isObject ? optRaw.label : optRaw;
                    const optLang = isObject ? optRaw.lang : undefined;
                    
                    const isSelected = selectedAnswer === optValue;
                    let bgClass = "bg-white border-secondary/20 hover:bg-secondary/10 hover:border-primary";
                    
                    if (isChecked) {
                      if (optValue === currentQ.correctAnswer) {
                        bgClass = "bg-green-100 border-green-500 text-green-700";
                      } else if (isSelected) {
                        bgClass = "bg-red-100 border-red-500 text-red-700";
                      } else {
                        bgClass = "bg-white border-secondary/20 opacity-50";
                      }
                    } else if (isSelected) {
                      bgClass = "bg-primary/10 border-primary text-primary font-bold";
                    }

                    return (
                      <button
                        key={i}
                        disabled={isChecked}
                        onClick={() => {
                          setSelectedAnswer(optValue);
                          playAudio(optLabel, optLang || currentQ.promptLang);
                        }}
                        className={`p-4 rounded-3xl border-4 text-center text-xl font-extrabold transition-all ${bgClass} ${!isChecked && 'active:scale-95'} flex flex-col items-center justify-center gap-2 h-40`}
                      >
                        {optImageUrl && <img src={optImageUrl} alt={optLabel} className="w-20 h-20 object-contain" />}
                        {optEmoji && <span className="text-6xl">{optEmoji}</span>}
                        {(!optImageUrl && !optEmoji) && <span>{optLabel}</span>}
                      </button>
                    );
                  })}
                </div>

              <div className="pt-6 flex justify-end">
                {!isChecked ? (
                  <Button 
                    size="lg" 
                    className="w-full md:w-auto px-8 rounded-full"
                    disabled={selectedAnswer === null}
                    onClick={handleCheck}
                  >
                    Kiểm tra
                  </Button>
                ) : (
                  <Button 
                    size="lg" 
                    className="w-full md:w-auto px-8 rounded-full"
                    onClick={handleNext}
                  >
                    {currentIndex < questions.length - 1 ? "Câu tiếp theo" : "Hoàn thành"}
                  </Button>
                )}
              </div>

              {/* Feedback Animation */}
              {isChecked && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-2xl mt-4 ${isCorrect ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}
                >
                  <p className="font-bold flex items-center gap-2">
                    {isCorrect ? '🌟 Giỏi quá! Đáp án chính xác!' : '😅 Không sao đâu, thử lại lần sau nhé!'}
                  </p>
                  {currentQ.explanation && (
                    <p className="mt-2 text-sm">{currentQ.explanation}</p>
                  )}
                </motion.div>
              )}

            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
