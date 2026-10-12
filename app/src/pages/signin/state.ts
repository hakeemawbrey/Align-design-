/**
 * Demo sign-in state shared by the G- pages: how the presenter chose to sign in
 * and where the code was sent. Kept in memory (and sessionStorage so a reload on
 * the code screen still knows the number); falls back to the design's demo values.
 */
export type Method = 'phone' | 'email'

interface SigninState {
  method: Method
  phone: string // 10 digits
  email: string
}

const KEY = 'align:signin:v1'
const DEFAULTS: SigninState = { method: 'phone', phone: '5551111111', email: 'juna@thestars.com' }

function read(): SigninState {
  try {
    const raw = sessionStorage.getItem(KEY)
    if (raw) return { ...DEFAULTS, ...(JSON.parse(raw) as Partial<SigninState>) }
  } catch { /* ignore */ }
  return { ...DEFAULTS }
}

let state = read()

export const signin = {
  get: () => state,
  set(patch: Partial<SigninState>) {
    state = { ...state, ...patch }
    try { sessionStorage.setItem(KEY, JSON.stringify(state)) } catch { /* ignore */ }
  },
}

/** '5551111111' → '(555) 111–1111' (partial input formats as it grows) */
export function formatPhone(d: string) {
  if (d.length <= 3) return d.length ? `(${d}` : ''
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}–${d.slice(6, 10)}`
}

/** 'juna@thestars.com' → 'j•••@thestars.com' */
export function maskEmail(e: string) {
  const [u, d] = e.split('@')
  return d ? `${u.slice(0, 1)}•••@${d}` : e
}

export const validEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e.trim())

/** where a finished sign-in lands: the same place Welcome's "Continue" goes */
export const AFTER_SIGNIN = 'dealing' as const

/** '9:44 pm' for a time n ms from now */
export function clock(offsetMs = 0) {
  const d = new Date(Date.now() + offsetMs)
  const h = d.getHours() % 12 || 12
  return `${h}:${String(d.getMinutes()).padStart(2, '0')} ${d.getHours() < 12 ? 'am' : 'pm'}`
}
