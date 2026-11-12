// r2a0083: star_advice, ADVICE SOLO, "Scorpio, you're not | too much." (~44 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole way through (makeFilm solo mode, 9 cards): a relatable Scorpio truth + a warm reframe, one gag each.
// Ending: 'group' (the group beat is the ending).
//   0.0–3.6    "Scorpio, you’re not | *too much.*"
//   3.6–37.8   nine cards (3.8 s each):
//              loves intensely → a gift · remembers every detail → people feel seen · slow to trust → take your time
//              · deep talk at a party → your people love it · big feelings → a bigger box · all-in on a match → meet halfway
//              · quiet in a group → still the warmest · protective → they feel safe (an umbrella) · hard to say sorry → a soft one works
//  37.8        "Not too much. | *Exactly enough.*"  Scorpio comes back, big, heart eyes.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, HEART,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const S = 'scorpio', CREAM = '#fff4e2', RED = '#e23d4e', WOOD = '#8a4a2e', PLUM = '#c97bff'

const GIFT = [
  '...RR.RR...',
  '....RRR....',
  'GGGGGRGGGGG',
  'GGGGGRGGGGG',
  'BBBBBRBBBBB',
  'BBBBBRBBBBB',
  'BBBBBRBBBBB',
  'BBBBBRBBBBB',
  'BBBBBRBBBBB',
]
const LOCK = ['..KKKKK..', '.K.....K.', '.K.....K.', 'YYYYYYYYY', 'YYYYKYYYY', 'YYYYKYYYY', 'YYYYYYYYY']
const UMB = [
  '....RRRRR....',
  '..RRRRRRRRR..',
  '.RRRRRRRRRRR.',
  'RRRRRRRRRRRRR',
  'R..R..K..R..R',
  '......K......',
  '......K......',
  '......K......',
  '....K.K......',
  '.....K.......',
]
const MUG = ['..s.s....', '.s.s.....', 'WWWWWWW..', 'WTTTTTWWW', 'WTTTTTW.W', 'WTTTTTWWW', 'WWWWWWW..', '.WWWWW...']
const MUG_C = { W: PLUM, T: '#c98f6a', s: 'rgba(239,230,214,0.7)' }
function book(x, cx, cy, k, lines, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-172, -150, 344, 300); x.fillStyle = PLUM; x.fillRect(-164, -142, 328, 284); x.fillStyle = CREAM; x.fillRect(-150, -128, 300, 256)
  x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach((l, i) => { if (lt > 0.3 + i * 0.3) x.fillText(l, -134, -80 + i * 76) })
  x.restore()
}
function phone(x, cx, cy, k, draw) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408); x.fillStyle = '#2a2350'; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  x.fillStyle = MINT; x.fillRect(-100, -156, 200, 46)
  x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('✦ YOUR MATCH', 0, -132)
  draw(x); x.restore()
}
function rain(x, t, cx, cy, w, alpha = 1) {
  x.save(); x.globalAlpha = alpha; x.fillStyle = SKYB
  for (let i = 0; i < 14; i++) { const ph = ((t * 1.4 + i * 0.37) % 1); x.fillRect(cx - w / 2 + (i * 53) % w, cy - 200 + ph * 400, 5, 18) }
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'You love intensely. | *That’s a gift.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', star: { x: -200 },
    front(x, t, lt, P) {
      const beat = 1 + 0.08 * Math.max(0, Math.sin(t * 9))
      drawBits(x, HEART, { H: RED, W: '#fff' }, 790, 820, 26 * beat * pop01(t, P.t0 + 0.2, 0.3, 2) * (1 - prog(lt, 1.1, 1.3)))
      drawBits(x, GIFT, { R: GOLD, G: '#ff4f86', B: RED }, 790, 900, 22 * pop01(t, P.t0 + 1.3, 0.35, 2.2))
      label(x, 790, 1120, 'TO: SOMEONE LUCKY', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You remember every detail. | *People feel seen.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      book(x, 790, 820, pop01(t, P.t0 + 0.15, 0.3, 2), ['Sam: mango tea', 'Jo: no mornings', 'Mia: dog, Biscuit'], lt)
      bubble(x, 790, 1070, 'you REMEMBERED?', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, col: MINT, tail: 'bl' })
    } },
  { sign: S, cap: 'Slow to trust? | *Take your time.*', mood: lt => lt > 1.5 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      drawBits(x, LOCK, { K: '#c9cfe0', Y: GOLD }, 790, 780, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const k = pop01(t, P.t0 + 0.6, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 1010); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-160, -26, 320, 52); x.fillStyle = '#2a2350'; x.fillRect(-152, -18, 304, 36)
        x.fillStyle = MINT; x.fillRect(-152, -18, 304 * (0.1 + 0.3 * prog(lt, 0.8, 2.2)), 36)
        x.restore()
      }
      label(x, 790, 1110, 'TRUST: LOADING… (OK)', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 28, bg: MINT, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Deep talk at a party? | *Your people love it.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      bubble(x, 600, 640, 'what’s your | biggest dream?', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 34, tail: 'bl' })
      const k = pop01(t, P.t0 + 0.8, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'aquarius', 810, 980, 190 * k, { mood: lt > 1.3 ? 'heart' : 'wide', look: [-1, 0], seed: 13, glyph: false, hops: [P.t0 + 1.4] })
      bubble(x, 830, 790, 'FINALLY.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, col: MINT, tail: 'bc' })
    } },
  { sign: S, cap: 'Big feelings? | *Get a bigger box.*', mood: lt => lt > 1.6 ? 'happy' : 'wide', star: { x: -200 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const g = ease.outBack ? ease.outCubic(prog(lt, 1.2, 1.6)) : 0
      const w = lerp(120, 300, g), h = lerp(90, 200, g)
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 1000); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h - 6, w + 12, h + 12); x.fillStyle = '#d9a05b'; x.fillRect(-w / 2, -h, w, h)
        x.restore()
      }
      for (let i = 0; i < 6; i++) {
        const spill = 1 - g
        drawBits(x, HEART, { H: i % 2 ? PINK : RED, W: '#fff' }, 790 + Math.sin(i * 2.2) * lerp(50, 110, g), lerp(870 - i * 40 * spill, 940 - (i % 3) * 50, g), 7 * k)
      }
      label(x, 790, 660, g > 0.5 ? 'FITS NOW ✓' : 'OVERFLOWING', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 36, bg: g > 0.5 ? MINT : PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Falling hard? | *Let them meet you halfway.*', mood: lt => lt > 1.5 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -200 }, hops: [1.6],
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.15, 0.3, 2), x => {
        const m = ease.inOutCubic(prog(lt, 0.5, 1.5))
        drawBits(x, HEART, { H: RED, W: '#fff' }, lerp(-70, -24, m), 0, 7)
        drawBits(x, HEART, { H: PINK, W: '#fff' }, lerp(70, 24, m), 0, 7)
        x.fillStyle = BONE; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.fillText(m > 0.95 ? 'HALFWAY ✓' : '…', 0, 110)
      })
      sparkles(x, t, 790, 860, P.t0 + 1.6, 6, 140, 0.3)
    } },
  { sign: S, cap: 'Quiet in a group? | *Still the warmest one.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', star: { x: -200 },
    front(x, t, lt, P) {
      drawBits(x, MUG, MUG_C, 780, 920, 26 * pop01(t, P.t0 + 0.3, 0.3, 2))
      label(x, 790, 680, 'SAYS LITTLE', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 34, bg: LAV, rot: -0.05, font: MONO, weight: 700 })
      label(x, 790, 1140, 'MAKES EVERYONE TEA', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Protective of your people? | *They feel safe.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', star: { x: -150, y: 20 },
    front(x, t, lt, P, F) {
      rain(x, t, 640, 860, 560, 0.8)
      const k = pop01(t, P.t0 + 0.6, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'pisces', 760, 1000, 160 * k, { mood: 'heart', look: [-1, 0], seed: 14, glyph: false, tears: 1 })
      drawBits(x, UMB, { R: RED, K: INK }, 770, 820, 22 * pop01(t, P.t0 + 0.9, 0.3, 2))
      label(x, 790, 640, 'SAFE: ✓', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 36, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Hard to say sorry? | *A soft one works.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      bubble(x, 790, 720, lt < 1.0 ? '…' : 'sorry. | love you.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 790, 1000, 'FORGIVEN ♥', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 40, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 790, 980, P.t0 + 1.6, { n: 5, life: 1.5, spread: 160, cell: 6, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2a0083', key: 'C', accent: '#ff6b8a', solo: S, ending: 'group',
  title: 'Scorpio, you’re not | *too much.*',
  cameos: CAMEOS,
  group: {
    cap: 'Not too much. | *Exactly enough.*', mood: 'heart',
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
