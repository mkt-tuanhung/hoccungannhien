"use client";

import { motion } from "framer-motion";
import { PALETTE, ColorScheme } from "@/lib/design/palette";

export type ButtonState = "idle" | "correct" | "wrong" | "dimmed" | "reveal";

interface AnswerButtonProps {
  label: React.ReactNode;
  scheme: string;
  state?: ButtonState;
  onClick?: () => void;
  disabled?: boolean;
}

export default function AnswerButton({
  label, scheme, state = "idle", onClick, disabled,
}: AnswerButtonProps) {
  let c: ColorScheme = PALETTE[scheme] || PALETTE.sky;
  if (state === "correct" || state === "reveal") c = PALETTE.mint;
  if (state === "wrong") c = PALETTE.coral;
  const isDimmed = state === "dimmed";

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileTap={disabled ? {} : { y: 8, scale: 0.97, transition: { duration: 0.06 } }}
      animate={
        state === "correct" ? { scale: [1, 1.13, 1] }
        : state === "wrong" ? { x: [0, -10, 10, -7, 7, 0] }
        : state === "reveal" ? { scale: [1, 1.05, 1] }
        : {}
      }
      transition={state === "wrong" ? { duration: 0.4 } : { duration: 0.5, repeat: state === "reveal" ? Infinity : 0 }}
      className="relative w-full select-none"
      style={{ opacity: isDimmed ? 0.4 : 1 }}
    >
      {/* Lớp shadow đáy tạo độ sâu 3D */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          top: 8,
          borderRadius: 28,
          background: c.lip,
          filter: "brightness(0.8)",
        }}
      />

      {/* Thân nút chính */}
      <div
        className="relative overflow-hidden flex items-center justify-center font-black"
        style={{
          borderRadius: 28,
          background: `linear-gradient(175deg, ${c.face}EE 0%, ${c.face} 40%, ${c.lip}CC 100%)`,
          color: "#fff",
          boxShadow: `
            inset 0 2px 3px rgba(255,255,255,0.55),
            inset 0 -3px 4px rgba(0,0,0,0.12),
            0 6px 0 ${c.lip},
            0 10px 20px rgba(0,0,0,0.18)
          `,
          padding: "22px 16px",
          fontSize: "2.6rem",
          fontFamily: "'Mochiy Pop One', system-ui, sans-serif",
          textShadow: "0 2px 0 rgba(0,0,0,0.2), 0 4px 8px rgba(0,0,0,0.15)",
          minHeight: 86,
          border: `3px solid rgba(255,255,255,0.5)`,
          letterSpacing: "0.02em",
        }}
      >
        {/* Gloss trên - sáng rực */}
        <div
          className="absolute left-3 right-3 pointer-events-none"
          style={{
            top: 5,
            height: "42%",
            borderRadius: 20,
            background: "linear-gradient(180deg, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.08) 100%)",
          }}
        />
        {/* Gloss nhỏ góc trái — điểm sáng */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: 7,
            left: 14,
            width: 28,
            height: 14,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.6)",
            filter: "blur(3px)",
          }}
        />

        <span className="relative z-10">
          {state === "correct" && <span className="mr-2">✓</span>}
          {state === "wrong" && <span className="mr-2">✗</span>}
          {label}
        </span>
      </div>
    </motion.button>
  );
}
