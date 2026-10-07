import { DECK, BONUS, MORE, COMETS } from '../data/profiles'
import { MATCHES } from '../data/matches'
import { load, remove, save } from '../lib/persist'
import type { Backend, Message, Snapshot, SwipeDir } from './types'

const KEY = 'backend:v1'

/** crypto.randomUUID needs https; fall back on plain http (a phone on the LAN) */
const uid = () => (typeof globalThis.crypto?.randomUUID === 'function' && isSecureContext ? crypto.randomUUID() : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`)

interface Db {
  swipes: Record<string, SwipeDir>
  matches: string[]
  traded: string[]
  messages: Message[]
}

/** a fresh account starts already matched with these people (same as start_account() in SQL) */
const STARTERS = MATCHES.filter((m) => m.day > 0)
const empty = (): Db => ({
  swipes: {},
  matches: STARTERS.map((m) => m.id),
  traded: STARTERS.filter((m) => m.traded).map((m) => m.id),
  messages: [],
})
const PEOPLE = [...DECK, ...BONUS, ...MORE, ...COMETS]
const alignsBack = (id: string) => PEOPLE.some((p) => p.id === id && p.alignsBack)

/** In-browser backend: everything in localStorage. Same behaviour as the Supabase one. */
export function localBackend(): Backend {
  let db: Db = { ...empty(), ...(load<Db>(KEY) ?? {}) }
  const listeners = new Map<string, Set<(m: Message) => void>>()
  const commit = () => save(KEY, db)
  const snapshot = (): Snapshot => ({ matches: [...db.matches], traded: [...db.traded], swipes: { ...db.swipes } })

  // another tab on this device wrote a message
  if (typeof window !== 'undefined') {
    window.addEventListener('storage', (e) => {
      if (e.key !== `align:${KEY}` || !e.newValue) return
      const next = JSON.parse(e.newValue) as Db
      const known = new Set(db.messages.map((m) => m.id))
      db = next
      next.messages.filter((m) => !known.has(m.id)).forEach((m) => listeners.get(m.matchId)?.forEach((f) => f(m)))
    })
  }

  return {
    kind: 'local',
    async init() { return snapshot() },
    async swipe(id, dir) {
      db.swipes[id] = dir
      const matched = dir === 'align' && alignsBack(id)
      if (matched && !db.matches.includes(id)) db.matches.unshift(id)
      commit()
      return { matched }
    },
    async messages(matchId) { return db.messages.filter((m) => m.matchId === matchId) },
    async send(matchId, from, body) {
      const m: Message = { id: uid(), matchId, from, body, at: new Date().toISOString() }
      db.messages.push(m)
      commit()
      return m
    },
    onMessage(matchId, cb) {
      if (!listeners.has(matchId)) listeners.set(matchId, new Set())
      listeners.get(matchId)!.add(cb)
      return () => { listeners.get(matchId)?.delete(cb) }
    },
    async trade(matchId) {
      if (!db.traded.includes(matchId)) db.traded.push(matchId)
      commit()
    },
    async reset() { db = empty(); remove(KEY); return snapshot() },
  }
}
