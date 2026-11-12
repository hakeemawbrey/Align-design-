// r2t0501: star_talk, SOLO (capricorn), "Being a Capricorn | be like." (signs3kit social cut, music: lofi · C).
// Nine cards, each the most extreme Capricorn: a fifty-year plan · the laptop came to the beach · an agenda for a
// birthday party · "how are you?" answered with a quarterly report · a 4:30 alarm on weekends · asked a new match for
// references · one coffee, budget updated · the group-trip itinerary, laminated · baked cookies once, now a business.
// Ending: callback (finally slept in… until 4:45; the weekend alarm comes back).
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO, INTER } from '../../signs3kit.js'
import { L, sheet, phone, steam, confetti, zzz, bits, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#9aa5c4', ST = { x: -180 }, SG = 'capricorn'

// a little bar chart on a report sheet; bars grow with p
function report(x, cx, cy, k, p) {
  if (k <= 0.01) return
  sheet(x, cx, cy, k, { w: 320, h: 330, head: 'Q3 REPORT', headBg: STEEL, headInk: INK, lines: [] })
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  const H = [50, 90, 130, 190]
  H.forEach((h, i) => { const hh = h * clamp(p * 1.4 - i * 0.12); x.fillStyle = INK; x.fillRect(-118 + i * 64, 130 - hh - 4, 48, hh + 4); x.fillStyle = [MINT, SKYB, GOLD, PINK][i]; x.fillRect(-114 + i * 64, 130 - hh, 40, hh) })
  x.fillStyle = INK; x.fillRect(-130, 130, 260, 6)
  x.restore()
}

const CAMEOS = [
  { sign: SG, cap: 'Five-year plan? | Try *fifty.*', mood: 'squint', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      sheet(x, 790, 830, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 400, h: 290, head: 'THE PLAN', headBg: STEEL, headInk: INK, lines: ['2026: promotion', '2041: own the firm', '2076: retire. maybe.'], size: 31, align: 'left', progress: clamp((lt - 0.3) / 1.0) })
      L(x, 790, 1080, 'ON SCHEDULE', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: SG, cap: 'Beach vacation. | The *laptop* came too.', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 1], star: ST, hops: [1.4],
    back(x, t, lt, P) { bits(x, 'UMB', 800, 760, 22 * pop01(t, P.t0 + 0.15, 0.3, 2)) },
    front(x, t, lt, P) {
      bits(x, 'LAPTOP', 800, 990, 16 * pop01(t, P.t0 + 0.4, 0.3, 2))
      L(x, 800, 1140, 'INBOX: 0', pop01(t, P.t0 + 1.3, 0.3, 2.4), SKYB, 0.04, 34)
      bubble(x, 420, 620, 'quick call?', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 34, tail: 'bc' })
    } },
  { sign: SG, cap: 'Birthday party? | Brought an *agenda.*', mood: 'happy', look: [1, 0], star: ST, hops: [0.8],
    front(x, t, lt, P) {
      sheet(x, 790, 840, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 340, h: 330, head: 'AGENDA', headBg: PINK, headInk: INK, lines: ['7:00  cake', '7:04  candles', '7:05  wrap up'], size: 36, align: 'left', progress: clamp((lt - 0.3) / 1.0) })
      bits(x, 'CANDLE', 940, 640, 9 * pop01(t, P.t0 + 0.5, 0.3, 2))
      L(x, 790, 1090, 'RUNNING ON TIME', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, 0.04, 30)
    } },
  { sign: SG, cap: '“How are you?” | Sent a *quarterly report.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 610, 'how are you?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 32, col: LAV, tail: 'bl' })
      report(x, 790, 880, pop01(t, P.t0 + 0.5, 0.35, 2), clamp((lt - 0.6) / 1.0))
      L(x, 790, 1110, 'Q3: THRIVING', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: SG, cap: 'Alarm set for 4:30. | *On weekends.*', mood: lt => lt > 1.0 ? 'sparkle' : 'sleepy', look: [1, 0], star: ST, hops: [1.05, 1.3],
    front(x, t, lt, P) {
      const ring = lt > 0.9 ? Math.sin(t * 40) * 0.12 : 0
      bits(x, 'CLOCK', 800, 860, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: ring })
      L(x, 800, 640, 'SAT · 4:30 AM', pop01(t, P.t0 + 0.4, 0.3, 2.2), STEEL, 0.04, 34)
      if (lt < 0.95) zzz(x, t, 420, 700)
      bubble(x, 800, 1110, 'up and at it!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: SG, cap: 'Got a new match. | Asked for *references.*', mood: 'squint', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'NEW MATCH ♑︎', headCol: PINK, lines: [['hey :)', PINK, pop01(t, P.t0 + 0.5, 0.25, 2.2)], ['references?', BONE, pop01(t, P.t0 + 1.1, 0.25, 2.2), true], ['two, please.', BONE, pop01(t, P.t0 + 1.6, 0.25, 2.2), true]] })
    } },
  { sign: SG, cap: 'Bought one coffee. | Updated *the budget.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      bits(x, 'MUG', 640, 1020, 14 * pop01(t, P.t0 + 0.2, 0.3, 2)); steam(x, t, 625, 960, { n: 2 })
      sheet(x, 830, 790, pop01(t, P.t0 + 0.5, 0.35, 2), { w: 330, h: 250, head: 'BUDGET', headBg: MINT, headInk: INK, lines: ['coffee   -4.50', 'joy      +1'], size: 30, font: MONO, weight: 700, align: 'left', progress: clamp((lt - 0.7) / 0.8) })
      L(x, 830, 1060, 'LOGGED.', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, 0.04, 34)
    } },
  { sign: SG, cap: 'Group trip? | Itinerary. *Laminated.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      sheet(x, 790, 840, k, { w: 340, h: 330, head: 'DAY 1', headBg: SKYB, headInk: INK, lines: ['6:00  wake up', '6:10  sunrise', '6:12  debrief'], size: 34, align: 'left' })
      // a laminate shine sweeping across
      if (k > 0.9 && lt > 1.0) { const p = clamp((lt - 1.0) / 0.6); x.save(); x.globalAlpha = 0.5 * Math.sin(Math.PI * p); x.fillStyle = '#ffffff'; x.translate(790, 840); x.rotate(-0.04); x.fillRect(-170 + p * 300, -165, 40, 330); x.restore() }
      L(x, 790, 1090, 'LAMINATED', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 36)
      sparkles(x, t, 790, 840, P.t0 + 1.4, 7, 190, 0.4)
    } },
  { sign: SG, cap: 'Baked cookies once. | Now it’s *a business.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [0.9, 1.5],
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.0) * 5)
      for (let i = 0; i < n; i++) bits(x, 'COOKIE', 690 + (i % 3) * 110, 960 - Math.floor(i / 3) * 100, 11 * pop01(t, P.t0 + 0.3 + i * 0.2, 0.25, 2))
      L(x, 800, 700, 'COOKIES INC.', pop01(t, P.t0 + 1.3, 0.3, 2.4), PINK, 0.04, 38)
      bubble(x, 800, 1130, 'now hiring.', pop01(t, P.t0 + 1.8, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0501', key: 'C', accent: ACC, solo: SG, ending: 'callback',
  title: 'Being a Capricorn | *be like.*',
  cameos: CAMEOS,
  card: { a: 'capricorn', b: 'virgo', chip: 'ALIGNED' },
  group: { cap: 'CEO of | *everything.*', mood: 'sparkle' },
  last: {
    text: 'Finally slept in. | Until *4:45.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.2, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, SG, 400, 1080, 280 * k, { mood: lt > 1.3 ? 'sparkle' : 'sleepy', seed: 7, look: [1, 0], hops: [t0 + 1.35, t0 + 1.6] })
      if (lt < 1.3 && k > 0.5) zzz(x, t, 480, 900)
      const ring = lt > 1.2 ? Math.sin(t * 40) * 0.12 : 0
      bits(x, 'CLOCK', 760, 1040, 24 * pop01(t, t0 + 0.5, 0.3, 2), { rot: ring })
      L(x, 760, 1220, 'LUXURY.', pop01(t, t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 36)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
