import type { Testimonial } from '../data/content'
import { workImages } from '../data/workImages'

const initials = (n: string) => n.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()

/** Round photo of the person quoted, falling back to initials when there is no photo yet. */
export default function Avatar({ t, size = 52 }: { t: Testimonial; size?: number }) {
  const src = t.photo ? workImages[t.photo] : undefined
  return src ? (
    <img className="t-av" src={src} alt="" width={size} height={size} loading="lazy" />
  ) : (
    <span className="t-av ini" aria-hidden="true" style={{ width: size, height: size, fontSize: size * 0.34 }}>{initials(t.name)}</span>
  )
}
