const fs = require('fs');
const path = require('path');

const srcDir = '/Users/mac/.gemini/antigravity-ide/brain/1b589330-eafd-4315-b072-bd743ac0ebf7';
const destDir = path.join(__dirname, 'public', 'icons');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const files = fs.readdirSync(srcDir);
files.forEach(f => {
  if (f.endsWith('.png') && f.includes('_icon_')) {
    // Rút gọn tên file, ví dụ apple_icon_123.png -> apple_icon.png
    const baseName = f.split('_17')[0] + '.png'; 
    fs.copyFileSync(path.join(srcDir, f), path.join(destDir, baseName));
    console.log(`Copied ${f} to ${baseName}`);
  }
});
console.log('Done copying icons!');
