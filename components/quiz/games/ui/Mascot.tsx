"use client";
import { assetUrl } from "@/lib/assets";

import { motion } from "framer-motion";

export type Mood = "idle" | "thinking" | "happy" | "oops";

interface MascotProps {
  mood?: Mood;
  size?: number;
}

// Mèo Bông — mascot art AI glossy, animate theo mood.
export default function Mascot({ mood = "idle", size = 130 }: MascotProps) {
  const anim =
    mood === "happy"
      ? { y: [0, -26, 0], rotate: [0, -6, 6, 0], scale: [1, 1.08, 1] }
      : mood === "oops"
      ? { x: [0, -7, 7, -5, 5, 0], rotate: [0, -3, 3, 0] }
      : { y: [0, -8, 0] };
  const dur = mood === "happy" ? 0.6 : mood === "oops" ? 0.5 : 2.6;
  const repeat = mood === "oops" ? 0 : Infinity;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Bóng đổ mềm dưới chân */}
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-full bg-black/15 blur-[3px]"
        style={{ width: size * 0.6, height: size * 0.12, bottom: 2 }}
      />
      <motion.img
        src=assetUrl('/sprites/mascot.png')
        alt="Mèo Bông"
        width={size}
        height={size}
        className="relative object-contain"
        style={{ filter: "drop-shadow(0 8px 8px rgba(80,50,90,0.22))" }}
        animate={anim}
        transition={{ repeat, duration: dur, ease: "easeInOut" }}
      />
      {/* Biểu cảm phụ */}
      {mood === "happy" && (
        <motion.div
          className="absolute -top-2 -right-1 text-2xl"
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: [0, 1.2, 1], rotate: 0 }}
        >
          ✨
        </motion.div>
      )}
      {mood === "oops" && (
        <motion.div
          className="absolute -top-1 right-0 text-xl"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          💭
        </motion.div>
      )}
    </div>
  );
}
