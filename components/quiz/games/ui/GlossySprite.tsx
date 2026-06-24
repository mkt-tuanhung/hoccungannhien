"use client";

import { motion } from "framer-motion";

import { TargetAndTransition, Transition } from "framer-motion";

interface GlossySpriteProps {
  src: string;
  alt?: string;
  size?: number;
  animate?: TargetAndTransition;
  transition?: Transition;
  className?: string;
}

// Sprite bọc trong bóng bảy glossy giống CountItem — dùng cho nhân vật chính của mỗi mode.
export default function GlossySprite({ src, alt = "", size = 160, animate, transition, className }: GlossySpriteProps) {
  return (
    <motion.div
      className={`relative flex items-center justify-center flex-shrink-0 ${className ?? ""}`}
      style={{ width: size, height: size }}
      animate={animate}
      transition={transition}
    >
      {/* Bóng bảy nền */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle at 50% 35%, rgba(255,255,255,0.92), rgba(255,255,255,0.48) 58%, rgba(255,255,255,0.08) 100%)",
          boxShadow: "0 10px 22px rgba(70,40,90,0.22), inset 0 3px 6px rgba(255,255,255,0.95), inset 0 -5px 10px rgba(150,110,170,0.14)",
          border: "2.5px solid rgba(255,255,255,0.88)",
        }}
      />
      {/* Lớp highlight trên cùng */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{ top: 7, left: "20%", width: "60%", height: "24%", background: "rgba(255,255,255,0.72)", filter: "blur(4px)" }}
      />
      <img
        src={src}
        alt={alt}
        className="relative object-contain"
        style={{ width: size * 0.72, height: size * 0.72 }}
      />
    </motion.div>
  );
}
