"use client";

import Link from "next/link";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useState } from "react";
import { projects, sectors, type Sector } from "@/lib/work";
import { EASE, useReducedMotionSafe } from "@/components/motion/primitives";
import { BrowserFrame, Chip } from "./frame";

type Filter = "All" | Sector;

/** Every project, filterable by sector; cards re-flow with layout animation. */
export function WorkGrid() {
  const [filter, setFilter] = useState<Filter>("All");
  const reduce = useReducedMotionSafe();
  const list = filter === "All" ? projects : projects.filter((p) => p.sector === filter);
  const count = (f: Filter) => (f === "All" ? projects.length : projects.filter((p) => p.sector === f).length);

  return (
    <LayoutGroup>
      <div className="work-filter" role="group" aria-label="Filter projects by sector">
        {(["All", ...sectors] as Filter[]).map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            className={`work-filter__btn${filter === f ? " is-active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {filter === f && (
              <motion.span layoutId="work-filter-mark" className="work-filter__mark" transition={{ type: "spring", stiffness: 420, damping: 34 }} />
            )}
            <span className="work-filter__label">{f}</span>
            <span className="work-filter__count">{count(f)}</span>
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {list.length} {list.length === 1 ? "project" : "projects"}
      </p>

      <motion.ul layout={!reduce} className="work-grid">
        <AnimatePresence mode="popLayout" initial={false}>
          {list.map((p, i) => (
            <motion.li
              key={p.slug}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.55, ease: EASE, delay: Math.min(i, 6) * 0.04 }}
            >
              <Link href={`/work/${p.slug}`} className="work-tile frame-hover">
                <BrowserFrame project={p} priority={i < 2} sizes="(max-width: 900px) 92vw, 46vw" />
                <span className="work-tile__body">
                  <span className="work-tile__sector">
                    <Chip colour={p.colour} />
                    {p.sector}
                  </span>
                  <span className="work-tile__name">
                    {p.name}
                    <span className="work-tile__arrow" aria-hidden="true">
                      →
                    </span>
                  </span>
                  <span className="work-tile__summary">{p.summary}</span>
                  <span className="work-tile__services">{p.services.join(" · ")}</span>
                </span>
              </Link>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </LayoutGroup>
  );
}
