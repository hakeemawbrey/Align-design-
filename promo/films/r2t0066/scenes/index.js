// r2t0066: star_talk, SOLO, "Your Pisces sibling | be like." (~45 s vertical, signs3kit social cut, music: lofi · C)
// The whole film is one sign (makeFilm solo mode, 9 cards), and Pisces cries in every one.
//   0.0–3.6    "Your Pisces sibling | *be like.*"  One big crying Pisces pops in, then the cards start.
//   3.6–37.8   nine sibling moments (3.8 s each):
//              borrowed your hoodie, it's theirs now · cried at your graduation harder than Mom · you said "fine.",
//              they wrote a poem · one thunderclap, in your bed again (age 27) · owes you ten bucks, paid in coupons
//              · named a plant after you · saw your new match, planned the wedding · your goldfish died in '09,
//              still grieving · family group chat: twelve voice notes
//  37.8        "Your biggest fan. | *Forever.*"  The big Pisces is back.
//  41.2        CALLBACK: "Your hoodie? | *Gone forever.*"  Pisces, cosy in the hoodie, hearts.
import { prog, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CREAM = '#fff4e2', SEA = '#6fc3ff', S = 'pisces'

// ── props
const HOODIE = [
  '...HHHHHHHH...',
  '..HHH....HHH..',
  '.HHHH.WW.HHHH.',
  'HHHHHH..HHHHHH',
  'HHHHHHHHHHHHHH',
  'HHH.HHHHHH.HHH',
  'HHH.HHHHHH.HHH',
  'HHH.HHPPHH.HHH',
  'HHH.HPPPPH.HHH',
  'HHH.HHHHHH.HHH',
  'CCC.HHHHHH.CCC',
  '....CCCCCC....',
]
const HOODIE_C = { H: '#ffb34a', C: '#e08a2a', W: CREAM, P: '#c96a1a' }
const CAPHAT = [
  '......BB......',
  '....BBBBBB....',
  '..BBBBBBBBBB..',
  'BBBBBBBBBBBBBB',
  '..BBBBBBBBBBY.',
  '...BBBBBBBB.Y.',
  '...BBBBBBBB.Y.',
  '...........YYY',
]
const CAPHAT_C = { B: '#8a7fd0', Y: GOLD }
const CLOUD = [
  '....GGGG......',
  '..GGGGGGGG.GG.',
  '.GGGGGGGGGGGGG',
  'GGGGGGGGGGGGGG',
  '.GGGGGGGGGGGG.',
  '......YY......',
  '.....YY.......',
  '....YYYYY.....',
  '......YY......',
  '.....YY.......',
]
const CLOUD_C = { G: '#7a7f99', Y: GOLD }
const PLANT = [
  '..L....L..',
  '.LLL..LLL.',
  'LLLLLLLLLL',
  '.LLLLLLLL.',
  '...LLLL...',
  '....SS....',
  '.PPPPPPPP.',
  '.PPPPPPPP.',
  '..PPPPPP..',
  '..PPPPPP..',
  '...PPPP...',
]
const PLANT_C = { L: '#5fd068', S: '#3a8a3e', P: '#e0a56a' }
const BOWL = [
  '..WWWWWWWW..',
  '.W........W.',
  'WBBBBBBBBBBW',
  'WBBBBBBBBBBW',
  'WBBBBBBBBBBW',
  'WBBBBBBBBBBW',
  '.WBBBBBBBBW.',
  '..WWWWWWWW..',
]
const BOWL_C = { W: '#cfe8ff', B: '#8fe3ff' }
const FISH = ['.OOO.O', 'OOKOOO', 'OOOOOO', '.OOO.O']
const FISH_C = { O: '#ff9a4a', K: INK }

// a sheet of paper with a few lines on it (the poem)
function paper(x, cx, cy, k, lines, { rot = 0.05, w = 300, size = 30, bg = CREAM } = {}) {
  if (k <= 0.01) return
  const h = 80 + lines.length * (size + 16)
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach(([txt, wt], i) => { x.font = `${wt || 700} ${size}px ${INTER}`; x.fillText(txt, 0, -h / 2 + 48 + i * (size + 16)) })
  x.restore()
}
// a coupon (the IOU)
function coupon(x, cx, cy, k, text, rot = 0, col = PINK) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -62, 310, 136)
  x.fillStyle = INK; x.fillRect(-160, -72, 320, 144)
  x.fillStyle = col; x.fillRect(-154, -66, 308, 132)
  x.fillStyle = CREAM; x.fillRect(-140, -52, 280, 104)
  x.fillStyle = col; for (let i = 0; i < 9; i++) x.fillRect(-136 + i * 32, -48, 16, 6)
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.font = `700 22px ${MONO}`; x.fillText('COUPON', 0, -18)
  x.font = `800 34px ${INTER}`; x.fillText(text, 0, 20)
  x.restore()
}
// a phone with voice notes stacking up
function voicePhone(x, t, cx, cy, k, n) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  x.fillStyle = SKYB; x.fillRect(-100, -156, 200, 46)
  x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('FAMILY', 0, -132)
  for (let i = 0; i < Math.min(n, 4); i++) {
    const y = -78 + i * 60
    x.fillStyle = i % 2 ? LAV : PINK; x.fillRect(-94, y - 22, 188, 44)
    x.fillStyle = INK; x.beginPath(); x.moveTo(-80, y - 10); x.lineTo(-80, y + 10); x.lineTo(-64, y); x.fill()
    for (let b = 0; b < 12; b++) { const hh = 6 + 14 * Math.abs(Math.sin(b * 1.9 + i)); x.fillRect(-50 + b * 11, y - hh / 2, 6, hh) }
  }
  x.restore()
}
// a little profile card for the new match
function profile(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -162, 256, 340)
  x.fillStyle = INK; x.fillRect(-134, -174, 268, 348)
  x.fillStyle = '#140c30'; x.fillRect(-126, -166, 252, 332)
  x.fillStyle = MINT; x.fillRect(-114, -154, 228, 44)
  x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('✦ NEW MATCH', 0, -131)
  x.restore()
  signChar(x, t, 'scorpio', cx + 4, cy + 30, 190 * k, { mood: 'wink', seed: 31, glyph: false })
}

const CAMEOS = [
  // 1 · your room: the hoodie
  { sign: S, cap: 'Borrowed your hoodie. | It’s *theirs now.*', mood: lt => lt < 1.1 ? 'wide' : 'heart', tears: lt => lt < 1.1 ? 1 : 2, look: [1, 0], star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, HOODIE, HOODIE_C, 790, 900, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 * Math.sin(t * 2) })
      bubble(x, 790, 640, 'it smells | like home', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 34, col: LAV, tail: 'bl' })
      label(x, 790, 1130, 'YOURS: NO LONGER', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  // 2 · graduation day
  { sign: S, cap: 'Cried at your graduation. | *Harder than Mom.*', mood: 'wide', tears: lt => lt < 0.8 ? 2 : 3, look: [1, -1], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, CAPHAT, CAPHAT_C, 800, 760 - 30 * Math.sin(Math.PI * clamp(lt / 0.8)), 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.08 })
      label(x, 800, 960, 'MOM: FINE', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      label(x, 800, 1060, 'PISCES: NOT', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 800, 760, P.t0 + 0.4, 6, 150, 0.3)
    } },
  // 3 · the kitchen: "fine."
  { sign: S, cap: 'You said “fine.” | They wrote *a poem.*', mood: lt => lt < 0.9 ? 'neutral' : 'sparkle', tears: 2, look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      bubble(x, 790, 620, 'fine.', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 44, tail: 'bc' })
      paper(x, 790, 900, pop01(t, P.t0 + 0.9, 0.3, 2), [['ODE TO', 800], ['“FINE.”', 800], ['a hurt so', 500], ['quiet…', 500]], { rot: 0.05 })
      label(x, 790, 1150, 'PAGE 1 OF 6', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  // 4 · night: a storm
  { sign: S, cap: 'One thunderclap. | *In your bed* again.', mood: lt => lt < 0.9 ? 'wide' : 'sleepy', tears: lt => lt < 0.9 ? 3 : 1, star: { x: -170, y: 30 },
    front(x, t, lt, P) {
      const fl = lt > 0.3 && lt < 0.55 ? 1 : 0
      if (fl) { x.save(); x.fillStyle = 'rgba(255,250,235,0.18)'; x.fillRect(110, 480, 860, 740); x.restore() }
      drawBits(x, CLOUD, CLOUD_C, 790, 720 + Math.sin(t * 2) * 6, 18 * pop01(t, P.t0 + 0.15, 0.3, 2))
      bubble(x, 560, 600, 'scoot over', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 36, tail: 'bl' })
      label(x, 790, 1060, 'AGE: 27', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 42, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  // 5 · the ten bucks
  { sign: S, cap: 'Owes you ten bucks. | Paid you *in coupons.*', mood: lt => lt < 1.0 ? 'squint' : 'sparkle', tears: 1, look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      coupon(x, 790, 760, pop01(t, P.t0 + 0.3, 0.3, 2), '1 FREE HUG', -0.08, PINK)
      coupon(x, 800, 900, pop01(t, P.t0 + 0.6, 0.3, 2), '1 BIG CRY', 0.05, SKYB)
      coupon(x, 790, 1040, pop01(t, P.t0 + 0.9, 0.3, 2), '1 POEM', -0.03, GOLD)
      label(x, 560, 600, 'VALID FOREVER', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
    } },
  // 6 · the windowsill: a plant
  { sign: S, cap: 'Named a plant | *after you.*', mood: lt => lt < 1.0 ? 'happy' : 'heart', tears: 2, look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, PLANT, PLANT_C, 790, 930, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.03 * Math.sin(t * 2) })
      label(x, 790, 1120, 'LIL YOU', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 38, bg: CREAM, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 630, 'it has your | energy', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, col: LAV, tail: 'bc' })
    } },
  // 7 · Align: your new match
  { sign: S, cap: 'Saw your new match. | *Planned the wedding.*', mood: lt => lt < 1.0 ? 'wide' : 'heart', tears: lt => lt < 1.0 ? 1 : 3, look: [1, 0], star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.4, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      profile(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 560, 590, 'I’ll do | the flowers', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 34, tail: 'bl' })
      hearts(x, t, 600, 900, P.t0 + 1.2, { n: 6, life: 1.8, spread: 200, cell: 7, seed: 5 })
      label(x, 790, 1100, 'DATE 1: TOMORROW', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 28, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  // 8 · the goldfish
  { sign: S, cap: 'Your goldfish died in ’09. | *Still grieving.*', mood: lt => lt < 0.9 ? 'neutral' : 'wide', tears: lt => lt < 0.9 ? 1 : 3, look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, BOWL, BOWL_C, 790, 920, 22 * k)
      drawBits(x, FISH, FISH_C, 790 + 40 * Math.sin(t * 1.5), 930, 12 * k, { sx: Math.cos(t * 1.5) > 0 ? 1 : -1 })
      label(x, 790, 700, 'RIP BUBBLES', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 36, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1120, 'DAY 5,000-ish', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  // 9 · the family group chat
  { sign: S, cap: 'Family group chat? | *Twelve voice notes.*', mood: 'sparkle', tears: 2, look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const n = 1 + Math.floor(Math.max(0, lt - 0.3) / 0.3)
      voicePhone(x, t, 790, 860, pop01(t, P.t0 + 0.15, 0.3, 2), n)
      label(x, 790, 1120, 'BEFORE 8 A.M.', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 520, 600, 'ok one more', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0066', key: 'C', accent: SEA, solo: S, ending: 'callback',
  title: 'Your Pisces sibling | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Your biggest fan. | *Forever.*', mood: 'heart' },
  last: {
    text: 'Your hoodie? | *Gone forever.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.4, 0.45, 1.8)
      drawBits(x, HOODIE, HOODIE_C, 540, 1150, 30 * k, { rot: 0.04 * Math.sin(t * 2) })
      if (k > 0.01) signChar(x, t, S, 540, 1030, 220 * k, { mood: 'heart', seed: 40, hops: [t0 + 1.3], tears: 1, glyph: false })
      hearts(x, t, 540, 960, t0 + 1.2, { n: 7, life: 1.8, spread: 300, cell: 7, seed: 8 })
      label(x, 540, 1400, 'ZIPPED. COSY. KEEPING IT.', pop01(t, t0 + 1.4, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
