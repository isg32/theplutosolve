import { useRef, type ReactNode } from 'react'
import Carousel, { type Slide } from '../components/Carousel'
import { Frame } from '../components/Frame'
import Page from '../components/Page'
import PortfolioForm from '../components/PortfolioForm'
import { Clients, Tags } from '../components/ui'
import { clients, industries, projects, testimonials } from '../data/content'
import { client, creative, hero, industry, marketing, request, SEO, systems, testimonialsCopy, websites, type Capability } from '../data/ourWork'
import { workImages } from '../data/workImages'

/* ───────── slide builders (all screenshots are real captures of live pages or real work) ───────── */

const bySlug = (slug: string) => projects.find((p) => p.slug === slug)!

type Real = { img: string; title: string; sub: string; alt: string; href?: string; cta?: string; bare?: boolean; tall?: boolean }

function RealShot({ img, title, sub, alt, href, cta = 'Visit live page', bare, tall }: Real) {
  return (
    <figure className="car-fig">
      <Frame bare={bare} className={tall ? 'tall' : ''}>
        <img src={workImages[img]} alt={alt} loading="lazy" width="1200" height="750" />
      </Frame>
      <figcaption>
        <strong>{title}</strong>
        <span>{sub}</span>
        {href && <a href={href} target="_blank" rel="noopener noreferrer">{cta} <span aria-hidden="true">↗</span></a>}
      </figcaption>
    </figure>
  )
}

const slide = (key: string, r: Real): Slide => ({ key, label: r.title, node: <RealShot {...r} /> })

const websiteSlugs = ['amar-ujala-disha', 'hemm', 'nava-dishe', 'prima', 'sumaani', 'shia-bazaar', 'chains-and-spares', 'cf-design']
const websiteSlides: Slide[] = websiteSlugs.map((s) => {
  const p = bySlug(s)
  return slide(s, { img: s, title: p.name, sub: p.tags.join(' · '), alt: `${p.name}: ${p.tags[0].toLowerCase()} by PlutoSolve`, href: p.url, cta: 'Visit live site' })
})

// Systems: real pages from live builds that show the functionality behind them
const systemSlides: Slide[] = [
  slide('disha-results', { img: 'disha-results', title: 'DISHA: check your results', sub: "Results lookup for Amar Ujala's scholarship exam", alt: 'DISHA scholarship results lookup page', href: 'https://disha.amarujaladigital.com/results.html' }),
  slide('chains-quote', { img: 'chains-quote', title: 'Chains & Spares: home with quote form', sub: 'Lead capture with a built-in quote request', alt: 'Chains & Spares home page with quote request form', href: 'https://www.chainsandspares.com/' }),
  slide('chains-products', { img: 'chains-products', title: 'Chains & Spares: all products', sub: 'A structured product catalogue', alt: 'Chains & Spares structured product catalogue page', href: 'https://www.chainsandspares.com/products' }),
  slide('shia-books', { img: 'shia-books', title: 'Shia Bazaar: Islamic books', sub: 'Catalogue of 1,300+ items in Urdu, Hindi, Bengali and Arabic', alt: 'Shia Bazaar online store category page for Islamic books', href: 'https://shiabazaar.vercel.app/category/books' }),
  slide('educators-join', { img: 'educators-join', title: 'Educators Federation: join the federation', sub: 'A membership journey for educators and institutions', alt: 'Educators Federation membership sign-up page', href: 'https://educatorsfederation.vercel.app/join' }),
]

// Marketing: real social, reporting and campaign-site work
const marketingSlides: Slide[] = [
  slide('adornn-post', { img: 'adornn-herbal', title: 'Adornn Herbal: Instagram post', sub: 'Social media management and performance marketing', alt: 'Instagram post designed for Adornn Herbal hair-care range', href: 'https://www.instagram.com/adornnherbal/', cta: 'View on Instagram', bare: true, tall: true }),
  slide('adelphia-insights', { img: 'adelphia-insights', title: 'Adelphia Girls Hostel: Instagram insights', sub: 'Last 30 days, Jan 17 – Feb 15. Source: Instagram Insights', alt: 'Instagram Insights views report for Adelphia Girls Hostel covering a 30-day period', bare: true, tall: true }),
  slide('adelphia-site', { img: 'adelphia-site', title: 'Adelphia Girls Hostel: website', sub: 'Website, Instagram management and Meta Ads for lead generation', alt: 'Adelphia Girls Hostel website supporting Meta Ads lead generation', href: 'https://www.adelphiagirlshostel.com/', cta: 'Visit live site' }),
]

// Creative: real identity, packaging and print work
const creativeSlides: Slide[] = [
  slide('packaging', { img: 'adornn-packaging', title: 'Adornn Herbal: Herbaura hair-oil packaging', sub: 'Packaging design', alt: 'Herbaura hair oil packaging design for Adornn Herbal', bare: true }),
  slide('brochure', { img: 'cf-brochure', title: 'CF Design: printed brochure', sub: 'Brochure design alongside the website', alt: 'Printed brochure designed for CF Design carpentry and outdoor builds', bare: true }),
  slide('reg-form', { img: 'olympiads-form', title: 'National Olympiads: student registration form 2026–27', sub: 'Registration form design that matches the online flow', alt: 'Printed student registration form for National Olympiads 2026-27', bare: true, tall: true }),
  slide('olympiads-site', { img: 'national-olympiads', title: 'National Olympiads: website', sub: 'Website development for the Olympiad programme by Amar Ujala', alt: 'National Olympiads by Amar Ujala website', cta: 'Visit live page' }),
]

const quoteSlides: Slide[] = testimonials.map((t) => ({
  key: t.name,
  label: `${t.name}, ${t.role}`,
  node: (
    <figure className="tq">
      <blockquote>“{t.quote}”</blockquote>
      <figcaption>
        <strong>{t.name}</strong>
        <span>{t.role}</span>
        <em>{t.service}</em>
      </figcaption>
    </figure>
  ),
}))

/* ───────── layout pieces ───────── */

function CapabilitySection({ cap, slides, flip = false, tone, strip }: { cap: Capability; slides: Slide[]; flip?: boolean; tone: 'soft' | 'white'; strip?: ReactNode }) {
  return (
    <section id={cap.id} className={`pad cap${tone === 'soft' ? ' soft' : ''}`}>
      <div className={`wrap cap-grid${flip ? ' flip' : ''}`}>
        <div className="cap-copy">
          <span className="eyebrow" data-reveal>{cap.eyebrow}</span>
          <h2 data-reveal>{cap.headline}</h2>
          <p className="cap-intro" data-reveal>{cap.intro}</p>
          <div className="cap-blocks" data-stagger>
            {cap.blocks.map((b, i) =>
              b.title ? (
                <details key={i} className="acc" open={i === 0 || undefined}>
                  <summary><h3>{b.title}</h3></summary>
                  <p>{b.text}</p>
                </details>
              ) : (
                <p key={i} className="cap-p">{b.text}</p>
              ),
            )}
          </div>
          {cap.closing && <p className="cap-closing" data-reveal>{cap.closing}</p>}
          <div data-reveal><Tags items={cap.tags} /></div>
          {strip}
        </div>
        <div className="cap-visual" data-reveal>
          <h3 className="cap-vh">{cap.visualHeading}</h3>
          <Carousel slides={slides} label={cap.visualHeading} />
        </div>
      </div>
    </section>
  )
}

const WEBSITE_COUNT = 13 // website / platform projects in the current project list
const SECTOR_COUNT = 4 // project categories: Education, Commerce, Property & stays, Brands & causes

export default function OurWork() {
  const formRef = useRef<HTMLDivElement>(null)
  const focusForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    window.setTimeout(() => formRef.current?.querySelector<HTMLInputElement>('input[name="name"]')?.focus({ preventScroll: true }), 500)
  }

  return (
    <Page title={SEO.title} description={SEO.description} path="/our-work">
      {/* 01 / HERO */}
      <section className="ow-hero">
        <div className="wrap ow-hgrid">
          <div>
            <span className="eyebrow" data-hero-item>{hero.eyebrow}</span>
            <h1 data-hero-item>{hero.headline}</h1>
            <p className="lead" data-hero-item>{hero.support}</p>
            <p className="ow-second" data-hero-item>{hero.secondary}</p>
            <div className="cta" data-hero-item>
              <a className="btn p" href="#websites">{hero.primary} <span className="arr" aria-hidden="true">→</span></a>
              <a className="btn s" href="#portfolio">{hero.secondaryBtn}</a>
            </div>
          </div>
          <div className="comp" data-stagger>
            <div className="comp-a"><Frame><img src={workImages['amar-ujala-disha']} alt="DISHA scholarship exam website and partner dashboard built by PlutoSolve" width="1200" height="750" /></Frame></div>
            <div className="comp-b"><Frame><img src={workImages['hemm']} alt="HEMM e-commerce storefront design and development" width="1200" height="750" /></Frame></div>
            <div className="comp-c"><Frame><img src={workImages['adornn-herbal']} alt="Adornn Herbal social media creative" width="675" height="844" /></Frame></div>
          </div>
        </div>
      </section>

      {/* 02 / CLIENT EXPERIENCE */}
      <section className="pad soft" id="clients">
        <div className="wrap">
          <div className="head wide" data-reveal>
            <span className="eyebrow">{client.eyebrow}</span>
            <h2>{client.headline}</h2>
            <p>{client.support}</p>
          </div>
          <div className="metrics m3" data-stagger>
            {[[clients.length, 'Clients and organisations'], [projects.length, 'Projects and engagements'], [industries.length, 'Industries']].map(([n, l]) => (
              <div key={l as string}><strong data-count={n as number}>{n}</strong><span>{l}</span></div>
            ))}
          </div>
          <h3 className="ow-sub" data-reveal>{client.logos}</h3>
          <Clients items={clients} />
          <p className="ow-note" data-reveal>{client.note}</p>
        </div>
      </section>

      {/* 03 / INDUSTRY EXPERIENCE */}
      <section className="pad" id="industries">
        <div className="wrap">
          <div className="head wide" data-reveal>
            <span className="eyebrow">{industry.eyebrow}</span>
            <h2>{industry.headline}</h2>
            <p>{industry.support}</p>
          </div>
          <div className="ind" data-stagger>
            {industries.map(([h, p]) => (
              <div key={h}><h3>{h}</h3><p>{p}</p></div>
            ))}
          </div>
          <p className="ow-closing" data-reveal>{industry.closing}</p>
        </div>
      </section>

      {/* 04–07 / CAPABILITIES */}
      <CapabilitySection
        cap={websites}
        slides={websiteSlides}
        tone="soft"
        strip={<ul className="strip" data-reveal><li><b>{WEBSITE_COUNT}</b> websites and platforms delivered</li><li><b>{SECTOR_COUNT}</b> sectors supported</li></ul>}
      />
      <CapabilitySection cap={systems} slides={systemSlides} flip tone="white" />
      <CapabilitySection cap={marketing} slides={marketingSlides} tone="soft" />
      <CapabilitySection cap={creative} slides={creativeSlides} flip tone="white" />

      {/* 08 / TESTIMONIALS */}
      <section className="pad soft" id="testimonials">
        <div className="wrap">
          <div className="head wide" data-reveal>
            <span className="eyebrow">{testimonialsCopy.eyebrow}</span>
            <h2>{testimonialsCopy.headline}</h2>
            <p>{testimonialsCopy.intro}</p>
          </div>
          <div className="tq-wrap" data-reveal>
            <Carousel slides={quoteSlides} label="Client testimonials" />
          </div>
        </div>
      </section>

      {/* 09 / REQUEST THE COMPLETE PORTFOLIO */}
      <section className="pad" id="portfolio">
        <div className="wrap pf-grid2">
          <div className="pf-copy">
            <span className="eyebrow" data-reveal>{request.eyebrow}</span>
            <h2 data-reveal>{request.headline}</h2>
            <p data-reveal>{request.p1}</p>
            <p data-reveal>{request.p2}</p>
            <div data-reveal><button type="button" className="btn p" onClick={focusForm}>{request.cta} <span className="arr" aria-hidden="true">→</span></button></div>
          </div>
          <div ref={formRef} data-reveal>
            <PortfolioForm />
          </div>
        </div>
      </section>
    </Page>
  )
}
