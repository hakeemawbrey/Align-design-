// kpre11 — PISCES REACTS: "The umbrella tilt" (10 s vertical trial reel, star_advice; jazzy · Eb). LOOPS.
// Kit: ../../kpre07/scenes/prkit.js (read-only) on top of hookkit.js. No end card, no card cut.
//   0.0  frame 0: two people under one umbrella in the rain, the umbrella mid-tilt, Pisces mid-sob.
//        Hook "Watch their umbrella. Watch it." · whip zoom
//   1.0  "caught" circle on the tilt · 2.4 one shoulder dry, the other soaked (SOAKED tag) · 3.6 the soaked one smiles
//   Pisces sobs, its tears joining the rain · 5.6 "Soaked shoulder. Dry date. Pure love." · 9.6–10 eases back to frame 0.
import { buildReact, sobCues, bits, PAL, INK, BONE, GOLD, CYAN } from '../../kpre07/scenes/prkit.js'
import { caught, caughtCues } from '../../hookkit.js'

const CAUGHT = { at: 1.0, x: 540, y: 560, r: 190, ry: 130, out: [2.9, 3.1], label: 'THE TILT', arrow: 'br', rec: false }
function rain(x, t, x0, y0, w, h, n = 60, a = 0.7) {
  x.save(); x.globalAlpha = a; x.fillStyle = '#9fd8ff'
  for (let i = 0; i < n; i++) { const px = x0 + ((i * 97.3) % w), py = y0 + ((t * 900 + i * 131) % h); x.fillRect(px - (py - y0) * 0.08, py, 4, 22) }
  x.restore()
}
const R = buildReact({
  id: 'kpre11', duration: 10, ending: 'loop',
  hook: 'Watch their umbrella. | *Watch it.*',
  playing: 'rainy tuesday · 6:10 PM',
  clip(x, t, H) {
    const W = H.WIN
    x.fillStyle = '#2a3550'; x.fillRect(W.x, W.y, W.w, W.h)
    x.fillStyle = '#1b2440'; for (let i = 0; i < 5; i++) x.fillRect(W.x + i * 200, W.y + 60, 150, 300)
    x.fillStyle = '#ffe7a8'; for (let i = 0; i < 5; i++) for (let j = 0; j < 3; j++) x.fillRect(W.x + 30 + i * 200 + (j % 2) * 60, W.y + 100 + j * 80, 30, 40)
    x.fillStyle = '#3a4566'; x.fillRect(W.x, W.y + 470, W.w, 130)
    rain(x, t, W.x, W.y, W.w, W.h, 70, 0.6)
    const cx = W.x + W.w / 2, tilt = 0.28 + 0.03 * Math.sin(t * 2)
    // two walkers (bob as they walk)
    const bob = Math.abs(Math.sin(t * 5)) * 8
    H.person(cx - 100, W.y + 420 - bob, 19, { col: '#e8a87c', shirt: '#e163d6' })
    H.person(cx + 100, W.y + 420 - Math.abs(Math.sin(t * 5 + 1)) * 8, 19, { col: '#8a5a3a', shirt: '#3fb88a' })
    // the umbrella, tilted over the left one
    x.save(); x.translate(cx - 20, W.y + 260); x.rotate(-tilt)
    x.fillStyle = INK; x.fillRect(-6, -10, 12, 170)
    x.fillStyle = INK; x.beginPath(); x.ellipse(0, -10, 220, 110, 0, Math.PI, 0); x.fill()
    x.fillStyle = '#e8566e'; x.beginPath(); x.ellipse(0, -10, 210, 100, 0, Math.PI, 0); x.fill()
    x.fillStyle = '#ff8fa0'; for (let i = -2; i <= 2; i += 2) { x.beginPath(); x.ellipse(i * 70, -10, 35, 98, 0, Math.PI, 0); x.fill() }
    x.restore()
    // the soaked shoulder: drops bouncing off the right walker
    for (let i = 0; i < 6; i++) { const p = ((t * 2.2 + i / 6) % 1); x.fillStyle = '#cfefff'; x.fillRect(cx + 80 + i * 12, W.y + 260 - p * 40, 7, 7) }
    if (t > 2.4) H.label('SOAKED', cx + 230, W.y + 300, { size: 36, font: "'Space Mono', monospace", weight: 700, col: CYAN, k: H.pop(t, 2.4) * (t > 9.5 ? 0 : 1) })
    if (t > 2.6) H.label('DRY ✓', cx - 250, W.y + 300, { size: 36, font: "'Space Mono', monospace", weight: 700, col: '#7dffb0', k: H.pop(t, 2.6) * (t > 9.5 ? 0 : 1) })
    if (t > 3.6 && t < 9.5) H.pix('heart', cx + 100, W.y + 200 - ((t - 3.6) * 20 % 40), 6)
  },
  react(x, t, H) { rain(x, t, 0, 960, 1080, 960, 40, 0.25) },
  tears: t => (t < 1.0 ? 2 : 3),
  meter: t => (t < 1.0 ? 0.6 : Math.min(1, 0.6 + (t - 1.0) * 0.5) - (t > 9.6 ? (t - 9.6) : 0)),
  mood: t => (t > 3.6 && t < 9.6 ? 'sparkle' : 'wide'),
  last: { at: 5.6, text: 'Soaked shoulder. Dry date. Pure love.' },
  extra: [caught(CAUGHT)],
  cues: [...caughtCues(CAUGHT), ['pop', 2.4, 659.25, 0.04, 0.3], ['pop', 2.6, 987.77, 0.04, -0.3], ['bell', 3.6, 1760, 0.03, 1, 0], ...sobCues(1.4, 3), ...sobCues(3.8, 3), ...sobCues(7.0, 2, 0.025)],
})
export const { DURATION, SCENES, CUES } = R
