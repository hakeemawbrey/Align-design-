// r2a0097: star_advice, ADVICE SOLO, "Signs a Libra | trusts you." (~43 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole film (makeFilm solo mode, 9 cards): small, relatable signs of a Libra's trust, warm and a little funny.
// Ending: group (the group beat is the last word).
//   0.0–3.6    "Signs a Libra | *trusts you.*"
//   3.6–37.8   lets you pick the restaurant · shows you the unfiltered selfie · gives you their real opinion · cancels plans
//              without a speech · you've seen the sweatpants · disagrees with you out loud · vents for a full hour
//              · showed you their birth chart · falls asleep on movie night
//  37.8        "Trusted by a Libra? | *Keep that close.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ROSE = '#ff9ec7', RED = '#e23d4e', CREAM = '#fff4e2', ORANGE = '#ffb34a'

function card(x, cx, cy, w, h, col, { rot = 0, k = 1 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  x.restore()
}
function text(x, s, cx, cy, size, col = INK, font = INTER, weight = 800) {
  x.fillStyle = col; x.font = `${weight} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, cx, cy)
}
// a menu card: two dishes, a big finger pointing at you
function menu(x, cx, cy, k) {
  if (k <= 0.01) return
  card(x, cx, cy, 300, 360, CREAM, { k, rot: 0.04 })
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  text(x, 'MENU', 0, -140, 38, INK, MONO, 700)
  for (let i = 0; i < 5; i++) { x.fillStyle = '#9aa5c4'; x.fillRect(-110, -80 + i * 46, 160 - (i * 37) % 60, 14); x.fillRect(80, -80 + i * 46, 30, 14) }
  x.restore()
}
// a phone showing a plain, unfiltered photo of Libra
function selfie(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-140, -210, 280, 420); x.fillStyle = '#2a2350'; x.fillRect(-130, -200, 260, 400)
  x.fillStyle = '#b9b0a0'; x.fillRect(-114, -170, 228, 300)
  signChar(x, t, 'libra', 0, -10, 170, { mood: 'sleepy', seed: 61, glyph: false, glow: 0.2 })
  x.restore()
}
const PANTS = [
  'GGGGGGGGGG',
  'GwwwwwwwwG',
  'GGGGGGGGGG',
  'GGGGGGGGGG',
  'GGGG..GGGG',
  'GGGG..GGGG',
  'GGGG..GGGG',
  'GGGG..GGGG',
  'GGG....GGG',
  'WWW....WWW',
]
// a birth chart wheel: twelve coloured slices
const SLICE = ['#ff6b5e', '#7dd56f', '#ffd23a', '#8fe3ff', '#ffb34a', '#c9e27a', '#ff9ec7', '#c14a7a', '#b78bff', '#7aa8a0', '#59c4ff', '#b7a6ff']
function chart(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(t * 0.3); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 170, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { x.fillStyle = SLICE[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, 160, i * Math.PI / 6, (i + 1) * Math.PI / 6 - 0.03); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, 100, 0, Math.PI * 2); x.fill()
  x.strokeStyle = BONE; x.lineWidth = 4; for (const [a, b] of [[0.3, 2.4], [1.2, 4.1], [2.8, 5.3]]) { x.beginPath(); x.moveTo(Math.cos(a) * 92, Math.sin(a) * 92); x.lineTo(Math.cos(b) * 92, Math.sin(b) * 92); x.stroke() }
  x.restore()
}
function tv(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -120, 340, 230); x.fillStyle = '#3a6ea8'; x.fillRect(-156, -106, 312, 202)
  x.fillStyle = '#59c4ff'; x.fillRect(-120, -60, 120, 80); x.fillStyle = INK; x.fillRect(-20, 110, 40, 30); x.fillRect(-80, 136, 160, 14)
  x.restore()
}

const S = 'libra'
const CAMEOS = [
  { sign: S, cap: 'They let you | *pick the restaurant.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      menu(x, 800, 860, pop01(t, P.t0 + 0.15, 0.35, 2))
      label(x, 800, 1100, 'YOUR CALL ♡', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 38, bg: ROSE, rot: -0.04 })
      bubble(x, 420, 640, 'huge relief', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 34, tail: 'bc' })
    } },
  { sign: S, cap: 'You’ve seen | *the unfiltered selfie.*', mood: 'wink', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      selfie(x, t, 800, 860, pop01(t, P.t0 + 0.15, 0.35, 2))
      label(x, 800, 1100, 'FILTER: NONE', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'They gave you | their *real opinion.*', mood: lt => lt > 1.0 ? 'squint' : 'happy', look: [1, 0], star: { x: -180 }, hops: [1.1],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'honestly? | no.', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 56, tail: 'bl' })
      label(x, 790, 1040, 'RARE SIGHTING', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 760, P.t0 + 0.8, 7, 200, 0.3)
    } },
  { sign: S, cap: 'They cancel plans | *without an essay.*', mood: 'sleepy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'staying in. | love you.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, tail: 'bl', col: SKYB })
      label(x, 790, 1020, 'WORDS: 4', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You’ve seen | *the sweatpants.*', mood: 'happy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, PANTS, { G: '#9aa5c4', w: CREAM, W: '#6b62a8' }, 800, 880, 26 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.05 })
      label(x, 800, 640, 'VIP ACCESS', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: ROSE, rot: -0.05 })
    } },
  { sign: S, cap: 'They disagree with you. | *Out loud.*', mood: lt => lt > 1.0 ? 'wide' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'aries', 820, 990, 190 * k, { mood: lt > 1.4 ? 'heart' : 'wide', look: [-1, 0], seed: 13, glyph: false })
      bubble(x, 560, 650, 'actually, | I don’t agree', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 34, tail: 'bl' })
      label(x, 820, 780, 'GROWTH!', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 38, bg: GOLD, rot: 0.05 })
    } },
  { sign: S, cap: 'They vent to you | *for a full hour.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const lines = ['and then…', 'AND then…', 'anyway…', 'so THEN…']
      lines.forEach((s, i) => bubble(x, 760 + (i % 2) * 50, 640 + i * 130, s, pop01(t, P.t0 + 0.2 + i * 0.35, 0.25, 2.2), { size: 34, tail: 'bl', col: i % 2 ? LAV : BONE }))
    } },
  { sign: S, cap: 'They showed you | *their birth chart.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -190 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      chart(x, t, 800, 850, pop01(t, P.t0 + 0.2, 0.4, 2))
      label(x, 800, 1100, 'FULL CHART. WOW.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 800, 850, P.t0 + 0.8, 8, 200, 0.4)
    } },
  { sign: S, cap: 'They fall asleep | *on movie night.*', mood: 'sleepy', star: { x: -150, y: 40 },
    front(x, t, lt, P) {
      tv(x, 790, 760, pop01(t, P.t0 + 0.15, 0.35, 2))
      const k = pop01(t, P.t0 + 0.5, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'taurus', 800, 1040, 170 * k, { mood: 'heart', look: [-1, 0], seed: 23, glyph: false })
      label(x, 560, 640, 'SAFE HERE', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: ROSE, rot: -0.05, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0097', key: 'F', accent: ROSE, solo: S, ending: 'group',
  title: 'Signs a Libra | *trusts you.*',
  cameos: CAMEOS,
  group: {
    cap: 'Trusted by a Libra? | *Keep that close.*', mood: 'heart',
    draw(x, t, lt) { hearts(x, t, 540, 1150, t - lt + 1.2, { n: 10, life: 2.6, spread: 600, cell: 8, seed: 5 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
