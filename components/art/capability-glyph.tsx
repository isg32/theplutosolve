"use client";

import { motion, type Variants } from "motion/react";
import { useReducedMotionSafe } from "@/components/motion/primitives";
import type { Capability } from "@/lib/content";

/*
  One abstract system diagram per capability, drawn from nodes and hairlines.
  Edges draw on when the glyph enters the viewport; then a small ambient loop runs.
*/

const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: (d: number = 0) => ({
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: { duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: d }, opacity: { duration: 0.01, delay: d } },
  }),
};
const pop: Variants = {
  hidden: { scale: 0, opacity: 0 },
  show: (d: number = 0) => ({
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: d },
  }),
};

function Strategy({ loop }: { loop: boolean }) {
  const mids = [60, 120, 180];
  return (
    <>
      <motion.path variants={draw} custom={0.1} className="art-edge" d="M30 120 H90" />
      {mids.map((y, i) => (
        <motion.path key={y} variants={draw} custom={0.4 + i * 0.1} className="art-edge" d={`M90 120 V${y} H150`} />
      ))}
      {mids.map((y, i) => (
        <motion.path key={`b${y}`} variants={draw} custom={0.8 + i * 0.1} className="art-edge" d={`M150 ${y} H210`} />
      ))}
      <motion.rect variants={pop} custom={0} x={22} y={112} width={16} height={16} rx={2} className="art-ink" />
      {mids.map((y, i) => (
        <motion.rect key={`n${y}`} variants={pop} custom={0.6 + i * 0.1} x={143} y={y - 7} width={14} height={14} rx={2} className="art-node" />
      ))}
      {mids.map((y, i) => (
        <motion.rect
          key={`l${y}`}
          variants={pop}
          custom={1.1 + i * 0.1}
          x={203}
          y={y - 7}
          width={14}
          height={14}
          rx={2}
          className={y === 120 ? "art-signal" : "art-ink"}
        />
      ))}
      {loop && (
        <motion.rect
          width={6}
          height={6}
          className="art-ink"
          initial={{ x: 27, y: 117, opacity: 0 }}
          animate={{ x: [27, 87, 147, 207], y: 117, opacity: [0, 1, 1, 0] }}
          transition={{ duration: 2.4, ease: "linear", repeat: Infinity, repeatDelay: 0.8, delay: 2 }}
        />
      )}
    </>
  );
}

function Technology({ loop }: { loop: boolean }) {
  const frames = [
    { x: 80, y: 30 },
    { x: 55, y: 60 },
    { x: 30, y: 90 },
  ];
  return (
    <>
      {frames.map((f, i) => (
        <motion.g key={i} variants={pop} custom={i * 0.18} style={{ originX: 0, originY: 0 }}>
          <rect x={f.x} y={f.y} width={140} height={110} rx={2} className="art-node" />
          <path d={`M${f.x} ${f.y + 18} H${f.x + 140}`} className="art-edge" />
          {[0, 1, 2].map((d) => (
            <circle key={d} cx={f.x + 9 + d * 8} cy={f.y + 9} r={2} className="art-dotfill" />
          ))}
        </motion.g>
      ))}
      {[0, 1, 2].map((r) => (
        <motion.rect
          key={r}
          x={42}
          y={122 + r * 16}
          height={6}
          rx={1}
          className="art-ink"
          style={{ originX: 0 }}
          initial={{ width: 0 }}
          animate={loop ? { width: [0, 116 - r * 30, 116 - r * 30, 0] } : { width: 116 - r * 30 }}
          transition={
            loop
              ? { duration: 3.2, times: [0, 0.35, 0.85, 1], repeat: Infinity, delay: 0.8 + r * 0.2, ease: "easeOut" }
              : { duration: 0 }
          }
        />
      ))}
      <motion.rect variants={pop} custom={0.9} x={130} y={174} width={30} height={14} rx={2} className="art-signal" />
    </>
  );
}

function Marketing({ loop }: { loop: boolean }) {
  const rows = [
    { y: 50, n: 7 },
    { y: 95, n: 5 },
    { y: 140, n: 3 },
  ];
  return (
    <>
      <motion.path
        variants={draw}
        custom={0.1}
        className="art-edge"
        d="M20 30 V72 H50 V117 H80 V162 H104 V200"
      />
      <motion.path
        variants={draw}
        custom={0.1}
        className="art-edge"
        d="M220 30 V72 H190 V117 H160 V162 H136 V200"
      />
      {rows.map((row, ri) =>
        Array.from({ length: row.n }, (_, i) => {
          const x = 120 + (i - (row.n - 1) / 2) * 28;
          return (
            <motion.rect
              key={`${ri}-${i}`}
              variants={pop}
              custom={0.4 + ri * 0.2 + i * 0.03}
              x={x - 4}
              y={row.y - 4}
              width={8}
              height={8}
              rx={1}
              className={ri === 0 ? "art-node" : "art-ink"}
            />
          );
        }),
      )}
      <motion.rect variants={pop} custom={1.2} x={110} y={200} width={20} height={20} rx={2} className="art-signal" />
      {loop &&
        [0, 1, 2].map((k) => (
          <motion.rect
            key={k}
            width={5}
            height={5}
            className="art-ink"
            initial={{ x: 117.5, y: 30, opacity: 0 }}
            animate={{ y: [30, 195], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.8, ease: "easeIn", repeat: Infinity, delay: 1.6 + k * 0.6, repeatDelay: 0.6 }}
          />
        ))}
    </>
  );
}

function Data({ loop }: { loop: boolean }) {
  const bars = [44, 70, 56, 90, 64];
  return (
    <>
      <motion.path variants={draw} custom={0} className="art-edge" d="M20 30 H220 V210 H20 Z" />
      <motion.path variants={draw} custom={0.3} className="art-edge" d="M20 80 H220 M120 80 V210" />
      {[0, 1, 2].map((i) => (
        <motion.g key={i} variants={pop} custom={0.4 + i * 0.1}>
          <rect x={32 + i * 64} y={44} width={24} height={8} rx={1} className={i === 1 ? "art-signal" : "art-ink"} />
          <rect x={32 + i * 64} y={58} width={44} height={4} rx={1} className="art-dotfill" />
        </motion.g>
      ))}
      {bars.map((h, i) => (
        <motion.rect
          key={i}
          x={34 + i * 16}
          width={9}
          rx={1}
          className={i === 3 ? "art-signal" : "art-ink"}
          initial={{ height: 0, y: 196 }}
          whileInView={
            loop
              ? { height: [h, h * 0.55, h * 1.05, h], y: [196 - h, 196 - h * 0.55, 196 - h * 1.05, 196 - h] }
              : { height: h, y: 196 - h }
          }
          viewport={{ once: true }}
          transition={
            loop
              ? { duration: 4, repeat: Infinity, delay: 0.6 + i * 0.12, ease: "easeInOut" }
              : { duration: 0 }
          }
        />
      ))}
      <motion.path
        variants={draw}
        custom={0.8}
        className="art-edge-strong"
        d="M134 180 H152 V160 H170 V168 H188 V124 H206"
      />
      <motion.rect variants={pop} custom={1.6} x={202} y={120} width={8} height={8} rx={1} className="art-signal" />
    </>
  );
}

export function CapabilityGlyph({ kind }: { kind: Capability["glyph"] }) {
  const reduce = useReducedMotionSafe();
  const loop = !reduce;
  const G = { strategy: Strategy, technology: Technology, marketing: Marketing, data: Data }[kind];
  return (
    <motion.svg
      viewBox="0 0 240 240"
      className="glyph"
      aria-hidden="true"
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
    >
      <defs>
        <pattern id={`g-dots-${kind}`} width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="10" cy="10" r="1" className="art-dot" />
        </pattern>
      </defs>
      <rect width="240" height="240" fill={`url(#g-dots-${kind})`} />
      <G loop={loop} />
    </motion.svg>
  );
}
