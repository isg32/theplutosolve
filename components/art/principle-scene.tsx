"use client";

import { motion, useMotionValue, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { principle } from "@/lib/content";
import { SplitHeadline, useCompact, useScenes } from "@/components/motion/primitives";

/*
  The Principle, on the page's one inverse band. Pinned: each "Your X should
  work for your Y" pair links up in turn, then every pair converges on a single
  signal node, and the word Growth lands. Phones use a tighter diagram and
  show one line at a time.
*/

type Geo = {
  w: number;
  h: number;
  rows: number[];
  a: number; // left node x
  b: number; // right node x
  nodeW: number;
  nodeH: number;
  font: number;
  bend: number;
  join: { x: number; y: number };
};

const WIDE: Geo = { w: 520, h: 390, rows: [60, 150, 240, 330], a: 20, b: 240, nodeW: 120, nodeH: 36, font: 14, bend: 410, join: { x: 470, y: 195 } };
const COMPACT: Geo = { w: 360, h: 270, rows: [35, 100, 165, 230], a: 0, b: 132, nodeW: 104, nodeH: 32, font: 13, bend: 274, join: { x: 330, y: 132 } };

const at = (k: number) => 0.12 + k * 0.14;

function Pair({ p, g, k }: { p: MotionValue<number>; g: Geo; k: number }) {
  const pair = principle.pairs[k];
  const y = g.rows[k];
  const a = at(k);
  const o = useTransform(p, [a, a + 0.04], [0, 1]);
  const ax = useTransform(p, [a, a + 0.05], [-16, 0]);
  const edge = useTransform(p, [a + 0.03, a + 0.09], [0, 1]);
  const ob = useTransform(p, [a + 0.08, a + 0.11], [0, 1]);
  const bx = useTransform(p, [a + 0.08, a + 0.12], [16, 0]);
  const join = useTransform(p, [0.7 + k * 0.02, 0.82], [0, 1]);
  const aEnd = g.a + g.nodeW;
  const bEnd = g.b + g.nodeW;
  return (
    <g>
      <motion.path d={`M${aEnd} ${y} H${g.b}`} className="art-edge" style={{ pathLength: edge }} />
      <motion.path d={`M${bEnd} ${y} H${g.bend} V${g.join.y} H${g.join.x - 16}`} className="art-edge" style={{ pathLength: join }} />
      <motion.g style={{ opacity: o, x: ax }}>
        <rect x={g.a} y={y - g.nodeH / 2} width={g.nodeW} height={g.nodeH} rx={2} className="art-node" />
        <text x={g.a + g.nodeW / 2} y={y + g.font * 0.36} textAnchor="middle" className="art-label" style={{ fontSize: g.font }}>
          {pair.a}
        </text>
      </motion.g>
      <motion.g style={{ opacity: ob, x: bx }}>
        <rect x={g.b} y={y - g.nodeH / 2} width={g.nodeW} height={g.nodeH} rx={2} className="art-node" />
        <text x={g.b + g.nodeW / 2} y={y + g.font * 0.36} textAnchor="middle" className="art-label" style={{ fontSize: g.font }}>
          {pair.b}
        </text>
      </motion.g>
    </g>
  );
}

function Diagram({ p, g }: { p: MotionValue<number>; g: Geo }) {
  const s = useTransform(p, [0.8, 0.84, 0.87], [0, 1.25, 1]);
  const ring = useTransform(p, [0.84, 0.95], [0, 1]);
  const ringScale = useTransform(p, [0.84, 0.95], [0.4, 1]);
  return (
    <svg viewBox={`0 0 ${g.w} ${g.h}`} className="principle-diagram" aria-hidden="true">
      {g.rows.map((_, k) => (
        <Pair key={k} p={p} g={g} k={k} />
      ))}
      <g transform={`translate(${g.join.x} ${g.join.y})`}>
        <motion.rect x={-28} y={-28} width={56} height={56} rx={2} className="art-ring" style={{ opacity: ring, scale: ringScale }} />
        <motion.rect x={-13} y={-13} width={26} height={26} rx={2} className="art-signal" style={{ scale: s }} />
      </g>
    </svg>
  );
}

function Line({ p, k, still }: { p: MotionValue<number>; k: number; still: boolean }) {
  const a = at(k);
  const opacity = useTransform(p, [a, a + 0.05], [0.18, 1]);
  return <motion.li style={still ? undefined : { opacity }}>{principle.pairs[k].line}</motion.li>;
}

function Ending({ p, still }: { p: MotionValue<number>; still: boolean }) {
  const o = useTransform(p, [0.74, 0.8], [0, 1]);
  const g = useTransform(p, [0.84, 0.92], [0, 1]);
  const gy = useTransform(p, [0.84, 0.92], [40, 0]);
  const spacing = useTransform(p, [0.84, 0.96], ["0.04em", "-0.04em"]);
  return (
    <>
      <motion.p className="principle__every" style={still ? undefined : { opacity: o }}>
        {principle.every}
      </motion.p>
      <motion.p className="principle__growth" style={still ? undefined : { opacity: g, y: gy, letterSpacing: spacing }}>
        {principle.outcome}
      </motion.p>
    </>
  );
}

function Layout({ p, still = false }: { p: MotionValue<number>; still?: boolean }) {
  const gridY = useTransform(p, [0, 1], [0, -160]);
  return (
    <>
      <motion.div className="principle__grid" style={{ y: gridY }} aria-hidden="true" />
      <div className="ps-container principle">
        <div>
          <p className="ps-eyebrow">{principle.eyebrow}</p>
          <SplitHeadline lines={principle.headline} className="ps-h1 principle__headline" />
          <ol className="principle__lines">
            {principle.pairs.map((_, k) => (
              <Line key={k} p={p} k={k} still={still} />
            ))}
          </ol>
          <Ending p={p} still={still} />
        </div>
        <Diagram p={p} g={WIDE} />
      </div>
    </>
  );
}

/* ---------- Phone ---------- */

function StoryLine({ p, k }: { p: MotionValue<number>; k: number }) {
  const a = at(k);
  const range = [a - 0.01, a + 0.03, a + 0.11, a + 0.14];
  const opacity = useTransform(p, range, [0, 1, 1, 0]);
  const y = useTransform(p, range, [24, 0, 0, -24]);
  return (
    <motion.p className="pstory__line" style={{ opacity, y }}>
      {principle.pairs[k].line}
    </motion.p>
  );
}

function Story({ p: raw }: { p: MotionValue<number> }) {
  // The headline sits above the pin on phones, so start the timeline at the first pair.
  const p = useTransform(raw, [0, 1], [0.09, 1]);
  const gridY = useTransform(p, [0, 1], [0, -200]);
  const every = useTransform(p, [0.7, 0.76], [0, 1]);
  const g = useTransform(p, [0.84, 0.92], [0, 1]);
  const gs = useTransform(p, [0.84, 0.94], [0.8, 1]);
  return (
    <>
      <motion.div className="principle__grid" style={{ y: gridY }} aria-hidden="true" />
      <div className="ps-container pstory">
        <Diagram p={p} g={COMPACT} />
        <div className="pstory__stage" aria-hidden="true">
          {principle.pairs.map((_, k) => (
            <StoryLine key={k} p={p} k={k} />
          ))}
          <motion.p className="pstory__every" style={{ opacity: every }}>
            {principle.every}
          </motion.p>
        </div>
        <motion.p className="principle__growth pstory__growth" style={{ opacity: g, scale: gs }} aria-hidden="true">
          {principle.outcome}
        </motion.p>
        <div className="sr-only">
          <ul>
            {principle.pairs.map((pr) => (
              <li key={pr.line}>{pr.line}</li>
            ))}
          </ul>
          <p>
            {principle.every} {principle.outcome}
          </p>
        </div>
      </div>
    </>
  );
}

function Pinned({ compact }: { compact: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  return (
    <div ref={ref} className="scene" style={{ height: compact ? "380vh" : "300vh" }}>
      <div className="scene__sticky">{compact ? <Story p={scrollYProgress} /> : <Layout p={scrollYProgress} />}</div>
    </div>
  );
}

function Still() {
  const p = useMotionValue(1);
  return (
    <div className="scene-still">
      <Layout p={p} still />
    </div>
  );
}

export function PrincipleScene() {
  const scenes = useScenes();
  const compact = useCompact();
  return (
    <section className="ps-inverse principle-band" aria-label={principle.eyebrow}>
      {scenes && compact && (
        <div className="ps-container pstory__head">
          <p className="ps-eyebrow">{principle.eyebrow}</p>
          <SplitHeadline lines={principle.headline} className="ps-h1 principle__headline" />
        </div>
      )}
      {scenes ? <Pinned compact={compact} /> : <Still />}
    </section>
  );
}
