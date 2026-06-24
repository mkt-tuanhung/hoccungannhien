import fs from 'fs';
import path from 'path';
import { mathData } from './data/math/levels';
import { generateQuestionData } from './lib/gameLogic';
import { QuestionTemplate } from './types/game';

async function generateJSONs() {
  const questionsDir = path.join(process.cwd(), 'public', 'data', 'math', 'questions');
  if (!fs.existsSync(questionsDir)) {
    fs.mkdirSync(questionsDir, { recursive: true });
  }

  const mdPath = '/Users/mac/Downloads/300_cau_hoi_toan_lop_1_dang_game_30_level.md';
  let mdContent = fs.readFileSync(mdPath, 'utf8');

  const levelTemplates: Record<number, QuestionTemplate[]> = {};
  const regex = /\|\s*(MATH-G1-L(\d+)-G\d+-Q\d+)\s*\|\s*([^|]+)\s*\|\s*([^|]+)\s*\|\s*([^|]+)\s*\|\s*([^|]+)\s*\|\s*([^|]+)\s*\|\s*([^|]+)\s*\|\s*([^|]+)\s*\|\s*([^|]+)\s*\|/g;
  let match;
  
  while ((match = regex.exec(mdContent)) !== null) {
    const levelNum = parseInt(match[2], 10);
    if (!levelTemplates[levelNum]) levelTemplates[levelNum] = [];
    
    const hintsStr = match[8].trim();
    const hints = hintsStr.split(/<br>|\n/).map(h => h.replace(/^\d+\.\s*/, '').trim()).filter(h => h);

    levelTemplates[levelNum].push({
      id: match[1].trim(),
      type: 'gen_living_math_garden', 
      promptTemplate: match[3].trim(),
      answerLogic: match[9].trim(),
      interaction: 'tap_answer',
      uiGraphics: match[6].trim(),
      hints: hints,
      variables: {
          "object": ["viên kim cương", "quả táo", "con mèo", "con thỏ", "quả bóng", "ngôi sao"]
      },
      animation: "",
      sound: ""
    });
  }

  let totalGenerated = 0;

  for (const level of mathData.levels) {
    const templates = levelTemplates[level.number] || [];
    if (templates.length === 0) continue;

    const fixedQuestions = [];
    const assignedModes = level.assignedGameModes || [];

    for (let i = 1; i <= 50; i++) {
      const t = templates[Math.floor(Math.random() * templates.length)];
      const selectedMode = assignedModes[i % assignedModes.length];
      
      t.type = selectedMode; 
      const data = generateQuestionData(t, 4);
      
      fixedQuestions.push({
        id: `${level.id}-fixed-${i}`,
        gameId: selectedMode,
        type: selectedMode,
        prompt: data.prompt,
        correctAnswer: data.correctAnswer,
        options: data.options,
        objectIcon: data.objectIcon,
        objectIcon2: data.objectIcon2,
        targetCount: data.targetCount,
        targetCount2: data.targetCount2,
        renderMode: data.renderMode,
        uiGraphics: t.uiGraphics
      });
    }

    const filePath = path.join(questionsDir, `level_${level.number}.json`);
    fs.writeFileSync(filePath, JSON.stringify(fixedQuestions, null, 2), 'utf-8');
    totalGenerated += fixedQuestions.length;
  }

  console.log(`Successfully generated ${totalGenerated} questions!`);
}

generateJSONs().catch(console.error);
