"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden relative"
      style={{ background: "linear-gradient(160deg, #FFF5F8 0%, #EEF2FF 50%, #F0FFF4 100%)" }}
    >
      {/* Floating decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {(["⭐", "🌸", "🌈", "✨", "🦋", "🌟"] as const).map((emoji, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl select-none"
            style={{ left: `${10 + i * 15}%`, top: `${10 + (i % 3) * 25}%` }}
            animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 + i * 0.5, delay: i * 0.4 }}
          >
            {emoji}
          </motion.div>
        ))}
      </div>

      <motion.div
        className="relative z-10 max-w-lg w-full text-center space-y-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Logo + Title */}
        <div className="space-y-3">
          <motion.div
            className="text-7xl"
            animate={{ rotate: [0, -5, 5, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
          >
            🎓
          </motion.div>
          <h1
            className="text-4xl md:text-5xl font-black tracking-tight"
            style={{
              background: "linear-gradient(135deg, #FF6B9D, #A855F7, #3B82F6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Học cùng An Nhiên
          </h1>
          <p className="text-gray-500 font-medium text-base">
            Toán · Tiếng Anh · Tiếng Việt — vui như chơi game! 🎮
          </p>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Học Sinh → select-child (có auth guard, tự redirect login nếu chưa đăng nhập) */}
          <Link href="/select-child">
            <motion.div
              whileHover={{ scale: 1.05, y: -6 }}
              whileTap={{ scale: 0.96 }}
              className="flex flex-col items-center gap-4 p-8 rounded-[2rem] shadow-lg cursor-pointer"
              style={{ background: "linear-gradient(135deg, #FFD6E7, #FFB3CF)" }}
            >
              <span className="text-6xl">👧</span>
              <div>
                <p className="text-2xl font-black text-pink-700">Bé học nào!</p>
                <p className="text-sm text-pink-500 font-medium mt-1">Vào chơi và nhận sao ⭐</p>
              </div>
            </motion.div>
          </Link>

          {/* Phụ huynh → login */}
          <Link href="/login">
            <motion.div
              whileHover={{ scale: 1.05, y: -6 }}
              whileTap={{ scale: 0.96 }}
              className="flex flex-col items-center gap-4 p-8 rounded-[2rem] shadow-lg cursor-pointer"
              style={{ background: "linear-gradient(135deg, #D6E4FF, #B3CAFF)" }}
            >
              <span className="text-6xl">👨‍👩‍👧</span>
              <div>
                <p className="text-2xl font-black text-blue-700">Phụ huynh</p>
                <p className="text-sm text-blue-500 font-medium mt-1">Xem tiến trình học tập</p>
              </div>
            </motion.div>
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
