// khee09: HEALING ERA, Ep 9 "The escape trip" (22 s vertical, Month 2 boost m15, star_advice post, house · A).
// Engine: ../../khee01/healkit.js (sets: ../../khee01/healset.js). Rows: promo/films/month2/m15.md. Hard cut.
//   0.0    frame 0: Sagittarius mid-leap over the kitchen counter, a half-zipped suitcase in tow, socks flying. DAY 2.
//          Hook: "Day 2. Booked a trip. *Leaving tonight.*"
//   0.6    whip zoom; the kit's notification drops: "ANYWHERE BUT HERE · departs *11:40 PM*". Sag sits on the suitcase
//          to shut it; it pops open, socks everywhere. "new city. new me. no feelings."  Pisces sniffles.
//   6.4    THE STARS: "the feelings pack *themselves.*" / "go later, for joy. tonight, *walk* with a friend."
//   13.9   Sag unpacks; Aries turns up, they walk the block, Sag laughs once. The calendar tears to DAY 20, a real trip
//          pinned on it: "TRIP w/ ARIES!". Pisces cries holding a sock.
//   19.7   Last line: "Run *toward* something."  (accent lands at 21.05, holds to the last frame)
import { makeHeal, lerp, prog, ease, shadow, pop01, R, INK, BONE, ink } from '../../khee01/healkit.js'
import { kitchen, suitcase } from '../../khee01/healset.js'
import { notification, notificationCues } from '../../hookkit.js'

const FLOOR = 1420, fy = s => FLOOR - 0.44 * s
const NOTE = { at: 1.0, out: [3.6, 3.85], title: 'trips', body: 'ANYWHERE BUT HERE · departs *11:40 PM*', glyph: '♐', time: 'now', y: 470 }
const SOCK = ['.SS', '.SS', '.SS', 'SSS', 'SS.']
function sock(x, cx, cy, rot = 0, col = '#ff8fb1') { x.save(); x.translate(cx, cy); x.rotate(rot); for (let j = 0; j < 5; j++) for (let i = 0; i < 3; i++) if (SOCK[j][i] === 'S') { R(x, INK, i * 16 - 26, j * 16 - 42, 20, 20); } for (let j = 0; j < 5; j++) for (let i = 0; i < 3; i++) if (SOCK[j][i] === 'S') R(x, j === 0 ? BONE : col, i * 16 - 24, j * 16 - 40, 16, 16); x.restore() }
function socks(x, t, t0, cx, cy, n = 6) { const tt = t - t0; if (tt < 0) return; for (let i = 0; i < n; i++) { const a = -Math.PI / 2 + (i / n - 0.5) * 2.2, v = 520; const k = Math.min(tt, 0.9); const px = cx + Math.cos(a) * v * k, py = Math.min(1400, cy + Math.sin(a) * v * k + 900 * k * k); sock(x, px, py, tt * 5 + i, ['#ff8fb1', '#7fd0ff', '#9fe6b0', '#f2c75c'][i % 4]) } }

function s1(x, t, S) {
  const { u, hero } = S
  kitchen(x, t, { cal: { day: 2 }, stoveClock: '10:58' })
  // the leap: mid-air over the counter at frame 0, landing at 0.5
  const p = prog(u, -0.5, 0.5)
  const hx = lerp(260, 560, p), hy = lerp(980, fy(290), p) - Math.sin(Math.PI * p) * 180
  const sit = u > 2.6
  const sx = sit ? 560 : hx, sy = sit ? fy(290) - 110 : hy
  shadow(x, sx, FLOOR + 4, 300)
  const pop = u > 3.6
  suitcase(x, sit ? 560 : hx + 150, sit ? 1416 : hy + 180, { s: 1, open: pop ? 1 : 0.25 })
  hero(x, t, { x: sx, y: sy, s: 290, mood: u < 0.5 ? 'wide' : pop ? 'wide' : 'happy', look: [1, -0.4], blink: false, squash: u < 0.5 ? -0.1 : sit ? 0.15 : 0, hops: pop ? [S.t0 + 3.62] : undefined })
  socks(x, t, -0.4, hx + 150, hy + 100, 4)
  socks(x, t, S.t0 + 3.6, 560, 1250, 6)
}
function s2(x, t, S) {
  const { u, hero } = S
  kitchen(x, t, { cal: { day: 2 }, stoveClock: '11:05', dim: 0.5 })
  shadow(x, 540, 1300, 260)
  hero(x, t, { x: 540, y: 1185, s: 260, mood: u > 4 ? 'sparkle' : 'neutral', look: [0, -1] })
  suitcase(x, 790, 1330, { s: 0.6, open: 1 })
}
function s3(x, t, S) {
  const { u, hero, star } = S
  kitchen(x, t, { cal: { day: 20 }, stoveClock: u < 2 ? '11:10' : '6:30', morning: lerp(0, 0.4, prog(u, 2.4, 3.6)) })
  // the walk: both cross the floor left → right, then back for the calendar
  const w = prog(u, 1.4, 4.4)
  const ak = pop01(t, S.t0 + 1.2, 0.35, 2.2)
  const hx = u < 1.4 ? 360 : lerp(260, 760, w)
  shadow(x, hx, FLOOR + 4, 280)
  const laugh = u > 3.0 && u < 3.8
  hero(x, t, { x: hx, y: fy(280), s: 280, mood: u < 1.2 ? 'neutral' : laugh ? 'happy' : 'sparkle', look: [1, 0], squash: laugh ? 0.08 * Math.abs(Math.sin(u * 12)) : 0, hops: u > 1.4 ? [0.35, 0.7, 1.05, 1.4, 1.75, 2.1, 2.45, 2.8].map(v => S.t0 + 1.4 + v) : undefined })
  if (ak > 0.01) { const ax = u < 1.4 ? 120 : lerp(110, 560, w); shadow(x, ax, FLOOR + 4, 230); star(x, t, 'aries', { x: ax, y: fy(230), s: 230, pop: ak, mood: 'happy', look: [1, 0], seed: 13, hops: [0.5, 0.9, 1.3, 1.7, 2.1, 2.5].map(v => S.t0 + 1.4 + v) }) }
  if (u < 1.4) suitcase(x, 640, 1416, { s: 0.8, open: 1 - prog(u, 0.2, 1.0) })
  // the trip, pinned to the wall calendar's corner
  const pin = pop01(t, S.t0 + 1.0, 0.3, 2.4)
  if (pin > 0.01) { x.save(); x.translate(470, 790); x.rotate(-0.06); x.scale(pin, pin); R(x, INK, -110, -30, 220, 60); R(x, '#9fe6b0', -106, -26, 212, 52); ink(x, 'TRIP w/ ARIES!', 0, 1, { size: 24 }); x.restore() }
}
function fin(x, t, S) {
  const { u, hero, star } = S
  kitchen(x, t, { cal: { day: 20 }, stoveClock: '6:40', morning: 0.4, dim: 0.3 })
  x.save(); x.translate(470, 790); x.rotate(-0.06); R(x, INK, -110, -30, 220, 60); R(x, '#9fe6b0', -106, -26, 212, 52); ink(x, 'TRIP w/ ARIES!', 0, 1, { size: 24 }); x.restore()
  shadow(x, 420, 1290, 290); shadow(x, 690, 1300, 230)
  hero(x, t, { x: 420, y: 1160, s: 300, mood: u > 1 ? 'happy' : 'sparkle', look: [0, 0], hops: [S.t0 + 0.1, S.T.lastAt + 0.05] })
  star(x, t, 'aries', { x: 690, y: 1190, s: 230, mood: 'happy', look: [-1, 0], seed: 13 })
}
function top(x, t, S) {
  // Pisces' sock (scene 3): drawn with Pisces in screen space
  if (t > S.T.s3[0] + 0.5 && t < S.T.s3[1]) sock(x, 960, 1310, 0.3, '#7fd0ff')
}

const EP = makeHeal({
  id: 'khee09', sign: 'sagittarius', name: 'Sagittarius', len: 22, ending: 'cut',
  hook: 'Day 2. Booked a trip. | *Leaving tonight.*',
  brk: { kind: 'whip', at: 0.6, x: 600, y: 1150 },
  whip: { x: 420, y: 1050 },
  kit: [notification(NOTE)], kitCues: notificationCues(NOTE),
  h1: 'You can’t *outrun* it.', h2: 'Walk the *block* first.',
  lines: ['the feelings pack *themselves.*', 'go later, for joy. tonight, *walk* with a friend.'],
  last: 'Run *toward* | something.', day: 2, dayTo: 20,
  bubbles: [
    { t0: 4.2, t1: 6.2, x: 520, y: 930, text: 'new city. new me. no feelings.', size: 36, tail: 0 },
    { t0: 17.0, t1: 18.8, x: 700, y: 930, text: 'okay that was actually nice.', size: 36, tail: 0.1 },
  ],
  pis1: { x: 930, y: 1350, s: 150 }, pis3: { x: 940, y: 1352, s: 150 },
  s1, s2, s3, fin, top,
  cues: [['whoosh', 0.0, 0.5, 0.05], ['pop', 0.45, 196, 0.06, 0], ['tick', 0.5, 0.06], ['pop', 3.2, 220, 0.05, 0], ['pop', 3.65, 1318.51, 0.05, 0], ['whoosh', 3.65, 0.4, 0.04], ['pop', 14.9, 880, 0.04, -0.3], ...Array.from({ length: 8 }, (_, i) => ['tick', 15.3 + i * 0.35, 0.025]), ['bell', 16.9, 1318.51, 0.03, 0.8, 0]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void BONE
