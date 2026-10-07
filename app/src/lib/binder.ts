import { useSyncExternalStore } from 'react'
import { MATCHES } from '../data/matches'
import { load, remove, save } from './persist'
import { api } from '../api'

/**
 * Demo-session binder state, shared between the Matches and Trade screens.
 * Saved to localStorage; trades are also recorded in the backend. `resetBinder` on reset.
 */
interface BinderState {
  traded: ReadonlySet<string>
  /** set right after a trade so the binder can animate the card into its sleeve */
  justTraded: string | null
  /** who the Trade screen is trading with */
  tradingWith: string
}

const initial = (): BinderState => ({
  traded: new Set(MATCHES.filter((m) => m.traded).map((m) => m.id)),
  justTraded: null,
  tradingWith: 't24',
})

const KEY = 'binder:v1'
type Saved = { traded: string[]; tradingWith: string }

function restore(): BinderState {
  const s = load<Saved>(KEY)
  return s ? { traded: new Set(s.traded), justTraded: null, tradingWith: s.tradingWith } : initial()
}

let state = restore()
const subs = new Set<() => void>()
const emit = () => {
  save(KEY, { traded: [...state.traded], tradingWith: state.tradingWith } satisfies Saved)
  subs.forEach((f) => f())
}

export const binder = {
  get: () => state,
  subscribe(f: () => void) {
    subs.add(f)
    return () => { subs.delete(f) }
  },
  startTrade(id: string) {
    state = { ...state, tradingWith: id }
    emit()
  },
  completeTrade(id: string) {
    const traded = new Set(state.traded)
    traded.add(id)
    state = { ...state, traded, justTraded: id }
    emit()
    void api.trade(id)
  },
  clearJustTraded() {
    state = { ...state, justTraded: null }
    emit()
  },
}

export function resetBinder() {
  remove(KEY)
  state = initial()
  emit()
}

export function useBinder() {
  return useSyncExternalStore(binder.subscribe, binder.get)
}
