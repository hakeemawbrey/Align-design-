// r2a0003: star_advice, ADVICE ROLLCALL, "How to live | with each sign." (~61 s vertical, signs3kit social cut, music: lofi · C)
// Twelve signs in zodiac order: one warm, specific house rule per sign for living with them, each with a light visual gag.
//   0.0–3.6    hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ let them shower first (timer) · ♉ respect their fridge shelf · ♊ say yes to one midnight chat
//              · ♋ eat what they cook, ask for seconds · ♌ clap when they walk in · ♍ rinse the mug
//              · ♎ trust the throw pillows · ♏ knock first, always · ♐ water their plants while they're away
//              · ♑ pay your share on time · ♒ don't move their weird project · ♓ watch the sad movie with them (tissues)
//  49.2        "Twelve signs. | *One fridge.*"
//  52.4        LESSON UNLOCKED: "Everyone is easy to love | *once you know how.*"  HOME: HAPPY
//  58.3        "Roommate match? | *Unlocked.*"
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const PEACH = '#ffb38a', RED = '#e23d4e', CREAM = '#fff4e2', WOOD = '#c98f2a', GREEN = '#5fd068'

// ── props
const POT = [
  '.s..s..s.',
  's..s..s..',
  '.s..s..s.',
  'KKKKKKKKK',
  'RRRRRRRRR',
  'KRRRRRRRK',
  '.RRRRRRR.',
  '.RRRRRRR.',
  '..RRRRR..',
]
const POT_C = { s: 'rgba(239,230,214,0.7)', K: INK, R: '#ff6b5a' }
const MUG = [
  'WWWWWWW..',
  'WPPPPPWWW',
  'WPPPPPW.W',
  'WPPPPPWWW',
  'WPPPPPW..',
  '.WWWWW...',
]
const MUG_C = { W: CREAM, P: SKYB }
const PILLOW = ['.PPPPPP.', 'PPPPPPPP', 'PPpPPpPP', 'PPPPPPPP', '.PPPPPP.']
const PLANT = [
  '..G..G..',
  '.GGG.GG.',
  'GGgGGGGG',
  '.GGGGgG.',
  '...GG...',
  '.TTTTTT.',
  '.TTTTTT.',
  '..TTTT..',
]
const PLANT_C = { G: GREEN, g: '#a6f08a', T: '#e07a4a' }
const CAN = [
  '......BB..',
  '.....B....',
  'CCCCCCB...',
  'CCCCCCCB..',
  'CCCCCC.BB.',
  'CCCCCC....',
  'CCCCCC....',
]
const CAN_C = { C: '#8fe3ff', B: '#6fa3cf' }
const TISSUE = ['..WW..', '.WWWW.', 'BBBBBB', 'BPBBPB', 'BBBBBB', 'BBBBBB']
const TISSUE_C = { W: '#ffffff', B: '#8fb3ff', P: '#c9d8ff' }
const HAND = ['.YY.YY.', 'YYYYYYY', 'YYYYYYY', '.YYYYY.', '..YYY..']

// a fridge with one labelled shelf
function fridge(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-140, -220, 280, 440); x.fillStyle = '#dfe6f2'; x.fillRect(-132, -212, 264, 424)
  const open = ease.inOutCubic(prog(lt, 0.3, 0.7))
  x.fillStyle = '#fffbe8'; x.fillRect(-120, -200, 240 * open, 400)
  if (open > 0.9) {
    x.fillStyle = '#b9c4d8'; for (const y of [-80, 30, 130]) x.fillRect(-120, y, 240, 8)
    x.fillStyle = GOLD; x.fillRect(-100, -60, 200, 80); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('TAURUS ONLY', 0, -20)
    x.fillStyle = '#ff8fb1'; x.fillRect(-100, 50, 50, 70); x.fillStyle = MINT; x.fillRect(-30, 70, 60, 50); x.fillStyle = SKYB; x.fillRect(50, 60, 40, 60)
  }
  x.restore()
}
// a door, with knocks
function door(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-120, -220, 240, 440); x.fillStyle = '#8a4a2e'; x.fillRect(-112, -212, 224, 424)
  x.fillStyle = '#a65e3a'; x.fillRect(-90, -190, 180, 160); x.fillRect(-90, 10, 180, 180)
  x.fillStyle = GOLD; x.fillRect(70, 0, 22, 22)
  x.restore()
}
// a tiny TV with a sad movie (a rain cloud)
function tv(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-160, -120, 320, 220); x.fillStyle = '#2a2350'; x.fillRect(-150, -110, 300, 200)
  x.fillStyle = '#3a4a7a'; x.fillRect(-134, -94, 268, 168)
  x.fillStyle = '#9aa5c4'; x.fillRect(-60, -60, 120, 40); x.fillRect(-40, -76, 70, 30)
  x.fillStyle = SKYB; for (let i = 0; i < 6; i++) { const ph = (t * 1.5 + i / 6) % 1; x.fillRect(-50 + i * 20, -16 + ph * 80, 4, 12) }
  x.fillStyle = INK; x.fillRect(-60, 100, 120, 20)
  x.restore()
}
// a mystery machine: gears, a bulb and a coil
function contraption(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, 20, 300, 120); x.fillStyle = '#9aa5c4'; x.fillRect(-142, 28, 284, 104)
  for (const [gx, gy, r, s] of [[-80, -20, 56, 1], [30, -50, 40, -1.4]]) {
    x.save(); x.translate(gx, gy); x.rotate(t * s * 2)
    x.fillStyle = INK; for (let i = 0; i < 8; i++) { x.save(); x.rotate(i * Math.PI / 4); x.fillRect(-10, -r - 12, 20, 24); x.restore() }
    x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.fill(); x.fillStyle = GOLD; x.beginPath(); x.arc(0, 0, r - 8, 0, Math.PI * 2); x.fill()
    x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r * 0.3, 0, Math.PI * 2); x.fill()
    x.restore()
  }
  x.fillStyle = INK; x.fillRect(96, -110, 16, 130); x.fillStyle = Math.sin(t * 8) > 0 ? '#fff1b0' : GOLD; x.beginPath(); x.arc(104, -130, 30, 0, Math.PI * 2); x.fill()
  x.restore()
}
// a receipt with a PAID stamp
function receipt(x, cx, cy, k, paid) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-120, -180, 240, 360); x.fillStyle = CREAM; x.fillRect(-112, -172, 224, 344)
  x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  ;['RENT', 'WIFI', 'SNACKS', 'PLANT FOOD'].forEach((s, i) => { x.fillText(s, -94, -130 + i * 50); x.fillText('✓', 70, -130 + i * 50) })
  x.restore()
  if (paid > 0.01) label(x, cx, cy + 100, 'PAID. EARLY.', paid, { size: 40, bg: MINT, rot: -0.12, font: MONO, weight: 700 })
}

const CAMEOS = [
  { sign: 'aries', cap: 'Let them shower first. | *They’re quick.*', mood: 'sparkle', star: { x: -180 }, hops: [0.5, 1.0, 1.5],
    front(x, t, lt, P) {
      const sec = Math.max(0, 59 - Math.floor(lt * 30))
      label(x, 790, 860, `0:${String(sec).padStart(2, '0')}`, pop01(t, P.t0 + 0.2, 0.3, 2), { size: 90, bg: CREAM, rot: 0.03, font: MONO, weight: 700 })
      label(x, 790, 1070, 'DONE. DRESSED. GONE.', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 28, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Respect their fridge shelf. | *It’s sacred.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      fridge(x, t, 790, 850, pop01(t, P.t0 + 0.15, 0.3, 2), lt)
      sparkles(x, t, 790, 810, P.t0 + 0.8, 6, 150, 0.3)
    } },
  { sign: 'gemini', cap: 'Say yes to | *one midnight chat.*', mood: 'sparkle', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      label(x, 790, 640, '12:04 AM', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 36, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 760, 830, 'ok but what if | fish get thirsty', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 32, tail: 'bl' })
      bubble(x, 820, 1040, 'go on…', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, col: MINT, tail: 'br' })
    } },
  { sign: 'cancer', cap: 'Eat what they cook. | *Ask for seconds.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -190 }, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, POT, POT_C, 800, 920, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 660, 'seconds, | please?', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 38, tail: 'bl' })
      hearts(x, t, 400, 780, P.t0 + 1.5, { n: 5, life: 1.6, spread: 140, cell: 7, seed: 3 })
    } },
  { sign: 'leo', cap: 'Clap when they | *walk into a room.*', mood: lt => lt > 0.9 ? 'sparkle' : 'happy', star: { x: -180 }, hops: [1.0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.4, 0.3, 2), c = Math.abs(Math.sin(lt * 9)) * 30
      drawBits(x, HAND, { Y: '#ffd9a8' }, 740 - c, 900, 20 * k, { rot: 0.4 })
      drawBits(x, HAND, { Y: '#ffd9a8' }, 880 + c, 900, 20 * k, { rot: -0.4, sx: -1 })
      label(x, 800, 680, 'APPLAUSE', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 44, bg: GOLD, rot: -0.04 })
      sparkles(x, t, 360, 820, P.t0 + 1.0, 7, 170, 0.6)
    } },
  { sign: 'virgo', cap: 'Rinse the mug. | *That’s romance to them.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: { x: -190 }, hops: [1.4],
    front(x, t, lt, P) {
      drawBits(x, MUG, MUG_C, 800, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      sparkles(x, t, 800, 900, P.t0 + 1.0, 8, 160, 0.2)
      label(x, 800, 1100, 'SPOTLESS', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Let them decorate. | *Trust the pillows.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const COLS = [PINK, GOLD, SKYB, MINT, LAV, PEACH, '#ff9ccf']
      for (let i = 0; i < 7; i++) {
        const k = pop01(t, P.t0 + 0.2 + i * 0.16, 0.25, 2.4)
        drawBits(x, PILLOW, { P: COLS[i], p: '#ffffff' }, 680 + (i % 3) * 110 + (Math.floor(i / 3) % 2) * 55, 1060 - Math.floor(i / 3) * 70, 14 * k, { rot: Math.sin(i * 2) * 0.2 })
      }
      label(x, 800, 680, 'PILLOW 7. PERFECT.', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Knock first. | *Always.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: { x: -200 }, hops: [1.4],
    front(x, t, lt, P) {
      door(x, 790, 860, pop01(t, P.t0 + 0.15, 0.3, 2))
      bubble(x, 790, 700, 'knock knock', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 38, tail: 'bc' })
      label(x, 790, 1080, 'TRUST: +1', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 40, bg: RED, color: CREAM, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Water their plants | *while they wander.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      drawBits(x, PLANT, PLANT_C, 820, 990, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const c = pop01(t, P.t0 + 0.5, 0.3, 2)
      drawBits(x, CAN, CAN_C, 680, 800, 15 * c, { rot: lerp(0, 0.5, ease.inOutCubic(prog(lt, 0.8, 1.1))) })
      if (lt > 1.1) { x.fillStyle = SKYB; for (let i = 0; i < 5; i++) { const ph = (t * 2 + i / 5) % 1; x.fillRect(745 + i * 6, 850 + ph * 70, 6, 12) } }
      label(x, 800, 650, 'POSTCARD INCOMING', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 28, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Pay your share | *on time.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -200 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) { receipt(x, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2), pop01(t, P.t0 + 1.2, 0.3, 2.6)) } },
  { sign: 'aquarius', cap: 'Don’t move | *their weird project.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      contraption(x, t, 800, 900, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 800, 1110, 'DO NOT TOUCH (SCIENCE)', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 26, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Watch the sad movie | *with them.*', mood: 'wide', tears: lt => lt > 1.0 ? 3 : 2, look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      tv(x, t, 800, 830, pop01(t, P.t0 + 0.15, 0.3, 2))
      drawBits(x, TISSUE, TISSUE_C, 800, 1080, 14 * pop01(t, P.t0 + 0.8, 0.3, 2))
      label(x, 800, 640, 'TISSUES: SHARED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0003', key: 'C', accent: PEACH, ending: 'lesson',
  title: 'How to live | *with each sign.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve signs. | *One fridge.*' },
  lesson: { text: 'Everyone is easy to love | *once you know how.*', chip: 'HOME: HAPPY' },
  last: { text: 'Roommate match? | *Unlocked.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
