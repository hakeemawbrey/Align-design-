// v3t130: THE SIGNS AS… v3, "The signs | cleaning up." (~57 s vertical, signs3kit social cut, music: lofi · G)
//   0.0–3.6    hook. The twelve line up, then dive into the pip row.
//   3.6–49.2   every sign cleaning their room, pushed to the extreme:
//              ♈ done in five minutes, closet: do not open · ♉ started cleaning, napped on the laundry · ♊ found an old
//              phone, cleaning over · ♋ can't throw anything out, it has memories · ♌ cleaned the room, gave a tour
//              · ♍ cleaned the room, then the broom · ♎ couldn't pick a spot for one sock · ♏ owns only black things,
//              is it clean? · ♐ didn't clean, held a yard sale · ♑ cleaning plan, phase one of twelve · ♒ the mess is a
//              system, don't touch · ♓ found their old teddy, cleaning cancelled
//  49.2        "Clean room? | *Define clean.*"
//  52.6        callback: "Aries’ closet? | *Do not open.*" (the closet comes back, rattling)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', DARK = '#2a2350', STEEL = '#9aa5c4', BROWN = '#8a4a2e', GREEN = '#5fd068'

const LAUNDRY = [
  '....PP.......',
  '..PPPPMM.....',
  '.PPMMMMMLL...',
  'BBBMMMLLLLLL.',
  'BBBBBLLLLWWWW',
  'BBBBBBWWWWWWW',
]
const LAUNDRY_C = { P: PINK, M: MINT, L: LAV, B: SKYB, W: BONE }
const PHONE = [
  'KKKKKK',
  'KGGGGK',
  'KGGGGK',
  'KGGGGK',
  'KKKKKK',
  'KWKWKK',
  'KKWKWK',
  'KKKKKK',
]
const TICKET = [
  'GGGGGGGGGG',
  'G.KKK.KK.G',
  'GGGGGGGGGG',
]
const BROOM = [
  '....K',
  '...K.',
  '..K..',
  '.K...',
  'YYY..',
  'YYYY.',
  'YYYYY',
]
const SOCK = [
  '.WWW',
  '.WPW',
  '.WWW',
  '.WPW',
  'WWWW',
  'WWW.',
]
const BEAR = [
  'BB...BB',
  'BBBBBBB',
  '.BKBKB.',
  '.BBPBB.',
  '..BBB..',
  '.BBBBB.',
  'BBBBBBB',
  '.BB.BB.',
]
const BEAR_C = { B: '#c98a5a', K: INK, P: PINK }
const SHIRT = [
  'SS...SS',
  'SSSSSSS',
  '.SSSSS.',
  '.SSSSS.',
  '.SSSSS.',
]

// a closet door that rattles (and is bulging)
function closet(x, t, cx, cy, s, k, rattle) {
  if (k <= 0.01) return
  x.save(); x.translate(cx + Math.sin(t * 40) * rattle, cy); x.rotate(Math.sin(t * 33) * rattle * 0.004); x.scale(k * s, k * s)
  x.fillStyle = INK; x.fillRect(-110, -170, 220, 340)
  x.fillStyle = BROWN; x.fillRect(-100, -160, 200, 320)
  x.fillStyle = '#6b3a22'; x.fillRect(-4, -160, 8, 320)
  x.fillStyle = GOLD; x.fillRect(-24, -10, 12, 30); x.fillRect(12, -10, 12, 30)
  // something poking out at the bottom
  x.fillStyle = PINK; x.fillRect(-60, 160, 40, 18); x.fillStyle = MINT; x.fillRect(20, 160, 50, 14)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Done in five minutes. | *Closet: do not open.*', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', star: { x: -160 }, hops: [0.3, 0.6],
    front(x, t, lt, P) {
      closet(x, t, 800, 880, 1, pop01(t, P.t0 + 0.2, 0.3, 2), lt > 1.0 ? 4 : 0)
      label(x, 800, 650, '0:05:00', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 40, bg: RED, color: BONE, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Started cleaning. | *Napped on the laundry.*', mood: lt => lt > 0.9 ? 'sleepy' : 'happy', star: { x: -40, y: -40 }, squash: lt => lt > 0.9 ? 0.06 : 0,
    back(x, t, lt, P) { drawBits(x, LAUNDRY, LAUNDRY_C, 520, 1060, 34 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      label(x, 790, 640, 'PROGRESS: NAP', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 36, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Found an old phone. | *Cleaning: over.*', mood: lt => lt > 0.8 ? 'wide' : 'happy', look: [1, 1], star: { x: -160 },
    front(x, t, lt, P) {
      drawBits(x, PHONE, { K: DARK, G: '#2fc79a', W: STEEL }, 790, 900, 22 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: 0.08 })
      bubble(x, 790, 680, 'OMG the | old chats', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 790, 1100, 'HOUR 3', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 38, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Can’t throw it out. | *It has memories.*', mood: lt => lt > 1.0 ? 'heart' : 'wide', star: { x: -160 },
    front(x, t, lt, P) {
      drawBits(x, TICKET, { G: GOLD, K: INK }, 790, 860, 20 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: -0.08 })
      bubble(x, 790, 680, 'our first | bus ticket', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 38, tail: 'bl' })
      label(x, 790, 1040, 'KEEPING: ALL', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 38, bg: SKYB, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Cleaned the room. | *Gave a tour.*', mood: 'sparkle', look: [1, 0], star: { x: -160 }, hops: [0.8],
    front(x, t, lt, P) {
      label(x, 790, 720, 'TOURS · 2 P.M.', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 38, bg: '#ffb34a', rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 920, 'and on your | left: me', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Cleaned the room. | Then *cleaned the broom.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      drawBits(x, BROOM, { K: BROWN, Y: '#ffd23a' }, 790 + Math.sin(t * 8) * 10 * clamp(lt - 0.4), 900, 30 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (lt > 0.8) sparkles(x, t, 790, 900, P.t0 + 1.1, 8, 170, 0.2, [MINT, BONE, SKYB])
      label(x, 790, 660, 'BROOM: CLEAN', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 36, bg: MINT, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Couldn’t pick a spot | *for one sock.*', mood: lt => lt > 1.6 ? 'wide' : 'happy', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      const sx = 790 + (Math.floor(lt * 2.5) % 2 ? 90 : -90)
      drawBits(x, SOCK, { W: BONE, P: PINK }, sx, 900, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 680, 'here? | there?', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 790, 1100, 'SOCK: HOMELESS', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 34, bg: PINK, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Owns only black things. | *Is it clean?*', mood: 'neutral', look: [1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) drawBits(x, SHIRT, { S: '#120a24' }, 680 + (i % 2) * 200, 780 + Math.floor(i / 2) * 170, 18 * pop01(t, P.t0 + 0.3 + i * 0.15, 0.3, 2), { outline: STEEL })
      label(x, 790, 1120, 'CLEAN? UNCLEAR.', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 34, bg: LAV, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Didn’t clean. | *Held a yard sale.*', mood: 'sparkle', star: { x: -160 }, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      label(x, 790, 720, 'YARD SALE', pop01(t, P.t0 + 0.3, 0.3, 2.4), { size: 52, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
      label(x, 790, 900, 'EVERYTHING: 1 COIN', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 30, bg: BONE, rot: 0.05 })
      bubble(x, 790, 1070, 'even the bed!', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Cleaning plan: | *phase one of twelve.*', mood: lt => lt < 1.0 ? 'neutral' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 880); x.rotate(0.04); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-150, -170, 300, 340); x.fillStyle = BONE; x.fillRect(-142, -162, 284, 324)
        x.fillStyle = INK; x.font = `800 32px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('THE PLAN', 0, -125)
        for (let i = 0; i < 12; i++) { x.fillStyle = i === 0 && lt > 1.0 ? '#2fc79a' : '#c9c0b0'; x.fillRect(-110 + (i % 4) * 58, -70 + Math.floor(i / 4) * 70, 46, 46) }
        x.restore()
      }
      label(x, 790, 1110, 'PHASE 1/12', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 36, bg: '#2fc79a', rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'The mess is | *a system.* Don’t touch.', mood: lt => lt > 1.0 ? 'squint' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      for (let i = 0; i < 5; i++) drawBits(x, SOCK, { W: [MINT, LAV, GOLD, PINK, SKYB][i], P: INK }, 660 + i * 66, 1000 - (i % 2) * 60, 13 * pop01(t, P.t0 + 0.2 + i * 0.1, 0.3, 2), { rot: (i - 2) * 0.4 })
      label(x, 790, 760, 'IT’S ART', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 44, bg: SKYB, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Found their old teddy. | *Cleaning cancelled.*', mood: lt => lt < 0.7 ? 'happy' : 'heart', tears: lt => lt < 0.7 ? 1 : 3, star: { x: -160 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, BEAR, BEAR_C, 790, 900, 20 * pop01(t, P.t0 + 0.3, 0.3, 2))
      bubble(x, 790, 680, 'MR. BUTTONS', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 42, tail: 'bl' })
      hearts(x, t, 790, 1000, P.t0 + 1.0, { n: 5, life: 1.8, spread: 160, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'v3t130', key: 'G', accent: MINT, ending: 'callback',
  title: 'The signs | *cleaning up.*',
  cameos: CAMEOS,
  group: { cap: 'Clean room? | *Define clean.*' },
  last: {
    text: 'Aries’ closet? | *Do not open.*',
    draw(x, t, lt) {
      closet(x, t, 540, 1080, 1.3, pop01(t, t - lt + 0.5, 0.35, 2), lt > 1.2 ? 6 : 0)
      label(x, 540, 830, 'DO NOT OPEN', pop01(t, t - lt + 1.3, 0.3, 2.4), { size: 44, bg: RED, color: BONE, rot: -0.05, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
