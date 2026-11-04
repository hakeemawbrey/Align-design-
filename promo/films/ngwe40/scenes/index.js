// ngwe40 · Your Star Guide: Winter · ♑ Capricorn, winter note 4 / 4: a word for the new year (20 s; story 0–15.6, then the end card)
//   0.00  "Capricorn, the word isn't 'more'."  Cap balancing a wobbling tower of to-do lists by a frosted window.
//   3.0   ♑ YOUR STAR: "your word for the new year: rest."  A beam from the lantern writes R-E-S-T in the frost.
//   6.2   "rest isn't the reward. it's the fuel."  Cap sets the tower down and leans on it, eyes closing. The top
//         list reads only "REST ✓". The frost clears; the word lights up.
//  10.68  "Rest is part | of the plan."  Cap dozing against the stack, content. Pisces: happy fountains.
import { winterGuide, frostWindow, prog, ease, lerp, clamp, INK, MONO, R, box, heartsUp } from '../../ngwe25/scenes/gwkit.js'

const WIN = { x: 540, y: 720, w: 600, h: 380 }
const T0 = { write: [3.3, 5.5], down: [7.8, 8.6], wipe: [9.0, 9.8] }
let PEN = { x: 330, y: 730 }, LAMP = { x: 700, y: 1100 }

function stack(x, t, cx, by, wob) {
  for (let i = 0; i < 7; i++) {
    const sx = cx + Math.sin(t * 5 + i * 0.7) * wob * i * 2.4, sy = by - i * 26
    box(x, sx - 80, sy - 20, 160, 20, i % 2 ? '#f8f0dc' : '#eae0c8', { b: 4 })
    R(x, 'rgba(42,28,90,0.4)', sx - 60, sy - 13, 90 - (i % 3) * 20, 4)
  }
  // the top list
  const ty = by - 7 * 26 - 40
  const tx = cx + Math.sin(t * 5 + 7 * 0.7) * wob * 22
  box(x, tx - 90, ty - 50, 180, 70, '#ffffff', { b: 5 })
  x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText(t < T0.down[1] ? 'TO DO' : 'REST ✓', tx, ty - 15)
}

const F = winterGuide({
  sign: 'capricorn', note: 4, duration: 20,
  T: { l2: 6.2 },
  hook: "*Capricorn,* the | word isn't 'more'.",
  lines: [
    { t: 3.0, text: 'your word for the new year: *rest.*' },
    { t: 6.2, text: "rest isn't the reward. it's the *fuel.*" },
  ],
  fact: 'THE SUN ENTERS CAPRICORN|AT THE DECEMBER SOLSTICE', factAt: 7.8, factDur: 2.6,
  last: 'Rest is part | of the *plan.*',
  tissues: false,
  pisces: (t, d) => ({ ...d, x: 110, s: 116, look: t < 10.68 ? [1, -0.4] : [1, -0.8] }),
  guide(t) {
    const dp = ease.inOutCubic(prog(t, ...T0.down))
    const wob = t < T0.down[0] ? 0.05 * Math.sin(t * 5) : 0
    const mood = t < T0.write[0] ? 'wide' : t < T0.down[1] ? 'neutral' : t < 10.68 ? 'happy' : 'sleepy'
    return { x: lerp(880, 650, dp), y: 1150, size: 270, mood, look: t < T0.down[0] ? [0, -1] : [-1, 0], squash: wob, lanternSize: 70, zzz: true, lanternGlow: t > T0.write[0] && t < T0.write[1] ? 1.5 : 1 }
  },
  drawBack(x, t, K) {
    const o = K.outAll(t)
    x.save(); x.globalAlpha *= o
    const r = frostWindow(x, K, t, WIN.x, WIN.y, WIN.w, WIN.h, { word: 'REST', write: prog(t, ...T0.write), wipe: prog(t, ...T0.wipe), glow: prog(t, T0.wipe[1], T0.wipe[1] + 0.6), wordSize: 180 })
    x.restore()
    PEN = { x: r.penX, y: r.penY }
  },
  drawMid(x, t, K) {
    const o = K.outAll(t)
    const dp = ease.inOutCubic(prog(t, ...T0.down))
    x.save(); x.globalAlpha *= o
    if (dp >= 1) stack(x, t, 400, 1290, 0)
    x.restore()
  },
  drawFront(x, t, K, r) {
    const o = K.outAll(t)
    if (r) LAMP = { x: r.lx, y: r.ly }
    // the beam from the lantern to the writing point
    if (t > T0.write[0] && t < T0.write[1]) {
      x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha *= 0.55 * Math.sin(Math.PI * prog(t, ...T0.write))
      const g = x.createLinearGradient(LAMP.x, LAMP.y, PEN.x, PEN.y); g.addColorStop(0, 'rgba(255,214,120,0.9)'); g.addColorStop(1, 'rgba(255,214,120,0.2)')
      x.strokeStyle = g; x.lineWidth = 14; x.beginPath(); x.moveTo(LAMP.x, LAMP.y); x.lineTo(PEN.x, PEN.y); x.stroke(); x.restore()
      K.sparkles(t, PEN.x, PEN.y, Math.floor(t * 4) / 4, 4, 30, Math.floor(t * 4))
    }
    // the stack on Cap's head, then carried down to the left
    const dp = ease.inOutCubic(prog(t, ...T0.down))
    if (dp < 1 && r) { x.save(); x.globalAlpha *= o; stack(x, t, lerp(r.x, 400, dp), lerp(r.top + 10, 1290, dp), 1 - dp); x.restore() }
    heartsUp(x, t, 560, 960, 11.6, { n: 3, c: 6 })
  },
  cues: [
    ['tick', 0.3, 0.03], ['tick', 0.9, 0.03], ['tick', 1.5, 0.03], ['tick', 2.1, 0.03],
    ['glitter', T0.write[0], T0.write[0] + 0.5], ['pluck', 3.6, 1174.66, 0.03, 0.6, -0.3], ['pluck', 4.2, 1318.51, 0.03, 0.6, -0.1], ['pluck', 4.7, 1567.98, 0.03, 0.6, 0.1], ['pluck', 5.2, 1760, 0.03, 0.6, 0.3],
    ['whoosh', T0.down[0], 0.6, 0.04], ['boom', T0.down[1], 0.1], ['pop', T0.down[1] + 0.1, 987.77, 0.04, -0.3],
    ['glitter', T0.wipe[1], T0.wipe[1] + 0.6],
  ],
})

export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
