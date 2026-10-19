"use client";

import { motion } from "motion/react";
import { EASE, useReducedMotionSafe } from "@/components/motion/primitives";

/** Footer-width wordmark; letters rise out of a mask one after another. */
export function GiantWordmark({ text, accentFrom }: { text: string; accentFrom?: number }) {
  const reduce = useReducedMotionSafe();
  return (
    <motion.p
      className="giant-wordmark"
      aria-hidden="true"
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
    >
      {text.split("").map((ch, i) => (
        <span key={i} className={`split-mask${accentFrom !== undefined && i >= accentFrom ? " wordmark-accent" : ""}`}>
          <motion.span
            className="inline-block"
            variants={{ hidden: { y: "105%" }, show: { y: "0%" } }}
            transition={{ duration: 1.1, ease: EASE, delay: i * 0.04 }}
          >
            {ch}
          </motion.span>
        </span>
      ))}
    </motion.p>
  );
}
