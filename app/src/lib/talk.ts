import { useSyncExternalStore } from 'react'
import { PACKS, STARTER_HAND, TALK_CARDS, cardOfTheDay, type TalkCard } from '../data/talkCards'
import { SIGN_ORDER, type Variant } from '../data/archetypes'
import { SEASON } from '../data/seasons'
import { ME } from '../data/profiles'
import type { SignId } from '../data/signs'
import { load, remove, save } from './persist'

/** one thing out of a pack */
export type Pull =
  | { kind: 'talk'; card: TalkCard }
  | { kind: 'sign'; sign: SignId; variant: Variant }

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
  packs: string[]
  /** yyyy-mm-dd the card of the day was last claimed */
  dailyClaimed: string
  /** matches (and Align+) that already paid out their pack */
  granted: string[]
}

const KEY = 'talk:v1'
// everyone starts with their own sign's card, 8 talk cards and two packs
const initial = (): TalkState => ({ owned: [...STARTER_HAND], signs: [{ sign: ME.sign, variant: 'base' }], venues: [], packs: ['starter', 'deep'], dailyClaimed: '', granted: [] })
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
  claimDailyPack(plus: boolean) { return talk.grantOnce(`daily-pack:${today()}`, plus ? ['season', 'season', 'season'] : ['season']) },
  /** distinct signs you hold, for the Sign set */
  signSet: () => SIGN_ORDER.filter((s) => state.signs.some((o) => o.sign === s)),
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
  if (id === 'season') return { name: `${SEASON.name} pack`, blurb: `${SEASON.label} season: a ${SEASON.signs.map((s) => s[0].toUpperCase() + s.slice(1)).join(', ')} card and three talk cards`, color: '#9fd8ff' }
  const p = PACKS[id]
  return p ? { name: p.name, blurb: p.blurb, color: p.color } : { name: 'Pack', blurb: '', color: '#b18cff' }
}
