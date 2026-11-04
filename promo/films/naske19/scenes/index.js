// naske19 · Ask the Stars, Volume 2, ep 19 · "How do we disagree without a fight?" (18 s, dreamy · Eb)
// The format lives in ./askkit2.js (shared by naske19–naske36). Story 0–15.6, then the short shared end card (2.4 s).
//   0.0   DM: "How do we *disagree* without a fight?"  ♎ Libra's scales see-saw wildly: a snowball on one pan,
//         a steaming cocoa on the other. Libra wobbles along with them.
//   3.0   "start with what you both agree on."  The pans level out, sparkle.
//   5.9   "try 'i see it differently', not 'you're wrong'"  A red YOU'RE WRONG bubble is struck out and swapped
//         for I SEE IT DIFFERENTLY.
//   8.8   "you can disagree and still hold hands."  Libra and its partner share one long scarf.
//   12.1  "Same *team.* | Different view."  Libra beams; Pisces happy-cries.
import { makeAsk, R, box, drawBits, mug, bubble, sparkles, hearts, shadow, inSprite, starFrame, scarfCells, pop01, outK, prog, lerp, clamp, ease, INK, BONE, GOLD, RED, SNOW, MONO, INTER } from './askkit2.js'

const SNOWBALL = ['..WWWW..', '.WWWWSW.', 'WWWWWWSW', 'WWWWWWWW', 'WWWWWWWW', 'BWWWWWWW', '.BWWWWW.', '..BBBB..']
const SB_C = { W: SNOW, S: '#ffffff', B: '#c7d6ea' }

function scales(x, t, cx, cy, ang, a) {
  if (a <= 0) return
  x.save(); x.globalAlpha *= a
  // the post (behind the hero) and the base
  box(x, cx - 9, cy, 18, 330, '#d9b45a', { b: 5, hi: '#f2d27a' })
  box(x, cx - 24, cy - 26, 48, 30, GOLD, { b: 5 })
  x.save(); x.translate(cx, cy - 10); x.rotate(ang)
  box(x, -290, -9, 580, 18, GOLD, { b: 5, hi: '#ffe6a0' })
  x.restore()
  for (const s of [-1, 1]) {
    const ex = cx + Math.cos(ang) * 280 * s, ey = cy - 10 + Math.sin(ang) * 280 * s
    // chains
    x.strokeStyle = INK; x.lineWidth = 7
    x.beginPath(); x.moveTo(ex, ey); x.lineTo(ex - 70, ey + 100); x.moveTo(ex, ey); x.lineTo(ex + 70, ey + 100); x.stroke()
    x.strokeStyle = '#e8c766'; x.lineWidth = 3
    x.beginPath(); x.moveTo(ex, ey); x.lineTo(ex - 70, ey + 100); x.moveTo(ex, ey); x.lineTo(ex + 70, ey + 100); x.stroke()
    box(x, ex - 92, ey + 100, 184, 16, '#d9b45a', { b: 5, hi: '#f2d27a' })
    if (s < 0) drawBits(x, SNOWBALL, SB_C, ex, ey + 70, 7)
    else mug(x, t, ex, ey + 74, 6.5)
  }
  x.restore()
}

function scene(x, t, S) {
  const { k, out } = S
  // the scales: wild see-saw in the hook, levelling in beat 1, gone by beat 2
  if (k <= 1) {
    const level = ease.inOutCubic(prog(t, S.b[1] + 0.2, S.b[1] + 1.4))
    const ang = (1 - level) * 0.32 * Math.sin(t * 5.2)
    const a = 1 - prog(t, S.b[2] - 0.25, S.b[2])
    scales(x, t, 540, 700, ang, a)
    const lean = (1 - level) * 0.1 * Math.sin(t * 5.2 + 0.4)
    shadow(x, 540, 1170, 260)
    S.hero(x, t, { x: 540, y: 1000, s: 300, mood: t < 0.9 ? 'wide' : k === 0 ? 'squint' : 'happy', look: [Math.sign(Math.sin(t * 5.2)) * 0.8, -0.6], squash: lean, hops: S.hops(0) })
    sparkles(x, t, 540, 760, S.b[1] + 1.4, 12, 300, 2)
    return
  }
  if (k === 2) {
    shadow(x, 540, 1170, 260)
    S.hero(x, t, { x: 540, y: 1000, s: 300, mood: t < S.b[2] + 0.9 ? 'wide' : 'happy', look: [0, -0.8], hops: S.hops(1) })
    const u = t - S.b[2]
    // "YOU'RE WRONG" … struck out … then the kinder sentence
    const strike = prog(u, 0.75, 1.05)
    bubble(x, t, 540, 690, S.b[2] + 0.15, S.b[2] + 1.55, "YOU'RE WRONG", { col: '#ffd6dc', ink: RED, size: 54, tail: 0 })
    if (u > 0.75 && u < 1.55) { x.save(); x.globalAlpha = outK(u, [1.4, 1.55]); R(x, INK, 540 - 210, 682, 420 * strike + 8, 18); R(x, RED, 540 - 206, 686, 420 * strike, 10); x.restore() }
    bubble(x, t, 540, 690, S.b[2] + 1.6, S.b[3] + 0.2, 'I SEE IT DIFFERENTLY', { col: BONE, size: 50, tail: 0 })
    sparkles(x, t, 540, 690, S.b[2] + 1.6, 10, 280, 1)
    return
  }
  // beat 3: two stars, one long scarf, holding hands
  const k3 = pop01(t, S.b[3] - 0.05, 0.4, 2) * out
  shadow(x, 380, 1170, 220 * k3); shadow(x, 700, 1170, 220 * k3)
  const o1 = { x: 380, y: 1010, s: 270, pop: k3, mood: 'happy', look: [1, 0], hops: S.hops(2) }
  const o2 = { x: 700, y: 1010, s: 270, pop: k3, mood: 'happy', look: [-1, 0], hops: [S.b[3] + 0.5, S.b[3] + 2.2] }
  S.partner(x, t, o2); S.hero(x, t, o1)
  // the shared scarf: one long red band from neck to neck
  const F1 = starFrame(o1.x, o1.y, o1.s, t, o1), F2 = starFrame(o2.x, o2.y, o2.s, t, { ...o2, seed: 7 })
  inSprite(x, F1, () => scarfCells(x, RED, BONE, 2))
  inSprite(x, F2, () => scarfCells(x, RED, BONE, 0))
  if (k3 > 0.5) {
    const y1 = F1.oy - F1.base + (25.8 - 18) * F1.cell * F1.sy, y2 = F2.oy - F2.base + (25.8 - 18) * F2.cell * F2.sy
    const xa = o1.x + 9 * F1.cell, xb = o2.x - 9 * F2.cell
    x.save(); x.lineCap = 'butt'
    x.strokeStyle = INK; x.lineWidth = 34; x.beginPath(); x.moveTo(xa, y1); x.quadraticCurveTo((xa + xb) / 2, Math.max(y1, y2) + 46, xb, y2); x.stroke()
    x.strokeStyle = RED; x.lineWidth = 24; x.beginPath(); x.moveTo(xa, y1); x.quadraticCurveTo((xa + xb) / 2, Math.max(y1, y2) + 46, xb, y2); x.stroke()
    x.restore()
  }
  hearts(x, t, S.b[3] + 0.9, 540, 860, { n: 5, cell: 7, spread: 160 })
}

const EP = makeAsk({
  sign: 'libra', name: 'LIBRA', partner: 'taurus',
  question: 'How do we *disagree* | without a fight?',
  lines: ['start with what you both agree on.', "try 'i see it differently', not 'you're wrong'", 'you can disagree and still hold hands.'],
  chip: '♎ CARDINAL AIR · RULED BY VENUS',
  last: 'Same *team.* | Different view.', lastLate: 2,
  scene,
  cues: [
    ['whoosh', 0.3, 0.25, 0.02], ['tick', 0.6, 0.03], ['tick', 1.2, 0.03], ['tick', 1.8, 0.03], ['tick', 2.4, 0.03],
    ['bell', 4.6, 1318.51, 0.025, 0.8, 0], ['glitter', 4.4, 4.9],
    ['pop', 6.05, 659.25, 0.04, 0], ['whoosh', 6.65, 0.2, 0.03], ['tick', 6.9, 0.05], ['pop', 7.5, 1174.66, 0.04, 0], ['glitter', 7.5, 7.9],
    ['pop', 9.2, 880, 0.03, -0.3], ['pop', 9.3, 1046.5, 0.03, 0.3], ['glitter', 9.7, 10.2],
  ],
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
