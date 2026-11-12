import { useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'

export type Slide = { key: string; label: string; node: ReactNode }

/**
 * Accessible carousel: group + slide roles, arrow-key and swipe navigation, labelled
 * previous/next buttons and dots, inactive slides are `inert` (not focusable, not announced).
 * `autoplay` advances every N ms; it pauses on hover and keyboard focus, while off screen, and with reduced motion.
 * `fixed` keeps every slide the same height (for image slideshows), otherwise the box follows the active slide.
 */
export default function Carousel({ slides, label, autoplay, fixed = false }: { slides: Slide[]; label: string; autoplay?: number; fixed?: boolean }) {
  const [i, setI] = useState(0)
  const touch = useRef<number | null>(null)
  const viewport = useRef<HTMLDivElement>(null)
  const root = useRef<HTMLDivElement>(null)
  const slideEls = useRef<(HTMLDivElement | null)[]>([])
  const [h, setH] = useState<number | undefined>(undefined)
  const n = slides.length
  const [paused, setPaused] = useState(false)
  const [seen, setSeen] = useState(false)
  const go = (k: number) => setI(((k % n) + n) % n)

  // The viewport takes the height of the slide on screen, so a short slide isn't padded out to the tallest one.
  useLayoutEffect(() => {
    const el = slideEls.current[i]
    if (!el || fixed) return
    const measure = () => setH(el.offsetHeight)
    measure()
    if (typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [i, fixed])

  useEffect(() => {
    const el = root.current
    if (!autoplay || !el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(([e]) => setSeen(e.isIntersecting), { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [autoplay])

  useEffect(() => {
    if (!autoplay || paused || !seen || n < 2) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = window.setTimeout(() => setI((k) => (k + 1) % n), autoplay)
    return () => window.clearTimeout(t)
  }, [autoplay, paused, seen, i, n])

  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      go(i + 1)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      go(i - 1)
    }
  }

  return (
    <div
      ref={root}
      className={`car${fixed ? ' fixed' : ''}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      role="group"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={0}
      onKeyDown={onKey}
      onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touch.current === null) return
        const dx = e.changedTouches[0].clientX - touch.current
        touch.current = null
        if (Math.abs(dx) > 40) go(i + (dx < 0 ? 1 : -1))
      }}
    >
      <div className="car-viewport" ref={viewport} style={h && !fixed ? { height: h } : undefined}>
        <div className="car-track" style={{ transform: `translateX(-${i * 100}%)` }}>
          {slides.map((s, k) => (
            <div
              key={s.key}
              ref={(el) => {
                slideEls.current[k] = el
              }}
              className={`car-slide${k === i ? ' on' : ''}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${k + 1} of ${n}: ${s.label}`}
              inert={k !== i}
            >
              {s.node}
            </div>
          ))}
        </div>
      </div>
      <div className="car-ctrl">
        <button type="button" className="car-btn" aria-label="Previous slide" onClick={() => go(i - 1)}>←</button>
        <div className="car-dots">
          {slides.map((s, k) => (
            <button key={s.key} type="button" className={k === i ? 'on' : ''} aria-label={`Go to slide ${k + 1}: ${s.label}`} aria-current={k === i} onClick={() => go(k)} />
          ))}
        </div>
        <button type="button" className="car-btn" aria-label="Next slide" onClick={() => go(i + 1)}>→</button>
      </div>
      <p className="sr-only" aria-live="polite">{`Slide ${i + 1} of ${n}: ${slides[i].label}`}</p>
    </div>
  )
}
