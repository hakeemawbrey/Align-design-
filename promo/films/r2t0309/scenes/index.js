// r2t0309: star_talk, ROLLCALL, "The signs | apple picking." (signs3kit social cut, music: lofi · D). Ending: callback (Taurus eats Aquarius' blue apple).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, notes,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CREAM = '#fff4e2'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })
/** a square sticky note with a few lines of text */
function note(x, cx, cy, k, lines, { rot = -0.05, bg = '#ffe76a', size = 34 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-140, -134, 296, 296)
  x.fillStyle = INK; x.fillRect(-152, -152, 304, 304); x.fillStyle = bg; x.fillRect(-144, -144, 288, 288)
  x.fillStyle = INK; x.font = `800 ${size}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, 0, (i - (lines.length - 1) / 2) * size * 1.25))
  x.restore()
}
/** a pixel phone with a header bar and chat chips: lines = [[text, colour, k, right?], …] */
function phone(x, cx, cy, k, { head = '', headCol = MINT, lines = [], rot = 0.05 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  if (head) { x.fillStyle = headCol; x.fillRect(-100, -156, 200, 46); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -132) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach(([txt, col, kk, right], i) => {
    if (kk <= 0.01) return
    x.font = `700 24px ${MONO}`; const w = x.measureText(txt).width + 24
    x.save(); x.translate(right ? 96 - w : -96, -60 + i * 64); x.scale(kk, kk)
    x.fillStyle = col; x.fillRect(0, -22, w, 44); x.fillStyle = INK; x.fillText(txt, 12, 2)
    x.restore()
  })
  x.restore()
}
/** a crossed-out sticker swapped for a new one */
function swapLabel(x, cx, cy, lt, at, from, to, { size = 40, fromBg = '#9aa5c4', toBg = MINT } = {}) {
  if (lt < at) { L(x, cx, cy, from, 1, fromBg, -0.04, size); return }
  const p = clamp((lt - at) / 0.25)
  if (p < 1) {
    L(x, cx, cy, from, 1, fromBg, -0.04, size)
    x.save(); x.strokeStyle = RED; x.lineWidth = 10; x.lineCap = 'round'; x.beginPath(); x.moveTo(cx - 150, cy + 10); x.lineTo(cx - 150 + 300 * p, cy - 10); x.stroke(); x.restore()
    return
  }
  L(x, cx, cy, to, pop01(lt, at + 0.3, 0.3, 2.4), toBg, 0.04, size)
}
/** little "z z z" drifting up */
function zzz(x, t, cx, cy, { alpha = 1, size = 40 } = {}) {
  x.save(); x.fillStyle = BONE; x.font = `800 ${size}px ${INTER}`; x.textAlign = 'center'
  for (let i = 0; i < 3; i++) { const ph = ((t * 0.6 + i / 3) % 1 + 1) % 1; x.globalAlpha = alpha * Math.sin(Math.PI * ph); x.fillText('z', cx + i * 26 + Math.sin(ph * 6) * 8, cy - ph * 120) }
  x.restore()
}
const ST = { x: -170 }

const ACC = '#ff6b5a'
const APPLE = ['....B.LL', '....BLL.', '.AAABAA.', 'AWAAAAAA', 'AWAAAAAA', 'AAAAAAAA', 'AAAAAAAA', '.AAAAAA.', '..AA.A..']
const ap = c => ({ A: c, B: '#8a4a2e', L: '#5fd068', W: '#ffffff', C: '#fff4e2' })
const CORE = ['...B....', '...B....', '.AAAA...', '..CC....', '..CC....', '..CC....', '.AAAA...']
const BASKET = ['.KKKKKKKKKK.', 'K..........K', 'KKKKKKKKKKKK', 'KWBWBWBWBWBK', 'KBWBWBWBWBWK', 'KWBWBWBWBWBK', '.KKKKKKKKKK.']
const BASKET_C = { K: INK, W: '#e8a24a', B: '#8a4a2e' }
const PIE = ['...CCCCCC...', '.CCDCCCCDCC.', 'CCCCCDCCCCCC', 'CDCCCCCCCDCC', 'KKKKKKKKKKKK', '.KTTTTTTTTK.']
const SCALE = ['.....KK.....', '.....KK.....', 'KKKKKKKKKKKK', 'K....KK....K', 'K....KK....K', 'KK...KK...KK', 'KKK..KK..KKK', '.....KK.....', '...KKKKKK...']
const GLASS = ['..KKKK...', '.K....K..', 'K......K.', 'K......K.', 'K......K.', '.K....K..', '..KKKKKK.', '......KK.', '.......KK']

const CAMEOS = [
  { sign: 'aries', cap: 'Picked the whole row. | *In four minutes.*', mood: 'sparkle', star: { x: -150 }, hops: [0.3, 0.6, 0.9, 1.2],
    front(x, t, lt, P) {
      for (let i = 0; i < 8; i++) drawBits(x, APPLE, ap(RED), 680 + (i % 4) * 75, 720 + Math.floor(i / 4) * 85, 8 * pop01(t, P.t0 + 0.2 + i * 0.12, 0.2, 2.2))
      drawBits(x, BASKET, BASKET_C, 790, 980, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 1120, 'ROW 1: DONE', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: 'taurus', cap: 'Picked one apple. | *Ate forty.*', mood: lt => lt > 1.4 ? 'sleepy' : 'happy', star: ST,
    front(x, t, lt, P) {
      drawBits(x, BASKET, BASKET_C, 790, 1000, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, APPLE, ap(RED), 790, 920, 10 * pop01(t, P.t0 + 0.4, 0.3, 2))
      for (let i = 0; i < 5; i++) drawBits(x, CORE, ap(RED), 640 + i * 70, 1110, 7 * pop01(t, P.t0 + 0.8 + i * 0.12, 0.2, 2.2), { rot: (i - 2) * 0.2 })
      L(x, 790, 700, 'BASKET: 1 · EATEN: 40', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, 0.04, 28)
    } },
  { sign: 'gemini', cap: 'Picked one of | *every single kind.*', mood: lt => Math.floor(lt * 2.4) % 2 ? 'wink' : 'sparkle', star: ST,
    front(x, t, lt, P) {
      const C = [RED, '#5fd068', '#ffd23a', '#ff9a4a', PINK, '#c97b5a']
      for (let i = 0; i < 6; i++) drawBits(x, APPLE, ap(C[i]), 690 + (i % 3) * 100, 760 + Math.floor(i / 3) * 120, 10 * pop01(t, P.t0 + 0.3 + i * 0.2, 0.25, 2.2))
      L(x, 790, 1060, 'KINDS: ALL OF THEM', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 28)
    } },
  { sign: 'cancer', cap: 'Baked pies | *for the whole orchard.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) drawBits(x, PIE, { C: '#e8a24a', D: '#8a4a2e', K: INK, T: '#9aa5c4' }, 790, 1060 - i * 90, 15 * pop01(t, P.t0 + 0.2 + i * 0.3, 0.3, 2))
      L(x, 790, 700, 'PIES: 37 · STILL GOING', pop01(t, P.t0 + 1.3, 0.3, 2.4), PINK, 0.04, 28)
      hearts(x, t, 790, 860, P.t0 + 1.5, { n: 4, life: 1.6, spread: 200, cell: 7, seed: 4 })
    } },
  { sign: 'leo', cap: 'Found the shiniest apple. | *Did a photoshoot.*', mood: 'sparkle', star: ST, hops: [0.8, 1.5],
    front(x, t, lt, P) {
      drawBits(x, APPLE, ap(RED), 790, 880, 16 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.1 })
      for (const d of [0.7, 1.2, 1.7]) if (lt > d && lt < d + 0.12) { x.save(); x.fillStyle = 'rgba(255,250,235,0.35)'; x.fillRect(110, 480, 860, 740); x.restore() }
      sparkles(x, t, 790, 880, P.t0 + 0.6, 7, 150, 0.3)
      L(x, 790, 1090, 'PHOTOS: 212', pop01(t, P.t0 + 1.0, 0.3, 2.4), '#ffb34a', -0.04, 34)
    } },
  { sign: 'virgo', cap: 'Inspected every apple. | *Approved two.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, APPLE, ap(RED), 790, 860, 14 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, GLASS, { K: INK }, 760 + 40 * Math.sin(t * 3), 830, 14 * pop01(t, P.t0 + 0.4, 0.3, 2))
      L(x, 790, 650, `REJECTED: ${Math.round(300 * ease.outCubic(prog(lt, 0.4, 1.6)))}`, pop01(t, P.t0 + 0.5, 0.3, 2), '#9aa5c4', 0.04, 32)
      L(x, 790, 1080, 'APPROVED: 2', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: 'libra', cap: 'Still choosing | *between two apples.*', mood: lt => lt > 1.6 ? 'squint' : 'happy', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const tilt = 0.12 * Math.sin(t * 3)
      x.save(); x.translate(790, 920); x.rotate(tilt); x.translate(-790, -920)
      drawBits(x, SCALE, { K: GOLD }, 790, 960, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, APPLE, ap(RED), 700, 830, 9 * pop01(t, P.t0 + 0.4, 0.3, 2))
      drawBits(x, APPLE, ap('#5fd068'), 880, 830, 9 * pop01(t, P.t0 + 0.5, 0.3, 2))
      x.restore()
      L(x, 790, 640, 'HOUR 3', pop01(t, P.t0 + 1.4, 0.3, 2.4), PINK, 0.04, 36)
    } },
  { sign: 'scorpio', cap: 'Only wanted | *the forbidden one.*', mood: lt => lt > 1.2 ? 'wink' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, APPLE, ap('#7a1f3a'), 790, 880, 14 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 680, 'DO NOT PICK', pop01(t, P.t0 + 0.5, 0.3, 2), RED, 0.05, 36)
      bubble(x, 790, 1070, 'oh, now I must.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 36, col: LAV, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Wandered off. | *Found another orchard.*', mood: 'sparkle', star: { x: 170 }, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      const n = Math.min(3, 1 + Math.floor(Math.max(0, lt - 0.3) / 0.5))
      L(x, 320, 700, `ORCHARD #${n}`, pop01(t, P.t0 + 0.3, 0.3, 2), GOLD, -0.05, 38)
      bubble(x, 320, 900, 'be right back!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 36, tail: 'br' })
      L(x, 320, 1080, 'BACK: NEVER', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, 0.04, 30)
    } },
  { sign: 'capricorn', cap: 'Opened an apple stand. | *By noon.*', mood: lt => lt > 1.5 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 920); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-160, -160, 320, 300); x.fillStyle = '#2fc79a'; x.fillRect(-152, -152, 304, 60)
        x.fillStyle = '#8a4a2e'; x.fillRect(-152, -92, 304, 224); x.fillStyle = INK; x.font = `800 32px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('APPLES', 0, -122)
        x.restore()
        for (let i = 0; i < 6; i++) drawBits(x, APPLE, ap(RED), 700 + (i % 3) * 90, 900 + Math.floor(i / 3) * 80, 7 * k)
      }
      L(x, 790, 650, 'OPEN 9–5 · NO HAGGLING', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, 0.04, 26)
    } },
  { sign: 'aquarius', cap: 'Grew a new apple. | *It’s blue.*', mood: lt => lt > 1.1 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, APPLE, ap('#4a8cff'), 790, 880, 16 * pop01(t, P.t0 + 0.6, 0.35, 2))
      sparkles(x, t, 790, 880, P.t0 + 0.8, 8, 160, 0.4, [SKYB, BONE, MINT])
      L(x, 790, 1090, 'TASTES LIKE: TUESDAY', pop01(t, P.t0 + 1.4, 0.3, 2.4), SKYB, -0.04, 28)
    } },
  { sign: 'pisces', cap: 'Saw a fallen apple. | *Cried* for it.', mood: 'wide', tears: lt => lt < 0.8 ? 2 : 3, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, APPLE, ap(RED), 790, 1080, 12 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 1.4 })
      bubble(x, 790, 760, 'it was so | young', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 38, col: LAV, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0309', key: 'D', accent: ACC, ending: 'callback',
  title: 'The signs | *apple picking.*',
  cameos: CAMEOS,
  group: { cap: 'Baskets: full. | *Taurus: fuller.*' },
  last: {
    text: 'Taurus ate | *the blue one too.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.2, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'taurus', 380, 1080, 280 * k, { mood: lt > 2.0 ? 'sleepy' : 'happy', seed: 7, hops: [t0 + 1.6] })
      const eaten = lt > 1.8
      if (!eaten) drawBits(x, APPLE, ap('#4a8cff'), 740, 1080, 16 * pop01(t, t0 + 0.5, 0.4, 2))
      else drawBits(x, CORE, ap('#4a8cff'), 740, 1100, 20)
      if (lt > 1.8) sparkles(x, t, 740, 1080, t0 + 1.8, 8, 160, 0.3, [SKYB, BONE])
      if (lt > 2.1) L(x, 740, 900, 'TASTED LIKE TUESDAY', pop01(t, t0 + 2.1, 0.3, 2.4), SKYB, 0.04, 30)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
