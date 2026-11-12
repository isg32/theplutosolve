import Page from '../components/Page'
import EnquiryForm from '../components/EnquiryForm'
import { PageHead } from '../components/ui'
import { EMAIL } from '../data/content'

export default function Contact() {
  return (
    <Page
      title="Contact | PlutoSolve"
      description="Tell PlutoSolve what you have in mind, a website, a marketing plan, a brand or a business tool, and start the conversation."
      path="/contact"
    >
      <PageHead eyebrow="Contact" title="Tell us what you" accent="have in mind." lede="A new website, a marketing plan, a brand that needs direction or a tool that would make work easier, we’re ready to hear about it. Share a little about what you need and let’s take it from there." />
      <div className="wrap cgrid">
        <div data-reveal><EnquiryForm /></div>
        <div className="card side" data-reveal>
          <h3>Prefer email?</h3>
          <p>Write to us at</p>
          <a className="m grad" href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <p style={{ marginTop: 26 }}>Whatever stage you’re at, the first step is simply to start the conversation.</p>
        </div>
      </div>
    </Page>
  )
}
