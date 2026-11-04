// nffe23: FRIENDS FIRST ep 23, "After the holidays" (18 s vertical, star_advice, music: synthwave · Am).
// Story 0–15.6, then the short shared end card (2.4 s). Look: ../../nffe01/scenes/friendskit.js.
//   0.0–5.0    "The holidays are over. | *Check in anyway.*"  Taurus alone in a quiet room, mid-hop, winding up a string
//              of fairy lights into a DECOR box; the bulbs blink out one by one. Pisces sniffles on the couch arm.
//   5.0        hard cut.  THE STARS: "the quiet days after are hard *too*."
//   9.8        CHECK-IN: "how are you doing *now that it's quiet?*"  Taurus's phone buzzes: "so glad you asked."  Hearts.
//   12.4       Last line: "Check in *after*, too."
import { makeFriends, stars, bubble, box, R, INK, label, glow, phoneSmall, hearts, sparkles, clamp, prog } from '../../nffe01/scenes/friendskit.js'

const TAU = 'taurus'
const BULBS = ['#f2c75c', '#ff8fb1', '#7fd0ff', '#9fe6b0', '#ffb37a']
function lightString(x, t, cx, cy, off) {
  // a loose coil of lights in Taurus's hands; `off` bulbs (0…8) are dark
  for (let i = 0; i < 8; i++) {
    const a = i / 8 * Math.PI * 2 + t * 0.4, px = cx + Math.cos(a) * 130, py = cy + Math.sin(a) * 44
    const on = i >= off
    if (on) glow(x, px, py, 50, 0.9)
    R(x, INK, px - 14, py - 14, 28, 34); R(x, on ? BULBS[i % 5] : '#4a4466', px - 9, py - 9, 18, 24)
  }
}
function decorBox(x) { box(x, 700, 1060, 220, 110, '#b88a5a', { b: 6 }); R(x, '#c99a4a', 800, 1060, 20, 110); label(x, 'DECOR', 810, 1120, { size: 26, col: INK }) }
const EP = makeFriends({
  id: 'nffe23', dur: 20, cut: 5.0,
  hook: { text: 'The holidays are over. | *Check in anyway.*', out: 3.0, color: '#ff9fe0', size: 74, accentSize: 106 },
  lines: [stars(5.4, 'the quiet days after are hard *too*.')],
  boxes: [{ from: 0, to: 1, close: 9.6 }],
  check: { at: 9.9, out: [12.1, 12.3], text: 'how are you doing | *now that it’s quiet?*', accent: '#8a3aa0' },
  last: { at: 12.4, text: 'Check in *after*, too.', color: '#ff9fe0' },
  shots: [
    { at: 0, set: 'room', setOpts: { lights: false, warm: 0.4 }, dim: 0.45, pis: { x: 880, y: 960, s: 100, tears: 1, mood: 'wide', look: [-1, 0], tissues: false },
      draw(x, t, S) {
        decorBox(x)
        S.star(x, t, TAU, { x: 420, y: 1000, s: 270, mood: 'neutral', look: [0.5, 1], hops: [-0.12, 1.6, 3.2] })
        lightString(x, t, 420, 1100, Math.floor(clamp(prog(t, 0.5, 4.5)) * 8))
      } },
    { at: 5.0, set: 'sky', dim: 0.75, pis: { x: 880, y: 1240, s: 130, tears: 2 },
      draw(x, t, S) {
        S.star(x, t, 'stars', { x: 540, y: 860, s: 360, mood: t > 6.9 ? 'happy' : 'neutral', look: [0, 0.2], hops: [5.05, ...S.STARS_HOPS], seed: 2, glow: 1.1 })
        S.star(x, t, TAU, { x: 220, y: 1250, s: 160, mood: t < 6.8 ? 'neutral' : 'sparkle', look: [1, -1], hops: [6.9] })
      } },
    { at: 9.8, set: 'room', setOpts: { lights: false, warm: 0.6 }, dim: 0.5, pis: { x: 880, y: 960, s: 100, tears: 3, mood: 'happy', tissues: false },
      draw(x, t, S) {
        decorBox(x)
        S.star(x, t, TAU, { x: 420, y: 1000, s: 270, mood: t < 10.9 ? 'neutral' : 'happy', look: [0.5, 0.6], hops: [10.9, 11.5] })
        phoneSmall(x, t, 540, 1080, { s: 0.75, rot: 0.25, buzz: t > 10.0 && t < 10.3 ? 1 : 0, glowA: 1.2 })
        bubble(x, t, 440, 760, 10.95, 12.3, 'so glad you asked.', { size: 36, col: '#b8f0c0' })
        hearts(x, t, 11.4, 420, 860, { n: 6 }); sparkles(x, t, 540, 1060, 10.0, 8, 90, 1)
      } },
  ],
  cues: [
    ...Array.from({ length: 8 }, (_, i) => ['pluck', 0.5 + (i + 1) * 0.5, [1318.51, 1174.66, 987.77, 880, 739.99, 659.25, 587.33, 493.88][i], 0.018, 0.3, 0.2]),
    ['pop', 10.0, 1567.98, 0.04, 0], ['pop', 10.95, 880, 0.035, -0.2], ['pluck', 11.4, 1174.66, 0.035, 0.5, 0],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const WARN = EP.warn
