const fs = require('fs');
const https = require('https');
const path = require('path');

const islands = [
  "Level 1: Sandcastle Island",
  "Level 2: Forest Island",
  "Level 3: Snow Island",
  "Level 4: Amethyst Island",
  "Level 5: Candy Island",
  "Level 6: Volcano Island",
  "Level 7: Beach Island",
  "Level 8: City Island",
  "Level 9: Crystal Island",
  "Level 10: Autumn Island",
  "Level 11: Robo Island",
  "Level 12: Bloom Island",
  "Level 13: Pirate Island",
  "Level 14: Dino Island",
  "Level 15: Cosmic Island",
  "Level 16: Cloud Island",
  "Level 17: Mushroom Island",
  "Level 18: Honey Island",
  "Level 19: Fruit Island",
  "Level 20: Oasis Island",
  "Level 21: Farm Island",
  "Level 22: Spooky Island",
  "Level 23: Toy Island",
  "Level 24: Gear Island",
  "Level 25: Dragon Island",
  "Level 26: Waterfall Island",
  "Level 27: Zen Island",
  "Level 28: Aqua Island",
  "Level 29: Frost Island",
  "Level 30: Rainbow Island"
];

const dir = path.join(__dirname, '../public/tts/islands');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

async function downloadTTS() {
  for (let index = 0; index < islands.length; index++) {
    const text = islands[index];
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=en&client=tw-ob`;
    const dest = path.join(dir, `island_${index + 1}.mp3`);
    
    await new Promise((resolve, reject) => {
      https.get(url, (response) => {
        if (response.statusCode === 200) {
          const file = fs.createWriteStream(dest);
          response.pipe(file);
          file.on('finish', () => {
            file.close();
            console.log(`Saved: island_${index + 1}.mp3`);
            resolve();
          });
        } else {
          console.error(`Failed to download ${text}: ${response.statusCode}`);
          resolve(); // Resolve anyway to continue
        }
      }).on('error', (err) => {
        console.error(err);
        resolve();
      });
    });
    // Sleep a bit to avoid rate limiting
    await new Promise(r => setTimeout(r, 200));
  }
  console.log("Done generating all TTS files!");
}

downloadTTS();
