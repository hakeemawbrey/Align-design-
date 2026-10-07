import { useSyncExternalStore } from 'react'
import { localBackend } from './local'
import { supabaseBackend } from './supabase'
import type { Backend, Snapshot, SwipeDir } from './types'

export type { Message, SwipeDir } from './types'

const URL = import.meta.env.VITE_SUPABASE_URL as string | undefined
const KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

let backend: Backend = URL && KEY ? supabaseBackend(URL, KEY) : localBackend()

/**
 * What the screens read synchronously: your matches, trades and swipes.
 * Writes update this immediately, then go to the backend.
 */
export interface World extends Snapshot {
  ready: boolean
  backend: Backend['kind']
  /** set when Supabase is configured but unreachable and we fell back */
  error?: string
}

let world: World = { ready: false, backend: backend.kind, matches: [], traded: [], swipes: {} }
const subs = new Set<() => void>()
const set = (p: Partial<World>) => { world = { ...world, ...p }; subs.forEach((f) => f()) }

/** Load your state. If Supabase fails (offline, bad keys) the app keeps working locally. */
export async function initApi() {
  try {
    set({ ...(await backend.init()), ready: true, backend: backend.kind })
  } catch (e) {
    console.warn('[align] backend unavailable, using this device only:', e)
    backend = localBackend()
    set({ ...(await backend.init()), ready: true, backend: 'local', error: String(e) })
  }
}

export const api = {
  get kind() { return backend.kind },
  async swipe(profileId: string, dir: SwipeDir) {
    set({ swipes: { ...world.swipes, [profileId]: dir } })
    const r = await backend.swipe(profileId, dir).catch(() => ({ matched: false }))
    if (r.matched && !world.matches.includes(profileId)) set({ matches: [profileId, ...world.matches] })
    return r
  },
  messages: (matchId: string) => backend.messages(matchId),
  send: (matchId: string, from: 'me' | 'them', body: string) => backend.send(matchId, from, body),
  onMessage: (matchId: string, cb: Parameters<Backend['onMessage']>[1]) => backend.onMessage(matchId, cb),
  async trade(matchId: string) {
    if (!world.traded.includes(matchId)) set({ traded: [...world.traded, matchId] })
    await backend.trade(matchId).catch((e) => console.warn('[align] trade not saved', e))
  },
  async reset() {
    try { set(await backend.reset()) } catch (e) { console.warn('[align] reset failed', e) }
  },
}

export const world$ = { get: () => world, subscribe(f: () => void) { subs.add(f); return () => { subs.delete(f) } } }
export function useWorld() {
  return useSyncExternalStore(world$.subscribe, world$.get)
}
