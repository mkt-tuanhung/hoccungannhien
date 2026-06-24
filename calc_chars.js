const fs = require('fs');
const path = require('path');

const questionsDir = path.join(process.cwd(), 'public', 'data', 'math', 'questions');
let totalChars = 0;
const allTexts = new Set();

for (let i = 1; i <= 30; i++) {
  const filePath = path.join(questionsDir, `level_${i}.json`);
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    data.forEach(q => {
      if (q.prompt) {
        const cleanText = q.prompt.replace(/🔊/g, '').trim();
        if (cleanText && !allTexts.has(cleanText)) {
          allTexts.add(cleanText);
          totalChars += cleanText.length;
        }
      }
    });
  }
}

console.log(`Unique prompts: ${allTexts.size}`);
console.log(`Total characters required: ${totalChars}`);
