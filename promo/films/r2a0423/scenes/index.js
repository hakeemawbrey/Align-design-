// r2a0423: star_advice, ADVICE SOLO, "How to encourage | *a Pisces.*" (~51 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole way: nine warm ways to encourage a Pisces, each a truth + a kind reframe; Pisces cries (happy tears) in every card. Ending: lesson.
//   0.0–3.6    "How to encourage | *a Pisces.*"
//   3.6–37.8   praise the dream, then the first step · send a voice note, they'll replay it · their art is good, say it
//              · cry with them first, pep talk second · soft isn't weak (pillow armour) · a match said "you're sweet", help them believe it
//              · small win, tiny party · a quiet spot to recharge (the fishbowl) · believe in them a little louder
//  37.8        "Big heart. | *Bigger dreams.*"
//  41.0        LESSON: "Gentle words go far. | Pisces *keeps every one.*"  HOPE: RESTORED
//  46.9        "Encourage a Pisces. | Get *happy tears.*"
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
const ACC = '#6fc3ff'
const CASTLE = ['K.K...K.K', 'KKK...KKK', 'KWK.K.KWK', 'KKKKKKKKK', 'KWKKWKKWK', 'KKKKDKKKK', 'KKKKDKKKK']
const EASEL = ['FFFFFFFFFF', 'FWWWWWWWWF', 'FWWWOOWWWF', 'FWWOOOOWSF', 'FWWWOOWWWF', 'FWWWWWWWWF', 'FFFFFFFFFF', '..B....B..', '.B......B.', 'B........B']
const PILLOW = ['.PPPPPPPP.', 'PPPPPPPPPP', 'PPWPPPPPPP', 'PPPPPPPPPP', '.PPPPPPPP.']
const CAKE = ['....F....', '....C....', '.PPPPPPP.', 'PPWPPWPPP', 'BBBBBBBBB', '.BBBBBBB.']
const BOWLF = ['..KKKKKKK..', '.K.......K.', 'K.........K', 'KWWWWWWWWWK', 'KWWWWWWWWWK', 'KWWWWWWWWWK', '.KWWWWWWWK.', '..KKKKKKK..']
const MEGA = ['......KK', '....KKYK', 'KKKKYYYK', 'KYYYYYYK', 'KKKKYYYK', '....KKYK', '......KK']
const TISSUE = ['..WWW..', '.WWWWW.', 'BBBBBBB', 'BBBBBBB', 'BBBBBBB']

function wave(x, cx, cy, k, t, played) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -60, 300, 120); x.fillStyle = LAV; x.fillRect(-142, -52, 284, 104)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-120, -22); x.lineTo(-90, 0); x.lineTo(-120, 22); x.fill()
  for (let i = 0; i < 12; i++) { const h = 12 + 30 * Math.abs(Math.sin(i * 1.7 + t * 4)); x.fillStyle = i / 12 < played ? INK : '#8d7fc0'; x.fillRect(-70 + i * 16, -h / 2, 10, h) }
  x.restore()
}

const CAMEOS = [
  // 1 · the dream
  { sign: 'pisces', cap: 'Praise the dream. | *Then the first step.*', mood: 'sparkle', look: [1, -1], tears: 1, star: ST,
    front(x, t, lt, P) {
      note(x, 790, 760, pop01(t, P.t0 + 0.2, 0.3, 2), [' ', ' ', ' ', ' '], { w: 340, bg: LAV, rot: 0.03 })
      drawBits(x, CASTLE, { K: '#ffe27a', W: SKYB, D: '#8a4a2e' }, 790, 760, 26 * pop01(t, P.t0 + 0.35, 0.3, 2))
      L(x, 790, 1080, 'STEP 1 ♡', pop01(t, P.t0 + 1.2, 0.3, 2.2), MINT, -0.04, 44)
      sparkles(x, t, 790, 760, P.t0 + 0.5, 6, 170, 0.3)
    } },
  // 2 · a voice note
  { sign: 'pisces', cap: 'Send a voice note. | They’ll *replay it.*', mood: 'heart', look: [1, 0], tears: 2, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      wave(x, 790, 780, pop01(t, P.t0 + 0.2, 0.3, 2), t, ((lt * 0.9) % 1))
      L(x, 790, 640, '“proud of you”', pop01(t, P.t0 + 0.5, 0.3, 2), BONE, 0.04, 34)
      L(x, 790, 960, `PLAYS: ${Math.min(40, 1 + Math.floor(Math.max(0, lt - 0.5) * 30))}`, pop01(t, P.t0 + 0.7, 0.3, 2.2), PINK, -0.04, 40)
    } },
  // 3 · their art
  { sign: 'pisces', cap: 'Their art is good. | *Say it out loud.*', mood: lt => lt < 1.0 ? 'neutral' : 'heart', look: [1, 0], tears: lt => lt < 1.0 ? 1 : 2, star: ST,
    front(x, t, lt, P) {
      drawBits(x, EASEL, { F: '#c99a2e', W: CREAM, O: ORANGE, S: SKYB, B: '#8a4a2e' }, 790, 900, 24 * pop01(t, P.t0 + 0.15, 0.3, 2), { rot: 0.03 })
      bubble(x, 760, 620, 'it’s | AMAZING.', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 44, tail: 'bl' })
      sparkles(x, t, 790, 880, P.t0 + 1.0, 6, 170, 0.5)
    } },
  // 4 · cry with them first
  { sign: 'pisces', cap: 'Cry with them first. | *Pep talk second.*', mood: 'wide', tears: 3, star: { x: -200 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 760, 960, 200 * k, { mood: 'wide', look: [-1, 0], seed: 19, glyph: false, tears: 2 })
      drawBits(x, TISSUE, { W: CREAM, B: SKYB }, 560, 1110, 22 * pop01(t, P.t0 + 0.5, 0.3, 2))
      L(x, 760, 650, '1. TEARS  2. TALK', pop01(t, P.t0 + 1.2, 0.3, 2.2), LAV, -0.04, 32)
    } },
  // 5 · soft isn't weak
  { sign: 'pisces', cap: 'Remind them: soft | *isn’t weak.*', mood: 'sparkle', tears: 1, star: { x: -170, y: 20 },
    front(x, t, lt, P, F) {
      drawBits(x, PILLOW, { P: PINK, W: '#fff' }, F.x, F.cy + 110, 18 * pop01(t, P.t0 + 0.3, 0.3, 2))
      drawBits(x, PILLOW, { P: LAV, W: '#fff' }, F.x - 10, F.top - 20, 12 * pop01(t, P.t0 + 0.5, 0.3, 2), { rot: -0.1 })
      L(x, 790, 760, 'ARMOUR: PILLOWS', pop01(t, P.t0 + 0.8, 0.3, 2.2), GOLD, 0.04, 36)
      L(x, 790, 960, 'STRENGTH: HUGE', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, -0.04, 36)
    } },
  // 6 · Align: a match's compliment
  { sign: 'pisces', cap: 'Match said “sweet”? | *Help them believe it.*', mood: lt => lt < 1.2 ? 'wide' : 'heart', look: [1, 0], tears: 2, star: ST,
    front(x, t, lt, P) {
      const lines = [['hi :)', LAV, pop01(t, P.t0 + 0.3, 0.2, 2), false], ['you’re sweet', PINK, pop01(t, P.t0 + 0.7, 0.2, 2), false], ['really??', MINT, pop01(t, P.t0 + 1.1, 0.2, 2), true], ['really ♡', PINK, pop01(t, P.t0 + 1.5, 0.2, 2), false]]
      phone(x, 790, 860, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'MATCH · VIRGO', headCol: GOLD, lines })
    } },
  // 7 · small wins
  { sign: 'pisces', cap: 'Small win? | Throw *a tiny party.*', mood: 'sparkle', tears: 2, star: ST, hops: [1.1],
    front(x, t, lt, P) {
      drawBits(x, CAKE, { F: ORANGE, C: CREAM, P: PINK, W: '#fff', B: '#e0a56a' }, 790, 900, 32 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 660, 'WIN: GOT UP ♡', pop01(t, P.t0 + 0.6, 0.3, 2.2), MINT, -0.04, 40)
      sparkles(x, t, 790, 880, P.t0 + 1.0, 9, 200, 0.2, [GOLD, PINK, SKYB])
      L(x, 790, 1110, 'GUESTS: 2', pop01(t, P.t0 + 1.4, 0.3, 2.2), BONE, 0.04, 32)
    } },
  // 8 · a quiet spot
  { sign: 'pisces', cap: 'Give them a quiet spot | *to recharge.*', mood: lt => lt < 0.9 ? 'happy' : 'sleepy', tears: 1, star: { x: 0, y: 10, s: 220 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.1, 0.35, 1.8)
      drawBits(x, BOWLF, { K: INK, W: 'rgba(143,227,255,0.5)' }, 540, 900, 46 * k)
    },
    front(x, t, lt, P) {
      L(x, 540, 600, 'DO NOT TAP ♡', pop01(t, P.t0 + 0.8, 0.3, 2.2), GOLD, -0.03, 40)
      x.save(); x.fillStyle = 'rgba(255,255,255,0.8)'; for (let i = 0; i < 5; i++) { const ph = ((t * 0.6 + i / 5) % 1); x.fillRect(680 + i * 18, 1040 - ph * 260, 12, 12) } x.restore()
    } },
  // 9 · louder
  { sign: 'pisces', cap: 'Believe in them | *a little louder.*', mood: lt => lt < 1.1 ? 'wide' : 'heart', look: [1, 0], tears: lt => lt < 1.1 ? 1 : 3, star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.5, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, MEGA, { K: INK, Y: '#ffe27a' }, 800, 990, 30 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 720, 680, 'YOU GOT | THIS!!', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 52, tail: 'br' })
      hearts(x, t, 400, 820, P.t0 + 1.2, { n: 6, life: 1.8, spread: 220, cell: 8, seed: 3 })
    } },
]

const F = makeFilm({
  id: 'r2a0423', key: 'C', accent: ACC, solo: 'pisces', ending: 'lesson',
  title: 'How to encourage | *a Pisces.*',
  cameos: CAMEOS,
  group: { cap: 'Big heart. | *Bigger dreams.*', mood: 'heart' },
  lesson: { text: 'Gentle words go far. | Pisces *keeps every one.*', chip: 'HOPE: RESTORED' },
  last: {
    text: 'Encourage a Pisces. | Get *happy tears.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 8, life: 2.2, spread: 600, cell: 8, seed: 2 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
