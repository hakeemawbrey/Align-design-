// v3t079: THE SIGNS AS… v3, "The signs at a | farmers market." (~54 s vertical, signs3kit social cut, music: lofi · F)
// The format look lives in ../../signs3kit.js. Ending: group.
//   0.0–3.6    "The signs at a | *farmers market.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one market trip per sign (3.8 s each), pushed to the extreme:
//              ♈ bought the first thing: a whole pumpkin · ♉ every free sample · ♊ chatted with every stall ("what's your sign?"), bought nothing
//              · ♋ adopted a wonky carrot (Gary) · ♌ sunflowers taller than them · ♍ inspected every tomato personally
//              · ♎ strawberry or peach? the stall closed · ♏ knows where the secret honey is · ♐ hottest sauce, asked for hotter
//              · ♑ negotiated a bulk deal on eggs · ♒ only buys vegetables nobody's heard of
//              · ♓ "picked with love." sobbed
//  49.2        "Nobody stuck | *to the list.*"  Group photo, and the list pops up: EGGS. (Only Capricorn got eggs.)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', ORANGE = '#ffb34a', GREEN = '#5fd068'

// ── props
const PUMPKIN = [
  '.....GG.....',
  '....GG......',
  '.OOOOOOOOOO.',
  'OOoOOoOOoOOO',
  'OOoOOoOOoOOO',
  'OOoOOoOOoOOO',
  'OOoOOoOOoOOO',
  '.OOOOOOOOOO.',
]
const PUMPKIN_C = { G: GREEN, O: ORANGE, o: '#d9862f' }
const CARROT = [
  '..G.G...',
  '...GG...',
  '..OOO...',
  '..OOOO..',
  '...OOOO.',
  '..OOO...',
  '.OOO....',
  '..OO....',
  '...O....',
]
const CARROT_C = { G: GREEN, O: '#ff8a3a' }
const FLOWER = [
  '..Y.Y.Y..',
  '.YYYYYYY.',
  'YYYBBBYYY',
  '.YYBBBYY.',
  'YYYBBBYYY',
  '.YYYYYYY.',
  '..Y.G.Y..',
  '....G....',
  '...GG....',
  '....G.G..',
  '....GGG..',
  '....G....',
  '....G....',
  '....G....',
]
const FLOWER_C = { Y: GOLD, B: '#8a4a2e', G: GREEN }
const TOMATO = ['..GGG..', '.RRGRR.', 'RRRRRRR', 'RWRRRRR', 'RRRRRRR', '.RRRRR.']
const JAR = ['.KKKK.', 'WWWWWW', 'WCCCCW', 'WCCCCW', 'WCCCCW', 'WWWWWW']
const CHILI = ['......G', '.....GG', '...RRR.', '..RRR..', '.RRR...', 'RRR....', 'RR.....']
const EGG = ['.WW.', 'WWWW', 'WWWW', '.WW.']
const ODDVEG = [
  '...G.G...',
  '....G....',
  '..PPPPP..',
  '.PPpPPPP.',
  'PPPPPpPPP',
  'PpPPPPPPp',
  '.PPPPpPP.',
  '..PPPPP..',
  '....P....',
]
const BERRIES = [
  '.R.B.R.B.',
  'RBRBRBRBR',
  'KKKKKKKKK',
  'KkkkkkkkK',
  '.KkkkkkK.',
  '..KKKKK..',
]
const BERRY_C = { R: RED, B: '#5a5ae0', K: '#8a5a3a', k: '#c48a5a' }

function magnifier(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(-0.5)
  x.fillStyle = INK; x.fillRect(-10, 60, 20, 110)
  x.fillStyle = '#8a5a3a'; x.fillRect(-6, 64, 12, 100)
  x.strokeStyle = INK; x.lineWidth = 18; x.beginPath(); x.arc(0, 0, 64, 0, Math.PI * 2); x.stroke()
  x.strokeStyle = '#c9c9d8'; x.lineWidth = 10; x.beginPath(); x.arc(0, 0, 64, 0, Math.PI * 2); x.stroke()
  x.fillStyle = 'rgba(143,227,255,0.25)'; x.beginPath(); x.arc(0, 0, 58, 0, Math.PI * 2); x.fill()
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Bought the first thing. | *A whole pumpkin.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', star: { x: -160 }, hops: [0.5, 1.0],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, PUMPKIN, PUMPKIN_C, 790, 900, 26 * pop01(t, P.t0 + 0.4, 0.35, 2))
      label(x, 790, 660, 'THE LIST: EGGS', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 32, bg: BONE, rot: -0.05, font: MONO, weight: 700 })
      label(x, 790, 1100, 'ENTRANCE: 2 m AWAY', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 28, bg: GOLD, rot: 0.04 })
    } },
  { sign: 'taurus', cap: 'Free samples? | *All of them.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', star: { x: -160 },
    front(x, t, lt, P) {
      const n = Math.max(0, 6 - Math.floor(Math.max(0, lt - 0.4) / 0.25))
      const k = pop01(t, P.t0 + 0.25, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 900); x.scale(k * 1.05, k * 1.25)
        x.fillStyle = INK; x.fillRect(-160, -14, 320, 40); x.fillStyle = '#fff4e2'; x.fillRect(-152, -8, 304, 28)
        for (let i = 0; i < n; i++) { x.fillStyle = [RED, GOLD, ORANGE][i % 3]; x.fillRect(-130 + i * 48, -40, 30, 30); x.fillStyle = '#c48a5a'; x.fillRect(-117 + i * 48, -60, 4, 22) }
        x.restore()
      }
      label(x, 790, 700, 'FREE SAMPLES', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 34, bg: MINT, rot: -0.04 })
      label(x, 790, 1060, `LEFT: ${n}`, pop01(t, P.t0 + 0.6, 0.3, 2), { size: 36, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Chatted with every stall. | *Bought nothing.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', star: { x: -170 }, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      bubble(x, 780, 660, 'what’s your sign?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, tail: 'bl' })
      const n = 1 + Math.floor(clamp((lt - 0.4) / 1.6) * 30)
      label(x, 790, 880, `STALLS: ${n}`, pop01(t, P.t0 + 0.6, 0.3, 2), { size: 38, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1060, 'BAG: EMPTY', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 32, bg: RED, color: '#fff4e2', rot: -0.05 })
    } },
  { sign: 'cancer', cap: 'Adopted a | *wonky carrot.*', mood: 'heart', star: { x: -160 },
    front(x, t, lt, P) {
      drawBits(x, CARROT, CARROT_C, 790, 880, 24 * pop01(t, P.t0 + 0.3, 0.35, 2), { rot: 0.15 })
      label(x, 790, 1090, 'HIS NAME IS GARY', pop01(t, P.t0 + 1.0, 0.3, 2), { size: 30, bg: PINK, rot: -0.04 })
      bubble(x, 790, 650, 'nobody wanted him', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 32, col: LAV, tail: 'bl' })
      hearts(x, t, 560, 860, P.t0 + 1.2, { n: 4, life: 1.6, spread: 80, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Bought sunflowers. | *Taller than them.*', mood: 'sparkle', star: { x: -160, y: 40 }, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, FLOWER, FLOWER_C, 760, 800, 28 * pop01(t, P.t0 + 0.3, 0.35, 2), { rot: 0.05 })
      label(x, 870, 1100, 'MATCHING. OBVIOUSLY.', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 28, bg: ORANGE, rot: 0.04 })
      sparkles(x, t, 760, 640, P.t0 + 0.8, 7, 140, 0.2)
    } },
  { sign: 'virgo', cap: 'Inspected every tomato. | *Personally.*', mood: 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.25, 0.3, 2)
      drawBits(x, TOMATO, { G: GREEN, R: RED, W: '#ffb0a0' }, 790, 860, 22 * k)
      magnifier(x, 790 + 30 * Math.sin(t * 3), 840, pop01(t, P.t0 + 0.5, 0.3, 2))
      const n = 1 + Math.floor(clamp((lt - 0.4) / 1.6) * 59)
      label(x, 790, 1080, `TOMATO ${n} OF 60`, pop01(t, P.t0 + 0.6, 0.3, 2), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Strawberry or peach? | *The stall closed.*', mood: lt => lt > 1.8 ? 'wide' : 'neutral', look: lt => [Math.floor(lt * 2.4) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.25, 0.3, 2), a = Math.floor(lt * 2.4) % 2
      drawBits(x, JAR, { K: '#c9c9d8', W: '#fff4e2', C: RED }, 720, 860, 20 * k * (a ? 1 : 1.2))
      drawBits(x, JAR, { K: '#c9c9d8', W: '#fff4e2', C: ORANGE }, 860, 860, 20 * k * (a ? 1.2 : 1))
      label(x, 790, 1090, 'CLOSED', pop01(t, P.t0 + 1.7, 0.3, 2.6), { size: 46, bg: RED, color: '#fff4e2', rot: -0.06 })
    } },
  { sign: 'scorpio', cap: 'Knows where | *the secret honey* is.', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, JAR, { K: '#c9c9d8', W: '#fff4e2', C: GOLD }, 790, 880, 22 * pop01(t, P.t0 + 1.0, 0.35, 2))
      bubble(x, 790, 660, '“the good stuff,” | please', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 34, col: LAV, tail: 'bl' })
      label(x, 790, 1080, 'NOT ON THE MENU', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 28, bg: '#c97bff', color: '#fff4e2', rot: -0.04 })
    } },
  { sign: 'sagittarius', cap: 'Tried the hottest sauce. | *Asked for hotter.*', mood: lt => lt > 1.1 ? 'wide' : 'sparkle', star: { x: 160 },
    front(x, t, lt, P, F) {
      drawBits(x, CHILI, { R: RED, G: GREEN }, 320, 860, 22 * pop01(t, P.t0 + 0.3, 0.35, 2), { rot: -0.2 })
      // steam puffs from the star
      if (lt > 1.0) for (let i = 0; i < 3; i++) { const ph = ((t * 1.4 + i / 3) % 1); x.save(); x.globalAlpha = 0.6 * (1 - ph); x.fillStyle = BONE; x.fillRect(F.x - 40 + i * 40, F.top - 20 - ph * 120, 22, 22); x.restore() }
      bubble(x, 320, 660, 'got anything | spicier?', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 34, tail: 'br' })
      label(x, 320, 1080, 'FARMER: WORRIED', pop01(t, P.t0 + 1.8, 0.3, 2.2), { size: 28, bg: GOLD, rot: 0.04 })
    } },
  { sign: 'capricorn', cap: 'Negotiated a bulk deal. | *On eggs.*', mood: lt => lt > 1.5 ? 'happy' : 'neutral', look: [-1, 0], star: { x: 160 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(320, 880); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-150, -60, 300, 130); x.fillStyle = '#c48a5a'; x.fillRect(-142, -52, 284, 114)
        x.restore()
        for (let i = 0; i < 8; i++) drawBits(x, EGG, { W: '#fff4e2' }, 320 - 105 + (i % 4) * 70, 860 + Math.floor(i / 4) * 50, 9 * k)
      }
      label(x, 320, 680, 'EGGS: 120', pop01(t, P.t0 + 0.8, 0.3, 2), { size: 36, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 320, 1080, 'DEAL: CLOSED', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 32, bg: '#2fc79a', rot: 0.04 })
    } },
  { sign: 'aquarius', cap: 'Only buys vegetables | *nobody’s heard of.*', mood: 'sparkle', look: [1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, ODDVEG, { G: GREEN, P: '#9a5ae0', p: '#ff8fb1' }, 790, 870, 24 * pop01(t, P.t0 + 0.3, 0.35, 2), { rot: 0.1 })
      label(x, 790, 660, 'WHAT IS THAT?', pop01(t, P.t0 + 0.9, 0.3, 2), { size: 32, bg: SKYB, rot: -0.04 })
      bubble(x, 790, 1090, 'nobody knows', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, col: MINT, tail: 'bc' })
    } },
  { sign: 'pisces', cap: '“Picked with love.” | *Sobbed.*', mood: 'wide', tears: lt => lt < 1.0 ? 2 : 3, star: { x: -160 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, BERRIES, BERRY_C, 790, 900, 22 * pop01(t, P.t0 + 0.3, 0.35, 2))
      bubble(x, 790, 680, 'picked with love!', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 36, col: BONE, tail: 'br' })
      label(x, 790, 1090, 'BOUGHT: THE WHOLE STALL', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 26, bg: SKYB, rot: 0.04 })
    } },
]

const F = makeFilm({
  id: 'v3t079', key: 'F', accent: GREEN, ending: 'group',
  title: 'The signs at a | *farmers market.*',
  cameos: CAMEOS,
  group: {
    cap: 'Nobody stuck | *to the list.*',
    draw(x, t, lt) {
      label(x, 540, 640, 'THE LIST: EGGS', pop01(t, t - lt + 1.6, 0.3, 2), { size: 40, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 540, 760, 'EGGS: 120 (CAPRICORN)', pop01(t, t - lt + 2.6, 0.3, 2.2), { size: 34, bg: '#2fc79a', rot: 0.03 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
