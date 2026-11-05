// kpnee08: PLANET TALK: NEPTUNE, "Neptune to Scorpio: The Tinted Lenses" (26 s vertical, star_advice, cinematic · C#m). Loop.
//   0.00  frame 0: Neptune mid-rise through a curtain of fog; heart-shaped glasses mid-flight off Scorpio's face.
//         "Scorpio. Those glasses | are *tinted.*" · 1.0 record scratch: "red flags? *what* red flags?"
//   2.6   the world through the glasses: everything pink, the red flags look like party bunting. "late replies. cancelled
//         plans. so *mysterious.*" · Neptune: "with rose glasses on, red flags just look like *flags.*"
//   9.4   glasses off: the plain view ("cancelled 3x", "replies when bored"). "look at how they *treat* you. not the
//         mystery." · Scorpio: "huh. that's a *lot* of flags."
//  16.6   Neptune: "you deserve someone who's *clear.* no fog needed." · Pisces fountains
//  22.8   "Glasses off. Heart *on.*" The fog rolls back in: the loop.
import { episode, P, drawSpace, pop01, outK, prog, ease, lerp, clamp, rng, INK, BONE, GOLD, ROSE, NEP } from '../../kpnee01/scenes/nepkit.js'

const D = 26
const T = { pink: 2.6, nep1: 6.2, off: 9.4, lot: 13.8, clear: 16.6, end: 22.8 }

function fog(x, t, a = 1) {
  if (a <= 0.01) return
  for (let i = 0; i < 7; i++) {
    const y = 600 + i * 190, dx = Math.sin(t * 0.6 + i * 1.7) * 120
    const g = x.createLinearGradient(0, y - 120, 0, y + 120); g.addColorStop(0, 'rgba(200,210,255,0)'); g.addColorStop(0.5, `rgba(200,210,255,${0.28 * a})`); g.addColorStop(1, 'rgba(200,210,255,0)')
    x.fillStyle = g; x.beginPath(); x.ellipse(540 + dx, y, 760, 120, 0, 0, Math.PI * 2); x.fill()
  }
}
function bunting(x, t, { tint = 0, labels = 0 } = {}) {
  const L = ['replied 3 days later', 'cancelled again :)', 'replies when bored', '"let\'s see"']
  x.save(); x.strokeStyle = INK; x.lineWidth = 6
  for (let row = 0; row < 2; row++) {
    const y0 = 560 + row * 340
    x.beginPath(); x.moveTo(40, y0); x.quadraticCurveTo(540, y0 + 140, 1040, y0); x.stroke()
    for (let i = 0; i < 7; i++) {
      const u = (i + 0.5) / 7, px = lerp(40, 1040, u), py = y0 + 140 * 2 * u * (1 - u) + Math.sin(t * 3 + i) * 4
      x.fillStyle = tint > 0.5 ? (i % 2 ? '#ffb3cf' : '#ffd9e6') : '#e0303f'
      x.beginPath(); x.moveTo(px - 40, py); x.lineTo(px + 40, py); x.lineTo(px, py + 90); x.closePath(); x.fill(); x.stroke()
    }
  }
  x.restore()
  if (labels > 0) L.forEach((s, i) => P.sticker(x, s, [300, 760, 330, 740][i], [760, 720, 1100, 1060][i], { k: pop01(labels, i * 0.25, 0.3), col: BONE, size: 32, rot: i % 2 ? 0.05 : -0.05 }))
  if (tint > 0) { x.save(); x.globalCompositeOperation = 'source-atop'; x.fillStyle = `rgba(255,120,175,${0.28 * tint})`; x.fillRect(0, 0, 1080, 1920); x.restore() }
}

const E = episode({
  sign: 'scorpio', duration: D, ending: 'loop',
  entrance: { kind: 'rise', at: -1.1, x: 540, y: 820, size: 440 },
  hook: { text: 'Scorpio. Those glasses | are *tinted.*', out: [2.35, 2.55], size: 104 },
  fx: [{ kind: 'rec', at: 1.0, len: 1.35, caption: 'red flags? *what* red flags?', sub: 'scorpio · very in love' }],
  caps: [{ at: T.end, text: 'Glasses off. | Heart *on.*', top: 250, size: 116, out: [D - 0.5, D - 0.3] }],
  cry: [[0, 2], [4.0, 2], [7.4, 3], [10.0, 2], [17.4, 3], [T.end, 2]],
  shots: [
    { a: -1, b: T.pink, bg: (x, t) => drawSpace(x, t, { planet: 'neptune', seed: 81 }), mid: (x, t) => fog(x, t),
      front: (x, t) => { const f = t + 1; if (f < 3.6) P.glasses(x, 700 + f * 50, 1330 - f * 90 + f * f * 30, 300, { rot: 0.3 + f * 0.9 }) },
      nep: { x: 540, y: 820, size: 440, mood: 'wide' }, sign: { x: 640, y: 1450, size: 300, mood: 'wide', look: [0.6, -1] } },
    { a: T.pink, b: T.off, bg: (x, t) => { drawSpace(x, t, { planet: 'neptune', seed: 82 }); bunting(x, t, { tint: 1 }); P.glow(x, 540, 960, 900, ROSE, 0.3); P.hearts(x, t, T.pink, 540, 1400, { n: 10, spread: 900, life: 6 }) },
      nep: { x: 160, y: 1330, size: 230, mood: [[0, 'love'], [T.nep1, 'neutral']], glasses: [[0, true], [T.nep1 + 0.1, false]] }, sign: { x: 760, y: 1360, size: 300, mood: 'love', look: [0, -1], glasses: true } },
    { a: T.off, b: T.clear, bg: (x, t) => { drawSpace(x, t, { planet: 'neptune', seed: 82 }); bunting(x, t, { labels: t - T.off - 0.6 }) },
      front: (x, t) => { const f = prog(t, T.off, T.off + 0.8); if (f < 1) P.glasses(x, 760 + f * 200, 1350 - f * 700, 186, { rot: f * 4, alpha: 1 - f }) },
      nep: { x: 160, y: 1330, size: 230, mood: [[0, 'neutral'], [T.lot, 'sad']] }, sign: { x: 760, y: 1360, size: 300, mood: [[0, 'wide'], [T.lot, 'squint']], look: [0, -1] } },
    { a: T.clear, b: T.end, bg: (x, t) => { drawSpace(x, t, { planet: 'neptune', seed: 83 }); P.filmEdge(x, t, { alpha: 0.5 }) },
      nep: { x: 540, y: 800, size: 380, mood: [[0, 'happy'], [T.clear + 2, 'love']] }, sign: { x: 640, y: 1360, size: 300, mood: [[0, 'neutral'], [T.clear + 1.6, 'proud']], look: [0, -1] } },
    { a: T.end, b: D + 1, tr: 0.6, bg: (x, t) => drawSpace(x, t, { planet: 'neptune', seed: 81 }), mid: (x, t) => fog(x, t, prog(t, T.end, T.end + 1.5)),
      nep: { x: 540, y: 820, size: 440, mood: 'love' }, sign: { x: 640, y: 1450, size: 300, mood: 'proud', look: [0.6, -1] } },
  ],
  lines: [
    { t0: T.pink + 0.3, t1: T.nep1 - 0.25, who: 'scorpio', text: 'late replies. cancelled plans. so *mysterious.*', x: 560, y: 1720, tailUp: true, tail: 200 },
    { t0: T.nep1, t1: T.off - 0.2, who: 'neptune', text: 'with rose glasses on, red flags just look like *flags.*', x: 540, y: 1720, tailUp: true, tail: -280 },
    { t0: T.off + 0.9, t1: T.lot - 0.2, who: 'neptune', text: 'look at how they *treat* you. not the mystery.', x: 540, y: 1720, tailUp: true, tail: -280 },
    { t0: T.lot, t1: T.clear - 0.2, who: 'scorpio', text: "huh. that's a *lot* of flags.", x: 620, y: 1720, tailUp: true, tail: 140 },
    { t0: T.clear + 0.3, t1: T.end - 0.2, who: 'neptune', text: "you deserve someone who's *clear.* no fog needed.", x: 540, y: 1080, tailUp: true, tail: 0 },
  ],
  cues: [['whoosh', T.pink, 0.4, 0.04], ['glitter', T.pink, T.pink + 0.8], ['whoosh', T.off, 0.5, 0.05], ['pop', T.off + 0.6, 659.25, 0.04, -0.2], ['pop', T.off + 0.85, 587.33, 0.04, 0.2], ['pop', T.off + 1.1, 523.25, 0.04, -0.2], ['pop', T.off + 1.35, 493.88, 0.04, 0.2]],
})
export const DURATION = E.DURATION, SCENES = E.SCENES, CUES = E.CUES
