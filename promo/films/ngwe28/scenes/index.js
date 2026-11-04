// ngwe28 · Your Star Guide: Winter · ♎ Libra, winter note 4 / 4: a word for the new year (20 s; story 0–15.6, then the end card)
//   0.00  "Libra, one word for the new year."  Libra floats at a fully frosted window, lantern up, breathing on the glass.
//   3.0   ♎ YOUR STAR: "your word for the new year: ask."  The lantern's warm tip writes A-S-K into the frost.
//   5.9   "ask for the table you want."   8.0  "ask for the time you need."  Libra wipes the rest of the frost away:
//         the night is clear behind the word, and the moon winks.
//  10.68  card flip · "Ask. Then let | them answer."  The word glows in the clear window. Pisces: happy fountains.
import { winterGuide, frostWindow, prog, ease, lerp, clamp, heartsUp, R, BONE } from '../../ngwe25/scenes/gwkit.js'

const WIN = { x: 540, y: 720, w: 600, h: 380 }
const T0 = { write: [3.3, 5.2], wipe: [8.6, 9.6], wink: 9.9 }
let PEN = { x: 300, y: 700 }

function pose(t) {
  const cell = 230 / 36, off = 18.2 * cell
  const rest = { x: 540, y: 1130, size: 290 }
  if (t < T0.write[0]) { const p = ease.inOutCubic(prog(t, 2.6, T0.write[0])); return { x: lerp(330, PEN.x - off, p), y: lerp(760, PEN.y + 28, p), size: 230, mood: 'squint', look: [1, -0.6], squash: t < 2.6 ? 0.06 * Math.sin(t * 6) : 0 } }
  if (t < T0.write[1] + 0.1) return { x: PEN.x - off, y: PEN.y + 28, size: 230, mood: 'squint', look: [1, 0] }
  if (t < T0.wipe[0]) { const p = ease.inOutCubic(prog(t, T0.write[1] + 0.1, T0.write[1] + 0.8)); return { x: lerp(PEN.x - off, rest.x, p), y: lerp(PEN.y + 28, rest.y, p), size: lerp(230, 290, p), mood: 'happy', look: [0, -1] } }
  if (t < T0.wipe[1] + 0.3) { const p = prog(t, ...T0.wipe); return { x: 300 + 480 * Math.abs(Math.sin(p * Math.PI * 1.5)), y: 760, size: 230, mood: 'squint', look: [1, -1], squash: 0.1 * Math.sin(t * 20) } }
  const p = ease.outBack(prog(t, T0.wipe[1] + 0.3, T0.wipe[1] + 0.9))
  return { x: lerp(540, 540, p), y: lerp(760, 1130, p), size: lerp(230, 290, p), mood: t > T0.wink ? 'sparkle' : 'happy', look: [0, -1] }
}

const F = winterGuide({
  sign: 'libra', note: 4, duration: 20,
  T: { l2: 5.9, l3: 8.0 },
  hook: '*Libra,* one word | for the new year.',
  lines: [
    { t: 3.0, text: 'your word for the new year: *ask.*' },
    { t: 5.9, text: 'ask for the table you *want.*' },
    { t: 8.0, text: 'ask for the time you *need.*' },
  ],
  fact: 'LIBRA BEGINS AT THE|SEPTEMBER EQUINOX', factAt: 6.0, factDur: 2.2,
  last: 'Ask. Then let | them *answer.*',
  guide: t => ({ ...pose(t), lanternSize: 70, lanternGlow: t > T0.write[0] && t < T0.write[1] ? 1.5 : 1 }),
  drawBack(x, t, K) {
    const o = K.outAll(t)
    x.save(); x.globalAlpha *= o
    const r = frostWindow(x, K, t, WIN.x, WIN.y, WIN.w, WIN.h, { word: 'ASK', write: prog(t, ...T0.write), wipe: prog(t, ...T0.wipe), glow: prog(t, T0.wipe[1], T0.wipe[1] + 0.6), wordSize: 190 })
    x.restore()
    if (t >= T0.write[0] && t <= T0.write[1] + 0.1) PEN = { x: r.penX, y: r.penY }
    else if (t < T0.write[0]) PEN = { x: WIN.x - 170, y: WIN.y + 20 }
    // breath fog on frame 0
    if (t < 2.4) { x.save(); x.globalAlpha *= 0.5 * (1 - prog(t, 1.6, 2.4)); for (let i = 0; i < 4; i++) { const ph = (t * 0.8 + i / 4) % 1; R(x, BONE, 430 + ph * 90, 640 - ph * 40 + i * 6, 22 - ph * 10, 16 - ph * 8) } x.restore() }
  },
  drawFront(x, t, K) {
    K.sparkles(t, 540, 720, T0.wipe[1] + 0.05, 10, 300, 1)
    // the moon winks: a tiny star sparkle by it
    K.sparkles(t, WIN.x + WIN.w * 0.3, WIN.y - WIN.h * 0.28, T0.wink, 6, 60, 2)
    heartsUp(x, t, 540, 960, 11.6, { n: 3, c: 6 })
  },
  cues: [
    ['whoosh', 0.4, 0.5, 0.02], ['whoosh', 1.4, 0.5, 0.02],
    ['glitter', T0.write[0], T0.write[0] + 0.5], ['pluck', T0.write[0] + 0.3, 1174.66, 0.035, 0.6, -0.3], ['pluck', 4.2, 1318.51, 0.035, 0.6, 0], ['pluck', 4.9, 1567.98, 0.035, 0.6, 0.3],
    ['whoosh', T0.wipe[0], 0.5, 0.04], ['whoosh', T0.wipe[0] + 0.5, 0.5, 0.04], ['glitter', T0.wipe[1], T0.wipe[1] + 0.6],
    ['bell', T0.wink, 1975.53, 0.03, 1.0, 0.3],
  ],
})

export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
