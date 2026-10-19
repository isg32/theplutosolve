"use client";

import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { systems } from "@/lib/content";
import { EASE, useReducedMotionSafe } from "@/components/motion/primitives";

/** One flow: nodes build left to right, edges draw between them, then a pass runs to the outcome. */
export function LiveFlow({ nodes, label, live = true }: { nodes: string[]; label: string; live?: boolean }) {
  const reduce = useReducedMotionSafe();
  const step = 0.16;
  return (
    <ol
      className={`ps-flow flow-live${live && !reduce ? " is-looping" : ""}`}
      aria-label={label}
      style={{ "--n": nodes.length } as CSSProperties}
    >
      {nodes.map((n, k) => {
        const last = k === nodes.length - 1;
        return (
          <li key={n} style={{ "--k": k } as CSSProperties}>
            {k > 0 && (
              <motion.span
                className="flow-edge"
                initial={reduce ? false : { scaleX: 0, scaleY: 0 }}
                animate={{ scaleX: 1, scaleY: 1 }}
                transition={{ duration: 0.25, ease: "linear", delay: k * step - 0.1 }}
              />
            )}
            <motion.span
              className={`ps-flow__node${last ? " ps-flow__node--outcome" : ""}`}
              initial={reduce ? false : { opacity: 0, y: 10, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.45, ease: EASE, delay: k * step }}
            >
              {n}
            </motion.span>
          </li>
        );
      })}
    </ol>
  );
}

export function GrowthSystems() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });

  // Keep the active tab centred when the tab row scrolls sideways (phones).
  useEffect(() => {
    const row = tabsRef.current;
    const tab = row?.children[i] as HTMLElement | undefined;
    if (!row || !tab || row.scrollWidth <= row.clientWidth) return;
    row.scrollTo({ left: tab.offsetLeft - (row.clientWidth - tab.offsetWidth) / 2, behavior: "smooth" });
  }, [i]);
  const flows = systems.flows;

  useEffect(() => {
    if (!auto || !inView) return;
    const id = window.setTimeout(() => setI((v) => (v + 1) % flows.length), 6500);
    return () => window.clearTimeout(id);
  }, [auto, inView, i, flows.length]);

  const f = flows[i];
  const go = (d: number) => {
    setAuto(false);
    setI((v) => (v + d + flows.length) % flows.length);
  };
  return (
    <div ref={ref} className="systems">
      <div ref={tabsRef} className="systems__tabs" role="tablist" aria-label="Example growth systems">
        {flows.map((fl, k) => (
          <button
            key={fl.label}
            role="tab"
            id={`sys-tab-${k}`}
            aria-selected={k === i}
            aria-controls="sys-panel"
            className="systems__tab"
            onClick={() => {
              setAuto(false);
              setI(k);
            }}
          >
            <span className="systems__tab-index">{String(k + 1).padStart(2, "0")}</span>
            {fl.label}
            {k === i && (
              <motion.span
                layoutId="sys-tab-mark"
                className="systems__tab-mark"
                transition={{ type: "spring", stiffness: 380, damping: 34 }}
              >
                {auto && inView && (
                  <motion.span
                    key={i}
                    className="systems__tab-timer"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 6.5, ease: "linear" }}
                  />
                )}
              </motion.span>
            )}
          </button>
        ))}
      </div>
      <div id="sys-panel" role="tabpanel" aria-labelledby={`sys-tab-${i}`} className="systems__panel">
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            className="systems__slide"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.4, ease: EASE }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.3}
            dragSnapToOrigin
            onDragEnd={(_, info) => {
              if (info.offset.x < -50 || info.velocity.x < -400) go(1);
              else if (info.offset.x > 50 || info.velocity.x > 400) go(-1);
            }}
          >
            <p className="ps-flow-caption">{f.caption}</p>
            <LiveFlow nodes={f.nodes} label={f.caption} />
          </motion.div>
        </AnimatePresence>
        <p className="systems__hint" aria-hidden="true">
          <span>←</span> Swipe <span>→</span>
        </p>
      </div>
    </div>
  );
}
