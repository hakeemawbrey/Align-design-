// v3t003: THE SIGNS AS… v3, "The signs | go camping." (~64 s vertical, signs3kit social cut, music: lofi · E)
//   0.0–3.6    "The signs | go *camping.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one camping trip per sign (3.8 s each), each pushed to the extreme:
//              ♈ raced there first, forgot the tent · ♉ brought an armchair · ♊ talked till the owls left
//              · ♋ homesick in twenty minutes · ♌ campfire story about themself · ♍ read the tent manual twice, aloud
//              · ♎ fairy lights and a rug in the tent · ♏ stared at the fire till it looked away · ♐ short walk, back Tuesday
//              · ♑ assigned the tents by compatibility · ♒ brought a telescope, named a new star
//              · ♓ the marshmallow fell in, Pisces held a funeral
//  49.2        "Roughing it. | *Kind of.*"
//  52.4        LESSON UNLOCKED: "Go outside together. | It's *worth the bugs.*"  CAMP: SET
//  58.3        "Sag came back. | *With the tent.*" over the match card: Aries + Sagittarius (the forgotten tent, paid off).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ORANGE = '#ffb34a', RED = '#e23d4e', BROWN = '#8a4a2e', GREEN = '#5fd068'

const TENT = [
  '......K......',
  '.....GGG.....',
  '....GGGGG....',
  '...GGGgGGG...',
  '..GGGGgGGGG..',
  '.GGGGgggGGGG.',
  'GGGGGgggGGGGG',
]
const TENT_C = { G: GREEN, g: '#2a6b3a', K: BROWN }
const CHAIR = [
  '.RRRRRRRR.',
  'RRrRRRRrRR',
  'RRRRRRRRRR',
  'RRrRRRRrRR',
  'RRRRRRRRRR',
  'RRRRRRRRRR',
  'RRRRRRRRRR',
  'RRCCCCCCRR',
  'RRCCCCCCRR',
  'RRRRRRRRRR',
  '.K......K.',
]
const CHAIR_C = { R: '#c24a6a', r: '#e27a96', C: '#e27a96', K: '#5a2e1a' }
const OWL = [
  'B.....B',
  'BBBBBBB',
  'BWKBWKB',
  'BBBYBBB',
  'BBbbbBB',
  'BBbbbBB',
  '.BBBBB.',
  '..Y.Y..',
]
const OWL_C = { B: '#9a7a5a', b: '#d8c0a0', W: '#ffffff', K: INK, Y: GOLD }
const FIRE = [
  '....F.....',
  '...FF..F..',
  '..FFYF.FF.',
  '..FYYFFFF.',
  '.FFYWYYFF.',
  '.FYWWWYFF.',
  'FFYWWWYYFF',
  '.FYYYYYYF.',
  'LLLLLLLLLL',
  '.LL.LL.LL.',
]
const FIRE_C = { F: '#ff6b3a', Y: '#ffd23a', W: '#fff1b0', L: BROWN }
const BOOK = [
  'BBBBBBBBBBBB',
  'BWWWWWBWWWWW',
  'BWKKKWBWKKKW',
  'BWWWWWBWWWWW',
  'BWKKWWBWKKKW',
  'BWWWWWBWWWWW',
  'BWKKKWBWKKWW',
  'BWWWWWBWWWWW',
  'BBBBBBBBBBBB',
]
const BOOK_C = { B: '#6b62a8', W: '#fff4e2', K: '#b9b0a0' }
const TELESCOPE = [
  '..........GG',
  '........GGGG',
  '......GGGGG.',
  '....GGGGG...',
  '..GGGGG.....',
  '.GGGG.......',
  '..KK........',
  '.K..K.......',
  'K....K......',
]
const TELE_C = { G: '#9aa5c4', K: '#2a2350' }
const MARSH = [
  '.WWW.',
  'WWWWW',
  'WWWWW',
  '.WWW.',
  '..K..',
  '..K..',
  '..K..',
  '..K..',
  '..K..',
]
const MARSH_C = { W: '#fff4e2', K: BROWN }
const FLOWER = [
  '.P.P.',
  'PPYPP',
  '.PPP.',
  '..G..',
  '.GG..',
  '..G..',
]
const SIGNPOST = [
  'WWWWWWWWWWWW.',
  'WWWWWWWWWWWWW',
  'WWWWWWWWWWWW.',
  '.....K.......',
  '.....K.......',
  '.....K.......',
  '.....K.......',
]

// a whiteboard with tent pairings by sign glyph
function board(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = BROWN; x.fillRect(-100, 150, 14, 150); x.fillRect(86, 150, 14, 150)
  x.fillStyle = INK; x.fillRect(-176, -166, 352, 326)
  x.fillStyle = '#fff4e2'; x.fillRect(-168, -158, 336, 310)
  x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('TENTS', 0, -124)
  const rows = ['A · ♈︎ + ♐︎', 'B · ♉︎ + ♑︎', 'C · ♋︎ + ♓︎', 'D · ♊︎ + ♒︎']
  const n = Math.floor(clamp((lt - 0.4) / 1.2) * 4 + 0.001)
  x.font = `700 42px 'Segoe UI Symbol', 'Noto Sans Symbols', 'Noto Sans Symbols 2', ${MONO}`
  const C = ['#ff6b5a', '#2fc79a', '#6fc3ff', '#ffd23a']
  for (let i = 0; i < Math.min(n + 1, 4); i++) { x.fillStyle = C[i]; x.fillText(rows[i], 0, -60 + i * 62) }
  x.restore()
}
// a tent with a string of fairy lights and a rug in front
function cosyTent(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  drawBits(x, TENT, { ...TENT_C, G: PINK, g: '#a8456a' }, cx, cy, 34 * k)
  if (k < 0.9) return
  const on = Math.floor(clamp((lt - 0.5) / 1.0) * 9)
  for (let i = 0; i < 9; i++) {
    const a = i / 8, px = cx - 210 + a * 420, py = cy - 110 + Math.abs(a - 0.5) * 220 - 60 * Math.sin(Math.PI * a)
    x.fillStyle = INK; x.fillRect(px - 9, py - 9, 18, 18)
    x.fillStyle = i < on ? ['#fff1b0', PINK, MINT, SKYB][i % 4] : '#4a4070'; x.fillRect(px - 6, py - 6, 12, 12)
  }
  x.fillStyle = INK; x.fillRect(cx - 170, cy + 120, 340, 44)
  x.fillStyle = GOLD; x.fillRect(cx - 164, cy + 126, 328, 32)
  x.fillStyle = RED; for (let i = 0; i < 8; i++) x.fillRect(cx - 150 + i * 40, cy + 134, 20, 16)
}

const CAMEOS = [
  { sign: 'aries', cap: 'Got there first. | *Forgot the tent.*', mood: lt => lt > 1.2 ? 'wide' : 'sparkle', star: { x: -160 }, hops: [0.3, 0.6, 0.9],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 790, 700, 'FIRST! ✦', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 44, bg: GOLD, rot: -0.05 })
      x.save(); x.globalAlpha = 0.5 * pop01(t, P.t0 + 1.1, 0.3, 2); x.strokeStyle = BONE; x.setLineDash([12, 10]); x.lineWidth = 5; x.strokeRect(680, 860, 220, 160); x.restore()
      label(x, 790, 940, 'TENT: ???', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: RED, color: '#fff4e2', rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Brought an *armchair.* | To the forest.', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', star: { x: -40, y: -40 },
    back(x, t, lt, P) { drawBits(x, CHAIR, CHAIR_C, 500, 960, 30 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      bubble(x, 800, 640, 'roughing it', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      drawBits(x, TENT, TENT_C, 830, 1080, 12 * pop01(t, P.t0 + 0.5, 0.3, 2))
    } },
  { sign: 'gemini', cap: 'Talked so much | the *owls left.*', mood: lt => Math.floor(lt * 2.8) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.8) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const TOP = ['and THEN—', 'fun fact!', 'okay but—', 'wait, wait—', 'ANYWAY—']
      bubble(x, 380, 600, TOP[Math.min(4, Math.floor(lt / 0.45))], pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 38, tail: 'bc' })
      for (let i = 0; i < 3; i++) {
        const leave = ease.inCubic(prog(lt, 1.0 + i * 0.25, 1.6 + i * 0.25))
        drawBits(x, OWL, OWL_C, 720 + i * 110 + leave * 300, 880 - i * 40 - leave * 420, 14 * pop01(t, P.t0 + 0.3 + i * 0.1, 0.3, 2), { alpha: 1 - leave })
      }
      label(x, 800, 1080, 'OWLS: 0', pop01(t, P.t0 + 2.0, 0.3, 2.4), { size: 36, bg: LAV, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Homesick in | *twenty minutes.*', mood: lt => lt > 1.0 ? 'wide' : 'happy', tears: lt => lt > 1.4 ? 1 : 0, star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, TENT, TENT_C, 800, 1040, 16 * pop01(t, P.t0 + 0.1, 0.3, 2))
      label(x, 800, 660, '0:20 IN', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 40, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 800, 830, 'miss my | couch', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 40, col: LAV, tail: 'bl' })
    } },
  { sign: 'leo', cap: 'Campfire story. | About *themself.*', mood: 'sparkle', star: { x: -170 }, hops: [0.8, 1.6],
    back(x, t, lt, P) {
      drawBits(x, FIRE, FIRE_C, 800, 1040, 16 * pop01(t, P.t0 + 0.1, 0.3, 2), { sx: 1 + 0.05 * Math.sin(t * 13), sy: 1 + 0.06 * Math.sin(t * 11) })
    },
    front(x, t, lt, P) {
      bubble(x, 800, 640, 'chapter 9: | me again', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 38, tail: 'bl' })
      sparkles(x, t, 380, 820, P.t0 + 0.9, 6, 160, 0.2)
    } },
  { sign: 'virgo', cap: 'Read the tent manual. | Twice. *Aloud.*', mood: lt => lt > 1.4 ? 'squint' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, BOOK, BOOK_C, 790, 800, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.06 })
      bubble(x, 790, 1050, '“step 41: | the pole”', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 36, tail: 'bl' })
      label(x, 790, 620, 'READ: 2×', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 36, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'The tent has | *fairy lights.* And a rug.', mood: lt => lt > 1.4 ? 'heart' : 'happy', star: { x: -200, s: 260 },
    front(x, t, lt, P) {
      cosyTent(x, t, 760, 900, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      label(x, 760, 620, 'CAMPING ✦ CHIC', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.04 })
    } },
  { sign: 'scorpio', cap: 'Stared at the fire | till it *looked away.*', mood: lt => lt > 1.5 ? 'wink' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), away = lt > 1.3
      drawBits(x, FIRE, FIRE_C, 800, 900, 22 * k, { sx: 1 + 0.05 * Math.sin(t * 13), sy: 1 + 0.06 * Math.sin(t * 11), rot: away ? 0.25 : 0 })
      if (k > 0.8) { const ex = away ? 14 : 0; x.fillStyle = INK; x.fillRect(770 + ex, 900, 12, 16); x.fillRect(818 + ex, 900, 12, 16) }
      if (away) bubble(x, 820, 650, 'okay, okay', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, col: ORANGE, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Went for a short walk. | Back *on Tuesday.*', mood: 'sparkle', star: { x: 150 }, hops: [0.4, 0.8, 1.2],
    front(x, t, lt, P) {
      drawBits(x, SIGNPOST, { W: BONE, K: BROWN }, 330, 900, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (pop01(t, P.t0 + 0.2, 0.3, 2) > 0.9) { x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('TRAIL →', 316, 862) }
      label(x, 330, 680, 'BACK TUESDAY', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.05 })
      bubble(x, 330, 1100, 'just a quick one', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 32, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'Assigned the tents. | By *compatibility.*', mood: lt => lt < 1.2 ? 'neutral' : 'happy', look: [1, 0], star: { x: -200, s: 260 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      board(x, 760, 790, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 760, 1130, 'NO SWAPS', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 34, bg: RED, color: '#fff4e2', rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Brought a telescope. | Named a *new star.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, TELESCOPE, TELE_C, 560, 860, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const k = pop01(t, P.t0 + 0.9, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'aquarius', 820, 640, 120 * k, { mood: 'wink', seed: 31, glyph: false })
      label(x, 800, 820, 'STAR: “STEVE”', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: SKYB, rot: 0.05, font: MONO, weight: 700 })
      sparkles(x, t, 820, 640, P.t0 + 1.0, 6, 110, 0.3)
    } },
  { sign: 'pisces', cap: 'Marshmallow fell in. | Pisces *held a funeral.*', mood: lt => lt < 0.9 ? 'happy' : 'wide', tears: lt => lt < 0.9 ? 1 : 3, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      drawBits(x, FIRE, FIRE_C, 800, 1040, 14 * k, { sx: 1 + 0.05 * Math.sin(t * 13), sy: 1 + 0.06 * Math.sin(t * 11) })
      const fall = ease.inCubic(prog(lt, 0.5, 0.85))
      if (lt < 0.85) drawBits(x, MARSH, MARSH_C, 800, lerp(760, 980, fall), 14 * k, { rot: fall * 0.6 })
      for (let i = 0; i < 3; i++) drawBits(x, FLOWER, { P: [PINK, LAV, BONE][i], Y: GOLD, G: GREEN }, 690 + i * 110, 870, 12 * pop01(t, P.t0 + 1.1 + i * 0.15, 0.3, 2))
      label(x, 800, 690, 'R.I.P. MARSH', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 34, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3t003', key: 'E', accent: '#5fd068',
  title: 'The signs | go *camping.*',
  cameos: CAMEOS,
  card: { a: 'aries', b: 'sagittarius', chip: 'ALIGNED' },
  group: { cap: 'Roughing it. | *Kind of.*' },
  lesson: { text: 'Go outside together. | It’s *worth the bugs.*', chip: 'CAMP: SET' },
  last: {
    text: 'Sag came back. | *With the tent.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 10, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
