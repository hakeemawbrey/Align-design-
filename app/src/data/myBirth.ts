import { PERSONA } from './persona'
import { natalChart, houseOf, degreeIn } from '../lib/astro'

/**
 * Your birth data as the app prints it: Settings, the onboarding defaults,
 * the chart footer. Everything here follows whichever founder is playing.
 */
const B = PERSONA.birth

/** birth cities the founders come from: state, and its postal code */
const REGION: Record<string, [string, string]> = {
  Tulsa: ['Oklahoma', 'OK'],
  Houston: ['Texas', 'TX'],
}
const [stateName, stateCode] = REGION[B.city] ?? ['', '']

const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const hour12 = B.hour % 12 === 0 ? 12 : B.hour % 12

export const BIRTH_LABEL = {
  /** 'May 12, 1998' */
  date: `${MON[B.month - 1]} ${B.day}, ${B.year}`,
  /** '5:00 PM' */
  time: `${hour12}:${String(B.minute).padStart(2, '0')} ${B.hour >= 12 ? 'PM' : 'AM'}`,
  /** 'Tulsa, OK' */
  place: stateCode ? `${B.city}, ${stateCode}` : B.city,
  /** 'Tulsa, Oklahoma' */
  placeLong: stateName ? `${B.city}, ${stateName}` : B.city,
  hour12,
  minute: B.minute,
  pm: B.hour >= 12,
  /** the part of the day you were born in */
  part: (B.hour < 12 ? 'morning' : B.hour < 17 ? 'afternoon' : B.hour < 21 ? 'evening' : 'night') as 'morning' | 'afternoon' | 'evening' | 'night',
}

/** your natal chart, computed once */
export const MY_CHART = natalChart(B)
/** the house your sun sits in (1–12) */
export const SUN_HOUSE = houseOf(MY_CHART.sun, MY_CHART.asc)
/** degree of your Venus within its sign */
export const VENUS_DEGREE = degreeIn(MY_CHART.venus)

export const ordinal = (n: number) => `${n}${n % 100 >= 11 && n % 100 <= 13 ? 'th' : (['th', 'st', 'nd', 'rd'][n % 10] ?? 'th')}`
