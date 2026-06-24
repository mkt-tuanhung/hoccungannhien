"use client";

import Link from "next/link";
import { motion } from "framer-motion";

// SVG minh hoạ bé gái dễ thương
function ChildIllustration() {
  return (
    <svg viewBox="0 0 200 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Tóc */}
      <ellipse cx="100" cy="72" rx="48" ry="44" fill="#3D2314"/>
      {/* Dải tóc hai bên */}
      <ellipse cx="58" cy="90" rx="14" ry="22" fill="#3D2314"/>
      <ellipse cx="142" cy="90" rx="14" ry="22" fill="#3D2314"/>
      {/* Nơ tóc */}
      <path d="M68 54 Q78 44 88 54 Q78 64 68 54Z" fill="#FF6B9D"/>
      <path d="M88 54 Q98 44 108 54 Q98 64 88 54Z" fill="#FF6B9D"/>
      <circle cx="88" cy="54" r="5" fill="#FF8FB8"/>
      {/* Mặt */}
      <ellipse cx="100" cy="92" rx="38" ry="36" fill="#FDDBB4"/>
      {/* Má hồng */}
      <ellipse cx="76" cy="102" rx="10" ry="7" fill="#FFB3C6" opacity="0.6"/>
      <ellipse cx="124" cy="102" rx="10" ry="7" fill="#FFB3C6" opacity="0.6"/>
      {/* Mắt */}
      <ellipse cx="87" cy="90" rx="8" ry="9" fill="white"/>
      <ellipse cx="113" cy="90" rx="8" ry="9" fill="white"/>
      <circle cx="89" cy="91" r="5" fill="#2D1B00"/>
      <circle cx="115" cy="91" r="5" fill="#2D1B00"/>
      <circle cx="91" cy="89" r="2" fill="white"/>
      <circle cx="117" cy="89" r="2" fill="white"/>
      {/* Lông mày */}
      <path d="M80 80 Q87 76 94 80" stroke="#3D2314" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M106 80 Q113 76 120 80" stroke="#3D2314" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Mũi */}
      <ellipse cx="100" cy="100" rx="4" ry="3" fill="#F0A070" opacity="0.5"/>
      {/* Miệng cười */}
      <path d="M88 110 Q100 122 112 110" stroke="#E07060" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M91 110 Q100 118 109 110" fill="#FF8090" opacity="0.4"/>
      {/* Cổ */}
      <rect x="90" y="126" width="20" height="14" rx="4" fill="#FDDBB4"/>
      {/* Áo đồng phục */}
      <path d="M52 200 Q60 138 100 136 Q140 138 148 200Z" fill="#7C3AED"/>
      {/* Cổ áo */}
      <path d="M86 136 L100 155 L114 136" fill="white" opacity="0.9"/>
      {/* Tay */}
      <ellipse cx="52" cy="158" rx="14" ry="28" rx2="14" fill="#7C3AED" transform="rotate(-15 52 158)"/>
      <ellipse cx="148" cy="158" rx="14" ry="28" fill="#7C3AED" transform="rotate(15 148 158)"/>
      {/* Bàn tay */}
      <ellipse cx="42" cy="178" rx="11" ry="10" fill="#FDDBB4"/>
      <ellipse cx="158" cy="178" rx="11" ry="10" fill="#FDDBB4"/>
      {/* Sách bên tay phải */}
      <rect x="162" y="158" width="22" height="28" rx="3" fill="#FF6B9D"/>
      <rect x="165" y="161" width="16" height="2" rx="1" fill="white" opacity="0.7"/>
      <rect x="165" y="165" width="12" height="2" rx="1" fill="white" opacity="0.7"/>
      <rect x="165" y="169" width="14" height="2" rx="1" fill="white" opacity="0.7"/>
      {/* Ngôi sao trang trí */}
      <text x="155" y="140" fontSize="18" fill="#FFD700">⭐</text>
      <text x="25" y="145" fontSize="14" fill="#FF6B9D">✨</text>
    </svg>
  );
}

// SVG minh hoạ gia đình
function ParentIllustration() {
  return (
    <svg viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Bố - bên trái */}
      {/* Tóc bố */}
      <ellipse cx="68" cy="62" rx="30" ry="26" fill="#3D2314"/>
      {/* Mặt bố */}
      <ellipse cx="68" cy="74" rx="26" ry="24" fill="#FDDBB4"/>
      <ellipse cx="58" cy="78" rx="6" ry="4" fill="#FFB3C6" opacity="0.5"/>
      <ellipse cx="78" cy="78" rx="6" ry="4" fill="#FFB3C6" opacity="0.5"/>
      <circle cx="61" cy="72" r="5" fill="#2D1B00"/>
      <circle cx="75" cy="72" r="5" fill="#2D1B00"/>
      <circle cx="63" cy="70" r="1.5" fill="white"/>
      <circle cx="77" cy="70" r="1.5" fill="white"/>
      <path d="M61 84 Q68 91 75 84" stroke="#E07060" strokeWidth="2" strokeLinecap="round" fill="none"/>
      {/* Áo bố */}
      <path d="M34 200 Q40 112 68 110 Q96 112 102 200Z" fill="#3B82F6"/>
      <path d="M56 110 L68 124 L80 110" fill="white" opacity="0.8"/>
      {/* Tay bố */}
      <ellipse cx="34" cy="148" rx="10" ry="22" fill="#3B82F6" transform="rotate(-10 34 148)"/>

      {/* Mẹ - bên phải */}
      {/* Tóc mẹ dài */}
      <ellipse cx="152" cy="60" rx="32" ry="28" fill="#8B4513"/>
      <rect x="124" y="68" width="14" height="50" rx="7" fill="#8B4513"/>
      <rect x="166" y="68" width="14" height="50" rx="7" fill="#8B4513"/>
      {/* Mặt mẹ */}
      <ellipse cx="152" cy="74" rx="26" ry="24" fill="#FDDBB4"/>
      <ellipse cx="142" cy="78" rx="6" ry="4" fill="#FFB3C6" opacity="0.6"/>
      <ellipse cx="162" cy="78" rx="6" ry="4" fill="#FFB3C6" opacity="0.6"/>
      <ellipse cx="145" cy="72" rx="6" ry="7" fill="white"/>
      <ellipse cx="159" cy="72" rx="6" ry="7" fill="white"/>
      <circle cx="146" cy="73" r="4" fill="#2D1B00"/>
      <circle cx="160" cy="73" r="4" fill="#2D1B00"/>
      <circle cx="147" cy="71" r="1.5" fill="white"/>
      <circle cx="161" cy="71" r="1.5" fill="white"/>
      {/* Nơ tóc mẹ */}
      <path d="M142 44 Q152 36 162 44 Q152 52 142 44Z" fill="#FF6B9D"/>
      <circle cx="152" cy="44" r="4" fill="#FF8FB8"/>
      <path d="M142 87 Q152 94 162 87" stroke="#E07060" strokeWidth="2" strokeLinecap="round" fill="none"/>
      {/* Áo mẹ */}
      <path d="M118 200 Q124 112 152 110 Q180 112 186 200Z" fill="#EC4899"/>
      <path d="M140 110 L152 124 L164 110" fill="white" opacity="0.8"/>
      {/* Tay mẹ */}
      <ellipse cx="186" cy="148" rx="10" ry="22" fill="#EC4899" transform="rotate(10 186 148)"/>

      {/* Bé ở giữa nhỏ hơn */}
      <ellipse cx="110" cy="128" rx="18" ry="16" fill="#FDDBB4"/>
      <ellipse cx="110" cy="118" rx="20" ry="16" fill="#3D2314"/>
      <circle cx="104" cy="126" r="3.5" fill="#2D1B00"/>
      <circle cx="116" cy="126" r="3.5" fill="#2D1B00"/>
      <circle cx="105" cy="124" r="1" fill="white"/>
      <circle cx="117" cy="124" r="1" fill="white"/>
      <path d="M104 133 Q110 138 116 133" stroke="#E07060" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
      <ellipse cx="101" cy="129" rx="4" ry="3" fill="#FFB3C6" opacity="0.5"/>
      <ellipse cx="119" cy="129" rx="4" ry="3" fill="#FFB3C6" opacity="0.5"/>
      {/* Áo bé */}
      <path d="M90 200 Q95 144 110 142 Q125 144 130 200Z" fill="#A855F7"/>

      {/* Bàn tay nắm nhau */}
      <ellipse cx="92" cy="170" rx="9" ry="8" fill="#FDDBB4"/>
      <ellipse cx="128" cy="170" rx="9" ry="8" fill="#FDDBB4"/>

      {/* Trái tim */}
      <text x="96" y="108" fontSize="20">❤️</text>
      <text x="18" y="100" fontSize="14" fill="#FFD700">⭐</text>
      <text x="188" y="100" fontSize="14" fill="#FF6B9D">✨</text>
    </svg>
  );
}

export default function Home() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden relative"
      style={{ background: "linear-gradient(160deg, #FFF0F8 0%, #F0EEFF 50%, #EEF8FF 100%)" }}
    >
      {/* Nền bong bóng trang trí */}
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
              {/* Ảnh minh hoạ */}
              <div className="px-4 pt-5 pb-0 h-44">
                <ChildIllustration />
              </div>
              {/* Text */}
              <div
                className="p-4 pt-2"
                style={{ background: "linear-gradient(180deg, transparent, #FFB3CF55)" }}
              >
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
              {/* Ảnh minh hoạ */}
              <div className="px-2 pt-5 pb-0 h-44">
                <ParentIllustration />
              </div>
              {/* Text */}
              <div
                className="p-4 pt-2"
                style={{ background: "linear-gradient(180deg, transparent, #B3CAFF55)" }}
              >
                <p className="text-lg font-black text-blue-600">Phụ huynh</p>
                <p className="text-xs text-blue-400 font-medium mt-0.5">Theo dõi · quản lý 📊</p>
              </div>
            </motion.div>
          </Link>
        </div>

        {/* Tagline dưới */}
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
