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
 * One match at a time goes through it (Juniper, in the demo). Kept on the
 * device so the countdown survives leaving and coming back.
 */
export type BetaStage = 'none' | 'aligned' | 'card' | 'chat' | 'revealed'
export interface BetaFlow { with: string | null; stage: BetaStage; revealAt: number | null }

/** how long the chat runs before the reveal: 33 minutes 33 seconds */
export const REVEAL_MS = (33 * 60 + 33) * 1000
/** the card the stars play: "What small, everyday thing makes you feel cared for?" */
export const ALIGN_CARD = 'ro6'

const KEY = 'beta-flow:v1'
const initial = (): BetaFlow => ({ with: null, stage: 'none', revealAt: null })
let state: BetaFlow = { ...initial(), ...(load<Partial<BetaFlow>>(KEY) ?? {}) }
const subs = new Set<() => void>()
const set = (p: Partial<BetaFlow>) => { state = { ...state, ...p }; save(KEY, state); subs.forEach((f) => f()) }

export const betaFlow = {
  get: () => state,
  /** you both aligned */
  start: (id: string) => set({ with: id, stage: 'aligned', revealAt: null }),
  /** you opened the card */
  openCard: () => { if (state.stage === 'aligned') set({ stage: 'card' }) },
  /** both answered: the chat opens and the clock starts */
  openChat: () => { if (state.stage === 'aligned' || state.stage === 'card') set({ stage: 'chat', revealAt: Date.now() + REVEAL_MS }) },
  /** demo: jump the clock to its last few seconds */
  skipAhead: (ms = 5000) => { if (state.stage === 'chat') set({ revealAt: Date.now() + ms }) },
  reveal: () => set({ stage: 'revealed', revealAt: null }),
  /** is this match in the flow (at any stage)? */
  has: (id: string) => state.with === id && state.stage !== 'none',
  /** their photo is still veiled */
  veiled: (id: string) => state.with === id && state.stage !== 'none' && state.stage !== 'revealed',
}

if (typeof window !== 'undefined') {
  window.addEventListener(RESET_EVENT, () => { state = initial(); remove(KEY); subs.forEach((f) => f()) })
}

export function useBetaFlow(): BetaFlow {
  return useSyncExternalStore((f) => { subs.add(f); return () => subs.delete(f) }, () => state, () => state)
}

/** mm:ss left until the reveal */
export const clock = (ms: number) => {
  const s = Math.max(0, Math.ceil(ms / 1000))
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
}
