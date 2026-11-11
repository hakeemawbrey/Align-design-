// v3a053: zodiac.advice444, ADVICE ROLL CALL, "Each sign's | self-care." (~63 s vertical, signs3kit social cut, music: lofi · F)
// Twelve signs in zodiac order, one warm and specific self-care line each, one light gag per card.
//   0.0–3.6    "Each sign’s | *self-care.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   twelve cards (3.8 s each):
//              ♈ a slow walk, with a snail: SPEED: SNAIL · ♉ a bubble bath with a snack plate · ♊ phone face down, 59:59
//              · ♋ a baking day: BATCH #3 · ♌ a giant gold sticker: GOOD JOB (FOR EXISTING) · ♍ one sock left on the
//              floor: ALLOWED · ♎ picks dinner first try: DECIDED IN 1 SEC · ♏ a journal: PAGE 47 · ♐ the suitcase
//              stays shut: STAYING IN · ♑ closes the laptop at 5:00 · ♒ a lumpy clay vase: VASE (?) · ♓ cries it out,
//              then a big glass of water
//  49.2        "Everyone needs | *a soft day.*"  The twelve fly up into a group photo.
//  52.4        LESSON UNLOCKED: "Rest isn’t a reward. | *It’s a need.*"  CARE: TAKEN
//  58.3        "Pisces? | *Drink the water.*"
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const PEACH = '#ffb38a', RED = '#e23d4e', WOOD = '#c98f2a', CLAY = '#c9774a'

// ── props
const SNAIL = [
  '.....SSSS...',
  '....SsssSS..',
  '...SsSSSsS..',
  '...SsSssSS.E',
  '...SsSSSSS.E',
  'B..SSsssSS.B',
  'BBBBBBBBBBBB',
  '.BBBBBBBBBB.',
]
const SNAIL_C = { S: '#c98f2a', s: '#8a5a1c', B: '#a5e6c9', E: INK }
const SOCK = [
  '.WWWW...',
  '.RRRR...',
  '.WWWW...',
  '.WWWW...',
  '.WWWW...',
  '.WWWWW..',
  '.WWWWWWW',
  '.WWWWWWW',
  '..RRRRR.',
]
const SOCK_C = { W: '#fff4e2', R: RED }
const VASE = [
  '...CCC....',
  '..C..CC...',
  '..CC.C....',
  '.CCCCCCC..',
  'CCCCCCCCCC',
  'CCCDCCCCC.',
  '.CCCCCCCCC',
  'CCCCCCCC..',
  '.CCCCCCC..',
  '..CCCCC...',
]
const VASE_C = { C: CLAY, D: '#a85a32' }
const GLASS = [
  'G........G',
  'G........G',
  'GWWWWWWWWG',
  'GWWwWWWWWG',
  'GWWwWWWWWG',
  '.GWWWWWWG.',
  '.GWWWWWWG.',
  '.GWWWWWWG.',
  '..GGGGGG..',
]
const GLASS_C = { G: '#d8f4ff', W: SKYB, w: '#fff' }

function bathtub(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.roundRect(-270, -40, 540, 170, 40); x.fill()
  x.fillStyle = '#fff4e2'; x.beginPath(); x.roundRect(-258, -30, 516, 150, 32); x.fill()
  x.fillStyle = INK; x.fillRect(-220, 120, 30, 40); x.fillRect(190, 120, 30, 40)
  for (let i = 0; i < 9; i++) {
    const bx = -230 + i * 58, by = -40 + Math.sin(t * 3 + i) * 6, r = 34 + (i % 3) * 8
    x.fillStyle = INK; x.beginPath(); x.arc(bx, by, r + 4, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#eaf6ff'; x.beginPath(); x.arc(bx, by, r, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#fff'; x.fillRect(bx - r * 0.5, by - r * 0.5, 8, 8)
  }
  x.restore()
}
function snackPlate(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 110, 34, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#f4f0ff'; x.beginPath(); x.ellipse(0, -4, 102, 28, 0, 0, Math.PI * 2); x.fill()
  drawBits(x, ['.YY.', 'YYYY', 'YdYY', 'YYYY'], { Y: GOLD, d: '#c99a2e' }, -40, -26, 11)
  drawBits(x, ['.RR.', 'RRRR', 'RRRR', '.RR.'], { R: RED }, 10, -26, 10)
  drawBits(x, ['.GG.', 'GGGG', 'GGGG', '.GG.'], { G: '#7bd36a' }, 54, -24, 9)
  x.restore()
}
function phoneDown(x, cx, cy, k, secs) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -50, 340, 100)
  x.fillStyle = '#6a5fa8'; x.fillRect(-160, -40, 320, 80)
  x.fillStyle = '#8f84c9'; x.fillRect(-140, -30, 50, 26)
  x.restore()
  label(x, cx, cy - 170 * k, secs, k, { size: 52, bg: BONE, rot: -0.03, font: MONO, weight: 700 })
}
function tray(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -20, 340, 40); x.fillStyle = '#c9c9d8'; x.fillRect(-162, -14, 324, 28)
  x.restore()
  for (let i = 0; i < 6; i++) drawBits(x, ['.CCCC.', 'CCdCCC', 'CCCCdC', 'CdCCCC', '.CCCC.'], { C: '#e7b46a', d: '#5b2e1a' }, cx + (-125 + (i % 3) * 125) * k, cy - (44 + Math.floor(i / 3) * 56) * k, 10 * k)
}
function sticker(x, cx, cy, k, rot) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); for (let i = 0; i < 24; i++) { const a = i / 24 * Math.PI * 2, r = i % 2 ? 150 : 172; i ? x.lineTo(Math.cos(a) * r, Math.sin(a) * r) : x.moveTo(Math.cos(a) * r, Math.sin(a) * r) } x.fill()
  x.fillStyle = GOLD; x.beginPath(); for (let i = 0; i < 24; i++) { const a = i / 24 * Math.PI * 2, r = i % 2 ? 140 : 160; i ? x.lineTo(Math.cos(a) * r, Math.sin(a) * r) : x.moveTo(Math.cos(a) * r, Math.sin(a) * r) } x.fill()
  x.fillStyle = INK; x.font = `800 46px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('GOOD', 0, -26); x.fillText('JOB!', 0, 26)
  x.restore()
}
function journal(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -130, 340, 260)
  x.fillStyle = '#5b1e5e'; x.fillRect(-162, -122, 324, 244)
  x.fillStyle = '#fffaf0'; x.fillRect(-150, -112, 145, 224); x.fillRect(5, -112, 145, 224)
  x.fillStyle = '#9d9ab0'; for (let i = 0; i < 7; i++) { x.fillRect(-138, -90 + i * 28, 120, 6); x.fillRect(17, -90 + i * 28, i === 6 ? 60 : 120, 6) }
  // pages flipping
  const fl = (lt * 4) % 1
  if (lt > 0.6 && lt < 1.6) { x.save(); x.scale(1 - 2 * fl, 1); x.fillStyle = '#fff'; x.fillRect(0, -112, 145, 224); x.restore() }
  x.restore()
}
function suitcase(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-60, -170, 120, 50); x.fillStyle = '#3a3360'; x.fillRect(-44, -160, 88, 30)
  x.fillStyle = INK; x.fillRect(-150, -130, 300, 260)
  x.fillStyle = '#e26b4e'; x.fillRect(-140, -120, 280, 240)
  x.fillStyle = '#c4553c'; x.fillRect(-140, -20, 280, 16)
  x.fillStyle = GOLD; x.fillRect(-90, -30, 26, 36); x.fillRect(64, -30, 26, 36)
  x.restore()
}
function laptop(x, cx, cy, k, close) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-190, 0, 380, 30); x.fillStyle = '#c9c9d8'; x.fillRect(-182, 4, 364, 20)
  const h = 230 * Math.cos(close * Math.PI / 2)
  if (h > 4) {
    x.fillStyle = INK; x.fillRect(-170, -h, 340, h); x.fillStyle = '#2a2350'; x.fillRect(-160, -h + 10, 320, h - 14)
    x.fillStyle = SKYB; for (let i = 0; i < 5; i++) if (-h + 30 + i * 36 < -14) x.fillRect(-130, -h + 30 + i * 36, 200 - (i % 2) * 70, 14)
  }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'A slow walk. | *On purpose.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 1], star: { x: -200 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, SNAIL, SNAIL_C, lerp(700, 760, clamp(lt / 2.4)), 1040, 18 * k)
      label(x, 760, 760, 'SPEED: SNAIL', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 38, bg: '#a5e6c9', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'A bubble bath. | *Snacks included.*', mood: 'sleepy', star: { x: -40, y: -10, s: 280 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bathtub(x, t, 540, 1030, pop01(t, P.t0 + 0.1, 0.35, 2))
      snackPlate(x, 800, 690, pop01(t, P.t0 + 0.9, 0.3, 2.2))
    } },
  { sign: 'gemini', cap: 'Phone face down. | *A whole hour.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 1], star: { x: -210 }, hops: [1.6],
    front(x, t, lt, P) {
      const s = Math.max(0, 3599 - Math.floor(Math.max(0, lt - 0.6) * 1.3))
      phoneDown(x, 780, 1000, pop01(t, P.t0 + 0.2, 0.35, 2), `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`)
      label(x, 780, 690, 'YOU GOT THIS', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.05 })
    } },
  { sign: 'cancer', cap: 'A baking day | *counts as therapy.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -210 }, hops: [1.4],
    front(x, t, lt, P) {
      tray(x, 780, 1000, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 780, 760, 'BATCH #3', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: PEACH, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'A gold star | *for just existing.*', mood: 'sparkle', look: [1, -1], star: { x: -200, y: 20 }, hops: [1.3],
    front(x, t, lt, P) {
      sticker(x, 770, 800, pop01(t, P.t0 + 0.6, 0.3, 2.4), 0.12 + 0.04 * Math.sin(t * 3))
      sparkles(x, t, 770, 800, P.t0 + 0.8, 8, 200, 0.1)
      label(x, 770, 1080, '(NO REASON)', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Leave one sock out. | *Nothing breaks.*', mood: lt => lt < 1.0 ? 'eyeroll' : 'happy', look: [1, 1], star: { x: -210 }, hops: [1.5],
    front(x, t, lt, P) {
      drawBits(x, SOCK, SOCK_C, 780, 1020, 18 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.6 })
      label(x, 780, 760, 'ALLOWED', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 44, bg: MINT, rot: -0.05 })
    } },
  { sign: 'libra', cap: 'Pick dinner. | *First try.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -200 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 740, 660, 'noodles.', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 46, tail: 'bl' })
      label(x, 770, 1060, 'DECIDED IN 1 SEC', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 740, 660, P.t0 + 1.0, 6, 160, 0.4)
    } },
  { sign: 'scorpio', cap: 'Write the feelings. | *All of them.*', mood: 'squint', look: [1, 1], star: { x: -220, y: -20 },
    front(x, t, lt, P) {
      journal(x, t, 760, 990, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      label(x, 790, 720, 'PAGE 47', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 40, bg: LAV, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Self-care is | *staying home.* Wild.', mood: lt => lt > 1.2 ? 'happy' : 'wide', look: [1, 0], star: { x: -210 }, hops: [1.5],
    front(x, t, lt, P) {
      suitcase(x, 780, 960, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 780, 960, 'STAYING IN', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: BONE, rot: -0.08, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Log off at five. | *Actually log off.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -220 }, hops: [1.6],
    front(x, t, lt, P) {
      laptop(x, 780, 1040, pop01(t, P.t0 + 0.2, 0.35, 2), ease.inOutCubic(prog(lt, 0.9, 1.3)))
      label(x, 780, 680, '5:00 PM', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 44, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      if (lt > 1.3) label(x, 780, 940, 'BYE!', pop01(t, P.t0 + 1.35, 0.3, 2.4), { size: 44, bg: MINT, rot: -0.06 })
    } },
  { sign: 'aquarius', cap: 'Try a hobby. | *Be bad at it.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -210 }, hops: [1.4],
    front(x, t, lt, P) {
      drawBits(x, VASE, VASE_C, 780, 940, 24 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: -0.1 })
      label(x, 780, 1120, 'VASE (?)', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 40, bg: BONE, rot: 0.05, font: MONO, weight: 700 })
      label(x, 790, 700, 'LOVE IT', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 34, bg: SKYB, rot: -0.06 })
    } },
  { sign: 'pisces', cap: 'Cry it out. | *Then hydrate.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', tears: lt => lt > 1.4 ? 1 : 3, star: { x: -200 }, hops: [1.6],
    front(x, t, lt, P) {
      drawBits(x, GLASS, GLASS_C, 790, 960, 24 * pop01(t, P.t0 + 0.9, 0.3, 2.2))
      label(x, 790, 720, 'BIG GLASS', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 40, bg: SKYB, rot: 0.05, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3a053', key: 'F', accent: PEACH, ending: 'lesson',
  title: 'Each sign’s | *self-care.*',
  cameos: CAMEOS,
  group: { cap: 'Everyone needs | *a soft day.*' },
  lesson: { text: 'Rest isn’t a reward. | *It’s a need.*', chip: 'CARE: TAKEN' },
  last: {
    text: 'Pisces? | *Drink the water.*',
    draw(x, t, lt) { drawBits(x, GLASS, GLASS_C, 540, 740, 14 * pop01(lt, 0.6, 0.35, 2)); sparkles(x, t, 540, 740, t - lt + 0.9, 7, 120, 0.3) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
