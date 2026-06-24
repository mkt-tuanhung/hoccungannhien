"use client";

import { motion } from "framer-motion";

interface CountItemProps {
  icon: string;
  size?: number;
  delay?: number;
  crossed?: boolean;
}

// 1 vật đếm nổi khối: bệ tròn glossy + bóng đổ + nảy nhẹ. (Tái dùng ở ObjectStage & MathVisual)
export default function CountItem({ icon, size = 80, delay = 0, crossed = false }: CountItemProps) {
  return (
    <motion.div
      initial={{ scale: 0, y: -40 }}
      animate={{ scale: 1, y: [0, -7, 0] }}
      transition={{
        scale: { delay, type: "spring", stiffness: 240, damping: 12 },
        y: { delay: delay + 0.4, repeat: Infinity, duration: 2.6, ease: "easeInOut" },
      }}
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle at 50% 35%, rgba(255,255,255,0.95), rgba(255,255,255,0.55) 60%, rgba(255,255,255,0.15) 100%)",
          boxShadow: "0 8px 14px rgba(70,40,90,0.28), inset 0 2px 4px rgba(255,255,255,0.9), inset 0 -4px 8px rgba(150,110,170,0.18)",
          border: "2px solid rgba(255,255,255,0.85)",
        }}
      />
      <div className="absolute rounded-full" style={{ top: 6, left: "22%", width: "56%", height: "26%", background: "rgba(255,255,255,0.7)", filter: "blur(3px)" }} />
      <img
        src={icon}
        alt=""
        className="relative object-contain"
        style={{ width: size * 0.82, height: size * 0.82, opacity: crossed ? 0.55 : 1 }}
      />
      {crossed && (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute text-red-500 font-black" style={{ fontSize: size * 0.9, lineHeight: 1 }}>
          ✗
        </motion.div>
      )}
    </motion.div>
  );
}
