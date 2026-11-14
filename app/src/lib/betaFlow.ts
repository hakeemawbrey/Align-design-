import { useSyncExternalStore } from 'react'
import { load, save, remove } from './persist'
import { RESET_EVENT } from './demo'

/**
 * The beta's slow reveal. Aligning with someone who aligned back doesn't show
 * their face at once:
 *
 *   aligned   the stars align: a notification, nothing else yet
 *   card      an alignment card is played to you both; each answers, sealed
 *   chat      both answered: the chat opens and a 33:33 countdown starts
 *   revealed  the countdown ended: both cards flip, photos open
 *
 * Every match goes through it, each on its own clock. Kept on the device so
 * the countdowns survive leaving and coming back.
 */
export type BetaStage = 'none' | 'aligned' | 'card' | 'chat' | 'revealed'
export interface BetaFlow { id: string; stage: BetaStage; revealAt: number | null; card: string; at: number }
type Flows = Record<string, BetaFlow>

/** how long the chat runs before the reveal: 33 minutes 33 seconds */
export const REVEAL_MS = (33 * 60 + 33) * 1000
/** the cards the stars deal, one per match, in order (the first: "What small, everyday thing makes you feel cared for?") */
const ALIGN_CARDS = ['ro6', 'ro5', 'ro3', 'ev2', 'ev5', 'ro1']

const KEY = 'beta-flow:v2'
const NONE: BetaFlow = { id: '', stage: 'none', revealAt: null, card: ALIGN_CARDS[0], at: 0 }
let state: Flows = load<Flows>(KEY) ?? {}
const subs = new Set<() => void>()
const put = (id: string, p: Partial<BetaFlow>) => {
  const cur = state[id]
  if (!cur) return
  state = { ...state, [id]: { ...cur, ...p } }
  save(KEY, state)
  subs.forEach((f) => f())
}

export const betaFlow = {
  all: () => state,
  get: (id: string | null | undefined): BetaFlow => (id && state[id]) || NONE,
  /** you both aligned */
  start: (id: string) => {
    if (state[id]) return
    const card = ALIGN_CARDS[Object.keys(state).length % ALIGN_CARDS.length]
    state = { ...state, [id]: { id, stage: 'aligned', revealAt: null, card, at: Date.now() } }
    save(KEY, state)
    subs.forEach((f) => f())
  },
  /** demo: put a few matches at different stages, so the notification screen has something on it */
  seed: (rows: { id: string; stage: BetaStage; inMs?: number }[]) => {
    const next = { ...state }
    rows.forEach((r, i) => {
      if (next[r.id]) return
      next[r.id] = { id: r.id, stage: r.stage, revealAt: r.inMs == null ? null : Date.now() + r.inMs, card: ALIGN_CARDS[(Object.keys(next).length) % ALIGN_CARDS.length], at: Date.now() - i * 60_000 }
    })
    state = next
    save(KEY, state)
    subs.forEach((f) => f())
  },
  /** you opened the card */
  openCard: (id: string) => { if (state[id]?.stage === 'aligned') put(id, { stage: 'card' }) },
  /** both answered: the chat opens and the clock starts */
  openChat: (id: string) => { const s = state[id]?.stage; if (s === 'aligned' || s === 'card') put(id, { stage: 'chat', revealAt: Date.now() + REVEAL_MS }) },
  /** demo: jump the clock to its last few seconds */
  skipAhead: (id: string, ms = 5000) => { if (state[id]?.stage === 'chat') put(id, { revealAt: Date.now() + ms }) },
  reveal: (id: string) => put(id, { stage: 'revealed', revealAt: null }),
  /** is this match in the flow (at any stage)? */
  has: (id: string) => !!state[id],
  /** their photo is still veiled */
  veiled: (id: string) => !!state[id] && state[id].stage !== 'revealed',
}

if (typeof window !== 'undefined') {
  window.addEventListener(RESET_EVENT, () => { state = {}; remove(KEY); subs.forEach((f) => f()) })
}

const sub = (f: () => void) => { subs.add(f); return () => { subs.delete(f) } }
/** every match in the flow */
export function useBetaFlows(): Flows {
  return useSyncExternalStore(sub, () => state, () => state)
}
/** one match's place in the flow */
export function useBetaFlow(id: string | null | undefined): BetaFlow {
  const all = useBetaFlows()
  return (id && all[id]) || NONE
}

/** what a match is waiting on, for the star and the notification */
export type Pending = 'card' | 'chat' | 'reveal'
export const pendingOf = (f: BetaFlow, now = Date.now()): Pending | null =>
  f.stage === 'aligned' || f.stage === 'card' ? 'card'
    : f.stage === 'chat' ? (f.revealAt != null && now >= f.revealAt ? 'reveal' : 'chat')
      : null
/** matches still on their way to a reveal, newest first */
export const inFlight = (all: Flows): BetaFlow[] =>
  Object.values(all).filter((f) => f.stage !== 'none' && f.stage !== 'revealed').sort((a, b) => b.at - a.at)

/** mm:ss left until the reveal */
export const clock = (ms: number) => {
  const s = Math.max(0, Math.ceil(ms / 1000))
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
}

/** the deck's star opens the overview of everyone the stars have aligned you with */
export const STARS_EVENT = 'align:beta-stars'
export const openStars = () => window.dispatchEvent(new Event(STARS_EVENT))
