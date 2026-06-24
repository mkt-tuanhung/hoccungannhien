import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { mathData } from '../data/math/levels';
import { generateQuestionData } from '../lib/gameLogic';

const ttsDir = path.join(process.cwd(), 'public', 'tts');
const ttsFiles = new Set(fs.readdirSync(ttsDir));

console.log(`Found ${ttsFiles.size} files in public/tts`);

const allValidQuestions = [];

function check(text: string) {
    const hash = crypto.createHash('md5').update(text.trim()).digest('hex');
    return ttsFiles.has(hash + '.mp3');
}

// We will brute force combinations
// For each question template, we try to generate a lot of random variations.
// Since we don't know EXACTLY what the user generated, we'll just try 1000 random attempts per template!
// 1000 attempts * 300 templates = 300,000 attempts. Very fast in Node.

const fixedBank: Record<string, any[]> = {};

for (const level of mathData.levels) {
    if (!level.games) continue;
    for (const game of level.games) {
        for (const q of game.questions) {
            if (!fixedBank[q.id]) {
                fixedBank[q.id] = [];
            }
            
            const seenPrompts = new Set<string>();
            for(let i=0; i<2000; i++) {
                const data = generateQuestionData(q, 4);
                const text = data.prompt.replace('🔊', '').trim();
                
                if (!seenPrompts.has(text)) {
                    seenPrompts.add(text);
                    if (check(text)) {
                        fixedBank[q.id].push(data);
                    }
                }
            }
            console.log(`Question ${q.id}: Found ${fixedBank[q.id].length} valid audio combinations.`);
        }
    }
}

let totalFound = 0;
for (const id in fixedBank) {
    totalFound += fixedBank[id].length;
}

console.log(`Total valid combinations found with audio: ${totalFound}`);

fs.writeFileSync(path.join(process.cwd(), 'data', 'math', 'fixed_question_bank.json'), JSON.stringify(fixedBank, null, 2));
console.log('Saved to data/math/fixed_question_bank.json');
