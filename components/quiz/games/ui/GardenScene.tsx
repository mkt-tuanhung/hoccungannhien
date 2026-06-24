"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { img } from "@/lib/assets";

interface GardenSceneProps {
  src?: string;
}

// Nền painterly (ảnh AI) full-bleed + lớp sparkle động + hơi thở nhẹ tạo sức sống.
export default function GardenScene({ src = img.scene('garden') }: GardenSceneProps) {
  const sparkles = useMemo(
    () =>
      Array.from({ length: 14 }).map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 70,
        size: 7 + Math.random() * 12,
        delay: Math.random() * 4,
        dur: 2.5 + Math.random() * 3,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Ảnh nền painterly */}
      <motion.img
        src={src}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ scale: 1.08 }}
        animate={{ scale: [1.08, 1.14, 1.08] }}
        transition={{ repeat: Infinity, duration: 24, ease: "easeInOut" }}
      />

      {/* Phủ sáng dịu phía trên cho dễ đọc chữ */}
      <div
        className="absolute inset-x-0 top-0 h-1/3"
        style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.4), rgba(255,255,255,0))" }}
      />
      {/* Vignette nhẹ 4 góc để nội dung trung tâm nổi hơn */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(60,40,80,0.18) 100%)" }}
      />

      {/* Bụi sao lấp lánh */}
      {sparkles.map((s, i) => (
        <motion.div
          key={i}
          className="absolute text-white pointer-events-none"
          style={{ left: `${s.left}%`, top: `${s.top}%`, fontSize: s.size, textShadow: "0 0 6px rgba(255,240,180,0.9)" }}
          animate={{ opacity: [0, 1, 0], scale: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: s.dur, delay: s.delay }}
        >
          ✦
        </motion.div>
      ))}
    </div>
  );
}
