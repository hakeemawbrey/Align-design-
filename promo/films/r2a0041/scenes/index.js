// r2a0041: star_advice, ADVICE SOLO, "What Aries need | from a friend." (~51 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole way through (makeFilm solo mode, 9 cards): a relatable Aries truth + a warm reframe, one gag each.
//   0.0–3.6    "What Aries need | *from a friend.*"  One big Aries pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              "let's go!" (already outside, one shoe on) · all caps means excited, not angry (a loud phone)
//              · clap for the small wins (a trophy for making the bed) · tell them straight (a stopwatch: no guessing)
//              · rest counts too (a battery, charging) · over it in seconds (storm cloud to sun) · say yes to the wild
//              idea (a road trip at midnight) · be their hype person (a foam finger) · soft in the middle (a plush bunny)
//  37.8        "Big heart. | *Bigger* energy."  Aries comes back, big.
//  41.0        LESSON: "Cheer them on. | They’ll *run back* for you."  FRIEND: FOR LIFE
//  46.9        "Aries already | *texted back.*"  The loud phone comes back.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#ff6b5a', CREAM = '#fff4e2', WOOD = '#c98f2a'
const S = 'aries'

const SHOE = [
  '....RRRR....',
  '...RRWRRR...',
  '..RRRWRRRRR.',
  'RRRRRRRRRRRR',
  'WWWWWWWWWWWW',
]
const SHOE_C = { R: RED, W: CREAM }
const TROPHY = [
  'Y.YYYYYYY.Y',
  'YYYYYYYYYYY',
  'Y.YYYYYYY.Y',
  '..YYYYYYY..',
  '...YYYYY...',
  '....YYY....',
  '.....Y.....',
  '....YYY....',
  '..BBBBBBB..',
]
const TROPHY_C = { Y: GOLD, B: '#8a4a2e' }
const CLOUD = [
  '....GGGG......',
  '..GGGGGGGG.GG.',
  '.GGGGGGGGGGGGG',
  'GGGGGGGGGGGGGG',
  '.GGGGGGGGGGGG.',
]
const SUN = ['...Y...', '.Y.Y.Y.', '..YYY..', 'YYYYYYY', '..YYY..', '.Y.Y.Y.', '...Y...']
const CAR = [
  '...RRRRRR.....',
  '..RSSRSSSR....',
  '.RRSSRSSSRRRR.',
  'RRRRRRRRRRRRRR',
  'RRRRRRRRRRRRRY',
  '.KK......KK...',
  '.KK......KK...',
]
const CAR_C = { R: RED, S: SKYB, Y: GOLD, K: INK }
const FINGER = [
  '....YY....',
  '....YY....',
  '....YY....',
  '.YYYYYYYY.',
  'YYYYYYYYYY',
  'YYYYYYYYYY',
  'YYYYYYYYYY',
  '.YYYYYYYY.',
  '..YYYYYY..',
  '..BBBBBB..',
  '..BBBBBB..',
]
const FINGER_C = { Y: '#ffd23a', B: RED }
const BUNNY = [
  '.P...P.',
  '.PW.PW.',
  '.PW.PW.',
  'PPPPPPP',
  'PKPPPKP',
  'PPPHPPP',
  '.PPPPP.',
  'PPPPPPP',
  'PPPPPPP',
  '.PP.PP.',
]
const BUNNY_C = { P: '#ffc4dc', W: '#ff8fb1', K: INK, H: '#ff4f86' }

function phone(x, cx, cy, k, lines, head = '✦ BESTIE') {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  x.fillStyle = MINT; x.fillRect(-100, -156, 200, 46)
  x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -132)
  lines.forEach(([txt, col, kk], i) => {
    if (kk <= 0.01) return
    x.save(); x.translate(i % 2 ? 10 : -10, -62 + i * 64); x.scale(kk, kk)
    x.font = `800 26px ${INTER}`; const w = x.measureText(txt).width + 30
    x.fillStyle = col; x.fillRect(-w / 2, -25, w, 50); x.fillStyle = INK; x.fillText(txt, 0, 2)
    x.restore()
  })
  x.restore()
}
function battery(x, cx, cy, k, lvl) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-110, -60, 220, 120); x.fillRect(110, -24, 20, 48)
  x.fillStyle = '#140c30'; x.fillRect(-100, -50, 200, 100)
  const n = Math.round(lvl * 5)
  for (let i = 0; i < 5; i++) { x.fillStyle = i < n ? (n <= 1 ? RED : '#2fc79a') : '#2a2350'; x.fillRect(-92 + i * 38, -42, 32, 84) }
  x.restore()
}
function stopwatch(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-16, -150, 32, 40)
  x.beginPath(); x.arc(0, 0, 120, 0, Math.PI * 2); x.fill()
  x.fillStyle = CREAM; x.beginPath(); x.arc(0, 0, 106, 0, Math.PI * 2); x.fill()
  x.fillStyle = RED; for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.fillRect(Math.cos(a) * 88 - 4, Math.sin(a) * 88 - 4, 8, 8) }
  const a = -Math.PI / 2 + lt * 9
  x.strokeStyle = INK; x.lineWidth = 10; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(a) * 80, Math.sin(a) * 80); x.stroke()
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'They don’t need a plan. | Just *“let’s go!”*', mood: 'sparkle', star: { x: -190 }, hops: [0.5, 1.0, 1.5],
    front(x, t, lt, P) {
      drawBits(x, SHOE, SHOE_C, 790, 1060, 18 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: -0.08 })
      bubble(x, 300, 620, 'let’s go!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 46, tail: 'br' })
      label(x, 790, 820, 'ALREADY OUTSIDE', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.05 })
      label(x, 790, 920, '(one shoe on)', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 26, bg: CREAM, rot: -0.04 })
    } },
  { sign: S, cap: 'All caps means excited. | *Not angry.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', look: [1, 0], star: { x: -200 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 790, 850, pop01(t, P.t0 + 0.15, 0.3, 2), [
        ['OMG!!!', RED, pop01(t, P.t0 + 0.4, 0.25, 2.2)],
        ['GUESS WHAT', GOLD, pop01(t, P.t0 + 0.6, 0.25, 2.2)],
        ['I LOVE YOU', PINK, pop01(t, P.t0 + 0.8, 0.25, 2.2)],
        ['ok bye!!', SKYB, pop01(t, P.t0 + 1.0, 0.25, 2.2)],
      ])
      label(x, 790, 1120, 'VOLUME: FRIENDLY', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Clap for | the *small wins* too.', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -190 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, TROPHY, TROPHY_C, 790, 860, 22 * k)
      label(x, 790, 1070, 'MADE THE BED', pop01(t, P.t0 + 0.7, 0.3, 2.2), { size: 34, bg: SKYB, rot: -0.04 })
      sparkles(x, t, 790, 860, P.t0 + 1.4, 8, 170, 0.3)
      bubble(x, 300, 620, 'thank you, | thank you', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 32, tail: 'br' })
    } },
  { sign: S, cap: 'Tell them straight. | They *hate guessing.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      stopwatch(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      bubble(x, 300, 620, 'just | tell me!', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 40, tail: 'br' })
      label(x, 790, 1060, 'PATIENCE: 1 SEC', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 30, bg: RED, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Remind them | rest *counts too.*', mood: lt => lt > 0.9 ? 'sleepy' : 'neutral', star: { x: -190, y: 30 },
    front(x, t, lt, P) {
      battery(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), lt < 0.8 ? 0.2 : clamp(0.2 + (lt - 0.8) / 1.2))
      label(x, 790, 980, 'CHARGING', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 36, bg: '#2fc79a', rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 640, 'five more | minutes', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 32, col: LAV, tail: 'bl' })
    } },
  { sign: S, cap: 'Over it in seconds. | *Stay for that.*', mood: lt => lt > 1.1 ? 'sparkle' : 'squint', star: { x: -190 }, hops: [1.2],
    front(x, t, lt, P, F) {
      const c = pop01(t, P.t0 + 0.15, 0.3, 2) * (1 - ease.inCubic(prog(lt, 0.9, 1.2)))
      drawBits(x, CLOUD, { G: '#7a7f99' }, F.x, F.top - 70, 14 * c)
      const s = pop01(t, P.t0 + 1.2 * 1.29, 0.35, 2)
      drawBits(x, SUN, { Y: GOLD }, 790, 760, 20 * s, { rot: t * 0.6 })
      label(x, 790, 1000, 'MAD FOR: 3 SECONDS', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 28, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Say yes | to the *wild idea.*', mood: 'sparkle', star: { x: -190 }, hops: [1.1],
    front(x, t, lt, P) {
      bubble(x, 790, 640, 'road trip? | tonight?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 38, tail: 'bl' })
      const p = ease.outCubic(prog(lt, 0.8, 1.6))
      drawBits(x, CAR, CAR_C, lerp(1080, 790, p), 900, 21, { alpha: p > 0 ? 1 : 0 })
      label(x, 790, 1080, 'PACKED: ONE SOCK', pop01(t, P.t0 + 1.8, 0.3, 2.2), { size: 30, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Be their hype person. | *Loudly.*', mood: lt => lt > 1.0 ? 'heart' : 'wide', star: { x: -190 }, hops: [1.1, 1.6],
    front(x, t, lt, P) {
      drawBits(x, FINGER, FINGER_C, 790, 860, 22 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.1 * Math.sin(t * 7) })
      label(x, 790, 1080, 'ARIES #1 FAN', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.04 })
      hearts(x, t, 400, 780, P.t0 + 1.3, { n: 5, life: 1.6, spread: 160, cell: 6, seed: 4 })
    } },
  { sign: S, cap: 'Tough outside. | *Soft* in the middle.', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, BUNNY, BUNNY_C, 720, 960, 20 * pop01(t, P.t0 + 0.3, 0.35, 2), { rot: -0.08 })
      label(x, 800, 700, 'SECRETLY SOFT', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 34, bg: PINK, rot: 0.04 })
      bubble(x, 830, 1120, 'his name | is Kevin', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 30, tail: 'bl' })
      hearts(x, t, 720, 900, P.t0 + 1.5, { n: 4, life: 1.4, spread: 140, cell: 6, seed: 2 })
    } },
]

const F = makeFilm({
  id: 'r2a0041', key: 'D', accent: RED, solo: S, ending: 'lesson',
  title: 'What Aries need | *from a friend.*',
  cameos: CAMEOS,
  group: { cap: 'Big heart. | *Bigger* energy.', mood: 'sparkle' },
  lesson: { text: 'Cheer them on. | They’ll *run back* for you.', chip: 'FRIEND: FOR LIFE' },
  last: {
    text: 'Aries already | *texted back.*',
    draw(x, t, lt) {
      phone(x, 540, 1400, 0.8 * pop01(t, t - lt + 0.6, 0.35, 2), [['YES!!!', RED, 1], ['WHEN?!', GOLD, 1]])
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
