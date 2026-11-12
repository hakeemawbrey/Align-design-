// r2a0359: star_advice, ADVICE ROLLCALL, "Busy week? | Each sign *copes.*" (topic: How each sign handles a busy week) (signs3kit social cut, music: lofi · E). Ending: lesson.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#7dffb0', RED = '#e23d4e', CREAM = '#fff4e2', ORANGE = '#ffb34a'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
const ST = { x: -170 }

/** a sheet of paper with an optional coloured header */
function paper(x, cx, cy, k, lines, { w = 330, size = 30, rot = 0.04, head = null, headBg = GOLD, bg = BONE } = {}) {
  if (k <= 0.01) return
  const lh = size * 1.45, h = lines.length * lh + 40 + (head ? 60 : 0)
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  let y0 = -h / 2 + 20
  if (head) { x.fillStyle = headBg; x.fillRect(-w / 2, -h / 2, w, 60); x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -h / 2 + 31); y0 += 60 }
  x.fillStyle = INK; x.font = `800 ${size}px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, -w / 2 + 24, y0 + lh * (i + 0.5)))
  x.restore()
}
/** a pixel phone with chat chips: lines = [[text, colour, k, right?], …] */
function phone(x, cx, cy, k, { head = '', headCol = MINT, lines = [], rot = 0.05 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  if (head) { x.fillStyle = headCol; x.fillRect(-100, -156, 200, 46); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -132) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach(([txt, col, kk, right], i) => {
    if (kk <= 0.01) return
    x.font = `700 24px ${MONO}`; const w = x.measureText(txt).width + 24
    x.save(); x.translate(right ? 96 - w : -96, -60 + i * 58); x.scale(kk, kk)
    x.fillStyle = col; x.fillRect(0, -22, w, 44); x.fillStyle = INK; x.fillText(txt, 12, 2)
    x.restore()
  })
  x.restore()
}
/** a crossed-out sticker swapped for a new one */
function swapLabel(x, cx, cy, lt, at, from, to, { size = 34, fromBg = '#9aa5c4', toBg = MINT } = {}) {
  if (lt < at) { L(x, cx, cy, from, 1, fromBg, -0.04, size); return }
  const p = clamp((lt - at) / 0.25)
  if (p < 1) {
    L(x, cx, cy, from, 1, fromBg, -0.04, size)
    x.save(); x.strokeStyle = RED; x.lineWidth = 10; x.lineCap = 'round'; x.beginPath(); x.moveTo(cx - 150, cy + 10); x.lineTo(cx - 150 + 300 * p, cy - 10); x.stroke(); x.restore()
    return
  }
  L(x, cx, cy, to, pop01(lt, at + 0.3, 0.3, 2.4), toBg, 0.04, size)
}
/** a polaroid with a sign star inside */
function polaroid(x, t, cx, cy, k, id, { cap = '', rot = 0.06, mood = 'happy', seed = 50, tears = 0 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -142, 256, 304)
  x.fillStyle = INK; x.fillRect(-134, -154, 268, 308); x.fillStyle = CREAM; x.fillRect(-126, -146, 252, 292)
  x.fillStyle = '#2a2350'; x.fillRect(-108, -128, 216, 196)
  signChar(x, t, id, 0, -24, 150, { mood, seed, glyph: false, glow: 0.6, tears })
  if (cap) { x.fillStyle = INK; x.font = `800 28px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(cap, 0, 108) }
  x.restore()
}

const SANDWICH = ['..BBBBBBBB..', '.BBBBBBBBBB.', 'GGGGGGGGGGGG', 'RRRRRRRRRRRR', 'YYYYYYYYYYYY', '.BBBBBBBBBB.']
const CAMEOS = [
  { sign: 'aries', cap: 'Sprinting since Monday? | *Jogging still wins.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 0], star: ST, hops: [0.4, 0.8],
    front(x, t, lt, P) {
      if (pop01(t, P.t0 + 0.2, 0.3, 2) > 0.5) swapLabel(x, 790, 760, lt, 1.0, 'SPEED: MAX', 'SPEED: COMFY ✓', { size: 36, fromBg: RED, toBg: MINT })
      L(x, 790, 980, 'STILL WINNING', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, 0.04, 32)
    } },
  { sign: 'taurus', cap: 'Guarding your lunch break? | *Good. Keep it.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, SANDWICH, { B: '#e8a24a', G: '#5fd068', R: RED, Y: '#ffe76a' }, 790, 860, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 680, 'LUNCH: SACRED', pop01(t, P.t0 + 0.8, 0.3, 2.2), GOLD, -0.04, 36)
      L(x, 790, 1050, 'MEETINGS: LATER', pop01(t, P.t0 + 1.5, 0.3, 2.4), BONE, 0.04, 30)
    } },
  { sign: 'gemini', cap: 'Ten tasks at once? | Try *one at a time.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: lt => lt > 1.4 ? [1, 0] : [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const n = lt > 1.4 ? 1 : 1 + Math.floor(clamp((lt - 0.2) / 1.0) * 9)
      L(x, 790, 780, `TASKS OPEN: ${n}`, pop01(t, P.t0 + 0.2, 0.3, 2), lt > 1.4 ? MINT : ORANGE, -0.04, 38)
      L(x, 790, 980, 'MUCH CALMER', pop01(t, P.t0 + 1.6, 0.3, 2.4), BONE, 0.04, 32)
    } },
  { sign: 'cancer', cap: 'Checking on everyone? | *Check on you too.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, 780, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'NOTE TO SELF', headCol: SKYB, lines: [
        ['you ok?', BONE, pop01(t, P.t0 + 0.6, 0.25, 2.2), true],
        ['tired tbh', LAV, pop01(t, P.t0 + 1.0, 0.25, 2.2)],
        ['bath. now.', MINT, pop01(t, P.t0 + 1.4, 0.25, 2.2), true],
        ['♡', PINK, pop01(t, P.t0 + 1.7, 0.25, 2.2)],
      ] })
    } },
  { sign: 'leo', cap: 'Not shining by Thursday? | *Dim is cute too.*', mood: lt => lt > 1.3 ? 'sleepy' : 'happy', star: ST,
    front(x, t, lt, P) {
      const b = Math.round(100 - clamp((lt - 0.3) / 1.0) * 60)
      L(x, 790, 780, `BRIGHTNESS: ${b}%`, pop01(t, P.t0 + 0.2, 0.3, 2), ORANGE, -0.04, 36)
      L(x, 790, 980, 'STILL ADORABLE', pop01(t, P.t0 + 1.5, 0.3, 2.4), PINK, 0.04, 32)
    } },
  { sign: 'virgo', cap: 'Polishing every detail? | *Done beats perfect.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      if (pop01(t, P.t0 + 0.2, 0.3, 2) > 0.5) swapLabel(x, 790, 800, lt, 1.0, 'DRAFT 31: PERFECT?', 'DONE ✓', { size: 36, toBg: MINT })
      sparkles(x, t, 790, 800, P.t0 + 1.6, 7, 170, 0.4)
    } },
  { sign: 'libra', cap: 'Saying yes to everyone? | *Save one for you.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      ['yes!', 'sure!', 'of course!'].forEach((q, i) => bubble(x, 760 + (i % 2) * 70, 650 + i * 130, q, pop01(t, P.t0 + 0.2 + i * 0.3, 0.25, 2.2), { size: 36, col: BONE, tail: i % 2 ? 'br' : 'bl' }))
      L(x, 790, 1090, 'YES TO: A NAP', pop01(t, P.t0 + 1.5, 0.3, 2.4), PINK, -0.04, 34)
    } },
  { sign: 'scorpio', cap: 'Quietly carrying it all? | *Let someone help.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.9, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 820, 930, 170 * k, { mood: 'heart', look: [-1, 0], seed: 16, glyph: false })
      L(x, 790, 680, 'LOAD: HEAVY', pop01(t, P.t0 + 0.2, 0.3, 2), BONE, -0.04, 36)
      bubble(x, 640, 800, 'i got this half', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 30, col: SKYB, tail: 'br' })
      L(x, 800, 1110, 'LOAD: HALVED', pop01(t, P.t0 + 1.7, 0.3, 2.4), MINT, 0.04, 32)
    } },
  { sign: 'sagittarius', cap: 'Daydreaming of escape? | *Friday’s nearly here.*', mood: 'sparkle', look: [1, -1], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const d = ['MON', 'TUE', 'WED', 'THU', 'FRI'][Math.min(4, Math.floor(clamp((lt - 0.2) / 1.4) * 5))]
      L(x, 790, 780, `TODAY: ${d}`, pop01(t, P.t0 + 0.2, 0.3, 2), LAV, -0.04, 40)
      L(x, 790, 980, 'ADVENTURE: BOOKED', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, 0.04, 30)
    } },
  { sign: 'capricorn', cap: 'Working through dinner? | *Eat the sandwich.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      L(x, 790, 680, 'INBOX: 212', pop01(t, P.t0 + 0.2, 0.3, 2), BONE, -0.04, 36)
      drawBits(x, SANDWICH, { B: '#e8a24a', G: '#5fd068', R: RED, Y: '#ffe76a' }, 790, 880, 18 * pop01(t, P.t0 + 0.8, 0.3, 2.2), { rot: -0.06 })
      L(x, 790, 1060, 'INBOX CAN WAIT', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, 0.04, 32)
    } },
  { sign: 'aquarius', cap: 'Redesigning everything? | *Sleep first.*', mood: lt => lt > 1.4 ? 'sleepy' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const v = 1 + Math.floor(clamp((lt - 0.2) / 1.0) * 8)
      L(x, 790, 760, `NEW SYSTEM v${v}`, pop01(t, P.t0 + 0.2, 0.3, 2), SKYB, -0.04, 38)
      L(x, 790, 960, 'BEST SYSTEM: BED', pop01(t, P.t0 + 1.5, 0.3, 2.4), LAV, 0.04, 32)
    } },
  { sign: 'pisces', cap: 'Cried by the printer? | *Feelings are allowed.*', mood: 'heart', tears: lt => lt < 0.9 ? 2 : 1, star: ST,
    front(x, t, lt, P) {
      L(x, 790, 760, 'PRINTER: JAMMED', pop01(t, P.t0 + 0.2, 0.3, 2), BONE, -0.04, 34)
      L(x, 790, 960, 'TISSUES: STOCKED ♡', pop01(t, P.t0 + 1.2, 0.3, 2.4), SKYB, 0.04, 30)
      hearts(x, t, 380, 760, P.t0 + 1.4, { n: 4, life: 1.4, spread: 180, cell: 7, seed: 7 })
    } },
]

const F = makeFilm({
  id: 'r2a0359', key: 'E', accent: ACC, ending: 'lesson',
  title: 'Busy week? | Each sign *copes.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve tired signs. | *All doing fine.*' },
  lesson: { text: 'Busy isn’t a test. | *Rest* still counts.', chip: 'WEEK: SURVIVED' },
  last: { text: 'Friday is | *almost here.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
