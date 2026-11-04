// ngwe44 · Your Star Guide: Winter · ♒ Aquarius, winter note 4 / 4: a word for the new year (20 s; story 0–15.6, then the end card)
//   0.00  "Aquarius, try this word on."  Aquarius, cool as ever, wrapped in a frosty shell, eyes half-shut.
//   3.0   ♒ YOUR STAR: "your word for the new year: warm."  A beam from the lantern writes W-A-R-M in the frost.
//   6.2   "you're cool. you can be warm too."  The frosty shell cracks away in sparkles; a striped scarf drops round
//         Aquarius' neck. The window clears; the word lights up.
//  10.68  card flip · "Cool mind, | warm heart."  Aquarius in its scarf, cheeks pink. Pisces: happy fountains.
import { winterGuide, frostWindow, prog, ease, lerp, clamp, INK, R, box, heartsUp } from '../../ngwe25/scenes/gwkit.js'

const WIN = { x: 540, y: 720, w: 600, h: 380 }
const T0 = { write: [3.3, 5.4], shell: 7.4, scarf: [7.9, 8.4], wipe: [9.0, 9.8] }
let PEN = { x: 330, y: 730 }, LAMP = { x: 700, y: 1100 }
const BLUE = '#38c4ec'

const F = winterGuide({
  sign: 'aquarius', note: 4, duration: 20,
  T: { l2: 6.2 },
  hook: '*Aquarius,* try | this word on.',
  lines: [
    { t: 3.0, text: 'your word for the new year: *warm.*' },
    { t: 6.2, text: "you're cool. you can be *warm* too." },
  ],
  fact: "AQUARIUS' SYMBOL:|THE WATER BEARER", factAt: 8.6, factDur: 1.8,
  last: 'Cool mind, | *warm* heart.', lastLate: 1,
  guide(t) {
    const cold = t < T0.shell
    const mood = cold ? 'sleepy' : t < T0.scarf[1] ? 'wide' : t < 10.68 ? 'sparkle' : 'happy'
    return { x: 560, y: 1160, size: 270, mood, look: [0, -1], zzz: false, blush: t > T0.scarf[1] ? 0.9 : 0, bob: cold ? 0 : undefined, lanternSize: 70,
      squash: t > T0.shell && t < T0.shell + 0.5 ? 0.14 * Math.exp(-(t - T0.shell) * 6) : 0, lanternGlow: t > T0.write[0] && t < T0.write[1] ? 1.5 : 1 }
  },
  drawBack(x, t, K) {
    const o = K.outAll(t)
    x.save(); x.globalAlpha *= o
    const r = frostWindow(x, K, t, WIN.x, WIN.y, WIN.w, WIN.h, { word: 'WARM', write: prog(t, ...T0.write), wipe: prog(t, ...T0.wipe), glow: prog(t, T0.wipe[1], T0.wipe[1] + 0.6), wordSize: 170 })
    x.restore()
    PEN = { x: r.penX, y: r.penY }
  },
  drawFront(x, t, K, r) {
    const o = K.outAll(t)
    if (r) LAMP = { x: r.lx, y: r.ly }
    if (t > T0.write[0] && t < T0.write[1]) {
      x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha *= 0.55 * Math.sin(Math.PI * prog(t, ...T0.write))
      const g = x.createLinearGradient(LAMP.x, LAMP.y, PEN.x, PEN.y); g.addColorStop(0, 'rgba(255,214,120,0.9)'); g.addColorStop(1, 'rgba(255,214,120,0.2)')
      x.strokeStyle = g; x.lineWidth = 14; x.beginPath(); x.moveTo(LAMP.x, LAMP.y); x.lineTo(PEN.x, PEN.y); x.stroke(); x.restore()
      K.sparkles(t, PEN.x, PEN.y, Math.floor(t * 4) / 4, 4, 30, Math.floor(t * 4))
    }
    // the frosty shell (a pale icy halo with crystals), cracking away
    const sh = 1 - clamp(prog(t, T0.shell, T0.shell + 0.4))
    if (sh > 0.01 && r) {
      x.save(); x.globalAlpha *= sh * o
      x.strokeStyle = 'rgba(214,240,255,0.9)'; x.lineWidth = 8; x.setLineDash([18, 10]); x.beginPath(); x.arc(r.x, r.y + 10, 170, 0, Math.PI * 2); x.stroke(); x.setLineDash([])
      x.fillStyle = 'rgba(191,232,255,0.18)'; x.beginPath(); x.arc(r.x, r.y + 10, 170, 0, Math.PI * 2); x.fill()
      for (let i = 0; i < 10; i++) { const a = i * 0.63 + t * 0.2, cx = r.x + Math.cos(a) * 170, cy = r.y + 10 + Math.sin(a) * 170; R(x, '#ffffff', cx - 3, cy - 10, 6, 20); R(x, '#ffffff', cx - 10, cy - 3, 20, 6) }
      x.restore()
    }
    K.sparkles(t, 560, 1160, T0.shell, 14, 220, 2, ['#bfe8ff', '#ffffff', '#8fe3ff'])
    // the scarf drops round its neck
    if (t > T0.scarf[0] && r) {
      const p = ease.outBack(prog(t, ...T0.scarf))
      const sy = lerp(700, r.y + 72, p)
      x.save(); x.globalAlpha *= o
      box(x, r.x - 84, sy - 16, 168, 32, BLUE, { b: 6 })
      for (let k = 0; k < 4; k++) R(x, '#e8fbff', r.x - 70 + k * 42, sy - 16, 12, 32)
      box(x, r.x + 34, sy + 16, 36, 70, BLUE, { b: 6 }); R(x, '#e8fbff', r.x + 34, sy + 44, 36, 10)
      x.restore()
    }
    heartsUp(x, t, 560, 970, 11.6, { n: 3, c: 6 })
  },
  cues: [
    ['glitter', 0.1, 0.6], ['tick', 1.4, 0.02],
    ['glitter', T0.write[0], T0.write[0] + 0.5], ['pluck', 3.6, 1174.66, 0.03, 0.6, -0.3], ['pluck', 4.2, 1318.51, 0.03, 0.6, -0.1], ['pluck', 4.7, 1567.98, 0.03, 0.6, 0.1], ['pluck', 5.2, 1760, 0.03, 0.6, 0.3],
    ['boom', T0.shell, 0.12], ['glitter', T0.shell, T0.shell + 0.6], ['whoosh', T0.scarf[0], 0.4, 0.04], ['pop', T0.scarf[1], 1318.51, 0.045, 0],
    ['glitter', T0.wipe[1], T0.wipe[1] + 0.6],
  ],
})

export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
