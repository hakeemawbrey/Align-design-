// khee19: HEALING ERA, Ep 19 "Taurus: rebuilding the routine" (75 s vertical, Month 2 boost m15, star_advice post, lofi · Db).
// Engine: ../../khee01/healong.js (sets: ../../khee01/healset.js). Rows: promo/films/month2/m15.md. Loops back to frame 0.
//   0.0   frame 0: Taurus face-down in a pile of laundry on the kitchen floor, the plant beside it wilting dramatically.
//         DAY 1. Hook: "The routine *broke.* So did I."  0.6 record scratch: "the plant *also* gave up."
//         2.0 the promise sticker: "watch the plant."  Pisces sniffles.
//   6.0   1 · ONE TINY THING (day 2): Taurus can't face the list. THE STARS: "start with one *tiny* thing."
//         It sits up and waters the plant. That's it.
//   19.0  2 · IT COUNTS (day 6): a checklist on the fridge: "bed ☐ laundry ☐ plant ✓". THE STARS: "one thing done is a
//         *whole* win." Taurus folds one sock, proudly.
//   33.0  3 · THE BAD DAY (day 11): cereal for dinner on the floor again. Cancer turns up with a pot of stew and stays
//         for a film. THE STARS: "bad days come back. so do *friends.*"
//   47.0  4 · BREAD (day 19): Taurus bakes a loaf, walks the kitchen humming; the plant has a new leaf.
//         THE STARS: "look. a *new* leaf."
//   61.0  5 · DAY 30: morning light, the bed made, the plant in bloom. THE STARS: "you grew back, *slowly.* best way."
//   68.0  the payoff: back on the day-1 floor by the laundry, now smiling, the plant blooming. Last line:
//         "One leaf at a *time.*" (73.1), then the last 0.42 s eases into frame 0.
import { makeHealLong, lerp, prog, ease, shadow, pop01, R, INK, BONE, ink } from '../../khee01/healong.js'
import { kitchen, plant, blanket } from '../../khee01/healset.js'
import { mug, box } from '../../nste01/singlekit.js'

const FLOOR = 1420, fy = s => FLOOR - 0.44 * s
const LAUNDRY = ['#7fd0ff', '#ff8fb1', '#9fe6b0', '#f2c75c', '#c9a6ff', '#ff9b5c', '#efe6d6']
function laundry(x, cx, cy, n = 12, spread = 1) { for (let i = 0; i < n; i++) { const a = i * 2.4, r = (i % 4) * 40 * spread; const px = cx + Math.cos(a) * r * 1.6, py = cy - (i % 3) * 30 + Math.sin(a) * r * 0.3; x.save(); x.translate(px, py); x.rotate(a); R(x, INK, -50, -24, 100, 48); R(x, LAUNDRY[i % 7], -46, -20, 92, 40); x.restore() } }
function can(x, cx, cy, tip = 0, t = 0) { x.save(); x.translate(cx, cy); x.rotate(tip); box(x, -50, -40, 100, 70, '#5fa8ff', { b: 5 }); R(x, INK, 46, -30, 70, 14); x.restore(); if (tip < -0.3) for (let i = 0; i < 5; i++) { const p = ((t * 2 + i / 5) % 1); R(x, '#7fd0ff', cx - 110 - p * 30, cy + 10 + p * 90, 8, 14) } }
function loaf(x, cx, cy, k = 1) { if (k <= 0.01) return; x.save(); x.translate(cx, cy); x.scale(k, k); x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 90, 58, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#d9a35c'; x.beginPath(); x.ellipse(0, 0, 82, 50, 0, 0, Math.PI * 2); x.fill(); R(x, '#f2d39a', -44, -16, 88, 8); R(x, '#f2d39a', -30, 4, 60, 8); x.restore() }
function hum(x, t, cx, cy) { for (let i = 0; i < 3; i++) { const p = ((t * 0.7 + i / 3) % 1); x.save(); x.globalAlpha = Math.sin(Math.PI * p); R(x, INK, cx + i * 40 - 4, cy - p * 160 - 4, 24, 24); R(x, '#f2c75c', cx + i * 40, cy - p * 160, 16, 16); R(x, INK, cx + i * 40 + 14, cy - p * 160 - 30, 6, 34); x.restore() } }

function open(x, t, S) {
  const { u, hero, crier } = S
  kitchen(x, t, { cal: { day: 1 }, stoveClock: '4:44', dim: 0.15, mess: 0.4 })
  plant(x, t, 760, 1410, { s: 1.1, wilt: lerp(0.6, 1, ease.outCubic(prog(u, -0.4, 0.5))), leaves: 3 })
  crier(x, t, 'pisces', { x: 940, y: fy(140), s: 140, mood: 'wide', look: [-1, -0.5] }, 2)
  laundry(x, 440, 1400, 14, 1.2)
  hero(x, t, { x: 440, y: fy(260) + 30, s: 260, mood: u < 2 ? 'wide' : 'sleepy', look: [0, 1], squash: 0.24, zzz: false, blink: false })
  laundry(x, 440, 1470, 5, 0.8)
}
function ch1(x, t, S) {
  const { u, hero, crier } = S
  kitchen(x, t, { cal: { day: 2 }, stoveClock: '11:20', dim: 0.1, mess: 0.4 })
  const water = u > 7
  plant(x, t, 760, 1410, { s: 1.1, wilt: water ? lerp(1, 0.7, prog(u, 8, 12)) : 1, leaves: 3 })
  crier(x, t, 'pisces', { x: 940, y: fy(140), s: 140, mood: 'wide', look: [-1, -0.5] }, 2)
  laundry(x, 380, 1410, 10, 1)
  const up = ease.inOutCubic(prog(u, 5, 6.2))
  shadow(x, 480, FLOOR + 4, 280)
  hero(x, t, { x: 480, y: lerp(fy(260) + 46, fy(270), up), s: lerp(260, 270, up), mood: up < 0.5 ? 'sleepy' : 'neutral', look: [1, 0], squash: lerp(0.3, 0, up), zzz: false })
  if (water) can(x, 640, 1200, -0.6 * Math.sin(Math.PI * prog(u, 7.2, 12.0)), t)
}
function ch2(x, t, S) {
  const { u, hero, crier } = S
  const tick = pop01(t, S.t0 + 6.0, 0.3, 2.4)
  kitchen(x, t, { cal: { day: 6 }, stoveClock: '10:00', morning: 0.3, fridgeNote: 'bed ☐  laundry ☐|plant ✓', noteK: pop01(t, S.t0 + 1.0, 0.3, 2.2) })
  plant(x, t, 760, 1410, { s: 1.1, wilt: 0.55, leaves: 3 })
  crier(x, t, 'pisces', { x: 940, y: fy(140), s: 140, mood: 'sparkle', look: [-1, -0.5] }, 2)
  laundry(x, 360, 1410, 8, 0.9)
  shadow(x, 520, FLOOR + 4, 280)
  hero(x, t, { x: 520, y: fy(280), s: 280, mood: u > 6 ? 'happy' : 'sparkle', look: [-1, -0.5], hops: [S.t0 + 6.1, S.t0 + 6.5, S.t0 + 10, S.t0 + 10.4] })
  // the one folded sock
  if (u > 9) { R(x, INK, 590, 1360, 70, 50); R(x, '#ff8fb1', 594, 1364, 62, 42) }
  void tick
}
function ch3(x, t, S) {
  const { u, hero, star, crier } = S
  const ck = pop01(t, S.t0 + 4.4, 0.35, 2.2)
  kitchen(x, t, { cal: { day: 11 }, stoveClock: '8:50', dim: 0.35 * (1 - prog(u, 4.4, 5)) + 0.15, pot: ck > 0.5 })
  plant(x, t, 820, 1410, { s: 1.0, wilt: 0.7, leaves: 3 })
  crier(x, t, 'pisces', { x: 960, y: fy(130), s: 130, mood: 'wide', look: [-1, -0.5] }, 3)
  shadow(x, 400, FLOOR + 4, 280)
  hero(x, t, { x: 400, y: fy(270) + 20, s: 270, mood: u < 4.4 ? 'neutral' : u < 9 ? 'sparkle' : 'happy', look: [1, 0], squash: 0.15 })
  mug(x, t, 560, 1410, { s: 0.9, col: '#ffb03a', steam: false })
  if (ck > 0.01) { shadow(x, 660, FLOOR + 4, 240); star(x, t, 'cancer', { x: 660, y: fy(240), s: 240, pop: ck, mood: 'happy', look: [-1, 0], seed: 21, squash: u > 8 ? 0.15 : 0 }) }
  if (u > 8) blanket(x, 520, 1430, 500, 50, { col: '#f39a3a', col2: '#ffb36b' })
}
function ch4(x, t, S) {
  const { u, hero, crier } = S
  kitchen(x, t, { cal: { day: 19 }, stoveClock: '11:30', morning: 0.5 })
  plant(x, t, 820, 1410, { s: 1.1, wilt: lerp(0.4, 0.15, prog(u, 0, 10)), leaves: u > 7 ? 4 : 3 })
  crier(x, t, 'pisces', { x: 960, y: fy(130), s: 130, mood: u > 7.5 ? 'sparkle' : 'happy', look: [-1, -0.5] }, u > 7.5 ? 3 : 1)
  loaf(x, 560, 1030, pop01(t, S.t0 + 2.0, 0.4, 2.6))
  const w = Math.sin(u * 0.9) * 0.5 + 0.5
  shadow(x, lerp(300, 560, w), FLOOR + 4, 280)
  hero(x, t, { x: lerp(300, 560, w), y: fy(280), s: 280, mood: 'happy', look: [1, -0.3], hops: Array.from({ length: 12 }, (_, i) => S.t0 + 0.4 + i * 1.1) })
  hum(x, t, lerp(300, 560, w) + 120, 1100)
}
function ch5(x, t, S) {
  const { u, hero, crier } = S
  kitchen(x, t, { cal: { day: 30 }, stoveClock: '8:05', morning: 0.85 })
  plant(x, t, 820, 1410, { s: 1.15, wilt: 0, leaves: 5, bloom: pop01(t, S.t0 + 1.0, 0.5, 2.4) })
  crier(x, t, 'pisces', { x: 960, y: fy(130), s: 130, mood: 'happy', look: [-1, -0.5] }, 3)
  shadow(x, 460, FLOOR + 4, 290)
  hero(x, t, { x: 460, y: fy(290), s: 290, mood: 'happy', look: [1, -0.3], hops: [S.t0 + 0.3, S.t0 + 1.3] })
  hum(x, t, 600, 1080)
  mug(x, t, 620, 1410, { s: 0.9, col: '#9fe6b0' })
  void u
}
function fin(x, t, S) {
  const { u, hero, crier, star } = S
  kitchen(x, t, { cal: { day: 30 }, stoveClock: '9:00', morning: 0.6 })
  plant(x, t, 760, 1410, { s: 1.1, wilt: 0, leaves: 5, bloom: 1 })
  star(x, t, 'cancer', { x: 600, y: fy(200), s: 200, mood: 'happy', look: [-1, 0], seed: 21, pop: pop01(t, S.t0 + 0.8, 0.35, 2.2) })
  crier(x, t, 'pisces', { x: 940, y: fy(140), s: 140, mood: 'happy', look: [-1, -0.5], pop: pop01(t, S.t0 + 1.1, 0.35, 2.2) }, 3)
  laundry(x, 400, 1410, 8, 1)
  shadow(x, 400, FLOOR + 4, 290)
  hero(x, t, { x: 400, y: fy(280), s: 280, mood: u > 1 ? 'happy' : 'sparkle', look: [0, 0], hops: [S.lastAt + 0.05] })
}

const EP = makeHealLong({
  id: 'khee19', sign: 'taurus', len: 75, accent: '#9fe6b0',
  hook: 'The routine *broke.* | So did I.',
  brk: { at: 0.6, len: 1.3, text: 'the plant *also* gave up.' },
  whip: { x: 560, y: 1200 },
  promise: 'watch the plant.',
  open,
  chapters: [
    { at: 6.0, title: 'one tiny thing', day0: 1, day: 2, paint: ch1, lines: [{ t: 8.0, text: 'start with one *tiny* thing.' }] },
    { at: 19.0, title: 'it counts', day: 6, paint: ch2, lines: [{ t: 26.4, text: 'one thing done is a *whole* win.' }] },
    { at: 33.0, title: 'the bad day', day: 11, paint: ch3, lines: [{ t: 41.6, text: 'bad days come back. so do *friends.*' }] },
    { at: 47.0, title: 'bread', day: 19, paint: ch4, lines: [{ t: 54.4, text: 'look. a *new* leaf.' }] },
    { at: 61.0, title: 'day 30', day: 30, paint: ch5, lines: [{ t: 63.0, text: 'you grew back, *slowly.* best way.' }] },
  ],
  finAt: 68.0, fin, finDay: 30,
  last: 'One leaf | at a *time.*',
  bubbles: [
    { t0: 2.4, t1: 5.6, x: 480, y: 1060, text: 'mmmf (into the laundry)', size: 36, tail: -0.1 },
    { t0: 6.6, t1: 7.8, x: 480, y: 1000, text: 'laundry. dishes. life. no.', size: 36, tail: -0.1 },
    { t0: 13.6, t1: 17.6, x: 520, y: 980, text: 'okay. just the plant.', size: 40, tail: 0 },
    { t0: 20.4, t1: 25.4, x: 520, y: 980, text: 'i watered it. that’s it.', size: 38, tail: 0 },
    { t0: 28.6, t1: 32.4, x: 560, y: 980, text: 'folded one (1) sock.', size: 40, tail: 0.1 },
    { t0: 34.0, t1: 37.0, x: 420, y: 1000, text: 'cereal. for dinner. again.', size: 36, tail: -0.1 },
    { t0: 37.8, t1: 41.0, x: 660, y: 940, text: 'stew. and i’m staying.', size: 38, tail: 0.1, col: '#ffe2c4' },
    { t0: 48.4, t1: 52.4, x: 560, y: 900, text: 'i made BREAD.', size: 44, tail: 0 },
    { t0: 55.8, t1: 59.8, x: 800, y: 1020, text: 'a new leaf!!', size: 40, tail: 0.3, col: '#d4f6dc' },
    { t0: 65.0, t1: 67.6, x: 520, y: 980, text: 'bed made. plant blooming.', size: 36, tail: 0 },
    { t0: 69.0, t1: 71.6, x: 460, y: 1000, text: 'same laundry. new me.', size: 38, tail: -0.1 },
  ],
  cues: [['whoosh', 0.0, 0.5, 0.05], ['pop', 0.25, 196, 0.05, 0], ['pop', 13.2, 523.25, 0.04, 0.3], ...Array.from({ length: 6 }, (_, i) => ['pluck', 14 + i * 0.5, 1046.5, 0.012, 0.2, 0.3]), ['pop', 25.0, 1174.66, 0.04, 0], ['bell', 25.1, 1567.98, 0.03, 0.8, 0], ['pop', 37.4, 880, 0.04, 0.3], ['bell', 49.0, 1318.51, 0.03, 0.8, 0], ['glitter', 49.0, 49.4], ['pop', 54.0, 1318.51, 0.04, 0.3], ['glitter', 62.0, 62.6]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void ink
