import { Link } from 'react-router'
import { Marquee, Orbit, ServiceIcon } from '../components/graphics'
import HeroVisual from '../components/HeroVisual'
import Page from '../components/Page'
import { Btn, Clients, FinalCTA, MoreLink, SectionHead, Tags } from '../components/ui'
import { clients, industries, process, projects, services, whyPoints } from '../data/content'

const marquee = ['SEO', 'Google Ads', 'Meta Ads', 'Social Media', 'Lead Generation', 'Business Websites', 'Web Applications', 'Dashboards', 'Customer Portals', 'Brand Identity', 'Creative Design', 'Content Planning', 'CRM & Lead Management', 'Workflow Automation', 'Integrations', 'Internal Tools']

const metrics: [number, string][] = [
  [projects.length, 'Projects delivered'],
  [clients.length, 'Organisations served'],
  [industries.length, 'Industries'],
  [services.length, 'Service areas'],
]

export default function Home() {
  return (
    <Page
      title="PlutoSolve — Marketing, Technology & Creative Solutions"
      description="PlutoSolve helps businesses grow with marketing, websites, technology, branding and business tools."
      path="/"
    >
      <section className="hero">
        <Orbit />
        <div className="wrap hgrid">
          <div>
            <span className="eyebrow" data-hero-item>Marketing • Technology • Creative</span>
            <h1 data-hero-item>Good ideas deserve the right people to <span className="grad">make them happen.</span></h1>
            <p className="lead" data-hero-item>PlutoSolve helps businesses grow with marketing, websites, technology and creative solutions. Whether you need to reach more customers, build something digital or make your business work better, we bring the right skills together.</p>
            <div className="cta" data-hero-item>
              <Btn to="/contact">Let’s Talk</Btn>
              <Btn to="/our-work" variant="s" arrow={false}>See Our Work</Btn>
            </div>
          </div>
          <HeroVisual />
        </div>
      </section>

      <Marquee items={marquee} />

      <section className="pad soft">
        <div className="wrap intro" data-reveal>
          <h2>Different needs. One team to help you move forward.</h2>
          <p>Some businesses need a better way to reach customers. Some need a website or a digital product. Others need a stronger brand or better tools behind the scenes. PlutoSolve works across all these areas, helping businesses turn requirements into real, useful work.</p>
        </div>
      </section>

      <section className="glance">
        <div className="wrap">
          <div className="glance-head" data-reveal>
            <h2>Everything your business needs to grow, under one roof.</h2>
            <p>PlutoSolve helps businesses with marketing, websites and technology, branding and creative work, and practical business tools — as individual requirements or as one joined-up project.</p>
          </div>
          <div className="metrics" data-stagger>
            {metrics.map(([n, label]) => (
              <div key={label}>
                <strong data-count={n}>{n}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pad">
        <div className="wrap">
          <SectionHead eyebrow="Services" title="What can we help you with?" lede="From the first impression to the systems behind the business, we bring together the skills needed to build, reach and improve." />
          <div className="g4" data-stagger>
            {services.map((s, i) => (
              <Link className="card svc" to="/what-we-do" key={s.name}>
                <div className="ico"><ServiceIcon index={i} /></div>
                <h3>{s.name}</h3>
                <p>{s.short}</p>
                <small>{s.covers}</small>
              </Link>
            ))}
          </div>
          <MoreLink to="/what-we-do">EXPLORE WHAT WE DO</MoreLink>
        </div>
      </section>

      <section className="pad soft">
        <div className="wrap">
          <SectionHead eyebrow="Selected clients" title="A few of the teams we’ve worked with." lede="Our experience spans education, media, consumer brands, hospitality, technology and more." />
          <Clients items={clients} />
          <MoreLink to="/our-work">MEET OUR CLIENTS</MoreLink>
        </div>
      </section>

      <section className="pad">
        <div className="wrap">
          <SectionHead eyebrow="Why PlutoSolve" title="More than one way to solve a business need." />
          <div className="why" data-rule-draw>
            {whyPoints.map(([h, p]) => (
              <div key={h}><h3>{h}</h3><p>{p}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="pad soft">
        <div className="wrap">
          <SectionHead eyebrow="Industries" title="Experience across industries." lede="We work with organisations with different customers, goals and day-to-day challenges." />
          <Tags items={industries.map((i) => i[0])} />
          <MoreLink to="/our-work">EXPLORE OUR WORK</MoreLink>
        </div>
      </section>

      <section className="pad">
        <div className="wrap">
          <SectionHead eyebrow="How we work" title="A clear process. From first conversation to finished work." />
          <div className="steps" data-rule-draw>
            {process.map(([h, p]) => (
              <div className="step" key={h}><h3>{h}</h3><p>{p}</p></div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA tight title="Have something in mind? Let’s make a plan." text="Tell us what you’re looking to build, improve or achieve. We’ll start with a conversation and work out the next step together." label="START A CONVERSATION" />
    </Page>
  )
}
