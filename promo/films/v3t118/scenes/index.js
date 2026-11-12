// v3t118: THE SIGNS AS… v3, "The signs try | a new hobby." (~54 s vertical, signs3kit social cut, music: lofi · E)
//   0.0–3.6    "The signs try | *a new hobby.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one new hobby per sign (3.8 s each), pushed to the extreme:
//              ♈ day one of running, signed up for a marathon · ♉ joined a cooking class for the samples
//              · ♊ learned three chords, started a band · ♋ grew one tomato, threw it a party · ♌ painting: self-portraits only
//              · ♍ tried yoga, corrected the teacher · ♎ joined a book club, still picking the book · ♏ chess: won before you sat
//              · ♐ surfed once, moved to the beach · ♑ turned the hobby into a business · ♒ invented a sport nobody gets
//              · ♓ tried watercolour, painted with tears
//  49.2        group ending: "Twelve new hobbies. | *Zero finished.*"  (the group photo is the punchline)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', ORANGE = '#ffb34a', BROWN = '#8a4a2e', GREEN = '#5fd068', ACC = '#7dffb0'

const BIB = ['WWWWWWWWWW', 'WKWWWWWWKW', 'WWWWWWWWWW', 'WWWWWWWWWW', 'WWWWWWWWWW', 'WWWWWWWWWW']
const SPOON = ['.SSS.', 'SSSSS', '.SSS.', '..S..', '..S..', '..S..', '..S..']
const GUITAR = ['.......KK', '......KK.', '.....KK..', '....KK...', '.BBBK....', 'BBBBBB...', 'BBKBBB...', 'BBBBBB...', '.BBBB....']
const TOMATO = ['...GG...', '..GGGG..', '.RRRRRR.', 'RRWRRRRR', 'RRRRRRRR', 'RRRRRRRR', '.RRRRRR.', '..RRRR..']
const HAT = ['...P...', '..PPP..', '.PYPYP.', 'PPPPPPP']
const EASEL = ['KKKKKKKKKK', 'KWWWWWWWWK', 'KWWWWWWWWK', 'KWWWWWWWWK', 'KWWWWWWWWK', 'KWWWWWWWWK', 'KWWWWWWWWK', 'KKKKKKKKKK', '.B......B.', '.B......B.', 'B........B']
const MAT = ['PPPPPPPPPPPPPPPPPP', 'PPPPPPPPPPPPPPPPPP']
const BOOK = ['CCCCCCCCCCCC', 'CWWWWWWWWWWC', 'CCCCCCCCCCCC']
const BOARD = ['KWKWKWKW', 'WKWKWKWK', 'KWKWKWKW', 'WKWKWKWK', 'KWKWKWKW', 'WKWKWKWK', 'KWKWKWKW', 'WKWKWKWK']
const KING = ['..G..', '.GGG.', '..G..', '.GGG.', '.GGG.', 'GGGGG']
const BOARDSURF = ['....SS....', '...SSSS...', '..SSRRSS..', '..SSSSSS..', '..SSRRSS..', '..SSSSSS..', '..SSSSSS..', '...SSSS...', '....SS....']
const BALL = ['.YYYY.', 'YPYYPY', 'YYYYYY', 'YPYYPY', '.YYYY.']

const CAMEOS = [
  { sign: 'aries', cap: 'Day one of running. | *Signed up for a marathon.*', mood: 'sparkle', star: { x: -170 }, hops: [0.3, 0.6, 0.9, 1.2, 1.5],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      drawBits(x, BIB, { W: '#fff4e2', K: INK }, 790, 860, 26 * k, { rot: 0.05 })
      if (k > 0.9) { x.save(); x.translate(790, 870); x.rotate(0.05); x.fillStyle = RED; x.font = `800 64px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('#1', 0, 0); x.restore() }
      label(x, 790, 660, 'RAN: 1 BLOCK', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 790, 1080, 'easy!', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 44, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Joined a cooking class. | *For the samples.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', star: { x: -170 },
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) drawBits(x, SPOON, { S: '#c9c9d8' }, 700 + i * 60, 880, 14 * pop01(t, P.t0 + 0.3 + i * 0.25, 0.3, 2), { rot: -0.3 + i * 0.2 })
      label(x, 790, 700, 'SAMPLES TRIED: ALL', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 28, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 1070, 'cooking? oh. | no thanks', pop01(t, P.t0 + 1.8, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Learned three chords. | *Started a band.*', mood: 'sparkle', star: { x: -170 }, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      drawBits(x, GUITAR, { K: BROWN, B: ORANGE }, 790, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.2 })
      const NAMES = ['THE TWINS', 'STAR NOISE', 'MAYBE LATER', 'GEMINI & GEMINI']
      label(x, 790, 660, NAMES[Math.min(3, Math.floor(Math.max(0, lt - 0.6) / 0.4))], pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
      label(x, 790, 1110, 'FIRST TOUR: SOON', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 30, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Grew one tomato. | *Threw it a party.*', mood: 'heart', star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, TOMATO, { G: GREEN, R: RED, W: '#ffb0b0' }, 790, 920, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, HAT, { P: PINK, Y: GOLD }, 790, 810, 12 * pop01(t, P.t0 + 0.9, 0.3, 2))
      label(x, 790, 660, 'HAPPY BIRTHDAY, TOM', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 28, bg: SKYB, rot: 0.05, font: MONO, weight: 700 })
      sparkles(x, t, 790, 900, P.t0 + 1.0, 7, 170, 0.5)
    } },
  { sign: 'leo', cap: 'Took up painting. | *Self-portraits only.*', mood: 'sparkle', star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, EASEL, { K: BROWN, W: '#fff4e2', B: BROWN }, 790, 900, 26 * k)
      if (k > 0.9) signChar(x, t, 'leo', 790, 840, 140 * clamp((lt - 0.5) / 0.6), { mood: 'wink', seed: 31, glyph: false, glow: 0.4 })
      label(x, 790, 640, 'PORTRAIT #48', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 34, bg: ORANGE, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Tried yoga. | *Corrected the teacher.*', mood: lt => lt > 1.0 ? 'squint' : 'happy', look: [1, 0], star: { x: -170, y: -20 },
    back(x, t, lt, P, F) { drawBits(x, MAT, { P: LAV }, F.x, 1090, 20 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.4, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'capricorn', 800, 960, 180 * k, { mood: lt > 1.2 ? 'wide' : 'happy', look: [-1, 0], seed: 13, glyph: false, squash: 0.15 })
      bubble(x, 790, 680, 'knees at 90°, | actually', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'libra', cap: 'Joined a book club. | *Still picking the book.*', mood: lt => lt > 1.6 ? 'squint' : 'happy', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const COLS = [PINK, SKYB, MINT, GOLD, LAV]
      for (let i = 0; i < 5; i++) drawBits(x, BOOK, { C: COLS[i], W: '#fff4e2' }, 790, 1100 - i * 60, 16 * pop01(t, P.t0 + 0.2 + i * 0.1, 0.3, 2), { rot: Math.sin(i * 1.7) * 0.06 })
      bubble(x, 790, 700, Math.floor(lt * 2.5) % 2 ? 'this one?' : 'or this one?', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 790, 830, 'MEETING #6', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Took up chess. | *Won before you sat.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 1], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, BOARD, { K: '#2a2350', W: BONE }, 790, 900, 26 * k, { outline: INK })
      drawBits(x, KING, { G: GOLD }, 790, 880, 12 * k, { rot: lt > 1.0 ? 1.4 : 0 })
      label(x, 790, 660, 'CHECKMATE', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 40, bg: LAV, rot: -0.05, font: MONO, weight: 700 })
      label(x, 790, 1150, 'READ YOUR CHART: YES', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 26, bg: BONE, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Surfed once. | *Moved to the beach.*', mood: 'sparkle', star: { x: 150 }, hops: [0.6, 1.4],
    front(x, t, lt, P) {
      drawBits(x, BOARDSURF, { S: '#fff4e2', R: SKYB }, 330, 880, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.3 })
      label(x, 330, 660, 'NEW ADDRESS: SAND', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 28, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 330, 1110, 'cowabunga?', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 38, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'Tried a hobby. | *Now it’s a business.*', mood: 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      label(x, 790, 680, 'HOBBY, INC.', pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 44, bg: MINT, rot: -0.04 })
      label(x, 790, 860, 'EMPLOYEES: 14', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 32, bg: BONE, rot: 0.05, font: MONO, weight: 700 })
      label(x, 790, 1000, 'FUN HAD: 0', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Invented a sport. | *Nobody understands it.*', mood: 'sparkle', star: { x: -170 }, hops: [0.7, 1.5],
    front(x, t, lt, P) {
      drawBits(x, BALL, { Y: GOLD, P: PINK }, 790 + 80 * Math.sin(t * 4), 760 + 60 * Math.abs(Math.cos(t * 4)), 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      x.save(); x.globalAlpha = pop01(t, P.t0 + 0.3, 0.3, 2); x.strokeStyle = MINT; x.lineWidth = 10; x.beginPath(); x.arc(790, 1000, 70, 0, Math.PI * 2); x.stroke(); x.restore()
      label(x, 790, 640, 'RULE 47: HOP TWICE', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 28, bg: SKYB, rot: 0.05, font: MONO, weight: 700 })
      label(x, 790, 1130, 'SCORE: PURPLE', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: BONE, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Tried watercolour. | *Painted with tears.*', mood: 'wide', tears: 3, star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, EASEL, { K: BROWN, W: '#fff4e2', B: BROWN }, 790, 900, 26 * k)
      if (k > 0.9) { x.save(); x.globalAlpha = 0.7 * clamp((lt - 0.5) / 1.0); x.fillStyle = SKYB; for (let i = 0; i < 5; i++) { x.beginPath(); x.ellipse(720 + i * 35, 820 + Math.sin(i * 2) * 40, 26, 40, 0.3, 0, Math.PI * 2); x.fill() } x.restore() }
      label(x, 790, 640, 'TITLE: FEELINGS', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: SKYB, rot: 0.05, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3t118', key: 'E', accent: ACC, ending: 'group',
  title: 'The signs try | *a new hobby.*',
  cameos: CAMEOS,
  group: {
    cap: 'Twelve new hobbies. | *Zero finished.*',
    draw(x, t, lt) { label(x, 540, 640, 'HOBBY CLUB · WEEK 1', pop01(t, t - lt + 1.4, 0.3, 2.2), { size: 46, bg: GOLD, rot: -0.03, font: MONO, weight: 700 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
