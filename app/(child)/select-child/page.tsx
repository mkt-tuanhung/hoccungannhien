"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth";
import { useChild } from "@/lib/child-context";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function SelectChild() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { children, setActiveChildId, loading: childLoading } = useChild();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [authLoading, user, router]);

  const handleSelect = (childId: string) => {
    setActiveChildId(childId);
    router.push("/home");
  };

  if (authLoading || childLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 flex items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="text-5xl">
          🌸
        </motion.div>
      </div>
    );
  }

  const colors = [
    { bg: "from-pink-200 to-rose-300", ring: "ring-pink-300", text: "text-pink-600" },
    { bg: "from-blue-200 to-cyan-300", ring: "ring-blue-300", text: "text-blue-600" },
    { bg: "from-purple-200 to-fuchsia-300", ring: "ring-purple-300", text: "text-purple-600" },
    { bg: "from-amber-200 to-orange-300", ring: "ring-amber-300", text: "text-amber-600" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-purple-50 flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-3">
          Hôm nay ai học nhỉ? 🎒
        </h1>
        <p className="text-gray-400 font-medium">Chọn bé để bắt đầu học nào!</p>
      </motion.div>

      <div className="grid grid-cols-2 gap-8 max-w-lg">
        {children.map((child, index) => {
          const color = colors[index % colors.length];
          return (
            <motion.button
              key={child.id}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.15, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.08, y: -8 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSelect(child.id)}
              className="flex flex-col items-center gap-4 p-6 rounded-[2rem] bg-white shadow-lg hover:shadow-2xl transition-shadow border-2 border-white hover:border-pink-200"
            >
              <div className={`w-28 h-28 rounded-full bg-gradient-to-br ${color.bg} ring-4 ${color.ring} ring-offset-2 overflow-hidden flex items-center justify-center shadow-md`}>
                {child.avatar_url ? (
                  <img src={child.avatar_url} alt={child.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-5xl">
                    {index === 0 ? "👧" : index === 1 ? "👦" : index === 2 ? "🧒" : "👶"}
                  </span>
                )}
              </div>
              <div className="text-center">
                <p className={`text-xl font-black ${color.text}`}>{child.name}</p>
                <div className="flex items-center justify-center gap-2 mt-1">
                  <span className="text-xs bg-yellow-100 text-yellow-600 font-bold px-2 py-0.5 rounded-full">
                    ⭐ {child.total_stars || 0}
                  </span>
                  <span className="text-xs bg-orange-100 text-orange-600 font-bold px-2 py-0.5 rounded-full">
                    🔥 {child.streak_days || 0}
                  </span>
                </div>
              </div>
            </motion.button>
          );
        })}

        {/* Nút thêm bé */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: children.length * 0.15, type: "spring" }}
        >
          <Link
            href="/setup-child"
            className="flex flex-col items-center justify-center gap-3 p-6 rounded-[2rem] border-4 border-dashed border-gray-200 hover:border-pink-300 transition-colors h-full min-h-[200px] group"
          >
            <div className="w-20 h-20 rounded-full bg-gray-100 group-hover:bg-pink-100 flex items-center justify-center transition-colors">
              <Plus className="w-10 h-10 text-gray-300 group-hover:text-pink-400 transition-colors" />
            </div>
            <p className="text-gray-400 group-hover:text-pink-400 font-bold transition-colors">Thêm bé</p>
          </Link>
        </motion.div>
      </div>

      {children.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-8"
        >
          <p className="text-gray-400 mb-4">Chưa có hồ sơ bé nào. Tạo ngay nhé!</p>
          <Link
            href="/setup-child"
            className="inline-block bg-gradient-to-r from-pink-400 to-purple-400 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:scale-105 transition-transform"
          >
            Tạo hồ sơ bé đầu tiên
          </Link>
        </motion.div>
      )}
    </div>
  );
}
