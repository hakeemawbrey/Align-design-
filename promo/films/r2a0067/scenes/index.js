// r2a0067: star_advice, ADVICE SOLO, "Taurus, you can't fix | everyone." (~45 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole way through (makeFilm solo mode, 9 cards): a relatable Taurus truth + a warm reframe, one gag each.
//   0.0–3.6    "Taurus, you can’t fix | *everyone.*"  One big Taurus pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              everyone's rock (the rock naps) · a toolbox for everything, not for feelings (a heart: NOT A TOOL JOB)
//              · giving away your last fry (keep one) · their garden's a mess (water yours) · up at 2 a.m. helping
//              (sleep is allowed) · some things need time, not you (an hourglass) · a match who's a "project"
//              (UNDER CONSTRUCTION) · they said "I'm okay." (believe them) · the comfy chair, yours for once
//  37.8        "Steady heart. | *Gentle hands.*"  Taurus comes back, big.
//  41.2        CALLBACK: "The last fry? | *Still yours.*"  Taurus and the one fry, hearts.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CREAM = '#fff4e2', BLUSH = '#ffb6c8', RED = '#e23d4e', S = 'taurus'

// ── props
const ROCK = [
  '....RRRRRR....',
  '..RRRRRRRRRR..',
  '.RRRLRRRRRRRR.',
  'RRRRRRRRRRLRRR',
  'RRRKKRRRRKKRRR',
  'RRRRRRRRRRRRRR',
  '.RRRRRRRRRRRR.',
]
const ROCK_C = { R: '#9aa5c4', L: '#c7cfe4', K: INK }
const PILLOW = ['.PPPPPPPP.', 'PPPPPPPPPP', 'PPPPPPPPPP', '.PPPPPPPP.']
const TOOLBOX = [
  '....HHHHHH....',
  '....H....H....',
  'BBBBBBBBBBBBBB',
  'BBBBBBBBBBBBBB',
  'BBBBBYYBBBBBBB',
  'BBBBBBBBBBBBBB',
  'BBBBBBBBBBBBBB',
]
const TOOLBOX_C = { H: '#2a2350', B: RED, Y: GOLD }
const HEART = ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']
const FRIES = [
  '.Y.Y.Y.Y.',
  '.Y.YYY.Y.',
  'YYYYYYYYY',
  'RRRRRRRRR',
  'RRWWWWWRR',
  'RRRRRRRRR',
  '.RRRRRRR.',
  '..RRRRR..',
]
const FRIES_C = { Y: '#ffd23a', R: RED, W: CREAM }
const FRY = ['YY', 'YY', 'YY', 'YY', 'YY', 'YY', 'YY', 'YY']
const FLOWERS = [
  '.P...Y...P.',
  'PYP.YRY.PYP',
  '.P...Y...P.',
  '.G...G...G.',
  '.GG..G..GG.',
  '.G...G...G.',
  'DDDDDDDDDDD',
  'DDDDDDDDDDD',
]
const FLOWERS_C = { P: PINK, Y: GOLD, R: RED, G: '#5fd068', D: '#8a4a2e' }
const WEEDS = [
  'G.G..G.G..G',
  '.GGG.GGG.G.',
  'GG.GGG.GGGG',
  '.GGG.GG.GG.',
  'G.GGG.GGG.G',
  '.G.G..G.G..',
  'DDDDDDDDDDD',
  'DDDDDDDDDDD',
]
const WEEDS_C = { G: '#3a8a3e', D: '#8a4a2e' }
const CAN = [
  '.....HHH......',
  '....H...H.....',
  'SSSSSSSSSS....',
  'SSSSSSSSSSSSS.',
  'SSSSSSSSSS..SS',
  'SSSSSSSSSS....',
  'SSSSSSSSSS....',
]
const CAN_C = { H: '#2a2350', S: '#6fc3ff' }
const BED = [
  'H.............',
  'HPP...........',
  'HPPBBBBBBBBBBB',
  'HBBBBBBBBBBBBB',
  'HHHHHHHHHHHHHH',
  'H............H',
]
const BED_C = { H: '#c98f2a', P: CREAM, B: '#6b62a8' }
const HOURGLASS = [
  'WWWWWWWWW',
  '.GSSSSSG.',
  '..GSSSG..',
  '...GSG...',
  '....S....',
  '...G.G...',
  '..G.S.G..',
  '.GSSSSSG.',
  'WWWWWWWWW',
]
const HOURGLASS_C = { W: '#c98f2a', G: '#cfe8ff', S: GOLD }
const CHAIR = [
  'AAAAAAAAAAAA',
  'ACCCCCCCCCCA',
  'ACCCCCCCCCCA',
  'ACCCCCCCCCCA',
  'AAPPPPPPPPAA',
  'AAPPPPPPPPAA',
  'AAAAAAAAAAAA',
  '.K........K.',
]
const CHAIR_C = { A: '#5fd068', C: '#7dffb0', P: '#a8ffcf', K: INK }
const CONE = ['...O...', '..OOO..', '..WWW..', '.OOOOO.', '.WWWWW.', 'OOOOOOO', 'KKKKKKK']
const CONE_C = { O: '#ff9a4a', W: CREAM, K: INK }

// a profile card with a cone and a sign on it
function project(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -162, 256, 340)
  x.fillStyle = INK; x.fillRect(-134, -174, 268, 348)
  x.fillStyle = '#140c30'; x.fillRect(-126, -166, 252, 332)
  x.fillStyle = MINT; x.fillRect(-114, -154, 228, 44)
  x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('✦ YOUR MATCH', 0, -131)
  x.restore()
  if (k > 0.01) signChar(x, t, 'gemini', cx + 4, cy + 20, 180 * k, { mood: 'wink', seed: 31, glyph: false })
  drawBits(x, CONE, CONE_C, cx + 80, cy + 110, 9 * k)
  drawBits(x, CONE, CONE_C, cx - 80, cy + 110, 9 * k)
}

const CAMEOS = [
  { sign: S, cap: 'You’re everyone’s rock. | *Rocks rest too.*', mood: lt => lt > 1.3 ? 'sleepy' : 'happy', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, PILLOW, { P: CREAM }, 790, 1000, 18 * pop01(t, P.t0 + 1.0, 0.3, 2.2))
      drawBits(x, ROCK, ROCK_C, 790, 920 + (lt > 1.0 ? 0 : 0), 20 * k)
      if (lt > 1.3) { x.save(); x.fillStyle = BONE; x.font = `800 44px ${INTER}`; x.globalAlpha = 0.5 + 0.5 * Math.sin(t * 3); x.fillText('z', 900, 800); x.font = `800 30px ${INTER}`; x.fillText('z', 940, 760); x.restore() }
      label(x, 790, 680, 'ROCK: NAPPING', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'A toolbox for everything? | *Not for feelings.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: { x: -200 },
    keyCue: t0 => ['pluck', t0 + 1.4, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, TOOLBOX, TOOLBOX_C, 790, 1050, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const hk = pop01(t, P.t0 + 0.5, 0.3, 2)
      drawBits(x, HEART, { H: PINK }, 790, 800 + Math.sin(t * 3) * 6, 26 * hk)
      label(x, 790, 640, 'NOT A TOOL JOB', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 560, 1130, 'hug instead?', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 32, col: BLUSH, tail: 'bl' })
    } },
  { sign: S, cap: 'Giving away your last fry? | *Keep one.*', mood: lt => lt > 1.4 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      drawBits(x, FRIES, FRIES_C, 790, 980, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const up = ease.outCubic(prog(lt, 1.0, 1.4))
      drawBits(x, FRY, { Y: '#ffd23a' }, 790 - 280 * up, 860 - 60 * up, 18 * pop01(t, P.t0 + 0.9, 0.25, 2), { rot: 0.4 - 0.4 * up })
      label(x, 790, 680, 'THIS ONE’S YOURS', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 490, 800, P.t0 + 1.4, 6, 90, 0.3)
    } },
  { sign: S, cap: 'Their garden’s a mess? | *Water yours.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: lt => [lt > 1.0 ? -1 : 1, 0], star: { x: 0, y: -60, s: 240 }, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, WEEDS, WEEDS_C, 300, 1090, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, FLOWERS, FLOWERS_C, 780, 1090, 16 * pop01(t, P.t0 + 0.3, 0.3, 2) * (1 + 0.15 * ease.outCubic(prog(lt, 1.2, 1.6))))
      drawBits(x, CAN, CAN_C, 820, 900, 12 * pop01(t, P.t0 + 0.9, 0.3, 2), { rot: lt > 1.1 ? 0.5 : 0 })
      if (lt > 1.1) { x.save(); x.fillStyle = SKYB; for (let i = 0; i < 6; i++) { const ph = (t * 2 + i / 6) % 1; x.fillRect(740 + i * 6, 940 + ph * 80, 6, 12) } x.restore() }
      label(x, 300, 960, 'THEIRS', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 28, bg: BONE, rot: -0.05, font: MONO, weight: 700 })
      label(x, 790, 1180, 'YOURS: BLOOMING', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Up at 2 a.m. helping? | *Sleep is allowed.*', mood: lt => lt > 1.3 ? 'sleepy' : 'wide', look: [1, 0], star: { x: -200, y: -40 },
    front(x, t, lt, P) {
      drawBits(x, BED, BED_C, 700, 1110, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 660, '2:00 AM', pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 44, bg: '#2a3d6a', color: BONE, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 860, 'PHONE: CHARGING', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 960, 'YOU: ALSO', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: PINK, rot: 0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Some things need | *time, not you.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const flip = ease.inOutCubic(prog(lt, 0.6, 1.0))
      drawBits(x, HOURGLASS, HOURGLASS_C, 790, 880, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: Math.PI * flip })
      label(x, 790, 1140, 'NOT YOUR TIMER', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Your match is a “project”? | *Date a person.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      project(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 640, 'UNDER CONSTRUCTION', pop01(t, P.t0 + 0.7, 0.3, 2.2), { size: 28, bg: '#ff9a4a', rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1100, 'NOT A RENOVATION', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'They said “I’m okay.” | *Believe them.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: { x: -200 }, hops: [1.3, 1.6],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'leo', 800, 1000, 200 * k, { mood: 'happy', look: [-1, 0], seed: 22, glyph: false })
      bubble(x, 800, 700, 'I’m okay, | really!', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 36, tail: 'bc' })
      label(x, 540, 1160, 'TOOLBOX: CLOSED', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'The comfy chair? | *Yours, for once.*', mood: lt => lt > 1.0 ? 'heart' : 'wide', star: { x: -200, y: -10 },
    front(x, t, lt, P) {
      drawBits(x, CHAIR, CHAIR_C, 790, 980, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 680, 'RESERVED: TAURUS', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 30, bg: BLUSH, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 960, P.t0 + 0.9, 8, 180, 0.2)
      hearts(x, t, 360, 860, P.t0 + 1.2, { n: 4, life: 1.4, spread: 140, cell: 6, seed: 4 })
    } },
]

const F = makeFilm({
  id: 'r2a0067', key: 'F', accent: BLUSH, solo: S, ending: 'callback',
  title: 'Taurus, you can’t | fix *everyone.*',
  cameos: CAMEOS,
  group: { cap: 'Steady heart. | *Gentle hands.*', mood: 'sparkle' },
  last: {
    text: 'The last fry? | *Still yours.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.4, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, S, 420, 1100, 260 * k, { mood: lt > 1.4 ? 'heart' : 'sparkle', look: [1, 0], seed: 40, hops: [t0 + 1.3], glyph: false })
      drawBits(x, FRY, { Y: '#ffd23a' }, 700, 1080, 30 * pop01(t, t0 + 0.8, 0.35, 2.2), { rot: 0.25 })
      sparkles(x, t, 700, 1080, t0 + 0.9, 7, 120, 0.3)
      hearts(x, t, 560, 980, t0 + 1.4, { n: 6, life: 1.6, spread: 260, cell: 6, seed: 9 })
      label(x, 560, 1380, 'NOT SHARING. PROUD.', pop01(t, t0 + 1.6, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
