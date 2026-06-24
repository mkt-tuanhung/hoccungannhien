import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import crypto from "crypto";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const text = searchParams.get("text");

    if (!text) {
      return new NextResponse("Text is required", { status: 400 });
    }

    // Sử dụng mã MD5 để lưu cache file âm thanh
    const hash = crypto.createHash("md5").update(text.trim()).digest("hex");
    const ttsDir = path.join(process.cwd(), "public", "tts");
    const filePath = path.join(ttsDir, `${hash}.mp3`);
    
    // Nếu file đã tồn tại cục bộ, phục vụ trực tiếp ngay lập tức (độ trễ 0ms)
    if (fs.existsSync(filePath)) {
      const fileBuffer = fs.readFileSync(filePath);
      return new NextResponse(fileBuffer, {
        headers: {
          "Content-Type": "audio/mpeg",
          "Content-Length": fileBuffer.length.toString(),
          "Cache-Control": "public, max-age=31536000, immutable", 
        },
      });
    }

    // Chỉ dùng file local, nếu không có thì trả về 404 theo yêu cầu của user
    return new NextResponse("TTS file not found locally", { status: 404 });

  } catch (error) {
    console.error("Speech Error:", error);
    return new NextResponse("Error processing speech", { status: 500 });
  }
}
