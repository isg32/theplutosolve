import Page from '../components/Page'
import { FinalCTA, PageHead } from '../components/ui'
import { testimonials, type Testimonial } from '../data/content'
import { workImages } from '../data/workImages'

const initials = (n: string) => n.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()

function Person({ t, size = 52 }: { t: Testimonial; size?: number }) {
  const src = t.photo ? workImages[t.photo] : undefined
  return src ? (
    <img className="t-av" src={src} alt="" width={size} height={size} loading="lazy" />
  ) : (
    <span className="t-av ini" aria-hidden="true" style={{ width: size, height: size }}>{initials(t.name)}</span>
  )
}

function Quote({ t }: { t: Testimonial }) {
  return (
    <figure className="tcard">
      <svg className="qmark" viewBox="0 0 32 24" aria-hidden="true"><path d="M0 24V13.5C0 5.6 4.3 1 12 0v4.6C8 5.5 6.2 8 6.2 11H12V24H0zm20 0V13.5C20 5.6 24.3 1 32 0v4.6c-4 .9-5.8 3.4-5.8 6.4H32V24H20z" /></svg>
      <blockquote>{t.quote}</blockquote>
      <figcaption>
        <Person t={t} />
        <div><strong>{t.name}</strong><span>{t.role}</span></div>
        <em>{t.service}</em>
      </figcaption>
    </figure>
  )
}

export default function Testimonials() {
  const [lead, ...rest] = testimonials
  return (
    <Page
      title="Testimonials — PlutoSolve"
      description="What clients say about working with PlutoSolve across marketing, websites, branding and business tools."
      path="/testimonials"
    >
      <PageHead eyebrow="Testimonials" title="What working with us" accent="is like." lede="Words from the founders and teams we’ve worked with, across marketing, websites, branding and business consulting." />

      <section className="pad soft">
        <div className="wrap">
          <figure className="tlead" data-reveal>
            <svg className="qmark" viewBox="0 0 32 24" aria-hidden="true"><path d="M0 24V13.5C0 5.6 4.3 1 12 0v4.6C8 5.5 6.2 8 6.2 11H12V24H0zm20 0V13.5C20 5.6 24.3 1 32 0v4.6c-4 .9-5.8 3.4-5.8 6.4H32V24H20z" /></svg>
            <blockquote>{lead.quote}</blockquote>
            <figcaption>
              <Person t={lead} size={60} />
              <div><strong>{lead.name}</strong><span>{lead.role}</span></div>
              <em>{lead.service}</em>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="pad">
        <div className="wrap">
          <div className="tgrid" data-stagger>
            {rest.map((t) => <Quote key={t.name} t={t} />)}
          </div>
        </div>
      </section>

      <FinalCTA tight title="Have something in mind? Let’s make a plan." text="Tell us what you’re looking to build, improve or achieve. We’ll start with a conversation and work out the next step together." label="START A CONVERSATION" />
    </Page>
  )
}
