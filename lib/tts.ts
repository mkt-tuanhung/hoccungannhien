// R2 public URL — set trong .env.local và Vercel env vars
const R2_URL = process.env.NEXT_PUBLIC_R2_PUBLIC_URL || '';

export function getTTSUrl(text: string): string {
  if (!text) return '';
  const cleanText = text.replace(/🔊/g, '').trim();
  if (!cleanText) return '';

  let hash = 0;
  for (let i = 0; i < cleanText.length; i++) {
    const char = cleanText.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  const absHash = Math.abs(hash);
  // Dùng R2 nếu có, fallback về /tts/ (local dev)
  const base = R2_URL || '';
  return `${base}/tts/tts_${absHash}.mp3`;
}

export async function playTTSAudio(text: string, onEnded: () => void): Promise<void> {
  if (!text) {
    onEnded();
    return;
  }

  try {
    const audioUrl = getTTSUrl(text);

    // Kiểm tra file tồn tại không (R2 hoặc local)
    try {
      const headRes = await fetch(audioUrl, { method: 'HEAD' });
      if (!headRes.ok) throw new Error('TTS file not found');
    } catch {
      // File không có → Web Speech API fallback
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        const utter = new SpeechSynthesisUtterance(text.replace(/[🔊🎵🧩📋🔍⭐🥁⚖️🧺]/gu, '').trim());
        utter.lang = 'vi-VN';
        utter.rate = 0.9;
        utter.onend = onEnded;
        utter.onerror = () => setTimeout(onEnded, 500);
        window.speechSynthesis.speak(utter);
        return;
      }
      throw new Error('No TTS available');
    }

    const audio = new Audio(audioUrl);
    audio.onended = onEnded;
    audio.onerror = () => { throw new Error("Audio playback failed"); };
    await audio.play();
  } catch (e) {
    console.error("TTS error:", e);
    setTimeout(onEnded, 500);
  }
}
