// r2a0089: star_advice ADVICE ROLLCALL, "How each sign | grows." (~61 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs in zodiac order, one warm, specific growth step each with a light visual gag:
//   ♈ slowing down on purpose · ♉ moving the plant into the sun · ♊ finishing one book first · ♋ letting someone
//   take care of them · ♌ clapping for someone else · ♍ leaving one thing a little messy · ♎ picking dinner in a minute
//   · ♏ telling one secret to someone safe · ♐ unpacking, for once · ♑ celebrating a small win
//   · ♒ saying how they feel out loud · ♓ crying, then drinking water
//  49.2   "Everyone grows | *differently.*"
//  52.4   LESSON: "Small steps count. | *You’re growing.*"  GROWTH: IN PROGRESS
//  58.3   "Even Pisces | *drank the water.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const SAGE = '#9fd8a8', BROWN = '#8a4a2e', RED = '#e23d4e', GREEN = '#5fd068', YEL = '#ffd23a'

// ── props
const SNAIL = ['....SSS..', '...SsssS.', '..SsSSsS.', '..SsSsSS.', 'BBBSSSSBB', 'BBBBBBBBB']
const PLANT = ['..GG.GG..', '.GGG.GGG.', '..GGGGG..', 'GG..G..GG', '.GGGGGGG.', '....G....', 'TTTTTTTTT', '.TTTTTTT.', '..TTTTT..']
const BOOK = ['KKKKKKKKKKKKK', 'KCCCCCCCCCCCK', 'KCCCCCCCCCCCK', 'KKKKKKKKKKKKK']
const BOWL = ['.S..S..S.', '..S..S...', 'WWWWWWWWW', 'WOOOOOOOW', '.WWWWWWW.', '..WWWWW..']
const WATCH = ['...KKK...', '..KKKKK..', '.KWWWWWK.', 'KWWWKWWWK', 'KWWWKWWWK', 'KWWWKKWWK', 'KWWWWWWWK', '.KWWWWWK.', '..KKKKK..']
const CASE = ['...KKKK...', '..K....K..', 'RRRRRRRRRR', 'RRRRRRRRRR', 'RYRRRRRRYR', 'RRRRRRRRRR', 'RRRRRRRRRR', 'RYRRRRRRYR', 'RRRRRRRRRR', '.K......K.']
const TROPHY = ['YYYYYYYYY', 'YYYYYYYYY', '.YYYYYYY.', '.YYYYYYY.', '..YYYYY..', '...YYY...', '....Y....', '....Y....', '..BBBBB..', '.BBBBBBB.']
const GLASS = ['W.....W', 'W.....W', 'WBBBBBW', 'WBbBBBW', 'WBBBBBW', 'WBBBBBW', '.WWWWW.']
const GLASS_C = { W: '#e6f4ff', B: SKYB, b: '#ffffff' }
function frame(x, cx, cy, k, rot) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-120, -96, 240, 192); x.fillStyle = GOLD; x.fillRect(-112, -88, 224, 176)
  x.fillStyle = '#8fd3ff'; x.fillRect(-92, -68, 184, 136); x.fillStyle = GREEN; x.fillRect(-92, 20, 184, 48)
  x.fillStyle = YEL; x.beginPath(); x.arc(50, -30, 20, 0, Math.PI * 2); x.fill()
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Slowing down | *on purpose.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: [1, 1], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, SNAIL, { S: '#c97bff', s: LAV, B: SAGE }, lerp(720, 820, prog(lt, 0.3, 2.4)), 1040, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 760, 'NEW RACE PARTNER', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 30, bg: SAGE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Moving the plant | *into the sun.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.1, 0.3, 2)
      if (k > 0.01) { x.save(); x.globalAlpha = 0.3 * clamp(k); x.fillStyle = YEL; x.beginPath(); x.moveTo(820, 500); x.lineTo(900, 500); x.lineTo(960, 1100); x.lineTo(760, 1100); x.closePath(); x.fill(); x.restore() }
    },
    front(x, t, lt, P) {
      const m = ease.inOutCubic(prog(lt, 0.6, 1.3))
      drawBits(x, PLANT, { G: GREEN, T: BROWN }, lerp(640, 840, m), 1010 - Math.sin(Math.PI * m) * 40, 17 * pop01(t, P.t0 + 0.15, 0.3, 2))
      sparkles(x, t, 860, 960, P.t0 + 1.4 * 1.29, 6, 120, 0.3)
    } },
  { sign: 'gemini', cap: 'Finishing one book | *before starting four.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const COLS = [PINK, SKYB, MINT, GOLD, '#c97bff']
      for (let i = 0; i < 5; i++) drawBits(x, BOOK, { K: INK, C: COLS[i] }, 800 + (i % 2 ? 10 : -10), 1060 - i * 50, 17 * pop01(t, P.t0 + 0.15 + i * 0.06, 0.25, 2))
      label(x, 800, 700, 'BOOK 1: DONE ✓', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Letting someone | *take care of them.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) signChar(x, t, 'virgo', 840, 990, 180 * k, { mood: 'happy', look: [-1, 0], seed: 21, glyph: false })
      drawBits(x, BOWL, { S: '#ffffff', W: BONE, O: '#ffb34a' }, lerp(800, 620, ease.inOutCubic(prog(lt, 0.6, 1.2))), 920, 14 * pop01(t, P.t0 + 0.4, 0.3, 2))
      bubble(x, 800, 690, 'your turn to rest', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 34, tail: 'br' })
    } },
  { sign: 'leo', cap: 'Clapping for | *someone else.*', mood: lt => lt > 0.9 ? 'heart' : 'happy', look: [1, 0], star: { x: -200 }, hops: [0.9, 1.4, 1.9],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) { x.save(); x.globalAlpha = 0.25 * clamp(k); x.fillStyle = 'rgba(255,241,200,1)'; x.beginPath(); x.moveTo(770, 500); x.lineTo(830, 500); x.lineTo(920, 1080); x.lineTo(680, 1080); x.closePath(); x.fill(); x.restore() }
    },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      if (k > 0.01) signChar(x, t, 'pisces', 800, 980, 190 * k, { mood: 'sparkle', look: [-1, 0], seed: 22, glyph: false, tears: 1 })
      bubble(x, 520, 650, 'BRAVO!!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 44, tail: 'bl' })
      sparkles(x, t, 800, 920, P.t0 + 1.0, 7, 160, 0.4)
    } },
  { sign: 'virgo', cap: 'Leaving one thing | *a little crooked.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      frame(x, 800, 860, pop01(t, P.t0 + 0.15, 0.3, 2), 0.12)
      label(x, 790, 1100, 'IT’S FINE. (IT IS.)', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Picking dinner | *in under a minute.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -170 }, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      drawBits(x, WATCH, { K: INK, W: BONE }, 790, 850, 24 * k)
      if (k > 0.5) { const a = Math.min(lt, 1.3) * 3.5; x.strokeStyle = RED; x.lineWidth = 8; x.beginPath(); x.moveTo(790, 850); x.lineTo(790 + Math.sin(a) * 70, 850 - Math.cos(a) * 70); x.stroke() }
      label(x, 790, 1100, 'PASTA. DONE.', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Telling one secret | to *someone safe.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 840, 990, 180 * k, { mood: lt > 1.3 ? 'heart' : 'happy', look: [-1, 0], seed: 23, glyph: false })
      bubble(x, 640, 700, 'psst… okay so…', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 36, col: LAV, tail: 'bl' })
      hearts(x, t, 840, 900, P.t0 + 1.4, { n: 4, life: 1.6, spread: 140, cell: 7, seed: 5 })
    } },
  { sign: 'sagittarius', cap: 'Unpacking. | *For once.*', mood: lt => lt > 1.2 ? 'happy' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, CASE, { K: INK, R: '#c97bff', Y: GOLD }, 800, 900, 22 * pop01(t, P.t0 + 0.15, 0.3, 2))
      label(x, 790, 650, 'STAYING A WHILE', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1120, 'DRAWERS: USED', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 28, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Celebrating | *a small win.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.0],
    front(x, t, lt, P) {
      drawBits(x, TROPHY, { Y: GOLD, B: BROWN }, 800, 870, 19 * pop01(t, P.t0 + 0.3, 0.3, 2))
      label(x, 790, 1080, 'REPLIED TO 1 EMAIL', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 800, 860, P.t0 + 1.0, 8, 160, 0.2)
    } },
  { sign: 'aquarius', cap: 'Saying how they feel | *out loud.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 820, 'I… missed you.', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 44, tail: 'bl' })
      label(x, 790, 1060, 'FEELINGS: SHARED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 790, 760, P.t0 + 1.3, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 7 })
    } },
  { sign: 'pisces', cap: 'Crying, then | *drinking water.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', tears: lt => lt > 1.3 ? 1 : 3, look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, GLASS, GLASS_C, 800, 900, 22 * pop01(t, P.t0 + 0.6, 0.3, 2.2))
      label(x, 790, 1100, 'HYDRATED. HEALING.', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0089', key: 'E', accent: SAGE, ending: 'lesson',
  title: 'How each sign | *grows.*',
  cameos: CAMEOS,
  group: { cap: 'Everyone grows | *differently.*' },
  lesson: { text: 'Small steps count. | *You’re growing.*', chip: 'GROWTH: IN PROGRESS' },
  last: {
    text: 'Even Pisces | *drank the water.*',
    draw(x, t, lt) { drawBits(x, GLASS, GLASS_C, 540, 770, 20 * pop01(t, t - lt + 0.6, 0.4, 2)) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
