import { assetUrl } from "@/lib/assets";
import { QuestionTemplate } from "@/types/game";

export interface GameLogicResult {
  prompt: string;
  correctAnswer: any;
  options: any[];
  objectIcon: string;
  objectIcon2?: string;
  targetCount: number;
  targetCount2?: number;
  renderMode?: "single" | "compare" | "addition" | "subtraction";
}

// Map từ keyword trong prompt → icon path mới (public/icons/)
const PROMPT_ICON_MAP: [string, string][] = [
  ['kim cương',   '/icons/diamond_icon.png'],
  ['đồng tiền',   '/icons/coin_icon.png'],
  ['tiền vàng',   '/icons/coin_icon.png'],
  ['xu vàng',     '/icons/coin_icon.png'],
  ['táo',         '/icons/apple_icon.png'],
  ['con mèo',     '/icons/cat_icon.png'],
  ['mèo',         '/icons/cat_icon.png'],
  ['con thỏ',     '/icons/bunny_icon.png'],
  ['thỏ',         '/icons/bunny_icon.png'],
  ['quả bóng',    '/icons/ball_icon.png'],
  ['bóng',        '/icons/ball_icon.png'],
  ['ngôi sao',    '/icons/star_icon.png'],
  ['viên kẹo',    '/icons/candy_icon.png'],
  ['kẹo',         '/icons/candy_icon.png'],
  ['bong bóng',   '/icons/bubble_icon.png'],
  ['bong',        '/icons/bubble_icon.png'],
  ['rương',       '/icons/chest_icon.png'],
  ['hòm',         '/icons/chest_icon.png'],
  ['súng',        '/icons/boss_monster_icon.png'],
  ['quái vật',    '/icons/boss_monster_icon.png'],
  ['sao',         '/icons/star_icon.png'],
  // fallback các icon cũ vẫn còn trong sprites/
  ['hoa',         '/sprites/flower.png'],
  ['cá',          '/sprites/fish.png'],
  ['ếch',         '/sprites/frog.png'],
  ['cà rốt',      '/sprites/carrot.png'],
  ['nấm',         '/sprites/mushroom.png'],
  ['bánh',        '/sprites/cupcake.png'],
  ['dâu',         '/sprites/strawberry.png'],
  ['bướm',        '/sprites/butterfly.png'],
];

// Thức ăn hợp lệ cho các mode "cho ăn / nấu ăn" — chỉ dùng đồ ăn thật, không phải động vật hay vật vô lý
const FOOD_ICON = assetUrl('/icons/apple_icon.png');
const VALID_FOOD_ICONS = [
  assetUrl('/icons/apple_icon.png'),
  assetUrl('/icons/candy_icon.png'),
  assetUrl('/sprites/carrot.png'),
  assetUrl('/sprites/strawberry.png'),
  assetUrl('/sprites/cupcake.png'),
];
const FEEDING_KEYWORDS = ['cho ăn', 'ăn táo', 'ăn cà rốt', 'ăn kẹo', 'ăn bánh', 'nấu', 'bỏ vào nồi'];
const INEDIBLE_ICONS = [
  assetUrl('/icons/diamond_icon.png'),
  assetUrl('/icons/star_icon.png'),
  assetUrl('/icons/coin_icon.png'),
  assetUrl('/icons/bunny_icon.png'),
  assetUrl('/icons/cat_icon.png'),
  assetUrl('/icons/bubble_icon.png'),
  assetUrl('/icons/ball_icon.png'),
];

// Derive icon từ nội dung prompt — tránh mismatch dữ liệu JSON cũ
function deriveIcon(prompt: string, storedIcon?: string, questionType?: string): string {
  const p = prompt.toLowerCase();

  // Các mode "cho ăn / nấu ăn": chỉ dùng thức ăn hợp lệ
  const isFeedingMode = questionType === 'gen_dragon_farm_math' || questionType === 'math_cooking_lab'
    || FEEDING_KEYWORDS.some(k => p.includes(k));

  if (isFeedingMode) {
    // Tìm thức ăn cụ thể trong prompt
    if (p.includes('táo'))      return assetUrl('/icons/apple_icon.png');
    if (p.includes('cà rốt'))   return assetUrl('/sprites/carrot.png');
    if (p.includes('kẹo'))      return assetUrl('/icons/candy_icon.png');
    if (p.includes('bánh'))     return assetUrl('/sprites/cupcake.png');
    if (p.includes('dâu'))      return assetUrl('/sprites/strawberry.png');
    // Fallback feeding: táo (không bao giờ là động vật hay kim cương)
    return FOOD_ICON;
  }

  for (const [keyword, path] of PROMPT_ICON_MAP) {
    if (p.includes(keyword)) return assetUrl(path);
  }

  // Fallback: dùng icon đã lưu trong JSON (nhưng thêm R2 prefix)
  // Nếu icon lưu là đồ vô lý cho context feeding → dùng táo
  if (storedIcon && storedIcon.startsWith('/')) {
    const resolved = assetUrl(storedIcon);
    if (isFeedingMode && INEDIBLE_ICONS.includes(resolved)) return FOOD_ICON;
    return resolved;
  }
  if (storedIcon) return storedIcon;
  return assetUrl('/icons/apple_icon.png');
}

export const generateQuestionData = (question: QuestionTemplate, numOptions: number = 4): GameLogicResult => {
  if ('prompt' in question && !('promptTemplate' in question)) {
    const q = question as any;
    return {
      prompt: q.prompt,
      correctAnswer: q.correctAnswer,
      options: q.options || [],
      objectIcon: deriveIcon(q.prompt, q.objectIcon, q.type),
      objectIcon2: q.objectIcon2 ? assetUrl(q.objectIcon2) : "",
      targetCount: q.targetCount || 0,
      targetCount2: q.targetCount2 || 0,
      renderMode: q.renderMode
    };
  }

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
        else if (vName === 'name') {
          const names = ["Bạn An", "Bạn Bình", "Bạn Lan", "Bạn Mai", "Bạn Tuấn", "Bạn Minh"];
          vars[vName] = names[Math.floor(Math.random() * names.length)];
        }
        else vars[vName] = parseRange("1-10");
      }
    });
  }

  const pLower = pTmpl.toLowerCase();

  // Đảm bảo tính hợp lý của biến a và b
  if (vars.a !== undefined && vars.b !== undefined) {
    // Phép trừ: a phải lớn hơn hoặc bằng b
    if (pLower.includes("-") || pLower.includes("bớt") || pLower.includes("cắt") || pLower.includes("lấy đi") || pLower.includes("mất") || pLower.includes("bay") || pLower.includes("còn lại")) {
      if (vars.a < vars.b) {
        const temp = vars.a;
        vars.a = vars.b;
        vars.b = temp;
      }
    }
    // So sánh: a và b không được phép bằng nhau
    if (pLower.includes("lớn hơn") || pLower.includes("bé hơn") || pLower.includes("so sánh")) {
      if (vars.a === vars.b) {
        vars.b = vars.a === 10 ? 9 : vars.a + 1;
      }
    }
  }

  const iconMap: Record<string, string> = {
    "viên kim cương": assetUrl('/sprites/diamond.png'),
    "đồng tiền vàng": assetUrl('/sprites/coin.png'),
    "quả táo": assetUrl('/sprites/apple.png'),
    "con mèo": assetUrl('/sprites/cat.png'),
    "con thỏ": assetUrl('/sprites/rabbit.png'),
    "quả bóng": assetUrl('/sprites/ball.png'),
    "ngôi sao": assetUrl('/sprites/star.png'),
    "viên kẹo": assetUrl('/sprites/candy.png')
  };

  const objectIcon = iconMap[vars.object] || assetUrl('/sprites/apple.png');

  let renderMode: "single" | "compare" | "addition" | "subtraction" | "none" = "single";
  let targetCount = vars.count || vars.number || vars.a || 5;
  let targetCount2 = 0;
  let objectIcon2 = "";
  
  if (pLower.includes("lớn hơn") || pLower.includes("bé hơn") || pLower.includes("bằng nhau") || pLower.includes("kéo dấu")) {
    renderMode = "compare";
    targetCount = vars.a || 0;
    targetCount2 = vars.b || 0;
    
    // Pick a different icon for the second group
    const iconKeys = Object.keys(iconMap);
    let randomKey = iconKeys[Math.floor(Math.random() * iconKeys.length)];
    while (iconMap[randomKey] === objectIcon) {
        randomKey = iconKeys[Math.floor(Math.random() * iconKeys.length)];
    }
    objectIcon2 = iconMap[randomKey];
  } else if (pLower.includes("+") || pLower.includes("gộp") || pLower.includes("thêm")) {
    renderMode = "addition";
    targetCount = vars.a || 0;
    targetCount2 = vars.b || 0;
    // Pick a different icon
    const iconKeys = Object.keys(iconMap);
    let randomKey = iconKeys[Math.floor(Math.random() * iconKeys.length)];
    while (iconMap[randomKey] === objectIcon) {
        randomKey = iconKeys[Math.floor(Math.random() * iconKeys.length)];
    }
    objectIcon2 = iconMap[randomKey];
  } else if (pLower.includes("-") || pLower.includes("bớt") || pLower.includes("cắt") || pLower.includes("còn lại")) {
    renderMode = "subtraction";
    targetCount = vars.a || 0; // Total initial items
    targetCount2 = vars.b || 0; // Items to be crossed out
  } else if (pLower.includes("còn thiếu") || pLower.includes("dãy số") || pLower.includes("thứ tự") || pLower.includes("liền trước") || pLower.includes("liền sau")) {
    renderMode = "none";
    targetCount = 0;
  } else {
    // Normal single count
    targetCount = vars.count || vars.number || (vars.a ? vars.a + (vars.b||0) : 5);
  }

  if (targetCount > 20) targetCount = 0; // Tránh render quá nhiều
  if (targetCount2 > 20) targetCount2 = 0;

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
      else if (logicString.includes("count_items_dragged")) logicString = "return count;";
      
      // Đảm bảo tất cả các biến được nhắc đến trong logicString đều tồn tại trong vars
      // để tránh lỗi ReferenceError: count is not defined
      const logicVars = logicString.match(/[a-zA-Z_]\w*/g) || [];
      for (const v of logicVars) {
        if (!["return", "Math", "max", "min", "floor", "abs", "vars", "op", "object", "a", "b", "hour", "add"].includes(v)) {
           if (vars[v] === undefined) vars[v] = targetCount;
        }
      }

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

  // 7. Đồng bộ hóa logic Câu hỏi với Giao diện (Game Type)
  // Xử lý triệt để việc GPT sinh câu hỏi "Chạm" nhưng UI lại là "Kéo Thả"
  if (question.type === "drag_drop" || aLogic.includes("count_items_dragged")) {
    const isPureIdentify = prompt.toLowerCase().includes("đọc số") || prompt.toLowerCase().includes("chạm vào thẻ") || prompt.toLowerCase().includes("chọn số đúng");
    if (isPureIdentify) {
      prompt = `Con hãy kéo thả ${correctAnswer} ${vars.object || "đồ vật"} vào rương nhé!`;
    } else {
      prompt = prompt.replace("Để cứu thú cưng: ", "").replace("Đánh bại Quái Vật: ", "");
      if (!prompt.includes("kéo thả") && !prompt.includes("rương")) {
        prompt = prompt + ` (Con kéo thả ${correctAnswer} ${vars.object || "đồ vật"} vào rương nhé!)`;
      }
    }
  } else if (question.type === "rescue_pet") {
    if (!prompt.toLowerCase().includes("cứu")) prompt = `Để cứu thú cưng: ${prompt}`;
  } else if (question.type === "bubble_pop") {
    prompt = prompt.replace(/chạm vào thẻ số/gi, "chọc thủng bóng chứa số").replace(/chọn số/gi, "chọc bóng chứa số");
    if (!prompt.toLowerCase().includes("chọc")) prompt = `Chọc bóng chứa đáp án: ${prompt}`;
  } else if (question.type === "mini_boss") {
    if (!prompt.toLowerCase().includes("đánh bại") && !prompt.toLowerCase().includes("quái vật")) {
      prompt = `Đánh bại Quái Vật: ${prompt}`;
    }
  }

  return {
    prompt,
    correctAnswer,
    options: Array.from(opts).sort(() => Math.random() - 0.5).slice(0, numOptions),
    objectIcon,
    objectIcon2,
    targetCount,
    targetCount2,
    renderMode: renderMode === "none" ? undefined : renderMode
  };
};
