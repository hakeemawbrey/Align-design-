// r2t0043: star_talk, BE LIKE, "Third coffee? | Zodiacs be like." (~62 s vertical, signs3kit social cut, music: lofi · G)
//   0.0–3.6    "Third coffee? | Zodiacs *be like.*"  The twelve line up, then dive into the pips.
//   3.6–49.2   coffee number three, per sign:
//              ♈ finished the to-do list, made another · ♉ still calm, suspiciously · ♊ started four podcasts, solo
//              · ♋ called mom, then her mom · ♌ gave a speech to the barista · ♍ cleaned the grout (toothbrush)
//              · ♎ finally decided, on everything · ♏ solved a mystery nobody asked about · ♐ signed up for three
//              marathons · ♑ did next week's work today · ♒ invented a gadget: it makes coffee · ♓ cried at the latte art
//  49.2        "Nobody is | *sleeping tonight.*"
//  52.4        LESSON: "Energy is great. | *Water* is also great."  COFFEE: PAUSED
//  58.3        "Taurus? | *Still calm.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CREAM = '#fff4e2', RED = '#e23d4e', WOOD = '#c98f2a', COFFEE = '#8a4a2e'

const CUP = [
  '..s.s.s...',
  '.s.s.s....',
  'WWWWWWWW..',
  'WCCCCCCWWW',
  'WWWWWWWW.W',
  'WWWWWWWWWW',
  'WWWWWWWW..',
  '.WWWWWW...',
]
const CUP_C = { W: CREAM, C: COFFEE, s: 'rgba(239,230,214,0.75)' }
const LATTE = [
  'WWWWWWWWWWWW',
  'WCCCCCCCCCCW',
  'WCCHHCCHHCCW',
  'WCHHHHHHHHCW',
  'WCCHHHHHHCCW',
  'WCCCHHHHCCCW',
  'WCCCCHHCCCCW',
  'WCCCCCCCCCCW',
  '.WWWWWWWWWW.',
]
const LATTE_C = { W: CREAM, C: '#c98f6a', H: '#fff4e2' }
const BRUSH = ['BBBBBBBBBBBB....', 'BBBBBBBBBBBBWWWW', '............WWWW']
const BRUSH_C = { B: SKYB, W: '#ffffff' }
const MAG = [
  '..KKKK....',
  '.KSSSSK...',
  'KSSWSSSK..',
  'KSWSSSSK..',
  'KSSSSSSK..',
  '.KSSSSK...',
  '..KKKKBB..',
  '......BBB.',
  '.......BBB',
]
const MAG_C = { K: GOLD, S: SKYB, W: '#fff', B: COFFEE }
const MEDAL = ['RR...RR', '.RR.RR.', '..RRR..', '..YYY..', '.YYYYY.', '.YYWYY.', '.YYYYY.', '..YYY..']
const MEDAL_C = { R: '#6fc3ff', Y: GOLD, W: CREAM }
const PHONE = ['KKKKKK', 'KSSSSK', 'KSSSSK', 'KSSSSK', 'KSSSSK', 'KSSSSK', 'KKGGKK']
const PHONE_C = { K: '#2a2350', S: SKYB, G: '#6b62a8' }
const MIC = ['.KKK.', 'KGGGK', 'KGGGK', 'KGGGK', '.KKK.', '..B..', '..B..', '..B..', '.BBB.']
const MIC_C = { K: INK, G: '#9aa5c4', B: '#6b62a8' }

function list(x, cx, cy, k, lt, title) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-140, -180, 280, 360); x.fillStyle = CREAM; x.fillRect(-132, -172, 264, 344)
  x.fillStyle = INK; x.font = `800 28px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(title, 0, -140)
  for (let i = 0; i < 5; i++) {
    const y = -90 + i * 56
    x.fillStyle = '#b9b0a0'; x.fillRect(-70, y - 6, 160, 12)
    x.fillStyle = INK; x.fillRect(-110, y - 16, 30, 30); x.fillStyle = '#fff'; x.fillRect(-106, y - 12, 22, 22)
    if (lt > 0.3 + i * 0.2) { x.fillStyle = '#2fc79a'; x.fillRect(-104, y - 4, 8, 8); x.fillRect(-98, y + 2, 8, 6); x.fillRect(-92, y - 8, 8, 12) }
  }
  x.restore()
}
function papers(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  for (let i = 0; i < 8; i++) { x.fillStyle = INK; x.fillRect(-120 + (i % 2) * 6, 120 - i * 26, 240, 24); x.fillStyle = i % 2 ? CREAM : '#efe2c8'; x.fillRect(-116 + (i % 2) * 6, 122 - i * 26, 232, 20) }
  const s = clamp((lt - 1.0) / 0.25)
  if (s > 0) {
    x.save(); x.translate(10, -120); x.rotate(-0.15); x.scale(2 - s, 2 - s); x.globalAlpha *= s
    x.strokeStyle = RED; x.lineWidth = 8; x.strokeRect(-110, -40, 220, 80)
    x.fillStyle = RED; x.font = `800 52px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('DONE', 0, 4)
    x.restore()
  }
  x.restore()
}
function gadget(x, cx, cy, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-130, -150, 260, 260); x.fillStyle = '#9aa5c4'; x.fillRect(-122, -142, 244, 244)
  x.fillStyle = '#6b62a8'; x.fillRect(-100, -120, 200, 70)
  for (let i = 0; i < 3; i++) { x.fillStyle = [RED, GOLD, MINT][i]; x.fillRect(-80 + i * 60, -100, 30, 30 * (0.6 + 0.4 * Math.abs(Math.sin(t * 6 + i)))) }
  x.fillStyle = INK; x.fillRect(-30, -40, 60, 40); x.fillStyle = COFFEE; x.fillRect(-6, 0, 12, 20 + 10 * Math.abs(Math.sin(t * 8)))
  x.fillStyle = INK; x.fillRect(-150, 110, 300, 20)
  x.restore()
  drawBits(x, CUP, CUP_C, cx, cy + 70 * k, 9 * k)
}

const CAMEOS = [
  { sign: 'aries', cap: 'Finished the to-do list. | *Made another.*', mood: 'sparkle', look: [1, 0], star: { x: -180 }, hops: [0.4, 0.8, 1.2, 1.6],
    front(x, t, lt, P) {
      list(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt, lt > 1.5 ? 'LIST #2' : 'TO DO')
      label(x, 790, 1100, 'TIME: 9:04 A.M.', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Still calm. | *Suspiciously* calm.', mood: 'sleepy', star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, CUP, CUP_C, 790, 980, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 760, 'VIBE: UNBOTHERED', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 30, bg: '#5fd068', rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1120, 'CUP #3', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: CREAM, rot: -0.04 })
    } },
  { sign: 'gemini', cap: 'Started four podcasts. | *All solo.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, MIC, MIC_C, 790, 990, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const n = Math.min(4, 1 + Math.floor(Math.max(0, lt - 0.3) / 0.45))
      label(x, 790, 780, `SHOW #${n}`, pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 36, bg: GOLD, rot: 0.04 })
      bubble(x, 330, 620, 'ep 1: | your sign', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 34, tail: 'br' })
    } },
  { sign: 'cancer', cap: 'Called mom. | *Then her mom.*', mood: 'heart', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, PHONE, PHONE_C, 790, 930, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.1 * Math.sin(t * 12) * (lt < 1.2 ? 1 : 0) })
      label(x, 790, 720, lt > 1.2 ? 'CALLING: GRANDMA' : 'CALLING: MOM', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 30, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 790, 900, P.t0 + 1.6, { n: 4, life: 1.4, spread: 160, cell: 6, seed: 2 })
    } },
  { sign: 'leo', cap: 'Gave a speech | to *the barista.*', mood: 'sparkle', star: { x: -170 }, hops: [1.0],
    front(x, t, lt, P) {
      bubble(x, 760, 640, 'as a Leo, | I’d like to | thank...', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 34, tail: 'bl' })
      const k = pop01(t, P.t0 + 0.8, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'virgo', 820, 1010, 170 * k, { mood: lt > 1.6 ? 'eyeroll' : 'neutral', look: [-1, 0], seed: 13, glyph: false })
      label(x, 820, 1150, 'BARISTA', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 28, bg: CREAM, rot: 0.04 })
    } },
  { sign: 'virgo', cap: 'Cleaned the kitchen. | Then *the grout.*', mood: 'squint', look: [1, 1], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.globalAlpha *= k
        for (let i = 0; i < 4; i++) for (let j = 0; j < 3; j++) { x.fillStyle = INK; x.fillRect(640 + i * 80, 940 + j * 80, 80, 80); x.fillStyle = (i + j) % 2 ? '#e0f4ff' : '#cfe8f7'; x.fillRect(644 + i * 80, 944 + j * 80, 72, 72) }
        x.restore()
      }
      drawBits(x, BRUSH, BRUSH_C, 790 + Math.sin(t * 22) * 30, 1022, 14 * k, { rot: -0.2 })
      sparkles(x, t, 790, 1040, P.t0 + 1.4, 6, 120, 0.5)
      label(x, 790, 790, 'TOOTHBRUSH: YES', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Finally decided. | *On everything.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', star: { x: -170 }, hops: [0.6, 1.0, 1.4],
    front(x, t, lt, P) {
      const W = ['pasta.', 'blue.', 'the cat.', 'YES.']
      const n = Math.min(3, Math.floor(Math.max(0, lt - 0.2) / 0.4))
      bubble(x, 780, 720, W[n], pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 52, tail: 'bl' })
      label(x, 790, 960, 'DECIDED: ALL OF IT', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Solved a mystery. | *Nobody asked.*', mood: lt => lt > 1.4 ? 'wink' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, MAG, MAG_C, 780 + Math.sin(t * 3) * 20, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 640, 'it was | the cat.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, col: LAV, tail: 'bl' })
      label(x, 790, 1100, 'CASE: CLOSED', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 32, bg: RED, color: CREAM, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Signed up | for *three marathons.*', mood: 'sparkle', star: { x: -170 }, hops: [0.5, 0.9, 1.3, 1.7],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) drawBits(x, MEDAL, MEDAL_C, 700 + i * 110, 900 + (i % 2) * 40, 15 * pop01(t, P.t0 + 0.3 + i * 0.3, 0.3, 2), { rot: Math.sin(t * 3 + i) * 0.12 })
      label(x, 800, 700, 'THIS WEEKEND', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 34, bg: GOLD, rot: 0.05 })
    } },
  { sign: 'capricorn', cap: 'Did next week’s work. | *Today.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      papers(x, 790, 920, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 1120, 'MONDAY: DONE', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: '#2fc79a', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Invented a gadget. | It *makes coffee.*', mood: 'sparkle', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      gadget(x, 790, 880, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      label(x, 790, 640, 'PATENT PENDING', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 32, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Cried at | the *latte art.*', mood: 'wide', tears: lt => lt < 0.9 ? 2 : 3, look: [1, 1], star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, LATTE, LATTE_C, 790, 950, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 700, 'it’s a | HEART', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 42, tail: 'bl' })
      hearts(x, t, 790, 900, P.t0 + 1.3, { n: 5, life: 1.6, spread: 160, cell: 6, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2t0043', key: 'G', accent: '#e8a24a', ending: 'lesson',
  title: 'Third coffee? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Nobody is | *sleeping tonight.*' },
  lesson: { text: 'Energy is great. | *Water* is also great.', chip: 'COFFEE: PAUSED' },
  last: {
    text: 'Taurus? | *Still calm.*',
    draw(x, t, lt) { drawBits(x, CUP, CUP_C, 540, 1580, 16 * pop01(t, t - lt + 0.7, 0.35, 2)) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
