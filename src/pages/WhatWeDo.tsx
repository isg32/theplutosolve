import { Scene } from '../components/graphics'
import Page from '../components/Page'
import { Btn, PageHead, Tags } from '../components/ui'
import { services } from '../data/content'

export default function WhatWeDo() {
  return (
    <Page
      title="What We Do — PlutoSolve"
      description="Marketing, websites and technology, branding and creative, and business tools and automation — four areas of work, one team."
      path="/what-we-do"
    >
      <PageHead eyebrow="What we do" title="The right support for the" accent="work ahead." lede="Every business has different priorities. You might need more enquiries, a new website, a stronger brand or a better way to manage information. PlutoSolve brings together four areas of work to help you take the next step." />
      <div className="wrap rows">
        {services.map((s, i) => (
          <div className="row" key={s.name} data-reveal>
            <div>
              <span className="num">0{i + 1} — {s.name.toUpperCase()}</span>
              <h2>{s.headline}</h2>
              <p className="b">{s.body}</p>
              <p className="cl">{s.closing}</p>
            </div>
            <div className="row-r">
              <Scene index={i} />
              <Tags items={s.items} />
            </div>
          </div>
        ))}
      </div>
      <section className="pad soft">
        <div className="wrap intro" data-reveal>
          <h2>One requirement—or several. Let’s look at the whole picture.</h2>
          <p>A new website may need content and marketing to support it. An advertising campaign may need a landing page and a better way to follow up with leads. A growing team may need a dashboard to bring its information together. We can help with one part or bring the right services together around the project.</p>
          <div className="cta"><Btn to="/contact">TELL US WHAT YOU NEED</Btn></div>
        </div>
      </section>
    </Page>
  )
}
