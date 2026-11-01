import type { EnquiryFields } from './validate'

const ENDPOINT = import.meta.env.VITE_ENQUIRY_ENDPOINT as string | undefined

/**
 * Sends the enquiry to a Google Apps Script web app (see README).
 * `text/plain` + `no-cors` avoids a CORS preflight; the response is opaque,
 * so a resolved fetch is treated as success and only network failures reject.
 */
export async function submitEnquiry(v: EnquiryFields): Promise<void> {
  if (!ENDPOINT) {
    if (import.meta.env.DEV) {
      await new Promise((r) => setTimeout(r, 900))
      console.info('[dev] VITE_ENQUIRY_ENDPOINT not set — enquiry simulated:', v)
      return
    }
    throw new Error('Enquiry endpoint is not configured')
  }
  await fetch(ENDPOINT, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ ...v, page: location.href, at: new Date().toISOString() }),
  })
}
