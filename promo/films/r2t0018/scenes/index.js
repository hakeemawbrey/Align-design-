// r2t0018: star_talk, SOLO, "Aries shopping | be like." (~51 s vertical, signs3kit social cut, music: lofi · G)
// One sign the whole film (makeFilm solo mode, 9 cards). Ending: lesson.
//   0.0–3.6    "Aries shopping | *be like.*"
//   3.6–37.8   in and out in ninety seconds · fitting room? who has the time · saw the last one, sprinted
//              · bought it in red, every time · cart full in four seconds · haggled at a fixed-price store
//              · match said "cute shirt", bought five · sale starts at 9, arrived at 6 · got home, already wearing it
//  37.8        "Fast. Bold. | *Always in red.*"
//  41.0        LESSON UNLOCKED: "Bold heart. | *Knows what it loves.*"  CART: FULL
//  46.9        "Total shopping time? | *Two minutes.*"  Red bags pop in around the big Aries.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#ff5a4e', DRED = '#c23a3a', BROWN = '#8a5a3a'

// ── props
const BAG = [
  '...KKKK...',
  '..K....K..',
  '..K....K..',
  'RRRRRRRRRR',
  'RRRRRRRRRR',
  'RRRWWWWRRR',
  'RRRWWWWRRR',
  'RRRRRRRRRR',
  'RRRRRRRRRR',
  'RRRRRRRRRR',
]
const BAG_C = { K: GOLD, R: RED, W: BONE }
const SHOE = ['......RRR..', '.....RRRRR.', 'RRRRRRRWRR.', 'RRRRRRRRRRR', 'WWWWWWWWWWW']
const SWEATER = ['RRR...RRR', 'RRRRRRRRR', 'RRRRRRRRR', '.RRRRRRR.', '.RRRRRRR.', '.RRRRRRR.']
const CART = [
  'K..........',
  '.K.........',
  '.KGGGGGGGGG',
  '..GGGGGGGGG',
  '..GGGGGGGG.',
  '...GGGGGGG.',
  '...KKKKKKK.',
  '....K...K..',
]
const SHIRT = ['PP..PP', 'PPPPPP', '.PPPP.', '.PPPP.']
function door(x, cx, cy, k, label2) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-120, -180, 240, 360); x.fillStyle = LAV; x.fillRect(-110, -170, 220, 350)
  x.fillStyle = '#8a7ac8'; x.fillRect(-110, -170, 220, 40)
  x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(label2, 0, -148)
  x.fillStyle = GOLD; x.fillRect(70, 10, 16, 16)
  x.restore()
}
function tag(x, cx, cy, k, text, rot = 0.1) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-90, -50); x.lineTo(70, -50); x.lineTo(110, 0); x.lineTo(70, 50); x.lineTo(-90, 50); x.closePath(); x.fill()
  x.fillStyle = BONE; x.beginPath(); x.moveTo(-82, -42); x.lineTo(66, -42); x.lineTo(100, 0); x.lineTo(66, 42); x.lineTo(-82, 42); x.closePath(); x.fill()
  x.fillStyle = INK; x.beginPath(); x.arc(70, 0, 9, 0, Math.PI * 2); x.fill()
  x.font = `800 48px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, -10, 2)
  x.restore()
}
function dust(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha *= k
  for (let i = 0; i < 5; i++) { x.fillStyle = i % 2 ? BONE : '#c9b8a8'; x.beginPath(); x.arc(cx - i * 36, cy + Math.sin(i * 1.9) * 14, 22 + 10 * Math.sin(t * 7 + i), 0, Math.PI * 2); x.fill() }
  x.restore()
}

const S = 'aries'
const CAMEOS = [
  { sign: S, cap: 'In and out. | *Ninety seconds.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.4, 0.9],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, BAG, BAG_C, 790, 880, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.06 * Math.sin(t * 6) })
      label(x, 790, 1110, 'TIME: 1:30', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 40, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Fitting room? | *Who has the time.*', mood: lt => lt > 1.2 ? 'eyeroll' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      door(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), 'FITTING')
      label(x, 790, 900, 'SKIPPED', pop01(t, P.t0 + 1.1, 0.3, 2.6), { size: 48, bg: RED, rot: -0.12, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Saw the last one. | *Sprinted.*', mood: 'wide', look: [1, 0], star: { x: -170 }, hops: [0.8, 1.1, 1.4],
    front(x, t, lt, P) {
      drawBits(x, SHOE, { R: RED, W: BONE }, 800, 920, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 700, 'LAST ONE!', pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 44, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      dust(x, t, 300, 1080, ease.outCubic(prog(lt, 0.8, 1.1)) * (1 - prog(lt, 2.0, 2.4)))
    } },
  { sign: S, cap: 'Bought it in red. | *Every single time.*', mood: 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      for (let i = 0; i < 5; i++) drawBits(x, SWEATER, { R: i % 2 ? RED : DRED }, 790 + (i % 2 ? 12 : -12), 1060 - i * 66, 18 * pop01(t, P.t0 + 0.2 + i * 0.15, 0.25, 2.2))
      label(x, 790, 640, 'RED #14', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 40, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Cart full | *in four seconds.*', mood: 'sparkle', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      const n = Math.min(6, Math.floor(prog(lt, 0.4, 1.4) * 6.99))
      const cols = [RED, GOLD, MINT, PINK, SKYB, LAV]
      for (let i = 0; i < n; i++) { x.fillStyle = INK; x.fillRect(690 + (i % 3) * 70 - 4, 860 - Math.floor(i / 3) * 64 - 4, 64, 64); x.fillStyle = cols[i]; x.fillRect(690 + (i % 3) * 70, 860 - Math.floor(i / 3) * 64, 56, 56) }
      drawBits(x, CART, { K: INK, G: '#9aa5c4' }, 790, 960, 26 * k)
      label(x, 790, 1150, '0:04 · DONE', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Fixed price? | Aries *haggled anyway.*', mood: lt => lt > 1.4 ? 'wink' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      tag(x, 790, 760, pop01(t, P.t0 + 0.2, 0.3, 2), '20')
      bubble(x, 790, 960, 'how about | 19?', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 42, col: RED, tail: 'bl' })
      label(x, 790, 1140, 'NOT HOW IT WORKS', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Match said “cute shirt.” | *Bought five.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 640, '✦ match: | cute shirt', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 36, col: LAV, tail: 'bl' })
      for (let i = 0; i < 5; i++) drawBits(x, SHIRT, { P: PINK }, 660 + i * 66, 900 + (i % 2) * 40, 14 * pop01(t, P.t0 + 1.0 + i * 0.1, 0.25, 2.2), { rot: (i - 2) * 0.08 })
      label(x, 790, 1110, 'SHIRTS: 5', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Sale starts at nine. | *Arrived at six.*', mood: lt => lt > 1.2 ? 'sparkle' : 'sleepy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      door(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), 'OPENS 9:00')
      label(x, 790, 640, 'NOW: 6:02', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 38, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1110, 'FIRST IN LINE', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Got home. | *Already wearing it.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      tag(x, 640, 640, pop01(t, P.t0 + 0.6, 0.3, 2), 'NEW', -0.25)
      x.save(); x.strokeStyle = INK; x.lineWidth = 4; x.globalAlpha *= clamp(pop01(t, P.t0 + 0.6, 0.3, 2)); x.beginPath(); x.moveTo(F.x + 60, F.top + 30); x.lineTo(600, 680); x.stroke(); x.restore()
      label(x, 790, 1060, 'TAG STILL ON', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 38, bg: RED, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0018', key: 'G', accent: RED, solo: 'aries', ending: 'lesson',
  title: 'Aries shopping | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Fast. Bold. | *Always in red.*', mood: 'sparkle' },
  lesson: { text: 'Bold heart. | *Knows what it loves.*', chip: 'CART: FULL' },
  last: {
    text: 'Total shopping time? | *Two minutes.*',
    draw(x, t, lt) {
      ;[[300, 1250, -0.1], [780, 1250, 0.1], [540, 1330, 0]].forEach(([bx, by, r], i) => drawBits(x, BAG, BAG_C, bx, by, 20 * pop01(t, t - lt + 0.6 + i * 0.2, 0.3, 2.2), { rot: r }))
      sparkles(x, t, 540, 1250, t - lt + 1.2, 8, 260, 0.2)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
