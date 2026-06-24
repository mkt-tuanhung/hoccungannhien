"use client";

import { useEffect, useRef, useState } from "react";
import { useGameMode, playCorrectSound } from "@/lib/hooks/useGameMode";
import { useModeExtras } from "@/lib/hooks/useModeExtras";
import { GameModeProps } from "../BaseGameShell";
import GardenScene from "../ui/GardenScene";
import ModeHeader from "../ui/ModeHeader";
import { celebrate } from "@/lib/confetti";

interface Props extends GameModeProps { bg?: string; objects?: string[]; }

// TẬP VIẾT SỐ: hiện số đáp án dạng nét đứt mờ, bé dùng ngón tay tô theo; tô đủ → đúng.
export default function NumberTraceMode({ question, onAnswer, bg, objects }: Props) {
  const g = useGameMode(question, onAnswer);
  const { displayPrompt, speak } = useModeExtras(g, question);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const [strokes, setStrokes] = useState(0);
  const target = String(g.correctAnswer ?? "");

  useEffect(() => {
    const c = canvasRef.current; if (!c) return;
    const ctx = c.getContext("2d"); if (!ctx) return;
    ctx.clearRect(0, 0, c.width, c.height);
    setStrokes(0);
    ctx.font = "bold 240px 'Mochiy Pop One', system-ui";
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.setLineDash([12, 12]); ctx.lineWidth = 3; ctx.strokeStyle = "#C9B6E8";
    ctx.strokeText(target, c.width / 2, c.height / 2);
    ctx.setLineDash([]);
  }, [question.id, target]);

  const pos = (e: React.PointerEvent) => {
    const r = canvasRef.current!.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };
  const down = (e: React.PointerEvent) => { if (g.isAnswered) return; drawing.current = true; const ctx = canvasRef.current!.getContext("2d")!; const p = pos(e); ctx.beginPath(); ctx.moveTo(p.x, p.y); };
  const moveDraw = (e: React.PointerEvent) => {
    if (!drawing.current) return;
    const ctx = canvasRef.current!.getContext("2d")!; const p = pos(e);
    ctx.lineWidth = 14; ctx.lineCap = "round"; ctx.strokeStyle = "#EC4899";
    ctx.lineTo(p.x, p.y); ctx.stroke();
  };
  const up = () => {
    if (!drawing.current) return; drawing.current = false;
    const n = strokes + 1; setStrokes(n);
    if (n >= 2 && !g.isAnswered) { playCorrectSound(); celebrate(); setTimeout(() => onAnswer(true), 1200); }
  };

  return (
    <div className="relative w-full min-h-[100dvh] overflow-hidden">
      <GardenScene src={bg} />
      <div className="relative z-10 flex flex-col min-h-[100dvh] px-4 pt-16 pb-6 max-w-xl mx-auto">
        <ModeHeader g={g} displayPrompt={`Tô theo nét số ${target} nhé!`} speak={speak} objects={objects} hint="✏️ Dùng ngón tay tô theo nét đứt" />
        <div className="flex-1 flex items-center justify-center">
          <canvas ref={canvasRef} width={320} height={380} onPointerDown={down} onPointerMove={moveDraw} onPointerUp={up} onPointerLeave={up}
            className="bg-white/85 rounded-3xl shadow-xl border-4 border-pink-200" style={{ touchAction: "none" }} />
        </div>
      </div>
    </div>
  );
}
