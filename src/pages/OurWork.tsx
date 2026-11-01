import { useLayoutEffect, useRef, useState } from 'react'
import Page from '../components/Page'
import { Clients, FinalCTA, PageHead, SectionHead } from '../components/ui'
import { clients, filters, industries, projects, testimonial } from '../data/content'
import { workImages } from '../data/workImages'
import { gsap, prefersReducedMotion } from '../lib/gsap'

export default function OurWork() {
  const [cur, setCur] = useState('All')
  const grid = useRef<HTMLDivElement>(null)
  const first = useRef(true)
  const shown = projects.filter((p) => cur === 'All' || p.category === cur)

  useLayoutEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    if (!grid.current || prefersReducedMotion()) return
    const t = gsap.fromTo(grid.current.children, { opacity: 0, filter: 'blur(10px)' }, { opacity: 1, filter: 'blur(0px)', stagger: 0.07, duration: 0.6, clearProps: 'opacity,filter' })
    return () => {
      t.kill()
    }
  }, [cur])

  return (
    <Page
      title="Our Work — PlutoSolve"
      description="Organisations and projects PlutoSolve has supported across marketing, digital platforms, branding and business tools."
      path="/our-work"
    >
      <PageHead eyebrow="Our work" title="The work says" accent="more than we can." lede="We’ve worked with businesses and organisations across different industries, supporting projects in marketing, digital platforms, branding and business tools." />

      <section className="pad soft">
        <div className="wrap">
          <SectionHead title="Some of the organisations we’ve worked with." />
          <Clients items={clients} />
        </div>
      </section>

      <section className="pad">
        <div className="wrap">
          <SectionHead title="A closer look at selected projects." />
          <div className="filters" role="group" aria-label="Filter projects" data-reveal>
            {filters.map((f) => (
              <button key={f} className={f === cur ? 'on' : ''} aria-pressed={f === cur} onClick={() => setCur(f)}>{f} <span className="count">{f === 'All' ? projects.length : projects.filter((p) => p.category === f).length}</span></button>
            ))}
          </div>
          <div className="cases" ref={grid} data-stagger={cur === 'All' ? '' : undefined} key={cur === 'All' ? 'all' : 'f'}>
            {shown.length ? (
              shown.map((p) => (
                <article className="card case" key={p.slug}>
                  <div className={`shot${workImages[p.slug] ? '' : ' ph'}`}>
                    {workImages[p.slug] ? (
                      <img src={workImages[p.slug]} alt={`${p.name} website preview`} loading="lazy" width="1200" height="750" />
                    ) : (
                      <span aria-hidden="true">{p.name.replace(/^The /, '').split(' ').map((w) => w[0]).join('').slice(0, 3)}</span>
                    )}
                  </div>
                  <small>{p.category}</small>
                  <h3>{p.name}</h3>
                  <p>{p.text}</p>
                  <ul className="chips">{p.tags.map((t) => <li key={t}>{t}</li>)}</ul>
                  {p.url && (
                    <a className="visit" href={p.url} target="_blank" rel="noopener noreferrer">
                      Visit live site <span className="arr" aria-hidden="true">↗</span>
                    </a>
                  )}
                </article>
              ))
            ) : (
              <p className="empty">More projects will be added soon.</p>
            )}
          </div>
        </div>
      </section>

      <section className="pad soft">
        <div className="wrap">
          <SectionHead eyebrow="In their words" title="What working with us is like." />
          <figure className="quote" data-reveal>
            <blockquote>“{testimonial.quote}”</blockquote>
            <figcaption>
              <img src={workImages['sunitta-swaarup']} alt="" width="52" height="52" />
              <div><strong>{testimonial.name}</strong><span>{testimonial.role}</span></div>
              <em>{testimonial.tag}</em>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="pad">
        <div className="wrap">
          <SectionHead title="Different industries. A range of practical needs." />
          <div className="ind" data-stagger>
            {industries.map(([h, p]) => (
              <div key={h}><h3>{h}</h3><p>{p}</p></div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA title="Have a project like one of these?" text="Tell us what you’re working on. We’d be glad to understand the requirement and see how we can help." label="LET’S TALK ABOUT YOUR PROJECT" />
    </Page>
  )
}
