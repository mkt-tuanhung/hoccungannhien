// Sinh sprite PNG bằng Google Imagen 3 (Gemini API).
// Cần: GEMINI_API_KEY=... trong .env.local
// Chạy một sprite:  node scripts/generate-sprites-gemini.mjs frog
// Chạy tất cả:      node scripts/generate-sprites-gemini.mjs all
import fs from "fs";
import path from "path";

const envPath = path.join(process.cwd(), ".env.local");
const env = fs.readFileSync(envPath, "utf8");
const apiKey = (env.split("\n").find((l) => l.startsWith("GEMINI_API_KEY=")) || "").split("=").slice(1).join("=").trim();
if (!apiKey) {
  console.error("❌ Thiếu GEMINI_API_KEY trong .env.local. Hãy thêm dòng: GEMINI_API_KEY=your_key");
  process.exit(1);
}

const STYLE =
  "Single isolated character/object, cute glossy 3D cartoon style, soft pastel colors, " +
  "smooth round shapes, big friendly eyes, Pixar-style shading, glossy highlights, " +
  "completely transparent or pure white background, centered subject, " +
  "children's mobile game art, square 1:1 aspect ratio. NO text, NO shadows on ground.";

const SPRITES = {
  frog:        `${STYLE} A cute chubby green frog sitting upright, big round eyes, glossy belly, wearing a tiny golden crown.`,
  boat:        `${STYLE} A cute wooden sailboat with a colorful striped sail (red and white), cheerful portholes as eyes, floating on nothing.`,
  castle:      `${STYLE} A tiny cute fantasy castle with blue rooftops, round towers, glowing windows, sparkles around it, pastel stone.`,
  sun:         `${STYLE} A cute round smiling sun with chunky rounded rays, warm golden-yellow color, chubby cheeks, big happy eyes.`,
  rainbow:     `${STYLE} A cute rainbow arc with soft pastel stripes (red orange yellow green blue purple), fluffy white cloud puffs at each end, sparkles.`,
  carrot:      `${STYLE} A cute plump orange carrot with bright green leafy tops, glossy sheen, big friendly eyes on the body.`,
  palmtree:    `${STYLE} A cute chunky palm tree with a round trunk, big glossy green fronds at the top, a smiling face on the trunk.`,
  strawberry:  `${STYLE} A cute plump red strawberry with glossy surface, tiny yellow seeds, bright green leafy crown, big happy eyes.`,
};

const outDir = path.join(process.cwd(), "public", "sprites");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function generateSprite(name) {
  const prompt = SPRITES[name];
  if (!prompt) {
    console.error(`❌ Không có sprite "${name}". Có sẵn: ${Object.keys(SPRITES).join(", ")}`);
    return false;
  }

  const outPath = path.join(outDir, `${name}.png`);
  console.log(`🎨 Đang tạo ${name}.png ...`);

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        instances: [{ prompt }],
        parameters: {
          sampleCount: 1,
          aspectRatio: "1:1",
          outputMimeType: "image/png",
        },
      }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    console.error(`❌ ${name}: HTTP ${res.status} — ${err.slice(0, 200)}`);
    return false;
  }

  const json = await res.json();
  const b64 = json?.predictions?.[0]?.bytesBase64Encoded;
  if (!b64) {
    console.error(`❌ ${name}: Không có ảnh trong response:`, JSON.stringify(json).slice(0, 200));
    return false;
  }

  fs.writeFileSync(outPath, Buffer.from(b64, "base64"));
  console.log(`✅ Đã lưu: public/sprites/${name}.png`);
  return true;
}

const args = process.argv.slice(2);
const targets = args[0] === "all" ? Object.keys(SPRITES) : args;

if (targets.length === 0) {
  console.log("Dùng: node scripts/generate-sprites-gemini.mjs <tên|all>");
  console.log("Sprites có sẵn:", Object.keys(SPRITES).join(", "));
  process.exit(0);
}

let ok = 0, fail = 0;
for (const name of targets) {
  const success = await generateSprite(name);
  if (success) ok++; else fail++;
}
console.log(`\n📊 Kết quả: ${ok} thành công, ${fail} thất bại`);
