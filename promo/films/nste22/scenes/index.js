// nste22: SINGLE AND THRIVING, Ep 22 "The Year You Built" (25 s vertical, Next 30 b33, music: cinematic · Eb).
// Format kit: ../../nste01/singlekit.js (story 0–20.6, then the shared end card). Rows: promo/films/next30/b33.md.
//   0.0–6.8    hook "Single all year. | *Nothing* happened?" Capricorn flipping back through a big wall calendar, every
//              page looking blank to it: "no dates. no one." → "nothing happened this year…"  Pisces sniffles.
//   6.8        card cut → THE STARS: "look *again.* look at the year." / "new skills. new friends. *you.*"
//   13.6       the pages flip again, and each one has something on it now: learned to bake · new friend · said no
//              (kindly) · slept in · finished the book. Capricorn: "…wait. that's a lot."  Meter fills.
//   17.4       "Capricorn: *thriving.*" Last line: "Look what you built *this* year."
import { makeSingle, room, box, R, ink, note, shadow, sparkles, pop01, prog, lerp, ease, T, INK, BONE, MONO } from '../../nste01/singlekit.js'

const MONTHS = ['JAN', 'MAR', 'MAY', 'JUL', 'SEP', 'NOV']
const WINS = [['learned to bake', '#ffe27a'], ['new friend!', '#9fe6b0'], ['said no (kindly)', '#ff8fb1'], ['slept in. bliss.', '#7fd0ff'], ['finished the book', '#c9a6ff'], ['ran my first 5K', '#ffb36b']]
function calendar(x, t, page, flip, wins = 0) {
  const X = 560, Y = 520, W = 420, H = 560
  box(x, X, Y, W, H, BONE, { b: 7 })
  R(x, '#3fb08a', X, Y, W, 70); ink(x, MONTHS[page % 6], X + W / 2, Y + 36, { size: 40, col: BONE, font: MONO, weight: 700 })
  for (let i = 0; i < 30; i++) { const cx = X + 20 + (i % 6) * 64, cy = Y + 100 + Math.floor(i / 6) * 84; R(x, '#e6dcc6', cx, cy, 56, 74) }
  if (wins) note(x, X + W / 2, Y + 330, WINS[page % 6][0], { w: 360, h: 110, col: WINS[page % 6][1], rot: -0.05, size: 32, k: wins })
  if (flip > 0) {
    const h = H * (1 - flip)
    R(x, INK, X - 7, Y - 7 + (H - h) * 0, W + 14, 10)
    x.save(); x.globalAlpha = 0.9; R(x, '#f4ecd6', X, Y - (H - h) * 0.05 - flip * 40, W, Math.max(0, h * 0.4)); x.restore()
  }
  R(x, INK, X + 60, Y - 24, 20, 40); R(x, INK, X + W - 80, Y - 24, 20, 40)
}
const HOME = (x, t) => room(x, t, { wall: '#22304a', wall2: '#1f2c44', floor: '#2b3848', win: null })

function s1(x, t, S) {
  const { u, hero } = S
  HOME(x, t)
  const pf = u * 1.2, page = Math.floor(pf)
  calendar(x, t, page, pf % 1 < 0.3 ? (pf % 1) / 0.3 : 0, 0)
  hero(x, t, { x: 300, y: 1200, s: 280, mood: u > 3.8 ? 'neutral' : 'squint', look: [1, -0.6], hops: [1.0, 2.0, 3.85] })
}
function s2(x, t, S) {
  const { hero } = S
  HOME(x, t); calendar(x, t, 5, 0, 0)
  x.fillStyle = 'rgba(5,4,12,0.55)'; x.fillRect(0, 420, 1080, 1500)
  hero(x, t, { x: 250, y: 1170, s: 200, mood: t > T.B + 1.6 ? 'happy' : 'neutral', look: [1, -1], hops: [T.A + 0.4, T.B + 1.8] })
  note(x, 790, 1170, 'look|AGAIN', { w: 280, h: 150, col: '#ffe27a', rot: 0.05, size: 46, k: pop01(t, T.A + 1.5, 0.3, 2.4) })
  sparkles(x, t, 790, 1170, T.B + 1.3, 8, 180, 1)
}
function s3(x, t, S) {
  const { u, hero } = S
  HOME(x, t)
  const step = 0.42, pf = Math.min(5.99, u / step), page = Math.floor(pf), local = (pf % 1)
  calendar(x, t, page, local < 0.25 && page > 0 ? local / 0.25 : 0, pop01(t, S.t0 + page * step + 0.1, 0.22, 2.6))
  // the wins pile up as little stickers on the wall
  for (let i = 0; i < page; i++) note(x, 140 + (i % 2) * 260, 560 + Math.floor(i / 2) * 120, WINS[i][0], { w: 250, h: 96, col: WINS[i][1], rot: ((i * 5) % 3 - 1) * 0.06, size: 25 })
  hero(x, t, { x: 300, y: 1220, s: 270, mood: u > 1.2 ? 'sparkle' : 'wide', look: [1, -0.6], hops: [0.4, 0.85, 1.3, 1.7, 2.1, 2.5].map(v => S.t0 + v) })
}
function fin(x, t, S) {
  const { hero, ok, u } = S
  shadow(x, 540, 1150, 260 * ok)
  hero(x, t, { x: 540, y: 960, s: 300, pop: ok, mood: u > 1.6 ? 'happy' : 'sparkle', look: [0, 0], hops: [S.t0 + 0.1, S.t0 + 0.6, T.last + 1.5] })
  note(x, 800, 760, 'new friend!', { w: 200, h: 80, col: '#9fe6b0', rot: 0.08, size: 26, k: ok })
  note(x, 280, 760, 'learned to bake', { w: 220, h: 80, col: '#ffe27a', rot: -0.08, size: 24, k: ok })
}

const EP = makeSingle({
  id: 'nste22', sign: 'capricorn', name: 'Capricorn',
  hook: 'Single all year. | *Nothing* happened?',
  h1: 'Look *again.*', h2: 'Wait. *Look* at it.',
  lines: ['look *again.* look at the year.', 'new skills. new friends. *you.*'],
  last: 'Look what you built *this* year.',
  bubbles: [
    { t0: 1.0, t1: 3.6, x: 320, y: 950, text: 'no dates. no one.', size: 42, tail: 0 },
    { t0: 3.85, t1: 6.6, x: 360, y: 950, text: 'nothing happened this year…', size: 38, tail: -0.2 },
    { t0: 16.1, t1: 17.3, x: 320, y: 960, text: '…wait. that’s a lot.', size: 42, tail: 0, col: '#ffe2c4' },
  ],
  pis1: { x: 960, y: 1610, s: 120 }, pis3: { x: 960, y: 1630, s: 110 },
  meter: { x: 450, y: 1620 },
  s1, s2, s3, fin,
  cues: [...[1, 2, 3, 4, 5, 6].map(i => ['whoosh', 0.833 * i - 0.1, 0.2, 0.015]), ...[0, 1, 2, 3, 4, 5].map(i => ['pop', 13.7 + i * 0.42, [880, 987.77, 1174.66, 1318.51, 1567.98, 1760][i], 0.04, (i % 2 ? 0.2 : -0.2)])],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [lerp, ease, prog]
