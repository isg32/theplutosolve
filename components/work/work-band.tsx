"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { projects, workBand, type Project } from "@/lib/work";
import { ctas } from "@/lib/content";
import { EASE, Magnetic, Reveal, SplitHeadline, useCompact, useReducedMotionSafe } from "@/components/motion/primitives";
import { BrowserFrame, Chip } from "./frame";

const featured = projects.filter((p) => p.featured);

function Card({ project, priority = false }: { project: Project; priority?: boolean }) {
  return (
    <Link href={`/work/${project.slug}`} className="work-card frame-hover">
      <BrowserFrame project={project} priority={priority} sizes="(max-width: 900px) 80vw, 30vw" />
      <span className="work-card__meta">
        <Chip colour={project.colour} />
        <span className="work-card__name">{project.name}</span>
        <span className="work-card__kind">{project.kind}</span>
      </span>
    </Link>
  );
}

/** Homepage feature: a warm band of real projects drifting past at two speeds. */
export function WorkBand() {
  const ref = useRef<HTMLElement>(null);
  const compact = useCompact();
  const reduce = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const drift = !compact && !reduce;
  const yA = useTransform(scrollYProgress, [0, 1], drift ? [80, -160] : [0, 0]);
  const yB = useTransform(scrollYProgress, [0, 1], drift ? [220, -60] : [0, 0]);

  const colA = featured.filter((_, i) => i % 2 === 0);
  const colB = featured.filter((_, i) => i % 2 === 1);

  return (
    <section ref={ref} className="work-band" aria-label={workBand.eyebrow}>
      <div className="work-band__grain" aria-hidden="true" />
      <div className="ps-container work-band__inner">
        <div className="work-band__copy">
          <Reveal y={10}>
            <p className="ps-eyebrow">{workBand.eyebrow}</p>
          </Reveal>
          <SplitHeadline lines={workBand.headline} className="ps-h1" />
          <Reveal delay={0.25}>
            <p className="ps-lead">{workBand.lead}</p>
          </Reveal>
          <motion.ul
            className="work-band__palette"
            aria-label="Our clients' colours"
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.6 }}
          >
            {projects.map((p, i) => (
              <motion.li
                key={p.slug}
                title={p.name}
                style={{ background: p.colour }}
                variants={{
                  hidden: { scale: 0, rotate: -45 },
                  show: { scale: 1, rotate: 0, transition: { duration: 0.5, ease: EASE, delay: 0.3 + i * 0.04 } },
                }}
              />
            ))}
          </motion.ul>
          <Reveal delay={0.4} className="work-band__cta">
            <Magnetic>
              <Link className="ps-btn ps-btn--primary" href="/work">
                {ctas.built.label} <span className="ps-arrow" aria-hidden="true">→</span>
              </Link>
            </Magnetic>
            <span className="work-band__count">{projects.length} projects</span>
          </Reveal>
        </div>

        {compact ? (
          <ul className="work-rail" aria-label="Selected projects">
            {featured.map((p, i) => (
              <li key={p.slug}>
                <Card project={p} priority={i === 0} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="work-band__cols">
            <motion.ul style={{ y: yA }} className="work-band__col">
              {colA.map((p) => (
                <li key={p.slug}>
                  <Card project={p} />
                </li>
              ))}
            </motion.ul>
            <motion.ul style={{ y: yB }} className="work-band__col">
              {colB.map((p) => (
                <li key={p.slug}>
                  <Card project={p} />
                </li>
              ))}
            </motion.ul>
          </div>
        )}
      </div>
    </section>
  );
}
