"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { testimonials, testimonialsIntro } from "@/lib/people";
import { EASE, Reveal, SplitHeadline, useReducedMotionSafe } from "@/components/motion/primitives";

const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

function Avatar({ name, photo, size = 56 }: { name: string; photo?: string; size?: number }) {
  return photo ? (
    <Image src={photo} width={size} height={size} alt="" className="avatar" />
  ) : (
    <span className="avatar avatar--initials" style={{ width: size, height: size }} aria-hidden="true">
      {initials(name)}
    </span>
  );
}

/** One quote at a time; advances on its own until the visitor takes over. */
export function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [auto, setAuto] = useState(true);
  const reduce = useReducedMotionSafe();
  const ref = useRef<HTMLDivElement>(null);
  const t = testimonials[i];

  useEffect(() => {
    if (!auto || paused || reduce) return;
    const id = window.setTimeout(() => setI((v) => (v + 1) % testimonials.length), 8000);
    return () => window.clearTimeout(id);
  }, [i, auto, paused, reduce]);

  const go = (n: number) => {
    setAuto(false);
    setI((n + testimonials.length) % testimonials.length);
  };

  return (
    <div
      ref={ref}
      className="quotes"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <header className="quotes__head">
        <Reveal y={10}>
          <p className="ps-eyebrow">{testimonialsIntro.eyebrow}</p>
        </Reveal>
        <SplitHeadline lines={[testimonialsIntro.headline]} className="ps-h1" />
      </header>

      <div className="quotes__stage" aria-live={auto ? "off" : "polite"}>
        <span className="quotes__mark" aria-hidden="true">
          “
        </span>
        <AnimatePresence mode="wait" initial={false}>
          <motion.figure
            key={i}
            className="quotes__figure"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -16 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <blockquote className="quotes__quote">{t.quote}</blockquote>
            <figcaption className="quotes__who">
              <Avatar name={t.name} photo={t.photo} />
              <span>
                <span className="quotes__name">{t.name}</span>
                <span className="quotes__role">{t.role}</span>
              </span>
              <span className="quotes__service">
                {t.project ? <Link href={`/work/${t.project}`}>{t.service}</Link> : t.service}
              </span>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      <div className="quotes__nav">
        <ol className="quotes__people" aria-label="Choose a testimonial">
          {testimonials.map((q, k) => (
            <li key={q.name}>
              <button
                type="button"
                className={`quotes__person${k === i ? " is-active" : ""}`}
                aria-pressed={k === i}
                aria-label={`${q.name}, ${q.role}`}
                onClick={() => go(k)}
              >
                <Avatar name={q.name} photo={q.photo} size={36} />
                {k === i && auto && !paused && !reduce && (
                  <motion.span
                    key={`timer-${i}`}
                    className="quotes__timer"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 8, ease: "linear" }}
                  />
                )}
              </button>
            </li>
          ))}
        </ol>
        <div className="quotes__arrows">
          <button type="button" className="quotes__arrow" onClick={() => go(i - 1)} aria-label="Previous testimonial">
            ←
          </button>
          <button type="button" className="quotes__arrow" onClick={() => go(i + 1)} aria-label="Next testimonial">
            →
          </button>
        </div>
      </div>
    </div>
  );
}
