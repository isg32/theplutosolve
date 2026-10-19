"use client";

import { motion } from "motion/react";
import { EASE, useReducedMotionSafe } from "@/components/motion/primitives";

/** Closing statement: the hairline draws left to right, then each line rises in. */
export function StatementReveal({ lines, className = "" }: { lines: string[]; className?: string }) {
  const reduce = useReducedMotionSafe();
  return (
    <motion.div
      className={`statement ${className}`}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
    >
      <motion.div
        className="statement-rule"
        variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1 } }}
        transition={{ duration: 1.1, ease: EASE }}
      />
      <p className="ps-statement">
        {lines.map((l, i) => (
          <motion.span
            key={i}
            variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.35 + i * 0.15 }}
          >
            {l}
          </motion.span>
        ))}
      </p>
    </motion.div>
  );
}
