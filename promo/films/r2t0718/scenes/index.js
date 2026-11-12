// r2t0718: THE SIGNS AS… v3, SOLO (taurus), "Tauruses vs. | their comfy bed." (signs3kit social cut, lofi · G).
// One sign the whole way: nine rounds of Taurus vs. the bed, the bed winning every one. Ending: callback (snooze #10).
//   negotiated with the alarm · breakfast, lunch and dinner in bed · wore the duvet to the kitchen · the pillow said
//   "stay." · eleven pillows, needs one more · dating profile: seeking my bed · made the bed, got back in · warm
//   sheets from the dryer, spiritual · weekend status: horizontal
//   group "Bed: undefeated. | Taurus: thrilled."   last "Snooze number ten. | Still winning."
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, notes, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, friend, bits, swapLabel, steam, zzz, RED, CREAM, STEEL, NIGHT, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#8fdc6a', S = 'taurus', ST = { x: -190 }
const CLOCK_C = { K: INK, W: BONE }
/** an alarm clock that shakes while ringing */
function alarm(x, t, cx, cy, k, ringing) {
  if (k <= 0.01) return
  const j = ringing ? Math.sin(t * 40) * 6 : 0
  bits(x, 'CLOCK', cx + j, cy, 20 * k)
  if (ringing) { x.save(); x.strokeStyle = GOLD; x.lineWidth = 6; for (const d of [-1, 1]) { x.beginPath(); x.arc(cx + j, cy, 120 + 10 * Math.sin(t * 20), d < 0 ? 2.6 : -0.5, d < 0 ? 3.6 : 0.5); x.stroke() } x.restore() }
}

const CAMEOS = [
  { sign: S, cap: 'The alarm rang. | Taurus *negotiated.*', mood: lt => lt > 1.2 ? 'sleepy' : 'squint', star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      alarm(x, t, 820, 900, pop01(t, P.t0 + 0.2, 0.3, 2), lt < 1.1)
      bubble(x, 790, 660, 'five more | minutes?', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 38, tail: 'bl' })
      const n = 1 + Math.floor(clamp((lt - 1.1) / 0.9) * 8)
      if (lt > 1.1) L(x, 820, 1110, `SNOOZE #${n}`, 1, LAV, 0.04, 38)
    } },
  { sign: S, cap: 'Breakfast in bed. | *Lunch. Dinner. Dessert.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', star: ST,
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.5) * 3.99)
      for (let i = 0; i < n; i++) bits(x, 'PLATE', 800, 1020 - i * 70, 15)
      L(x, 800, 640, `MEALS IN BED: ${n}`, pop01(t, P.t0 + 0.3, 0.3, 2), GOLD, -0.04, 34)
    } },
  { sign: S, cap: 'Went to the kitchen. | *Wearing the duvet.*', mood: 'happy', star: { x: -150 },
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      bits(x, 'BLANKET', F.x + 20, F.cy + 120, 17 * k, { rot: -0.08, alpha: 0.95 })
      L(x, 790, 660, 'CAPE MODE', pop01(t, P.t0 + 1.0, 0.3, 2.2), LAV, 0.05, 40)
      bubble(x, 790, 1100, 'it’s cold out there', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
  { sign: S, cap: 'Plans tonight? | The pillow *said no.*', mood: lt => lt > 1.3 ? 'sleepy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'PILLOW', 790, 940, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 720, 'stay.', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 52, col: LAV, tail: 'bc' })
      L(x, 790, 1110, 'CANCELLED', pop01(t, P.t0 + 1.5, 0.3, 2.2), RED, -0.04, 38)
    } },
  { sign: S, cap: 'Owns eleven pillows. | *Needs one more.*', mood: lt => lt > 1.5 ? 'wide' : 'happy', look: [1, 0], star: ST, hops: [1.6],
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.2) / 1.3) * 5.99)
      for (let i = 0; i < n; i++) bits(x, 'PILLOW', 810 + (i % 2 ? 14 : -14), 1080 - i * 70, 13, { rot: (i % 2 ? 0.05 : -0.05) })
      L(x, 790, 600, 'PILLOW #12?', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, 0.04, 36)
    } },
  { sign: S, cap: 'Dating profile: | *“seeking: my bed.”*', mood: 'sparkle', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sheet(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 330, h: 360, head: '♉︎ MY PROFILE', headBg: ACC, headInk: INK, lines: ['likes: naps', 'seeking: bed', 'no: 6am'], size: 32, align: 'left', progress: clamp((lt - 0.4) / 1.2) })
      L(x, 790, 1110, 'MATCH: BED', pop01(t, P.t0 + 1.8, 0.3, 2.2), PINK, 0.04, 36)
    } },
  { sign: S, cap: 'Made the bed. | *Got right back in.*', mood: lt => lt > 1.2 ? 'sleepy' : 'sparkle', star: ST,
    front(x, t, lt, P) {
      swapLabel(x, 790, 680, lt, 1.0, 'BED: MADE', 'BED: OCCUPIED', { size: 38, fromBg: MINT, toBg: LAV })
      bits(x, 'BLANKET', 790, 920, 17 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (lt > 1.2) zzz(x, t, 820, 860)
    } },
  { sign: S, cap: 'Warm sheets from the dryer. | *A spiritual moment.*', mood: 'heart', star: ST, hops: [1.2],
    front(x, t, lt, P) {
      bits(x, 'PAPERS', 790, 920, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      steam(x, t, 790, 840, { n: 4, h: 160 })
      L(x, 790, 650, 'FRESH + WARM', pop01(t, P.t0 + 0.9, 0.3, 2.2), GOLD, -0.04, 36)
      sparkles(x, t, 790, 900, P.t0 + 1.2, 8, 200, 0.2)
    } },
  { sign: S, cap: 'Weekend status: | *horizontal.*', mood: 'sleepy', star: { x: -190, y: 30 }, squash: 0.08,
    front(x, t, lt, P) {
      L(x, 790, 700, 'SAT: HORIZONTAL', pop01(t, P.t0 + 0.3, 0.3, 2), LAV, -0.04, 34)
      L(x, 790, 860, 'SUN: ALSO', pop01(t, P.t0 + 1.0, 0.3, 2.2), MINT, 0.04, 36)
      zzz(x, t, 400, 820, { size: 48 })
      bubble(x, 790, 1060, 'perfect.', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0718', key: 'G', accent: ACC, solo: S, ending: 'callback',
  title: 'Tauruses vs. | *their comfy bed.*',
  cameos: CAMEOS,
  group: { cap: 'Bed: undefeated. | *Taurus: thrilled.*', mood: 'sleepy' },
  last: {
    text: 'Snooze number ten. | *Still winning.*',
    draw(x, t, lt) {
      const t0 = t - lt, k = pop01(t, t0 + 0.4, 0.35, 2)
      bits(x, 'PILLOW', 400, 1320, 30 * k)
      friend(x, t, 'taurus', 400, 1190, 300, k, { mood: 'sleepy', seed: 46 })
      alarm(x, t, 760, 1200, 1.4 * pop01(t, t0 + 0.7, 0.3, 2), lt > 0.8 && lt < 1.5)
      L(x, 760, 1440, 'SNOOZE #10', pop01(t, t0 + 1.5, 0.3, 2.2), LAV, 0.04, 48)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
