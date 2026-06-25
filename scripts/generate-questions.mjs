/**
 * Sinh câu hỏi chuẩn cho 30 level theo chương trình Toán lớp 1 Việt Nam
 * Mỗi level: 50 câu, đúng chủ đề, đúng phạm vi số
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, '../public/data/math/questions');

// Chỉ dùng đồ vật / quả / đồ ăn — KHÔNG dùng động vật (mèo, cá, chim...) tránh nhầm icon
const COUNT_OBJ = [
  'quả táo','quả dâu','quả cam','quả chuối','viên kẹo',
  'bông hoa','quả bóng','ngôi sao','chiếc bánh'
];
const STORY_NAMES = ['An','Bình','Mai','Nam','Linh','Hoa','Minh','Lan'];
// Story things: chỉ dùng đồ vật rõ ràng, không dùng động vật
const STORY_THINGS = [
  'quả táo','viên kẹo','bông hoa','quả cam',
  'quả bóng','chiếc bánh','quả dâu','quả chuối'
];

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
  const sign = a > b ? '>' : '<';
  const prompts = [
    `Điền dấu đúng: ${a} __ ${b}`,
    `${a} ___ ${b}. Chọn dấu thích hợp:`,
    `So sánh: ${a} ☐ ${b}`,
    `${a} và ${b}, điền dấu so sánh:`,
  ];
  return {
    id: qId(levelNum, i), gameId: `level_${levelNum}`, type: `level_${levelNum}`,
    prompt: pick(prompts),
    correctAnswer: sign,
    options: ['>', '<', '='],
    objectIcon: '', objectIcon2: '',
    targetCount: 0, targetCount2: 0, renderMode: 'single', displayPrompt: null
  };
}

function compareEqQ(levelNum, i, min, max) {
  const a = rnd(min, max);
  const prompts = [
    `Điền dấu đúng: ${a} __ ${a}`,
    `${a} ___ ${a}. Chọn dấu thích hợp:`,
    `So sánh: ${a} ☐ ${a}`,
  ];
  return {
    id: qId(levelNum, i), gameId: `level_${levelNum}`, type: `level_${levelNum}`,
    prompt: pick(prompts),
    correctAnswer: '=',
    options: ['>', '<', '='],
    objectIcon: '', objectIcon2: '',
    targetCount: 0, targetCount2: 0, renderMode: 'single', displayPrompt: null
  };
}

function anyCompareQ(levelNum, i, min, max) {
  return Math.random() < 0.15 ? compareEqQ(levelNum, i, min, max) : compareQ(levelNum, i, min, max);
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
  if (obj.includes('táo') || obj.includes('cam') || obj.includes('chuối') || obj.includes('dâu')) return 'apple';
  if (obj.includes('sao') || obj.includes('ngôi')) return 'star';
  if (obj.includes('kẹo') || obj.includes('bánh')) return 'candy';
  if (obj.includes('bóng')) return 'ball';
  if (obj.includes('hoa') || obj.includes('quà')) return 'star';
  return 'apple';
}

// ─── BUILDERS NÂNG CAO ────────────────────────────────────

// Chục và đơn vị: "Số 23 gồm mấy chục và mấy đơn vị?"
function tensUnitsQ(levelNum, i) {
  const chuc = rnd(1, 9);
  const donVi = rnd(0, 9);
  const n = chuc * 10 + donVi;
  const prompts = [
    `Số ${n} gồm mấy chục?`,
    `Số ${n} có bao nhiêu chục?`,
    `${n} = ? chục + ${donVi} đơn vị`,
  ];
  const ws = wrongOptions(chuc, Math.max(1, chuc - 3), Math.min(9, chuc + 3), 3);
  return {
    id: qId(levelNum, i), gameId: `level_${levelNum}`, type: `level_${levelNum}`,
    prompt: pick(prompts), correctAnswer: chuc, options: buildOptions(chuc, ws),
    objectIcon: '/icons/star_icon.png', objectIcon2: '',
    targetCount: 0, targetCount2: 0, renderMode: 'single', displayPrompt: null
  };
}

// Cộng chục tròn: 20 + 30 = ?
function addRoundTenQ(levelNum, i) {
  const a = rnd(1, 8) * 10;
  const b = rnd(1, Math.floor((100 - a) / 10)) * 10;
  const ans = a + b;
  const ws = [ans - 10, ans + 10, ans - 20].filter(v => v > 0 && v <= 100 && v !== ans).slice(0, 3);
  while (ws.length < 3) ws.push(ans + (ws.length + 1) * 10);
  return {
    id: qId(levelNum, i), gameId: `level_${levelNum}`, type: `level_${levelNum}`,
    prompt: `${a} + ${b} = ?`, correctAnswer: ans, options: buildOptions(ans, ws.slice(0,3)),
    objectIcon: '/icons/star_icon.png', objectIcon2: '',
    targetCount: 0, targetCount2: 0, renderMode: 'single', displayPrompt: null
  };
}

// Trừ chục tròn: 70 - 30 = ?
function subRoundTenQ(levelNum, i) {
  const b = rnd(1, 8) * 10;
  const a = b + rnd(1, Math.floor((100 - b) / 10)) * 10;
  const ans = a - b;
  const ws = [ans - 10, ans + 10, ans + 20].filter(v => v >= 0 && v <= 100 && v !== ans).slice(0, 3);
  while (ws.length < 3) ws.push(ans + (ws.length + 1) * 10);
  return {
    id: qId(levelNum, i), gameId: `level_${levelNum}`, type: `level_${levelNum}`,
    prompt: `${a} - ${b} = ?`, correctAnswer: ans, options: buildOptions(ans, ws.slice(0,3)),
    objectIcon: '/icons/star_icon.png', objectIcon2: '',
    targetCount: 0, targetCount2: 0, renderMode: 'single', displayPrompt: null
  };
}

// Cộng 2 chữ số + 1 chữ số (không nhớ): 23 + 4 = ?
function addTwoOneQ(levelNum, i) {
  const a = rnd(10, 89);
  const maxB = 9 - (a % 10);
  if (maxB < 1) return addTwoOneQ(levelNum, i); // retry nếu không hợp lệ
  const b = rnd(1, maxB);
  const ans = a + b;
  const ws = wrongOptions(ans, ans - 5, ans + 5, 3);
  return {
    id: qId(levelNum, i), gameId: `level_${levelNum}`, type: `level_${levelNum}`,
    prompt: `${a} + ${b} = ?`, correctAnswer: ans, options: buildOptions(ans, ws),
    objectIcon: '/icons/apple_icon.png', objectIcon2: '',
    targetCount: 0, targetCount2: 0, renderMode: 'single', displayPrompt: null
  };
}

// Trừ 2 chữ số - 1 chữ số (không mượn): 27 - 4 = ?
function subTwoOneQ(levelNum, i) {
  const b = rnd(1, 9);
  const units = rnd(b, 9);
  const tens = rnd(1, 9);
  const a = tens * 10 + units;
  const ans = a - b;
  const ws = wrongOptions(ans, ans - 5, ans + 5, 3);
  return {
    id: qId(levelNum, i), gameId: `level_${levelNum}`, type: `level_${levelNum}`,
    prompt: `${a} - ${b} = ?`, correctAnswer: ans, options: buildOptions(ans, ws),
    objectIcon: '/icons/apple_icon.png', objectIcon2: '',
    targetCount: 0, targetCount2: 0, renderMode: 'single', displayPrompt: null
  };
}

// Cộng/trừ 2 chữ số không nhớ
function addTwoTwoQ(levelNum, i) {
  const a1 = rnd(1, 5); const a2 = rnd(0, 4);
  const b1 = rnd(1, 9 - a1); const b2 = rnd(0, 9 - a2);
  const a = a1 * 10 + a2; const b = b1 * 10 + b2;
  const ans = a + b;
  const ws = wrongOptions(ans, ans - 10, ans + 10, 3);
  return {
    id: qId(levelNum, i), gameId: `level_${levelNum}`, type: `level_${levelNum}`,
    prompt: `${a} + ${b} = ?`, correctAnswer: ans, options: buildOptions(ans, ws),
    objectIcon: '/icons/star_icon.png', objectIcon2: '',
    targetCount: 0, targetCount2: 0, renderMode: 'single', displayPrompt: null
  };
}

// Thời gian: "Kim dài chỉ 12, kim ngắn chỉ 3. Mấy giờ?"
function timeQ(levelNum, i) {
  const h = rnd(1, 12);
  const prompt = `Đồng hồ chỉ ${h} giờ đúng. Bé chọn đáp án đúng:`;
  const ws = wrongOptions(h, 1, 12, 3).map(v => `${v} giờ`);
  return {
    id: qId(levelNum, i), gameId: `level_${levelNum}`, type: `level_${levelNum}`,
    prompt, correctAnswer: `${h} giờ`, options: buildOptions(`${h} giờ`, ws),
    objectIcon: '/icons/star_icon.png', objectIcon2: '',
    targetCount: 0, targetCount2: 0, renderMode: 'single', displayPrompt: null
  };
}

// Hình học: nhận biết hình
function shapeQ(levelNum, i) {
  const shapes = [
    { name: 'hình tròn', sides: 0 },
    { name: 'hình vuông', sides: 4 },
    { name: 'hình tam giác', sides: 3 },
    { name: 'hình chữ nhật', sides: 4 },
  ];
  const s = pick(shapes);
  const prompts = [
    `${s.name.charAt(0).toUpperCase() + s.name.slice(1)} có mấy cạnh?`,
    `Hình nào có ${s.sides === 3 ? '3' : s.sides === 4 ? '4' : '0'} cạnh?`,
    `Chọn đúng: ${s.name} có bao nhiêu góc?`,
  ];
  const allShapeNames = shapes.map(x => x.name);
  // For "mấy cạnh" → answer is number; for "hình nào" → answer is name
  const isNameQ = Math.random() < 0.4;
  if (isNameQ && s.sides > 0) {
    const sameAngle = shapes.filter(x => x.sides === s.sides);
    const ans = sameAngle[0].name;
    const ws = shapes.filter(x => x.name !== ans).map(x => x.name).slice(0, 3);
    return {
      id: qId(levelNum, i), gameId: `level_${levelNum}`, type: `level_${levelNum}`,
      prompt: `Hình nào có ${s.sides} cạnh?`,
      correctAnswer: s.name, options: buildOptions(s.name, ws),
      objectIcon: '/icons/star_icon.png', objectIcon2: '',
      targetCount: 0, targetCount2: 0, renderMode: 'single', displayPrompt: null
    };
  }
  const ans = s.sides;
  const ws = [0,3,4].filter(v => v !== ans).slice(0,3);
  return {
    id: qId(levelNum, i), gameId: `level_${levelNum}`, type: `level_${levelNum}`,
    prompt: `${s.name.charAt(0).toUpperCase() + s.name.slice(1)} có mấy cạnh?`,
    correctAnswer: ans, options: buildOptions(ans, ws),
    objectIcon: '/icons/star_icon.png', objectIcon2: '',
    targetCount: 0, targetCount2: 0, renderMode: 'single', displayPrompt: null
  };
}

// Tiền (đơn giản): "Mua 1 cái kẹo 3 đồng, 1 quả táo 5 đồng. Tất cả bao nhiêu?"
function moneyQ(levelNum, i) {
  const items = [
    {name: 'viên kẹo', price: rnd(1,5)},
    {name: 'quả táo', price: rnd(2,8)},
    {name: 'chiếc bánh', price: rnd(3,9)},
    {name: 'bông hoa', price: rnd(1,6)},
  ];
  const a = pick(items);
  const b = pick(items.filter(x => x.name !== a.name));
  const ans = a.price + b.price;
  const ws = wrongOptions(ans, 1, 20, 3);
  return {
    id: qId(levelNum, i), gameId: `level_${levelNum}`, type: `level_${levelNum}`,
    prompt: `Mua 1 ${a.name} giá ${a.price} nghìn và 1 ${b.name} giá ${b.price} nghìn. Tất cả bao nhiêu nghìn?`,
    correctAnswer: ans, options: buildOptions(ans, ws),
    objectIcon: '/icons/coin_icon.png', objectIcon2: '',
    targetCount: 0, targetCount2: 0, renderMode: 'single', displayPrompt: null
  };
}

// ─── LEVEL DEFINITIONS — theo đúng thứ tự MD ──────────────
// L01: Nhận biết số 0-10
// L02: Đếm đồ vật 1-10
// L03: So sánh số trong phạm vi 10 (>, <, =)
// L04: Thứ tự số từ 1-20 (dãy số)
// L05: Cộng trong phạm vi 5
// L06: Trừ trong phạm vi 5
// L07: Cộng trong phạm vi 10
// L08: Trừ trong phạm vi 10
// L09: Cộng trừ hỗn hợp phạm vi 10
// L10: Toán có lời văn phạm vi 10
// L11: Nhận biết số 11-20
// L12: So sánh số 11-20
// L13: Cộng trong phạm vi 20
// L14: Trừ trong phạm vi 20
// L15: Tìm số còn thiếu (điền chỗ trống)
// L16: Chục và đơn vị
// L17: Nhận biết số đến 100
// L18: So sánh số đến 100
// L19: Cộng các chục tròn
// L20: Trừ các chục tròn
// L21: Cộng số hai chữ số + một chữ số
// L22: Trừ số hai chữ số - một chữ số
// L23: Cộng trừ hai chữ số không nhớ
// L24: Toán có lời văn đến 20
// L25: Đo độ dài (so sánh cm)
// L26: Thời gian (nhận biết giờ)
// L27: Hình học cơ bản
// L28: Quy luật dãy số và hình
// L29: Tiền và đồ vật
// L30: Tổng hợp thử thách lớp 1

function generateLevel(levelNum) {
  const qs = [];
  let i = 0;

  const add = (q) => { qs.push(q); i++; };

  switch (levelNum) {
    case 1: // Nhận biết số 0-10
      while (i < 30) add(recognizeQ(1, i, 0, 10));
      while (i < 50) add(countQ(1, i, 1, 10));
      break;

    case 2: // Đếm đồ vật 1-10
      while (i < 40) add(countQ(2, i, 1, 10));
      while (i < 50) add(recognizeQ(2, i, 1, 10));
      break;

    case 3: // So sánh số trong phạm vi 10 (>, <, =)
      while (i < 50) add(anyCompareQ(3, i, 0, 10));
      break;

    case 4: // Thứ tự số từ 1-20 (dãy số, số liền trước/sau)
      while (i < 35) add(sequenceQ(4, i, 20));
      while (i < 50) add(recognizeQ(4, i, 1, 20));
      break;

    case 5: // Cộng trong phạm vi 5
      while (i < 30) add(addQ(5, i, 5, 1));
      while (i < 45) add(countQ(5, i, 1, 5));
      while (i < 50) add(fillQ(5, i, 5, false));
      break;

    case 6: // Trừ trong phạm vi 5
      while (i < 30) add(subQ(6, i, 5));
      while (i < 45) add(countQ(6, i, 1, 5));
      while (i < 50) add(fillQ(6, i, 5, true));
      break;

    case 7: // Cộng trong phạm vi 10
      while (i < 35) add(addQ(7, i, 10));
      while (i < 45) add(storyAddQ(7, i, 10));
      while (i < 50) add(fillQ(7, i, 10, false));
      break;

    case 8: // Trừ trong phạm vi 10
      while (i < 35) add(subQ(8, i, 10));
      while (i < 45) add(storySubQ(8, i, 10));
      while (i < 50) add(fillQ(8, i, 10, true));
      break;

    case 9: // Cộng trừ hỗn hợp phạm vi 10
      while (i < 20) add(addQ(9, i, 10));
      while (i < 40) add(subQ(9, i, 10));
      while (i < 50) add(anyCompareQ(9, i, 1, 10));
      break;

    case 10: // Toán có lời văn phạm vi 10
      while (i < 25) add(storyAddQ(10, i, 10));
      while (i < 50) add(storySubQ(10, i, 10));
      break;

    case 11: // Nhận biết số 11-20
      while (i < 30) add(recognizeQ(11, i, 11, 20));
      while (i < 50) add(countQ(11, i, 11, 20));
      break;

    case 12: // So sánh số 11-20
      while (i < 50) add(anyCompareQ(12, i, 10, 20));
      break;

    case 13: // Cộng trong phạm vi 20 không nhớ
      while (i < 35) add(addQ(13, i, 20));
      while (i < 45) add(storyAddQ(13, i, 20));
      while (i < 50) add(fillQ(13, i, 20, false));
      break;

    case 14: // Trừ trong phạm vi 20 không mượn
      while (i < 35) add(subQ(14, i, 20));
      while (i < 45) add(storySubQ(14, i, 20));
      while (i < 50) add(fillQ(14, i, 20, true));
      break;

    case 15: // Tìm số còn thiếu (điền chỗ trống)
      while (i < 25) add(fillQ(15, i, 10, false));
      while (i < 50) add(fillQ(15, i, 10, true));
      break;

    case 16: // Chục và đơn vị
      while (i < 35) add(tensUnitsQ(16, i));
      while (i < 50) add(anyCompareQ(16, i, 10, 99));
      break;

    case 17: // Nhận biết số đến 100
      while (i < 35) add(recognizeQ(17, i, 20, 100));
      while (i < 50) add(sequenceQ(17, i, 100));
      break;

    case 18: // So sánh số đến 100
      while (i < 50) add(anyCompareQ(18, i, 10, 100));
      break;

    case 19: // Cộng các chục tròn
      while (i < 40) add(addRoundTenQ(19, i));
      while (i < 50) add(addQ(19, i, 20));
      break;

    case 20: // Trừ các chục tròn
      while (i < 40) add(subRoundTenQ(20, i));
      while (i < 50) add(subQ(20, i, 20));
      break;

    case 21: // Cộng số hai chữ số + một chữ số (không nhớ)
      while (i < 40) add(addTwoOneQ(21, i));
      while (i < 50) add(addQ(21, i, 20));
      break;

    case 22: // Trừ số hai chữ số - một chữ số (không mượn)
      while (i < 40) add(subTwoOneQ(22, i));
      while (i < 50) add(subQ(22, i, 20));
      break;

    case 23: // Cộng trừ hai chữ số không nhớ/mượn
      while (i < 25) add(addTwoTwoQ(23, i));
      while (i < 45) add(subTwoOneQ(23, i));
      while (i < 50) add(anyCompareQ(23, i, 10, 99));
      break;

    case 24: // Toán có lời văn đến 20
      while (i < 25) add(storyAddQ(24, i, 20));
      while (i < 50) add(storySubQ(24, i, 20));
      break;

    case 25: // Đo độ dài đơn giản (so sánh cm)
      while (i < 30) add(anyCompareQ(25, i, 1, 30));
      while (i < 45) add(addQ(25, i, 20));
      while (i < 50) add(subQ(25, i, 20));
      break;

    case 26: // Thời gian đơn giản (giờ đúng)
      while (i < 35) add(timeQ(26, i));
      while (i < 50) add(anyCompareQ(26, i, 1, 12));
      break;

    case 27: // Hình học cơ bản
      while (i < 35) add(shapeQ(27, i));
      while (i < 50) add(recognizeQ(27, i, 1, 20));
      break;

    case 28: // Quy luật dãy số và hình
      while (i < 35) add(sequenceQ(28, i, 20));
      while (i < 45) add(evenOddQ(28, i, 20));
      while (i < 50) add(fillQ(28, i, 20, false));
      break;

    case 29: // Tiền và đồ vật
      while (i < 35) add(moneyQ(29, i));
      while (i < 50) add(storyAddQ(29, i, 20));
      break;

    case 30: // Tổng hợp thử thách lớp 1
      while (i < 8)  add(addQ(30, i, 20));
      while (i < 16) add(subQ(30, i, 20));
      while (i < 22) add(anyCompareQ(30, i, 1, 20));
      while (i < 28) add(storyAddQ(30, i, 20));
      while (i < 34) add(storySubQ(30, i, 20));
      while (i < 40) add(fillQ(30, i, 20, false));
      while (i < 45) add(sequenceQ(30, i, 20));
      while (i < 50) add(moneyQ(30, i));
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
