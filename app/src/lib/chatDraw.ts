import { useSyncExternalStore } from 'react'
import { load, save, remove } from './persist'
import { RESET_EVENT } from './demo'
import { TALK_CARDS } from '../data/talkCards'

/**
 * The beta's talk cards: no hand to manage. Each day, each chat gets three
 * cards dealt from a shuffled deck. Play any of them in that chat; a fresh
 * three arrive when the day turns over at 11:11 PM.
 */
export const DRAW_SIZE = 3
/** the day turns over at 11:11 PM, local time */
const TURN_H = 23, TURN_M = 11
const TURN_MS = (TURN_H * 60 + TURN_M) * 60_000

interface Draw { day: string; cards: string[]; played: string[] }
type Draws = Record<string, Draw>

const KEY = 'chat-draw:v1'
let state: Draws = load<Draws>(KEY) ?? {}
const subs = new Set<() => void>()
const put = (next: Draws) => { state = next; save(KEY, state); subs.forEach((f) => f()) }

/** which "day" it is, counting from 11:11 PM to 11:11 PM */
export const drawDay = (now = Date.now()) => {
  const d = new Date(now - TURN_MS)
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
}
/** when the next three are dealt */
export const nextTurn = (now = Date.now()) => {
  const d = new Date(now)
  const t = new Date(d.getFullYear(), d.getMonth(), d.getDate(), TURN_H, TURN_M, 0, 0).getTime()
  return t > now ? t : t + 86_400_000
}

export const chatDraw = {
  /** today's three for this chat, if they've been dealt */
  get: (chat: string): Draw | null => { const d = state[chat]; return d && d.day === drawDay() ? d : null },
  /** shuffle the deck and deal three (no-op if today's are already dealt) */
  deal: (chat: string): Draw => {
    const have = chatDraw.get(chat)
    if (have) return have
    const deck = TALK_CARDS.map((c) => c.id)
    for (let i = deck.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [deck[i], deck[j]] = [deck[j], deck[i]] }
    const d: Draw = { day: drawDay(), cards: deck.slice(0, DRAW_SIZE), played: [] }
    put({ ...state, [chat]: d })
    return d
  },
  play: (chat: string, id: string) => {
    const d = chatDraw.get(chat)
    if (!d || d.played.includes(id)) return
    put({ ...state, [chat]: { ...d, played: [...d.played, id] } })
  },
}

if (typeof window !== 'undefined') {
  window.addEventListener(RESET_EVENT, () => { state = {}; remove(KEY); subs.forEach((f) => f()) })
}

export function useChatDraw(chat: string): Draw | null {
  const all = useSyncExternalStore((f) => { subs.add(f); return () => { subs.delete(f) } }, () => state, () => state)
  const d = all[chat]
  return d && d.day === drawDay() ? d : null
}
