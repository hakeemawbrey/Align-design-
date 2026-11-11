// v3t008: THE SIGNS AS… v3, "Zodiacs in the rain | be like." (~63 s vertical, signs3kit social cut, music: lofi · E)
//   0.0–3.6    "Zodiacs in the rain | *be like.*"
//   3.6–49.2   one rainy moment per sign (3.8 s each), each pushed to the extreme:
//              ♈ raced the rain home, lost · ♉ refused to run, walked, dignified · ♊ narrated the storm like a sports game
//              · ♋ shared their umbrella, now it's a match · ♌ danced in the rain like a music video · ♍ checked the forecast, and their horoscope
//              · ♎ hair got wet, cancelled the day · ♏ loves storms, feels understood · ♐ went hiking anyway, in flip-flops
//              · ♑ a spare umbrella for the spare · ♒ stood in the rain, "for research" · ♓ out-cried the rain
//  49.2        "Soaked. | *Every one.*"
//  52.4        LESSON UNLOCKED: "Some days it rains. | *Share the umbrella.*"  FORECAST: SUNNY
//  58.3        "Capricorn lent | *the spare.*" (lesson ending).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ORANGE = '#ffb34a', RED = '#e23d4e', BROWN = '#8a4a2e', GREEN = '#5fd068'

const UMB = [
  '......K......',
  '...UUUUUUU...',
  '.UUUUUUUUUUU.',
  'UUUuUUUuUUUuU',
  'U..U..U..U..U',
  '......K......',
  '......K......',
  '......K......',
  '......K......',
  '......KK.KK..',
  '.......KKK...',
]
const CLOUD = [
  '....WWW.......',
  '..WWWWWWW.WW..',
  '.WWWWWWWWWWWW.',
  'WWWWWWWWWWWWWW',
  '.WWWWWWWWWWWW.',
]
const BOLT = ['..YY', '.YY.', 'YYYY', '..YY', '.YY.', 'YY..']
const BOOT = ['....', 'FFFF', '..FF']
const MIC = ['.GGG.', 'GGGGG', '.GGG.', '..K..', '..K..', '..K..', '..K..']
const PUDDLE = ['..BBBBBBBB..', '.BBBBBBBBBB.', 'BBBBBBBBBBBB', '.BBBBBBBBBB.']

// rain streaks over the panel
function rain(x, t, k = 1, { x0 = 110, x1 = 970, n = 40, heavy = 1 } = {}) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha = 0.55 * k; x.fillStyle = SKYB
  for (let i = 0; i < n; i++) {
    const ph = ((t * (1.4 + (i % 5) * 0.12) * heavy + i * 0.137) % 1 + 1) % 1
    const px = x0 + ((i * 97) % (x1 - x0)), py = 490 + ph * 740
    x.fillRect(px, py, 4, 26)
  }
  x.restore()
}
// a cloud with a little rain under it
function cloud(x, t, cx, cy, s, k = 1, col = '#c9c9d8') {
  drawBits(x, CLOUD, { W: col }, cx, cy, s * k)
}

const CAMEOS = [
  { sign: 'aries', cap: 'Raced the rain home. | *Lost.*', mood: lt => lt > 1.4 ? 'wide' : 'sparkle', star: { x: -100 }, hops: [0.2, 0.45, 0.7, 0.95, 1.2],
    back(x, t, lt, P) { rain(x, t, clamp(lt * 2), { heavy: 1.4 }) },
    front(x, t, lt, P) {
      label(x, 800, 680, 'RAIN: 1 · ARIES: 0', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
      drawBits(x, PUDDLE, { B: '#6fc3ff' }, 440, 1150, 18 * pop01(t, P.t0 + 1.0, 0.3, 2))
    } },
  { sign: 'taurus', cap: 'Refused to run. | Walked. *Dignified.*', mood: lt => lt > 1.1 ? 'squint' : 'neutral', star: { x: -170 },
    back(x, t, lt, P) { rain(x, t, clamp(lt * 2), { heavy: 1.1 }) },
    front(x, t, lt, P) {
      label(x, 800, 760, 'PACE: SLOW', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 38, bg: MINT, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 800, 960, 'I don’t | rush.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 42, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Narrated the storm. | Like *a sports game.*', mood: lt => Math.floor(lt * 2.8) % 2 ? 'wide' : 'sparkle', look: [1, -1], star: { x: -170 }, hops: [1.0, 1.6],
    back(x, t, lt, P) { rain(x, t, clamp(lt * 2)) },
    front(x, t, lt, P) {
      drawBits(x, MIC, { G: '#c9c9d8', K: '#2a2350' }, 560, 900, 13 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.3 })
      cloud(x, t, 800, 640, 20, pop01(t, P.t0 + 0.1, 0.3, 2))
      if (lt > 0.9 && lt < 1.3) drawBits(x, BOLT, { Y: GOLD }, 800, 740, 16)
      bubble(x, 800, 900, 'AND THE | THUNDER!!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Shared their umbrella. | Now *it’s a match.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -130, s: 260 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) { rain(x, t, 1) },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'capricorn', 700, 890, 230 * k, { mood: lt > 1.3 ? 'heart' : 'happy', look: [-1, 0], seed: 13, glyph: false })
      drawBits(x, UMB, { U: '#6fc3ff', u: '#a8d8ff', K: INK }, 560, 700, 24 * pop01(t, P.t0 + 0.15, 0.3, 2))
      label(x, 760, 1120, '✦ IT’S A MATCH', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 620, 780, P.t0 + 1.4, { n: 5, life: 1.6, spread: 180, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Danced in the rain. | Like a *music video.*', mood: 'sparkle', star: { x: -150 }, hops: [0.5, 0.9, 1.3, 1.7],
    back(x, t, lt, P) {
      rain(x, t, 1)
      const k = ease.outCubic(prog(lt, 0.2, 0.5))
      x.save(); x.globalAlpha = 0.3 * k; x.fillStyle = '#fff1b0'
      x.beginPath(); x.moveTo(350, 490); x.lineTo(430, 490); x.lineTo(590, 1180); x.lineTo(190, 1180); x.closePath(); x.fill(); x.restore()
    },
    front(x, t, lt, P) {
      label(x, 800, 720, 'TAKE 14', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 44, bg: BONE, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 800, 920, 'again, | slower', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, tail: 'bl' })
      sparkles(x, t, 390, 860, P.t0 + 1.0, 6, 170, 0.2)
    } },
  { sign: 'virgo', cap: 'Checked the forecast. | And *their horoscope.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      label(x, 800, 660, 'RAIN: 4:02 P.M.', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 34, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      label(x, 800, 790, '♍︎ TODAY: STAY DRY', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 32, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
      drawBits(x, UMB, { U: '#2fc79a', u: MINT, K: INK }, 800, 1010, 22 * pop01(t, P.t0 + 1.4, 0.3, 2.4))
    } },
  { sign: 'libra', cap: 'Hair got wet. | *Cancelled the day.*', mood: lt => lt > 0.9 ? 'wide' : 'sparkle', star: { x: -170 },
    back(x, t, lt, P) { rain(x, t, clamp((lt - 0.5) * 3)) },
    front(x, t, lt, P, F) {
      cloud(x, t, F.x, F.top - 70, 14, pop01(t, P.t0 + 0.4, 0.3, 2), '#9a97b8')
      label(x, 800, 760, 'TODAY: CANCELLED', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 32, bg: RED, color: '#fff4e2', rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 800, 960, 'my HAIR', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 44, col: LAV, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'Loves a storm. | Feels *understood.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, -1], star: { x: -170 },
    back(x, t, lt, P) { rain(x, t, 1, { heavy: 1.5 }) },
    front(x, t, lt, P) {
      cloud(x, t, 800, 640, 20, pop01(t, P.t0 + 0.1, 0.3, 2), '#6b6890')
      if (Math.floor(lt * 3) % 3 === 1) drawBits(x, BOLT, { Y: GOLD }, 820, 760, 18)
      bubble(x, 800, 960, 'finally, | someone gets me', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Went hiking anyway. | *In flip-flops.*', mood: 'sparkle', star: { x: 150 }, hops: [0.4, 0.8, 1.2],
    back(x, t, lt, P) { rain(x, t, 1) },
    front(x, t, lt, P) {
      for (let i = 0; i < 2; i++) drawBits(x, BOOT, { F: PINK }, 640 + i * 60, 1130, 12 * pop01(t, P.t0 + 0.6, 0.3, 2))
      label(x, 330, 760, 'TRAIL: MUD', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 36, bg: BROWN, color: '#fff4e2', rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 330, 940, 'it’s fine!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 40, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'Brought a spare umbrella. | For *the spare.*', mood: lt => lt < 1.2 ? 'neutral' : 'happy', look: [1, 0], star: { x: -190, s: 260 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) { rain(x, t, 1) },
    front(x, t, lt, P) {
      const C = [['#2fc79a', MINT], ['#6fc3ff', '#a8d8ff'], ['#c97bff', LAV]]
      for (let i = 0; i < 3; i++) drawBits(x, UMB, { U: C[i][0], u: C[i][1], K: INK }, 610 + i * 125, 860 + (i % 2) * 50, 15 * pop01(t, P.t0 + 0.3 + i * 0.4, 0.3, 2))
      label(x, 770, 1110, 'BACKUP OF BACKUP', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Stood in the rain. | Called it *“research.”*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [0, -1], star: { x: -170 },
    back(x, t, lt, P) { rain(x, t, 1) },
    front(x, t, lt, P) {
      label(x, 800, 700, 'HOUR 6', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 42, bg: SKYB, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 800, 900, 'fascinating.', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 800, 1080, 'DROPS: COUNTED', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Rainy day. | Pisces *out-cried it.*', mood: lt => lt < 0.9 ? 'neutral' : 'wide', tears: lt => lt < 0.9 ? 2 : 3, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) { rain(x, t, clamp(1 - prog(lt, 1.0, 1.4)) + 0.001) },
    front(x, t, lt, P) {
      cloud(x, t, 800, 680, 18, pop01(t, P.t0 + 0.1, 0.3, 2) * (1 - prog(lt, 1.1, 1.5)))
      label(x, 800, 880, 'RAIN: 1 · PISCES: 9', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: LAV, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 800, 1060, 'the cloud | left?!', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'v3t008', key: 'E', accent: SKYB,
  title: 'Zodiacs in the rain | *be like.*',
  cameos: CAMEOS,
  ending: 'lesson',
  group: { cap: 'Soaked. | *Every one.*' },
  lesson: { text: 'Some days it rains. | *Share the umbrella.*', chip: 'FORECAST: SUNNY' },
  last: {
    text: 'Capricorn lent | *the spare.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 10, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
