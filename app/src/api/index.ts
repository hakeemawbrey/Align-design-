import { useSyncExternalStore } from 'react'
import { localBackend } from './local'
import { supabaseBackend } from './supabase'
import { hydrateCatalog } from './catalog'
import { load, remove, save } from '../lib/persist'
import { ME, type Profile } from '../data/profiles'
import type { Backend, MyCard, Snapshot, SwipeDir } from './types'

export type { Message, MyCard, SwipeDir } from './types'

const URL_ = import.meta.env.VITE_SUPABASE_URL as string | undefined
const KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

let backend: Backend = URL_ && KEY ? supabaseBackend(URL_, KEY) : localBackend()

/** A heads-up shown over any screen, e.g. someone aligned back on you. */
export interface Notice { id: number; text: string; profileId?: string }

/**
 * What the screens read synchronously: your matches, trades, swipes and the
 * real people around you. Writes update this immediately, then go to the backend.
 */
export interface World extends Snapshot {
  ready: boolean
  backend: Backend['kind']
  /** set when Supabase is configured but unreachable and we fell back */
  error?: string
  notice?: Notice
}

let world: World = { ready: false, backend: backend.kind, matches: [], traded: [], swipes: {}, people: [] }
const subs = new Set<() => void>()
const set = (p: Partial<World>) => { world = { ...world, ...p }; subs.forEach((f) => f()) }

// Your card. Defaults to Hakeem; onboarding on a new phone replaces it, and
// every screen that shows "you" reads ME, so it follows along.
const CARD_KEY = 'mycard:v1'
const DEFAULT_ME = { ...ME }
const savedCard = load<MyCard>(CARD_KEY)
if (savedCard) applyCard(savedCard)
function applyCard(c: MyCard) {
  Object.assign(ME, { name: c.name, age: c.age, sign: c.sun, moon: c.moon, rising: c.rising, blurb: c.blurb, ...(c.photo ? { photo: c.photo } : {}) })
}

/** matches you're making right now, so the live feed doesn't announce your own */
const swiping = new Set<string>()
let noticeId = 0
let stopMatches: (() => void) | null = null

function listen() {
  stopMatches?.()
  stopMatches = backend.onMatch((p) => {
    if (swiping.has(p.id) || world.matches.includes(p.id)) return
    set({
      matches: [p.id, ...world.matches],
      people: [p, ...world.people.filter((x) => x.id !== p.id)],
      notice: { id: ++noticeId, text: `${p.name} aligned back. It’s mutual.`, profileId: p.id },
    })
  })
}

/** Load your state. If Supabase fails (offline, bad keys) the app keeps working locally. */
export async function initApi() {
  try {
    const snap = await backend.init()
    if (snap.catalog) hydrateCatalog(snap.catalog)
    set({ ...snap, ready: true, backend: backend.kind })
  } catch (e) {
    console.warn('[align] backend unavailable, using this device only:', e)
    backend = localBackend()
    set({ ...(await backend.init()), ready: true, backend: 'local', error: String(e) })
  }
  listen()
}

export const api = {
  get kind() { return backend.kind },
  async swipe(profileId: string, dir: SwipeDir) {
    set({ swipes: { ...world.swipes, [profileId]: dir } })
    swiping.add(profileId)
    try {
      const r = await backend.swipe(profileId, dir).catch(() => ({ matched: false }))
      if (r.matched && !world.matches.includes(profileId)) set({ matches: [profileId, ...world.matches] })
      return r
    } finally {
      setTimeout(() => swiping.delete(profileId), 4000)
    }
  },
  messages: (matchId: string) => backend.messages(matchId),
  send: (matchId: string, from: 'me' | 'them', body: string) => backend.send(matchId, from, body),
  onMessage: (matchId: string, cb: Parameters<Backend['onMessage']>[1]) => backend.onMessage(matchId, cb),
  async trade(matchId: string) {
    if (!world.traded.includes(matchId)) set({ traded: [...world.traded, matchId] })
    await backend.trade(matchId).catch((e) => console.warn('[align] trade not saved', e))
  },
  /** save your card on this phone and publish it so others can be dealt it */
  async publish(card: MyCard) {
    save(CARD_KEY, card)
    applyCard(card)
    try {
      const id = await backend.publish(card)
      set({ myCardId: id })
      return id
    } catch (e) {
      console.warn('[align] card not published', e)
      return undefined
    }
  },
  uploadPhoto: (file: Blob) => backend.uploadPhoto(file),
  person: (id: string): Profile | undefined => world.people.find((p) => p.id === id),
  dismissNotice() { set({ notice: undefined }) },
  async reset() {
    // a reset hands the phone back to the default account (Hakeem)
    remove(CARD_KEY)
    Object.assign(ME, DEFAULT_ME)
    try { set({ ...(await backend.reset()), notice: undefined }) } catch (e) { console.warn('[align] reset failed', e) }
  },
}

// dev only: lets tests put a real person into the world without a second phone
if (import.meta.env.DEV) (window as unknown as { __alignTest: unknown }).__alignTest = { set, get: () => world }

export const world$ = { get: () => world, subscribe(f: () => void) { subs.add(f); return () => { subs.delete(f) } } }
export function useWorld() {
  return useSyncExternalStore(world$.subscribe, world$.get)
}
