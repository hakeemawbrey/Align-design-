// r2a0333: star_advice, ADVICE SOLO, "Aries, celebrate | the small wins." (~51 s vertical, signs3kit social cut, lofi · C)
// One sign the whole way: nine relatable Aries truths about winning, each with a warm reframe and one light visual gag.
// Ending: lesson.
//   0.0–3.6    "Aries, celebrate | *the small wins.*"  One big Aries pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              did one thing today, that's a win · woke up on time, victory lap · drank water, hero behaviour
//              · came second, still on the podium · waited in line calmly, badge earned · rested, that's strength
//              · all fire in your chart, small sparks count · finally sent that email, tiny trophy · said sorry first
//  37.8        "Big fire. | *Small wins.*"  Aries comes back, big.
//  41.0        LESSON UNLOCKED: "Cheer the little steps. | *They add up.*"  STATUS: WINNING
//  46.9        "Now go | *high-five yourself.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#ff5a4f', PAPER = '#fff4e2'

// ── props
const CLOCK = [
  '.B.......B.',
  'BBB.....BBB',
  '..RRRRRRR..',
  '.RWWWWWWWR.',
  'RWWWWKWWWWR',
  'RWWWWKWWWWR',
  'RWWWWKKKWWR',
  'RWWWWWWWWWR',
  '.RWWWWWWWR.',
  '..RRRRRRR..',
  '.R.......R.',
]
const CLOCK_C = { B: GOLD, R: RED, W: PAPER, K: INK }
const GLASS = [
  'G.........G',
  'G.........G',
  'GWWWWWWWWWG',
  'GBBBBBBBBBG',
  'GBBbBBBBBBG',
  '.GBBBBBbBG.',
  '.GBBBBBBBG.',
  '.GBbBBBBBG.',
  '.GBBBBBBBG.',
  '..GGGGGGG..',
]
const GLASS_C = { G: '#d8dbe8', W: '#ffffff', B: '#6fc3ff', b: '#bfe7ff' }
const BADGE = [
  '...YYYYY...',
  '.YYYYYYYYY.',
  'YYYWWWWWYYY',
  'YYWWWHWWWYY',
  'YYWWHHHWWYY',
  'YYWWWHWWWYY',
  'YYYWWWWWYYY',
  '.YYYYYYYYY.',
  '...YYYYY...',
  '..RR...RR..',
  '.RR.....RR.',
]
const BADGE_C = { Y: GOLD, W: PAPER, H: '#ff4f86', R: RED }
const BATTERY = [
  'KKKKKKKKKKKKK.',
  'KGGGGGGGGGGGKK',
  'KGGGGGGGGGGGKK',
  'KGGGGGGGGGGGKK',
  'KGGGGGGGGGGGKK',
  'KKKKKKKKKKKKK.',
]
const CANDLE = [
  '...O...',
  '..OYO..',
  '..OYO..',
  '...Y...',
  '...K...',
  '.WWWWW.',
  '.WPWWW.',
  '.WWWWW.',
  '.WWWPW.',
  '.WWWWW.',
  'DDDDDDD',
]
const CANDLE_C = { O: '#ffb34a', Y: '#fff1b0', K: INK, W: '#ffd6e2', P: '#ff8fb1', D: '#c98f5a' }
const TROPHY = [
  'YYYYYYYYY',
  'YyYYYYYyY',
  'Y.YYYYY.Y',
  '.YYYYYYY.',
  '..YYYYY..',
  '...YYY...',
  '....Y....',
  '..DDDDD..',
  '.DDDDDDD.',
]
const TROPHY_C = { Y: GOLD, y: '#fff1b0', D: '#8a4a2e' }

// a to-do list with one line ticked
function todo(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-130, -150, 276, 316)
  x.fillStyle = INK; x.fillRect(-142, -162, 284, 324)
  x.fillStyle = PAPER; x.fillRect(-134, -154, 268, 308)
  x.fillStyle = INK; x.font = `800 32px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('TODAY', 0, -116)
  x.fillStyle = INK; x.fillRect(-100, -66, 44, 44); x.fillStyle = PAPER; x.fillRect(-94, -60, 32, 32)
  if (lt > 0.9) { x.strokeStyle = '#2fb36a'; x.lineWidth = 9; x.beginPath(); x.moveTo(-92, -46); x.lineTo(-80, -32); x.lineTo(-56, -64); x.stroke() }
  x.fillStyle = '#6b62a8'; x.fillRect(-40, -50, 130, 12)
  x.fillStyle = '#d0c8b8'; for (let i = 1; i < 4; i++) x.fillRect(-100, -44 + i * 56, 190, 10)
  x.restore()
}
// a three-step podium
function podium(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const step = (dx, h, n, col) => {
    x.fillStyle = INK; x.fillRect(dx - 66, -h - 6, 132, h + 12)
    x.fillStyle = col; x.fillRect(dx - 60, -h, 120, h)
    x.fillStyle = INK; x.font = `800 44px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(n, dx, -h / 2)
  }
  step(-120, 140, '2', '#d8dbe8'); step(0, 200, '1', GOLD); step(120, 100, '3', '#e0a85a')
  x.restore()
}

const S = { star: { x: -170 }, look: [1, 0] }
const CAMEOS = [
  { sign: 'aries', cap: 'Did one thing today? | *That’s a win.*', mood: lt => lt > 1.0 ? 'sparkle' : 'neutral', ...S, hops: [1.0],
    front(x, t, lt, P) {
      todo(x, 790, 880, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      label(x, 790, 1120, 'DONE: 1. PROUD: YES', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 700, 830, P.t0 + 1.0, 6, 120, 0.3)
    } },
  { sign: 'aries', cap: 'Woke up on time? | *Victory lap.*', mood: 'sparkle', ...S, hops: [0.9, 1.3, 1.7, 2.1],
    front(x, t, lt, P) {
      drawBits(x, CLOCK, CLOCK_C, 800, 820, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: lt < 0.9 ? Math.sin(lt * 40) * 0.08 : 0 })
      label(x, 800, 1060, lt > 0.9 ? 'LAP ONE OF ONE' : '7:00 AM', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 36, bg: lt > 0.9 ? GOLD : LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aries', cap: 'Drank a glass of water? | *Hero behaviour.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', ...S, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, GLASS, GLASS_C, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 680, 'HYDRATED', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 40, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1120, 'CAPE: EARNED', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: RED, color: '#fff', rot: 0.04 })
    } },
  { sign: 'aries', cap: 'Came second? | *Still on the podium.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      podium(x, 800, 1120, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 800, 700, 'SILVER IS SHINY TOO', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: '#d8dbe8', rot: -0.04 })
      sparkles(x, t, 680, 940, P.t0 + 1.3, 6, 110, 0.6)
    } },
  { sign: 'aries', cap: 'Waited in line calmly? | *Badge earned.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', ...S,
    front(x, t, lt, P) {
      const n = Math.max(1, 5 - Math.floor(clamp((lt - 0.3) / 1.0) * 4))
      label(x, 790, 690, `PLACE IN LINE: ${n}`, pop01(t, P.t0 + 0.25, 0.3, 2.2), { size: 32, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
      drawBits(x, BADGE, BADGE_C, 790, 920, 20 * pop01(t, P.t0 + 1.4, 0.35, 2.4))
      label(x, 790, 1130, 'PATIENCE', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 38, bg: GOLD, rot: -0.04 })
    } },
  { sign: 'aries', cap: 'Rested instead of rushing? | *That’s strength too.*', mood: lt => lt > 1.5 ? 'happy' : 'sleepy', ...S,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, BATTERY, { K: BONE, G: '#2a2350' }, 790, 880, 20 * k)
      const f = clamp((lt - 0.3) / 1.4)
      if (k > 0.5) { x.fillStyle = f > 0.9 ? MINT : GOLD; x.fillRect(790 - 110, 880 - 40, 220 * f, 80) }
      label(x, 790, 700, f >= 1 ? 'FULLY CHARGED' : 'RECHARGING…', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 34, bg: f >= 1 ? MINT : BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aries', cap: 'All fire in your chart? | *Small sparks count.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', ...S, hops: [1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      label(x, 790, 680, 'CHART: FIRE, FIRE, FIRE', pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 28, bg: RED, color: '#fff', rot: 0.03, font: MONO, weight: 700 })
      drawBits(x, CANDLE, CANDLE_C, 790, 920, 20 * k, { sy: 1 + 0.04 * Math.sin(lt * 9) })
      label(x, 790, 1140, 'SMALL. STILL GLOWS.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04 })
    } },
  { sign: 'aries', cap: 'Finally sent that email? | *Tiny trophy.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', ...S, hops: [1.25],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 690, 'email: SENT', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, col: MINT, tail: 'br' })
      drawBits(x, TROPHY, TROPHY_C, 790, 930, 9 * pop01(t, P.t0 + 1.2, 0.35, 2.4))
      label(x, 790, 1090, '(VERY TINY)', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 930, P.t0 + 1.25, 6, 90, 0.3)
    } },
  { sign: 'aries', cap: 'Said sorry first? | *Biggest win yet.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', ...S, hops: [1.45],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 800, 980, 200 * k, { mood: lt > 1.4 ? 'heart' : 'neutral', look: [-1, 0], seed: 19, glyph: false, hops: [P.t0 + 1.5] })
      bubble(x, 560, 650, 'i’m sorry.', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 40, tail: 'bl' })
      bubble(x, 800, 760, 'me too.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 38, col: LAV, tail: 'br' })
      hearts(x, t, 660, 1000, P.t0 + 1.5, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 4 })
    } },
]

const F = makeFilm({
  id: 'r2a0333', key: 'C', accent: RED, solo: 'aries', ending: 'lesson',
  title: 'Aries, celebrate | *the small wins.*',
  cameos: CAMEOS,
  group: { cap: 'Big fire. | *Small wins.*', mood: 'sparkle' },
  lesson: { text: 'Cheer the little steps. | *They add up.*', chip: 'STATUS: WINNING' },
  last: {
    text: 'Now go | *high-five yourself.*',
    draw(x, t, lt) { sparkles(x, t, 540, 1200, t - lt + 0.6, 10, 260, 0.3) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
