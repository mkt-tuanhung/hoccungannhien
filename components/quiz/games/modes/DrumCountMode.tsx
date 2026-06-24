"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameMode } from "@/lib/hooks/useGameMode";
import { useModeExtras } from "@/lib/hooks/useModeExtras";
import { GameModeProps } from "../BaseGameShell";
import GardenScene from "../ui/GardenScene";
import ModeHeader from "../ui/ModeHeader";

interface Props extends GameModeProps { bg?: string; objects?: string[]; }

function playDrum() {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const buf = ctx.createBuffer(1, ctx.sampleRate * 0.15, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 2);
    const src = ctx.createBufferSource();
    const gain = ctx.createGain();
    src.buffer = buf; gain.gain.value = 0.5;
    src.connect(gain); gain.connect(ctx.destination); src.start();
  } catch {}
}

// ĐẬP TRỐNG: bé đập trống đúng số lần = đáp án rồi bấm Xong.
export default function DrumCountMode({ question, onAnswer, bg, objects }: Props) {
  const g = useGameMode(question, onAnswer);
  const { displayPrompt, speak } = useModeExtras(g, question);
  const [beats, setBeats] = useState(0);
  const [ripples, setRipples] = useState<number[]>([]);
  const [shaking, setShaking] = useState(false);
  const answer = Number(g.correctAnswer) || 0;

  useEffect(() => { setBeats(0); setRipples([]); }, [question.id]);

  const hitDrum = () => {
    if (g.isAnswered) return;
    playDrum();
    setBeats(b => b + 1);
    setShaking(true);
    setTimeout(() => setShaking(false), 150);
    const id = Date.now();
    setRipples(r => [...r, id]);
    setTimeout(() => setRipples(r => r.filter(x => x !== id)), 600);
  };

  const done = () => { if (!g.isAnswered) g.handleSelect(beats); };

  const tooMany = beats > answer * 1.5 + 2;

  return (
    <div className="relative w-full min-h-[100dvh] overflow-hidden">
      <GardenScene src={bg} />
      <div className="relative z-10 flex flex-col min-h-[100dvh] px-4 pt-16 pb-6 max-w-xl mx-auto">
        <ModeHeader g={g} displayPrompt={displayPrompt} speak={speak} objects={objects} hint="🥁 Đập trống đúng số lần rồi bấm Xong" />

        <div className="flex-1 flex flex-col items-center justify-center gap-6">
          {/* Bộ đếm */}
          <motion.div className="flex items-center justify-center font-black text-white rounded-full"
            animate={shaking ? { scale: [1, 1.12, 1] } : {}}
            style={{ width: 88, height: 88, fontSize: "2.8rem", fontFamily: "'Mochiy Pop One', system-ui",
              background: tooMany ? "linear-gradient(180deg,#FF7A5C,#FF4757)" : "linear-gradient(180deg,#B49BEC,#9B7DE0)",
              boxShadow: tooMany ? "0 8px 0 #C03020" : "0 8px 0 #7A5CC0", border: "3px solid rgba(255,255,255,0.7)" }}>
            {beats}
          </motion.div>

          {/* Trống */}
          <div className="relative flex items-center justify-center">
            {/* Ripples */}
            <AnimatePresence>
              {ripples.map(id => (
                <motion.div key={id} className="absolute rounded-full border-4 border-white/50 pointer-events-none"
                  initial={{ width: 160, height: 160, opacity: 0.8 }}
                  animate={{ width: 280, height: 280, opacity: 0 }}
                  exit={{}} transition={{ duration: 0.6 }} />
              ))}
            </AnimatePresence>

            <motion.button onClick={hitDrum} disabled={g.isAnswered}
              animate={shaking ? { scale: 0.92 } : { scale: 1 }}
              transition={{ duration: 0.08 }}
              className="relative flex flex-col items-center justify-center select-none"
              style={{ width: 180, height: 180, borderRadius: "50%", cursor: g.isAnswered ? "default" : "pointer" }}>
              {/* Thân trống */}
              <div className="absolute inset-0 rounded-full" style={{ background: "linear-gradient(180deg,#c8915a 0%,#8a5a30 60%,#6a3a18 100%)", boxShadow: "0 12px 0 #4a2a0a, inset 0 4px 8px rgba(255,255,255,0.2)" }} />
              {/* Mặt trống */}
              <div className="absolute rounded-full" style={{ top: 0, left: 0, right: 0, height: "55%",
                background: "radial-gradient(circle at 40% 35%, rgba(255,255,255,0.85), #f5e8c8 60%, #d4b57a)",
                boxShadow: "inset 0 2px 8px rgba(0,0,0,0.15)" }} />
              {/* Dây trống */}
              {[-1, 1].map(s => (
                <div key={s} className="absolute" style={{ width: "85%", height: 4, background: "rgba(80,50,20,0.5)", borderRadius: 2, top: "48%", transform: `rotate(${s * 30}deg)` }} />
              ))}
              <span className="relative z-10 font-black text-amber-900/60 text-5xl mt-2" style={{ fontFamily: "'Mochiy Pop One', system-ui", userSelect: "none" }}>🥁</span>
            </motion.button>
          </div>

          {tooMany && !g.isAnswered && (
            <p className="text-white font-black text-sm" style={{ textShadow: "0 1px 3px rgba(0,0,0,0.4)" }}>
              Nhiều quá rồi! Bấm Xong để thử lại
            </p>
          )}

          {g.isAnswered && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="px-8 py-3 rounded-3xl font-black text-xl"
              style={{ background: g.isCorrect ? "#6FD08C" : "#FFCF5C", color: g.isCorrect ? "#fff" : "#7A560F", fontFamily: "'Mochiy Pop One', system-ui" }}>
              {g.isCorrect ? `${answer} lần — đúng rồi! 🎉` : `Cần đập ${answer} lần`}
            </motion.div>
          )}
        </div>

        <motion.button onClick={done} disabled={g.isAnswered} whileTap={{ y: 6 }}
          className="w-full rounded-[24px] py-4 font-black text-2xl text-white mt-4"
          style={{ background: g.isAnswered ? "#bbb" : "#6FD08C", boxShadow: g.isAnswered ? "none" : "0 7px 0 #4FB571", fontFamily: "'Mochiy Pop One', system-ui" }}>
          {g.isAnswered ? (g.isCorrect ? "Giỏi quá! 🎉" : "Thử lại nhé 💪") : `Xong (${beats} lần) ✓`}
        </motion.button>
      </div>
    </div>
  );
}
