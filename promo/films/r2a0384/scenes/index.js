// r2a0384: star_advice, ADVICE ROLLCALL, "Each sign's | snow-day plan." (signs3kit social cut, music: lofi · E). Ending: lesson.
// One warm, specific line per sign with a light gag, soft snow falling behind every card:
//   ♈ first snowball, then cocoa for everyone · ♉ bakes bread, shares the warm end · ♊ a group call so nobody's alone
//   · ♋ lights the fire, invites the neighbours · ♌ a snow-Leo with a crown · ♍ shovels your path too · ♎ the movie, eventually
//   · ♏ phone off, book on · ♐ sledding first, questions later · ♑ out of office, actually · ♒ every snowflake an original
//   · ♓ cries at how pretty it is.   group "Snowed in. | Warmed up."  lesson "Slow days | are good days."  last "Cocoa's ready. | Come on in."
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CREAM = '#fff4e2', ORANGE = '#ffb34a', SLATE = '#9aa5c4', ACC = SKYB
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })

/** soft snow inside the panel */
function snow(x, t, seed = 0) {
  x.save(); x.beginPath(); x.rect(110, 480, 860, 740); x.clip(); x.fillStyle = 'rgba(255,255,255,0.75)'
  for (let i = 0; i < 26; i++) {
    const ph = ((t * 0.12 + i * 0.137 + seed * 0.07) % 1 + 1) % 1
    const fx = 120 + ((i * 97 + seed * 31) % 840) + Math.sin(t * 1.3 + i) * 14, fy = 480 + ph * 740, s = 5 + (i % 3) * 3
    x.fillRect(fx, fy, s, s)
  }
  x.restore()
}
const BALL = ['..WWW..', '.WWWWW.', 'WWWWWBW', 'WWWWWWW', 'WWWBWWW', '.WWWWW.', '..WWW..']
const MUG = ['.W.W.....', 'W.W......', 'CCCCCCC..', 'CCCCCCCCC', 'CCMMCCC.C', 'CCCCCCCCC', '.CCCCC...']
const BREAD = ['..BBBBBB..', '.BBWBBWBB.', 'BBBBBBBBBB', 'BBBBBBBBBB', 'DDDDDDDDDD']
const BREAD_C = { B: '#e8a24a', W: '#ffd9a0', D: '#a8632e' }
const HOUSE = ['.......SS..', '......S.S..', '....RRRRKK.', '...RRRRRRK.', '..RRRRRRRR.', '.RRRRRRRRRR', '..WWWWWWWW.', '..WYYWWYYW.', '..WYYWWYYW.', '..WWWDDWWW.', '..WWWDDWWW.']
const HOUSE_C = { S: '#c9c9d8', R: RED, K: '#5b2e1a', W: CREAM, Y: GOLD, D: '#8a4a2e' }
const SNOWMAN = ['...YYY...', '..YYYYY..', '...WWW...', '..WKWKW..', '..WWOWW..', '...WWW...', '.WWWWWWW.', 'WWWWKWWWW', 'WWWWWWWWW', 'WWWWKWWWW', '.WWWWWWW.']
const SNOWMAN_C = { Y: GOLD, W: '#ffffff', K: INK, O: ORANGE }
const SHOVEL = ['..KKK..', '...K...', '...K...', '...K...', '...K...', '...K...', '.GGGGG.', 'GGGGGGG', 'GGGGGGG', '.GGGGG.']
const TV = ['KKKKKKKKKKKK', 'KSSSSSSSSSSK', 'KSSPSSSSSSSK', 'KSSPPSSSSSSK', 'KSSPSSSSSSSK', 'KSSSSSSSSSSK', 'KKKKKKKKKKKK', '....K..K....', '...KKKKKK...']
const BOOK = ['RRRRRWWWWWW', 'RRRRRWKKKKW', 'RRRRRWWWWWW', 'RRRRRWKKKKW', 'RRRRRWWWWWW', 'RRRRRWKKKKW', 'RRRRRWWWWWW']
const SLED = ['R..........', 'RRRRRRRRRR.', '.RRRRRRRRRR', '..K....K...', 'KKKKKKKKKKK']
const LAPTOP = ['GGGGGGGGGGGG', '.GGGGGGGGGG.']
const FLAKE = ['....W....', '.W..W..W.', '..W.W.W..', '...WWW...', 'WWWWWWWWW', '...WWW...', '..W.W.W..', '.W..W..W.', '....W....']
const FLAKE_C = { W: '#ffffff' }

const ST_L = { x: -170 }, ST_R = { x: 160 }
const back = seed => (x, t) => snow(x, t, seed)
const CAMEOS = [
  { sign: 'aries', cap: 'First snowball. | Then *cocoa for all.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', star: ST_L, hops: [0.5], back: back(1),
    front(x, t, lt, P) {
      const p = prog(lt, 0.3, 0.9)
      if (p > 0 && p < 1) drawBits(x, BALL, { W: '#ffffff', B: '#d8e8f0' }, lerp(500, 880, p), 760 - Math.sin(p * Math.PI) * 120, 12)
      drawBits(x, MUG, { W: '#ffffff', C: '#8a4a2e', M: CREAM }, 790, 940, 20 * pop01(t, P.t0 + 1.0, 0.3, 2))
      L(x, 790, 1140, 'COCOA: ROUND ONE', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: 'taurus', cap: 'Bakes bread. | Shares *the warm end.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST_L, back: back(2),
    front(x, t, lt, P) {
      drawBits(x, BREAD, BREAD_C, 790, 880, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      bubble(x, 790, 660, 'you take | the end piece', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 36, tail: 'bl' })
      L(x, 790, 1080, 'STILL WARM', pop01(t, P.t0 + 1.5, 0.3, 2.4), ORANGE, 0.04, 34)
    } },
  { sign: 'gemini', cap: 'Starts a group call. | *Nobody’s alone today.*', mood: 'sparkle', look: lt => [Math.floor(lt * 2) % 2 ? 1 : -1, 0], star: ST_L, back: back(3),
    front(x, t, lt, P) {
      const ids = ['leo', 'virgo', 'pisces', 'libra']
      ids.forEach((id, i) => {
        const k = pop01(t, P.t0 + 0.3 + i * 0.2, 0.3, 2), cx = 700 + (i % 2) * 180, cy = 720 + Math.floor(i / 2) * 200
        if (k <= 0.01) return
        x.save(); x.fillStyle = INK; x.fillRect(cx - 80 * k, cy - 80 * k, 160 * k, 160 * k); x.fillStyle = '#2a2350'; x.fillRect(cx - 72 * k, cy - 72 * k, 144 * k, 144 * k); x.restore()
        signChar(x, t, id, cx, cy + 4, 110 * k, { mood: 'happy', glyph: false, seed: 60 + i, tears: id === 'pisces' ? 1 : 0 })
      })
      L(x, 790, 1150, '5 ON THE CALL', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: 'cancer', cap: 'Lights the fire. | *Invites the neighbours.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST_L, back: back(4),
    front(x, t, lt, P) {
      drawBits(x, HOUSE, HOUSE_C, 790, 860, 24 * pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 790, 1130, 'DOOR: OPEN', pop01(t, P.t0 + 1.0, 0.3, 2.4), PINK, 0.04, 36)
    } },
  { sign: 'leo', cap: 'Builds a snow-Leo. | Gives it *a crown.*', mood: lt => lt > 1.1 ? 'wink' : 'sparkle', star: ST_L, hops: [1.2], back: back(5),
    front(x, t, lt, P) {
      drawBits(x, SNOWMAN, SNOWMAN_C, 790, 880, 24 * pop01(t, P.t0 + 0.2, 0.35, 2))
      sparkles(x, t, 790, 760, P.t0 + 1.0, 7, 150, 0.2)
      L(x, 790, 1150, 'HIS NAME IS SIR', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: 'virgo', cap: 'Shovels their path. | *Then yours.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST_L, hops: [0.6, 1.2], back: back(6),
    front(x, t, lt, P, F) {
      drawBits(x, SHOVEL, { K: '#8a4a2e', G: SLATE }, F.x + 140, F.cy + 30, 16 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.3 + 0.15 * Math.sin(t * 5) })
      L(x, 790, 760, 'YOUR DRIVEWAY: CLEAR', pop01(t, P.t0 + 1.0, 0.3, 2.4), MINT, 0.04, 28)
      bubble(x, 790, 950, 'no big deal ♡', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'libra', cap: 'Picks the movie. | *Eventually.* Worth it.', mood: lt => lt > 1.5 ? 'heart' : 'squint', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: ST_L, back: back(7),
    front(x, t, lt, P) {
      drawBits(x, TV, { K: INK, S: lt > 1.5 ? MINT : '#6b62a8', P: '#ffffff' }, 790, 840, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 790, 1080, lt > 1.5 ? 'PICKED! ♡' : 'BROWSING…', pop01(t, P.t0 + 0.6, 0.3, 2), lt > 1.5 ? PINK : SLATE, -0.04, 36)
    } },
  { sign: 'scorpio', cap: 'Phone off. | *Book on. Bliss.*', mood: lt => lt > 1.0 ? 'sleepy' : 'neutral', look: [1, 0], star: ST_L, back: back(8),
    front(x, t, lt, P, F) {
      drawBits(x, BOOK, { R: '#c97bff', W: CREAM, K: '#b89a6a' }, F.x + 150, F.cy + 60, 14 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.1 })
      L(x, 790, 700, 'DO NOT DISTURB', pop01(t, P.t0 + 0.7, 0.3, 2.2), LAV, 0.04, 32)
      L(x, 790, 1060, 'CHAPTER 12', pop01(t, P.t0 + 1.4, 0.3, 2.4), BONE, -0.04, 32)
    } },
  { sign: 'sagittarius', cap: 'Sledding first. | *Questions later.*', mood: 'sparkle', star: { x: 140, y: -20 }, hops: [0.4, 0.8, 1.2], back: back(9),
    front(x, t, lt, P, F) {
      drawBits(x, SLED, { R: RED, K: '#8a4a2e' }, F.x, F.cy + 120, 16 * pop01(t, P.t0 + 0.1, 0.3, 2))
      L(x, 320, 700, 'WHEEE', pop01(t, P.t0 + 0.6, 0.3, 2.2), GOLD, -0.08, 48)
      L(x, 320, 1060, 'HILL: CONQUERED', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, 0.04, 30)
    } },
  { sign: 'capricorn', cap: 'Takes the day off. | *Actually off.*', mood: lt => lt > 1.2 ? 'sleepy' : 'neutral', look: [-1, 0], star: ST_R, back: back(10),
    front(x, t, lt, P) {
      drawBits(x, LAPTOP, { G: SLATE }, 320, 1000, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 320, 760, 'OUT OF OFFICE', pop01(t, P.t0 + 0.7, 0.3, 2.2), MINT, -0.04, 34)
      bubble(x, 320, 900, 'it can wait', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, tail: 'br' })
    } },
  { sign: 'aquarius', cap: 'Studies snowflakes. | *Each one’s original.*', mood: lt => lt > 1.0 ? 'wide' : 'sparkle', look: [1, -1], star: ST_L, back: back(11),
    front(x, t, lt, P) {
      drawBits(x, FLAKE, FLAKE_C, 790, 820, 26 * pop01(t, P.t0 + 0.3, 0.35, 2), { rot: t * 0.5, outline: '#6fc3ff' })
      L(x, 790, 1080, 'LIKE YOU', pop01(t, P.t0 + 1.3, 0.3, 2.4), '#6fc3ff', 0.04, 40)
    } },
  { sign: 'pisces', cap: 'Cries at how pretty | *the snow is.*', mood: lt => lt > 0.8 ? 'heart' : 'wide', tears: lt => lt > 0.8 ? 3 : 2, look: [1, -1], star: ST_L, back: back(12),
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, FLAKE, FLAKE_C, 760, 700, 12 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: t * 0.6, outline: '#b7a6ff' })
      drawBits(x, FLAKE, FLAKE_C, 880, 820, 9 * pop01(t, P.t0 + 0.4, 0.3, 2), { rot: -t * 0.6, outline: '#b7a6ff' })
      bubble(x, 790, 1000, 'it’s so | beautiful', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, col: SKYB, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2a0384', key: 'E', accent: ACC,
  title: 'Each sign’s | *snow-day plan.*',
  cameos: CAMEOS,
  ending: 'lesson',
  group: { cap: 'Snowed in. | *Warmed up.*' },
  lesson: { text: 'Slow days | are *good days.*', chip: 'MOOD: COZY' },
  last: {
    text: 'Cocoa’s ready. | *Come on in.*',
    draw(x, t, lt) { drawBits(x, MUG, { W: '#ffffff', C: '#8a4a2e', M: CREAM }, 540, 750, 26 * pop01(t, t - lt + 0.7, 0.35, 2)) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
