// r2t0428: THE SIGNS AS… v3, "The signs | baking bread." (~57 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs in zodiac order, each the most extreme version of itself. Ending: callback.
//   0.0–3.6    "The signs | *baking bread.*"
//   3.6–49.2   ♈ skipped the rising, bread: a brick · ♉ ate the dough, there is no bread · ♊ started sourdough and three
//              other hobbies · ♋ named the starter, it's family now · ♌ a loaf shaped like their own face · ♍ weighed the
//              flour to the grain · ♎ braided it, perfectly symmetrical · ♏ secret ingredient, won't say, ever (a locked
//              box) · ♐ watched one video, opened a bakery · ♑ forty loaves, sold by noon · ♒ invented a new bread, it's
//              blue · ♓ cried while kneading, salty bread
//  49.2        "Twelve loaves. | *One edible.*"
//  52.6        "Aries’ bread? | *Now a doorstop.*"  The brick comes back, holding a door open.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const PAPER = '#fff4e2', ACC = '#ffb34a'

// ── props
const LOAF = [
  '...CCCCCCCC...',
  '.CCcCCCCcCCCC.',
  'CCCCCcCCCCcCCC',
  'CCCCCCCCCCCCCC',
  'CCCCCCCCCCCCCC',
  '.CCCCCCCCCCCC.',
]
const LOAF_C = { C: '#d98a3a', c: '#f2c27a' }
const BRICK_C = { C: '#8a7a6e', c: '#a39488' }
const BLUE_C = { C: '#3f8fe0', c: '#8fe3ff' }
const BRICK = ['CCCCCCCCCCCCCC', 'CcCCCCCCCcCCCC', 'CCCCCCCCCCCCCC', 'CCCCCcCCCCCCCC']
const BOWL = ['.............', 'BBBBBBBBBBBBB', '.BBBBBBBBBBB.', '..BBBBBBBBB..', '....BBBBB....']
const JAR = [
  '..LLLLLLL..',
  '.GGGGGGGGG.',
  'G.........G',
  'GDDDDDDDDDG',
  'GDdDDDDdDDG',
  'GDDDDdDDDDG',
  'GDDdDDDDdDG',
  'GDDDDDDDDDG',
  '.GGGGGGGGG.',
]
const JAR_C = { L: '#8a4a2e', G: '#bfe8ff', D: '#f3e2b8', d: '#ffffff' }
const BRAID = [
  '..CC..CC..CC..CC..',
  '.CccCCccCCccCCccC.',
  'CCcCCcCCcCCcCCcCCC',
  '.CCccCCccCCccCCcC.',
  '..CC..CC..CC..CC..',
]
const LOCK = ['..KKKK..', '.K....K.', '.K....K.', 'GGGGGGGG', 'GGGKKGGG', 'GGGKKGGG', 'GGGGGGGG']

function card(x, cx, cy, w, h, k, rot, fn, face = PAPER) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2 - 5, w + 10, h + 10)
  x.fillStyle = face; x.fillRect(-w / 2, -h / 2, w, h)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  if (fn) fn(x)
  x.restore()
}
/** a door, drawn from its hinge side, open by a (0..1) */
function door(x, cx, base, k, a) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, base); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -420, 300, 420)
  x.fillStyle = '#2a2350'; x.fillRect(-140, -410, 280, 410)
  const w = 280 * (1 - 0.65 * a)
  x.fillStyle = INK; x.fillRect(-145, -415, w + 10, 420)
  x.fillStyle = '#c98f5a'; x.fillRect(-140, -410, w, 410)
  x.fillStyle = GOLD; x.fillRect(-140 + w - 34, -220, 18, 18)
  x.restore()
}

const L = { x: -170 }, R = { x: 170 }
const CAMEOS = [
  { sign: 'aries', cap: 'Skipped the rising. | Bread: *a brick.*', mood: lt => lt > 1.4 ? 'wide' : 'sparkle', look: [1, 0], star: L, hops: [0.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.9, 0.2, 1.4)
      drawBits(x, BRICK, BRICK_C, 790, 1040 - (1 - k) * 200, 22 * k)
      label(x, 790, 680, 'RISE TIME: NO', pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 36, bg: '#ff6b5a', rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 900, 'DENSITY: CONCRETE', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Ate the dough. | *There is no bread.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), eat = clamp((lt - 0.4) / 1.0)
      if (eat < 1 && k > 0.01) { x.save(); x.globalAlpha = k; x.fillStyle = '#f3e2b8'; x.beginPath(); x.ellipse(790, 990, 140 * (1 - eat), 60 * (1 - eat) + 2, 0, Math.PI, 0); x.fill(); x.restore() }
      drawBits(x, BOWL, { B: '#6fc3ff' }, 790, 1030, 22 * k)
      label(x, 790, 720, 'LOAVES: 0', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 40, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 560, 650, 'worth it.', pop01(t, P.t0 + 1.9, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Started a sourdough. | And *three other hobbies.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: lt => [Math.floor(lt * 2) % 2 ? 1 : -1, 0], star: L,
    front(x, t, lt, P) {
      drawBits(x, JAR, JAR_C, 790, 900, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const H = ['+ POTTERY', '+ UKULELE', '+ FRENCH']
      H.forEach((h, j) => label(x, [700, 860, 700][j], 630 + j * 62, h, pop01(t, P.t0 + 0.8 + j * 0.3, 0.25, 2.2), { size: 26, bg: [LAV, MINT, PINK][j], rot: (j - 1) * 0.06, font: MONO, weight: 700 }))
      label(x, 790, 1130, 'STARTER: FORGOTTEN', pop01(t, P.t0 + 1.9, 0.3, 2.2), { size: 28, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Named the starter. | *It’s family now.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, JAR, JAR_C, 790, 900, 20 * k)
      if (k > 0.8) { x.save(); x.fillStyle = INK; x.fillRect(755, 900, 14, 14); x.fillRect(811, 900, 14, 14); x.fillRect(770, 940, 40, 8); x.restore() }
      label(x, 790, 1110, 'DOUGH-LORES, 2 WKS', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 28, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 650, 'say hi to | your cousin!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'leo', cap: 'Shaped the loaf | *like their own face.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: L, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'leo', 790, 920, 260 * k, { mood: 'sparkle', seed: 15, glyph: false, glow: 0 })
      if (k > 0.01) { x.save(); x.globalAlpha = 0.45 * k; x.fillStyle = '#d98a3a'; x.beginPath(); x.arc(790, 900, 120 * k, 0, Math.PI * 2); x.fill(); x.restore() }
      label(x, 790, 660, 'SELF-PORTRAIT', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 900, P.t0 + 1.2, 8, 190, 0.2)
      label(x, 790, 1120, 'TOO PRETTY TO EAT', pop01(t, P.t0 + 1.8, 0.3, 2.2), { size: 28, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Weighed the flour. | *To the grain.*', mood: 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      card(x, 790, 960, 300, 160, pop01(t, P.t0 + 0.2, 0.3, 2), 0, x => {
        x.fillStyle = '#140c30'; x.fillRect(-120, -50, 240, 70)
        const g = lt < 1.6 ? 499.9 + Math.floor(lt * 7) % 3 * 0.001 : 500
        x.fillStyle = MINT; x.font = `700 40px ${MONO}`; x.fillText(`${g.toFixed(3)} g`, 0, -14)
      }, '#9aa5c4')
      if (pop01(t, P.t0 + 0.4, 0.3, 2) > 0.5) { x.save(); x.fillStyle = PAPER; x.beginPath(); x.ellipse(790, 870, 110, 50, 0, Math.PI, 0); x.fill(); x.restore() }
      label(x, 790, 680, 'TWEEZERS: OUT', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      if (lt > 1.6) label(x, 790, 1130, 'PERFECT.', pop01(t, P.t0 + 1.65 * 1.29, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Braided it. | *Perfectly symmetrical.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      drawBits(x, BRAID, LOAF_C, 790, 920, 17 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const k = pop01(t, P.t0 + 0.9, 0.3, 2)
      if (k > 0.01) { x.save(); x.globalAlpha = k; x.setLineDash([12, 10]); x.strokeStyle = BONE; x.lineWidth = 4; x.beginPath(); x.moveTo(790, 780); x.lineTo(790, 1060); x.stroke(); x.restore() }
      label(x, 790, 680, 'LEFT = RIGHT', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 36, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1120, 'MEASURED: 6 TIMES', pop01(t, P.t0 + 1.8, 0.3, 2.2), { size: 28, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Secret ingredient? | *Won’t say. Ever.*', mood: lt => lt > 1.2 ? 'wink' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      card(x, 790, 940, 300, 190, k, 0.03, x => { x.fillStyle = '#57338c'; x.fillRect(-150, -95, 300, 40); x.fillStyle = GOLD; x.font = `700 26px ${MONO}`; x.fillText('RECIPE BOX', 0, -75) }, '#6b3fa8')
      drawBits(x, LOCK, { K: '#9aa5c4', G: GOLD }, 790, 960, 12 * pop01(t, P.t0 + 0.7, 0.25, 2.4))
      bubble(x, 790, 690, 'it’s love. | (it’s not.)', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 40, col: LAV, tail: 'bl' })
      label(x, 790, 1130, 'INGREDIENT 7: ???', pop01(t, P.t0 + 1.8, 0.3, 2.2), { size: 30, bg: '#c97bff', color: PAPER, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Watched one video. | *Opened a bakery.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', star: R, hops: [1.1],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.7, 0.3, 2)
      card(x, 330, 760, 360, 150, k, -0.03, x => {
        x.fillStyle = INK; x.font = `800 40px ${INTER}`; x.fillText('SAG’S BREAD', 0, -18)
        x.fillStyle = '#ff6b5a'; x.font = `700 26px ${MONO}`; x.fillText('OPEN TODAY!', 0, 34)
      }, '#ff9a4a')
      drawBits(x, LOAF, LOAF_C, 280, 1010, 12 * pop01(t, P.t0 + 1.2, 0.25, 2)); drawBits(x, LOAF, LOAF_C, 400, 1030, 12 * pop01(t, P.t0 + 1.4, 0.25, 2))
      label(x, 330, 610, 'EXPERIENCE: 9 MIN', pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 28, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Baked forty loaves. | *Sold out by noon.*', mood: lt => lt > 1.6 ? 'happy' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      for (let j = 0; j < 6; j++) drawBits(x, LOAF, LOAF_C, 700 + (j % 3) * 95, 1060 - Math.floor(j / 3) * 80, 9 * pop01(t, P.t0 + 0.2 + j * 0.1, 0.25, 2))
      label(x, 790, 820, '$4 EACH', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 36, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 680, 'SOLD OUT 11:58', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 34, bg: '#ff6b5a', color: PAPER, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Invented a new bread. | It’s *blue.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      drawBits(x, LOAF, BLUE_C, 790, 920, 20 * pop01(t, P.t0 + 0.5, 0.3, 2))
      sparkles(x, t, 790, 920, P.t0 + 0.7, 8, 170, 0.6, [SKYB, BONE, MINT])
      label(x, 790, 690, 'PATENT PENDING', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 34, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1110, 'TASTES LIKE: BLUE', pop01(t, P.t0 + 1.8, 0.3, 2.2), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Cried while kneading. | *Salty bread.*', mood: 'wide', tears: 3, look: [1, 0], star: L,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), sq = 1 + 0.12 * Math.sin(t * 7)
      if (k > 0.01) { x.save(); x.fillStyle = INK; x.beginPath(); x.ellipse(790, 1000, 136 * k * sq, 70 * k / sq, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#f3e2b8'; x.beginPath(); x.ellipse(790, 1000, 130 * k * sq, 64 * k / sq, 0, 0, Math.PI * 2); x.fill(); x.restore() }
      label(x, 790, 720, 'SALT: TEARS ONLY', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 32, bg: '#b7a6ff', rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 860, 'it’s just… | so soft', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0428', key: 'G', accent: ACC, ending: 'callback',
  title: 'The signs | *baking bread.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve loaves. | *One edible.*' },
  last: {
    text: 'Aries’ bread? | *Now a doorstop.*',
    draw(x, t, lt) {
      const t0 = t - lt, k = pop01(t, t0 + 0.3, 0.45, 1.8)
      if (k <= 0.01) return
      door(x, 700, 1400, k, ease.outCubic(prog(lt, 0.9, 1.4)))
      drawBits(x, BRICK, BRICK_C, 680, 1380, 14 * pop01(t, t0 + 1.2, 0.25, 1.6))
      signChar(x, t, 'aries', 330, 1250, 260 * k, { mood: lt > 1.6 ? 'sparkle' : 'happy', look: [1, 0], seed: 31, hops: [t0 + 1.6] })
      label(x, 700, 900, 'FINALLY USEFUL', pop01(t, t0 + 1.8, 0.3, 2.4), { size: 38, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
