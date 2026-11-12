// r2t0282: star_talk, SOLO (taurus), "Taurus red flags | we love." (~49 s vertical, signs3kit social cut, lofi · E)
// One Taurus, nine lovable red flags, each pushed to the most extreme (and cosy) Taurus version.
//   0.0–3.6    "Taurus red flags | *we love.*"
//   3.6–37.8   nine cards: won't share dessert, bought you your own · same restaurant, visit #812 · opinions set in stone
//              · naps not optional · plans changed, Taurus didn't · a match, the slow reply · a sandwich grudge from 2019
//              · forty-dollar candle · slippers on the date
//  37.8        "Stubborn? | *Loyal.*"
//  41.0        LESSON UNLOCKED: "Stubborn means they | *stay.*"  STATUS: SMITTEN
//  46.9        "Red flags? | *Cosy flags.*" over the match card: Taurus + Cancer (the two homebodies).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, phone, CREAM, RED, GREY, DEEP, GREEN, WOOD, ORANGE } from './props.js'

const ACC = '#ff7a7a'
const ST = { x: -170 }

const SLICE = ['......PP', '....PPPP', '..PPPPPP', 'PPPPPPPP', 'CCCCCCCC', 'SSSSSSSS', 'CCCCCCCC', 'SSSSSSSS']
const SLICE_C = { P: PINK, C: CREAM, S: '#c98f6a' }
const PILLOW = ['.WWWWWWWWWWW.', 'WWWWWWWWWWWWW', 'WWLWWWWWWWLWW', 'WWWWWWWWWWWWW', 'WWWWWWWWWWWWW', '.WWWWWWWWWWW.']
const PILLOW_C = { W: '#e8e4f4', L: LAV }
const SANDWICH = ['..BBBBBBBB..', '.BBBBBBBBBB.', 'GGGGGGGGGGGG', 'RRRRRRRRRRRR', 'YYYYYYYYYYYY', '.BBBBBBBBBB.']
const SANDWICH_C = { B: '#e0b070', G: GREEN, R: RED, Y: '#ffd86b' }
const CANDLE = ['....F....', '...FYF...', '....K....', '.CCCCCCC.', '.CLLLLLC.', '.CLLLLLC.', '.CCCCCCC.', '.CCCCCCC.']
const CANDLE_C = { F: ORANGE, Y: GOLD, K: INK, C: '#ffd0dc', L: '#fff4e2' }
const SLIPPER = ['....FFFFF..', '..FFFFFFFFF', '.FFWFFFWFFF', 'FFFFFFFFFFF', 'PPPPPPPPPPP']
const SLIPPER_C = { F: '#ffb3c7', W: '#fff', P: '#c96a8a' }

/** a flat stone tablet with carved words */
function tablet(x, cx, cy, k, lines) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.roundRect(-160, -200, 320, 380, [140, 140, 14, 14]); x.fill()
  x.fillStyle = '#9aa0b4'; x.beginPath(); x.roundRect(-150, -190, 300, 360, [130, 130, 10, 10]); x.fill()
  x.fillStyle = '#7d839a'; for (const [a, b] of [[-90, 120], [70, -60], [-40, -130]]) x.fillRect(a, b, 30, 8)
  lines.forEach((l, i) => txt(x, l, 0, -80 + i * 70, { size: 46, color: '#3a3f55' }))
  x.restore()
}
/** a wall calendar page with one big line */
function planCard(x, cx, cy, k, text) {
  card(x, cx, cy, 300, 240, k, { bg: CREAM, rot: 0.04 }, () => {
    x.fillStyle = RED; x.fillRect(-150, -120, 300, 56)
    txt(x, 'FRIDAY', 0, -92, { size: 30, font: MONO, weight: 700, color: '#fff4e2' })
    txt(x, text, 0, 10, { size: 44 })
    txt(x, '(final)', 0, 66, { size: 26, font: MONO, weight: 700, color: '#6b62a8' })
  })
}

const CAMEOS = [
  { sign: 'taurus', cap: 'Won\'t share dessert. | *Ordered yours separately.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, SLICE, SLICE_C, 720, 960, 18 * pop01(t, P.t0 + 0.2, 0.35, 2))
      drawBits(x, SLICE, SLICE_C, 880, 960, 18 * pop01(t, P.t0 + 1.1, 0.35, 2.2), { sx: -1 })
      label(x, 690, 730, 'MINE', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 40, bg: RED, color: '#fff4e2', rot: -0.06 })
      label(x, 910, 800, 'YOURS', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 40, bg: MINT, rot: 0.06 })
    } },
  { sign: 'taurus', cap: 'Same restaurant. | *Same order. Forever.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      card(x, 790, 820, 300, 200, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: WOOD, rot: -0.03 }, () => {
        x.fillStyle = CREAM; x.fillRect(-130, -80, 260, 160)
        txt(x, 'THE USUAL', 0, -20, { size: 42 }); txt(x, 'again', 0, 34, { size: 28, font: MONO, weight: 700, color: '#6b62a8' })
      })
      const n = 800 + Math.floor(clamp((lt - 0.5) / 1.2) * 12)
      label(x, 790, 1050, `VISIT #${n}`, pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 40, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Their opinions? | *Set in stone.*', mood: lt => lt > 1.2 ? 'squint' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const drop = ease.outBounce ? ease.outBounce(prog(lt, 0.2, 0.7)) : ease.outCubic(prog(lt, 0.2, 0.7))
      tablet(x, 790, lerp(500, 880, drop), lt > 0.15 ? 1 : 0, ['PIZZA', 'IS A', 'MEAL.'])
      if (lt > 0.7 && lt < 1.0) sparkles(x, t, 790, 1060, P.t0 + 0.7 * 1.29, 6, 160, 0.2, [BONE, GREY, BONE])
    } },
  { sign: 'taurus', cap: 'Naps are | *not optional.*', mood: 'sleepy', star: { x: -170, y: 20 },
    back(x, t, lt, P, F) { drawBits(x, PILLOW, PILLOW_C, F.x, F.cy + 120, 24 * pop01(t, P.t0 + 0.2, 0.35, 2)) },
    front(x, t, lt, P) {
      label(x, 790, 820, 'DO NOT WAKE', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 40, bg: LAV, rot: 0.05, font: MONO, weight: 700 })
      label(x, 790, 960, 'NOT EVEN FOR CAKE', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 28, bg: BONE, rot: -0.04 })
    } },
  { sign: 'taurus', cap: 'The plans changed. | *Taurus did not.*', mood: lt => lt > 1.2 ? 'squint' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      planCard(x, 790, 820, pop01(t, P.t0 + 0.2, 0.35, 2), 'PLAN A')
      bubble(x, 800, 1060, 'plan B?', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 40, col: LAV, tail: 'br' })
      label(x, 560, 640, 'NO.', pop01(t, P.t0 + 1.3, 0.3, 2.6), { size: 60, bg: RED, color: '#fff4e2', rot: -0.08, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Got a match. | Replied *next Tuesday.*', mood: lt => lt > 1.3 ? 'sleepy' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, 790, 870, pop01(t, P.t0 + 0.2, 0.35, 2), { head: 'IT\'S A MATCH', headCol: PINK, lines: [['hi!! :)', LAV, pop01(t, P.t0 + 0.4, 0.25, 2)], ['hello?', LAV, pop01(t, P.t0 + 0.8, 0.25, 2)], ['…', LAV, pop01(t, P.t0 + 1.1, 0.25, 2)], ['hey.', MINT, pop01(t, P.t0 + 1.6, 0.25, 2)]] })
      label(x, 790, 1150, '6 DAYS LATER', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Still mad about | *a sandwich.* From 2019.', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, SANDWICH, SANDWICH_C, 790, 940, 20 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.06 })
      label(x, 790, 700, 'NEVER FORGET', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 40, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 520, 640, 'you took a bite.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 32, col: PINK, tail: 'bc' })
    } },
  { sign: 'taurus', cap: 'Budget: tight. | Candle: *forty dollars.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, CANDLE, CANDLE_C, 790, 920, 26 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 900, 760, '$40', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 48, bg: GOLD, rot: 0.12, font: MONO, weight: 700 })
      label(x, 790, 1130, 'WORTH IT.', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 34, bg: MINT, rot: -0.04 })
    } },
  { sign: 'taurus', cap: 'First date dress code? | *Slippers.*', mood: 'sparkle', star: { x: -170, y: -40 }, hops: [1.3],
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.4, 0.35, 2.2)
      drawBits(x, SLIPPER, SLIPPER_C, F.x - 70, F.cy + 175, 13 * k)
      drawBits(x, SLIPPER, SLIPPER_C, F.x + 70, F.cy + 175, 13 * k, { sx: -1 })
      label(x, 790, 760, 'COMFORT: 10/10', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 34, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 960, 'you look cosy!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, col: LAV, tail: 'br' })
    } },
]

const F = makeFilm({
  id: 'r2t0282', key: 'E', accent: ACC, solo: 'taurus', ending: 'card',
  title: 'Taurus red flags | *we love.*',
  cameos: CAMEOS,
  card: { a: 'taurus', b: 'cancer', chip: 'IT\'S A MATCH' },
  group: { cap: 'Stubborn? | *Loyal.*', mood: 'heart' },
  lesson: { text: 'Stubborn means | they *stay.*', chip: 'STATUS: SMITTEN' },
  last: { text: 'Red flags? | *Cosy flags.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
