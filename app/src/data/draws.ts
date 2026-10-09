import { BONUS, COMETS, TONIGHT, type Profile } from './profiles'

/**
 * How a night of Align is dealt: draws of six — five people, then an event.
 * Free: three draws (15 people + 3 events = 18 cards). Align+: the draws keep coming.
 */
export const PEOPLE_PER_DRAW = 5
export const DRAW_SIZE = PEOPLE_PER_DRAW + 1
export const FREE_DRAWS = 3
export const FREE_PEOPLE = PEOPLE_PER_DRAW * FREE_DRAWS

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
}

const aura = (sign: string) => `img/aura/${sign}.jpg`

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
  'moon-peek': {
    id: 'moon-peek', title: 'Lunar peek', kind: 'Lunar', chips: ['Moon in Leo', 'Waning'], glyph: '☾',
    color: '#f39a3a', light: '#ffd7a0', aura: aura('leo'), caption: 'MOON · LEO · 27% LIT',
    what: 'One more look behind a card tonight.',
    play: 'Add a peek to tonight’s three.',
    pass: 'Save your curiosity for the match.',
    why: 'A Leo Moon likes to be looked at. Until Tuesday night, it looks back.',
    rarity: 'Common',
  },
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
  const draws = unlimited ? 40 : Math.ceil(free.length / PEOPLE_PER_DRAW)
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

/** Base (not redrawn) people still to come from index i — the "11 / 15" counter. */
export const peopleLeft = (seq: Slot[], i: number) =>
  seq.slice(i).filter((s) => s.kind === 'person' && !s.redraw && !s.profile.deal).length
