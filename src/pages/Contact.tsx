import { useState, type FormEvent } from 'react'
import Page from '../components/Page'
import { PageHead } from '../components/ui'
import { EMAIL, contactOptions } from '../data/content'
import { submitEnquiry } from '../lib/submitEnquiry'
import { validate, type EnquiryFields, type Errors } from '../lib/validate'

const empty: EnquiryFields = { n: '', e: '', c: '', s: '', m: '' }

export default function Contact() {
  const [v, setV] = useState<EnquiryFields>(empty)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'fail'>('idle')
  const set = (k: keyof EnquiryFields) => (ev: { target: { value: string } }) => {
    setV((o) => ({ ...o, [k]: ev.target.value }))
    if (errors[k as keyof Errors]) setErrors((o) => ({ ...o, [k]: undefined }))
  }

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault()
    const hp = (ev.currentTarget.elements.namedItem('website') as HTMLInputElement | null)?.value
    if (hp) return // honeypot
    const errs = validate(v)
    setErrors(errs)
    if (Object.keys(errs).length) return
    setStatus('sending')
    try {
      await submitEnquiry(v)
      setStatus('ok')
      setV(empty)
    } catch {
      setStatus('fail')
    }
  }

  const bad = (k: keyof Errors) => (errors[k] ? 'bad' : undefined)

  return (
    <Page
      title="Contact — PlutoSolve"
      description="Tell PlutoSolve what you have in mind — a website, a marketing plan, a brand or a business tool — and start the conversation."
      path="/contact"
    >
      <PageHead eyebrow="Contact" title="Tell us what you" accent="have in mind." lede="A new website, a marketing plan, a brand that needs direction or a tool that would make work easier—we’re ready to hear about it. Share a little about what you need and let’s take it from there." />
      <div className="wrap cgrid">
        <form className="card" onSubmit={onSubmit} noValidate data-reveal>
          <h3>Let’s start with the basics.</h3>
          <label>Your name
            <input name="n" autoComplete="name" value={v.n} onChange={set('n')} className={bad('n')} aria-invalid={!!errors.n} />
            <span className="err" role="alert">{errors.n}</span>
          </label>
          <label>Work email
            <input name="e" type="email" autoComplete="email" value={v.e} onChange={set('e')} className={bad('e')} aria-invalid={!!errors.e} />
            <span className="err" role="alert">{errors.e}</span>
          </label>
          <label>Company name (optional)
            <input name="c" autoComplete="organization" value={v.c} onChange={set('c')} />
          </label>
          <label>What do you need help with?
            <select name="s" value={v.s} onChange={set('s')} className={bad('s')} aria-invalid={!!errors.s}>
              <option value="">Select…</option>
              {contactOptions.map((o) => <option key={o}>{o}</option>)}
            </select>
            <span className="err" role="alert">{errors.s}</span>
          </label>
          <label>Tell us a little about your project
            <textarea name="m" rows={5} value={v.m} onChange={set('m')} className={bad('m')} aria-invalid={!!errors.m} />
            <span className="err" role="alert">{errors.m}</span>
          </label>
          <input className="hp" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          <button className="btn p" type="submit" disabled={status === 'sending'} style={{ justifyContent: 'center' }}>
            {status === 'sending' ? 'SENDING…' : 'SEND ENQUIRY'}
          </button>
          {status === 'ok' && <div className="notice" role="status">Thanks for reaching out. Your message has been received, and the PlutoSolve team will be in touch.</div>}
          {status === 'fail' && (
            <div className="notice bad" role="alert">
              Sorry, something went wrong sending your message. Please email us directly at <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
            </div>
          )}
        </form>
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
