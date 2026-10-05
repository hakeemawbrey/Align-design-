import { BONUS, TONIGHT, type Profile } from './profiles'

/**
 * How a night of Align is dealt: draws of six — five people, then an event.
 * Free: three draws (15 people + 3 events = 18 cards). Align+: the draws keep coming.
 */
export const PEOPLE_PER_DRAW = 5
export const DRAW_SIZE = PEOPLE_PER_DRAW + 1
export const FREE_DRAWS = 3
export const FREE_PEOPLE = PEOPLE_PER_DRAW * FREE_DRAWS

export type EventId = 'second-look' | 'moon-peek' | 'mulligan'

export interface DeckEvent {
  id: EventId
  title: string
  /** small line above the title */
  eyebrow: string
  body: string
  /** what playing it does, shown on the card */
  play: string
  color: string
}

export const EVENTS: Record<EventId, DeckEvent> = {
  'second-look': {
    id: 'second-look', eyebrow: 'Venus retrograde', title: 'Second look.', color: '#e8628a',
    body: 'Venus turned back on Saturday. Old attractions return for a second read.',
    play: 'Bring back the last person you released.',
  },
  'moon-peek': {
    id: 'moon-peek', eyebrow: 'Moon in Leo', title: 'The Moon lends a peek.', color: '#f39a3a',
    body: 'A Leo Moon likes to be looked at. Tonight it looks back.',
    play: 'Take one extra peek tonight.',
  },
  mulligan: {
    id: 'mulligan', eyebrow: 'End of the deal', title: 'Mulligan.', color: '#f2c75c',
    body: 'Not feeling your hand? Shuffle back everyone you released tonight and draw again.',
    play: 'Redraw up to five released cards.',
  },
}

/** Every sixth card, in this order; the third — the end of the free fifteen — is the mulligan. */
export const EVENT_ORDER: EventId[] = ['second-look', 'moon-peek', 'mulligan']

export type Slot =
  | { kind: 'person'; profile: Profile; draw: number; pos: number; redraw?: boolean; key: string }
  | { kind: 'event'; event: DeckEvent; draw: number; pos: number; key: string }

export interface Insert {
  /** seq index the event was played at; the cards go right after it */
  after: number
  ids: string[]
}

const byId = (id: string) => [...TONIGHT, ...BONUS].find((p) => p.id === id)

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
    const ev = EVENTS[EVENT_ORDER[d % EVENT_ORDER.length]]
    seq.push({ kind: 'event', event: ev, draw: d, pos: PEOPLE_PER_DRAW, key: `event-${d}` })
  }
  for (const ins of inserts) {
    const at = seq[ins.after]
    const draw = at ? at.draw : 0
    const added: Slot[] = ins.ids.map(byId).filter((p): p is Profile => !!p)
      .map((p, i) => ({ kind: 'person', profile: p, draw, pos: -1, redraw: true, key: `${p.id}-re-${ins.after}-${i}` }))
    seq.splice(ins.after + 1, 0, ...added)
  }
  return seq
}

/** Base (not redrawn) people still to come from index i — the "11 / 15" counter. */
export const peopleLeft = (seq: Slot[], i: number) =>
  seq.slice(i).filter((s) => s.kind === 'person' && !s.redraw && !s.profile.deal).length
