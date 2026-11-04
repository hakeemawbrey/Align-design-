// ndbe02: DEALBREAKER OR NOT? E2, "Your date is *rude* | to the server." (13 s vertical trial reel, music: cinematic · Dm).
// Story 0–10.6, then the shared end card (format: ../../ndbe01/scenes/dealkit.js).
//   0.0–3.9   frame 0: ♉ Taurus mid-bite at a candlelit table; the grey date (no sign) snapping its fingers: SNAP! SNAP!
//             0.7 the server star hurries in with a plate, it wobbles. 1.6 the date: "ugh. hurry UP." 2.4 Taurus's fork
//             freezes; 2.7 the candle gutters out.
//   3.9 the vote · 6.1 the stamp: DEALBREAKER. + "ADDED TO MY DEALBREAKERS".
//   finale    the date's chair is empty. Taurus thanks the server ("thank you, really!"), the server beams; the candle
//             relights. THE STARS: "How they treat the server is a *preview.*"
import { makeDeal, R, box, bubble, label, shadow, hearts, sparkles, table, candle, floor, glow, prog, lerp, ease, clamp, outK, pop01, INK, BONE, GOLD, T } from '../../ndbe01/scenes/dealkit.js'
import { drawStarChar } from '../../ndbe01/scenes/dealkit.js'

const TAU = '#5fd38a', SERVER = '#7fd0ff'
function plate(x, t, cx, cy, s = 1, rot = 0) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  box(x, -70, -6, 140, 14, BONE, { b: 5 })
  box(x, -40, -40, 80, 34, '#e0a24a', { b: 5, hi: '#f4c06a' }); R(x, '#5fd38a', -30, -46, 18, 8); R(x, '#e8344e', 6, -48, 14, 10)
  x.restore()
}
function fork(x, cx, cy, rot) {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  R(x, INK, -5, -10, 10, 70); R(x, '#d8d4e8', -2, -8, 4, 66)
  R(x, INK, -14, -40, 28, 34); for (let i = 0; i < 3; i++) R(x, '#d8d4e8', -10 + i * 8, -38, 4, 30)
  x.restore()
}
const SNAPS = [-0.4, 0.15, 0.55], SAY = 1.6, FREEZE = 2.4, OUT = 2.7
const EP = makeDeal({
  id: 'ndbe02', sign: 'taurus', date: 'grey', verdict: 'deal', accent: '#ff6177', voteMood: 'wide',
  hook: 'Your date is *rude* | to the server.',
  last: 'How they treat the server is a *preview.*',
  scene(x, t, S) {
    const { u, hero, date } = S
    floor(x, 1150, '#33244a')
    glow(x, 540, 900, 420, 0.16 * (1 - prog(u, OUT, OUT + 0.3)))
    // Taurus (left), mid-bite → frozen
    const frz = u > FREEZE
    hero(x, t, { x: 290, y: 860, s: 260, mood: frz ? 'wide' : 'happy', look: frz ? [1, 0] : [0, 0], hops: [-0.2, 0.5, FREEZE + 0.02] })
    // the grey date (right), snapping
    date(x, t, { x: 790, y: 870, s: 240, mood: u > SAY && u < 3.2 ? 'eyeroll' : 'squint', look: [-1, -0.4], hops: [...SNAPS, SAY] })
    table(x, 540, 1000, 760)
    candle(x, t, 540, 1000, 1 - prog(u, OUT, OUT + 0.25))
    plate(x, t, 300, 1000)
    const fy = frz ? 930 : 930 - 30 * Math.abs(Math.sin(u * 5))
    fork(x, 400, fy, frz ? -0.1 : -0.5)
    SNAPS.forEach((s, i) => { const k = pop01(t, s, 0.18, 3) * outK(t, [s + 0.4, s + 0.55]); if (k > 0.01) label(x, 'SNAP!', [930, 960, 900][i], [690, 640, 700][i], { size: 40 * k, col: '#ffd23a', font: "Inter, sans-serif", weight: 800, rot: [0.2, -0.15, 0.1][i] }) })
    // the server hurries in with a plate (it wobbles)
    const sIn = ease.outCubic(prog(u, 0.6, 1.3)), sx = lerp(1250, 660, sIn)
    if (u > 0.6) {
      shadow(x, sx, 1150, 150)
      drawStarChar(x, sx, 1010, 180, t, { color: SERVER, mood: u > SAY ? 'wide' : 'neutral', look: [1, 0], seed: 11, glow: 0.8, hops: [0.8, 1.1, SAY + 0.05] })
      plate(x, t, sx - 70, 960, 0.8, 0.18 * Math.sin(u * 14) * (1 - prog(u, 1.3, 2.0)))
    }
    bubble(x, t, 760, 640, SAY, 3.85, 'ugh. hurry UP.', { size: 40, tail: 0.3 })
    label(x, '…', 290, 650, { size: 64, col: BONE, alpha: prog(u, FREEZE, FREEZE + 0.2) })
  },
  sceneCues: [...SNAPS.filter(s => s >= 0).map(s => ['clap', s, { gain: 0.1, pan: 0.4 }]), ['whoosh', 0.6, 0.45, 0.03], ['tick', 1.1, 0.04], ['tick', 1.2, 0.03],
    ['pop', SAY, 440, 0.045, 0.3], ['pluck', FREEZE, 293.66, 0.04, 0.8, -0.3], ['whoosh', OUT, 0.3, 0.02]],
  pis: { x: 960, y: 1320, s: 130 },
  finale(x, t, S) {
    const { u, k, hero } = S
    floor(x, 1150, '#33244a')
    if (k <= 0.01) return
    glow(x, 540, 900, 420, 0.16 * prog(u, 1.4, 1.8))
    hero(x, t, { x: 330, y: 880, s: 240, pop: k, mood: u > 1.2 ? 'happy' : 'neutral', look: [1, 0], hops: [T.stamp + 1.1, T.stamp + 2.2] })
    drawStarChar(x, 760, 900, 200, t, { color: SERVER, pop: k, mood: u > 1.8 ? 'sparkle' : 'happy', look: [-1, 0], seed: 11, glow: 0.9, hops: [T.stamp + 1.9] })
    table(x, 540, 1010, 760)
    candle(x, t, 540, 1010, clamp(prog(u, 1.4, 1.6)))
    bubble(x, t, 340, 660, T.stamp + 1.0, T.out[0], 'thank you, really!', { size: 32, tail: -0.2 })
    hearts(x, t, T.stamp + 1.9, 760, 760, { n: 4 })
    sparkles(x, t, 540, 920, T.stamp + 1.45, 8, 90, 2, [GOLD, BONE])
  },
  finaleCues: [['pop', 1.0, 880, 0.04, -0.3], ['pluck', 1.45, 1174.66, 0.035, 0.5, 0], ['pluck', 1.9, 1567.98, 0.035, 0.5, 0.3]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [R, label, lerp]
