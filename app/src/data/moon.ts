import type { SignId } from './signs'

/**
 * Tonight's real moon, worked out from the date: phase, how much is lit, and
 * which sign it's in. Good to within a few hours, which is plenty for a deck
 * that's dealt once a night.
 */
const SYNODIC = 29.530588853
/** a known new moon: 2000-01-06 18:14 UTC */
const NEW_MOON_2000 = Date.UTC(2000, 0, 6, 18, 14) / 86400000
const J2000 = Date.UTC(2000, 0, 1, 12) / 86400000

export type PhaseId = 'new' | 'waxing-crescent' | 'first-quarter' | 'waxing-gibbous' | 'full' | 'waning-gibbous' | 'last-quarter' | 'waning-crescent'

export interface MoonTonight {
  phase: PhaseId
  name: string
  /** 0 new → 1 full */
  lit: number
  waxing: boolean
  /** days since the new moon, 0–29.5 */
  age: number
  sign: SignId
}

const ORDER: PhaseId[] = ['new', 'waxing-crescent', 'first-quarter', 'waxing-gibbous', 'full', 'waning-gibbous', 'last-quarter', 'waning-crescent']
const NAME: Record<PhaseId, string> = {
  new: 'New Moon', 'waxing-crescent': 'Waxing Crescent', 'first-quarter': 'First Quarter', 'waxing-gibbous': 'Waxing Gibbous',
  full: 'Full Moon', 'waning-gibbous': 'Waning Gibbous', 'last-quarter': 'Last Quarter', 'waning-crescent': 'Waning Crescent',
}
const SIGNS: SignId[] = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces']
const rad = (d: number) => (d * Math.PI) / 180

export function moonTonight(date = new Date()): MoonTonight {
  // the deal lands at 11:11pm, so judge the moon at 11pm local
  const night = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23).getTime() / 86400000
  const age = (((night - NEW_MOON_2000) % SYNODIC) + SYNODIC) % SYNODIC
  const lit = (1 - Math.cos((2 * Math.PI * age) / SYNODIC)) / 2
  const phase = ORDER[Math.round((age / SYNODIC) * 8) % 8]
  // the moon's ecliptic longitude: mean longitude plus its biggest wobble
  const d = night - J2000
  const L = 218.316 + 13.176396 * d
  const M = 134.963 + 13.064993 * d
  const lon = (((L + 6.289 * Math.sin(rad(M))) % 360) + 360) % 360
  return { phase, name: NAME[phase], lit, waxing: age < SYNODIC / 2, age, sign: SIGNS[Math.floor(lon / 30)] }
}
