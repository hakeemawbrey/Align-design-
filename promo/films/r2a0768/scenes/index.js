// r2a0768: star_advice, ADVICE SOLO (virgo), "Virgo, here's your | *Monday pep talk.*" (signs3kit social cut, lofi · C).
// One sign the whole way: nine Monday truths for a Virgo, each with a warm reframe and one light gag.
// Ending: callback (the "best regrads" typo from card 2 comes back as the sign-off, on purpose).
//   planning before breakfast · typo in the email, nobody noticed · redid the group project, let them help
//   · colour-coded week, leave one square blank · "ok." means ok · battery 12%, charging · noticed every flaw,
//   notice a win · helping everyone first, you're on the list · mistake → data
//   group "Not perfect. | *Perfectly enough.*"   last "Signing off with | *“best regrads.”*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, friend, bits, swapLabel, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#5fd068', S = 'virgo', ST = { x: -180 }
const TOAST = ['.CCCCCCCC.', 'CCBBBBBBCC', 'CBBBBBBBBC', 'CBBBYYBBBC', 'CBBBYYBBBC', 'CBBBBBBBBC', 'CBBBBBBBBC', 'CCCCCCCCCC']

/** a colour-coded week grid with one blank square (that pops a FREE sticker) */
function week(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  const COLS = ['#ff6b5a', '#ffd23a', '#5fd068', '#6fc3ff', '#c97bff']
  x.save(); x.translate(cx, cy); x.rotate(0.03); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -110, 316, 236)
  x.fillStyle = INK; x.fillRect(-164, -124, 328, 248); x.fillStyle = CREAM; x.fillRect(-156, -116, 312, 232)
  x.fillStyle = INK; x.font = '700 20px "Space Mono", monospace'; x.textAlign = 'center'; x.textBaseline = 'middle'
  'MTWTF'.split('').forEach((d, i) => x.fillText(d, -120 + i * 60, -92))
  const n = Math.floor(clamp((lt - 0.3) / 1.0) * 15)
  for (let i = 0; i < 15; i++) {
    const c = i % 5, r = Math.floor(i / 5), px = -120 + c * 60, py = -42 + r * 56
    if (i === 7) { x.strokeStyle = '#b9b0a0'; x.lineWidth = 3; x.setLineDash([6, 5]); x.strokeRect(px - 24, py - 22, 48, 44); x.setLineDash([]); continue }
    if (i < n) { x.fillStyle = COLS[(i * 3 + r) % 5]; x.fillRect(px - 24, py - 22, 48, 44) }
  }
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Planning before breakfast? | *Toast first.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, TOAST, { C: '#c98f5a', B: '#f0c987', Y: '#ffe76a' }, 800, 880, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.06 })
      L(x, 800, 660, 'PLAN: 6:58 AM', pop01(t, P.t0 + 0.3, 0.3, 2.2), STEEL, -0.04, 34)
      L(x, 790, 1090, 'PLANS: AFTER TOAST', pop01(t, P.t0 + 1.4, 0.3, 2.2), ACC, 0.04, 30)
    } },
  { sign: S, cap: 'Typo in the email? | *Nobody noticed.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sheet(x, 800, 840, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 300, head: 'SENT', headBg: SKYB, headInk: INK, lines: ['hi team,', 'see attached.', '', ['best regrads,', RED]], size: 30, align: 'left' })
      L(x, 800, 1090, 'REPLIES: “thanks!”', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, 0.04, 30)
    } },
  { sign: S, cap: 'Redid the group project? | *Let them help.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      friend(x, t, 'gemini', 760, 970, 150, pop01(t, P.t0 + 0.4, 0.3, 2), { mood: 'happy', look: [-1, 0], hops: [P.t0 + 1.4] })
      friend(x, t, 'aries', 900, 990, 150, pop01(t, P.t0 + 0.6, 0.3, 2), { mood: 'sparkle', look: [-1, 0], hops: [P.t0 + 1.6] })
      bubble(x, 820, 700, 'we got | slide 3!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, tail: 'bl' })
      L(x, 800, 1140, 'HELP: ACCEPTED', pop01(t, P.t0 + 1.7, 0.3, 2.2), ACC, 0.04, 30)
    } },
  { sign: S, cap: 'Colour-coded the week? | *Leave one square blank.*', mood: lt => lt > 1.5 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      week(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      L(x, 800, 860 + 14, 'FREE', pop01(t, P.t0 + 1.6, 0.3, 2.6), PINK, -0.08, 26)
      L(x, 800, 1090, 'ON PURPOSE', pop01(t, P.t0 + 1.9, 0.3, 2.2), GOLD, 0.04, 32)
    } },
  { sign: S, cap: 'Replaying their “ok.”? | *It meant ok.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'CHAT', headCol: ACC, lines: [['lunch at 1?', ACC, 1, true], ['ok.', LAV, pop01(t, P.t0 + 0.5, 0.25, 2.2)]], size: 28 })
      swapLabel(x, 800, 1090, lt, 1.2, 'ANALYSING…', 'MEANING: OK', { size: 30, fromBg: STEEL, toBg: MINT })
    } },
  { sign: S, cap: 'Running on 12%? | *Rest is smart.*', mood: lt => lt > 1.3 ? 'sleepy' : 'neutral', star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), ch = lt > 1.1
      bits(x, 'BATT', 800, 870, 22 * k)
      if (k > 0.5) { x.save(); x.fillStyle = ch ? MINT : RED; const w = ch ? 22 * 10 * clamp(0.12 + (lt - 1.1) * 0.6) : 22 * 10 * 0.12; x.fillRect(800 - 22 * 6.5 + 22, 870 - 22 * 1.5, w, 22 * 3); x.restore() }
      L(x, 800, 690, ch ? 'CHARGING…' : 'BATTERY: 12%', 1 * clamp(k), ch ? MINT : RED, -0.04, 34)
      L(x, 800, 1070, 'NAP: PRODUCTIVE', pop01(t, P.t0 + 1.8, 0.3, 2.2), LAV, 0.04, 30)
    } },
  { sign: S, cap: 'Spotted every flaw? | *Spot one win too.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      bits(x, 'TROPHY', 800, 860, 20 * pop01(t, P.t0 + 0.9, 0.3, 2.2))
      L(x, 800, 660, 'FLAWS FOUND: 17', pop01(t, P.t0 + 0.2, 0.3, 2.2), STEEL, -0.04, 32)
      L(x, 800, 1080, 'WIN: YOU SHOWED UP', pop01(t, P.t0 + 1.3, 0.3, 2.2), GOLD, 0.04, 30)
      sparkles(x, t, 800, 860, P.t0 + 1.2, 7, 160, 0.4)
    } },
  { sign: S, cap: 'Helping everyone first? | *You’re on the list.*', mood: lt => lt > 1.5 ? 'heart' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sheet(x, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 330, head: 'TO HELP', headBg: ACC, headInk: INK, lines: ['mom ✓', 'sam ✓', 'the neighbour ✓', ['ME ♡', '#e23d4e']], size: 30, progress: clamp((lt - 0.3) / 1.3) })
      hearts(x, t, 560, 980, P.t0 + 1.6, { n: 5, life: 1.6, spread: 140, cell: 7, seed: 5 })
    } },
  { sign: S, cap: 'Made a mistake? | *That’s just data.*', mood: lt => lt > 1.3 ? 'sparkle' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      swapLabel(x, 800, 800, lt, 1.0, 'MISTAKE', 'DATA', { size: 48, fromBg: RED, toBg: MINT })
      L(x, 800, 1040, 'VERY VIRGO OF YOU', pop01(t, P.t0 + 1.9, 0.3, 2.2), GOLD, 0.04, 30)
      sparkles(x, t, 800, 800, P.t0 + 1.5, 7, 170, 0.6)
    } },
]

const F = makeFilm({
  id: 'r2a0768', key: 'C', accent: ACC, solo: S, ending: 'callback',
  title: 'Virgo, here’s your | *Monday pep talk.*',
  cameos: CAMEOS,
  group: { cap: 'Not perfect. | *Perfectly enough.*', mood: 'heart' },
  last: {
    text: 'Signing off with | *“best regrads.”*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.6, 0.4, 2)
      sheet(x, 540, 1000, k, { w: 400, h: 280, head: 'SENT', headBg: SKYB, headInk: INK, lines: [['best regrads,', '#e23d4e'], 'virgo ♡'], size: 44, rot: -0.03 })
      L(x, 540, 1240, 'ON PURPOSE THIS TIME', pop01(t, t - lt + 1.4, 0.3, 2.2), MINT, 0.03, 34)
      hearts(x, t, 540, 860, t - lt + 1.2, { n: 6, life: 2.0, spread: 320, cell: 8, seed: 6 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
