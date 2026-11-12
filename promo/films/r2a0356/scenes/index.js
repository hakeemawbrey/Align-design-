// r2a0356: star_advice, ADVICE SOLO (aquarius), "Aquarius, it’s okay | *to miss them.*" (signs3kit social cut, music: lofi · D). Ending: card (aquarius + gemini, the friend in the polaroid).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#6fc3ff', RED = '#e23d4e', CREAM = '#fff4e2', ORANGE = '#ffb34a'
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

const MUG = ['WWWWWWWW...', 'WPWWWWPWHH.', 'WWWWWWWW..H', 'WWPWWPWW..H', 'WWWPPWWW..H', 'WWWWWWWWHH.', 'WWWWWWWW...', '.WWWWWW....']
const S = 'aquarius'
const CAMEOS = [
  { sign: S, cap: 'Acting totally fine? | You’re *allowed not to be.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      if (pop01(t, P.t0 + 0.2, 0.3, 2) > 0.5) swapLabel(x, 790, 800, lt, 0.9, 'STATUS: TOTALLY FINE', 'STATUS: HONEST', { size: 30, toBg: ACC })
      bubble(x, 790, 1010, 'ok, i miss them.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, col: BONE, tail: 'bl' })
    } },
  { sign: S, cap: 'Rereading old chats? | That’s *love remembering.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, 770, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { head: '2 YEARS AGO', headCol: LAV, lines: [
        ['ur so weird', BONE, pop01(t, P.t0 + 0.5, 0.25, 2.2)],
        ['thank you', ACC, pop01(t, P.t0 + 0.8, 0.25, 2.2), true],
        ['that’s why', BONE, pop01(t, P.t0 + 1.1, 0.25, 2.2)],
        ['i like you', BONE, pop01(t, P.t0 + 1.3, 0.25, 2.2)],
      ] })
      hearts(x, t, 790, 900, P.t0 + 1.5, { n: 4, life: 1.4, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: S, cap: 'Kept their weird mug? | *Keep it.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, MUG, { W: CREAM, P: PINK, H: '#d8dbe8' }, 800, 860, 26 * pop01(t, P.t0 + 0.25, 0.35, 2), { rot: 0.05 })
      L(x, 790, 620, '“WORLD’S OKAYEST”', pop01(t, P.t0 + 0.7, 0.3, 2), GOLD, 0.04, 28)
      L(x, 790, 1080, 'MUG: STAYS', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 36)
    } },
  { sign: S, cap: 'Logic says move on? | Your heart *gets a vote.*', mood: 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      L(x, 790, 720, 'LOGIC: 1', pop01(t, P.t0 + 0.3, 0.3, 2), '#9aa5c4', -0.04, 40)
      L(x, 790, 860, 'HEART: 1', pop01(t, P.t0 + 0.9, 0.3, 2.2), PINK, 0.04, 40)
      L(x, 790, 1040, 'RESULT: A TIE. OK.', pop01(t, P.t0 + 1.6, 0.3, 2.4), BONE, -0.03, 28)
    } },
  { sign: S, cap: 'Feelings aren’t a bug. | They’re a *feature.*', mood: lt => lt > 1.3 ? 'sparkle' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      if (pop01(t, P.t0 + 0.2, 0.3, 2) > 0.5) swapLabel(x, 790, 820, lt, 0.9, 'ERROR: FEELINGS', 'FEATURE ✓', { size: 40, fromBg: RED, toBg: MINT })
      sparkles(x, t, 790, 820, P.t0 + 1.3, 7, 160, 0.5)
    } },
  { sign: S, cap: 'Missing a friend? | That *counts too.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      polaroid(x, t, 790, 840, pop01(t, P.t0 + 0.25, 0.35, 2), 'gemini', { cap: 'best summer', mood: 'wink', seed: 51 })
      hearts(x, t, 790, 760, P.t0 + 1.3, { n: 5, life: 1.6, spread: 180, cell: 7, seed: 6 })
    } },
  { sign: S, cap: 'Their song came on? | *Let it play.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      notes(x, t, 790, 900, { n: 5, cell: 8, col: ACC, seed: 3 })
      if (pop01(t, P.t0 + 0.2, 0.3, 2) > 0.5) swapLabel(x, 790, 760, lt, 0.9, 'SKIP ⏭', 'REPEAT ↻', { size: 36, toBg: GOLD })
      L(x, 790, 1080, 'SINGING ALONG: QUIETLY', pop01(t, P.t0 + 1.6, 0.3, 2.4), LAV, 0.04, 26)
    } },
  { sign: S, cap: 'Wrote a theory about it? | Just *feel it.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const pg = 1 + Math.floor(clamp((lt - 0.3) / 1.0) * 46)
      const k = pop01(t, P.t0 + 0.2, 0.3, 2) * (lt > 1.4 ? 1 - clamp((lt - 1.4) / 0.25) : 1)
      paper(x, 790, 820, k, ['WHY I MISS', 'THEM: a theory'], { head: `PAGE ${pg}`, headBg: LAV, w: 340, size: 34, rot: -0.03 })
      if (lt > 1.5) { drawBits(x, ['.HH.HH.', 'HHHHHHH', 'HWHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: PINK, W: '#fff' }, 790, 830, 22 * pop01(lt, 1.55, 0.3, 2.2)); L(x, 790, 1060, 'THAT’S ALL.', pop01(lt, 1.8, 0.3, 2.4), BONE, 0.04, 34) }
    } },
  { sign: S, cap: 'Missing them means | you *loved well.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      L(x, 790, 700, 'LOVED: WELL ✓', pop01(t, P.t0 + 0.5, 0.3, 2.2), PINK, -0.04, 40)
      hearts(x, t, 790, 1080, P.t0 + 0.9, { n: 8, life: 2.0, spread: 260, cell: 8, seed: 9 })
      sparkles(x, t, 790, 800, P.t0 + 0.6, 7, 180, 0.4)
    } },
]

const F = makeFilm({
  id: 'r2a0356', key: 'D', accent: ACC, solo: 'aquarius', ending: 'card',
  title: 'Aquarius, it’s okay | *to miss them.*',
  cameos: CAMEOS,
  card: { a: 'aquarius', b: 'gemini', chip: 'STILL CLOSE' },
  group: { cap: 'Big brain. | *Bigger heart.*', mood: 'heart' },
  lesson: { text: 'Missing them means | it *mattered.*', chip: 'HEART: OPEN' },
  last: { text: 'Someone out there | misses *you* too.' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
