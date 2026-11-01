import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { ScrollTrigger } from '../lib/gsap'

export function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    const t = setTimeout(() => ScrollTrigger.refresh(), 200)
    return () => clearTimeout(t)
  }, [pathname])
  return null
}

export function BackToTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const on = () => setShow(scrollY > 600)
    on()
    addEventListener('scroll', on, { passive: true })
    return () => removeEventListener('scroll', on)
  }, [])
  return (
    <button className={`totop${show ? ' show' : ''}`} aria-label="Back to top" tabIndex={show ? 0 : -1} onClick={() => scrollTo({ top: 0, behavior: 'smooth' })}>
      ↑
    </button>
  )
}
