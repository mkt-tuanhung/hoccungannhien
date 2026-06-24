import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { mathData } from '@/data/math/levels';
import { generateQuestionData } from '@/lib/gameLogic';
import { QuestionTemplate } from '@/types/game';

export async function GET() {
  try {
    const questionsDir = path.join(process.cwd(), 'public', 'data', 'math', 'questions');
    if (!fs.existsSync(questionsDir)) {
      fs.mkdirSync(questionsDir, { recursive: true });
    }

    // 1. Read Markdown file to get question templates
    const mdPath = path.join(process.cwd(), '..', '..', 'Downloads', '300_cau_hoi_toan_lop_1_dang_game_30_level.md');
    let mdContent = '';
    try {
      mdContent = fs.readFileSync(mdPath, 'utf8');
    } catch (e) {
      console.warn("Could not find md in Downloads, trying relative path...");
      mdContent = fs.readFileSync(path.join(process.cwd(), '300_cau_hoi_toan_lop_1_dang_game_30_level.md'), 'utf8');
    }

    // Parse Markdown Tables
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
        type: 'tap_choice', // Mặc định, sẽ override bởi procedural game mode
        promptTemplate: match[3].trim(),
        answerLogic: match[9].trim(),
        interaction: 'tap_answer',
        uiGraphics: match[6].trim(),
        animation: "",
        sound: "",
        hints: hints,
        variables: {
            "object": ["viên kim cương", "quả táo", "con mèo", "con thỏ", "quả bóng", "ngôi sao"]
        }
      });
    }

    let totalGenerated = 0;

    // 2. Generate exactly 50 fixed questions for each level
    for (const level of mathData.levels) {
      const templates = levelTemplates[level.number] || [];
      if (templates.length === 0) continue;

      const fixedQuestions = [];
      const assignedModes = level.assignedGameModes || [];

      for (let i = 1; i <= 50; i++) {
        // Pick a random template
        const t = templates[Math.floor(Math.random() * templates.length)];
        
        // Cố tình gán gameMode luân phiên để cả 3 mode đều có số câu tương đương
        const selectedMode = assignedModes[i % assignedModes.length];
        
        t.type = selectedMode; // Override type for generateQuestionData
        
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

      // Save to level_X.json
      const filePath = path.join(questionsDir, `level_${level.number}.json`);
      fs.writeFileSync(filePath, JSON.stringify(fixedQuestions, null, 2), 'utf-8');
      totalGenerated += fixedQuestions.length;
    }

    return NextResponse.json({ message: `Successfully generated ${totalGenerated} fixed questions across ${mathData.levels.length} levels.` });
  } catch (error: any) {
    console.error("Error generating fixed questions:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
