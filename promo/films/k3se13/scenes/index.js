// k3se13: 3-SECOND ADVICE · "Still Single?" (6.2 s vertical trial reel, music: jazzy · F). Format: k3se01/threekit.js.
//   0.00  frame 0: a holiday dinner table under string lights; ♉ the aunt leans in: "so… still single?" and ♈ Aries
//         mid-cough, peas mid-air.  Hook: "'Still single?' at the | *dinner table.*"  Pisces sniffles in the corner.
//   0.50  whip zoom onto Aries' face; the frame holds.   0.95–2.45  3 · 2 · 1.
//   2.45  THE STARS: "'Yes, and I'm *thriving.*' | Then pass the rolls."  Aries smiles: "yes, and I'm thriving."
//         and slides the bread basket down the table; the family laughs ("ha!").  Hard cut at 6.2.
import { makeThree, R, box, bubble, label, shadow, drawBits, sparkles, lerp, prog, ease, clamp, INK, BONE, GOLD, RED, PINK, MINT, INTER } from '../../k3se01/threekit.js'

function lights(x, t) {
  for (let i = 0; i < 12; i++) {
    const px = 40 + i * 92, py = 500 + 26 * Math.sin((i / 11) * Math.PI)
    R(x, INK, px - 2, py - 30, 4, 30)
    const on = Math.sin(t * 4 + i * 1.7) > -0.4
    R(x, INK, px - 11, py - 4, 22, 28); R(x, [RED, GOLD, MINT, PINK][i % 4], px - 7, py, 14, 20)
    if (on) { x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha = 0.35; x.fillStyle = [RED, GOLD, MINT, PINK][i % 4]; x.beginPath(); x.arc(px, py + 10, 26, 0, 7); x.fill(); x.restore() }
  }
  x.strokeStyle = INK; x.lineWidth = 4; x.beginPath(); for (let i = 0; i <= 44; i++) { const px = 40 + i * 23, py = 470 + 26 * Math.sin((i / 44) * Math.PI); i ? x.lineTo(px, py) : x.moveTo(px, py) } x.stroke()
}
function table(x) {
  box(x, 30, 1020, 1020, 130, BONE, { b: 7 })
  for (let i = 0; i < 17; i++) R(x, '#e86a5a', 30 + i * 60, 1020, 30, 130)
  R(x, 'rgba(0,0,0,0.15)', 30, 1020, 1020, 16)
  for (const px of [180, 900]) { x.fillStyle = INK; x.beginPath(); x.ellipse(px, 1030, 76, 22, 0, 0, 7); x.fill(); x.fillStyle = '#f3f0e8'; x.beginPath(); x.ellipse(px, 1026, 68, 18, 0, 0, 7); x.fill() }
}
function basket(x, cx, cy) {
  box(x, cx - 70, cy - 30, 140, 50, '#a07850', { b: 5 })
  for (let i = 0; i < 3; i++) { x.fillStyle = INK; x.beginPath(); x.arc(cx - 40 + i * 40, cy - 34, 24, 0, 7); x.fill(); x.fillStyle = '#e0a860'; x.beginPath(); x.arc(cx - 40 + i * 40, cy - 34, 19, 0, 7); x.fill() }
}

function scene(x, t, S) {
  const { phase, u, hero, star } = S
  lights(x, t)
  const laugh = phase === 'fix' && u > 2.5
  star(x, t, 'taurus', { x: 180, y: 920, s: 210, mood: laugh ? 'happy' : 'neutral', look: [1, 0], seed: 11, hops: laugh ? [2.45 + 2.55, 2.45 + 2.9] : null })
  star(x, t, 'virgo', { x: 900, y: 920, s: 210, mood: laugh ? 'happy' : phase === 'hook' ? 'wide' : 'neutral', look: [-1, 0], seed: 12, hops: laugh ? [2.45 + 2.6, 2.45 + 2.95] : null })
  if (phase === 'hook') {
    hero(x, t, { x: 540, y: 880, s: 280, mood: 'wide', look: [-1, -0.3], squash: -0.1 + 0.08 * Math.sin(t * 45) })
    table(x)
    // peas mid-air
    for (let i = 0; i < 9; i++) { const a = -1.9 + i * 0.22, r = 120 + 140 * ((t + 0.4 + i * 0.07) % 1); R(x, INK, 540 + Math.cos(a) * r - 9, 820 + Math.sin(a) * r * 0.8 - 9, 18, 18); R(x, '#6ccf5a', 540 + Math.cos(a) * r - 6, 820 + Math.sin(a) * r * 0.8 - 6, 12, 12) }
    label(x, '*cough*', 700, 700, { size: 40, col: BONE, rot: 0.15 })
    bubble(x, t, 260, 760, 0, 0, 'so… still single?', { size: 38, k: 1, tail: -0.4 })
    return
  }
  hero(x, t, { x: 540, y: 880, s: 280, mood: u < 0.4 ? 'wide' : 'happy', look: [-0.6, -0.1], hops: [2.45 + 0.5, 2.45 + 1.6] })
  table(x)
  bubble(x, t, 560, 650, 2.45 + 0.5, 2.45 + 2.4, 'yes, and I’m thriving.', { size: 42, tail: 0 })
  // pass the rolls
  const sl = ease.inOutCubic(prog(u, 1.5, 2.2))
  basket(x, lerp(540, 300, sl), 1050)
  if (u > 1.5 && u < 2.4) label(x, 'rolls?', 420, 960, { size: 34, col: GOLD, alpha: clamp(prog(u, 1.6, 1.8)) })
  if (laugh) {
    label(x, 'ha!', 180, 760, { size: 56, col: GOLD, font: INTER, weight: 800, rot: -0.15 })
    label(x, 'ha!', 900, 760, { size: 56, col: GOLD, font: INTER, weight: 800, rot: 0.15 })
    sparkles(x, t, 540, 820, 2.45 + 2.5, 10, 220, 1)
  }
}

const EP = makeThree({
  id: 'k3se13', sign: 'aries', dur: 6.2, brk: 'whip', ending: 'cut', focus: [540, 820],
  hook: "'Still single?' at the | *dinner table.*", accent: '#ff8a6a',
  advice: "'Yes, and I'm *thriving.*' | Then pass the rolls.",
  scene,
  cues: [
    ['tom', 0.05, 180, { gain: 0.12, decay: 0.1 }], ['tick', 0.1, 0.04], ['tick', 0.18, 0.04],
    ['pop', 2.95, 1174.66, 0.04, 0], ['whoosh', 3.95, 0.6, 0.03], ['tick', 4.65, 0.06],
    ['pop', 4.95, 987.77, 0.04, -0.4], ['pop', 5.0, 1318.51, 0.04, 0.4], ['glitter', 4.95, 5.4], ['pluck', 5.1, 1567.98, 0.035, 0, 0.4],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
