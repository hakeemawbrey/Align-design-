import { useSyncExternalStore } from 'react'
import { PACKS, STARTER_HAND, TALK_CARDS, cardOfTheDay, type TalkCard } from '../data/talkCards'
import { load, remove, save } from './persist'

/**
 * Your talk-card collection: the cards you own, packs waiting to be opened,
 * and whether today's free card has been claimed. Saved on the device.
 */
interface TalkState {
  owned: string[]
  packs: string[]
  /** yyyy-mm-dd the card of the day was last claimed */
  dailyClaimed: string
  /** matches (and Align+) that already paid out their pack */
  granted: string[]
}

const KEY = 'talk:v1'
const initial = (): TalkState => ({ owned: [...STARTER_HAND], packs: ['starter', 'deep'], dailyClaimed: '', granted: [] })
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
  /** open a pack: up to `size` cards you don't have yet, rarer ones less often */
  openPack(packId: string): TalkCard[] {
    const pack = PACKS[packId]
    if (!pack) return []
    const pool = TALK_CARDS.filter((t) => pack.topics.includes(t.topic) && !state.owned.includes(t.id))
    const got: TalkCard[] = []
    const bag = [...pool]
    while (got.length < pack.size && bag.length) {
      const total = bag.reduce((n, t) => n + WEIGHT[t.rarity], 0)
      let r = Math.random() * total
      const i = bag.findIndex((t) => (r -= WEIGHT[t.rarity]) < 0)
      got.push(...bag.splice(Math.max(0, i), 1))
    }
    const packs = [...state.packs]
    packs.splice(packs.indexOf(packId), 1)
    set({ packs, owned: [...state.owned, ...got.map((t) => t.id)] })
    return got
  },
  /** a pack for something that happened (a new match, Align+), once per reason */
  grantOnce(reason: string, packId: string) {
    if (state.granted.includes(reason)) return false
    set({ packs: [...state.packs, packId], granted: [...state.granted, reason] })
    return true
  },
}

export function resetTalk() {
  remove(KEY)
  state = initial()
  subs.forEach((f) => f())
}

export function useTalk() {
  return useSyncExternalStore(talk.subscribe, talk.get)
}
