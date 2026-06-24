"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

const rnd = (a: number, b: number) => a + Math.random() * (b - a);

// Bong bóng nổi lên (đại dương)
export function BubblesUp() {
  const items = useMemo(() => Array.from({ length: 16 }).map(() => ({ x: rnd(2, 96), s: rnd(8, 26), d: rnd(4, 9), delay: rnd(0, 6) })), []);
  return <>{items.map((b, i) => (
    <motion.div key={i} className="absolute rounded-full" style={{ left: `${b.x}%`, bottom: -30, width: b.s, height: b.s, background: "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.9), rgba(180,230,255,0.25))", border: "1px solid rgba(255,255,255,0.5)" }}
      animate={{ y: [0, -900], opacity: [0, 0.9, 0] }} transition={{ repeat: Infinity, duration: b.d, delay: b.delay, ease: "easeIn" }} />
  ))}</>;
}

// Đom đóm lấp lánh (rừng tiên)
export function Fireflies() {
  const items = useMemo(() => Array.from({ length: 22 }).map(() => ({ x: rnd(0, 100), y: rnd(10, 90), d: rnd(2, 5), delay: rnd(0, 4) })), []);
  return <>{items.map((f, i) => (
    <motion.div key={i} className="absolute rounded-full" style={{ left: `${f.x}%`, top: `${f.y}%`, width: 8, height: 8, background: "#FFF6A8", boxShadow: "0 0 10px 3px rgba(255,240,130,0.8)" }}
      animate={{ opacity: [0, 1, 0], x: [0, rnd(-30, 30)], y: [0, rnd(-30, 30)] }} transition={{ repeat: Infinity, duration: f.d, delay: f.delay }} />
  ))}</>;
}

// Mưa rơi (phù thuỷ thời tiết)
export function RainDrops() {
  const items = useMemo(() => Array.from({ length: 40 }).map(() => ({ x: rnd(0, 100), d: rnd(0.5, 1.1), delay: rnd(0, 1.5) })), []);
  return <>{items.map((r, i) => (
    <motion.div key={i} className="absolute" style={{ left: `${r.x}%`, top: -20, width: 3, height: 18, borderRadius: 3, background: "linear-gradient(rgba(150,200,255,0.2),rgba(120,180,255,0.8))" }}
      animate={{ y: [0, 900] }} transition={{ repeat: Infinity, duration: r.d, delay: r.delay, ease: "linear" }} />
  ))}</>;
}

// Tuyết / bụi phép rơi
export function Snow() {
  const items = useMemo(() => Array.from({ length: 30 }).map(() => ({ x: rnd(0, 100), s: rnd(4, 10), d: rnd(4, 9), delay: rnd(0, 5) })), []);
  return <>{items.map((s, i) => (
    <motion.div key={i} className="absolute rounded-full bg-white/90" style={{ left: `${s.x}%`, top: -10, width: s.s, height: s.s }}
      animate={{ y: [0, 900], x: [0, rnd(-40, 40)] }} transition={{ repeat: Infinity, duration: s.d, delay: s.delay, ease: "linear" }} />
  ))}</>;
}

// Kẹo / hạt đường rơi (xứ kẹo)
export function FallingSprinkles() {
  const colors = ["#FF8FB8", "#C89BFF", "#FFD56B", "#7CC9F0", "#6FD08C"];
  const items = useMemo(() => Array.from({ length: 28 }).map(() => ({ x: rnd(0, 100), c: colors[Math.floor(rnd(0, colors.length))], d: rnd(3, 7), delay: rnd(0, 5), r: rnd(0, 360) })), []);
  return <>{items.map((s, i) => (
    <motion.div key={i} className="absolute" style={{ left: `${s.x}%`, top: -12, width: 10, height: 6, borderRadius: 3, background: s.c }}
      animate={{ y: [0, 900], rotate: [s.r, s.r + 360] }} transition={{ repeat: Infinity, duration: s.d, delay: s.delay, ease: "linear" }} />
  ))}</>;
}

// Mây trôi parallax (thành phố mây)
export function ParallaxClouds() {
  const rows = [{ y: 12, s: 1, d: 30, o: 0.9 }, { y: 30, s: 0.7, d: 45, o: 0.6 }, { y: 50, s: 0.5, d: 60, o: 0.4 }];
  return <>{rows.map((r, i) => (
    <motion.div key={i} className="absolute flex gap-24" style={{ top: `${r.y}%`, left: 0, opacity: r.o }}
      animate={{ x: ["0%", "-50%"] }} transition={{ repeat: Infinity, duration: r.d, ease: "linear" }}>
      {Array.from({ length: 8 }).map((_, j) => (
        <div key={j} style={{ transform: `scale(${r.s})` }}>
          <div className="relative" style={{ width: 90, height: 40 }}>
            <div className="absolute bg-white rounded-full" style={{ width: 60, height: 40, left: 15 }} />
            <div className="absolute bg-white rounded-full" style={{ width: 44, height: 44, left: 0, top: 4 }} />
            <div className="absolute bg-white rounded-full" style={{ width: 44, height: 44, right: 0, top: 6 }} />
          </div>
        </div>
      ))}
    </motion.div>
  ))}</>;
}

// Bánh răng xoay (nhà máy / robot)
export function SpinningGears() {
  const gears = [{ x: -20, y: 8, s: 130, d: 16, r: false }, { x: 78, y: 4, s: 100, d: 12, r: true }, { x: 84, y: 60, s: 150, d: 22, r: false }];
  return <>{gears.map((gr, i) => (
    <motion.div key={i} className="absolute text-slate-400/25" style={{ left: `${gr.x}%`, top: `${gr.y}%`, fontSize: gr.s }}
      animate={{ rotate: gr.r ? -360 : 360 }} transition={{ repeat: Infinity, duration: gr.d, ease: "linear" }}>⚙️</motion.div>
  ))}</>;
}

// Sao lấp lánh (vũ trụ / vương quốc)
export function TwinkleStars() {
  const items = useMemo(() => Array.from({ length: 26 }).map(() => ({ x: rnd(0, 100), y: rnd(0, 70), s: rnd(8, 18), d: rnd(1.5, 4), delay: rnd(0, 3) })), []);
  return <>{items.map((s, i) => (
    <motion.div key={i} className="absolute text-white" style={{ left: `${s.x}%`, top: `${s.y}%`, fontSize: s.s, textShadow: "0 0 6px rgba(255,255,255,0.8)" }}
      animate={{ opacity: [0.2, 1, 0.2], scale: [0.7, 1, 0.7] }} transition={{ repeat: Infinity, duration: s.d, delay: s.delay }}>✦</motion.div>
  ))}</>;
}

// Lớp tối + quầng đèn pin ở giữa (hang pha lê)
export function FlashlightDark() {
  return (
    <motion.div className="absolute inset-0"
      style={{ background: "radial-gradient(circle at 50% 42%, rgba(0,0,0,0) 18%, rgba(20,10,40,0.82) 52%)" }}
      animate={{ opacity: [0.92, 1, 0.92] }} transition={{ repeat: Infinity, duration: 3 }} />
  );
}
