import { useSyncExternalStore } from 'react'
import { MATCHES } from '../data/matches'

/**
 * Demo-session binder state, shared between the Matches and Trade screens.
 * Module-level so it survives screen changes; `resetBinder` on demo restart.
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

let state = initial()
const subs = new Set<() => void>()
const emit = () => subs.forEach((f) => f())

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
  },
  clearJustTraded() {
    state = { ...state, justTraded: null }
    emit()
  },
}

export function resetBinder() {
  state = initial()
  emit()
}

export function useBinder() {
  return useSyncExternalStore(binder.subscribe, binder.get)
}
