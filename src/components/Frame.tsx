import type { ReactNode } from 'react'

/** Browser-style frame for website screenshots. `bare` drops the window bar (for social posts, print, reports). */
export function Frame({ children, className = '', bare = false }: { children: ReactNode; className?: string; bare?: boolean }) {
  return (
    <div className={`frame ${bare ? 'bare' : ''} ${className}`}>
      {!bare && <div className="fr-bar" aria-hidden="true"><i /><i /><i /></div>}
      {children}
    </div>
  )
}
