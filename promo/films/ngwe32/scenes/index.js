// ngwe32 · Your Star Guide: Winter · ♏ Scorpio, winter note 4 / 4: a word for the new year (20 s; story 0–15.6, then the end card)
//   0.00  "Scorpio, your word is a soft one."  Scorpio frozen stiff inside a block of pixel ice, only the lantern glowing.
//   3.0   ♏ YOUR STAR: "your word for the new year: soften."  The lantern's warmth writes S-O-F-T-E-N into the window frost.
//   6.2   "not weaker. warmer."  The ice drips, cracks and slides off; Scorpio shakes itself loose with a little glow.
//         The window clears and the word lights up. The drips pool into a little heart.
//  10.68  card flip · "Soft is still | strong."  Scorpio, warm and upright. Pisces: happy fountains.
import { winterGuide, frostWindow, prog, ease, lerp, clamp, INK, R, ICE, heart, heartsUp } from '../../ngwe25/scenes/gwkit.js'

const WIN = { x: 540, y: 720, w: 640, h: 360 }
const T0 = { write: [3.3, 5.4], melt: [6.4, 8.8], crack: 8.8, free: 9.1, wipe: [9.0, 9.8] }

function iceBlock(x, t, a, crack) {
  if (a <= 0.01) return
  const X = 540, Y = 1110, w = 380, h = 360
  x.save(); x.globalAlpha *= a
  const drop = crack > 0 ? ease.inCubic(crack) * 240 : 0
  // two halves slide apart once it cracks
  for (const d of [-1, 1]) {
    x.save(); x.translate(d * drop * 0.9, drop * 0.3); x.rotate(d * crack * 0.25)
    x.fillStyle = 'rgba(191,232,255,0.45)'; x.fillRect(d < 0 ? X - w / 2 : X, Y - h / 2, w / 2, h)
    x.strokeStyle = INK; x.lineWidth = 6; x.strokeRect(d < 0 ? X - w / 2 : X, Y - h / 2, w / 2, h)
    R(x, 'rgba(255,255,255,0.75)', (d < 0 ? X - w / 2 : X) + 18, Y - h / 2 + 18, 60, 12)
    R(x, 'rgba(255,255,255,0.55)', (d < 0 ? X - w / 2 : X) + 18, Y - h / 2 + 40, 12, 60)
    x.restore()
  }
  if (crack <= 0) { R(x, 'rgba(255,255,255,0.5)', X - 2, Y - h / 2, 4, h) }
  x.restore()
}

const F = winterGuide({
  sign: 'scorpio', note: 4, duration: 20,
  T: { l2: 6.2 },
  hook: '*Scorpio,* your word | is a soft one.',
  lines: [
    { t: 3.0, text: 'your word for the new year: *soften.*' },
    { t: 6.2, text: 'not weaker. *warmer.*' },
  ],
  fact: 'SCORPIO IS A WATER SIGN', factAt: 7.4, factDur: 2.6,
  last: 'Soft is still | *strong.*',
  guide(t) {
    const frozen = t < T0.free
    const shake = t > T0.free && t < T0.free + 0.7 ? 0.14 * Math.sin((t - T0.free) * 30) * (1 - prog(t, T0.free, T0.free + 0.7)) : 0
    return { x: 540, y: 1130, size: 290, mood: frozen ? (t < T0.melt[0] ? 'squint' : 'wide') : t < 10.68 ? 'sparkle' : 'happy', look: frozen ? [0, 0] : [0, -1],
      bob: frozen ? 0 : undefined, squash: shake, lanternGlow: frozen ? 1.5 : 1, lanternSize: 76, glow: frozen ? 0.6 : 1.3 }
  },
  drawBack(x, t, K) {
    const o = K.outAll(t)
    x.save(); x.globalAlpha *= o
    frostWindow(x, K, t, WIN.x, WIN.y, WIN.w, WIN.h, { word: 'SOFTEN', write: prog(t, ...T0.write), wipe: prog(t, ...T0.wipe), glow: prog(t, T0.wipe[1], T0.wipe[1] + 0.6), wordSize: 150 })
    x.restore()
    // the warmth rising from the lantern to the window while it writes
    if (t > T0.write[0] - 0.3 && t < T0.write[1] + 0.3) {
      x.save(); x.globalAlpha *= 0.5 * Math.sin(Math.PI * prog(t, T0.write[0] - 0.3, T0.write[1] + 0.3))
      for (let i = 0; i < 6; i++) { const ph = (t * 0.9 + i / 6) % 1; R(x, '#ffd9a0', 690 - ph * 120 + Math.sin(ph * 9 + i) * 20, 1080 - ph * 260, 10, 10) }
      x.restore()
    }
  },
  drawMid(x, t, K) {
    // the drip puddle: a little heart on the snow
    const k = K.pop01(t, T0.free + 0.3, 0.4, 2) * K.outAll(t)
    if (k > 0.01) { x.save(); x.globalAlpha *= 0.85; heart(x, 380, 1310, 9 * k, '#8fe3ff'); x.restore() }
  },
  drawFront(x, t, K) {
    const o = K.outAll(t)
    const melt = prog(t, ...T0.melt), crack = prog(t, T0.crack, T0.crack + 0.8)
    iceBlock(x, t, (1 - melt * 0.35) * (1 - crack) * o, crack)
    // drips
    if (t > T0.melt[0] && t < T0.crack + 0.4) for (let i = 0; i < 5; i++) { const ph = (t * 1.3 + i / 5) % 1; R(x, '#8fe3ff', 380 + i * 80, 1290 + ph * 30, 8, 12) }
    K.burst(540, 940, 90, t, T0.crack, { word: 'CRACK', size: 36, color: '#bfe8ff' })
    K.sparkles(t, 540, 1080, T0.free + 0.1, 10, 220, 1)
    heartsUp(x, t, 540, 940, 11.6, { n: 3, c: 6, col: '#e23d66' })
  },
  cues: [
    ['tick', 0.4, 0.02], ['tick', 1.6, 0.02],
    ['glitter', T0.write[0], T0.write[0] + 0.5], ['pluck', 3.8, 1174.66, 0.03, 0.6, -0.3], ['pluck', 4.4, 1318.51, 0.03, 0.6, 0], ['pluck', 5.0, 1567.98, 0.03, 0.6, 0.3],
    ['tick', 6.8, 0.03], ['tick', 7.4, 0.03], ['tick', 8.0, 0.03],
    ['boom', T0.crack, 0.2], ['tick', T0.crack, 0.08], ['whoosh', T0.free, 0.4, 0.04], ['glitter', T0.free + 0.1, T0.free + 0.6],
    ['glitter', T0.wipe[1], T0.wipe[1] + 0.6],
  ],
})

export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
