/**
 * Upload toàn bộ media từ public/ lên Cloudflare R2
 * Giữ nguyên cấu trúc thư mục: public/tts/xxx.mp3 → R2 key: tts/xxx.mp3
 *
 * Chạy: node scripts/upload-to-r2.mjs
 * Hoặc chỉ upload TTS: node scripts/upload-to-r2.mjs --only tts
 */

import { S3Client, PutObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";
import { readFileSync, readdirSync, statSync } from "fs";
import { join, relative, extname } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const PUBLIC_DIR = join(ROOT, "public");

// Đọc .env.local thủ công (không cần dotenv)
const envPath = join(ROOT, ".env.local");
const envVars = {};
try {
  const envContent = readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const [key, ...vals] = line.split("=");
    if (key && vals.length) envVars[key.trim()] = vals.join("=").trim();
  }
} catch {
  console.error("Không tìm thấy .env.local");
  process.exit(1);
}

const R2_ENDPOINT = envVars["R2_ENDPOINT"];
const R2_ACCESS_KEY_ID = envVars["R2_ACCESS_KEY_ID"];
const R2_SECRET_ACCESS_KEY = envVars["R2_SECRET_ACCESS_KEY"];
const R2_BUCKET_NAME = envVars["R2_BUCKET_NAME"];
const R2_PUBLIC_URL = envVars["NEXT_PUBLIC_R2_PUBLIC_URL"];

if (!R2_ENDPOINT || !R2_ACCESS_KEY_ID || !R2_BUCKET_NAME) {
  console.error("Thiếu R2 credentials trong .env.local");
  process.exit(1);
}

const s3 = new S3Client({
  region: "auto",
  endpoint: R2_ENDPOINT,
  credentials: { accessKeyId: R2_ACCESS_KEY_ID, secretAccessKey: R2_SECRET_ACCESS_KEY },
});

// Các thư mục sẽ upload (relative to public/)
const UPLOAD_FOLDERS = ["tts", "scenes", "islands", "images", "sprites"];
// File lẻ ở root public/
const ROOT_FILES_EXTS = [".png", ".jpg", ".jpeg", ".gif", ".webp"];

// Content type mapping
function getContentType(ext) {
  const map = {
    ".mp3": "audio/mpeg",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".webp": "image/webp",
    ".mp4": "video/mp4",
    ".svg": "image/svg+xml",
    ".json": "application/json",
  };
  return map[ext.toLowerCase()] || "application/octet-stream";
}

// Lấy tất cả file trong một thư mục (đệ quy)
function getAllFiles(dir) {
  const files = [];
  try {
    for (const entry of readdirSync(dir)) {
      if (entry === ".DS_Store") continue;
      const full = join(dir, entry);
      if (statSync(full).isDirectory()) {
        files.push(...getAllFiles(full));
      } else {
        files.push(full);
      }
    }
  } catch {}
  return files;
}

// Kiểm tra file đã tồn tại trên R2 chưa (skip nếu đã có)
async function existsOnR2(key) {
  try {
    await s3.send(new HeadObjectCommand({ Bucket: R2_BUCKET_NAME, Key: key }));
    return true;
  } catch {
    return false;
  }
}

async function uploadFile(localPath, r2Key) {
  const ext = extname(localPath);
  const body = readFileSync(localPath);
  await s3.send(new PutObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: r2Key,
    Body: body,
    ContentType: getContentType(ext),
    CacheControl: "public, max-age=31536000, immutable",
  }));
}

async function main() {
  const args = process.argv.slice(2);
  const onlyIdx = args.indexOf("--only");
  const onlyFolder = onlyIdx >= 0 ? args[onlyIdx + 1] : null;

  const folders = onlyFolder ? [onlyFolder] : UPLOAD_FOLDERS;

  console.log(`\n🚀 Upload R2 bucket: ${R2_BUCKET_NAME}`);
  console.log(`📁 Thư mục: ${folders.join(", ")}\n`);

  let total = 0, ok = 0, skip = 0, fail = 0;

  for (const folder of folders) {
    const localDir = join(PUBLIC_DIR, folder);
    const files = getAllFiles(localDir);
    console.log(`📂 ${folder}/ — ${files.length} files`);

    for (const filePath of files) {
      // R2 key: tts/tts_12345.mp3  (relative to public/)
      const r2Key = relative(PUBLIC_DIR, filePath).replace(/\\/g, "/");
      total++;

      try {
        // Skip nếu đã tồn tại (tránh upload lại toàn bộ TTS mỗi lần)
        if (await existsOnR2(r2Key)) {
          skip++;
          if (skip % 50 === 0) process.stdout.write(`  ⏭  ${skip} skipped...\r`);
          continue;
        }

        await uploadFile(filePath, r2Key);
        ok++;
        if (ok % 10 === 0 || total < 20) {
          console.log(`  ✅ [${ok + skip}/${total}] ${r2Key}`);
        }
      } catch (err) {
        fail++;
        console.error(`  ❌ FAIL: ${r2Key} — ${err.message}`);
      }
    }
    console.log(`  → ${folder}: ${ok} uploaded, ${skip} skipped, ${fail} failed\n`);
    ok = 0; skip = 0; fail = 0;
  }

  console.log(`\n✅ Xong! Public URL: ${R2_PUBLIC_URL}/tts/tts_xxx.mp3`);
}

main().catch(console.error);
