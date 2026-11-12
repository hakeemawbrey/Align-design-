// r2t0421: star_talk, SOLO, "Aries when mad | *be like.*" (~45 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole way: nine mad Aries moments, each pushed to the extreme. Ending: callback.
//   0.0–3.6    "Aries when mad | *be like.*"
//   3.6–37.8   lapped a slow walker · took the microwave personally · texted so fast the keys smoked
//              · lost one game, demanded best of 99 · told to calm down, kettle mode · match said "k", wrote an essay
//              · stubbed a toe, challenged the couch · won the argument in the shower, three days later
//              · mad for four minutes, then: tacos?
//  37.8        "Zero to a hundred. | Back to *zero.*"
//  41.2        CALLBACK: "Aries and the couch? | *Besties now.*"  the couch comes back, Aries hugs it.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, notes,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CREAM = '#fff4e2', RED = '#e23d4e', ORANGE = '#ffb34a', GREY = '#9aa5c4', PURP = '#6b62a8', DEEP = '#2a2350'
const L = (x, cx, cy, text, k, bg = GOLD, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
const B = (x, cx, cy, text, k, o = {}) => bubble(x, cx, cy, text, k, { size: 44, ...o })
const ST = { x: -170 }

/** a phone with a header strip and chat pills: lines = [[text, colour, k, right?], …] */
function phone(x, cx, cy, k, { head = '', headCol = MINT, lines = [], rot = 0.05 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = DEEP; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  if (head) { x.fillStyle = headCol; x.fillRect(-100, -156, 200, 46); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -132) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach(([txt, col, kk, right], i) => {
    if (kk <= 0.01) return
    x.font = `700 26px ${MONO}`; const w = x.measureText(txt).width + 24
    x.save(); x.translate(right ? 96 - w : -96, -60 + i * 64); x.scale(kk, kk)
    x.fillStyle = col; x.fillRect(0, -22, w, 44); x.fillStyle = INK; x.fillText(txt, 12, 2)
    x.restore()
  })
  x.restore()
}
/** soft pixel puffs rising from (cx, cy) after t0 (steam, sighs, dust) */
function puffs(x, t, cx, cy, t0, { n = 5, col = '#e6e1f2', cell = 14, rise = 200, spread = 90, seed = 0 } = {}) {
  if (t < t0) return
  for (let i = 0; i < n; i++) {
    const ph = (((t - t0) * 0.9 + i / n) % 1 + 1) % 1
    const px = cx + Math.sin(i * 2.1 + seed) * spread * 0.5 + Math.sin(ph * 5 + i) * 12, py = cy - ph * rise, r = cell * (0.8 + ph * 1.4)
    x.save(); x.globalAlpha = Math.sin(Math.PI * ph) * 0.9
    x.fillStyle = INK; x.fillRect(px - r - 4, py - r * 0.7 - 4, 2 * r + 8, 1.4 * r + 8)
    x.fillStyle = col; x.fillRect(px - r, py - r * 0.7, 2 * r, 1.4 * r)
    x.restore()
  }
}
/** a sticky note / paper card with lines of text */
function note(x, cx, cy, k, lines, { w = 300, bg = '#ffe27a', size = 34, rot = -0.06, font = INTER, weight = 800 } = {}) {
  if (k <= 0.01) return
  const lh = size * 1.55, h = lines.length * lh + 50
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16); x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = INK; x.font = `${weight} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, 0, -h / 2 + 25 + lh * (i + 0.5)))
  x.restore()
}
/** a birth-chart wheel */
const WHEEL = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
function chart(x, cx, cy, r, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.3)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { x.fillStyle = WHEEL[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, (i / 12) * Math.PI * 2, ((i + 1) / 12) * Math.PI * 2); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, r * 0.62, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; for (const a of [0.4, 2.6, 4.5]) x.fillRect(Math.cos(a) * r * 0.4 - 8, Math.sin(a) * r * 0.4 - 8, 16, 16)
  x.restore()
}
/** a little anger mark (four red corner ticks) */
function vein(x, cx, cy, k, t) {
  if (k <= 0.01) return
  const s = 9 * k * (1 + 0.15 * Math.sin(t * 14))
  x.save(); x.translate(cx, cy)
  for (const [dx, dy] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) { x.fillStyle = INK; x.fillRect(dx * s * 1.6 - s * 0.9, dy * s * 1.6 - s * 0.9, s * 1.8, s * 1.8); x.fillStyle = RED; x.fillRect(dx * s * 1.6 - s * 0.6, dy * s * 1.6 - s * 0.6, s * 1.2, s * 1.2) }
  x.restore()
}
const ACC = '#ff6b5a'
const WALKER = ['..HHHH..', '.HHHHHH.', '.FFFFFF.', '.FKFFKF.', '.FFFFFF.', '..FFFF..', '.CCCCCC.', 'CCCCCCCC', 'CCCCCCCC', 'CCCCCCCC', '.CC..CC.', '.CC..CC.']
const WALKER_C = { H: GREY, F: '#d9c4b0', K: INK, C: LAV }
const MICRO = ['GGGGGGGGGGGGGG', 'GWWWWWWWWGDDDG', 'GWWWWWWWWGDYDG', 'GWWWWWWWWGDDDG', 'GWWWWWWWWGDSDG', 'GWWWWWWWWGDSDG', 'GWWWWWWWWGDDDG', 'GGGGGGGGGGGGGG', '.K..........K.']
const MICRO_C = { G: GREY, W: '#ffe9a8', D: DEEP, Y: MINT, S: BONE, K: INK }
const DIE = ['WWWWWWW', 'WKWWWKW', 'WWWWWWW', 'WWWKWWW', 'WWWWWWW', 'WKWWWKW', 'WWWWWWW']
const COUCH = ['.RRRRRRRRRRRR.', 'RRRRRRRRRRRRRR', 'RRDDDDDDDDDDRR', 'RRDDDDDDDDDDRR', 'RRRRRRRRRRRRRR', 'RRRRRRRRRRRRRR', '.K..........K.']
const COUCH_C = { R: '#8f7ad8', D: '#b7a6ff', K: INK }
const SHOWER = ['......PPPP', '.........P', '.........P', '..HHHHH..P', '.HHHHHHHPP', 'HHHHHHHHH.', '.D.D.D.D..']
const SHOWER_C = { P: GREY, H: '#c9d3ea', D: SKYB }
const TACO = ['...YYYYYY...', '..YGGRRGGY..', '.YGRMMMMRGY.', 'YYYYYYYYYYYY', '.YYYYYYYYYY.']
const TACO_C = { Y: '#f2c75c', G: '#5fd068', R: '#e23d4e', M: '#8a4a2e' }

function scroll(x, cx, top, len, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, top); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-124, -8, 248, len + 16)
  x.fillStyle = CREAM; x.fillRect(-116, 0, 232, len)
  x.fillStyle = '#c9b8a8'; for (let y = 22; y < len - 10; y += 26) x.fillRect(-96, y, 150 + ((y * 37) % 40), 8)
  x.fillStyle = INK; x.fillRect(-136, -20, 272, 26)
  x.restore()
}

const CAMEOS = [
  // 1 · out: a slow walker
  { sign: 'aries', cap: 'Slow walker ahead? | Aries *lapped them.*', mood: 'squint', star: { x: -170 },
    front(x, t, lt, P) {
      const run = ease.inOutCubic(prog(lt, 0.3, 1.3))
      drawBits(x, WALKER, WALKER_C, 790, 960, 20 * pop01(t, P.t0 + 0.15, 0.3, 2))
      bubble(x, 790, 700, 'just | strolling…', pop01(t, P.t0 + 0.35, 0.25, 2.2), { size: 36, col: LAV, tail: 'bc' })
      L(x, 600, 1130, 'LAP 2 OF 5', pop01(t, P.t0 + 1.3, 0.3, 2.2), GOLD, -0.05, 38)
      puffs(x, t, 470, 1110, P.t0 + 0.3 + run * 0, { n: 4, cell: 12, rise: 80, spread: 140, col: '#e0c9a8' })
    } },
  // 2 · home: the microwave
  { sign: 'aries', cap: 'Microwave said 2:00. | Took it *personally.*', mood: lt => lt < 1.0 ? 'wide' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      drawBits(x, MICRO, MICRO_C, 790, 900, 22 * k, { rot: 0.02 * Math.sin(t * 20) * (lt > 1.0 ? 1 : 0) })
      L(x, 790, 700, lt < 1.0 ? '2:00' : '1:59', k, MINT, 0.04, 52)
      bubble(x, 420, 580, 'TWO?!', pop01(t, P.t0 + 0.9, 0.25, 2.4), { size: 58, tail: 'bc' })
      vein(x, 470, 720, pop01(t, P.t0 + 1.0, 0.25, 2), t)
    } },
  // 3 · phone: the angry text
  { sign: 'aries', cap: 'Texted so fast | the keys *smoked.*', mood: 'squint', look: [1, 1], star: { x: -180 },
    front(x, t, lt, P) {
      const lines = ['WHY WOULD', 'YOU EVEN', 'SAY THAT', '!!!!!!!!'].map((s, i) => [s, i === 3 ? RED : PINK, pop01(t, P.t0 + 0.3 + i * 0.22, 0.2, 2), true])
      phone(x, 790, 880, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'TYPING…', headCol: ORANGE, lines })
      puffs(x, t, 790, 700, P.t0 + 0.9, { n: 6, cell: 16, rise: 220, spread: 220 })
      L(x, 790, 1130, 'KEYBOARD: TOAST', pop01(t, P.t0 + 1.4, 0.3, 2.2), ORANGE, -0.04, 34)
    } },
  // 4 · friends: game night
  { sign: 'aries', cap: 'Lost one game. | Demanded *best of 99.*', mood: lt => lt < 0.8 ? 'wide' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const roll = prog(lt, 0.2, 0.9)
      drawBits(x, DIE, { W: CREAM, K: INK }, 720, 940 - Math.sin(Math.PI * roll) * 160, 20 * pop01(t, P.t0 + 0.15, 0.3, 2), { rot: roll * 6.3 })
      drawBits(x, DIE, { W: CREAM, K: INK }, 870, 960 - Math.sin(Math.PI * roll) * 110, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -roll * 5 + 0.2 })
      L(x, 790, 680, 'YOU LOSE', pop01(t, P.t0 + 0.6, 0.3, 2), BONE, 0.05, 40)
      bubble(x, 460, 600, 'AGAIN.', pop01(t, P.t0 + 1.0, 0.25, 2.4), { size: 56, tail: 'bc' })
      L(x, 790, 1130, 'GAME 47 OF 99', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, -0.04, 36)
    } },
  // 5 · work: "calm down"
  { sign: 'aries', cap: 'Told to calm down. | *Kettle mode.*', mood: lt => lt < 0.9 ? 'neutral' : 'squint', star: { x: -150, y: 30 },
    front(x, t, lt, P, F) {
      bubble(x, 790, 620, 'just calm | down?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, col: LAV, tail: 'bl' })
      puffs(x, t, F.x - 70, F.top - 10, P.t0 + 0.9, { n: 4, cell: 14, rise: 190, spread: 40, seed: 1 })
      puffs(x, t, F.x + 70, F.top - 10, P.t0 + 0.9, { n: 4, cell: 14, rise: 190, spread: 40, seed: 3 })
      bubble(x, 790, 930, 'WHEEEEEE', pop01(t, P.t0 + 1.1, 0.25, 2.4), { size: 56, col: '#ffd0c4', tail: 'bl' })
      L(x, 790, 1110, 'TEMP: 100°', pop01(t, P.t0 + 1.5, 0.3, 2.2), RED, 0.04, 38, CREAM)
    } },
  // 6 · Align: a match replies "k"
  { sign: 'aries', cap: 'Match replied “k.” | Aries wrote *an essay.*', mood: lt => lt < 0.8 ? 'wide' : 'squint', look: [1, 0], star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      L(x, 790, 560, '✦ MATCH: LIBRA', pop01(t, P.t0 + 0.15, 0.3, 2), GOLD, -0.04, 30)
      bubble(x, 790, 680, 'k', pop01(t, P.t0 + 0.3, 0.25, 2.4), { size: 64, col: LAV, tail: 'bc' })
      scroll(x, 790, 780, lerp(40, 380, ease.outCubic(prog(lt, 0.8, 1.8))), pop01(t, P.t0 + 0.75, 0.3, 2))
      L(x, 790, 1130, 'PAGE 1 OF 12', pop01(t, P.t0 + 1.5, 0.3, 2.2), PINK, 0.05, 36)
    } },
  // 7 · home: the stubbed toe
  { sign: 'aries', cap: 'Stubbed a toe. | Challenged *the couch.*', mood: lt => lt < 0.7 ? 'wide' : 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      drawBits(x, COUCH, COUCH_C, 790, 1010, 24 * pop01(t, P.t0 + 0.15, 0.3, 2))
      L(x, 560, 1150, 'OW.', pop01(t, P.t0 + 0.3, 0.25, 2.4), BONE, -0.08, 40)
      bubble(x, 790, 700, 'you and me, | sofa.', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 44, tail: 'bl' })
      L(x, 790, 860, 'ROUND 1', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, 0.06, 38)
    } },
  // 8 · the shower, three days later
  { sign: 'aries', cap: 'Lost the argument. | Won it *in the shower.*', mood: lt => lt < 1.0 ? 'squint' : 'sparkle', look: [1, -1], star: { x: -170, y: 40 },
    back(x, t, lt, P) {
      drawBits(x, SHOWER, SHOWER_C, 430, 600, 18 * pop01(t, P.t0 + 0.1, 0.3, 2))
      x.save(); x.fillStyle = SKYB; x.globalAlpha = 0.7 * clamp(lt * 2)
      for (let i = 0; i < 14; i++) { const ph = ((t * 1.6 + i / 14) % 1), dx = 300 + (i * 37) % 200; x.fillRect(dx, 680 + ph * 380, 6, 22) }
      x.restore()
    },
    front(x, t, lt, P) {
      L(x, 790, 600, '3 DAYS LATER', pop01(t, P.t0 + 0.25, 0.3, 2), BONE, 0.05, 34)
      bubble(x, 790, 820, 'AND ANOTHER | THING!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 50, tail: 'bl' })
      L(x, 790, 1060, 'WINNER: ARIES', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, -0.05, 36)
    } },
  // 9 · four minutes later
  { sign: 'aries', cap: 'Mad for four minutes. | Then: *tacos?*', mood: lt => lt < 1.1 ? 'squint' : 'heart', star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.5, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      L(x, 790, 640, lt < 1.1 ? 'MAD: 3:59' : 'MAD: 0:00', pop01(t, P.t0 + 0.15, 0.3, 2), lt < 1.1 ? RED : MINT, 0.04, 44, lt < 1.1 ? CREAM : INK)
      if (lt < 1.1) vein(x, 470, 720, pop01(t, P.t0 + 0.2, 0.25, 2), t)
      const k = pop01(t, P.t0 + 1.1, 0.35, 2.2)
      drawBits(x, TACO, TACO_C, 790, 880, 22 * k, { rot: 0.05 })
      bubble(x, 790, 1080, 'tacos? | love you!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 42, tail: 'bl' })
      sparkles(x, t, 790, 880, P.t0 + 1.2, 7, 170, 0.3)
    } },
]

const F = makeFilm({
  id: 'r2t0421', key: 'C', accent: ACC, solo: 'aries', ending: 'callback',
  title: 'Aries when mad | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Zero to a hundred. | Back to *zero.*', mood: 'sparkle' },
  last: {
    text: 'Aries and the couch? | *Besties now.*',
    draw(x, t, lt) {
      const t0 = t - lt, k = pop01(t, t0 + 0.3, 0.45, 1.8)
      if (k <= 0.01) return
      drawBits(x, COUCH, COUCH_C, 540, 1290, 40 * k)
      signChar(x, t, 'aries', 540, 1050, 340 * k, { mood: 'heart', seed: 33, hops: [t0 + 1.2, t0 + 2.2] })
      label(x, 540, 1480, 'BEST FRIEND', pop01(t, t0 + 1.2, 0.3, 2.2), { size: 48, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 540, 900, t0 + 1.0, { n: 8, life: 2.0, spread: 520, cell: 9, seed: 5 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
