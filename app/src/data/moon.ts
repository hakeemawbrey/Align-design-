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

/** the moon's sign at a moment (days since 1970, UTC): mean longitude plus its six biggest periodic terms */
export function signAtDay(day: number): SignId {
  const d = day - J2000
  const L = 218.316 + 13.176396 * d
  const M = 134.963 + 13.064993 * d
  const D = 297.85 + 12.190749 * d // elongation from the Sun
  const Ms = 357.529 + 0.98560028 * d // the Sun's anomaly
  const F = 93.272 + 13.22935 * d // argument of latitude
  const lon = (((L + 6.289 * Math.sin(rad(M)) + 1.274 * Math.sin(rad(2 * D - M)) + 0.658 * Math.sin(rad(2 * D))
    + 0.214 * Math.sin(rad(2 * M)) - 0.186 * Math.sin(rad(Ms)) - 0.114 * Math.sin(rad(2 * F))) % 360) + 360) % 360
  return SIGNS[Math.floor(lon / 30)]
}

export function moonTonight(date = new Date()): MoonTonight {
  // the deal lands at 11:11pm, so judge the moon at 11pm local
  const night = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23).getTime() / 86400000
  const age = (((night - NEW_MOON_2000) % SYNODIC) + SYNODIC) % SYNODIC
  const lit = (1 - Math.cos((2 * Math.PI * age) / SYNODIC)) / 2
  const phase = ORDER[Math.round((age / SYNODIC) * 8) % 8]
  const sign = signAtDay(night)
  return { phase, name: NAME[phase], lit, waxing: age < SYNODIC / 2, age, sign }
}

const DAY = 86400000
const PRINCIPAL: Partial<Record<PhaseId, string>> = { new: 'New moon', 'first-quarter': 'First quarter', full: 'Full', 'last-quarter': 'Last quarter' }
const short = (d: Date) => `${d.toLocaleDateString('en-US', { weekday: 'short' })} ${d.getDate()}`
const cap = (s: string) => s[0].toUpperCase() + s.slice(1)

/** the phase strip: the last principal phase, tonight, then the next three */
export function moonStrip(date = new Date()): { label: string; date: string; lit: number; waxing: boolean; today?: boolean }[] {
  const at = (k: number) => new Date(date.getTime() + k * DAY)
  // a principal phase lands on the night whose 24 hours contain its exact moment
  const TARGET: [PhaseId, number][] = [['new', 0], ['first-quarter', 0.25], ['full', 0.5], ['last-quarter', 0.75]]
  const marks: { k: number; m: MoonTonight }[] = []
  for (let k = -15; k <= 30; k++) {
    if (k === 0) continue
    const m = moonTonight(at(k))
    const f = m.age / SYNODIC
    const half = 0.5 / SYNODIC
    const hit = TARGET.find(([, t]) => { const dx = ((f - t + 1.5) % 1) - 0.5; return dx >= -half && dx < half })
    if (hit) {
      // name the sign at the exact moment of the phase, not at 11pm
      const d = at(k)
      const night = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23).getTime() / DAY
      const exact = night + (((hit[1] - f + 1.5) % 1) - 0.5) * SYNODIC
      marks.push({ k, m: { ...m, phase: hit[0], sign: signAtDay(exact) } })
    }
  }
  const before = marks.filter((x) => x.k < 0).slice(-1)
  const after = marks.filter((x) => x.k > 0).slice(0, 3)
  const row = (x: { k: number; m: MoonTonight }) => ({
    label: x.m.phase === 'full' ? `Full · ${cap(x.m.sign)}` : PRINCIPAL[x.m.phase]!, date: short(at(x.k)),
    lit: x.m.phase === 'full' ? 1 : x.m.phase === 'new' ? 0 : 0.5, waxing: x.m.waxing,
  })
  const now = moonTonight(date)
  return [...before.map(row), { label: 'Tonight', date: short(date), lit: now.lit, waxing: now.waxing, today: true }, ...after.map(row)]
}

/** what each phase means for dating, for the Sky tab */
export const PHASE_GUIDE: Record<PhaseId, { headline: string; body: string; tries: string[]; skip: string; pips: number }> = {
  new: { headline: 'Start something.', body: 'The Moon is dark tonight: the start of a new cycle. Good for first messages, first dates and fresh intentions.', tries: ['Message someone new first.', 'Write down what you actually want this month.'], skip: 'Replaying old chats. Tonight is for new ones.', pips: 4 },
  'waxing-crescent': { headline: 'Small first steps.', body: 'The Moon is a thin, growing sliver. Things you start now build slowly. Keep it light and keep it going.', tries: ['Ask one more question than you normally would.', 'Suggest a low-key first plan.'], skip: 'Rushing to define anything.', pips: 3 },
  'first-quarter': { headline: 'Make a move.', body: 'Half lit and growing. The first quarter rewards action: ask, plan, show up.', tries: ['Ask them out. Name a day.', 'Say the thing you’ve been hinting at.'], skip: 'Waiting for them to go first.', pips: 4 },
  'waxing-gibbous': { headline: 'Look closer.', body: 'Almost full. A good night to pay attention to the details and adjust before things peak.', tries: ['Notice what they keep coming back to in chat.', 'Fine-tune your plans for the weekend.'], skip: 'Big decisions. Full moon is close.', pips: 3 },
  full: { headline: 'Everything’s lit.', body: 'The full Moon makes feelings louder and easier to see. Great for being seen, a little risky for big talks.', tries: ['Go out. Be where people are.', 'Tell someone what you like about them.'], skip: 'Arguments after midnight. Feelings run high.', pips: 5 },
  'waning-gibbous': { headline: 'Say thank you.', body: 'Just past full, the Moon starts to shrink. A night for gratitude and looking back at who stood out.', tries: ['Send a thank-you for a good date.', 'Give someone you passed on a second look.'], skip: 'Starting something brand new.', pips: 3 },
  'last-quarter': { headline: 'Let go of what isn’t working.', body: 'Half dark and fading. Good for clearing out: end what isn’t going anywhere, kindly.', tries: ['Close one chat you won’t continue. One kind sentence is enough.', 'Unmatch without guilt.'], skip: 'Holding on out of habit.', pips: 2 },
  'waning-crescent': { headline: 'Wind things down.', body: 'The Moon is almost dark. Rest, reflect and catch up before the next new moon.', tries: ['Answer anything you left on read.', 'Have an early night.'], skip: 'Starting something big. Wait for the new moon.', pips: 2 },
}
