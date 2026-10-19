"use client";

import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "motion/react";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";

export const EASE = [0.22, 1, 0.36, 1] as const;

type Tag = "div" | "section" | "header" | "p" | "span" | "li" | "ul" | "ol" | "article";

/** Fade and rise into view once. */
export function Reveal({
  children,
  as = "div",
  delay = 0,
  y = 28,
  amount = 0.25,
  className,
}: {
  children: ReactNode;
  as?: Tag;
  delay?: number;
  y?: number;
  amount?: number;
  className?: string;
}) {
  const reduce = useReducedMotionSafe();
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </Comp>
  );
}

const staggerParent: Variants = {
  hidden: {},
  show: (stagger: number = 0.08) => ({ transition: { staggerChildren: stagger } }),
};

const staggerChild: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

/** Parent that staggers its StaggerItem children into view. */
export function Stagger({
  children,
  as = "div",
  stagger = 0.08,
  amount = 0.2,
  className,
}: {
  children: ReactNode;
  as?: Tag;
  stagger?: number;
  amount?: number;
  className?: string;
}) {
  const reduce = useReducedMotionSafe();
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      variants={staggerParent}
      custom={stagger}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {children}
    </Comp>
  );
}

export function StaggerItem({
  children,
  as = "div",
  className,
}: {
  children: ReactNode;
  as?: Tag;
  className?: string;
}) {
  const Comp = motion[as];
  return (
    <Comp className={className} variants={staggerChild}>
      {children}
    </Comp>
  );
}

/** Headline whose words rise out of a mask, line by line. */
export function SplitHeadline({
  lines,
  as = "h2",
  className,
  delay = 0,
  onMount = false,
}: {
  lines: string[];
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
  onMount?: boolean;
}) {
  const reduce = useReducedMotionSafe();
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const show = onMount || inView;
  const Tag = as;
  let w = 0;
  return (
    <Tag ref={ref} className={className} aria-label={lines.join(" ")}>
      {lines.map((line, li) => (
        <span key={li} className="block" aria-hidden="true">
          {line.split(" ").map((word, wi) => {
            const i = w++;
            return (
              <span key={wi}>
                <span className="split-mask">
                  <motion.span
                    className="inline-block"
                    initial={reduce ? false : { y: "110%" }}
                    animate={show ? { y: "0%" } : undefined}
                    transition={{ duration: 1, ease: EASE, delay: delay + i * 0.055 }}
                  >
                    {word}
                  </motion.span>
                </span>{" "}
              </span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}

/** Vertical parallax drift tied to the element's pass through the viewport. */
export function Parallax({
  children,
  offset = 80,
  className,
}: {
  children: ReactNode;
  offset?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [offset, -offset]);
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

/** Two-digit index that counts up from 00 when it enters the viewport. */
export function CountUp({ to, className }: { to: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotionSafe();
  // Starts at 00 on server and client alike; reduced motion jumps straight to the value.
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const dur = reduce ? 0 : 700;
    const tick = (t: number) => {
      const p = dur ? Math.min(1, (t - start) / dur) : 1;
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, to]);
  return (
    <span ref={ref} className={className} aria-label={String(to).padStart(2, "0")}>
      <span aria-hidden="true">{String(n).padStart(2, "0")}</span>
    </span>
  );
}

/** Pulls its child slightly towards the pointer. */
export function Magnetic({ children, strength = 0.3 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotionSafe();
  const x = useSpring(0, { stiffness: 220, damping: 18, mass: 0.6 });
  const y = useSpring(0, { stiffness: 220, damping: 18, mass: 0.6 });
  return (
    <motion.div
      ref={ref}
      className="inline-block"
      style={{ x, y }}
      whileTap={reduce ? undefined : { scale: 0.96 }}
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/** SSR-safe media query; false on the server. */
export function useMedia(query: string) {
  const subscribe = useCallback(
    (cb: () => void) => {
      const m = window.matchMedia(query);
      m.addEventListener("change", cb);
      return () => m.removeEventListener("change", cb);
    },
    [query],
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/**
 * Hydration-safe reduced-motion flag: false while hydrating (matching the
 * server render), then the visitor's real preference.
 */
export function useReducedMotionSafe() {
  return useMedia("(prefers-reduced-motion: reduce)");
}

/** True when pinned, scroll-driven scenes should run (motion allowed; each scene picks its own phone layout). */
export function useScenes() {
  return !useReducedMotionSafe();
}

/** Phone-width layout for scenes and art. */
export function useCompact() {
  return useMedia("(max-width: 899px)");
}
