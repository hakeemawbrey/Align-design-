/**
 * Places you can play in a chat to plan a date. Partner places run Align
 * nights and give a card you can only get by checking in there together.
 */
export interface Place {
  id: string
  name: string
  area: string
  kind: string
  emoji: string
  /** a short pitch, the way you'd say it to a match */
  line: string
  partner?: boolean
  /** the venue-exclusive card name, partners only */
  exclusive?: string
  perk?: string
}

export const PLACES: Place[] = [
  { id: 'agnes', name: 'Agnes Cafe', area: 'Montrose', kind: 'Coffee + wine', emoji: '☕', line: 'Low lights, good wine, easy to talk.', partner: true, exclusive: 'The Lantern', perk: 'Align night Thursdays · first glass on them' },
  { id: 'menil', name: 'The Menil', area: 'Montrose', kind: 'Museum', emoji: '🖼', line: 'Free, quiet, and you learn how they see things.' },
  { id: 'cureton', name: 'Cureton’s', area: 'Heights', kind: 'Cocktail bar', emoji: '🍸', line: 'Tiny bar, great drinks, you sit close.', partner: true, exclusive: 'The Velvet Hour', perk: 'Libra season menu · Align card at the bar' },
  { id: 'buffalo', name: 'Buffalo Bayou Park', area: 'Downtown', kind: 'Walk', emoji: '🌙', line: 'A walk at dusk. No table, no pressure.' },
  { id: 'rothko', name: 'Rothko Chapel', area: 'Montrose', kind: 'Quiet', emoji: '🕯', line: 'Ten minutes of quiet, then talk about it after.' },
  { id: 'warehouse', name: 'Warehouse Live', area: 'EaDo', kind: 'Live music', emoji: '🎶', line: 'A show. Easy if the talking runs out.', partner: true, exclusive: 'The Encore', perk: 'Align blind-date nights, monthly' },
  { id: 'tacos', name: 'Tacos A Go Go', area: 'Midtown', kind: 'Food', emoji: '🌮', line: 'Cheap, fast, and you see how they eat.' },
]

export const placeById = (id: string) => PLACES.find((p) => p.id === id)

const PLAY = '⟦place:'
const RSVP = '⟦rsvp:'
const IN = '⟦checkin:'
export const placeMsg = (id: string, when: string) => `${PLAY}${id}⟧${when}`
export const rsvpMsg = (id: string, yes: boolean) => `${RSVP}${id}⟧${yes ? 'yes' : 'no'}`
export const checkinMsg = (id: string) => `${IN}${id}⟧`

export type PlaceMsg =
  | { type: 'place'; id: string; when: string }
  | { type: 'rsvp'; id: string; yes: boolean }
  | { type: 'checkin'; id: string }

export function parsePlace(body: string): PlaceMsg | null {
  const end = body.indexOf('⟧')
  if (end < 0) return null
  if (body.startsWith(PLAY)) return { type: 'place', id: body.slice(PLAY.length, end), when: body.slice(end + 1) }
  if (body.startsWith(RSVP)) return { type: 'rsvp', id: body.slice(RSVP.length, end), yes: body.slice(end + 1) === 'yes' }
  if (body.startsWith(IN)) return { type: 'checkin', id: body.slice(IN.length, end) }
  return null
}

/** the next few evenings, for picking when */
export const WHENS = ['Thu 8pm', 'Fri 7pm', 'Sat 2pm', 'Sun 6pm']
