"use client";

import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { why } from "@/lib/content";
import { EASE, useReducedMotionSafe } from "@/components/motion/primitives";

const draw = (d: number) => ({
  hidden: { pathLength: 0 },
  show: { pathLength: 1, transition: { duration: 1, ease: EASE, delay: d } },
});
const pop = (d: number) => ({
  hidden: { opacity: 0, scale: 0.6 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASE, delay: d } },
});

/** Outputs (website, dashboard, campaign) converge, then fan out into outcomes. */
export function OutputOutcome({ outcomes }: { outcomes: string[] }) {
  const reduce = useReducedMotionSafe();
  const outs = ["Website", "Dashboard", "Campaign"];
  const oy = [70, 150, 230];
  const ty = outcomes.map((_, i) => 40 + i * 55);
  return (
    <motion.svg
      viewBox="0 0 600 300"
      className="output-outcome"
      aria-hidden="true"
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
    >
      {oy.map((y, i) => (
        <motion.path key={y} variants={draw(0.3 + i * 0.1)} className="art-edge" d={`M130 ${y} H200 V150 H250`} />
      ))}
      {ty.map((y, i) => (
        <motion.path key={y} variants={draw(1 + i * 0.08)} className="art-edge" d={`M262 150 H300 V${y} H360`} />
      ))}
      {outs.map((o, i) => (
        <motion.g key={o} variants={pop(i * 0.1)}>
          <rect x={10} y={oy[i] - 18} width={120} height={36} rx={2} className="art-node" />
          <text x={70} y={oy[i] + 5} textAnchor="middle" className="art-label">
            {o}
          </text>
        </motion.g>
      ))}
      <motion.rect variants={pop(0.9)} x={244} y={142} width={16} height={16} rx={2} className="art-ink" />
      {outcomes.map((o, i) => {
        const last = i === outcomes.length - 1;
        return (
          <motion.g key={o} variants={pop(1.3 + i * 0.08)}>
            <rect x={360} y={ty[i] - 5} width={10} height={10} rx={1} className={last ? "art-signal" : "art-ink"} />
            <text x={382} y={ty[i] + 5} className={`art-label art-label--left${last ? " art-label--signal" : ""}`}>
              {o}
            </text>
          </motion.g>
        );
      })}
    </motion.svg>
  );
}

function Reason({ i, onActive }: { i: number; onActive: (i: number) => void }) {
  const r = why.reasons[i];
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (inView) onActive(i);
  }, [inView, i, onActive]);
  return (
    <motion.article
      ref={ref}
      className="reason"
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease: EASE }}
    >
      <p className="reason__index">{r.index}</p>
      <h3 className="ps-capability__title">{r.title}</h3>
      <p className="ps-capability__sub">{r.sub}</p>
      <div className="reason__body">
        {r.body.map((b) => (
          <p key={b}>{b}</p>
        ))}
        {r.strong && <p className="reason__strong">{r.strong}</p>}
      </div>
      {r.outcomes && (
        <>
          <ul className="reason__outcomes">
            {r.outcomes.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
          <OutputOutcome outcomes={r.outcomes} />
        </>
      )}
    </motion.article>
  );
}

/** Reasons scroll past a sticky index that counts with them. */
export function WhyList() {
  const [active, setActive] = useState(0);
  return (
    <div className="why">
      <div className="why__aside" aria-hidden="true">
        <div className="why__counter">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={active}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.55, ease: EASE }}
            >
              {why.reasons[active].index}
            </motion.span>
          </AnimatePresence>
        </div>
        <ol className="why__ticks">
          {why.reasons.map((r, i) => (
            <li key={r.index} className={i === active ? "is-active" : i < active ? "is-past" : ""} />
          ))}
        </ol>
      </div>
      <div className="why__list">
        {why.reasons.map((r, i) => (
          <Reason key={r.index} i={i} onActive={setActive} />
        ))}
      </div>
    </div>
  );
}
