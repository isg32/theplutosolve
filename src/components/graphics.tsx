import { useId } from 'react'

/** Crisp concentric orbit rings with slowly travelling nodes (replaces the old blurry orbs). */
export function Orbit({ tone = 'light', className = '' }: { tone?: 'light' | 'dark'; className?: string }) {
  const id = useId()
  return (
    <svg className={`orbit ${tone} ${className}`} viewBox="0 0 600 600" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#355aa8" />
          <stop offset="1" stopColor="#6942a5" />
        </linearGradient>
      </defs>
      <circle className="ring-static" cx="300" cy="300" r="70" />
      <g className="ring spin-a">
        <circle cx="300" cy="300" r="130" />
        <circle cx="430" cy="300" r="7" fill="#168FEA" stroke="none" />
        <circle cx="170" cy="300" r="4" fill="#168FEA" stroke="none" />
      </g>
      <g className="ring spin-b">
        <circle cx="300" cy="300" r="195" strokeDasharray="3 9" />
        <circle cx="300" cy="105" r="5" fill="#168FEA" stroke="none" />
        <circle cx="495" cy="300" r="9" fill="#168FEA" stroke="none" />
      </g>
      <g className="ring spin-c">
        <circle cx="300" cy="300" r="260" />
        <circle cx="300" cy="560" r="6" fill="#168FEA" stroke="none" />
        <circle cx="116" cy="116" r="4" fill="#168FEA" stroke="none" />
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

const GRAD = ['#355aa8', '#6942a5']

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
      {[60, 110, 160, 210].map((y) => <line key={y} x1="30" x2="450" y1={y} y2={y} stroke="#e5e8f0" />)}
      <path className="sc-fade" d={`${line} L440 240 L40 240 Z`} fill={`url(#${id}-a)`} />
      <path className="sc-draw" d={line} pathLength={1} fill="none" stroke={`url(#${id}-g)`} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map(([x, y]) => <circle key={x} className="sc-pop" cx={x} cy={y} r="6" fill="#fff" stroke="#355aa8" strokeWidth="3" />)}
      <g className="sc-pop">
        <rect x="290" y="14" width="150" height="34" rx="17" fill="#111b3a" />
        <text x="365" y="36" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">New enquiries ↑</text>
      </g>
    </svg>
  )
}

function WebScene({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 480 280" aria-hidden="true">
      <Defs id={id} />
      <rect x="40" y="24" width="400" height="232" rx="16" fill="#fff" stroke="#e5e8f0" />
      <line x1="40" x2="440" y1="64" y2="64" stroke="#e5e8f0" />
      {[62, 78, 94].map((x) => <circle key={x} cx={x} cy="44" r="4.5" fill="#e5e8f0" />)}
      <rect x="130" y="35" width="220" height="18" rx="9" fill="#f8f9fc" />
      <rect className="sc-grow" x="64" y="86" width="150" height="16" rx="8" fill={`url(#${id}-g)`} />
      <rect className="sc-grow" x="64" y="116" width="300" height="8" rx="4" fill="#e5e8f0" />
      <rect className="sc-grow" x="64" y="134" width="260" height="8" rx="4" fill="#e5e8f0" />
      <rect className="sc-grow" x="64" y="152" width="200" height="8" rx="4" fill="#e5e8f0" />
      <rect className="sc-pop" x="64" y="184" width="112" height="38" rx="19" fill={`url(#${id}-g)`} />
      <rect className="sc-pop" x="290" y="170" width="124" height="68" rx="12" fill="#f8f9fc" stroke="#e5e8f0" />
      <path className="sc-draw" d="M306 222l22-24 18 16 14-12 30 20" pathLength={1} fill="none" stroke="#6942a5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <g className="cursor"><path d="M0 0v18l5-4.5 3.5 8 3.5-1.5-3.5-8H15z" fill="#111b3a" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" /></g>
    </svg>
  )
}

function BrandScene({ id }: { id: string }) {
  const corners: [number, number][] = [[111, 65], [211, 65], [111, 165], [211, 165]]
  return (
    <svg viewBox="0 0 480 280" aria-hidden="true">
      <Defs id={id} />
      {/* artboard: a logo mark being refined, with its selection handles */}
      <rect x="36" y="28" width="250" height="222" rx="16" fill="#fff" stroke="#e5e8f0" />
      <circle className="sc-draw" cx="161" cy="115" r="38" pathLength={1} fill="none" stroke={`url(#${id}-g)`} strokeWidth="11" strokeLinecap="round" />
      <circle className="sc-pop" cx="161" cy="115" r="13" fill={`url(#${id}-g)`} />
      <circle className="sc-pop" cx="196" cy="84" r="6" fill="#168fea" />
      <rect className="sc-fade" x="111" y="65" width="100" height="100" fill="none" stroke="#355aa8" strokeWidth="1.2" strokeDasharray="4 4" />
      {corners.map(([x, y]) => <rect key={`${x}${y}`} className="sc-pop" x={x - 4} y={y - 4} width="8" height="8" rx="2" fill="#fff" stroke="#355aa8" strokeWidth="1.6" />)}
      <rect className="sc-grow" x="106" y="190" width="110" height="12" rx="6" fill="#111b3a" />
      <rect className="sc-grow" x="126" y="212" width="70" height="7" rx="3.5" fill="#e5e8f0" />
      {/* type specimen */}
      <g className="sc-pop">
        <rect x="312" y="28" width="136" height="88" rx="14" fill="#fff" stroke="#e5e8f0" />
        <text x="330" y="82" fontSize="46" fontWeight="800" fill="#111b3a" letterSpacing="-2">Aa</text>
        <rect x="396" y="56" width="38" height="6" rx="3" fill="#e5e8f0" />
        <rect x="396" y="70" width="28" height="6" rx="3" fill="#e5e8f0" />
        <rect x="330" y="94" width="104" height="5" rx="2.5" fill="#f2f1fa" />
      </g>
      {/* palette */}
      <g>
        <rect className="sc-fade" x="312" y="126" width="136" height="46" rx="14" fill="#fff" stroke="#e5e8f0" />
        {['#355aa8', '#6942a5', '#111b3a', '#168fea'].map((c, i) => <circle key={c} className="sc-pop" cx={334 + i * 31} cy="149" r="11" fill={c} />)}
      </g>
      {/* identity applied: business card */}
      <g className="sc-pop">
        <rect x="312" y="182" width="136" height="68" rx="12" fill={`url(#${id}-g)`} />
        <circle cx="336" cy="206" r="9" fill="none" stroke="#fff" strokeWidth="3" />
        <circle cx="336" cy="206" r="3" fill="#fff" />
        <rect x="352" y="202" width="64" height="6" rx="3" fill="#fff" opacity=".9" />
        <rect x="328" y="228" width="84" height="4" rx="2" fill="#fff" opacity=".55" />
        <rect x="328" y="238" width="58" height="4" rx="2" fill="#fff" opacity=".55" />
      </g>
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
        <path key={d} className="flow" d={d} fill="none" stroke="#355aa8" strokeWidth="2.5" strokeLinecap="round" />
      ))}
      {nodes.map((n) => (
        <g key={n.t} className="sc-pop">
          <rect x={n.x} y={n.y} width="100" height="60" rx="14" fill="#fff" stroke="#e5e8f0" />
          <text x={n.x + 50} y={n.y + 35} textAnchor="middle" fontSize="13" fontWeight="600" fill="#111b3a">{n.t}</text>
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
