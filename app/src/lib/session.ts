import { useSyncExternalStore } from 'react'

/**
 * Demo-session state that should survive moving between screens
 * (deck position, chat history, unseen-match badge, Align+ status).
 * Reset by the App on demo restart (R / number keys).
 */
export interface ChatMsg {
  from: 'me' | 'her'
  text: string
}

export interface SessionState {
  /** index into DECK of the top card; the deck resumes here */
  deckIndex: number
  /** peeks used tonight */
  peeksUsed: number
  /** the scripted chat intro has already played */
  chatPlayed: boolean
  /** messages added after the script (typed by the presenter + her replies) */
  chatExtra: ChatMsg[]
  /** a match happened that the Matches tab hasn't shown yet */
  unseenMatch: boolean
  /** Align+ trial started from a paywall */
  alignPlus: boolean
}

const initial = (): SessionState => ({
  deckIndex: 0,
  peeksUsed: 0,
  chatPlayed: false,
  chatExtra: [],
  unseenMatch: false,
  alignPlus: false,
})

let state = initial()
const subs = new Set<() => void>()

export const session = {
  get: () => state,
  subscribe(f: () => void) {
    subs.add(f)
    return () => { subs.delete(f) }
  },
  patch(p: Partial<SessionState>) {
    state = { ...state, ...p }
    subs.forEach((f) => f())
  },
}

export function resetSession() {
  state = initial()
  subs.forEach((f) => f())
}

export function useSession() {
  return useSyncExternalStore(session.subscribe, session.get)
}
