import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(req: Request, { params }: { params: { name: string } }) {
  const { name } = params;
  
  // Base directory is the agent's artifact directory for this conversation
  const artifactDir = '/Users/mac/.gemini/antigravity-ide/brain/1b589330-eafd-4315-b072-bd743ac0ebf7';
  
  try {
    const files = fs.readdirSync(artifactDir);
    
    // Tìm file có tiền tố là name (vì image generated có timestamp suffix: child_avatar_12345.png)
    const matchedFile = files.find(f => f.startsWith(name + '_') && f.endsWith('.png'));
    
    if (!matchedFile) {
      return new NextResponse('Asset not found', { status: 404 });
    }
    
    const filePath = path.join(artifactDir, matchedFile);
    const buffer = fs.readFileSync(filePath);
    
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (err) {
    console.error("Error serving artifact asset:", err);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
