// r2a0042: star_advice, ADVICE SOLO, "How to cheer up | a Taurus." (~49 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole way through (makeFilm solo mode, 9 cards): a relatable Taurus truth + a warm way to help, one gag each.
//   0.0–3.6    "How to cheer up | *a Taurus.*"  One big Taurus pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              snacks first, then talk (a plate of cookies) · the good blanket (wrapped like a burrito)
//              · don't rush them (a snail, winning) · let them vent, just nod · a quiet night, not a party (party hat
//              swapped for a candle) · change can be good (a sprout) · say they're right (they usually are)
//              · a cute dog video (from a match) · just sit with them (a friend on the sofa)
//  37.8        "Fed, cozy | and *feeling better.*"  Taurus comes back, big.
//  41.2        callback: "Fully cheered up. | They *shared.*"  The cookie plate comes back, one cookie offered.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const GREEN = '#5fd068', CREAM = '#fff4e2', WOOD = '#c98f2a', RED = '#e23d4e'
const S = 'taurus'

const COOKIE = [
  '..CCCC..',
  '.CCKCCC.',
  'CCCCCKCC',
  'CKCCCCCC',
  'CCCCKCCC',
  '.CCCCCC.',
  '..CCCC..',
]
const COOKIE_C = { C: '#e8a24a', K: '#5a3020' }
const PLATE = [
  '..WWWWWWWWWWW..',
  'WWWWWWWWWWWWWWW',
  '..WWWWWWWWWWW..',
]
const SNAIL = [
  '...SSSS.......',
  '..SSPPSS......',
  '.SSPSSPSS.....',
  '.SPSSSSPS..K.K',
  '.SSPPPPSS..B.B',
  'BBBBBBBBBBBBBB',
]
const SNAIL_C = { S: '#c97bff', P: '#ffb0e0', B: '#8fd06a', K: INK }
const HAT = ['....Y....', '...YRY...', '..YYYYY..', '..RYRYR..', '.YYYYYYY.', 'RYRYRYRYR']
const CANDLE = ['...F...', '..FYF..', '...Y...', '..WWW..', '..WWW..', '..WWW..', '..WWW..', '.BBBBB.']
const CANDLE_C = { F: '#ffb34a', Y: GOLD, W: CREAM, B: WOOD }
const SPROUT = ['.GG...GG.', 'GGGG.GGGG', '.GGG.GGG.', '...GGG...', '....G....', '....G....', '..BBBBB..', '..BBBBB..', '...BBB...']
const SPROUT_C = { G: GREEN, B: '#c8603a' }
const DOG = [
  'BB......BB',
  'BBBBBBBBBB',
  '.BWWBBWWB.',
  '.BKWBBKWB.',
  '.BBBBBBBB.',
  '..BBNNBB..',
  '..BBBBBB..',
  '...BTTB...',
]
const DOG_C = { B: '#e8a24a', W: '#fff', K: INK, N: '#3a2030', T: '#ff8fb1' }

function plate(x, cx, cy, k, n) {
  if (k <= 0.01) return
  drawBits(x, PLATE, { W: CREAM }, cx, cy + 40, 16 * k)
  for (let i = 0; i < n; i++) drawBits(x, COOKIE, COOKIE_C, cx - 70 + (i % 3) * 70, cy - Math.floor(i / 3) * 50, 12 * k, { rot: Math.sin(i * 2.3) * 0.2 })
}
function phone(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  x.fillStyle = MINT; x.fillRect(-100, -156, 200, 46)
  x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('✦ YOUR MATCH', 0, -132)
  x.fillStyle = SKYB; x.fillRect(-96, -96, 192, 180)
  drawBits(x, DOG, DOG_C, 0, -6 + Math.sin(lt * 10) * 6, 14)
  x.fillStyle = PINK; x.fillRect(-90, 104, 180, 44); x.fillStyle = INK; x.font = `800 24px ${INTER}`; x.fillText('for you <3', 0, 127)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Start with snacks. | *Then* talk.', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      plate(x, 790, 940, pop01(t, P.t0 + 0.2, 0.35, 2), 6)
      label(x, 790, 720, 'STEP 1: FOOD', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1100, 'STEP 2: FEELINGS', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 28, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Bring the blanket. | *The good one.*', mood: lt => lt > 1.0 ? 'sleepy' : 'happy', star: { x: -160, y: 20 },
    front(x, t, lt, P, F) {
      const k = ease.outCubic(prog(lt, 0.4, 0.9))
      if (k > 0.01) {
        x.save(); x.globalAlpha *= k
        x.fillStyle = INK; x.fillRect(F.x - 175, F.cy - 10, 350, 190)
        x.fillStyle = '#ffb0c8'; x.fillRect(F.x - 167, F.cy - 2, 334, 174)
        x.fillStyle = '#ff8fb1'; for (let i = 0; i < 6; i++) x.fillRect(F.x - 150 + i * 56, F.cy + 10, 26, 150)
        x.restore()
      }
      label(x, 800, 760, 'BURRITO MODE', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 32, bg: CREAM, rot: 0.05 })
      label(x, 800, 900, 'COZY: MAX', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 32, bg: GREEN, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Don’t rush them. | *Slow is fine.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const p = prog(lt, 0.2, 2.2)
      drawBits(x, SNAIL, SNAIL_C, lerp(640, 840, p), 1070, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 760, 'PACE: PERFECT', pop01(t, P.t0 + 0.7, 0.3, 2.2), { size: 34, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 920, 'we’ll get | there', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: S, cap: 'Let them vent. | *Just nod.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const W = ['and ANOTHER', 'thing...', 'and THEN', 'ok. I’m done.']
      const n = Math.min(3, Math.floor(Math.max(0, lt - 0.2) / 0.5))
      bubble(x, 300, 620, W[n], pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 38, tail: 'br' })
      const nod = Math.abs(Math.sin(lt * 7)) * 20
      const k = pop01(t, P.t0 + 0.4, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 800, 950 + nod, 200 * k, { mood: 'happy', look: [-1, 0], seed: 15, glyph: false })
      label(x, 800, 760, 'NOD. NOD. NOD.', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 30, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'A quiet night. | *Not a party.*', mood: lt => lt > 1.3 ? 'sleepy' : 'wide', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const swap = lt > 1.1
      if (!swap) {
        drawBits(x, HAT, { Y: GOLD, R: RED }, 790, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
        label(x, 790, 1060, 'SURPRISE PARTY?', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 30, bg: GOLD, rot: 0.04 })
      } else {
        drawBits(x, CANDLE, CANDLE_C, 790, 880, 20 * pop01(t, P.t0 + 1.1 * 1.29, 0.3, 2))
        label(x, 790, 1060, 'PARTY OF ONE', pop01(t, P.t0 + 1.2 * 1.29, 0.3, 2), { size: 32, bg: '#ffb34a', rot: -0.04 })
      }
    } },
  { sign: S, cap: 'Remind them | change can be *good.*', mood: lt => lt > 1.4 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const g = ease.outBack ? clamp(prog(lt, 0.3, 1.3)) : prog(lt, 0.3, 1.3)
      drawBits(x, SPROUT, SPROUT_C, 790, 1000 - 40 * g, 10 + 12 * g)
      label(x, 790, 720, 'NEW LEAF', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 38, bg: GREEN, rot: 0.04 })
      sparkles(x, t, 790, 940, P.t0 + 1.5, 6, 140, 0.3)
    } },
  { sign: S, cap: 'Tell them they’re right. | *They usually are.*', mood: lt => lt > 1.0 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -190 }, hops: [1.1],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'you were | right.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, col: MINT, tail: 'bl' })
      label(x, 790, 920, 'TOLD YOU', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 40, bg: GOLD, rot: -0.05 })
      sparkles(x, t, 400, 850, P.t0 + 1.4, 6, 160, 0.4)
    } },
  { sign: S, cap: 'Send a cute | *dog video.*', mood: lt => lt > 1.0 ? 'heart' : 'neutral', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      hearts(x, t, 400, 780, P.t0 + 1.2, { n: 5, life: 1.6, spread: 160, cell: 6, seed: 4 })
    } },
  { sign: S, cap: 'Just sit with them. | *That’s plenty.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -130, y: 10, s: 260 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.1, 0.3, 2)
      if (k <= 0.01) return
      x.save(); x.globalAlpha *= k
      x.fillStyle = INK; x.fillRect(210, 960, 680, 170); x.fillStyle = '#6b62a8'; x.fillRect(218, 968, 664, 154)
      x.fillStyle = '#8a80c8'; x.fillRect(218, 968, 664, 40)
      x.restore()
    },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.4, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'libra', 740, 900, 240 * k, { mood: 'happy', look: [-1, 0], seed: 16, glyph: false })
      hearts(x, t, 560, 780, P.t0 + 1.3, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 2 })
    } },
]

const F = makeFilm({
  id: 'r2a0042', key: 'F', accent: GREEN, solo: S, ending: 'callback',
  title: 'How to cheer up | *a Taurus.*',
  cameos: CAMEOS,
  group: { cap: 'Fed, cozy | and *feeling better.*', mood: 'sparkle' },
  last: {
    text: 'Fully cheered up. | They *shared.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.5, 0.35, 2)
      if (k > 0.01) signChar(x, t, S, 330, 1150, 260 * k, { mood: lt > 1.6 ? 'heart' : 'happy', look: [1, 0], seed: 9, hops: [t - lt + 1.5] })
      plate(x, 620, 1330, 1.5 * pop01(t, t - lt + 0.7, 0.35, 2), 3)
      const p = ease.inOutCubic(prog(lt, 1.4, 2.2))
      if (k > 0.01) drawBits(x, COOKIE, COOKIE_C, lerp(560, 860, p), 1250 - Math.sin(Math.PI * p) * 160, 20, { rot: p * 2 })
      label(x, 860, 1450, 'FOR YOU', pop01(t, t - lt + 2.3, 0.3, 2.2), { size: 34, bg: PINK, rot: 0.05 })
      hearts(x, t, 860, 1180, t - lt + 2.2, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 8 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
