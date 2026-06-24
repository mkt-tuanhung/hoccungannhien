// Sinh nền bằng Google Imagen 3 (Gemini API). Thường cho nền sạch & đẹp hơn.
// Cần: thêm GEMINI_API_KEY=... vào .env.local
// Chạy: node scripts/generate-scenes-gemini.mjs <tên|all>
import fs from "fs";
import path from "path";

const envPath = path.join(process.cwd(), ".env.local");
const env = fs.readFileSync(envPath, "utf8");
const apiKey = (env.split("\n").find((l) => l.startsWith("GEMINI_API_KEY=")) || "").split("=").slice(1).join("=").trim();
if (!apiKey) {
  console.error("❌ Thiếu GEMINI_API_KEY trong .env.local. Hãy thêm dòng: GEMINI_API_KEY=your_key");
  process.exit(1);
}

// Style: SẠCH, tối giản, ít chi tiết, giữa thoáng — đúng yêu cầu.
const STYLE =
  "Soft, clean, minimalistic children's mobile game background. Smooth flat-ish soft 3D shapes, " +
  "gentle pastel colors, soft lighting, lots of empty space, NOT busy, NOT cluttered, very few simple elements, " +
  "calm and breezy, modern casual game art. NO text, NO numbers, NO characters, NO UI.";

const COMP =
  " Vertical 9:16 portrait. A big clean empty center with a smooth soft gradient. " +
  "Only 2-3 small simple decorations near the very bottom edge. Keep it minimal and uncluttered.";

const SCENES = {
  garden: `${STYLE} A calm soft green meadow under a clear soft blue sky, a couple of simple round trees only at the bottom corners.${COMP}`,
  ocean: `${STYLE} A calm soft turquoise underwater scene, a couple of simple corals only at the bottom corners.${COMP}`,
  candy: `${STYLE} A soft pink candy land, a couple of simple lollipops only at the bottom corners.${COMP}`,
  fairyforest: `${STYLE} A calm soft misty teal forest, a couple of simple glowing mushrooms only at the bottom corners.${COMP}`,
  crystalcave: `${STYLE} A calm soft violet crystal cave, a couple of simple glowing gems only at the bottom corners.${COMP}`,
  dinovalley: `${STYLE} A calm soft green dino valley, a couple of simple palm trees only at the bottom corners.${COMP}`,
  robotcity: `${STYLE} A calm soft blue city skyline, a couple of simple rounded buildings only at the bottom corners.${COMP}`,
  space: `${STYLE} A calm soft deep purple starry sky, a couple of simple small planets only at the bottom corners.${COMP}`,
  castle: `${STYLE} A calm soft pink-gold sky, one simple small castle silhouette far at the bottom center.${COMP}`,
};

async function gen(name) {
  const prompt = SCENES[name];
  if (!prompt) { console.error(`❌ Không có scene "${name}". Có: ${Object.keys(SCENES).join(", ")}`); return; }
  console.log(`🎨 [Gemini] Đang sinh "${name}"...`);
  const url = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${apiKey}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      instances: [{ prompt }],
      parameters: { sampleCount: 1, aspectRatio: "9:16" },
    }),
  });
  if (!res.ok) { console.error(`❌ ${name}:`, (await res.text()).slice(0, 300)); return; }
  const data = await res.json();
  const b64 = data?.predictions?.[0]?.bytesBase64Encoded;
  if (!b64) { console.error(`❌ ${name}: không có ảnh trả về`, JSON.stringify(data).slice(0, 200)); return; }
  const outDir = path.join(process.cwd(), "public", "scenes");
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, `${name}.png`), Buffer.from(b64, "base64"));
  console.log(`✅ Lưu: public/scenes/${name}.png`);
}

const target = process.argv[2] || "garden";
(async () => {
  if (target === "all") { for (const n of Object.keys(SCENES)) await gen(n); }
  else await gen(target);
})();
