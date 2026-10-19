"use client";

import { motion } from "motion/react";
import { useReducedMotionSafe } from "@/components/motion/primitives";
import { useEffect, useSyncExternalStore } from "react";

type Theme = "light" | "dark";

function subscribe(cb: () => void) {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
}

const read = (): Theme => (document.documentElement.dataset.theme === "dark" ? "dark" : "light");

function storedTheme() {
  try {
    return localStorage.getItem("theme");
  } catch {
    return null;
  }
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, read, () => null);
  const reduce = useReducedMotionSafe();

  // Keep following the OS until the visitor picks a theme.
  useEffect(() => {
    const m = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (!storedTheme()) document.documentElement.dataset.theme = m.matches ? "dark" : "light";
    };
    m.addEventListener("change", onChange);
    return () => m.removeEventListener("change", onChange);
  }, []);

  const toggle = () => {
    const next: Theme = read() === "dark" ? "light" : "dark";
    const apply = () => {
      document.documentElement.dataset.theme = next;
      try {
        localStorage.setItem("theme", next);
      } catch {}
    };
    if (!document.startViewTransition || reduce) return apply();
    const vt = document.startViewTransition(apply);
    vt.ready.then(() => {
      document.documentElement.animate(
        { clipPath: ["inset(0 0 100% 0)", "inset(0 0 0% 0)"] },
        {
          duration: 750,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    });
  };

  const label = theme === "dark" ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button type="button" className="theme-toggle" onClick={toggle} aria-label={label} title={label}>
      <motion.svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        aria-hidden="true"
        animate={{ rotate: theme === "dark" ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <rect x="1.5" y="1.5" width="15" height="15" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M1.5 16.5 L16.5 1.5 L16.5 16.5 Z" fill="currentColor" />
      </motion.svg>
    </button>
  );
}
