import type { SignId } from '../../data/signs'

export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
export const MONTH_SHORT = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']

export interface BirthDate {
  /** 0–11 */
  month: number
  /** 1–31 */
  day: number
  year: number
}

export const DEFAULT_BIRTH: BirthDate = { month: 4, day: 4, year: 1994 }
export const YEAR_MIN = 1950
export const YEAR_MAX = 2008

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
  return Math.min(29, Math.max(0, Math.round(days * 0.985 + 0.5)))
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
export const ART_GLOW: Partial<Record<SignId, string>> = { taurus: '#8fe86a' }

export const SIGN_READING: Partial<Record<SignId, string>> = {
  taurus:
    'You do not fall in love. You settle into it, the way you settle into a chair you have already decided to keep. Slow to start, impossible to move, and you do not forgive the people who mistake that stillness for boredom. It is loyalty. Some work that out too late.',
}
