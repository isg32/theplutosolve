"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { industries } from "@/lib/content";
import { EASE, useMedia, useReducedMotionSafe } from "@/components/motion/primitives";

/* A small node motif per industry: an orthogonal path across a 4x4 dot field. */
function motif(seed: number) {
  let s = seed * 9301 + 49297;
  const r = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
  const at = (v: number) => 8 + v * 16;
  let c = 0;
  let row = Math.floor(r() * 4);
  const pts: [number, number][] = [[c, row]];
  while (c < 3) {
    c = Math.min(3, c + 1 + Math.floor(r() * 2));
    pts.push([c, row]);
    if (c < 3) {
      let nr = Math.floor(r() * 4);
      if (nr === row) nr = (row + 1 + Math.floor(r() * 3)) % 4;
      row = nr;
      pts.push([c, row]);
    }
  }
  const d = pts.map(([x, y], i) => `${i ? "L" : "M"}${at(x)} ${at(y)}`).join(" ");
  const end = pts[pts.length - 1];
  return { d, start: [at(pts[0][0]), at(pts[0][1])], end: [at(end[0]), at(end[1])] };
}

/**
 * One industry. Hover (mouse) or crossing the middle of the screen (touch)
 * puts it in "focus": the motif redraws and its end node turns signal.
 */
function Cell({ i, touch }: { i: number; touch: boolean }) {
  const it = industries.items[i];
  const m = motif(i + 3);
  const wave = touch ? 0 : (i % 4) + Math.floor(i / 4);
  const ref = useRef<HTMLLIElement>(null);
  const reduce = useReducedMotionSafe();
  const seen = useInView(ref, { once: true, amount: 0.3 });
  const centred = useInView(ref, { margin: "-42% 0px -42% 0px" });
  const [hover, setHover] = useState(false);
  const focus = touch ? centred : hover;
  const state = !seen && !reduce ? "hidden" : focus ? "focus" : "show";

  return (
    <motion.li
      ref={ref}
      className={`industry${focus ? " is-focus" : ""}`}
      initial={reduce ? false : "hidden"}
      animate={state}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      variants={{
        hidden: { opacity: 0, y: 24 },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE, delay: wave * 0.07 } },
        focus: { opacity: 1, y: 0 },
      }}
    >
      <svg viewBox="0 0 64 64" className="industry__motif" aria-hidden="true">
        {Array.from({ length: 16 }, (_, d) => (
          <circle key={d} cx={8 + (d % 4) * 16} cy={8 + Math.floor(d / 4) * 16} r={1.4} className="art-dot" />
        ))}
        <motion.path
          d={m.d}
          className="art-edge-strong"
          variants={{
            hidden: { pathLength: 0 },
            show: { pathLength: 1, transition: { duration: 0.9, ease: EASE, delay: 0.3 + wave * 0.07 } },
            focus: { pathLength: [0, 1], transition: { duration: 0.7, ease: EASE } },
          }}
        />
        <rect x={m.start[0] - 4} y={m.start[1] - 4} width={8} height={8} rx={1} className="art-ink" />
        <rect x={m.end[0] - 4} y={m.end[1] - 4} width={8} height={8} rx={1} className="art-ink" />
        <motion.rect
          x={m.end[0] - 4}
          y={m.end[1] - 4}
          width={8}
          height={8}
          rx={1}
          className="art-signal"
          variants={{
            hidden: { opacity: 0, scale: 1 },
            show: { opacity: 0, scale: 1 },
            focus: { opacity: 1, scale: [1, 1.8, 1], transition: { delay: 0.55, duration: 0.5 } },
          }}
        />
      </svg>
      <h3 className="industry__title">{it.title}</h3>
      <p className="industry__desc">{it.desc}</p>
    </motion.li>
  );
}

export function IndustryGrid() {
  const touch = useMedia("(hover: none)");
  return (
    <ul className="industry-grid">
      {industries.items.map((it, i) => (
        <Cell key={it.title} i={i} touch={touch} />
      ))}
    </ul>
  );
}
