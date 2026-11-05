// khee02: HEALING ERA, Ep 2 "The hoodie" (20 s vertical, Month 2 boost m15, star_advice post, dreamy · F).
// Engine: ../../khee01/healkit.js (sets: ../../khee01/healset.js). Rows: promo/films/month2/m15.md. Loop ending.
//   0.0    frame 0: Taurus on the kitchen floor in a giant hoodie that isn't theirs, the hood up, mid-sniff of the
//          sleeve (sniff lines), DAY 3 on the wall. Hook: "Day 3. Still in *their* hoodie."
//   0.6    record scratch + freeze, a red "caught" circle on the sleeve: "exhibit A: the sleeve sniff."
//          "it still smells like them." / "keeping it. forever. probably."  Pisces sniffles with tissues.
//   6.4    THE STARS: "you don't have to toss it. just *put it away.*" / "a box on a shelf is a kind *goodbye.*"
//   12.4   Taurus folds the hoodie into a box marked LATER, slides it on the shelf, pulls on its own mint sweater.
//          The calendar tears to DAY 8. Pisces tears up at the folding.
//   17.1   Last line: "Wear *your own* cosy."  The last 0.42 s eases back into frame 0.
import { makeHeal, lerp, prog, ease, shadow, pop01, starFrame, inSprite, R, INK, BONE, ink } from '../../khee01/healkit.js'
import { kitchen, mixHex } from '../../khee01/healset.js'

const FLOOR = 1420, fy = s => FLOOR - 0.44 * s
const HOOD = '#6f84b0', HOOD2 = '#566a96', MINTK = '#5fcf9a', MINTK2 = '#4ab585'

/** the borrowed hoodie, in sprite cells (36 × 36): the hood behind, the body + sleeves in front */
function hoodBack(x, F) { inSprite(x, F, () => { x.fillStyle = INK; x.fillRect(4.5, 1.5, 27, 22); x.fillStyle = HOOD2; x.fillRect(5.5, 2.5, 25, 20) }) }
function hoodFront(x, F, sniff = 0, col = HOOD, col2 = HOOD2, strings = true) {
  inSprite(x, F, () => {
    x.fillStyle = INK; x.fillRect(4, 24, 28, 12); x.fillStyle = col; x.fillRect(5, 25, 26, 10.5)
    x.fillStyle = col2; x.fillRect(5, 31, 26, 1.2); x.fillRect(12, 28.5, 12, 4)
    if (strings) { x.fillStyle = BONE; x.fillRect(15, 25, 1, 4); x.fillRect(21, 25, 1, 4) }
    // sleeves: the left one comes up to the face for the sniff
    const sx = lerp(0, 9, sniff), sy = lerp(27, 21, sniff)
    x.fillStyle = INK; x.fillRect(-1 + sx * 0.2, sy - 1, 9 + sx * 0.4, 7); x.fillStyle = col; x.fillRect(sx * 0.2, sy, 7 + sx * 0.4, 5)
    x.fillStyle = INK; x.fillRect(29, 26, 9, 7); x.fillStyle = col; x.fillRect(30, 27, 7, 5)
  })
}
function taurusIn(x, t, S, o, wear = 'hoodie', sniff = 0) {
  const opts = { x: o.x, y: o.y, s: o.s, squash: o.squash ?? 0, hops: o.hops, seed: 3, bob: o.bob }
  const F = starFrame(o.x, o.y, o.s, t, opts)
  if (wear === 'hoodie') hoodBack(x, F)
  S.hero(x, t, o)
  if (wear === 'hoodie') hoodFront(x, F, sniff)
  else if (wear === 'sweater') hoodFront(x, F, 0, MINTK, MINTK2, false)
}
function sniffLines(x, t, cx, cy) { for (let i = 0; i < 3; i++) { const p = ((t * 2 + i / 3) % 1); x.save(); x.globalAlpha = 1 - p; R(x, BONE, cx - 40 - p * 40, cy - 30 + i * 26, 26, 6); x.restore() } }
function shelfBox(x, cx, cy, { lid = 1, k = 1, label = 'LATER' } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  R(x, INK, -110, -96, 220, 102); R(x, '#c99a5c', -104, -90, 208, 90); R(x, '#b0844a', -104, -90, 208, 14)
  R(x, INK, -60, -60, 120, 40); R(x, BONE, -56, -56, 112, 32); ink(x, label, 0, -40, { size: 26 })
  if (lid < 1) { x.save(); x.translate(-110, -96); x.rotate(-(1 - lid) * 1.6); R(x, INK, 0, -8, 220, 14); R(x, '#d8aa6c', 4, -5, 212, 8); x.restore() }
  x.restore()
}

function s1(x, t, S) {
  const { u } = S
  kitchen(x, t, { cal: { day: 3 }, stoveClock: '3:14' })
  shadow(x, 330, FLOOR + 4, 300)
  const sniff = u < 4 ? 1 : 0.4 + 0.6 * Math.max(0, Math.sin(u * 3))
  const hug = u > 2.2 && u < 4.2 ? 0.1 * Math.sin((u - 2.2) * 9) : 0
  taurusIn(x, t, S, { x: 330, y: fy(300), s: 300, mood: u < 3.6 ? 'sparkle' : 'heart', look: [-1, -0.2], squash: 0.06 + hug }, 'hoodie', sniff)
  if (u < 0.55 || u > 1.5) sniffLines(x, t, 250, 1180)
}
function s2(x, t, S) {
  const { u } = S
  kitchen(x, t, { cal: { day: 3 }, stoveClock: '3:20', dim: 0.5 })
  shadow(x, 540, 1300, 260)
  taurusIn(x, t, S, { x: 540, y: 1185, s: 260, mood: u > 3.8 ? 'sparkle' : 'neutral', look: [0, -1], squash: 0.06 }, 'hoodie', 0.2)
}
function s3(x, t, S) {
  const { u } = S
  kitchen(x, t, { cal: { day: 8 }, stoveClock: '10:05', morning: lerp(0.1, 0.6, prog(u, 0.5, 2.5)) })
  shadow(x, 380, FLOOR + 4, 280)
  const fold = ease.inOutCubic(prog(u, 0.2, 1.4))        // the hoodie folds into the box
  const shelf = ease.inOutCubic(prog(u, 1.6, 2.2))       // the box slides up onto the counter
  const wear = u > 2.5 ? 'sweater' : 'none'
  const pullK = ease.outBack ? 1 : 1
  void pullK
  taurusIn(x, t, S, { x: 380, y: fy(280), s: 280, mood: u < 1.4 ? 'neutral' : u < 2.5 ? 'sparkle' : 'happy', look: [1, 0], hops: [S.t0 + 2.55, S.t0 + 3.0], squash: u > 2.5 && u < 2.7 ? -0.15 : 0 }, wear)
  // the folded hoodie
  const bx = lerp(640, 760, shelf), by = lerp(1400, 1052, shelf)
  if (fold < 1) { const w = lerp(260, 150, fold), h = lerp(200, 50, fold); R(x, INK, 640 - w / 2 - 5, 1330 - h / 2 - 5, w + 10, h + 10); R(x, HOOD, 640 - w / 2, 1330 - h / 2, w, h); R(x, HOOD2, 640 - w / 2, 1330 - 4, w, 8) }
  shelfBox(x, bx, by, { lid: fold >= 1 ? 1 : 0 })
  if (fold >= 1 && shelf < 1) void 0
}
function fin(x, t, S) {
  const { u } = S
  kitchen(x, t, { cal: { day: 8 }, stoveClock: '10:10', morning: 0.65, dim: 0.3 })
  shelfBox(x, 760, 1052, {})
  shadow(x, 540, 1290, 280)
  taurusIn(x, t, S, { x: 540, y: 1160, s: 300, mood: u > 1.0 ? 'happy' : 'sparkle', look: [0, 0], hops: [S.t0 + 0.1, S.T.lastAt + 0.05] }, 'sweater')
}
const EP = makeHeal({
  id: 'khee02', sign: 'taurus', name: 'Taurus', len: 20, ending: 'loop',
  hook: 'Day 3. Still in | *their* hoodie.',
  brk: { kind: 'scratch', at: 0.6, len: 1.3, text: 'exhibit A: *the sleeve sniff.*' },
  caught: { at: 0.8, x: 290, y: 1150, r: 140, out: [1.8, 1.9], label: 'STILL SNIFFING', arrow: 'tr' },
  whip: { x: 320, y: 1180 },
  h1: 'You can *keep* it. Just…', h2: 'Fold it. *Shelf* it.',
  lines: ['you don’t have to toss it. just *put it away.*', 'a box on a shelf is a kind *goodbye.*'],
  last: 'Wear *your own* cosy.', late: 2, day: 3, dayTo: 8,
  bubbles: [
    { t0: 1.7, t1: 3.7, x: 560, y: 980, text: 'it still smells like them.', size: 38, tail: -0.6 },
    { t0: 3.8, t1: 6.1, x: 580, y: 980, text: 'keeping it. forever. probably.', size: 36, tail: -0.6 },
  ],
  pis1: { x: 905, y: 1345, s: 170 }, pis3: { x: 940, y: 1352, s: 150 },
  s1, s2, s3, fin,
  cues: [['whoosh', 0.02, 0.35, 0.03], ['pop', 0.6, 220, 0.04, 0], ['whoosh', 0.62, 0.3, 0.03], ['pluck', 12.6, 587.33, 0.03, 0.5, 0.2], ['tick', 13.8, 0.05], ['whoosh', 14.0, 0.4, 0.03], ['tick', 14.6, 0.05], ['pop', 14.95, 1174.66, 0.04, -0.2], ['glitter', 14.95, 15.4]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void mixHex
