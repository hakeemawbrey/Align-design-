import { useSyncExternalStore } from 'react'
import { PACKS, STARTER_HAND, TALK_CARDS, cardOfTheDay, type TalkCard } from '../data/talkCards'
import { FACES, FACE_WEIGHT, SIGN_ORDER, type Face, type Variant } from '../data/archetypes'
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
  | { kind: 'sign'; sign: SignId; face: Face; variant: Variant }
  | { kind: 'event'; id: EventId }
  | { kind: 'place'; id: string }
  | { kind: 'energy'; amount: number }

/**
 * Every pack is 12 cards and mixes every kind of card except people. What the
 * pack is themed on shifts the mix: a sign pack is heavy on that sign, a talk
 * pack on its topics. The last card is the rare slot, always a sign card.
 */
export interface PackMix { sign: number; talk: number; event: number; place: number; energy: number }
export const PACK_SIZE = 12
export function mixOf(packId: string): PackMix {
  if (packId.startsWith('sign:') || packId === 'season') return { sign: 3, talk: 4, event: 2, place: 2, energy: 1 }
  if (PACKS[packId]) return { sign: 2, talk: 6, event: 2, place: 1, energy: 1 }
  return { sign: 2, talk: 5, event: 2, place: 2, energy: 1 }
}

export interface OwnedSign { sign: SignId; face?: Face; variant: Variant }

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
const initial = (): TalkState => ({ owned: [...STARTER_HAND], signs: [{ sign: ME.sign, face: 'sun', variant: 'base' }], venues: [], places: [], packs: ['general', 'starter', 'deep'], dailyClaimed: '', granted: [] })
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
  /** open any pack: 12 mixed cards, the sign in the rare slot last */
  openPack(packId: string): Pull[] {
    const packs = [...state.packs]
    const at = packs.indexOf(packId)
    if (at < 0) return []
    packs.splice(at, 1)
    return compose(packId, packs)
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
  /** distinct sign cards (sign × face) you hold, out of 48 */
  signCards: () => new Set(state.signs.map((o) => `${o.sign}:${o.face ?? 'sun'}`)).size,
}

const pick = <T,>(xs: T[]) => xs[Math.floor(Math.random() * xs.length)]
const rollVariant = (): Variant => { const r = Math.random(); return r < 0.04 ? 'mythic' : r < 0.22 ? 'gilded' : 'base' }

/** draw n talk cards, new ones first; duplicates once you have them all */
function drawTalk(n: number, topics?: string[]): TalkCard[] {
  const out: TalkCard[] = []
  const pool = TALK_CARDS.filter((t) => !topics || topics.includes(t.topic))
  const fresh = pool.filter((t) => !state.owned.includes(t.id))
  const bag = fresh.length >= n ? fresh : [...fresh, ...pool.filter((t) => state.owned.includes(t.id))]
  while (out.length < n && bag.length) {
    const total = bag.reduce((m, t) => m + WEIGHT[t.rarity], 0)
    let r = Math.random() * total
    const i = bag.findIndex((t) => (r -= WEIGHT[t.rarity]) < 0)
    out.push(bag.splice(Math.max(0, i), 1)[0])
  }
  return out
}

const weighted = <T extends string>(w: Record<T, number>, skip: T[] = []): T => {
  const keys = (Object.keys(w) as T[]).filter((k) => !skip.includes(k))
  let r = Math.random() * keys.reduce((n, k) => n + w[k], 0)
  return keys.find((k) => (r -= w[k]) < 0) ?? keys[0]
}

/** a sign card; the rare slot has better odds of Gilded and Mythic */
function signCard(pool: SignId[], rare: boolean, taken: string[]): Pull {
  const sign = pick(pool)
  const used = taken.filter((t) => t.startsWith(`${sign}:`)).map((t) => t.split(':')[1] as Face)
  const face = weighted(FACE_WEIGHT, used.length < FACES.length ? used : [])
  const r = Math.random()
  const variant: Variant = rare ? (r < 0.1 ? 'mythic' : r < 0.45 ? 'gilded' : 'base') : rollVariant()
  taken.push(`${sign}:${face}`)
  return { kind: 'sign', sign, face, variant }
}

function compose(packId: string, packs: string[]): Pull[] {
  const mix = mixOf(packId)
  const signPool: SignId[] = packId.startsWith('sign:') ? [packId.slice(5) as SignId] : packId === 'season' ? SEASON.signs : SIGN_ORDER
  const topics = PACKS[packId]?.topics
  const evIds = Object.keys(EVENTS) as EventId[]
  const placePool = PLACES.filter((p) => !p.partner).map((p) => p.id)
  const talks = drawTalk(mix.talk, topics)
  const taken: string[] = []
  const signs = Array.from({ length: mix.sign }, (_, i) => signCard(signPool, i === mix.sign - 1, taken))
  const rest: Pull[] = [
    ...talks.map((card): Pull => ({ kind: 'talk', card })),
    ...signs.slice(0, -1),
    ...Array.from({ length: mix.event }, (): Pull => ({ kind: 'event', id: pick(evIds) })),
    ...Array.from({ length: mix.place }, (): Pull => ({ kind: 'place', id: pick(placePool) })),
    ...Array.from({ length: mix.energy }, (): Pull => ({ kind: 'energy', amount: pick([10, 10, 20, 30]) })),
  ]
  // shuffle everything but the rare slot, so every pack flips differently
  for (let i = rest.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [rest[i], rest[j]] = [rest[j], rest[i]] }
  const pulls = [...rest, signs[signs.length - 1]]

  const events = pulls.flatMap((p) => (p.kind === 'event' ? [p.id] : []))
  if (events.length) session.patch({ savedEvents: [...session.get().savedEvents, ...events] })
  pulls.forEach((p) => { if (p.kind === 'energy') energize(p.amount) })
  set({
    packs,
    owned: [...new Set([...state.owned, ...talks.map((t) => t.id)])],
    signs: [...state.signs, ...pulls.flatMap((p) => (p.kind === 'sign' ? [{ sign: p.sign, face: p.face, variant: p.variant }] : []))],
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
    return { name: `${name} pack`, blurb: `12 cards, heavy on ${name}: 3 ${name} cards, talk, events, places, energy`, color: '#f2c75c' }
  }
  if (id === 'general') return { name: 'Align pack', blurb: '12 cards of every kind: signs, talk, events, places, energy', color: '#e6d8ff' }
  if (id === 'season') return { name: `${SEASON.name} pack`, blurb: `12 cards from ${SEASON.label}: 3 ${SEASON.signs.map((s) => s[0].toUpperCase() + s.slice(1)).join(' / ')} cards, talk, events, places, energy`, color: '#9fd8ff' }
  const p = PACKS[id]
  return p ? { name: p.name, blurb: `12 cards, heavy on talk: ${p.blurb.toLowerCase()}`, color: p.color } : { name: 'Pack', blurb: '', color: '#b18cff' }
}
