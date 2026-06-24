// Pre-generate 1500 voice qua FPT.AI (gọi local API route /api/admin/tts, route lo FPT + cache).
// Yêu cầu dev server đang chạy ở http://localhost:3000
import fs from "fs";
import path from "path";

const dir = path.join(process.cwd(), "public", "data", "math", "questions");

function toSpeech(t) {
  return (t || "").replace(/🔊/g, "").replace(/\s*=\s*\?/g, " bằng mấy").replace(/\s*\+\s*/g, " cộng ")
    .replace(/\s*-\s*/g, " trừ ").replace(/\s*>\s*/g, " lớn hơn ").replace(/\s*<\s*/g, " bé hơn ")
    .replace(/__+/g, " mấy ").replace(/\?/g, "").replace(/\s+/g, " ").trim();
}

const set = new Set();
for (const f of fs.readdirSync(dir).filter((f) => f.endsWith(".json"))) {
  for (const q of JSON.parse(fs.readFileSync(path.join(dir, f)))) {
    let p = q.prompt;
    if (q.renderMode === "addition") p = `${q.targetCount} + ${q.targetCount2 || 0} = ?`;
    else if (q.renderMode === "subtraction") p = `${q.targetCount} - ${q.targetCount2 || 0} = ?`;
    set.add(toSpeech(p));
  }
}

const prompts = [...set].filter(Boolean);
console.log(`Tổng ${prompts.length} voice cần tạo (FPT.AI)...`);
let done = 0, fail = 0;

for (const text of prompts) {
  try {
    const res = await fetch("http://localhost:3000/api/admin/tts", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text }),
    });
    const j = await res.json();
    if (j.success) { done++; if (done % 10 === 0) console.log(`...${done}/${prompts.length}`); }
    else { fail++; console.log("✗", text, j.error?.slice?.(0, 60)); }
  } catch (e) { fail++; console.log("✗", text, e.message); }
}
console.log(`\n🎉 Xong: ${done} voice, ${fail} lỗi.`);
