// v3t045: THE SIGNS AS… v3, "The signs when | it snows." (~57 s vertical, signs3kit social cut, music: lofi · G)
//   0.0–3.6    "The signs when | it *snows.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one snow day per sign (3.8 s each), each pushed to the extreme:
//              ♈ first flake, already sledding · ♉ soup, then more soup · ♊ built two snowmen to argue with
//              · ♋ snowed in, called mom four times · ♌ built a snowman of themself, with a crown · ♍ shovelled the path,
//              then measured it · ♎ twelve scarves, can't pick one · ♏ snowball fight, planned since July
//              · ♐ snow? booked a ski trip, gone · ♑ snow day? logged on anyway · ♒ named every snowflake
//              · ♓ cried at a snowflake: it's unique
//  49.2        "Snow day | for *everyone.*"
//  52.6        callback: "Spring came. | *Still standing.*" (the crowned snowman is back, under the sun)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', BROWN = '#8a4a2e', ORANGE = '#ff9a4a'

const FLAKE = ['..W..', 'W.W.W', '.WWW.', 'WWWWW', '.WWW.', 'W.W.W', '..W..']
const SNOWMAN = [
  '...YYY...',
  '..YYYYY..',
  '...WWW...',
  '..WKWKW..',
  '..WWOWW..',
  '...WWW...',
  '.RRRRRRR.',
  '.WWWWWWW.',
  'WWWWKWWWW',
  'WWWWWWWWW',
  'WWWWKWWWW',
  '.WWWWWWW.',
]
const SNOWMAN_C = { Y: GOLD, W: '#f4f8ff', K: INK, O: ORANGE, R: RED }
const PLAIN = SNOWMAN.map((r, i) => i < 2 ? r.replace(/Y/g, '.') : r)
const SLED = [
  'R..........R',
  'RRRRRRRRRRRR',
  '.RRRRRRRRRR.',
  'S.S......S.S',
  'SSSSSSSSSSSS',
]
const SLED_C = { R: RED, S: '#c9c9d8' }
const BOWL = [
  '.S..S..S.',
  '..S..S..S',
  'OOOOOOOOO',
  'BBBBBBBBB',
  '.BBBBBBB.',
  '..BBBBB..',
]
const BOWL_C = { S: '#ffffff', O: ORANGE, B: SKYB }
const SNOWBALL = ['.WWW.', 'WWWWW', 'WWWWW', 'WWWWW', '.WWW.']
const LAPTOP = [
  '.KKKKKKKKKK.',
  '.KSSSSSSSSK.',
  '.KSSSSSSSSK.',
  '.KSSSSSSSSK.',
  '.KKKKKKKKKK.',
  'GGGGGGGGGGGG',
]
const LAPTOP_C = { K: '#2a2350', S: SKYB, G: '#9aa5c4' }

function snowfall(x, t, n = 14, alpha = 0.7) {
  for (let i = 0; i < n; i++) {
    const ph = ((t * 0.25 + i / n) % 1)
    drawBits(x, FLAKE, { W: '#ffffff' }, 140 + ((i * 137) % 800) + Math.sin(t + i) * 20, 500 + ph * 700, 3.5, { alpha: alpha * Math.sin(Math.PI * ph), outline: null })
  }
}

const CAMEOS = [
  { sign: 'aries', cap: 'First flake? | *Already sledding.*', mood: 'sparkle', star: { x: -200, y: -30, s: 260 }, hops: [0.6, 1.2],
    back(x, t, lt) { snowfall(x, t) },
    front(x, t, lt, P, F) {
      drawBits(x, SLED, SLED_C, F.x, F.cy + 140, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 760, 'SNOW: 1 FLAKE', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 34, bg: BONE, rot: 0.05, font: MONO, weight: 700 })
      label(x, 790, 960, 'WHEEEE', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 48, bg: RED, color: '#fff4e2', rot: -0.05 })
    } },
  { sign: 'taurus', cap: 'Snow day? | Soup. *Then more soup.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: { x: -180 },
    back(x, t, lt) { snowfall(x, t) },
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) drawBits(x, BOWL, BOWL_C, 800, 1040 - i * 120, 18 * pop01(t, P.t0 + 0.3 + i * 0.5, 0.3, 2.2))
      label(x, 800, 620, 'BOWL 3', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Built two snowmen. | *For the debate.*', mood: 'sparkle', look: [1, 0], star: { x: -200 }, hops: [0.7, 1.4],
    back(x, t, lt) { snowfall(x, t) },
    front(x, t, lt, P) {
      drawBits(x, PLAIN, SNOWMAN_C, 700, 960, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, PLAIN, SNOWMAN_C, 880, 960, 16 * pop01(t, P.t0 + 0.4, 0.3, 2))
      bubble(x, 680, 680, 'tea!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, tail: 'bl' })
      bubble(x, 880, 760, 'coffee!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, tail: 'br' })
    } },
  { sign: 'cancer', cap: 'Snowed in. | Called *mom four times.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -180 },
    back(x, t, lt) { snowfall(x, t) },
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.4) * 3)
      label(x, 800, 720, `CALL ${n}: MOM`, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 38, bg: PINK, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 800, 940, 'are you warm??', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, tail: 'bl' })
      label(x, 800, 1110, 'DISTANCE: 1 STREET', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 28, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Built a snowman. | *Of themself.*', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', star: { x: -200 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt) { snowfall(x, t) },
    front(x, t, lt, P) {
      drawBits(x, SNOWMAN, SNOWMAN_C, 800, 870, 26 * pop01(t, P.t0 + 0.3, 0.35, 2))
      label(x, 800, 1140, 'LIFE-SIZE (ROYAL)', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 800, 660, P.t0 + 1.2, 7, 140, 0.3)
    } },
  { sign: 'virgo', cap: 'Shovelled the path. | *Then measured it.*', mood: 'squint', look: [1, 0], star: { x: -180 },
    back(x, t, lt) { snowfall(x, t) },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      x.save(); x.globalAlpha = k; x.fillStyle = INK; x.fillRect(640, 880, 320, 40); x.fillStyle = GOLD; x.fillRect(644, 884, 312, 32)
      x.fillStyle = INK; for (let i = 0; i <= 12; i++) x.fillRect(650 + i * 25, 884, 3, i % 4 ? 12 : 22); x.restore()
      label(x, 800, 720, 'WIDTH: 1.000 m', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 36, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      label(x, 800, 1060, 'EXACTLY', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 40, bg: BONE, rot: 0.05 })
    } },
  { sign: 'libra', cap: 'Twelve scarves. | *Can’t pick one.*', mood: lt => lt > 1.4 ? 'squint' : 'happy', look: lt => [Math.sin(lt * 4) > 0 ? 1 : -1, 0], star: { x: -200 },
    back(x, t, lt) { snowfall(x, t) },
    front(x, t, lt, P) {
      const cols = [RED, GOLD, MINT, SKYB, LAV, PINK]
      const n = Math.min(12, Math.floor(clamp((lt - 0.2) / 1.2) * 12) + 1)
      for (let i = 0; i < n; i++) { const c = i % 2, r = Math.floor(i / 2); x.fillStyle = INK; x.fillRect(672 + c * 130, 600 + r * 82, 116, 52); x.fillStyle = cols[(i + r) % 6]; x.fillRect(676 + c * 130, 604 + r * 82, 108, 44); x.fillStyle = 'rgba(255,255,255,0.35)'; x.fillRect(676 + c * 130 + 20, 604 + r * 82, 12, 44) }
    } },
  { sign: 'scorpio', cap: 'Snowball fight? | *Planned since July.*', mood: 'squint', look: [1, 0], star: { x: -200 },
    back(x, t, lt) { snowfall(x, t) },
    front(x, t, lt, P) {
      const n = Math.floor(clamp((lt - 0.2) / 1.2) * 10)
      for (let i = 0; i < n; i++) { const r = i < 4 ? 0 : i < 7 ? 1 : i < 9 ? 2 : 3, c = i < 4 ? i : i < 7 ? i - 4 : i < 9 ? i - 7 : 0; drawBits(x, SNOWBALL, { W: '#f4f8ff' }, 680 + c * 76 + r * 38, 1060 - r * 66, 12) }
      label(x, 800, 680, 'STOCKPILE: JULY', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: RED, color: '#fff4e2', rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Snow? | Booked *a ski trip.* Gone.', mood: 'sparkle', star: { x: -200 }, hops: [1.2],
    back(x, t, lt) { snowfall(x, t) },
    front(x, t, lt, P) {
      label(x, 800, 720, 'OUT OF OFFICE', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 38, bg: GOLD, rot: 0.05 })
      label(x, 800, 900, 'BACK: ???', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 40, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 800, 1090, 'see ya!', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 42, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Snow day? | *Logged on anyway.*', mood: 'neutral', look: [1, 0], star: { x: -200 },
    back(x, t, lt) { snowfall(x, t) },
    front(x, t, lt, P) {
      drawBits(x, LAPTOP, LAPTOP_C, 800, 860, 22 * pop01(t, P.t0 + 0.3, 0.3, 2))
      label(x, 800, 660, 'OFFICE: CLOSED', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 32, bg: BONE, rot: -0.05, font: MONO, weight: 700 })
      label(x, 800, 1060, 'ONLINE: 6:00 AM', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Studied every flake. | *Named them all.*', mood: lt => lt > 1.2 ? 'wide' : 'sparkle', look: [1, 0], star: { x: -200 },
    back(x, t, lt) { snowfall(x, t) },
    front(x, t, lt, P) {
      const names = ['Gerald', 'Moonpie', 'Flake 4,012', 'Kevin']
      names.forEach((s, i) => {
        const k = pop01(t, P.t0 + 0.3 + i * 0.4, 0.3, 2.2)
        drawBits(x, FLAKE, { W: '#ffffff' }, 680, 660 + i * 135, 9 * k)
        label(x, 840, 660 + i * 135, s, k, { size: 32, bg: [SKYB, LAV, BONE, MINT][i], rot: i % 2 ? 0.05 : -0.04, font: MONO, weight: 700 })
      })
    } },
  { sign: 'pisces', cap: 'One snowflake. | Cried. *It’s unique.*', mood: 'happy', tears: lt => lt > 0.9 ? 3 : 2, look: [1, -1], star: { x: -200 },
    back(x, t, lt) { snowfall(x, t) },
    front(x, t, lt, P) {
      drawBits(x, FLAKE, { W: '#ffffff' }, 800, 800, 22 * pop01(t, P.t0 + 0.3, 0.3, 2))
      bubble(x, 800, 1040, 'one of a kind!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 42, col: LAV, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'v3t045', key: 'G', accent: SKYB, ending: 'callback',
  title: 'The signs when | it *snows.*',
  cameos: CAMEOS,
  group: { cap: 'Snow day | for *everyone.*' },
  last: {
    text: 'Spring came. | *Still standing.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.4, 1.8)
      drawBits(x, SNOWMAN, SNOWMAN_C, 540, 1020, 36 * k)
      label(x, 790, 760, '24°C', pop01(t, t - lt + 1.0, 0.3, 2.2), { size: 44, bg: GOLD, rot: 0.06, font: MONO, weight: 700 })
      sparkles(x, t, 540, 900, t - lt + 1.2, 8, 200, 0.4)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
