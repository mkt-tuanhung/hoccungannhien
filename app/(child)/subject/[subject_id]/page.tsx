"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Lock, Star, Play } from "lucide-react";
import { SubjectData } from "@/types/game";
import { mathData } from "@/data/math/levels";
import { motion } from "framer-motion";
import { getSubjectProgress, isLevelUnlocked, SubjectProgress } from "@/lib/progression";
import { islandNames } from "@/data/islandNames";
import { img, assetUrl } from "@/lib/assets";

export default function SubjectMap({ params }: { params: { subject_id: string } }) {
  const router = useRouter();
  const unwrappedParams = params;
  const [subjectData, setSubjectData] = useState<SubjectData | null>(null);
  const [transitioningId, setTransitioningId] = useState<string | null>(null);
  const [subjectProgress, setSubjectProgress] = useState<SubjectProgress>({});

  const playMagicSound = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      
      // Hợp âm C major arpeggio tạo cảm giác phép thuật lấp lánh
      const freqs = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98]; 
      
      freqs.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;
        
        const startTime = ctx.currentTime + i * 0.08; // Rải nốt
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.15, startTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.8);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start(startTime);
        osc.stop(startTime + 0.8);
      });
    } catch (e) {
      console.error("Audio Context not supported", e);
    }
  };

  const handleLevelClick = (e: React.MouseEvent, levelId: string, index: number, isLocked: boolean) => {
    e.preventDefault();
    if (isLocked) return;
    
    // Kích hoạt hiệu ứng bay vào đảo
    setTransitioningId(levelId);
    
    // Phát âm thanh phép thuật lấp lánh
    playMagicSound();
    
    // Phát giọng đọc tên đảo bằng AI (TTS)
    const ttsAudio = new Audio(assetUrl(`/tts/islands/island_${index + 1}.mp3`));
    ttsAudio.play().catch(err => console.log("TTS play failed:", err));
    
    // Đợi 1s cho hiệu ứng zoom và âm thanh hoàn tất rồi mới chuyển trang
    setTimeout(() => {
      router.push(`/subject/${unwrappedParams.subject_id}/level/${levelId}`);
    }, 1000);
  };

  useEffect(() => {
    // Tạm thời hardcode cho môn Toán
    if (unwrappedParams.subject_id === "math") {
      setSubjectData(mathData);
    }
    // Lấy dữ liệu tiến trình từ localStorage
    setSubjectProgress(getSubjectProgress(unwrappedParams.subject_id));
  }, [unwrappedParams.subject_id]);

  if (!subjectData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100 flex flex-col items-center justify-center p-4">
        <motion.div 
          animate={{ y: [0, -20, 0] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-6xl mb-6"
        >
          🚀
        </motion.div>
        <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4 drop-shadow-sm">Sắp ra mắt!</h1>
        <p className="text-xl text-gray-600 mb-8 font-medium">Môn học này đang được xây dựng.</p>
        <button 
          onClick={() => router.push("/home")}
          className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-8 py-4 rounded-full font-bold shadow-[0_10px_20px_rgba(59,130,246,0.3)] hover:scale-105 active:scale-95 transition-transform"
        >
          Quay lại Bản đồ
        </button>
      </div>
    );
  }

  // Một mảng các dải màu gradient sống động để áp dụng ngẫu nhiên cho từng Level
  const cardGradients = [
    "from-pink-400 to-rose-400 shadow-pink-200",
    "from-purple-400 to-fuchsia-400 shadow-purple-200",
    "from-cyan-400 to-blue-400 shadow-cyan-200",
    "from-orange-400 to-amber-400 shadow-orange-200",
    "from-emerald-400 to-teal-400 shadow-emerald-200"
  ];

  return (
    <div className="min-h-screen bg-[#F0F4F8] relative overflow-hidden pb-32">
      {/* Background Trang trí Động (Animated Background Blobs) */}
      <motion.div 
        animate={{ x: [-50, 50, -50], y: [-50, 50, -50], rotate: [0, 90, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 left-0 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-[80px] opacity-40 z-0"
      />
      <motion.div 
        animate={{ x: [50, -50, 50], y: [50, -50, 50], rotate: [0, -90, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-40 right-0 w-[30rem] h-[30rem] bg-purple-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 z-0"
      />
      <motion.div 
        animate={{ x: [-50, 50, -50], y: [50, -50, 50] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-0 left-20 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-[80px] opacity-40 z-0"
      />

      {/* Speed lines & Clouds Overlay khi đang chuyển cảnh */}
      {transitioningId && (
        <div className="fixed inset-0 z-[80] pointer-events-none flex items-center justify-center overflow-hidden">
          {/* Màn hình chớp trắng dần */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10"
          />
          {/* Hiệu ứng tốc độ (Speed Lines) */}
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 3, opacity: [0, 1, 0] }}
            transition={{ duration: 0.8, repeat: 1 }}
            className="absolute w-[200vw] h-[200vw] rounded-full border-[40px] border-white border-dashed z-20 opacity-30"
            style={{ filter: 'blur(4px)' }}
          />
          {/* Các đám mây bay vút qua */}
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <motion.div
              key={i}
              initial={{ scale: 0.1, x: 0, y: 0, opacity: 0 }}
              animate={{ 
                scale: 5 + i, 
                x: (Math.random() - 0.5) * 1000, 
                y: (Math.random() - 0.5) * 1000,
                opacity: [0, 0.8, 0]
              }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="absolute w-32 h-20 bg-white rounded-full blur-md z-30"
            />
          ))}
        </div>
      )}

      {/* Header (Glassmorphism) */}
      <div className={`sticky top-0 z-50 pt-12 pb-6 px-6 backdrop-blur-xl bg-white/40 border-b border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-12 rounded-b-[3rem] transition-opacity duration-500 ${transitioningId ? 'opacity-0' : 'opacity-100'}`}>
        <button 
          onClick={() => router.push("/home")}
          className="absolute top-12 left-6 bg-white/80 p-3 rounded-2xl shadow-sm hover:scale-110 active:scale-95 transition-all text-pink-500"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
        <h1 className="text-4xl font-black text-center mt-2 text-transparent bg-clip-text bg-gradient-to-br from-pink-500 to-purple-600 drop-shadow-sm uppercase tracking-wider">
          {subjectData.name}
        </h1>
      </div>

      {/* Map Content */}
      <div className="max-w-md mx-auto px-6 relative z-10">
        {/* Bỏ đường nối nét đứt thẳng cũ */}

        <div className="space-y-0 relative z-10 flex flex-col mt-20">
          {/* Mũi tên Bắt Đầu ở trên cùng */}
          <div className="flex justify-center my-8 relative z-0 animate-bounce">
            <div className="bg-white/80 backdrop-blur-md px-6 py-3 rounded-full text-pink-500 font-black shadow-lg border-2 border-pink-200">
              👇 Xuất phát!
            </div>
          </div>

          {subjectData.levels.map((level, index) => {
            const isLocked = !isLevelUnlocked(unwrappedParams.subject_id, index, subjectData.levels.map(l => l.id));
            const levelProgress = subjectProgress[level.id];
            
            const isLeft = index % 2 === 0;
            // Dùng 30 hòn đảo độc lập theo index (1 đến 30)
            const islandImage = img.island(index + 1);
            const isTransitioning = transitioningId === level.id;
            
            return (
              <motion.div 
                key={level.id}
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ type: "spring", bounce: 0.4, duration: 0.8 }}
                className={`flex ${isLeft ? 'justify-start ml-4' : 'justify-end mr-4'} relative h-64 mb-10`}
                style={{ zIndex: isTransitioning ? 100 : 1 }}
              >
                {/* Đường nối nét đứt zigzag SVG nối từ trên xuống dưới */}
                {index < subjectData.levels.length - 1 && (
                  <svg className="absolute w-full h-full pointer-events-none top-48 z-0" style={{ left: isLeft ? '50%' : '-50%' }}>
                    <path 
                      d={isLeft ? "M 0,0 C 80,120 160,120 160,200" : "M 160,0 C 80,120 0,120 0,200"} 
                      fill="transparent" 
                      stroke="#F472B6" 
                      strokeWidth="6" 
                      strokeDasharray="15 15"
                      opacity="0.6"
                    />
                  </svg>
                )}

                <a 
                  href={`/subject/${subjectData.id}/level/${level.id}`}
                  onClick={(e) => handleLevelClick(e, level.id, index, isLocked)}
                  className={`
                    relative w-64 h-64 group block
                    ${isLocked ? 'cursor-not-allowed opacity-80' : 'cursor-pointer'}
                    ${!isTransitioning && !isLocked ? 'hover:scale-105 transition-all duration-300' : ''}
                  `}
                  style={isTransitioning ? { 
                    transform: 'scale(1.8)', 
                    opacity: 0, 
                    transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)', 
                    zIndex: 999 
                  } : { zIndex: 10 }}
                >
                  {/* Hình ảnh Hòn đảo 3D */}
                  <img 
                    src={islandImage} 
                    alt={`Đảo Level ${level.number}`} 
                    className={`w-full h-full object-contain drop-shadow-2xl ${isLocked ? 'grayscale brightness-75 opacity-90' : ''}`}
                  />
                  
                  {/* Hình ảnh tên Đảo bằng AI siêu dễ thương đặt cạnh đảo */}
                  <motion.div
                    className={`absolute top-[30%] w-36 md:w-48 z-30 pointer-events-none ${isLocked ? 'grayscale brightness-75 opacity-80' : ''}`}
                    style={{ [isLeft ? 'right' : 'left']: '-35%' }}
                    animate={{
                      y: [0, -15, 0],
                      rotate: [-2, 3, -2]
                    }}
                    transition={{
                      duration: 3 + (index % 3),
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.2
                    }}
                  >
                    <img 
                      src={assetUrl(`/images/island_names/level_${level.number}.png`)}
                      alt={`Island Name ${level.number}`}
                      className="w-full h-auto object-contain drop-shadow-xl mix-blend-multiply"
                    />
                  </motion.div>
                  
                  {/* Đám mây bay lơ lửng xung quanh đảo */}
                  <motion.div 
                    animate={{ x: [-10, 10, -10] }}
                    transition={{ repeat: Infinity, duration: 4 + (index % 3) }}
                    className="absolute top-10 -left-6 w-12 h-6 bg-white/80 rounded-full blur-[2px] z-20 pointer-events-none"
                  />

                  {/* Bảng tên Level (Bảng gỗ / Nhãn dán) ẩn đi khi đang zoom */}
                  <div className={`absolute -top-6 left-1/2 -translate-x-1/2 w-48 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-xl border-2 border-white text-center group-hover:-translate-y-2 transition-transform ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-black bg-gradient-to-r from-pink-400 to-purple-400 text-white px-2 py-0.5 rounded-full">
                        L.{level.number}
                      </span>
                      {!isLocked ? (
                        <div className="flex gap-0.5 items-center justify-center text-xs font-black text-yellow-500">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 drop-shadow-sm mr-1" />
                          {levelProgress?.isCompleted ? `${levelProgress.score}/${levelProgress.total}` : 'Chưa chơi'}
                        </div>
                      ) : (
                        <Lock className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                    <h3 className={`text-sm font-bold truncate ${isLocked ? 'text-gray-400' : 'text-gray-800'}`}>
                      {level.title}
                    </h3>
                  </div>

                  {/* Nút Play siêu to khổng lồ ẩn hiện */}
                  {!isLocked && (
                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center shadow-[0_5px_15px_rgba(236,72,153,0.5)] transition-opacity z-30 ${isTransitioning ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'}`}>
                      <Play className="w-6 h-6 text-white ml-1 fill-white" />
                    </div>
                  )}
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
