/**
 * Tự động thêm assetUrl() vào tất cả file dùng "/sprites/"
 * Chạy: node scripts/fix-sprite-paths.mjs
 */
import { readFileSync, writeFileSync } from "fs";
import { glob } from "glob";

const files = await glob([
  "components/**/*.tsx",
  "components/**/*.ts",
  "lib/**/*.tsx",
  "lib/**/*.ts",
  "app/**/*.tsx",
  "app/**/*.ts",
], { cwd: process.cwd() });

let changed = 0;

for (const file of files) {
  let src = readFileSync(file, "utf-8");

  if (!src.includes('"/sprites/')) continue;

  // 1. Replace "/sprites/xxx.png" → assetUrl('/sprites/xxx.png')
  const newSrc = src.replaceAll(/["']\/sprites\/([^"']+)["']/g, (_, name) => `assetUrl('/sprites/${name}')`);

  // 2. Thêm import nếu chưa có
  const needsImport = !newSrc.includes('from "@/lib/assets"') && !newSrc.includes("from '@/lib/assets'");
  let result = newSrc;
  if (needsImport) {
    // Chèn sau dòng "use client" hoặc đầu file
    if (result.startsWith('"use client"')) {
      result = result.replace('"use client";\n', '"use client";\nimport { assetUrl } from "@/lib/assets";\n');
    } else {
      result = 'import { assetUrl } from "@/lib/assets";\n' + result;
    }
  } else {
    // Đảm bảo assetUrl được export từ import đã có
    result = result
      .replace(/import \{ ([^}]+) \} from "@\/lib\/assets"/, (_, exports) => {
        if (exports.includes('assetUrl')) return `import { ${exports} } from "@/lib/assets"`;
        return `import { ${exports}, assetUrl } from "@/lib/assets"`;
      });
  }

  if (result !== src) {
    writeFileSync(file, result, "utf-8");
    console.log(`✅ ${file}`);
    changed++;
  }
}

console.log(`\nDone: ${changed} files updated.`);
