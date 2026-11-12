// r2t0041: star_talk, ROLLCALL, "The signs on | a second date." (~63 s vertical, signs3kit social cut, music: lofi · C)
//   0.0–3.6    "The signs on | a *second date.*"  The twelve line up, then dive into the pips.
//   3.6–49.2   one second date per sign, pushed to the extreme:
//              ♈ already moved in (boxes) · ♉ came back for the bread basket · ♊ sent their twin, nobody noticed
//              · ♋ made a scrapbook of date one · ♌ changed outfits between courses · ♍ fact-checked your stories
//              · ♎ still deciding if date one counted · ♏ remembers everything you said (a long receipt)
//              · ♐ date two is skydiving · ♑ booked date three, and thirty more · ♒ brought a debate topic
//              · ♓ you remembered their sign: tears
//  49.2        "Nobody waited | for *date three.*"
//  52.4        LESSON: "Date two is brave. | *Show up* as you."  DATE 3: BOOKED
//  58.3        "Aries moved in. | Cancer *approved.*" over the match card: Aries + Cancer.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CREAM = '#fff4e2', RED = '#e23d4e', WOOD = '#c98f2a', BROWN = '#8a4a2e'

// ── props
const BOX = [
  'TTTTTTTTTTTT',
  'BBBBBTTBBBBB',
  'BBBBBTTBBBBB',
  'BBBBBBBBBBBB',
  'BBBBBBBBBBBB',
  'BBBBBBBBBBBB',
  'BBBBBBBBBBBB',
]
const BOX_C = { B: WOOD, T: '#e8c27a' }
const BREAD = [
  '..CCCCCC..',
  '.CCWCCWCC.',
  'CCCCCCCCCC',
  'CCWCCCWCCC',
  '.CCCCCCCC.',
]
const BREAD_C = { C: '#e8a24a', W: '#ffd9a0' }
const BASKET = [
  'BWBWBWBWBWBWBW',
  'WBWBWBWBWBWBWB',
  '.BWBWBWBWBWBW.',
  '..WBWBWBWBWB..',
]
const BASKET_C = { B: BROWN, W: WOOD }
const SHIRT = [
  'SS....SS',
  'SSS..SSS',
  'SSSSSSSS',
  '.SSSSSS.',
  '.SSSSSS.',
  '.SSSSSS.',
  '.SSSSSS.',
]
const CHUTE = [
  '....RRRRRRRR....',
  '..RRWWRRRRWWRR..',
  '.RRWWWRRRRWWWRR.',
  'RRRWWWRRRRWWWRRR',
  'K..............K',
  '.K............K.',
  '..K..........K..',
  '...K........K...',
  '....K......K....',
  '.....K....K.....',
  '......K..K......',
]
const CHUTE_C = { R: '#ff6b5a', W: '#ffffff', K: BONE }
const SCALE = [
  '.......K.......',
  'KKKKKKKKKKKKKKK',
  'K......K......K',
  'K......K......K',
  'K......K......K',
  'PPP....K....PPP',
  '.......K.......',
  '......KKK......',
]
const SCALE_C = { K: BONE, P: GOLD }

function scrapbook(x, cx, cy, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -100, 316, 220)
  x.fillStyle = INK; x.fillRect(-164, -114, 328, 228)
  x.fillStyle = PINK; x.fillRect(-156, -106, 312, 212)
  x.fillStyle = CREAM; x.fillRect(-146, -96, 142, 192); x.fillRect(4, -96, 142, 192)
  const PH = [[-120, -70, SKYB], [-60, 10, GOLD], [30, -70, MINT], [90, 10, LAV]]
  PH.forEach(([px, py, c], i) => { x.save(); x.translate(px + 22, py + 30); x.rotate(Math.sin(i * 2.1) * 0.12); x.fillStyle = INK; x.fillRect(-30, -34, 60, 68); x.fillStyle = c; x.fillRect(-25, -29, 50, 50); x.restore() })
  x.restore()
}
function receipt(x, cx, top, len, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, top); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-96, -6, 192, len + 12)
  x.fillStyle = CREAM; x.fillRect(-90, 0, 180, len)
  x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText('YOU SAID:', 0, 26)
  x.fillStyle = '#b9b0a0'
  for (let y = 56; y < len - 10; y += 26) x.fillRect(-70, y, 100 + ((y * 37) % 40), 10)
  x.restore()
}
function calendar(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -150, 316, 316)
  x.fillStyle = INK; x.fillRect(-164, -164, 328, 328)
  x.fillStyle = CREAM; x.fillRect(-156, -156, 312, 312)
  x.fillStyle = RED; x.fillRect(-156, -156, 312, 56)
  x.fillStyle = CREAM; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('DATES', 0, -127)
  const n = Math.floor(clamp((lt - 0.4) / 1.2) * 30)
  for (let i = 0; i < 30; i++) {
    const cx2 = -125 + (i % 6) * 50, cy2 = -70 + Math.floor(i / 6) * 48
    x.fillStyle = '#e0d6c4'; x.fillRect(cx2, cy2, 40, 38)
    if (i < n) { x.fillStyle = '#ff4f86'; x.fillRect(cx2 + 8, cy2 + 8, 10, 10); x.fillRect(cx2 + 22, cy2 + 8, 10, 10); x.fillRect(cx2 + 8, cy2 + 14, 24, 10); x.fillRect(cx2 + 14, cy2 + 24, 12, 6) }
  }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Second date. | Already *moved in.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', star: { x: -170 }, hops: [0.6, 1.2],
    back(x, t, lt, P) {
      for (let i = 0; i < 4; i++) drawBits(x, BOX, BOX_C, 720 + (i % 2) * 150, 1100 - Math.floor(i / 2) * 110 - (i % 2) * 6, 13 * pop01(t, P.t0 + 0.2 + i * 0.15, 0.3, 2))
    },
    front(x, t, lt, P) {
      label(x, 790, 760, 'MOVING DAY', pop01(t, P.t0 + 0.9, 0.3, 2), { size: 36, bg: GOLD, rot: 0.05 })
      bubble(x, 790, 620, 'where’s the | towel shelf?', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Came back | for the *bread basket.*', mood: lt => lt > 1.5 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      const n = Math.min(4, 1 + Math.floor(Math.max(0, lt - 0.3) / 0.35))
      for (let i = 0; i < n; i++) drawBits(x, BREAD, BREAD_C, 790 + (i % 2 ? 30 : -30), 1000 - i * 52, 15 * k, { rot: Math.sin(i * 1.9) * 0.15 })
      drawBits(x, BASKET, BASKET_C, 790, 1060, 17 * k)
      label(x, 790, 700, `REFILL #${n + 5}`, pop01(t, P.t0 + 0.5, 0.3, 2), { size: 36, bg: GOLD, rot: -0.05 })
    } },
  { sign: 'gemini', cap: 'Sent their twin. | *Nobody noticed.*', mood: 'wink', star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.4, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'gemini', 780, 930, 260 * k, { mood: lt > 1.4 ? 'wink' : 'happy', look: [-1, 0], seed: 12, glyph: false, hops: [P.t0 + 1.3] })
      label(x, 780, 700, 'TODAY’S GEMINI', pop01(t, P.t0 + 0.9, 0.3, 2), { size: 30, bg: '#ffd23a', rot: 0.05 })
      bubble(x, 300, 640, 'shh.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 44, tail: 'br' })
    } },
  { sign: 'cancer', cap: 'Made a scrapbook | of *date one.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      scrapbook(x, 790, 880, pop01(t, P.t0 + 0.25, 0.35, 2), t)
      label(x, 790, 1080, 'VOLUME ONE', pop01(t, P.t0 + 0.9, 0.3, 2), { size: 34, bg: PINK, rot: -0.04 })
      hearts(x, t, 790, 800, P.t0 + 1.3, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Changed outfits | *between courses.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      const COLS = ['#ff6b5a', '#8fe3ff', '#ffd23a', '#c97bff', '#7dffb0']
      const n = Math.min(4, Math.floor(Math.max(0, lt - 0.2) / 0.5))
      drawBits(x, SHIRT, { S: COLS[n] }, 790, 900, 30 * pop01(t, P.t0 + 0.25, 0.3, 2), { rot: 0.06 })
      sparkles(x, t, 790, 900, P.t0 + (0.2 + 0.5 * n) * 1.29, 6, 140, n)
      label(x, 790, 700, `LOOK ${n + 1} OF 5`, pop01(t, P.t0 + 0.4, 0.3, 2), { size: 36, bg: '#ffb34a', rot: -0.05 })
    } },
  { sign: 'virgo', cap: 'Fact-checked | your *first-date stories.*', mood: lt => lt > 1.4 ? 'squint' : 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 890); x.rotate(0.04); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-150, -190, 300, 380); x.fillStyle = BROWN; x.fillRect(-142, -182, 284, 364)
        x.fillStyle = CREAM; x.fillRect(-124, -150, 248, 316)
        x.fillStyle = '#6b62a8'; x.fillRect(-50, -196, 100, 34)
        const ROWS = ['shark story', 'marathon', 'met a celeb']
        ROWS.forEach((r, i) => {
          const y = -100 + i * 90
          x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(r, -108, y)
          if (lt > 0.6 + i * 0.35) { x.fillStyle = i === 0 ? '#2fc79a' : RED; x.font = `800 40px ${INTER}`; x.fillText(i === 0 ? '✓' : '✗', 70, y + 40) }
        })
        x.restore()
      }
      label(x, 790, 660, 'SOURCE?', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 40, bg: MINT, rot: -0.05 })
    } },
  { sign: 'libra', cap: 'Still deciding | if date one *counted.*', mood: lt => lt > 1.8 ? 'squint' : 'neutral', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      const tilt = 0.18 * Math.sin(lt * 4)
      drawBits(x, SCALE, SCALE_C, 790, 900, 20 * k, { rot: tilt })
      label(x, 790, 1080, 'COUNTED? · DIDN’T?', pop01(t, P.t0 + 0.7, 0.3, 2), { size: 28, bg: PINK, rot: 0.04 })
      bubble(x, 790, 680, 'let me | sleep on it', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'Remembers everything | you said. *Everything.*', mood: lt => lt > 1.4 ? 'wink' : 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const len = 120 + 440 * ease.outCubic(prog(lt, 0.3, 1.5))
      receipt(x, 790, 580, len, pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 330, 620, 'your dog: | Biscuit.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, col: LAV, tail: 'br' })
    } },
  { sign: 'sagittarius', cap: 'Date two? | *Skydiving.*', mood: 'sparkle', star: { x: 0, y: 60, s: 240 },
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, CHUTE, CHUTE_C, F.x, F.top - 95, 13 * k, { rot: 0.05 * Math.sin(t * 2) })
      label(x, 280, 1120, 'DATE 1: COFFEE', pop01(t, P.t0 + 0.8, 0.3, 2), { size: 28, bg: '#9aa5c4', rot: -0.05 })
      label(x, 790, 1120, 'DATE 2: SKY', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 30, bg: GOLD, rot: 0.05 })
    } },
  { sign: 'capricorn', cap: 'Booked date three. | *And thirty more.*', mood: lt => lt > 1.6 ? 'happy' : 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      calendar(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      label(x, 790, 1090, 'ALL CONFIRMED', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 32, bg: '#2fc79a', rot: -0.04 })
    } },
  { sign: 'aquarius', cap: 'Brought a | *debate topic.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, -1], star: { x: -180 },
    front(x, t, lt, P) {
      bubble(x, 780, 760, 'is soup | a drink?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 46, col: MINT, tail: 'bl' })
      label(x, 790, 1000, 'ROUND 1 · FIGHT', pop01(t, P.t0 + 1.2, 0.3, 2), { size: 32, bg: SKYB, rot: 0.05 })
    } },
  { sign: 'pisces', cap: 'You remembered | their *sign.* Tears.', mood: lt => lt < 0.9 ? 'happy' : 'wide', tears: lt => lt < 0.9 ? 2 : 3, star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'you’re a | Pisces, right?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, tail: 'bl' })
      label(x, 790, 900, '♓︎ REMEMBERED', pop01(t, P.t0 + 0.9, 0.3, 2), { size: 34, bg: '#b7a6ff', rot: -0.05 })
      hearts(x, t, 790, 1020, P.t0 + 1.1, { n: 5, life: 1.8, spread: 180, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2t0041', key: 'C', accent: '#ff8fb1', ending: 'card',
  title: 'The signs on | a *second date.*',
  cameos: CAMEOS,
  card: { a: 'aries', b: 'cancer', chip: 'DATE THREE' },
  group: { cap: 'Nobody waited | for *date three.*' },
  lesson: { text: 'Date two is brave. | *Show up* as you.', chip: 'DATE 3: BOOKED' },
  last: {
    text: 'Aries moved in. | Cancer *approved.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 10, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
