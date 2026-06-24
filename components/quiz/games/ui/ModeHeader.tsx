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

// Header chung: bong bóng câu hỏi + nút loa + panel vật đếm (nếu có) + dòng gợi ý.
export default function ModeHeader({ g, displayPrompt, speak, objects, hint }: ModeHeaderProps) {
  return (
    <>
      <div className="bg-white rounded-[26px] p-4 shadow-[0_10px_28px_rgba(80,60,100,0.22)] border-2 border-white mb-3">
        <div className="flex items-center gap-3">
          <button onClick={speak} className="flex-shrink-0 w-11 h-11 bg-pink-100 rounded-full flex items-center justify-center active:scale-90 transition">
            <Volume2 className="w-5 h-5 text-pink-500" />
          </button>
          <p className="text-base font-extrabold text-[#5A4A6A] leading-snug"><HighlightText text={displayPrompt} /></p>
        </div>
      </div>
      {g.targetCount > 0 && g.targetCount <= 20 && (
        <div className="rounded-[28px] px-3 py-2 mb-2" style={{ background: "rgba(255,255,255,0.4)", backdropFilter: "blur(8px)", border: "2px solid rgba(255,255,255,0.6)" }}>
          <MathVisual renderMode={g.renderMode} count={g.targetCount} count2={g.targetCount2} icon={objects?.length ? objects[0] : g.objectIcon} icon2={objects?.[1] || g.objectIcon2} compact />
        </div>
      )}
      {hint && <p className="text-center text-white font-black text-sm mb-1" style={{ textShadow: "0 1px 3px rgba(0,0,0,0.45)" }}>{hint}</p>}
    </>
  );
}
