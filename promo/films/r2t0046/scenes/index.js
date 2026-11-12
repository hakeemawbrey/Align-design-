// r2t0046: THE SIGNS AS… v3, "The signs in | a candy store." (~57 s vertical, signs3kit social cut, music: lofi · C)
// Twelve signs, zodiac order, each the most extreme version of itself at the pick-n-mix. Ending: callback.
//   0.0–3.6    "The signs in | a *candy store.*"
//   3.6–49.2   ♈ ate it in the queue, paid for wrappers · ♉ filled a bag the size of themself · ♊ two bags, two
//              personalities · ♋ found their childhood candy, called mom · ♌ asked for a bar with their face on it
//              · ♍ sorted the pick-n-mix by sign · ♎ bought it for the wrapper · ♏ the sourest one, ate it smiling
//              · ♐ candy from every country · ♑ bought in bulk, opened a shop · ♒ invented pickle chocolate
//              · ♓ the lollipop was too pretty to eat (sobbing)
//  49.2        "Sugar rush: | *all twelve.*"
//  52.6        callback: "Capricorn sold it | all *back to them.*"  (the shop sign returns: SOLD OUT)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', ORANGE = '#ffb34a', GREEN = '#5fd068', PURP = '#c97bff', LEMON = '#f6f05a'
const SIGNCOL = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']

// ── props
const WRAPPER = [
  'P..PPPPPP..P',
  'PPPPWPPPPPPP',
  'P..PPPPPP..P',
]
const BAG = [
  '..KKKKKKKK..',
  '.KBBBBBBBBK.',
  'KBBBBBBBBBBK',
  'BBRBBYBBGBBB',
  'BBBBBBBBBBBB',
  'BBYBBGBBRBBB',
  'BBBBBBBBBBBB',
  'BBGBBRBBYBBB',
  'BBBBBBBBBBBB',
  '.BBBBBBBBBB.',
]
const BAG_C = { K: '#d8dbe8', B: '#f3eefb', R: RED, Y: GOLD, G: GREEN }
const LOLLY = [
  '..PPPPP..',
  '.PWWPPPP.',
  'PWPPWWPPP',
  'PWPWPPWPP',
  'PWPPWWPWP',
  'PPWPPPPWP',
  '.PPWWWWP.',
  '..PPPPP..',
  '....S....',
  '....S....',
  '....S....',
  '....S....',
  '....S....',
]
const LOLLY_C = { P: PINK, W: '#fff4e2', S: '#efe6d6' }
const CANDY = ['.WW.', 'WCCW', 'WCCW', '.WW.']
const SOUR = [
  '...G...',
  '..LLL..',
  '.LLLLL.',
  'LLLWLLL',
  'LLLLLLL',
  '.LLLLL.',
  '..LLL..',
]
const SOUR_C = { G: GREEN, L: LEMON, W: '#ffffff' }
const GLOBE = [
  '..BBBBB..',
  '.BGGBBBB.',
  'BGGGGBBGB',
  'BBGGBBGGB',
  'BBBBBGGGB',
  'BGBBBBGBB',
  '.BGGBBBB.',
  '..BBBBB..',
]
const GLOBE_C = { B: '#6fc3ff', G: GREEN }

// a candy wrapper with a little sign star printed on it
function wrapperBar(x, t, cx, cy, k, { id = 'leo', col = ORANGE, text = 'LEO BAR', rot = 0.06, w = 320, h = 150 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  // crimped ends
  x.fillStyle = BONE; for (let i = 0; i < 6; i++) { x.fillRect(-w / 2 - 30, -h / 2 + i * h / 6, 30 - (i % 2) * 10, h / 6 - 2); x.fillRect(w / 2 + (i % 2) * 10, -h / 2 + i * h / 6, 30 - (i % 2) * 10, h / 6 - 2) }
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = 'rgba(255,255,255,0.25)'; x.fillRect(-w / 2, -h / 2 + 10, w, 14)
  signChar(x, t, id, -w / 2 + 70, 6, 110, { mood: 'sparkle', seed: 51, glyph: false, glow: 0.5 })
  x.fillStyle = INK; x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 50, 4)
  x.restore()
}
// twelve little jars in a 4×3 grid; sorted = each jar one sign colour, else mixed
function jars(x, t, cx, cy, k, sortP) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  for (let i = 0; i < 12; i++) {
    const c = i % 4, r = Math.floor(i / 4), px = -165 + c * 110, py = -150 + r * 130
    x.fillStyle = INK; x.fillRect(px - 44, py - 54, 88, 110)
    x.fillStyle = 'rgba(220,235,255,0.25)'; x.fillRect(px - 38, py - 40, 76, 90)
    x.fillStyle = '#9aa5c4'; x.fillRect(px - 40, py - 54, 80, 14)
    for (let q = 0; q < 9; q++) {
      const mixed = SIGNCOL[(q * 5 + i * 7) % 12]
      const col = sortP > (q / 9) ? SIGNCOL[i] : mixed
      x.fillStyle = col; x.fillRect(px - 30 + (q % 3) * 22, py - 26 + Math.floor(q / 3) * 24, 16, 16)
    }
  }
  x.restore()
}
// a market stall sign
function stall(x, cx, cy, k, text, { sub = '', subCol = MINT } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  // awning stripes
  for (let i = 0; i < 8; i++) { x.fillStyle = i % 2 ? '#fff4e2' : RED; x.fillRect(-200 + i * 50, -150, 50, 60) }
  x.fillStyle = INK; x.fillRect(-206, -156, 412, 6); x.fillRect(-206, -90, 412, 6)
  // counter
  x.fillStyle = INK; x.fillRect(-196, 40, 392, 140); x.fillStyle = '#8a4a2e'; x.fillRect(-190, 46, 380, 128)
  x.fillStyle = INK; x.fillRect(-180, -84, 6, 124); x.fillRect(174, -84, 6, 124)
  // sign board
  x.fillStyle = INK; x.fillRect(-170, 66, 340, 76); x.fillStyle = GOLD; x.fillRect(-164, 72, 328, 64)
  x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 105)
  x.restore()
  if (sub) label(x, cx + 10, cy + 230 * k, sub, k, { size: 34, bg: subCol, rot: -0.05, font: MONO, weight: 700 })
}

const CAMEOS = [
  { sign: 'aries', cap: 'Ate it in the queue. | Paid for *wrappers.*', mood: lt => lt > 1.5 ? 'wink' : 'sparkle', star: { x: -170 }, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      const n = Math.min(9, Math.floor(Math.max(0, lt - 0.3) / 0.14))
      for (let i = 0; i < n; i++) drawBits(x, WRAPPER, { P: SIGNCOL[i % 12], W: '#fff' }, 700 + (i % 3) * 90, 1080 - Math.floor(i / 3) * 44, 9, { rot: (i % 2 ? 0.2 : -0.15) })
      label(x, 790, 700, 'TOTAL: 9 WRAPPERS', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 880, 'worth it.', pop01(t, P.t0 + 1.9, 0.25, 2.2), { size: 42, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Filled one bag. | *Their size.*', mood: lt => lt > 1.8 ? 'heart' : 'happy', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const cell = lerp(6, 30, ease.outCubic(prog(lt, 0.3, 1.7))) * pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, BAG, BAG_C, 760, 1150 - 5 * cell, cell)
      label(x, 780, 620, 'JUST A FEW', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 34, bg: PINK, rot: -0.05 })
    } },
  { sign: 'gemini', cap: 'Two bags. | Two *personalities.*', mood: lt => Math.floor(lt * 2.4) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.4) % 2 ? 1 : -1, 0], star: { x: 0, y: -40 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      drawBits(x, BAG, { ...BAG_C, R: PINK, Y: PINK, G: PINK }, 230, 1040, 15 * k, { rot: -0.08 })
      drawBits(x, BAG, { ...BAG_C, R: LEMON, Y: GREEN, G: LEMON }, 850, 1040, 15 * k, { rot: 0.08 })
      label(x, 230, 870, 'SWEET', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 34, bg: PINK, rot: -0.06, font: MONO, weight: 700 })
      label(x, 850, 870, 'SOUR', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: LEMON, rot: 0.06, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Found their childhood candy. | *Called mom.*', mood: lt => lt > 1.1 ? 'heart' : 'wide', star: { x: -180 }, hops: [1.1],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.25, 0.35, 2)
      wrapperBar(x, t, 740, 1010, k * 0.9, { id: 'cancer', col: SKYB, text: 'THE OLD ONE', rot: -0.05, w: 300, h: 130 })
      bubble(x, 760, 690, 'MOM. | THEY STILL | MAKE IT.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 34, tail: 'bl' })
      hearts(x, t, 790, 980, P.t0 + 1.2, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Asked for a bar | with *their face on it.*', mood: 'sparkle', star: { x: -180 }, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      wrapperBar(x, t, 780, 860, pop01(t, P.t0 + 1.0, 0.35, 2), { id: 'leo', col: ORANGE, text: 'LEO BAR' })
      bubble(x, 780, 640, 'one with | my face?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, tail: 'bl' })
      label(x, 780, 1060, 'LIMITED EDITION', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 780, 860, P.t0 + 1.2, 7, 200, 0.4)
    } },
  { sign: 'virgo', cap: 'Sorted the pick-n-mix | by *zodiac sign.*', mood: lt => lt > 1.7 ? 'happy' : 'squint', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      jars(x, t, 760, 860, pop01(t, P.t0 + 0.2, 0.3, 2) * 0.86, ease.inOutQuad(prog(lt, 0.5, 1.6)))
      label(x, 760, 1150, 'MUCH BETTER', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Bought it for | the *wrapper.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.25, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 850); x.rotate(0.06 + 0.03 * Math.sin(t * 2)); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-150, -90, 300, 180)
        const g = x.createLinearGradient(-140, -80, 140, 80); g.addColorStop(0, PINK); g.addColorStop(0.5, '#fff4e2'); g.addColorStop(1, LAV)
        x.fillStyle = g; x.fillRect(-144, -84, 288, 168)
        x.fillStyle = 'rgba(255,255,255,0.6)'; x.fillRect(-120 + ((t * 120) % 240), -84, 22, 168)
        x.restore()
      }
      sparkles(x, t, 790, 850, P.t0 + 0.7, 8, 190, 0.9, [PINK, LAV, BONE])
      bubble(x, 790, 1090, 'taste? | didn’t check.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'Picked the sourest one. | Ate it *smiling.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, SOUR, SOUR_C, 790, 860, 24 * pop01(t, P.t0 + 0.25, 0.35, 2) * (1 - prog(lt, 1.0, 1.15)), { rot: 0.1 })
      label(x, 790, 660, '⚠ EXTREME SOUR', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 32, bg: LEMON, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 790, 1060, 'mild.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 44, col: LAV, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Bought candy | from *every country.*', mood: 'sparkle', star: { x: 170 }, hops: [0.6, 1.4],
    front(x, t, lt, P) {
      drawBits(x, GLOBE, GLOBE_C, 300, 760, 26 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: t * 0.3 })
      const n = Math.min(8, Math.floor(Math.max(0, lt - 0.6) / 0.14))
      for (let i = 0; i < n; i++) drawBits(x, CANDY, { W: '#fff', C: SIGNCOL[(i * 3) % 12] }, 180 + (i % 4) * 80, 1000 + Math.floor(i / 4) * 70, 12)
      label(x, 300, 1170, 'ONE OF EACH', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Bought in bulk. | Opened *a shop.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: { x: -230, y: 20, s: 260 },
    back(x, t, lt, P) {
      stall(x, 740, 800, pop01(t, P.t0 + 0.2, 0.35, 2) * 0.82, "CAP'S CANDY CO.")
    },
    front(x, t, lt, P) {
      label(x, 740, 1080, 'OPEN 6 A.M.', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 32, bg: MINT, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Invented a flavour. | *Pickle chocolate.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, -1], star: { x: -180 }, hops: [1.3],
    front(x, t, lt, P) {
      wrapperBar(x, t, 790, 860, pop01(t, P.t0 + 0.3, 0.35, 2), { id: 'aquarius', col: GREEN, text: 'NEW!', rot: 0.06, w: 290, h: 140 })
      bubble(x, 790, 640, 'trust me', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 790, 1060, 'PICKLE + COCOA', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'The lollipop | was *too pretty* to eat.', mood: lt => lt < 0.9 ? 'heart' : 'wide', tears: lt => lt < 0.9 ? 2 : 3, star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, LOLLY, LOLLY_C, 790, 860, 26 * pop01(t, P.t0 + 0.25, 0.35, 2), { rot: 0.08 + 0.04 * Math.sin(t * 2) })
      label(x, 790, 1130, 'UNEATEN. FOREVER.', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 30, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 760, P.t0 + 0.8, 6, 160, 0.2, [PINK, BONE, LAV])
    } },
]

const F = makeFilm({
  id: 'r2t0046', key: 'C', accent: PINK, ending: 'callback',
  title: 'The signs in | a *candy store.*',
  cameos: CAMEOS,
  group: { cap: 'Sugar rush: | *all twelve.*' },
  last: {
    text: 'Capricorn sold it | all *back to them.*',
    draw(x, t, lt) {
      stall(x, 640, 980, pop01(t, t - lt + 0.5, 0.35, 2) * 1.05, "CAP'S CANDY CO.", { sub: 'SOLD OUT', subCol: RED })
      const k = pop01(t, t - lt + 0.9, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'capricorn', 300, 1060, 240 * k, { mood: 'wink', seed: 9, glyph: false, hops: [t - lt + 1.6] })
      sparkles(x, t, 300, 1000, t - lt + 1.6, 8, 200, 0.3)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
