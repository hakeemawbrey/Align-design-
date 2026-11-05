// khee17: HEALING ERA, Ep 17 "Scorpio: the situationship, 30 days" (75 s vertical, Month 2 boost m15, star_advice post, screwed · Fm).
// Engine: ../../khee01/healong.js (sets: ../../khee01/healset.js). Rows: promo/films/month2/m15.md. Loops back to frame 0.
//   0.0   frame 0: Scorpio mid-scream into a pillow on the kitchen floor, feathers flying everywhere. DAY 1.
//         Hook: "We were *never* official. It still hurts."  0.6 record scratch: "“it wasn't even a *thing.*”"
//         2.0 the promise sticker: "the ending, though."  Pisces sniffles.
//   6.0   1 · NO TITLE (day 2): "it wasn't official, so i'm not allowed to be sad?" Scorpio argues with itself (two
//         bubbles). THE STARS: "it doesn't need a title to *hurt.*"
//   19.0  2 · THE 2 A.M. SCROLL (day 6): phone glow; Scorpio taps MUTE. Aquarius turns up with a puzzle and no questions;
//         pieces click in, one by one. THE STARS: "you don't have to explain it to *heal* it."
//   33.0  3 · THE ALMOST-TEXT (day 12): a snowy bus stop; Scorpio types "i miss" … deletes it. Pisces at the stop cries.
//         THE STARS: "you can miss them *and* not text."
//   47.0  4 · OUT LOUD (day 20): Scorpio tells Aquarius the whole story for the first time and laughs at one part; a
//         meter: HEART · REPAIRING… fills. THE STARS: "say it out loud. it gets *smaller.*"
//   60.0  5 · DAY 30: a calm morning, coffee, a plan with friends on the fridge. THE STARS: "you knew what you *needed.*"
//   67.0  the payoff: back on the day-1 floor, hugging the same pillow, now smiling. Last line: "Untitled still *counts.*"
//         (73.1), then the last 0.42 s eases into frame 0.
import { makeHealLong, lerp, prog, ease, shadow, pop01, R, INK, BONE, GOLD, label, ink } from '../../khee01/healong.js'
import { kitchen, bigPhone, blanket } from '../../khee01/healset.js'
import { street, mug } from '../../nste01/singlekit.js'

const FLOOR = 1420, fy = s => FLOOR - 0.44 * s
function pillow(x, cx, cy, rot = 0, s = 1) { x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s); R(x, INK, -110, -60, 220, 120); R(x, '#f4f0ff', -104, -54, 208, 108); R(x, '#d8d0ee', -104, 30, 208, 24); x.restore() }
function feathers(x, t, t0, cx, cy, n = 10) { for (let i = 0; i < n; i++) { const tt = Math.max(0, t - t0 + 0.4), a = (i / n) * Math.PI * 2; const px = cx + Math.cos(a) * 260 * Math.min(1, tt) + Math.sin(t * 2 + i) * 30, py = cy + Math.sin(a) * 200 * Math.min(1, tt) + tt * 60; if (py > FLOOR) continue; x.save(); x.translate(px, py); x.rotate(Math.sin(t * 3 + i)); R(x, INK, -20, -6, 40, 12); R(x, BONE, -18, -4, 36, 8); x.restore() } }
function puzzle(x, n, cx, cy) { for (let i = 0; i < 9; i++) { const gx = cx - 90 + (i % 3) * 60, gy = cy - 60 + Math.floor(i / 3) * 40; R(x, INK, gx, gy, 58, 38); R(x, i < n ? ['#7fd0ff', '#f2c75c', '#ff8fb1'][i % 3] : '#3a3170', gx + 3, gy + 3, 52, 32) } }
function busStop(x, t) {
  street(x, t, { groundY: 1300, lamps: [120], houses: true })
  R(x, INK, 860, 760, 14, 540); R(x, INK, 800, 740, 140, 90); R(x, '#3fae5a', 806, 746, 128, 78); ink(x, 'BUS', 870, 786, { size: 34, col: BONE })
  R(x, INK, 380, 1180, 420, 24); R(x, '#8a6a4a', 384, 1184, 412, 16); R(x, INK, 400, 1200, 16, 100); R(x, INK, 760, 1200, 16, 100)
}

function open(x, t, S) {
  const { u, crier } = S
  kitchen(x, t, { cal: { day: 1 }, stoveClock: '1:13', dim: 0.2 })
  crier(x, t, 'pisces', { x: 930, y: fy(150), s: 150, mood: 'wide', look: [-1, -0.5] }, 2)
  shadow(x, 460, FLOOR + 4, 300)
  const scream = u < 0.6 || u > 2.0
  S.hero(x, t, { x: 460, y: fy(300), s: 300, mood: scream ? 'squint' : 'wide', look: [1, 0], squash: scream ? 0.06 * Math.sin(t * 30) : 0, blink: false })
  pillow(x, 600, 1240, -0.3 + 0.05 * Math.sin(t * 20), 1)
  feathers(x, t, 0, 600, 1200, 12)
}
function ch1(x, t, S) {
  const { u, hero, crier } = S
  kitchen(x, t, { cal: { day: 2 }, stoveClock: '4:20', dim: 0.1 })
  crier(x, t, 'pisces', { x: 930, y: fy(150), s: 150, mood: 'wide', look: [-1, -0.5] }, 2)
  shadow(x, 460, FLOOR + 4, 290)
  const side = Math.floor((u - 1) / 1.6) % 2
  hero(x, t, { x: 460 + (u > 1 && u < 8 ? (side ? 20 : -20) : 0), y: fy(290), s: 290, mood: u < 8 ? (side ? 'squint' : 'wide') : 'sparkle', look: [side ? 1 : -1, 0], hops: [1.0, 2.6, 4.2, 5.8].map(v => S.t0 + v) })
  pillow(x, 640, 1370, 0.1, 0.8)
  for (let i = 0; i < Math.min(6, Math.floor(u * 0.6)); i++) { R(x, INK, 700 + (i % 3) * 50, 1380 - Math.floor(i / 3) * 36, 44, 32); R(x, '#f4f0ff', 704 + (i % 3) * 50, 1384 - Math.floor(i / 3) * 36, 36, 24) }
}
function ch2(x, t, S) {
  const { u, hero, star, crier } = S
  const aq = pop01(t, S.t0 + 4.6, 0.35, 2.2)
  kitchen(x, t, { cal: { day: 6 }, stoveClock: '2:00', dim: 0.55 * (1 - prog(u, 4.6, 5.4)) + 0.1 })
  crier(x, t, 'pisces', { x: 940, y: fy(140), s: 140, mood: 'wide', look: [-1, -0.5] }, 1)
  shadow(x, 400, FLOOR + 4, 290)
  hero(x, t, { x: 400, y: fy(290), s: 290, mood: u < 2 ? 'wide' : u < 4.6 ? 'neutral' : 'sparkle', look: [1, 0.2] })
  blanket(x, 400, 1405, 360, 90, { col: '#3a3478', col2: '#4a4490' })
  if (u < 4.6) { bigPhone(x, t, 640, 1180, { w: 200, h: 340, rot: 0.08, mode: u < 2 ? 'chat' : 'blank', scroll: u * 600 }); if (u > 1.6 && u < 3.2) { R(x, INK, 560, 1270, 160, 52); R(x, '#5a5a7a', 564, 1274, 152, 44); ink(x, 'MUTE', 640, 1297, { size: 26, col: BONE }) } }
  if (aq > 0.01) { star(x, t, 'aquarius', { x: 720, y: fy(240), s: 240, pop: aq, mood: 'happy', look: [-1, 0], seed: 19 }); puzzle(x, Math.floor(prog(u, 6, 13) * 9), 560, 1440 - 40) }
}
function ch3(x, t, S) {
  const { u, hero, crier } = S
  busStop(x, t)
  crier(x, t, 'pisces', { x: 900, y: 1230, s: 140, mood: 'wide', look: [-1, -0.5] }, 3)
  hero(x, t, { x: 560, y: 1110, s: 280, mood: u < 6.5 ? 'neutral' : u < 8 ? 'wide' : 'sparkle', look: [0.5, 0.6] })
  if (u < 9) bigPhone(x, t, 720, 1120, { w: 170, h: 280, rot: 0.1, mode: 'notes', title: 'to: them', lines: ['i miss'], typed: u < 5 ? prog(u, 1, 4) : 1 - prog(u, 6.5, 7.6) })
}
function ch4(x, t, S) {
  const { u, hero, star, crier } = S
  kitchen(x, t, { cal: { day: 20 }, stoveClock: '8:10', morning: 0.2 })
  crier(x, t, 'pisces', { x: 940, y: fy(140), s: 140, mood: 'sparkle', look: [-1, -0.5] }, 2)
  shadow(x, 380, FLOOR + 4, 280); shadow(x, 680, FLOOR + 4, 240)
  const laugh = u > 6 && u < 8
  hero(x, t, { x: 380, y: fy(280), s: 280, mood: laugh ? 'happy' : u < 6 ? 'neutral' : 'sparkle', look: [1, 0], squash: laugh ? 0.08 * Math.abs(Math.sin(u * 12)) : 0, hops: [0.5, 1.5, 2.5, 3.5, 4.5].map(v => S.t0 + v) })
  star(x, t, 'aquarius', { x: 680, y: fy(240), s: 240, mood: laugh ? 'happy' : 'neutral', look: [-1, 0], seed: 19 })
  mug(x, t, 530, 1410, { s: 0.8, col: '#7fd0ff' }); mug(x, t, 820, 1410, { s: 0.8, col: '#ff8fb1' })
}
function ch5(x, t, S) {
  const { u, hero, crier } = S
  kitchen(x, t, { cal: { day: 30 }, stoveClock: '9:00', morning: 0.7, fridgeNote: 'sat: brunch|w/ the crew', noteK: pop01(t, S.t0 + 2.0, 0.3, 2.2) })
  crier(x, t, 'pisces', { x: 940, y: fy(140), s: 140, mood: 'happy', look: [-1, -0.5] }, 3)
  shadow(x, 480, FLOOR + 4, 290)
  hero(x, t, { x: 480, y: fy(290), s: 290, mood: 'happy', look: [1, -0.4], hops: [S.t0 + 0.4, S.t0 + 2.1] })
  mug(x, t, 680, 1410, { s: 1, col: '#f2c75c' })
  void u
}
function fin(x, t, S) {
  const { u, crier, star } = S
  kitchen(x, t, { cal: { day: 30 }, stoveClock: '9:30', morning: 0.6 })
  star(x, t, 'aquarius', { x: 780, y: fy(220), s: 220, mood: 'happy', look: [-1, 0], seed: 19, pop: pop01(t, S.t0 + 0.8, 0.35, 2.2) })
  crier(x, t, 'pisces', { x: 940, y: fy(150), s: 150, mood: 'happy', look: [-1, -0.5], pop: pop01(t, S.t0 + 1.1, 0.35, 2.2) }, 3)
  shadow(x, 460, FLOOR + 4, 300)
  S.hero(x, t, { x: 460, y: fy(300), s: 300, mood: u > 1 ? 'happy' : 'sparkle', look: [0, 0], hops: [S.lastAt + 0.05] })
  pillow(x, 600, 1300, -0.2, 0.9)
}
function top(x, t) {
  // HEART · REPAIRING… meter (chapter 4)
  if (t < 48.5 || t > 59.8) return
  const k = pop01(t, 48.5, 0.3, 2.2), f = prog(t, 49, 58)
  x.save(); x.translate(540, 560); x.scale(k, k)
  R(x, INK, -260, -50, 520, 100); R(x, '#1e1844', -254, -44, 508, 88)
  label(x, 'HEART · REPAIRING…', -230, -18, { size: 24, align: 'left', col: GOLD })
  for (let i = 0; i < 10; i++) R(x, (i + 1) / 10 <= f + 0.001 ? '#ff8fb1' : '#3a3170', -230 + i * 46, 4, 38, 26)
  x.restore()
}

const EP = makeHealLong({
  id: 'khee17', sign: 'scorpio', len: 75, accent: '#ffd98a',
  hook: 'We were *never* official. | It still hurts.',
  brk: { at: 0.6, len: 1.3, text: '“it wasn’t even a *thing.*”' },
  whip: { x: 520, y: 1150 },
  promise: 'the ending, though.',
  open, top,
  chapters: [
    { at: 6.0, title: 'no title', day0: 1, day: 2, paint: ch1, lines: [{ t: 14.0, text: 'it doesn’t need a title to *hurt.*' }] },
    { at: 19.0, title: 'the 2 a.m. scroll', day: 6, paint: ch2, lines: [{ t: 27.0, text: 'you don’t have to explain it to *heal* it.' }] },
    { at: 33.0, title: 'the almost-text', day: 12, paint: ch3, lines: [{ t: 42.0, text: 'you can miss them *and* not text.' }] },
    { at: 47.0, title: 'out loud', day: 20, paint: ch4, lines: [{ t: 55.6, text: 'say it out loud. it gets *smaller.*' }] },
    { at: 60.0, title: 'day 30', day: 30, paint: ch5, lines: [{ t: 62.6, text: 'you knew what you *needed.*' }] },
  ],
  finAt: 67.0, fin, finDay: 30,
  last: 'Untitled still | *counts.*',
  bubbles: [
    { t0: 2.4, t1: 5.7, x: 520, y: 980, text: 'AAAAAAA (into pillow)', size: 38, tail: -0.1 },
    { t0: 7.0, t1: 9.6, x: 440, y: 920, text: 'it wasn’t official. i can’t be sad.', size: 32, tail: -0.1 },
    { t0: 9.8, t1: 12.6, x: 520, y: 920, text: 'but i AM sad.', size: 42, tail: 0, col: '#ffd0a0' },
    { t0: 20.6, t1: 22.6, x: 520, y: 940, text: 'just one more look…', size: 38, tail: 0.1 },
    { t0: 24.0, t1: 26.6, x: 720, y: 900, text: 'brought a puzzle. no questions.', size: 34, tail: 0.2, col: '#ffe2c4' },
    { t0: 31.0, t1: 32.8, x: 520, y: 940, text: 'piece. by. piece.', size: 40, tail: 0 },
    { t0: 34.5, t1: 38.4, x: 560, y: 860, text: 'typing: “i miss…”', size: 38, tail: 0.1 },
    { t0: 39.4, t1: 41.6, x: 560, y: 860, text: 'deleted. the bus is here.', size: 36, tail: 0.1 },
    { t0: 48.0, t1: 50.8, x: 480, y: 920, text: 'so. there was this person—', size: 38, tail: -0.1 },
    { t0: 53.0, t1: 55.4, x: 520, y: 920, text: 'wait, that part is funny', size: 38, tail: 0 },
    { t0: 61.0, t1: 62.4, x: 520, y: 920, text: 'morning.', size: 44, tail: 0 },
    { t0: 68.2, t1: 71.0, x: 500, y: 980, text: 'same pillow. different me.', size: 38, tail: -0.1 },
  ],
  cues: [['whoosh', 0.0, 0.5, 0.05], ['pop', 0.3, 220, 0.05, 0], ['tick', 20.8, 0.05], ['pop', 21.0, 523.25, 0.04, 0], ['tick', 21.4, 0.08], ['bell', 23.6, 1046.5, 0.03, 0.8, 0.3], ...Array.from({ length: 9 }, (_, i) => ['tick', 25 + i * 0.78, 0.04]), ...Array.from({ length: 10 }, (_, i) => ['tick', 35 + i * 0.3, 0.02]), ['pop', 39.4, 262, 0.04, 0], ['riser', 49, 58, 0.02], ['bell', 58, 2349.32, 0.03, 1.0, 0], ['pop', 53.0, 1318.51, 0.04, 0], ['glitter', 62.0, 62.4]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
