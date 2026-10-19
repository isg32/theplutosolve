"use client";

import { useEffect, useRef } from "react";

/*
  A small, genuinely rotating Pluto. A procedural map of the dwarf planet
  (tan plains, the dark rust Cthulhu Macula band, the pale lopsided heart of
  Tombaugh Regio, a lighter northern cap) is wrapped onto a sphere with an
  orthographic projection and lit from the upper left, then turned frame by
  frame. Charon (grey, with its reddish Mordor Macula cap) can orbit it.
  Pauses off-screen; with reduced motion it rests with the heart facing you.
  Decorative only.
*/

type Tex = { w: number; h: number; rgb: Uint8ClampedArray };

const TW = 256;
const TH = 128;

/* ---------- Procedural textures (built once, shared) ---------- */

function hash(i: number, j: number, seed: number) {
  let h = (i * 374761393 + j * 668265263 + seed * 2147483647) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}

/** Value noise, periodic in u (longitude) so the map wraps seamlessly. */
function noise(u: number, v: number, gx: number, gy: number, seed: number) {
  const x = u * gx;
  const y = v * gy;
  const i = Math.floor(x);
  const j = Math.floor(y);
  const fx = x - i;
  const fy = y - j;
  const sx = fx * fx * (3 - 2 * fx);
  const sy = fy * fy * (3 - 2 * fy);
  const w = (k: number) => ((k % gx) + gx) % gx;
  const a = hash(w(i), j, seed);
  const b = hash(w(i + 1), j, seed);
  const c = hash(w(i), j + 1, seed);
  const d = hash(w(i + 1), j + 1, seed);
  return a + (b - a) * sx + (c - a) * sy + (a - b - c + d) * sx * sy;
}

function fbm(u: number, v: number, seed: number) {
  let t = 0;
  let amp = 0.5;
  let gx = 8;
  let gy = 4;
  for (let o = 0; o < 4; o++) {
    t += amp * noise(u, v, gx, gy, seed + o);
    amp *= 0.5;
    gx *= 2;
    gy *= 2;
  }
  return t / 0.9375;
}

const smooth = (a: number, b: number, x: number) => {
  const t = Math.max(0, Math.min(1, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};
const mix = (a: number[], b: number[], t: number) => a.map((v, i) => v + (b[i] - v) * t);

function buildTexture(paint: (lon: number, lat: number, u: number, v: number) => number[]): Tex {
  const rgb = new Uint8ClampedArray(TW * TH * 3);
  for (let y = 0; y < TH; y++) {
    const v = (y + 0.5) / TH;
    const lat = 90 - v * 180;
    for (let x = 0; x < TW; x++) {
      const u = (x + 0.5) / TW;
      const c = paint(u * 360, lat, u, v);
      const k = (y * TW + x) * 3;
      rgb[k] = c[0];
      rgb[k + 1] = c[1];
      rgb[k + 2] = c[2];
    }
  }
  return { w: TW, h: TH, rgb };
}

const PLAINS = [196, 158, 122];
const CAP = [222, 200, 172];
const MACULA = [104, 46, 28];
const SPUTNIK = [238, 226, 205];
const HEART_EAST = [222, 200, 172];

function paintPluto(lon: number, lat: number, u: number, v: number) {
  const n = fbm(u, v, 3);
  const n2 = fbm(u, v, 11);
  let c = PLAINS.map((x) => x * (0.84 + 0.3 * n));

  // Lowell Regio: the paler northern cap.
  c = mix(c, CAP.map((x) => x * (0.92 + 0.12 * n2)), smooth(42, 68, lat));

  // Cthulhu Macula: a long, tapering dark band along the equator, west of the heart.
  if (lon > 20 && lon < 160) {
    const taper = Math.sin((Math.PI * (lon - 20)) / 140);
    const centre = -6 + 7 * Math.sin(lon * 0.06);
    const half = 20 * Math.pow(taper, 0.7) * (0.7 + 0.6 * n2);
    const d = Math.abs(lat - centre);
    c = mix(c, MACULA.map((x) => x * (0.82 + 0.35 * n)), 1 - smooth(half - 4, half + 2, d));
  }

  // Smaller dark maculae east of the heart (Krun, Balrog).
  if (lon > 230 && lon < 340 && Math.abs(lat + 4) < 22) {
    const spot = smooth(0.58, 0.68, n2) * (1 - smooth(14, 22, Math.abs(lat + 4)));
    c = mix(c, MACULA.map((x) => x * 1.1), spot * 0.85);
  }

  // Tombaugh Regio: a lopsided heart, near the equator so the sphere doesn't
  // squash it. The smooth western lobe (Sputnik Planitia) is the palest; the
  // two lobes blend so there is no seam between them.
  const hx = (lon - 185) / 42;
  const hy = (lat + 2) / 36;
  const f = Math.pow(hx * hx + hy * hy - 1, 3) - hx * hx * hy * hy * hy;
  const inside = 1 - smooth(-0.05, 0.03, f + (n - 0.5) * 0.08);
  if (inside > 0) {
    const east = HEART_EAST.map((x) => x * (0.9 + 0.16 * n2));
    const lobe = mix(SPUTNIK, east, smooth(-0.25, 0.35, hx));
    c = mix(c, lobe, inside * (0.95 - 0.1 * smooth(-0.25, 0.35, hx)));
  }
  return c;
}

function paintCharon(lon: number, lat: number, u: number, v: number) {
  const n = fbm(u, v, 21);
  let c = [150, 146, 140].map((x) => x * (0.82 + 0.32 * n));
  // Mordor Macula: the reddish north polar cap.
  c = mix(c, [124, 66, 48].map((x) => x * (0.9 + 0.2 * n)), smooth(58, 72, lat));
  // Darker equatorial belt.
  c = mix(c, [118, 114, 108], (1 - smooth(6, 16, Math.abs(lat))) * smooth(0.5, 0.7, fbm(u, v, 29)) * 0.7);
  return c;
}

let plutoTex: Tex | null = null;
let charonTex: Tex | null = null;
const textures = () => {
  plutoTex ??= buildTexture(paintPluto);
  charonTex ??= buildTexture(paintCharon);
  return { pluto: plutoTex, charon: charonTex };
};

/* ---------- Sphere renderer ---------- */

type Sphere = {
  inside: Uint8Array; // 1 if the pixel touches the disc
  row: Int32Array; // texture row per pixel
  lon: Float32Array; // longitude offset per pixel (degrees)
  shade: Float32Array;
  alpha: Float32Array;
};

// Light from the upper left, slightly in front.
const L = (() => {
  const v = [-0.5, 0.42, 0.76];
  const m = Math.hypot(...v);
  return v.map((x) => x / m);
})();
const TILT = (16 * Math.PI) / 180; // axis tipped towards the viewer

function buildSphere(n: number): Sphere {
  const size = n * n;
  const s: Sphere = {
    inside: new Uint8Array(size),
    row: new Int32Array(size),
    lon: new Float32Array(size),
    shade: new Float32Array(size),
    alpha: new Float32Array(size),
  };
  const r = n / 2;
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      const nx = (x + 0.5 - r) / r;
      const ny = (r - y - 0.5) / r;
      const d2 = nx * nx + ny * ny;
      const k = y * n + x;
      const edge = (1 - Math.sqrt(d2)) * r; // px from the limb, for anti-aliasing
      if (edge < -0.5) continue;
      const nz = Math.sqrt(Math.max(0, 1 - d2));
      const y2 = ny * Math.cos(TILT) - nz * Math.sin(TILT);
      const z2 = ny * Math.sin(TILT) + nz * Math.cos(TILT);
      const lat = (Math.asin(Math.max(-1, Math.min(1, y2))) * 180) / Math.PI;
      s.inside[k] = 1;
      s.row[k] = Math.min(TH - 1, Math.max(0, Math.floor(((90 - lat) / 180) * TH)));
      s.lon[k] = (Math.atan2(nx, z2) * 180) / Math.PI;
      const lambert = Math.max(0, nx * L[0] + ny * L[1] + nz * L[2]);
      s.shade[k] = Math.min(1.02, 0.24 + 0.8 * lambert) * (0.86 + 0.14 * nz);
      s.alpha[k] = Math.max(0, Math.min(1, edge + 0.5));
    }
  }
  return s;
}

function paint(ctx: CanvasRenderingContext2D, img: ImageData, s: Sphere, tex: Tex, rot: number) {
  const out = img.data;
  const { w, rgb } = tex;
  for (let k = 0; k < s.inside.length; k++) {
    const o = k * 4;
    if (!s.inside[k]) {
      out[o + 3] = 0;
      continue;
    }
    let lon = (s.lon[k] + rot) % 360;
    if (lon < 0) lon += 360;
    const t = (s.row[k] * w + Math.floor((lon / 360) * w)) * 3;
    const sh = s.shade[k];
    out[o] = rgb[t] * sh;
    out[o + 1] = rgb[t + 1] * sh;
    out[o + 2] = rgb[t + 2] * sh;
    out[o + 3] = 255 * s.alpha[k];
  }
  ctx.putImageData(img, 0, 0);
}

/** The heart (lon 185) faces the viewer at this rotation. */
const HEART_FORWARD = 185;
const PERIOD_MS = 22000;

function useSphere(
  ref: React.RefObject<HTMLCanvasElement | null>,
  px: number,
  which: "pluto" | "charon",
  startAt: number,
) {
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || px <= 0) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const n = Math.max(8, Math.round(px * dpr));
    canvas.width = n;
    canvas.height = n;
    const tex = textures()[which];
    const sphere = buildSphere(n);
    const img = ctx.createImageData(n, n);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let rot = reduce ? HEART_FORWARD : startAt;
    paint(ctx, img, sphere, tex, rot);
    if (reduce) return;

    let raf = 0;
    let visible = false;
    let last = 0;
    const frame = (t: number) => {
      raf = 0;
      if (!visible || document.hidden) return;
      if (last) rot += ((t - last) / PERIOD_MS) * 360;
      last = t;
      paint(ctx, img, sphere, tex, rot);
      raf = requestAnimationFrame(frame);
    };
    const start = () => {
      if (!raf && visible && !document.hidden) {
        last = 0;
        raf = requestAnimationFrame(frame);
      }
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      start();
    });
    io.observe(canvas);
    document.addEventListener("visibilitychange", start);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      document.removeEventListener("visibilitychange", start);
    };
  }, [ref, px, which, startAt]);
}

export function Pluto({
  size = 24,
  charon = false,
  className = "",
}: {
  size?: number;
  charon?: boolean;
  className?: string;
}) {
  const plutoRef = useRef<HTMLCanvasElement>(null);
  const charonRef = useRef<HTMLCanvasElement>(null);
  // With Charon, Pluto takes half the box and Charon orbits in the rest.
  const body = charon ? Math.round(size * 0.5) : size;
  const moon = Math.max(5, Math.round(size * 0.13));
  // Start a quarter-turn early so the heart rotates into view.
  useSphere(plutoRef, body, "pluto", HEART_FORWARD - 70);
  useSphere(charonRef, charon ? moon : 0, "charon", 0);

  return (
    <span
      className={`pluto${charon ? " has-charon" : ""} ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {charon && (
        <>
          <svg className="pluto__orbit" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="42" />
          </svg>
          <span className="pluto__charon-track">
            <canvas ref={charonRef} className="pluto__charon" style={{ width: moon, height: moon }} />
          </span>
        </>
      )}
      <canvas ref={plutoRef} className="pluto__body" style={{ width: body, height: body }} />
    </span>
  );
}

/** 404: Pluto on a long, eccentric orbit around a signal "system". */
export function PlutoOrbit() {
  return (
    <div className="pluto-orbit" aria-hidden="true">
      {/* Fixed 480x320 stage (the orbit path is in px), scaled to fit the outer box. */}
      <div className="pluto-orbit__stage">
        <svg viewBox="0 0 480 320" className="pluto-orbit__path">
          <ellipse cx="240" cy="160" rx="220" ry="110" />
          <rect x="140" y="148" width="24" height="24" rx="2" className="art-signal" />
        </svg>
        <div className="pluto-orbit__planet">
          <Pluto size={56} charon />
        </div>
      </div>
    </div>
  );
}
