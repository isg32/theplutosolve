"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "motion/react";
import { useEffect, useState } from "react";
import { brand, ctas, nav } from "@/lib/content";
import { EASE, useReducedMotionSafe } from "@/components/motion/primitives";
import { ThemeToggle } from "./theme-toggle";

export function SiteNav() {
  const pathname = usePathname();
  const reduce = useReducedMotionSafe();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [hover, setHover] = useState<string | null>(null);
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  useMotionValueEvent(scrollY, "change", (v) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(v > prev && v > 200);
  });

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const active = nav.find((n) => pathname.startsWith(n.href))?.href ?? null;
  const marked = hover ?? active;

  return (
    <>
      <motion.header
        className="site-header"
        animate={{ y: hidden && !open ? "-100%" : "0%" }}
        transition={{ duration: reduce ? 0 : 0.45, ease: EASE }}
      >
        <nav className="ps-container site-nav" aria-label="Main">
          <Link className="ps-wordmark" href="/" onClick={() => setOpen(false)}>
            {brand.name}
          </Link>
          <ul onPointerLeave={() => setHover(null)}>
            {nav.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  aria-current={active === n.href ? "page" : undefined}
                  onPointerEnter={() => setHover(n.href)}
                >
                  {n.label}
                  {marked === n.href && (
                    <motion.span
                      layoutId="nav-mark"
                      className="nav-mark"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
          <div className="site-nav__end">
            <ThemeToggle />
            <Link className="ps-btn ps-btn--primary ps-btn--sm site-nav__cta" href={ctas.build.href}>
              {ctas.build.label} <span className="ps-arrow" aria-hidden="true">→</span>
            </Link>
            <button
              type="button"
              className="menu-toggle"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </nav>
        <motion.div className="scroll-progress" style={{ scaleX: progress }} aria-hidden="true" />
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="mobile-menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: reduce ? 0 : 0.6, ease: EASE }}
          >
            <div className="ps-container">
              <ol>
                {nav.map((n, i) => (
                  <motion.li
                    key={n.href}
                    initial={{ opacity: 0, y: 32 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: EASE, delay: 0.15 + i * 0.05 }}
                  >
                    <Link
                      href={n.href}
                      onClick={() => setOpen(false)}
                      aria-current={active === n.href ? "page" : undefined}
                    >
                      <span className="mobile-menu__index">{String(i + 1).padStart(2, "0")}</span>
                      {n.label}
                    </Link>
                  </motion.li>
                ))}
              </ol>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mobile-menu__foot"
              >
                <Link className="ps-btn ps-btn--primary" href={ctas.build.href} onClick={() => setOpen(false)}>
                  {ctas.build.label} <span className="ps-arrow" aria-hidden="true">→</span>
                </Link>
                <p className="ps-eyebrow">
                  {brand.descriptor.map((d, i) => (
                    <span key={d}>
                      {i > 0 && <span className="ps-x">×</span>}
                      {d}
                    </span>
                  ))}
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
