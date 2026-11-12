// r2t0098: star_talk, ROLLCALL, "The signs | at the hair salon." (~57 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs in zodiac order, each one's most extreme salon self. Ending: callback (Gemini's style count).
//   0.0–3.6    hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ grabbed the scissors · ♉ asleep in the wash chair · ♊ changed the style eleven times · ♋ brought the
//              stylist a pie · ♌ reference photo: themself · ♍ one hair 0.5 mm off · ♎ two identical shades, can't pick
//              · ♏ went in brown, left jet black · ♐ "surprise me", got a mohawk · ♑ emails under the dryer
//              · ♒ hair colour: galaxy · ♓ cried at the mirror, it looked so good
//  49.2        "One stylist. | *Needs a vacation.*"
//  52.6        CALLBACK: "Gemini’s back. | *Style twelve.*"
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const TEAL = '#5fe0d0', RED = '#e23d4e', CREAM = '#fff4e2', ORANGE = '#ffb34a', BROWN = '#8a4a2e'

function card(x, cx, cy, w, h, col, { rot = 0, k = 1 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  x.restore()
}
const SCISSORS = [
  'BB.......BB',
  'B.B.....B.B',
  'BB.B...B.BB',
  '....B.B....',
  '.....S.....',
  '....S.S....',
  '...S...S...',
  '..S.....S..',
  '.S.......S.',
]
const SC_C = { B: RED, S: '#d8dbe8' }
const FOAM = ['..WW.WW..', '.WWWWWWW.', 'WWWWWWWWW', '.WW.WWW..']
const PIE = ['....FFF....', '..FFFFFFF..', '.FRFRFRFRF.', 'FFFFFFFFFFF', 'CCCCCCCCCCC', '.CCCCCCCCC.']
const RULER = ['YYYYYYYYYYYYYYYY', 'YKYKYKYKYKYKYKYK', 'YKY.Y.YKY.Y.YKY.', 'YYYYYYYYYYYYYYYY']
const BOTTLE = ['..KK..', '..KK..', '.BBBB.', 'BBBBBB', 'BWWWWB', 'BWKKWB', 'BWWWWB', 'BBBBBB']
const DRYER = [
  '..DDDDDDD..',
  '.DDDDDDDDD.',
  'DDDDDDDDDDD',
  'DD.......DD',
  'D.........D',
  '.....K.....',
  '.....K.....',
  '.....K.....',
  '.....K.....',
  '...KKKKK...',
]
const MOHAWK = ['..R..R..R..', '.RR.RR.RR..', 'RRRRRRRRRR.']
const MIRROR = ['.GGGGGGG.', 'GSSSSSSSG', 'GSWSSSSSG', 'GSSSSSSSG', 'GSSSSSSSG', 'GSSSSSSSG', 'GSSSSSSSG', '.GGGGGGG.']

const CAMEOS = [
  { sign: 'aries', cap: 'Grabbed the scissors. | *Did it themself.*', mood: 'sparkle', star: { x: -170 }, hops: [0.6, 1.2],
    front(x, t, lt, P, F) {
      const snip = Math.sin(t * 18) * 0.15
      drawBits(x, SCISSORS, SC_C, F.x + 150, F.cy - 120, 12 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.6 + snip })
      label(x, 800, 1060, 'STYLIST: SHOCKED', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 800, 700, 'too slow!', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Fell asleep | *in the wash chair.*', mood: 'sleepy', star: { x: -150, y: 20 },
    front(x, t, lt, P, F) {
      drawBits(x, FOAM, { W: '#ffffff' }, F.x, F.top - 20, 18 * pop01(t, P.t0 + 0.3, 0.3, 2))
      for (let i = 0; i < 4; i++) { const ph = ((t * 0.6 + i / 4) % 1); x.save(); x.globalAlpha = Math.sin(Math.PI * ph); x.strokeStyle = SKYB; x.lineWidth = 4; x.beginPath(); x.arc(F.x - 60 + i * 40, F.top - 60 - ph * 160, 12 + i * 3, 0, Math.PI * 2); x.stroke(); x.restore() }
      label(x, 790, 860, 'DO NOT DISTURB', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 32, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Changed the style | *eleven times.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.8, 1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.2) / 1.8) * 10)
      label(x, 800, 820, `STYLE ${n}`, pop01(t, P.t0 + 0.2, 0.3, 2), { size: 56, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 800, 1040, 'actually…', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Brought the stylist | *a homemade pie.*', mood: lt => lt > 1.1 ? 'heart' : 'happy', look: [1, 0], star: { x: -180 }, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, PIE, { F: '#e7b46a', R: RED, C: BROWN }, 800, 880, 24 * pop01(t, P.t0 + 0.2, 0.35, 2))
      hearts(x, t, 800, 800, P.t0 + 1.0, { n: 5, life: 1.6, spread: 160, cell: 6, seed: 2 })
      label(x, 800, 1060, 'STILL WARM', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Reference photo? | *Of themself.*', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -180 }, hops: [1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      card(x, 800, 860, 260, 320, CREAM, { k, rot: 0.06 })
      if (k > 0.5) { x.save(); x.translate(800, 860); x.rotate(0.06); x.fillStyle = '#ffd99a'; x.fillRect(-110, -140, 220, 230); x.restore(); signChar(x, t, 'leo', 800, 830, 170, { mood: 'sparkle', seed: 71, glyph: false, glow: 0.4 }) }
      label(x, 800, 1090, 'MAKE ME… ME', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.04 })
    } },
  { sign: 'virgo', cap: 'One hair is uneven. | *0.5 mm.*', mood: 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, RULER, { Y: GOLD, K: INK }, 770, 820, 21 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.05 + Math.sin(t * 2) * 0.03 })
      label(x, 800, 1020, 'REDO. PLEASE.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: MINT, rot: 0.04 })
    } },
  { sign: 'libra', cap: 'Two identical shades. | *Can’t choose.*', mood: 'wide', look: lt => [Math.sin(lt * 4) > 0 ? 1 : -1, 0], star: { x: 0, y: 40, s: 260 },
    front(x, t, lt, P) {
      card(x, 300, 800, 140, 180, '#ff9ec7', { k: pop01(t, P.t0 + 0.2, 0.3, 2), rot: -0.08 })
      card(x, 780, 800, 140, 180, '#ff9ec7', { k: pop01(t, P.t0 + 0.35, 0.3, 2), rot: 0.08 })
      label(x, 300, 950, 'BLUSH', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 28, bg: BONE, font: MONO, weight: 700 })
      label(x, 780, 950, 'ROSE', pop01(t, P.t0 + 0.7, 0.3, 2), { size: 28, bg: BONE, font: MONO, weight: 700 })
      label(x, 540, 640, 'HOUR 2', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 40, bg: GOLD, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Went in brown. | Left *jet black.*', mood: lt => lt > 1.2 ? 'wink' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, BOTTLE, { K: '#6b62a8', B: '#3a2a5a', W: CREAM }, 800, 860, 36 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.1 })
      label(x, 800, 1090, 'MYSTERIOUS NOW', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: RED, color: CREAM, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Said “surprise me.” | *Got a mohawk.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', star: { x: -150 }, hops: [1.3, 1.8],
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.9, 0.3, 2.2)
      if (k > 0.01) drawBits(x, MOHAWK, { R: RED }, F.x - 10, F.top - 18, 22 * k)
      bubble(x, 790, 760, 'LOVE IT', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 50, tail: 'bl' })
      sparkles(x, t, F.x, F.top, P.t0 + 1.2, 7, 140, 0.3)
    } },
  { sign: 'capricorn', cap: 'Answered emails | *under the dryer.*', mood: 'neutral', look: [1, 0], star: { x: -150, y: 40 },
    back(x, t, lt, P, F) { drawBits(x, DRYER, { D: '#c9c9d8', K: INK }, F.x, F.cy - 60, 28 * pop01(t, P.t0 + 0.15, 0.35, 2)) },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.5, 0.3, 2)
      card(x, 800, 960, 240, 150, '#2a2350', { k })
      if (k > 0.5) for (let i = 0; i < 3; i++) { x.fillStyle = SKYB; x.fillRect(710, 920 + i * 30, 160 - i * 30, 12) }
      label(x, 800, 720, 'INBOX: ZERO', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Hair colour? | *Galaxy.*', mood: 'sparkle', look: [1, 0], star: { x: -180 }, hops: [1.1],
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.4, 0.35, 2)
      const cols = ['#ff6b5e', ORANGE, GOLD, MINT, SKYB, LAV, PINK]
      for (let i = 0; i < 7; i++) { x.fillStyle = cols[i]; x.globalAlpha = k; x.fillRect(680 + i * 34, 760, 30, 220 * k) }
      x.globalAlpha = 1
      label(x, 800, 1060, 'NOT ON THE CHART', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 800, 860, P.t0 + 0.9, 7, 170, 0.5)
    } },
  { sign: 'pisces', cap: 'Cried at the mirror. | *It looked so good.*', mood: 'wide', tears: lt => lt > 0.8 ? 3 : 2, look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, MIRROR, { G: GOLD, S: '#8fb8d8', W: '#ffffff' }, 800, 860, 30 * pop01(t, P.t0 + 0.2, 0.35, 2))
      bubble(x, 800, 620, 'it’s perfect', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, tail: 'bl' })
      label(x, 800, 1110, 'TISSUES: OUT', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0098', key: 'G', accent: TEAL, ending: 'callback',
  title: 'The signs | *at the hair salon.*',
  cameos: CAMEOS,
  group: { cap: 'One stylist. | *Needs a vacation.*' },
  last: {
    text: 'Gemini’s back. | *Style twelve.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'gemini', 540, 1060, 300 * k, { mood: Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', seed: 40, hops: [t - lt + 1.2] })
      label(x, 540, 1330, 'STYLE 12', pop01(t, t - lt + 0.9, 0.3, 2.2), { size: 56, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
