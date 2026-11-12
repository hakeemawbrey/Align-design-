// r2a0314: star_advice, ADVICE ROLLCALL, "What each sign | should do on a free day." (~57 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs in zodiac order, one warm, specific free-day idea each, each with one light visual gag. Ending: callback.
//   0.0–3.6    "Each sign’s | *perfect free day.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one card per sign (3.8 s each):
//              ♈ a walk, racing nobody · ♉ bake something slow, eat it warm · ♊ call the friend you keep meaning to
//              · ♋ a comfort reread in a blanket · ♌ kitchen dance, audience of zero · ♍ the list stays in the drawer
//              · ♎ a café picked on the first try · ♏ a long bath, phone in another room · ♐ get lost in your own city
//              · ♑ a nap for no reason · ♒ build something nobody asked for · ♓ paint something, cry if it's pretty
//  49.2        "Free day. | *Well spent.*"  The twelve fly up into a group photo.
//  52.6        callback: "The painting? | *It’s of you.*" (the easel, paid off).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const PAPER = '#fff4e2', RED = '#e23d4e', WOOD = '#8a4a2e', SUN = '#ffd23a'

// ── props
const SNEAKER = [
  '......KKKK...',
  '.....KWWWWK..',
  '....KWWRWWK..',
  'KKKKWWWWWWWK.',
  'KWWWWWWWWWWWK',
  'KRRRRRRRRRRRK',
  '.KKKKKKKKKKK.',
]
const SNEAKER_C = { K: INK, W: PAPER, R: '#ff6b5a' }
const LOAF = [
  '..W...W...W..',
  '...W...W...W.',
  '..BBBBBBBBB..',
  '.BBbBBbBBbBB.',
  'BBBBBBBBBBBBB',
  'BBBBBBBBBBBBB',
  '.BBBBBBBBBBB.',
]
const LOAF_C = { W: '#d8dbe8', B: '#e8a24a', b: '#fff1b0' }
const PHONE = [
  'KKKKKKKK',
  'KSSSSSSK',
  'KSSHHSSK',
  'KSHHHHSK',
  'KSSHHSSK',
  'KSSSSSSK',
  'KSGSSRSK',
  'KSSSSSSK',
  'KKKGGKKK',
  'KKKKKKKK',
]
const PHONE_C = { K: '#2a2350', S: SKYB, H: '#fff4e2', G: '#5fd068', R: RED }
const BOOK = [
  'BBBBBB.BBBBBB',
  'BWWWWB.BWWWWB',
  'BWLLWBBBWLLWB',
  'BWWWWBBBWWWWB',
  'BWLLWBBBWLLWB',
  'BWWWWBBBWWWWB',
  'BBBBBBBBBBBBB',
]
const BOOK_C = { B: '#6fc3ff', W: PAPER, L: '#b9b0a0' }
const SPATULA = [
  '.KKK.',
  'KGGGK',
  'KGGGK',
  'KGGGK',
  '.KKK.',
  '..B..',
  '..B..',
  '..B..',
  '..B..',
  '..B..',
]
const SPATULA_C = { K: INK, G: '#c9c9d8', B: WOOD }
const DRAWER = [
  'KKKKKKKKKKKKKK',
  'KWWWWWWWWWWWWK',
  'KWWWWWKKWWWWWK',
  'KWWWWWWWWWWWWK',
  'KKKKKKKKKKKKKK',
]
const DRAWER_C = { K: '#7a5230', W: '#c98f5a' }
const PIN = [
  '..RRRRR..',
  '.RRRRRRR.',
  'RRRWWWRRR',
  'RRRWWWRRR',
  '.RRRRRRR.',
  '..RRRRR..',
  '...RRR...',
  '....R....',
]
const PIN_C = { R: RED, W: '#fff' }
const TUB = [
  '.B.B..B..B.B.',
  'BBBBBBBBBBBBB',
  'WWWWWWWWWWWWW',
  'WWWWWWWWWWWWW',
  '.WWWWWWWWWWW.',
  '..K.......K..',
]
const TUB_C = { B: '#e8f4ff', W: '#d8dbe8', K: '#9aa5c4' }
const PILLOW = [
  '.WWWWWWWWWW.',
  'WWWWWWWWWWWW',
  'WWWLWWWWLWWW',
  'WWWWWWWWWWWW',
  '.WWWWWWWWWW.',
]
const PILLOW_C = { W: '#e8e2ff', L: LAV }
const ROBOT = [
  '....Y....',
  '....K....',
  '.GGGGGGG.',
  '.GSGGGSG.',
  '.GGGGGGG.',
  '.GGRRRGG.',
  '...GGG...',
  'GGGGGGGGG',
  'G.GGGGG.G',
  '..G...G..',
]
const ROBOT_C = { Y: SUN, K: INK, G: '#9aa5c4', S: SKYB, R: RED }

/** an easel with a canvas; `paint` 0…1 fills it with colour blobs, `you` draws a tiny portrait star on it */
function easel(x, t, cx, cy, k, paint, you = false) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = WOOD; x.fillRect(-90, 60, 14, 150); x.fillRect(76, 60, 14, 150); x.fillRect(-7, 60, 14, 170)
  x.fillStyle = INK; x.fillRect(-122, -142, 244, 214); x.fillStyle = PAPER; x.fillRect(-114, -134, 228, 198)
  const B = [[-60, -80, '#ff8fb1'], [20, -60, '#8fe3ff'], [-30, 0, '#ffd23a'], [60, 10, '#7dffb0'], [-80, 20, '#c9a6ff']]
  B.forEach(([bx, by, c], i) => { if (paint > i / B.length) { x.fillStyle = c; x.beginPath(); x.arc(bx, by, 34, 0, Math.PI * 2); x.fill() } })
  x.restore()
  if (you) signChar(x, t, 'cancer', cx, cy - 34 * k, 120 * k, { mood: 'heart', seed: 31, glyph: false, glow: 0.4 })
}

const CAMEOS = [
  { sign: 'aries', cap: 'Go for a walk. | *Race nobody.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 }, hops: [0.5],
    front(x, t, lt, P) {
      drawBits(x, SNEAKER, SNEAKER_C, 790, 980, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 720, 'SPEED: GENTLE', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 38, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 850, 'this is nice?!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Bake something slow. | *Eat it warm.*', mood: lt => lt > 1.5 ? 'heart' : 'sleepy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, LOAF, LOAF_C, 790, 960, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 720, `RISING… ${Math.min(3, 1 + Math.floor(lt / 0.6))} HRS`, pop01(t, P.t0 + 0.5, 0.3, 2), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 790, 900, P.t0 + 1.6, { n: 4, life: 1.5, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: 'gemini', cap: 'Call the friend | *you keep meaning to.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      const sh = lt < 1.2 ? Math.sin(t * 40) * 6 : 0
      drawBits(x, PHONE, PHONE_C, 790 + sh, 930, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.06 })
      label(x, 790, 700, 'CALLING: BESTIE', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 30, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1130, 'YOU! finally!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 38, col: '#ffd23a', tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Reread a comfort book. | *Blanket required.*', mood: lt => lt > 1.2 ? 'heart' : 'sleepy', look: [1, 1], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, BOOK, BOOK_C, 790, 930, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 720, 'READ: 9TH TIME', pop01(t, P.t0 + 0.7, 0.3, 2.2), { size: 32, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1110, 'STILL CRIED AT CH. 4', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 28, bg: BONE, rot: 0.04 })
    } },
  { sign: 'leo', cap: 'Dance in the kitchen. | *No audience needed.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.5, 1.0, 1.5, 2.0],
    front(x, t, lt, P, F) {
      drawBits(x, SPATULA, SPATULA_C, F.x + 150, F.cy, 13 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.4 + 0.2 * Math.sin(t * 6) })
      notes(x, t, 790, 860, { n: 4, cell: 7, col: GOLD, seed: 2 })
      label(x, 800, 700, 'AUDIENCE: 0', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 34, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 800, 1110, 'VIBES: SOLD OUT', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.04 })
    } },
  { sign: 'virgo', cap: 'Leave the list | *in the drawer.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 1], star: { x: -170 },
    front(x, t, lt, P) {
      const shut = ease.inOutCubic(prog(lt, 0.8, 1.3))
      x.save(); x.globalAlpha = 1 - shut
      label(x, 790, lerp(840, 980, shut), 'TO-DO: 37 THINGS', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 28, bg: PAPER, rot: -0.03 })
      x.restore()
      drawBits(x, DRAWER, DRAWER_C, 790, 1010, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 700, 'DRAWER: CLOSED', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      if (lt > 1.4) sparkles(x, t, 790, 1000, P.t0 + 1.4, 6, 150, 0.3)
    } },
  { sign: 'libra', cap: 'Pick a café | *on the first try.*', mood: lt => lt > 1.0 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -170 }, hops: [1.1],
    front(x, t, lt, P) {
      drawBits(x, PIN, PIN_C, 790, 900, 18 * pop01(t, P.t0 + 0.6, 0.3, 2.4))
      label(x, 790, 700, 'CHOSEN IN: 1 TRY', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 32, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1090, 'proud of me?', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 38, tail: 'bl' })
      if (lt > 1.0) sparkles(x, t, 790, 880, P.t0 + 1.05, 6, 130, 0.2)
    } },
  { sign: 'scorpio', cap: 'A long bath. | *Phone in another room.*', mood: 'sleepy', star: { x: -170, y: -10 },
    front(x, t, lt, P) {
      drawBits(x, TUB, TUB_C, 790, 1010, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 700, 'PHONE: 2 ROOMS AWAY', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 28, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 820, 'MYSTERY: RECHARGING', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 28, bg: BONE, rot: 0.04 })
    } },
  { sign: 'sagittarius', cap: 'Get lost | *in your own city.*', mood: 'sparkle', look: [-1, 0], star: { x: 160 }, hops: [0.6, 1.4],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k <= 0.01) return
      x.save(); x.translate(320, 880); x.rotate(-0.04); x.scale(k, k)
      x.fillStyle = INK; x.fillRect(-150, -130, 300, 260); x.fillStyle = '#d9f0c8'; x.fillRect(-142, -122, 284, 244)
      x.fillStyle = '#b5d8a0'; x.fillRect(-142, -20, 284, 30); x.fillRect(-20, -122, 30, 244)
      x.strokeStyle = RED; x.lineWidth = 6; x.setLineDash([12, 10]); x.beginPath()
      const n = Math.floor(clamp((lt - 0.3) / 1.4) * 40)
      for (let i = 0; i <= n; i++) { const u = i / 40, px = -110 + u * 220 + 40 * Math.sin(u * 13), py = 90 - u * 180 + 30 * Math.cos(u * 9); i ? x.lineTo(px, py) : x.moveTo(px, py) }
      x.stroke(); x.restore()
    },
    front(x, t, lt, P) {
      label(x, 320, 680, 'ROUTE: NONE', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 700, 630, 'new bakery?!', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 36, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'Take a nap. | *No reason needed.*', mood: 'sleepy', look: [-1, 0], star: { x: 160 },
    front(x, t, lt, P) {
      drawBits(x, PILLOW, PILLOW_C, 320, 980, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 320, 720, 'NAP: APPROVED', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 36, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      label(x, 320, 820, 'PRODUCTIVITY: 0', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 28, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Build something | *nobody asked for.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.5],
    front(x, t, lt, P) {
      drawBits(x, ROBOT, ROBOT_C, 790, 950, 20 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: 0.05 * Math.sin(t * 4) })
      label(x, 790, 700, 'PURPOSE: UNCLEAR', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 30, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1150, 'it waves!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Paint something. | *Cry if it’s pretty.*', mood: lt => lt > 1.5 ? 'heart' : 'happy', tears: lt => lt > 1.5 ? 3 : 1, look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      easel(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), prog(lt, 0.3, 1.4))
      label(x, 790, 1130, lt > 1.5 ? 'IT’S BEAUTIFUL' : 'JUST A LITTLE ART', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 30, bg: lt > 1.5 ? PINK : LAV, rot: -0.04 })
    } },
]

const F = makeFilm({
  id: 'r2a0314', key: 'E', accent: SUN, ending: 'callback',
  title: 'Each sign’s | *perfect free day.*',
  cameos: CAMEOS,
  group: { cap: 'Free day. | *Well spent.*' },
  last: {
    text: 'The painting? | *It’s of you.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.3, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'pisces', 370, 1120, 260 * k, { mood: lt > 1.5 ? 'heart' : 'happy', look: [1, 0], seed: 12, tears: 3, hops: [t - lt + 1.4] })
      easel(x, t, 720, 1080, pop01(t, t - lt + 0.6, 0.4, 2), 1, lt > 1.0)
      hearts(x, t, 560, 1000, t - lt + 1.4, { n: 7, life: 2.0, spread: 420, cell: 8, seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
