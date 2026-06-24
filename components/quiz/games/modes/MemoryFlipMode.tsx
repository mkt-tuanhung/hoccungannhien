"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useGameMode } from "@/lib/hooks/useGameMode";
import { useModeExtras } from "@/lib/hooks/useModeExtras";
import { PALETTE } from "@/lib/design/palette";
import { GameModeProps } from "../BaseGameShell";
import GardenScene from "../ui/GardenScene";
import ModeHeader from "../ui/ModeHeader";
import { celebrate } from "@/lib/confetti";

interface Props extends GameModeProps { bg?: string; objects?: string[]; }

// GHÉ CẶP THẺ NHỚ: 6 thẻ úp mặt (3 cặp: phép tính + đáp án). Lật từng cặp đúng → biến mất.
export default function MemoryFlipMode({ question, onAnswer, bg, objects }: Props) {
  const g = useGameMode(question, onAnswer);
  const { displayPrompt, speak } = useModeExtras(g, question);

  // Tạo 3 cặp: 1 phép tính = đáp án đúng, 2 cặp phụ
  const buildCards = () => {
    const pairs: { id: string; text: string; pairId: number }[] = [];
    const options = g.options.slice(0, 3);
    options.forEach((opt, i) => {
      const eq = i === 0 ? displayPrompt.replace("=?", "=").replace("= ?", "=") + String(opt)
        : `${opt} + 0 = ${opt}`;
      pairs.push({ id: `q${i}`, text: i === 0 ? displayPrompt.replace("= ?", "=?") : `? = ${opt}`, pairId: i });
      pairs.push({ id: `a${i}`, text: String(opt), pairId: i });
    });
    // Xáo trộn
    return pairs.sort(() => Math.random() - 0.5);
  };

  const [cards, setCards] = useState(() => buildCards());
  const [flipped, setFlipped] = useState<string[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const [locked, setLocked] = useState(false);

  const optsLen = g.options.length;
  useEffect(() => {
    if (optsLen === 0) return;
    setCards(buildCards());
    setFlipped([]); setMatched([]); setLocked(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question.id, optsLen]);

  const flip = (id: string) => {
    if (locked || flipped.includes(id) || matched.includes(id) || g.isAnswered) return;
    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setLocked(true);
      const [a, b] = newFlipped.map(fid => cards.find(c => c.id === fid)!);
      if (a.pairId === b.pairId) {
        const newMatched = [...matched, a.id, b.id];
        setMatched(newMatched);
        setFlipped([]);
        setLocked(false);
        if (newMatched.length === cards.length) {
          celebrate();
          // Đúng nếu đã match hết — pass đáp án đúng
          setTimeout(() => g.handleSelect(g.correctAnswer), 600);
        }
      } else {
        setTimeout(() => { setFlipped([]); setLocked(false); }, 900);
      }
    }
  };

  const COLORS = [PALETTE.sky, PALETTE.sun, PALETTE.coral, PALETTE.mint, PALETTE.lav, PALETTE.pink];

  return (
    <div className="relative w-full min-h-[100dvh] overflow-hidden">
      <GardenScene src={bg} />
      <div className="relative z-10 flex flex-col min-h-[100dvh] px-4 pt-16 pb-6 max-w-xl mx-auto">
        <ModeHeader g={g} displayPrompt={displayPrompt} speak={speak} objects={objects} hint="🃏 Lật thẻ ghép cặp phép tính với đáp án" />

        <div className="flex-1 flex items-center justify-center">
          <div className="grid grid-cols-3 gap-4 w-full max-w-sm">
            {cards.map((card) => {
              const isFlipped = flipped.includes(card.id) || matched.includes(card.id);
              const isMatched = matched.includes(card.id);
              const c = COLORS[card.pairId % COLORS.length];
              return (
                <motion.button key={card.id} onClick={() => flip(card.id)}
                  disabled={isFlipped || locked || g.isAnswered}
                  whileTap={!isFlipped ? { scale: 0.92 } : {}}
                  animate={isMatched ? { scale: [1, 1.1, 0], opacity: [1, 1, 0] } : {}}
                  transition={isMatched ? { duration: 0.5, delay: 0.2 } : {}}
                  className="relative overflow-hidden flex items-center justify-center font-black"
                  style={{ height: 90, borderRadius: 18, fontFamily: "'Mochiy Pop One', system-ui",
                    background: isFlipped
                      ? `linear-gradient(180deg,${c.face},${c.lip})`
                      : "linear-gradient(180deg,#B49BEC,#9B7DE0)",
                    boxShadow: isFlipped ? `0 5px 0 ${c.lip}` : "0 5px 0 #7A5CC0",
                    border: "3px solid rgba(255,255,255,0.7)",
                    color: "#fff", fontSize: isFlipped ? (card.text.length > 5 ? "0.9rem" : "1.5rem") : "2rem" }}>
                  {/* Gloss */}
                  <div className="absolute left-2 right-2 pointer-events-none"
                    style={{ top: 4, height: "40%", borderRadius: 12, background: "linear-gradient(180deg,rgba(255,255,255,0.55),rgba(255,255,255,0.02))" }} />
                  <span className="relative z-10">{isFlipped ? card.text : "?"}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {g.isAnswered && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mx-auto mb-4 px-8 py-3 rounded-3xl font-black text-xl"
            style={{ background: "#6FD08C", color: "#fff", boxShadow: "0 6px 0 #4FB571", fontFamily: "'Mochiy Pop One', system-ui" }}>
            Ghép hết rồi! 🎉
          </motion.div>
        )}
      </div>
    </div>
  );
}
