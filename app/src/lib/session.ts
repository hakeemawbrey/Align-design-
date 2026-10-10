import type { SignId } from '../data/signs'
import type { EventId } from '../data/draws'
import { useSyncExternalStore } from 'react'
import { load, remove, save } from './persist'

/**
 * Demo-session state that should survive moving between screens
 * (deck position, chat history, unseen-match badge, Align+ status).
 * Saved to localStorage so a refresh keeps your place; cleared by Reset demo.
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
  /** the out-of-peeks Align+ prompt has been shown once */
  peekUpsellSeen: boolean
  /** onboarding step the presenter left on (0 = not started or finished) */
  obStep: number
  /** the real person the Thread screen is chatting with */
  threadWith: string
  /** event cards saved for later (swiped left), played from the deck screen */
  savedEvents: EventId[]
  /** energy: earned by talking to matches and going on dates, spent to play event cards */
  energy: number
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
  peekUpsellSeen: false,
  obStep: 0,
  threadWith: '',
  savedEvents: [],
  energy: 40,
})

const KEY = 'session:v1'

/** state survives a refresh; fields added later fall back to their defaults */
let state: SessionState = { ...initial(), ...(load<Partial<SessionState>>(KEY) ?? {}) }
const subs = new Set<() => void>()

export const session = {
  get: () => state,
  subscribe(f: () => void) {
    subs.add(f)
    return () => { subs.delete(f) }
  },
  patch(p: Partial<SessionState>) {
    state = { ...state, ...p }
    save(KEY, state)
    subs.forEach((f) => f())
  },
}

export function resetSession() {
  remove(KEY)
  state = initial()
  subs.forEach((f) => f())
}

export function useSession() {
  return useSyncExternalStore(session.subscribe, session.get)
}

export const ENERGY_MAX = 100
/** what playing an event card costs */
export const EVENT_COST = 10

/** add (or with a negative n, spend) energy; false if there isn't enough to spend */
export function energize(n: number) {
  const e = state.energy + n
  if (e < 0) return false
  session.patch({ energy: Math.min(ENERGY_MAX, e) })
  return true
}
