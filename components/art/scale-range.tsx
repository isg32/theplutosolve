"use client";

import { motion } from "motion/react";
import { EASE, useReducedMotionSafe } from "@/components/motion/primitives";

/*
  "Small projects. Large projects." Five stages on the same dot grid, growing
  from a single node to a full network. Each stage draws in turn; the last
  ends in the one signal node.
*/

type Pt = [number, number];
type Stage = { nodes: Pt[]; edges: [number, number][] };

const P = 24;
const O = 20;
const xy = ([c, r]: Pt) => [O + c * P, O + r * P] as const;

const STAGES: Stage[] = [
  { nodes: [[2, 2]], edges: [] },
  { nodes: [[1, 2], [4, 2]], edges: [[0, 1]] },
  {
    nodes: [[0, 2], [2, 2], [4, 1], [4, 3]],
    edges: [[0, 1], [1, 2], [1, 3]],
  },
  {
    nodes: [[0, 1], [0, 3], [2, 2], [3, 0], [3, 4], [5, 1], [5, 3]],
    edges: [[0, 2], [1, 2], [2, 3], [2, 4], [3, 5], [4, 6], [2, 5]],
  },
  {
    nodes: [[0, 0], [0, 2], [0, 4], [2, 0], [2, 2], [2, 4], [4, 0], [4, 2], [4, 4], [5, 2]],
    edges: [[0, 3], [3, 6], [1, 4], [4, 7], [2, 5], [5, 8], [0, 1], [1, 2], [3, 4], [4, 5], [6, 7], [7, 8], [7, 9]],
  },
];

// Orthogonal edge: across, then down.
function edgeD(a: Pt, b: Pt) {
  const [ax, ay] = xy(a);
  const [bx, by] = xy(b);
  return `M${ax} ${ay} H${bx} V${by}`;
}

function StageArt({ stage, k, last, still }: { stage: Stage; k: number; last: boolean; still: boolean }) {
  const base = k * 0.32;
  return (
    <svg viewBox="0 0 160 136" className="scale-range__art" aria-hidden="true">
      {Array.from({ length: 30 }, (_, d) => {
        const [x, y] = xy([d % 6, Math.floor(d / 6)]);
        return <circle key={d} cx={x} cy={y} r={1.2} className="art-dot" />;
      })}
      {stage.edges.map(([a, b], i) => (
        <motion.path
          key={i}
          d={edgeD(stage.nodes[a], stage.nodes[b])}
          className="art-edge"
          variants={{
            hidden: { pathLength: 0 },
            show: { pathLength: 1, transition: { duration: 0.6, ease: EASE, delay: base + 0.1 + i * 0.03 } },
          }}
        />
      ))}
      {stage.nodes.map((n, i) => {
        const [x, y] = xy(n);
        const signal = last && i === stage.nodes.length - 1;
        const s = signal ? 12 : 9;
        return (
          <motion.rect
            key={i}
            x={x - s / 2}
            y={y - s / 2}
            width={s}
            height={s}
            rx={1}
            className={signal ? "art-signal" : "art-ink"}
            variants={{
              hidden: { scale: 0, opacity: 0 },
              show: { scale: 1, opacity: 1, transition: { duration: 0.4, ease: EASE, delay: base + i * 0.035 } },
            }}
          />
        );
      })}
      {last && !still && (
        <motion.rect
          x={xy(stage.nodes[stage.nodes.length - 1])[0] - 14}
          y={xy(stage.nodes[stage.nodes.length - 1])[1] - 14}
          width={28}
          height={28}
          rx={2}
          className="art-ring"
          variants={{
            hidden: { opacity: 0, scale: 0.4 },
            show: {
              opacity: [0, 1, 0],
              scale: [0.4, 1, 1.4],
              transition: { duration: 1.8, delay: base + 0.8, repeat: Infinity, repeatDelay: 1.4 },
            },
          }}
        />
      )}
    </svg>
  );
}

export function ScaleRange() {
  const reduce = useReducedMotionSafe();
  return (
    <motion.ol
      className="scale-range"
      aria-hidden="true"
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.35 }}
    >
      {STAGES.map((st, k) => (
        <li key={k}>
          <StageArt stage={st} k={k} last={k === STAGES.length - 1} still={reduce} />
          <motion.span
            className="scale-range__rule"
            variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.5, ease: EASE, delay: k * 0.32 } } }}
          />
        </li>
      ))}
    </motion.ol>
  );
}
