import { useCallback, useEffect, useRef } from 'react'
import { useLocation } from 'react-router'

const MIN_FIRST_VISIT_MS = 600 // long enough to read as intentional, not a flash
const MIN_REPEAT_MS = 150
const MAX_BOOT_MS = 1200 // most we wait for assets once the app is ready
const NAV_SHOW_AFTER_MS = 140 // fast navigations never show the overlay
const NAV_FAILSAFE_MS = 8000
const LEAVE_MS = 500

/** An image worth holding the loading screen for: in the top of the first screen, not the loader's own logo. */
function isCritical(img: HTMLImageElement) {
  if (img.closest('#site-loader')) return false
  const r = img.getBoundingClientRect()
  return r.width > 0 && r.height > 0 && r.top < window.innerHeight * 0.75 && r.bottom > 0
}

function imageReady(img: HTMLImageElement): Promise<void> {
  if (img.complete) return Promise.resolve() // also true for broken images: don't wait on those
  return new Promise((resolve) => {
    img.addEventListener('load', () => resolve(), { once: true })
    img.addEventListener('error', () => resolve(), { once: true })
  })
}

/**
 * Controls the full-screen loading screen (markup + critical CSS live in index.html
 * so it paints before any JS). Modelled on the HEMM site's loader.
 *
 * First load: an inline script adds `is-loading` to <html> before first paint (and
 * removes it after 7s regardless). Once fonts and first-screen images are ready the
 * overlay fades out, the scroll lock lifts and the page's entrance animations play
 * (they wait on the `site-ready` event, see whenReady in lib/gsap.ts).
 *
 * Navigation: a click on an internal link shows the overlay if the route has not
 * changed after ~140ms; same-page links are ignored and an 8s failsafe lifts it.
 */
export default function SiteLoader() {
  const { pathname } = useLocation()
  const prevPath = useRef(pathname)
  const showTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const failTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const booted = useRef(false)

  // ---- First load ----
  useEffect(() => {
    const root = document.documentElement
    const el = document.getElementById('site-loader')
    if (booted.current || !el || !root.classList.contains('is-loading')) return
    booted.current = true

    const started = performance.now()
    let seenBefore = false
    try {
      seenBefore = sessionStorage.getItem('plutosolve.entered') === '1'
    } catch {
      /* storage unavailable */
    }
    const minMs = seenBefore ? MIN_REPEAT_MS : MIN_FIRST_VISIT_MS

    const setProgress = (p: number) => {
      el.dataset.progress = '1'
      el.style.setProperty('--p', String(Math.min(1, Math.max(0.08, p))))
    }

    // iOS ignores overflow:hidden for touch panning, so cancel it outright while the screen is up.
    const blockTouchScroll = (e: TouchEvent) => e.preventDefault()
    document.addEventListener('touchmove', blockTouchScroll, { passive: false })

    let finished = false
    const finish = () => {
      if (finished) return
      finished = true
      document.removeEventListener('touchmove', blockTouchScroll)
      try {
        sessionStorage.setItem('plutosolve.entered', '1')
      } catch {
        /* storage unavailable */
      }
      el.classList.add('is-leaving')
      root.classList.remove('is-loading') // lifts the scroll lock, starts entrances under the fading overlay
      window.dispatchEvent(new Event('site-ready'))
      window.setTimeout(() => el.classList.remove('is-leaving'), LEAVE_MS + 80)
    }

    window.setTimeout(finish, MAX_BOOT_MS)
    ;(async () => {
      // Let layout settle so we can tell which images are in the first screen.
      await new Promise<void>((r) => requestAnimationFrame(() => requestAnimationFrame(() => r())))
      const images = [...document.images].filter(isCritical)
      const tasks: Promise<void>[] = [(document.fonts?.ready ?? Promise.resolve()).then(() => undefined), ...images.map(imageReady)]
      setProgress(0.1)
      let done = 0
      tasks.forEach((t) =>
        t.then(() => {
          done += 1
          setProgress(0.1 + (0.9 * done) / tasks.length)
        }),
      )
      await Promise.all(tasks)
      const remaining = minMs - (performance.now() - started)
      if (remaining > 0) await new Promise((r) => setTimeout(r, remaining))
      finish()
    })()
  }, [])

  // ---- Navigation ----
  const hideNav = useCallback(() => {
    const root = document.documentElement
    const el = document.getElementById('site-loader')
    if (showTimer.current) clearTimeout(showTimer.current)
    if (failTimer.current) clearTimeout(failTimer.current)
    showTimer.current = failTimer.current = null
    if (!el || !root.classList.contains('is-navigating')) return
    el.classList.add('is-leaving')
    window.setTimeout(() => {
      root.classList.remove('is-navigating')
      el.classList.remove('is-leaving')
    }, 320)
  }, [])

  // The route changed: the new page is ready, so lift the overlay (or cancel it before it shows).
  useEffect(() => {
    if (prevPath.current === pathname) return
    prevPath.current = pathname
    hideNav()
  }, [pathname, hideNav])

  useEffect(() => {
    const root = document.documentElement

    function onClick(e: MouseEvent) {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      if (root.classList.contains('is-loading')) return
      const a = (e.target as Element).closest?.('a[href]') as HTMLAnchorElement | null
      if (!a || a.target === '_blank' || a.hasAttribute('download')) return
      let url: URL
      try {
        url = new URL(a.href, window.location.href)
      } catch {
        return
      }
      if (url.origin !== window.location.origin) return // external, mailto:, tel:
      if (url.pathname === window.location.pathname) return // same page: nothing would ever lift the overlay

      if (showTimer.current) clearTimeout(showTimer.current)
      showTimer.current = setTimeout(() => {
        const el = document.getElementById('site-loader')
        if (!el) return
        el.dataset.mode = 'nav'
        root.classList.add('is-navigating')
        failTimer.current = setTimeout(hideNav, NAV_FAILSAFE_MS)
      }, NAV_SHOW_AFTER_MS)
    }

    // Coming back via the bfcache must not resurrect a stale overlay.
    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) {
        root.classList.remove('is-navigating')
        document.getElementById('site-loader')?.classList.remove('is-leaving')
      }
    }

    document.addEventListener('click', onClick)
    window.addEventListener('pageshow', onPageShow)
    return () => {
      document.removeEventListener('click', onClick)
      window.removeEventListener('pageshow', onPageShow)
    }
  }, [hideNav])

  return null
}
