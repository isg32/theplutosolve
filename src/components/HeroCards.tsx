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
          <stop offset="0" stopColor="#3d5f9e" />
          <stop offset="1" stopColor="#4a5f9e" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="25" fill="none" stroke="#e5e8ef" strokeWidth="2" />
      <circle className="o-ring" cx="32" cy="32" r="25" fill="none" stroke={`url(#${id}g)`} strokeWidth="2.6" strokeLinecap="round" pathLength={1} strokeDasharray="1" transform="rotate(-90 32 32)" />
      <circle cx="32" cy="32" r="15" fill="none" stroke="#e5e8ef" strokeWidth="1.2" strokeDasharray="2 4" />
      <g className="o-dot"><circle cx="32" cy="7" r="4.2" fill={`url(#${id}g)`} /><circle cx="32" cy="7" r="7.5" fill="#3d5f9e" opacity="0.14" /></g>
    </svg>
  )
}

function Rocket() {
  const id = useId().replace(/:/g, '')
  return (
    <svg className="rocket" viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}b`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4a6aa6" />
          <stop offset="1" stopColor="#4d4f93" />
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
      {Array.from({ length: 7 }, (_, i) => <circle key={i} className="rk-trail" cx="32" cy="52" r={5 + (i % 3)} fill="#dde1ea" opacity="0" />)}
      {Array.from({ length: 4 }, (_, i) => <circle key={i} className="rk-puff" cx="32" cy="54" r="7" fill="#e6e9f0" opacity="0" />)}
      <circle className="rk-shock" cx="32" cy="50" r="8" fill="none" stroke="#9fb0cf" strokeWidth="1.6" opacity="0" />
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
        <path d="M21 33 L11 46 L11 52 L22 46.5 Z" fill="#1a2544" />
        <path d="M43 33 L53 46 L53 52 L42 46.5 Z" fill="#1a2544" />
        <path d="M32 4 C46 13 48 32 43.5 47 H20.5 C16 32 18 13 32 4 Z" fill={`url(#${id}b)`} />
        <path d="M32 4 C40 10 44 20 44 30 C40 22 37 14 32 4 Z" fill="#fff" opacity="0.22" />
        <rect x="22" y="44" width="20" height="4.5" rx="1.5" fill="#1a2544" />
        <circle cx="32" cy="25" r="6.2" fill="#1a2544" />
        <circle cx="32" cy="25" r="4.6" fill="#c4cfe6" />
        <circle cx="30.4" cy="23.4" r="1.4" fill="#fff" opacity="0.9" />
      </g>
    </svg>
  )
}

/* Seam stitch path: a zig-zag that crosses the cut. */
const STITCH_N = 14
const stitchPts: [number, number][] = Array.from({ length: STITCH_N }, (_, k) => [14 + k * 7.6, k % 2 ? 36 : 20])
const stitchD = 'M' + stitchPts.map((p) => p.join(' ')).join(' L')

function Sewing() {
  const id = useId().replace(/:/g, '')
  return (
    <svg className="sew" viewBox="0 0 132 60" aria-hidden="true">
      <defs>
        <pattern id={`${id}w`} width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="5" stroke="#e3e6ee" strokeWidth="1" />
        </pattern>
        <linearGradient id={`${id}c`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3d5f9e" />
          <stop offset="1" stopColor="#4a5f9e" />
        </linearGradient>
      </defs>
      <g className="fabric">
        <rect x="4" y="9" width="124" height="48" rx="9" fill="#f5f6f9" stroke="#dde1ea" />
        <rect x="4" y="9" width="124" height="48" rx="9" fill={`url(#${id}w)`} />
      </g>
      {/* the cut: a white gap with two soft edges that opens behind the scissors, closes behind the needle */}
      <path className="edge e1" d="M14 26.4 H118" pathLength={1} fill="none" stroke="#cdd3e0" strokeWidth="1" strokeDasharray="0 1.02 1 1" />
      <path className="edge e2" d="M14 29.6 H118" pathLength={1} fill="none" stroke="#cdd3e0" strokeWidth="1" strokeDasharray="0 1.02 1 1" />
      <path className="gap" d="M14 28 H118" pathLength={1} fill="none" stroke="#fff" strokeWidth="3.2" strokeDasharray="0 1.02 1 1" />
      <path className="seam" d={stitchD} pathLength={1} fill="none" stroke={`url(#${id}c)`} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="1" strokeDashoffset="0" />
      <path className="thread" d="M0 0" fill="none" stroke="#5f5a9b" strokeWidth="1.1" strokeLinecap="round" opacity="0" />
      {/* scissors: pivot (12,28); both blade groups are centred on the pivot so they rotate about it */}
      <g className="sc">
        <g className="bl-u">
          <rect x="-16" y="12" width="56" height="32" fill="none" />
          <path d="M12 28 L41 26 L41 28.7 Z" fill="#1a2544" />
          <path d="M12 28 L6 23.5" stroke="#1a2544" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="3.2" cy="21.5" r="4.4" fill="none" stroke="#1a2544" strokeWidth="2.2" />
        </g>
        <g className="bl-l">
          <rect x="-16" y="12" width="56" height="32" fill="none" />
          <path d="M12 28 L41 30 L41 27.3 Z" fill="#1a2544" />
          <path d="M12 28 L6 32.5" stroke="#1a2544" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="3.2" cy="34.5" r="4.4" fill="none" stroke="#1a2544" strokeWidth="2.2" />
        </g>
        <circle cx="12" cy="28" r="2" fill="#5f5a9b" />
      </g>
      <g className="nd" opacity="0">
        <path d="M0 -15 V4" stroke="#1a2544" strokeWidth="2" strokeLinecap="round" />
        <ellipse cx="0" cy="-11" rx="0.9" ry="2" fill="#fff" />
      </g>
      <path className="twinkle" d="M118 28 l2 -6 l2 6 l6 2 l-6 2 l-2 6 l-2 -6 l-6 -2 z" fill="#e2c479" opacity="0" />
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
        settle(t2, c2)

        /* 3 ─ Tailored: scissors cut the cloth (the gap opens behind them), then a needle sews
               the seam shut in a zig-zag, the thread trailing behind, the gap closing as it goes. */
        const t3 = gsap.timeline()
        const gap = $1(c3, '.gap') as SVGPathElement
        const edges = $(c3, '.edge') as SVGPathElement[]
        const seam = $1(c3, '.seam') as SVGPathElement
        const thread = $1(c3, '.thread') as SVGPathElement
        const nd = $1(c3, '.nd')
        const ndPos = { x: 14, y: 20 }
        enter(t3, c3)
        gsap.set([gap, ...edges], { strokeDasharray: '1', strokeDashoffset: 1 })
        gsap.set(seam, { strokeDashoffset: 1 })
        t3.fromTo($1(c3, '.sc'), { opacity: 0, scale: 0.7, transformOrigin: '12px 28px' }, { opacity: 1, scale: 1, duration: 0.35, ease: 'back.out(2)' }, 0.55)
          .set($1(c3, '.bl-u'), { rotation: -15, transformOrigin: '50% 50%' }, 0.55)
          .set($1(c3, '.bl-l'), { rotation: 15, transformOrigin: '50% 50%' }, 0.55)
          // snip-snip-snip while travelling along the cloth
          .to([$1(c3, '.bl-u'), $1(c3, '.bl-l')], { rotation: 0, duration: 0.09, repeat: 9, yoyo: true, ease: 'power1.inOut' }, 0.85)
          .to($1(c3, '.sc'), { x: 94, duration: 0.9, ease: 'power1.inOut' }, 0.85)
          .to([gap, ...edges], { strokeDashoffset: 0, duration: 0.9, ease: 'power1.inOut' }, 0.85)
          .to($1(c3, '.sc'), { opacity: 0, x: 108, rotation: 8, transformOrigin: '12px 28px', duration: 0.28, ease: 'power2.in' }, 1.85)
          // needle enters and sews the seam
          .fromTo(nd, { opacity: 0, x: 8, y: 20 }, { opacity: 1, x: 14, y: 20, duration: 0.3, ease: 'power2.out' }, 1.95)
        const sew = { p: 0 }
        t3.to(sew, {
          p: 1,
          duration: 1.4,
          ease: 'none',
          onUpdate() {
            const f = sew.p * (STITCH_N - 1)
            const i = Math.min(STITCH_N - 2, Math.floor(f))
            const u = f - i
            const [x0, y0] = stitchPts[i]
            const [x1, y1] = stitchPts[i + 1]
            ndPos.x = x0 + (x1 - x0) * u
            ndPos.y = y0 + (y1 - y0) * u
            gsap.set(nd, { x: ndPos.x, y: ndPos.y })
            seam.style.strokeDashoffset = String(1 - sew.p)
            // the gap closes behind the needle
            const keep = `0 ${Math.min(1, sew.p + 0.02)} 1 1`
            gap.style.strokeDasharray = keep
            edges.forEach((e) => (e.style.strokeDasharray = keep))
            // thread: slack curve from the needle's eye back to where the stitching began
            const sx = ndPos.x
            const sy = ndPos.y - 11
            const sag = 5 + Math.sin(sew.p * 40) * 3
            thread.setAttribute('d', `M ${Math.max(6, sx - 22)} ${sy - 12 + sag} Q ${sx - 10} ${sy + sag} ${sx} ${sy}`)
          },
        }, 2.15)
          .to(thread, { opacity: 1, duration: 0.25 }, 2.15)
          .to(thread, { opacity: 0, duration: 0.3 }, 3.5)
          .to(nd, { opacity: 0, x: '+=14', y: '-=10', duration: 0.35, ease: 'power2.in' }, 3.55)
          .fromTo($1(c3, '.twinkle'), { opacity: 1, scale: 0, rotation: -40, transformOrigin: '50% 50%' }, { scale: 1, rotation: 0, duration: 0.4, ease: 'back.out(2.4)' }, 3.55)
          .to($1(c3, '.twinkle'), { opacity: 0, scale: 0.4, duration: 0.45, ease: 'power2.in' }, 4.0)
          .fromTo($1(c3, '.fabric'), { scale: 1.025, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.5)' }, 3.55)
        settle(t3, c3)

        /* 4 ─ ROI: a proper money rain (tumbling, flipping, swaying notes and coins), which fades
               out as ROI resolves from the blur, the trend line draws and sparkles pop. */
        const t4 = gsap.timeline()
        const h = c4.offsetHeight
        const bills = $(c4, '.bill') as HTMLElement[]
        const roi = $1(c4, '.hc-big')
        enter(t4, c4, { scale: 0.9 })
        t4.from(roi, { opacity: 0, filter: 'blur(16px)', scale: 0.8, duration: 0.9, ease: 'expo.out' }, 2.6)
          .from($1(c4, '.trend'), { opacity: 0, duration: 0.3 }, 2.7)
          .fromTo($1(c4, '.tr-line'), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.8, ease: 'power2.inOut' }, 2.75)
          .from($1(c4, '.tr-head'), { opacity: 0, scale: 0.4, transformOrigin: '100% 0%', duration: 0.35, ease: 'back.out(3)' }, 3.45)
          .fromTo(
            $(c4, '.spk'),
            { scale: 0, opacity: 1, rotation: -30, transformOrigin: '50% 50%' },
            { scale: 1, rotation: 0, duration: 0.4, stagger: 0.07, ease: 'back.out(3)' },
            3.2,
          )
          .to($(c4, '.spk'), { scale: 0, opacity: 0, duration: 0.4, stagger: 0.07, ease: 'power2.in' }, 3.85)
          .fromTo(c4, { boxShadow: '0 24px 60px -28px rgba(21, 32, 59,0.28)' }, { boxShadow: '0 0 0 4px rgba(106, 160, 132,0.28), 0 30px 60px -22px rgba(95, 154, 122,0.5)', duration: 0.35, yoyo: true, repeat: 1, ease: 'power2.out' }, 2.9)
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
        <i className="hc-shine" aria-hidden="true" />
        <div className="hc-visual">
          <span className="hc-big grad"><span className="cnt">360</span>°</span>
          <Orbit360 />
        </div>
        <div className="hc-label">Full-Service Solutions</div>
      </div>
      <div className="hc hc2">
        <i className="hc-shine" aria-hidden="true" />
        <div className="hc-visual"><Rocket /></div>
        <div className="hc-title">Growth-First</div>
        <div className="hc-label">Strategy &amp; Execution</div>
      </div>
      <div className="hc hc3">
        <i className="hc-shine" aria-hidden="true" />
        <div className="hc-visual"><Sewing /></div>
        <div className="hc-title">Tailored</div>
        <div className="hc-label">No cookie-cutter plans</div>
      </div>
      <div className="hc hc4">
        <i className="hc-shine" aria-hidden="true" />
        <div className="hc-rain" aria-hidden="true">
          {rainLeft.map((l, i) => (
            <span className="bill" key={i} style={{ left: `${l}%`, width: 16 + ((i * 7) % 5) * 4 }}><Bill coin={i % 3 === 0} /></span>
          ))}
        </div>
        <div className="hc-visual">
          <span className="hc-big grad">ROI</span>
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
