const fs = require('fs');
const http = require('http');

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

console.log("Starting preload of", texts.length, "audio files...");

async function preload() {
  for (let i = 0; i < texts.length; i++) {
    const text = texts[i];
    console.log(`[${i+1}/${texts.length}] Fetching: ${text}`);
    try {
      const url = `http://localhost:3000/api/speech?text=${encodeURIComponent(text)}`;
      await new Promise((resolve, reject) => {
        http.get(url, (res) => {
          if (res.statusCode !== 200) {
            let errorData = '';
            res.on('data', chunk => { errorData += chunk; });
            res.on('end', () => reject(new Error(`Status ${res.statusCode}: ${errorData}`)));
            return;
          }
          // Consume the stream to download it
          res.on('data', () => {});
          res.on('end', resolve);
        }).on('error', reject);
      });
      // Add a small delay to avoid OpenAI rate limit
      await new Promise(r => setTimeout(r, 1000));
    } catch (e) {
      console.error(`Failed to fetch ${text}:`, e.message);
    }
  }
  console.log("All done!");
}

preload();
