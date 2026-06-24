import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json({ error: 'Missing text' }, { status: 400 });
    }

    const cleanText = text.replace(/🔊/g, '').trim();

    let hash = 0;
    for (let i = 0; i < cleanText.length; i++) {
      const char = cleanText.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    const fileName = `tts_${Math.abs(hash)}.mp3`;
    const filePath = path.join(process.cwd(), 'public', 'tts', fileName);

    const ttsDir = path.join(process.cwd(), 'public', 'tts');
    if (!fs.existsSync(ttsDir)) {
      fs.mkdirSync(ttsDir, { recursive: true });
    }

    if (fs.existsSync(filePath)) {
      return NextResponse.json({ success: true, fileName });
    }

    const FPT_API_KEY = process.env.FPT_API_KEY;
    if (!FPT_API_KEY) {
      return NextResponse.json({ error: 'Missing FPT_API_KEY in .env.local' }, { status: 500 });
    }

    // FPT.AI TTS — giọng Việt chuẩn (banmai: nữ miền Bắc)
    const fptResponse = await fetch('https://api.fpt.ai/hmi/tts/v5', {
      method: 'POST',
      headers: { 'api-key': FPT_API_KEY.trim(), 'voice': 'banmai', 'speed': '', 'format': 'mp3' },
      body: cleanText,
    });
    const data = await fptResponse.json();
    if (data.error !== 0) throw new Error(`FPT.AI Error: ${data.message}`);

    // FPT xử lý bất đồng bộ → poll URL tới khi có mp3 (tối đa ~30s)
    const audioUrl = data.async;
    let audioBuffer: ArrayBuffer | null = null;
    for (let i = 0; i < 15; i++) {
      await new Promise((r) => setTimeout(r, 2000));
      const audioRes = await fetch(audioUrl);
      if (audioRes.ok) { audioBuffer = await audioRes.arrayBuffer(); break; }
    }
    if (!audioBuffer) throw new Error('FPT.AI timeout');

    fs.writeFileSync(filePath, Buffer.from(audioBuffer));
    return NextResponse.json({ success: true, fileName });
  } catch (error: any) {
    console.error('TTS Generation Error:', error);
    fs.writeFileSync('tts_error.txt', error.toString());
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
