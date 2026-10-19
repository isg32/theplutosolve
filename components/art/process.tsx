"use client";

import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { approach } from "@/lib/content";
import { EASE, useCompact, useScenes, useReducedMotionSafe } from "@/components/motion/primitives";

const steps = approach.steps;

/**
 * The five steps on one timeline rule; the rule draws, then nodes fill in turn.
 * On phones it becomes a vertical timeline and each step draws as it scrolls in.
 */
export function ProcessSteps() {
  const reduce = useReducedMotionSafe();
  const compact = useCompact();
  const gap = compact ? 0 : 0.35;
  return (
    <ol className="ps-steps steps-live">
      {steps.map((s, i) => (
        <motion.li
          key={s.index}
          className={`ps-step${i === steps.length - 1 ? " ps-step--current" : ""}`}
          initial={reduce ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: compact ? 0.6 : 0.35 }}
        >
          <motion.span
            className="steps-live__rule"
            variants={{ hidden: { scaleX: 0, scaleY: 0 }, show: { scaleX: 1, scaleY: 1 } }}
            transition={{ duration: compact ? 0.9 : 0.7, ease: compact ? EASE : "linear", delay: i * gap }}
          />
          <motion.span
            className="steps-live__node"
            variants={{ hidden: { scale: 0 }, show: { scale: [0, 1.6, 1] } }}
            transition={{ duration: 0.6, ease: EASE, delay: i * gap }}
          />
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.15 + i * gap }}
          >
            <div className="ps-step__index">{s.index}</div>
            <h3 className="ps-step__title">{s.title}</h3>
            <p className="ps-step__chain">
              {s.chain.map((c, ci) => (
                <motion.span
                  key={c}
                  className="inline-block"
                  variants={{ hidden: { opacity: 0, x: -6 }, show: { opacity: 1, x: 0 } }}
                  transition={{ duration: 0.4, ease: EASE, delay: 0.3 + i * gap + ci * 0.08 }}
                >
                  {ci > 0 && <span aria-hidden="true">&nbsp;→&nbsp;</span>}
                  {c}
                </motion.span>
              ))}
            </p>
            <p className="ps-step__desc">{s.desc}</p>
          </motion.div>
        </motion.li>
      ))}
    </ol>
  );
}

function Panel({ i, active }: { i: number; active: number }) {
  const s = steps[i];
  const on = i <= active;
  return (
    <article className={`hstep${i === active ? " is-active" : ""}`} aria-current={i === active ? "step" : undefined}>
      <div className="hstep__index">{s.index}</div>
      <h3 className="hstep__title">{s.title}</h3>
      <ol className="ps-flow hstep__chain" aria-label={`${s.title}: ${s.chain.join(", ")}`}>
        {s.chain.map((c, ci) => (
          <motion.li
            key={c}
            initial={false}
            animate={{ opacity: on ? 1 : 0.25, y: on ? 0 : 10 }}
            transition={{ duration: 0.5, ease: EASE, delay: on ? ci * 0.09 : 0 }}
          >
            <span className={`ps-flow__node${ci === s.chain.length - 1 && i === active ? " ps-flow__node--outcome" : ""}`}>
              {c}
            </span>
          </motion.li>
        ))}
      </ol>
      <p className="hstep__desc">{s.desc}</p>
    </article>
  );
}

function Pinned() {
  const ref = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const dist = useMotionValue(0);
  const [height, setHeight] = useState<number | null>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(() => -scrollYProgress.get() * dist.get());
  const fill = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    // The fill reaches node i at v = i / (n - 1); light each node as the fill arrives.
    setActive(Math.min(steps.length - 1, Math.floor(v * (steps.length - 1) + 0.1)));
  });

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const measure = () => {
      const d = Math.max(0, el.scrollWidth - window.innerWidth);
      dist.set(d);
      setHeight(d + window.innerHeight);
    };
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [dist]);

  return (
    <div ref={ref} className="scene" style={{ height: height ?? "400vh" }}>
      <div className="scene__sticky hscene">
        <motion.div ref={track} className="hscene__track" style={{ x }}>
          <div className="hscene__rule" aria-hidden="true">
            <motion.div className="hscene__fill" style={{ scaleX: fill }} />
            {steps.map((_, i) => (
              <span
                key={i}
                className={`hscene__node${i < active ? " is-past" : ""}${i === active ? " is-active" : ""}`}
                style={{ left: `calc(${i} * var(--hstep-w))` }}
              />
            ))}
          </div>
          {steps.map((s, i) => (
            <Panel key={s.index} i={i} active={active} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

/** /approach: pinned horizontal walk through the five steps; falls back to the timeline. */
export function ProcessScene() {
  return useScenes() ? (
    <Pinned />
  ) : (
    <div className="ps-container">
      <ProcessSteps />
    </div>
  );
}
