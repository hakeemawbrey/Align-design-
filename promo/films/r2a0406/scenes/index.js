// r2a0406: star_advice, ADVICE SOLO (sagittarius), "What Sagittarians need | *on a bad day.*" (signs3kit social cut,
// music: lofi · D). Ending: callback (the snack trip is still on).
//   nine cards: a long walk · plans cancelled, snack trip instead · open a window · joke through it · pick one thing
//   · dance it out · a match checks in · the chart says rest · tomorrow, pack hope
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, notes, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO,
} from '../../signs3kit.js'
import { card, txt, phone, chart, CREAM, RED, ORANGE, GREY, DEEP, GREEN, SUN, BROWN, clamp, ease, lerp, prog } from './props.js'

const ACC = '#b18cff'
const ST = { x: -170 }
const S = 'sagittarius'
const lab = (x, cx, cy, s, k, o = {}) => label(x, cx, cy, s, k, { size: 32, font: MONO, weight: 700, ...o })

const BAG = ['.KKKKKKKK.', 'KRRRRRRRRK', 'KRYYYYYYRK', 'KRYRRRRYRK', 'KRYYYYYYRK', 'KRRRRRRRRK', 'KRRRRRRRRK', 'KRRRRRRRRK', '.KKKKKKKK.']
const BAG_C = { K: INK, R: RED, Y: SUN }
/** a crinkly snack bag that says SNACKS */
function snackBag(x, cx, cy, k, rot = 0.08) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-100, -126, 220, 270)
  x.fillStyle = INK; x.fillRect(-118, -146, 236, 292)
  x.fillStyle = RED; x.fillRect(-110, -120, 220, 258)
  x.fillStyle = '#ff6b5a'; for (let i = 0; i < 11; i++) x.fillRect(-110 + i * 20, -138, 12, 22)
  x.fillStyle = SUN; x.fillRect(-90, -50, 180, 80)
  x.fillStyle = INK; x.font = `800 40px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('SNACKS', 0, -8)
  for (const [a, b] of [[-50, 80], [10, 95], [60, 75]]) { x.fillStyle = '#ffcf5a'; x.fillRect(a - 16, b - 12, 32, 24) }
  x.restore()
}
const BIRD = ['.BB...', 'BBBB.Y', '.BBBBB', '..BBB.']
const CASE = ['...KKKK...', '...K..K...', 'KKKKKKKKKK', 'KBBBBBBBBK', 'KBBBBBBBBK', 'KBBBBBBBBK', 'KBBBBBBBBK', 'KBBBBBBBBK', 'KKKKKKKKKK']

/** a sticker that gets struck through and replaced */
function swapLabel(x, cx, cy, lt, at, from, to, { size = 36, fromBg = GREY, toBg = MINT } = {}) {
  if (lt < at) { lab(x, cx, cy, from, 1, { bg: fromBg, size }); return }
  const p = clamp((lt - at) / 0.25)
  if (p < 1) {
    lab(x, cx, cy, from, 1, { bg: fromBg, size })
    x.save(); x.strokeStyle = RED; x.lineWidth = 10; x.lineCap = 'round'; x.beginPath(); x.moveTo(cx - 150, cy + 10); x.lineTo(cx - 150 + 300 * p, cy - 10); x.stroke(); x.restore()
    return
  }
  lab(x, cx, cy, to, pop01(lt, at + 0.3, 0.3, 2.4), { bg: toBg, size, rot: 0.04 })
}

const CAMEOS = [
  { sign: S, cap: 'Feeling stuck? | Take the *long walk.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: ST, hops: [1.3, 1.8],
    front(x, t, lt, P) {
      card(x, 790, 850, 330, 300, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: '#e8fbd8', rot: 0.04 }, () => {
        x.fillStyle = '#9fd6a0'; x.fillRect(-150, 40, 120, 90); x.fillStyle = SKYB; x.fillRect(40, -120, 110, 70)
        const n = Math.floor(clamp((lt - 0.4) / 1.3) * 12)
        for (let i = 0; i < n; i++) { const a = i / 11; x.fillStyle = RED; x.fillRect(-130 + a * 250 - 6, 100 - a * 190 + Math.sin(a * 9) * 30 - 6, 12, 12) }
        if (n >= 12) { x.fillStyle = INK; x.font = `800 44px sans-serif`; x.textAlign = 'center'; x.fillText('✕', 120, -80) }
      })
      lab(x, 790, 1100, 'ROUTE: SCENIC', pop01(t, P.t0 + 1.6, 0.3, 2.4), { bg: MINT, rot: -0.04 })
    } },
  { sign: S, cap: 'Plans fell through? | *New plan: snacks.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      if (pop01(t, P.t0 + 0.2, 0.3, 2) > 0.5) swapLabel(x, 790, 680, lt, 0.8, 'BIG TRIP', 'SNACK TRIP', { toBg: SUN })
      snackBag(x, 790, 950, pop01(t, P.t0 + 1.2, 0.35, 2))
      sparkles(x, t, 790, 930, P.t0 + 1.4, 6, 140, 0.5)
    } },
  { sign: S, cap: 'Walls closing in? | *Open a window.*', mood: lt => lt > 1.1 ? 'happy' : 'neutral', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      card(x, 790, 820, 300, 320, k, { bg: SKYB, rot: 0.02, border: 10 }, () => {
        x.fillStyle = INK; x.fillRect(-4, -160, 8, 320); x.fillRect(-150, -4, 300, 8)
        const o = ease.outCubic(prog(lt, 0.6, 1.0))
        x.fillStyle = '#d8dbe8'; x.fillRect(-150, -160, 150 * (1 - o), 320); x.fillRect(150 - 150 * (1 - o), -160, 150 * (1 - o), 320)
      })
      if (lt > 1.0) drawBits(x, BIRD, { B: PINK, Y: SUN }, 760 + (lt - 1.0) * 90, 760 - Math.abs(Math.sin(t * 6)) * 20, 14)
      bubble(x, 790, 1110, 'ahh. air.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, tail: 'bc' })
    } },
  { sign: S, cap: 'Joking through it? | That’s *allowed.*', mood: lt => lt > 0.8 ? 'wink' : 'happy', look: [1, 0], star: ST, hops: [0.9],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'so anyway, | worst day ever lol', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 34, tail: 'bl' })
      lab(x, 790, 920, 'COPING: HUMOUR', pop01(t, P.t0 + 1.0, 0.3, 2), { bg: LAV, rot: 0.04, size: 36 })
      lab(x, 790, 1040, 'ALSO VALID: FEELINGS', pop01(t, P.t0 + 1.6, 0.3, 2.4), { bg: PINK, rot: -0.04, size: 28 })
    } },
  { sign: S, cap: 'Too much to fix? | *Pick one thing.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const items = ['emails', 'laundry', 'life plan', 'taxes', 'drink water']
      card(x, 790, 860, 320, 380, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.04 }, () => {
        txt(x, 'TO DO', 0, -150, { size: 34, font: MONO, weight: 700, color: RED })
        items.forEach((s, i) => {
          txt(x, s, 0, -85 + i * 58, { size: 32, color: i === 4 ? GREEN : INK })
          const cut = clamp((lt - 0.7 - i * 0.18) / 0.15)
          if (i < 4 && cut > 0) { x.fillStyle = RED; x.fillRect(-110, -88 + i * 58, 220 * cut, 6) }
        })
      })
      lab(x, 790, 1120, 'TODAY: JUST ONE', pop01(t, P.t0 + 1.7, 0.3, 2.4), { bg: MINT, rot: -0.04 })
    } },
  { sign: S, cap: 'Can’t sit still? | *Dance it out.*', mood: 'sparkle', look: [1, 0], star: { x: -120 }, hops: [0.5, 0.9, 1.3, 1.7, 2.1],
    squash: lt => 0.07 * Math.sin(lt * 10),
    front(x, t, lt, P) {
      notes(x, t, 540, 760, { n: 5, cell: 8, col: ACC, seed: 4 })
      lab(x, 790, 640, 'KITCHEN DISCO', pop01(t, P.t0 + 0.4, 0.3, 2), { bg: PINK, rot: 0.05, size: 38 })
      lab(x, 790, 1110, 'GUESTS: YOU', pop01(t, P.t0 + 1.5, 0.3, 2.4), { bg: GOLD, rot: -0.04 })
    } },
  { sign: S, cap: 'Tired of faking fine? | Good friends *check in.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { head: 'NEW MATCH', headCol: ACC, lines: [
        ['rough day?', BONE, pop01(t, P.t0 + 0.6, 0.25, 2.2)],
        ['honestly, yes', MINT, pop01(t, P.t0 + 1.0, 0.25, 2.2)],
        ['walk + fries?', PINK, pop01(t, P.t0 + 1.4, 0.25, 2.2)],
      ] })
      hearts(x, t, 790, 760, P.t0 + 1.6, { n: 4, life: 1.4, spread: 160, cell: 7, seed: 3 })
    } },
  { sign: S, cap: 'Restless tonight? | The chart says *rest.*', mood: lt => lt > 1.3 ? 'sleepy' : 'neutral', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      chart(x, 790, 820, 130, pop01(t, P.t0 + 0.2, 0.35, 2), t, 0.3)
      lab(x, 790, 1060, 'FORECAST: NAP', pop01(t, P.t0 + 1.3, 0.3, 2.4), { bg: SKYB, rot: -0.04, size: 36 })
    } },
  { sign: S, cap: 'Tomorrow’s a new trip. | *Pack some hope.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, CASE, { K: INK, B: '#ff9a4a' }, 790, 900, 34 * k, { outline: null })
      lab(x, 790, 920, 'HOPE', pop01(t, P.t0 + 1.0, 0.3, 2.4), { bg: GOLD, rot: -0.08, size: 44 })
      sparkles(x, t, 790, 900, P.t0 + 1.1, 8, 180, 0.3)
      lab(x, 790, 650, 'DEPARTS: 8 AM', pop01(t, P.t0 + 1.5, 0.3, 2.4), { bg: MINT, rot: 0.04 })
    } },
]

const F = makeFilm({
  id: 'r2a0406', key: 'D', accent: ACC, solo: S, ending: 'callback',
  title: 'What Sagittarians | need on a *bad day.*',
  cameos: CAMEOS,
  group: { cap: 'Bad days end. | *Adventures don’t.*', mood: 'sparkle' },
  last: {
    text: 'Bad day over? | *Snack trip’s on.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.2, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, S, 400, 1080, 280 * k, { mood: lt > 1.2 ? 'sparkle' : 'happy', seed: 7, look: [1, 0], hops: [t0 + 1.3, t0 + 2.0] })
      snackBag(x, 740, 1090, pop01(t, t0 + 0.6, 0.4, 2), 0.08 * Math.sin(t * 3))
      lab(x, 560, 1330, 'SNACK TRIP: ON', pop01(t, t0 + 1.2, 0.3, 2.4), { bg: SUN, rot: -0.03, size: 40 })
      sparkles(x, t, 740, 1100, t0 + 1.0, 7, 150, 0.4)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
