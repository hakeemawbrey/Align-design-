// r2a0482: star_advice, ADVICE SOLO, "Sag, you're allowed | to be a beginner." (~45 s vertical, signs3kit social cut,
// music: lofi · F). One sign the whole way: nine Sagittarius first tries, each a relatable truth with a warm reframe and
// one light gag. Ending: callback.
//   0.0–3.6    "Sag, you’re allowed | *to be a beginner.*"  One big Sagittarius pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              fell off the board, got back on · three chords is a song · lost in a new city = exploring · the wonky
//              bowl · asked the "dumb" question · wrong word in a new language, they smiled · slowest runner, scenic
//              pace · twelve hobbies, twelve joys · beginners love it the most
//  37.8        "Start messy. | *Start anyway.*"  Sagittarius comes back, big.
//  41.2        CALLBACK: "The wonky bowl? | *Holds snacks fine.*"  The lopsided bowl is back, full of popcorn.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const PAPER = '#fff4e2', RED = '#e23d4e', ACC = '#ff9a4a'
const S = 'sagittarius'

const BOARD = [
  '.MMMMMMMMMMMMMM.',
  'MMPPPPPPPPPPPPMM',
  '.MMMMMMMMMMMMMM.',
  '...GG......GG...',
  '..WWWW....WWWW..',
  '...WW......WW...',
]
const BOARD_C = { M: '#2a2350', P: PINK, G: '#9aa5c4', W: PAPER }
const GUITAR = [
  '..........KK',
  '.........KK.',
  '........BB..',
  '.......BB...',
  '......BB....',
  '.OOOOBB.....',
  'OOOOOOO.....',
  'OOOKKOOO....',
  'OOKKKKOO....',
  'OOOKKOOO....',
  '.OOOOOO.....',
  '..OOOO......',
]
const GUITAR_C = { K: INK, B: '#8a4a2e', O: '#ffb34a' }
const BOWL = [
  'C.............C',
  'CC...........CC',
  '.CCCCCCCCCCCCC.',
  '.CCcCCCCCCcCCC.',
  '..CCCCCCCCCCC..',
  '...CCCCCCCCC...',
  '....CCCCCC.....',
  '.....CCCC......',
]
const BOWL_C = { C: '#5fb8d0', c: '#8fe3ff' }
const POP = ['.WW.', 'WWWW', 'WYWW', '.WW.']
const FLAG = [
  'KWKWKWKWK',
  'WKWKWKWKW',
  'KWKWKWKWK',
  'B........',
  'B........',
  'B........',
  'B........',
]
const FLAG_C = { K: INK, W: PAPER, B: '#9aa5c4' }
const BALL = ['.YYY.', 'YYYYY', 'WYYYW', 'YYYYY', '.YYY.']
const YARN = ['.PPP.', 'PpPpP', 'PPpPP', 'PpPpP', '.PPP.']
const BRUSH = ['....RR', '...RR.', '..BB..', '.BB...', 'BB....']

// a folded city map, flipping upside down
function map(x, cx, cy, k, flip) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(Math.PI * flip + 0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -110, 300, 220)
  const P = [PAPER, '#e8f4d8', PAPER]
  for (let i = 0; i < 3; i++) { x.fillStyle = P[i]; x.fillRect(-142 + i * 95, -102, 92, 204) }
  x.fillStyle = '#8fe3ff'; x.fillRect(-142, 20, 284, 18)
  x.fillStyle = '#9aa5c4'; x.fillRect(-60, -102, 12, 204); x.fillRect(-142, -40, 284, 10)
  x.fillStyle = RED; x.beginPath(); x.arc(70, -60, 14, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('NORTH', 0, -78)
  x.restore()
}
// the lopsided pottery bowl, optionally full of popcorn
function wonky(x, t, cx, cy, k, fill = 0) {
  if (k <= 0.01) return
  if (fill > 0) for (let i = 0; i < 9; i++) { const kk = clamp(fill * 9 - i); drawBits(x, POP, { W: PAPER, Y: GOLD }, cx - 80 + (i % 5) * 40 + (i > 4 ? 20 : 0), cy - 50 - (i > 4 ? 30 : 0) - (1 - kk) * 60, 9 * k, { alpha: kk }) }
  drawBits(x, BOWL, BOWL_C, cx, cy, 18 * k, { rot: 0.16 })
}

const STAR = { x: -170 }
const CAMEOS = [
  { sign: S, cap: 'Fell off the board? | *You got back on.*', mood: lt => lt > 1.3 ? 'sparkle' : 'wide', look: [1, 0], star: STAR, hops: [1.3, 1.8],
    front(x, t, lt, P) {
      const roll = prog(lt, 0.3, 0.9)
      drawBits(x, BOARD, BOARD_C, lerp(700, 800, roll), 1060, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: lt < 0.9 ? 0.25 * Math.sin(roll * 6) : 0 })
      label(x, 790, 760, 'ATTEMPT #9', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 40, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 900, 'STILL GOING', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Day one on guitar. | *Three chords is a song.*', mood: 'sparkle', look: [1, 0], star: STAR, hops: [1.4],
    front(x, t, lt, P) {
      drawBits(x, GUITAR, GUITAR_C, 790, 960, 22 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: -0.1 })
      if (lt > 0.7) for (let i = 0; i < 3; i++) { const ph = ((t * 0.6 + i / 3) % 1); drawBits(x, ['..XX', '..XX', '..X.', 'XXX.', 'XXX.'], { X: i % 2 ? GOLD : BONE }, 700 + i * 80, 860 - ph * 200, 7, { alpha: Math.sin(Math.PI * ph) }) }
      label(x, 790, 700, 'CHORDS KNOWN: 3', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 32, bg: '#ffb34a', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Lost in a new city? | *That’s exploring.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: STAR,
    front(x, t, lt, P) {
      map(x, 790, 920, pop01(t, P.t0 + 0.2, 0.35, 2), ease.inOutCubic(prog(lt, 0.7, 1.1)))
      label(x, 790, 1120, 'MAP: UPSIDE DOWN', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 30, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 700, 'found a bakery!', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: S, cap: 'Your first bowl is wonky. | *It’s still a bowl.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: STAR, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      wonky(x, t, 790, 960, pop01(t, P.t0 + 0.3, 0.35, 2))
      label(x, 790, 760, 'A BOWL (ALLEGEDLY)', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04 })
      sparkles(x, t, 790, 960, P.t0 + 1.3, 6, 150, 0.4)
    } },
  { sign: S, cap: 'The “dumb” question? | *Everyone wondered too.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: STAR, hops: [0.5],
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'wait, what’s | a paddle for?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, tail: 'bl' })
      const IDS = ['aries', 'virgo', 'pisces']
      IDS.forEach((id, i) => { const kk = pop01(t, P.t0 + 1.0 + i * 0.15, 0.3, 2); if (kk > 0.01) signChar(x, t, id, 680 + i * 110, 990, 96 * kk, { mood: 'sparkle', seed: 40 + i, glyph: false, glow: 0.5, look: [-1, 0], tears: id === 'pisces' ? 1 : 0 }) })
      label(x, 790, 1120, 'CLASS: RELIEVED', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Said the wrong word? | *They still smiled.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', look: [1, 0], star: STAR,
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'i am a | pancake!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 46, tail: 'bl' })
      label(x, 790, 900, 'MEANT: “HUNGRY”', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 30, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 600, 1080, P.t0 + 1.4, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 3 })
    } },
  { sign: S, cap: 'Slowest in the run club? | *Still out there.*', mood: 'sparkle', look: [1, 0], star: STAR, hops: [0.4, 0.8, 1.2],
    front(x, t, lt, P) {
      drawBits(x, FLAG, FLAG_C, 820, 960, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 740, 'PACE: SCENIC', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 40, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1120, 'saw a duck!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: S, cap: 'Twelve hobbies started? | *Twelve new joys.*', mood: lt => lt > 1.3 ? 'heart' : 'sparkle', look: [1, 0], star: STAR,
    front(x, t, lt, P) {
      drawBits(x, BALL, { Y: '#d8f060', W: PAPER }, 690, 1010, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, YARN, { P: PINK, p: '#ffc4d6' }, 800, 1030, 20 * pop01(t, P.t0 + 0.35, 0.3, 2))
      drawBits(x, BRUSH, { R: RED, B: '#8a4a2e' }, 900, 1000, 20 * pop01(t, P.t0 + 0.5, 0.3, 2))
      drawBits(x, GUITAR, GUITAR_C, 800, 880, 12 * pop01(t, P.t0 + 0.65, 0.3, 2), { rot: -0.2 })
      label(x, 790, 720, 'HOBBIES: 12', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 40, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1130, 'REGRETS: 0', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 32, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Beginners get to | *love it the most.*', mood: 'heart', look: [1, 0], star: STAR, hops: [1.0, 1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 790, 820, '✦ DAY ONE ✦', pop01(t, P.t0 + 0.3, 0.35, 2), { size: 48, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 790, 1020, 'again! again!', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 40, tail: 'bl' })
      hearts(x, t, 560, 860, P.t0 + 1.0, { n: 7, life: 1.8, spread: 360, cell: 8, seed: 8 })
    } },
]

const F = makeFilm({
  id: 'r2a0482', key: 'F', accent: ACC, solo: S, ending: 'callback',
  title: 'Sag, you’re allowed | *to be a beginner.*',
  cameos: CAMEOS,
  group: { cap: 'Start messy. | *Start anyway.*', mood: 'sparkle' },
  last: {
    text: 'The wonky bowl? | *Holds snacks fine.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.3, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, S, 380, 1110, 260 * k, { mood: lt > 1.3 ? 'heart' : 'sparkle', look: [1, 0], seed: 12, hops: [t - lt + 1.3] })
      wonky(x, t, 730, 1150, pop01(t, t - lt + 0.6, 0.35, 2), clamp((lt - 1.0) / 0.8))
      label(x, 730, 1290, 'STILL A BOWL', pop01(t, t - lt + 1.8, 0.3, 2.2), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
