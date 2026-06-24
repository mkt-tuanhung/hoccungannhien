import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const artifactDir = '/Users/mac/.gemini/antigravity-ide/brain/1b589330-eafd-4315-b072-bd743ac0ebf7';
    const imagesDir = path.join(process.cwd(), 'public/images');
    
    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir, { recursive: true });
    }
    
    const files = fs.readdirSync(artifactDir);
    
    const toCopy = [
      'child_avatar', 'ai_tutor', 'english_icon', 
      'math_icon', 'vietnamese_icon', 'cute_pet_cat'
    ];
    
    const results: any = {};
    
    toCopy.forEach(prefix => {
      const match = files.find(f => f.startsWith(prefix + '_') && f.endsWith('.png'));
      if (match) {
        fs.copyFileSync(path.join(artifactDir, match), path.join(imagesDir, `${prefix}.png`));
        results[prefix] = true;
      }
    });
    
    return NextResponse.json({ success: true, copied: results });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
