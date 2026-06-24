"use client";
import { assetUrl } from "@/lib/assets";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useGameMode } from "@/lib/hooks/useGameMode";
import { useModeExtras } from "@/lib/hooks/useModeExtras";
import { PALETTE, ANSWER_SCHEMES } from "@/lib/design/palette";
import { GameModeProps } from "../BaseGameShell";
import GardenScene from "../ui/GardenScene";
import ModeHeader from "../ui/ModeHeader";
import GlossySprite from "../ui/GlossySprite";

interface Props extends GameModeProps { bg?: string; objects?: string[]; }

const COLS = 4;
const BUCKET_W = 70;

// HỨNG SỐ: số rơi từ trên, di chuyển xô trái/phải để hứng đúng số đáp án.
export default function TiltCatchMode({ question, onAnswer, bg, objects }: Props) {
  const g = useGameMode(question, onAnswer);
  const { displayPrompt, speak } = useModeExtras(g, question);
  const [bucketCol, setBucketCol] = useState(Math.floor(COLS / 2));
  const [fallers, setFallers] = useState<{ id: number; col: number; val: any; y: number; speed: number }[]>([]);
  const [caught, setCaught] = useState<any>(null);
  const nextId = useRef(0);
  const rafRef = useRef<number>(0);
  const answeredRef = useRef(false);

  const opts = g.options.slice(0, 4);

  // Spawn fallers
  useEffect(() => {
    answeredRef.current = false;
    setBucketCol(Math.floor(COLS / 2));
    setFallers([]);
    setCaught(null);
    nextId.current = 0;

    if (opts.length === 0) return; // chờ options load xong

    let spawnCount = 0;
    const spawnInterval = setInterval(() => {
      if (answeredRef.current || spawnCount > 16) { clearInterval(spawnInterval); return; }
      const col = Math.floor(Math.random() * COLS);
      const val = opts[Math.floor(Math.random() * opts.length)];
      const id = nextId.current++;
      setFallers(f => [...f, { id, col, val, y: 0, speed: 1.2 + Math.random() * 0.8 }]);
      spawnCount++;
    }, 1200);

    return () => clearInterval(spawnInterval);
  }, [question.id, opts.length]);

  // Animate fallers
  useEffect(() => {
    const tick = () => {
      setFallers(f =>
        f.map(item => ({ ...item, y: item.y + item.speed }))
         .filter(item => item.y < 105 && item.val !== undefined)
      );
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Kiểm tra va chạm
  useEffect(() => {
    if (answeredRef.current || opts.length === 0) return;
    const hit = fallers.find(f => f.col === bucketCol && f.y >= 88 && f.val !== undefined);
    if (hit) {
      answeredRef.current = true;
      setCaught(hit.val);
      cancelAnimationFrame(rafRef.current);
      setFallers([]);
      setTimeout(() => g.handleSelect(hit.val), 400);
    }
  }, [fallers, bucketCol]);

  const colWidth = 100 / COLS;
  const face = (i: number) => PALETTE[ANSWER_SCHEMES[i % ANSWER_SCHEMES.length]];

  return (
    <div className="relative w-full min-h-[100dvh] overflow-hidden">
      <GardenScene src={bg} />
      <div className="relative z-10 flex flex-col min-h-[100dvh] px-4 pt-16 pb-6 max-w-xl mx-auto">
        <ModeHeader g={g} displayPrompt={displayPrompt} speak={speak} objects={objects} hint="◀ ▶ Di chuyển xô hứng số đáp án đúng" />

        <div className="flex-1 flex flex-col">
          {/* Vùng rơi */}
          <div className="relative flex-1 rounded-3xl overflow-hidden" style={{ background: "rgba(255,255,255,0.12)", minHeight: 300 }}>
            {/* Phân làn */}
            {Array.from({ length: COLS - 1 }).map((_, i) => (
              <div key={i} className="absolute top-0 bottom-0 w-px" style={{ left: `${(i + 1) * colWidth}%`, background: "rgba(255,255,255,0.15)" }} />
            ))}

            {/* Số rơi */}
            {fallers.map(f => {
              const c = face(Math.max(0, opts.indexOf(f.val)));
              return (
                <motion.div key={f.id} className="absolute flex items-center justify-center font-black text-white rounded-2xl"
                  style={{ left: `${f.col * colWidth + colWidth / 2}%`, top: `${f.y}%`, transform: "translate(-50%,-50%)",
                    width: 56, height: 56, fontSize: "1.6rem", fontFamily: "'Mochiy Pop One', system-ui",
                    background: `linear-gradient(180deg,${c.face},${c.lip})`,
                    boxShadow: `0 5px 0 ${c.lip}`, border: "2.5px solid rgba(255,255,255,0.7)" }}>
                  {f.val}
                </motion.div>
              );
            })}

            {/* Xô */}
            <motion.div className="absolute bottom-2" style={{ left: `${bucketCol * colWidth + colWidth / 2}%`, transform: "translateX(-50%)" }}
              animate={{ left: `${bucketCol * colWidth + colWidth / 2}%` }} transition={{ type: "spring", stiffness: 400, damping: 28 }}>
              <GlossySprite src={assetUrl('/sprites/basket.png')} size={72} animate={caught !== null ? { scale: [1, 1.2, 1] } : {}} />
            </motion.div>
          </div>

          {/* Feedback */}
          {g.isAnswered && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mx-auto my-3 px-8 py-2.5 rounded-3xl font-black text-xl"
              style={{ background: g.isCorrect ? "#6FD08C" : "#FFCF5C", color: g.isCorrect ? "#fff" : "#7A560F", fontFamily: "'Mochiy Pop One', system-ui" }}>
              {g.isCorrect ? "Hứng chuẩn! 🎉" : `Đáp án là ${g.correctAnswer}`}
            </motion.div>
          )}

          {/* Nút di chuyển */}
          {!g.isAnswered && (
            <div className="flex gap-4 mt-3">
              <motion.button whileTap={{ scale: 0.9 }} onClick={() => setBucketCol(c => Math.max(0, c - 1))}
                className="flex-1 py-4 rounded-3xl font-black text-white text-3xl"
                style={{ background: "linear-gradient(180deg,#7CC9F0,#54A8D8)", boxShadow: "0 7px 0 #3A88B8" }}>◀</motion.button>
              <motion.button whileTap={{ scale: 0.9 }} onClick={() => setBucketCol(c => Math.min(COLS - 1, c + 1))}
                className="flex-1 py-4 rounded-3xl font-black text-white text-3xl"
                style={{ background: "linear-gradient(180deg,#B49BEC,#9B7DE0)", boxShadow: "0 7px 0 #7A5CC0" }}>▶</motion.button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
