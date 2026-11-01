import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { Orbit } from './graphics'

export function Btn({ to, variant = 'p', children, arrow = true }: { to: string; variant?: 'p' | 's'; children: ReactNode; arrow?: boolean }) {
  return (
    <Link className={`btn ${variant}`} to={to}>
      {children}
      {arrow && <span className="arr" aria-hidden="true">→</span>}
    </Link>
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
        <Btn to="/contact">{label}</Btn>
      </div>
    </section>
  )
}
