// nffe14: FRIENDS FIRST ep 14, "The hard date on the calendar" (18 s vertical, star_advice, music: lofi · Cm).
// Story 0–15.6, then the short shared end card (2.4 s). Look: ../../nffe01/scenes/friendskit.js.
//   0.0–5.0    "Some days are | *heavy* every year."  Taurus at the kitchen calendar, mid-hop, circling one date in red,
//              a little sticky note: "CAP ♡". Thought: "this week was so hard for Cap last year."  Pisces sniffles.
//   5.0        hard cut.  THE STARS: "remembering is a *gift*. say you remember."
//   9.8        Capricorn on the couch. CHECK-IN: "thinking of you today. *here if you want.*"  Capricorn reads it twice
//              and holds the phone to their heart; a happy tear; hearts.
//   12.4       Last line: "You *remembered.*"
import { makeFriends, stars, thought, box, R, INK, BONE, label, phoneSmall, hearts, sparkles, ease, prog, lerp } from '../../nffe01/scenes/friendskit.js'

const TAU = 'taurus', CAP = 'capricorn'
function calendar(x, t) {
  box(x, 130, 560, 330, 380, BONE, { b: 7 }); R(x, '#c0577a', 130, 560, 330, 56)
  label(x, 'DECEMBER', 295, 590, { size: 28, col: BONE })
  for (let r = 0; r < 5; r++) for (let c = 0; c < 7; c++) R(x, 'rgba(27,18,54,0.25)', 150 + c * 44, 636 + r * 58, 30, 36)
  // the circled day (row 2, col 4)
  const cx = 150 + 4 * 44 + 15, cy = 636 + 2 * 58 + 18, p = ease.inOutQuad(prog(t, 0.6, 1.6))
  if (t > 0.6 || t < 0) { x.save(); x.strokeStyle = '#e8344e'; x.lineWidth = 7; x.beginPath(); x.arc(cx, cy, 30, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2.1 * p); x.stroke(); x.restore() }
  if (t > 1.6) { box(x, 340, 880, 130, 70, '#ffe2a0', { b: 5 }); label(x, 'CAP ♡', 405, 916, { size: 26, col: INK }) }
  return [cx, cy]
}
const EP = makeFriends({
  id: 'nffe14', dur: 20, cut: 5.0,
  hook: { text: 'Some days are | *heavy* every year.', out: 3.0, color: '#e9d9a8' },
  lines: [stars(5.4, 'remembering is a *gift*. say you remember.')],
  boxes: [{ from: 0, to: 1, close: 9.6 }],
  check: { at: 9.9, out: [12.1, 12.3], text: 'thinking of you today. | *here if you want.*', accent: '#7a5a2a' },
  last: { at: 12.4, text: 'You *remembered.*', color: '#e9d9a8' },
  shots: [
    { at: 0, set: 'kitchen', setOpts: { lights: false }, pis: { x: 950, y: 970, s: 110, tears: 1, mood: 'wide', look: [-1, 0], tissues: false },
      draw(x, t, S) {
        const [cx, cy] = calendar(x, t)
        const p = ease.inOutQuad(prog(t, 0.6, 1.6))
        S.star(x, t, TAU, { x: 560, y: 980, s: 280, mood: t < 1.8 ? 'squint' : 'neutral', look: [-1, -0.6], hops: [-0.12, 1.7] })
        if (t < 1.8) { x.save(); x.translate(cx + 30 * Math.cos(-Math.PI / 2 + Math.PI * 2.1 * p) + 8, cy + 30 * Math.sin(-Math.PI / 2 + Math.PI * 2.1 * p)); x.rotate(0.5); box(x, -7, -60, 14, 64, '#e8344e', { b: 4 }); x.restore() }
        thought(x, t, 660, 700, 2.0, 4.85, 'this week was so hard for Cap last year.', { size: 32, maxW: 380, fromX: 600, fromY: 860 })
      } },
    { at: 5.0, set: 'sky', dim: 0.75, pis: { x: 880, y: 1240, s: 130, tears: 2 },
      draw(x, t, S) {
        S.star(x, t, 'stars', { x: 540, y: 860, s: 360, mood: t > 7.1 ? 'happy' : 'neutral', look: [0, 0.2], hops: [5.05, ...S.STARS_HOPS], seed: 2, glow: 1.1 })
        S.star(x, t, TAU, { x: 220, y: 1250, s: 160, mood: t < 7.0 ? 'neutral' : 'sparkle', look: [1, -1], hops: [7.1] })
      } },
    { at: 9.8, set: 'room', pis: { x: 950, y: 1260, s: 110, tears: 3, mood: 'happy' },
      draw(x, t, S) {
        const hold = ease.inOutCubic(prog(t, 11.6, 12.1))
        S.star(x, t, CAP, { x: 540, y: 1000, s: 290, mood: t < 11.0 ? 'neutral' : t < 11.6 ? 'wide' : 'happy', look: [0, 1 - hold], hops: [11.0, 11.6], tears: t > 12.0 ? 1 : 0 })
        phoneSmall(x, t, lerp(650, 560, hold), lerp(1080, 1095, hold), { s: 0.8, rot: lerp(-0.3, 0, hold), glowA: 1, buzz: t > 10.0 && t < 10.3 ? 1 : 0 })
        hearts(x, t, 12.1, 540, 880, { n: 7 }); sparkles(x, t, 560, 1040, 12.1, 10, 110, 1)
      } },
  ],
  cues: [
    ['riser', 0.6, 1.6, 0.012], ['tick', 1.6, 0.04], ['pop', 1.7, 880, 0.035, -0.3], ['pop', 2.0, 659.25, 0.03, 0.2],
    ['pop', 10.0, 1567.98, 0.04, 0], ['pluck', 11.0, 880, 0.03, 0.5, 0], ['pluck', 12.1, 1174.66, 0.035, 0.6, 0], ['glitter', 12.1, 12.5],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const WARN = EP.warn
