// r2a0125: ADVICE ROLLCALL, "Each sign's | rainy-day plan." (~62 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs in zodiac order, rain on the window behind every card: one warm rainy-day plan each, one light gag.
//   0.0–3.6    "Each sign’s | rainy-day *plan.*"
//   3.6–49.2   ♈ puddle jumping (joy counts as cardio) · ♉ baking something that smells like home · ♊ texting a match about the rain
//              · ♋ old photos (happy tears allowed) · ♌ a dance party for one · ♍ one drawer, just one · ♎ any movie is fine
//              · ♏ a mystery novel, no interruptions · ♐ planning the next trip from the couch · ♑ rest (yes, you too)
//              · ♒ one weird new skill (today: juggling) · ♓ watching the rain, crying a little (cozy)
//  49.2        "Twelve plans. | *All valid.*"
//  52.4        LESSON UNLOCKED: "Slow days | are *good days too.*"  FORECAST: COZY
//  58.3        "Rain check? | *Granted.*"  An umbrella pops open over the group photo.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, notes, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CREAM = '#fff4e2', GREEN = '#7ee08a', RAIN = '#8fc8ff'

// ── props
const BOOTS = ['.YYY..YYY.', '.YYY..YYY.', '.YYY..YYY.', 'YYYY.YYYY.', 'YYYYYYYYYY', 'KKKKKKKKKK']
const LOAF = ['..BBBBBBB..', '.BBbBBbBBB.', 'BBBBBBBBBBB', 'BBBBBBBBBBB', 'BBBBBBBBBBB', '.BBBBBBBBB.']
const STEAM = ['.S.', 'S..', '.S.', '..S', '.S.']
const PHONE = ['KKKKKKKK', 'KSSSSSSK', 'KSSSSSSK', 'KSSSSSSK', 'KSSSSSSK', 'KSSSSSSK', 'KSSSSSSK', 'KSSSSSSK', 'KKKGGKKK']
const DISCO = ['...SSS...', '.SWSWSWS.', 'SWSWSWSWS', 'WSWSWSWSW', 'SWSWSWSWS', '.SWSWSWS.', '...SSS...']
const DRAWER = ['KKKKKKKKKKKK', 'KWWWWWWWWWWK', 'KWWWWHHWWWWK', 'KWWWWWWWWWWK', 'KKKKKKKKKKKK']
const BOOK = ['RRRRRRRRRR', 'RWWWWWWWWR', 'RWKKKKKKWR', 'RWWWWWWWWR', 'RWKKKKKWWR', 'RWWWWWWWWR', 'RWKKKKKKWR', 'RWWWWWWWWR', 'RRRRRRRRRR']
const GLOBE = ['...BBBBB...', '.BBGGBBBBB.', 'BBGGGGBBBGB', 'BBBGGBBBGGB', 'BBBBBBBGGGB', '.BBBGBBBBB.', '...BBBBB...', '.....K.....', '...KKKKK...']
const LAPTOP = ['.KKKKKKKKKK.', '.KSSSSSSSSK.', '.KSSSSSSSSK.', '.KSSSSSSSSK.', '.KKKKKKKKKK.', 'GGGGGGGGGGGG']
const BALL = ['.CC.', 'CCCC', 'CCCC', '.CC.']
const PHOTO = ['WWWWWWWW', 'WSSSSSSW', 'WSYYSSSW', 'WSSSGGSW', 'WGGGGGGW', 'WWWWWWWW', 'WWWWWWWW']
const UMBRELLA = ['....RRRRR....', '..RRRRRRRRR..', '.RRWRRRRRWRR.', 'RRRRRRRRRRRRR', 'R..R..K..R..R', '......K......', '......K......', '......K......', '....K.K......', '.....K.......']

// rain on the window behind each card
function rain(x, t, k) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha = 0.45 * clamp(k); x.fillStyle = RAIN
  for (let i = 0; i < 26; i++) { const px = 120 + ((i * 137) % 840), ph = ((t * 0.9 + i * 0.173) % 1), py = 490 + ph * 720; x.fillRect(px, py, 4, 22) }
  x.restore()
}
const R = (x, t, P) => rain(x, t, P.k)

const CAMEOS = [
  { sign: 'aries', cap: 'Puddle jumping. | *Joy counts as cardio.*', mood: lt => lt > 0.9 ? 'wide' : 'sparkle', star: { x: -170 }, hops: [0.6, 1.2, 1.8],
    back: R,
    front(x, t, lt, P, F) {
      drawBits(x, BOOTS, { Y: GOLD, K: INK }, F.x, F.cy + 170, 12 * pop01(t, P.t0 + 0.2, 0.3, 2))
      x.save(); x.globalAlpha = clamp(P.k); x.fillStyle = INK; x.beginPath(); x.ellipse(F.x, 1100, 160, 26, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = RAIN; x.beginPath(); x.ellipse(F.x, 1100, 150, 20, 0, 0, Math.PI * 2); x.fill(); x.restore()
      label(x, 800, 760, 'SPLASH × 14', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 40, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Baking something | *that smells like home.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    back: R,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      drawBits(x, LOAF, { B: '#e8a24a', b: '#c47a2a' }, 790, 920, 22 * k)
      for (let i = 0; i < 3; i++) drawBits(x, STEAM, { S: BONE }, 730 + i * 60, 790 - ((t * 40 + i * 25) % 60), 10 * k, { alpha: 0.7 })
      label(x, 790, 1080, 'KITCHEN: WARM', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 34, bg: GREEN, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Texting a match | *about the rain.*', mood: lt => lt > 1.4 ? 'heart' : 'wink', look: [1, 0], star: { x: -170 },
    back: R,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, PHONE, { K: '#2a2350', S: '#140c30', G: '#6b62a8' }, 820, 900, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 780, 760, 'it’s pouring!!', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 36, tail: 'bl', col: '#fff1a8' })
      bubble(x, 820, 900, 'same ♡', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, tail: 'br', col: '#ffd6e4' })
    } },
  { sign: 'cancer', cap: 'Old photos. | *Happy tears allowed.*', mood: 'heart', tears: lt => lt > 1.2 ? 1 : 0, look: [1, 0], star: { x: -170 },
    back: R,
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) drawBits(x, PHOTO, { W: CREAM, S: SKYB, Y: GOLD, G: GREEN }, 700 + i * 90, 900 - (i % 2) * 40, 16 * pop01(t, P.t0 + 0.3 + i * 0.25, 0.3, 2), { rot: (i - 1) * 0.15 })
      hearts(x, t, 790, 800, P.t0 + 1.4, { n: 4, life: 1.5, spread: 160, cell: 7, seed: 3 })
    } },
  { sign: 'leo', cap: 'A dance party | *for one.*', mood: 'sparkle', star: { x: -170 }, hops: [0.5, 1.0, 1.5, 2.0],
    back: R,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      x.save(); x.fillStyle = INK; x.globalAlpha = clamp(k); x.fillRect(786, 520, 8, 110); x.restore()
      drawBits(x, DISCO, { S: '#c9c9d8', W: '#ffffff' }, 790, 680, 16 * k, { rot: t * 0.6 })
      notes(x, t, 790, 1000, { n: 5, cell: 8, col: GOLD, alpha: k, seed: 3 })
      label(x, 790, 1100, 'GUEST LIST: ME', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'One drawer. | *Just one. Then rest.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -170 },
    back: R,
    front(x, t, lt, P) {
      drawBits(x, DRAWER, { K: INK, W: '#e8b46a', H: GOLD }, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1060, 'DRAWERS: 1/1 ✓', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: GREEN, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Picking a movie? | *Any movie is fine.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 },
    back: R,
    front(x, t, lt, P) {
      const pick = Math.min(4, Math.floor(Math.max(0, lt - 0.3) / 0.35))
      label(x, 790, 820, ['COMEDY?', 'ROMANCE?', 'BOTH?', 'NEITHER?', 'THIS ONE ✓'][pick], pop01(t, P.t0 + 0.3, 0.3, 2), { size: 44, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 980, 'TIME: 4 MIN. PROUD.', pop01(t, P.t0 + 1.8, 0.3, 2.2), { size: 30, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'A mystery novel. | *No interruptions.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 },
    back: R,
    front(x, t, lt, P) {
      drawBits(x, BOOK, { R: '#c4507a', W: CREAM, K: '#6b62a8' }, 790, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.06 })
      label(x, 790, 1090, 'DO NOT DISTURB', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: '#c97bff', color: CREAM, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Planning the next trip | *from the couch.*', mood: 'sparkle', look: [1, 0], star: { x: -170 },
    back: R,
    front(x, t, lt, P) {
      drawBits(x, GLOBE, { B: '#6fc3ff', G: GREEN, K: INK }, 790, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: Math.sin(t * 2) * 0.05 })
      label(x, 790, 1090, 'TABS OPEN: 31', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: '#ff9a4a', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Rest. | *Yes, you too.*', mood: lt => lt > 1.2 ? 'sleepy' : 'neutral', look: [1, 0], star: { x: -170 },
    back: R,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, LAPTOP, { K: INK, S: lt > 1.0 ? '#2a2350' : SKYB, G: '#9aa5c4' }, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 720, 'OUT OF OFFICE ✦', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'A weird new skill. | *Today: juggling.*', mood: lt => lt > 1.4 ? 'wide' : 'sparkle', look: [0, -1], star: { x: -170 },
    back: R,
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      ;[PINK, GOLD, GREEN].forEach((c, i) => { const a = t * 4 + i * 2.1; drawBits(x, BALL, { C: c }, F.x + Math.cos(a) * 110, F.top - 50 - Math.abs(Math.sin(a)) * 120, 18 * k) })
      label(x, 790, 900, 'DROPS: MANY', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 36, bg: '#5fd0c8', rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1040, 'FUN: ALL OF IT', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 32, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Watching the rain. | *Crying a little. Cozy.*', mood: 'sleepy', tears: 2, look: [1, 0], star: { x: -170 },
    back(x, t, lt, P) {
      R(x, t, P)
      x.save(); x.globalAlpha = clamp(P.k); x.fillStyle = INK; x.fillRect(640, 640, 300, 360); x.fillStyle = '#2a3a6a'; x.fillRect(652, 652, 276, 336)
      x.fillStyle = INK; x.fillRect(784, 652, 12, 336); x.fillRect(652, 814, 276, 12)
      x.fillStyle = RAIN; for (let i = 0; i < 10; i++) { const ph = (t * 1.2 + i * 0.13) % 1; x.fillRect(664 + (i * 29) % 256, 660 + ph * 310, 4, 18) }
      x.restore()
    },
    front(x, t, lt, P) { label(x, 790, 1080, 'PEACEFUL. SOGGY.', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 32, bg: SKYB, rot: 0.04, font: MONO, weight: 700 }) } },
]

const F = makeFilm({
  id: 'r2a0125', key: 'G', accent: RAIN, ending: 'lesson',
  title: 'Each sign’s | rainy-day *plan.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve plans. | *All valid.*', moods: ['wide', 'heart', 'wink', 'heart', 'sparkle', 'sparkle', 'heart', 'wink', 'sparkle', 'sleepy', 'wide', 'sleepy'] },
  lesson: { text: 'Slow days | are *good days too.*', chip: 'FORECAST: COZY' },
  last: {
    text: 'Rain check? | *Granted.*',
    draw(x, t, lt) {
      drawBits(x, UMBRELLA, { R: PINK, W: CREAM, K: BONE }, 540, 740, 20 * pop01(t, t - lt + 0.7, 0.45, 2))
      sparkles(x, t, 540, 720, t - lt + 0.9, 8, 220, 0.3)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
