"use client";
import { assetUrl } from "@/lib/assets";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Volume2 } from "lucide-react";
import { useGameMode, playCorrectSound, playWrongSound } from "@/lib/hooks/useGameMode";
import { celebrate } from "@/lib/confetti";
import { GameModeProps } from "../BaseGameShell";
import GardenScene from "../ui/GardenScene";
import Mascot from "../ui/Mascot";
import { playTTSAudio } from "@/lib/tts";

interface Props extends GameModeProps {
  bg?: string;
  objects?: string[];
}

interface Card {
  id: number;
  val: number;
  kind: "num" | "obj";
}

const PROMPT = "Lật thẻ, ghép số với nhóm đồ vật đúng nhé!";

export default function MatchingMode({ question, onAnswer, bg, objects }: Props) {
  const g = useGameMode(question, onAnswer);
  const icon = objects && objects.length ? objects[0] : g.objectIcon || assetUrl('/sprites/apple.png');

  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [lock, setLock] = useState(false);

  useEffect(() => {
    // Chọn 3 số khác nhau trong 1..9
    const pool = Array.from(new Set([g.targetCount, ...g.options].map(Number).filter((n) => n >= 1 && n <= 9)));
    while (pool.length < 3) { const r = Math.floor(Math.random() * 9) + 1; if (!pool.includes(r)) pool.push(r); }
    const nums = pool.slice(0, 3);
    const deck: Card[] = [];
    nums.forEach((v, i) => {
      deck.push({ id: i * 2, val: v, kind: "num" });
      deck.push({ id: i * 2 + 1, val: v, kind: "obj" });
    });
    setCards(deck.sort(() => Math.random() - 0.5));
    setFlipped([]); setMatched(new Set()); setLock(false);
    const t = setTimeout(() => playTTSAudio(PROMPT, () => {}), 450);
    return () => clearTimeout(t);
  }, [question.id, g.targetCount]);

  const flip = (card: Card) => {
    if (lock || flipped.includes(card.id) || matched.has(card.val)) return;
    const nf = [...flipped, card.id];
    setFlipped(nf);
    if (nf.length === 2) {
      setLock(true);
      const [a, b] = nf.map((id) => cards.find((c) => c.id === id)!);
      if (a.val === b.val) {
        playCorrectSound();
        setTimeout(() => {
          const nm = new Set(matched); nm.add(a.val);
          setMatched(nm); setFlipped([]); setLock(false);
          if (nm.size >= 3) { celebrate(); setTimeout(() => onAnswer(true), 800); }
        }, 600);
      } else {
        playWrongSound();
        setTimeout(() => { setFlipped([]); setLock(false); }, 950);
      }
    }
  };

  return (
    <div className="relative w-full min-h-[100dvh] overflow-hidden">
      <GardenScene src={bg} />
      <div className="relative z-10 flex flex-col min-h-[100dvh] px-4 pt-16 pb-7 max-w-xl mx-auto">
        <div className="relative bg-white rounded-[28px] p-4 shadow-[0_12px_30px_rgba(80,60,100,0.22)] border-2 border-white mb-4">
          <div className="flex items-center gap-3">
            <button onClick={() => playTTSAudio(PROMPT, () => {})} className="flex-shrink-0 w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center active:scale-90 transition">
              <Volume2 className="w-6 h-6 text-pink-500" />
            </button>
            <p className="text-lg font-extrabold text-[#5A4A6A] leading-snug">{PROMPT}</p>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="grid grid-cols-3 gap-3 w-full max-w-md">
            {cards.map((card) => {
              const show = flipped.includes(card.id) || matched.has(card.val);
              return (
                <motion.button
                  key={card.id}
                  onClick={() => flip(card)}
                  whileTap={{ scale: 0.94 }}
                  animate={matched.has(card.val) ? { scale: [1, 1.1, 1] } : {}}
                  className="aspect-square rounded-3xl flex items-center justify-center relative overflow-hidden"
                  style={{
                    background: show
                      ? matched.has(card.val) ? "linear-gradient(180deg,#8fe0a3,#6FD08C)" : "#fff"
                      : "linear-gradient(180deg,#B49BEC,#9576E2)",
                    boxShadow: show ? "0 6px 14px rgba(80,50,100,0.18)" : "0 8px 0 #7d5fcf, 0 12px 16px rgba(80,50,100,0.25)",
                    border: "3px solid rgba(255,255,255,0.8)",
                  }}
                >
                  {show ? (
                    card.kind === "num" ? (
                      <span className="font-black" style={{ fontSize: "2.6rem", color: matched.has(card.val) ? "#fff" : "#6b4fc0", fontFamily: "'Mochiy Pop One', system-ui" }}>{card.val}</span>
                    ) : (
                      <div className="grid grid-cols-3 gap-0.5 p-2">
                        {Array.from({ length: card.val }).map((_, i) => (
                          <img key={i} src={icon} alt="" className="w-5 h-5 object-contain" />
                        ))}
                      </div>
                    )
                  ) : (
                    <span className="text-3xl opacity-90">🐾</span>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        <div className="flex items-end">
          <Mascot mood={matched.size >= 3 ? "happy" : "idle"} size={120} />
        </div>
      </div>
    </div>
  );
}
