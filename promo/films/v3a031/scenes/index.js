// v3a031: star_advice, ADVICE SOLO, "How to love | a Pisces." (~45 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole way through (makeFilm solo mode, 9 cards): how to love a Pisces, warm and a little silly. Pisces
// cries in every card (happy tears, mostly).
//   0.0–3.6    "How to love | *a Pisces.*"  One big Pisces pops in (already teary), then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              remember the tiny thing they said once (a gift: YOU REMEMBERED?!) · the sad film: bring tissues (BOX 3 OF 5)
//              · let them daydream (a castle in a thought cloud) · send the song that reminded you of them (notes)
//              · take their art seriously (an easel: MUSEUM QUALITY) · say it out loud, often (three "love you"s)
//              · make room for the strays (three kittens) · ask about their chart, hear all of it (PART 1 OF 9)
//              · hug first, fix later (Scorpio hug)
//  37.8        "Feel everything. | *Together.*"  Pisces comes back, big.
//  41.2        callback: "Box 5 of 5. | *Happy tears.*" (the tissue box from card two comes back)
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, notes,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const SEA = '#7fd3c8', WOOD = '#c98f2a', RED = '#e23d4e'
const S = 'pisces'

const GIFT = [
  '...RR.RR...',
  '....RRR....',
  'PPPPPRPPPPP',
  'PPPPPRPPPPP',
  '.PPPPRPPPP.',
  '.PPPPRPPPP.',
  '.PPPPRPPPP.',
  '.PPPPRPPPP.',
  '.PPPPRPPPP.',
]
// a tissue box with one tissue poking up
function tissues(x, t, cx, cy, k, txt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const w = 1 + 0.06 * Math.sin(t * 5)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-40, -70); x.quadraticCurveTo(-10 * w, -170, 10, -150); x.quadraticCurveTo(50, -140, 40, -70); x.fill()
  x.fillStyle = '#ffffff'; x.beginPath(); x.moveTo(-32, -72); x.quadraticCurveTo(-8 * w, -158, 8, -140); x.quadraticCurveTo(40, -134, 32, -72); x.fill()
  x.fillStyle = INK; x.fillRect(-150, -80, 300, 170)
  x.fillStyle = SEA; x.fillRect(-142, -72, 284, 154)
  x.fillStyle = '#5fb3a8'; x.fillRect(-60, -72, 120, 18)
  x.fillStyle = INK; x.font = `700 32px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, 0, 20)
  x.restore()
}
// a thought cloud with a pixel castle in it
const CASTLE = [
  'T.T...T...T.T',
  'TTT..TTT..TTT',
  'TTT..TTT..TTT',
  'TTTTTTTTTTTTT',
  'TTTTTTDTTTTTT',
  'TTTTTDDDTTTTT',
  'TTTTTDDDTTTTT',
]
function thought(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const puffs = [[-120, 0, 80], [-40, -50, 95], [70, -40, 90], [140, 20, 70], [40, 50, 80], [-70, 55, 70]]
  x.fillStyle = INK; for (const [px, py, r] of puffs) { x.beginPath(); x.arc(px, py, r + 7, 0, Math.PI * 2); x.fill() }
  x.fillStyle = '#f4ecff'; for (const [px, py, r] of puffs) { x.beginPath(); x.arc(px, py, r, 0, Math.PI * 2); x.fill() }
  for (const [px, py, r] of [[-170, 150, 20], [-220, 210, 13]]) { x.fillStyle = INK; x.beginPath(); x.arc(px, py, r + 5, 0, Math.PI * 2); x.fill(); x.fillStyle = '#f4ecff'; x.beginPath(); x.arc(px, py, r, 0, Math.PI * 2); x.fill() }
  x.restore()
  drawBits(x, CASTLE, { T: LAV, D: INK }, cx + 10 * k, cy + 6 * k, 15 * k)
  drawBits(x, ['.R.', 'RRR'], { R: PINK }, cx + 10 * k, cy - 70 * k + 3 * Math.sin(t * 4), 10 * k)
}
// a phone with a little message
function phoneMsg(x, cx, cy, k, msg) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-124, -190, 248, 380)
  x.fillStyle = '#2a2350'; x.fillRect(-114, -180, 228, 360)
  x.fillStyle = '#140c30'; x.fillRect(-102, -160, 204, 320)
  x.fillStyle = SEA; x.fillRect(-92, -60, 184, 110)
  x.fillStyle = INK; x.font = `800 24px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  msg.split('|').forEach((l, i) => x.fillText(l.trim(), 0, -24 + i * 36))
  x.fillStyle = GOLD; x.fillRect(-60, 80, 120, 40); x.fillStyle = INK; x.beginPath(); x.moveTo(-14, 88); x.lineTo(16, 100); x.lineTo(-14, 112); x.fill()
  x.restore()
}
// an easel with a wobbly painting
function easel(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.save(); x.rotate(0.12); x.fillRect(-14, -160, 28, 360); x.restore(); x.save(); x.rotate(-0.12); x.fillRect(-14, -160, 28, 360); x.restore()
  x.fillStyle = INK; x.fillRect(-150, -150, 300, 230)
  x.fillStyle = '#fff4e2'; x.fillRect(-140, -140, 280, 210)
  x.fillStyle = SKYB; x.fillRect(-140, -140, 280, 110)
  x.fillStyle = SEA; x.fillRect(-140, -30, 280, 100)
  x.fillStyle = GOLD; x.beginPath(); x.arc(70, -90, 30, 0, Math.PI * 2); x.fill()
  drawBits(x, ['..FF.', 'FFFFF', '..FF.'], { F: PINK }, -40, 20, 16)
  x.fillStyle = INK; x.fillRect(-160, 80, 320, 22); x.fillStyle = WOOD; x.fillRect(-154, 84, 308, 14)
  x.restore()
}
const KITTEN = ['C...C', 'CC.CC', 'CCCCC', 'CkCkC', 'CCpCC', '.CCC.']
// a long scroll unrolling
function scroll(x, cx, cy, k, open) {
  if (k <= 0.01) return
  const L = lerp(30, 360, open)
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-130, -180, 260, L + 8)
  x.fillStyle = '#fff4e2'; x.fillRect(-122, -176, 244, L)
  x.fillStyle = 'rgba(27,18,54,0.35)'; for (let i = 0; i < Math.floor((L - 30) / 34); i++) x.fillRect(-100, -150 + i * 34, i % 3 === 2 ? 130 : 200, 10)
  x.fillStyle = INK; x.fillRect(-150, -200, 300, 34); x.fillRect(-150, -190 + L, 300, 34)
  x.fillStyle = WOOD; x.fillRect(-144, -194, 288, 22); x.fillRect(-144, -184 + L, 288, 22)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Remember the tiny thing | *they said once.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -210 }, tears: lt => lt > 1.2 ? 2 : 1, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, GIFT, { R: GOLD, P: PINK }, 790, 950, 24 * k)
      if (lt > 1.1) sparkles(x, t, 790, 900, P.t0 + 1.1, 8, 180, 0.3)
      label(x, 780, 690, 'YOU REMEMBERED?!', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.05 })
    } },
  { sign: S, cap: 'Sad film night? | *Bring tissues.*', mood: 'sparkle', look: [1, 0], star: { x: -210 }, tears: 3,
    front(x, t, lt, P) {
      tissues(x, t, 790, 980, pop01(t, P.t0 + 0.2, 0.35, 2), 'BOX 3 OF 5')
      label(x, 790, 680, 'IT’S THE OPENING SCENE', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 26, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'They’re daydreaming. | *Don’t interrupt.*', mood: 'sparkle', look: [1, -1], star: { x: -200, y: 60 }, tears: 1,
    front(x, t, lt, P) {
      thought(x, t, 700, 720, pop01(t, P.t0 + 0.3, 0.4, 1.8))
      label(x, 780, 1120, 'BACK IN 5 BUSINESS DAYS', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 26, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Send the song | *that’s so them.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: { x: -210 }, tears: 2, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phoneMsg(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), 'this made me | think of you')
      if (lt > 0.8) notes(x, t, 790, 760, { n: 5, cell: 9, col: PINK, alpha: clamp((lt - 0.8) * 3), seed: 2 })
      label(x, 790, 1120, 'ON REPEAT. FOREVER.', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Take their art | *seriously.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -220 }, tears: 1,
    front(x, t, lt, P) {
      easel(x, t, 790, 890, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 640, 'MUSEUM QUALITY', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Say it out loud. | *Often.*', mood: 'heart', look: [1, 0], star: { x: -210 }, tears: 2, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      bubble(x, 760, 640, 'love you', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, tail: 'bl' })
      bubble(x, 800, 800, 'love you', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 36, col: PINK, tail: 'bl' })
      bubble(x, 760, 960, 'LOVE YOU', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, col: GOLD, tail: 'bl' })
      label(x, 790, 1120, 'NEVER TOO MUCH', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'They’ll bring home strays. | *Make room.*', mood: 'sparkle', look: [1, 1], star: { x: -220 }, tears: 2,
    front(x, t, lt, P) {
      const cols = [{ C: '#f2a65a', k: INK, p: PINK }, { C: '#9a9ab0', k: INK, p: PINK }, { C: '#f4ecff', k: INK, p: PINK }]
      for (let i = 0; i < 3; i++) {
        const k = pop01(t, P.t0 + 0.3 + i * 0.35, 0.35, 2.2)
        drawBits(x, KITTEN, cols[i], 620 + i * 150, 1020 - (i === 1 ? 20 : 0) - 8 * Math.abs(Math.sin(t * 4 + i)), 22 * k)
      }
      label(x, 790, 720, 'FAMILY OF SIX NOW', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Ask about their chart. | *Hear all of it.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -210 }, tears: 1, hops: [1.0],
    front(x, t, lt, P) {
      scroll(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), ease.inOutCubic(prog(lt, 0.4, 1.4)))
      label(x, 790, 1150, 'PART 1 OF 9', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: SEA, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Hug first. | *Fix it later.*', mood: lt => lt > 1.0 ? 'heart' : 'wide', star: { x: -120, y: 20, s: 260 }, tears: 3,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), close = ease.inOutCubic(prog(lt, 0.5, 1.0))
      if (k > 0.01) signChar(x, t, 'scorpio', lerp(860, 690, close), 900, 240 * k, { mood: 'happy', look: [-1, 0], seed: 21, glyph: false, hops: [P.t0 + 1.1] })
      hearts(x, t, 560, 760, P.t0 + 1.0, { n: 6, life: 1.6, spread: 200, cell: 7, seed: 5 })
      label(x, 560, 1130, 'HUG LENGTH: YES', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3a031', key: 'D', accent: SEA, solo: S, ending: 'callback',
  title: 'How to love | *a Pisces.*',
  cameos: CAMEOS,
  group: { cap: 'Feel everything. | *Together.*', mood: 'heart' },
  last: {
    text: 'Box 5 of 5. | *Happy tears.*',
    draw(x, t, lt) {
      tissues(x, t, 540, 1080, pop01(t, t - lt + 0.5, 0.4, 2), 'BOX 5 OF 5')
      signChar(x, t, S, 540, 820, 220, { mood: 'heart', pop: pop01(t, t - lt + 0.3, 0.45, 1.8), tears: 3, seed: 9, hops: [t - lt + 1.2] })
      hearts(x, t, 540, 900, t - lt + 1.0, { n: 6, life: 2.0, spread: 300, cell: 7, seed: 2 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
