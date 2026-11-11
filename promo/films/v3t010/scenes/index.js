// v3t010: THE SIGNS AS… v3, SOLO film, "Your Libra friend | be like." (~51 s vertical, signs3kit social cut, music: lofi · G)
// One sign the whole way through: nine moments with a Libra friend, each pushed to the most extreme (and lovable) version.
//   0.0–3.6    "Your Libra friend | *be like.*"
//   3.6–37.8   nine cards: says "you pick", then vetoes it · four outfits for a coffee · a tiny fight, Libra held peace talks
//              · took ninety photos, posted none · complimented a stranger, now besties · one shirt, four hours of shopping
//              · played matchmaker, checked both your charts · can't say no, now in four book clubs · rough week? surprise picnic
//  37.8        "Charming. | *Undecided.*"
//  41.0        LESSON UNLOCKED: "Keep a Libra friend. | They make life *lovely.*"  STATUS: BALANCED
//  46.9        "Where to next? | *Still deciding.*" (lesson ending).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ROSE = '#ff8fb1', RED = '#e23d4e', BROWN = '#8a4a2e', GREEN = '#5fd068'

const SHIRT = [
  'SS.SSSS.SS',
  'SSSSSSSSSS',
  '.SSSSSSSS.',
  '..SSSSSS..',
  '..SSSSSS..',
  '..SSSSSS..',
  '..SSSSSS..',
]
const CAMERA = [
  '...KKK....',
  'KKKKKKKKKK',
  'KGGGGGGGGK',
  'KGGLLLLGGK',
  'KGLLWWLLGK',
  'KGLLWWLLGK',
  'KGGLLLLGGK',
  'KKKKKKKKKK',
]
const CAMERA_C = { K: '#2a2350', G: '#9aa5c4', L: '#6b62a8', W: SKYB }
const BOOK = ['BBBBBBBB', 'BWWWWWWB', 'BWKKKKWB', 'BWWWWWWB', 'BWKKKWWB', 'BWWWWWWB', 'BBBBBBBB']
const FLOWER = ['.P.P.', 'PPYPP', '.PPP.', '..G..', '.GG..', '..G..']
const BASKET = [
  '..KKKKKK..',
  '.K......K.',
  'BBBBBBBBBB',
  'BbBbBbBbBB',
  'BBBBBBBBBB',
  '.BbBbBbBB.',
  '..BBBBBB..',
]
const BASKET_C = { K: BROWN, B: '#d8a45a', b: BROWN }
const FLAG = ['K.', 'KWWWW', 'KWWWW', 'K.', 'K.', 'K.']

// a little chart wheel
const WHEEL = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
function chart(x, cx, cy, r, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.3)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 6, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { x.fillStyle = WHEEL[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, (i / 12) * Math.PI * 2, ((i + 1) / 12) * Math.PI * 2); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, r * 0.6, 0, Math.PI * 2); x.fill()
  x.restore()
}

const CAMEOS = [
  { sign: 'libra', cap: 'Says “you pick.” | Then *vetoes it.*', mood: lt => lt > 1.3 ? 'squint' : 'happy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      bubble(x, 380, 600, 'you pick!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 42, tail: 'bc' })
      label(x, 800, 760, 'PIZZA?', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 40, bg: GOLD, rot: 0.05 })
      label(x, 800, 900, 'NOODLES?', pop01(t, P.t0 + 1.0, 0.3, 2), { size: 40, bg: MINT, rot: -0.05 })
      if (lt > 1.4) { x.save(); x.strokeStyle = RED; x.lineWidth = 9; for (const y of [760, 900]) { x.beginPath(); x.moveTo(690, y - 30); x.lineTo(910, y + 30); x.stroke() } x.restore() }
      bubble(x, 800, 1090, 'hmm… no.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, col: LAV, tail: 'bl' })
    } },
  { sign: 'libra', cap: 'Brought four outfits. | For *a coffee.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', star: { x: -180 }, hops: [1.3],
    front(x, t, lt, P) {
      const C = [ROSE, LAV, MINT, GOLD]
      for (let i = 0; i < 4; i++) drawBits(x, SHIRT, { S: C[i] }, 690 + (i % 2) * 200, 720 + Math.floor(i / 2) * 230, 18 * pop01(t, P.t0 + 0.2 + i * 0.25, 0.3, 2), { rot: (i % 2 ? 0.08 : -0.08) })
      label(x, 790, 1110, 'JUST A COFFEE', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: BONE, rot: -0.04 })
    } },
  { sign: 'libra', cap: 'You had a tiny fight. | Libra held *peace talks.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', star: { x: 0, y: -40, s: 260 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) {
        const calm = lt > 1.4
        signChar(x, t, 'aries', 260, 960, 190 * k, { mood: calm ? 'happy' : 'squint', look: [1, 0], seed: 21, glyph: false })
        signChar(x, t, 'scorpio', 820, 960, 190 * k, { mood: calm ? 'happy' : 'squint', look: [-1, 0], seed: 22, glyph: false })
      }
      drawBits(x, FLAG, { K: BROWN, W: '#ffffff' }, 720, 640, 18 * pop01(t, P.t0 + 0.7, 0.3, 2))
      label(x, 540, 1130, 'PEACE TREATY: SIGNED', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
      if (lt > 1.4) hearts(x, t, 540, 900, P.t0 + 1.5, { n: 5, life: 1.6, spread: 300, cell: 7, seed: 3 })
    } },
  { sign: 'libra', cap: 'Took ninety photos. | *Posted none.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, CAMERA, CAMERA_C, 800, 820, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (Math.floor(lt * 6) % 2 === 0 && lt > 0.4 && lt < 1.6) { x.save(); x.globalAlpha = 0.35; x.fillStyle = '#ffffff'; x.fillRect(110, 480, 860, 760); x.restore() }
      const n = Math.min(90, Math.floor(Math.max(0, lt - 0.3) * 60))
      label(x, 800, 1040, `PHOTOS: ${n}`, pop01(t, P.t0 + 0.4, 0.3, 2), { size: 36, bg: ROSE, rot: 0.05, font: MONO, weight: 700 })
      label(x, 800, 620, 'POSTED: 0', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Complimented a stranger. | Now *they’re besties.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'sagittarius', 790, 930, 220 * k, { mood: lt > 1.2 ? 'heart' : 'wide', look: [-1, 0], seed: 23, glyph: false, hops: [P.t0 + 1.3] })
      bubble(x, 560, 620, 'love your | scarf!', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 38, tail: 'bl' })
      label(x, 790, 1120, 'BESTIES SINCE 2:04', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Shopping for one shirt. | *Four hours.*', mood: lt => lt > 1.4 ? 'sleepy' : 'happy', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const C = [ROSE, LAV, ROSE, '#ff9ab8']
      const i = Math.min(3, Math.floor(lt / 0.5))
      drawBits(x, SHIRT, { S: C[i] }, 790, 860, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 640, `HOUR ${i + 1}`, pop01(t, P.t0 + 0.4, 0.3, 2), { size: 40, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 1100, 'or the pink?', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'libra', cap: 'Played matchmaker. | Checked *both your charts.*', mood: lt => lt > 1.4 ? 'heart' : 'sparkle', star: { x: -180 }, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      chart(x, 700, 780, 90, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      chart(x, 880, 900, 90, pop01(t, P.t0 + 0.5, 0.35, 2), -t)
      label(x, 790, 1100, '✦ IT’S A MATCH', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 790, 860, P.t0 + 1.5, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 4 })
    } },
  { sign: 'libra', cap: 'Can’t say no. | Now in *four book clubs.*', mood: lt => lt > 1.3 ? 'wide' : 'happy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const C = [ROSE, MINT, SKYB, GOLD]
      for (let i = 0; i < 4; i++) drawBits(x, BOOK, { B: C[i], W: '#fff4e2', K: '#b9b0a0' }, 790 + (i % 2 ? 16 : -16), 1060 - i * 110, 16 * pop01(t, P.t0 + 0.3 + i * 0.3, 0.3, 2), { rot: (i % 2 ? 0.05 : -0.05) })
      bubble(x, 380, 600, 'sure! | love that!', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 36, tail: 'bc' })
    } },
  { sign: 'libra', cap: 'Rough week? | Surprise *picnic.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -180 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k <= 0.01) return
      x.save(); x.translate(760, 1090); x.scale(k, k)
      for (let r = 0; r < 3; r++) for (let c = 0; c < 6; c++) { x.fillStyle = (r + c) % 2 ? '#fff4e2' : RED; x.fillRect(-180 + c * 60, -60 + r * 40, 60, 40) }
      x.restore()
    },
    front(x, t, lt, P) {
      drawBits(x, BASKET, BASKET_C, 760, 980, 16 * pop01(t, P.t0 + 0.5, 0.3, 2))
      for (let i = 0; i < 3; i++) drawBits(x, FLOWER, { P: [ROSE, LAV, GOLD][i], Y: GOLD, G: GREEN }, 660 + i * 100, 860, 12 * pop01(t, P.t0 + 0.9 + i * 0.15, 0.3, 2))
      label(x, 790, 640, 'FOR YOU ♡', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 38, bg: ROSE, rot: 0.05 })
      sparkles(x, t, 760, 920, P.t0 + 1.2, 7, 200, 0.5)
    } },
]

const F = makeFilm({
  id: 'v3t010', key: 'G', accent: ROSE, solo: 'libra', ending: 'lesson',
  title: 'Your Libra friend | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Charming. | *Undecided.*', mood: 'heart' },
  lesson: { text: 'Keep a Libra friend. | They make life *lovely.*', chip: 'STATUS: BALANCED' },
  last: {
    text: 'Where to next? | *Still deciding.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 10, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
