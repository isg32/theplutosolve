"use client";

import { useEffect, useRef } from "react";

/*
  Generative "growth system" artwork on canvas, built from the cover's grammar:
  a dot grid, orthogonal hairline edges, ink nodes, an inverse slab, a signal
  block and one signal path. Edges draw in on load, then pulses travel along
  them into the outcome; the pointer pulls and lights nearby dots.
*/

type Pt = [number, number];
type Path = { pts: Pt[]; segs: number[]; len: number; delay: number; main?: boolean };
type Rect = { x: number; y: number; w: number; h: number };
type Model = {
  w: number;
  h: number;
  P: number;
  dots: Pt[];
  paths: Path[];
  nodes: { p: Pt; at: number; main?: boolean }[];
  slab?: Rect;
  signal?: Rect;
  tint?: Rect;
  outcome: Pt;
};
type Colors = Record<"ink" | "inkInverse" | "lineStrong" | "signal" | "onSignal" | "surfaceInverse", string>;

function rng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function makePath(pts: Pt[], delay: number, main = false): Path {
  const clean = pts.filter((p, i) => i === 0 || p[0] !== pts[i - 1][0] || p[1] !== pts[i - 1][1]);
  const segs = clean.slice(1).map((p, i) => Math.hypot(p[0] - clean[i][0], p[1] - clean[i][1]));
  return { pts: clean, segs, len: segs.reduce((a, b) => a + b, 0), delay, main };
}

function build(w: number, h: number, variant: "hero" | "quiet"): Model {
  const P = w < 640 ? 40 : 48;
  const C = Math.floor(w / P);
  const R = Math.floor(h / P);
  const cx = (c: number) => c * P + P / 2;
  const cy = (r: number) => r * P + P / 2;
  const rand = rng(variant === "hero" ? 7 : 19);

  const dots: Pt[] = [];
  for (let r = 0; r <= R; r++) for (let c = 0; c <= C; c++) dots.push([cx(c), cy(r)]);

  const paths: Path[] = [];
  const nodes: Model["nodes"] = [];

  if (variant === "hero") {
    const sw = C >= 14 ? 6 : 4;
    const tc1 = C;
    const tc0 = C - 2;
    const bc0 = tc0 - 2;
    const sc1 = bc0;
    const sc0 = Math.max(0, sc1 - sw);
    const br0 = Math.max(2, Math.floor(R * 0.45));
    const slab = { x: sc0 * P, y: -P, w: (sc1 - sc0) * P, h: h + 2 * P };
    const signal = { x: bc0 * P, y: br0 * P, w: 2 * P, h: h - br0 * P + P };
    const tint = { x: tc0 * P, y: 0, w: (tc1 - tc0) * P, h: 2 * P };
    const oy = cy(br0 + 1);
    const outcome: Pt = [bc0 * P, oy];

    const count = C >= 14 ? 9 : 6;
    const minC = Math.max(0, sc0 - 6);
    const used = new Set<string>();
    for (let i = 0; i < count; i++) {
      let c = 0;
      let r = 0;
      for (let tries = 0; tries < 20; tries++) {
        c = minC + Math.floor(rand() * (sc1 - 1 - minC));
        r = 1 + Math.floor(rand() * Math.max(1, R - 2));
        if (!used.has(`${c},${r}`) && r !== br0 + 1 && r !== 1) break;
      }
      used.add(`${c},${r}`);
      const jc = Math.max(c + 1, sc0) + Math.floor(rand() * Math.max(1, sc1 - Math.max(c + 1, sc0)));
      const start: Pt = [cx(c), cy(r)];
      const p = makePath([start, [cx(Math.min(jc, sc1 - 1)), cy(r)], [cx(Math.min(jc, sc1 - 1)), oy], outcome], i * 0.09);
      paths.push(p);
      nodes.push({ p: start, at: i * 0.09 });
    }
    // The cover's signal path: two corners inside the slab, then out into the signal block.
    const a: Pt = [cx(sc0 + 1), cy(1)];
    const b: Pt = [cx(Math.min(sc0 + 3, sc1 - 1)), cy(1)];
    const c2: Pt = [b[0], oy];
    paths.push(makePath([a, b, c2, outcome], 0.5, true));
    nodes.push({ p: a, at: 0.5, main: true }, { p: b, at: 0.7, main: true }, { p: c2, at: 0.9, main: true });
    return { w, h, P, dots, paths, nodes, slab, signal, tint, outcome };
  }

  // Quiet: sources across the left, converging on one signal node at the right.
  const oc = Math.max(3, C - 2);
  const or = Math.floor(R / 2);
  const outcome: Pt = [cx(oc), cy(or)];
  const count = C >= 14 ? 7 : 4;
  for (let i = 0; i < count; i++) {
    const c = Math.floor(rand() * (oc - 3));
    const r = Math.floor(rand() * (R + 1));
    const jc = c + 1 + Math.floor(rand() * Math.max(1, oc - c - 2));
    const start: Pt = [cx(c), cy(r)];
    paths.push(makePath([start, [cx(jc), cy(r)], [cx(jc), cy(or)], outcome], i * 0.12));
    nodes.push({ p: start, at: i * 0.12 });
  }
  return { w, h, P, dots, paths, nodes, outcome };
}

function pointAt(p: Path, s: number): Pt {
  let d = s;
  for (let i = 0; i < p.segs.length; i++) {
    if (d <= p.segs[i]) {
      const t = p.segs[i] ? d / p.segs[i] : 0;
      const [x0, y0] = p.pts[i];
      const [x1, y1] = p.pts[i + 1];
      return [x0 + (x1 - x0) * t, y0 + (y1 - y0) * t];
    }
    d -= p.segs[i];
  }
  return p.pts[p.pts.length - 1];
}

function tracePartial(ctx: CanvasRenderingContext2D, p: Path, s: number) {
  ctx.moveTo(p.pts[0][0], p.pts[0][1]);
  let d = s;
  for (let i = 0; i < p.segs.length; i++) {
    if (d >= p.segs[i]) {
      ctx.lineTo(p.pts[i + 1][0], p.pts[i + 1][1]);
      d -= p.segs[i];
    } else {
      const [x, y] = pointAt(p, s);
      ctx.lineTo(x, y);
      return;
    }
  }
}

const clamp = (v: number) => Math.max(0, Math.min(1, v));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

function readColors(): Colors {
  const s = getComputedStyle(document.documentElement);
  const v = (n: string) => s.getPropertyValue(n).trim();
  return {
    ink: v("--ink"),
    inkInverse: v("--ink-inverse"),
    lineStrong: v("--line-strong"),
    signal: v("--signal"),
    onSignal: v("--on-signal"),
    surfaceInverse: v("--surface-inverse"),
  };
}

export function SystemField({
  variant = "hero",
  className = "",
}: {
  variant?: "hero" | "quiet";
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let colors = readColors();
    let model: Model | null = null;
    let dpr = 1;
    let start = performance.now();
    let raf = 0;
    let visible = false;
    let started = false;
    let lastSpawn = 0;
    const pointer = { x: -9999, y: -9999, k: 0 };
    // Touch screens have no hover, so a slow "scanner" sweeps the field instead.
    const touch = window.matchMedia("(hover: none)").matches;
    let pulses: { path: Path; s: number; v: number }[] = [];
    let ripples: number[] = [];
    let taps: { x: number; y: number; t: number }[] = [];

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(r.width * dpr);
      canvas.height = Math.round(r.height * dpr);
      model = build(r.width, r.height, variant);
      pulses = [];
      if (reduce) draw(Infinity, 0);
    };

    const drawLayer = (m: Model, t: number, inside: boolean) => {
      const dot = colors.lineStrong;
      const node = inside ? colors.inkInverse : colors.ink;
      // Dots, pulled toward and enlarged near the pointer.
      for (const [x, y] of m.dots) {
        const a = clamp((t - 200 - (x + y) * 0.35) / 500);
        if (a <= 0) continue;
        const dx = pointer.x - x;
        const dy = pointer.y - y;
        const d = Math.hypot(dx, dy);
        const f = d < 160 ? (1 - d / 160) * pointer.k : 0;
        ctx.globalAlpha = a * (inside ? 0.9 : 0.55 + f * 0.45);
        ctx.fillStyle = f > 0.35 && !inside ? colors.ink : dot;
        const rad = 1.4 + f * 1.8;
        ctx.beginPath();
        ctx.arc(x + dx * f * 0.06, y + dy * f * 0.06, rad, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      // Edges.
      ctx.strokeStyle = colors.lineStrong;
      ctx.lineWidth = 1;
      for (const p of m.paths) {
        if (p.main) continue;
        const prog = easeOut(clamp((t - 700 - p.delay * 1000) / 1100));
        if (prog <= 0) continue;
        ctx.beginPath();
        tracePartial(ctx, p, p.len * prog);
        ctx.stroke();
      }
      // Source nodes.
      for (const n of m.nodes) {
        if (n.main) continue;
        const sc = easeOut(clamp((t - 700 - n.at * 1000) / 400));
        if (sc <= 0) continue;
        const near = Math.hypot(pointer.x - n.p[0], pointer.y - n.p[1]) < 60 ? pointer.k : 0;
        const s = (5 + near * 3) * sc;
        ctx.fillStyle = node;
        ctx.fillRect(n.p[0] - s, n.p[1] - s, s * 2, s * 2);
        if (near) {
          ctx.strokeStyle = node;
          ctx.globalAlpha = near;
          ctx.strokeRect(n.p[0] - s - 5, n.p[1] - s - 5, s * 2 + 10, s * 2 + 10);
          ctx.globalAlpha = 1;
        }
      }
      // Pulses.
      ctx.fillStyle = node;
      for (const q of pulses) {
        if (q.path.main) continue;
        const [x, y] = pointAt(q.path, q.s);
        ctx.fillRect(x - 2.5, y - 2.5, 5, 5);
      }
    };

    const draw = (t: number, dt: number) => {
      const m = model;
      if (!m) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, m.w, m.h);

      const blockP = easeOut(clamp(t / 1100));
      if (m.tint) {
        ctx.globalAlpha = clamp((t - 500) / 600);
        ctx.fillStyle = colors.lineStrong;
        ctx.fillRect(m.tint.x, m.tint.y, m.tint.w, m.tint.h);
        ctx.globalAlpha = 1;
      }
      if (m.signal) {
        const hh = m.signal.h * easeOut(clamp((t - 250) / 1000));
        ctx.fillStyle = colors.signal;
        ctx.fillRect(m.signal.x, m.signal.y + m.signal.h - hh, m.signal.w, hh);
      }

      // Outside the slab.
      ctx.save();
      if (m.slab) {
        ctx.beginPath();
        ctx.rect(0, 0, m.w, m.h);
        ctx.rect(m.slab.x, m.slab.y, m.slab.w, m.slab.h * blockP);
        ctx.clip("evenodd");
      }
      drawLayer(m, t, false);
      ctx.restore();

      // Inside the slab, which grows down from the top.
      if (m.slab) {
        ctx.save();
        ctx.fillStyle = colors.surfaceInverse;
        ctx.fillRect(m.slab.x, m.slab.y, m.slab.w, m.slab.h * blockP);
        ctx.beginPath();
        ctx.rect(m.slab.x, m.slab.y, m.slab.w, m.slab.h * blockP);
        ctx.clip();
        drawLayer(m, t, true);
        ctx.restore();
      }

      // The signal path and its nodes.
      ctx.strokeStyle = colors.signal;
      ctx.fillStyle = colors.signal;
      ctx.lineWidth = 2;
      for (const p of m.paths) {
        if (!p.main) continue;
        const prog = easeOut(clamp((t - 1100) / 1200));
        if (prog <= 0) continue;
        ctx.beginPath();
        tracePartial(ctx, p, p.len * prog);
        ctx.stroke();
      }
      for (const n of m.nodes) {
        if (!n.main) continue;
        const sc = easeOut(clamp((t - 1100 - (n.at - 0.5) * 1200) / 350));
        if (sc <= 0) continue;
        ctx.beginPath();
        ctx.arc(n.p[0], n.p[1], 6 * sc, 0, Math.PI * 2);
        ctx.fill();
      }
      for (const q of pulses) {
        if (!q.path.main) continue;
        const [x, y] = pointAt(q.path, q.s);
        ctx.beginPath();
        ctx.arc(x, y, 3.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Outcome: a signal node (quiet) and rippling squares on arrival.
      const [ox, oy] = m.outcome;
      if (!m.signal) {
        const sc = easeOut(clamp((t - 900) / 500));
        ctx.fillStyle = colors.signal;
        ctx.fillRect(ox - 8 * sc, oy - 8 * sc, 16 * sc, 16 * sc);
      }
      ctx.lineWidth = 1;
      ripples = ripples.filter((r) => t - r < 900);
      for (const r of ripples) {
        const k = (t - r) / 900;
        const s = 8 + k * 36;
        ctx.globalAlpha = 1 - k;
        ctx.strokeStyle = m.signal ? colors.onSignal : colors.signal;
        ctx.strokeRect(ox - s, oy - s, s * 2, s * 2);
      }
      taps = taps.filter((tp) => t - tp.t < 1100);
      // Signal reads on the surface and on the slab, in both themes.
      ctx.strokeStyle = colors.signal;
      for (const tp of taps) {
        const k = (t - tp.t) / 1100;
        const e = easeOut(k);
        ctx.globalAlpha = (1 - k) * 0.9;
        for (const m2 of [1, 0.55]) {
          const s = (10 + e * 90) * m2;
          ctx.strokeRect(tp.x - s, tp.y - s, s * 2, s * 2);
        }
      }
      ctx.globalAlpha = 1;

      // Advance pulses.
      if (dt > 0 && t > 2200) {
        if (t - lastSpawn > (variant === "hero" ? 420 : 900)) {
          lastSpawn = t;
          const p = m.paths[Math.floor(Math.random() * m.paths.length)];
          pulses.push({ path: p, s: 0, v: 0.16 + Math.random() * 0.1 });
        }
        for (const q of pulses) q.s += q.v * dt;
        const arrived = pulses.filter((q) => q.s >= q.path.len);
        if (arrived.length) ripples.push(...arrived.map(() => t));
        pulses = pulses.filter((q) => q.s < q.path.len);
      }
    };

    let prev = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(50, now - prev);
      prev = now;
      const t = now - start;
      if (touch && model && t > 2400) {
        // Lissajous sweep across the field.
        const k = (t - 2400) / 1000;
        pointer.x = model.w * (0.5 + 0.38 * Math.sin(k * 0.42));
        pointer.y = model.h * (0.5 + 0.36 * Math.sin(k * 0.61 + 1.2));
      }
      pointer.k += ((pointer.x > -999 ? (touch ? 0.85 : 1) : 0) - pointer.k) * 0.08;
      draw(t, dt);
      raf = visible && !document.hidden ? requestAnimationFrame(loop) : 0;
    };
    const play = () => {
      if (reduce || raf) return;
      prev = performance.now();
      raf = requestAnimationFrame(loop);
    };

    const ro = new ResizeObserver(() => {
      resize();
      play();
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        if (visible && !started) {
          started = true;
          start = performance.now();
        }
        if (visible) play();
      },
      { threshold: 0.15 },
    );
    io.observe(canvas);
    const mo = new MutationObserver(() => {
      colors = readColors();
      if (reduce) draw(Infinity, 0);
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const onVis = () => !document.hidden && play();
    document.addEventListener("visibilitychange", onVis);

    const host = canvas.parentElement ?? canvas;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = canvas.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
    };
    const onLeave = () => {
      if (touch) return;
      pointer.x = -9999;
      pointer.y = -9999;
    };
    const onDown = (e: PointerEvent) => {
      if (!model || reduce) return;
      const r = canvas.getBoundingClientRect();
      const t = performance.now() - start;
      taps.push({ x: e.clientX - r.left, y: e.clientY - r.top, t });
      for (const p of model.paths) pulses.push({ path: p, s: 0, v: 0.32 + Math.random() * 0.08 });
    };
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    host.addEventListener("pointerdown", onDown);

    resize();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      host.removeEventListener("pointerdown", onDown);
    };
  }, [variant]);

  return <canvas ref={ref} className={`system-field ${className}`} aria-hidden="true" />;
}
