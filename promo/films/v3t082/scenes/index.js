// v3t082: THE SIGNS AS… v3, "The signs | cook for a date." (~63 s vertical, signs3kit social cut, music: lofi · D)
//   0.0–3.6    "The signs | *cook for a date.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one date-night dinner per sign (3.8 s each), each pushed to the extreme:
//              ♈ didn't preheat, served it frozen · ♉ cooked for two, ate for three · ♊ six recipes, none finished
//              · ♋ grandma's recipe, serves eighty · ♌ named the dish after themself · ♍ salted it grain by grain
//              · ♎ three hours to plate one pea · ♏ read your chart, cooked your favourite · ♐ every spice on the shelf
//              · ♑ a dinner spreadsheet · ♒ invented blue spaghetti · ♓ burnt the toast, wept for an hour
//  49.2        "Dinner is | *served. Mostly.*"
//  52.4        LESSON UNLOCKED: "Cook for someone. | It *says it all.*"  DINNER: SERVED
//  58.3        "Cancer cooks. | *Taurus eats.*" over the match card: Cancer + Taurus (eighty servings, three plates).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ORANGE = '#ffb34a', RED = '#e23d4e', BROWN = '#8a4a2e', GREEN = '#5fd068', CREAM = '#fff4e2'

const POT = [
  '....KKKK....',
  'KKKKKKKKKKKK',
  '.PPPPPPPPPP.',
  'HPPPPPPPPPPH',
  'HPPPPPPPPPPH',
  '.PPPPPPPPPP.',
  '.PPPPPPPPPP.',
  '..PPPPPPPP..',
]
const POT_C = { K: '#6b62a8', P: '#9aa5c4', H: INK }
const ICE = [
  'BBBBBBBB',
  'BWWBBBBB',
  'BWBBBBBB',
  'BBBBBBBB',
  'BBBBBBWB',
  'BBBBBBBB',
]
const ICE_C = { B: SKYB, W: '#ffffff' }
const TOAST = [
  '.KKKKKK.',
  'KKKKKKKK',
  'KkkkkkkK',
  'KkkkkkkK',
  'KkkkkkkK',
  'KkkkkkkK',
  'KKKKKKKK',
]
const TOAST_C = { K: '#3a2418', k: '#5a3a26' }
const JAR = ['.KK.', 'JJJJ', 'JWWJ', 'JJJJ', 'JJJJ']
const PEA = ['.GG.', 'GGgG', 'GGGG', '.GG.']
const PEA_C = { G: GREEN, g: '#b8ffb0' }
const TWEEZ = ['K.....', 'KK....', '.KK...', '..KK..', '...KK.', '....KK', '...KK.', '..KK..']

// a round plate seen from above, with whatever's on it drawn by fn
function plate(x, cx, cy, k, fn, r = 150) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k * 0.62)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.beginPath(); x.arc(10, 18, r, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  x.fillStyle = CREAM; x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#e4dccb'; x.beginPath(); x.arc(0, 0, r * 0.72, 0, Math.PI * 2); x.fill()
  x.restore()
  if (fn) { x.save(); x.translate(cx, cy); x.scale(k, k); fn(); x.restore() }
}
// a clipboard / sheet with a grid and a title
function sheet(x, cx, cy, k, lt, title) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-124, -160, 264, 340)
  x.fillStyle = INK; x.fillRect(-136, -176, 272, 352)
  x.fillStyle = BROWN; x.fillRect(-128, -168, 256, 336)
  x.fillStyle = CREAM; x.fillRect(-112, -140, 224, 296)
  x.fillStyle = '#9aa5c4'; x.fillRect(-40, -184, 80, 32)
  x.fillStyle = INK; x.font = `800 24px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(title, 0, -112)
  const n = Math.floor(clamp((lt - 0.4) / 1.2) * 15)
  for (let i = 0; i < 15; i++) {
    const c = i % 3, r = Math.floor(i / 3), px = -100 + c * 70, py = -84 + r * 46
    x.fillStyle = '#d8d0bf'; x.fillRect(px, py, 62, 38)
    if (i < n) { x.fillStyle = [MINT, GOLD, SKYB][c]; x.fillRect(px + 4, py + 4, 54, 30) }
  }
  x.restore()
}
// a birth chart wheel
function chart(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.4)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 128, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#2a2350'; x.beginPath(); x.arc(0, 0, 120, 0, Math.PI * 2); x.fill()
  x.strokeStyle = LAV; x.lineWidth = 4
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.beginPath(); x.moveTo(Math.cos(a) * 60, Math.sin(a) * 60); x.lineTo(Math.cos(a) * 120, Math.sin(a) * 120); x.stroke() }
  x.beginPath(); x.arc(0, 0, 60, 0, Math.PI * 2); x.stroke()
  x.fillStyle = GOLD; for (let i = 0; i < 5; i++) { const a = i * 2.1; x.fillRect(Math.cos(a) * 90 - 7, Math.sin(a) * 90 - 7, 14, 14) }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Didn’t preheat. | Served it *frozen.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', star: { x: -170 }, hops: [0.3, 0.6, 0.9],
    front(x, t, lt, P) {
      plate(x, 800, 960, pop01(t, P.t0 + 0.2, 0.3, 2), () => { drawBits(x, ICE, ICE_C, 0, -20, 22, { rot: 0.1 }) })
      label(x, 800, 700, 'READY IN 0 MIN', pop01(t, P.t0 + 0.7, 0.3, 2.2), { size: 32, bg: RED, color: CREAM, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 800, 1160, 'crunchy!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Cooked for two. | *Ate for three.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', star: { x: -170 },
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) plate(x, 800, 1070 - i * 26, pop01(t, P.t0 + 0.3 + i * 0.35, 0.3, 2), null, 120)
      bubble(x, 800, 700, 'just tasting', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 38, tail: 'bl' })
      label(x, 800, 860, 'PLATE 3 OF 2', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Started six recipes. | Finished *none.*', mood: lt => Math.floor(lt * 2.8) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.8) % 2 ? 1 : -1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      for (let i = 0; i < 6; i++) drawBits(x, POT, POT_C, 690 + (i % 2) * 200, 680 + Math.floor(i / 2) * 150, 11 * pop01(t, P.t0 + 0.2 + i * 0.12, 0.3, 2))
      label(x, 790, 1130, 'DONE: 0 / 6', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Grandma’s recipe. | Fed *the whole street.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: { x: -180 }, hops: [1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, POT, POT_C, 790, 900, 28 * k, { sy: 1 + 0.03 * Math.sin(t * 6) })
      for (let i = 0; i < 4; i++) { const ph = ((t * 0.8 + i / 4) % 1); x.save(); x.globalAlpha = 0.5 * Math.sin(Math.PI * ph) * k; x.fillStyle = CREAM; x.fillRect(720 + i * 46, 740 - ph * 160, 20, 30); x.restore() }
      label(x, 790, 1110, 'SERVES: 80', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 38, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Named the dish | *after themself.*', mood: 'sparkle', star: { x: -180 }, hops: [1.3],
    front(x, t, lt, P) {
      plate(x, 800, 960, pop01(t, P.t0 + 0.2, 0.3, 2), () => { x.fillStyle = ORANGE; x.fillRect(-60, -40, 120, 60); x.fillStyle = INK; x.fillRect(-4, -130, 6, 100); x.fillStyle = '#f39a3a'; x.fillRect(2, -130, 60, 38) })
      label(x, 800, 690, 'LE LEO', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 52, bg: GOLD, rot: -0.05 })
      sparkles(x, t, 800, 900, P.t0 + 1.0, 7, 170, 0.4)
      label(x, 800, 1140, 'CHEF’S KISS (OWN)', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 28, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Salted it | *grain by grain.*', mood: 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      plate(x, 800, 1000, pop01(t, P.t0 + 0.2, 0.3, 2), () => { x.fillStyle = '#ffd9a8'; x.fillRect(-70, -30, 140, 40) })
      const k = pop01(t, P.t0 + 0.4, 0.3, 2)
      drawBits(x, TWEEZ, { K: '#d8dbe8' }, 820, 800 + 8 * Math.sin(t * 4), 16 * k)
      if (k > 0.5) { x.fillStyle = '#ffffff'; x.fillRect(856, 870 + 8 * Math.sin(t * 4), 8, 8) }
      const n = 1 + Math.floor(clamp((lt - 0.4) / 1.8) * 411)
      label(x, 800, 680, `GRAIN ${n}`, pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 36, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Three hours | to *plate one pea.*', mood: lt => lt > 1.4 ? 'heart' : 'sparkle', star: { x: -190 }, hops: [1.5],
    front(x, t, lt, P) {
      plate(x, 800, 920, pop01(t, P.t0 + 0.2, 0.3, 2), () => {
        drawBits(x, PEA, PEA_C, 0, -10, 9)
        x.strokeStyle = '#e163d6'; x.lineWidth = 6; x.beginPath(); x.arc(0, -10, 70, 0.3, 2.6); x.stroke()
        x.fillStyle = GREEN; x.fillRect(48, -66, 10, 26); x.fillRect(42, -72, 22, 10)
      }, 170)
      sparkles(x, t, 800, 900, P.t0 + 1.2, 8, 190, 0.6)
      label(x, 800, 690, 'TIME: 3 HRS', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 34, bg: LAV, rot: -0.05, font: MONO, weight: 700 })
      label(x, 800, 1130, 'IT’S ART', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: PINK, rot: 0.05 })
    } },
  { sign: 'scorpio', cap: 'Read your birth chart. | Cooked *your favourite.*', mood: lt => lt > 1.2 ? 'wink' : 'squint', look: [1, 0], star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      chart(x, t, 800, 820, pop01(t, P.t0 + 0.2, 0.35, 2))
      plate(x, 800, 1060, pop01(t, P.t0 + 1.0, 0.3, 2), () => { x.fillStyle = GOLD; x.fillRect(-56, -28, 112, 36) }, 120)
      bubble(x, 390, 600, 'how did you know??', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 32, col: PINK, tail: 'bc' })
    } },
  { sign: 'sagittarius', cap: 'Added every spice | *on the shelf.*', mood: lt => lt > 1.4 ? 'wide' : 'sparkle', star: { x: -190 }, hops: [0.5, 1.0, 1.5],
    front(x, t, lt, P) {
      const JC = [RED, GOLD, ORANGE, GREEN, PINK, BROWN, LAV, SKYB]
      const n = Math.floor(clamp((lt - 0.2) / 1.4) * 8)
      for (let i = 0; i < n; i++) drawBits(x, JAR, { K: INK, J: JC[i], W: CREAM }, 690 + (i % 4) * 70, 700 + Math.floor(i / 4) * 110 + 6 * Math.sin(t * 8 + i), 14, { rot: Math.sin(i * 2.1) * 0.4 })
      drawBits(x, POT, POT_C, 790, 1010, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1150, 'SPICE LEVEL: YES', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: RED, color: CREAM, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Made a dinner | *spreadsheet.*', mood: 'neutral', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      sheet(x, 800, 880, pop01(t, P.t0 + 0.2, 0.35, 2), lt, 'DATE PLAN v4')
      label(x, 800, 1110, 'DESSERT: 8:41 PM', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Invented a dish. | *Blue* spaghetti.', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', star: { x: -190 }, hops: [1.2],
    front(x, t, lt, P) {
      plate(x, 800, 930, pop01(t, P.t0 + 0.2, 0.3, 2), () => {
        x.strokeStyle = '#38c4ec'; x.lineWidth = 9
        for (let i = 0; i < 6; i++) { x.beginPath(); x.arc(-10 + (i % 3) * 12, -16 + Math.floor(i / 3) * 10, 30 + i * 9, i, i + 3.6); x.stroke() }
      }, 160)
      bubble(x, 800, 690, 'trust me.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 800, 1130, 'PATENT PENDING', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Burnt the toast. | *Wept* for an hour.', mood: lt => lt < 0.8 ? 'happy' : 'wide', tears: lt => lt < 0.8 ? 1 : 3, star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      plate(x, 800, 980, pop01(t, P.t0 + 0.2, 0.3, 2), () => { drawBits(x, TOAST, TOAST_C, 0, -30, 14, { rot: -0.1 }) })
      for (let i = 0; i < 3; i++) { const ph = ((t * 0.7 + i / 3) % 1); x.save(); x.globalAlpha = 0.45 * Math.sin(Math.PI * ph); x.fillStyle = '#9aa5c4'; x.fillRect(770 + i * 30, 860 - ph * 150, 22, 22); x.restore() }
      label(x, 800, 700, 'TOAST: GONE', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 34, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3t082', key: 'D', accent: ORANGE, ending: 'card',
  title: 'The signs | *cook for a date.*',
  cameos: CAMEOS,
  card: { a: 'cancer', b: 'taurus', chip: 'IT’S A MATCH' },
  group: { cap: 'Dinner is | *served. Mostly.*' },
  lesson: { text: 'Cook for someone. | It *says it all.*', chip: 'DINNER: SERVED' },
  last: {
    text: 'Cancer cooks. | *Taurus eats.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 10, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
