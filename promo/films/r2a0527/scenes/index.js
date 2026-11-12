// r2a0527: star_advice, ADVICE SOLO, "How to cheer up | *an Aquarius.*" (~43 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole film (makeFilm solo mode, 9 cards): a relatable Aquarius truth + a warm reframe, one light gag each.
// Ending: group (the group beat is the punchline).
//   0.0–3.6    hook
//   3.6–37.8   ask about the odd hobby, then listen · give them space · send a strange fact · join their cause for an hour
//              · a field trip, not a pep talk · let them be odd · say yes to the midnight idea · ask about their chart
//              · let them go, they come back with a theory
//  37.8        "Weird is welcome. | *Always.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO, GLYPH_FONT,
} from '../../signs3kit.js'

const CREAM = '#fff8ea', RED = '#e23d4e', BROWN = '#8a4a2e', SLATE = '#9aa5c4', AQUA = '#6fc3ff', ORANGE = '#ffb34a'

function phone(x, cx, cy, k, head, msg, col = AQUA) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-132, -202, 276, 420)
  x.fillStyle = INK; x.fillRect(-144, -214, 288, 428)
  x.fillStyle = '#2a2350'; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = '#140c30'; x.fillRect(-120, -178, 240, 356)
  x.fillStyle = MINT; x.fillRect(-108, -164, 216, 52); x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -137)
  if (msg) { const ls = msg.split('|'); x.fillStyle = col; x.fillRect(-106, -70, 212, 40 + ls.length * 44); x.fillStyle = INK; x.font = `800 30px ${INTER}`; ls.forEach((l, i) => x.fillText(l.trim(), 0, -28 + i * 44)) }
  x.restore()
}
const PLANET = ['....YYYY....', '..YYYYYYYY..', '.YYOYYYYYYY.', 'RRRRRRRRRRRR', '.YYYYYYOYYY.', '..YYYYYYYY..', '....YYYY....']
const SIGNBOARD = ['WWWWWWWWWWWW', 'WWWWWWWWWWWW', 'WWWWWWWWWWWW', 'WWWWWWWWWWWW', '.....BB.....', '.....BB.....', '.....BB.....', '.....BB.....', '.....BB.....']
const SCOPE = ['..........KK', '........KSSK', '......KSSSK.', '....KSSSK...', '..KSSSK.....', 'KSSSK.......', '.KK..B......', '....BB......', '...B..B.....', '..B....B....']
const ANT = ['B.....B', '.K...K.', '..K.K..', '...K...']
const BULB = ['..YYY..', '.YYWYY.', 'YYYWYYY', 'YYYYYYY', '.YYYYY.', '..GGG..', '..GGG..', '...G...']
const WHEEL = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
function wheel(x, cx, cy, r, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.3)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { x.fillStyle = WHEEL[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, i / 12 * Math.PI * 2, (i + 1) / 12 * Math.PI * 2); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, r * 0.6, 0, Math.PI * 2); x.fill()
  x.restore()
}

const S = 'aquarius'
const CAMEOS = [
  { sign: S, cap: 'Ask about the odd hobby. | *Then listen.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.1],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'so, about | CLOUDS…', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, col: AQUA, tail: 'bl' })
      const m = 1 + Math.floor(clamp((lt - 0.6) / 1.4) * 89)
      label(x, 790, 1000, `TALKING: ${m} MIN`, pop01(t, P.t0 + 0.8, 0.3, 2), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1110, 'THEY’RE GLOWING', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Don’t crowd them. | *Space is love.*', mood: 'happy', star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, PLANET, { Y: LAV, O: '#9a7be0', R: GOLD }, 800 + Math.sin(t) * 10, 860, 26 * k, { rot: -0.2 })
      x.save(); x.globalAlpha = 0.5 * clamp(k); x.strokeStyle = BONE; x.lineWidth = 4; x.setLineDash([12, 14]); x.beginPath(); x.ellipse(370, 880, 220, 220, 0, 0, Math.PI * 2); x.stroke(); x.restore()
      label(x, 790, 1100, 'ORBIT: RESPECTED', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Send a strange fact. | *Instant smile.*', mood: lt => lt > 1.2 ? 'wide' : 'neutral', look: [1, 0], star: { x: -170 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 790, 870, pop01(t, P.t0 + 0.2, 0.3, 2), 'FROM: YOU', lt > 0.6 ? 'octopuses | have three | hearts' : '')
      if (lt > 1.2) bubble(x, 420, 620, 'TELL ME | MORE', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 36, col: MINT, tail: 'bc' })
    } },
  { sign: S, cap: 'Join their cause. | *Even for an hour.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, SIGNBOARD, { W: CREAM, B: BROWN }, 800, 860, 24 * k, { rot: Math.sin(t * 3) * 0.05 })
      if (k > 0.5) { x.save(); x.translate(800, 788); x.rotate(Math.sin(t * 3) * 0.05); x.fillStyle = INK; x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('SAVE THE', 0, -20); x.fillText('SNAILS', 0, 22); x.restore() }
      label(x, 790, 1110, 'PROTEST SIZE: 2', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Skip the pep talk. | *Plan a field trip.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, SCOPE, { K: INK, S: AQUA, B: SLATE }, 800, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 640, 'TONIGHT: METEORS', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 880, 700, P.t0 + 1.4, 6, 120, 0.3)
    } },
  { sign: S, cap: 'Let them be odd. | *It’s the best part.*', mood: 'wink', star: { x: -150 }, hops: [1.0],
    front(x, t, lt, P, F) {
      drawBits(x, ANT, { B: PINK, K: INK }, F.x, F.top - 60, 30 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: Math.sin(t * 4) * 0.08 })
      label(x, 790, 760, 'NEW LOOK: ANTENNAE', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 28, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 960, 'love it.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 44, col: MINT, tail: 'bl' })
    } },
  { sign: S, cap: 'Midnight idea? | *Say yes.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, -1], star: { x: -170 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, BULB, { Y: GOLD, W: '#fff6c0', G: SLATE }, 800, 760, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      sparkles(x, t, 800, 760, P.t0 + 0.4, 7, 140, 0.1)
      bubble(x, 790, 1040, 'what if we | built a kite?', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: S, cap: 'Ask about their chart. | *Get comfy.*', mood: 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      wheel(x, 790, 850, 140, pop01(t, P.t0 + 0.2, 0.3, 2), t)
      const h = 1 + Math.floor(clamp((lt - 0.4) / 1.5) * 2)
      label(x, 790, 1090, `EXPLAINING: HOUR ${h}`, pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 32, bg: AQUA, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Give them a minute. | *They’ll be back.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      phone(x, 790, 870, pop01(t, P.t0 + 0.2, 0.3, 2), '♒︎ NEW MESSAGE', lt > 1.0 ? 'ok hear me | out: a new | theory' : '', LAV)
      hearts(x, t, 560, 800, P.t0 + 1.3, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 2 })
    } },
]

const F = makeFilm({
  id: 'r2a0527', key: 'F', accent: AQUA, solo: S, ending: 'group',
  title: 'How to cheer up | *an Aquarius.*',
  cameos: CAMEOS,
  group: { cap: 'Weird is welcome. | *Always.*', mood: 'sparkle' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
