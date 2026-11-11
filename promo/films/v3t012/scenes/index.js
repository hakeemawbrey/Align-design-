// v3t012: THE SIGNS AS… v3, "The signs at | a sleepover." (~57 s vertical, signs3kit social cut, music: lofi · D)
//   0.0–3.6    "The signs at | a *sleepover.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one sleepover per sign (3.8 s each), each pushed to the extreme:
//              ♈ started a pillow fight, won alone · ♉ first asleep, snack still in hand · ♊ "one more story" ×14
//              · ♋ tucked everyone in, read a bedtime story · ♌ truth or dare? chose encore · ♍ built a fort, vacuumed it
//              · ♎ matchmaker till midnight · ♏ read everyone's charts by flashlight · ♐ slept on the roof
//              · ♑ an agenda, lights out 10:02 · ♒ befriended the ghost · ♓ cried at the movie's menu screen
//  49.2        "Sleep? | *Never heard of it.*"
//  52.6        callback: "The ghost stayed | for *breakfast.*"  (Aquarius's ghost comes back, with pancakes)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO,
} from '../../signs3kit.js'

const ORANGE = '#ffb34a', RED = '#e23d4e', BROWN = '#8a4a2e', GREEN = '#5fd068', CREAM = '#fff4e2'

const PILLOW = [
  '.WWWWWWWWW.',
  'WWWWWWWWWWW',
  'WWWWWWWWWWW',
  'WWWWWWWWWWW',
  '.WWWWWWWWW.',
]
const COOKIE = ['.CCCC.', 'CCKCCC', 'CCCCKC', 'CKCCCC', '.CCCC.']
const COOKIE_C = { C: '#d89a4a', K: '#5a2e1a' }
const BOOK = [
  'RRRRRRRRRRRRR',
  'RWWWWWRWWWWWR',
  'RWKKWWRWKKWWR',
  'RWWWWWRWWWWWR',
  'RWKKKWRWKKKWR',
  'RWWWWWRWWWWWR',
  'RRRRRRRRRRRRR',
]
const BOOK_C = { R: '#c24a6a', W: CREAM, K: '#9aa5c4' }
const FORT = [
  '......P......',
  '.....PPP.....',
  '....PpPpP....',
  '...PPPPPPP...',
  '..PpPpPpPpP..',
  '.PPPPPPPPPPP.',
  'PPPP.....PPPP',
  'PPPP.....PPPP',
]
const FORT_C = { P: '#7dd3c0', p: '#4aa894' }
const VAC = [
  '...KK...',
  '...KK...',
  '...KK...',
  '...KK...',
  '..GGGG..',
  'GGGGGGGG',
  'GGRRRRGG',
  '.K....K.',
]
const VAC_C = { K: INK, G: '#9aa5c4', R: RED }
const MOON = ['..YYY.', '.YYY..', 'YYY...', 'YYY...', 'YYY...', '.YYY..', '..YYY.']
const MOON_C = { Y: '#ffe9a8' }
const ROOF = [
  '......RRR......',
  '....RRRRRRR....',
  '..RRRRRRRRRRR..',
  'RRRRRRRRRRRRRRR',
  '.WWWWWWWWWWWWW.',
  '.WWBBWWWWWBBWW.',
  '.WWBBWWWWWBBWW.',
  '.WWWWWWWWWWWWW.',
]
const ROOF_C = { R: '#c24a6a', W: CREAM, B: SKYB }
const GHOST = [
  '..WWWWW..',
  '.WWWWWWW.',
  'WWKWWWKWW',
  'WWKWWWKWW',
  'WWWWWWWWW',
  'WWWPPPWWW',
  'WWWWWWWWW',
  'WWWWWWWWW',
  'W.WW.WW.W',
]
const GHOST_C = { W: '#eef4ff', K: INK, P: PINK }
const PANCAKES = [
  '....YY....',
  '.BBBBBBBB.',
  'BBBBBBBBBB',
  '.bbbbbbbb.',
  'BBBBBBBBBB',
  '.bbbbbbbb.',
  'BBBBBBBBBB',
  'WWWWWWWWWW',
]
const PAN_C = { Y: '#ffe066', B: '#e8a24a', b: '#c97a3a', W: CREAM }
const TV = [
  'KKKKKKKKKKKKK',
  'KSSSSSSSSSSSK',
  'KSWWWWWWWWWSK',
  'KSSSSSSSSSSSK',
  'KSWWWWWWWWWSK',
  'KSSSSSSSSSSSK',
  'KSWWWWWWWWWSK',
  'KSSSSSSSSSSSK',
  'KKKKKKKKKKKKK',
  '....KK.KK....',
]
const TV_C = { K: INK, S: '#6b62a8', W: '#dfe7ff' }

/** the friendly ghost (Aquarius's card and the callback) */
function ghost(x, t, cx, cy, cell, k) {
  if (k <= 0.01) return
  drawBits(x, GHOST, GHOST_C, cx, cy + 10 * Math.sin(t * 2.6), cell * k, { alpha: 0.95 })
}

const CAMEOS = [
  { sign: 'aries', cap: 'Started a pillow fight. | Won. *Alone.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', star: { x: -160 }, hops: [0.4, 0.8, 1.2],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) {
        const p = prog(lt, 0.3 + i * 0.35, 0.75 + i * 0.35)
        if (p > 0) drawBits(x, PILLOW, { W: [CREAM, PINK, SKYB][i] }, lerp(480, 820 - i * 10, ease.outCubic(p)), lerp(860, 760 + i * 120, p) , 16, { rot: p * 3 + i })
      }
      label(x, 790, 1110, 'CHAMPION (1 PLAYER)', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'First asleep. | Snack *still in hand.*', mood: 'sleepy', star: { x: -150, y: 20 },
    front(x, t, lt, P) {
      drawBits(x, COOKIE, COOKIE_C, 520, 980, 16 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.2 })
      label(x, 790, 760, 'ASLEEP: 8:15 P.M.', pop01(t, P.t0 + 0.7, 0.3, 2.2), { size: 32, bg: LAV, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 960, 'not asleep | (asleep)', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'gemini', cap: '“One more story.” | *Fourteen* times.', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: lt => [Math.floor(lt * 2.4) % 2 ? 1 : -1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      const n = Math.min(14, 1 + Math.floor(Math.max(0, lt - 0.3) * 6.5))
      bubble(x, 780, 700, 'ok ONE more', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 790, 900, `STORY #${n}`, pop01(t, P.t0 + 0.6, 0.3, 2), { size: 40, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      label(x, 790, 1060, 'TIME: 4 A.M.', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Tucked everyone in. | Read *a bedtime story.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, BOOK, BOOK_C, 790, 900, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.05 })
      label(x, 790, 1080, 'NIGHT-NIGHT, BESTIES', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 28, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 680, 'once upon a time…', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 34, tail: 'bl' })
      hearts(x, t, 790, 860, P.t0 + 1.5, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Truth or dare? | Leo chose *encore.*', mood: 'sparkle', star: { x: -150 }, hops: [0.7, 1.5],
    back(x, t, lt, P) {
      const k = ease.outCubic(prog(lt, 0.2, 0.5))
      if (k <= 0.01) return
      x.save(); x.globalAlpha = 0.3 * k; x.fillStyle = '#fff1b0'
      x.beginPath(); x.moveTo(360, 490); x.lineTo(420, 490); x.lineTo(560, 1180); x.lineTo(220, 1180); x.closePath(); x.fill(); x.restore()
    },
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'thank you, | thank you', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 790, 940, 'ENCORE #3', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 40, bg: ORANGE, rot: 0.05, font: MONO, weight: 700 })
      sparkles(x, t, 390, 860, P.t0 + 0.9, 6, 170, 0.2)
    } },
  { sign: 'virgo', cap: 'Built a fort. | Then *vacuumed it.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    back(x, t, lt, P) {
      drawBits(x, FORT, FORT_C, 790, 980, 22 * pop01(t, P.t0 + 0.15, 0.3, 2))
    },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.6, 0.3, 2)
      drawBits(x, VAC, VAC_C, 620 + 30 * Math.sin(lt * 9) * (lt > 0.9 ? 1 : 0), 1060, 14 * k)
      label(x, 790, 690, 'FORT: SPOTLESS', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Played matchmaker | *till midnight.*', mood: lt => lt > 1.2 ? 'heart' : 'wink', star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const pairs = ['ARIES + LIBRA ✦', 'TAURUS + CANCER ✦', 'SAG + LEO ✦']
      pairs.forEach((s, i) => label(x, 790, 720 + i * 140, s, pop01(t, P.t0 + 0.3 + i * 0.4, 0.3, 2.2), { size: 30, bg: [PINK, GOLD, MINT][i], rot: i % 2 ? 0.05 : -0.05, font: MONO, weight: 700 }))
      hearts(x, t, 790, 900, P.t0 + 1.5, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 4 })
    } },
  { sign: 'scorpio', cap: 'Read everyone’s charts. | *By flashlight.*', mood: lt => lt > 1.4 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 },
    back(x, t, lt, P) {
      const k = ease.outCubic(prog(lt, 0.2, 0.5))
      if (k <= 0.01) return
      x.save(); x.globalAlpha = 0.35 * k; x.fillStyle = '#fff1b0'
      x.beginPath(); x.moveTo(470, 900); x.lineTo(500, 870); x.lineTo(960, 700); x.lineTo(960, 1060); x.closePath(); x.fill(); x.restore()
    },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.4, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 880); x.scale(k, k); x.rotate(t * 0.3)
        const C = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
        x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 118, 0, Math.PI * 2); x.fill()
        for (let i = 0; i < 12; i++) { x.fillStyle = C[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, 110, i / 12 * Math.PI * 2, (i + 1) / 12 * Math.PI * 2); x.closePath(); x.fill() }
        x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, 66, 0, Math.PI * 2); x.fill(); x.restore()
      }
      label(x, 800, 1090, 'CHARTS READ: 11', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 32, bg: '#c97bff', color: CREAM, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Sleepover? | Slept *on the roof.*', mood: lt => lt > 1.2 ? 'sleepy' : 'sparkle', star: { x: 0, y: -90, s: 240 }, hops: [0.5],
    back(x, t, lt, P) {
      drawBits(x, ROOF, ROOF_C, 540, 1040, 28 * pop01(t, P.t0 + 0.1, 0.3, 2))
      drawBits(x, MOON, MOON_C, 830, 620, 16 * pop01(t, P.t0 + 0.5, 0.3, 2))
    },
    front(x, t, lt, P) {
      label(x, 290, 640, 'BEST SPOT', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.06, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Brought an agenda. | Lights out *10:02.*', mood: 'neutral', look: [-1, 0], star: { x: 160 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.1, 0.3, 2)
      if (k <= 0.01) return
      x.save(); x.translate(320, 860); x.scale(k, k); x.rotate(-0.04)
      x.fillStyle = INK; x.fillRect(-160, -220, 320, 440); x.fillStyle = CREAM; x.fillRect(-150, -210, 300, 420)
      x.fillStyle = INK; x.font = `800 30px Inter, Arial, sans-serif`; x.textAlign = 'left'; x.textBaseline = 'middle'
      x.fillText('SLEEPOVER', -125, -165)
      const rows = ['8:00 SNACKS', '8:20 FUN', '8:25 TEETH', '10:02 LIGHTS'], n = Math.floor(clamp((lt - 0.4) / 1.2) * 4.99)
      x.font = `700 26px ${MONO}`
      rows.forEach((r, i) => { if (i < n) { x.fillStyle = i === 3 ? RED : '#2a2350'; x.fillText(r, -125, -95 + i * 70) } })
      x.restore()
    },
    front(x, t, lt, P) {
      label(x, 760, 660, 'FUN: 5 MIN', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 34, bg: '#2fc79a', rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Ghost story? | Made *a new friend.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      ghost(x, t, 800, 860, 22, pop01(t, P.t0 + 0.3, 0.4, 2))
      bubble(x, 790, 640, 'BFFs now', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 44, col: MINT, tail: 'bc' })
      label(x, 800, 1100, 'NEW FRIEND: GARY', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Cried at the movie. | *The menu screen.*', mood: 'wide', tears: lt => lt < 0.8 ? 2 : 3, star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, TV, TV_C, 800, 860, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 1080, '▶ PRESS PLAY', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 32, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 800, 640, 'so beautiful', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'v3t012', key: 'D', accent: LAV, ending: 'callback',
  title: 'The signs at | a *sleepover.*',
  cameos: CAMEOS,
  group: { cap: 'Sleep? | *Never heard of it.*' },
  last: {
    text: 'The ghost stayed | for *breakfast.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.3, 0.45, 2)
      ghost(x, t, 720, 1000, 24, k)
      drawBits(x, PANCAKES, PAN_C, 520, 1150, 18 * pop01(t, t - lt + 0.9, 0.35, 2))
      if (k > 0.01) signChar(x, t, 'aquarius', 340, 1040, 240 * k, { mood: lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], seed: 9, glyph: false })
      hearts(x, t, 540, 960, t - lt + 1.6, { n: 6, life: 2.0, spread: 420, cell: 8, seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
