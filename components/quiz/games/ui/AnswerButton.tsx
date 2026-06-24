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
      whileTap={disabled ? {} : { y: 7, transition: { duration: 0.05 } }}
      animate={
        state === "correct" ? { scale: [1, 1.12, 1] }
        : state === "wrong" ? { x: [0, -8, 8, -6, 6, 0] }
        : state === "reveal" ? { scale: [1, 1.05, 1] }
        : {}
      }
      transition={state === "wrong" ? { duration: 0.4 } : { duration: 0.5, repeat: state === "reveal" ? Infinity : 0 }}
      className="relative w-full select-none"
      style={{ opacity: isDimmed ? 0.45 : 1 }}
    >
      <div
        className="relative overflow-hidden flex items-center justify-center font-black"
        style={{
          borderRadius: 30,
          background: `linear-gradient(180deg, ${c.face} 0%, ${c.face} 50%, ${c.lip} 145%)`,
          color: "#fff",
          boxShadow: `0 9px 0 ${c.lip}, 0 16px 22px rgba(110,70,130,0.28)`,
          padding: "24px 16px",
          fontSize: "2.6rem",
          fontFamily: "'Mochiy Pop One', system-ui, sans-serif",
          textShadow: "0 2px 3px rgba(0,0,0,0.18)",
          minHeight: 86,
          border: "3px solid rgba(255,255,255,0.4)",
        }}
      >
        {/* Lớp gloss bóng phía trên */}
        <div
          className="absolute left-2 right-2 pointer-events-none"
          style={{
            top: 4, height: "44%", borderRadius: 24,
            background: "linear-gradient(180deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.05) 100%)",
          }}
        />
        <span className="relative">
          {state === "correct" && <span className="mr-2">✓</span>}
          {state === "wrong" && <span className="mr-2">✗</span>}
          {label}
        </span>
      </div>
    </motion.button>
  );
}
