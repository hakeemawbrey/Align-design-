// khee10: HEALING ERA, Ep 10 "Working through it" (24 s vertical, Month 2 boost m15, star_advice post, cinematic · Dm).
// Engine: ../../khee01/healkit.js (sets: ../../khee01/healset.js). Rows: promo/films/month2/m15.md. Loop ending.
//   0.0    frame 0: Capricorn at the kitchen counter at 11 PM typing so hard the laptop keys fly off, five coffee mugs
//          lined up. DAY 1. Hook: "Day 1. Worked 14 hours. *Didn't* feel it."
//   0.6    record scratch + freeze: "hour *fourteen.*"  An ENERGY meter drains; Capricorn face-plants on the keyboard
//          asleep. Pisces sniffles with tissues.
//   6.4    THE STARS: "busy isn't the same as *better.*" / "rest isn't falling behind. it's *healing.*"
//   15.0   6 PM: Capricorn shuts the laptop, writes "feel it: 10 min" on the fridge, then a bubble bath with a rubber
//          duck. Pisces cries at the duck. The calendar tears to DAY 14.
//   21.1   Last line: "Clock out of the *heartbreak.*"  The last 0.42 s eases back into frame 0.
import { makeHeal, lerp, prog, ease, shadow, pop01, R, INK, BONE, ink, label, GOLD, RED, MINT } from '../../khee01/healkit.js'
import { kitchen, laptop } from '../../khee01/healset.js'
import { mug, box } from '../../nste01/singlekit.js'

const FLOOR = 1420, fy = s => FLOOR - 0.44 * s
const CODE = (x, X, Y, W, H) => { R(x, '#0e1a30', X, Y, W, H); for (let i = 0; i < 7; i++) R(x, ['#7fd0ff', '#9fe6b0', '#f2c75c'][i % 3], X + 12 + (i % 3) * 16, Y + 14 + i * 22, 60 + ((i * 37) % 120), 8) }
function keys(x, t, t0, cx, cy) { const tt = ((t - t0) % 0.7 + 0.7) % 0.7; for (let i = 0; i < 4; i++) { const a = -Math.PI / 2 + (i - 1.5) * 0.5, v = 520; const px = cx + Math.cos(a) * v * tt, py = cy + Math.sin(a) * v * tt + 1100 * tt * tt; R(x, INK, px - 14, py - 14, 28, 28); R(x, BONE, px - 10, py - 10, 20, 20) } }
function duck(x, cx, cy, s = 1) { R(x, INK, cx - 34 * s, cy - 24 * s, 68 * s, 40 * s); R(x, GOLD, cx - 30 * s, cy - 20 * s, 60 * s, 32 * s); R(x, INK, cx + 6 * s, cy - 54 * s, 36 * s, 34 * s); R(x, GOLD, cx + 10 * s, cy - 50 * s, 28 * s, 26 * s); R(x, '#f39a3a', cx + 36 * s, cy - 38 * s, 16 * s, 10 * s); R(x, INK, cx + 24 * s, cy - 44 * s, 6 * s, 6 * s) }
function tub(x, t, cx, cy, k = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -260, -120, 520, 130, '#e9e6f4', { b: 8, hi: '#ffffff' })
  for (let i = 0; i < 14; i++) { const bx = -230 + i * 36, by = -130 - ((i * 37) % 3) * 22 + 6 * Math.sin(t * 3 + i); R(x, INK, bx - 22, by - 22, 44, 44); R(x, '#f4fbff', bx - 18, by - 18, 36, 36); R(x, '#c9ecfb', bx - 12, by - 14, 12, 10) }
  R(x, INK, -240, 10, 26, 36); R(x, INK, 214, 10, 26, 36)
  x.restore()
}

function s1(x, t, S) {
  const { u, hero } = S
  kitchen(x, t, { cal: { day: 1 }, stoveClock: '11:02' })
  for (let i = 0; i < 5; i++) mug(x, t, 440 + i * 70, 1056, { s: 0.75, col: ['#e8344e', '#5fa8ff', '#9fe6b0', '#f2c75c', '#c9a6ff'][i], steam: i === 4 })
  const asleep = u > 4.6
  shadow(x, 360, FLOOR + 4, 300)
  hero(x, t, { x: 360, y: fy(300) + (asleep ? 10 : 0), s: 300, mood: asleep ? 'sleepy' : u < 2 ? 'squint' : 'neutral', look: [1, 0], blink: asleep ? undefined : false, squash: asleep ? 0.14 : u < 4.6 ? 0.04 * Math.sin(t * 40) : 0 })
  laptop(x, 650, 1230, { s: 1.0, open: 1, screen: CODE })
  if (u < 0.6 || (u > 1.9 && u < 4.6)) keys(x, t, 0, 650, 1220)
}
function s2(x, t, S) {
  const { u, hero } = S
  kitchen(x, t, { cal: { day: 1 }, stoveClock: '11:30', dim: 0.5 })
  shadow(x, 540, 1300, 260)
  hero(x, t, { x: 540, y: 1185, s: 260, mood: u > 4 ? 'sparkle' : 'sleepy', look: [0, -1] })
  laptop(x, 780, 1290, { s: 0.6, open: 1, screen: CODE })
}
function s3(x, t, S) {
  const { u, hero } = S
  const note = pop01(t, S.t0 + 1.0, 0.3, 2.4)
  kitchen(x, t, { cal: { day: 14 }, stoveClock: '6:00', morning: 0.25, fridgeNote: 'feel it:|10 min', noteK: note })
  const bath = pop01(t, S.t0 + 2.5, 0.4, 2)
  if (bath < 0.5) {
    shadow(x, 380, FLOOR + 4, 290)
    hero(x, t, { x: 380, y: fy(290), s: 290, mood: u < 0.6 ? 'neutral' : 'happy', look: [1, -0.2], hops: [S.t0 + 0.7, S.t0 + 1.0] })
    laptop(x, 660, 1300, { s: 0.9, open: 1 - ease.inOutCubic(prog(u, 0.2, 0.7)), screen: CODE })
  } else {
    hero(x, t, { x: 520, y: 1185, s: 280, mood: 'happy', look: [1, -0.3], squash: 0.05 })
    tub(x, t, 540, 1400, bath)
    duck(x, 700, 1250, bath)
  }
}
function fin(x, t, S) {
  const { u, hero } = S
  kitchen(x, t, { cal: { day: 14 }, stoveClock: '6:20', morning: 0.25, dim: 0.3, fridgeNote: 'feel it:|10 min' })
  hero(x, t, { x: 520, y: 1175, s: 300, mood: u > 0.8 ? 'happy' : 'sparkle', look: [0, 0], squash: 0.05, hops: [S.t0 + 0.1, S.T.lastAt + 0.05] })
  tub(x, t, 540, 1400, 1)
  duck(x, 720, 1250, 1)
}
function top(x, t) {
  // the ENERGY meter draining during scene 1
  if (t < 1.9 || t > 6.3) return
  const k = pop01(t, 1.9, 0.3, 2.2), e = 1 - prog(t, 2.0, 4.6)
  x.save(); x.translate(540, 560); x.scale(k, k)
  R(x, INK, -250, -50, 500, 100); R(x, '#1e1844', -244, -44, 488, 88)
  label(x, 'ENERGY', -220, -18, { size: 26, align: 'left', col: GOLD })
  for (let i = 0; i < 10; i++) R(x, (i + 1) / 10 <= e + 0.001 ? (e < 0.3 ? RED : MINT) : '#3a3170', -220 + i * 44, 4, 36, 26)
  if (e <= 0) label(x, 'ZZZ', 200, -18, { size: 26, col: BONE })
  x.restore()
}

const EP = makeHeal({
  id: 'khee10', sign: 'capricorn', name: 'Capricorn', len: 24, ending: 'loop',
  hook: 'Day 1. Worked 14 hours. | *Didn’t* feel it.',
  brk: { kind: 'scratch', at: 0.6, len: 1.3, text: 'hour *fourteen.*' },
  whip: { x: 540, y: 1150 },
  h1: 'The feelings *wait up.*', h2: 'Log off at *six.*',
  lines: ['busy isn’t the same as *better.*', 'rest isn’t falling behind. it’s *healing.*'],
  last: 'Clock out of | the *heartbreak.*', lastSize: 88, lastAccent: 108, day: 1, dayTo: 14,
  bubbles: [
    { t0: 17.8, t1: 20.0, x: 500, y: 920, text: '10 minutes of feelings. okay.', size: 36, tail: -0.1 },
  ],
  pis1: { x: 930, y: 1350, s: 150 }, pis3: { x: 940, y: 1352, s: 150 },
  s1, s2, s3, fin, top,
  cues: [...Array.from({ length: 10 }, (_, i) => ['tick', 0.02 + i * 0.06, 0.03]), ...Array.from({ length: 30 }, (_, i) => ['tick', 1.95 + i * 0.09, 0.02]), ['pop', 4.6, 196, 0.05, 0], ['pop', 15.3, 330, 0.05, 0.3], ['tick', 15.7, 0.06], ['pop', 16.0, 1174.66, 0.04, -0.3], ['glitter', 17.5, 18.0], ['pop', 17.55, 1567.98, 0.04, 0.3], ['pop', 17.7, 1318.51, 0.035, 0.3]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [ink, lerp]
