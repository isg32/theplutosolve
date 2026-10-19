"use client";

import { motion, useMotionValue, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { idea } from "@/lib/content";
import { useCompact, useScenes } from "@/components/motion/primitives";

/*
  "These aren't isolated problems. They're connected."
  Pinned: each problem lights up as its node appears, scattered and tilted.
  Then the nodes snap into a system, edges draw to a signal hub.
  Phones get their own geometry and tell the problems one line at a time.
*/

type Geo = {
  w: number;
  h: number;
  nodeW: number;
  nodeH: number;
  font: number;
  hub: { x: number; y: number };
  order: { x: number; y: number }[];
  scatter: { x: number; y: number; r: number }[];
  dots: number;
};

const WIDE: Geo = {
  w: 600,
  h: 520,
  nodeW: 132,
  nodeH: 40,
  font: 14,
  hub: { x: 300, y: 260 },
  order: [
    { x: 110, y: 110 },
    { x: 300, y: 110 },
    { x: 490, y: 110 },
    { x: 110, y: 410 },
    { x: 300, y: 410 },
    { x: 490, y: 410 },
  ],
  scatter: [
    { x: 120, y: 64, r: -8 },
    { x: 470, y: 56, r: 6 },
    { x: 250, y: 206, r: -5 },
    { x: 500, y: 300, r: 9 },
    { x: 96, y: 336, r: 5 },
    { x: 340, y: 462, r: -7 },
  ],
  dots: 24,
};

const COMPACT: Geo = {
  w: 360,
  h: 330,
  nodeW: 104,
  nodeH: 34,
  font: 13,
  hub: { x: 180, y: 165 },
  order: [
    { x: 58, y: 50 },
    { x: 180, y: 50 },
    { x: 302, y: 50 },
    { x: 58, y: 280 },
    { x: 180, y: 280 },
    { x: 302, y: 280 },
  ],
  scatter: [
    { x: 76, y: 40, r: -9 },
    { x: 280, y: 70, r: 7 },
    { x: 150, y: 150, r: -6 },
    { x: 290, y: 210, r: 10 },
    { x: 70, y: 236, r: 6 },
    { x: 200, y: 296, r: -8 },
  ],
  dots: 20,
};

const winStart = (i: number) => 0.08 + i * 0.08;
const SNAP: [number, number] = [0.6, 0.72];

function edgeD(g: Geo, i: number) {
  const n = g.order[i];
  return n.x === g.hub.x ? `M${n.x} ${n.y} V${g.hub.y}` : `M${n.x} ${n.y} V${g.hub.y} H${g.hub.x}`;
}

function Edge({ p, g, i }: { p: MotionValue<number>; g: Geo; i: number }) {
  const pathLength = useTransform(p, [0.7 + i * 0.012, 0.82], [0, 1]);
  return <motion.path d={edgeD(g, i)} className="art-edge" style={{ pathLength }} />;
}

function RowEdge({ p, d, at }: { p: MotionValue<number>; d: string; at: number }) {
  const pathLength = useTransform(p, [at, at + 0.06], [0, 1]);
  return <motion.path d={d} className="art-edge" style={{ pathLength }} />;
}

/** A pulse that runs down each edge into the hub once the system is connected. */
function Pulse({ p, g, i }: { p: MotionValue<number>; g: Geo; i: number }) {
  const o = g.order[i];
  const t = useTransform(p, [0.84 + i * 0.01, 0.96], [0, 1]);
  const x = useTransform(t, [0, 0.5, 1], [o.x, o.x, g.hub.x]);
  const y = useTransform(t, [0, 0.5, 1], [o.y, g.hub.y, g.hub.y]);
  const opacity = useTransform(t, [0, 0.05, 0.9, 1], [0, 1, 1, 0]);
  return <motion.rect width={6} height={6} x={-3} y={-3} className="art-ink" style={{ x, y, opacity }} />;
}

function Node({ p, g, i, label }: { p: MotionValue<number>; g: Geo; i: number; label: string }) {
  const s = g.scatter[i];
  const o = g.order[i];
  const a = winStart(i);
  const x = useTransform(p, SNAP, [s.x, o.x]);
  const y = useTransform(p, SNAP, [s.y, o.y]);
  const rotate = useTransform(p, SNAP, [s.r, 0]);
  const opacity = useTransform(p, [a, a + 0.04], [0, 1]);
  const scale = useTransform(p, [a, a + 0.03, a + 0.06], [0.6, 1.08, 1]);
  return (
    <motion.g style={{ x, y, rotate, opacity, scale }}>
      <rect x={-g.nodeW / 2} y={-g.nodeH / 2} width={g.nodeW} height={g.nodeH} rx={2} className="art-node" />
      <text x={0} y={g.font * 0.36} textAnchor="middle" className="art-label" style={{ fontSize: g.font }}>
        {label}
      </text>
    </motion.g>
  );
}

function Hub({ p, g }: { p: MotionValue<number>; g: Geo }) {
  const scale = useTransform(p, [0.74, 0.8], [0, 1]);
  const ring = useTransform(p, [0.78, 0.9], [0, 1]);
  const ringScale = useTransform(p, [0.78, 0.9], [0.4, 1]);
  return (
    <g transform={`translate(${g.hub.x} ${g.hub.y})`}>
      <motion.rect x={-30} y={-30} width={60} height={60} rx={2} className="art-ring" style={{ opacity: ring, scale: ringScale }} />
      <motion.rect x={-12} y={-12} width={24} height={24} rx={2} className="art-signal" style={{ scale }} />
    </g>
  );
}

function Diagram({ p, g }: { p: MotionValue<number>; g: Geo }) {
  const id = `idea-dots-${g.w}`;
  const [top, bottom] = [g.order[0].y, g.order[3].y];
  return (
    <svg viewBox={`0 0 ${g.w} ${g.h}`} className="idea-diagram" aria-hidden="true">
      <defs>
        <pattern id={id} width={g.dots} height={g.dots} patternUnits="userSpaceOnUse">
          <circle cx={g.dots / 2} cy={g.dots / 2} r="1.2" className="art-dot" />
        </pattern>
      </defs>
      <rect width={g.w} height={g.h} fill={`url(#${id})`} />
      <RowEdge p={p} d={`M${g.order[0].x} ${top} H${g.order[2].x}`} at={0.72} />
      <RowEdge p={p} d={`M${g.order[3].x} ${bottom} H${g.order[5].x}`} at={0.74} />
      {g.order.map((_, i) => (
        <Edge key={i} p={p} g={g} i={i} />
      ))}
      {g.order.map((_, i) => (
        <Pulse key={i} p={p} g={g} i={i} />
      ))}
      <Hub p={p} g={g} />
      {idea.problems.map((pr, i) => (
        <Node key={pr.node} p={p} g={g} i={i} label={pr.node} />
      ))}
    </svg>
  );
}

function Line({ p, i, still, children }: { p: MotionValue<number>; i: number; still: boolean; children: string }) {
  const a = winStart(i);
  const opacity = useTransform(p, [a - 0.02, a, a + 0.08, a + 0.1], [0.22, 1, 1, 0.5]);
  const x = useTransform(p, [a - 0.02, a, a + 0.08, a + 0.1], [0, 8, 8, 0]);
  return (
    <motion.li style={still ? undefined : { opacity, x }} className="idea-line">
      {children}
    </motion.li>
  );
}

function Turn({ p }: { p: MotionValue<number> }) {
  const o1 = useTransform(p, [0.58, 0.62], [0, 1]);
  const o2 = useTransform(p, [0.66, 0.7], [0, 1]);
  const y2 = useTransform(p, [0.66, 0.7], [16, 0]);
  return (
    <div className="idea-turn">
      <motion.p style={{ opacity: o1 }}>{idea.turn[0]}</motion.p>
      <motion.p style={{ opacity: o2, y: y2 }} className="idea-turn__strong">
        {idea.turn[1]}
      </motion.p>
    </div>
  );
}

function Layout({ p, still = false }: { p: MotionValue<number>; still?: boolean }) {
  return (
    <div className="ps-container idea-grid">
      <div>
        <p className="idea-intro">{idea.intro}</p>
        <ol className="idea-lines">
          {idea.problems.map((pr, i) => (
            <Line key={pr.node} p={p} i={i} still={still}>
              {pr.line}
            </Line>
          ))}
        </ol>
        <Turn p={p} />
      </div>
      <Diagram p={p} g={WIDE} />
    </div>
  );
}

/* ---------- Phone: one line at a time ---------- */

function StoryLine({ p, i, children }: { p: MotionValue<number>; i: number; children: string }) {
  const a = winStart(i);
  // Each line leaves before the next arrives, so they never overlap mid-blur.
  const range = [a, a + 0.016, a + 0.058, a + 0.074];
  const opacity = useTransform(p, range, [0, 1, 1, 0]);
  const y = useTransform(p, range, [28, 0, 0, -28]);
  const filter = useTransform(p, range, ["blur(6px)", "blur(0px)", "blur(0px)", "blur(6px)"]);
  return (
    <motion.p className="story__line" style={{ opacity, y, filter }}>
      {children}
    </motion.p>
  );
}

function StoryTurn({ p }: { p: MotionValue<number> }) {
  const o1 = useTransform(p, [0.57, 0.61], [0, 1]);
  const y1 = useTransform(p, [0.57, 0.61], [28, 0]);
  const o2 = useTransform(p, [0.65, 0.69], [0, 1]);
  const s2 = useTransform(p, [0.65, 0.69], [0.92, 1]);
  return (
    <div className="story__turn">
      <motion.p style={{ opacity: o1, y: y1 }}>{idea.turn[0]}</motion.p>
      <motion.p style={{ opacity: o2, scale: s2 }} className="idea-turn__strong">
        {idea.turn[1]}
      </motion.p>
    </div>
  );
}

function Tick({ p, i }: { p: MotionValue<number>; i: number }) {
  const a = winStart(i);
  const scaleX = useTransform(p, [a - 0.01, a + 0.06], [0, 1]);
  return (
    <span className="story__tick">
      <motion.span style={{ scaleX }} />
    </span>
  );
}

function Story({ p }: { p: MotionValue<number> }) {
  const intro = useTransform(p, [0, 0.56, 0.6], [1, 1, 0]);
  return (
    <div className="ps-container story">
      <Diagram p={p} g={COMPACT} />
      <div className="story__ticks" aria-hidden="true">
        {idea.problems.map((_, i) => (
          <Tick key={i} p={p} i={i} />
        ))}
      </div>
      <motion.p className="story__intro" style={{ opacity: intro }} aria-hidden="true">
        {idea.intro}
      </motion.p>
      <div className="story__stage" aria-hidden="true">
        {idea.problems.map((pr, i) => (
          <StoryLine key={pr.node} p={p} i={i}>
            {pr.line}
          </StoryLine>
        ))}
        <StoryTurn p={p} />
      </div>
      {/* The full text stays available to screen readers. */}
      <div className="sr-only">
        <p>{idea.intro}</p>
        <ul>
          {idea.problems.map((pr) => (
            <li key={pr.node}>{pr.line}</li>
          ))}
        </ul>
        <p>{idea.turn.join(" ")}</p>
      </div>
    </div>
  );
}

function Pinned({ compact }: { compact: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  return (
    <div ref={ref} className="scene" style={{ height: compact ? "460vh" : "340vh" }}>
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

export function IdeaScene() {
  const scenes = useScenes();
  const compact = useCompact();
  return scenes ? <Pinned compact={compact} /> : <Still />;
}
