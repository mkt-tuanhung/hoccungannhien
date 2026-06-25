/**
 * Sinh câu hỏi chuẩn cho 30 level theo chương trình Toán lớp 1 Việt Nam
 * Mỗi level: 50 câu, đúng chủ đề, đúng phạm vi số
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, '../public/data/math/questions');

// Các phép toán ngữ cảnh
const COUNT_OBJ = ['táo','sao','kẹo','bóng','hoa','bướm','cá','cam','bút','nến','chim','ốc sên','cây nấm','bông tuyết'];
const STORY_NAMES = ['An','Bình','Mai','Nam','Linh','Hoa','Minh','Lan'];
const STORY_THINGS = ['táo','kẹo','bông hoa','quyển sách','quả bóng','tờ giấy','viên bi','chiếc lá'];

// Sinh số ngẫu nhiên trong đoạn [a, b]
function rnd(a, b) { return Math.floor(Math.random() * (b - a + 1)) + a; }

// Chọn phần tử ngẫu nhiên
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

// Sinh 3 đáp án sai hợp lý (gần với đáp án đúng)
function wrongOptions(correct, min = 0, max = 20, count = 3) {
  const wrongs = new Set();
  const deltas = [-3,-2,-1,1,2,3,-4,4,-5,5];
  for (const d of deltas) {
    const v = correct + d;
    if (v !== correct && v >= min && v <= max) wrongs.add(v);
    if (wrongs.size >= count) break;
  }
  // Nếu chưa đủ, thêm số ngẫu nhiên
  let attempts = 0;
  while (wrongs.size < count && attempts < 100) {
    const v = rnd(min, max);
    if (v !== correct) wrongs.add(v);
    attempts++;
  }
  return [...wrongs].slice(0, count);
}

// Xáo trộn vị trí đáp án đúng
function buildOptions(correct, wrongs) {
  const opts = [correct, ...wrongs];
  for (let i = opts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [opts[i], opts[j]] = [opts[j], opts[i]];
  }
  return opts;
}

// ID câu hỏi
function qId(levelNum, index) {
  return `l${String(levelNum).padStart(2,'0')}-q${String(index+1).padStart(3,'0')}`;
}

// ─── BUILDERS ─────────────────────────────────────────────

function countQ(levelNum, i, min, max) {
  const n = rnd(min, max);
  const obj = pick(COUNT_OBJ);
  const wrongs = wrongOptions(n, Math.max(0, min-2), max+2, 3);
  return {
    id: qId(levelNum, i), gameId: `level_${levelNum}`, type: `level_${levelNum}`,
    prompt: `Đếm ${obj} và chọn số đúng!`,
    correctAnswer: n, options: buildOptions(n, wrongs),
    objectIcon: `/icons/${pickIcon(obj)}_icon.png`, objectIcon2: '',
    targetCount: n, targetCount2: 0, renderMode: 'single', displayPrompt: null
  };
}

function addQ(levelNum, i, maxSum, minA = 1) {
  let a, b;
  do { a = rnd(minA, maxSum - 1); b = rnd(1, maxSum - a); } while (a + b > maxSum);
  const ans = a + b;
  const wrongs = wrongOptions(ans, 0, maxSum + 3, 3);
  const prompts = [
    `${a} + ${b} = ?`,
    `${a} + ${b} = ?`,
    `Tính: ${a} + ${b} = ?`,
  ];
  return {
    id: qId(levelNum, i), gameId: `level_${levelNum}`, type: `level_${levelNum}`,
    prompt: pick(prompts),
    correctAnswer: ans, options: buildOptions(ans, wrongs),
    objectIcon: '/icons/apple_icon.png', objectIcon2: '',
    targetCount: a, targetCount2: b, renderMode: 'addition', displayPrompt: null
  };
}

function subQ(levelNum, i, maxVal, minDiff = 0) {
  let a, b;
  do { a = rnd(2, maxVal); b = rnd(minDiff, a - 1); } while (a - b < 0);
  const ans = a - b;
  const wrongs = wrongOptions(ans, 0, maxVal, 3);
  const prompts = [
    `${a} - ${b} = ?`,
    `${a} - ${b} = ?`,
    `Tính: ${a} - ${b} = ?`,
  ];
  return {
    id: qId(levelNum, i), gameId: `level_${levelNum}`, type: `level_${levelNum}`,
    prompt: pick(prompts),
    correctAnswer: ans, options: buildOptions(ans, wrongs),
    objectIcon: '/icons/apple_icon.png', objectIcon2: '',
    targetCount: a, targetCount2: b, renderMode: 'subtraction', displayPrompt: null
  };
}

function compareQ(levelNum, i, min, max) {
  let a, b;
  do { a = rnd(min, max); b = rnd(min, max); } while (a === b);
  const ans = Math.max(a, b);
  const wrongs = wrongOptions(ans, min, max, 3);
  const types = [
    `Số nào lớn hơn: ${a} hay ${b}?`,
    `Số nào bé hơn: ${Math.max(a,b)} hay ${Math.min(a,b)}?`,
    `${a} và ${b}, số nào lớn hơn?`,
    `Chọn số lớn hơn trong hai số: ${a} và ${b}.`,
  ];
  let prompt = pick(types);
  let correctAnswer = ans;
  // Nếu hỏi bé hơn, đáp án là số nhỏ hơn
  if (prompt.includes('bé hơn') || prompt.includes('nhỏ hơn')) {
    correctAnswer = Math.min(a, b);
  }
  const ws = wrongOptions(correctAnswer, min, max, 3);
  return {
    id: qId(levelNum, i), gameId: `level_${levelNum}`, type: `level_${levelNum}`,
    prompt,
    correctAnswer, options: buildOptions(correctAnswer, ws),
    objectIcon: '/icons/star_icon.png', objectIcon2: '',
    targetCount: Math.max(a,b), targetCount2: 0, renderMode: 'single', displayPrompt: null
  };
}

function storyAddQ(levelNum, i, maxSum) {
  const name = pick(STORY_NAMES);
  const thing = pick(STORY_THINGS);
  let a, b;
  do { a = rnd(1, maxSum - 1); b = rnd(1, maxSum - a); } while (a + b > maxSum);
  const ans = a + b;
  const wrongs = wrongOptions(ans, 0, maxSum + 2, 3);
  const prompts = [
    `${name} có ${a} ${thing}, mẹ cho thêm ${b}. Có tất cả bao nhiêu?`,
    `Buổi sáng có ${a} ${thing}, buổi chiều thêm ${b} ${thing}. Tất cả là bao nhiêu?`,
    `${name} nhặt được ${a} ${thing} rồi nhặt thêm ${b} ${thing}. Có tất cả mấy ${thing}?`,
  ];
  return {
    id: qId(levelNum, i), gameId: `level_${levelNum}`, type: `level_${levelNum}`,
    prompt: pick(prompts),
    correctAnswer: ans, options: buildOptions(ans, wrongs),
    objectIcon: '/icons/apple_icon.png', objectIcon2: '',
    targetCount: a, targetCount2: b, renderMode: 'addition', displayPrompt: null
  };
}

function storySubQ(levelNum, i, maxVal) {
  const name = pick(STORY_NAMES);
  const thing = pick(STORY_THINGS);
  let a, b;
  do { a = rnd(2, maxVal); b = rnd(1, a - 1); } while (a === b);
  const ans = a - b;
  const wrongs = wrongOptions(ans, 0, maxVal, 3);
  const prompts = [
    `${name} có ${a} ${thing}, cho bạn ${b}. Còn lại bao nhiêu?`,
    `Có ${a} ${thing}, dùng hết ${b}. Còn lại mấy ${thing}?`,
    `Hộp có ${a} ${thing}, lấy ra ${b}. Còn lại bao nhiêu?`,
  ];
  return {
    id: qId(levelNum, i), gameId: `level_${levelNum}`, type: `level_${levelNum}`,
    prompt: pick(prompts),
    correctAnswer: ans, options: buildOptions(ans, wrongs),
    objectIcon: '/icons/apple_icon.png', objectIcon2: '',
    targetCount: a, targetCount2: b, renderMode: 'subtraction', displayPrompt: null
  };
}

function fillQ(levelNum, i, maxSum, isSub = false) {
  if (!isSub) {
    let a, b;
    do { a = rnd(1, maxSum-1); b = rnd(1, maxSum-a); } while (a+b > maxSum);
    const ans = b;
    const ws = wrongOptions(ans, 0, maxSum, 3);
    return {
      id: qId(levelNum, i), gameId: `level_${levelNum}`, type: `level_${levelNum}`,
      prompt: `${a} + ? = ${a+b}`,
      correctAnswer: ans, options: buildOptions(ans, ws),
      objectIcon: '/icons/star_icon.png', objectIcon2: '',
      targetCount: a+b, targetCount2: 0, renderMode: 'single', displayPrompt: null
    };
  } else {
    let a, b;
    do { a = rnd(2, maxSum); b = rnd(1, a-1); } while (a === b);
    const ans = a - b;
    const ws = wrongOptions(ans, 0, maxSum, 3);
    return {
      id: qId(levelNum, i), gameId: `level_${levelNum}`, type: `level_${levelNum}`,
      prompt: `${a} - ? = ${ans}`,
      correctAnswer: b, options: buildOptions(b, ws),
      objectIcon: '/icons/star_icon.png', objectIcon2: '',
      targetCount: a, targetCount2: 0, renderMode: 'single', displayPrompt: null
    };
  }
}

function sequenceQ(levelNum, i, max) {
  const start = rnd(1, max - 3);
  const len = rnd(3, 5);
  const missingIdx = rnd(1, len - 1); // không thiếu số đầu
  const ans = start + missingIdx;
  const ws = wrongOptions(ans, Math.max(0, start-1), start+len+1, 3);
  const arr = Array.from({length: len}, (_, k) => k === missingIdx ? '?' : start + k);
  return {
    id: qId(levelNum, i), gameId: `level_${levelNum}`, type: `level_${levelNum}`,
    prompt: `Điền số còn thiếu: ${arr.join(', ')}`,
    correctAnswer: ans, options: buildOptions(ans, ws),
    objectIcon: '/icons/star_icon.png', objectIcon2: '',
    targetCount: ans, targetCount2: 0, renderMode: 'single', displayPrompt: null
  };
}

function evenOddQ(levelNum, i, max) {
  const isEven = Math.random() > 0.5;
  const nums = Array.from({length: max}, (_, k) => k+1).filter(n => isEven ? n%2===0 : n%2!==0);
  const ans = pick(nums);
  // Sai: từ loại ngược
  const wsPool = Array.from({length: max}, (_, k) => k+1).filter(n => isEven ? n%2!==0 : n%2===0);
  const ws = wsPool.sort(() => Math.random()-0.5).slice(0, 3);
  return {
    id: qId(levelNum, i), gameId: `level_${levelNum}`, type: `level_${levelNum}`,
    prompt: isEven ? `Số nào là số chẵn?` : `Số nào là số lẻ?`,
    correctAnswer: ans, options: buildOptions(ans, ws),
    objectIcon: '/icons/star_icon.png', objectIcon2: '',
    targetCount: ans, targetCount2: 0, renderMode: 'single', displayPrompt: null
  };
}

function add3Q(levelNum, i, maxSum) {
  let a, b, c;
  do {
    a = rnd(1, maxSum - 2);
    b = rnd(1, maxSum - a - 1);
    c = rnd(1, maxSum - a - b);
  } while (a + b + c > maxSum);
  const ans = a + b + c;
  const ws = wrongOptions(ans, 0, maxSum + 2, 3);
  return {
    id: qId(levelNum, i), gameId: `level_${levelNum}`, type: `level_${levelNum}`,
    prompt: `${a} + ${b} + ${c} = ?`,
    correctAnswer: ans, options: buildOptions(ans, ws),
    objectIcon: '/icons/apple_icon.png', objectIcon2: '',
    targetCount: ans, targetCount2: 0, renderMode: 'single', displayPrompt: null
  };
}

// Nhận biết số (chỉ hỏi "số này là bao nhiêu?" cho bé nhỏ)
function recognizeQ(levelNum, i, min, max) {
  const n = rnd(min, max);
  const ws = wrongOptions(n, Math.max(0, min-1), max+2, 3);
  const prompts = [
    `Bé hãy chọn thẻ số ${n}!`,
    `Tìm số ${n} trong các thẻ dưới đây!`,
    `Chọn đúng số ${n} nhé!`,
  ];
  return {
    id: qId(levelNum, i), gameId: `level_${levelNum}`, type: `level_${levelNum}`,
    prompt: pick(prompts),
    correctAnswer: n, options: buildOptions(n, ws),
    objectIcon: '/icons/star_icon.png', objectIcon2: '',
    targetCount: n, targetCount2: 0, renderMode: 'single', displayPrompt: null
  };
}

function pickIcon(obj) {
  if (obj.includes('táo') || obj.includes('cam')) return 'apple';
  if (obj.includes('sao') || obj.includes('tuyết')) return 'star';
  if (obj.includes('kẹo') || obj.includes('nến')) return 'candy';
  if (obj.includes('bóng')) return 'ball';
  return 'apple';
}

// ─── LEVEL DEFINITIONS ────────────────────────────────────
// Mỗi level: 50 câu, cân bằng các dạng bài

function generateLevel(levelNum) {
  const qs = [];
  let i = 0;

  const add = (q) => { qs.push(q); i++; };

  switch (levelNum) {
    // ── GIAI ĐOẠN 1: Nhận biết & đếm số ──────────────────
    case 1: // Đếm số 1-5
      while (i < 30) add(countQ(1, i, 1, 5));
      while (i < 40) add(recognizeQ(1, i, 1, 5));
      while (i < 50) add(countQ(1, i, 1, 5));
      break;

    case 2: // Cộng trong 10
      while (i < 30) add(addQ(2, i, 10));
      while (i < 40) add(countQ(2, i, 1, 10));
      while (i < 50) add(addQ(2, i, 10));
      break;

    case 3: // Trừ trong 10
      while (i < 30) add(subQ(3, i, 10));
      while (i < 40) add(countQ(3, i, 1, 10));
      while (i < 50) add(subQ(3, i, 10));
      break;

    case 4: // So sánh hai số (1-10)
      while (i < 35) add(compareQ(4, i, 1, 10));
      while (i < 50) add(recognizeQ(4, i, 1, 10));
      break;

    case 5: // Cộng và trừ hỗn hợp trong 10
      while (i < 20) add(addQ(5, i, 10));
      while (i < 40) add(subQ(5, i, 10));
      while (i < 50) add(compareQ(5, i, 1, 10));
      break;

    case 6: // Toán có lời văn đơn giản (trong 10)
      while (i < 25) add(storyAddQ(6, i, 10));
      while (i < 50) add(storySubQ(6, i, 10));
      break;

    case 7: // Điền số vào chỗ trống (trong 10)
      while (i < 20) add(fillQ(7, i, 10, false));
      while (i < 40) add(fillQ(7, i, 10, true));
      while (i < 50) add(addQ(7, i, 10));
      break;

    case 8: // Ôn tập tổng hợp 1-10
      while (i < 12) add(addQ(8, i, 10));
      while (i < 24) add(subQ(8, i, 10));
      while (i < 36) add(compareQ(8, i, 1, 10));
      while (i < 43) add(storyAddQ(8, i, 10));
      while (i < 50) add(storySubQ(8, i, 10));
      break;

    case 9: // Thử thách: điền chỗ trống + dãy số trong 10
      while (i < 20) add(sequenceQ(9, i, 10));
      while (i < 35) add(fillQ(9, i, 10, false));
      while (i < 50) add(fillQ(9, i, 10, true));
      break;

    case 10: // Boss level: tổng hợp trong 10
      while (i < 10) add(addQ(10, i, 10));
      while (i < 20) add(subQ(10, i, 10));
      while (i < 30) add(compareQ(10, i, 1, 10));
      while (i < 38) add(storyAddQ(10, i, 10));
      while (i < 44) add(storySubQ(10, i, 10));
      while (i < 50) add(fillQ(10, i, 10, false));
      break;

    // ── GIAI ĐOẠN 2: Số 11-15 ─────────────────────────────
    case 11: // Cộng trong 15
      while (i < 25) add(countQ(11, i, 11, 15));
      while (i < 50) add(addQ(11, i, 15, 1));
      break;

    case 12: // Trừ trong 15
      while (i < 30) add(subQ(12, i, 15));
      while (i < 40) add(addQ(12, i, 15));
      while (i < 50) add(compareQ(12, i, 1, 15));
      break;

    case 13: // Ôn tập + kiểm tra 1-15
      while (i < 12) add(addQ(13, i, 15));
      while (i < 24) add(subQ(13, i, 15));
      while (i < 34) add(storyAddQ(13, i, 15));
      while (i < 42) add(storySubQ(13, i, 15));
      while (i < 50) add(fillQ(13, i, 15, false));
      break;

    case 14: // Cộng trừ hỗn hợp trong 15
      while (i < 15) add(addQ(14, i, 15));
      while (i < 30) add(subQ(14, i, 15));
      while (i < 40) add(compareQ(14, i, 1, 15));
      while (i < 50) add(fillQ(14, i, 15, true));
      break;

    case 15: // Toán có lời văn nâng cao (trong 15)
      while (i < 25) add(storyAddQ(15, i, 15));
      while (i < 45) add(storySubQ(15, i, 15));
      while (i < 50) add(compareQ(15, i, 1, 15));
      break;

    // ── GIAI ĐOẠN 3: Số 16-20 ─────────────────────────────
    case 16: // Nhận biết số 16-20, cộng trong 20
      while (i < 20) add(countQ(16, i, 11, 20));
      while (i < 40) add(addQ(16, i, 20));
      while (i < 50) add(compareQ(16, i, 1, 20));
      break;

    case 17: // Trừ trong 20
      while (i < 35) add(subQ(17, i, 20));
      while (i < 45) add(addQ(17, i, 20));
      while (i < 50) add(compareQ(17, i, 1, 20));
      break;

    case 18: // Toán có lời văn trong 20
      while (i < 25) add(storyAddQ(18, i, 20));
      while (i < 50) add(storySubQ(18, i, 20));
      break;

    case 19: // Dãy số + điền chỗ trống trong 20
      while (i < 25) add(sequenceQ(19, i, 20));
      while (i < 40) add(fillQ(19, i, 20, false));
      while (i < 50) add(fillQ(19, i, 20, true));
      break;

    case 20: // Ôn tập tổng hợp 11-20
      while (i < 10) add(addQ(20, i, 20));
      while (i < 20) add(subQ(20, i, 20));
      while (i < 30) add(compareQ(20, i, 1, 20));
      while (i < 38) add(storyAddQ(20, i, 20));
      while (i < 44) add(storySubQ(20, i, 20));
      while (i < 50) add(sequenceQ(20, i, 20));
      break;

    // ── GIAI ĐOẠN 4: Nâng cao ─────────────────────────────
    case 21: // Cộng trừ nhanh trong 20 (nhiều bài tập)
      while (i < 25) add(addQ(21, i, 20));
      while (i < 50) add(subQ(21, i, 20));
      break;

    case 22: // Số chẵn, số lẻ trong 20
      while (i < 30) add(evenOddQ(22, i, 20));
      while (i < 40) add(compareQ(22, i, 1, 20));
      while (i < 50) add(sequenceQ(22, i, 20));
      break;

    case 23: // Điền vào chỗ trống (x + ? = y) trong 20
      while (i < 25) add(fillQ(23, i, 20, false));
      while (i < 50) add(fillQ(23, i, 20, true));
      break;

    case 24: // Toán đố tổng hợp trong 20
      while (i < 25) add(storyAddQ(24, i, 20));
      while (i < 45) add(storySubQ(24, i, 20));
      while (i < 50) add(compareQ(24, i, 1, 20));
      break;

    case 25: // Cộng 3 số trong 15
      while (i < 30) add(add3Q(25, i, 15));
      while (i < 45) add(addQ(25, i, 20));
      while (i < 50) add(fillQ(25, i, 20, false));
      break;

    // ── GIAI ĐOẠN 5: Ôn luyện sáng tạo ──────────────────
    case 26: // Ôn tập sáng tạo: mix tất cả trong 20
      while (i < 10) add(addQ(26, i, 20));
      while (i < 20) add(subQ(26, i, 20));
      while (i < 28) add(storyAddQ(26, i, 20));
      while (i < 36) add(storySubQ(26, i, 20));
      while (i < 43) add(fillQ(26, i, 20, false));
      while (i < 50) add(compareQ(26, i, 1, 20));
      break;

    case 27: // Thử thách tư duy: dãy số + số chẵn/lẻ + điền
      while (i < 18) add(sequenceQ(27, i, 20));
      while (i < 34) add(evenOddQ(27, i, 20));
      while (i < 50) add(fillQ(27, i, 20, true));
      break;

    case 28: // Kiểm tra kỹ năng: tổng hợp có lời văn
      while (i < 20) add(storyAddQ(28, i, 20));
      while (i < 40) add(storySubQ(28, i, 20));
      while (i < 50) add(add3Q(28, i, 15));
      break;

    case 29: // Ôn luyện cuối: tất cả dạng bài
      while (i < 8)  add(addQ(29, i, 20));
      while (i < 16) add(subQ(29, i, 20));
      while (i < 24) add(storyAddQ(29, i, 20));
      while (i < 30) add(storySubQ(29, i, 20));
      while (i < 36) add(compareQ(29, i, 1, 20));
      while (i < 42) add(sequenceQ(29, i, 20));
      while (i < 46) add(evenOddQ(29, i, 20));
      while (i < 50) add(fillQ(29, i, 20, false));
      break;

    case 30: // Boss cuối: tổng hợp khó nhất
      while (i < 8)  add(addQ(30, i, 20));
      while (i < 16) add(subQ(30, i, 20));
      while (i < 22) add(add3Q(30, i, 15));
      while (i < 28) add(storyAddQ(30, i, 20));
      while (i < 34) add(storySubQ(30, i, 20));
      while (i < 40) add(fillQ(30, i, 20, false));
      while (i < 46) add(fillQ(30, i, 20, true));
      while (i < 50) add(compareQ(30, i, 1, 20));
      break;

    default:
      while (i < 50) add(addQ(levelNum, i, 10));
  }

  return qs;
}

// ─── MAIN ────────────────────────────────────────────────
console.log('Đang tạo câu hỏi...\n');

for (let lv = 1; lv <= 30; lv++) {
  const qs = generateLevel(lv);
  const outPath = path.join(OUT_DIR, `level_${lv}.json`);
  fs.writeFileSync(outPath, JSON.stringify(qs, null, 2), 'utf8');
  const types = {};
  qs.forEach(q => {
    const t = q.renderMode || 'single';
    types[t] = (types[t]||0) + 1;
  });
  console.log(`Level ${String(lv).padStart(2)} (${qs.length} câu): ${JSON.stringify(types)}`);
}

console.log('\n✅ Xong! Đã tạo 1500 câu hỏi cho 30 level.');
