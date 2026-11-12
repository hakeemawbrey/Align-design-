// r2a0122: ADVICE SOLO, "Taurus, have you | eaten today?" (~51 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole film (makeFilm solo mode, 9 cards): a relatable Taurus truth + a warm reframe, one gag each.
//   0.0–3.6    "Taurus, have you | *eaten today?*"
//   3.6–37.8   planning dinner during lunch (self-care) · saved the best bite (savor it) · slow cooking (slow food is love)
//              · hangry (not a flaw, a signal) · comfort-food night (you earned it) · someone ate your leftovers (label them)
//              · your match must love dessert (know your standards) · nap after eating (rest counts)
//              · eating alone tonight (great company)
//  37.8        "Good food. | *Good mood.*"
//  41.0        LESSON UNLOCKED: "Feed yourself well. | You're *worth the effort.*"  STATUS: FED
//  46.9        "Now go get | *a snack.*"  A cake slice pops up with sparkles.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, notes, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const GREEN = '#7ee08a', RED = '#e23d4e', CREAM = '#fff4e2', BROWN = '#8a4a2e'

// ── props
const CAKE = ['......PPP...', '....CCCCCC..', '..CCCCCCCCCC', 'WWWWWWWWWWWW', 'SSSSSSSSSSSS', 'PPPPPPPPPPPP', 'SSSSSSSSSSSS', 'SSSSSSSSSSSS']
const CAKE_C = { P: '#ff4f86', C: CREAM, W: CREAM, S: '#f2c27a' }
const FORK = ['S.S.S', 'S.S.S', 'SSSSS', '.SSS.', '..S..', '..S..', '..S..', '..S..', '..S..', '..S..']
const POT = ['.....HH.....', 'LLLLLLLLLLLL', '.LLLLLLLLLL.', 'HPPPPPPPPPPH', '.PPPPPPPPPP.', '.PPPPPPPPPP.', '.PPPPPPPPPP.', '..PPPPPPPP..']
const POT_C = { H: INK, L: '#9aa5c4', P: '#c96a3a' }
const STEAM = ['.S.', 'S..', '.S.', '..S', '.S.']
const BOWL = ['.NNYNNNNYNN.', 'NNNNNNNNNNNN', 'BBBBBBBBBBBB', '.BBBBBBBBBB.', '..BBBBBBBB..', '....BBBB....']
const BOWL_C = { N: '#ffe08a', Y: '#5fd068', B: '#e86a5a' }
const BOX = ['LLLLLLLLLLLL', 'BBBBBBBBBBBB', 'BFFFFFFFFFFB', 'BFFFFFFFFFFB', 'BFFFFFFFFFFB', 'BBBBBBBBBBBB']
const BOX_C = { L: SKYB, B: '#d8e8ff', F: '#e8a24a' }
const PILLOW = ['.WWWWWWWWWWWW.', 'WWWWWWWWWWWWWW', 'WWWWWWWWWWWWWW', 'WWWWWWWWWWWWWW', '.WWWWWWWWWWWW.']
const ZZZ = ['ZZZZ', '..Z.', '.Z..', 'ZZZZ']
const CANDLE = ['.F.', 'FYF', '.Y.', 'WWW', 'WWW', 'WWW', 'WWW']
const CANDLE_C = { F: '#ff9a4a', Y: GOLD, W: CREAM }

// a little profile card: a heart-eyed star and "loves dessert ✓"
function profile(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  const w = 280, h = 360
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = '#2a2350'; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = '#140c30'; x.fillRect(-w / 2 + 14, -h / 2 + 14, w - 28, 190)
  signChar(x, t, 'libra', 0, -h / 2 + 112, 150, { mood: 'heart', seed: 71, glyph: false, glow: 0.8 })
  x.fillStyle = PINK; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText('YOUR MATCH', 0, 40)
  x.fillStyle = BONE; x.font = `700 24px ${MONO}`
  x.fillText(lt > 1.1 ? 'loves dessert ✓' : 'loves dessert ?', 0, 92)
  x.restore()
}
// a table for one: cloth, a candle, a plate
function tableForOne(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -8, 340, 30)
  x.fillStyle = '#ff8fb1'; x.fillRect(-162, -2, 324, 20)
  x.fillStyle = INK; x.fillRect(-12, 20, 24, 160); x.fillRect(-70, 170, 140, 16)
  x.restore()
  drawBits(x, CANDLE, CANDLE_C, cx - 90 * k, cy - 50 * k, 12 * k, { rot: Math.sin(t * 8) * 0.02 })
  drawBits(x, ['.WWWWWWW.', 'WWWWWWWWW', '.WWWWWWW.'], { W: CREAM }, cx + 60 * k, cy - 14 * k, 14 * k)
}

const S = 'taurus'
const CAMEOS = [
  { sign: S, cap: 'Dinner plans at lunch? | *That’s self-care.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      label(x, 790, 760, 'NOW: LUNCH', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 40, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 900, 'NEXT: DINNER', pop01(t, P.t0 + 0.8, 0.3, 2), { size: 40, bg: GREEN, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1040, 'THEN: DESSERT', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 40, bg: PINK, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Saved the best bite? | *Savor it.*', mood: lt => lt > 1.4 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.5],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, FORK, { S: '#d8dbe8' }, 800, 950, 20 * k, { rot: 0.15 })
      drawBits(x, CAKE, CAKE_C, 790, 790, 11 * k, { rot: 0.15 })
      label(x, 800, 640, 'THE GOOD ONE', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 800, P.t0 + 1.4, 7, 140, 0.3)
    } },
  { sign: S, cap: 'Cooking takes hours? | *Slow food is love.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, POT, POT_C, 790, 920, 22 * k)
      for (let i = 0; i < 3; i++) drawBits(x, STEAM, { S: BONE }, 730 + i * 60, 760 - ((t * 40 + i * 25) % 60), 10 * k, { alpha: 0.7 })
      label(x, 790, 640, 'SIMMER: 3 HRS', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Hangry? | Not a flaw. *A signal.*', mood: lt => lt > 1.4 ? 'happy' : 'eyeroll', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      bubble(x, 790, 700, 'grrrrr', pop01(t, P.t0 + 0.3, 0.25, 2.2) * (1 + 0.04 * Math.sin(t * 40)), { size: 52, tail: 'bl', col: '#ffb0a8' })
      label(x, 790, 900, 'LOW BATTERY', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 40, bg: RED, color: CREAM, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1040, 'FIX: SNACK', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 40, bg: GREEN, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Comfort-food night? | *You earned it.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, BOWL, BOWL_C, 790, 900, 24 * k)
      for (let i = 0; i < 3; i++) drawBits(x, STEAM, { S: BONE }, 720 + i * 70, 760 - ((t * 40 + i * 25) % 60), 10 * k, { alpha: 0.7 })
      hearts(x, t, 790, 760, P.t0 + 1.3, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 6 })
    } },
  { sign: S, cap: 'Leftovers got eaten? | *Label them.*', mood: lt => lt > 1.2 ? 'wink' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, BOX, BOX_C, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 760, 'TAURUS’S. ♉︎', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 40, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
      label(x, 790, 1060, 'BOUNDARIES: SET', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 32, bg: GREEN, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Match must love dessert? | *Know your standards.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      profile(x, t, 790, 850, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      sparkles(x, t, 790, 920, P.t0 + 1.45, 7, 180, 0.4)
    } },
  { sign: S, cap: 'Nap after eating? | *Rest counts.*', mood: 'sleepy', look: [1, 0], star: { x: -170, y: 30 },
    back(x, t, lt, P, F) { drawBits(x, PILLOW, { W: '#d8e8ff' }, F.x, F.cy + 120, 20 * pop01(t, P.t0 + 0.2, 0.3, 2)) },
    front(x, t, lt, P, F) {
      const z = pop01(t, P.t0 + 0.6, 0.3, 2)
      for (let i = 0; i < 3; i++) drawBits(x, ZZZ, { Z: SKYB }, F.x + 150 + i * 70, F.cy - 150 - i * 70 + Math.sin(t * 2 + i) * 8, (8 + i * 3) * z)
      label(x, 800, 1060, 'DIGESTING. BUSY.', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 34, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Eating alone tonight? | *Great company.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      tableForOne(x, t, 770, 900, 1.1 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 650, 'TABLE FOR ONE ✦', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0122', key: 'F', accent: GREEN, solo: 'taurus', ending: 'lesson',
  title: 'Taurus, have you | *eaten today?*',
  cameos: CAMEOS,
  group: { cap: 'Good food. | *Good mood.*', mood: 'heart' },
  lesson: { text: 'Feed yourself well. | You’re *worth the effort.*', chip: 'STATUS: FED' },
  last: {
    text: 'Now go get | *a snack.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.8, 0.4, 2)
      drawBits(x, CAKE, CAKE_C, 540, 1150, 20 * k)
      sparkles(x, t, 540, 1140, t - lt + 1.0, 8, 200, 0.4)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
