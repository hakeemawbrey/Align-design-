// r2a0459: star_advice, ADVICE ROLLCALL, "Each sign's | *relationship goal.*" (signs3kit social cut, music: lofi · E).
// Ending: card (lesson + last line over the match card: Taurus + Cancer, the slow Sunday and the hug of a home, paired).
//   ♈ someone who keeps up · ♉ slow Sunday mornings (pancakes) · ♊ a best friend who flirts back · ♋ a home that feels
//   like a hug · ♌ being someone's favourite story · ♍ someone who notices the little things · ♎ give and take (scales)
//   · ♏ handing over the key, slowly · ♐ a partner for every adventure (tent for two) · ♑ building something that lasts
//   · ♒ love with room to be weird · ♓ understood without words (tears)
//   group "Every heart | wants something."  lesson "Know what you want. | Say it out loud."  last "Slow Sundays. | A home that hugs."
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#ff8fb1', CREAM = '#fff4e2', RED = '#e23d4e', SLATE = '#9aa5c4'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })
const ST = { x: -190 }

const SHOES = ['.RRR.....RRR.', '.RWR.....RWR.', 'RRRRR...RRRRR', 'KKKKK...KKKKK']
const SHOES_C = { R: RED, W: CREAM, K: BONE }
const PANCAKES = ['....YY.....', '..BBBBBBB..', '.BBBBBBBBB.', '..CCCCCCC..', '.BBBBBBBBB.', '..CCCCCCC..', '.BBBBBBBBB.', 'WWWWWWWWWWW', '.WWWWWWWWW.']
const PANCAKES_C = { Y: GOLD, B: '#e0a56a', C: '#c98f5a', W: CREAM }
const HOUSE = ['......RR......', '.....RRRR.....', '....RRRRRR....', '...RRRRRRRR...', '..RRRRRRRRRR..', '.RRRRRRRRRRRR.', '..WWWWWWWWWW..', '..WWWHHWHHWW..', '..WWHHHHHHHW..', '..WWWHHHHHWW..', '..WWWWHHHWWW..', '..WWWWWHWWWW..']
const HOUSE_C = { R: '#7fd0ff', W: CREAM, H: PINK }
const BOOK = ['RYYYYYYYYYY', 'RYYYYYYYYYY', 'RYYHH.HHYYY', 'RYHHHHHHHYY', 'RYHHHHHHHYY', 'RYYHHHHHYYY', 'RYYYHHHYYYY', 'RYYYYHYYYYY', 'RYYYYYYYYYY', 'RWWWWWWWWWW']
const BOOK_C = { R: '#c0392b', Y: GOLD, H: RED, W: CREAM }
const MUG = ['.S.S.S...', '..S.S....', 'WWWWWWW..', 'WMMMMMWWW', 'WMMMMMW.W', 'WMMMMMW.W', 'WMMMMMWWW', 'WWWWWWW..']
const MUG_C = { S: 'rgba(255,255,255,0.6)', W: CREAM, M: '#a8742a' }
const SCALE = ['.......K.......', '......KKK......', 'KKKKKKKKKKKKKKK', 'K......K......K', 'K......K......K', 'HH.....K.....HH', 'HHH....K....HHH', '.......K.......', '.....KKKKK.....']
const KEY = ['.YYY.......', 'Y...Y......', 'Y...YYYYYYY', 'Y...Y..Y.Y.', '.YYY...Y.Y.']
const TENT = ['......T......', '.....TTT.....', '....TTTTT....', '...TTTYTTT...', '..TTTYYYTTT..', '.TTTYYYYYTTT.', 'TTTYYYYYYYTTT', 'GGGGGGGGGGGGG']
const TENT_C = { T: '#ff9a4a', Y: '#ffe7a8', G: '#5fd068' }
const BRICK = ['RRRR.RRRR', 'RRRR.RRRR']
const UFO = ['....GGG....', '...GWWWG...', '.SSSSSSSSS.', 'SSYSSYSSYSS', '.SSSSSSSSS.']
const UFO_C = { G: SKYB, W: '#e8fbff', S: SLATE, Y: GOLD }

const CAMEOS = [
  { sign: 'aries', cap: 'Someone who keeps up. | *Race you there.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.5, 0.9],
    front(x, t, lt, P) {
      drawBits(x, SHOES, SHOES_C, 780, 900, 25 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 680, 'PACE: MATCHED', pop01(t, P.t0 + 1.0, 0.3, 2.4), GOLD, -0.04, 38)
    } },
  { sign: 'taurus', cap: 'Sunday mornings. | *Slow and sweet.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, PANCAKES, PANCAKES_C, 790, 930, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 660, 'PLANS: NONE ♡', pop01(t, P.t0 + 1.1, 0.3, 2.4), MINT, 0.04, 38)
    } },
  { sign: 'gemini', cap: 'A best friend | *who flirts back.*', mood: 'wink', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 760, 660, 'you’re ridiculous', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 36, col: LAV, tail: 'br' })
      bubble(x, 810, 870, 'you love it ;)', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 40, tail: 'bl' })
      L(x, 790, 1080, 'BANTER: FOREVER', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: 'cancer', cap: 'A home that | *feels like a hug.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, HOUSE, HOUSE_C, 790, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      hearts(x, t, 790, 700, P.t0 + 1.0, { n: 5, life: 1.8, spread: 160, cell: 7, seed: 4 })
    } },
  { sign: 'leo', cap: 'Being someone’s | *favourite story.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, BOOK, BOOK_C, 790, 880, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 1080, 'CH. 1: LEO ♡', pop01(t, P.t0 + 1.1, 0.3, 2.4), PINK, 0.04, 38)
    } },
  { sign: 'virgo', cap: 'Someone who notices | *the little things.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, MUG, MUG_C, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 660, 'JUST HOW YOU LIKE IT', pop01(t, P.t0 + 1.1, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: 'libra', cap: 'Give and take. | *Equal, always.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, SCALE, { K: GOLD, H: PINK }, 790, 860, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.06 * Math.sin(t * 2) * (1 - clamp(lt - 1)) })
      L(x, 790, 1100, 'BALANCED ✓', pop01(t, P.t0 + 1.3, 0.3, 2.4), LAV, 0.04, 38)
    } },
  { sign: 'scorpio', cap: 'Handing over the key. | *Slowly.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const m = ease.inOutCubic(prog(lt, 0.4, 2.0))
      drawBits(x, KEY, { Y: GOLD }, lerp(560, 820, m), 880, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 1080, 'TRUST: 1 MM/DAY', pop01(t, P.t0 + 1.0, 0.3, 2.4), PINK, -0.04, 34)
    } },
  { sign: 'sagittarius', cap: 'A partner | *for every adventure.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.0],
    front(x, t, lt, P) {
      drawBits(x, TENT, TENT_C, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 660, 'TENT FOR TWO', pop01(t, P.t0 + 1.1, 0.3, 2.4), GOLD, 0.04, 38)
    } },
  { sign: 'capricorn', cap: 'Building something | *that lasts.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.min(5, Math.floor(Math.max(0, lt - 0.2) / 0.3) + 1)
      for (let i = 0; i < n; i++) drawBits(x, BRICK, { R: '#d9774a' }, 790 + (i % 2 ? 40 : 0), 1060 - i * 60, 22 * pop01(t, P.t0 + 0.2 + i * 0.38, 0.2, 2))
      L(x, 790, 660, 'BRICK BY BRICK', pop01(t, P.t0 + 1.7, 0.3, 2.4), MINT, -0.04, 34)
    } },
  { sign: 'aquarius', cap: 'Love with room | *to be weird.*', mood: 'happy', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      drawBits(x, UFO, UFO_C, 800, 700 + Math.sin(t * 3) * 12, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 940, 'you’re strange. | I love it.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 36, col: SKYB, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'To be understood | *without words.*', mood: 'heart', tears: lt => lt > 0.8 ? 3 : 2, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 700, '…', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 60, tail: 'bl' })
      bubble(x, 800, 900, 'I know. ♡', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 44, col: PINK, tail: 'br' })
    } },
]

const F = makeFilm({
  id: 'r2a0459', key: 'E', accent: ACC, ending: 'card',
  title: 'Each sign’s | *relationship goal.*',
  cameos: CAMEOS,
  card: { a: 'taurus', b: 'cancer', chip: 'ALIGNED' },
  group: { cap: 'Every heart | *wants something.*' },
  lesson: { text: 'Know what you want. | *Say it out loud.*', chip: 'GOAL: SET' },
  last: { text: 'Slow Sundays. | *A home that hugs.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
