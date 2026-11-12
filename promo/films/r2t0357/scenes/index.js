// r2t0357: star_talk, ROLLCALL, "The signs | *on a train.*" (signs3kit social cut, music: lofi · E). Ending: group.
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

const BASKET = ['...KKKKKK...', '..K......K..', '.K........K.', 'RWRWRWRWRWRW', 'WRWRWRWRWRWR', 'BBBBBBBBBBBB', 'BbBbBbBbBbBB', 'BBBBBBBBBBBB', '.BBBBBBBBBB.']
const SHADES = ['KKKKK..KKKKK', 'KDDDKKKKDDDK', 'KDWDK..KDWDK', '.KKK....KKK.']
const BLANKET = ['PPPPPPPPPP', 'PWPPWPPWPP', 'PPPPPPPPPP', 'PPWPPWPPWP', 'PPPPPPPPPP']
const CAMEOS = [
  { sign: 'aries', cap: 'Ran to the front. | Tried *to drive it.*', mood: 'wide', look: [1, 0], star: ST, hops: [0.4, 0.8, 1.2],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'faster!!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 48, col: ORANGE, tail: 'bl' })
      L(x, 790, 1000, 'DRIVER’S DOOR: LOCKED', pop01(t, P.t0 + 1.3, 0.3, 2.4), BONE, 0.04, 28)
    } },
  { sign: 'taurus', cap: 'Packed a full picnic. | *Ride: ten minutes.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, BASKET, { K: '#8a4a2e', R: RED, W: CREAM, B: '#c98f2a', b: '#8a4a2e' }, 790, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 650, '3 COURSES', pop01(t, P.t0 + 0.8, 0.3, 2.2), GOLD, -0.04, 36)
      L(x, 790, 1070, 'NEXT STOP: DESSERT', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, 0.04, 28)
    } },
  { sign: 'gemini', cap: 'Made five best friends. | *Between two stops.*', mood: 'wink', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      ['hi!!', 'no WAY', 'same!!'].forEach((q, i) => bubble(x, 760 + (i % 2) * 70, 660 + i * 150, q, pop01(t, P.t0 + 0.3 + i * 0.4, 0.25, 2.2), { size: 40, col: [BONE, GOLD, PINK][i], tail: i % 2 ? 'br' : 'bl' }))
      L(x, 790, 1110, 'GROUP CHAT: MADE', pop01(t, P.t0 + 1.6, 0.3, 2.4), SKYB, -0.04, 30)
    } },
  { sign: 'cancer', cap: 'Tucked a stranger in. | *With a blanket.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'capricorn', 800, 850, 200 * k, { mood: lt > 1.2 ? 'sleepy' : 'wide', look: [-1, 0], seed: 13, glyph: false })
      drawBits(x, BLANKET, { P: PINK, W: CREAM }, 800, lerp(700, 960, ease.outCubic(prog(lt, 0.7, 1.1))), 20 * pop01(t, P.t0 + 0.6, 0.3, 2))
      L(x, 800, 1130, 'COZY: MANDATORY', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, 0.04, 30)
    } },
  { sign: 'leo', cap: 'The aisle? | A *runway.*', mood: 'sparkle', star: { x: -170 }, hops: [0.7, 1.4],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k <= 0.01) return
      x.save(); x.globalAlpha = 0.35 * k; x.fillStyle = '#fff1c8'; x.beginPath(); x.moveTo(330, 560); x.lineTo(410, 560); x.lineTo(520, 1180); x.lineTo(220, 1180); x.closePath(); x.fill(); x.restore()
    },
    front(x, t, lt, P) {
      L(x, 790, 760, 'WALK IT', pop01(t, P.t0 + 0.5, 0.3, 2.2), ORANGE, -0.05, 48)
      bubble(x, 790, 980, 'photos later', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, tail: 'bl' })
      sparkles(x, t, 370, 880, P.t0 + 0.8, 7, 170, 0.3)
    } },
  { sign: 'virgo', cap: 'Wiped their seat. | Then *the whole train.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const n = Math.min(8, Math.floor(clamp((lt - 0.3) / 1.4) * 8))
      L(x, 770, 820, `CARRIAGES: ${n}/8 ✓`, pop01(t, P.t0 + 0.2, 0.3, 2), MINT, -0.04, 34)
      sparkles(x, t, 790, 820, P.t0 + 1.9, 7, 170, 0.5)
      L(x, 790, 1040, 'GLOVES: ON', pop01(t, P.t0 + 1.2, 0.3, 2.4), BONE, 0.04, 30)
    } },
  { sign: 'libra', cap: 'Window or aisle? | *Still deciding.*', mood: 'squint', look: lt => [Math.floor(lt * 2.4) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      L(x, 790, 720, 'WINDOW?', pop01(t, P.t0 + 0.3, 0.3, 2), SKYB, -0.05, 40)
      L(x, 790, 860, 'AISLE?', pop01(t, P.t0 + 0.7, 0.3, 2), PINK, 0.05, 40)
      L(x, 790, 1060, 'STOP 9 OF 9', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.03, 34)
    } },
  { sign: 'scorpio', cap: 'Wore sunglasses. | *In a tunnel.*', mood: 'neutral', star: ST,
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.35, 0.3, 2)
      if (k > 0.01) drawBits(x, SHADES, { K: INK, D: '#2a2350', W: '#6b62a8' }, F.x, F.cy - 6, 15 * k)
      if (lt > 1.0) { x.save(); x.fillStyle = `rgba(0,0,0,${(0.45 * clamp((lt - 1.0) / 0.3)).toFixed(3)})`; x.fillRect(110, 480, 860, 740); x.restore() }
      L(x, 790, 820, 'TUNNEL: 4 MINUTES', pop01(t, P.t0 + 1.2, 0.3, 2.4), BONE, -0.04, 30)
      L(x, 790, 1000, 'MYSTERY: KEPT', pop01(t, P.t0 + 1.6, 0.3, 2.4), PINK, 0.04, 32)
    } },
  { sign: 'sagittarius', cap: 'Missed their stop. | Now *in another country.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      L(x, 790, 720, 'NEXT STOP: ???', pop01(t, P.t0 + 0.3, 0.3, 2), ORANGE, -0.05, 38)
      bubble(x, 790, 940, 'even better.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 40, col: BONE, tail: 'bl' })
      sparkles(x, t, 790, 720, P.t0 + 0.6, 6, 140, 0.4)
    } },
  { sign: 'capricorn', cap: 'Train one minute late. | *Filed a report.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      paper(x, 765, 830, pop01(t, P.t0 + 0.2, 0.3, 2), ['delay: 1 min', 'impact: severe', 'tone: firm'], { head: 'COMPLAINT', headBg: RED, w: 340, size: 32, rot: 0.04 })
      L(x, 790, 1100, 'PAGES: 6', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 34)
    } },
  { sign: 'aquarius', cap: 'Asked the conductor | *their sign.*', mood: 'happy', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'libra', 820, 940, 180 * k, { mood: lt > 1.3 ? 'sparkle' : 'wide', look: [-1, 0], seed: 14, glyph: false })
      bubble(x, 740, 640, 'ticket? | also: your sign?', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 32, col: SKYB, tail: 'bl' })
      L(x, 820, 1120, 'CHART: REQUESTED', pop01(t, P.t0 + 1.5, 0.3, 2.4), LAV, -0.04, 30)
    } },
  { sign: 'pisces', cap: 'Cried at the view. | *It was a tunnel.*', mood: 'heart', tears: lt => lt < 0.8 ? 1 : 3, star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'so beautiful', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 40, col: LAV, tail: 'bl' })
      L(x, 790, 960, 'VIEW: PITCH BLACK', pop01(t, P.t0 + 1.4, 0.3, 2.4), BONE, 0.04, 30)
    } },
]

const F = makeFilm({
  id: 'r2t0357', key: 'E', accent: ACC, ending: 'group',
  title: 'The signs | *on a train.*',
  cameos: CAMEOS,
  group: {
    cap: 'Twelve signs. | *One carriage.*',
    draw(x, t, lt) { label(x, 540, 760, 'NEXT STOP: CHAOS', pop01(t, t - lt + 1.2, 0.35, 2.4), { size: 50, bg: GOLD, rot: -0.03, font: MONO, weight: 700 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
