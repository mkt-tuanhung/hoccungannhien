"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ChevronLeft, Star } from "lucide-react";
import { mathData } from "@/data/math/levels";
import { Level, QuestionTemplate } from "@/types/game";
import GameOrchestrator from "@/components/quiz/GameOrchestrator";
import { saveLevelProgress } from "@/lib/progression";
import { islandNames } from "@/data/islandNames";
import { getWorldForLevel } from "@/lib/design/worlds";
import { celebrate, sparkleBurst } from "@/lib/confetti";
import BubbleText from "@/components/BubbleText";

const playVictorySound = () => {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const notes = [523, 659, 784, 1047];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.12, ctx.currentTime + i * 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.15 + 0.5);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + i * 0.15);
      osc.stop(ctx.currentTime + i * 0.15 + 0.5);
    });
  } catch {}
};
export default function LevelEngine({ params }: { params: { subject_id: string, level_id: string } }) {
  const router = useRouter();
  const unwrappedParams = params;
  const [levelData, setLevelData] = useState<Level | null>(null);
  
  // Tổng hợp tất cả câu hỏi của các game trong level này
  const [questions, setQuestions] = useState<QuestionTemplate[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [liveScore, setLiveScore] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (unwrappedParams.subject_id === "math") {
      // unwrappedParams.level_id from URL is "1" or "2"
      // level.id in levels.ts is "l01", "l02"
      // level.number is 1, 2
      const levelIdRaw = unwrappedParams.level_id;
      const levelIdNumber = parseInt(levelIdRaw);
      const level = mathData.levels.find(l => l.id === levelIdRaw || l.number === levelIdNumber);
      
      if (level) {
        setLevelData(level);
        
        // Fetch 50 fixed questions from JSON
        fetch(`/data/math/questions/level_${level.number}.json`)
          .then(res => {
            if (!res.ok) throw new Error("Not found: " + res.status);
            return res.json();
          })
          .then((data: QuestionTemplate[]) => {
            if (!data || data.length === 0) {
              setErrorMsg("JSON trống không có câu hỏi nào!");
              return;
            }
            // Select 10 questions — stratified by type so all modes appear
            const byType: Record<string, QuestionTemplate[]> = {};
            for (const q of data) {
              if (!byType[q.type]) byType[q.type] = [];
              byType[q.type].push(q);
            }
            const types = Object.keys(byType);
            const picked: QuestionTemplate[] = [];
            let i = 0;
            while (picked.length < 10) {
              const t = types[i % types.length];
              const pool = byType[t];
              if (pool.length > 0) picked.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0]);
              i++;
            }
            // Shuffle the picked set
            picked.sort(() => Math.random() - 0.5);
            setQuestions(picked);
          })
          .catch(err => {
            console.error("Failed to load questions:", err);
            setErrorMsg(err.message);
            setQuestions([]);
          });
      } else {
         setErrorMsg("Không tìm thấy level: " + unwrappedParams.level_id);
      }
    } else {
         setErrorMsg("Môn học chưa hỗ trợ: " + unwrappedParams.subject_id);
    }
  }, [unwrappedParams.subject_id, unwrappedParams.level_id]);

  if (errorMsg) {
    return <div className="min-h-screen bg-red-50 flex items-center justify-center font-bold text-red-500">Lỗi: {errorMsg}</div>;
  }

  if (!levelData || questions.length === 0) {
    return <div className="min-h-screen bg-blue-50 flex items-center justify-center">Đang tải dữ liệu...</div>;
  }

  const handleFinish = (score: number) => {
    setTotalScore(score);
    setIsFinished(true);
    
    // Lưu kết quả vào hệ thống tiến trình
    saveLevelProgress(unwrappedParams.subject_id, unwrappedParams.level_id, score, questions.length);

    playVictorySound();
    celebrate();
    setTimeout(() => sparkleBurst(), 600);
    setTimeout(() => celebrate(), 1200);
  };

  const progressPct = Math.round((currentIdx / questions.length) * 100);

  if (isFinished) {
    // 1 sao = 1 câu đúng, tối thiểu 1 sao
    const starsEarned = Math.max(1, totalScore);
    const accuracy = questions.length > 0 ? Math.round((totalScore / questions.length) * 100) : 0;
    const medal = accuracy >= 90 ? "🏆" : accuracy >= 70 ? "🥈" : accuracy >= 50 ? "🥉" : "🎯";
    return (
      <div className="min-h-[100dvh] flex items-center justify-center p-6" style={{ background: "linear-gradient(180deg, #FFF6FB 0%, #EFEAFE 100%)" }}>
        <div className="bg-white rounded-[36px] p-8 text-center shadow-[0_20px_60px_rgba(150,110,170,0.25)] max-w-sm w-full animate-in fade-in zoom-in duration-500">
          <div className="text-7xl mb-2 animate-bounce">{medal}</div>
          <h2 className="text-3xl font-black mb-3" style={{ fontFamily: "'Mochiy Pop One', system-ui", color: "#FF8FB8" }}>
            Hoàn thành!
          </h2>

          {/* Sao kiếm được */}
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-3xl px-6 py-4 mb-4">
            <p className="text-sm font-bold text-yellow-600 mb-1">Sao kiếm được</p>
            <p className="text-5xl font-black text-yellow-500" style={{ fontFamily: "'Mochiy Pop One', system-ui" }}>
              +{starsEarned} <span className="text-3xl">⭐</span>
            </p>
          </div>

          {/* Kết quả */}
          <div className="flex gap-3 mb-6">
            <div className="flex-1 bg-green-50 rounded-2xl p-3">
              <p className="text-xs font-bold text-green-600">Đúng</p>
              <p className="text-2xl font-black text-green-500">{totalScore}/{questions.length}</p>
            </div>
            <div className="flex-1 bg-blue-50 rounded-2xl p-3">
              <p className="text-xs font-bold text-blue-600">Chính xác</p>
              <p className="text-2xl font-black text-blue-500">{accuracy}%</p>
            </div>
          </div>

          <button
            onClick={() => router.push(`/subject/${unwrappedParams.subject_id}`)}
            className="w-full text-white text-xl font-black py-4 rounded-[24px] active:translate-y-1.5 transition-transform"
            style={{ background: "#6FD08C", boxShadow: "0 7px 0 #4FB571", fontFamily: "'Mochiy Pop One', system-ui" }}
          >
            Về Bản đồ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] relative overflow-hidden">
      {/* Top bar nổi */}
      <div className="absolute top-0 left-0 right-0 z-50 flex items-center gap-3 px-4 pt-4">
        <button
          onClick={() => router.back()}
          className="flex-shrink-0 w-11 h-11 bg-white/80 backdrop-blur rounded-full flex items-center justify-center shadow-md active:scale-90 transition"
        >
          <ChevronLeft className="w-6 h-6 text-[#5A4A6A]" />
        </button>
        {/* Thanh tiến trình */}
        <div className="flex-1 h-4 bg-white/70 rounded-full overflow-hidden shadow-inner">
          <motion.div
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg,#FF9CC2,#B49BEC)" }}
            initial={{ width: 0 }}
            animate={{ width: `${progressPct}%` }}
            transition={{ type: "spring", stiffness: 120 }}
          />
        </div>
        {/* Sao */}
        <div className="flex-shrink-0 flex items-center gap-1 bg-white/80 backdrop-blur px-3 py-1.5 rounded-full shadow-md font-black text-[#F0B131]">
          ⭐ {liveScore}
        </div>
      </div>

      <GameOrchestrator
        questions={questions}
        onGameComplete={handleFinish}
        onProgress={(cur, _total, score) => { setCurrentIdx(cur); setLiveScore(score); }}
        bg={getWorldForLevel(levelData.number).bg}
        objects={getWorldForLevel(levelData.number).objects}
      />
    </div>
  );
}
