import { useId } from 'react'

/** Crisp concentric orbit rings with slowly travelling nodes (replaces the old blurry orbs). */
export function Orbit({ tone = 'light', className = '' }: { tone?: 'light' | 'dark'; className?: string }) {
  const id = useId()
  return (
    <svg className={`orbit ${tone} ${className}`} viewBox="0 0 600 600" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#6a5c9a" />
          <stop offset="1" stopColor="#7a66a8" />
        </linearGradient>
      </defs>
      <circle className="ring-static" cx="300" cy="300" r="70" />
      <g className="ring spin-a">
        <circle cx="300" cy="300" r="130" />
        <circle cx="430" cy="300" r="7" fill={`url(#${id})`} stroke="none" />
        <circle cx="170" cy="300" r="4" fill={`url(#${id})`} stroke="none" />
      </g>
      <g className="ring spin-b">
        <circle cx="300" cy="300" r="195" strokeDasharray="3 9" />
        <circle cx="300" cy="105" r="5" fill={`url(#${id})`} stroke="none" />
        <circle cx="495" cy="300" r="9" fill={`url(#${id})`} stroke="none" />
      </g>
      <g className="ring spin-c">
        <circle cx="300" cy="300" r="260" />
        <circle cx="300" cy="560" r="6" fill={`url(#${id})`} stroke="none" />
        <circle cx="116" cy="116" r="4" fill={`url(#${id})`} stroke="none" />
      </g>
    </svg>
  )
}

const iconPaths = [
  // Marketing: megaphone
  ['M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1z', 'M15 9a4 4 0 0 1 0 6', 'M18 6.5a8 8 0 0 1 0 11'],
  // Web: browser + code
  ['M4 4h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z', 'M3 9h18', 'm9.5 13-2 2 2 2', 'm14.5 13 2 2-2 2'],
  // Brand: pen nib
  ['M12 3l7 8-7 10-7-10z', 'M12 21v-9', 'M9.5 11a2.5 2.5 0 1 0 5 0 2.5 2.5 0 0 0-5 0z'],
  // Automation: connected nodes
  ['M5 7.5a2.5 2.5 0 1 0 0-.01', 'M19 7.5a2.5 2.5 0 1 0 0-.01', 'M12 19.5a2.5 2.5 0 1 0 0-.01', 'M7.2 8.6l3.6 8.2', 'M16.8 8.6l-3.6 8.2', 'M7.5 7.5h9'],
]

export function ServiceIcon({ index }: { index: number }) {
  return (
    <svg className="ico-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {iconPaths[index].map((d, i) => <path key={i} d={d} pathLength={1} />)}
    </svg>
  )
}

const GRAD = ['#6a5c9a', '#7d6797']

function Defs({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor={GRAD[0]} />
        <stop offset="1" stopColor={GRAD[1]} />
      </linearGradient>
      <linearGradient id={`${id}-a`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={GRAD[0]} stopOpacity=".22" />
        <stop offset="1" stopColor={GRAD[0]} stopOpacity="0" />
      </linearGradient>
    </defs>
  )
}

const pts: [number, number][] = [[40, 220], [120, 190], [200, 200], [280, 130], [360, 110], [440, 50]]

function MarketingScene({ id }: { id: string }) {
  const line = 'M' + pts.map((p) => p.join(' ')).join(' L')
  return (
    <svg viewBox="0 0 480 280" aria-hidden="true">
      <Defs id={id} />
      {[60, 110, 160, 210].map((y) => <line key={y} x1="30" x2="450" y1={y} y2={y} stroke="#e8e6ef" />)}
      <path className="sc-fade" d={`${line} L440 240 L40 240 Z`} fill={`url(#${id}-a)`} />
      <path className="sc-draw" d={line} pathLength={1} fill="none" stroke={`url(#${id}-g)`} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map(([x, y]) => <circle key={x} className="sc-pop" cx={x} cy={y} r="6" fill="#fff" stroke="#6a5c9a" strokeWidth="3" />)}
      <g className="sc-pop">
        <rect x="290" y="14" width="150" height="34" rx="17" fill="#1e1b36" />
        <text x="365" y="36" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">New enquiries ↑</text>
      </g>
    </svg>
  )
}

function WebScene({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 480 280" aria-hidden="true">
      <Defs id={id} />
      <rect x="40" y="24" width="400" height="232" rx="16" fill="#fff" stroke="#e8e6ef" />
      <line x1="40" x2="440" y1="64" y2="64" stroke="#e8e6ef" />
      {[62, 78, 94].map((x) => <circle key={x} cx={x} cy="44" r="4.5" fill="#e8e6ef" />)}
      <rect x="130" y="35" width="220" height="18" rx="9" fill="#f6f5fa" />
      <rect className="sc-grow" x="64" y="86" width="150" height="16" rx="8" fill={`url(#${id}-g)`} />
      <rect className="sc-grow" x="64" y="116" width="300" height="8" rx="4" fill="#e8e6ef" />
      <rect className="sc-grow" x="64" y="134" width="260" height="8" rx="4" fill="#e8e6ef" />
      <rect className="sc-grow" x="64" y="152" width="200" height="8" rx="4" fill="#e8e6ef" />
      <rect className="sc-pop" x="64" y="184" width="112" height="38" rx="19" fill={`url(#${id}-g)`} />
      <rect className="sc-pop" x="290" y="170" width="124" height="68" rx="12" fill="#f6f5fa" stroke="#e8e6ef" />
      <path className="sc-draw" d="M306 222l22-24 18 16 14-12 30 20" pathLength={1} fill="none" stroke="#7d6797" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <g className="cursor"><path d="M0 0v18l5-4.5 3.5 8 3.5-1.5-3.5-8H15z" fill="#1e1b36" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" /></g>
    </svg>
  )
}

function BrandScene({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 480 280" aria-hidden="true">
      <Defs id={id} />
      <g style={{ mixBlendMode: 'multiply' }}>
        <circle className="sc-pop" cx="130" cy="110" r="64" fill="#6a5c9a" opacity=".85" />
        <circle className="sc-pop" cx="192" cy="110" r="64" fill="#7d6797" opacity=".85" />
        <circle className="sc-pop" cx="161" cy="160" r="64" fill="#b0a6cc" opacity=".9" />
      </g>
      <text className="sc-fade" x="318" y="132" fontSize="88" fontWeight="800" fill="#1e1b36" letterSpacing="-4">Aa</text>
      <rect className="sc-grow" x="318" y="150" width="110" height="8" rx="4" fill="#e8e6ef" />
      <rect className="sc-grow" x="318" y="168" width="80" height="8" rx="4" fill="#e8e6ef" />
      {['#6a5c9a', '#7d6797', '#1e1b36', '#b0a6cc', '#f6f5fa'].map((c, i) => (
        <rect key={c} className="sc-pop" x={60 + i * 72} y="226" width="56" height="30" rx="10" fill={c} stroke="#e8e6ef" />
      ))}
    </svg>
  )
}

const nodes = [
  { x: 36, y: 110, t: 'Enquiry' },
  { x: 190, y: 36, t: 'CRM' },
  { x: 190, y: 184, t: 'Report' },
  { x: 344, y: 110, t: 'Team' },
]

function AutomationScene({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 480 280" aria-hidden="true">
      <Defs id={id} />
      {['M136 140 C163 140 163 66 190 66', 'M136 140 C163 140 163 214 190 214', 'M290 66 C317 66 317 140 344 140', 'M290 214 C317 214 317 140 344 140'].map((d) => (
        <path key={d} className="flow" d={d} fill="none" stroke="#6a5c9a" strokeWidth="2.5" strokeLinecap="round" />
      ))}
      {nodes.map((n) => (
        <g key={n.t} className="sc-pop">
          <rect x={n.x} y={n.y} width="100" height="60" rx="14" fill="#fff" stroke="#e8e6ef" />
          <text x={n.x + 50} y={n.y + 35} textAnchor="middle" fontSize="13" fontWeight="600" fill="#1e1b36">{n.t}</text>
        </g>
      ))}
      <g className="sc-pop">
        <circle cx="444" cy="118" r="14" fill={`url(#${id}-g)`} />
        <path d="m437.5 118 4.5 4.5 8-8.5" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  )
}

export function Scene({ index }: { index: number }) {
  const id = useId().replace(/:/g, '')
  const S = [MarketingScene, WebScene, BrandScene, AutomationScene][index]
  return (
    <div className="scene" data-scene aria-hidden="true">
      <S id={id} />
    </div>
  )
}

export function Marquee({ items }: { items: string[] }) {
  const track = items.map((t, i) => (
    <span key={i} className="mq-item">{t}<i aria-hidden="true" /></span>
  ))
  return (
    <div className="marquee" aria-hidden="true">
      <div className="mq-track">
        <div className="mq-set">{track}</div>
        <div className="mq-set">{track}</div>
      </div>
    </div>
  )
}
