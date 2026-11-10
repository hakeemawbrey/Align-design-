import { longitude, retrograde, signOf, type Planet } from '../lib/astro'
import { moonTonight, type MoonTonight } from './moon'
import { SIGNS, type SignId } from './signs'
import { ME } from './profiles'

/**
 * The cosmic calendar: a month of real sky events, worked out from the
 * ephemeris (no hand-written dates). Moon phases, planets changing sign,
 * retrogrades starting and ending, and each new sign season.
 */

export type CosmicKind = 'moon' | 'season' | 'ingress' | 'retro' | 'direct'

export interface CosmicEvent {
  day: number
  kind: CosmicKind
  title: string
  /** one plain sentence on what it means for dating */
  note: string
  planet?: Planet
  sign?: SignId
  /** touches your sun, moon or rising */
  yours: boolean
}

export interface CosmicDay {
  day: number
  date: Date
  weekday: number
  moon: MoonTonight
  events: CosmicEvent[]
}

export interface CosmicMonth {
  year: number
  month: number
  title: string
  firstWeekday: number
  days: CosmicDay[]
  events: CosmicEvent[]
}

export const COSMIC_COLOR: Record<CosmicKind, string> = {
  moon: '#c9bedb',
  season: '#f2c75c',
  ingress: '#7fd0f0',
  retro: '#e8628a',
  direct: '#7fd8b0',
}

const NAME: Record<Planet, string> = { sun: 'Sun', moon: 'Moon', mercury: 'Mercury', venus: 'Venus', mars: 'Mars', jupiter: 'Jupiter', saturn: 'Saturn' }
const MOVERS: Planet[] = ['mercury', 'venus', 'mars', 'jupiter', 'saturn']

/** what each planet colours, in dating terms */
const AREA: Record<Planet, string> = {
  sun: 'what you want',
  moon: 'how you feel',
  mercury: 'texting and talking',
  venus: 'love and attraction',
  mars: 'desire and first moves',
  jupiter: 'luck and big leaps',
  saturn: 'commitment',
}

const PHASE_NOTE: Record<string, string> = {
  new: 'A clean start. Set an intention for who you want to meet.',
  'first-quarter': 'Push a little. Send the message you keep drafting.',
  full: 'Feelings run high. Big conversations land, for better or worse.',
  'last-quarter': 'Let go of what isn’t working. Clear out old chats.',
}
const PHASE_TITLE: Record<string, string> = { new: 'New moon', 'first-quarter': 'First quarter', full: 'Full moon', 'last-quarter': 'Last quarter' }
const QUARTER = 29.530588853 / 4

const mine = (s?: SignId) => !!s && (s === ME.sign || s === ME.moon || s === ME.rising)
const noon = (y: number, m: number, d: number) => new Date(y, m, d, 12)

/** the month around `date` (defaults to this month) */
export function cosmicMonth(date = new Date()): CosmicMonth {
  const year = date.getFullYear(), month = date.getMonth()
  const count = new Date(year, month + 1, 0).getDate()
  const days: CosmicDay[] = []
  const events: CosmicEvent[] = []

  let prevMoon = moonTonight(new Date(year, month, 0))
  const prevSign = Object.fromEntries((['sun', ...MOVERS] as Planet[]).map((p) => [p, signOf(longitude(p, noon(year, month, 0)))])) as Record<Planet, SignId>
  const prevRetro = Object.fromEntries(MOVERS.map((p) => [p, retrograde(p, noon(year, month, 0))])) as Record<Planet, boolean>

  for (let d = 1; d <= count; d++) {
    const at = noon(year, month, d)
    const moon = moonTonight(at)
    const evs: CosmicEvent[] = []

    // the moon crossing a quarter of its cycle tonight
    const q0 = Math.floor(prevMoon.age / QUARTER), q1 = Math.floor(moon.age / QUARTER)
    if (q0 !== q1) {
      const phase = (['new', 'first-quarter', 'full', 'last-quarter'] as const)[q1 % 4]
      evs.push({ day: d, kind: 'moon', title: `${PHASE_TITLE[phase]} in ${SIGNS[moon.sign].name}`, note: PHASE_NOTE[phase], sign: moon.sign, yours: mine(moon.sign) })
    }
    prevMoon = moon

    // the Sun into a new sign: a new season
    const sun = signOf(longitude('sun', at))
    if (sun !== prevSign.sun) {
      evs.push({ day: d, kind: 'season', title: `${SIGNS[sun].name} season`, note: `The Sun moves into ${SIGNS[sun].name}. ${SIGNS[sun].name}s are at their most magnetic.`, planet: 'sun', sign: sun, yours: mine(sun) })
      prevSign.sun = sun
    }

    for (const p of MOVERS) {
      const s = signOf(longitude(p, at))
      if (s !== prevSign[p]) {
        evs.push({ day: d, kind: 'ingress', title: `${NAME[p]} into ${SIGNS[s].name}`, note: `A new tone for ${AREA[p]}: more ${SIGNS[s].name}, less ${SIGNS[prevSign[p]].name}.`, planet: p, sign: s, yours: mine(s) })
        prevSign[p] = s
      }
      const r = retrograde(p, at)
      if (r !== prevRetro[p]) {
        evs.push(r
          ? { day: d, kind: 'retro', title: `${NAME[p]} retrograde`, note: `Go back over ${AREA[p]}. Old flames resurface; don’t rush anything new.`, planet: p, sign: s, yours: mine(s) }
          : { day: d, kind: 'direct', title: `${NAME[p]} direct`, note: `${NAME[p]} moves forward again. Decisions about ${AREA[p]} are safe to make.`, planet: p, sign: s, yours: mine(s) })
        prevRetro[p] = r
      }
    }

    days.push({ day: d, date: at, weekday: at.getDay(), moon, events: evs })
    events.push(...evs)
  }

  return {
    year, month,
    title: date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    firstWeekday: new Date(year, month, 1).getDay(),
    days, events,
  }
}

/** retrogrades already running when the month starts, so the calendar can say "still retrograde" */
export function runningRetrogrades(date = new Date()): { planet: Planet; title: string }[] {
  const start = new Date(date.getFullYear(), date.getMonth(), 1, 12)
  return MOVERS.filter((p) => retrograde(p, start)).map((p) => ({ planet: p, title: `${NAME[p]} retrograde in ${SIGNS[signOf(longitude(p, start))].name}` }))
}
