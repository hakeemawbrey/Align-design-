// r2a0046: THE SIGNS AS… v3, SOLO advice film, "What Aries need | after a fight." (~51 s vertical, signs3kit, lofi · D)
// One Aries, nine cards: a relatable truth about Aries after an argument + a warm reframe, one visual gag each.
//   0.0–3.6    "What Aries need | *after a fight.*"
//   3.6–37.8   cool down first (ice cube hat) · walk it out (lap 12) · a pause isn't losing (giant pause button)
//              · saying sorry first is brave (badge) · half that fight was hunger (sandwich) · sleep on it (night cap)
//              · dance it out (notes) · grudges: zero (crossed-out list) · Libra texts "we good?" (you can say yes)
//  37.8        "Hot head. | *Warm heart.*"
//  41.0        LESSON: "Fights end. | Your *fire* stays kind."  STATUS: MADE UP
//  46.9        "Fastest make-up: | *Aries + Libra.*" over the match card: Aries + Libra (the "we good?" text).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const S = 'aries', RED = '#ff6b5a', CORAL = '#ff8a6a', GREEN = '#5fd068', WOOD = '#8a4a2e'

const ICE = [
  'WWWWWWWW',
  'WSSSSSSW',
  'WSWWSSSW',
  'WSWSSSSW',
  'WSSSSSSW',
  'WSSSSSSW',
  'WWWWWWWW',
]
const ICE_C = { W: '#e8f8ff', S: SKYB }
const STEAM = ['.W.W.', 'W.W.W', '.W.W.']
const SANDWICH = [
  '..BBBBBBBB..',
  '.BBBBBBBBBB.',
  'GGGGGGGGGGGG',
  'RRRRRRRRRRRR',
  'YYYYYYYYYYYY',
  'MMMMMMMMMMMM',
  '.BBBBBBBBBB.',
]
const SANDWICH_C = { B: '#e8a24a', G: GREEN, R: '#e23d4e', Y: '#ffd23a', M: '#b5653a' }
const CAP = [
  '.........WW',
  '.......BBWW',
  '.....BBBB..',
  '...BBBBBB..',
  '.BBBBBBBB..',
  'WWWWWWWWWW.',
]
const CAP_C = { B: '#6fc3ff', W: '#fff4e2' }
const MOON = ['..YYY', '.YY..', 'YY...', 'YY...', 'YY...', '.YY..', '..YYY']
const MEDAL = [
  'R.....R',
  'RR...RR',
  '.RR.RR.',
  '..YYY..',
  '.YYWYY.',
  '.YWYYY.',
  '.YYYYY.',
  '..YYY..',
]
const MEDAL_C = { R: RED, Y: GOLD, W: '#fff4e2' }

// a big pixel pause button
function pauseBtn(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-120, -110, 250, 240)
  x.fillStyle = INK; x.fillRect(-130, -130, 260, 260)
  x.fillStyle = BONE; x.fillRect(-120, -120, 240, 240)
  x.fillStyle = RED; x.fillRect(-64, -70, 44, 140); x.fillRect(20, -70, 44, 140)
  x.restore()
}
// a notepad list, each line struck through one by one
function grudges(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-140, -170, 296, 360)
  x.fillStyle = INK; x.fillRect(-150, -186, 300, 372)
  x.fillStyle = '#fff4e2'; x.fillRect(-142, -178, 284, 356)
  x.fillStyle = CORAL; x.fillRect(-142, -178, 284, 54)
  x.fillStyle = INK; x.font = `800 28px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('GRUDGES', 0, -150)
  const L = ['the thing', 'what they said', 'that look', 'the other thing']
  x.textAlign = 'left'; x.font = `700 26px ${MONO}`
  L.forEach((l, i) => {
    const y = -80 + i * 64
    x.fillStyle = '#6b62a8'; x.fillText(l, -118, y)
    const p = prog(lt, 0.5 + i * 0.25, 0.7 + i * 0.25)
    if (p > 0) { x.fillStyle = RED; x.fillRect(-124, y - 3, 250 * p, 7) }
  })
  x.restore()
}
// a phone with a short chat
function phone(x, cx, cy, k, { head = '', headCol = MINT, lines = [] } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-138, -214, 288, 440)
  x.fillStyle = INK; x.fillRect(-150, -226, 300, 452)
  x.fillStyle = '#2a2350'; x.fillRect(-140, -216, 280, 432)
  x.fillStyle = '#140c30'; x.fillRect(-126, -186, 252, 372)
  if (head) { x.fillStyle = headCol; x.fillRect(-126, -186, 252, 56); x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -158) }
  lines.forEach(([txt, col, kk], i) => {
    if (kk <= 0.01) return
    const right = i % 2 === 1
    x.save(); x.translate(right ? 40 : -40, -80 + i * 90); x.scale(kk, kk)
    x.font = `800 26px ${INTER}`; const w = x.measureText(txt).width + 30
    x.fillStyle = INK; x.fillRect(-w / 2 - 4, -28, w + 8, 56); x.fillStyle = col; x.fillRect(-w / 2, -24, w, 48)
    x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, 0, 1)
    x.restore()
  })
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Said it too fast? | *Cool down first.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', star: { x: -170 }, hops: [1.5],
    front(x, t, lt, P, F) {
      const steam = 1 - prog(lt, 1.0, 1.4)
      for (let i = 0; i < 3; i++) drawBits(x, STEAM, { W: '#ffffff' }, F.x - 80 + i * 80, F.top - 50 - ((t * 60 + i * 30) % 60), 9, { alpha: 0.8 * steam })
      const d = ease.outCubic(prog(lt, 0.9, 1.3))
      if (lt > 0.85) drawBits(x, ICE, ICE_C, F.x, lerp(480, F.top - 30, d), 13, { rot: 0.1 })
      label(x, 790, 860, 'TEMP: 100° → 60°', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Too much energy? | *Walk it off.*', mood: lt => lt > 1.6 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 }, hops: [0.5, 0.9, 1.3, 1.7],
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.5) * 11)
      label(x, 790, 760, `LAP ${n}`, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 56, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 980, 'feeling | better', pop01(t, P.t0 + 1.8, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: S, cap: 'A pause | *isn’t losing.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      pauseBtn(x, 790, 820, pop01(t, P.t0 + 0.3, 0.35, 2) * 0.9)
      label(x, 790, 1080, 'STILL WINNING', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Said sorry first? | That’s *brave.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', star: { x: -170 }, hops: [1.2],
    front(x, t, lt, P, F) {
      bubble(x, 790, 700, 'I’m sorry.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, tail: 'bl' })
      const d = ease.outCubic(prog(lt, 0.9, 1.2))
      if (lt > 0.85) drawBits(x, MEDAL, MEDAL_C, lerp(800, F.x + 60, d), lerp(900, F.cy + 50, d), 15)
      label(x, 790, 1040, 'BRAVERY BADGE', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, F.x + 40, F.cy + 40, P.t0 + 1.2, 6, 110, 0.2)
    } },
  { sign: S, cap: 'Half that fight? | You were *hungry.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const bites = Math.floor(prog(lt, 0.9, 1.6) * 2.99)
      const bm = SANDWICH.map(r => r.slice(0, 12 - bites * 2).padEnd(12, '.'))
      drawBits(x, bm, SANDWICH_C, 790, 860, 20 * pop01(t, P.t0 + 0.25, 0.35, 2))
      label(x, 790, 1040, 'MOOD: RESTORED', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 680, 'SNACK FIRST', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 34, bg: CORAL, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Needs it fixed tonight? | *Tomorrow counts too.*', mood: lt => lt > 1.0 ? 'sleepy' : 'neutral', star: { x: -170 },
    front(x, t, lt, P, F) {
      const d = ease.outCubic(prog(lt, 0.5, 0.9))
      if (lt > 0.45) drawBits(x, CAP, CAP_C, F.x + 10, lerp(480, F.top - 20, d), 13, { rot: -0.1 })
      drawBits(x, MOON, { Y: GOLD }, 800, 650, 14 * pop01(t, P.t0 + 0.3, 0.35, 2))
      label(x, 790, 900, 'TALK AT 9 A.M.', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Still fired up? | *Dance it out.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', star: { x: -170 }, hops: [0.6, 1.0, 1.4, 1.8],
    front(x, t, lt, P, F) {
      notes(x, t, F.x + 120, F.cy - 60, { n: 5, cell: 8, col: CORAL, seed: 1 })
      notes(x, t, 800, 900, { n: 5, cell: 8, col: GOLD, seed: 4 })
      label(x, 790, 760, 'KITCHEN DANCE PARTY', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 28, bg: PINK, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 790, 1040, 'solo. | it counts.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: S, cap: 'You don’t hold grudges. | *Superpower.*', mood: lt => lt > 1.6 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -180 }, hops: [1.7],
    front(x, t, lt, P) {
      grudges(x, 780, 850, pop01(t, P.t0 + 0.2, 0.35, 2) * 0.95, lt)
      sparkles(x, t, 780, 850, P.t0 + 1.8, 7, 200, 0.5)
    } },
  { sign: S, cap: 'They texted “we good?” | *You can say yes.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', look: [1, 0], star: { x: -180 }, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 770, 850, pop01(t, P.t0 + 0.15, 0.3, 2) * 0.88, { head: '♎︎ LIBRA', headCol: PINK, lines: [
        ['we good?', PINK, pop01(t, P.t0 + 0.5, 0.25, 2.2)],
        ['we good.', BONE, pop01(t, P.t0 + 1.3, 0.25, 2.2)],
        ['tacos?', PINK, pop01(t, P.t0 + 1.8, 0.25, 2.2)],
      ] })
      hearts(x, t, 560, 800, P.t0 + 1.5, { n: 5, life: 1.5, spread: 140, cell: 6, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2a0046', key: 'D', accent: CORAL, solo: S, ending: 'card',
  title: 'What Aries need | *after a fight.*',
  cameos: CAMEOS,
  card: { a: 'aries', b: 'libra', chip: 'MADE UP' },
  group: { cap: 'Hot head. | *Warm heart.*', mood: 'sparkle' },
  lesson: { text: 'Fights end. | Your *fire* stays kind.', chip: 'STATUS: MADE UP' },
  last: {
    text: 'Fastest make-up: | *Aries + Libra.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 10, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
