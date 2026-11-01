import { useLayoutEffect, type RefObject } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/gsap'

/**
 * Declarative motion for a page. Mark markup with data attributes:
 *  data-hero-item       entrance sequence on load (in DOM order)
 *  data-reveal          fade-up once when scrolled into view
 *  data-stagger         children fade-up in sequence when container enters view
 *  data-count           number counts up when scrolled into view
 *  data-scene           SVG illustration drawn in on scroll (.sc-draw/.sc-pop/.sc-grow/.sc-fade)
 *  data-rule-draw       children draw their top rule (uses --p)
 * Everything is created in a gsap.context and reverted on unmount.
 */
export function usePageMotion(scope: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const root = scope.current
    if (!root || prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      const q = gsap.utils.toArray<HTMLElement>

      const hero = q('[data-hero-item]')
      if (hero.length) gsap.from(hero, { opacity: 0, filter: 'blur(12px)', stagger: 0.08, duration: 0.8, ease: 'power2.out', clearProps: 'opacity,filter' })

      const trigger = (el: Element) => ({ trigger: el, start: 'top 94%', once: true })

      q('[data-reveal]').forEach((el) =>
        gsap.from(el, { opacity: 0, filter: 'blur(12px)', duration: 0.8, ease: 'power2.out', clearProps: 'opacity,filter', scrollTrigger: trigger(el) }),
      )
      q('[data-stagger]').forEach((el) =>
        gsap.from(el.children, { opacity: 0, filter: 'blur(12px)', stagger: 0.07, duration: 0.8, ease: 'power2.out', clearProps: 'opacity,filter', scrollTrigger: trigger(el) }),
      )
      q('[data-rule-draw]').forEach((el) => {
        gsap.from(el.children, { '--p': 0, opacity: 0, filter: 'blur(10px)', stagger: 0.1, duration: 0.8, ease: 'power2.out', clearProps: 'opacity,filter', scrollTrigger: trigger(el) })
      })
      q('[data-count]').forEach((el) => {
        const end = Number(el.dataset.count)
        const o = { v: 0 }
        el.textContent = '0'
        gsap.to(o, { v: end, duration: 1.6, ease: 'power2.out', snap: { v: 1 }, onUpdate: () => (el.textContent = String(o.v)), scrollTrigger: trigger(el) })
      })

      q('[data-scene]').forEach((el) => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 82%', once: true } })
        const f = (sel: string) => el.querySelectorAll(sel)
        tl.from(f('.sc-fade'), { opacity: 0, duration: 0.7 }, 0)
          .from(f('.sc-grow'), { scaleX: 0, transformOrigin: '0% 50%', stagger: 0.08, duration: 0.6 }, 0.1)
          .from(f('.sc-draw'), { strokeDashoffset: 1, duration: 1.4, ease: 'power2.inOut' }, 0.15)
          .from(f('.sc-pop'), { scale: 0, opacity: 0, transformOrigin: '50% 50%', stagger: 0.09, duration: 0.55, ease: 'back.out(1.7)' }, 0.3)
      })
    }, root)
    const t = setTimeout(() => ScrollTrigger.refresh(), 150)
    return () => {
      clearTimeout(t)
      ctx.revert()
    }
  }, [scope])
}
