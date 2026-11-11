// v3t121: THE SIGNS AS… v3, "The signs | at the gym." (~56 s vertical, signs3kit social cut, music: lofi · C)
//   0.0–3.6    hook. The twelve line up, then dive into the pip row.
//   3.6–49.2   one gym trip per sign, pushed to the extreme:
//              ♈ max weight on day one, lifted the bench too · ♉ came for one rep, stayed for the smoothies
//              · ♊ started twelve machines, finished none · ♋ brought protein shakes for everyone · ♌ one rep, asked for
//              applause · ♍ wiped the machine, then the whole gym · ♎ picked an outfit, missed the class · ♏ plank, held
//              it for an hour · ♐ ran on the treadmill, then out the door · ♑ joined at 5 a.m., now owns the gym
//              · ♒ invented a machine nobody understands · ♓ dropped a dumbbell, apologised to it (sobbing)
//  49.2        "Gains? | *Emotional ones.*"
//  52.6        callback: "The dumbbell | *forgave Pisces.*" (the dumbbell comes back, hearts)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', STEEL = '#9aa5c4', DARK = '#2a2350'

const BARBELL = [
  'KK..............KK',
  'KKK............KKK',
  'KKKSSSSSSSSSSSSKKK',
  'KKK............KKK',
  'KK..............KK',
]
const BAR_C = { K: DARK, S: STEEL }
const DUMBBELL = [
  'KK......KK',
  'KKSSSSSSKK',
  'KK......KK',
]
const SMOOTHIE = [
  '....SS..',
  '....S...',
  'WWWWWWWW',
  '.PPPPPP.',
  '.PPPPPP.',
  '.PWPPPP.',
  '..PPPP..',
  '..PPPP..',
]
const SMOOTHIE_C = { S: GOLD, W: BONE, P: PINK }
const SHAKER = [
  '.KKKK.',
  'WWWWWW',
  'WMMMMW',
  'WMMMMW',
  'WMMMMW',
  'WWWWWW',
]
const SPRAY = [
  '..KKK...',
  '.KKKKKK.',
  '..WW....',
  '.MMMM...',
  '.MMMM...',
  '.MMMM...',
  '.MMMM...',
]
const SPRAY_C = { K: DARK, W: BONE, M: MINT }
const HANGER = [
  '...KK...',
  '..K..K..',
  '....K...',
  '..KKKK..',
  '.K....K.',
  'KKKKKKKK',
]
const DOOR = [
  'KKKKKKKKK',
  'KBBBBBBBK',
  'KBBBBBBBK',
  'KBBBBBBBK',
  'KBBBBBGBK',
  'KBBBBBBBK',
  'KBBBBBBBK',
  'KBBBBBBBK',
  'KBBBBBBBK',
]
const DOOR_C = { K: INK, B: '#8a4a2e', G: GOLD }
const KEY = [
  '.GGG.......',
  'GG.GGGGGGGG',
  '.GGG...G.G.',
]

// the treadmill belt the star runs on
function treadmill(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -18, 340, 40)
  x.fillStyle = DARK; x.fillRect(-162, -12, 324, 28)
  x.fillStyle = STEEL; for (let i = 0; i < 9; i++) { const sx = ((i * 40 - t * 160) % 324 + 324) % 324 - 162; x.fillRect(sx, -8, 14, 4) }
  x.fillStyle = INK; x.fillRect(130, -170, 18, 160); x.fillRect(110, -186, 70, 22)
  x.restore()
}
// a mad machine: wheels, a pipe, a blinking light
function contraption(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-130, -20, 260, 150)
  x.fillStyle = STEEL; x.fillRect(-122, -12, 244, 134)
  for (const [wx, wy, r] of [[-70, 40, 40], [50, 70, 30]]) {
    x.save(); x.translate(wx, wy); x.rotate(t * (wx < 0 ? 3 : -4))
    x.fillStyle = INK; x.fillRect(-r, -6, r * 2, 12); x.fillRect(-6, -r, 12, r * 2); x.restore()
  }
  x.fillStyle = INK; x.fillRect(80, -120, 20, 110); x.fillRect(80, -130, 70, 20)
  x.fillStyle = Math.floor(t * 4) % 2 ? MINT : PINK; x.fillRect(-110, -70, 40, 40)
  x.fillStyle = GOLD; x.fillRect(-40, -60, 30, 30)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Max weight, day one. | Lifted *the bench too.*', mood: lt => lt > 1.2 ? 'wide' : 'sparkle', star: { x: -150 }, hops: [0.5, 1.0],
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      const up = ease.outBack(clamp((lt - 0.6) / 0.35)) * 70
      drawBits(x, BARBELL, BAR_C, F.x, F.top - 50 - up, 22 * k)
      label(x, 790, 760, 'PR: EVERYTHING', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 34, bg: RED, color: BONE, rot: 0.06 })
      bubble(x, 790, 960, 'more plates!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, tail: 'bl' })
      sparkles(x, t, F.x, F.top - 100, P.t0 + 0.9, 6, 150, 0.3)
    } },
  { sign: 'taurus', cap: 'Came for one rep. | Stayed for *the smoothies.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', star: { x: -160 },
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) drawBits(x, SMOOTHIE, SMOOTHIE_C, 690 + i * 110, 960 - (i % 2) * 30, 15 * pop01(t, P.t0 + 0.3 + i * 0.35, 0.3, 2))
      label(x, 790, 720, 'SMOOTHIES: 3', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 38, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Started twelve machines. | *Finished none.*', mood: lt => Math.floor(lt * 2.8) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.8) % 2 ? 1 : -1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      const n = Math.min(12, 1 + Math.floor(Math.max(0, lt - 0.2) / 0.16))
      label(x, 790, 700, `MACHINE ${n}`, pop01(t, P.t0 + 0.25, 0.3, 2), { size: 44, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      for (let i = 0; i < Math.min(n, 12); i++) {
        const cx = 670 + (i % 4) * 80, cy = 840 + Math.floor(i / 4) * 80
        x.fillStyle = INK; x.fillRect(cx - 26, cy - 26, 52, 52); x.fillStyle = i < n - 1 ? STEEL : MINT; x.fillRect(cx - 20, cy - 20, 40, 40)
        x.fillStyle = INK; x.fillRect(cx - 8, cy - 4, 16, 8)
      }
    } },
  { sign: 'cancer', cap: 'Brought protein shakes. | *For everyone.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', star: { x: -160 },
    front(x, t, lt, P) {
      for (let i = 0; i < 6; i++) drawBits(x, SHAKER, { K: DARK, W: BONE, M: [PINK, MINT, LAV, GOLD, SKYB, PINK][i] }, 670 + (i % 3) * 120, 900 + Math.floor(i / 3) * 140, 15 * pop01(t, P.t0 + 0.25 + i * 0.1, 0.3, 2))
      bubble(x, 790, 680, 'did you eat?', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 42, tail: 'bl' })
    } },
  { sign: 'leo', cap: 'Did one rep. | Waited for *applause.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', star: { x: -150 }, hops: [0.6],
    front(x, t, lt, P, F) {
      drawBits(x, DUMBBELL, BAR_C, F.x + 130, F.cy - 40 - ease.outBack(clamp((lt - 0.4) / 0.3)) * 60, 18 * pop01(t, P.t0 + 0.15, 0.3, 2))
      label(x, 790, 760, 'REPS: 1', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 40, bg: '#ffb34a', rot: 0.06, font: MONO, weight: 700 })
      bubble(x, 790, 960, 'clap. | i’ll wait.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Wiped the machine. | Then *the whole gym.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, SPRAY, SPRAY_C, 790 + Math.sin(t * 9) * 8 * clamp(lt - 0.4), 870, 22 * k, { rot: -0.15 })
      if (lt > 0.5) sparkles(x, t, 790, 860, P.t0 + 0.7, 8, 180, 0.2, [MINT, BONE, SKYB])
      label(x, 790, 1100, 'GYM: SPOTLESS', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 34, bg: MINT, rot: -0.05 })
    } },
  { sign: 'libra', cap: 'Picked a gym outfit. | *Missed the class.*', mood: lt => lt > 1.6 ? 'wide' : 'happy', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      const n = Math.min(5, 1 + Math.floor(Math.max(0, lt - 0.2) / 0.28))
      for (let i = 0; i < n; i++) drawBits(x, HANGER, { K: [PINK, LAV, MINT, GOLD, SKYB][i] }, 680 + i * 55, 700 + (i % 2) * 20, 13)
      label(x, 790, 860, `OUTFIT ${n}`, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 40, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
      label(x, 790, 1060, 'CLASS: ENDED', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 36, bg: BONE, rot: -0.05 })
    } },
  { sign: 'scorpio', cap: 'Planked once. | Held it *for an hour.*', mood: lt => lt > 1.4 ? 'squint' : 'neutral', look: [1, 0], star: { x: -150, y: 40 }, squash: 0.1,
    front(x, t, lt, P) {
      const mins = Math.min(59, Math.floor(clamp((lt - 0.3) / 1.6) * 59))
      label(x, 790, 760, `00:${String(mins).padStart(2, '0')}:00`, pop01(t, P.t0 + 0.25, 0.3, 2), { size: 52, bg: INK, color: '#c97bff', rot: 0, font: MONO, weight: 700 })
      bubble(x, 790, 960, 'not tired.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 40, col: LAV, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Ran on the treadmill. | Then *out the door.*', mood: 'sparkle', star: { x: -160, y: -20 }, hops: [0.3, 0.6, 0.9],
    back(x, t, lt, P) {
      treadmill(x, t, 380, 1000, pop01(t, P.t0 + 0.1, 0.3, 2))
      drawBits(x, DOOR, DOOR_C, 820, 860, 30 * pop01(t, P.t0 + 0.5, 0.3, 2))
    },
    front(x, t, lt, P) {
      label(x, 820, 640, 'BACK NEXT MONTH', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.05 })
    } },
  { sign: 'capricorn', cap: 'Joined at 5 a.m. | Now *owns the gym.*', mood: lt => lt < 1.2 ? 'neutral' : 'happy', look: [1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      drawBits(x, KEY, { G: GOLD }, 790, 900, 20 * pop01(t, P.t0 + 0.9, 0.3, 2.2), { rot: -0.2 })
      label(x, 790, 700, '5:00 A.M.', pop01(t, P.t0 + 0.25, 0.3, 2), { size: 40, bg: STEEL, rot: 0.05, font: MONO, weight: 700 })
      label(x, 790, 1080, 'OWNER: CAPRICORN', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: '#2fc79a', rot: -0.05 })
    } },
  { sign: 'aquarius', cap: 'Invented a new machine. | *Nobody knows how.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      contraption(x, t, 790, 880, pop01(t, P.t0 + 0.3, 0.35, 2))
      bubble(x, 790, 660, 'it works | your soul', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 36, col: MINT, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Dropped a dumbbell. | *Apologised* to it.', mood: lt => lt < 0.8 ? 'happy' : 'wide', tears: lt => lt < 0.8 ? 1 : 3, star: { x: -160 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const fall = ease.inQuad(clamp((lt - 0.3) / 0.35))
      drawBits(x, DUMBBELL, BAR_C, 790, lerp(700, 1080, fall), 20 * pop01(t, P.t0 + 0.15, 0.3, 2), { rot: fall * 0.3 })
      bubble(x, 790, 760, 'i’m so | sorry!!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 42, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'v3t121', key: 'C', accent: '#ff6b5a', ending: 'callback',
  title: 'The signs | *at the gym.*',
  cameos: CAMEOS,
  group: { cap: 'Gains? | *Emotional ones.*' },
  last: {
    text: 'The dumbbell | *forgave Pisces.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'pisces', 380, 1080, 320 * k, { mood: lt > 1.4 ? 'heart' : 'wide', tears: lt > 1.4 ? 1 : 2, seed: 51, glyph: false, hops: [t - lt + 1.4] })
      drawBits(x, DUMBBELL, { K: LAV, S: BONE }, 740, 1170, 30 * pop01(t, t - lt + 0.7, 0.3, 2))
      bubble(x, 740, 960, 'it’s okay.', pop01(t, t - lt + 1.2, 0.25, 2.2), { size: 52, tail: 'bc' })
      hearts(x, t, 540, 1300, t - lt + 1.6, { n: 8, life: 2.0, spread: 800, cell: 8, seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
