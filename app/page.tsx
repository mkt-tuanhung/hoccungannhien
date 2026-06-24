"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { img } from "@/lib/assets";

export default function Home() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden relative"
      style={{ background: "linear-gradient(160deg, #FFF0F8 0%, #F0EEFF 50%, #EEF8FF 100%)" }}
    >
      {/* Nền trang trí */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { emoji: "⭐", left: "8%", top: "12%" },
          { emoji: "🌸", left: "88%", top: "8%" },
          { emoji: "✨", left: "5%", top: "55%" },
          { emoji: "🌈", left: "85%", top: "60%" },
          { emoji: "🎵", left: "50%", top: "5%" },
          { emoji: "💫", left: "92%", top: "35%" },
        ].map((d, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl select-none"
            style={{ left: d.left, top: d.top }}
            animate={{ y: [0, -16, 0], rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 3 + i * 0.6, delay: i * 0.3 }}
          >
            {d.emoji}
          </motion.div>
        ))}
      </div>

      <motion.div
        className="relative z-10 w-full max-w-md text-center space-y-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Logo + Tiêu đề */}
        <div className="space-y-2">
          <motion.div
            className="text-6xl"
            animate={{ rotate: [0, -8, 8, 0], scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          >
            🎓
          </motion.div>
          <h1
            className="text-4xl font-black tracking-tight leading-tight"
            style={{
              background: "linear-gradient(135deg, #FF6B9D 0%, #A855F7 50%, #3B82F6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Học cùng An Nhiên
          </h1>
          <p className="text-gray-400 font-medium text-sm">
            Toán · Tiếng Anh · Tiếng Việt
          </p>
        </div>

        {/* Hai thẻ chính */}
        <div className="grid grid-cols-2 gap-4">
          {/* Bé học */}
          <Link href="/select-child" className="block">
            <motion.div
              whileHover={{ scale: 1.05, y: -8 }}
              whileTap={{ scale: 0.96 }}
              className="rounded-[2rem] shadow-xl overflow-hidden cursor-pointer"
              style={{ background: "linear-gradient(160deg, #FFF0F8, #FFD6E7)" }}
            >
              <div className="relative w-full aspect-square">
                <Image
                  src={img.homeChild}
                  alt="Bé học nào!"
                  fill
                  className="object-cover"
                  sizes="200px"
                />
              </div>
              <div className="p-3 pt-2">
                <p className="text-lg font-black text-pink-600">Bé học nào!</p>
                <p className="text-xs text-pink-400 font-medium mt-0.5">Vào chơi · nhận sao ⭐</p>
              </div>
            </motion.div>
          </Link>

          {/* Phụ huynh */}
          <Link href="/login" className="block">
            <motion.div
              whileHover={{ scale: 1.05, y: -8 }}
              whileTap={{ scale: 0.96 }}
              className="rounded-[2rem] shadow-xl overflow-hidden cursor-pointer"
              style={{ background: "linear-gradient(160deg, #EEF4FF, #D6E4FF)" }}
            >
              <div className="relative w-full aspect-square">
                <Image
                  src={img.homeParent}
                  alt="Phụ huynh"
                  fill
                  className="object-cover"
                  sizes="200px"
                />
              </div>
              <div className="p-3 pt-2">
                <p className="text-lg font-black text-blue-600">Phụ huynh</p>
                <p className="text-xs text-blue-400 font-medium mt-0.5">Theo dõi · quản lý 📊</p>
              </div>
            </motion.div>
          </Link>
        </div>

        <motion.p
          className="text-gray-400 text-xs font-medium"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          🎮 Học vui · Tiến bộ mỗi ngày · Được khen thưởng
        </motion.p>
      </motion.div>
    </main>
  );
}
