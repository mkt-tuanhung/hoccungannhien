const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { OpenAI } = require('openai');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const texts = [
  "Apple", "Sun", "Bunnies", "Kitten",
  "Đó là một loại quả màu đỏ bé hay ăn đó!",
  "Tuyệt vời! Apple có nghĩa là Quả Táo.",
  "Ông mặt trời toả nắng vàng đó bé!",
  "Đếm số táo",
  "1", "2", "3", "4",
  "Bé thử dùng ngón tay đếm từng quả xem!",
  "Có bao nhiêu bạn thỏ?",
  "Bé thấy mấy cái tai dài nào?",
  "Tìm chữ A",
  "A", "B", "C", "D",
  "Chữ A có cái mái nhà giống túp lều đó bé!",
  "Chọn dấu Sắc",
  "´", "ˋ", "˜", "̉",
  "Dấu sắc bay lên trời nha!",
  "Mèo Bông thích quá! Cảm ơn bạn!"
];

const ttsDir = path.join(process.cwd(), "public", "tts");
if (!fs.existsSync(ttsDir)) {
  fs.mkdirSync(ttsDir, { recursive: true });
}

async function preload() {
  console.log("Starting direct OpenAI TTS generation for", texts.length, "files...");
  for (let i = 0; i < texts.length; i++) {
    const text = texts[i];
    const hash = crypto.createHash("md5").update(text.trim()).digest("hex");
    const filePath = path.join(ttsDir, `${hash}.mp3`);
    
    if (fs.existsSync(filePath)) {
      console.log(`[${i+1}/${texts.length}] Skipping ${text} (already exists)`);
      continue;
    }

    console.log(`[${i+1}/${texts.length}] Generating: ${text}`);
    try {
      const mp3 = await openai.audio.speech.create({
        model: "tts-1",
        voice: "nova",
        input: text,
        speed: 1.15,
      });
      const buffer = Buffer.from(await mp3.arrayBuffer());
      fs.writeFileSync(filePath, buffer);
    } catch (e) {
      console.error(`Failed to generate ${text}:`, e.message);
    }
  }
  console.log("All done! MP3s saved to public/tts/");
}

preload();
