// khee18: HEALING ERA, Ep 18 "Aquarius: 30 days of feelings, logged" (60 s vertical, Month 2 boost m15, star_advice post, synthwave · F#m).
// Engine: ../../khee01/healong.js (sets: ../../khee01/healset.js). Rows: promo/films/month2/m15.md. Loops back to frame 0.
//   0.0   frame 0: Aquarius mid-spin on its back on the kitchen floor, the laptop flying open. DAY 1.
//         Hook: "Day 1. FEELINGS.EXE *stopped responding.*"  0.6 the kit's glitch: "FEELINGS.EXE has stopped *responding*".
//         2.2 the promise sticker: "wait for the patch notes."  Pisces sniffles.
//   6.0   1 · DEBUGGING (day 4): Aquarius treats sadness like a bug: a sheet "sadness_fix (v9)"; it crashes; Pisces
//         "crashes" too, crying. THE STARS: "you can't *debug* a feeling. you feel it."
//   18.0  2 · OUTSIDE (day 11): Gemini drags it outside on a cold December night; they look up at Orion.
//         ✓ REAL ASTRONOMY: "in December, Orion rises in the east after dark."  THE STARS: "look up. you're *not* stuck."
//   30.0  3 · THE ROBOT FILM (day 19): Aquarius finally cries at a film about a little robot; Pisces cries harder.
//         THE STARS: "feelings aren't bugs. they're *updates.*"
//   42.0  4 · PATCH NOTES (day 30): "v2.0: + feels things  + asks for hugs  + sleeps  fixed: pretending to be fine".
//         THE STARS: "same you. *kinder* version."
//   52.0  the payoff: back on the day-1 floor, lying on its back again, now smiling. Last line: "Patch notes: *still you.*"
//         (58.1), then the last 0.42 s eases into frame 0.
import { makeHealLong, lerp, prog, ease, shadow, pop01, R, INK, BONE, GOLD, label, ink, drawStarChar, signStar, glow } from '../../khee01/healong.js'
import { kitchen, laptop } from '../../khee01/healset.js'
import { street } from '../../nste01/singlekit.js'
import { glitch, glitchCues } from '../../hookkit.js'
import { drawPixelStar } from '../../sky.js'

const FLOOR = 1420, fy = s => FLOOR - 0.44 * s
const AQ = signStar('aquarius')
const GL = { at: 0.6, len: 1.3, text: 'FEELINGS.EXE has stopped *responding*', buttons: ['WAIT', 'FEEL IT'] }
const GL2 = { at: 10.6, len: 0.9, text: 'sadness_fix (v9) has *crashed*', buttons: ['OK'] }
const ERR = (x, X, Y, W, H) => { R(x, '#1a2a5a', X, Y, W, H); R(x, '#e8344e', X + 20, Y + 40, W - 40, 60); ink(x, 'NOT RESPONDING', X + W / 2, Y + 70, { size: 18, col: BONE }) }
const SHEET = (x, X, Y, W, H) => { R(x, '#f4eee0', X, Y, W, H); R(x, '#2f8a5e', X, Y, W, 24); ink(x, 'sadness_fix (v9)', X + W / 2, Y + 12, { size: 14, col: BONE }); for (let i = 0; i < 5; i++) ink(x, ['step 1: stop it', 'step 2: ??', 'step 3: work', 'ETA: tue', 'status: no'][i], X + 10, Y + 42 + i * 26, { size: 15, align: 'left', col: INK }) }
const ROBOT = (t) => (x, X, Y, W, H) => { R(x, '#1e1844', X, Y, W, H); const bx = X + W / 2, by = Y + H / 2 + 10; R(x, '#9aa4c0', bx - 30, by - 30, 60, 50); R(x, '#7fe3ff', bx - 18, by - 18, 12, 12); R(x, '#7fe3ff', bx + 6, by - 18, 12, 12); R(x, '#9aa4c0', bx - 4, by - 50, 8, 20); R(x, '#ff8fb1', bx - 4 + 3 * Math.sin(t * 6), by - 56, 8, 8) }
const NOTES = ['v2.0 · patch notes', '+ feels things', '+ asks for hugs', '+ sleeps (8 h)', 'fixed: “i’m fine”']

function spinStar(x, t, cx, cy, s, rot, mood) { x.save(); x.translate(cx, cy); x.rotate(rot); drawStarChar(x, 0, 0, s, t, { color: AQ.color, glyph: null, mood, look: [0, 0], seed: 3, glow: 1.1, blink: false }); x.restore() }
function orion(x, t, k = 1) {
  // Orion low in the east: Betelgeuse (orange), Rigel (blue-white), the three belt stars, Bellatrix, Saiph
  const S = [[620, 470, '#ffb36b', 46], [820, 690, '#cfe6ff', 46], [700, 590, BONE, 30], [730, 575, BONE, 30], [760, 560, BONE, 30], [800, 470, BONE, 34], [640, 700, BONE, 32]]
  x.save(); x.globalAlpha = k
  x.strokeStyle = 'rgba(239,230,214,0.35)'; x.lineWidth = 4; x.beginPath()
  for (const [a, b] of [[0, 5], [0, 2], [5, 4], [2, 6], [4, 1], [2, 3], [3, 4]]) { x.moveTo(S[a][0], S[a][1]); x.lineTo(S[b][0], S[b][1]) }
  x.stroke()
  for (const [sx, sy, c, z] of S) { x.save(); x.globalCompositeOperation = 'lighter'; glow(x, sx, sy, z * 1.6, 0.4, c === '#ffb36b' ? '255,179,107' : '207,230,255'); x.restore(); drawPixelStar(x, sx - z / 2, sy - z / 2, z, 0, c, '#ffffff') }
  label(x, 'ORION', 720, 780, { size: 26, col: BONE, alpha: 0.8 })
  x.restore()
}

function open(x, t, S) {
  const { u, crier } = S
  kitchen(x, t, { cal: { day: 1 }, stoveClock: '12:00', dim: 0.15 })
  crier(x, t, 'pisces', { x: 930, y: fy(150), s: 150, mood: 'wide', look: [-1, -0.5] }, 2)
  shadow(x, 440, FLOOR + 4, 300)
  const spin = u < 1.9 ? t * 9 : 1.9 * 9 + (u - 1.9) * 1.2
  spinStar(x, t, 440, 1310, 290, spin, u < 1.9 ? 'wide' : 'squint')
  const fly = ease.outCubic(prog(u, -0.4, 0.5))
  laptop(x, lerp(560, 720, fly), lerp(1150, 1330, fly), { s: 0.95, open: lerp(0.3, 1, fly), screen: ERR })
}
function ch1(x, t, S) {
  const { u, hero, crier } = S
  kitchen(x, t, { cal: { day: 4 }, stoveClock: '3:30', dim: 0.1 })
  const crash = u > 4.6 && u < 6.5
  crier(x, t, 'pisces', { x: 930, y: fy(150), s: 150, mood: crash ? 'wide' : 'sparkle', look: [-1, -0.5], squash: crash ? 0.2 : 0 }, crash ? 3 : 2)
  shadow(x, 400, FLOOR + 4, 290)
  hero(x, t, { x: 400, y: fy(290), s: 290, mood: crash ? 'wide' : u > 8 ? 'sparkle' : 'squint', look: [1, 0], squash: crash ? 0.2 : 0, blink: crash ? false : undefined, hops: [0.4, 1.4, 2.4, 3.4].map(v => S.t0 + v) })
  laptop(x, 680, 1300, { s: 1.05, open: 1, screen: crash ? ERR : SHEET })
}
function ch2(x, t, S) {
  const { u, hero, star, crier } = S
  street(x, t, { groundY: 1300, lamps: [120, 960], houses: true })
  orion(x, t, pop01(t, S.t0 + 2.2, 0.6, 1.4))
  hero(x, t, { x: 420, y: 1180, s: 270, mood: u < 2.2 ? 'neutral' : 'sparkle', look: [1, -1], hops: [S.t0 + 0.3, S.t0 + 0.6] })
  star(x, t, 'gemini', { x: 660, y: 1195, s: 240, mood: 'happy', look: u < 2 ? [-1, 0] : [1, -1], seed: 15 })
  crier(x, t, 'pisces', { x: 860, y: 1230, s: 140, mood: 'sparkle', look: [-1, -1] }, 2)
}
function ch3(x, t, S) {
  const { u, crier } = S
  kitchen(x, t, { cal: { day: 19 }, stoveClock: '9:40', dim: 0.35 })
  laptop(x, 540, 1180, { s: 1.4, open: 1, screen: ROBOT(t) })
  shadow(x, 330, FLOOR + 4, 270); shadow(x, 780, FLOOR + 4, 190)
  const cry = u > 4
  crier(x, t, 'aquarius', { x: 330, y: fy(270), s: 270, mood: cry ? 'sparkle' : 'neutral', look: [1, -0.4], seed: 3 }, cry ? 2 : 0)
  crier(x, t, 'pisces', { x: 780, y: fy(190), s: 190, mood: 'wide', look: [-1, -0.4] }, cry ? 3 : 2)
}
function ch4(x, t, S) {
  const { u, hero, crier } = S
  kitchen(x, t, { cal: { day: 30 }, stoveClock: '8:00', morning: 0.7 })
  crier(x, t, 'pisces', { x: 940, y: fy(140), s: 140, mood: 'happy', look: [-1, -0.5] }, 3)
  shadow(x, 360, FLOOR + 4, 290)
  hero(x, t, { x: 360, y: fy(290), s: 290, mood: 'happy', look: [1, -0.6], hops: [1, 2.2, 3.4, 4.6].map(v => S.t0 + v) })
}
function fin(x, t, S) {
  const { u, crier, star } = S
  kitchen(x, t, { cal: { day: 30 }, stoveClock: '9:00', morning: 0.6 })
  star(x, t, 'gemini', { x: 790, y: fy(220), s: 220, mood: 'happy', look: [-1, 0], seed: 15, pop: pop01(t, S.t0 + 0.8, 0.35, 2.2) })
  crier(x, t, 'pisces', { x: 940, y: fy(150), s: 150, mood: 'happy', look: [-1, -0.5], pop: pop01(t, S.t0 + 1.1, 0.35, 2.2) }, 3)
  shadow(x, 440, FLOOR + 4, 300)
  spinStar(x, t, 440, 1310, 290, 0.2 * Math.sin(t * 2), u > 1 ? 'happy' : 'sparkle')
  laptop(x, 690, 1330, { s: 0.9, open: 1, screen: (x2, X, Y, W, H) => { R(x2, '#1a2a5a', X, Y, W, H); ink(x2, 'v2.0 ✓', X + W / 2, Y + H / 2, { size: 30, col: '#9fe6b0' }) } })
}
function top(x, t) {
  // the real-astronomy chip (chapter 2) and the patch notes panel (chapter 4)
  if (t > 21.0 && t < 25.4) {
    const k = pop01(t, 21.0, 0.3, 2.2)
    x.save(); x.translate(540, 1640); x.scale(k, k)
    R(x, INK, -470, -62, 940, 124); R(x, '#123a2e', -464, -56, 928, 112)
    label(x, '✓ REAL ASTRONOMY', -440, -26, { size: 24, align: 'left', col: '#9fe6b0' })
    label(x, 'in December, Orion rises in the east after dark.', -440, 20, { size: 26, align: 'left', col: BONE, font: "Inter, sans-serif", weight: 800 })
    x.restore()
  }
  if (t > 43.0 && t < 51.8) {
    const k = pop01(t, 43.0, 0.3, 2.2)
    x.save(); x.translate(560, 820); x.scale(k, k); x.rotate(0.02)
    R(x, INK, -330, -200, 660, 400); R(x, '#0e1a30', -322, -192, 644, 384); R(x, '#2f8a5e', -322, -192, 644, 50)
    NOTES.forEach((n, i) => { const nk = pop01(t, 43.4 + i * 0.9, 0.25, 2.4); if (nk > 0.01) label(x, n, -290, -165 + 70 * i + (i ? 20 : 0), { size: i ? 34 : 28, align: 'left', col: i === 0 ? BONE : i === 4 ? GOLD : '#9fe6b0', alpha: nk }) })
    x.restore()
  }
}

const EP = makeHealLong({
  id: 'khee18', sign: 'aquarius', len: 60, accent: '#7fe3ff',
  hook: 'Day 1. FEELINGS.EXE | *stopped responding.*',
  brk: false, whip: { x: 520, y: 1150 },
  kit: [glitch(GL), glitch(GL2)], kitCues: [...glitchCues(GL), ...glitchCues(GL2)],
  promise: 'wait for the patch notes.', promiseAt: 2.2,
  open, top,
  chapters: [
    { at: 6.0, title: 'debugging', day0: 1, day: 4, paint: ch1, lines: [{ t: 13.0, text: 'you can’t *debug* a feeling. you feel it.' }] },
    { at: 18.0, title: 'outside', day: 11, paint: ch2, lines: [{ t: 25.6, text: 'look up. you’re *not* stuck.' }] },
    { at: 30.0, title: 'the robot film', day: 19, paint: ch3, lines: [{ t: 37.0, text: 'feelings aren’t bugs. they’re *updates.*' }] },
    { at: 42.0, title: 'patch notes', day: 30, paint: ch4, lines: [{ t: 48.0, text: 'same you. *kinder* version.' }] },
  ],
  finAt: 52.0, fin, finDay: 30,
  last: 'Patch notes: | *still you.*',
  bubbles: [
    { t0: 3.4, t1: 5.8, x: 520, y: 1000, text: 'have you tried turning me off and on', size: 30, tail: -0.1 },
    { t0: 7.0, t1: 10.2, x: 440, y: 920, text: 'if i fix the spreadsheet, i fix me.', size: 32, tail: -0.1 },
    { t0: 19.0, t1: 21.4, x: 660, y: 1000, text: 'shoes on. we’re going outside.', size: 34, tail: 0.1, col: '#ffe2c4' },
    { t0: 31.0, t1: 33.6, x: 380, y: 1000, text: 'it’s just a robot film. i’m fine.', size: 32, tail: -0.2 },
    { t0: 34.4, t1: 36.6, x: 380, y: 1000, text: 'IT FOUND ITS FRIEND', size: 40, tail: -0.2, col: '#cfe0ff' },
    { t0: 53.4, t1: 56.0, x: 500, y: 1000, text: 'floor’s nicer when you can feel it.', size: 32, tail: -0.1 },
  ],
  cues: [['whoosh', 0.0, 0.5, 0.05], ...Array.from({ length: 8 }, (_, i) => ['tick', 0.05 + i * 0.22, 0.03]), ['pop', 19.0, 880, 0.04, 0.3], ['riser', 20.2, 21.0, 0.02], ['bell', 21.0, 1567.98, 0.03, 1.6, 0], ['glitter', 21.0, 21.6], ['pop', 34.4, 1318.51, 0.04, -0.2], ...Array.from({ length: 5 }, (_, i) => ['pop', 43.4 + i * 0.9, 880 + i * 110, 0.035, 0.1])],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void lerp
