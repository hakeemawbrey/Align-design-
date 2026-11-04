// nste06: SINGLE AND THRIVING, Ep 6 "The Day Off Plan" (23 s vertical, Next 30 b33, music: lofi · Am).
// Format kit: ../../nste01/singlekit.js (story 0–20.6, then the short end card). Rows: promo/films/next30/b33.md.
//   0.0–6.8    hook "Day off. | Made a *37-step* plan." Virgo unrolling a schedule scroll that hits the floor and keeps
//              going (7:00 wake · 7:05 stretch · 7:12 journal…). "step 12: relax. efficiently." → "rest: 2:15 to 2:20."
//   6.8        beat cut → THE STARS: "rest isn't a task to *finish.*" / "pick one nice thing. let the rest *wander.*"
//   13.6       the scroll rolls itself up into one small card: "warm socks + a book". Virgo on the couch, socks on,
//              book open: "just… one thing?" → "socks. book. bliss."  Meter fills.
//   17.4       "Virgo: *thriving.*" Last line: "Rest counts. *Unchecked.*"
import { makeSingle, room, couch, box, R, ink, note, shadow, sparkles, mug, pop01, prog, lerp, ease, clamp, T, INK, BONE, MONO } from '../../nste01/singlekit.js'

const STEPS = ['7:00 wake', '7:05 stretch', '7:12 journal', '7:30 tidy', '8:00 errands', '9:15 inbox', '10:40 laundry', '11:30 relax', '12:00 meal prep', '1:10 more tidy', '2:15 REST', '2:20 back to it']
function scroll(x, t, cx, top, len, { rot = 0 } = {}) {
  const w = 300
  x.save(); x.translate(cx, top); x.rotate(rot)
  box(x, -w / 2, 0, w, len, '#f4ecd6', { b: 5 })
  x.save(); x.beginPath(); x.rect(-w / 2, 0, w, len); x.clip()
  STEPS.forEach((s, i) => { const y = 40 + i * 52; if (y < len) { R(x, INK, -w / 2 + 20, y - 10, 20, 20); R(x, '#f4ecd6', -w / 2 + 24, y - 6, 12, 12); ink(x, s, -w / 2 + 54, y, { size: 26, align: 'left', font: MONO, weight: 700, col: s.includes('REST') ? '#e8344e' : INK }) } })
  x.restore()
  box(x, -w / 2 - 20, -18, w + 40, 30, '#c9b48a', { b: 5 }); box(x, -w / 2 - 20, len - 12, w + 40, 30, '#c9b48a', { b: 5 })
  x.restore()
}
function socks(x, cx, cy, k = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  for (const d of [0, 70]) { R(x, INK, d - 4, -84, 48, 92); R(x, INK, d - 4, -8, 82, 44); R(x, '#ff8fb1', d, -80, 40, 84); R(x, '#ff8fb1', d, -4, 74, 36); R(x, BONE, d, -80, 40, 14); R(x, BONE, d + 46, -4, 28, 36) }
  x.restore()
}
function book(x, cx, cy, k = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -110, -60, 220, 120, BONE, { b: 6 }); R(x, INK, -4, -60, 8, 120)
  for (let i = 0; i < 4; i++) { R(x, '#9a90b8', -92, -36 + i * 22, 74, 6); R(x, '#9a90b8', 18, -36 + i * 22, 74, 6) }
  x.restore()
}
const HOME = (x, t) => room(x, t, { wall: '#26304e', wall2: '#222b47', floor: '#30384e', win: { x: 680, y: 480, w: 260, h: 280 } })

function s1(x, t, S) {
  const { u, hero } = S
  HOME(x, t)
  const len = 300 + 420 * ease.outCubic(prog(u, 0, 1.6)) + 30 * Math.max(0, u - 1.6)
  scroll(x, t, 680, 820, Math.min(len, 900), { rot: 0.04 })
  hero(x, t, { x: 330, y: 1150, s: 280, mood: u > 3.8 ? 'wide' : 'sparkle', look: [1, 0.3], hops: [0.3, 0.9, 3.85] })
}
function s2(x, t, S) {
  const { hero } = S
  HOME(x, t)
  x.fillStyle = 'rgba(5,4,12,0.5)'; x.fillRect(0, 420, 1080, 1500)
  hero(x, t, { x: 250, y: 1170, s: 200, mood: t > T.B + 1.6 ? 'happy' : 'neutral', look: [1, -1], hops: [T.A + 0.4, T.B + 1.8] })
  note(x, 790, 1170, 'pick ONE|nice thing', { w: 360, h: 150, col: '#ffe27a', rot: 0.05, size: 40, k: pop01(t, T.A + 1.5, 0.3, 2.4) })
  sparkles(x, t, 790, 1170, T.B + 1.3, 8, 180, 1)
}
function s3(x, t, S) {
  const { u, hero } = S
  HOME(x, t)
  couch(x, 470, 1430, 560, '#4f7a8a')
  const roll = ease.inOutCubic(prog(u, 0, 0.8))
  if (roll < 1) scroll(x, t, lerp(680, 820, roll), lerp(820, 900, roll), lerp(720, 20, roll), { rot: 0.04 })
  note(x, 830, 860, 'warm socks|+ a book', { w: 300, h: 140, col: '#9fe6b0', rot: -0.05, size: 36, k: pop01(t, S.t0 + 0.75, 0.3, 2.6) })
  hero(x, t, { x: 420, y: 1210, s: 270, mood: u > 2.2 ? 'happy' : 'sparkle', look: [0.3, 0.8], hops: [0.9, 1.3, 2.3].map(v => S.t0 + v) })
  book(x, 540, 1320, pop01(t, S.t0 + 1.2, 0.3, 2.4))
  socks(x, 800, 1330, pop01(t, S.t0 + 1.0, 0.3, 2.4))
  mug(x, t, 220, 1330, { s: 0.9, col: '#7fd0ff' })
}
function fin(x, t, S) {
  const { hero, ok, u } = S
  shadow(x, 540, 1150, 260 * ok)
  hero(x, t, { x: 540, y: 960, s: 300, pop: ok, mood: u > 1.6 ? 'happy' : 'sparkle', look: [0, 0], hops: [S.t0 + 0.1, S.t0 + 0.6, T.last + 1.5] })
  socks(x, 760, 1130, ok * 0.7)
}

const EP = makeSingle({
  id: 'nste06', sign: 'virgo', name: 'Virgo',
  hook: 'Day off. | Made a *37-step* plan.',
  h1: 'Put the *pen* down.', h2: 'Just *one* thing.',
  lines: ['rest isn’t a task to *finish.*', 'pick one nice thing. let the rest *wander.*'],
  last: 'Rest counts. *Unchecked.*',
  bubbles: [
    { t0: 1.0, t1: 3.6, x: 330, y: 900, text: 'step 12: relax. efficiently.', size: 38, tail: 0 },
    { t0: 3.85, t1: 6.6, x: 330, y: 900, text: 'rest: 2:15 to 2:20.', size: 42, tail: 0 },
    { t0: 14.4, t1: 15.8, x: 420, y: 920, text: 'just… one thing?', size: 42, tail: 0 },
    { t0: 15.9, t1: 17.3, x: 430, y: 920, text: 'socks. book. bliss.', size: 42, tail: 0, col: '#ffe2c4' },
  ],
  pis1: { x: 950, y: 1600, s: 120 }, pis3: { x: 960, y: 1640, s: 100 },
  s1, s2, s3, fin,
  cues: [['whoosh', 0.1, 0.8, 0.03], ['tick', 1.6, 0.04], ['whoosh', 13.65, 0.6, 0.03], ['pop', 14.4, 1174.66, 0.04, 0.3], ['pop', 14.6, 987.77, 0.03, 0.2], ['pop', 14.8, 1318.51, 0.03, -0.2]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [clamp]
