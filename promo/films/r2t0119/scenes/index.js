// r2t0119: SOLO, "Asking a Taurus | to share dessert." (~46 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole film (makeFilm solo mode, 9 cards), each the most extreme Taurus-and-dessert moment.
//   0.0–3.6    "Asking a Taurus | to *share dessert.*"
//   3.6–37.8   asked for one bite, got a contract · reached for the cake, fork blocked · "just a taste", the plate vanished
//              · suggested splitting the pie, heard a growl · asked nicely, Taurus counted the sprinkles · your birthday
//              cake, Taurus got the corner · shared a sundae, you got the cherry stem · the dessert menu, ordered the whole
//              page · you had a bad day, Taurus shared one crumb (a huge gesture)
//  37.8        "Loves you. | *Not that much.*"
//  41.2        CALLBACK: "Taurus shared again. | *Half a crumb.*"  The spoon comes back with an even smaller crumb.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const GREEN = '#7ee08a', RED = '#e23d4e', BROWN = '#8a4a2e', ORANGE = '#ffb34a', CHOC = '#6b3a22'
const S = 'taurus'

const FORK = ['S.S.S.S', 'S.S.S.S', 'S.S.S.S', 'SSSSSSS', '.SSSSS.', '..SSS..', '...S...', '...S...', '...S...', '...S...', '...S...', '...S...']
const SLICE = ['.........P', '.......PPP', '.....PPWPP', '...PPPPPPP', '.CCCCCCCCC', 'CCCCCCCCCC', 'WWWWWWWWWW', 'CCCCCCCCCC']
const PLATE = ['..WWWWWWWWW..', '.WWWWWWWWWWW.', 'WWWWWWWWWWWWW', '.WWWWWWWWWWW.', '..WWWWWWWWW..']
const PIE = ['...OOOOOOO...', '.OOROOROOROO.', 'OORRORRORROOO', 'OOOOOOOOOOOOO', '.BBBBBBBBBBB.']
const CUPCAKE = ['....R....', '..WWWWW..', '.WWWWWWW.', 'WWWWWWWWW', 'PPPPPPPPP', '.PKPKPKP.', '.PKPKPKP.', '..PPPPP..']
const SUNDAE = ['G.........G', 'GG.......GG', '.GG.....GG.', '..GGGGGGG..', '....GGG....', '.....G.....', '.....G.....', '...GGGGG...']
const STEM = ['..G', '.G.', 'G..', 'G..', 'G..']
const SPOON = ['.SSSSS.', 'SSSSSSS', 'SSSSSSS', 'SSSSSSS', '.SSSSS.', '...S...', '...S...', '...S...', '...S...', '...S...', '...S...']
// the spoon, upright, with a crumb (size f of a spoon cell) sitting in the bowl
function spoon(x, cx, cy, cell, f) {
  if (cell <= 0.01) return
  drawBits(x, SPOON, { S: '#d8dbe8' }, cx, cy, cell)
  const c = cell * f, by = cy - 3 * cell
  if (f > 0) { x.fillStyle = INK; x.fillRect(cx - c / 2 - 3, by - c / 2 - 3, c + 6, c + 6); x.fillStyle = '#c98f5a'; x.fillRect(cx - c / 2, by - c / 2, c, c) }
}

function contract(x, cx, cy, k, sign) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-140, -180, 280, 360); x.fillStyle = '#fff4e2'; x.fillRect(-132, -172, 264, 344)
  x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('AGREEMENT', 0, -132)
  x.font = `700 22px ${MONO}`; x.fillText('Party B gets:', 0, -80); x.font = `800 40px ${INTER}`; x.fillStyle = RED; x.fillText('0 BITES', 0, -30)
  x.fillStyle = '#c9c0b0'; for (let i = 0; i < 3; i++) x.fillRect(-100, 20 + i * 28, 200 - i * 30, 8)
  x.strokeStyle = INK; x.lineWidth = 4; x.beginPath(); x.moveTo(-100, 140); x.lineTo(100, 140); x.stroke()
  if (sign > 0) { x.strokeStyle = '#2a2350'; x.lineWidth = 5; x.beginPath(); x.moveTo(-90, 128); for (let j = 1; j <= 12 * sign; j++) x.lineTo(-90 + j * 15, 128 + (j % 2 ? -18 : 4)); x.stroke() }
  x.restore()
}
function menu(x, cx, cy, k, n) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-140, -190, 280, 380); x.fillStyle = CHOC; x.fillRect(-132, -182, 264, 364)
  x.fillStyle = '#fff4e2'; x.fillRect(-116, -166, 232, 332)
  x.fillStyle = INK; x.font = `800 28px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('DESSERTS', 0, -130)
  for (let i = 0; i < 7; i++) {
    const y = -84 + i * 36
    x.fillStyle = '#c9c0b0'; x.fillRect(-56, y - 4, 130 - (i % 3) * 20, 8)
    x.fillStyle = INK; x.fillRect(-96, y - 12, 24, 24); x.fillStyle = '#fff4e2'; x.fillRect(-92, y - 8, 16, 16)
    if (i < n) { x.fillStyle = GREEN; x.font = `800 30px ${INTER}`; x.fillText('✓', -84, y) }
  }
  x.restore()
}
function bigCake(x, cx, cy, k, bitten) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -80, 300, 160); x.fillStyle = '#c98f5a'; x.fillRect(-142, -72, 284, 144)
  x.fillStyle = PINK; x.fillRect(-142, -72, 284, 40); for (let i = 0; i < 7; i++) x.fillRect(-142 + i * 42, -32, 20, 18 + (i % 2) * 10)
  for (let i = 0; i < 3; i++) { x.fillStyle = INK; x.fillRect(-70 + i * 60, -140, 18, 64); x.fillStyle = SKYB; x.fillRect(-66 + i * 60, -136, 10, 58); x.fillStyle = GOLD; x.fillRect(-67 + i * 60, -160, 12, 18) }
  if (bitten > 0) { x.fillStyle = '#140c30'; x.fillRect(150 - 90 * bitten, -84, 96 * bitten, 90 * bitten) }
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Asked for one bite. | Got *a contract.*', mood: 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      contract(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), clamp((lt - 0.9) / 0.6))
      label(x, 790, 1100, 'SIGN HERE', pop01(t, P.t0 + 0.7, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Reached for the cake. | *Fork blocked.*', mood: lt => lt > 1.0 ? 'squint' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, SLICE, { P: PINK, W: '#fff4e2', C: '#c98f5a' }, 840, 1020, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const swing = ease.outBack ? ease.outCubic(prog(lt, 0.7, 1.0)) : prog(lt, 0.7, 1.0)
      drawBits(x, FORK, { S: '#d8dbe8' }, 680, 900, 16 * pop01(t, P.t0 + 0.5, 0.3, 2), { rot: lerp(-0.8, 0, swing) })
      label(x, 800, 740, 'DENIED', pop01(t, P.t0 + 1.1, 0.3, 2.6), { size: 52, bg: RED, color: '#fff4e2', rot: -0.06, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Said "just a taste." | The plate *vanished.*', mood: lt => lt > 1.0 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const gone = ease.inCubic(prog(lt, 0.8, 1.1))
      drawBits(x, PLATE, { W: '#fff4e2' }, 790, 1000, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { alpha: 1 - gone })
      drawBits(x, CUPCAKE, { R: RED, W: '#fff4e2', P: LAV, K: '#8a6ac0' }, 790, 930, 16 * pop01(t, P.t0 + 0.25, 0.3, 2), { alpha: 1 - gone })
      if (gone > 0.2) sparkles(x, t, 790, 950, P.t0 + 0.8 * 1.29, 7, 120, 0.2)
      bubble(x, 790, 740, 'what plate?', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 44, tail: 'bl' })
    } },
  { sign: S, cap: 'Suggested splitting the pie. | *Heard a growl.*', mood: 'squint', look: [1, 0], star: { x: -170 }, squash: lt => lt > 1.0 ? 0.08 * Math.sin(lt * 40) : 0,
    front(x, t, lt, P) {
      drawBits(x, PIE, { O: '#e8a24a', R: RED, B: BROWN }, 790, 1000, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 760, 760, 'grrrr.', pop01(t, P.t0 + 1.0, 0.25, 2.4), { size: 60, col: BONE, tail: 'bl' })
    } },
  { sign: S, cap: 'Asked nicely. | Taurus *counted the sprinkles.*', mood: 'squint', look: [1, 1], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, CUPCAKE, { R: RED, W: '#fff4e2', P: PINK, K: '#ff4f86' }, 790, 960, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const n = Math.floor(clamp((lt - 0.4) / 1.6) * 212)
      label(x, 790, 720, `SPRINKLES: ${n}`, pop01(t, P.t0 + 0.4, 0.3, 2), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Your birthday cake? | Taurus *got the corner.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bigCake(x, 790, 960, pop01(t, P.t0 + 0.2, 0.3, 2), ease.outCubic(prog(lt, 0.9, 1.2)))
      label(x, 790, 710, 'CORNER: TAKEN', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Shared a sundae? | You got *the cherry stem.*', mood: 'heart', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, SUNDAE, { G: '#bfe3ff' }, 760, 960, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, STEM, { G: '#5fd068' }, 880, 1060, 22 * pop01(t, P.t0 + 1.0, 0.3, 2.4), { rot: 0.3 })
      label(x, 870, 1170, 'YOUR HALF', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 720, 'enjoy!', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 44, tail: 'bl' })
    } },
  { sign: S, cap: 'The dessert menu? | Ordered *the whole page.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.6],
    front(x, t, lt, P) {
      menu(x, 790, 870, pop01(t, P.t0 + 0.2, 0.3, 2), Math.floor(clamp((lt - 0.4) / 1.2) * 8))
    } },
  { sign: S, cap: 'You had a bad day. | Taurus shared *one crumb.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      spoon(x, 790, 960, 24 * k, 0.8)
      label(x, 790, 720, 'HUGE GESTURE', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 38, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 600, 880, P.t0 + 1.3, { n: 5, life: 1.8, spread: 140, cell: 7, seed: 4 })
    } },
]

const F = makeFilm({
  id: 'r2t0119', key: 'D', accent: GREEN, solo: 'taurus', ending: 'callback',
  title: 'Asking a Taurus | to *share dessert.*',
  cameos: CAMEOS,
  group: { cap: 'Loves you. | *Not that much.*', mood: 'wink' },
  last: {
    text: 'Taurus shared again. | *Half a crumb.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'taurus', 420, 1060, 250 * k, { mood: lt > 1.4 ? 'heart' : 'sparkle', look: [1, 0], seed: 40, hops: [t - lt + 1.2] })
      const s = pop01(t, t - lt + 0.7, 0.35, 2)
      spoon(x, 720, 1080, 26 * s, 0.4)
      label(x, 720, 1280, 'GENEROUS.', pop01(t, t - lt + 1.3, 0.3, 2.4), { size: 40, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
