// r2a0257: star_advice, ADVICE SOLO, "Signs a Leo | trusts you." (~45 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole way through (makeFilm solo mode, 9 cards): the small, sweet signs that a Leo has let you in.
//   0.0–3.6    "Signs a Leo | *trusts you.*"  One big Leo pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              you've seen the blurry photo · they cried in front of you · they share the spotlight with you
//              · they ask your honest opinion · you've seen them at 7 AM · they hype your win louder than theirs
//              · they showed you their whole birth chart · they admit when they're wrong · they nap on your couch
//  37.8        "Leo trust? | *Earned. Forever.*"  Leo comes back, big.
//  41.2        callback: "That blurry photo? | *Framed.*"  The blurry photo comes back, framed, with hearts.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ORANGE = '#ffb34a', RED = '#e23d4e', CREAM = '#fff4e2'
const S = 'leo'

// ── props
const MUG = ['.S.S...', 'S.S....', 'MMMMM..', 'MMMMMMM', 'MMMMM.M', 'MMMMMMM', 'MMMMM..', '.MMM...']
const MUG_C = { M: '#ff8f6a', S: '#d8d0f0' }
const MEGA = [
  '.........YY',
  '.......YYYY',
  '.....YYYYYY',
  'KKKYYYYYYYY',
  'KKKYYYYYYYY',
  '.....YYYYYY',
  '.KK....YYYY',
  '.KK......YY',
]
const MEGA_C = { Y: ORANGE, K: INK }

// a photo print / phone screen holding a blurry little Leo
function blurry(x, t, cx, cy, k, { framed = false, rot = 0.05 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-140, -160, 296, 340)
  x.fillStyle = INK; x.fillRect(-152, -172, 304, 344)
  x.fillStyle = framed ? GOLD : CREAM; x.fillRect(-144, -164, 288, 328)
  x.fillStyle = '#6b62a8'; x.fillRect(-124, -144, 248, 236)
  x.save(); x.beginPath(); x.rect(-124, -144, 248, 236); x.clip()
  x.filter = 'blur(7px)'
  signChar(x, t, S, 10, -10, 190, { mood: 'wide', seed: 61, glyph: false, glow: 0.4, look: [1, 1] })
  x.restore()
  x.fillStyle = framed ? INK : '#6b62a8'; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText(framed ? '✦ FAVOURITE ✦' : 'IMG_0001', 0, 128)
  x.restore()
}
// a spotlight cone, from the top of the panel down to a floor ellipse
function spot(x, cx, w, k) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha = 0.4 * clamp(k)
  const g = x.createLinearGradient(0, 500, 0, 1160)
  g.addColorStop(0, 'rgba(255,240,200,0.9)'); g.addColorStop(1, 'rgba(255,240,200,0.15)')
  x.fillStyle = g; x.beginPath(); x.moveTo(cx - 40, 500); x.lineTo(cx + 40, 500); x.lineTo(cx + w * k, 1150); x.lineTo(cx - w * k, 1150); x.closePath(); x.fill()
  x.restore()
}
// a birth-chart wheel: twelve slices, a slow turn, a crescent moon in the middle
function chart(x, t, cx, cy, r, k) {
  if (k <= 0.01) return
  const W = ['#ff6b6b', '#7ddc8a', '#ffe066', '#9fd8ff', ORANGE, '#b8e07a', PINK, '#b06bff', '#ff9a4a', '#a8a0c8', SKYB, '#8fb8ff']
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.save(); x.rotate(t * 0.25)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { x.fillStyle = W[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, (i / 12) * Math.PI * 2, ((i + 1) / 12) * Math.PI * 2); x.closePath(); x.fill() }
  x.restore()
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, r * 0.62, 0, Math.PI * 2); x.fill()
  x.fillStyle = CREAM; x.beginPath(); x.arc(-6, 0, r * 0.3, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(r * 0.1, -r * 0.06, r * 0.27, 0, Math.PI * 2); x.fill()
  x.restore()
}
// a couch with a blanket
function couch(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-250, -90, 500, 190); x.fillStyle = '#5fb0a8'; x.fillRect(-242, -82, 484, 100); x.fillStyle = '#7fd0c8'; x.fillRect(-242, 18, 484, 74)
  x.fillStyle = INK; x.fillRect(-270, -40, 60, 150); x.fillRect(210, -40, 60, 150); x.fillStyle = '#5fb0a8'; x.fillRect(-264, -34, 48, 138); x.fillRect(216, -34, 48, 138)
  x.restore()
}
// two clothes tags on a rail: A / B
function outfits(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -150, 340, 12)
  ;[['A', PINK, -85], ['B', GOLD, 85]].forEach(([s, col, dx], i) => {
    const sw = Math.sin(lt * 3 + i) * 0.05
    x.save(); x.translate(dx, -144); x.rotate(sw)
    x.fillStyle = INK; x.fillRect(-3, 0, 6, 34)
    x.fillRect(-66, 30, 132, 190); x.fillStyle = col; x.fillRect(-58, 38, 116, 174)
    x.fillStyle = INK; x.font = `800 60px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, 0, 126)
    x.restore()
  })
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'You’ve seen | the *blurry photo.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: { x: -180 }, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      blurry(x, t, 790, 840, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 1100, 'NOT DELETED. SHARED.', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 28, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'They cried | *in front of you.*', mood: lt => lt > 1.5 ? 'happy' : 'neutral', tears: 1, look: [1, 0], star: { x: -170 }, hops: [1.6],
    front(x, t, lt, P) {
      label(x, 790, 760, 'ROAR: OFF', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 40, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 950, 'it’s okay. | I’m here ♡', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 36, tail: 'bl' })
      hearts(x, t, 540, 820, P.t0 + 1.5, { n: 4, life: 1.5, spread: 140, cell: 7, seed: 3 })
    } },
  { sign: S, cap: 'They share | the *spotlight* with you.', mood: 'sparkle', star: { x: -120, y: 10, s: 270 }, hops: [1.3],
    back(x, t, lt, P) { spot(x, 540, lerp(140, 360, ease.inOutCubic(prog(lt, 0.6, 1.3))), pop01(t, P.t0 + 0.1, 0.3, 1.6)) },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.6, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'virgo', 700, 920, 230 * k, { mood: lt > 1.2 ? 'heart' : 'wide', look: [-1, 0], seed: 23, glyph: false, hops: [P.t0 + 1.3] })
      label(x, 540, 610, 'ROOM FOR TWO', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'They ask | for *your honest opinion.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -190 }, hops: [1.4],
    front(x, t, lt, P) {
      outfits(x, 800, 900, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      bubble(x, 800, 640, 'be honest?', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 38, tail: 'bl' })
      label(x, 800, 1130, 'B. TRUST ME.', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You’ve seen them | at *7 AM.*', mood: 'sleepy', star: { x: -170 },
    front(x, t, lt, P, F) {
      drawBits(x, MUG, MUG_C, F.x + 170, F.cy + 60, 14 * pop01(t, P.t0 + 0.3, 0.3, 2))
      label(x, 800, 700, '7:02 AM', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 44, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      label(x, 800, 1100, 'MANE: OFF DUTY', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: ORANGE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'They cheer your win | *louder than theirs.*', mood: lt => lt > 0.9 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -220 }, hops: [0.8, 1.6],
    front(x, t, lt, P, F) {
      drawBits(x, MEGA, MEGA_C, F.x + 175, F.cy - 10, 12 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.15 })
      const k = pop01(t, P.t0 + 0.4, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'pisces', 830, 1010, 160 * k, { mood: 'heart', look: [-1, 0], seed: 27, glyph: false, tears: 2 })
      bubble(x, 760, 650, 'MY FRIEND | DID THAT!!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: S, cap: 'They showed you | their *whole chart.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -190 }, hops: [1.3],
    front(x, t, lt, P) {
      chart(x, t, 800, 840, 160, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 800, 1080, 'EVEN THE MOON SIGN', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 28, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 800, 840, P.t0 + 1.2, 7, 190, 0.2)
    } },
  { sign: S, cap: 'They admit | *when they’re wrong.*', mood: lt => lt > 1.0 ? 'happy' : 'squint', look: [1, 0], star: { x: -180 }, hops: [1.1],
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'okay… | you were right', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 790, 1000, '✦ RARE EVENT ✦', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 900, P.t0 + 1.25, 8, 200, 0.6)
    } },
  { sign: S, cap: 'They nap | *on your couch.*', mood: lt => lt > 0.9 ? 'sleepy' : 'happy', star: { x: -30, y: 0, s: 260 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) { couch(x, 520, 1010, pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      label(x, 540, 620, 'SAFE SPOT ♡', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: MINT, rot: -0.03, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0257', key: 'F', accent: ORANGE, solo: S, ending: 'callback',
  title: 'Signs a Leo | *trusts you.*',
  cameos: CAMEOS,
  group: { cap: 'Leo trust? | *Earned. Forever.*', mood: 'heart' },
  last: {
    text: 'That blurry photo? | *Framed.*',
    draw(x, t, lt) {
      const t0 = t - lt
      blurry(x, t, 540, 1020, 1.25 * pop01(t, t0 + 0.5, 0.4, 2), { framed: lt > 1.2, rot: -0.03 })
      hearts(x, t, 540, 900, t0 + 1.3, { n: 8, life: 2.0, spread: 400, cell: 8, seed: 5 })
      sparkles(x, t, 540, 1000, t0 + 1.2, 8, 240, 0.4)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
