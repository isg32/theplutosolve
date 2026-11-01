import Page from '../components/Page'
import { FinalCTA, PageHead } from '../components/ui'

export default function About() {
  return (
    <Page
      title="About Us — PlutoSolve"
      description="A practical team across marketing, technology and creative work, started in 2020 to bring that support together for businesses."
      path="/about-us"
    >
      <PageHead eyebrow="About us" title="A practical team for businesses" accent="ready to move forward." lede="PlutoSolve was built around a simple idea: businesses should be able to find the right marketing, technology and creative support without having to piece everything together themselves." />

      <section className="pad soft">
        <div className="wrap story">
          <div data-reveal>
            <span className="eyebrow">Our story</span>
            <h2>It started with a simple observation.</h2>
          </div>
          <div className="copy-col" data-stagger>
            <p>A business can have a great product but struggle to reach the right people. It can attract enquiries but lack the tools to manage them. It can have an idea for a digital product but need the people to bring it to life.</p>
            <p>These challenges are connected, but the support businesses need is often spread across different teams and providers.</p>
            <p>PlutoSolve was started in 2020 to bring more of that work together. With experience across marketing and technology, we help businesses move from an idea or requirement to something real—a campaign, a website, a digital tool or a combination.</p>
          </div>
        </div>
      </section>

      <section className="pad">
        <div className="wrap intro" data-reveal>
          <h2>Understand first. Build what matters.</h2>
          <p>We don’t assume every business needs the same solution. We start by listening, understand the requirement and agree on what needs to be done. Then we bring the right skills together to deliver the work—with clear communication along the way.</p>
        </div>
      </section>

      <FinalCTA title="Good work starts with a good conversation." text="If you have a business challenge, an idea or a project to move forward, we’d like to hear about it." label="TALK TO PLUTOSOLVE" />
    </Page>
  )
}
