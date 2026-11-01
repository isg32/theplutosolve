import type { ReactNode } from 'react'

/** Browser-style frame shared by real screenshots and illustrative screens. */
export function Frame({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`frame ${className}`}>
      <div className="fr-bar" aria-hidden="true"><i /><i /><i /></div>
      {children}
    </div>
  )
}

/* ─────────── Illustrative screens (no client data, no invented figures) ─────────── */

export function MockDashboard() {
  return (
    <Frame>
      <div className="mk mk-dash" aria-hidden="true">
        <div className="mk-side">{[0, 1, 2, 3, 4].map((k) => <i key={k} className={k === 0 ? 'on' : ''} />)}</div>
        <div className="mk-main">
          <div className="mk-kpis">{['Applications', 'Active users', 'Leads'].map((k) => <div key={k}><small>{k}</small><b /></div>)}</div>
          <div className="mk-chart">{[40, 62, 48, 75, 58, 88, 70, 92].map((h, k) => <i key={k} style={{ height: `${h}%` }} />)}</div>
          <div className="mk-rows"><i /><i /><i /></div>
        </div>
      </div>
    </Frame>
  )
}

export function MockPipeline() {
  const cols = [['New', 3], ['Contacted', 2], ['Qualified', 2], ['Won', 1]] as const
  return (
    <Frame>
      <div className="mk mk-pipe" aria-hidden="true">
        {cols.map(([name, count]) => (
          <div key={name} className="pcol">
            <small>{name}</small>
            {Array.from({ length: count }, (_, k) => <div key={k} className="pcard"><i /><i /><u /></div>)}
          </div>
        ))}
      </div>
    </Frame>
  )
}

export function MockRoles() {
  const roles = ['Admin', 'Manager', 'Counsellor', 'Viewer']
  const perms = ['View', 'Edit', 'Export', 'Manage users']
  const grid = [[1, 1, 1, 1], [1, 1, 1, 0], [1, 1, 0, 0], [1, 0, 0, 0]]
  return (
    <Frame>
      <div className="mk mk-roles" aria-hidden="true">
        <div className="rrow head"><span /> {perms.map((p) => <span key={p}>{p}</span>)}</div>
        {roles.map((r, ri) => (
          <div key={r} className="rrow"><span className="rn">{r}</span>{grid[ri].map((on, k) => <span key={k}><i className={on ? 'on' : ''} /></span>)}</div>
        ))}
      </div>
    </Frame>
  )
}

export function MockReport() {
  const kpis = ['Qualified leads', 'Cost per lead', 'Conversion rate', 'Return on ad spend']
  return (
    <Frame>
      <div className="mk mk-report" aria-hidden="true">
        <div className="rp-grid">
          {kpis.map((k, n) => (
            <div key={k} className="rp-card">
              <small>{k}</small>
              <svg viewBox="0 0 80 28" preserveAspectRatio="none"><polyline points={n % 2 ? '0,20 14,16 28,18 42,10 56,12 70,5 80,6' : '0,22 14,19 28,15 42,16 56,9 70,8 80,3'} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" /></svg>
            </div>
          ))}
        </div>
        <div className="rp-foot"><span>Baseline</span><span>Period measured</span><span>Data source</span></div>
      </div>
    </Frame>
  )
}

export function MockFunnel() {
  const steps = [['Awareness', 100], ['Consideration', 72], ['Enquiry', 48], ['Customer', 28]] as const
  return (
    <Frame>
      <div className="mk mk-funnel" aria-hidden="true">
        {steps.map(([name, w]) => (
          <div key={name} className="fn-row"><small>{name}</small><div><i style={{ width: `${w}%` }} /></div></div>
        ))}
      </div>
    </Frame>
  )
}

export function MockBrand() {
  return (
    <Frame>
      <div className="mk mk-brand" aria-hidden="true">
        <div className="bd-logo"><span>Aa</span><small>Wordmark</small></div>
        <div className="bd-sw">{['#111b3a', '#355aa8', '#4937a8', '#6942a5', '#f2f1fa'].map((c) => <i key={c} style={{ background: c }} />)}</div>
        <div className="bd-type"><b>Heading</b><i /><i /></div>
        <div className="bd-post"><i /><i /><u /></div>
      </div>
    </Frame>
  )
}
