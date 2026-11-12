import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { useEnquiry } from './EnquiryModal'
import { Orbit } from './graphics'
import { SOCIAL } from '../data/content'

export function Btn({ to, variant = 'p', children, arrow = true }: { to: string; variant?: 'p' | 's'; children: ReactNode; arrow?: boolean }) {
  return (
    <Link className={`btn ${variant}`} to={to}>
      {children}
      {arrow && <span className="arr" aria-hidden="true">→</span>}
    </Link>
  )
}

/** Opens the enquiry popup (replaces links that used to go to the Contact page). */
export function EnquiryBtn({ variant = 'p', children, arrow = true, className = '' }: { variant?: 'p' | 's'; children: ReactNode; arrow?: boolean; className?: string }) {
  const { open } = useEnquiry()
  return (
    <button type="button" className={`btn ${variant} ${className}`.trim()} onClick={open}>
      {children}
      {arrow && <span className="arr" aria-hidden="true">→</span>}
    </button>
  )
}

const ICONS = {
  instagram: <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 1.8A3.7 3.7 0 0 0 3.8 7.5v9a3.7 3.7 0 0 0 3.7 3.7h9a3.7 3.7 0 0 0 3.7-3.7v-9a3.7 3.7 0 0 0-3.7-3.7h-9ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4Zm5.2-2.6a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Z" />,
  linkedin: <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11.5H3V9.75Zm6.5 0h3.83v1.57h.06c.53-1 1.84-2.07 3.78-2.07 4.04 0 4.78 2.66 4.78 6.12v5.88h-4v-5.2c0-1.24-.02-2.84-1.73-2.84-1.73 0-2 1.35-2 2.75v5.29h-4V9.75Z" />,
}

/** Instagram and LinkedIn buttons. `tone="dark"` is for use on the navy call-to-action band. */
export function Social({ tone = 'light', label = true }: { tone?: 'light' | 'dark'; label?: boolean }) {
  return (
    <div className={`social ${tone}`}>
      {SOCIAL.map((s) => (
        <a key={s.name} className="soc" href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`PlutoSolve on ${s.name}`}>
          <svg viewBox="0 0 24 24" aria-hidden="true">{ICONS[s.icon]}</svg>
          {label && <span>{s.name}</span>}
        </a>
      ))}
    </div>
  )
}

export function MoreLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link className="more" to={to} data-reveal>
      {children} <span className="arr" aria-hidden="true">→</span>
    </Link>
  )
}

export function SectionHead({ eyebrow, title, lede }: { eyebrow?: string; title: string; lede?: string }) {
  return (
    <div className="head" data-reveal>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {lede && <p>{lede}</p>}
    </div>
  )
}

export function PageHead({ eyebrow, title, accent, lede }: { eyebrow: string; title: string; accent: string; lede: string }) {
  return (
    <section className="pagehead">
      <Orbit />
      <div className="wrap">
        <span className="eyebrow" data-hero-item>{eyebrow}</span>
        <h1 data-hero-item>{title} <span className="grad">{accent}</span></h1>
        <p data-hero-item>{lede}</p>
      </div>
    </section>
  )
}

export function Tags({ items }: { items: string[] }) {
  return (
    <div className="tags" data-stagger>
      {items.map((t) => <span className="tag" key={t}>{t}</span>)}
    </div>
  )
}

export function Clients({ items }: { items: string[] }) {
  return (
    <div className="logos" data-stagger>
      {items.map((c) => <div className="logo" key={c}>{c}</div>)}
    </div>
  )
}

export function FinalCTA({ title, text, label, tight = false }: { title: string; text: string; label: string; tight?: boolean }) {
  return (
    <section className={`wrap cta-sec${tight ? ' tight' : ''}`}>
      <div className="final" data-reveal>
        <Orbit tone="dark" />
        <h2>{title}</h2>
        <p>{text}</p>
        <EnquiryBtn>{label}</EnquiryBtn>
        <p className="final-soc">Or follow us</p>
        <Social tone="dark" />
      </div>
    </section>
  )
}
