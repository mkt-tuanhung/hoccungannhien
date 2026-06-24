import { QuestionTemplate } from "@/types/game";

interface GameLogicResult {
  prompt: string;
  correctAnswer: any;
  options: any[];
  objectIcon: string;
  targetCount: number;
}

const generateQuestionData = (question: QuestionTemplate, numOptions: number = 4): GameLogicResult => {
  // 1. Khởi tạo biến
  const vars: Record<string, any> = {};
  
  const objArray = Array.isArray(question.variables?.object) 
    ? question.variables.object 
    : ["viên kim cương", "quả táo", "con mèo", "con thỏ", "quả bóng"];
  vars.object = objArray[Math.floor(Math.random() * objArray.length)];

  const parseRange = (rangeStr: string) => {
    if (!rangeStr) return Math.floor(Math.random() * 5) + 1;
    if (typeof rangeStr !== "string") return rangeStr;
    const parts = rangeStr.split("-");
    const min = parseInt(parts[0]) || 1;
    const max = parseInt(parts[1] || parts[0]) || 10;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Nạp các biến có sẵn từ JSON
  if (question.variables) {
    for (const [key, val] of Object.entries(question.variables)) {
      if (key !== "object") vars[key] = parseRange(val as string);
    }
  }

  const pTmpl = question.promptTemplate || "";
  const aLogic = question.answerLogic || "";

  // 2. Tự động nhận diện và gán các biến bị thiếu trong promptTemplate
  const matches = pTmpl.match(/{{(.*?)}}/g);
  if (matches) {
    matches.forEach(m => {
      const vName = m.replace(/[{}]/g, '');
      if (vars[vName] === undefined) {
        if (vName === 'op') vars[vName] = Math.random() > 0.5 ? '+' : '-';
        else if (vName === 'shape') vars[vName] = ['Hình tròn', 'Hình vuông', 'Hình tam giác'][Math.floor(Math.random()*3)];
        else if (vName === 'object') {} // đã gán
        else if (vName === 'story') vars[vName] = "Có " + (vars.a || 5) + " con chim, bay đi " + (vars.b || 2) + " con.";
        else vars[vName] = parseRange("1-10");
      }
    });
  }

  // Fallback targetCount cho DragDrop / RescuePet (Số đồ vật thực tế rơi vào UI)
  let targetCount = vars.count || vars.number || vars.a + vars.b || vars.a || 5;
  if (targetCount > 20) targetCount = 0; // Tránh render 100+ icon gây kín màn hình

  // 3. Tính toán các biến mở rộng (a_plus_1, a_minus_1...)
  if (vars.a !== undefined) {
    vars.a_plus_1 = vars.a + 1;
    vars.a_plus_2 = vars.a + 2;
    vars.a_plus_3 = vars.a + 3;
    vars.a_minus_1 = Math.max(0, vars.a - 1);
    vars.a_minus_2 = Math.max(0, vars.a - 2);
  }

  // 4. Thay thế các biến vào Prompt
  let prompt = pTmpl;
  const keys = Object.keys(vars).sort((k1, k2) => k2.length - k1.length);
  for (const key of keys) {
    const regex = new RegExp(`{{${key}}}`, 'g');
    prompt = prompt.replace(regex, vars[key].toString());
  }

  // 5. Tính toán Answer Logic (Dịch từ Pseudo-code sang JS thực)
  let correctAnswer: any = 0;
  if (aLogic) {
    try {
      let logicString = aLogic.replace("correct_answer =", "return").trim();
      if (!logicString.includes("return")) logicString = "return " + logicString;
      
      logicString = logicString.replace(/max/g, "Math.max");
      logicString = logicString.replace(/min/g, "Math.min");
      logicString = logicString.replace(/floor/g, "Math.floor");

      if (logicString.includes("compare(")) logicString = "return a > b ? '>' : (a < b ? '<' : '=');";
      else if (logicString.includes("sorted(")) logicString = "return 'Dãy số';";
      else if (logicString.includes("correct_operation = '+'")) logicString = "return '+';";
      else if (logicString.includes("correct_operation = '-'")) logicString = "return '-';";
      else if (logicString.includes("A if a>b")) logicString = "return a > b ? a : (b > a ? b : 'bằng nhau');";
      else if (logicString.includes("wrap 12")) logicString = "return ((hour + add) % 12 || 12) + ' giờ';";
      else if (logicString.includes("shape_by_sides")) logicString = "return 'Hình tam giác';";
      else if (logicString.includes("object matches shape")) logicString = "return object;";
      else if (logicString.includes("next_item_in_pattern")) logicString = "return 'Hình tiếp theo';";
      else if (logicString.includes("calculate(")) logicString = "return op === '+' ? a + b : Math.abs(a - b);";
      else if (logicString.includes("derived_from_story")) logicString = "return Math.abs((vars.a||5) - (vars.b||2));";
      
      const paramNames = Object.keys(vars);
      const paramValues = Object.values(vars);
      const evaluator = new Function("vars", ...paramNames, logicString);
      correctAnswer = evaluator(vars, ...paramValues);
    } catch (e) {
      console.error("Lỗi tính toán logic:", e);
      correctAnswer = targetCount; // Fallback
    }
  } else {
    correctAnswer = targetCount;
  }

  // 6. Sinh đáp án nhiễu (Options)
  const opts = new Set<any>([correctAnswer]);
  let attempts = 0;
  
  if (typeof correctAnswer === 'number') {
    while(opts.size < numOptions && attempts < 100) {
      const diff = Math.floor(Math.random() * 5) + 1;
      const isAdd = Math.random() > 0.5;
      let wrongAns = isAdd ? correctAnswer + diff : correctAnswer - diff;
      if (wrongAns < 0) wrongAns = correctAnswer + diff + 1;
      opts.add(wrongAns);
      attempts++;
    }
  } else if (typeof correctAnswer === 'string') {
    if (correctAnswer === '>' || correctAnswer === '<' || correctAnswer === '=') {
      opts.add('>'); opts.add('<'); opts.add('=');
    } else if (correctAnswer === '+' || correctAnswer === '-') {
      opts.add('+'); opts.add('-');
    } else if (correctAnswer.includes('giờ')) {
      const h = parseInt(correctAnswer) || 1;
      opts.add((h % 12 || 12) + ' giờ');
      opts.add(((h + 1) % 12 || 12) + ' giờ');
      opts.add(((h + 2) % 12 || 12) + ' giờ');
      opts.add(((h + 3) % 12 || 12) + ' giờ');
    } else if (correctAnswer.includes('chục')) {
      opts.add(correctAnswer);
      opts.add('2 chục và 3 đơn vị');
      opts.add('4 chục và 1 đơn vị');
      opts.add('5 chục và 0 đơn vị');
    } else if (correctAnswer === 'bằng nhau' || typeof correctAnswer === 'number') {
      opts.add('bằng nhau'); opts.add(vars.a || 5); opts.add(vars.b || 6); opts.add((vars.a || 5) + 1);
    } else {
      opts.add(correctAnswer);
      opts.add("Hình tròn");
      opts.add("Hình vuông");
      opts.add("Hình tam giác");
    }
  }

  const iconMap: Record<string, string> = {
    "viên kim cương": "/icons/diamond_icon.png",
    "đồng tiền vàng": "/icons/coin_icon.png",
    "quả táo": "/icons/apple_icon.png",
    "con mèo": "/icons/cat_icon.png",
    "con thỏ": "/icons/bunny_icon.png",
    "quả bóng": "/icons/ball_icon.png",
    "ngôi sao": "/icons/star_icon.png",
    "viên kẹo": "/icons/candy_icon.png"
  };

  const objectIcon = iconMap[vars.object] || "/icons/apple_icon.png";

  return {
    prompt,
    correctAnswer,
    options: Array.from(opts).sort(() => Math.random() - 0.5).slice(0, numOptions),
    objectIcon,
    targetCount
  };
};

const q1 = {
  promptTemplate: 'Số nào lớn hơn: {{a}} hay {{b}}?',
  variables: { a: '1-10', b: '1-10' },
  answerLogic: 'correct_answer = compare(a,b)'
};
const q2 = {
  promptTemplate: 'Bây giờ là mấy giờ? (kim chỉ {{hour}})',
  answerLogic: 'correct_answer = hour + ' giờ''
};
console.log('Q1:', generateQuestionData(q1));
console.log('Q2:', generateQuestionData(q2));
