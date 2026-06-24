// Dọn data câu hỏi: tính lại correctAnswer + options + prompt cho khớp với
// targetCount/targetCount2/renderMode. Sửa triệt để lỗi đáp án sai của data cũ.
import fs from "fs";
import path from "path";

const dir = path.join(process.cwd(), "public", "data", "math", "questions");

function makeOptions(ans, extra = []) {
  const opts = new Set([ans, ...extra.filter((x) => x >= 0)]);
  let guard = 0;
  while (opts.size < 4 && guard++ < 80) {
    const d = Math.floor(Math.random() * 4) + 1;
    let w = Math.random() < 0.5 ? ans + d : ans - d;
    if (w < 0) w = ans + d + 1;
    opts.add(w);
  }
  return [...opts].slice(0, 4).sort(() => Math.random() - 0.5);
}

// Tính đáp án cho dạng dãy số / liền trước-sau từ nội dung prompt.
function parseSequenceAnswer(prompt) {
  if (!prompt) return null;
  if (/liền sau/i.test(prompt)) {
    const m = prompt.match(/\d+/);
    if (m) return parseInt(m[0]) + 1;
  }
  if (/liền trước/i.test(prompt)) {
    const m = prompt.match(/\d+/);
    if (m) return Math.max(0, parseInt(m[0]) - 1);
  }
  if (/thiếu|dãy|thứ tự/i.test(prompt)) {
    const after = prompt.includes(":") ? prompt.split(":")[1] : prompt;
    const tokens = after.split(",").map((s) => s.trim()).filter((t) => /\d|__|\?/.test(t));
    const arr = tokens.map((t) => (/\d/.test(t) ? parseInt(t) : null));
    const blankIdx = arr.indexOf(null);
    if (blankIdx < 0) return null;
    let step = 1;
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] != null && arr[i + 1] != null) { step = arr[i + 1] - arr[i]; break; }
    }
    const knownIdx = arr.findIndex((v) => v != null);
    if (knownIdx < 0) return null;
    return arr[knownIdx] + step * (blankIdx - knownIdx);
  }
  return null;
}

let totalFixed = 0;

for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".json"))) {
  const fp = path.join(dir, file);
  const data = JSON.parse(fs.readFileSync(fp, "utf8"));
  let fixed = 0;

  for (const q of data) {
    const a = Number(q.targetCount) || 0;
    let b = Number(q.targetCount2) || 0;
    const mode = q.renderMode;

    if (mode === "addition") {
      q.correctAnswer = a + b;
      q.prompt = `${a} + ${b} = ?`;
      q.options = makeOptions(q.correctAnswer);
      fixed++;
    } else if (mode === "subtraction") {
      const hi = Math.max(a, b), lo = Math.min(a, b);
      q.targetCount = hi; q.targetCount2 = lo;
      q.correctAnswer = hi - lo;
      q.prompt = `${hi} - ${lo} = ?`;
      q.options = makeOptions(q.correctAnswer);
      fixed++;
    } else if (mode === "compare") {
      q.correctAnswer = Math.max(a, b);
      q.prompt = "Nhóm nào có nhiều hơn? Chọn số lớn hơn.";
      q.options = makeOptions(Math.max(a, b), [Math.min(a, b)]);
      fixed++;
    } else if (mode === "single" || (a > 0 && (!mode || mode === "none") && !/[-+]|liền|dãy|thứ tự|thiếu/i.test(q.prompt || ""))) {
      // Đếm đơn giản — KHÔNG lộ số đáp án, KHÔNG kẹt tên vật cụ thể
      q.correctAnswer = a;
      q.renderMode = "single";
      q.prompt = "Đếm xem có bao nhiêu và chọn số đúng nhé!";
      q.options = makeOptions(a);
      fixed++;
    } else {
      // Dạng dãy số / liền trước-sau: parse đáp án từ prompt
      const seqAns = parseSequenceAnswer(q.prompt);
      if (seqAns != null && !Number.isNaN(seqAns)) {
        q.correctAnswer = seqAns;
        q.renderMode = "none";
        q.options = makeOptions(seqAns);
        fixed++;
      } else if (typeof q.correctAnswer === "number") {
        if (!Array.isArray(q.options) || !q.options.includes(q.correctAnswer)) {
          q.options = makeOptions(q.correctAnswer);
          fixed++;
        }
      }
    }
  }

  // Loại câu rác không cứu được
  const cleaned = data.filter((q) => {
    if (/sắp xếp các số/i.test(q.prompt || "")) return false;
    const okMode = ["addition", "subtraction", "single", "compare"].includes(q.renderMode);
    if (!okMode && (q.correctAnswer === 0 || q.correctAnswer == null || Number.isNaN(q.correctAnswer))) return false;
    return true;
  });
  const removed = data.length - cleaned.length;

  fs.writeFileSync(fp, JSON.stringify(cleaned, null, 1));
  totalFixed += fixed;
  console.log(`✅ ${file}: ${fixed} chuẩn hoá, ${removed} câu rác bị loại → còn ${cleaned.length}`);
}

console.log(`\n🎉 Tổng cộng: ${totalFixed} câu đã sửa.`);
