// k3se19: 3-SECOND ADVICE · "Said Yes, Meant No" (6.4 s vertical trial reel, music: pop · E). Format: k3se01/threekit.js.
//   0.00  frame 0: ♎ Libra nodding so fast it's a blur, "SURE!!" bubbles stacking up, while ♈ a friend keeps asking:
//         "help me move saturday? and sunday? and…"  Hook: "Said yes. | Meant *absolutely not.*"  Pisces sniffles.
//   0.50  record scratch: the nodding freezes mid-blur.   0.95–2.45  3 · 2 · 1.
//   2.45  THE STARS: "*'No, thank you'* | is a full sentence."  The SURE!! bubbles pop away; Libra, calm: "thank you,
//         but I’ll pass this time."  The friend: "totally fair!"  Hard cut at 6.4.
import { makeThree, R, box, bubble, label, shadow, sparkles, star, lerp, prog, ease, clamp, INK, BONE, GOLD, PINK, INTER } from '../../k3se01/threekit.js'

const SURE = [[640, 760, -0.1], [820, 640, 0.12], [600, 560, 0.05], [860, 830, -0.15], [700, 480, -0.05]]
function sure(x, cx, cy, rot, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  box(x, -110, -40, 220, 80, PINK, { b: 6 })
  x.font = `800 46px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('SURE!!', 0, 3)
  x.restore()
}

function scene(x, t, S) {
  const { phase, u, hero } = S
  R(x, '#211a3a', 0, 1150, 1080, 120); R(x, '#2e2650', 0, 1150, 1080, 10)
  shadow(x, 220, 1150, 220)
  const fair = phase === 'fix' && u > 2.6
  star(x, t, 'aries', { x: 220, y: 990, s: 230, mood: fair ? 'happy' : 'neutral', look: [1, -0.2], seed: 16, hops: fair ? [2.45 + 2.6] : null })
  if (phase === 'hook') {
    bubble(x, t, 300, 620, 0, 0, 'help me move saturday?', { size: 34, k: 1, tail: -0.4 })
    bubble(x, t, 330, 700, 0, 0, 'and sunday? and…', { size: 34, k: 1, tail: -0.5 })
    shadow(x, 700, 1150, 260)
    for (let g = 2; g >= 0; g--) { x.save(); x.globalAlpha = g ? 0.25 : 1; hero(x, t, { x: 700, y: 960 + (g ? (g % 2 ? -40 : 40) : 0) + 24 * Math.sin(t * 50), s: 280, mood: 'happy', look: [-1, 0] }); x.restore() }
    SURE.forEach(([sx, sy, r], i) => sure(x, sx, sy, r, i <= (t + 1) * 3 ? 1 : 0))
    return
  }
  SURE.forEach(([sx, sy, r], i) => sure(x, sx, sy, r, 1 - clamp(prog(u, 0.1 + i * 0.08, 0.25 + i * 0.08))))
  if (u > 0.1 && u < 0.8) sparkles(x, t, 720, 660, 2.45 + 0.15, 10, 220, 1, [PINK, BONE, GOLD])
  shadow(x, 700, 1150, 260)
  hero(x, t, { x: 700, y: 960, s: 280, mood: u < 0.6 ? 'wide' : 'neutral', look: [-1, 0], hops: [2.45 + 0.9, 2.45 + 1.4] })
  bubble(x, t, 660, 680, 2.45 + 0.9, 99, 'thank you, but I’ll pass this time.', { size: 34, tail: 0.2 })
  bubble(x, t, 300, 560, 2.45 + 2.6, 99, 'totally fair!', { size: 40, tail: -0.4, col: '#ffd6c9' })
  if (fair) sparkles(x, t, 450, 900, 2.45 + 2.6, 8, 200, 1)
}

const EP = makeThree({
  id: 'k3se19', sign: 'libra', dur: 6.4, brk: 'freeze', ending: 'cut', focus: [700, 760],
  hook: 'Said yes. | Meant *absolutely not.*', accent: '#ff9fc4',
  advice: "*'No, thank you'* | is a full sentence.",
  scene,
  cues: [
    ...[0.0, 0.1, 0.2, 0.3, 0.4].map((t, i) => ['pop', t, [880, 987.77, 1174.66, 1318.51, 1567.98][i], 0.03, i % 2 ? 0.3 : -0.3]),
    ...[2.55, 2.63, 2.71, 2.79, 2.87].map(t => ['pop', t, 1760, 0.025, 0.3]),
    ['tom', 3.35, 110, { gain: 0.12, decay: 0.2 }], ['pop', 3.36, 659.25, 0.035, 0.3],
    ['pop', 5.05, 1174.66, 0.04, -0.3], ['pop', 5.15, 1567.98, 0.04, -0.3], ['glitter', 5.05, 5.5],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
