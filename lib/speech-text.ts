// Chuyển prompt sang dạng đọc tự nhiên tiếng Việt cho TTS.
export function toSpeechText(text: string): string {
  if (!text) return "";
  return text
    .replace(/🔊/g, "")
    .replace(/\s*=\s*\?/g, " bằng mấy")
    .replace(/\s*\+\s*/g, " cộng ")
    .replace(/\s*-\s*/g, " trừ ")
    .replace(/\s*>\s*/g, " lớn hơn ")
    .replace(/\s*<\s*/g, " bé hơn ")
    .replace(/__+/g, " mấy ")
    .replace(/\?/g, "")
    .replace(/\s+/g, " ")
    .trim();
}
