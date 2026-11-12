import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import EnquiryForm from './EnquiryForm'

type Ctx = { open: () => void }
const EnquiryCtx = createContext<Ctx>({ open: () => {} })
// eslint-disable-next-line react-refresh/only-export-components
export const useEnquiry = () => useContext(EnquiryCtx)

/** Provides `open()` for every "Let's Talk" style button and renders the popup holding the contact form. */
export function EnquiryProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false)
  const dlg = useRef<HTMLDialogElement>(null)
  const opener = useRef<HTMLElement | null>(null)
  const open = useCallback(() => {
    opener.current = document.activeElement as HTMLElement | null
    setOpen(true)
  }, [])
  const close = useCallback(() => dlg.current?.close(), [])
  const value = useMemo(() => ({ open }), [open])

  useEffect(() => {
    const d = dlg.current
    if (!d) return
    if (isOpen && !d.open) {
      d.showModal()
      document.documentElement.classList.add('modal-open')
    }
  }, [isOpen])

  const onClosed = () => {
    document.documentElement.classList.remove('modal-open')
    setOpen(false) // unmounts the form so the next visit starts fresh
    opener.current?.focus?.()
  }

  return (
    <EnquiryCtx.Provider value={value}>
      {children}
      <dialog
        ref={dlg}
        className="enq-dlg"
        aria-labelledby="enq-title"
        onClose={onClosed}
        onClick={(e) => e.target === dlg.current && close()}
      >
        {isOpen && (
          <div className="enq-box">
            <button type="button" className="enq-x" aria-label="Close" onClick={close}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
            </button>
            <p className="eyebrow">Let’s talk</p>
            <h2 id="enq-title">Tell us what you have in mind.</h2>
            <EnquiryForm modal />
          </div>
        )}
      </dialog>
    </EnquiryCtx.Provider>
  )
}
