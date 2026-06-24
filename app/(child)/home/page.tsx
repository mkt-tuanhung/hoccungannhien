"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { useChild } from "@/lib/child-context";
import { useAuth } from "@/lib/auth";
import { useEffect, useState } from "react";
import { pullProgressFromSupabase, getSubjectProgress } from "@/lib/progression";
import { useRouter } from "next/navigation";
import { img } from "@/lib/assets";

export default function ChildHome() {
  const { activeChild, loading: childLoading } = useChild();
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [mathPercent, setMathPercent] = useState(0);
  const [engPercent, setEngPercent] = useState(0);
  const [vietPercent, setVietPercent] = useState(0);

  useEffect(() => {
    if (!authLoading && !user) router.push("/login");
  }, [authLoading, user, router]);

  useEffect(() => {
    if (!authLoading && !childLoading && user && !activeChild) router.push("/select-child");
  }, [authLoading, childLoading, user, activeChild, router]);

  useEffect(() => {
    const init = async () => {
      if (activeChild) {
        await pullProgressFromSupabase(activeChild.id);
      }
      // Compute progress percentages from localStorage
      const mathP = getSubjectProgress("math");
      const completedMath = Object.values(mathP).filter((l) => l.isCompleted).length;
      setMathPercent(Math.min(100, Math.round((completedMath / 30) * 100)));

      const engP = getSubjectProgress("english");
      const completedEng = Object.values(engP).filter((l) => l.isCompleted).length;
      setEngPercent(Math.min(100, Math.round((completedEng / 30) * 100)));

      const vietP = getSubjectProgress("vietnamese");
      const completedViet = Object.values(vietP).filter((l) => l.isCompleted).length;
      setVietPercent(Math.min(100, Math.round((completedViet / 30) * 100)));
    };
    init();
  }, [activeChild]);

  const childName = activeChild?.name || "Bé";
  const avatarUrl = activeChild?.avatar_url || img.childAvatar;
  const streak = activeChild?.streak_days || 0;
  const totalStars = activeChild?.total_stars || 0;
  const isLoading = authLoading || childLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FFF5F8] flex items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="text-4xl">
          🌸
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF5F8] p-4 font-sans overflow-hidden">
      <motion.div
        className="max-w-4xl mx-auto space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >

        {/* Header: Avatar, Streak, Coins */}
        <header className="flex justify-between items-center bg-white p-4 rounded-[2rem] shadow-sm border border-pink-50">
          <div className="flex items-center gap-4">
            <Link href={user ? "/select-child" : "/login"} className="relative group">
              <div className="w-14 h-14 bg-gradient-to-tr from-pink-200 to-pink-400 rounded-full flex items-center justify-center shadow-md border-2 border-white overflow-hidden group-hover:ring-4 ring-pink-200 transition-all">
                <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow text-[10px]">🔄</div>
            </Link>
            <div>
              <p className="font-black text-xl text-gray-800">{childName} ✨</p>
              {!user && (
                <Link href="/login" className="text-xs text-pink-400 hover:underline">
                  Đăng nhập để lưu tiến trình
                </Link>
              )}
            </div>
          </div>

          <div className="flex gap-4">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex items-center gap-1 bg-orange-100 px-4 py-2 rounded-full font-bold text-orange-600"
            >
              🔥 {streak} Ngày
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex items-center gap-1 bg-yellow-100 px-4 py-2 rounded-full font-bold text-yellow-600"
            >
              ⭐ {totalStars}
            </motion.div>
          </div>
        </header>

        {/* AI Tutor Greeting */}
        <motion.div
          className="flex items-center gap-4 bg-gradient-to-r from-pink-50 to-white p-6 rounded-[2rem] shadow-sm border border-pink-100"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <motion.div
            className="w-20 h-20 flex-shrink-0 bg-white rounded-full flex items-center justify-center shadow-inner overflow-hidden"
            animate={{ rotate: [0, -5, 5, -5, 5, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          >
            <img src={img.aiTutor} alt="Tutor" className="w-full h-full object-cover" />
          </motion.div>
          <div>
            <h2 className="text-xl font-black text-pink-500 mb-1">Chào {childName} nhé! 🌸</h2>
            <p className="text-gray-500 text-sm leading-relaxed font-medium">
              {streak > 0
                ? `Con đã học liên tục ${streak} ngày rồi đó! Giỏi quá! Hôm nay mình tiếp tục nhé?`
                : "Hôm nay con đã sẵn sàng kiếm thêm sao để mua áo mới cho bạn Mèo chưa nào?"}
            </p>
          </div>
        </motion.div>

        {/* Subjects */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/subject/english" className="block">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Card className="bg-[#FFE4E1] border-none shadow-md overflow-hidden rounded-[2rem]">
                <CardContent className="p-8 text-center space-y-4">
                  <motion.div
                    className="w-24 h-24 mx-auto drop-shadow-md"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                  ><img src={img.englishIcon} alt="Tiếng Anh" className="w-full h-full object-contain" /></motion.div>
                  <h3 className="text-2xl font-extrabold text-[#D87093]">Tiếng Anh</h3>
                  <div className="w-full bg-white/50 rounded-full h-3 overflow-hidden">
                    <motion.div
                      className="bg-[#D87093] h-3 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${engPercent}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </Link>

          <Link href="/subject/math" className="block">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Card className="bg-gradient-to-b from-blue-50 to-blue-100 border-none shadow-sm overflow-hidden rounded-[2rem]">
                <CardContent className="p-8 text-center space-y-4 relative">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white rounded-full opacity-30 -mr-10 -mt-10 blur-xl" />
                  <motion.div
                    className="w-24 h-24 mx-auto drop-shadow-md relative z-10"
                    whileHover={{ rotate: -10, scale: 1.1 }}
                  ><img src={img.mathIcon} alt="Toán Học" className="w-full h-full object-contain" /></motion.div>
                  <h3 className="text-2xl font-black text-blue-500 tracking-tight">Toán Học</h3>
                  <div className="w-full bg-white/60 rounded-full h-3 overflow-hidden shadow-inner">
                    <motion.div
                      className="bg-blue-400 h-3 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${mathPercent}%` }}
                      transition={{ duration: 1, delay: 0.4 }}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </Link>

          <Link href="/subject/vietnamese" className="block">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Card className="bg-[#FFFACD] border-none shadow-md overflow-hidden rounded-[2rem]">
                <CardContent className="p-8 text-center space-y-4">
                  <motion.div
                    className="w-24 h-24 mx-auto drop-shadow-md"
                    whileHover={{ y: -5, scale: 1.1 }}
                  ><img src={img.vietnameseIcon} alt="Tiếng Việt" className="w-full h-full object-contain" /></motion.div>
                  <h3 className="text-2xl font-extrabold text-[#DAA520]">Tiếng Việt</h3>
                  <div className="w-full bg-white/50 rounded-full h-3 overflow-hidden">
                    <motion.div
                      className="bg-[#DAA520] h-3 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${vietPercent}%` }}
                      transition={{ duration: 1, delay: 0.6 }}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </Link>
        </div>

        {/* Pet Area */}
        <Link href="/pet" className="block mt-8">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-3xl p-5 flex items-center gap-5 shadow-md border-2 border-pink-100"
          >
            <motion.div
              className="w-24 h-24 flex-shrink-0 rounded-full overflow-hidden border-4 border-pink-200 shadow-lg"
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            >
              <img src={img.cutePetCat} alt="Mèo Bông" className="w-full h-full object-cover" />
            </motion.div>
            <div className="flex-1">
              <p className="font-black text-pink-600 text-lg">Mèo Bông đang chờ! 🐱</p>
              <p className="text-sm text-pink-400 font-medium mt-1">Dùng ⭐ để cho mèo ăn và chăm sóc</p>
              <div className="mt-2 inline-block bg-pink-500 text-white text-xs font-black px-3 py-1 rounded-full">
                Vào chơi →
              </div>
            </div>
          </motion.div>
        </Link>

      </motion.div>
    </div>
  );
}
