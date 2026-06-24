import confetti from "canvas-confetti";
import { CONFETTI_COLORS } from "@/lib/design/palette";

// Pháo giấy mừng trả lời đúng — bắn từ 2 bên lên giữa, dịu nhẹ cho bé.
export function celebrate() {
  const opts = { colors: CONFETTI_COLORS, disableForReducedMotion: true };

  confetti({ ...opts, particleCount: 60, spread: 70, origin: { x: 0.2, y: 0.7 }, angle: 60 });
  confetti({ ...opts, particleCount: 60, spread: 70, origin: { x: 0.8, y: 0.7 }, angle: 120 });

  setTimeout(() => {
    confetti({ ...opts, particleCount: 40, spread: 100, origin: { x: 0.5, y: 0.5 }, startVelocity: 35, scalar: 1.2 });
  }, 200);
}

// Sao lấp lánh nhẹ (dùng cho hoàn thành level)
export function sparkleBurst() {
  confetti({
    colors: CONFETTI_COLORS,
    particleCount: 30,
    spread: 360,
    startVelocity: 25,
    shapes: ["star"],
    origin: { x: 0.5, y: 0.4 },
    disableForReducedMotion: true,
  });
}
