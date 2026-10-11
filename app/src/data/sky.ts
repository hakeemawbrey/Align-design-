import { moonTonight, moonStrip, PHASE_GUIDE } from './moon'
import { SIGNS } from './signs'
import { TODAY_READING } from './skyReading'
import { signOf, skyChart } from '../lib/astro'

/** the real moon tonight: everything moon-related below follows it */
const M = moonTonight()
const MSIGN = SIGNS[M.sign]
const PCT = Math.round(M.lit * 100)
const MOOD: Record<string, string> = { fire: 'Warm, bold, short on patience.', earth: 'Steady, cosy, in no rush.', air: 'Chatty, light, curious.', water: 'Soft, deep, feelings first.' }

/**
 * Today's sky for the demo date, Monday 5 October 2026 (Houston, CDT).
 * Positions and times computed with astronomy-engine (tropical, geocentric):
 *   Sun Libra 12°, Moon Leo 10° (waning crescent, 27% lit), Mercury Scorpio 7°,
 *   Venus Scorpio 8° retrograde (stationed Sat Oct 3, 1:40 AM; direct Fri Nov 13),
 *   Mars Leo 4°, Jupiter Leo 20°, Saturn Aries 11° retrograde.
 *   Sun opposite Saturn, Mercury conjunct Venus, Mars opposite Pluto.
 * Lunations: last quarter Sat Oct 3, new moon in Libra Sat Oct 10 10:50 AM,
 *   first quarter Sun Oct 18, full moon in Taurus Sun Oct 25 11:12 PM.
 * Ingresses: Moon → Virgo Tue Oct 6 10 PM, Sun → Scorpio Fri Oct 23 4:40 AM,
 *   Mercury stations retrograde Sat Oct 24, Venus back into Libra Sun Oct 25.
 */

const NOW = new Date()
/** which sign the Sun is in, and how many days it's been there */
function sunSeason(d: Date) {
  const sign = signOf(skyChart(d).sun)
  let n = 1
  const back = new Date(d)
  for (; n < 32; n++) { back.setDate(back.getDate() - 1); if (signOf(skyChart(back).sun) !== sign) break }
  return { sign: SIGNS[sign].name, day: n }
}
const SEASON_NOW = sunSeason(NOW)

export const SKY_DATE = {
  label: NOW.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase(),
  long: NOW.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }),
  season: `${SEASON_NOW.sign} season · day ${SEASON_NOW.day}`,
  serial: `SKY № ${TODAY_READING.serial}/365`,
  city: 'Houston',
}

/** The one-line headline shown in the deck's Today's Sky pill: today's Love card */
export const SKY_PILL = TODAY_READING.pill

export interface SkyTab {
  id: 'today' | 'tonight' | 'week' | 'moon'
  label: string
  eyebrow: string
  /** 1–5 pips, how strongly this lands for your sign today */
  pips: number
  color: string
  headline: string
  /** what is happening, in plain words */
  body: string
  /** concrete things to do */
  tries: string[]
  /** the one thing to leave alone */
  skip: string
}

export const SKY_HERO = {
  sign: 'Taurus',
}

/** Moon right now, from the real sky */
export const MOON_NOW = { lit: M.lit, waxing: M.waxing, sign: MSIGN.name, glyph: MSIGN.glyph, phase: M.name }

/** This lunar cycle, for the phase strip (lit fraction, waxing?). */
export const MOON_STRIP = moonStrip()

/** the next seven days, with the moon's big moments marked */
const AHEAD = moonStrip().filter((m) => !m.today)
const WEEK_DAYS = Array.from({ length: 7 }, (_, i) => { const d = new Date(NOW); d.setDate(d.getDate() + i); return d })
const short = (d: Date) => `${d.toLocaleDateString('en-US', { weekday: 'short' })} ${d.getDate()}`
export const WEEK_STRIP: { d: string; n: number; mark?: string; moon?: { lit: number; waxing: boolean } }[] = WEEK_DAYS.map((d) => {
  const m = AHEAD.find((x) => x.date === short(d))
  return { d: d.toLocaleDateString('en-US', { weekday: 'narrow' }), n: d.getDate(), mark: m?.label, moon: m ? { lit: m.lit, waxing: m.waxing } : undefined }
})
const WEEK_MOON = AHEAD.find((x) => WEEK_DAYS.some((d) => short(d) === x.date))

export const SKY_TABS: SkyTab[] = [
  {
    id: 'today', label: 'Today', eyebrow: 'Venus retrograde', pips: 5, color: '#f2c75c',
    headline: 'Go back before you go forward.',
    body: 'Venus, the planet of attraction (and Taurus’s ruler), appears to move backward until Nov 13. In plain words: people from your past resurface, and first impressions are easy to get wrong. Revisit, don’t rush.',
    tries: [
      'Open your released cards and give one person a second read.',
      'Reply to the message you’ve been putting off. Two lines is plenty.',
      'Ask a match the question you’d usually save for date three.',
    ],
    skip: 'Defining the relationship this week. Or texting an ex at midnight.',
  },
  {
    id: 'tonight', label: 'Tonight', eyebrow: `Moon in ${MSIGN.name}`, pips: 3, color: '#f39a3a',
    headline: MOOD[MSIGN.element],
    body: `The Moon sets the mood of the night. Tonight it’s in ${MSIGN.name}, a ${MSIGN.element} sign, so everyone’s a little more ${MSIGN.element === 'fire' ? 'bold and impatient' : MSIGN.element === 'earth' ? 'practical and steady' : MSIGN.element === 'air' ? 'talkative and curious' : 'sensitive and intuitive'}. The Moon is ${M.waxing ? 'growing, which favours starting things' : 'fading, which favours finishing things'}.`,
    tries: [
      'Send a specific compliment. “That photo at the lake” beats “you’re cute”.',
      'Suggest something easy to say yes to: a walk, one drink, 45 minutes.',
      'Let them have the last text tonight.',
    ],
    skip: 'Serious conversations after 10 PM. They’ll go sideways.',
  },
  {
    id: 'week', label: 'Week', eyebrow: `${short(WEEK_DAYS[0])} – ${short(WEEK_DAYS[6])}`, pips: 4, color: '#9a7be0',
    headline: WEEK_MOON ? (WEEK_MOON.label.startsWith('Full') ? 'Feelings peak this week.' : WEEK_MOON.label === 'New moon' ? 'A fresh start lands this week.' : 'A turning point this week.') : 'A steady week. Build on what’s working.',
    body: WEEK_MOON
      ? `The ${WEEK_MOON.label.startsWith('Full') ? `full moon in ${WEEK_MOON.label.slice(7)}` : WEEK_MOON.label.toLowerCase()} lands ${WEEK_MOON.date}. ${WEEK_MOON.label.startsWith('Full') ? 'Full moons bring things to the surface: what you feel, you’ll say.' : WEEK_MOON.label === 'New moon' ? 'New moons are for starting: first messages, first dates.' : 'Quarter moons are for deciding: act on what you’ve been circling.'} It’s ${SEASON_NOW.sign} season, day ${SEASON_NOW.day}.`
      : `No big moon moments this week. It’s ${SEASON_NOW.sign} season, day ${SEASON_NOW.day}: a good week to follow up with the people you already like.`,
    tries: [
      'Early week: listen more than you plan.',
      'Midweek: say what you actually want, once, kindly.',
      WEEK_MOON ? `${WEEK_MOON.date}: the moon’s big night. Make a plan around it.` : 'Weekend: make the plan you’ve been circling.',
    ],
    skip: 'Ultimatums. This week rewards patience, not pressure.',
  },
  {
    id: 'moon', label: 'Moon', eyebrow: `${M.name} · ${PCT}%`, pips: PHASE_GUIDE[M.phase].pips, color: '#b3a6c4',
    headline: PHASE_GUIDE[M.phase].headline,
    body: PHASE_GUIDE[M.phase].body,
    tries: PHASE_GUIDE[M.phase].tries,
    skip: PHASE_GUIDE[M.phase].skip,
  },
]

export const SKY_FOOTER = { left: `Moon · ${MSIGN.name}`, right: 'Venus ℞ Scorpio' }

/** Cosmic calendar, October 2026. Oct 1 2026 is a Thursday. */
export const CAL_MONTH = {
  title: 'October 2026',
  firstWeekday: 4, // 0 = Sunday
  days: 31,
  today: 5,
  moonNow: `Moon in ${MSIGN.name}`,
  phaseNow: M.waxing ? 'Waxing' : 'Waning',
}

export type CalKind = 'moon' | 'venus' | 'mercury' | 'season'
export const CAL_KIND_COLOR: Record<CalKind, string> = {
  moon: '#b3a6c4',
  venus: '#e8628a',
  mercury: '#7fd8b0',
  season: '#f2c75c',
}

/** Days with a marker dot. */
export const CAL_MARKS: Record<number, CalKind> = {
  3: 'venus', // Venus stations retrograde (and last quarter moon)
  10: 'moon', // New moon in Libra
  18: 'moon', // First quarter
  23: 'season', // Sun into Scorpio
  24: 'mercury', // Mercury stations retrograde
  25: 'moon', // Full moon in Taurus
}

export interface CalEvent {
  title: string
  when: string
  kind: CalKind
  /** visual for the tile */
  orb: 'venus' | 'newmoon' | 'fullmoon' | 'sun' | 'mercury'
}

export const CAL_EVENTS: CalEvent[] = [
  { title: 'Venus retrograde', when: 'since the 3rd', kind: 'venus', orb: 'venus' },
  { title: 'New moon · Libra', when: 'Sat 10th', kind: 'moon', orb: 'newmoon' },
  { title: 'Scorpio season', when: 'Fri 23rd', kind: 'season', orb: 'sun' },
  { title: 'Mercury retrograde', when: 'Sat 24th', kind: 'mercury', orb: 'mercury' },
  { title: 'Full moon · Taurus', when: 'Sun 25th · yours', kind: 'moon', orb: 'fullmoon' },
]

export const CAL_TONIGHT = [
  { text: `Moon in ${MSIGN.name} · ${M.waxing ? 'waxing' : 'waning'}`, note: `${M.name} · ${PCT}% lit` },
  { text: 'Venus retrograde in Scorpio', note: 'until Nov 13' },
]
