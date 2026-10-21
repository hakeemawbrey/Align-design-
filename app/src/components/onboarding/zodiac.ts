import type { SignId } from '../../data/signs'
import { PERSONA } from '../../data/persona'

export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
export const MONTH_SHORT = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']

export interface BirthDate {
  /** 0–11 */
  month: number
  /** 1–31 */
  day: number
  year: number
}

/**
 * The birthday the flow opens on: whoever is playing.
 * Hakeem: May 12, 1998, 5:00 PM, Tulsa — Taurus 22°, Sagittarius moon, Libra rising.
 * Xavier: Sept 14, 2002, 11:05 AM, Houston — Virgo 22°, Capricorn moon, Scorpio rising.
 */
export const DEFAULT_BIRTH: BirthDate = { month: PERSONA.birth.month - 1, day: PERSONA.birth.day, year: PERSONA.birth.year }
export const YEAR_MIN = 1950
export const YEAR_MAX = 2012

/** the demo's "today" (Oct 5 2026) for the 18+ check */
export function ageOn(b: BirthDate, today = new Date(2026, 9, 5)) {
  let a = today.getFullYear() - b.year
  if (today.getMonth() < b.month || (today.getMonth() === b.month && today.getDate() < b.day)) a--
  return a
}

export function daysInMonth(month: number, year: number) {
  return new Date(year, month + 1, 0).getDate()
}

/** Tropical sun-sign start dates [month (0-based), day], in zodiac order from Aries. */
const STARTS: [SignId, number, number][] = [
  ['aries', 2, 21], ['taurus', 3, 20], ['gemini', 4, 21], ['cancer', 5, 21],
  ['leo', 6, 23], ['virgo', 7, 23], ['libra', 8, 23], ['scorpio', 9, 23],
  ['sagittarius', 10, 22], ['capricorn', 11, 22], ['aquarius', 0, 20], ['pisces', 1, 19],
]

const ord = (m: number, d: number) => m * 100 + d

export function sunSign({ month, day }: BirthDate): SignId {
  const o = ord(month, day)
  // walk the calendar year: capricorn wraps across Jan 1
  let best: SignId = 'capricorn'
  let bestOrd = -1
  for (const [id, m, d] of STARTS) {
    const so = ord(m, d)
    if (so <= o && so > bestOrd) { best = id; bestOrd = so }
  }
  return best
}

/** Approximate degree of the sun within its sign (0–29). */
export function sunDegree(b: BirthDate): number {
  const sign = sunSign(b)
  const [, m, d] = STARTS.find((s) => s[0] === sign)!
  let start = new Date(b.year, m, d)
  const born = new Date(b.year, b.month, b.day)
  if (start > born) start = new Date(b.year - 1, m, d)
  const days = Math.round((born.getTime() - start.getTime()) / 86400000)
  // ~0.985°/day, offset ~1° because ingress is mid-day of the start date
  return Math.min(29, Math.max(0, Math.round(days * 0.985)))
}

const MODALITY: Record<SignId, string> = {
  aries: 'CARDINAL FIRE', taurus: 'FIXED EARTH', gemini: 'MUTABLE AIR', cancer: 'CARDINAL WATER',
  leo: 'FIXED FIRE', virgo: 'MUTABLE EARTH', libra: 'CARDINAL AIR', scorpio: 'FIXED WATER',
  sagittarius: 'MUTABLE FIRE', capricorn: 'CARDINAL EARTH', aquarius: 'FIXED AIR', pisces: 'MUTABLE WATER',
}
export const modality = (s: SignId) => MODALITY[s]

const BEAST: Record<SignId, string> = {
  aries: 'THE RAM', taurus: 'THE BULL', gemini: 'THE TWINS', cancer: 'THE CRAB',
  leo: 'THE LION', virgo: 'THE MAIDEN', libra: 'THE SCALES', scorpio: 'THE SCORPION',
  sagittarius: 'THE ARCHER', capricorn: 'THE SEA-GOAT', aquarius: 'THE WATER-BEARER', pisces: 'THE FISH',
}
export const beast = (s: SignId) => BEAST[s]

/** Glow colour of each sign's figure art (the illustrated cards are not all in the sign's chip colour). */
export const ART_GLOW: Record<SignId, string> = {
  aries: '#ff6a3a', taurus: '#8fe86a', gemini: '#ffc45a', cancer: '#4a8cff',
  leo: '#ff8a3a', virgo: '#ff6aa6', libra: '#b57aff', scorpio: '#ff4a8a',
  sagittarius: '#b45cff', capricorn: '#3ae0c0', aquarius: '#3aa4ff', pisces: '#9a7aff',
}

/** colour of the sky bloom over the reveal (and the birth sky), per sun sign */
export const SIGN_SKY: Record<SignId, string> = {
  aries: '#a8321e', taurus: '#3f8a2a', gemini: '#8a6a1c', cancer: '#1f4fa8',
  leo: '#a8461c', virgo: '#9a2a6a', libra: '#6a35c4', scorpio: '#9a1f5a',
  sagittarius: '#6a2aa8', capricorn: '#1f7a6a', aquarius: '#1f5aa8', pisces: '#4a35b0',
}

/** a birthday that lands in each sign (mid-sign), for opening the reveal by address; your own sign opens on your birthday */
export const SIGN_BIRTH: Record<SignId, BirthDate> = {
  aries: { month: 3, day: 2, year: 1997 }, taurus: { month: 4, day: 12, year: 1998 }, gemini: { month: 5, day: 4, year: 1996 },
  cancer: { month: 6, day: 6, year: 1995 }, leo: { month: 7, day: 8, year: 1997 }, virgo: { month: 8, day: 5, year: 1994 },
  libra: { month: 9, day: 6, year: 1998 }, scorpio: { month: 10, day: 7, year: 1996 }, sagittarius: { month: 11, day: 6, year: 1995 },
  capricorn: { month: 0, day: 7, year: 1997 }, aquarius: { month: 1, day: 5, year: 1998 }, pisces: { month: 2, day: 6, year: 1996 },
  [PERSONA.sign]: DEFAULT_BIRTH,
}

export const SIGN_READING: Record<SignId, string> = {
  aries:
    'You fall first and fastest and you are not embarrassed about it. You want the chase, the answer, the plan for Friday by Tuesday. What you cannot do is wait — and the ones worth it will make you.',
  taurus:
    'You do not fall in love. You settle into it, the way you settle into a chair you have already decided to keep. Slow to start, impossible to move, and you do not forgive the people who mistake that stillness for boredom. It is loyalty. Some work that out too late.',
  gemini:
    'You can talk your way into anyone and out of anything, which is the problem. You want a mind that keeps up and a mouth that does not. Loyalty, for you, is staying interested. Some people will mistake the wandering for leaving.',
  cancer:
    'You love like a house: doors, rooms, a place set for someone who has not arrived yet. You remember everything and forgive most of it. The shell is not coldness. It is the only way you know to keep the inside warm.',
  leo:
    'You do not want to be loved. You want to be chosen, in public, by someone who could have chosen anyone. Generous to a fault and proud past it. The ones who last with you learn to applaud before you ask.',
  virgo:
    'You notice the thing nobody else noticed and you say it, kindly, once. You love by fixing, which is love, and by improving, which is not always. The right person lets you help and does not need it.',
  libra:
    'You want it fair and you want it beautiful and you would rather lose the argument than the evening. Decisions cost you; people never do. Someone will have to book the restaurant. It will not be you.',
  scorpio:
    'You feel everything, show almost nothing, and clock everyone in the room like it is billable. Intense, private, unshakably loyal. Trust is a one-time gift — lose it and you do not close the door, you lock it.',
  sagittarius:
    'You are already halfway out the door and you would love company. Honest to the point of injury, allergic to a cage, and you fall for the ones who can keep up without asking where you are going.',
  capricorn:
    'You treat love like a long project: unglamorous, daily, built to last. You do not say much and you mean all of it. People mistake the patience for coldness until the day they need someone who does not leave.',
  aquarius:
    'You love the whole species and struggle with the individual in front of you. You want strange, bright, unowned. The right person will not try to hold you — and will be there when you circle back.',
  pisces:
    'You take on the weather of whoever you are near, which makes you tender and easy to lose. You believe people at their best and pay for it. Find the one who does not need rescuing and stays anyway.',
}

export const SIGN_IDS = Object.keys(SIGN_READING) as SignId[]
