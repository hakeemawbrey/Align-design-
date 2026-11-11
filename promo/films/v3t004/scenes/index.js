// v3t004: THE SIGNS AS… v3, "Zodiacs trying to eat healthy | be like." (~63 s vertical, signs3kit social cut, music: lofi · F)
//   0.0–3.6    "Zodiacs on a diet | *be like.*"
//   3.6–49.2   one healthy-eating attempt per sign (3.8 s each), each pushed to the extreme:
//              ♈ one green smoothie, signed up for a triathlon · ♉ the salad, topped with pizza · ♊ three diets, same morning
//              · ♋ cooked healthy for everyone, ate the cookies · ♌ ate one carrot, updated their bio · ♍ weighed each lettuce leaf
//              · ♎ asked the salad its sign · ♏ kale for everyone, a secret chocolate drawer · ♐ the diet lasted till the airport
//              · ♑ meal-prepped the whole year · ♒ invented a smoothie, it glows · ♓ felt bad for the broccoli
//  49.2        "Healthy? | *-ish.*"
//  52.4        LESSON UNLOCKED: "Be kind to your body. | And *to cake.*"  BALANCE: FOUND
//  58.3        "Taurus found | *the cookies.*" over the match card: Taurus + Cancer (Cancer's cookies, paid off).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ORANGE = '#ffb34a', RED = '#e23d4e', BROWN = '#8a4a2e', GREEN = '#5fd068'

const SMOOTHIE = [
  '......K.',
  '.....K..',
  'WWWWKWWW',
  'WGGGKGGW',
  'WGGGGGGW',
  '.WGGGGW.',
  '.WGGGGW.',
  '.WGGGGW.',
  '..WWWW..',
]
const BOWL = [
  'G.L.G.T.L.G',
  'LGTGLGGTLGL',
  'WWWWWWWWWWW',
  '.WWWWWWWWW.',
  '..WWWWWWW..',
]
const BOWL_C = { G: GREEN, L: '#2a8a4a', T: RED, W: '#fff4e2' }
const PIZZA = [
  'YYYYYYYYY',
  '.YRYYYRY.',
  '..YYRYY..',
  '...YYY...',
  '....Y....',
]
const PIZZA_C = { Y: '#ffd23a', R: RED }
const COOKIE = [
  '.BBBB.',
  'BBKBBB',
  'BBBBKB',
  'BKBBBB',
  '.BBBB.',
]
const COOKIE_C = { B: '#d8a45a', K: '#5a2e1a' }
const CARROT = [
  '...GG',
  '..GG.',
  '.OOO.',
  '.OOO.',
  '..OO.',
  '..OO.',
  '...O.',
]
const CARROT_C = { G: GREEN, O: ORANGE }
const LEAF = [
  '..GG..',
  '.GGGG.',
  'GGLGGG',
  'GGLGGG',
  '.GLGG.',
  '..L...',
]
const LEAF_C = { G: GREEN, L: '#2a8a4a' }
const SCALE = [
  '.KKKKKKKK.',
  'KWWWWWWWWK',
  'KKKKKKKKKK',
  '....KK....',
  '..KKKKKK..',
  '.KWWWWWWK.',
  '.KKKKKKKK.',
]
const SCALE_C = { K: '#6b62a8', W: '#d8dbe8' }
const CHOC = [
  'BBBBBBBB',
  'BbBBbBBb',
  'BBBBBBBB',
  'BbBBbBBb',
  'BBBBBBBB',
]
const CHOC_C = { B: '#6a3a22', b: '#8a5a3a' }
const BOX = [
  'KKKKKKKK',
  'KWWWWWWK',
  'KWGGRRWK',
  'KWGGRRWK',
  'KWWWWWWK',
  'KKKKKKKK',
]
const BROCCOLI = [
  '.GGGG.',
  'GGGGGG',
  'GgGGgG',
  'GGGGGG',
  '.GLLG.',
  '..LL..',
  '..LL..',
]
const BROC_C = { G: '#3fb058', g: '#2a8a4a', L: '#a8e08a' }
const PLANE = [
  '......WW.....',
  '......WWW....',
  'W.....WWWW...',
  'WWWWWWWWWWWWW',
  'WWWWWWWWWWWWS',
  'W.....WWWW...',
  '......WWW....',
  '......WW.....',
]

const CAMEOS = [
  { sign: 'aries', cap: 'Drank one smoothie. | *Triathlon* next week.', mood: lt => lt > 1.1 ? 'sparkle' : 'happy', star: { x: -170 }, hops: [1.1, 1.5],
    front(x, t, lt, P) {
      drawBits(x, SMOOTHIE, { W: '#fff4e2', G: GREEN, K: PINK }, 790, 820, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.06 })
      label(x, 790, 1060, 'TRIATHLON: SUNDAY', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
      sparkles(x, t, 790, 820, P.t0 + 1.1, 6, 150, 0.3)
    } },
  { sign: 'taurus', cap: 'Ordered the salad. | Topped it *with pizza.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, BOWL, BOWL_C, 790, 980, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const d = ease.outBounce ? ease.outBounce(prog(lt, 0.8, 1.3)) : ease.outCubic(prog(lt, 0.8, 1.3))
      if (lt > 0.75) drawBits(x, PIZZA, PIZZA_C, 790, lerp(560, 880, d), 20, { rot: 0.1 })
      label(x, 790, 680, 'STILL A SALAD', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: MINT, rot: 0.05 })
    } },
  { sign: 'gemini', cap: 'Started three diets. | *Same morning.*', mood: lt => Math.floor(lt * 2.8) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.8) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const D = ['KETO 8:00', 'VEGAN 8:15', 'JUICE 8:30']
      D.forEach((d, i) => label(x, 790, 680 + i * 140, d, pop01(t, P.t0 + 0.3 + i * 0.45, 0.3, 2.2), { size: 36, bg: [GOLD, MINT, PINK][i], rot: i % 2 ? 0.05 : -0.05, font: MONO, weight: 700 }))
      bubble(x, 380, 600, 'new plan!', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 38, tail: 'bc' })
    } },
  { sign: 'cancer', cap: 'Cooked healthy for all. | Ate *the cookies.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, BOWL, BOWL_C, 790, 1050, 16 * pop01(t, P.t0 + 0.15, 0.3, 2))
      label(x, 790, 960, 'FOR YOU ♡', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 30, bg: BONE, rot: 0.04 })
      for (let i = 0; i < 4; i++) { const gone = lt > 1.2 + i * 0.2; if (!gone) drawBits(x, COOKIE, COOKIE_C, 700 + i * 60, 760, 14 * pop01(t, P.t0 + 0.7 + i * 0.08, 0.3, 2)) }
      label(x, 790, 640, 'COOKIES: 0', pop01(t, P.t0 + 2.0, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Ate one carrot. | Updated *their bio.*', mood: 'sparkle', star: { x: -170 }, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, CARROT, CARROT_C, 600, 1020, 16 * pop01(t, P.t0 + 0.15, 0.3, 2), { rot: -0.3 })
      const k = pop01(t, P.t0 + 0.7, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(820, 820); x.rotate(0.04); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-146, -176, 292, 352); x.fillStyle = '#2a2350'; x.fillRect(-140, -170, 280, 340)
        signChar(x, t, 'leo', 0, -70, 140, { mood: 'wink', seed: 51, glyph: false, glow: 0.8 })
        x.fillStyle = ORANGE; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('♌︎ LEO', 0, 34)
        x.fillStyle = BONE; x.font = `800 30px ${INTER}`; x.fillText('wellness icon.', 0, 86); x.fillText('vegetable fan.', 0, 128)
        x.restore()
      }
      sparkles(x, t, 820, 820, P.t0 + 1.3, 7, 190, 0.5)
    } },
  { sign: 'virgo', cap: 'Weighed the lettuce. | *Each leaf.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, SCALE, SCALE_C, 790, 1000, 22 * pop01(t, P.t0 + 0.15, 0.3, 2))
      const n = Math.min(5, Math.floor(Math.max(0, lt - 0.4) / 0.3))
      if (lt > 0.4) drawBits(x, LEAF, LEAF_C, 790, 930, 14, { rot: Math.sin(n) * 0.3 })
      label(x, 790, 700, `LEAF ${n + 1}: 2 G`, pop01(t, P.t0 + 0.5, 0.3, 2), { size: 36, bg: MINT, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Asked the salad | *its sign.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, BOWL, BOWL_C, 790, 1000, 22 * pop01(t, P.t0 + 0.15, 0.3, 2))
      bubble(x, 380, 600, 'what’s your | sign?', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 38, tail: 'bc' })
      label(x, 790, 760, '✦ IT’S A MATCH', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 790, 920, P.t0 + 1.5, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 6 })
    } },
  { sign: 'scorpio', cap: 'Kale for everyone. | Secret *chocolate drawer.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      if (k <= 0.01) return
      const open = ease.outCubic(prog(lt, 0.8, 1.2)) * 120
      x.save(); x.translate(790, 880); x.scale(k, k)
      x.fillStyle = INK; x.fillRect(-160, -150, 320, 300); x.fillStyle = BROWN; x.fillRect(-152, -142, 304, 284)
      x.fillStyle = '#6a3a22'; x.fillRect(-140, -40, 280, 6)
      x.restore()
      x.save(); x.translate(790, 880); x.scale(k, k)
      x.fillStyle = INK; x.fillRect(-150 - 4, -20 + open - 4, 300 + 8, 140 + 8); x.fillStyle = '#a8653e'; x.fillRect(-150, -20 + open, 300, 140)
      x.fillStyle = GOLD; x.fillRect(-20, 40 + open, 40, 12)
      x.restore()
      if (open > 20) { for (let i = 0; i < 3; i++) drawBits(x, CHOC, CHOC_C, 700 + i * 90, 1010, 14, { outline: GOLD }) ; label(x, 790, 820, 'SECRET STASH', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.05 }) }
      label(x, 790, 660, 'KALE ONLY.', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 36, bg: GREEN, rot: -0.04 })
    } },
  { sign: 'sagittarius', cap: 'The diet lasted | until *the airport.*', mood: 'sparkle', star: { x: 150 }, hops: [0.5, 1.3],
    back(x, t, lt, P) {
      const p = prog(lt, 0.2, 2.2)
      if (p > 0 && p < 1) drawBits(x, PLANE, { W: '#ffffff', S: SKYB }, lerp(120, 960, p), 600 - 60 * p, 12, { rot: -0.08 })
    },
    front(x, t, lt, P) {
      label(x, 330, 820, 'DAY 1: SALAD', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 32, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
      label(x, 330, 960, 'GATE 4: PASTRIES', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Meal-prepped | *the whole year.*', mood: lt => lt < 1.2 ? 'neutral' : 'happy', look: [-1, 0], star: { x: 170 },
    back(x, t, lt, P) {
      const n = Math.min(20, Math.floor(Math.max(0, lt - 0.2) / 0.07))
      for (let i = 0; i < n; i++) drawBits(x, BOX, { K: INK, W: '#eef6ff', G: GREEN, R: ORANGE }, 230 + (i % 4) * 80, 1110 - Math.floor(i / 4) * 66, 9)
    },
    front(x, t, lt, P) {
      label(x, 340, 640, 'JAN–DEC', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 40, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Invented a smoothie. | It’s *glowing.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const g = 0.5 + 0.5 * Math.sin(t * 8)
      x.save(); x.shadowColor = MINT; x.shadowBlur = 40 * g * clamp(lt - 0.8)
      drawBits(x, SMOOTHIE, { W: '#fff4e2', G: lt > 0.8 ? MINT : LAV, K: SKYB }, 790, 860, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })
      x.restore()
      label(x, 790, 1100, 'FLAVOUR: UNKNOWN', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: SKYB, rot: -0.05, font: MONO, weight: 700 })
      sparkles(x, t, 790, 860, P.t0 + 0.9, 6, 160, 0.6, [MINT, BONE, SKYB])
    } },
  { sign: 'pisces', cap: 'Felt bad for the broccoli. | *Couldn’t eat it.*', mood: lt => lt < 0.9 ? 'happy' : 'wide', tears: lt => lt < 0.9 ? 1 : 3, star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, BROCCOLI, BROC_C, 790, 900, 26 * k)
      if (k > 0.8) { x.fillStyle = INK; x.fillRect(764, 870, 10, 12); x.fillRect(806, 870, 10, 12); x.fillRect(778, 896, 24, 6) }
      bubble(x, 790, 640, 'it has | a face', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, col: LAV, tail: 'bl' })
      label(x, 790, 1120, 'ADOPTED IT', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 32, bg: PINK, rot: 0.05 })
    } },
]

const F = makeFilm({
  id: 'v3t004', key: 'F', accent: '#5fd068',
  title: 'Zodiacs on a diet | *be like.*',
  cameos: CAMEOS,
  card: { a: 'taurus', b: 'cancer', chip: 'ALIGNED' },
  group: { cap: 'Healthy? | *-ish.*' },
  lesson: { text: 'Be kind to your body. | And *to cake.*', chip: 'BALANCE: FOUND' },
  last: {
    text: 'Taurus found | *the cookies.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 10, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
