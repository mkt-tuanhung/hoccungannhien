/**
 * Dọn sạch prompt trong toàn bộ câu hỏi:
 * 1. Xóa prefix emoji game-mode cũ (🧩, 📋, 🎵, ⚖️, 🃏, 🧺, 🔍, 🦋, 🥁, ⭐, ...)
 * 2. Xóa suffix "(Bấm phím đúng!)", "(Đúng nhận sticker!)", "(Đang có X)" v.v.
 * 3. Chuẩn hóa câu hỏi so sánh cho nhất quán
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '../public/data/math/questions');

// Prefix cần xóa (kể cả emoji + text mô tả game mode)
const PREFIX_PATTERNS = [
  /^🧩\s*Ghép tranh:\s*/,
  /^📋\s*Mẹ giao:\s*/,
  /^📋\s*Bố giao:\s*/,
  /^📋\s*Nhiệm vụ hôm nay:\s*tìm kết quả của\s*/,  // → chỉ giữ phép tính
  /^📋\s*/,
  /^🎵\s*/,
  /^⚖️\s*/,
  /^🃏\s*Lật thẻ ghép cặp:\s*/,
  /^🧺\s*Hứng số đúng:\s*/,
  /^🔍\s*Thám tử ơi,?\s*/,
  /^🔍\s*Tìm số bí ẩn:\s*nó là kết quả của phép tính này!\s*/,
  /^🔍\s*Phá án:\s*/,
  /^🔍\s*/,
  /^🦋\s*/,
  /^🥁\s*Đếm rồi gõ:\s*/,
  /^🥁\s*Có\s*\d+\s*\S+\s*—\s*gõ trống đúng số lần!\s*/,  // "🥁 Có 4 kẹo — gõ trống..." → xóa luôn, câu này cần viết lại
  /^🥁\s*Gõ trống\s*\d+\s*lần!\s*/,  // "🥁 Gõ trống 7 lần!" → xóa
  /^🥁\s*/,
  /^⭐\s*/,
  /^🎯\s*/,
  /^🚀\s*/,
  /^🌟\s*/,
  /^🎪\s*/,
  /^🎠\s*/,
  /^🎮\s*/,
];

// Suffix/ngoặc thừa cần xóa
const SUFFIX_PATTERNS = [
  /\s*\(Bấm phím đúng!\)$/,
  /\s*\(Đúng nhận sticker!\)$/,
  /\s*\(Đang có \d+\)$/,
  /\s*\(Đúng nhận sao!\)$/,
  /\s*\(Điền vào ô trống!\)$/,
  /\s*!$/,   // dấu ! thừa ở cuối câu hỏi toán (không phải câu cảm thán)
];

// Map câu hỏi "⚖️ Cân cần thêm bao nhiêu để bằng X? (Đang có Y)" → "X - Y = ?"
const SCALE_RE = /Cân cần thêm bao nhiêu để bằng (\d+)\?\s*\(Đang có (\d+)\)/;
// "Đĩa trái có quả nặng X. Đặt quả nào vào đĩa phải để cân?" → "Số nào cộng với X bằng X+Y?"
const SCALE2_RE = /Đĩa trái có quả nặng (\d+)\.\s*Đặt quả nào vào đĩa phải để cân\?/;

function cleanPrompt(prompt, correctAnswer) {
  let p = prompt.trim();

  // Xử lý đặc biệt câu cân
  const scaleMatch = p.match(SCALE_RE);
  if (scaleMatch) {
    const total = parseInt(scaleMatch[1]);
    const current = parseInt(scaleMatch[2]);
    return `${total} - ${current} = ?`;
  }
  const scale2Match = p.match(SCALE2_RE);
  if (scale2Match) {
    const left = parseInt(scale2Match[1]);
    return `Số nào cộng với ${left} bằng ${correctAnswer + left}?`;
  }

  // Xóa prefix
  for (const re of PREFIX_PATTERNS) {
    p = p.replace(re, '');
  }

  // Xóa suffix
  for (const re of SUFFIX_PATTERNS) {
    // Chỉ xóa "!" nếu không phải câu hỏi bình thường kết thúc bằng "?"
    if (re.source === '\\s*!$' && p.endsWith('?')) continue;
    if (re.source === '\\s*!$' && !p.match(/\d+\s*[+\-×÷]\s*\d+/)) continue;
    p = p.replace(re, '');
  }

  return p.trim();
}

// Đếm thay đổi
let totalChanged = 0;
let totalQuestions = 0;

const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json')).sort();

for (const file of files) {
  const filePath = path.join(DATA_DIR, file);
  const questions = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  let changed = 0;

  const cleaned = questions.map(q => {
    const newPrompt = cleanPrompt(q.prompt || '', q.correctAnswer);
    if (newPrompt !== q.prompt) {
      changed++;
      return { ...q, prompt: newPrompt };
    }
    return q;
  });

  if (changed > 0) {
    fs.writeFileSync(filePath, JSON.stringify(cleaned, null, 2), 'utf8');
    console.log(`${file}: đã sửa ${changed} câu`);
    totalChanged += changed;
  }
  totalQuestions += questions.length;
}

console.log(`\nXong! Đã sửa ${totalChanged}/${totalQuestions} câu hỏi.`);
