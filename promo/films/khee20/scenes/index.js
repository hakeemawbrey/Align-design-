// khee20: HEALING ERA, Ep 20 "Pisces: the 30-day finale" (90 s vertical, Month 2 boost m15, star_advice post, cinematic · D).
// Engine: ../../khee01/healong.js (sets: ../../khee01/healset.js). Rows: promo/films/month2/m15.md. Loops back to frame 0.
// All twelve signs appear; Pisces leads and cries all the way through (sad tears, then happy ones).
//   0.0   frame 0: Pisces mid-sob on the kitchen floor, a tear puddle spreading toward the camera, the DAY 1 calendar
//         taped back together. Hook: "30 days. *All twelve* friends. Wait for it."  0.6 record scratch:
//         "day 1: *everything* is sad."  2.0 the promise sticker: "wait for day 30."
//   6.0   1 · THE BIG CRY (day 2): Pisces cries at the toaster, the rain, a sock. THE STARS: "crying isn't weakness.
//         it's *moving.*"
//   19.0  2 · THE ROTA (day 6): a friends rota on the fridge; one sign drops by each day, each with one small thing:
//         Aries (a slow jog), Taurus (bread), Gemini (a silly call), Cancer (soup), Leo (a pep talk), Virgo (the dishes).
//         THE STARS: "let people *show up.*"
//   33.0  3 · THE SETBACK (day 13): Libra (flowers), Scorpio (a quiet night), Sagittarius (a walk), Capricorn (a plan),
//         Aquarius (stargazing); then a bad day under a blanket, and they come anyway. THE STARS: "bad days don't scare
//         *real* friends."
//   51.0  4 · THE PAINTING (day 21): Pisces paints the twelve of them, star by star. THE STARS: "make something *from* it."
//   65.0  5 · DAY 30: the sleepover: everyone wakes up in a pile of blankets on the kitchen floor; happy tears.
//         THE STARS: "you healed *with* people. that's allowed."
//   80.0  the payoff: back on the day-1 floor, the same spot, the painting propped up, smiling. Last line:
//         "Healing is a *group project.*" (88.1), then the last 0.42 s eases into frame 0.
import { makeHealLong, lerp, prog, ease, shadow, pop01, R, INK, BONE, GOLD, ink, signStar, drawStarChar } from '../../khee01/healong.js'
import { kitchen, blanket } from '../../khee01/healset.js'
import { box } from '../../nste01/singlekit.js'

const FLOOR = 1420, fy = s => FLOOR - 0.44 * s
const SIGNS = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces']
function puddle(x, t, cx, k) { x.save(); x.globalAlpha = 0.75; x.fillStyle = '#5fb8f0'; x.beginPath(); x.ellipse(cx, FLOOR + 40 + 40 * k, 120 + 260 * k, 24 + 50 * k, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#a8e0ff'; x.beginPath(); x.ellipse(cx - 40, FLOOR + 30 + 34 * k, 50 + 80 * k, 8 + 12 * k, 0, 0, Math.PI * 2); x.fill(); x.restore() }
function tape(x) { R(x, 'rgba(255,240,200,0.85)', 420, 860, 120, 24); R(x, 'rgba(255,240,200,0.85)', 440, 920, 90, 22) }
function painting(x, t, cx, cy, n = 12, s = 1) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  box(x, -170, -130, 340, 260, '#fff6e6', { b: 8 }); R(x, '#c99a5c', -180, 130, 360, 16)
  for (let i = 0; i < Math.min(12, n); i++) { const sg = signStar(SIGNS[i]); const px = -130 + (i % 6) * 52, py = -50 + Math.floor(i / 6) * 90; drawStarChar(x, px, py, 50, t, { color: sg.color, mood: 'happy', look: [0, 0], seed: i, glow: 0.2, tips: false, bob: 0 }) }
  x.restore()
}
function easel(x, cx) { R(x, INK, cx - 120, 1040, 14, 380); R(x, INK, cx + 106, 1040, 14, 380); R(x, INK, cx - 10, 1000, 20, 420) }

function open(x, t, S) {
  const { u, crier } = S
  kitchen(x, t, { cal: { day: 1 }, stoveClock: '3:03', dim: 0.15 })
  tape(x)
  puddle(x, t, 480, lerp(0.3, 1, ease.outCubic(prog(u, -0.5, 4))))
  shadow(x, 480, FLOOR + 4, 300)
  crier(x, t, 'pisces', { x: 480, y: fy(300), s: 300, mood: 'wide', look: [0, 0], squash: 0.05 * Math.sin(t * 14), seed: 3, blink: false }, 3)
}
function ch1(x, t, S) {
  const { u, crier } = S
  kitchen(x, t, { cal: { day: 2 }, stoveClock: '9:15', dim: 0.1 })
  puddle(x, t, 480, 0.7)
  // things that set Pisces off: the toaster, the rain at the window, a lone sock
  const what = u < 4 ? 0 : u < 8 ? 1 : 2
  if (what === 0) { box(x, 620, 960, 150, 100, '#c9d0e4', { b: 6 }); R(x, INK, 650, 940, 30, 24); R(x, INK, 710, 940, 30, 24) }
  if (what === 1) for (let i = 0; i < 14; i++) { const p = ((t * 1.4 + i / 14) % 1); R(x, '#7fd0ff', 620 + (i * 37) % 260, 480 + p * 280, 6, 22) }
  if (what === 2) { R(x, INK, 640, 1350, 70, 56); R(x, '#ff8fb1', 644, 1354, 62, 48) }
  shadow(x, 440, FLOOR + 4, 290)
  crier(x, t, 'pisces', { x: 440, y: fy(290), s: 290, mood: u > 9 ? 'sparkle' : 'wide', look: [1, what === 1 ? -1 : 0], seed: 3 }, u > 9 ? 2 : 3)
}
const ROTA = [['aries', 'a slow jog'], ['taurus', 'fresh bread'], ['gemini', 'a silly call'], ['cancer', 'soup'], ['leo', 'a pep talk'], ['virgo', 'the dishes']]
const ROTA2 = [['libra', 'flowers'], ['scorpio', 'a quiet night'], ['sagittarius', 'a walk'], ['capricorn', 'a plan'], ['aquarius', 'stargazing']]
function visitors(x, t, S, list, t0, gap) {
  const { u, star } = S
  const i = Math.min(list.length - 1, Math.floor((u - t0) / gap))
  if (u < t0) return -1
  const k = pop01(t, S.t0 + t0 + i * gap, 0.3, 2.2) * (i < list.length - 1 ? 1 - prog(u, t0 + (i + 1) * gap - 0.2, t0 + (i + 1) * gap) : 1)
  const [sg, gift] = list[i]
  shadow(x, 730, FLOOR + 4, 240 * k)
  star(x, t, sg, { x: 730, y: fy(240), s: 240, pop: k, mood: 'happy', look: [-1, 0], seed: 10 + i, hops: [S.t0 + t0 + i * gap + 0.4] })
  if (k > 0.5) { x.save(); x.translate(730, 1080); x.rotate(-0.04); x.font = "800 34px Inter"; const w = x.measureText(gift).width + 40; R(x, INK, -w / 2 - 5, -32, w + 10, 64); R(x, '#ffe2c4', -w / 2, -27, w, 54); ink(x, gift, 0, 0, { size: 34 }); x.restore() }
  return i
}
function ch2(x, t, S) {
  const { u, crier } = S
  kitchen(x, t, { cal: { day: 6 }, stoveClock: '6:00', morning: 0.3, fridgeNote: 'FRIENDS ROTA|one a day ♡', noteK: pop01(t, S.t0 + 0.4, 0.3, 2.2) })
  shadow(x, 420, FLOOR + 4, 280)
  crier(x, t, 'pisces', { x: 420, y: fy(280), s: 280, mood: 'sparkle', look: [1, 0], seed: 3, hops: [1.6, 3.8, 6.0, 8.2, 10.4, 12.6].map(v => S.t0 + v) }, 2)
  visitors(x, t, S, ROTA, 1.2, 2.2)
}
function ch3(x, t, S) {
  const { u, crier, star } = S
  const bad = u > 11.4
  kitchen(x, t, { cal: { day: 13 }, stoveClock: bad ? '11:40' : '5:30', dim: bad ? 0.4 : 0, morning: bad ? 0 : 0.2 })
  shadow(x, 420, FLOOR + 4, 280)
  crier(x, t, 'pisces', { x: 420, y: fy(280) + (bad ? 20 : 0), s: 280, mood: bad ? 'wide' : 'sparkle', look: [1, 0], seed: 3, squash: bad ? 0.15 : 0 }, bad ? 3 : 2)
  if (bad) {
    blanket(x, 420, 1430, 420, 70, { col: '#7c74f0', col2: '#9a92ff' })
    // and they come anyway: the whole crowd squeezes in
    const k = pop01(t, S.t0 + 14.0, 0.4, 2)
    if (k > 0.01) ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo'].forEach((sg, i) => star(x, t, sg, { x: 620 + (i % 3) * 140, y: fy(170) - Math.floor(i / 3) * 120, s: 170, pop: k, mood: 'happy', look: [-1, 0], seed: 30 + i }))
  } else visitors(x, t, S, ROTA2, 0.8, 2.1)
}
function ch4(x, t, S) {
  const { u, crier } = S
  kitchen(x, t, { cal: { day: 21 }, stoveClock: '2:00', morning: 0.55 })
  easel(x, 700)
  painting(x, t, 700, 940, Math.floor(prog(u, 0.6, 10) * 12), 1)
  shadow(x, 380, FLOOR + 4, 280)
  crier(x, t, 'pisces', { x: 380, y: fy(280), s: 280, mood: u > 10 ? 'happy' : 'sparkle', look: [1, -0.6], seed: 3, hops: Array.from({ length: 12 }, (_, i) => S.t0 + 0.6 + i * 0.8) }, u > 10 ? 3 : 1)
  // the brush
  R(x, INK, 500, 1150 - 30 * Math.abs(Math.sin(u * 4)), 14, 120); R(x, '#ff8fb1', 498, 1140 - 30 * Math.abs(Math.sin(u * 4)), 18, 22)
}
function ch5(x, t, S) {
  const { u, crier, star } = S
  kitchen(x, t, { cal: { day: 30 }, stoveClock: '9:00', morning: lerp(0.3, 0.9, prog(u, 0, 4)) })
  const wake = i => ease.outCubic(prog(u, 1.5 + i * 0.35, 2.0 + i * 0.35))
  // two rows of sleepy friends in the blanket pile
  SIGNS.slice(0, 11).forEach((sg, i) => {
    const row = i < 6 ? 0 : 1, col = row ? i - 6 : i, w = wake(i)
    const px = row ? 160 + col * 190 : 100 + col * 176, py = row ? 1380 : 1290
    star(x, t, sg, { x: px, y: py - 30 * w, s: row ? 170 : 150, mood: w > 0.5 ? 'happy' : 'sleepy', look: [0, 0], seed: 40 + i, squash: 0.2 * (1 - w), zzz: false })
  })
  blanket(x, 540, 1440, 1100, 80, { col: '#ff8fb1', col2: '#ffb3cb' })
  crier(x, t, 'pisces', { x: 540, y: 1180, s: 240, mood: u > 2 ? 'happy' : 'sleepy', look: [0, 0], seed: 3, hops: [S.t0 + 2.2, S.t0 + 2.6, S.t0 + 9.0] }, u > 2 ? 3 : 0)
}
function fin(x, t, S) {
  const { u, crier } = S
  kitchen(x, t, { cal: { day: 30 }, stoveClock: '10:00', morning: 0.6 })
  painting(x, t, 760, 1290, 12, 0.7)
  shadow(x, 480, FLOOR + 4, 300)
  crier(x, t, 'pisces', { x: 480, y: fy(300), s: 300, mood: u > 1 ? 'happy' : 'sparkle', look: [0, 0], seed: 3, hops: [S.lastAt + 0.05] }, 3)
}

const EP = makeHealLong({
  id: 'khee20', sign: 'pisces', len: 90, accent: '#ffd98a',
  hook: '30 days. *All twelve* | friends. Wait for it.',
  brk: { at: 0.6, len: 1.3, text: 'day 1: *everything* is sad.' },
  whip: { x: 520, y: 1200 },
  promise: 'wait for day 30.',
  open,
  chapters: [
    { at: 6.0, title: 'the big cry', day0: 1, day: 2, paint: ch1, lines: [{ t: 14.0, text: 'crying isn’t weakness. it’s *moving.*' }] },
    { at: 19.0, title: 'the rota', day: 6, paint: ch2, lines: [{ t: 28.4, text: 'let people *show up.*' }] },
    { at: 33.0, title: 'the setback', day: 13, paint: ch3, lines: [{ t: 47.4, text: 'bad days don’t scare *real* friends.' }] },
    { at: 51.0, title: 'the painting', day: 21, paint: ch4, lines: [{ t: 59.6, text: 'make something *from* it.' }] },
    { at: 65.0, title: 'day 30', day: 30, paint: ch5, lines: [{ t: 73.6, text: 'you healed *with* people. that’s allowed.' }] },
  ],
  finAt: 80.0, fin, finDay: 30,
  last: 'Healing is a | *group project.*', lastSize: 84, lastAccent: 112,
  bubbles: [
    { t0: 2.4, t1: 5.7, x: 520, y: 1000, text: 'the calendar ripped too', size: 38, tail: -0.1 },
    { t0: 6.6, t1: 9.6, x: 500, y: 960, text: 'the toaster looks LONELY', size: 38, tail: 0 },
    { t0: 10.2, t1: 13.6, x: 500, y: 960, text: 'it’s raining. on me. personally.', size: 34, tail: 0 },
    { t0: 14.2, t1: 18.6, x: 500, y: 1000, text: 'one sock. no partner. SAME.', size: 36, tail: 0 },
    { t0: 45.2, t1: 47.2, x: 420, y: 1000, text: 'today’s a bad one.', size: 38, tail: 0 },
    { t0: 47.4, t1: 50.6, x: 760, y: 820, text: 'we know. scoot over.', size: 38, tail: 0.2, col: '#ffe2c4' },
    { t0: 52.0, t1: 56.0, x: 440, y: 1000, text: 'i’m painting all of you.', size: 38, tail: 0 },
    { t0: 61.6, t1: 64.6, x: 700, y: 760, text: 'that’s US', size: 44, tail: 0.2, col: '#ffe2c4' },
    { t0: 67.6, t1: 71.6, x: 540, y: 880, text: 'morning, everyone.', size: 40, tail: 0 },
    { t0: 81.2, t1: 84.2, x: 500, y: 1000, text: 'same floor. full heart.', size: 38, tail: -0.1 },
  ],
  cues: [['whoosh', 0.0, 0.5, 0.05], ['pop', 0.4, 196, 0.05, 0], ['pop', 10.2, 523.25, 0.03, 0.3], ...Array.from({ length: 6 }, (_, i) => ['bell', 20.2 + i * 2.2, 1046.5 + i * 60, 0.025, 0.6, 0.4]), ...Array.from({ length: 5 }, (_, i) => ['bell', 33.8 + i * 2.1, 987.77 + i * 60, 0.025, 0.6, 0.4]), ['tapeStop', 44.4, 0.5], ['pop', 47.0, 880, 0.04, 0.3], ['glitter', 47.0, 47.6], ...Array.from({ length: 12 }, (_, i) => ['pop', 51.6 + i * 0.8, 659.25 + (i % 6) * 80, 0.025, 0]), ...Array.from({ length: 11 }, (_, i) => ['pop', 66.5 + i * 0.35, 880 + (i % 4) * 110, 0.025, (i % 2 ? 0.3 : -0.3)]), ['glitter', 75.0, 75.6]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [GOLD, BONE]
