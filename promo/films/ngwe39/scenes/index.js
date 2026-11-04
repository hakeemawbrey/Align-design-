// ngwe39 · Your Star Guide: Winter · ♑ Capricorn, winter note 3 / 4: the small gift (20 s; story 0–15.6, then the end card)
//   0.00  "Capricorn, someone took notes."  A small green notebook (a mountain doodled on the cover) has just landed
//         in front of Cap: THUMP. Cap peers at it.
//   3.0   ♑ YOUR STAR: "you mention a goal once and move on."  A flashback bubble: "someday i'll bake bread. anyway."
//   5.4   The notebook flips open: "YOUR PLANS (I LISTENED)": bake bread · see the mountains · rest more (underlined twice).
//   6.6   "the gift is proof someone heard you."  Cap melts.
//  10.68  "They listened. | That's love."  Cap hugs the notebook. Pisces: happy fountains.
import { winterGuide, paperNote, prog, ease, lerp, clamp, INK, MONO, R, box, heartsUp } from '../../ngwe25/scenes/gwkit.js'

const T0 = { land: 0.0, flash: 4.0, open: 5.4, melt: 8.2 }
const GREEN = '#2fa57e'

function notebookClosed(x, cx, cy, k, rot) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  box(x, -110, -140, 220, 280, GREEN, { b: 7, hi: '#56c9a2' })
  R(x, '#1d7a5a', -110, -140, 24, 280)
  // the doodled mountain
  x.strokeStyle = '#f8f0dc'; x.lineWidth = 6; x.beginPath(); x.moveTo(-60, 40); x.lineTo(-10, -40); x.lineTo(20, 0); x.lineTo(40, -20); x.lineTo(80, 40); x.stroke()
  R(x, '#f8f0dc', -18, -36, 16, 8)
  x.restore()
}

const F = winterGuide({
  sign: 'capricorn', note: 3, duration: 20,
  hook: '*Capricorn,* someone | took notes.',
  lines: [
    { t: 3.0, text: 'you mention a goal once and move *on.*' },
    { t: 6.6, text: 'the gift is proof someone *heard* you.' },
  ],
  fact: 'CAPRICORN IS AN EARTH SIGN', factAt: 8.6, factDur: 1.8,
  last: 'They *listened.* | That\'s love.',
  guide(t) {
    const melt = t > T0.melt && t < T0.melt + 0.8 ? 0.2 * Math.sin(Math.PI * prog(t, T0.melt, T0.melt + 0.8)) : 0
    const mood = t < T0.open ? (t > T0.flash && t < T0.flash + 1.3 ? 'neutral' : 'wide') : t < T0.melt ? 'sparkle' : t < 10.68 ? 'heart' : 'happy'
    return { x: 540, y: 1150, size: 280, mood, look: [0, -1], squash: melt + (t < 0.4 ? 0.12 * Math.exp(-t * 8) : 0), lanternSize: 72 }
  },
  drawFront(x, t, K) {
    const o = K.outAll(t)
    const op = prog(t, T0.open, T0.open + 0.5)
    if (op < 1) notebookClosed(x, 540, 790, (1 - ease.inCubic(op)) * o, -0.06 + 0.02 * Math.sin(t * 3))
    if (t > T0.open) {
      const k = ease.outBack(prog(t, T0.open, T0.open + 0.5)) * o
      const late = t > 10.68
      paperNote(x, 540, late ? 760 : 780, 600, 400, ['bake bread', 'see the mountains', 'rest more (!!)'], { k, rot: -0.03, size: 50, kicker: 'YOUR PLANS (I LISTENED)', kickerColor: '#1d7a5a', reveal: prog(t, T0.open + 0.3, T0.open + 1.8) })
      // the double underline under "rest more"
      if (t > T0.open + 1.9) { const u = prog(t, T0.open + 1.9, T0.open + 2.3); x.save(); x.globalAlpha *= o; R(x, '#c0304a', 540 - 160, (late ? 760 : 780) + 128, 320 * u, 5); R(x, '#c0304a', 540 - 150, (late ? 760 : 780) + 140, 300 * u, 5); x.restore() }
    }
    if (t > T0.flash && t < T0.flash + 1.3) K.bubble(540, 960, "someday i'll bake bread. anyway.", { size: 36, k: K.pop01(t, T0.flash, 0.3, 2.2) * (1 - prog(t, T0.flash + 1.0, T0.flash + 1.3)) })
    K.burst(700, 700, 70, t, 0.0, { word: 'THUMP', size: 30, life: 0.9 })
    K.sparkles(t, 540, 780, T0.open + 0.3, 10, 300, 1)
    heartsUp(x, t, 540, 960, T0.melt, { n: 3, c: 7 })
    heartsUp(x, t, 540, 960, 11.6, { n: 3, c: 6 })
  },
  cues: [
    ['boom', 0.02, 0.15], ['tick', 0.05, 0.06], ['tick', 1.5, 0.03],
    ['pop', T0.flash, 659.25, 0.04, 0], ['whoosh', T0.open, 0.4, 0.04], ['pop', T0.open + 0.2, 1174.66, 0.045, 0],
    ['tick', 6.0, 0.03], ['tick', 6.4, 0.03], ['tick', 6.8, 0.03], ['pluck', T0.open + 2.0, 1318.51, 0.04, 0.8, 0],
    ['whoosh', T0.melt, 0.5, 0.03], ['pluck', T0.melt + 0.2, 1174.66, 0.04, 0.8, 0],
  ],
})

export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
