import { useRef, type ReactNode } from 'react'
import Carousel, { type Slide } from '../components/Carousel'
import { Frame, MockBrand, MockDashboard, MockFunnel, MockPipeline, MockReport, MockRoles } from '../components/Mocks'
import Page from '../components/Page'
import PortfolioForm from '../components/PortfolioForm'
import { Clients, Tags } from '../components/ui'
import { clients, industries, projects, testimonials } from '../data/content'
import { client, creative, hero, industry, marketing, request, SEO, systems, testimonialsCopy, websites, type Capability } from '../data/ourWork'
import { workImages } from '../data/workImages'

/* ───────── slide builders ───────── */

const bySlug = (slug: string) => projects.find((p) => p.slug === slug)!

/** A real project screenshot in a frame, with a caption and a link to the live site where there is one. */
function Shot({ slug, alt, tall = false }: { slug: string; alt: string; tall?: boolean }) {
  const p = bySlug(slug)
  const link = p.url ?? p.links?.[0]?.href
  const linkLabel = p.url ? 'Visit live site' : p.links?.[0]?.label
  return (
    <figure className="car-fig">
      <Frame className={tall ? 'tall' : ''}>
        <img src={workImages[slug]} alt={alt} loading="lazy" width="1200" height="750" />
      </Frame>
      <figcaption>
        <strong>{p.name}</strong>
        <span>{p.tags.join(' · ')}</span>
        {link && <a href={link} target="_blank" rel="noopener noreferrer">{linkLabel} <span aria-hidden="true">↗</span></a>}
      </figcaption>
    </figure>
  )
}

function Illustrative({ children, title }: { children: ReactNode; title: string }) {
  return (
    <figure className="car-fig">
      {children}
      <figcaption>
        <strong>{title}</strong>
        <span className="illus">Illustrative screen. Not a client screenshot.</span>
      </figcaption>
    </figure>
  )
}

const websiteSlugs = ['amar-ujala-disha', 'hemm', 'nava-dishe', 'prima', 'sumaani', 'shia-bazaar', 'chains-and-spares', 'cf-design']
const websiteSlides: Slide[] = websiteSlugs.map((s) => ({
  key: s,
  label: bySlug(s).name,
  node: <Shot slug={s} alt={`${bySlug(s).name}: ${bySlug(s).tags[0].toLowerCase()} by PlutoSolve`} />,
}))

const systemSlides: Slide[] = [
  { key: 'dash', label: 'Management dashboard', node: <Illustrative title="Management dashboard"><MockDashboard /></Illustrative> },
  { key: 'crm', label: 'CRM and lead pipeline', node: <Illustrative title="CRM and lead management"><MockPipeline /></Illustrative> },
  { key: 'roles', label: 'Roles and permissions', node: <Illustrative title="User roles and permissions"><MockRoles /></Illustrative> },
]

const marketingSlides: Slide[] = [
  { key: 'social', label: 'Social creative for Adornn Herbal', node: <Shot slug="adornn-herbal" alt="Instagram creative for Adornn Herbal, part of a social media and performance marketing engagement" tall /> },
  { key: 'report', label: 'Campaign report', node: <Illustrative title="Campaign reporting with baseline, period and source"><MockReport /></Illustrative> },
  { key: 'funnel', label: 'Marketing funnel', node: <Illustrative title="From awareness to customer"><MockFunnel /></Illustrative> },
]

const creativeSlides: Slide[] = [
  { key: 'olympiads', label: 'National Olympiads website and registration form', node: <Shot slug="national-olympiads" alt="National Olympiads website and printed student registration form design" /> },
  { key: 'brand', label: 'Brand identity board', node: <Illustrative title="Identity, colour and type"><MockBrand /></Illustrative> },
  { key: 'hemm', label: 'HEMM storefront', node: <Shot slug="hemm" alt="HEMM women's clothing storefront design" /> },
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
            {cap.blocks.map((b, i) => (
              <div key={i}>
                {b.title && <h3>{b.title}</h3>}
                <p>{b.text}</p>
              </div>
            ))}
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
