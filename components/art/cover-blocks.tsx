"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { EASE, useReducedMotionSafe } from "@/components/motion/primitives";

/*
  The cover composition (inverse slab, signal block, tint block, dot grid and
  the signal path), assembled on load with a pulse running along the path.
*/

const DOTS: [number, number][] = [];
for (let r = 0; r < 6; r++) for (let c = 0; c < 6; c++) DOTS.push([24 + c * 48, 24 + r * 48]);
const NODES: [number, number][] = [
  [72, 72],
  [168, 72],
  [168, 168],
];

export function CoverBlocks({ className = "" }: { className?: string }) {
  const reduce = useReducedMotionSafe();
  const ref = useRef<SVGSVGElement>(null);
  // Assemble when first seen (on phones the art sits below the fold).
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const go = <T,>(v: T) => (inView ? v : undefined);
  const t = (d: number, dur = 0.9) => ({ duration: dur, ease: EASE, delay: d });
  const init = reduce ? false : undefined;
  return (
    <svg ref={ref} viewBox="0 0 480 288" className={`cover-blocks ${className}`} aria-hidden="true">
      <motion.rect
        x={384}
        y={0}
        width={96}
        height={96}
        className="cb-tint"
        initial={init ?? { opacity: 0 }}
        animate={go({ opacity: 1 })}
        transition={t(0.7, 0.6)}
      />
      <motion.rect
        x={288}
        y={96}
        width={96}
        height={192}
        className="art-signal"
        style={{ originY: 1 }}
        initial={init ?? { scaleY: 0 }}
        animate={go({ scaleY: 1 })}
        transition={t(0.35)}
      />
      <motion.rect
        x={0}
        y={0}
        width={288}
        height={288}
        className="cb-slab"
        style={{ originY: 0 }}
        initial={init ?? { scaleY: 0 }}
        animate={go({ scaleY: 1 })}
        transition={t(0)}
      />
      {DOTS.map(([x, y], i) => (
        <motion.circle
          key={i}
          cx={x}
          cy={y}
          r={2}
          className="cb-dot"
          initial={init ?? { opacity: 0 }}
          animate={go({ opacity: 1 })}
          transition={{ duration: 0.4, delay: 0.6 + (x + y) * 0.0012 }}
        />
      ))}
      <motion.path
        d="M72 72 H168 V168 H288"
        className="cb-edge"
        initial={init ?? { pathLength: 0 }}
        animate={go({ pathLength: 1 })}
        transition={t(1.1, 1.1)}
      />
      {NODES.map(([x, y], i) => (
        <motion.circle
          key={i}
          cx={x}
          cy={y}
          r={6}
          className="art-signal"
          initial={init ?? { scale: 0 }}
          animate={go({ scale: 1 })}
          transition={t(1.1 + i * 0.35, 0.45)}
        />
      ))}
      {!reduce && inView && (
        <motion.rect
          width={8}
          height={8}
          className="cb-pulse"
          initial={{ x: 68, y: 68, opacity: 0 }}
          animate={go({ x: [68, 164, 164, 284], y: [68, 68, 164, 164], opacity: [0, 1, 1, 0] })}
          transition={{
            duration: 2.2,
            ease: "linear",
            times: [0, 0.31, 0.62, 1],
            repeat: Infinity,
            repeatDelay: 1.2,
            delay: 2.6,
          }}
        />
      )}
    </svg>
  );
}
