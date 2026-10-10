import { useSyncExternalStore } from 'react'
import { PACKS, STARTER_HAND, TALK_CARDS, cardOfTheDay, type TalkCard } from '../data/talkCards'
import { SIGN_ORDER, type Variant } from '../data/archetypes'
import { SEASON } from '../data/seasons'
import { ME } from '../data/profiles'
import type { SignId } from '../data/signs'
import { load, remove, save } from './persist'
import { EVENTS, type EventId } from '../data/draws'
import { PLACES } from '../data/places'
import { energize, session } from './session'

/** one thing out of a pack */
export type Pull =
  | { kind: 'talk'; card: TalkCard }
  | { kind: 'sign'; sign: SignId; variant: Variant }
  | { kind: 'event'; id: EventId }
  | { kind: 'place'; id: string }
  | { kind: 'energy'; amount: number }

/** what's in a general pack, like a real booster: 12 cards */
export const GENERAL_MIX = { sign: 1, talk: 6, event: 2, place: 2, energy: 1 }

export interface OwnedSign { sign: SignId; variant: Variant }

/**
 * Your collection: talk cards, sign archetypes and venue cards, packs waiting
 * to be opened, and whether today's free card has been claimed. Saved on the
 * device. Pack ids: talk packs ('starter', 'deep', 'afterdark'), a sign pack
 * ('sign:libra') or a season pack ('season').
 */
interface TalkState {
  owned: string[]
  /** sign archetype cards */
  signs: OwnedSign[]
  /** venue-exclusive cards from checking in at partner places */
  venues: string[]
  /** place cards pulled from packs (playable in chat) */
  places: string[]
  packs: string[]
  /** yyyy-mm-dd the card of the day was last claimed */
  dailyClaimed: string
  /** matches (and Align+) that already paid out their pack */
  granted: string[]
}

const KEY = 'talk:v1'
// everyone starts with their own sign's card, 8 talk cards and three packs
const initial = (): TalkState => ({ owned: [...STARTER_HAND], signs: [{ sign: ME.sign, variant: 'base' }], venues: [], places: [], packs: ['general', 'starter', 'deep'], dailyClaimed: '', granted: [] })
let state: TalkState = { ...initial(), ...(load<Partial<TalkState>>(KEY) ?? {}) }
const subs = new Set<() => void>()
const set = (p: Partial<TalkState>) => { state = { ...state, ...p }; save(KEY, state); subs.forEach((f) => f()) }
const today = () => new Date().toISOString().slice(0, 10)

const WEIGHT = { common: 6, rare: 3, legendary: 1 }

export const talk = {
  get: () => state,
  subscribe(f: () => void) { subs.add(f); return () => { subs.delete(f) } },
  dailyAvailable: () => state.dailyClaimed !== today(),
  /** claim today's free card; resolves to it */
  claimDaily(): TalkCard {
    const card = cardOfTheDay()
    set({ dailyClaimed: today(), owned: state.owned.includes(card.id) ? state.owned : [...state.owned, card.id] })
    return card
  },
  /** open a pack: talk packs deal talk cards you don't have yet; sign and season packs lead with a sign card */
  openPack(packId: string): Pull[] {
    const packs = [...state.packs]
    const at = packs.indexOf(packId)
    if (at < 0) return []
    packs.splice(at, 1)
    const pulls: Pull[] = []
    let talkTopics: string[] | null = null
    let talkCount = 0
    if (packId === 'general') return openGeneral(packs)
    if (packId.startsWith('sign:') || packId === 'season') {
      const sign = (packId.startsWith('sign:') ? packId.slice(5) : SEASON.signs[Math.floor(Math.random() * SEASON.signs.length)]) as SignId
      const r = Math.random()
      pulls.push({ kind: 'sign', sign, variant: r < 0.04 ? 'mythic' : r < 0.22 ? 'gilded' : 'base' })
      talkCount = 3
    } else {
      const pack = PACKS[packId]
      if (!pack) return []
      talkTopics = pack.topics
      talkCount = pack.size
    }
    const bag = TALK_CARDS.filter((t) => (!talkTopics || talkTopics.includes(t.topic)) && !state.owned.includes(t.id))
    while (pulls.filter((p) => p.kind === 'talk').length < talkCount && bag.length) {
      const total = bag.reduce((n, t) => n + WEIGHT[t.rarity], 0)
      let r = Math.random() * total
      const i = bag.findIndex((t) => (r -= WEIGHT[t.rarity]) < 0)
      pulls.push({ kind: 'talk', card: bag.splice(Math.max(0, i), 1)[0] })
    }
    set({
      packs,
      owned: [...state.owned, ...pulls.flatMap((p) => (p.kind === 'talk' ? [p.card.id] : []))],
      signs: [...state.signs, ...pulls.flatMap((p) => (p.kind === 'sign' ? [{ sign: p.sign, variant: p.variant }] : []))],
    })
    return pulls
  },
  /** a venue card for checking in at a partner place */
  addVenue(id: string) { if (!state.venues.includes(id)) set({ venues: [...state.venues, id] }) },
  /** a pack for something that happened (a new match, Align+), once per reason */
  grantOnce(reason: string, packId: string | string[]) {
    if (state.granted.includes(reason)) return false
    set({ packs: [...state.packs, ...(Array.isArray(packId) ? packId : [packId])], granted: [...state.granted, reason] })
    return true
  },
  granted: (reason: string) => state.granted.includes(reason),
  /** today's pack drop: 1 for free, 3 with Align+ */
  dailyPackAvailable: () => !state.granted.includes(`daily-pack:${today()}`),
  claimDailyPack(plus: boolean) { return talk.grantOnce(`daily-pack:${today()}`, plus ? ['general', 'general', 'general'] : ['general']) },
  /** distinct signs you hold, for the Sign set */
  signSet: () => SIGN_ORDER.filter((s) => state.signs.some((o) => o.sign === s)),
}

const pick = <T,>(xs: T[]) => xs[Math.floor(Math.random() * xs.length)]
const rollVariant = (): Variant => { const r = Math.random(); return r < 0.04 ? 'mythic' : r < 0.22 ? 'gilded' : 'base' }

/** draw n talk cards, new ones first; duplicates once you have them all */
function drawTalk(n: number): TalkCard[] {
  const out: TalkCard[] = []
  const fresh = TALK_CARDS.filter((t) => !state.owned.includes(t.id))
  const bag = fresh.length >= n ? fresh : [...fresh, ...TALK_CARDS.filter((t) => state.owned.includes(t.id))]
  while (out.length < n && bag.length) {
    const total = bag.reduce((m, t) => m + WEIGHT[t.rarity], 0)
    let r = Math.random() * total
    const i = bag.findIndex((t) => (r -= WEIGHT[t.rarity]) < 0)
    out.push(bag.splice(Math.max(0, i), 1)[0])
  }
  return out
}

/** a general pack: one of everything, in the order you'd flip them */
function openGeneral(packs: string[]): Pull[] {
  const signs = SIGN_ORDER
  const evIds = Object.keys(EVENTS) as EventId[]
  const placePool = PLACES.filter((p) => !p.partner).map((p) => p.id)
  const talks = drawTalk(GENERAL_MIX.talk)
  const pulls: Pull[] = [
    ...talks.slice(0, 3).map((card): Pull => ({ kind: 'talk', card })),
    { kind: 'place', id: pick(placePool) },
    { kind: 'event', id: pick(evIds) },
    ...talks.slice(3).map((card): Pull => ({ kind: 'talk', card })),
    { kind: 'energy', amount: pick([10, 10, 20, 30]) },
    { kind: 'place', id: pick(placePool) },
    { kind: 'event', id: pick(evIds) },
    // the sign card goes last, like the rare in a real pack
    { kind: 'sign', sign: pick(signs), variant: rollVariant() },
  ]
  const s = session.get()
  const events = pulls.flatMap((p) => (p.kind === 'event' ? [p.id] : []))
  if (events.length) session.patch({ savedEvents: [...s.savedEvents, ...events] })
  pulls.forEach((p) => { if (p.kind === 'energy') energize(p.amount) })
  set({
    packs,
    owned: [...new Set([...state.owned, ...talks.map((t) => t.id)])],
    signs: [...state.signs, ...pulls.flatMap((p) => (p.kind === 'sign' ? [{ sign: p.sign, variant: p.variant }] : []))],
    places: [...new Set([...state.places, ...pulls.flatMap((p) => (p.kind === 'place' ? [p.id] : []))])],
  })
  return pulls
}

export function resetTalk() {
  remove(KEY)
  state = initial()
  subs.forEach((f) => f())
}

export function useTalk() {
  return useSyncExternalStore(talk.subscribe, talk.get)
}

/** name, blurb and colour for any pack id */
export function packInfo(id: string): { name: string; blurb: string; color: string } {
  if (id.startsWith('sign:')) {
    const sign = id.slice(5)
    const name = sign[0].toUpperCase() + sign.slice(1)
    return { name: `${name} pack`, blurb: `All ${name}: a ${name} sign card and three talk cards`, color: '#f2c75c' }
  }
  if (id === 'general') return { name: 'Align pack', blurb: '12 cards: a sign card, 6 talk cards, 2 events, 2 places and energy', color: '#e6d8ff' }
  if (id === 'season') return { name: `${SEASON.name} pack`, blurb: `${SEASON.label} season: a ${SEASON.signs.map((s) => s[0].toUpperCase() + s.slice(1)).join(', ')} card and three talk cards`, color: '#9fd8ff' }
  const p = PACKS[id]
  return p ? { name: p.name, blurb: p.blurb, color: p.color } : { name: 'Pack', blurb: '', color: '#b18cff' }
}
