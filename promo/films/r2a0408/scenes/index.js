// r2a0408: star_advice, ADVICE SOLO (capricorn), "How to make friends | *with a Capricorn.*" (signs3kit social cut,
// music: lofi · C). Ending: callback (the next hang is already booked, far ahead).
//   nine cards: book it two weeks ahead · sit with them while they work · laugh at the dry jokes · show up, trust fills
//   · feelings take time · celebrate small wins · remind them to rest · ask for advice · stick around
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, HEART,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO,
} from '../../signs3kit.js'
import { card, txt, laptop, bar, chart, confetti, CREAM, RED, ORANGE, GREY, DEEP, GREEN, SUN, BROWN, clamp, ease, lerp, prog } from './props.js'

const ACC = '#8fd9b6'
const ST = { x: -170 }
const S = 'capricorn'
const lab = (x, cx, cy, s, k, o = {}) => label(x, cx, cy, s, k, { size: 32, font: MONO, weight: 700, ...o })

/** a wall calendar with one day circled (day index 0–27) */
function calendar(x, cx, cy, k, month, day, lt, { at = 0.6 } = {}) {
  card(x, cx, cy, 330, 330, k, { bg: CREAM, rot: 0.04 }, () => {
    x.fillStyle = RED; x.fillRect(-165, -165, 330, 60); txt(x, month, 0, -135, { size: 32, color: BONE })
    for (let d = 0; d < 28; d++) {
      const c = d % 7, r = Math.floor(d / 7), px = -132 + c * 44, py = -70 + r * 56
      txt(x, String(d + 1), px, py, { size: 22, font: MONO, weight: 700, color: GREY })
      if (d === day && lt > at) {
        x.strokeStyle = RED; x.lineWidth = 6; x.beginPath(); x.arc(px, py, 22 * clamp((lt - at) / 0.25), 0, Math.PI * 2); x.stroke()
      }
    }
  })
}
const PILLOW = ['.WWWWWWWWWW.', 'WWWWWWWWWWWW', 'WWWWWWWWWWWW', 'WWWWWWWWWWWW', 'WWWWWWWWWWWW', '.WWWWWWWWWW.']

const CAMEOS = [
  { sign: S, cap: 'Book the hang | *two weeks ahead.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      calendar(x, 790, 850, pop01(t, P.t0 + 0.2, 0.35, 2), 'IN 2 WEEKS', 17, lt)
      lab(x, 790, 1110, 'PENCILLED IN!', pop01(t, P.t0 + 1.4, 0.3, 2.4), { bg: PINK, rot: -0.04 })
    } },
  { sign: S, cap: 'They’re busy? | *Sit with them anyway.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 1], star: ST,
    front(x, t, lt, P) {
      laptop(x, 640, 1080, pop01(t, P.t0 + 0.2, 0.35, 2) * 0.8, () => { x.fillStyle = MINT; for (let i = 0; i < 4; i++) x.fillRect(-100, -50 + i * 28, 70 + ((i * 47) % 120), 12) })
      const k = pop01(t, P.t0 + 0.5, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'gemini', 860, 920, 170 * k, { mood: 'happy', look: [-1, 0], seed: 13, glyph: false })
      lab(x, 790, 650, 'CO-WORKING = HANGING', pop01(t, P.t0 + 1.3, 0.3, 2.4), { bg: GOLD, rot: 0.04, size: 28 })
    } },
  { sign: S, cap: 'Dry joke? | *Laugh. It’s hilarious.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'i’d tell a tax joke | but it’s taxing', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 32, tail: 'bl' })
      const k = pop01(t, P.t0 + 0.8, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'sagittarius', 820, 990, 160 * k, { mood: 'happy', look: [-1, 0], seed: 14, glyph: false, hops: [P.t0 + 1.2, P.t0 + 1.6] })
      lab(x, 790, 1150, 'HAHA (SINCERELY)', pop01(t, P.t0 + 1.4, 0.3, 2.4), { bg: SUN, rot: -0.04 })
    } },
  { sign: S, cap: 'Show up when you said. | *Trust: earned.*', mood: lt => lt > 1.6 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.7],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const p = clamp((lt - 0.4) / 1.2)
      bar(x, 790, 880, pop01(t, P.t0 + 0.2, 0.35, 2), p, `TRUST ${Math.round(p * 100)}%`, { col: ACC, w: 300 })
      sparkles(x, t, 790, 880, P.t0 + 1.6 * 1.29, 8, 180, 0.4)
      lab(x, 790, 1080, 'ON TIME: 6/6', pop01(t, P.t0 + 1.0, 0.3, 2.4), { bg: MINT, rot: -0.04 })
    } },
  { sign: S, cap: 'Feelings take time. | *Wait. They come.*', mood: lt => lt > 1.6 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const g = clamp((lt - 0.3) / 1.5)
      drawBits(x, HEART, { H: '#ff4f86', W: '#fff' }, 790, 850, (8 + 14 * g) * pop01(t, P.t0 + 0.2, 0.35, 2))
      lab(x, 790, 660, g < 1 ? 'LOADING…' : 'LOADED!', pop01(t, P.t0 + 0.4, 0.3, 2), { bg: g < 1 ? GREY : PINK, rot: 0.04, size: 36 })
      lab(x, 790, 1090, 'WORTH THE WAIT', pop01(t, P.t0 + 1.7, 0.3, 2.4), { bg: GOLD, rot: -0.04 })
    } },
  { sign: S, cap: 'Small win? | *Celebrate it loudly.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.8, 1.4],
    front(x, t, lt, P) {
      card(x, 790, 820, 320, 170, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: -0.04 }, () => {
        txt(x, 'FILED TAXES', 0, -30, { size: 36 }); txt(x, 'EARLY', 0, 26, { size: 40, color: GREEN })
      })
      confetti(x, t, 790, 900, P.t0 + 0.8, { n: 22, spread: 220, h: 520 })
      bubble(x, 790, 1080, 'WOOOO!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 46, tail: 'bc' })
    } },
  { sign: S, cap: 'Working too much? | Remind them *to rest.*', mood: lt => lt > 1.2 ? 'sleepy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, PILLOW, { W: LAV }, 790, 950, 22 * pop01(t, P.t0 + 0.3, 0.35, 2))
      lab(x, 790, 700, 'OUT OF OFFICE', pop01(t, P.t0 + 0.9, 0.3, 2.4), { bg: SKYB, rot: 0.04, size: 38 })
      lab(x, 790, 1120, 'BACK: WHEN RESTED', pop01(t, P.t0 + 1.6, 0.3, 2.4), { bg: MINT, rot: -0.04, size: 30 })
    } },
  { sign: S, cap: 'Ask their advice. | *They love a plan.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 860, 330, 380, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: '#e8fbd8', rot: 0.04 }, () => {
        x.fillStyle = GREEN; x.fillRect(-165, -190, 330, 56); txt(x, 'YOUR 5-YEAR PLAN', 0, -162, { size: 24, font: MONO, weight: 700, color: BONE })
        const n = Math.min(5, Math.floor(Math.max(0, lt - 0.4) / 0.25))
        for (let i = 0; i < n; i++) txt(x, `step ${i + 1} ✓`, 0, -90 + i * 56, { size: 32 })
      })
      lab(x, 790, 1110, 'MADE IN 4 MIN', pop01(t, P.t0 + 1.7, 0.3, 2.4), { bg: GOLD, rot: -0.04 })
    } },
  { sign: S, cap: 'Stick around. | *They’re in it for life.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      chart(x, 790, 820, 120, pop01(t, P.t0 + 0.2, 0.35, 2), t, 0.2)
      lab(x, 790, 1040, 'FRIENDSHIP: LIFETIME', pop01(t, P.t0 + 1.0, 0.3, 2.4), { bg: GOLD, rot: -0.04, size: 30 })
      hearts(x, t, 790, 820, P.t0 + 1.4, { n: 5, life: 1.6, spread: 220, cell: 7, seed: 6 })
    } },
]

const F = makeFilm({
  id: 'r2a0408', key: 'C', accent: ACC, solo: S, ending: 'callback',
  title: 'How to befriend | *a Capricorn.*',
  cameos: CAMEOS,
  group: { cap: 'Slow to warm. | *Loyal forever.*', mood: 'heart' },
  last: {
    text: 'Next hang? | *Booked till 2031.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.2, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, S, 360, 1100, 260 * k, { mood: lt > 1.3 ? 'sparkle' : 'happy', seed: 7, look: [1, 0], hops: [t0 + 1.3] })
      calendar(x, 740, 1080, pop01(t, t0 + 0.5, 0.4, 2) * 0.85, '2031', 3, lt, { at: 1.0 })
      lab(x, 560, 1330, 'SEE YOU THEN!', pop01(t, t0 + 1.5, 0.3, 2.4), { bg: PINK, rot: -0.03, size: 40 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
