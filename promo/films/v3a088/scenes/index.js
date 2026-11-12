// v3a088: zodiac.advice444, ADVICE SOLO, "How to love | a Cancer." (~51 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole way through (makeFilm solo mode, 9 cards): how to love a Cancer well, warm, one gag each.
//   0.0–3.6    "How to love | *a Cancer.*"  One big Cancer pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              a card "to: your mom ♡" · a lasagna: SECONDS, MANDATORY · a fridge covered in their little notes
//              · a photo album: VOLUME 47 · a teddy bear named MR. BUTTONS · a place card at family dinner: YOU
//              · a match screen with five hearts lighting up · a tray of cookies, fresh · an umbrella over them in the rain
//  37.8        "Love them loud. | *They love louder.*"  Cancer comes back.
//  41.0        LESSON UNLOCKED: "Feel it with them. | They’ll *never let go.*"  HEART: HOME
//  46.9        "Mr. Buttons | *approves.*" over the match card: Cancer + Scorpio (the teddy comes back, nodding).
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const BLUE = '#6fc3ff', ORANGE = '#ffb34a', RED = '#e23d4e'
const S = 'cancer'
const HEART = ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']

// ── props
const TEDDY = [
  'BB.....BB.',
  'BbB...BbB.',
  '.BBBBBBB..',
  'BBKBBBKBB.',
  'BBBBNBBBB.',
  'BBBbbbBBB.',
  '.BBBBBBB..',
  'BBBBBBBBB.',
  'BBbbbbbBB.',
  'BBbbbbbBB.',
  '.BB...BB..',
]
const TEDDY_C = { B: '#c98a5a', b: '#e8c39a', K: INK, N: '#3a2214' }
const LASAGNA = [
  'KKKKKKKKKKKKKK',
  'KRYRYRRYRYRRYK',
  'KYYYYYYYYYYYYK',
  'KRRRRRRRRRRRRK',
  'KGGGGGGGGGGGGK',
  'KRRRRRRRRRRRRK',
  'KKKKKKKKKKKKKK',
]
const COOKIE = ['.CCCC.', 'CCDCCC', 'CCCCDC', 'CDCCCC', 'CCCDCC', '.CCCC.']
const UMB = [
  '.....RRRRR.....',
  '...RRRRRRRRR...',
  '.RRRWRRRRRWRRR.',
  'RRRWWRRRRRWWRRR',
  'R.R.R.RRR.R.R.R',
  '.......K.......',
  '.......K.......',
  '.......K.......',
  '.......K.......',
  '.......K.......',
  '.....K.K.......',
  '......K........',
]

function card(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.06); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -110, 316, 240)
  x.fillStyle = INK; x.fillRect(-162, -122, 324, 244); x.fillStyle = '#ffe7ef'; x.fillRect(-154, -114, 308, 228)
  x.fillStyle = PINK; x.fillRect(-154, -114, 308, 46)
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.font = `800 28px ${INTER}`; x.fillText('HAPPY BIRTHDAY', 0, -90)
  x.font = `700 26px ${MONO}`; x.fillText('to: your mom ♡', 0, -10)
  x.font = `700 22px ${MONO}`; x.fillStyle = '#6b62a8'; x.fillText('(signed: both of us)', 0, 40)
  x.restore()
}
function fridge(x, t, cx, cy, k, n) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-140, -230, 280, 460); x.fillStyle = '#e8f2ff'; x.fillRect(-132, -222, 264, 444)
  x.fillStyle = INK; x.fillRect(-132, -70, 264, 8); x.fillRect(100, -190, 12, 90); x.fillRect(100, -30, 12, 120)
  const NOTES = [['eat lunch!', GOLD], ['proud of u', PINK], ['drink water', MINT], ['love you', LAV], ['call me ♡', SKYB]]
  for (let i = 0; i < Math.min(n, 5); i++) {
    const [s, c] = NOTES[i], px = -60 + (i % 2) * 90 - 20, py = -170 + i * 76
    x.save(); x.translate(px, py); x.rotate((i % 2 ? 1 : -1) * 0.08)
    x.fillStyle = INK; x.fillRect(-76, -28, 152, 56); x.fillStyle = c; x.fillRect(-72, -24, 144, 48)
    x.fillStyle = INK; x.font = `800 20px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, 0, 2); x.restore()
  }
  x.restore()
}
function album(x, cx, cy, k, flip) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-190, -130, 380, 260); x.fillStyle = '#8a4a2e'; x.fillRect(-184, -124, 368, 248)
  x.fillStyle = '#fff4e2'; x.fillRect(-170, -110, 166, 220); x.fillRect(4, -110, 166, 220)
  const COLS = [PINK, SKYB, GOLD, MINT, LAV, ORANGE, PINK, SKYB]
  for (let i = 0; i < 4; i++) { x.fillStyle = INK; x.fillRect(-160 + (i % 2) * 76, -96 + Math.floor(i / 2) * 100, 70, 86); x.fillStyle = COLS[(i + flip) % 8]; x.fillRect(-156 + (i % 2) * 76, -92 + Math.floor(i / 2) * 100, 62, 78) }
  for (let i = 0; i < 4; i++) { x.fillStyle = INK; x.fillRect(14 + (i % 2) * 76, -96 + Math.floor(i / 2) * 100, 70, 86); x.fillStyle = COLS[(i + 3 + flip) % 8]; x.fillRect(18 + (i % 2) * 76, -92 + Math.floor(i / 2) * 100, 62, 78) }
  x.restore()
}
function table(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-200, 20, 400, 40); x.fillStyle = '#c98f2a'; x.fillRect(-196, 24, 392, 32)
  x.fillStyle = INK; x.fillRect(-180, 60, 20, 120); x.fillRect(160, 60, 20, 120)
  for (let i = 0; i < 4; i++) { x.fillStyle = INK; x.beginPath(); x.ellipse(-150 + i * 100, 10, 40, 14, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#fff4e2'; x.beginPath(); x.ellipse(-150 + i * 100, 10, 34, 10, 0, 0, Math.PI * 2); x.fill() }
  x.restore()
}
function matchScreen(x, cx, cy, k, lit) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-112, -182, 236, 380)
  x.fillStyle = INK; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#2a2350'; x.fillRect(-114, -184, 228, 368)
  x.fillStyle = '#140c30'; x.fillRect(-102, -160, 204, 320)
  x.fillStyle = BONE; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText('✦ COMPATIBILITY', 0, -120); x.font = `800 30px ${INTER}`; x.fillText('♋︎ + YOU', 0, -70)
  x.restore()
  for (let i = 0; i < 5; i++) drawBits(x, HEART, { H: i < lit ? PINK : '#3a3060' }, cx - 76 * k + i * 38 * k, cy + 20 * k, 4.4 * k)
}

const CAMEOS = [
  { sign: S, cap: 'Remember | *their mom’s birthday.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: { x: -190 }, hops: [1.4],
    front(x, t, lt, P) {
      card(x, 790, 830, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 1060, 'INSTANT FAMILY', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: PINK, rot: 0.04 })
      hearts(x, t, 790, 760, P.t0 + 1.5, { n: 4, life: 1.6, spread: 200, cell: 7, seed: 5 })
    } },
  { sign: S, cap: 'Eat the food | *they made you.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -190 }, hops: [1.4],
    front(x, t, lt, P) {
      drawBits(x, LASAGNA, { K: INK, R: RED, Y: GOLD, G: '#7bd36a' }, 790, 880, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 660, 'SECONDS: MANDATORY', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Keep the little notes | *they leave you.*', mood: lt => lt > 1.6 ? 'heart' : 'happy', look: [1, 0], star: { x: -200 }, hops: [1.7],
    front(x, t, lt, P) {
      fridge(x, t, 800, 860, pop01(t, P.t0 + 0.2, 0.35, 2), 1 + Math.floor(clamp((lt - 0.4) / 1.2) * 5))
    } },
  { sign: S, cap: 'Let them keep | *every single photo.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -200 }, hops: [1.3],
    front(x, t, lt, P) {
      album(x, 790, 840, pop01(t, P.t0 + 0.2, 0.35, 2), Math.floor(lt * 3))
      label(x, 790, 1040, 'VOLUME 47', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 38, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Never mock | *the teddy bear.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: { x: -200 }, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, TEDDY, TEDDY_C, 790, 860, 24 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: Math.sin(t * 2) * 0.03 })
      label(x, 790, 1100, 'MR. BUTTONS', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 38, bg: GOLD, rot: -0.04 })
      label(x, 790, 600, 'AGE: 24. RESPECT.', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 28, bg: BONE, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Show up | *to the family dinner.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -210 }, hops: [1.5],
    front(x, t, lt, P) {
      table(x, t, 780, 960, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 760, 'SEAT: YOU ♡', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 40, bg: PINK, rot: -0.05 })
      bubble(x, 790, 590, 'they saved | you a plate', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 30, tail: 'bl' })
    } },
  { sign: S, cap: 'Match their energy. | *They feel everything.*', mood: lt => lt > 1.6 ? 'heart' : 'wide', look: [1, 0], star: { x: -190 }, hops: [1.7],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      matchScreen(x, 790, 830, pop01(t, P.t0 + 0.2, 0.35, 2), Math.floor(clamp((lt - 0.4) / 1.2) * 5.99))
      label(x, 790, 1090, '5 / 5 HEARTS', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Bake something. | *They’ll cry. Good tears.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', tears: lt => lt > 1.3 ? 1 : 0, look: [1, 0], star: { x: -200 }, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) { x.save(); x.translate(790, 900); x.scale(k, k); x.fillStyle = INK; x.fillRect(-180, 40, 360, 30); x.fillStyle = '#9a9ab0'; x.fillRect(-174, 44, 348, 22); x.restore() }
      ;[[-110, -10], [0, -30], [110, -10], [-55, -100], [55, -100]].forEach(([dx, dy], i) => drawBits(x, COOKIE, { C: '#d9a35a', D: '#5a3214' }, 790 + dx, 900 + dy, 14 * pop01(t, P.t0 + 0.4 + i * 0.12, 0.3, 2)))
      label(x, 790, 1080, 'FRESH. WARM. LOVE.', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: ORANGE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Be their umbrella | *on rainy days.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [0, -1], star: { x: -60 }, hops: [1.3],
    back(x, t, lt, P) {
      const dry = ease.outCubic(prog(lt, 0.7, 1.1))
      x.fillStyle = SKYB
      for (let i = 0; i < 26; i++) { const px = 140 + (i * 137) % 820, py = 500 + ((t * 600 + i * 97) % 700); if (dry > 0.5 && px > 300 && px < 760) continue; x.fillRect(px, py, 6, 22) }
    },
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.7, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'scorpio', 800, 960, 200 * k, { mood: 'happy', look: [-1, -1], seed: 23, glyph: false })
      drawBits(x, UMB, { R: PINK, W: '#ffd0df', K: INK }, F.x + 40, F.top - 40, 22 * k)
      label(x, 800, 620, 'DRY. LOVED.', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: MINT, rot: 0.04 })
    } },
]

const F = makeFilm({
  id: 'v3a088', key: 'F', accent: BLUE, solo: S, ending: 'card',
  title: 'How to love | *a Cancer.*',
  cameos: CAMEOS,
  card: { a: 'cancer', b: 'scorpio', chip: 'ALIGNED' },
  group: { cap: 'Love them loud. | *They love louder.*', mood: 'heart' },
  lesson: { text: 'Feel it with them. | They’ll *never let go.*', chip: 'HEART: HOME' },
  last: {
    text: 'Mr. Buttons | *approves.*',
    draw(x, t, lt) {
      drawBits(x, TEDDY, TEDDY_C, 540, 1520, 16 * pop01(t, t - lt + 1.6, 0.4, 2.2), { rot: Math.sin(t * 3) * 0.08 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
