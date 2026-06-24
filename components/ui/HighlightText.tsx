import React from 'react';

interface HighlightTextProps {
  text: string;
}

export function HighlightText({ text }: HighlightTextProps) {
  if (!text) return null;

  // Xóa icon loa âm thanh nếu có để render riêng
  const cleanText = text.replace('🔊', '').trim();

  // 1. Nếu có dấu ":" (Ví dụ: "Điền số còn thiếu: 2, 3, __, 5." hoặc "Số nào lớn hơn: 9 hay 1?")
  if (cleanText.includes(':')) {
    const parts = cleanText.split(':');
    return (
      <span>
        {parts[0]}: <span className="text-pink-500 font-black text-[1.2em]">{parts.slice(1).join(':')}</span>
      </span>
    );
  }

  // 2. Nếu là một phép tính (Ví dụ: "4 + 5 = ?" hoặc "12 - 4 = ?")
  // Tìm chuỗi chứa số và phép toán cơ bản
  const mathRegex = /((?:\d+|__+|\?)\s*[+\-=><]\s*(?:\d+|__+|\?)[\s+\-=><\d?]*)/g;
  if (mathRegex.test(cleanText)) {
    const parts = cleanText.split(mathRegex);
    return (
      <span>
        {parts.map((part, i) => {
          if (/^((?:\d+|__+|\?)\s*[+\-=><]\s*(?:\d+|__+|\?)[\s+\-=><\d?]*)$/.test(part)) {
            return <span key={i} className="text-pink-500 font-black text-[1.2em]">{part}</span>;
          }
          return <span key={i}>{part}</span>;
        })}
      </span>
    );
  }

  // 3. Các trường hợp khác: Tự động highlight tất cả các CON SỐ và ô trống "__"
  const numberRegex = /(\d+|__+)/g;
  const numParts = cleanText.split(numberRegex);
  return (
    <span>
      {numParts.map((part, i) => {
        if (/^(\d+|__+)$/.test(part)) {
           return <span key={i} className="text-pink-500 font-black text-[1.2em] px-1">{part}</span>;
        }
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
}
