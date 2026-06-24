const fs = require('fs');
const path = require('path');

const mdPath = path.join(require('os').homedir(), 'Downloads', '300_cau_hoi_toan_lop_1_dang_game_30_level.md');
const tsPath = path.join(__dirname, 'data', 'math', 'levels.ts');

if (!fs.existsSync(mdPath)) {
  console.error("File Markdown không tồn tại tại:", mdPath);
  process.exit(1);
}

const content = fs.readFileSync(mdPath, 'utf8');

const levelBlocks = content.split('## Level ').slice(1);

const levels = [];

for (const block of levelBlocks) {
  const lines = block.split('\n');
  const levelMatch = lines[0].match(/(\d+):\s*(.*)/);
  if (!levelMatch) continue;
  
  const levelNumber = parseInt(levelMatch[1]);
  const levelTitle = levelMatch[2].trim();
  
  let description = "";
  const descMatch = block.match(/\*\*Kỹ năng:\*\*\s*(.*)/);
  if (descMatch) description = descMatch[1].trim();
  
  const gameBlocks = block.split('### Game ').slice(1);
  const games = [];
  
  for (const gBlock of gameBlocks) {
    const gLines = gBlock.split('\n');
    const gTitleMatch = gLines[0].match(/(\d+):\s*(.*)/);
    if (!gTitleMatch) continue;
    
    const gameId = `g0${gTitleMatch[1]}`.slice(-3); // g01, g02, g03
    const gameName = gTitleMatch[2].trim();
    
    const typeMatch = gBlock.match(/-\s*\*\*Loại game:\*\*\s*`?([a-z_]+)`?/);
    const gameType = typeMatch ? typeMatch[1] : 'tap_choice';
    
    const interactionMatch = gBlock.match(/-\s*\*\*Tương tác:\*\*\s*`?([a-z_]+)`?/);
    const interaction = interactionMatch ? interactionMatch[1] : 'tap_answer';
    
    const questions = [];
    
    // Find table rows
    const tableRegex = /\|([^|]+)\|([^|]+)\|([^|]+)\|([^|]+)\|([^|]+)\|([^|]+)\|([^|]+)\|([^|]+)\|([^|]+)\|/g;
    let rowMatch;
    let isHeader = true;
    
    while ((rowMatch = tableRegex.exec(gBlock)) !== null) {
      const col1 = rowMatch[1].trim();
      if (col1 === 'Mã câu' || col1.includes('---')) continue;
      
      const id = col1;
      const promptTemplate = rowMatch[2].trim();
      const uiGraphics = rowMatch[6].trim();
      const animSound = rowMatch[7].trim().split(' / ');
      const animation = animSound[0] ? animSound[0].trim() : "";
      const sound = animSound[1] ? animSound[1].trim() : "";
      
      const hintStr = rowMatch[8].trim();
      const hints = hintStr.split('<br>').map(h => h.replace(/^\d+\.\s*/, '').trim()).filter(h => h);
      
      const answerLogic = rowMatch[9].trim();
      
      // Infer variables based on promptTemplate and Level
      const variables = {};
      let numRange = "1-10";
      if (levelNumber >= 11 && levelNumber <= 16) numRange = "11-20";
      else if (levelNumber >= 17) numRange = "10-99";
      
      if (promptTemplate.includes('{{count}}')) variables.count = numRange;
      if (promptTemplate.includes('{{number}}')) variables.number = numRange;
      if (promptTemplate.includes('{{a}}')) variables.a = numRange;
      if (promptTemplate.includes('{{b}}')) variables.b = numRange;
      if (promptTemplate.includes('{{c}}')) variables.c = numRange;
      if (promptTemplate.includes('{{object}}')) variables.object = ["quả táo", "quả bóng", "con mèo", "con thỏ", "viên kẹo", "ngôi sao"];
      if (promptTemplate.includes('{{shape}}')) variables.shape = ["hình vuông", "hình tròn", "hình tam giác"];
      
      questions.push({
        id,
        type: gameType,
        promptTemplate,
        variables,
        answerLogic,
        interaction,
        uiGraphics,
        animation,
        sound,
        hints
      });
    }
    
    games.push({
      id: gameId,
      name: gameName,
      type: gameType,
      questions
    });
  }
  
  levels.push({
    id: `math-l${levelNumber.toString().padStart(2, '0')}`,
    number: levelNumber,
    title: levelTitle,
    description: description,
    games
  });
}

const fileContent = `import { SubjectData } from "@/types/game";

export const mathData: SubjectData = {
  id: "math",
  name: "Toán Học",
  levels: ${JSON.stringify(levels, null, 2)}
};
`;

fs.writeFileSync(tsPath, fileContent, 'utf8');
console.log("Successfully parsed 300 questions and wrote to data/math/levels.ts!");
