// nste07: SINGLE AND THRIVING, Ep 7 "Nobody to Ask" (25 s vertical, Next 30 b33, music: dreamy · F).
// Format kit: ../../nste01/singlekit.js (story 0–20.6, then the shared end card). Rows: promo/films/next30/b33.md.
//   0.0–6.8    hook "Red or gold? | *Nobody* to ask." Libra in front of a bare tree, holding a red ornament and a gold
//              one up in turn, weighing them like scales: "red or gold??" → "red. no. gold? no…"  Pisces sniffles.
//   6.8        card cut → THE STARS: "you don't need a *second vote.*" / "what do *you* like? start there."
//   13.6       Libra hangs BOTH, then a dozen more, the tree lights up, Libra steps back proud: "both. obviously." →
//              "it's so ME."  Meter fills.
//   17.4       "Libra: *thriving.*" Last line: "Your taste was *always* enough."
import { makeSingle, room, tree, R, note, shadow, sparkles, pop01, prog, lerp, ease, clamp, T, INK, GOLD } from '../../nste01/singlekit.js'

function orn(x, cx, cy, col, k = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  R(x, INK, -4, -44, 8, 20); R(x, INK, -14, -28, 28, 12); R(x, '#c9c2d8', -10, -26, 20, 8)
  R(x, INK, -30, -18, 60, 60); R(x, INK, -36, -10, 72, 44); R(x, col, -26, -14, 52, 52); R(x, col, -32, -6, 64, 36); R(x, 'rgba(255,255,255,0.6)', -18, -6, 12, 12)
  x.restore()
}
const HOME = (x, t) => room(x, t, { wall: '#2f2350', wall2: '#2a1f4a', floor: '#3a2c4e', win: { x: 120, y: 480, w: 240, h: 270 } })
const ORN = [[-110, -150, '#e8344e'], [90, -170, GOLD], [-40, -260, '#7fd0ff'], [60, -320, '#ff8fb1'], [-80, -380, '#9fe6b0'], [130, -100, '#c9a6ff'], [-150, -90, GOLD], [20, -200, '#e8344e']]

function s1(x, t, S) {
  const { u, hero } = S
  HOME(x, t)
  tree(x, t, 800, 1420, { h: 520, lit: 0, topStar: true })
  hero(x, t, { x: 360, y: 1180, s: 280, mood: u > 3.8 ? 'wide' : 'neutral', look: [Math.sin(u * 3) > 0 ? -1 : 1, -0.6], hops: [1.0, 2.0, 3.85, 4.6] })
  const w = Math.sin(u * 3) * 50
  orn(x, 190, 980 + w, '#e8344e'); orn(x, 530, 980 - w, GOLD)
}
function s2(x, t, S) {
  const { hero } = S
  HOME(x, t)
  x.fillStyle = 'rgba(5,4,12,0.5)'; x.fillRect(0, 420, 1080, 1500)
  hero(x, t, { x: 250, y: 1170, s: 200, mood: t > T.B + 1.6 ? 'happy' : 'neutral', look: [1, -1], hops: [T.A + 0.4, T.B + 1.8] })
  note(x, 790, 1170, 'what do YOU|like?', { w: 360, h: 150, col: '#ffe27a', rot: 0.05, size: 40, k: pop01(t, T.A + 1.5, 0.3, 2.4) })
  sparkles(x, t, 790, 1170, T.B + 1.3, 8, 180, 1)
}
function s3(x, t, S) {
  const { u, hero } = S
  HOME(x, t)
  const lit = clamp(prog(u, 1.6, 2.6))
  tree(x, t, 720, 1420, { h: 540, lit, topStar: true })
  ORN.forEach(([dx, dy, c], i) => orn(x, 720 + dx, 1420 + dy, c, pop01(t, S.t0 + 0.2 + i * 0.16, 0.25, 2.6)))
  const back = ease.inOutCubic(prog(u, 1.8, 2.4))
  hero(x, t, { x: lerp(430, 260, back), y: 1180, s: 260, mood: u > 1.8 ? 'happy' : 'sparkle', look: [1, -0.4], hops: [0.25, 0.6, 0.95, 1.3, 2.5].map(v => S.t0 + v) })
  sparkles(x, t, 720, 1000, S.t0 + 2.6, 12, 260, 2)
}
function fin(x, t, S) {
  const { hero, ok, u } = S
  shadow(x, 540, 1150, 260 * ok)
  hero(x, t, { x: 540, y: 960, s: 300, pop: ok, mood: u > 1.6 ? 'happy' : 'sparkle', look: [0, 0], hops: [S.t0 + 0.1, S.t0 + 0.6, T.last + 1.5] })
  orn(x, 330, 880 + 10 * Math.sin(t * 2), '#e8344e', ok); orn(x, 760, 880 - 10 * Math.sin(t * 2), GOLD, ok)
}

const EP = makeSingle({
  id: 'nste07', sign: 'libra', name: 'Libra',
  hook: 'Red or gold? | *Nobody* to ask.',
  h1: 'One vote is *plenty.*', h2: 'Trust your *taste.*',
  lines: ['you don’t need a *second vote.*', 'what do *you* like? start there.'],
  last: 'Your taste was *always* enough.',
  bubbles: [
    { t0: 1.0, t1: 3.6, x: 360, y: 820, text: 'red or gold??', size: 44, tail: 0 },
    { t0: 3.85, t1: 6.6, x: 380, y: 820, text: 'red. no. gold? no…', size: 42, tail: 0 },
    { t0: 14.2, t1: 15.7, x: 400, y: 900, text: 'both. obviously.', size: 42, tail: 0 },
    { t0: 15.9, t1: 17.3, x: 300, y: 900, text: 'it’s so ME.', size: 46, tail: 0, col: '#ffe2c4' },
  ],
  pis1: { x: 960, y: 1600, s: 120 }, pis3: { x: 960, y: 1620, s: 110 },
  s1, s2, s3, fin,
  cues: [...[0, 1, 2, 3, 4, 5, 6, 7].map(i => ['pop', 13.8 + i * 0.16, [987.77, 1174.66, 1318.51, 1567.98][i % 4], 0.03, (i % 2 ? 0.2 : -0.2)]), ['glitter', 15.2, 16.2], ['bell', 16.2, 2349.32, 0.03, 1, 0.3]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
