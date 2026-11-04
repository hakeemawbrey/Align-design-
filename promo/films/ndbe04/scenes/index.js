// ndbe04: DEALBREAKER OR NOT? E4, "They kept the *receipt* | from date one." (13 s vertical trial reel, music: dreamy · Eb).
//   0.0–3.9   frame 0: ♋ Cancer mid-reveal, lifting the lid of a little keepsake box. Out float: a ticket stub (0.6),
//             a pressed leaf (1.1), and the receipt, unrolling long (1.7). 2.4 ♏ Scorpio: "you kept the RECEIPT?" →
//             2.9 heart eyes.
//   3.9 the vote · 6.1 the stamp: NOT A DEALBREAKER.
//   finale    Scorpio slips its own keepsake into the box (a tiny paper star); the lid closes with a glow; hearts.
//             THE STARS: "Sentimental isn't clingy. It's *noticing.*"
import { makeDeal, R, box, bubble, label, hearts, sparkles, table, floor, glow, prog, lerp, ease, clamp, pop01, outK, drawBits, INK, BONE, GOLD, PINK, T } from '../../ndbe01/scenes/dealkit.js'

function keepBox(x, cx, cy, lid, k = 1) {
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -120, -70, 240, 90, '#c45a7a', { b: 6, hi: '#e07a98' }); R(x, GOLD, -12, -50, 24, 20)
  x.save(); x.translate(0, -70 - 120 * lid); x.rotate(-0.22 * lid); box(x, -126, -30, 252, 30, '#d86a8a', { b: 6, hi: '#f08aa8' }); x.restore()
  x.restore()
}
function ticket(x, cx, cy, rot) { x.save(); x.translate(cx, cy); x.rotate(rot); box(x, -70, -32, 140, 64, '#ffd27a', { b: 5 }); R(x, INK, 30, -32, 4, 64); x.font = "800 22px Inter, sans-serif"; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('ADMIT 1', -18, 2); x.restore() }
function leaf(x, cx, cy, rot) { drawBits(x, ['...LL', '..LLL', '.LLL.', 'LLL..', 'S....'], { L: '#e8813a', S: '#8a5a3c' }, cx, cy, 11, { rot }) }
function receipt(x, cx, top, len, rot = 0) {
  x.save(); x.translate(cx, top); x.rotate(rot)
  R(x, INK, -66, -4, 132, len + 8); R(x, '#fbf7ee', -60, 0, 120, len)
  x.font = "700 18px 'Space Mono', monospace"; x.fillStyle = '#6a6488'; x.textAlign = 'left'
  const rows = ['2 COCOA', '1 PIE', 'NAPKINS', '------', 'TOTAL']
  rows.forEach((r, i) => { if (22 + i * 30 < len) x.fillText(r, -48, 24 + i * 30) })
  for (let i = 0; i < 8; i++) R(x, '#fbf7ee', -60 + i * 15, len, 8, 8)
  x.restore()
}
const LID = [-0.5, 0.2], TK = 0.6, LF = 1.1, RC = 1.7, SAY = 2.4, HEART = 2.9
const EP = makeDeal({
  id: 'ndbe04', sign: 'cancer', date: 'scorpio', verdict: 'not', accent: '#ff8fa0',
  hook: 'They kept the *receipt* | from date one.',
  last: "Sentimental isn't clingy. It's *noticing.*",
  scene(x, t, S) {
    const { u, hero, date } = S
    floor(x, 1150, '#30234a')
    glow(x, 540, 900, 300, 0.25 * clamp(prog(u, 0, 0.6)), '255,200,220')
    hero(x, t, { x: 300, y: 860, s: 250, mood: 'sparkle', look: [1, 0.6], hops: [TK, LF, RC] })
    date(x, t, { x: 790, y: 870, s: 240, mood: u > HEART ? 'heart' : u > SAY - 0.2 ? 'wide' : 'neutral', look: [-1, 0.5], hops: [SAY, HEART] })
    table(x, 540, 1010, 700, { cloth: '#6a4fb0' })
    keepBox(x, 540, 990, ease.outCubic(prog(u, ...LID)))
    const fly = (t0, ex, ey) => { const p = ease.outCubic(prog(u, t0, t0 + 0.45)); return [lerp(540, ex, p), lerp(950, ey, p), p] }
    let [a, b, p] = fly(TK, 380, 620); if (p > 0) ticket(x, a, b + 6 * Math.sin(t * 3), -0.15)
    ;[a, b, p] = fly(LF, 700, 600); if (p > 0) leaf(x, a, b + 6 * Math.sin(t * 3 + 1), 0.2)
    if (u > RC) { const len = 300 * ease.outCubic(prog(u, RC, RC + 0.7)); receipt(x, 545, 520, len, 0.03) }
    sparkles(x, t, 545, 600, RC + 0.3, 8, 120, 1, [GOLD, BONE, PINK])
    bubble(x, t, 800, 690, SAY, 3.85, 'you kept the RECEIPT?', { size: 34, tail: 0.3 })
    hearts(x, t, HEART, 790, 760, { n: 5 })
  },
  sceneCues: [['tick', 0.2, 0.05], ['pop', TK, 987.77, 0.04, -0.3], ['pop', LF, 1174.66, 0.04, 0.3], ['riser', RC, RC + 0.7, 0.02], ['glitter', RC + 0.3, RC + 0.8], ['pop', SAY, 659.25, 0.045, 0.3], ['pluck', HEART, 1567.98, 0.04, 0.5, 0.3]],
  pis: { x: 960, y: 1320, s: 130 },
  finale(x, t, S) {
    const { u, k, hero, date } = S
    floor(x, 1150, '#30234a')
    if (k <= 0.01) return
    glow(x, 540, 900, 300, 0.3 * prog(u, 1.6, 2.0), '255,200,220')
    hero(x, t, { x: 320, y: 870, s: 240, pop: k, mood: u > 1.6 ? 'heart' : 'happy', look: [1, 0.5], hops: [T.stamp + 1.7] })
    date(x, t, { x: 770, y: 875, s: 230, pop: k, mood: 'happy', look: [-1, 0.5], hops: [T.stamp + 0.9, T.stamp + 1.7] })
    table(x, 540, 1010, 700, { cloth: '#6a4fb0' })
    const lid = 1 - ease.inOutCubic(prog(u, 1.4, 1.7))
    // Scorpio's paper star drops in
    const d = ease.inCubic(prog(u, 0.9, 1.4))
    if (u < 1.45) drawBits(x, ['..S..', '.SSS.', 'SSSSS', '.S.S.'], { S: GOLD }, lerp(700, 545, d), lerp(780, 950, d), 12 * k)
    keepBox(x, 540, 990, lid, k)
    sparkles(x, t, 540, 950, T.stamp + 1.7, 10, 120, 2, [GOLD, PINK, BONE])
    hearts(x, t, T.stamp + 1.75, 545, 860, { n: 5 })
    void label
  },
  finaleCues: [['whoosh', 0.9, 0.3, 0.02], ['tick', 1.7, 0.06], ['pluck', 1.72, 1174.66, 0.04, 0.6, 0], ['glitter', 1.7, 2.1]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [outK, pop01]
