// khee16: HEALING ERA, Ep 16 "Libra: 30 days in 60 seconds" (60 s vertical, Month 2 boost m15, star_advice post, dreamy · Bb).
// Engine: ../../khee01/healong.js (sets: ../../khee01/healset.js). Rows: promo/films/month2/m15.md. Loops back to frame 0.
//   0.0   frame 0: Libra slumped against the dishwasher on the kitchen floor, mid-wail, takeaway boxes flying. DAY 1.
//         Hook: "30 days in 60 seconds. *Watch day 30.*"  0.6 record scratch: "day 1 of *heartbreak.*"  2.0 the promise
//         sticker: "wait for day 30."  "we always got these noodles."  Pisces sniffles.
//   6.0   1 · THE BAD DAYS (day 4): crying into a mug; a text drafted and deleted three times; THE STARS: "let the bad
//         days *be bad.*"  Sagittarius turns up with a blanket and a terrible joke; Libra laughs-cries.
//   19.0  2 · THE FIRST WALK (day 11): out the door with Sag (scarf on), the first real laugh; then the party where someone
//         says the ex's name: Libra freezes; Sag: "you're allowed to leave early." THE STARS: "let one friend *in.*"
//   31.0  3 · SMALL THINGS (day 19): Libra cooks for friends (Sag, Taurus, Pisces), a talk card on the fridge flips:
//         "What made you smile today?"  THE STARS: "small things, *every day.*"
//   43.0  4 · DAY 30 (the first good morning): Libra wakes, first thought: its own plans ("pottery at 10!"), opens the
//         window, sunlight. THE STARS: "you did the *slow* thing. it worked."
//   52.0  the payoff: back on the day-1 kitchen floor, the same spot, now smiling. Last line: "Day 1 looks different
//         *from here.*" (58.1), then the last 0.42 s eases into frame 0.
import { makeHealLong, lerp, prog, ease, shadow, pop01, R, INK, BONE } from '../../khee01/healong.js'
import { kitchen, bedroom, bigPhone, blanket, talkCard, plate } from '../../khee01/healset.js'
import { mug, box } from '../../nste01/singlekit.js'

const FLOOR = 1420, fy = s => FLOOR - 0.44 * s
function takeaway(x, cx, cy, rot = 0, s = 1) { x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s); R(x, INK, -40, -44, 80, 84); R(x, BONE, -36, -40, 72, 76); R(x, '#e8344e', -36, -10, 72, 14); R(x, INK, -6, -60, 12, 20); x.restore() }
function boxesFlying(x, t, t0, cx, cy) { for (let i = 0; i < 4; i++) { const tt = Math.max(0, t - t0), k = Math.min(tt, 1.0); const a = -Math.PI / 2 + (i - 1.5) * 0.6; takeaway(x, cx + Math.cos(a) * 420 * k, Math.min(FLOOR - 40, cy + Math.sin(a) * 420 * k + 800 * k * k), tt * (3 + i), 0.9) } }
function dishwasher(x) { box(x, 560, 1110, 170, 302, '#8a94b0', { b: 6, hi: '#aab4cc' }); R(x, INK, 580, 1130, 130, 10) }
function scarf(x, cx, cy) { R(x, INK, cx - 100, cy, 200, 30); R(x, '#e8344e', cx - 96, cy + 4, 192, 22); R(x, INK, cx + 50, cy, 30, 70); R(x, '#e8344e', cx + 54, cy + 4, 22, 62) }

function open(x, t, S) {
  const { u, crier } = S
  kitchen(x, t, { cal: { day: 1 }, stoveClock: '11:11', mess: 0.6 })
  dishwasher(x)
  boxesFlying(x, t, -0.35, 640, 1250)
  crier(x, t, 'pisces', { x: 930, y: fy(150), s: 150, mood: 'wide', look: [-1, -0.5] }, 2)
  shadow(x, 470, FLOOR + 4, 300)
  crier(x, t, 'libra', { x: 470, y: fy(300) + 10, s: 300, mood: 'wide', look: [0, -1], squash: 0.1 + 0.05 * Math.sin(t * 12), seed: 3, blink: false }, u < 3.8 ? 3 : 2)
}
function week1(x, t, S) {
  const { u, crier, star } = S
  kitchen(x, t, { cal: { day: 4 }, stoveClock: u < 6 ? '2:40' : '7:15', mess: 0.5, dim: 0.15 })
  dishwasher(x)
  crier(x, t, 'pisces', { x: 930, y: fy(150), s: 150, mood: 'wide', look: [-1, -0.5] }, 2)
  const sag = pop01(t, S.t0 + 6.2, 0.35, 2.2)
  shadow(x, 440, FLOOR + 4, 290)
  const laugh = u > 9.5
  crier(x, t, 'libra', { x: 440, y: fy(290) + 10, s: 290, mood: u < 2.5 ? 'wide' : u < 6.2 ? 'squint' : laugh ? 'happy' : 'sparkle', look: [1, -0.3], squash: 0.08 + (laugh ? 0.06 * Math.abs(Math.sin(u * 12)) : 0), seed: 3 }, u < 9.5 ? 2 : 1)
  if (u < 2.5) mug(x, t, 600, 1400, { s: 1, col: '#c9a6ff' })
  if (u > 2.5 && u < 6.2) bigPhone(x, t, 660, 1180, { w: 220, h: 380, rot: 0.08, mode: 'notes', title: 'to: them', lines: ['hey'], typed: Math.abs(Math.sin((u - 2.5) * 1.7)) })
  if (sag > 0.01) { shadow(x, 740, FLOOR + 4, 250 * sag); star(x, t, 'sagittarius', { x: 740, y: fy(250), s: 250, pop: sag, mood: u > 9.5 ? 'happy' : 'wink', look: [-1, 0], seed: 9, hops: [S.t0 + 6.3, S.t0 + 8.0, S.t0 + 8.4] }); if (u > 7.2) blanket(x, 560, 1400, 520, 60, { col: '#f39a3a', col2: '#ffb36b' }) }
}
function week2(x, t, S) {
  const { u, hero, star, crier } = S
  const party = u > 6
  if (!party) {
    // the walk: out under the morning sky, crossing the frame
    kitchen(x, t, { cal: { day: 11 }, stoveClock: '10:05', morning: 0.6 })
    const w = prog(u, 0.3, 5.6)
    shadow(x, lerp(200, 640, w), FLOOR + 4, 280); shadow(x, lerp(420, 860, w), FLOOR + 4, 240)
    const laugh = u > 3.2 && u < 4.6
    hero(x, t, { x: lerp(200, 640, w), y: fy(280), s: 280, mood: laugh ? 'happy' : 'sparkle', look: [1, 0], squash: laugh ? 0.07 * Math.abs(Math.sin(u * 12)) : 0, hops: [0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 4.6, 5.1].map(v => S.t0 + v) })
    scarf(x, lerp(200, 640, w), fy(280) + 60)
    star(x, t, 'sagittarius', { x: lerp(420, 860, w), y: fy(240), s: 240, mood: 'happy', look: [-1, 0], seed: 9, hops: [0.7, 1.2, 1.7, 2.2, 2.7, 3.2, 4.8, 5.3].map(v => S.t0 + v) })
    crier(x, t, 'pisces', { x: 150, y: fy(140), s: 140, mood: 'sparkle', look: [1, -0.5] }, 1)
  } else {
    // the party: string lights, a crowd, the ex's name lands
    kitchen(x, t, { cal: { day: 13 }, stoveClock: '9:40', dim: 0.35 })
    for (let i = 0; i < 9; i++) { const c = ['#f2c75c', '#ff8fb1', '#7fd0ff'][i % 3]; R(x, INK, 120 + i * 110, 470 + 30 * Math.sin(i), 20, 28); R(x, c, 124 + i * 110, 474 + 30 * Math.sin(i), 12, 20) }
    const freeze = u > 7 && u < 9
    star(x, t, 'gemini', { x: 820, y: fy(220), s: 220, mood: 'happy', look: [-1, 0], seed: 15, hops: [S.t0 + 6.9] })
    star(x, t, 'aries', { x: 980, y: fy(200), s: 200, mood: 'happy', look: [-1, 0], seed: 13 })
    shadow(x, 420, FLOOR + 4, 280)
    hero(x, t, { x: 420, y: fy(280), s: 280, mood: freeze ? 'wide' : u > 10 ? 'happy' : 'neutral', look: [1, 0], blink: freeze ? false : undefined })
    star(x, t, 'sagittarius', { x: 610, y: fy(240), s: 240, mood: u > 9 ? 'happy' : 'neutral', look: [-1, 0], seed: 9, hops: [S.t0 + 9.1] })
    crier(x, t, 'pisces', { x: 160, y: fy(140), s: 140, mood: 'wide', look: [1, -0.5] }, 2)
  }
}
function week3(x, t, S) {
  const { u, hero, star, crier } = S
  kitchen(x, t, { cal: { day: 19 }, stoveClock: '7:30', pot: true, morning: 0.15 })
  talkCard(x, 250, 880, { text: 'What made you|smile today?', up: ease.inOutCubic(prog(u, 5.6, 6.3)), s: 0.6, rot: -0.05, k: pop01(t, S.t0 + 5.2, 0.3, 2.2) })
  plate(x, 470, 1050, { s: 0.9, food: u > 2 }); plate(x, 620, 1050, { s: 0.9, food: u > 2.4 })
  shadow(x, 420, FLOOR + 4, 280)
  hero(x, t, { x: 420, y: fy(280), s: 280, mood: u > 7 ? 'happy' : 'sparkle', look: u < 5 ? [1, -1] : [-1, -1], hops: [S.t0 + 0.4, S.t0 + 1.0, S.t0 + 7.2, S.t0 + 7.6] })
  const gk = pop01(t, S.t0 + 2.6, 0.35, 2.2)
  if (gk > 0.01) { star(x, t, 'sagittarius', { x: 660, y: fy(230), s: 230, pop: gk, mood: 'happy', look: [-1, 0], seed: 9 }); star(x, t, 'taurus', { x: 820, y: fy(210), s: 210, pop: gk, mood: 'heart', look: [-1, 0], seed: 7 }); crier(x, t, 'pisces', { x: 960, y: fy(150), s: 150, pop: gk, mood: 'happy', look: [-1, 0] }, 3) }
}
function day30(x, t, S) {
  const { u, hero, crier } = S
  bedroom(x, t, { morning: lerp(0.5, 1, prog(u, 0, 4)) })
  const up = ease.outCubic(prog(u, 0.6, 1.2))
  hero(x, t, { x: 540, y: lerp(1230, 1100, up), s: 290, mood: u < 0.6 ? 'sleepy' : 'happy', look: [0, -0.4], hops: [S.t0 + 4.5, S.t0 + 4.9] })
  blanket(x, 600, 1290, 700, 150, { col: '#c9a6ff', col2: '#dcc4ff' })
  crier(x, t, 'pisces', { x: 920, y: 1300, s: 140, mood: 'happy', look: [-1, -1] }, 3)
}
function fin(x, t, S) {
  const { u, crier, star } = S
  kitchen(x, t, { cal: { day: 30 }, stoveClock: '9:30', morning: 0.55 })
  dishwasher(x)
  star(x, t, 'sagittarius', { x: 790, y: fy(220), s: 220, mood: 'happy', look: [-1, 0], seed: 9, pop: pop01(t, S.t0 + 0.8, 0.35, 2.2) })
  crier(x, t, 'pisces', { x: 940, y: fy(150), s: 150, mood: 'happy', look: [-1, -0.5], pop: pop01(t, S.t0 + 1.1, 0.35, 2.2) }, 3)
  shadow(x, 470, FLOOR + 4, 300)
  crier(x, t, 'libra', { x: 470, y: fy(300) + 10, s: 300, mood: u > 1 ? 'happy' : 'sparkle', look: [0, 0], squash: 0.1, seed: 3, hops: [S.lastAt + 0.05] }, 0)
}

const EP = makeHealLong({
  id: 'khee16', sign: 'libra', len: 60, accent: '#ffd98a',
  hook: '30 days in 60 seconds. | *Watch day 30.*',
  brk: { at: 0.6, len: 1.3, text: 'day 1 of *heartbreak.*' },
  whip: { x: 520, y: 1150 },
  promise: 'wait for day 30.',
  open,
  chapters: [
    { at: 6.0, title: 'the bad days', day0: 1, day: 4, paint: week1, lines: [{ t: 8.6, text: 'let the bad days *be bad.* they pass.' }] },
    { at: 19.0, title: 'the first walk', day: 11, paint: week2, lines: [{ t: 28.8, text: 'let one friend *in.* that’s the work.' }] },
    { at: 31.0, title: 'small things', day: 19, paint: week3, lines: [{ t: 39.0, text: 'small things, *every day.* they add up.' }] },
    { at: 43.0, title: 'day 30', day: 30, paint: day30, lines: [{ t: 47.6, text: 'you did the *slow* thing. it worked.' }] },
  ],
  finAt: 52.0, fin, finDay: 30,
  last: 'Day 1 looks different | *from here.*', late: 2, lastSize: 82, lastAccent: 116,
  bubbles: [
    { t0: 2.4, t1: 5.7, x: 520, y: 1000, text: 'we always got these noodles', size: 36, tail: -0.1 },
    { t0: 9.0, t1: 11.8, x: 600, y: 900, text: 'drafting “hey”… deleting… x3', size: 34, tail: 0.1 },
    { t0: 12.6, t1: 15.0, x: 760, y: 900, text: 'knock knock. it’s me. blanket.', size: 34, tail: 0.2, col: '#ffe2c4' },
    { t0: 15.3, t1: 18.6, x: 500, y: 900, text: 'that joke was so bad. thank you.', size: 34, tail: -0.1 },
    { t0: 21.8, t1: 24.6, x: 600, y: 900, text: 'oh. i laughed. a real one.', size: 36, tail: 0 },
    { t0: 26.0, t1: 28.4, x: 600, y: 900, text: '“so… how’s your ex?”', size: 38, tail: 0.3, col: '#ffd0a0' },
    { t0: 28.6, t1: 30.6, x: 640, y: 820, text: 'you’re allowed to leave early.', size: 34, tail: 0.1, col: '#ffe2c4' },
    { t0: 33.2, t1: 36.0, x: 520, y: 900, text: 'i made too much pasta. stay.', size: 36, tail: -0.1 },
    { t0: 36.6, t1: 38.8, x: 760, y: 880, text: 'seconds, please.', size: 38, tail: 0.3, col: '#ffe2c4' },
    { t0: 44.6, t1: 47.2, x: 540, y: 840, text: 'first thought: pottery at 10!', size: 36, tail: 0, think: true },
    { t0: 53.4, t1: 56.0, x: 500, y: 960, text: 'same floor. new me.', size: 40, tail: -0.1 },
  ],
  cues: [['whoosh', 0.0, 0.4, 0.05], ['pop', 0.35, 262, 0.05, 0.2], ['pop', 0.45, 330, 0.04, -0.2], ...[9.2, 10.1, 11.0].map(t => ['tick', t, 0.05]), ['bell', 12.3, 1046.5, 0.03, 0.8, 0.3], ['pop', 12.6, 880, 0.04, 0.3], ['pop', 21.8, 1318.51, 0.04, 0], ['tapeStop', 26.0, 0.6], ['pop', 33.2, 659.25, 0.04, -0.2], ['tick', 36.2, 0.05], ['whoosh', 36.25, 0.3, 0.03], ['bell', 44.6, 1567.98, 0.03, 1.2, 0], ['glitter', 44.6, 45.1], ['pop', 53.4, 1046.5, 0.04, 0]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
