import { useId, useLayoutEffect, useRef } from 'react'
import { gsap, prefersReducedMotion, whenReady } from '../lib/gsap'

const rand = gsap.utils.random

/** Axis the 360° card spins on: 'rotationX' (forward roll), 'rotationY' (side turn) or 'rotationZ' (flat spin). */
const SPIN_AXIS: 'rotationX' | 'rotationY' | 'rotationZ' = 'rotationX'

/* ═════════════ Artwork ═════════════ */

/** 360° card: an orbit ring that draws itself, with a dot that keeps circling afterwards. */
function Orbit360() {
  const id = useId().replace(/:/g, '')
  return (
    <svg className="o360" viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}g`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#6a5c9a" />
          <stop offset="1" stopColor="#7a66a8" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="25" fill="none" stroke="#e8e6ef" strokeWidth="2" />
      <circle className="o-ring" cx="32" cy="32" r="25" fill="none" stroke={`url(#${id}g)`} strokeWidth="2.6" strokeLinecap="round" pathLength={1} strokeDasharray="1" transform="rotate(-90 32 32)" />
      <circle cx="32" cy="32" r="15" fill="none" stroke="#e8e6ef" strokeWidth="1.2" strokeDasharray="2 4" />
      <g className="o-dot"><circle cx="32" cy="7" r="4.2" fill={`url(#${id}g)`} /><circle cx="32" cy="7" r="7.5" fill="#6a5c9a" opacity="0.14" /></g>
    </svg>
  )
}

function Rocket() {
  const id = useId().replace(/:/g, '')
  return (
    <svg className="rocket" viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}b`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7a64ad" />
          <stop offset="1" stopColor="#5e4d93" />
        </linearGradient>
        <linearGradient id={`${id}f`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f3d9a4" />
          <stop offset="0.5" stopColor="#e0a164" />
          <stop offset="1" stopColor="#d27a52" />
        </linearGradient>
        <radialGradient id={`${id}r`}>
          <stop offset="0" stopColor="#e0a45a" stopOpacity="0.85" />
          <stop offset="1" stopColor="#e0a45a" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* exhaust plume (stays behind while the rocket moves) */}
      {Array.from({ length: 7 }, (_, i) => <circle key={i} className="rk-trail" cx="32" cy="52" r={5 + (i % 3)} fill="#e0dcea" opacity="0" />)}
      {Array.from({ length: 4 }, (_, i) => <circle key={i} className="rk-puff" cx="32" cy="54" r="7" fill="#e8e5ef" opacity="0" />)}
      <circle className="rk-shock" cx="32" cy="50" r="8" fill="none" stroke="#b0a6cc" strokeWidth="1.6" opacity="0" />
      {Array.from({ length: 10 }, (_, i) => <circle key={i} className="rk-spark" cx="32" cy="52" r="1.8" fill={i % 2 ? '#e0a45a' : '#d27a52'} opacity="0" />)}
      <g className="rk">
        <circle className="rk-glow" cx="32" cy="54" r="16" fill={`url(#${id}r)`} opacity="0" />
        <g className="rk-flame">
          <g className="flick">
            <path d="M26 46 Q32 74 38 46 Z" fill={`url(#${id}f)`} />
            <path d="M29 46 Q32 63 35 46 Z" fill="#f4e3bd" />
            <path d="M30.8 46 Q32 55 33.2 46 Z" fill="#fff" />
          </g>
        </g>
        <path d="M21 33 L11 46 L11 52 L22 46.5 Z" fill="#25203f" />
        <path d="M43 33 L53 46 L53 52 L42 46.5 Z" fill="#25203f" />
        <path d="M32 4 C46 13 48 32 43.5 47 H20.5 C16 32 18 13 32 4 Z" fill={`url(#${id}b)`} />
        <path d="M32 4 C40 10 44 20 44 30 C40 22 37 14 32 4 Z" fill="#fff" opacity="0.22" />
        <rect x="22" y="44" width="20" height="4.5" rx="1.5" fill="#25203f" />
        <circle cx="32" cy="25" r="6.2" fill="#25203f" />
        <circle cx="32" cy="25" r="4.6" fill="#cfc7e3" />
        <circle cx="30.4" cy="23.4" r="1.4" fill="#fff" opacity="0.9" />
      </g>
    </svg>
  )
}

/* ═════════════ Card backdrops (all 100×100, "slice" so they fill the card at any size) ═════════════ */

function mulberry(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** 360° — a compass / protractor dial with degree ticks and a slow radar sweep. */
const DIAL = { x: 80, y: 70 }
function BgDial() {
  return (
    <svg className="bg-art bg-dial" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {[16, 30, 44, 58].map((r) => <circle key={r} className="dr" cx={DIAL.x} cy={DIAL.y} r={r} fill="none" stroke="#E3DDF0" strokeWidth=".45" />)}
      <path d={`M${DIAL.x - 70} ${DIAL.y} H${DIAL.x + 70} M${DIAL.x} ${DIAL.y - 70} V${DIAL.y + 70}`} stroke="#E8E3F2" strokeWidth=".35" strokeDasharray="1.2 1.6" className="dr" />
      <g>
        {Array.from({ length: 72 }, (_, i) => {
          const major = i % 6 === 0
          return <path key={i} className="tk" d={`M${DIAL.x} ${DIAL.y - 58} v${major ? 4.2 : 2.2}`} transform={`rotate(${i * 5} ${DIAL.x} ${DIAL.y})`} stroke={major ? '#BDB2DA' : '#D4CCE6'} strokeWidth={major ? 0.6 : 0.4} />
        })}
      </g>
      <g className="sweep"><path d={`M${DIAL.x} ${DIAL.y} L${DIAL.x} ${DIAL.y - 58} A58 58 0 0 1 ${DIAL.x + 58 * Math.sin(0.6)} ${DIAL.y - 58 * Math.cos(0.6)} Z`} fill="rgba(106, 92, 154, 0.09)" /></g>
      <circle cx={DIAL.x} cy={DIAL.y} r="1.1" fill="#BDB2DA" />
    </svg>
  )
}

/** Growth-First — a night sky: twinkling stars, a small planet, and speed lines for blast-off. */
const rs = mulberry(11)
const STARS = Array.from({ length: 46 }, () => ({ x: rs() * 100, y: 12 + rs() * 76, r: 0.28 + rs() * 0.62, o: 0.3 + rs() * 0.45, d: rs() * 3 }))
const SPEED = Array.from({ length: 14 }, (_, i) => ({ x: 6 + i * 6.8 + rs() * 2, h: 10 + rs() * 16 }))
function BgSpace() {
  return (
    <svg className="bg-art bg-space" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <path className="traj" d="M6 96 Q 34 52 70 6" fill="none" stroke="#D3CAE8" strokeWidth=".5" strokeDasharray="1.6 2.6" strokeLinecap="round" />
      <g className="stars">
        {STARS.map((st, i) => <circle key={i} className="star twk" cx={st.x} cy={st.y} r={st.r} fill="#8E81BA" opacity={st.o} style={{ animationDelay: `${st.d}s` }} />)}
        {[[18, 24], [64, 20], [90, 50], [30, 78]].map(([x, y], i) => (
          <path key={i} className="star twk" d={`M${x} ${y - 2.4} L${x + 0.7} ${y - 0.7} L${x + 2.4} ${y} L${x + 0.7} ${y + 0.7} L${x} ${y + 2.4} L${x - 0.7} ${y + 0.7} L${x - 2.4} ${y} L${x - 0.7} ${y - 0.7} Z`} fill="#A598CB" opacity=".55" style={{ animationDelay: `${i * 0.8}s` }} />
        ))}
      </g>
      <g className="planet">
        <circle cx="88" cy="78" r="11" fill="#EDE8F6" stroke="#D9D1EC" strokeWidth=".5" />
        <path d="M80 74 Q88 70 97 75" fill="none" stroke="#D9D1EC" strokeWidth=".6" />
        <ellipse cx="88" cy="78" rx="17" ry="4" fill="none" stroke="#CFC6E3" strokeWidth=".6" transform="rotate(-16 88 78)" />
      </g>
      <g>{SPEED.map((l, i) => <path key={i} className="speed" d={`M${l.x} 0 v${l.h}`} stroke="#B3A7D4" strokeWidth=".5" strokeLinecap="round" opacity="0" />)}</g>
    </svg>
  )
}

/** ROI — graph paper with rising bars, a trend line and a ₹ watermark. */
const BARS = [10, 14, 12, 21, 18, 29, 27, 38, 47]
function BgRoi() {
  return (
    <svg className="bg-art bg-roi" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <path className="grid" d={Array.from({ length: 11 }, (_, i) => `M${i * 10} 0 V100 M0 ${i * 10} H100`).join(' ')} stroke="#ECE8F4" strokeWidth=".3" fill="none" />
      <text className="rupee" x="70" y="52" fontSize="46" fontWeight="700" fill="#F1EEF7">₹</text>
      <g>{BARS.map((h, i) => <rect key={i} className="bar" x={7 + i * 9.6} y={88 - h} width="6.4" height={h + 14} rx="1.2" fill="#EBE7F4" />)}</g>
      <path className="btrend" d="M10 78 L20 74 L30 76 L40 66 L50 68 L60 55 L70 57 L80 43 L91 33" pathLength={1} fill="none" stroke="#D2C9E6" strokeWidth=".9" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="1" />
    </svg>
  )
}

/* Fabric + hand-held scissors share one rotated coordinate system: the cloth is tilted 45° and
   zoomed in, and "+x" is the direction of the cut (up and to the right on screen). */
const FRAME = 'translate(50 50) rotate(-45) scale(1.5)'

function FabricBg() {
  const id = useId().replace(/:/g, '')
  return (
    <svg className="fab-bg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <pattern id={`${id}w`} width="3" height="3" patternUnits="userSpaceOnUse">
          <rect width="3" height="3" fill="#f5f3f9" />
          <path d="M0 .25 H3 M.25 0 V3" stroke="#e9e6f0" strokeWidth=".5" />
        </pattern>
        <pattern id={`${id}t`} width="12" height="12" patternUnits="userSpaceOnUse">
          <path d="M0 6 H12 M6 0 V12" stroke="#e1ddea" strokeWidth=".35" />
        </pattern>
      </defs>
      <g transform={FRAME}>
        <g className="zoom">
          <g className="half-t">
            <rect x="-160" y="-160" width="320" height="160" fill={`url(#${id}w)`} />
            <rect x="-160" y="-160" width="320" height="160" fill={`url(#${id}t)`} />
          </g>
          <g className="half-b">
            <rect x="-160" y="0" width="320" height="160" fill={`url(#${id}w)`} />
            <rect x="-160" y="0" width="320" height="160" fill={`url(#${id}t)`} />
          </g>
          <path className="gap" d="M-58 0 H58" pathLength={1} fill="none" stroke="#fff" strokeWidth="2.4" strokeDasharray="0 1.02 1 1" />
        </g>
      </g>
    </svg>
  )
}

const SKIN = '#E2B9A0'
const SKIN_EDGE = '#C99A7E'
const STEEL = '#c3bdd6'
const INK = '#25203f'

function Blade({ dir }: { dir: 1 | -1 }) {
  // dir -1 = upper blade (thumb), +1 = lower blade (fingers). Pivot is the origin.
  const y = (v: number) => v * dir
  return (
    <>
      <rect x="-30" y="-14" width="60" height="28" fill="none" />
      {/* thumb / fingers pass through the ring, rotating with the handle */}
      <path d={`M-25 ${y(3)} L-9 ${y(5.8)}`} stroke={SKIN_EDGE} strokeWidth="4.6" strokeLinecap="round" fill="none" />
      <path d={`M-25 ${y(3)} L-9 ${y(5.8)}`} stroke={SKIN} strokeWidth="3.5" strokeLinecap="round" fill="none" />
      <path d={`M0 0 L25 ${y(1.7)} L25 ${y(-0.9)} Z`} fill={STEEL} stroke={INK} strokeWidth=".5" strokeLinejoin="round" />
      <path d={`M2 ${y(0.4)} L23 ${y(1.1)}`} stroke="#fff" strokeWidth=".6" opacity=".7" strokeLinecap="round" />
      <path d={`M0 0 L-5.2 ${y(3.8)}`} stroke={INK} strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="-8.6" cy={y(6)} r="3.5" fill="none" stroke={INK} strokeWidth="1.5" />
    </>
  )
}

function FabricFg() {
  return (
    <svg className="fab-fg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <g transform={FRAME}>
        <g className="zoom">
          <g className="sc">
            {/* sleeve, cuff and hand (drawn at full size, scaled down to sit right on the card) */}
            <g transform="scale(0.62)">
            <path d="M-175 -6.5 H-35 Q-32.5 0 -35 6.5 H-175 Z" fill="#3b3358" />
            <rect x="-41" y="-7.4" width="6.4" height="14.8" rx="2" fill="#4d4470" />
            <path d="M-36 -6.4 C-34 -9.4 -26 -9.4 -22.5 -7 L-19.5 -3.8 L-19.5 3.8 L-22.5 7 C-26 9.4 -34 9.4 -36 6.4 Z" fill={SKIN} stroke={SKIN_EDGE} strokeWidth=".5" />
            <g className="bl-u"><Blade dir={-1} /></g>
            <g className="bl-l"><Blade dir={1} /></g>
            <circle cx="0" cy="0" r="1.5" fill={INK} />
            </g>
          </g>
        </g>
      </g>
    </svg>
  )
}

const rainLeft = [4, 11, 17, 24, 31, 37, 44, 50, 57, 63, 70, 76, 83, 89, 95, 8, 21, 40, 54, 67, 80, 92, 28, 47, 60, 73, 86, 14]

function Bill({ coin }: { coin: boolean }) {
  return coin ? (
    <svg viewBox="0 0 22 22" aria-hidden="true">
      <circle cx="11" cy="11" r="10" fill="#e2c479" stroke="#bf9a4e" strokeWidth="1.4" />
      <circle cx="11" cy="11" r="7.2" fill="none" stroke="#cfa95c" strokeWidth="1" />
      <text x="11" y="14.6" textAnchor="middle" fontSize="10" fontWeight="700" fill="#8a6a2e">₹</text>
      <path d="M5.5 7 A7 7 0 0 1 11 4" stroke="#f3e7c4" strokeWidth="1.4" fill="none" strokeLinecap="round" />
    </svg>
  ) : (
    <svg viewBox="0 0 30 18" aria-hidden="true">
      <rect x="1" y="1" width="28" height="16" rx="3" fill="#a9cdb7" stroke="#6aa084" strokeWidth="1.4" />
      <rect x="4" y="4" width="22" height="10" rx="1.6" fill="none" stroke="#86b59a" strokeWidth="0.9" />
      <circle cx="15" cy="9" r="3.6" fill="#d0e6d9" stroke="#6aa084" strokeWidth="1.2" />
      <text x="15" y="11.1" textAnchor="middle" fontSize="5.4" fontWeight="700" fill="#4f7f65">₹</text>
    </svg>
  )
}

function Trend() {
  return (
    <svg className="trend" viewBox="0 0 60 44" aria-hidden="true">
      <path className="tr-line" d="M3 38 L17 26 L28 31 L43 13 L53 6" fill="none" stroke="#6aa084" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray="1" />
      <path className="tr-head" d="M43 5 H54 V16" fill="none" stroke="#6aa084" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Sparkle({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <svg className="spk" viewBox="0 0 20 20" style={{ left: x, top: y, width: 14 * s, height: 14 * s }} aria-hidden="true">
      <path d="M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8 Z" fill="#e2c479" />
    </svg>
  )
}

/* ═════════════ Choreography ═════════════ */

export default function HeroCards() {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const root = ref.current
    if (!root || prefersReducedMotion()) return
    let ctx: gsap.Context | undefined
    const cleanups: (() => void)[] = []

    const cancel = whenReady(() => {
      ctx = gsap.context(() => {
        const $ = (card: Element, sel: string) => Array.from(card.querySelectorAll(sel))
        const $1 = (card: Element, sel: string) => card.querySelector(sel)!
        const [c1, c2, c3, c4] = Array.from(root.querySelectorAll<HTMLElement>('.hc'))

        // Shared entrance: out of blur, a hair of scale, and a light sweep once it lands.
        const enter = (tl: gsap.core.Timeline, card: HTMLElement, vars: gsap.TweenVars = {}) => {
          tl.from(card, { opacity: 0, filter: 'blur(16px)', scale: 0.86, duration: 0.8, ease: 'expo.out', ...vars }, 0)
          tl.fromTo($1(card, '.hc-shine'), { xPercent: -130, opacity: 1 }, { xPercent: 150, duration: 1, ease: 'power2.inOut' }, '>-0.2')
            .set($1(card, '.hc-shine'), { opacity: 0 }, '>')
        }
        const settle = (tl: gsap.core.Timeline, card: HTMLElement) => tl.set(card, { clearProps: 'opacity,filter,transform,boxShadow' })

        /* 1 ─ 360°: rolls a full revolution about the X axis (a forward flip, in perspective) while
               un-blurring; the number counts up in step, and the ring draws itself around it. */
        const t1 = gsap.timeline()
        const cnt = $1(c1, '.cnt') as HTMLElement
        const count = { v: 0 }
        cnt.textContent = '0'
        t1.from(c1, { opacity: 0, filter: 'blur(18px)', scale: 0.55, [SPIN_AXIS]: 360, transformPerspective: 900, duration: 1.8, ease: 'expo.out' }, 0)
          .to(count, { v: 360, duration: 1.5, ease: 'power3.out', snap: { v: 1 }, onUpdate: () => { cnt.textContent = String(count.v) } }, 0.05)
          .fromTo($1(c1, '.o-ring'), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.5, ease: 'power2.inOut' }, 0.1)
          .from($1(c1, '.o-dot'), { opacity: 0, duration: 0.5 }, 1.1)
          .fromTo($1(c1, '.hc-shine'), { xPercent: -130, opacity: 1 }, { xPercent: 150, duration: 1, ease: 'power2.inOut' }, 1.35)
          .set($1(c1, '.hc-shine'), { opacity: 0 }, 2.35)
        // backdrop: dial rings bloom, ticks sweep in around the circle, radar arm fades up
        t1.from($(c1, '.dr'), { opacity: 0, scale: 0.6, svgOrigin: `${DIAL.x} ${DIAL.y}`, stagger: 0.1, duration: 0.9, ease: 'expo.out' }, 0.3)
          .from($(c1, '.tk'), { opacity: 0, stagger: 0.014, duration: 0.3 }, 0.45)
          .from($1(c1, '.sweep'), { opacity: 0, duration: 0.8 }, 1.3)
        settle(t1, c1)

        /* 2 ─ Rocket: ignition shake → blast off through the roof of the card with a smoke plume
               and shockwave → flies back in from below, braking on its own flame → soft landing. */
        const t2 = gsap.timeline()
        const rk = $1(c2, '.rk')
        const flame = $1(c2, '.rk-flame')
        enter(t2, c2)
        t2.fromTo(rk, { y: 30, opacity: 0 }, { y: 30, opacity: 1, duration: 0.35 }, 0.35)
          // ignition
          .fromTo(flame, { scaleY: 0, transformOrigin: '50% 0%' }, { scaleY: 0.9, duration: 0.55, ease: 'power2.out' }, 0.8)
          .to($1(c2, '.rk-glow'), { opacity: 1, duration: 0.5 }, 0.8)
          .to(rk, { x: 1.8, duration: 0.04, repeat: 15, yoyo: true, ease: 'none' }, 0.85)
          .to(c2, { x: () => rand(-1.6, 1.6), y: () => rand(-1.2, 1.2), duration: 0.04, repeat: 15, repeatRefresh: true, ease: 'none' }, 0.85)
          .to(c2, { x: 0, y: 0, duration: 0.08 }, 1.5)
          .fromTo($(c2, '.rk-puff'), { scale: 0.3, opacity: 0.4, transformOrigin: '50% 50%', x: 0, y: 0 }, { scale: 1.9, opacity: 0, x: (i: number) => (i - 1.5) * 16, y: 10, stagger: 0.08, duration: 0.9, ease: 'power1.out' }, 0.9)
          // blast off
          .to(flame, { scaleY: 1.7, duration: 0.25, ease: 'power2.in' }, 1.55)
          .to(rk, { y: -210, duration: 0.55, ease: 'power3.in' }, 1.6)
          .fromTo($1(c2, '.rk-shock'), { scale: 0.6, opacity: 0.9, transformOrigin: '50% 50%' }, { scale: 6, opacity: 0, duration: 0.7, ease: 'power2.out' }, 1.62)
          .fromTo($(c2, '.rk-spark'), { x: 0, y: 0, opacity: 1, scale: 1 }, { x: (i: number) => (i - 4.5) * 8, y: () => rand(8, 30), opacity: 0, scale: 0, duration: 0.85, ease: 'power2.out' }, 1.62)
          .fromTo($(c2, '.rk-trail'), { y: 24, opacity: 0.4, scale: 0.5, transformOrigin: '50% 50%' }, { y: -150, opacity: 0, scale: 1.9, stagger: 0.035, duration: 0.7, ease: 'power2.in' }, 1.65)
          // return flight: in from below the card, decelerating on the flame
          .set(rk, { y: 300 }, 2.3)
          .fromTo($(c2, '.rk-trail'), { y: 290, opacity: 0.38, scale: 0.5 }, { y: 36, opacity: 0, scale: 1.7, stagger: 0.03, duration: 0.8, ease: 'power2.out' }, 2.32)
          .to(rk, { y: -5, duration: 0.95, ease: 'power3.out' }, 2.32)
          .to(flame, { scaleY: 1.1, duration: 0.9, ease: 'power2.out' }, 2.32)
          .to(rk, { y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' }, 3.27)
          .to(flame, { scaleY: 0.72, duration: 0.5, ease: 'power2.out' }, 3.2)
          .to($1(c2, '.rk-glow'), { opacity: 0.55, duration: 0.5 }, 3.2)
        // backdrop: stars blink on, planet drifts in; on blast-off the sky streaks past and the stars shudder
        t2.from($1(c2, '.stars'), { opacity: 0, duration: 0.9 }, 0.35)
          .from($1(c2, '.planet'), { opacity: 0, scale: 0.7, svgOrigin: '88 78', duration: 0.9, ease: 'expo.out' }, 0.45)
          .from($1(c2, '.traj'), { opacity: 0, duration: 0.8 }, 0.6)
          .fromTo($(c2, '.speed'), { opacity: 0, y: -30 }, { opacity: 0.6, y: 130, duration: 0.5, stagger: 0.02, ease: 'power2.in' }, 1.6)
          .to($(c2, '.speed'), { opacity: 0, duration: 0.2 }, 2.1)
          .to($1(c2, '.stars'), { y: 7, duration: 0.45, ease: 'power2.in' }, 1.6)
          .to($1(c2, '.stars'), { y: 0, duration: 0.9, ease: 'power2.out' }, 2.05)
        settle(t2, c2)

        /* 3 ─ Tailored: a hand slides in holding scissors and cuts straight through the cloth
               (tilted 45° and zoomed in behind the card). The slit opens behind the blades and
               the two halves ease apart. No stitching. */
        const t3 = gsap.timeline()
        const sc = $1(c3, '.sc')
        const gap = $1(c3, '.gap') as SVGPathElement
        const zooms = $(c3, '.zoom')
        const halfT = $1(c3, '.half-t')
        const halfB = $1(c3, '.half-b')
        const bu = $1(c3, '.bl-u')
        const bl = $1(c3, '.bl-l')
        enter(t3, c3)
        gsap.set(gap, { strokeDasharray: '1', strokeDashoffset: 1 })
        gsap.set([halfT, halfB], { y: 0 })
        gsap.set(sc, { opacity: 1, x: -92 })
        gsap.set(bu, { rotation: -13, transformOrigin: '50% 50%' })
        gsap.set(bl, { rotation: 13, transformOrigin: '50% 50%' })
        t3.fromTo(zooms, { scale: 1, svgOrigin: '0 0' }, { scale: 1.1, svgOrigin: '0 0', duration: 3.4, ease: 'power1.inOut' }, 0.2)
          .to(sc, { x: -52, duration: 0.55, ease: 'power2.out' }, 0.6)
          // snip-snip while travelling through the cloth
          .to([bu, bl], { rotation: 0, duration: 0.11, repeat: 11, yoyo: true, ease: 'power1.inOut' }, 1.0)
          .to(sc, { x: 52, duration: 1.35, ease: 'power1.inOut' }, 1.1)
          .fromTo(gap, { strokeDashoffset: 0.92 }, { strokeDashoffset: 0, duration: 1.35, ease: 'power1.inOut' }, 1.1)
          // scissors leave; the cut halves ease apart
          .to(sc, { x: 240, duration: 0.75, ease: 'power2.in' }, 2.5)
          .to(halfT, { y: -2.6, duration: 0.8, ease: 'back.out(2)' }, 2.45)
          .to(halfB, { y: 2.6, duration: 0.8, ease: 'back.out(2)' }, 2.45)
        settle(t3, c3)

        /* 4 ─ ROI: a proper money rain (tumbling, flipping, swaying notes and coins), which fades
               out as ROI resolves from the blur, the trend line draws and sparkles pop. */
        const t4 = gsap.timeline()
        const h = c4.offsetHeight
        const bills = $(c4, '.bill') as HTMLElement[]
        const letters = $(c4, '.rl')
        enter(t4, c4, { scale: 0.9 })
        // R · O · I: each letter rises out of blur and fades in, a beat after the one before
        t4.fromTo(letters, { opacity: 0, y: 22, filter: 'blur(12px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.75, stagger: 0.14, ease: 'power3.out', clearProps: 'opacity,filter,transform' }, 2.6)
          .from($1(c4, '.trend'), { opacity: 0, duration: 0.3 }, 3.0)
          .fromTo($1(c4, '.tr-line'), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.8, ease: 'power2.inOut' }, 3.05)
          .from($1(c4, '.tr-head'), { opacity: 0, scale: 0.4, transformOrigin: '100% 0%', duration: 0.35, ease: 'back.out(3)' }, 3.75)
          .fromTo(
            $(c4, '.spk'),
            { scale: 0, opacity: 1, rotation: -30, transformOrigin: '50% 50%' },
            { scale: 1, rotation: 0, duration: 0.4, stagger: 0.07, ease: 'back.out(3)' },
            3.5,
          )
          .to($(c4, '.spk'), { scale: 0, opacity: 0, duration: 0.4, stagger: 0.07, ease: 'power2.in' }, 4.15)
          .fromTo(c4, { boxShadow: '0 24px 60px -28px rgba(30, 27, 54,0.28)' }, { boxShadow: '0 0 0 4px rgba(106, 160, 132,0.28), 0 30px 60px -22px rgba(95, 154, 122,0.5)', duration: 0.35, yoyo: true, repeat: 1, ease: 'power2.out' }, 3.2)
        bills.forEach((b, i) => {
          const d = rand(1.1, 1.8)
          const at = 0.45 + i * 0.04 + rand(0, 0.1)
          const sway = rand(-18, 18)
          const svg = b.firstElementChild as Element
          t4.fromTo(b, { y: -50, opacity: 1, rotation: rand(-90, 90) }, { y: h + 50, rotation: `+=${rand(-300, 300)}`, duration: d, ease: 'power1.in' }, at)
            .fromTo(b, { x: 0 }, { x: sway, duration: d, ease: 'sine.inOut' }, at)
            .fromTo(svg, { scaleX: 1 }, { scaleX: -1, duration: rand(0.22, 0.4), repeat: Math.ceil(d / 0.3), yoyo: true, ease: 'sine.inOut', transformOrigin: '50% 50%' }, at)
        })
        t4.to($1(c4, '.hc-rain'), { opacity: 0, duration: 0.5, ease: 'power1.out' }, 2.3)
        // backdrop: graph paper fades in; the bars grow and the trend line draws as ROI resolves
        t4.from($1(c4, '.grid'), { opacity: 0, duration: 0.8 }, 0.3)
          .fromTo($(c4, '.bar'), { scaleY: 0, transformOrigin: '50% 100%' }, { scaleY: 1, duration: 0.7, stagger: 0.07, ease: 'back.out(1.5)' }, 2.6)
          .fromTo($1(c4, '.btrend'), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.9, ease: 'power2.inOut' }, 3.0)
          .from($1(c4, '.rupee'), { opacity: 0, duration: 0.9 }, 3.0)
        settle(t4, c4)

        let tiltOn = false
        const master = gsap.timeline({
          delay: 0.2,
          onComplete: () => {
            tiltOn = true
          },
        })
        master.add(t1, 0).add(t2, 0.9).add(t3, 2.6).add(t4, 4.6)

        /* Idle polish: pointer tilt + spotlight (desktop only), enabled once the sequence has played. */
        if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
          ;[c1, c2, c3, c4].forEach((card) => {
            const rx = gsap.quickTo(card, 'rotationX', { duration: 0.6, ease: 'power3.out' })
            const ry = gsap.quickTo(card, 'rotationY', { duration: 0.6, ease: 'power3.out' })
            const ly = gsap.quickTo(card, 'y', { duration: 0.5, ease: 'power3.out' })
            const move = (e: PointerEvent) => {
              if (!tiltOn) return
              const r = card.getBoundingClientRect()
              const px = (e.clientX - r.left) / r.width
              const py = (e.clientY - r.top) / r.height
              gsap.set(card, { transformPerspective: 900 })
              ry((px - 0.5) * 12)
              rx(-(py - 0.5) * 12)
              ly(-5)
              card.style.setProperty('--mx', `${e.clientX - r.left}px`)
              card.style.setProperty('--my', `${e.clientY - r.top}px`)
            }
            const leave = () => {
              rx(0)
              ry(0)
              ly(0)
            }
            card.addEventListener('pointermove', move)
            card.addEventListener('pointerleave', leave)
            cleanups.push(() => {
              card.removeEventListener('pointermove', move)
              card.removeEventListener('pointerleave', leave)
            })
          })
        }
      }, root)
    })

    return () => {
      cancel()
      cleanups.forEach((fn) => fn())
      ctx?.revert()
      root.querySelectorAll<SVGPathElement>('.gap, .edge, .seam').forEach((el) => {
        el.style.strokeDasharray = ''
        el.style.strokeDashoffset = ''
      })
    }
  }, [])

  return (
    <div className="hcards" ref={ref}>
      <div className="hc hc1">
        <BgDial />
        <i className="hc-shine" aria-hidden="true" />
        <div className="hc-visual">
          <span className="hc-big grad"><span className="cnt">360</span>°</span>
          <Orbit360 />
        </div>
        <div className="hc-label">Full-Service Solutions</div>
      </div>
      <div className="hc hc2">
        <BgSpace />
        <i className="hc-shine" aria-hidden="true" />
        <div className="hc-visual"><Rocket /></div>
        <div className="hc-title">Growth-First</div>
        <div className="hc-label">Strategy &amp; Execution</div>
      </div>
      <div className="hc hc3">
        <FabricBg />
        <i className="hc-shine" aria-hidden="true" />
        <div className="hc-visual" />
        <div className="hc-title">Tailored</div>
        <div className="hc-label">No cookie-cutter plans</div>
        <FabricFg />
      </div>
      <div className="hc hc4">
        <BgRoi />
        <i className="hc-shine" aria-hidden="true" />
        <div className="hc-rain" aria-hidden="true">
          {rainLeft.map((l, i) => (
            <span className="bill" key={i} style={{ left: `${l}%`, width: 16 + ((i * 7) % 5) * 4 }}><Bill coin={i % 3 === 0} /></span>
          ))}
        </div>
        <div className="hc-visual">
          <span className="hc-big grad" aria-label="ROI">
            {['R', 'O', 'I'].map((l) => <span className="rl" aria-hidden="true" key={l}>{l}</span>)}
          </span>
          <Trend />
          <Sparkle x={86} y={4} s={1.2} />
          <Sparkle x={150} y={52} />
          <Sparkle x={56} y={56} s={0.8} />
        </div>
        <div className="hc-label">Always the Focus</div>
      </div>
    </div>
  )
}
