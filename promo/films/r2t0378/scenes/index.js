// r2t0378: star_talk ROLLCALL, "The signs as | *realtors.*" (~57 s vertical, signs3kit social cut, lofi · G)
// Twelve signs in zodiac order selling a house, each the most extreme version of itself:
//   ♈ sold it before the tour · ♉ fell in love with it, moved in · ♊ pitched it as five different houses
//   · ♋ cookies in every room · ♌ their own face on the SOLD sign · ♍ staged it with a ruler · ♎ compatibility check:
//   you + the kitchen · ♏ knows why the last owners left · ♐ sold the house, bought a van · ♑ the house's five-year plan
//   · ♒ a treehouse, listed as "eco-futurist" · ♓ cried at the window seat
//  49.2   "Twelve agents. | *One open house.*"  group photo
//  52.6   callback: "House: sold. | *Taurus: still home.*"  the house again, Taurus waving from the window.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, pop01, signChar,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#ffb34a', RED = '#e23d4e'
const HOUSE = [
  '.....RR.....',
  '....RRRR....',
  '...RRRRRR...',
  '..RRRRRRRR..',
  '.RRRRRRRRRR.',
  'RRRRRRRRRRRR',
  '.WWWWWWWWWW.',
  '.WBBWWWWBBW.',
  '.WBBWWWWBBW.',
  '.WWWWDDWWWW.',
  '.WWWWDDWWWW.',
  '.WWWWDDWWWW.',
]
const HOUSE_C = { R: '#e2564e', W: '#fff4e2', B: '#8fe3ff', D: '#a8743f' }
// a yard sign on a post
function sign(x, cx, cy, k, text, { bg = RED, color = '#fff4e2', w = 240, face = null, t = 0 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-10, 0, 20, 180); x.fillStyle = '#c98f5a'; x.fillRect(-6, 0, 12, 176)
  const h = face ? 200 : 110
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h, w, h)
  x.fillStyle = color; x.font = `800 48px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, -h + 50)
  x.restore()
  if (face) signChar(x, t, face, cx + 4, cy - 70 * k, 110 * k, { mood: 'wink', seed: 51, glyph: false, glow: 0.4 })
}
const COOKIE = ['.CCCC.', 'CCkCCC', 'CCCCkC', 'CkCCCC', 'CCCkCC', '.CCCC.']
const COOKIE_C = { C: '#d9a05b', k: '#5b2e1a' }
const VAN = [
  '..WWWWWWWWWW....',
  '.WWBBWBBWBBWW...',
  'WWWBBWBBWBBWWWW.',
  'OOOOOOOOOOOOOOOO',
  'WWWWWWWWWWWWWWWW',
  '.KK........KK...',
]
const VAN_C = { W: '#fff4e2', B: '#8fe3ff', O: '#ff9a4a', K: INK }
const TREE = [
  '...GGGGGG...',
  '.GGGGGGGGGG.',
  'GGGGGGGGGGGG',
  'GGHHHHHHHGGG',
  '.GHWBWWBWHG.',
  '..HWWWWWWH..',
  '..HHHHHHHH..',
  '.....TT.....',
  '.....TT.....',
  '.....TT.....',
  '....TTTT....',
]
const TREE_C = { G: '#3e9e5b', H: '#a8743f', W: '#d9a05b', B: '#8fe3ff', T: '#5b2e1a' }
const WINDOW = [
  'KKKKKKKKKK',
  'KBBBBKBBBK',
  'KBBBBKBBBK',
  'KKKKKKKKKK',
  'PPPPPPPPPP',
  'PPPPPPPPPP',
]
const WINDOW_C = { K: '#5b2e1a', B: '#8fe3ff', P: PINK }
// a little rising line chart
function chart(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-156, -116, 312, 232); x.fillStyle = BONE; x.fillRect(-150, -110, 300, 220)
  const p = clamp((lt - 0.3) / 1.2), pts = [[-120, 70], [-60, 40], [0, 50], [60, -10], [120, -70]]
  x.strokeStyle = '#2e9e5b'; x.lineWidth = 10; x.lineJoin = 'round'; x.beginPath()
  const n = 1 + p * (pts.length - 1)
  for (let i = 0; i < Math.floor(n); i++) i ? x.lineTo(...pts[i]) : x.moveTo(...pts[i])
  const f = n - Math.floor(n), a = pts[Math.floor(n) - 1], b = pts[Math.min(pts.length - 1, Math.floor(n))]
  x.lineTo(lerp(a[0], b[0], f), lerp(a[1], b[1], f)); x.stroke()
  x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'left'; x.fillText('YEAR 1 → 5', -136, -84)
  x.restore()
}

const ST = { x: -170 }
const PITCH = ['COZY!', 'MODERN!', 'RUSTIC!', 'BEACHY?', 'ALL FIVE.']
const CAMEOS = [
  { sign: 'aries', cap: 'Sold it | *before the tour.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.4, 0.9],
    front(x, t, lt, P) {
      drawBits(x, HOUSE, HOUSE_C, 760, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      sign(x, 880, 1100, pop01(t, P.t0 + 0.7, 0.3, 2.2) * 0.8, 'SOLD')
      label(x, 790, 640, 'TOUR: CANCELLED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 28, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Fell in love with it. | *Moved in.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, HOUSE, HOUSE_C, 800, 840, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 1090, 'NOT FOR SALE ANYMORE', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 28, bg: MINT, rot: -0.04 })
    } },
  { sign: 'gemini', cap: 'Pitched it as | *five different houses.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 760, PITCH[Math.min(4, Math.floor(Math.max(0, lt - 0.3) / 0.38))], pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 54, col: '#ffe36a', tail: 'bl' })
      drawBits(x, HOUSE, HOUSE_C, 800, 1010, 14 * pop01(t, P.t0 + 0.2, 0.3, 2))
    } },
  { sign: 'cancer', cap: 'Baked cookies | *for every room.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 6; i++) drawBits(x, COOKIE, COOKIE_C, 700 + (i % 3) * 95, 800 + Math.floor(i / 3) * 110, 14 * pop01(t, P.t0 + 0.2 + i * 0.12, 0.25, 2))
      label(x, 790, 1080, 'EVEN THE GARAGE', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 32, bg: PINK, rot: -0.04 })
    } },
  { sign: 'leo', cap: 'Their face | *on the SOLD sign.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sign(x, 800, 1050, pop01(t, P.t0 + 0.2, 0.3, 2), 'SOLD!', { bg: GOLD, color: INK, w: 280, face: 'leo', t })
      sparkles(x, t, 800, 800, P.t0 + 0.8, 8, 180, 0.4)
    } },
  { sign: 'virgo', cap: 'Staged the house. | *With a ruler.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      x.save(); x.translate(790, 860); x.scale(k, k)
      x.fillStyle = INK; x.fillRect(-180, -24, 360, 48); x.fillStyle = GOLD; x.fillRect(-174, -18, 348, 36)
      x.fillStyle = INK; for (let i = 0; i <= 14; i++) x.fillRect(-170 + i * 24, -18, 4, i % 2 ? 12 : 20)
      x.restore()
      label(x, 790, 700, 'CUSHIONS: 0.0° OFF', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 30, bg: MINT, rot: 0.03, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Compatibility check: | you *and the kitchen.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      label(x, 790, 680, '✦ COMPATIBILITY', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 32, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 860, 'YOU + KITCHEN', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 40, bg: BONE, rot: 0.03 })
      label(x, 790, 1040, 'ALIGNED', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 52, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
      hearts(x, t, 790, 980, P.t0 + 1.4, { n: 4, life: 1.4, spread: 200, cell: 7, seed: 2 })
    } },
  { sign: 'scorpio', cap: 'Knows why | *the last owners left.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'why’d they move?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 36, col: BONE, tail: 'br' })
      bubble(x, 790, 960, 'they wanted | a pool.', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 44, col: LAV, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Sold the house. | *Bought a van.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      const go = ease.inCubic(prog(lt, 1.4, 2.4))
      drawBits(x, VAN, VAN_C, 790 + go * 260, 920, 20 * pop01(t, P.t0 + 0.3, 0.3, 2))
      label(x, 790, 700, 'BYE! (KEYS IN MAILBOX)', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 28, bg: '#c97bff', color: '#fff4e2', rot: -0.04 })
    } },
  { sign: 'capricorn', cap: 'Showed the house’s | *five-year plan.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      chart(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 1080, 'GROWTH: PLANNED', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: MINT, rot: 0.04 })
    } },
  { sign: 'aquarius', cap: 'A treehouse. | Listed as *“eco-futurist.”*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      drawBits(x, TREE, TREE_C, 800, 850, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1130, 'VIEWS: SKY', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Cried at | *the window seat.*', mood: 'heart', tears: 3, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, WINDOW, WINDOW_C, 800, 840, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1080, 'SO. COZY.', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 44, bg: PINK, rot: 0.04 })
    } },
]

const F = makeFilm({
  id: 'r2t0378', key: 'G', accent: ACC, ending: 'callback',
  title: 'The signs as | *realtors.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve agents. | *One open house.*' },
  last: {
    text: 'House: sold. | *Taurus: still home.*',
    draw(x, t, lt) {
      const k = pop01(lt, 0.3, 0.4, 2)
      drawBits(x, HOUSE, HOUSE_C, 600, 1150, 46 * k)
      if (k > 0.5) signChar(x, t, 'taurus', 462, 1236, 120, { mood: lt > 1.4 ? 'wink' : 'happy', seed: 85, glyph: false, glow: 0.4 })
      sign(x, 900, 1390, pop01(lt, 0.9, 0.3, 2.2) * 0.9, 'SOLD')
      bubble(x, 300, 960, 'not leaving.', pop01(lt, 1.5, 0.25, 2.2), { size: 40, tail: 'br' })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
