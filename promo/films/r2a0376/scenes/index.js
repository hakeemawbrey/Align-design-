// r2a0376: star_advice ADVICE-SOLO (taurus), "How to give | a Taurus *space.*" (~50 s vertical, signs3kit social cut, lofi · D)
// Nine warm, relatable truths about giving a Taurus room to breathe, each with one cute visual gag:
//   repotting a plant, not ignoring you · slow reply = savouring your text · a quiet night in IS the plan
//   · let them finish their meal · their mug lives exactly there · bath time is sacred · a heads-up, not a surprise
//   · let them nap, they wake up sweeter · space isn't distance, they're recharging
//  37.8   "Give them room. | *They come back.*"  Taurus returns, big.
//  41.2   callback: "Give a Taurus space. | *They bloom.*"  the repotted plant from card one, now in full flower.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, pop01, signChar,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#7dffb0'
const POT = [
  'TTTTTTTTTT',
  'TTTTTTTTTT',
  '.TttttttT.',
  '.TTTTTTTT.',
  '..TTTTTT..',
  '..TTTTTT..',
]
const POT_C = { T: '#c96a3f', t: '#a8502a' }
const LEAF = ['..GG', '.GGG', 'GGG.', 'GG..']
const FLOWER = ['.P.', 'PYP', '.P.']
function plant(x, cx, cy, k, grow, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const h = lerp(70, 260, grow)
  x.fillStyle = INK; x.fillRect(-7, -h - 4, 14, h + 8); x.fillStyle = '#3e9e5b'; x.fillRect(-4, -h, 8, h)
  const n = 2 + Math.round(grow * 4)
  for (let i = 0; i < n; i++) {
    const y = -20 - i * (h - 30) / Math.max(1, n - 1), s = i % 2 ? 1 : -1
    drawBits(x, LEAF, { G: i % 2 ? '#5fd07a' : '#3e9e5b' }, s * 30, y, 10, { sx: s, rot: 0.1 * Math.sin(t * 2 + i) })
  }
  if (grow > 0.5) for (let i = 0; i < 5; i++) {
    const a = i / 5 * Math.PI * 2 - Math.PI / 2, kk = clamp((grow - 0.5 - i * 0.06) * 4)
    drawBits(x, FLOWER, { P: ['#ff8fb1', '#ffd23a', '#c9a6ff', '#ff9a4a', '#8fe3ff'][i], Y: '#fff4e2' }, Math.cos(a) * 70, -h + Math.sin(a) * 46, 13 * kk)
  }
  drawBits(x, POT, POT_C, 0, 34, 14)
  x.restore()
}
// a phone with a "typing…" bubble that never stops
function phone(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-120, -200, 240, 400)
  x.fillStyle = '#2a2350'; x.fillRect(-110, -190, 220, 380)
  x.fillStyle = '#140c30'; x.fillRect(-98, -160, 196, 320)
  x.fillStyle = '#c9a6ff'; x.fillRect(-84, -130, 130, 44)
  x.fillStyle = INK; x.font = `700 20px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('you up?', -74, -108)
  x.fillStyle = BONE; x.fillRect(-20, 60, 104, 52)
  const dots = Math.floor(lt * 4) % 4
  x.fillStyle = INK; for (let i = 0; i < 3; i++) if (i < dots) x.fillRect(2 + i * 26, 80, 14, 14)
  x.restore()
}
const CANDLE = [
  '...O...',
  '..OYO..',
  '..OYO..',
  '...Y...',
  '.WWWWW.',
  '.WWWWW.',
  '.WWWWW.',
  '.WWWWW.',
  '.WWWWW.',
  'BBBBBBB',
]
const CANDLE_C = { O: '#ff9a4a', Y: '#ffe36a', W: '#fff4e2', B: '#c9a6ff' }
const CAKE = [
  '....R....',
  '...WWW...',
  '.PPPPPPP.',
  '.PWPWPWP.',
  '.CCCCCCC.',
  '.CCCCCCC.',
  'SSSSSSSSS',
]
const CAKE_C = { R: '#e23d4e', W: '#fff4e2', P: '#ff8fb1', C: '#c98f5a', S: '#9aa5c4' }
const MUG = [
  'MMMMMM..',
  'MWWWWM..',
  'MMMMMMMM',
  'MMMMMM.M',
  'MMMMMM.M',
  'MMMMMMMM',
  'MMMMMM..',
  '.MMMM...',
]
const MUG_C = { M: '#ff9a4a', W: '#5b2e1a' }
const TUB = [
  '.oo.o..oo.o.',
  'oOOoooOoOOoo',
  'WWWWWWWWWWWW',
  'WWWWWWWWWWWW',
  '.WWWWWWWWWW.',
  '..K......K..',
]
const TUB_C = { o: '#c4f0ff', O: '#fff', W: '#fff4e2', K: INK }
const DUCK = ['.YY..', 'YYYO.', '.YYYY', 'YYYYY', '.YYY.']
const DUCK_C = { Y: '#ffe36a', O: '#ff9a4a' }
const PILLOW = ['.LLLLLLLLLL.', 'LLLLLLLLLLLL', 'LLLLLLLLLLLL', 'LLLLLLLLLLLL', '.LLLLLLLLLL.']
function battery(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-130, -64, 260, 128); x.fillRect(130, -26, 24, 52)
  x.fillStyle = BONE; x.fillRect(-120, -54, 240, 108)
  x.fillStyle = '#140c30'; x.fillRect(-110, -44, 220, 88)
  const p = clamp((lt - 0.3) / 1.6), n = Math.max(1, Math.round(p * 5))
  for (let i = 0; i < n; i++) { x.fillStyle = n <= 1 ? '#e23d4e' : n < 4 ? '#ffd23a' : '#5fd07a'; x.fillRect(-102 + i * 42, -36, 36, 72) }
  x.restore()
}

const ST = { x: -170 }
const CAMEOS = [
  { sign: 'taurus', cap: 'Not ignoring you. | Just *repotting a plant.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      plant(x, 790, 960, pop01(t, P.t0 + 0.2, 0.3, 2) * 1.7, 0.15, t)
      label(x, 790, 640, 'DO NOT DISTURB', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Slow reply? | They’re *savouring* it.', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 1110, 'READING IT AGAIN', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.04 })
    } },
  { sign: 'taurus', cap: 'A quiet night in | *is* the plan.', mood: lt => lt > 1.0 ? 'sleepy' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, CANDLE, CANDLE_C, 790, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { sy: 1 + 0.03 * Math.sin(t * 9) })
      label(x, 790, 640, 'TONIGHT: NOTHING', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 34, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1120, 'perfect.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Let them | *finish the cake.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      drawBits(x, CAKE, CAKE_C, 790, 880, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 650, 'TALK AFTER DESSERT', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 32, bg: PINK, rot: -0.04 })
    } },
  { sign: 'taurus', cap: 'Don’t move the mug. | It *lives* there.', mood: 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const back = ease.outCubic(prog(lt, 0.9, 1.4))
      drawBits(x, MUG, MUG_C, lerp(900, 780, back), 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      x.save(); x.globalAlpha = 0.8; x.strokeStyle = GOLD; x.lineWidth = 6; x.setLineDash([14, 10]); x.strokeRect(710, 820, 150, 160); x.restore()
      label(x, 790, 650, 'ITS SPOT. SINCE FOREVER.', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 28, bg: GOLD, rot: 0.04 })
    } },
  { sign: 'taurus', cap: 'Bath time is | *sacred time.*', mood: lt => lt > 0.9 ? 'sleepy' : 'happy', star: { x: -170, y: -90 },
    front(x, t, lt, P) {
      drawBits(x, TUB, TUB_C, 540, 1080, 36 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, DUCK, DUCK_C, 760 + Math.sin(t * 3) * 10, 975, 18 * pop01(t, P.t0 + 0.6, 0.3, 2))
      label(x, 790, 650, 'BACK IN AN HOUR (OR 3)', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 28, bg: SKYB, rot: -0.04 })
    } },
  { sign: 'taurus', cap: 'Skip the surprise. | *Send a heads-up.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'SURPRISE!!', pop01(t, P.t0 + 0.2, 0.25, 2.2) * (1 - prog(lt, 1.0, 1.2)), { size: 50, col: '#ff6b5a', tail: 'bl' })
      bubble(x, 790, 900, 'dinner sat. 7pm?', pop01(t, P.t0 + 1.25, 0.25, 2.2), { size: 40, col: BONE, tail: 'bl' })
      label(x, 790, 1100, 'MUCH BETTER', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.04 })
    } },
  { sign: 'taurus', cap: 'Let them nap. | They wake up *sweeter.*', mood: lt => lt < 1.5 ? 'sleepy' : 'heart', star: ST,
    front(x, t, lt, P) {
      drawBits(x, PILLOW, { L: '#c4f0ff' }, 370, 1110, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 820, lt < 1.5 ? 'NAPPING…' : 'HI!! MISSED YOU', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 40, bg: lt < 1.5 ? LAV : PINK, rot: -0.04 })
      if (lt > 1.5) hearts(x, t, 540, 760, P.t0 + 1.5 * 3.1 / 2.4, { n: 4, life: 1.4, spread: 160, cell: 7, seed: 6 })
    } },
  { sign: 'taurus', cap: 'Space isn’t distance. | They’re *recharging.*', mood: lt => lt > 1.6 ? 'sparkle' : 'sleepy', look: [1, 0], star: ST, hops: [1.8],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      battery(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 1060, 'FULLY CHARGED', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 34, bg: '#5fd07a', rot: 0.04 })
    } },
]

const F = makeFilm({
  id: 'r2a0376', key: 'D', accent: ACC, solo: 'taurus', ending: 'callback',
  title: 'How to give | a Taurus *space.*',
  cameos: CAMEOS,
  group: { cap: 'Give them room. | *They come back.*', mood: 'heart' },
  last: {
    text: 'Give a Taurus space. | *They bloom.*',
    draw(x, t, lt) {
      plant(x, 720, 1260, pop01(lt, 0.3, 0.4, 2) * 1.8, ease.outCubic(prog(lt, 0.6, 2.2)), t)
      const k = pop01(lt, 0.4, 0.4, 2)
      if (k > 0.01) signChar(x, t, 'taurus', 380, 1180, 300 * k, { mood: lt > 1.8 ? 'heart' : 'happy', look: [1, -1], seed: 85, glyph: false, hops: [t - lt + 1.9] })
      sparkles(x, t, 700, 900, t - lt + 2.0, 8, 200, 0.4)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
