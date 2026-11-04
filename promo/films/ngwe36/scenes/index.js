// ngwe36 · Your Star Guide: Winter · ♐ Sagittarius, winter note 4 / 4: a word for the new year (20 s; story 0–15.6, then the end card)
//   0.00  "Sagittarius, next year's word is short."  Sag mid-sprint, skidding sideways across the ice, speed lines and all.
//   3.0   ♐ YOUR STAR: "your word for the new year: slow."  Sag zips past the frosted window and the lantern scrawls S-L-O-W.
//   5.9   "slow walks. slow mornings."   8.0  "slow 'i like you.'"  Sag finally stops skidding and sits down in the
//         snow (THUMP). The frost clears; the word lights up.
//  10.68  card flip · "Slow is a | direction too."  Sag sits still, eyes closed, happy. Pisces: happy fountains.
import { winterGuide, frostWindow, prog, ease, lerp, clamp, INK, R, SNOW, ICE, heartsUp } from '../../ngwe25/scenes/gwkit.js'

const WIN = { x: 540, y: 720, w: 600, h: 380 }
const T0 = { write: [3.3, 5.6], sit: 8.6, wipe: [9.0, 9.8] }
let PEN = { x: 330, y: 730 }

function pose(t) {
  const cell = 230 / 36, off = 18.2 * cell
  if (t < 2.9) { const ph = t * 1.4; const sx = 540 + 330 * Math.sin(ph * Math.PI); return { x: sx, y: 1150, size: 260, mood: 'wide', look: [Math.cos(ph * Math.PI) > 0 ? 1 : -1, 0], squash: -0.1, rot: 0 } }
  if (t < T0.write[0]) { const p = ease.inOutCubic(prog(t, 2.9, T0.write[0])); return { x: lerp(540 + 330 * Math.sin(2.9 * 1.4 * Math.PI), PEN.x - off, p), y: lerp(1150, PEN.y + 28, p), size: lerp(260, 230, p), mood: 'sparkle', look: [1, 0] } }
  if (t < T0.write[1] + 0.1) return { x: PEN.x - off, y: PEN.y + 28, size: 230, mood: 'sparkle', look: [1, 0], squash: 0.05 * Math.sin(t * 20) }
  if (t < T0.sit) { const p = prog(t, T0.write[1] + 0.1, T0.sit); const sx = lerp(PEN.x - off, 540, ease.inOutCubic(Math.min(1, p * 1.3))) + 200 * Math.sin(p * Math.PI * 2) * (1 - p); return { x: sx, y: lerp(PEN.y + 28, 1150, ease.inOutCubic(Math.min(1, p * 2))), size: lerp(230, 280, Math.min(1, p * 2)), mood: 'wide', look: [Math.cos(p * Math.PI * 2) > 0 ? 1 : -1, 0], squash: -0.08 } }
  const sq = t < T0.sit + 0.5 ? 0.22 * Math.exp(-(t - T0.sit) * 6) : 0
  return { x: 540, y: 1160, size: 280, mood: t < 10.68 ? 'happy' : 'sleepy', look: [0, -1], squash: sq, zzz: false }
}

const F = winterGuide({
  sign: 'sagittarius', note: 4, duration: 20,
  T: { l2: 5.9, l3: 8.0 },
  hook: "*Sagittarius,* next | year's word is short.", hookSize: 92,
  lines: [
    { t: 3.0, text: 'your word for the new year: *slow.*' },
    { t: 5.9, text: 'slow walks. slow *mornings.*' },
    { t: 8.0, text: "slow *'i like you.'*" },
  ],
  fact: 'SAGITTARIUS: MUTABLE FIRE', factAt: 6.2, factDur: 1.6,
  last: 'Slow is a | *direction* too.',
  tissues: false,
  pisces: (t, d) => ({ ...d, x: 985, s: 116 }),
  guide: t => ({ ...pose(t), lanternSize: 70 }),
  drawBack(x, t, K) {
    const o = K.outAll(t)
    x.save(); x.globalAlpha *= o
    const r = frostWindow(x, K, t, WIN.x, WIN.y, WIN.w, WIN.h, { word: 'SLOW', write: prog(t, ...T0.write), wipe: prog(t, ...T0.wipe), glow: prog(t, T0.wipe[1], T0.wipe[1] + 0.6), wordSize: 180 })
    x.restore()
    if (t >= T0.write[0] && t <= T0.write[1] + 0.1) PEN = { x: r.penX, y: r.penY }
    // ice patch + skid marks
    x.save(); x.globalAlpha *= o * 0.8
    R(x, ICE, 150, 1300, 780, 16); R(x, '#ffffff', 170, 1302, 200, 4)
    x.restore()
  },
  drawFront(x, t, K) {
    // speed lines while skidding
    const g = pose(t)
    if (t < T0.sit && !(t > T0.write[0] && t < T0.write[1])) {
      x.save(); x.globalAlpha *= 0.8
      const dir = g.look[0]
      for (let i = 0; i < 4; i++) R(x, '#ffffff', g.x - dir * (170 + i * 26) - 40, g.y - 90 + i * 50, 80 - i * 10, 8)
      x.restore()
    }
    K.burst(540, 1060, 80, t, T0.sit + 0.02, { word: 'THUMP', size: 34, color: '#bfe8ff' })
    heartsUp(x, t, 540, 960, 11.6, { n: 3, c: 6 })
  },
  cues: [
    ['whoosh', 0.1, 0.5, 0.04], ['whoosh', 0.8, 0.5, 0.04], ['whoosh', 1.5, 0.5, 0.04], ['whoosh', 2.2, 0.5, 0.04],
    ['glitter', T0.write[0], T0.write[0] + 0.4], ['pluck', 3.5, 1174.66, 0.03, 0.6, -0.3], ['pluck', 4.1, 1318.51, 0.03, 0.6, -0.1], ['pluck', 4.7, 1567.98, 0.03, 0.6, 0.1], ['pluck', 5.3, 1760, 0.03, 0.6, 0.3],
    ['whoosh', 6.3, 0.5, 0.03], ['whoosh', 7.2, 0.5, 0.03],
    ['boom', T0.sit, 0.2], ['tick', T0.sit, 0.08], ['glitter', T0.wipe[1], T0.wipe[1] + 0.6],
  ],
})

export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
