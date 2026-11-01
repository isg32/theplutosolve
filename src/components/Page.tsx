import { useLayoutEffect, useRef, type ReactNode } from 'react'
import { usePageMotion } from '../hooks/usePageMotion'
import { useSeo } from '../hooks/useSeo'
import { gsap, prefersReducedMotion, whenReady } from '../lib/gsap'

type Props = { title: string; description: string; path: string; children: ReactNode }

export default function Page({ title, description, path, children }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  useSeo(title, description, path)
  usePageMotion(ref)
  useLayoutEffect(() => {
    if (!ref.current || prefersReducedMotion()) return
    const el = ref.current
    let tween: gsap.core.Tween | undefined
    const cancel = whenReady(() => {
      tween = gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'none', clearProps: 'opacity' })
    })
    return () => {
      cancel()
      tween?.kill()
    }
  }, [])
  return <div ref={ref}>{children}</div>
}
