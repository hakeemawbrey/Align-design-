// r2t0358: star_talk, BE LIKE, "Pen ran out? | Zodiacs *be like.*" (topic: Zodiacs when their pen runs out) (signs3kit social cut, music: lofi · G). Ending: group.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#ff9a4a', RED = '#e23d4e', CREAM = '#fff4e2', ORANGE = '#ffb34a'
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

const PEN = ['KKKKKKKKKKKKKK..', 'KBBBBBBBBBBBBWW.', 'KBBBBBBBBBBBBWWT', 'KBBBBBBBBBBBBWW.', 'KKKKKKKKKKKKKK..']
const pen = (x, cx, cy, cell, col, opts = {}) => drawBits(x, PEN, { K: '#2a2350', B: col, W: '#d8dbe8', T: INK }, cx, cy, cell, opts)
const BOTTLE = ['...RR...', '..RRRR..', '..WWWW..', '.RRRRRR.', 'RRRRRRRR', 'RRWWWWRR', 'RRWRRWRR', 'RRWWWWRR', 'RRRRRRRR', '.RRRRRR.']
const CRATE = ['KKKKKKKKKKKK', 'KBBBBBBBBBBK', 'KBKKKKKKKKBK', 'KBBBBBBBBBBK', 'KBKKKKKKKKBK', 'KBBBBBBBBBBK', 'KKKKKKKKKKKK']
const CAMEOS = [
  { sign: 'aries', cap: 'Pen died mid-word. | *Launched it.*', mood: 'wide', look: [1, -1], star: ST, hops: [0.9],
    front(x, t, lt, P) {
      const p = ease.outCubic(prog(lt, 0.9, 1.6))
      pen(x, lerp(700, 900, p), lerp(900, 560, p), 15 * pop01(t, P.t0 + 0.2, 0.3, 2), SKYB, { rot: -0.3 + p * 6 })
      L(x, 790, 1080, 'PEN: IN ORBIT', pop01(t, P.t0 + 1.6, 0.3, 2.4), ORANGE, -0.04, 36)
    } },
  { sign: 'taurus', cap: 'Finished the note | in *ketchup.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, BOTTLE, { R: RED, W: CREAM }, 660, 880, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.4 })
      L(x, 850, 720, '“buy mil', pop01(t, P.t0 + 0.6, 0.3, 2), BONE, -0.03, 34)
      L(x, 860, 860, 'k” ✓', pop01(t, P.t0 + 1.2, 0.3, 2.2), RED, 0.04, 40, CREAM)
      L(x, 790, 1090, 'ALSO: SNACK', pop01(t, P.t0 + 1.7, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: 'gemini', cap: 'Borrowed six pens. | *Returned zero.*', mood: 'wink', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const n = Math.min(6, Math.floor(clamp((lt - 0.2) / 1.2) * 6))
      for (let i = 0; i < n; i++) pen(x, 790, 650 + i * 66, 10, [PINK, MINT, SKYB, GOLD, LAV, ORANGE][i], { rot: (i % 2 ? 0.08 : -0.08) })
      L(x, 790, 1100, 'RETURNED: 0', pop01(t, P.t0 + 1.6, 0.3, 2.4), BONE, 0.04, 36)
    } },
  { sign: 'cancer', cap: 'Held a little funeral. | *For the pen.*', mood: 'neutral', look: [1, 1], tears: 1, star: ST,
    front(x, t, lt, P) {
      pen(x, 790, 900, 17 * pop01(t, P.t0 + 0.2, 0.3, 2), '#9aa5c4')
      L(x, 790, 760, 'R.I.P. PEN ♡', pop01(t, P.t0 + 0.6, 0.3, 2), LAV, -0.04, 40)
      L(x, 790, 1060, 'AGE: 2 WEEKS', pop01(t, P.t0 + 1.4, 0.3, 2.4), BONE, 0.04, 30)
    } },
  { sign: 'leo', cap: 'Signed autographs anyway. | *In glitter.*', mood: 'sparkle', star: ST, hops: [1.1],
    front(x, t, lt, P) {
      paper(x, 790, 830, pop01(t, P.t0 + 0.2, 0.3, 2), ['', 'Leo, xoxo', ''], { head: 'AUTOGRAPH', headBg: ORANGE, w: 300, size: 48, rot: -0.04, bg: CREAM })
      sparkles(x, t, 790, 860, P.t0 + 0.8, 8, 150, 0.3, [GOLD, PINK, SKYB])
      sparkles(x, t, 790, 860, P.t0 + 1.4, 8, 190, 1.1, [GOLD, MINT, BONE])
      L(x, 790, 1090, 'NOBODY ASKED', pop01(t, P.t0 + 1.7, 0.3, 2.4), GOLD, 0.04, 30)
    } },
  { sign: 'virgo', cap: 'Pulled out forty backups. | *Colour-coded.*', mood: 'sparkle', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const COLS = [RED, ORANGE, GOLD, MINT, SKYB, LAV, PINK]
      const n = Math.min(7, Math.floor(clamp((lt - 0.2) / 1.0) * 7))
      for (let i = 0; i < n; i++) pen(x, 790, 650 + i * 58, 10, COLS[i])
      L(x, 790, 1100, 'BACKUPS: 40', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, -0.04, 34)
    } },
  { sign: 'libra', cap: 'Choosing a new pen. | *Forty minutes in.*', mood: 'squint', look: lt => [Math.floor(lt * 2.4) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      L(x, 790, 720, 'BLUE?', pop01(t, P.t0 + 0.3, 0.3, 2), SKYB, -0.05, 38)
      L(x, 790, 840, 'BLACK?', pop01(t, P.t0 + 0.6, 0.3, 2), BONE, 0.05, 38)
      L(x, 790, 960, 'GEL??', pop01(t, P.t0 + 0.9, 0.3, 2), PINK, -0.04, 38)
      L(x, 790, 1100, 'STORE: CLOSING', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, 0.03, 30)
    } },
  { sign: 'scorpio', cap: 'Kept writing anyway. | *Invisible ink.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      paper(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), ['', '', ''], { head: 'MY DIARY', headBg: PINK, w: 320, size: 40, rot: 0.04 })
      L(x, 790, 1090, 'SECRETS: SAFE', pop01(t, P.t0 + 1.3, 0.3, 2.4), BONE, -0.04, 34)
    } },
  { sign: 'sagittarius', cap: 'Didn’t notice. | Wrote *three blank pages.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      const pg = 1 + Math.floor(clamp((lt - 0.3) / 1.3) * 2)
      paper(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), ['', '', ''], { head: `PAGE ${pg}`, headBg: LAV, w: 300, size: 40, rot: -0.04 })
      bubble(x, 790, 1060, 'best essay yet!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Bought pens in bulk. | *Five thousand.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, CRATE, { K: INK, B: '#c98f2a' }, 790, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 880, '5,000 PENS', pop01(t, P.t0 + 0.6, 0.3, 2.2), BONE, 0, 30)
      L(x, 790, 1080, 'NEVER AGAIN.', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, 0.04, 34)
    } },
  { sign: 'aquarius', cap: 'Invented a pen | that *never runs out.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      paper(x, 790, 800, pop01(t, P.t0 + 0.2, 0.3, 2), ['ink: infinite', 'power: moon', 'works: maybe'], { head: 'BLUEPRINT', headBg: SKYB, w: 330, size: 30, rot: 0.04, bg: '#cfe6ff' })
      L(x, 790, 1080, 'PATENT: PENDING', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: 'pisces', cap: 'Cried over it. | Now *writing in tears.*', mood: 'heart', tears: lt => lt < 0.8 ? 1 : 3, star: ST,
    front(x, t, lt, P) {
      pen(x, 790, 760, 17 * pop01(t, P.t0 + 0.2, 0.3, 2), SKYB, { rot: 0.5 })
      L(x, 790, 980, 'INK: TEARS (BLUE)', pop01(t, P.t0 + 1.2, 0.3, 2.4), SKYB, 0.04, 30)
    } },
]

const F = makeFilm({
  id: 'r2t0358', key: 'G', accent: ACC, ending: 'group',
  title: 'Pen ran out? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: {
    cap: 'One dead pen. | *Twelve meltdowns.*',
    draw(x, t, lt) { label(x, 540, 760, 'R.I.P. LITTLE PEN', pop01(t, t - lt + 1.2, 0.35, 2.4), { size: 50, bg: LAV, rot: -0.03, font: MONO, weight: 700 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
