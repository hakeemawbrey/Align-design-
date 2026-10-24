// photos (15s, LOOK A "Film 1"). Hook: "Photos lie." → answer: chart first, "Charts don't." → end: "Fall for the chart."
//   0.00–3.30  p2 hook: one profile photo glitches through angle / filter / 2019 / beauty sliders; "Photos lie." on by 0.55
//   2.80–3.40  the face blurs into its aura; Juniper's blind card (aura veil) lands in the same footprint
//   3.40–5.50  "Charts don't." · 5.78–6.18 Sun — Libra / Moon — Gemini / Rising — Aquarius
//   7.00–10.15 "The face comes after." · 8.40–9.10 the veil lifts on her real face · full moon 9.0
//   10.35–11.50 "Fall for the chart." typed · lockup 12.22–13.37 · fade 14.50–14.85 · black 14.85→
import sky from './p1-sky.js'
import photos from './p2-photos.js'
import chart from './p3-chart.js'
import end from './p4-end.js'
import top from './p5-top.js'

export const DURATION = 15
export const SCENES = [sky, photos, chart, end, top]

const CHAKRA = [293.66, 369.99, 440, 554.37, 587.33, 739.99, 880]
const MOON_ROW = [261.63, 293.66, 329.63, 392, 440, 523.25, 587.33, 659.25, 783.99]
export const CUES = [
  // hook: a hard tick on every new "photo", glitch clicks while they flicker, the break
  ['tick', 0.0, 0.5], ['tick', 0.06, 0.25], ['tick', 0.22, 0.3],
  ['tick', 0.45, 0.32], ['tick', 0.9, 0.32], ['tick', 1.35, 0.32],
  ...[1.42, 1.5, 1.58, 1.66].map((t) => ['tick', t, 0.18]),
  ['tick', 2.05, 0.32],
  ...Array.from({ length: 9 }, (_, i) => ['tick', 2.1 + i * 0.055, 0.22 + i * 0.02]),
  ['whoosh', 2.55, 0.45, 0.12], ['boom', 2.8, 0.22],
  // the blind card lands, "Charts don't."
  ['bell', 2.98, 587.33, 0.06, 2.4, 0], ['bell', 3.42, 739.99, 0.04, 1.6, 0.1], ['bell', 3.58, 880, 0.035, 1.6, -0.1],
  ['whoosh', 5.4, 0.6, 0.06],
  // the big three
  ['bell', 5.78, 440, 0.045, 1.2, -0.2], ['bell', 5.98, 554.37, 0.045, 1.2, 0], ['bell', 6.18, 659.25, 0.045, 1.2, 0.2],
  ['tick', 7.0, 0.15],
  // the face comes after
  ['riser', 7.8, 8.45, 0.07],
  ...[261.63, 293.66, 329.63, 392, 440, 523.25, 587.33].map((f, i) => ['bell', 8.4 + i * 0.1, f, 0.035, 0.9, (i - 3) * 0.12]),
  ['glitter', 8.95, 9.7], ['bell', 9.02, 783.99, 0.05, 2.2, 0],
  // the end line + lockup
  ['whoosh', 10.2, 0.6, 0.07],
  ...Array.from({ length: 19 }, (_, i) => ['tick', 10.35 + i * 0.05, 0.07]),
  ['whoosh', 12.3, 0.5, 0.08],
  ...CHAKRA.map((f, i) => ['bell', 12.48 + i * 0.065, f, 0.06, 2.2, (i - 3) * 0.12]),
  ...MOON_ROW.map((f, i) => ['bell', 13.05 + i * 0.04, f, 0.02, 1.2, (i - 4) * 0.1]),
]
