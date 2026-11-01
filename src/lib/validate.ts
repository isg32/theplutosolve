export type EnquiryFields = { n: string; e: string; c: string; s: string; m: string }
export type Errors = Partial<Record<'n' | 'e' | 's' | 'm', string>>

export function validate(v: EnquiryFields): Errors {
  const err: Errors = {}
  if (!v.n.trim()) err.n = 'Please enter your name.'
  if (!/^\S+@\S+\.\S+$/.test(v.e.trim())) err.e = 'Please enter a valid email.'
  if (!v.s) err.s = 'Please choose an option.'
  if (v.m.trim().length < 10) err.m = 'Tell us a little more (10+ characters).'
  return err
}
