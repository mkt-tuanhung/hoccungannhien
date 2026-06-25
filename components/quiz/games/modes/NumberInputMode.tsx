"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, Delete } from "lucide-react";
import { GameModeProps } from "../BaseGameShell";
import GardenScene from "../ui/GardenScene";
import { playTTSAudio } from "@/lib/tts";
import { toSpeechText } from "@/lib/speech-text";
import { celebrate } from "@/lib/confetti";

interface Props extends GameModeProps { bg?: string; objects?: string[]; }

// Kiểm tra đáp án linh hoạt theo ngữ nghĩa câu hỏi
function checkAnswer(input: number, prompt: string, correctAnswer: any): boolean {
  const p = prompt.toLowerCase();

  // "lớn hơn số X" hoặc "nhiều hơn X" → bất kỳ số nào > X đều đúng
  if (p.includes('lớn hơn') || p.includes('nhiều hơn')) {
    const ref = extractRefNumber(p) ?? Number(correctAnswer);
    return Number.isFinite(ref) && input > ref && input <= 100;
  }
  // "bé hơn / nhỏ hơn / ít hơn số X" → số nào < X đều đúng
  if (p.includes('bé hơn') || p.includes('nhỏ hơn') || p.includes('ít hơn')) {
    const ref = extractRefNumber(p) ?? Number(correctAnswer);
    return Number.isFinite(ref) && input < ref && input >= 0;
  }
  // Mặc định: phải đúng chính xác
  return input === Number(correctAnswer);
}

function extractRefNumber(p: string): number | null {
  // "lớn hơn số 7" → 7; "bé hơn 10" → 10
  const m = p.match(/(?:số|hơn|hơn\s+số)\s+(\d+)/);
  return m ? parseInt(m[1]) : null;
}

function buildHint(prompt: string, correctAnswer: any): string {
  const p = prompt.toLowerCase();
  if (p.includes('lớn hơn') || p.includes('nhiều hơn')) {
    const ref = extractRefNumber(p) ?? Number(correctAnswer);
    return `Nhập số lớn hơn ${ref} nhé!`;
  }
  if (p.includes('bé hơn') || p.includes('nhỏ hơn') || p.includes('ít hơn')) {
    const ref = extractRefNumber(p) ?? Number(correctAnswer);
    return `Nhập số bé hơn ${ref} nhé!`;
  }
  return "Gõ số rồi bấm ✓";
}

const PAD_KEYS = ['1','2','3','4','5','6','7','8','9','⌫','0','✓'];

const KEY_COLORS = [
  { bg: "#FF9CC2", shadow: "#E07AA0" },
  { bg: "#FFB347", shadow: "#D98A25" },
  { bg: "#87CEEB", shadow: "#5BA8CC" },
  { bg: "#98E094", shadow: "#68B564" },
  { bg: "#DDA0DD", shadow: "#B070B0" },
  { bg: "#F0E68C", shadow: "#C8C064" },
  { bg: "#FF9CC2", shadow: "#E07AA0" },
  { bg: "#FFB347", shadow: "#D98A25" },
  { bg: "#87CEEB", shadow: "#5BA8CC" },
  { bg: "#FF6B6B", shadow: "#CC4444" }, // delete
  { bg: "#98E094", shadow: "#68B564" },
  { bg: "#6FD08C", shadow: "#4FB571" }, // confirm
];

export default function NumberInputMode({ question, onAnswer, bg, objects }: Props) {
  const prompt: string = (question as any).prompt || "";
  const correctAnswer = (question as any).correctAnswer;

  const [input, setInput] = useState("");
  const [showPad, setShowPad] = useState(false);
  const [state, setState] = useState<"idle" | "correct" | "wrong">("idle");
  const [shake, setShake] = useState(false);
  const firedRef = useRef(false);

  const speak = () => playTTSAudio(toSpeechText(prompt), () => {});

  useEffect(() => {
    firedRef.current = false;
    setInput("");
    setState("idle");
    setShowPad(false);
    const t = setTimeout(speak, 450);
    return () => clearTimeout(t);
  }, [question.id]);

  useEffect(() => {
    if (state === "correct" && !firedRef.current) {
      firedRef.current = true;
      celebrate();
    }
  }, [state]);

  const handleKey = (key: string) => {
    if (state !== "idle") return;
    if (key === "⌫") {
      setInput(v => v.slice(0, -1));
      return;
    }
    if (key === "✓") {
      if (!input) return;
      const num = parseInt(input, 10);
      const ok = checkAnswer(num, prompt, correctAnswer);
      if (ok) {
        setState("correct");
        setShowPad(false);
        setTimeout(() => onAnswer(true), 1200);
      } else {
        setState("wrong");
        setShake(true);
        setTimeout(() => { setShake(false); setState("idle"); setInput(""); }, 900);
      }
      return;
    }
    // Giới hạn 2 chữ số
    if (input.length >= 2) return;
    setInput(v => v + key);
  };

  const hint = buildHint(prompt, correctAnswer);
  const displayPrompt = prompt;

  return (
    <div className="relative w-full min-h-[100dvh] overflow-hidden">
      <GardenScene src={bg} />

      <div className="relative z-10 flex flex-col min-h-[100dvh] px-5 pt-14 pb-4 max-w-xl mx-auto">

        {/* Câu hỏi */}
        <motion.div
          key={question.id as string}
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/95 rounded-[22px] px-4 py-3 shadow-[0_8px_24px_rgba(80,60,100,0.2)] border border-white mb-5"
        >
          <div className="flex items-center gap-3">
            <button onClick={speak} className="flex-shrink-0 w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center active:scale-90 transition">
              <Volume2 className="w-5 h-5 text-pink-500" />
            </button>
            <p className="text-[16px] font-extrabold text-[#5A4A6A] leading-snug flex-1">{displayPrompt}</p>
          </div>
        </motion.div>

        {/* Gợi ý */}
        <p className="text-center text-white/90 font-bold text-sm mb-6" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}>
          {hint}
        </p>

        {/* Ô nhập số — to, giữa màn hình */}
        <div className="flex-1 flex items-center justify-center">
          <motion.button
            animate={shake ? { x: [-10, 10, -8, 8, -5, 5, 0] } : { y: [0, -6, 0] }}
            transition={shake ? { duration: 0.5 } : { repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            onClick={() => state === "idle" && setShowPad(p => !p)}
            className="relative flex items-center justify-center"
            style={{
              width: 160, height: 160,
              borderRadius: 40,
              background: state === "correct"
                ? "linear-gradient(145deg,#6FD08C,#4FB571)"
                : state === "wrong"
                ? "linear-gradient(145deg,#FF7070,#CC4444)"
                : "linear-gradient(145deg,#fff,#f5f0ff)",
              boxShadow: state === "correct"
                ? "0 12px 0 #3A9A55, 0 20px 40px rgba(111,208,140,0.4)"
                : state === "wrong"
                ? "0 12px 0 #AA2222, 0 20px 40px rgba(255,100,100,0.4)"
                : "0 12px 0 #C5B8E0, 0 20px 40px rgba(120,80,180,0.2), inset 0 2px 6px rgba(255,255,255,0.8)",
              border: "4px solid rgba(255,255,255,0.9)",
            }}
          >
            {/* Gloss */}
            <div className="absolute top-3 left-4 right-4 h-8 rounded-full pointer-events-none" style={{ background: "linear-gradient(180deg,rgba(255,255,255,0.7),transparent)" }} />

            <span
              className="font-black"
              style={{
                fontSize: input ? 72 : 56,
                fontFamily: "'Mochiy Pop One', system-ui",
                color: state === "correct" ? "#fff" : state === "wrong" ? "#fff" : input ? "#5A3A8A" : "#C8B8E8",
                lineHeight: 1,
                letterSpacing: -2,
              }}
            >
              {state === "correct" ? "✓" : state === "wrong" ? "✗" : (input || "?")}
            </span>

            {/* Gợi ý chạm */}
            {!input && state === "idle" && (
              <span className="absolute bottom-4 text-xs font-bold text-purple-300">Chạm để nhập</span>
            )}
          </motion.button>
        </div>

        {/* Bàn phím số đáng yêu */}
        <AnimatePresence>
          {showPad && state === "idle" && (
            <motion.div
              initial={{ y: 300, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 300, opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
              className="rounded-[32px] p-4 mt-4"
              style={{
                background: "rgba(255,255,255,0.92)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 -8px 40px rgba(120,80,180,0.2), 0 4px 20px rgba(0,0,0,0.1)",
                border: "2px solid rgba(255,255,255,0.8)",
              }}
            >
              {/* Hiển thị số đang nhập */}
              <div className="flex items-center justify-center mb-3 h-12">
                <div className="flex gap-1 items-center">
                  {input ? (
                    input.split("").map((ch, i) => (
                      <motion.span
                        key={i}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-4xl font-black text-purple-600"
                        style={{ fontFamily: "'Mochiy Pop One', system-ui" }}
                      >{ch}</motion.span>
                    ))
                  ) : (
                    <span className="text-2xl font-bold text-gray-300">_ _</span>
                  )}
                </div>
              </div>

              {/* Grid bàn phím 3x4 */}
              <div className="grid grid-cols-3 gap-3">
                {PAD_KEYS.map((key, i) => {
                  const col = KEY_COLORS[i];
                  const isConfirm = key === "✓";
                  const isDel = key === "⌫";
                  return (
                    <motion.button
                      key={key + i}
                      whileTap={{ y: 4, scale: 0.95 }}
                      onClick={() => handleKey(key)}
                      className="flex items-center justify-center rounded-[18px] font-black text-white"
                      style={{
                        height: 64,
                        fontSize: isConfirm ? 28 : isDel ? 22 : 30,
                        fontFamily: "'Mochiy Pop One', system-ui",
                        background: `linear-gradient(160deg, ${col.bg}, ${col.shadow})`,
                        boxShadow: `0 6px 0 ${col.shadow}, 0 8px 16px ${col.bg}55`,
                        border: "2px solid rgba(255,255,255,0.5)",
                      }}
                    >
                      {isDel ? <Delete className="w-6 h-6" /> : key}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Banner kết quả khi đúng */}
        <AnimatePresence>
          {state === "correct" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.7, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="fixed bottom-12 left-1/2 -translate-x-1/2 px-8 py-3 rounded-3xl font-black text-2xl text-white shadow-2xl z-50"
              style={{ background: "#6FD08C", boxShadow: "0 8px 0 #4A9A5C", fontFamily: "'Mochiy Pop One', system-ui" }}
            >
              Giỏi quá! 🎉
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
