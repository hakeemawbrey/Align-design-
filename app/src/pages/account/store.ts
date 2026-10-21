import { useSyncExternalStore } from 'react'
import { load, save } from '../../lib/persist'
import { MY_CARD } from '../../components/you/myCard'
import { RESET_EVENT } from '../../lib/demo'
import { BIRTH_LABEL } from '../../data/myBirth'

/**
 * Account settings and card / chart edits (G-06, G-07, G-08, G-27, G-28, S-19e).
 * Saved to localStorage under 'align:settings:v1'; storage can fail, so it all works in memory too.
 */
export interface NotifPrefs {
  morning: boolean
  refill: boolean
  transits: boolean
  alignments: boolean
  comets: boolean
  closing: boolean
  replies: boolean
  mentions: boolean
}

export interface AccountState {
  push: boolean
  notifs: NotifPrefs
  /** the morning reading time, e.g. '8:11 am' */
  morningAt: string
  /** card taken out of the decks (G-08 pause) */
  paused: boolean
  /** notifications cleared from the list (S-19b empty state) */
  notifsCleared: boolean
  birth: { date: string; time: string; place: string }
  card: {
    bio: string
    dealbreakers: string
    facts: [string, string][]
    interests: string[]
  }
}

const KEY = 'settings:v1'

const initial = (): AccountState => ({
  push: true,
  notifs: { morning: true, refill: true, transits: true, alignments: true, comets: true, closing: false, replies: true, mentions: false },
  morningAt: '8:11 am',
  paused: false,
  notifsCleared: false,
  birth: { date: BIRTH_LABEL.date, time: BIRTH_LABEL.time, place: BIRTH_LABEL.place },
  card: {
    bio: MY_CARD.bio,
    dealbreakers: MY_CARD.dealbreakers,
    facts: MY_CARD.facts.map(([k, v]) => [k, v] as [string, string]),
    interests: [...MY_CARD.interests],
  },
})

function read(): AccountState {
  const saved = load<Partial<AccountState>>(KEY)
  const base = initial()
  if (!saved || typeof saved !== 'object') return base
  return {
    ...base,
    ...saved,
    notifs: { ...base.notifs, ...(saved.notifs ?? {}) },
    birth: { ...base.birth, ...(saved.birth ?? {}) },
    card: { ...base.card, ...(saved.card ?? {}) },
  }
}

let state: AccountState = read()
const subs = new Set<() => void>()

export const account = {
  get: () => state,
  patch(p: Partial<AccountState>) {
    state = { ...state, ...p }
    save(KEY, state)
    subs.forEach((f) => f())
  },
  setNotif(k: keyof NotifPrefs, v: boolean) {
    account.patch({ notifs: { ...state.notifs, [k]: v } })
  },
  subscribe(f: () => void) {
    subs.add(f)
    return () => { subs.delete(f) }
  },
}

export function useAccount(): AccountState {
  return useSyncExternalStore(account.subscribe, account.get, account.get)
}

// Reset demo clears these too
try {
  window.addEventListener(RESET_EVENT, () => { state = initial(); save(KEY, state); subs.forEach((f) => f()) })
} catch { /* no window */ }
