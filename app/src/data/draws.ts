import { BONUS, COMETS, TONIGHT, type Profile } from './profiles'
import { moonTonight, type PhaseId } from './moon'
import { SIGNS } from './signs'

/**
 * How a night of Align is dealt: draws of six — five people, then an event.
 * Free: three draws (15 people + 3 events = 18 cards). Align+: nine draws (45 people). Then 11:11.
 */
export const PEOPLE_PER_DRAW = 5
export const DRAW_SIZE = PEOPLE_PER_DRAW + 1
export const FREE_DRAWS = 3
export const FREE_PEOPLE = PEOPLE_PER_DRAW * FREE_DRAWS
/** Align+: nine draws a night (45 people), then the next deal lands at 11:11 */
export const PLUS_DRAWS = 9
export const PLUS_PEOPLE = PEOPLE_PER_DRAW * PLUS_DRAWS

export type EventId = 'second-look' | 'moon-peek' | 'mulligan' | 'comet' | 'spotlight'

export type Rarity = 'Common' | 'Uncommon' | 'Rare'

export interface DeckEvent {
  id: EventId
  /** shown where a person's name goes */
  title: string
  /** shown where the sign goes, in the event colour */
  kind: string
  /** chips next to the kind */
  chips: string[]
  /** badge glyph (top right, where the moon badge sits) */
  glyph: string
  color: string
  light: string
  /** aura image used behind the panel art */
  aura: string
  /** caption on the art panel */
  caption: string
  what: string
  play: string
  pass: string
  /** why it's in tonight's deal — the sky reason */
  why: string
  rarity: Rarity
  /** what playing it does, when it borrows another event's effect (the daily moon card) */
  effect?: EventId
  /** peeks it adds, for peek effects */
  peeks?: number
  /** the real moon tonight, for the moon card's art */
  moon?: { lit: number; waxing: boolean }
}

const aura = (sign: string) => `img/aura/${sign}.jpg`

/**
 * The moon card. It sits in the middle of every night's deal and follows the
 * real moon, so it's different every night: eight phases, each with its own
 * meaning and its own move in the deck.
 */
const MOON_CARDS: Record<PhaseId, Pick<DeckEvent, 'title' | 'what' | 'play' | 'pass' | 'why' | 'rarity' | 'effect' | 'peeks' | 'color' | 'light'>> = {
  new: {
    title: 'New Moon', what: 'A clean slate. Start the night over.', play: 'Shuffle back everyone you released and redraw up to five.',
    pass: 'Keep your hand as it is.', why: 'The new moon is the start of the cycle. Good night for a fresh start.', rarity: 'Rare', effect: 'mulligan', color: '#9a7be0', light: '#d8c8ff',
  },
  'waxing-crescent': {
    title: 'Waxing Crescent', what: 'Set an intention, then look a little closer.', play: 'Add a peek to tonight’s.',
    pass: 'Save your curiosity for the match.', why: 'The moon is growing. Small, hopeful first steps go well tonight.', rarity: 'Common', effect: 'moon-peek', peeks: 1, color: '#b8a6ff', light: '#e6deff',
  },
  'first-quarter': {
    title: 'First Quarter', what: 'Time to act. Someone outside your usual signs crosses.', play: 'Deal one extra card from beyond your chart.',
    pass: 'Stick to your sky tonight.', why: 'Half lit and pushing forward. The first quarter rewards a bold move.', rarity: 'Uncommon', effect: 'comet', color: '#6ac8ff', light: '#c4ecff',
  },
  'waxing-gibbous': {
    title: 'Waxing Gibbous', what: 'Almost full. See more before you decide.', play: 'Add two peeks to tonight’s.',
    pass: 'Trust your first read.', why: 'Nearly full: a night for looking closely and refining.', rarity: 'Uncommon', effect: 'moon-peek', peeks: 2, color: '#f3b85a', light: '#ffe0a8',
  },
  full: {
    title: 'Full Moon', what: 'Everything’s lit. Everyone sees you tonight.', play: 'Move your card to the top of three decks.',
    pass: 'Stay where the stars put you.', why: 'The full moon is the brightest night of the month. Be seen.', rarity: 'Rare', effect: 'spotlight', color: '#ffd76a', light: '#fff4cf',
  },
  'waning-gibbous': {
    title: 'Waning Gibbous', what: 'Gratitude. Someone you passed on deserves another look.', play: 'Bring back the last person you released.',
    pass: 'Keep moving. They stay released.', why: 'Just past full: a night to look back at what you almost missed.', rarity: 'Uncommon', effect: 'second-look', color: '#e8628a', light: '#ffc2d4',
  },
  'last-quarter': {
    title: 'Last Quarter', what: 'Let go of what isn’t working. Redraw.', play: 'Shuffle back everyone you released and redraw up to five.',
    pass: 'Keep your hand. Let it be.', why: 'Half dark and fading. Good for releasing old patterns.', rarity: 'Uncommon', effect: 'mulligan', color: '#7f9cff', light: '#cdd8ff',
  },
  'waning-crescent': {
    title: 'Waning Crescent', what: 'Rest and reflect. One quiet look.', play: 'Add a peek to tonight’s.',
    pass: 'Rest. Tomorrow’s a new moon soon.', why: 'The moon is almost dark. Slow down and listen to your gut.', rarity: 'Common', effect: 'moon-peek', peeks: 1, color: '#8a7ab8', light: '#d6ccf0',
  },
}

/** tonight's moon card, built from the real moon */
export function moonCard(date = new Date()): DeckEvent {
  const m = moonTonight(date)
  const c = MOON_CARDS[m.phase]
  const sign = SIGNS[m.sign]
  return {
    id: 'moon-peek', kind: 'Moon', chips: [`Moon in ${sign.name}`, m.waxing ? 'Waxing' : 'Waning'], glyph: '☾',
    aura: aura(m.sign), caption: `MOON · ${sign.name.toUpperCase()} · ${Math.round(m.lit * 100)}% LIT`,
    moon: { lit: m.lit, waxing: m.waxing }, ...c,
  }
}

export const EVENTS: Record<EventId, DeckEvent> = {
  'second-look': {
    id: 'second-look', title: 'Second look', kind: 'Transit', chips: ['Venus ℞', 'Tonight'], glyph: '℞',
    color: '#e8628a', light: '#ffc2d4', aura: aura('virgo'), caption: 'VENUS · RETROGRADE IN SCORPIO',
    what: 'Someone you passed on gets another read.',
    play: 'Bring back the last person you released.',
    pass: 'Keep moving. They stay released.',
    why: 'Venus turned retrograde on Saturday. Old attractions come back around until Nov 13.',
    rarity: 'Uncommon',
  },
  // the middle card of every night: tonight's real moon (see MOON_CARDS below)
  'moon-peek': moonCard(),
  mulligan: {
    id: 'mulligan', title: 'Mulligan', kind: 'The deal', chips: ['Redraw', 'Last card'], glyph: '⟲',
    color: '#f2c75c', light: '#fff4cf', aura: aura('taurus'), caption: 'END OF TONIGHT’S FIFTEEN',
    what: 'Not feeling your hand? Draw again.',
    play: 'Shuffle back everyone you released and redraw up to five.',
    pass: 'Keep your hand. The deal ends here.',
    why: 'Every free night ends with one. A new deal lands at 11:11.',
    rarity: 'Rare',
  },
  comet: {
    id: 'comet', title: 'Comet', kind: 'Rare sky', chips: ['Off-chart', 'One card'], glyph: '☄',
    color: '#38c4ec', light: '#b2ecff', aura: aura('aquarius'), caption: 'FROM OUTSIDE YOUR SKY',
    what: 'Someone outside your usual signs crosses tonight.',
    play: 'Deal one extra card from beyond your chart.',
    pass: 'Let it burn past.',
    why: 'Comets ignore compatibility. That’s the point.',
    rarity: 'Rare',
  },
  spotlight: {
    id: 'spotlight', title: 'Spotlight', kind: 'Boost', chips: ['Your card', '24 hours'], glyph: '✦',
    color: '#b18cff', light: '#e6d8ff', aura: aura('libra'), caption: 'YOUR CARD · FRONT OF THE DECK',
    what: 'Your card goes first in more decks tonight.',
    play: 'Move your card to the top of three decks.',
    pass: 'Stay where the stars put you.',
    why: 'Libra season favours being seen. Use it.',
    rarity: 'Uncommon',
  },
}

/**
 * Every sixth card, in this order. Free nights see the first three — the
 * mulligan closes the free fifteen; Align+ keeps cycling through all five.
 */
export const EVENT_ORDER: EventId[] = ['second-look', 'moon-peek', 'mulligan', 'comet', 'spotlight']
const FREE_EVENTS: EventId[] = EVENT_ORDER.slice(0, FREE_DRAWS)

export type Slot =
  | { kind: 'person'; profile: Profile; draw: number; pos: number; redraw?: boolean; key: string }
  | { kind: 'event'; event: DeckEvent; draw: number; pos: number; key: string; /** came back after being put back in the deck */ again?: boolean }

export interface Insert {
  /** seq index the cards go right after */
  after: number
  /** profile ids, or "event:<id>" for an event put back in the deck */
  ids: string[]
}

const byId = (id: string) => [...TONIGHT, ...BONUS, ...COMETS].find((p) => p.id === id)

/**
 * Tonight's sequence of cards. `people` is the deal after blocked signs are removed.
 * Inserts (from played events) are applied in the order they happened.
 */
export function buildSeq(people: Profile[], unlimited: boolean, inserts: Insert[]): Slot[] {
  const seq: Slot[] = []
  const free = people.slice(0, FREE_PEOPLE)
  const cycle = people.filter((p) => !p.alignsBack)
  const draws = unlimited ? PLUS_DRAWS : Math.ceil(free.length / PEOPLE_PER_DRAW)
  for (let d = 0; d < draws; d++) {
    for (let k = 0; k < PEOPLE_PER_DRAW; k++) {
      const n = d * PEOPLE_PER_DRAW + k
      let p: Profile | undefined
      if (n < free.length) p = free[n]
      else if (unlimited && cycle.length) {
        const c = cycle[(n - free.length) % cycle.length]
        p = { ...c, deal: 1 + Math.floor((n - free.length) / cycle.length) }
      }
      if (!p) break
      seq.push({ kind: 'person', profile: p, draw: d, pos: k, key: `${p.id}-${p.deal ?? 0}` })
    }
    const ev = EVENTS[d < FREE_DRAWS ? FREE_EVENTS[d] : EVENT_ORDER[d % EVENT_ORDER.length]]
    seq.push({ kind: 'event', event: ev, draw: d, pos: PEOPLE_PER_DRAW, key: `event-${d}` })
  }
  for (const ins of inserts) {
    const at = seq[ins.after]
    const draw = at ? at.draw : 0
    const added: Slot[] = ins.ids.flatMap((id, i): Slot[] => {
      // an event card put back in the deck ("event:moon-peek")
      if (id.startsWith('event:')) {
        const ev = EVENTS[id.slice(6) as EventId]
        return ev ? [{ kind: 'event', event: ev, draw, pos: PEOPLE_PER_DRAW, key: `event-back-${ins.after}-${i}`, again: true }] : []
      }
      const p = byId(id)
      return p ? [{ kind: 'person', profile: p, draw, pos: -1, redraw: true, key: `${p.id}-re-${ins.after}-${i}` }] : []
    })
    seq.splice(ins.after + 1, 0, ...added)
  }
  return seq
}

/** Dealt (not redrawn) people still to come from index i — the "11 / 15" counter (45 with Align+). */
export const peopleLeft = (seq: Slot[], i: number) =>
  seq.slice(i).filter((s) => s.kind === 'person' && !s.redraw && !s.profile.real).length
