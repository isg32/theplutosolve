import { Link } from 'react-router'
import logo from '../assets/logo.png'
import { EMAIL, nav } from '../data/content'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="fg">
          <div>
            <div className="brand">
              <img src={logo} width="41" height="34" alt="" />
              <span>pluto<span className="grad">solve</span></span>
            </div>
            <p className="about">PlutoSolve helps businesses move forward with marketing, technology, branding and digital solutions.</p>
            <p className="tagline">Ideas to Impact.</p>
          </div>
          <div>
            <h4>Navigation</h4>
            {nav.map((n) => <Link key={n.to} to={n.to}>{n.label}</Link>)}
          </div>
          <div>
            <h4>Services</h4>
            <Link to="/what-we-do">Marketing</Link>
            <Link to="/what-we-do">Websites &amp; Technology</Link>
            <Link to="/what-we-do">Branding &amp; Creative</Link>
            <Link to="/what-we-do">Business Tools &amp; Automation</Link>
          </div>
          <div>
            <h4>Contact</h4>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </div>
        </div>
        <div className="copy">© 2026 PlutoSolve. All rights reserved.</div>
      </div>
    </footer>
  )
}
