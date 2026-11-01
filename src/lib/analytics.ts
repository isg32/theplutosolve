/**
 * Minimal event hook. It does nothing unless the site loads an analytics/tag-manager
 * layer that exposes `window.dataLayer`, so no tracking happens without consent setup.
 */
export function track(event: string, data: Record<string, unknown> = {}) {
  try {
    const w = window as unknown as { dataLayer?: Record<string, unknown>[] }
    w.dataLayer?.push({ event, ...data })
  } catch {
    /* analytics must never break the page */
  }
}
