import type { SignId } from '../data/signs'
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

/** a post the presenter made in the Club room */
export interface ClubPost {
  id: string
  text: string
  likes: number
  sparks: number
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
  /** Club: the presenter's own posts, newest first */
  clubMine: ClubPost[]
  /** Club: post ids the presenter has liked */
  clubLiked: string[]
  /** signs taken off the table (Align+ · Block a sign); suns only */
  blockedSigns: SignId[]
  /** when the current sign blocks were set, for "since …" */
  blockedSince: string
  /** people blocked or unmatched from Report / Block */
  blockedPeople: string[]
  /** people released tonight, in order (for Second look / Mulligan) */
  released: string[]
  /** cards put back into the deal by played events */
  inserts: { after: number; ids: string[] }[]
  /** extra peeks granted by events */
  bonusPeeks: number
  /** the notifications screen has been opened */
  notifsSeen: boolean
}

const initial = (): SessionState => ({
  deckIndex: 0,
  peeksUsed: 0,
  chatPlayed: false,
  chatExtra: [],
  unseenMatch: false,
  alignPlus: false,
  clubMine: [],
  clubLiked: [],
  blockedSigns: ['scorpio', 'aries'],
  blockedSince: 'Jul 2',
  blockedPeople: [],
  released: [],
  inserts: [],
  bonusPeeks: 0,
  notifsSeen: false,
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
