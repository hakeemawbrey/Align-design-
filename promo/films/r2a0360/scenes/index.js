// r2a0360: star_advice, ADVICE ROLLCALL, "Why coworkers | love *each sign.*" (topic: What each sign’s coworkers appreciate) (signs3kit social cut, music: lofi · G). Ending: group.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#ffd23a', RED = '#e23d4e', CREAM = '#fff4e2', ORANGE = '#ffb34a'
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

const CAKE = ['...Y.Y.Y...', '...R.R.R...', '.PPPPPPPPP.', '.PWPWPWPWP.', '.PPPPPPPPP.', 'CCCCCCCCCCC', 'CWCCWCCWCCC', 'CCCCCCCCCCC']
const MUG = ['.S.S....', 'WWWWWW..', 'WPWWPWHH', 'WWWWWW.H', 'WPWWPWHH', 'WWWWWW..', '.WWWW...']
const CAMEOS = [
  { sign: 'aries', cap: 'First to volunteer. | *Every single time.*', mood: 'sparkle', look: [1, -1], star: ST, hops: [0.3],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'I’ll do it!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 46, col: ORANGE, tail: 'bl' })
      L(x, 790, 930, 'BEFORE THE QUESTION', pop01(t, P.t0 + 1.2, 0.3, 2.4), BONE, 0.04, 30)
    } },
  { sign: 'taurus', cap: 'The snack drawer? | *Always stocked.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      paper(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), ['cookies ✓', 'crackers ✓', 'more cookies ✓'], { head: 'DRAWER 2', headBg: GOLD, w: 330, size: 30, rot: 0.04 })
      L(x, 790, 1090, 'OPEN TO ALL ♡', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 34)
    } },
  { sign: 'gemini', cap: 'Makes Mondays | *actually fun.*', mood: 'wink', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      bubble(x, 780, 700, 'ok funny story…', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 38, col: BONE, tail: 'bl' })
      L(x, 790, 900, 'TEAM: CRYING LAUGHING', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, 0.04, 28)
      L(x, 790, 1060, 'MONDAY: SAVED', pop01(t, P.t0 + 1.7, 0.3, 2.4), SKYB, -0.04, 32)
    } },
  { sign: 'cancer', cap: 'Remembers every birthday. | *Brings cake.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, CAKE, { Y: '#ffe76a', R: RED, P: PINK, W: CREAM, C: '#d9a066' }, 790, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 660, 'HAPPY BDAY, JO!', pop01(t, P.t0 + 0.9, 0.3, 2.2), PINK, -0.04, 34)
      sparkles(x, t, 790, 800, P.t0 + 1.0, 7, 160, 0.3)
    } },
  { sign: 'leo', cap: 'Cheers loudest | *for your ideas.*', mood: 'sparkle', star: ST, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      bubble(x, 780, 700, 'GENIUS. YES.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, col: ORANGE, tail: 'bl' })
      L(x, 790, 940, 'YOUR IDEA: LEGENDARY', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, 0.04, 30)
    } },
  { sign: 'virgo', cap: 'Catches the typo | *before the boss does.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      if (pop01(t, P.t0 + 0.2, 0.3, 2) > 0.5) swapLabel(x, 790, 780, lt, 1.0, 'QUATERLY REPORT', 'QUARTERLY ✓', { size: 32, fromBg: BONE, toBg: MINT })
      L(x, 790, 990, 'YOU: SAVED', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, 0.04, 34)
    } },
  { sign: 'libra', cap: 'Ends every lunch debate. | *Peacefully.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      L(x, 790, 720, 'TACOS?', pop01(t, P.t0 + 0.2, 0.3, 2), ORANGE, -0.05, 38)
      L(x, 790, 840, 'PASTA?', pop01(t, P.t0 + 0.5, 0.3, 2), BONE, 0.05, 38)
      L(x, 790, 1020, 'BOTH. FRIDAY. ✓', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.03, 34)
    } },
  { sign: 'scorpio', cap: 'Knows what you need | *before you ask.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'here. a stapler.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, col: PINK, tail: 'bl' })
      L(x, 790, 920, 'YOU: …HOW?', pop01(t, P.t0 + 1.3, 0.3, 2.4), BONE, 0.04, 36)
    } },
  { sign: 'sagittarius', cap: 'Always up for | *the team outing.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.6, 1.2, 1.8],
    front(x, t, lt, P) {
      L(x, 790, 720, 'BOWLING?', pop01(t, P.t0 + 0.2, 0.3, 2), LAV, -0.04, 40)
      L(x, 790, 860, 'IN!!', pop01(t, P.t0 + 0.6, 0.3, 2.2), GOLD, 0.05, 48)
      L(x, 790, 1040, 'ALSO KARAOKE AFTER', pop01(t, P.t0 + 1.5, 0.3, 2.4), BONE, -0.03, 28)
    } },
  { sign: 'capricorn', cap: 'Has a plan | *for every deadline.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      paper(x, 780, 820, pop01(t, P.t0 + 0.2, 0.3, 2), ['plan A ✓', 'plan B ✓', 'plan C (snacks)'], { head: 'DEADLINE', headBg: MINT, w: 330, size: 30, rot: -0.03 })
      L(x, 790, 1090, 'PANIC: CANCELLED', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, 0.04, 30)
    } },
  { sign: 'aquarius', cap: 'Fixes problems | *nobody else spotted.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      if (pop01(t, P.t0 + 0.2, 0.3, 2) > 0.5) swapLabel(x, 790, 780, lt, 1.0, 'PROBLEM: ???', 'SOLVED ✓', { size: 38, toBg: SKYB })
      L(x, 790, 990, 'TEAM: WHAT PROBLEM?', pop01(t, P.t0 + 1.6, 0.3, 2.4), BONE, 0.04, 28)
    } },
  { sign: 'pisces', cap: 'Notices when | *you’re having a day.*', mood: 'heart', tears: lt => lt < 0.9 ? 1 : 2, star: ST,
    front(x, t, lt, P) {
      drawBits(x, MUG, { S: '#d8dbe8', W: CREAM, P: PINK, H: CREAM }, 790, 860, 22 * pop01(t, P.t0 + 0.3, 0.3, 2))
      L(x, 790, 660, 'TEA FOR YOU ♡', pop01(t, P.t0 + 1.0, 0.3, 2.2), LAV, -0.04, 34)
      hearts(x, t, 380, 760, P.t0 + 1.3, { n: 4, life: 1.4, spread: 160, cell: 7, seed: 4 })
    } },
]

const F = makeFilm({
  id: 'r2a0360', key: 'G', accent: ACC, ending: 'group',
  title: 'Why coworkers | love *each sign.*',
  cameos: CAMEOS,
  group: {
    cap: 'Every team needs | *all twelve.*',
    draw(x, t, lt) { label(x, 540, 760, 'TEAM: COMPLETE ✓', pop01(t, t - lt + 1.2, 0.35, 2.4), { size: 50, bg: GOLD, rot: -0.03, font: MONO, weight: 700 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
