// ngwe37 · Your Star Guide: Winter · ♑ Capricorn, winter note 1 / 4: how you love in winter (25 s; story 0–20.6, then the end card)
//   0.00  "Capricorn, it's 6 AM and you're shoveling."  Cap mid-scoop on the date's front walk, snow flying; the sign
//         over the door says 6:00 AM.
//   3.0   ♑ YOUR STAR: "you love in winter by showing up early."  Scoop, scoop, scoop: the lumps vanish; a cocoa appears
//         on the step.
//   7.4   "clear path. warm cocoa. zero sleep."  6:01: the door opens; the date (♍) in a nightcap sees it all. Hearts.
//  11.8   "they see it. now let them help you, too."  The date grabs a second shovel; Cap, surprised, then grinning.
//  15.45  card flip · "Let them | help you, too."  Two shovels, one path. Pisces: happy fountains.
import { winterGuide, drawStarChar, signStar, mug, prog, ease, lerp, clamp, INK, MONO, R, box, SNOW, SNOW_SH, WOOD, WOOD_D, heartsUp, shadow } from '../../ngwe25/scenes/gwkit.js'

const DATE = signStar('virgo')
const T0 = { scoop: [0.2, 4.3, 5.2, 6.1], cocoa: 6.4, door: 9.2, gasp: 9.6, grab: 13.0, together: 13.6 }
const LUMPS = [[560, 0], [640, 1], [720, 2]]

function shovel(x, cx, cy, rot) {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  R(x, INK, -6, -150, 12, 160); R(x, '#8a5a3a', -3, -147, 6, 154)
  R(x, INK, -24, -164, 48, 18); R(x, '#5e3a24', -20, -160, 40, 10)
  box(x, -34, 10, 68, 52, '#7f8aa8', { b: 5, hi: '#c9d2ea' })
  x.restore()
}
function lump(x, cx, cy, k) { if (k <= 0.01) return; x.save(); x.translate(cx, cy); x.scale(k, k); R(x, INK, -46, -34, 92, 40); R(x, SNOW, -40, -28, 80, 32); R(x, '#ffffff', -34, -28, 40, 8); x.restore() }

const F = winterGuide({
  sign: 'capricorn', note: 1, duration: 25,
  hook: "*Capricorn,* it's 6 AM | and you're shoveling.", hookSize: 92,
  lines: [
    { t: 3.0, text: 'you love in winter by showing up *early.*' },
    { t: 7.4, text: 'clear path. warm cocoa. *zero* sleep.' },
    { t: 11.8, text: 'they see it. now let them *help* you, too.' },
  ],
  fact: 'CAPRICORN: CARDINAL EARTH,|RULED BY SATURN', factAt: 4.4, factDur: 2.4,
  last: 'Let them | *help* you, too.',
  tissues: false,
  pisces: (t, d) => ({ ...d, x: 110, s: 116, look: t < 15.45 ? [1, -0.4] : [1, -0.8] }),
  guide(t) {
    const sc = T0.scoop.some(s => t > s && t < s + 0.5) ? 0.1 * Math.sin(Math.PI * clamp(Math.min(...T0.scoop.map(s => Math.abs(t - s - 0.25))) * 4)) : 0
    const mood = t < T0.door ? (t < 2.8 ? 'squint' : 'neutral') : t < T0.grab ? 'wide' : t < 15.45 ? 'sparkle' : 'happy'
    return { x: 380, y: 1140, size: 260, mood, look: [1, 0], squash: sc, side: -1, lanternSize: 66, sleepy: true }
  },
  drawBack(x, t, K) {
    const o = K.outAll(t)
    x.save(); x.globalAlpha *= o
    // the house front: wall, door, step, sign
    R(x, '#3a2d63', 660, 760, 420, 540); R(x, '#4a3a7a', 660, 760, 420, 20)
    const open = ease.outCubic(prog(t, T0.door, T0.door + 0.5))
    box(x, 760, 900, 180, 330, '#1a1236', { b: 6 })
    // the door swings (gets thinner)
    const dw = 180 * (1 - 0.8 * open)
    box(x, 760, 900, dw, 330, '#b04a3a', { b: 6, hi: '#d06a58' }); R(x, GOLDK, 760 + dw - 30, 1060, 12, 12)
    // warm light spills out
    if (open > 0) { x.save(); x.globalAlpha *= 0.4 * open; R(x, '#ffd9a0', 760 + dw, 906, 180 - dw, 318); x.restore() }
    box(x, 730, 1236, 240, 30, '#7f7a99', { b: 5 })
    // the sign: 6:00 → 6:01
    box(x, 770, 820, 160, 56, '#f8f0dc', { b: 5 })
    x.fillStyle = INK; x.font = `700 32px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillText(t < T0.door ? '6:00 AM' : '6:01 AM', 850, 849)
    // the cocoa on the step
    if (t > T0.cocoa) { const k = K.pop01(t, T0.cocoa, 0.3, 2.4); x.save(); x.translate(900, 1200); x.scale(k, k); mug(x, 0, 0, 44, t, { color: '#2fc79a' }); x.restore() }
    x.restore()
  },
  drawMid(x, t, K) {
    const o = K.outAll(t)
    x.save(); x.globalAlpha *= o
    LUMPS.forEach(([lx, i]) => lump(x, lx, 1284, 1 - ease.inCubic(prog(t, T0.scoop[i + 1], T0.scoop[i + 1] + 0.3))))
    // flying snow chunks off each scoop
    for (const s of T0.scoop) { const p = prog(t, s, s + 0.7); if (p > 0 && p < 1) { const cx = lerp(470, 250, p), cy = 1180 - Math.sin(Math.PI * p) * 260; R(x, INK, cx - 18, cy - 14, 36, 28); R(x, SNOW, cx - 14, cy - 10, 28, 20) } }
    x.restore()
  },
  drawFront(x, t, K) {
    const o = K.outAll(t)
    // Cap's shovel (right tip)
    const swing = T0.scoop.reduce((a, s) => a + (t > s && t < s + 0.6 ? Math.sin(Math.PI * prog(t, s, s + 0.6)) : 0), 0)
    x.save(); x.globalAlpha *= o; shovel(x, 500, 1150, 0.5 - swing * 0.9); x.restore()
    // the date at the door
    if (t > T0.door + 0.2) {
      const k = K.pop01(t, T0.door + 0.2, 0.4, 2.2)
      const walk = ease.inOutCubic(prog(t, T0.grab, T0.together))
      const dx = lerp(850, 720, walk)
      x.save(); x.globalAlpha *= o
      drawStarChar(x, dx, 1120, 200, t, { color: DATE.color, glyph: DATE.glyph, seed: 9, pop: k, mood: t < T0.grab ? (t > T0.gasp ? 'heart' : 'wide') : 'happy', look: [-1, 0], hops: [T0.door + 0.5, T0.gasp, T0.grab, 15.7] })
      // a nightcap
      R(x, INK, dx - 40, 1012, 80, 18); R(x, '#7fe3ff', dx - 36, 1015, 72, 12); R(x, '#ffffff', dx + 30, 1000, 14, 14)
      if (t > T0.grab) shovel(x, dx - 70, 1160, -0.4 + (t > T0.together ? 0.3 * Math.sin(t * 6) : 0))
      x.restore()
    }
    if (t < 2.75) K.bubble(380, 920, '*yawn*', { size: 38, k: 1 - prog(t, 2.45, 2.75) })
    heartsUp(x, t, 850, 960, T0.gasp, { n: 3, c: 6, col: '#ef5c94' })
    if (t > T0.grab && t < 15.4) K.bubble(720, 930, 'scoot over.', { size: 40, k: K.pop01(t, T0.grab, 0.3, 2.4) * (1 - prog(t, 15.1, 15.4)) })
    heartsUp(x, t, 540, 960, 16.3, { n: 3, c: 6 })
  },
  cues: [
    ['whoosh', 0.2, 0.4, 0.04], ['tick', 0.7, 0.05],
    ...T0.scoop.slice(1).map(s => ['whoosh', s, 0.4, 0.04]), ...T0.scoop.slice(1).map(s => ['tick', s + 0.5, 0.05]),
    ['pop', T0.cocoa, 1174.66, 0.04, 0.3],
    ['tick', T0.door - 0.05, 0.06], ['whoosh', T0.door, 0.5, 0.03], ['pop', T0.gasp, 1318.51, 0.045, 0.3], ['glitter', T0.gasp, T0.gasp + 0.5],
    ['pop', T0.grab, 880, 0.04, 0.3], ['whoosh', T0.together, 0.4, 0.03], ['tick', T0.together + 0.5, 0.04], ['tick', T0.together + 1.0, 0.04],
  ],
})
const GOLDK = '#f2c75c'

export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
