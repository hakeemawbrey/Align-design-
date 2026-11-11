// v3a094: star_advice, ADVICE SOLO, "Libra, read this | before your date." (~45 s vertical, signs3kit, music: lofi · G)
// One sign the whole way through (makeFilm solo mode, 9 cards): gentle date advice for Libra, one gag each.
//   0.0–3.6    "Libra, read this | *before your date.*"  One big Libra pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              say what you want to eat (…tacos? BRAVE) · the mirror says you look great · disagree a little, it's flirting
//              · the first outfit was the one (OUTFIT #14 → #1) · stop rehearsing (the topic cards fly away)
//              · a no can be nice and still a no · leave early if it feels off (POLITE EXIT) · say the feeling (OPEN ME)
//              · you're a catch (a trophy)
//  37.8        "Charming. | *And honest.*"  Libra comes back, big.
//  41.2        callback: "Tacos it is. | *Great choice.*"  the taco comes back.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const LIB = '#e163d6', RED = '#e23d4e', WOOD = '#c98f2a'
const S = 'libra'

const TACO = ['....YYYYYY....', '..YYgrgrgrYY..', '.YYgrgcgrgcYY.', 'YYrgcgrgcgrgYY', 'YYYYYYYYYYYYYY', '.YYYYYYYYYYYY.']
const TACO_C = { Y: '#f2c75c', g: '#5fd068', r: RED, c: '#fff4e2' }
const HEARTBOX = ['RRRRRRRRRR', 'RPPPPPPPPR', 'RPPHHPHHPR', 'RPHHHHHHHR', 'RPPHHHHHPR', 'RPPPHHHPPR', 'RPPPPHPPPR', 'RRRRRRRRRR']
const HEARTBOX_C = { R: GOLD, P: '#140c30', H: PINK }
const TROPHY = ['YYYYYYYYY', 'YwYYYYYYY', '.YYYYYYY.', '..YYYYY..', '...YYY...', '....Y....', '....Y....', '..BBBBB..', '.BBBBBBB.']
const TROPHY_C = { Y: GOLD, w: '#fff4e2', B: '#8a4a2e' }

function mirror(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 130, 180, 0, 0, 7); x.fill()
  x.fillStyle = WOOD; x.beginPath(); x.ellipse(0, 0, 120, 170, 0, 0, 7); x.fill()
  x.fillStyle = '#bfe8ff'; x.beginPath(); x.ellipse(0, 0, 100, 150, 0, 0, 7); x.fill()
  x.fillStyle = 'rgba(255,255,255,0.6)'; x.fillRect(-60, -100, 16, 80); x.fillRect(-38, -110, 10, 40)
  x.restore()
}
function door(x, cx, cy, k, open) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-110, -200, 220, 400); x.fillStyle = '#ffd27a'; x.fillRect(-100, -190, 200, 390)
  x.fillStyle = WOOD; x.fillRect(-100, -190, 200 * (1 - 0.6 * open), 390); x.fillStyle = INK; x.fillRect(-100 + 200 * (1 - 0.6 * open) - 30, 0, 14, 14)
  x.fillStyle = INK; x.fillRect(-80, -250, 160, 46); x.fillStyle = '#5fd068'; x.fillRect(-74, -244, 148, 34)
  x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('EXIT', 0, -226)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Say what | you *actually* want.', mood: lt => lt > 1.5 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -220 }, hops: [1.6],
    front(x, t, lt, P) {
      bubble(x, 600, 620, 'um… | TACOS?', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 40, tail: 'bl' })
      drawBits(x, TACO, TACO_C, 800, 930, 18 * pop01(t, P.t0 + 1.0, 0.3, 2))
      label(x, 800, 1110, 'BRAVE', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 40, bg: MINT, rot: -0.05 })
    } },
  { sign: S, cap: 'You look great. | *Ask the mirror.*', mood: lt => lt > 1.4 ? 'wink' : 'neutral', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      mirror(x, t, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 620, 'STUNNING.', pop01(t, P.t0 + 1.1, 0.25, 2.4), { size: 40, tail: 'bc' })
      sparkles(x, t, 800, 860, P.t0 + 1.2, 7, 160, 0.4)
    } },
  { sign: S, cap: 'Disagree a little. | *It’s flirting.*', mood: lt => lt > 1.4 ? 'wink' : 'squint', look: [1, 0], star: { x: -220 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'sagittarius', 830, 980, 180 * k, { mood: lt > 1.4 ? 'heart' : 'wide', look: [-1, 0], seed: 21, glyph: false, hops: [P.t0 + 1.6] })
      bubble(x, 560, 620, 'cereal is | NOT a soup', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 34, tail: 'bl' })
      label(x, 830, 760, 'INTRIGUED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'The first outfit | *was the one.*', mood: lt => lt > 1.6 ? 'sparkle' : 'squint', look: [1, 1], star: { x: -220 },
    front(x, t, lt, P) {
      const COLS = [PINK, MINT, SKYB, GOLD, LAV]
      for (let i = 0; i < 5; i++) { const k = pop01(t, P.t0 + 0.2 + i * 0.12, 0.3, 2); if (k < 0.01) continue; x.save(); x.translate(790 + (i - 2) * 26, 1060 - i * 34); x.rotate((i % 2 ? 1 : -1) * 0.12); x.scale(k, k); x.fillStyle = INK; x.fillRect(-120, -26, 240, 52); x.fillStyle = COLS[i]; x.fillRect(-114, -20, 228, 40); x.restore() }
      label(x, 790, 740, lt > 1.5 ? 'OUTFIT #1. DONE.' : 'OUTFIT #14', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 34, bg: lt > 1.5 ? MINT : BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Stop rehearsing. | *Just be you.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -220 }, hops: [1.5],
    front(x, t, lt, P) {
      const fly = ease.inCubic(prog(lt, 1.1, 1.8))
      ;['TOPIC 1: WEATHER', 'TOPIC 2: CHART', 'TOPIC 3: JOKE', 'TOPIC 4: ???'].forEach((s, i) => {
        const k = pop01(t, P.t0 + 0.2 + i * 0.15, 0.3, 2.2) * (1 - fly)
        label(x, 790 + fly * (200 + i * 80), 680 + i * 110 - fly * 300, s, k, { size: 28, bg: [BONE, LAV, SKYB, GOLD][i], rot: (i % 2 ? 0.05 : -0.05) + fly, font: MONO, weight: 700 })
      })
      if (lt > 1.6) label(x, 790, 900, 'JUST TALK', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 44, bg: MINT, rot: -0.04 })
    } },
  { sign: S, cap: 'No can be nice. | *Still no.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'leo', 830, 980, 180 * k, { mood: 'sparkle', look: [-1, 0], seed: 22, glyph: false })
      bubble(x, 820, 640, 'karaoke? | right now?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 32, tail: 'br' })
      bubble(x, 380, 640, 'no thank you!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 32, tail: 'bl', col: '#ffd2ef' })
      label(x, 600, 1140, 'BOUNDARY: CUTE', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Feels off? | *Leave early.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      door(x, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), ease.outCubic(prog(lt, 0.8, 1.4)))
      label(x, 800, 1140, 'POLITE EXIT', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Say the feeling. | *Out loud.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: { x: -220 }, hops: [1.5],
    front(x, t, lt, P) {
      drawBits(x, HEARTBOX, HEARTBOX_C, 800, 870 + 6 * Math.sin(t * 5), 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 660, 'OPEN ME', pop01(t, P.t0 + 0.6, 0.3, 2.4), { size: 38, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
      hearts(x, t, 800, 820, P.t0 + 1.5, { n: 6, life: 1.6, spread: 180, cell: 7, seed: 2 })
    } },
  { sign: S, cap: 'You’re a catch. | *Remember that.*', mood: 'sparkle', look: [1, 0], star: { x: -210 }, hops: [0.8, 1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, TROPHY, TROPHY_C, 800, 880, 28 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 1110, 'CATCH OF THE YEAR', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 32, bg: LIB, color: INK, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 800, 860, P.t0 + 0.6, 8, 170, 0.1)
    } },
]

const F = makeFilm({
  id: 'v3a094', key: 'G', accent: LIB, solo: S, ending: 'callback',
  title: 'Libra, read this | *before your date.*',
  cameos: CAMEOS,
  group: { cap: 'Charming. | *And honest.*', mood: 'sparkle' },
  last: {
    text: 'Tacos it is. | *Great choice.*',
    draw(x, t, lt) {
      drawBits(x, TACO, TACO_C, 540, 980 + 10 * Math.sin(t * 3), 34 * pop01(t, t - lt + 0.3, 0.45, 1.8))
      label(x, 540, 1200, 'DATE: SORTED', pop01(t, t - lt + 1.0, 0.3, 2.4), { size: 40, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 540, 900, t - lt + 1.1, { n: 7, life: 2.0, spread: 460, cell: 8, seed: 7 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
