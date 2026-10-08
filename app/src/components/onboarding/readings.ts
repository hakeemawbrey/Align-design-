import { SIGNS, type Element, type SignId } from '../../data/signs'

/** O-06b — "Taurus, the user manual." Three short reads per sun sign. */
export const MANUAL: Record<SignId, { strengths: string; weaknesses: string; workOn: string }> = {
  aries: {
    strengths: 'First through the door. Makes the plan happen. Says the thing out loud.',
    weaknesses: 'Mistakes a pause for a no. Wins the argument, loses the evening.',
    workOn: 'Letting someone else go first. It is not a race if they are on your side.',
  },
  taurus: {
    strengths: 'Steady to the bone. Builds a home anywhere. Still knows how you take your coffee.',
    weaknesses: 'Digs in and calls it patience. Keeps the wrong thing rather than risk the right one.',
    workOn: 'Letting go before your hands are forced. Nothing held that tightly is still a choice.',
  },
  gemini: {
    strengths: 'Never a dull dinner. Remembers the joke from the first date. Curious about you.',
    weaknesses: 'Leaves before it gets quiet. Answers a feeling with a fact.',
    workOn: 'Staying in the boring part. That is where people decide to trust you.',
  },
  cancer: {
    strengths: 'Feeds people. Notices the mood before it is said. Loyal past the point of reason.',
    weaknesses: 'Hears criticism in a weather report. Retreats instead of asking.',
    workOn: 'Saying what you need before you need it. Hints are not a plan.',
  },
  leo: {
    strengths: 'Generous with time, money and compliments. Makes Tuesday feel like an occasion.',
    weaknesses: 'Needs the applause to know it went well. Takes silence personally.',
    workOn: 'Being loved quietly. Not every good thing has an audience.',
  },
  virgo: {
    strengths: 'Shows love by fixing things. Remembers the details. Shows up early.',
    weaknesses: 'Edits people. Reads a typo as a character flaw.',
    workOn: 'Letting a good thing be unfinished. Nobody wants to be your project.',
  },
  libra: {
    strengths: 'Makes everyone feel like the favourite. Great taste. Better company.',
    weaknesses: 'Agrees to keep the peace, then resents the peace.',
    workOn: 'Picking the restaurant. Having a preference is not starting a fight.',
  },
  scorpio: {
    strengths: 'All in or not at all. Keeps every secret. Sees through anyone.',
    weaknesses: 'Tests people who never signed up for the exam.',
    workOn: 'Trusting before it is proven. Some people only show up when they are let in.',
  },
  sagittarius: {
    strengths: 'Makes any plan an adventure. Honest to a fault. Laughs easily.',
    weaknesses: 'Treats commitment like a cage. Books the trip, forgets the person.',
    workOn: 'Staying when it is ordinary. The view is better with someone who knows you.',
  },
  capricorn: {
    strengths: 'Means it when they say it. Plans five years out. Shows up in a crisis.',
    weaknesses: 'Schedules feelings for later. Later rarely comes.',
    workOn: 'Being off duty. You are allowed to be wanted, not just needed.',
  },
  aquarius: {
    strengths: 'Unbothered by what people think. Loyal friend first. Never boring.',
    weaknesses: 'Goes cold when it gets close. Explains instead of feeling.',
    workOn: 'Staying in the room when it gets personal. Distance is not the same as calm.',
  },
  pisces: {
    strengths: 'Feels everything with you. Romantic without trying. Forgives fast.',
    weaknesses: 'Falls for who someone could be. Disappears instead of saying no.',
    workOn: 'Seeing people as they are today. Potential does not text back.',
  },
}

export const ELEMENT_LABEL: Record<Element, string> = { fire: 'fire', earth: 'earth', air: 'air', water: 'water' }

/** planet colours for the element orb */
export const ELEMENT_ORB: Record<Element, { color: string; light: string; dark: string }> = {
  fire: { color: '#f0603a', light: '#ffc2a0', dark: '#3a0e06' },
  earth: { color: '#7cd84a', light: '#e4ffb8', dark: '#173a0a' },
  air: { color: '#7fc8f0', light: '#e2f5ff', dark: '#10304a' },
  water: { color: '#3f7cf0', light: '#b8d4ff', dark: '#0a1640' },
}

/** O-09 body — what the element moves toward */
export const ELEMENT_ESSENCE: Record<Element, string> = {
  fire: 'Fire is appetite. It moves toward what feels alive — and moves on when it stops.',
  earth: 'Earth is possession. It moves toward what it can keep — and then it keeps it.',
  air: 'Air is attention. It moves toward what is interesting — and stays while it still is.',
  water: 'Water is feeling. It moves toward what feels safe — and floods what does not.',
}

const ORDER: Element[] = ['fire', 'water', 'air', 'earth']

/** O-09 tiles — your element against each of the four */
export const WEATHER: Record<Element, Record<Element, string>> = {
  earth: {
    fire: 'Kiln. They light you up; you keep the heat.',
    air: 'They talk you out. You talk them into staying.',
    water: 'Rain on a field. Slowly, then all at once.',
    earth: 'Two gardens, one fence. Nobody hurries.',
  },
  fire: {
    fire: 'Wildfire. Brilliant for a week, then smoke.',
    air: 'Bellows. They feed you oxygen and ideas.',
    water: 'Steam. Hot, loud, and nobody can see.',
    earth: 'Hearth. They give you somewhere to burn.',
  },
  air: {
    fire: 'Kite and wind. They take you higher.',
    air: 'Two radios. Great signal, nobody sleeps.',
    water: 'Fog. Beautiful, and you both get lost.',
    earth: 'Weathervane on a farmhouse. You spin; they stay.',
  },
  water: {
    fire: 'Steam. Hot, loud, then gone.',
    air: 'Waves. They stir you up; you pull them under.',
    water: 'Tide pool. Deep, private, hard to leave.',
    earth: 'Riverbank. They give you a shape.',
  },
}

export const weatherTiles = (el: Element) => ORDER.map((other) => ({ other, text: WEATHER[el][other] }))

export const signsOf = (el: Element) => (Object.values(SIGNS).filter((s) => s.element === el)).map((s) => s.name)

/** O-08 footnote — "Taurus sun, Sagittarius moon: you want a home and a horizon." */
const SUN_WANT: Record<Element, string> = { earth: 'a home', fire: 'a spark', air: 'a good conversation', water: 'somewhere safe' }
const MOON_WANT: Record<Element, string> = { fire: 'a horizon', earth: 'solid ground', air: 'room to breathe', water: 'depth' }
export const wantLine = (sun: SignId, moon: SignId) =>
  `${SIGNS[sun].name} sun, ${SIGNS[moon].name} moon: you want ${SUN_WANT[SIGNS[sun].element]} and ${MOON_WANT[SIGNS[moon].element]}. We deal you people who offer both.`

/** O-05 — parts of the day and roughly where they put the Rising (signs after the sun). */
export type DayPart = 'morning' | 'afternoon' | 'evening' | 'night'
export const DAY_PARTS: { id: DayPart; label: string; offsets: [number, number]; arc: number }[] = [
  { id: 'morning', label: 'Morning', offsets: [0, 1], arc: 0.18 },
  { id: 'afternoon', label: 'Afternoon', offsets: [3, 4], arc: 0.5 },
  { id: 'evening', label: 'Evening', offsets: [5, 6], arc: 0.82 },
  { id: 'night', label: 'Night', offsets: [8, 9], arc: 1.1 },
]

const ZODIAC: SignId[] = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces']
export const signAfter = (sun: SignId, n: number): SignId => ZODIAC[(ZODIAC.indexOf(sun) + n) % 12]

/** Rough Rising from a clock time: the ascendant moves a sign about every two hours from sunrise. */
export const risingAt = (sun: SignId, hour24: number) => signAfter(sun, Math.floor(((hour24 - 6 + 24) % 24) / 2))

export interface BirthTime {
  /** exact clock time, or only a part of the day */
  exact: boolean
  /** 1–12 */
  hour: number
  minute: number
  pm: boolean
  part: DayPart
  /** birth city, "City, Region" */
  place: string
}

/** Hakeem: 5:00 PM, Tulsa */
export const DEFAULT_TIME: BirthTime = { exact: true, hour: 5, minute: 0, pm: true, part: 'evening', place: 'Tulsa, Oklahoma' }
/** "Tulsa, Oklahoma" → "Tulsa" */
export const cityOf = (place: string) => place.split(',')[0].trim()

export const hour24 = (t: BirthTime) => (t.hour % 12) + (t.pm ? 12 : 0)
export const timeLabel = (t: BirthTime) =>
  t.exact ? `${t.hour}:${String(t.minute).padStart(2, '0')} ${t.pm ? 'PM' : 'AM'}` : DAY_PARTS.find((p) => p.id === t.part)!.label

export function risingFor(sun: SignId, t: BirthTime): SignId {
  if (t.exact) return risingAt(sun, hour24(t))
  return signAfter(sun, DAY_PARTS.find((p) => p.id === t.part)!.offsets[0])
}

/** Dealbreaker chips (O-12) and how each reads on your card. */
export const DEALBREAKERS: { id: string; chip: string; card: string }[] = [
  { id: 'one-word', chip: 'One-word texts', card: 'One-word texts' },
  { id: 'flaky', chip: 'Flaky plans', card: 'Flaky plans' },
  { id: 'group-chats', chip: 'Hates my group chats', card: 'Hating my group chats' },
  { id: 'follow-up', chip: 'No follow-up questions', card: 'Never asking a follow-up question' },
  { id: 'sore', chip: 'Sore losers', card: 'Sore losers' },
  { id: 'calm-down', chip: '“Calm down”', card: 'Saying “calm down”' },
  { id: 'talk-it-out', chip: 'Refusing to talk it out', card: 'Refusing to talk it out' },
  { id: 'reads', chip: 'Reads, no reply', card: 'Reading and never replying' },
]
export const DEFAULT_DEALBREAKERS = ['one-word', 'group-chats']
export const MAX_DEALBREAKERS = 3
