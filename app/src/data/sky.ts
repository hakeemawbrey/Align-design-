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

export const SKY_DATE = {
  label: 'OCT 5',
  long: 'Monday, October 5, 2026',
  season: 'Libra season · day 14',
  serial: 'SKY № 278/365',
  city: 'Houston',
}

/** The one-line headline shown in the deck's Today's Sky pill. */
export const SKY_PILL = 'Venus turns back — look twice.'

export interface SkyTab {
  id: 'today' | 'tonight' | 'week' | 'moon'
  label: string
  eyebrow: string
  /** 1–5 pips, how strongly this lands for your sign today */
  pips: number
  color: string
  headline: string
  body: string
  tryLine: string
}

export const SKY_HERO = {
  sign: 'Taurus',
  headline: 'Go back before you go forward.',
  sub: 'Venus turned retrograde Saturday, across from your sun.',
}

export const SKY_TABS: SkyTab[] = [
  {
    id: 'today', label: 'Today', eyebrow: 'Venus retrograde', pips: 5, color: '#f2c75c',
    headline: 'Taurus, today favors the second look.',
    body: 'Venus, your ruler, turned retrograde in Scorpio on Saturday and now sits directly across from your sun. Old attractions resurface and first impressions get revised. Mercury is right beside her, so the conversation you kept postponing is the one that wants to happen.',
    tryLine: 'Reread a card you released last week.',
  },
  {
    id: 'tonight', label: 'Tonight', eyebrow: 'Moon in Leo', pips: 3, color: '#f39a3a',
    headline: 'Warm, a little theatrical, low on fuel.',
    body: 'The Moon is in Leo until Tuesday night, and Mars is there with it. Desire runs hot, patience runs short. The Moon is also waning, so tonight rewards play over pursuit. Flirt, then let it breathe.',
    tryLine: 'Give one compliment about something specific.',
  },
  {
    id: 'week', label: 'Week', eyebrow: 'Oct 5 – 11', pips: 4, color: '#9a7be0',
    headline: 'Nothing has to be decided yet.',
    body: 'The Sun opposes Saturn today and asks what you are actually committing to. Saturday brings the New Moon in Libra, a reset on what feels fair between two people. Venus stays retrograde until November 13, so the slow answer is the right one.',
    tryLine: 'Make the plan for after Saturday’s New Moon.',
  },
  {
    id: 'moon', label: 'Moon', eyebrow: 'Waning crescent · 27%', pips: 2, color: '#b3a6c4',
    headline: 'The clearing-out stretch.',
    body: 'The Moon is 27% lit and shrinking toward Saturday’s New Moon in Libra. Last quarter was Saturday the 3rd. Use these days to finish conversations, answer what you left on read, and close what you are not going to open again.',
    tryLine: 'Let one match go, kindly.',
  },
]

export const SKY_FOOTER = { left: 'Moon · Leo', right: 'Venus ℞ Scorpio' }

/** Cosmic calendar, October 2026. Oct 1 2026 is a Thursday. */
export const CAL_MONTH = {
  title: 'October 2026',
  firstWeekday: 4, // 0 = Sunday
  days: 31,
  today: 5,
  moonNow: 'Moon in Leo',
  phaseNow: 'Waning',
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
  { text: 'Moon in Leo · waning', note: 'until Tue night' },
  { text: 'Venus retrograde in Scorpio', note: 'until Nov 13' },
]
