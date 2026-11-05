// khee11: HEALING ERA, Ep 11 "“We're still friends!”" (20 s vertical, Month 2 boost m15, star_advice post, funk · E).
// Engine: ../../khee01/healkit.js (sets: ../../khee01/healset.js). Rows: promo/films/month2/m15.md. Hard cut.
//   0.0    frame 0: Aquarius mid-wave at a video call with its ex (a plain grey star on the laptop screen, also on a
//          kitchen floor), both smiles stretched far too wide. DAY 1. Hook: "Day 1. “Let's stay friends!” *Today.*"
//   0.6    whip zoom; the kit's loading bar: "being normal…" stalls at 12 % → "Error: way too soon". The awkward
//          silence (crickets): "sooo… how's your mom?"  Pisces sniffles.
//   6.4    THE STARS: "friendship can come *later.*" / "space first. it's not cold. it's *kind.*"
//   12.4   Aquarius ends the call gently: "i need some space. take care."  It builds a blanket fort (Pisces sniffles
//          inside). The calendar tears to DAY 30: a calm "hey, how are you?" that doesn't hurt.
//   17.7   Last line: "Space first. Friends *maybe.*"  (accent lands at 19.05, holds to the last frame)
import { makeHeal, lerp, prog, ease, shadow, pop01, R, INK, BONE, drawStarChar } from '../../khee01/healkit.js'
import { kitchen, laptop } from '../../khee01/healset.js'
import { loadingBar, loadingBarCues } from '../../hookkit.js'

const FLOOR = 1420, fy = s => FLOOR - 0.44 * s
const LOAD = { at: 1.5, len: 2.5, label: 'being normal…', stallAt: 12, error: 'Error: way too soon', y: 720 }
const callScreen = (t, mood, on = 1) => (x, X, Y, W, H) => {
  R(x, '#3a2c5a', X, Y, W, H); R(x, '#4a3a70', X, Y + H * 0.65, W, H * 0.35)
  if (on > 0) drawStarChar(x, X + W / 2, Y + H * 0.56, 110, t, { color: '#a7a2b4', mood, look: [0, 0], seed: 21, glow: 0.4, tips: false })
  else { R(x, '#120e28', X, Y, W, H); R(x, '#e8344e', X + W / 2 - 30, Y + H / 2 - 14, 60, 28) }
  R(x, '#e8344e', X + W - 30, Y + 10, 16, 16)
}
function fort(x, t, cx, k = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, FLOOR); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-300, 6); x.lineTo(0, -430); x.lineTo(300, 6); x.closePath(); x.fill()
  x.fillStyle = '#7c74f0'; x.beginPath(); x.moveTo(-286, 0); x.lineTo(0, -416); x.lineTo(286, 0); x.closePath(); x.fill()
  x.fillStyle = '#9a92ff'; for (let i = -3; i <= 3; i++) { x.beginPath(); x.moveTo(i * 70 - 16, 0); x.lineTo(i * 4, -400); x.lineTo(i * 70 + 16, 0); x.closePath(); x.fill() }
  x.fillStyle = '#2a1f5a'; x.beginPath(); x.moveTo(-170, 0); x.lineTo(0, -250); x.lineTo(170, 0); x.closePath(); x.fill()
  // fairy lights along the edge
  for (let i = 0; i < 9; i++) { const p = i / 8, px = lerp(-280, 280, p), py = -416 * (1 - Math.abs(p - 0.5) * 2) + 10; R(x, INK, px - 8, py - 8, 16, 16); R(x, ['#f2c75c', '#ff8fb1', '#7fd0ff'][i % 3], px - 5, py - 5, 10, 10) }
  x.restore()
}

function s1(x, t, S) {
  const { u, hero } = S
  kitchen(x, t, { cal: { day: 1 }, stoveClock: '4:15' })
  shadow(x, 360, FLOOR + 4, 290)
  const wave = u < 0.6 || (u > 1.5 && u < 2.5)
  hero(x, t, { x: 360, y: fy(290), s: 290, mood: u < 4.0 ? 'happy' : 'neutral', look: [1, 0], squash: -0.04 + (wave ? 0.06 * Math.sin(t * 22) : 0), blink: false })
  laptop(x, 680, 1300, { s: 1.15, open: 1, screen: callScreen(t, u < 4 ? 'happy' : 'neutral') })
}
function s2(x, t, S) {
  const { u, hero } = S
  kitchen(x, t, { cal: { day: 1 }, stoveClock: '4:20', dim: 0.5 })
  shadow(x, 540, 1300, 260)
  hero(x, t, { x: 540, y: 1185, s: 260, mood: u > 4 ? 'sparkle' : 'neutral', look: [0, -1] })
  laptop(x, 790, 1300, { s: 0.6, open: 1, screen: callScreen(t, 'neutral') })
}
function s3(x, t, S) {
  const { u, hero, crier } = S
  const later = u > 3.6
  kitchen(x, t, { cal: { day: 30 }, stoveClock: later ? '5:30' : '4:24', morning: later ? 0.35 : 0 })
  const fk = pop01(t, S.t0 + 2.4, 0.4, 2)
  fort(x, t, 560, fk)
  if (u < 2.4) laptop(x, 700, 1300, { s: 1.0, open: 1 - ease.inOutCubic(prog(u, 1.8, 2.3)), screen: callScreen(t, 'happy', u < 1.8 ? 1 : 0) })
  if (fk > 0.3) crier(x, t, 'pisces', { x: 660, y: fy(150), s: 150, mood: 'sparkle', look: [-1, 0] }, 1)
  shadow(x, 400, FLOOR + 4, 280)
  hero(x, t, { x: fk > 0.3 ? 470 : 380, y: fy(280), s: 280, mood: u < 2.4 ? 'neutral' : 'happy', look: [1, -0.2], hops: [S.t0 + 2.4, S.t0 + 2.8] })
}
function fin(x, t, S) {
  const { u, hero, crier } = S
  kitchen(x, t, { cal: { day: 30 }, stoveClock: '5:35', morning: 0.35, dim: 0.3 })
  fort(x, t, 560, 1)
  crier(x, t, 'pisces', { x: 680, y: fy(150), s: 150, mood: 'happy', look: [-1, 0] }, 3)
  hero(x, t, { x: 470, y: 1250, s: 290, mood: u > 1 ? 'happy' : 'sparkle', look: [0, 0], hops: [S.t0 + 0.1, S.T.lastAt + 0.05] })
}

const EP = makeHeal({
  id: 'khee11', sign: 'aquarius', name: 'Aquarius', len: 20, ending: 'cut',
  hook: 'Day 1. “Let’s stay | friends!” *Today.*',
  brk: { kind: 'whip', at: 0.6, x: 600, y: 1150 },
  whip: { x: 540, y: 1150 },
  kit: [loadingBar(LOAD)], kitCues: loadingBarCues(LOAD),
  h1: 'Not now *isn’t* never.', h2: 'Take some *space.*',
  lines: ['friendship can come *later.*', 'space first. it’s not cold. it’s *kind.*'],
  last: 'Space first. | Friends *maybe.*', day: 1, dayTo: 30, noFinPisces: true,
  bubbles: [
    { t0: 4.2, t1: 6.2, x: 420, y: 960, text: 'sooo… how’s your mom?', size: 40, tail: -0.2 },
    { t0: 12.6, t1: 14.6, x: 460, y: 940, text: 'i need some space. take care.', size: 36, tail: -0.2 },
    { t0: 16.0, t1: 17.6, x: 560, y: 900, text: '(day 30) “hey, how are you?” — good.', size: 32, tail: -0.1, col: '#e4f6ea' },
  ],
  pis1: { x: 930, y: 1350, s: 150 },
  s1, s2, s3, fin,
  cues: [['pop', 0.1, 1046.5, 0.03, 0.3], ...Array.from({ length: 6 }, (_, i) => ['pluck', 4.0 + i * 0.33, 3520, 0.008, 0.08, 0.5]), ['bell', 12.6, 880, 0.02, 0.8, 0.2], ['pop', 14.2, 262, 0.04, 0.3], ['whoosh', 14.8, 0.4, 0.03], ['glitter', 14.9, 15.3], ['pop', 16.0, 1318.51, 0.035, 0]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void BONE
