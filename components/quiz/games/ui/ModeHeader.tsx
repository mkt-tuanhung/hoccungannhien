"use client";

import { Volume2 } from "lucide-react";
import { HighlightText } from "@/components/ui/HighlightText";
import MathVisual from "./MathVisual";

interface ModeHeaderProps {
  g: any;
  displayPrompt: string;
  speak: () => void;
  objects?: string[];
  hint?: string;
}

// Header mới: câu hỏi compact + vật đếm nổi trực tiếp (không hộp kính)
export default function ModeHeader({ g, displayPrompt, speak, objects, hint }: ModeHeaderProps) {
  return (
    <>
      {/* Câu hỏi — compact, hugging top */}
      <div
        className="bg-white/95 rounded-[22px] px-4 py-3 shadow-[0_8px_24px_rgba(80,60,100,0.18)] border border-white/80 mb-4"
        style={{ backdropFilter: "blur(12px)" }}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={speak}
            className="flex-shrink-0 w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center active:scale-90 transition"
          >
            <Volume2 className="w-5 h-5 text-pink-500" />
          </button>
          <p className="text-[15px] font-extrabold text-[#5A4A6A] leading-snug flex-1">
            <HighlightText text={displayPrompt} />
          </p>
        </div>
      </div>

      {/* Vật đếm — nổi trực tiếp trên nền, không có hộp */}
      {g.targetCount > 0 && g.targetCount <= 20 && (
        <div className="flex justify-center items-center mb-3 px-2">
          <MathVisual
            renderMode={g.renderMode}
            count={g.targetCount}
            count2={g.targetCount2}
            icon={g.objectIcon || (objects?.length ? objects[0] : '')}
            icon2={g.objectIcon2 || objects?.[1] || ''}
            compact={false}
          />
        </div>
      )}

      {hint && (
        <p
          className="text-center font-bold text-sm mb-2 text-white/90"
          style={{ textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}
        >
          {hint}
        </p>
      )}
    </>
  );
}
