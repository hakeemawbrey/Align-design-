// r2a0348: star_advice, ADVICE SOLO (libra), "How to cheer up | *a Libra.*" (signs3kit social cut, music: lofi · C).
// Ending: lesson ("Libras keep the peace. | *Give some back.*") then "Balance restored. | *Pizza helped.*"
//   nine cards: pick the restaurant for them · bring flowers · let them vent, just nod · the group-chat fight isn't theirs
//   to fix (the scales) · a playlist titled "for you" · plan a cute day · compliment their taste · wait for the real
//   answer (pizza) · loved on unbalanced days too
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', STEEL = '#9aa5c4', ACC = '#ffa8d8', BROWN = '#8a4a2e'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, color, font: MONO, weight: 700 })
const FLOWERS = ['.P...Y...R.', 'PWP.YWY.RWR', '.P...Y...R.', '..G..G..G..', '...G.G.G...', '....GGG....', '...BBBBB...', '...BBBBB...', '....BBB....']
const CASSETTE = ['KKKKKKKKKKKK', 'KPPPPPPPPPPK', 'KPWWWWWWWWPK', 'KPPKKPPKKPPK', 'KPPKKPPKKPPK', 'KPPPPPPPPPPK', 'KKKKKKKKKKKK']
const BOW = ['PP.PP', 'PPPPP', 'PP.PP']
const PIZZA = ['YYYYYYYYYY', 'YRYYYYRYYY', '.YYYRYYYY.', '.YYYYYYRY.', '..YRYYYY..', '...YYYY...', '....YY....']
const PIZZA_C = { Y: '#ffd23a', R: RED }
/** a balance scale; tilt −1…1 */
function scale(x, t, cx, cy, k, tilt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-14, -150, 28, 260); x.fillRect(-90, 100, 180, 30)
  x.fillStyle = GOLD; x.fillRect(-8, -144, 16, 248); x.fillRect(-84, 104, 168, 20)
  x.rotate(tilt * 0.35)
  x.fillStyle = INK; x.fillRect(-190, -160, 380, 22); x.fillStyle = GOLD; x.fillRect(-186, -156, 372, 14)
  for (const s of [-1, 1]) {
    x.save(); x.translate(s * 170, -150); x.rotate(-tilt * 0.35)
    x.strokeStyle = BONE; x.lineWidth = 3; x.beginPath(); x.moveTo(0, 0); x.lineTo(-50, 90); x.moveTo(0, 0); x.lineTo(50, 90); x.stroke()
    x.fillStyle = INK; x.fillRect(-64, 86, 128, 20); x.fillStyle = GOLD; x.fillRect(-60, 88, 120, 14)
    x.restore()
  }
  x.restore()
}
const ST = { x: -180 }

const S = 'libra'
const CAMEOS = [
  { sign: S, cap: 'Pick the restaurant. | *One less decision.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 860); x.rotate(0.04); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-150, -170, 300, 340); x.fillStyle = BONE; x.fillRect(-142, -162, 284, 324)
        x.fillStyle = INK; x.font = `800 32px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('MENU', 0, -120)
        x.font = `700 28px ${INTER}`; x.textAlign = 'left'
        ;['pasta?', 'tacos?', 'sushi?', 'soup?'].forEach((q, i) => x.fillText(q, -100, -60 + i * 56))
        x.restore()
      }
      if (lt > 1.0) { const p = clamp((lt - 1.0) / 0.25); x.save(); x.strokeStyle = RED; x.lineWidth = 6; x.beginPath(); x.ellipse(740, 856, 70 * p + 1, 30 * p + 1, 0, 0, Math.PI * 2); x.stroke(); x.restore() }
      L(x, 800, 1110, 'FRIEND CHOSE ✓', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 34)
    } },
  { sign: S, cap: 'Bring flowers. | *Pretty things help.*', mood: lt => lt > 1.0 ? 'sparkle' : 'neutral', look: [1, 0], star: ST, hops: [1.0],
    front(x, t, lt, P) {
      drawBits(x, FLOWERS, { P: PINK, Y: '#ffe76a', R: '#ff7a59', W: BONE, G: '#5fd068', B: LAV }, 800, 880, 22 * pop01(t, P.t0 + 0.3, 0.35, 2))
      sparkles(x, t, 800, 820, P.t0 + 0.9, 8, 190, 0.2, [PINK, BONE, GOLD])
      L(x, 800, 1120, 'MOOD: +12 PETALS', pop01(t, P.t0 + 1.4, 0.3, 2.4), ACC, 0.04, 32)
    } },
  { sign: S, cap: 'Let them vent. | *Just nod. No fixing.*', mood: lt => lt > 1.6 ? 'happy' : 'wide', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      bubble(x, 420, 620, 'and THEN she…', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 34, tail: 'bc' })
      const k = pop01(t, P.t0 + 0.4, 0.35, 2)
      const nod = Math.max(0, Math.sin(t * 9)) * 10
      if (k > 0.01) signChar(x, t, 'gemini', 790, 920 + nod, 200 * k, { mood: 'happy', look: [-1, 0], seed: 13, glyph: false })
      bubble(x, 800, 700, 'mm-hm. totally.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 34, col: MINT, tail: 'bl' })
    } },
  { sign: S, cap: 'Fight in the group chat? | *Not theirs to fix.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const tilt = lt < 1.2 ? Math.sin(t * 6) * 0.9 : lerp(Math.sin(t * 6) * 0.9, 0, clamp((lt - 1.2) / 0.4))
      scale(x, t, 760, 920, 0.85 * pop01(t, P.t0 + 0.2, 0.35, 2), tilt)
      L(x, 790, 640, 'NOT YOUR JOB', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, -0.04, 36)
    } },
  { sign: S, cap: 'Make them a playlist. | *Title it “for you.”*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, CASSETTE, { K: INK, P: ACC, W: BONE }, 800, 880, 22 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: -0.06 })
      L(x, 800, 820, 'for you ♡', pop01(t, P.t0 + 0.8, 0.3, 2.2), BONE, -0.06, 30)
      hearts(x, t, 370, 760, P.t0 + 1.2, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 4 })
      L(x, 800, 1100, 'TRACK 1: YOU’RE GREAT', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, 0.04, 28)
    } },
  { sign: S, cap: 'Plan a cute day. | *Matching bows optional.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.8, 1.6],
    front(x, t, lt, P, F) {
      drawBits(x, BOW, { P: PINK }, F.x, F.top - 20, 16 * pop01(t, P.t0 + 0.6, 0.3, 2.2))
      const k = pop01(t, P.t0 + 0.4, 0.35, 2)
      if (k > 0.01) { const Fa = signChar(x, t, 'aries', 790, 930, 220 * k, { mood: 'sparkle', look: [-1, 0], seed: 14, glyph: false, hops: [P.t0 + 1.0, P.t0 + 1.8] }); drawBits(x, BOW, { P: PINK }, Fa.x, Fa.top - 18, 14 * pop01(t, P.t0 + 0.8, 0.3, 2.2)) }
      L(x, 790, 640, 'TWINNING', pop01(t, P.t0 + 1.3, 0.3, 2.4), ACC, 0.04, 40)
    } },
  { sign: S, cap: 'Compliment their taste. | *Watch them glow.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.0],
    front(x, t, lt, P, F) {
      bubble(x, 800, 720, 'your style? | iconic.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, tail: 'bl' })
      if (lt > 1.0) { x.save(); x.globalAlpha = 0.25 * clamp((lt - 1.0) * 2); x.fillStyle = '#fff1c8'; x.beginPath(); x.arc(F.x, F.cy, 200, 0, Math.PI * 2); x.fill(); x.restore() }
      sparkles(x, t, F.x, F.cy, P.t0 + 1.0, 9, 190, 0.3)
      L(x, 800, 1060, 'GLOW: ON', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, 0.04, 40)
    } },
  { sign: S, cap: 'Ask what they want. | *Wait for the real answer.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      if (lt < 1.3) bubble(x, 800, 700, 'whatever | you want…', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, col: STEEL, tail: 'bl' })
      else bubble(x, 800, 700, 'ok. PIZZA.', pop01(t, P.t0 + 1.65, 0.25, 2.6), { size: 48, col: GOLD, tail: 'bl' })
      if (lt > 1.3) drawBits(x, PIZZA, PIZZA_C, 800, 940, 18 * pop01(t, P.t0 + 1.9, 0.3, 2.2))
      L(x, 800, 1120, 'TRUE ANSWER FOUND', pop01(t, P.t0 + 2.2, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: S, cap: 'Unbalanced day? | *Still so loved.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: { x: -150 }, hops: [1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.4, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'pisces', 730, 900, 220 * k, { mood: 'heart', look: [-1, 0], seed: 15, glyph: false, tears: 2, hops: [P.t0 + 1.2] })
      hearts(x, t, 560, 760, P.t0 + 1.0, { n: 7, life: 2.0, spread: 300, cell: 8, seed: 3 })
      L(x, 790, 1120, 'GROUP HUG', pop01(t, P.t0 + 1.4, 0.3, 2.4), ACC, 0.04, 38)
    } },
]

const F = makeFilm({
  id: 'r2a0348', key: 'C', accent: ACC, solo: 'libra', ending: 'lesson',
  title: 'How to cheer up | *a Libra.*',
  cameos: CAMEOS,
  group: { cap: 'Soft heart. | *Fully restored.*', mood: 'heart' },
  lesson: { text: 'Libras keep the peace. | *Give some back.*', chip: 'MOOD: RESTORED' },
  last: {
    text: 'Balance restored. | *Pizza helped.*',
    draw(x, t, lt) { drawBits(x, PIZZA, PIZZA_C, 540, 1220, 24 * pop01(t, t - lt + 0.6, 0.35, 2), { rot: 0.05 * Math.sin(t * 3) }); if (lt > 0.9) sparkles(x, t, 540, 1220, t - lt + 0.9, 8, 200, 0.2) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
