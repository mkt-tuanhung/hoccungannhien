"use client";

import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { img } from "@/lib/assets";
import { playTTSAudio } from "@/lib/tts";

const PET_PHRASES = [
  "Mèo Bông thích quá! Cảm ơn bạn!",
  "Ngon quá đi! Mèo Bông no rồi!",
  "Bạn tốt bụng quá! Meo meo!",
  "Yummy! Mèo Bông yêu bạn lắm!",
];

const FOOD_ITEMS = [
  { emoji: "🐟", name: "Cá", cost: 5 },
  { emoji: "🍎", name: "Táo", cost: 3 },
  { emoji: "🍰", name: "Bánh", cost: 8 },
];

export default function PetRoom() {
  const router = useRouter();
  const [stars, setStars] = useState(0);
  const [happiness, setHappiness] = useState(60);
  const [isEating, setIsEating] = useState(false);
  const [eatingEmoji, setEatingEmoji] = useState("🐟");
  const [childId, setChildId] = useState<string | null>(null);
  const [floatingStars, setFloatingStars] = useState<{ id: number; x: number }[]>([]);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data: profiles } = await supabase.from('child_profiles').select('id, total_stars').eq('parent_uid', user.id).limit(1);
    if (profiles && profiles.length > 0) {
      setChildId(profiles[0].id);
      setStars(profiles[0].total_stars || 0);
    }
  };

  const feedPet = async (food: typeof FOOD_ITEMS[0]) => {
    if (stars < food.cost || isEating) return;
    setEatingEmoji(food.emoji);
    setIsEating(true);
    setStars(s => s - food.cost);
    setHappiness(h => Math.min(100, h + 15));

    // Floating star animation
    const id = Date.now();
    setFloatingStars(fs => [...fs, { id, x: Math.random() * 60 + 20 }]);
    setTimeout(() => setFloatingStars(fs => fs.filter(f => f.id !== id)), 1200);

    const phrase = PET_PHRASES[Math.floor(Math.random() * PET_PHRASES.length)];
    playTTSAudio(phrase, () => {});

    confetti({ particleCount: 40, spread: 70, origin: { y: 0.5 }, colors: ["#FF9CC2", "#6FD08C", "#FFCF5C"] });

    if (childId) {
      // Đọc giá trị mới nhất từ DB trước khi trừ (tránh stale state overwrite)
      const { data: fresh } = await supabase.from('child_profiles').select('total_stars').eq('id', childId).single();
      const freshStars = fresh?.total_stars ?? 0;
      await supabase.from('child_profiles').update({ total_stars: Math.max(0, freshStars - food.cost) }).eq('id', childId);
    }

    setTimeout(() => setIsEating(false), 1800);
  };

  const moodEmoji = happiness >= 80 ? "😻" : happiness >= 50 ? "😸" : "😿";
  const moodText = happiness >= 80 ? "Rất vui!" : happiness >= 50 ? "Bình thường" : "Đói bụng rồi...";

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "linear-gradient(180deg, #FFF0FA 0%, #EEF0FF 100%)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-12 pb-4">
        <button
          onClick={() => router.push("/home")}
          className="w-11 h-11 bg-white rounded-2xl flex items-center justify-center shadow-md active:scale-95 transition"
        >
          <ChevronLeft className="w-6 h-6 text-pink-500" />
        </button>
        <h1 className="text-xl font-black text-pink-600">Phòng Mèo Bông 🐱</h1>
        <div className="flex items-center gap-1 bg-yellow-100 border-2 border-yellow-200 px-4 py-2 rounded-2xl">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="font-black text-yellow-700 text-lg">{stars}</span>
        </div>
      </div>

      {/* Pet display */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 gap-6">

        {/* Happiness bar */}
        <div className="w-full max-w-xs">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-bold text-pink-400">Hạnh phúc</span>
            <span className="text-sm font-bold text-pink-600">{moodEmoji} {moodText}</span>
          </div>
          <div className="h-4 bg-pink-100 rounded-full overflow-hidden border-2 border-pink-200">
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, #FF9CC2, #FF6B9D)" }}
              animate={{ width: `${happiness}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Cat */}
        <div className="relative">
          <motion.div
            className="w-52 h-52 rounded-full overflow-hidden border-8 border-white shadow-2xl"
            style={{ boxShadow: "0 20px 60px rgba(255,107,157,0.3), 0 0 0 4px rgba(255,156,194,0.3)" }}
            animate={isEating
              ? { scale: [1, 1.12, 0.95, 1.08, 1], rotate: [0, -6, 6, -4, 0] }
              : { y: [0, -8, 0] }
            }
            transition={isEating
              ? { duration: 0.6, repeat: 2 }
              : { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }
          >
            <img src={img.cutePetCat} alt="Mèo Bông" className="w-full h-full object-cover" />
          </motion.div>

          {/* Floating food when eating */}
          <AnimatePresence>
            {isEating && (
              <motion.div
                initial={{ opacity: 1, y: 0, scale: 0.5 }}
                animate={{ opacity: 0, y: -80, scale: 1.5 }}
                exit={{ opacity: 0 }}
                className="absolute top-0 left-1/2 -translate-x-1/2 text-5xl pointer-events-none"
              >
                {eatingEmoji}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating hearts */}
          <AnimatePresence>
            {floatingStars.map(f => (
              <motion.div
                key={f.id}
                initial={{ opacity: 1, y: -20, x: 0 }}
                animate={{ opacity: 0, y: -80 }}
                className="absolute text-2xl pointer-events-none"
                style={{ left: `${f.x}%`, top: 0 }}
              >
                ❤️
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Name tag */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white px-5 py-1.5 rounded-2xl shadow-lg border-2 border-pink-200">
            <p className="font-black text-pink-500 text-sm whitespace-nowrap">Mèo Bông</p>
          </div>
        </div>

        {/* Speech bubble khi ăn */}
        <AnimatePresence>
          {isEating && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="bg-white rounded-2xl px-5 py-3 shadow-lg border-2 border-pink-100"
            >
              <p className="font-bold text-pink-500 text-center">Ngon quá! Meo meo~ 😻</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Food buttons */}
        <div className="w-full max-w-xs space-y-3">
          <p className="text-center text-sm font-bold text-gray-400 mb-2">Cho Mèo Bông ăn</p>
          {FOOD_ITEMS.map(food => (
            <motion.button
              key={food.name}
              whileTap={{ scale: 0.95 }}
              onClick={() => feedPet(food)}
              disabled={stars < food.cost || isEating}
              className="w-full flex items-center justify-between px-5 py-4 rounded-[20px] font-black text-white shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                background: stars >= food.cost
                  ? "linear-gradient(135deg, #FF9CC2, #FF6B9D)"
                  : "linear-gradient(135deg, #ccc, #aaa)",
                boxShadow: stars >= food.cost ? "0 6px 0 #EA6F9E, 0 10px 20px rgba(255,107,157,0.3)" : "0 4px 0 #999",
              }}
            >
              <span className="text-2xl">{food.emoji}</span>
              <span className="text-lg">{food.name}</span>
              <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full">
                <Star className="w-4 h-4 fill-yellow-300 text-yellow-300" />
                <span>{food.cost}</span>
              </div>
            </motion.button>
          ))}
        </div>

        {stars < 3 && (
          <p className="text-center text-gray-400 text-sm font-medium">
            Học bài để kiếm thêm ⭐ cho Mèo Bông ăn nhé!
          </p>
        )}
      </div>
    </div>
  );
}
