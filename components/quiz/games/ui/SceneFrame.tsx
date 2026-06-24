"use client";

import { ReactNode, useMemo } from "react";
import { motion } from "framer-motion";
import { SCENE_BG } from "@/lib/design/palette";

interface SceneFrameProps {
  children: ReactNode;
  bg?: string;
}

// Khung nền chung: gradient ấm + các blob mờ trôi nhẹ + bụi sao lấp lánh.
export default function SceneFrame({ children, bg = SCENE_BG }: SceneFrameProps) {
  const sparkles = useMemo(
    () =>
      Array.from({ length: 12 }).map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 6 + Math.random() * 10,
        delay: Math.random() * 4,
        dur: 3 + Math.random() * 3,
      })),
    []
  );

  return (
    <div className="relative w-full min-h-[100dvh] overflow-hidden" style={{ background: bg }}>
      {/* Blob trang trí mờ */}
      <motion.div
        className="absolute -top-20 -left-16 w-72 h-72 rounded-full"
        style={{ background: "#FFC9E2", filter: "blur(70px)", opacity: 0.5 }}
        animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 14, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 -right-16 w-80 h-80 rounded-full"
        style={{ background: "#C9D9FF", filter: "blur(80px)", opacity: 0.45 }}
        animate={{ x: [0, -25, 0], y: [0, 30, 0] }}
        transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/4 w-72 h-72 rounded-full"
        style={{ background: "#D6FFE4", filter: "blur(70px)", opacity: 0.4 }}
        animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 16, ease: "easeInOut" }}
      />

      {/* Bụi sao lấp lánh */}
      {sparkles.map((s, i) => (
        <motion.div
          key={i}
          className="absolute text-yellow-300 pointer-events-none"
          style={{ left: `${s.left}%`, top: `${s.top}%`, fontSize: s.size }}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: s.dur, delay: s.delay }}
        >
          ✦
        </motion.div>
      ))}

      <div className="relative z-10">{children}</div>
    </div>
  );
}
