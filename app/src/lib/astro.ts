import * as Astronomy from 'astronomy-engine'
import type { SignId } from '../data/signs'

/**
 * Real astronomy for the daily Sky card: where the planets are today, your
 * birth chart, and the aspects between them. Positions come from
 * astronomy-engine (geocentric, tropical); houses are whole-sign from your
 * rising sign, the simplest system and the oldest one.
 */
export type Planet = 'sun' | 'moon' | 'mercury' | 'venus' | 'mars' | 'jupiter' | 'saturn'
export type Point = Planet | 'asc'

export const SIGN_ORDER: SignId[] = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces']
const BODY: Record<Planet, Astronomy.Body> = {
  sun: Astronomy.Body.Sun, moon: Astronomy.Body.Moon, mercury: Astronomy.Body.Mercury, venus: Astronomy.Body.Venus,
  mars: Astronomy.Body.Mars, jupiter: Astronomy.Body.Jupiter, saturn: Astronomy.Body.Saturn,
}
export const PLANETS: Planet[] = ['sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn']

const rad = (d: number) => (d * Math.PI) / 180
const deg = (r: number) => (r * 180) / Math.PI
const norm = (d: number) => ((d % 360) + 360) % 360
export const signOf = (lon: number): SignId => SIGN_ORDER[Math.floor(norm(lon) / 30)]
export const degreeIn = (lon: number) => Math.floor(norm(lon) % 30)

/** ecliptic longitude of a planet at a moment */
export function longitude(p: Planet, date: Date): number {
  if (p === 'sun') return Astronomy.SunPosition(date).elon
  if (p === 'moon') return Astronomy.EclipticGeoMoon(date).lon
  return Astronomy.Ecliptic(Astronomy.GeoVector(BODY[p], date, true)).elon
}

/** is the planet moving backwards against the stars (retrograde)? */
export function retrograde(p: Planet, date: Date): boolean {
  if (p === 'sun' || p === 'moon') return false
  const a = longitude(p, date)
  const b = longitude(p, new Date(date.getTime() + 86400000))
  return norm(b - a) > 180
}

/** the rising sign's degree: the point of the ecliptic on the eastern horizon */
export function ascendant(date: Date, lat: number, lon: number): number {
  const ramc = rad(norm(Astronomy.SiderealTime(date) * 15 + lon))
  const eps = rad(23.4393)
  const asc = deg(Math.atan2(Math.cos(ramc), -(Math.sin(ramc) * Math.cos(eps) + Math.tan(rad(lat)) * Math.sin(eps))))
  return norm(asc)
}

export interface Birth {
  /** local birth time */
  year: number; month: number; day: number; hour: number; minute: number
  /** hours from UTC at birth, e.g. -5 for CDT */
  utcOffset: number
  lat: number; lon: number
  city: string
}

export type Chart = Record<Point, number>

export function natalChart(b: Birth): Chart {
  const when = new Date(Date.UTC(b.year, b.month - 1, b.day, b.hour - b.utcOffset, b.minute))
  const c = {} as Chart
  for (const p of PLANETS) c[p] = longitude(p, when)
  c.asc = ascendant(when, b.lat, b.lon)
  return c
}

/** the sky today, at noon local */
export function skyChart(date: Date): Record<Planet, number> {
  const noon = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12)
  const c = {} as Record<Planet, number>
  for (const p of PLANETS) c[p] = longitude(p, noon)
  return c
}

/** whole-sign house (1–12) of a longitude, counted from the rising sign */
export const houseOf = (lon: number, asc: number) => ((Math.floor(norm(lon) / 30) - Math.floor(norm(asc) / 30) + 12) % 12) + 1

export type AspectId = 'conjunct' | 'sextile' | 'square' | 'trine' | 'opposite'
export const ASPECTS: { id: AspectId; angle: number; orb: number; tone: 'blend' | 'easy' | 'hard' }[] = [
  { id: 'conjunct', angle: 0, orb: 6, tone: 'blend' },
  { id: 'sextile', angle: 60, orb: 4, tone: 'easy' },
  { id: 'square', angle: 90, orb: 5, tone: 'hard' },
  { id: 'trine', angle: 120, orb: 5, tone: 'easy' },
  { id: 'opposite', angle: 180, orb: 6, tone: 'hard' },
]

export interface Hit { transit: Planet; natal: Point; aspect: AspectId; tone: 'blend' | 'easy' | 'hard'; orb: number; strength: number }

/** how much each moving planet matters on a given day */
const WEIGHT: Record<Planet, number> = { moon: 1, sun: 1.6, mercury: 1.6, venus: 2.4, mars: 2.2, jupiter: 2, saturn: 2 }

/** every aspect today's planets make to your chart, strongest first */
export function transitsToChart(sky: Record<Planet, number>, natal: Chart): Hit[] {
  const hits: Hit[] = []
  for (const t of PLANETS) {
    for (const n of ['sun', 'moon', 'venus', 'mars', 'asc'] as Point[]) {
      const sep = norm(sky[t] - natal[n])
      const d = sep > 180 ? 360 - sep : sep
      for (const a of ASPECTS) {
        // the moon moves 13° a day, so give it a little more room
        const orb = a.orb + (t === 'moon' ? 2 : 0)
        const off = Math.abs(d - a.angle)
        if (off <= orb) hits.push({ transit: t, natal: n, aspect: a.id, tone: a.tone, orb: off, strength: WEIGHT[t] * (1 - off / (orb + 1)) })
      }
    }
  }
  return hits.sort((a, b) => b.strength - a.strength)
}
