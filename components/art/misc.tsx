"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { brand, vision } from "@/lib/content";
import { EASE, useMedia, useReducedMotionSafe } from "@/components/motion/primitives";
import { SystemField } from "./system-field";

/** Hero artwork: the system field, drifting down and fading as the page scrolls. */
export function HeroArt() {
  const reduce = useReducedMotionSafe();
  // Below 1100px the art stacks under the copy, so it shouldn't fade away on scroll.
  const beside = useMedia("(min-width: 1101px)");
  const drift = beside && !reduce;
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], drift ? [0, 200] : [0, 0]);
  const opacity = useTransform(scrollY, [0, 700], drift ? [1, 0.25] : [1, 1]);
  return (
    <motion.div className="hero__art" style={{ y, opacity }}>
      <SystemField variant="hero" />
    </motion.div>
  );
}

/** The descriptor eyebrow; each × turns into place. */
export function Descriptor() {
  const reduce = useReducedMotionSafe();
  return (
    <p className="ps-eyebrow" aria-label={brand.descriptor.join(" × ")}>
      {brand.descriptor.map((d, i) => (
        <span key={d} aria-hidden="true">
          {i > 0 && (
            <motion.span
              className="ps-x inline-block"
              initial={reduce ? false : { rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.2 + i * 0.12 }}
            >
              ×
            </motion.span>
          )}
          <motion.span
            className="inline-block"
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: i * 0.12 }}
          >
            {d}
          </motion.span>
        </span>
      ))}
    </p>
  );
}

/** Client names stagger in under a hairline that sweeps across. */
export function ClientStrip({ eyebrow, names, label }: { eyebrow?: string; names: string[]; label?: string }) {
  const reduce = useReducedMotionSafe();
  return (
    <motion.section
      className="ps-clients client-strip"
      aria-label={eyebrow ?? label}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
    >
      <motion.span
        className="client-strip__sweep"
        variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1 } }}
        transition={{ duration: 1.4, ease: EASE }}
      />
      {eyebrow && <p className="ps-eyebrow">{eyebrow}</p>}
      <ul>
        {names.map((n, i) => (
          <motion.li
            key={n}
            variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.3 + i * 0.07 }}
          >
            {n}
          </motion.li>
        ))}
      </ul>
    </motion.section>
  );
}

/** Vision roles: Marketing —generates→ demand, one row at a time. */
export function VisionFlow() {
  const reduce = useReducedMotionSafe();
  return (
    <motion.ol
      className="vision-flow"
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      {vision.roles.map((r, i) => (
        <li key={r.from}>
          <span className="sr-only">{`${r.from} ${r.verb} ${r.to}.`}</span>
          <span aria-hidden="true" className="vision-flow__row">
            <motion.span
              className="ps-flow__node"
              variants={{ hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0 } }}
              transition={{ duration: 0.5, ease: EASE, delay: i * 0.22 }}
            >
              {r.from}
            </motion.span>
            <span className="vision-flow__edge">
              <motion.span
                className="vision-flow__line"
                variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1 } }}
                transition={{ duration: 0.5, ease: "linear", delay: 0.2 + i * 0.22 }}
              />
              <motion.span
                className="vision-flow__verb"
                variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
                transition={{ duration: 0.4, delay: 0.35 + i * 0.22 }}
              >
                {r.verb}
              </motion.span>
            </span>
            <motion.span
              className="vision-flow__to"
              variants={{ hidden: { opacity: 0, x: 12 }, show: { opacity: 1, x: 0 } }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.55 + i * 0.22 }}
            >
              {r.to}
            </motion.span>
          </span>
        </li>
      ))}
    </motion.ol>
  );
}
