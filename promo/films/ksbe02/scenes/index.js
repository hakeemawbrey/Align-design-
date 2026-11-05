// ksbe02: SAY IT BETTER ep 2, "I don't care" (♉ Taurus says it to ♋ Cancer). lofi · F. Hard cut.
//   frame 0: Taurus turning away on the couch, an icy "I DON'T CARE." bubble mid-slam, frost creeping in from the edges,
//   Cancer flinching back. Freeze "tired ≠ *cold.*" → the pen → THE STARS → "I do care. I'm just *wiped*…"
//   → the next morning: sun in, two mugs, both talking. Pisces sobs behind the couch.
import { makeShort } from '../../ksbe01/scenes/sbshort.js'
import { rect, INK, BONE } from '../../ksbe01/scenes/sbkit.js'
import { clamp, prog, ease } from '../../../src/lib.js'
const MORNING = 15.7
function mug(x, X, Y, c, t) {
  rect(x, X - 26, Y - 50, 52, 54, INK); rect(x, X - 20, Y - 44, 40, 42, c); rect(x, X + 20, Y - 36, 16, 22, INK); rect(x, X + 20, Y - 30, 10, 10, c)
  for (let i = 0; i < 2; i++) { const ph = (t * 0.8 + i * 0.5) % 1; x.globalAlpha = (1 - ph) * 0.6; rect(x, X - 8 + i * 12 + Math.sin(t * 3 + i) * 4, Y - 70 - ph * 60, 8, 18, '#ffffff'); x.globalAlpha = 1 }
}
export const { DURATION, SCENES, CUES } = makeShort({
  ep: 2, room: 'living', roomOpts: w => ({ warm: w > MORNING ? 1 : 0.5 }),
  A: { sign: 'taurus', red: 0.25, mood0: 'squint' }, B: { sign: 'cancer' }, P: { x: 985, y: 1165, s: 150, look: [-1, 0] },
  hook: '“I don’t care” | (cares a *lot*)', caption: 'tired ≠ *cold.*',
  caught: { x: 264, y: 1170, r: 150 },
  bad: { text: 'I *don’t* care.' }, react: '…oh. *okay.*',
  stars: ['you’re *tired*, not cold.', 'so say *tired.*'],
  better: 'I do care. I’m just *wiped*. Can we talk in the morning?',
  replies: ['of course. *sleep.*', 'good morning. *talk now?*'],
  last: 'Tired is honest. | *Cold* isn’t.',
  keys: { A: [[0, { look: [-1, 0] }], [12.0, { mood: 'sleepy' }], [MORNING, { mood: 'happy', look: [1, 0] }]] },
  draw(x, w) {
    if (w > MORNING) { // morning sun through the window + two mugs on a little table
      const k = ease.outCubic(prog(w, MORNING, MORNING + 0.6))
      x.save(); x.globalAlpha = 0.45 * k; const g = x.createLinearGradient(640, 430, 300, 1300); g.addColorStop(0, '#fff1b0'); g.addColorStop(1, 'rgba(255,241,176,0)'); x.fillStyle = g; x.fillRect(0, 300, 1080, 1100); x.restore()
      x.save(); x.globalAlpha = k; rect(x, 420, 1170, 240, 20, INK); rect(x, 426, 1174, 228, 10, '#c9894a'); mug(x, 480, 1170, '#ff8fb1', w); mug(x, 600, 1170, BONE, w); x.restore()
    }
  },
  overlay(x, t, w) {
    const k = 1 - clamp(prog(w, 3.2, 4.6))   // frost on the edges while the cold line hangs there
    if (k <= 0) return
    x.save(); x.globalAlpha = 0.55 * k
    const g = x.createRadialGradient(540, 960, 520, 540, 960, 1150); g.addColorStop(0, 'rgba(200,235,255,0)'); g.addColorStop(1, 'rgba(200,235,255,0.95)')
    x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
    for (let i = 0; i < 40; i++) { const a = i * 2.39, r = 900 + (i * 37) % 200; rect(x, 540 + Math.cos(a) * r * 0.75, 960 + Math.sin(a) * r, 10, 10, '#ffffff') }
    x.restore()
  },
  cues: [['bell', 0.2, 2093, 0.02, 1.4, -0.3], ['bell', 0.35, 2637, 0.015, 1.2, 0.3], ['glitter', MORNING, MORNING + 0.5]],
})
