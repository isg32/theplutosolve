import { useLayoutEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/gsap'

const bars = [35, 55, 45, 75, 62, 95]

export default function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    if (!ref.current || prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.25, defaults: { ease: 'power2.out' } })
      tl.from('.v1', { opacity: 0, filter: 'blur(12px)', duration: 0.8 })
        .from('.v1 .ln', { scaleX: 0, stagger: 0.12, duration: 0.6 }, '-=0.5')
        .from('.bars i', { scaleY: 0, stagger: 0.06, duration: 0.7, ease: 'power3.out' }, '-=0.3')
        .from('.v2', { opacity: 0, filter: 'blur(12px)', duration: 0.7 }, '-=0.3')
        .from('.v3', { opacity: 0, filter: 'blur(12px)', duration: 0.7 }, '-=0.35')
        .set('.v1, .v2, .v3', { clearProps: 'filter,opacity' })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <div className="vis" ref={ref} aria-hidden="true">
      <div className="card v1">
        <div className="dots"><b /><b /><b /></div>
        <div className="ln" style={{ width: '55%' }} />
        <div className="ln" style={{ width: '35%' }} />
        <div className="bars">{bars.map((h, i) => <i key={i} style={{ height: `${h}%` }} />)}</div>
      </div>
      <div className="card v2"><small><i className="live" />Dashboard</small><strong>Leads</strong><span>Tracked &amp; organised</span></div>
      <div className="card v3"><small>Campaign</small><strong>Reach the right people</strong><span className="pill">Marketing</span></div>
    </div>
  )
}
