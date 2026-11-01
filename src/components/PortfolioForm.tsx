import { useEffect, useRef, useState, type FormEvent } from 'react'
import { EMAIL } from '../data/content'
import { request } from '../data/ourWork'
import { track } from '../lib/analytics'
import { submitEnquiry } from '../lib/submitEnquiry'

type Vals = { name: string; email: string; company: string; phone: string; interest: string; context: string }
const empty: Vals = { name: '', email: '', company: '', phone: '', interest: '', context: '' }
type Errs = Partial<Record<'name' | 'email', string>>

export default function PortfolioForm() {
  const f = request.fields
  const [v, setV] = useState<Vals>(empty)
  const [errs, setErrs] = useState<Errs>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'fail'>('idle')
  const started = useRef(false)
  const wrap = useRef<HTMLDivElement>(null)

  // analytics: form view (once, when it scrolls into view)
  useEffect(() => {
    const el = wrap.current
    if (!el || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          track('portfolio_form_view')
          io.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const set = (k: keyof Vals) => (e: { target: { value: string } }) => {
    if (!started.current) {
      started.current = true
      track('portfolio_form_start')
    }
    setV((o) => ({ ...o, [k]: e.target.value }))
    if (k === 'name' || k === 'email') setErrs((o) => ({ ...o, [k]: undefined }))
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const hp = (e.currentTarget.elements.namedItem('website') as HTMLInputElement | null)?.value
    if (hp) return // honeypot
    const next: Errs = {}
    if (!v.name.trim()) next.name = 'Please enter your name.'
    if (!/^\S+@\S+\.\S+$/.test(v.email.trim())) next.email = 'Please enter a valid email.'
    setErrs(next)
    if (Object.keys(next).length) return
    setStatus('sending')
    try {
      await submitEnquiry({
        type: 'portfolio_request',
        full_name: v.name.trim(),
        work_email: v.email.trim(),
        company_name: v.company.trim(),
        phone_number: v.phone.trim(),
        area_of_interest: v.interest,
        project_context: v.context.trim(),
        lead_source: 'Website',
        lead_type: 'Portfolio Request',
        lead_status: 'New',
        source_page: 'Our Work — Complete Portfolio Request',
      })
      setStatus('ok')
      setV(empty)
      track('portfolio_form_success', { area_of_interest: v.interest || 'unspecified' })
    } catch {
      setStatus('fail')
    }
  }

  return (
    <div ref={wrap}>
      <form className="card pf" onSubmit={onSubmit} noValidate>
        <h3>{request.formHeading}</h3>
        <div className="pf-grid">
          <label>{f.name.label}*
            <input name="name" autoComplete="name" placeholder={f.name.placeholder} value={v.name} onChange={set('name')} className={errs.name ? 'bad' : undefined} aria-invalid={!!errs.name} aria-required="true" />
            <span className="err" role="alert">{errs.name}</span>
          </label>
          <label>{f.email.label}*
            <input name="email" type="email" autoComplete="email" placeholder={f.email.placeholder} value={v.email} onChange={set('email')} className={errs.email ? 'bad' : undefined} aria-invalid={!!errs.email} aria-required="true" />
            <span className="err" role="alert">{errs.email}</span>
          </label>
          <label>{f.company.label}
            <input name="company" autoComplete="organization" placeholder={f.company.placeholder} value={v.company} onChange={set('company')} />
          </label>
          <label>{f.phone.label}
            <input name="phone" type="tel" autoComplete="tel" placeholder={f.phone.placeholder} value={v.phone} onChange={set('phone')} />
          </label>
        </div>
        <label>{f.interest.label}
          <select name="interest" value={v.interest} onChange={set('interest')}>
            <option value="">{f.interest.placeholder}</option>
            {request.options.map((o) => <option key={o}>{o}</option>)}
          </select>
        </label>
        <label>{f.context.label}
          <textarea name="context" rows={4} placeholder={f.context.placeholder} value={v.context} onChange={set('context')} />
        </label>
        <input className="hp" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        <button className="btn p" type="submit" disabled={status === 'sending'} style={{ justifyContent: 'center' }}>
          {status === 'sending' ? 'Sending…' : request.submit}
        </button>
        <p className="pf-note">{request.privacy}</p>
        {status === 'ok' && <div className="notice" role="status">{request.success}</div>}
        {status === 'fail' && (
          <div className="notice bad" role="alert">
            {request.error} <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
          </div>
        )}
      </form>
    </div>
  )
}
