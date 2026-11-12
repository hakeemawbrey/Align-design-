// r2a0642: star_advice, ADVICE SOLO, "Aquarius, you can’t | fix everyone." (~45 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole way through (makeFilm solo mode, 9 cards): a relatable Aquarius truth + a warm reframe, one gag each.
//   0.0–3.6    "Aquarius, you can’t | *fix everyone.*"  One big Aquarius pops in.
//   3.6–37.8   your toolbox can clock off · not every friend needs an upgrade (FRIEND 2.0 cancelled) · some people want a hug,
//              not a twelve-step plan · listen first, invent later · you can't save the world before lunch
//              · your match isn't a project · helping is kind, so is stepping back · keep some weird ideas for you
//              · fix one thing today: your sleep
//  37.8        "Genius. | *Off the clock.*"  Aquarius comes back, big.
//  41.2        callback: "The world can wait. | *Lunch first.*"  The globe and the sandwich come back.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const AQUA = '#38d6f0', CREAM = '#fff4e2', RED = '#e23d4e', GREEN = '#5fd068', BROWN = '#8a4a2e'
const S = 'aquarius'

// ── props
const TOOLBOX = [
  '....KKKKKK....',
  '...K......K...',
  'RRRRRRRRRRRRRR',
  'RRRRRRRRRRRRRR',
  'RRRRRGGGGRRRRR',
  'RRRRRGGGGRRRRR',
  'RRRRRRRRRRRRRR',
  'RRRRRRRRRRRRRR',
]
const TOOLBOX_C = { K: INK, R: RED, G: '#9aa5c4' }
const BULB = [
  '..YYYY..',
  '.YYYYYY.',
  'YYYWYYYY',
  'YYWYYYYY',
  'YYYYYYYY',
  '.YYYYYY.',
  '..GGGG..',
  '..gggg..',
  '..GGGG..',
]
const BULB_C = { Y: '#ffe24a', W: '#ffffff', G: '#9aa5c4', g: '#5a6698' }
const BULB_OFF = { Y: '#5a6698', W: '#7a86b8', G: '#9aa5c4', g: '#5a6698' }
const GLOBE = [
  '...BBBBBB...',
  '..BGGBBBBB..',
  '.BGGGGBBGBB.',
  'BBGGGBBBGGBB',
  'BBBGBBBBGGGB',
  'BBBBBBBBBGGB',
  'BBGGBBBBBBBB',
  '.BGGGBBBBBB.',
  '..BBGBBBBB..',
  '...BBBBBB...',
]
const GLOBE_C = { B: '#4fa8ff', G: GREEN }
const SANDWICH = [
  '..CCCCCCCC..',
  '.CCCCCCCCCC.',
  'LLLLLLLLLLLL',
  'TTTTTTTTTTTT',
  'YYYYYYYYYYYY',
  '.CCCCCCCCCC.',
]
const SANDWICH_C = { C: '#e0a86a', L: GREEN, T: RED, Y: '#ffe24a' }
const FENCE = [
  'W...W...W...W...W',
  'WW..WW..WW..WW..WW'.slice(0, 17),
  'WWWWWWWWWWWWWWWWW',
  'W.W.W.W.W.W.W.W.W',
  'WWWWWWWWWWWWWWWWW',
  'W...W...W...W...W',
  'W...W...W...W...W',
]
const FENCE_C = { W: CREAM }
const PILLOW = [
  '.PPPPPPPPPPPP.',
  'PPPPPPPPPPPPPP',
  'PPWPPPPPPPPWPP',
  'PPPPPPPPPPPPPP',
  'PPPPPPPPPPPPPP',
  '.PPPPPPPPPPPP.',
]
const PILLOW_C = { P: LAV, W: '#ffffff' }

// a rolled-out blueprint with a crossed-out "FRIEND 2.0"
function blueprint(x, cx, cy, k, cross) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-160, -120, 320, 240)
  x.fillStyle = '#2f6fd0'; x.fillRect(-152, -112, 304, 224)
  x.strokeStyle = 'rgba(255,255,255,0.25)'; x.lineWidth = 2
  for (let i = -140; i < 150; i += 28) { x.beginPath(); x.moveTo(i, -112); x.lineTo(i, 112); x.stroke(); x.beginPath(); x.moveTo(-152, i * 0.75); x.lineTo(152, i * 0.75); x.stroke() }
  x.fillStyle = '#ffffff'; x.font = `700 34px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('FRIEND 2.0', 0, -50)
  x.strokeStyle = '#ffffff'; x.lineWidth = 4; x.strokeRect(-60, -10, 120, 90); x.beginPath(); x.moveTo(-60, -10); x.lineTo(60, 80); x.stroke()
  if (cross > 0.01) { x.strokeStyle = RED; x.lineWidth = 14; x.lineCap = 'round'; x.beginPath(); x.moveTo(-130, -90); x.lineTo(-130 + 260 * cross, -90 + 180 * cross); x.stroke() }
  x.restore()
}
// a long scroll of steps
function scroll(x, cx, cy, k, n) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  const H = 70 + n * 34
  x.fillStyle = INK; x.fillRect(-114, -H / 2 - 6, 228, H + 12)
  x.fillStyle = CREAM; x.fillRect(-108, -H / 2, 216, H)
  x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  x.fillText('THE PLAN:', -90, -H / 2 + 28)
  for (let i = 0; i < n; i++) x.fillText(`${i + 1}. ${['analyse', 'optimise', 'reboot', 'iterate', 'pivot', 'scale', 'test', 'debug'][i % 8]}`, -90, -H / 2 + 62 + i * 34)
  x.restore()
}
// a phone with a match header
function phone(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  x.fillStyle = MINT; x.fillRect(-100, -156, 200, 46); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('✦ NEW MATCH', 0, -132)
  x.font = `800 26px ${INTER}`
  ;['hi! I like', 'my life as is'].forEach((m, i) => { const w = x.measureText(m).width + 26; x.fillStyle = BONE; x.fillRect(-w / 2, -60 + i * 50 - 22, w, 44); x.fillStyle = INK; x.fillText(m, 0, -60 + i * 50 + 2) })
  x.restore()
}
// a jar of glowing little ideas
function jar(x, cx, cy, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-110, -150, 220, 300); x.fillStyle = 'rgba(143,227,255,0.25)'; x.fillRect(-102, -130, 204, 272)
  x.fillStyle = BROWN; x.fillRect(-90, -170, 180, 40)
  x.restore()
  for (let i = 0; i < 5; i++) drawBits(x, BULB, BULB_C, cx + (Math.sin(i * 2.3) * 60) * k, cy + (-60 + i * 36 + Math.sin(t * 2 + i) * 6) * k, 6 * k)
}

const CAMEOS = [
  { sign: S, cap: 'You want to fix it all. | *Rest is allowed.*', mood: lt => lt > 1.3 ? 'sleepy' : 'happy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      drawBits(x, TOOLBOX, TOOLBOX_C, 790, 930, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 700, 'TOOLBOX: OFF DUTY', pop01(t, P.t0 + 1.1, 0.3, 2.6), { size: 30, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Not every friend | *needs an upgrade.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      blueprint(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), ease.outCubic(prog(lt, 1.0, 1.3)))
      label(x, 790, 1070, 'PERFECT AS IS ♡', pop01(t, P.t0 + 1.4, 0.3, 2.6), { size: 32, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Some want a hug, | *not a plan.*', mood: lt => lt > 1.4 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -190 }, hops: [1.5],
    front(x, t, lt, P) {
      const n = Math.min(8, 1 + Math.floor(Math.max(0, lt - 0.3) / 0.12))
      const fold = ease.inCubic(prog(lt, 1.3, 1.6))
      scroll(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2) * (1 - fold), n)
      label(x, 790, 860, 'HUG INSTEAD ♡', pop01(t, P.t0 + 1.6, 0.3, 2.6), { size: 40, bg: PINK, rot: -0.05, font: MONO, weight: 700 })
      if (lt > 1.6) hearts(x, t, 790, 900, P.t0 + 2.1, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 3 })
    } },
  { sign: S, cap: 'Listen first. | *Invent later.*', mood: lt => lt > 1.0 ? 'happy' : 'sparkle', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const on = lt < 1.0
      drawBits(x, BULB, on ? BULB_C : BULB_OFF, 640, 600, 12 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 820, 860, 'mm-hm. | go on.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 50, tail: 'bl' })
      label(x, 790, 1110, 'IDEA: ON HOLD', pop01(t, P.t0 + 1.4, 0.3, 2.6), { size: 30, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Can’t save the world | *before lunch.*', mood: lt => lt > 1.3 ? 'wink' : 'wide', look: [1, 0], star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, GLOBE, GLOBE_C, 790, 790, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: lt * 0.3 })
      drawBits(x, SANDWICH, SANDWICH_C, 790, 1030, 16 * pop01(t, P.t0 + 1.0, 0.3, 2.2))
      label(x, 790, 610, 'LUNCH FIRST', pop01(t, P.t0 + 1.4, 0.3, 2.6), { size: 34, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Your match? | *Not a project.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      phone(x, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1110, 'PROJECT: CANCELLED', pop01(t, P.t0 + 1.3, 0.3, 2.6), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Helping is kind. | *So is stepping back.*', mood: 'happy', look: [1, 0], star: { x: -190 }, hops: [1.0],
    front(x, t, lt, P) {
      drawBits(x, FENCE, FENCE_C, 760, 1080, 14 * pop01(t, P.t0 + 0.6, 0.3, 2))
      bubble(x, 790, 700, 'you’ve got | this one ♡', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 790, 900, 'BOUNDARY: CUTE', pop01(t, P.t0 + 1.5, 0.3, 2.6), { size: 30, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Your wild ideas? | *Keep some for you.*', mood: 'sparkle', look: [1, 0], star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      jar(x, 790, 880, pop01(t, P.t0 + 0.2, 0.3, 2), t)
      label(x, 790, 640, 'PRIVATE STASH', pop01(t, P.t0 + 1.2, 0.3, 2.6), { size: 32, bg: LAV, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Fix one thing today. | *Your sleep.*', mood: lt => lt > 1.0 ? 'sleepy' : 'happy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      drawBits(x, PILLOW, PILLOW_C, 790, 950, 22 * pop01(t, P.t0 + 0.3, 0.3, 2))
      label(x, 790, 700, 'REPAIR: COMPLETE', pop01(t, P.t0 + 1.3, 0.3, 2.6), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0642', key: 'F', accent: AQUA, solo: S, ending: 'callback',
  title: 'Aquarius, you can’t | *fix everyone.*',
  cameos: CAMEOS,
  group: { cap: 'Genius. | *Off the clock.*', mood: 'happy' },
  last: {
    text: 'The world can wait. | *Lunch first.*',
    draw(x, t, lt) {
      const t0 = t - lt
      drawBits(x, GLOBE, GLOBE_C, 330, 1080, 22 * pop01(t, t0 + 0.5, 0.4, 2), { rot: t * 0.3 })
      drawBits(x, SANDWICH, SANDWICH_C, 730, 1080, 24 * pop01(t, t0 + 0.9, 0.4, 2))
      label(x, 330, 1290, 'WORLD: ON HOLD', pop01(t, t0 + 1.3, 0.3, 2.4), { size: 30, bg: SKYB, rot: -0.05, font: MONO, weight: 700 })
      label(x, 730, 1290, 'LUNCH: ON', pop01(t, t0 + 1.5, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      hearts(x, t, 730, 1000, t0 + 1.6, { n: 6, life: 1.8, spread: 200, cell: 7, seed: 6 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
