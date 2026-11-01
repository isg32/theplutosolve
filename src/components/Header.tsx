import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router'
import logo from '../assets/logo.png'
import { nav } from '../data/content'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    onScroll()
    addEventListener('scroll', onScroll, { passive: true })
    addEventListener('keydown', onKey)
    return () => {
      removeEventListener('scroll', onScroll)
      removeEventListener('keydown', onKey)
    }
  }, [])

  return (
    <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
      <div className="wrap nav">
        <Link className="brand" to="/" aria-label="PlutoSolve home">
          <img src={logo} width="41" height="34" alt="" />
          <span>pluto<span className="grad">solve</span></span>
        </Link>
        <button className="burger" aria-label="Menu" aria-expanded={open} aria-controls="nav" onClick={() => setOpen((o) => !o)}>
          <i /><i /><i />
        </button>
        <nav className={`links${open ? ' open' : ''}`} id="nav" aria-label="Main" onClick={(e) => (e.target as HTMLElement).closest('a') && setOpen(false)}>
          {nav.map((n) => (
            <NavLink key={n.to} to={n.to} end className={({ isActive }) => (isActive ? 'on' : '')}>{n.label}</NavLink>
          ))}
          <Link className="btn p mb" to="/contact">Let’s Talk <span className="arr" aria-hidden="true">→</span></Link>
        </nav>
        <Link className="btn p" to="/contact">Let’s Talk <span className="arr" aria-hidden="true">→</span></Link>
      </div>
    </header>
  )
}
