// trstartedpancake: HOW IT STARTED vs HOW IT'S GOING, "Tradition." (20 s vertical, Star Talk Trends §6, music: dreamy · F)
// The format's look lives in ./started.js (identical in all five tr-started films).
//   0–6.6     HOW IT STARTED (date two, a tiny kitchen): ♈ Aries turns the stove knob to MAX. "I got this." Flip one:
//             the pancake flies up and sticks to the ceiling. Flip two: a puff of smoke, a black disc lands on ♉ Taurus'
//             plate. Silence. "…crispy?" Taurus takes a bite: CRUNCH. Thumbs up: "10/10." ♓ Pisces at the window, moved.
//             THE STARS: "Aries cooks on one setting: *max.*"
//   6.6       card cut.
//   6.6–12.3  HOW IT'S GOING (same kitchen, a PANCAKE SUNDAY banner): the date-two pancake is still on the ceiling with
//             a little "EST. DATE 2" tag. Aries flips with total confidence; a second one sticks right next to it: "a
//             pair!" A tall, proudly burnt stack; CRUNCH; Pisces pours syrup, weeping. THE STARS: "still burnt. *still*
//             Sunday."
//   12.3–15.6 the two photos side by side. Last line: "*Tradition.*"
import { lerp, prog, ease } from '../../../src/lib.js'
import {
  makeStarted, drawStarChar, signStar, R, speech, hearts, sparkles, drawBits, pisces, pop01, r3,
  INK, BONE, GOLD, MONO,
} from './started.js'

const ARI = signStar('aries'), TAU = signStar('taurus')
const CEIL = 46, STUCK = CEIL + 26

function pancake(x, cx, cy, w, burnt, { rot = 0, squash = 1 } = {}) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(1, squash)
  R(x, INK, -w / 2 - 5, -14, w + 10, 28); R(x, INK, -w / 2 + 5, -19, w - 10, 38)
  R(x, burnt ? '#2a1a14' : '#e0a24f', -w / 2, -9, w, 18); R(x, burnt ? '#3d261b' : '#f2c46e', -w / 2 + 5, -14, w - 10, 10)
  if (burnt) { R(x, '#6b3f22', -w / 2 + 10, -12, 14, 4); R(x, '#6b3f22', w / 2 - 30, -12, 10, 4) }
  x.restore()
}
function smoke(x, t, cx, cy, t0, life = 1.4) {
  for (let i = 0; i < 6; i++) {
    const b = t0 + i * 0.12, tt = t - b
    if (tt < 0 || tt > life) continue
    const p = tt / life
    x.save(); x.globalAlpha = 0.7 * (1 - p)
    const s = 26 + 40 * p
    R(x, '#8d86a6', cx - s / 2 + Math.sin(i * 2 + tt * 3) * 20, cy - p * 220 - s / 2, s, s)
    x.restore()
  }
}
function kitchen(x, t, now) {
  R(x, now ? '#e0b38a' : '#a7988a', 0, 0, 820, 820)
  for (let j = 0; j < 7; j++) for (let i = 0; i < 9; i++) R(x, now ? ((i + j) % 2 ? '#f0cda4' : '#e8c196') : ((i + j) % 2 ? '#b4a594' : '#ac9d8c'), i * 92 + (j % 2) * 46 - 46, 160 + j * 60, 90, 58)
  R(x, now ? '#c48d66' : '#7f7265', 0, 0, 820, CEIL); R(x, INK, 0, CEIL, 820, 6)
  // window with ♓ Pisces outside
  R(x, INK, 340, 120, 180, 170); R(x, now ? '#8ed0ff' : '#5c6f8e', 348, 128, 164, 154)
  // counter + stove
  R(x, INK, 0, 594, 820, 10); R(x, now ? '#8a5a7a' : '#5f5068', 0, 604, 820, 216); R(x, now ? '#a46c92' : '#6e5e78', 0, 604, 820, 20)
  R(x, '#333048', 70, 570, 250, 30); R(x, INK, 70, 568, 250, 4)
  for (const bx of [130, 260]) R(x, '#1a1830', bx - 34, 578, 68, 12)
}
function knob(x, cx, cy, ang, label) {
  R(x, INK, cx - 26, cy - 26, 52, 52); R(x, '#d8d0e6', cx - 21, cy - 21, 42, 42)
  x.save(); x.translate(cx, cy); x.rotate(ang); R(x, '#ff5a3c', -4, -20, 8, 20); x.restore()
  if (label) { x.font = `800 22px Inter, sans-serif`; x.fillStyle = '#ff5a3c'; x.textAlign = 'center'; x.fillText(label, cx, cy + 50) }
}
function pan(x, cx, cy, rot = 0) {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  R(x, INK, -70, -14, 140, 28); R(x, '#3b3a52', -64, -9, 128, 18); R(x, INK, 66, -8, 90, 16); R(x, '#5a4030', 70, -4, 82, 8)
  x.restore()
}

// ── A: date two
const A = { knob: [0.85, 1.15], gotit: 1.3, flip1: [1.9, 2.32], smoke: 2.5, flip2: [3.0, 3.4], crispy: 3.95, bite: 4.65, rate: 5.15 }
function arc(t, [a, b], p0, p1, h) {
  const p = prog(t, a, b)
  return { x: lerp(p0[0], p1[0], p), y: lerp(p0[1], p1[1], p) - h * Math.sin(Math.PI * p), p }
}
function sceneA(x, t) {
  kitchen(x, t, false)
  x.save(); x.beginPath(); x.rect(348, 128, 164, 154); x.clip()
  pisces(x, t, 430, 250, 120, t > A.rate ? 3 : t > A.crispy ? 2 : 1, { mood: t > A.rate ? 'happy' : 'wide', look: [0, 1] })
  x.restore()
  // the stars behind the counter
  let am = 'happy', tm = 'neutral'
  if (t > A.flip1[0]) am = 'wide'
  if (t > A.smoke) am = 'wide'
  if (t > A.crispy) { am = 'squint'; tm = 'squint' }
  if (t > A.bite) tm = 'happy'
  if (t > A.rate) { am = 'sparkle'; tm = 'happy' }
  drawStarChar(x, 200, 470, 220, t, { color: ARI.color, glyph: ARI.glyph, mood: am, look: t > A.flip1[0] && t < A.flip2[1] ? [0, -1] : [1, 0], hops: [A.gotit, A.flip1[0], A.flip2[0], A.rate + 0.1], seed: 5 })
  drawStarChar(x, 600, 470, 220, t, { color: TAU.color, glyph: TAU.glyph, mood: tm, look: t > A.flip2[0] && t < A.crispy ? [0, 1] : [-1, 0], hops: [A.crispy, A.bite, A.rate], seed: 8 })
  // counter front again over their feet
  R(x, INK, 0, 594, 820, 10); R(x, '#5f5068', 0, 604, 820, 216); R(x, '#6e5e78', 0, 604, 820, 20)
  R(x, '#333048', 70, 570, 250, 30)
  knob(x, 110, 690, lerp(-1.2, 1.4, ease.outBack(prog(t, ...A.knob))), t > A.knob[1] ? 'MAX' : '')
  pan(x, 200, 566, t > A.flip1[0] && t < A.flip1[0] + 0.15 ? -0.25 : t > A.flip2[0] && t < A.flip2[0] + 0.15 ? -0.25 : 0)
  // flip 1: up to the ceiling, sticks
  if (t < A.flip1[0]) pancake(x, 200, 548, 100, false)
  else {
    const a = arc(t, A.flip1, [200, 548], [520, STUCK], 120)
    pancake(x, a.x, a.y, 100, false, { rot: a.p < 1 ? a.p * 9 : 0, squash: a.p < 1 ? 1 : 0.9 })
    if (a.p >= 1) sparkles(x, t, 520, STUCK, A.flip1[1], 6, 50, 1, [GOLD, BONE], 18)
  }
  // flip 2: smoke, then a burnt one onto Taurus' plate
  R(x, INK, 520, 586, 150, 14); R(x, '#f4efe6', 526, 580, 138, 12)
  if (t > A.smoke - 0.3 && t < A.flip2[0]) pancake(x, 200, 548, 100, t > A.smoke)
  smoke(x, t, 200, 520, A.smoke)
  if (t >= A.flip2[0]) {
    const a = arc(t, A.flip2, [200, 548], [595, 566], 160)
    const bite = t > A.bite ? 0.62 : 1
    pancake(x, a.x, a.y, 100 * (a.p >= 1 ? bite : 1), true, { rot: a.p < 1 ? a.p * 6.3 : 0 })
  }
  speech(x, t, 230, 300, A.gotit, 'I got this.', { size: 32, life: 1.1, tail: -1 })
  speech(x, t, 610, 300, A.crispy, '…crispy?', { size: 36, life: 1.0, tail: 1 })
  if (t > A.bite && t < A.bite + 0.8) {
    const k = pop01(t, A.bite, 0.18, 3)
    x.save(); x.translate(660, 390); x.rotate(0.15); x.scale(k, k)
    x.font = `800 54px Inter, sans-serif`; x.textAlign = 'center'; x.lineWidth = 12; x.strokeStyle = INK; x.strokeText('CRUNCH', 0, 0); x.fillStyle = GOLD; x.fillText('CRUNCH', 0, 0); x.restore()
  }
  speech(x, t, 600, 300, A.rate, '10/10.', { size: 40, life: 1.4, tail: 1, col: '#fff3c4' })
}

// ── B: pancake Sundays
const B = { flip: [7.45, 7.9], pair: 8.05, stack: 8.5, bite: 9.25, syrup: [10.1, 11.3], sunday: 11.2 }
function sceneB(x, t) {
  kitchen(x, t, true)
  x.save(); x.beginPath(); x.rect(348, 128, 164, 154); x.clip(); R(x, '#bfe6ff', 348, 128, 164, 40); x.restore()
  // the banner
  x.save(); x.translate(700, 168); x.rotate(-0.04)
  for (let i = 0; i < 5; i++) { x.save(); x.translate(-100 + i * 50, 0); R(x, INK, -24, -4, 48, 64); R(x, i % 2 ? '#ffd166' : '#ff8fb1', -20, 0, 40, 56); x.restore() }
  x.font = `800 20px Inter, sans-serif`; x.fillStyle = INK; x.textAlign = 'center'; x.fillText('PANCAKE SUNDAY', 0, 35)
  x.restore()
  // the date-two pancake, still up there, with its tag
  pancake(x, 520, STUCK, 110, false, { squash: 0.9 })
  R(x, INK, 520 - 1, STUCK + 12, 2, 18)
  x.save(); x.translate(520, STUCK + 44); R(x, INK, -62, -14, 124, 30); R(x, '#fffaf0', -58, -10, 116, 22)
  x.font = `700 15px ${MONO}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('EST. DATE 2', 0, 2); x.restore()
  // the stars
  const am = t > B.flip[1] ? 'sparkle' : 'wink', tm = t > B.bite ? 'heart' : 'happy'
  drawStarChar(x, 200, 470, 220, t, { color: ARI.color, glyph: ARI.glyph, mood: am, look: [1, -1], hops: [7.0, B.flip[0], B.pair], seed: 5, glow: 1.2 })
  drawStarChar(x, 600, 470, 220, t, { color: TAU.color, glyph: TAU.glyph, mood: tm, look: [-1, 0], hops: [B.pair + 0.1, B.bite, B.sunday], seed: 8, glow: 1.2 })
  // ♓ Pisces, a guest, at the end of the counter with the syrup
  const pin = pop01(t, 9.6, 0.4, 2)
  if (pin > 0.01) pisces(x, t, 740, 520, 160, 3, { mood: 'happy', look: [-1, 1], pop: pin, hops: [B.syrup[0]] })
  R(x, INK, 0, 594, 820, 10); R(x, '#8a5a7a', 0, 604, 820, 216); R(x, '#a46c92', 0, 604, 820, 20)
  R(x, '#333048', 70, 570, 250, 30)
  pan(x, 200, 566, t > B.flip[0] && t < B.flip[0] + 0.15 ? -0.3 : 0)
  if (t < B.flip[0]) pancake(x, 200, 548, 100, true)
  else {
    const a = arc(t, B.flip, [200, 548], [630, STUCK], 110)
    pancake(x, a.x, a.y, 100, true, { rot: a.p < 1 ? a.p * 9 : 0, squash: a.p < 1 ? 1 : 0.9 })
    sparkles(x, t, 630, STUCK, B.flip[1], 8, 60, 2, [GOLD, BONE], 18)
  }
  // the stack (proudly burnt) on Taurus' plate
  R(x, INK, 331, 586, 150, 14); R(x, '#f4efe6', 337, 580, 138, 12)
  const n = Math.min(6, Math.floor(prog(t, B.stack - 0.6, B.stack + 0.4) * 6.99))
  for (let i = 0; i < n; i++) pancake(x, 406 + (i % 2 ? 4 : -4), 566 - i * 22, 104, true)
  if (t > B.syrup[0]) {
    const s = prog(t, ...B.syrup)
    R(x, INK, 420 - 12, 566 - n * 22 - 8, 30, 14 + 50 * s); R(x, '#c87b2a', 420 - 8, 566 - n * 22 - 6, 22, 10 + 50 * s)
    // the syrup bottle
    x.save(); x.translate(480, 360); x.rotate(-1.1)
    R(x, INK, -22, -50, 44, 100); R(x, '#d98b2e', -18, -46, 36, 92); R(x, INK, -8, -70, 16, 24); x.restore()
  }
  speech(x, t, 600, 300, B.pair, 'a pair!', { size: 38, life: 1.1, tail: 1, col: '#fff3c4' })
  if (t > B.bite && t < B.bite + 0.8) {
    const k = pop01(t, B.bite, 0.18, 3)
    x.save(); x.translate(400, 330); x.rotate(-0.12); x.scale(k, k)
    x.font = `800 54px Inter, sans-serif`; x.textAlign = 'center'; x.lineWidth = 12; x.strokeStyle = INK; x.strokeText('CRUNCH', 0, 0); x.fillStyle = GOLD; x.fillText('CRUNCH', 0, 0); x.restore()
  }
  if (t > B.bite) hearts(x, t, 600, 300, B.bite + 0.3, { n: 5, life: 1.6, cell: 6, spread: 120 })
  // a little calendar tick
  const ck = pop01(t, B.sunday, 0.3, 2.4)
  if (ck > 0.01) {
    x.save(); x.translate(130, 230); x.rotate(-0.06); x.scale(ck, ck)
    R(x, INK, -60, -56, 120, 112); R(x, '#fffaf0', -54, -50, 108, 100); R(x, '#ff5a7a', -54, -50, 108, 26)
    x.font = `700 18px ${MONO}`; x.fillStyle = '#fff'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('SUN', 0, -37)
    drawBits(x, ['.....G', '....GG', 'G..GG.', 'GGGG..', '.GG...'], { G: '#3cb371' }, 0, 14, 9, { outline: null })
    x.restore()
  }
}

const EP = makeStarted({
  id: 'trstartedpancake', accent: '#ffb347',
  A: { draw: sceneA, stamp: 'DATE 2', sub: 'date two. Aries cooked.' },
  B: { draw: sceneB, stamp: 'SUNDAY', sub: 'every sunday. still burnt.' },
  lines: [{ t: 2.95, text: 'Aries cooks on one setting: *max.*' }, { t: 9.15, text: 'still burnt. *still* Sunday.' }],
  last: '*Tradition.*',
  cues: () => [
    ['tick', A.knob[0], 0.04], ['tick', A.knob[0] + 0.1, 0.04], ['tick', A.knob[0] + 0.2, 0.05], ['pop', A.knob[1], 1046.5, 0.035, -0.4],
    ['pop', A.gotit, 784, 0.035, -0.3],
    ['whoosh', A.flip1[0], 0.35, 0.035], ['tom', A.flip1[1], 220, { gain: 0.15, decay: 0.12 }], ['tick', A.flip1[1], 0.05],
    ['whoosh', A.smoke, 0.8, 0.02], ['whoosh', A.flip2[0], 0.3, 0.03], ['tom', A.flip2[1], 120, { gain: 0.18, decay: 0.15 }],
    ['pop', A.crispy, 587.33, 0.03, 0.3],
    ['tick', A.bite, 0.07], ['tick', A.bite + 0.06, 0.06], ['tick', A.bite + 0.13, 0.05], ['tick', A.bite + 0.2, 0.04],
    ['pluck', A.rate, 1318.51, 0.035, 0.5, 0.3],
    ['whoosh', B.flip[0], 0.35, 0.035], ['tom', B.flip[1], 220, { gain: 0.15, decay: 0.12 }], ['pop', B.pair, 1174.66, 0.035, 0.3],
    ...[0, 1, 2, 3, 4, 5].map(i => ['pop', r3(B.stack - 0.6 + i * 0.16), 700 + i * 90, 0.02, 0.3]),
    ['tick', B.bite, 0.07], ['tick', B.bite + 0.06, 0.06], ['tick', B.bite + 0.13, 0.05],
    ['riser', B.syrup[0], B.syrup[0] + 0.8, 0.015], ['pop', B.sunday, 1567.98, 0.03, -0.3], ['bell', B.sunday + 0.05, 2093, 0.02, 0.9, -0.3],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
