import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
gsap.defaults({ ease: 'power3.out', duration: 0.7 })

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Run `fn` once the loading screen has lifted (immediately if it is not showing).
 * Returns a cancel function for effect cleanup. SiteLoader / the inline failsafe
 * in index.html dispatch the 'site-ready' event.
 */
export function whenReady(fn: () => void): () => void {
  if (typeof document === 'undefined' || !document.documentElement.classList.contains('is-loading')) {
    fn()
    return () => {}
  }
  const run = () => fn()
  window.addEventListener('site-ready', run, { once: true })
  return () => window.removeEventListener('site-ready', run)
}

export { gsap, ScrollTrigger }
