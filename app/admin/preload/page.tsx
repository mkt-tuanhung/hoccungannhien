"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

// Hàm tính hash nhất quán giữa Client và Server
function getTextHash(text: string) {
  const cleanText = text.replace(/🔊/g, '').trim();
  let hash = 0;
  for (let i = 0; i < cleanText.length; i++) {
    const char = cleanText.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

export default function PreloadAudio() {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("");
  const [isPreloading, setIsPreloading] = useState(false);
  const [step, setStep] = useState(0); // 0: Idle, 1: Generating JSON, 2: Fetching TTS

  const handleGenerateAndPreload = async () => {
    setIsPreloading(true);
    setStep(1);
    setProgress(0);
    setStatus("Đang quét dữ liệu 1500 câu hỏi JSON đã có sẵn...");

    try {
      // BỎ QUA BƯỚC 1: Không cần gọi API sinh JSON nữa vì file JSON đã được tạo cứng từ trước
      // const genRes = await fetch('/api/admin/generate-fixed');
      // if (!genRes.ok) throw new Error("Lỗi khi sinh câu hỏi JSON");
      // const genData = await genRes.json();
      
      setStatus(`✅ Đã nạp JSON thành công. Bắt đầu thu thập text...`);

      // 2. Thu thập toàn bộ Text từ 30 file JSON

      setStep(2);
      const allTexts = new Set<string>();
      
      for (let i = 1; i <= 30; i++) {
        try {
          const req = await fetch(`/data/math/questions/level_${i}.json`);
          if (req.ok) {
            const questions = await req.json();
            questions.forEach((q: any) => {
              if (q.prompt) {
                 const cleanText = q.prompt.replace(/🔊/g, '').trim();
                 if (cleanText) allTexts.add(cleanText);
              }
            });
          }
        } catch (e) {
          console.warn(`Could not fetch level ${i}`);
        }
      }

      const texts = Array.from(allTexts);
      setStatus(`Tìm thấy ${texts.length} câu thoại độc lập. Bắt đầu gọi OpenAI TTS...`);
      
      // 3. Gọi OpenAI TTS tuần tự
      let successCount = 0;
      for (let i = 0; i < texts.length; i++) {
        const text = texts[i];
        setStatus(`Đang tải âm thanh (${i + 1}/${texts.length}): ${text.substring(0, 40)}...`);
        
        try {
          const res = await fetch('/api/admin/tts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text })
          });
          if (res.ok) {
            successCount++;
          } else {
            const errData = await res.json().catch(() => ({}));
            console.error(`Lỗi TTS (${text}):`, errData.error || res.statusText);
          }
        } catch (e: any) {
          console.error("Lỗi mạng:", text, e);
        }
        
        // Thêm delay 1.5 giây giữa mỗi file để tránh bị ElevenLabs chặn vì request quá nhanh (Rate limit)
        await new Promise(resolve => setTimeout(resolve, 1500));

        
        setProgress(Math.round(((i + 1) / texts.length) * 100));
        
        // Nghỉ 100ms giữa các lần gọi để tránh Rate Limit của OpenAI
        await new Promise(r => setTimeout(r, 100));
      }
      
      setStatus(`✅ Hoàn tất! Đã lưu thành công ${successCount}/${texts.length} file MP3 từ OpenAI TTS.`);
    } catch (e: any) {
      console.error(e);
      setStatus("❌ Có lỗi xảy ra: " + e.message);
    } finally {
      setIsPreloading(false);
      setStep(0);
    }
  };

  return (
    <div className="min-h-screen bg-white p-8 font-sans max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-blue-600">Trình Quản Lý Dữ Liệu Cốt Lõi</h1>
      <p className="text-gray-600">
        Công cụ này thực hiện 2 nhiệm vụ siêu quan trọng cho hệ thống:
      </p>
      <ul className="list-disc pl-5 text-gray-600 mb-6 space-y-2">
        <li><strong>Bước 1:</strong> Đọc file Markdown chứa 300 mẫu câu hỏi, sinh ra chính xác <strong>1500 câu hỏi cố định (JSON)</strong> và chia đều cho 3 Game Mode của từng Level.</li>
        <li><strong>Bước 2:</strong> Quét 1500 câu hỏi vừa sinh, lọc các câu text trùng lặp và gọi <strong>ElevenLabs TTS (Giọng Việt Nam tùy chỉnh)</strong> để tải file MP3 về máy tính (thư mục <code>public/tts/</code>).</li>
      </ul>
      
      <div className="bg-gray-100 rounded-full h-6 overflow-hidden border border-gray-200">
        <div 
          className="bg-green-500 h-full transition-all duration-300 relative"
          style={{ width: `${progress}%` }}
        >
          <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white drop-shadow-md">
            {progress}%
          </span>
        </div>
      </div>
      
      <div className="text-lg font-semibold text-blue-600 min-h-[4rem] p-4 bg-blue-50 rounded-xl border border-blue-100">
        {status || "Hệ thống đang sẵn sàng."}
      </div>

      <Button 
        size="lg" 
        onClick={handleGenerateAndPreload} 
        disabled={isPreloading}
        className="w-full text-xl py-8 bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all"
      >
        {isPreloading ? "Đang xử lý... Vui lòng không đóng trang" : "🚀 KHỞI TẠO 1500 CÂU HỎI & TẢI AUDIO (ELEVENLABS)"}
      </Button>
    </div>
  );
}
