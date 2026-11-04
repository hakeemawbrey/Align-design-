// ngwe48 · Your Star Guide: Winter · ♓ Pisces, winter note 4 / 4: a word for the new year (20 s; story 0–15.6, then the end card)
//   0.00  "Pisces, one last word for you."  Pisces drifting high on a little dream cloud beside a frosted window, eyes shut.
//   3.0   ♓ YOUR STAR: "your word for the new year: ground."  A beam from the lantern writes G-R-O-U-N-D in the frost.
//   6.2   "feet in the snow. heart still dreaming."  The cloud thins; Pisces drifts down and lands softly in the snow
//         (two little footprints). The window clears; the word lights up.
//  10.68  "Dream with | your feet down."  Pisces on the ground, still starry-eyed, happy tears.
import { winterGuide, frostWindow, prog, ease, lerp, clamp, INK, R, SNOW_SH, heartsUp } from '../../ngwe25/scenes/gwkit.js'

const WIN = { x: 480, y: 720, w: 600, h: 380 }
const T0 = { write: [3.3, 5.6], drift: [6.6, 8.2], wipe: [9.0, 9.8] }
let PEN = { x: 330, y: 730 }, LAMP = { x: 700, y: 1100 }

function pose(t) {
  const p = ease.inOutCubic(prog(t, ...T0.drift))
  const fl = (1 - p) * 18 * Math.sin(t * 1.6)
  return { x: lerp(880, 560, p), y: lerp(1000, 1160, p) + fl, size: lerp(210, 270, p) }
}

const F = winterGuide({
  sign: 'pisces', note: 4, duration: 20,
  T: { l2: 6.2 },
  hook: '*Pisces,* one last | word for you.',
  lines: [
    { t: 3.0, text: 'your word for the new year: *ground.*' },
    { t: 6.2, text: 'feet in the snow. heart still *dreaming.*' },
  ],
  fact: 'PISCES IS A WATER SIGN', factAt: 8.6, factDur: 1.8,
  last: 'Dream with | your *feet* down.',
  pisces: null,
  guide(t) {
    const P = pose(t)
    const landed = t > T0.drift[1]
    const tears = t < T0.drift[1] ? 1 : t < 10.68 ? 2 : 3
    return { ...P, mood: t < T0.write[0] ? 'sleepy' : !landed ? 'heart' : t < 10.68 ? 'sparkle' : 'happy', look: [-1, -0.4], zzz: false, tears, lanternSize: 64, side: -1,
      squash: landed && t < T0.drift[1] + 0.5 ? 0.18 * Math.exp(-(t - T0.drift[1]) * 6) : 0, lanternGlow: t > T0.write[0] && t < T0.write[1] ? 1.5 : 1, hops: [11.0, 11.6] }
  },
  drawBack(x, t, K) {
    const o = K.outAll(t)
    x.save(); x.globalAlpha *= o
    const r = frostWindow(x, K, t, WIN.x, WIN.y, WIN.w, WIN.h, { word: 'GROUND', write: prog(t, ...T0.write), wipe: prog(t, ...T0.wipe), glow: prog(t, T0.wipe[1], T0.wipe[1] + 0.6), wordSize: 140 })
    x.restore()
    PEN = { x: r.penX, y: r.penY }
  },
  drawMid(x, t, K) {
    const o = K.outAll(t)
    // the dream cloud under Pisces (thins as it drifts down)
    const P = pose(t), ck = 1 - clamp(prog(t, T0.drift[0], T0.drift[1] - 0.3))
    if (ck > 0.01) {
      x.save(); x.globalAlpha *= ck * o * 0.95
      for (const [a, b, rr] of [[-80, 0, 50], [0, -14, 62], [80, 0, 50], [-40, 20, 46], [40, 20, 46]]) { x.fillStyle = '#e8e2ff'; x.beginPath(); x.arc(P.x + a, P.y + 100 + b, rr, 0, Math.PI * 2); x.fill() }
      x.restore()
    }
    // the footprints after landing
    const fk = clamp(prog(t, T0.drift[1] + 0.2, T0.drift[1] + 0.5)) * o
    if (fk > 0) { x.save(); x.globalAlpha *= fk; for (const dx of [-40, 40]) { x.fillStyle = SNOW_SH; x.beginPath(); x.ellipse(560 + dx, 1312, 26, 10, 0, 0, Math.PI * 2); x.fill() } x.restore() }
  },
  drawFront(x, t, K, r) {
    if (r) LAMP = { x: r.lx, y: r.ly }
    if (t > T0.write[0] && t < T0.write[1]) {
      x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha *= 0.55 * Math.sin(Math.PI * prog(t, ...T0.write))
      const g = x.createLinearGradient(LAMP.x, LAMP.y, PEN.x, PEN.y); g.addColorStop(0, 'rgba(255,214,120,0.9)'); g.addColorStop(1, 'rgba(255,214,120,0.2)')
      x.strokeStyle = g; x.lineWidth = 14; x.beginPath(); x.moveTo(LAMP.x, LAMP.y); x.lineTo(PEN.x, PEN.y); x.stroke(); x.restore()
      K.sparkles(t, PEN.x, PEN.y, Math.floor(t * 4) / 4, 4, 30, Math.floor(t * 4))
    }
    K.burst(700, 1100, 60, t, T0.drift[1], { word: 'pof', size: 28, color: '#e8e2ff' })
    heartsUp(x, t, 560, 960, 11.6, { n: 3, c: 6 })
  },
  cues: [
    ['glitter', 0.1, 0.8], ['pluck', 1.4, 1318.51, 0.02, 0.8, 0.3],
    ['glitter', T0.write[0], T0.write[0] + 0.5], ...[0, 1, 2, 3, 4, 5].map(i => ['pluck', 3.5 + i * 0.36, [1174.66, 1318.51, 1479.98, 1567.98, 1760, 1975.53][i], 0.028, 0.6, (i - 2.5) * 0.12]),
    ['whoosh', T0.drift[0], 1.4, 0.03], ['boom', T0.drift[1], 0.08], ['tick', T0.drift[1] + 0.25, 0.04], ['tick', T0.drift[1] + 0.45, 0.04],
    ['glitter', T0.wipe[1], T0.wipe[1] + 0.6],
  ],
})

export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
