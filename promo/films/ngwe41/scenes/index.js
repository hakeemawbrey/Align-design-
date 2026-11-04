// ngwe41 · Your Star Guide: Winter · ♒ Aquarius, winter note 1 / 4: how you love in winter (25 s; story 0–20.6, then the end card)
//   0.00  "Aquarius, long walk, cold hands."  A night walk: Aquarius mid-point at the sky; the date (♊) beside, shivering,
//         one red mitten dangling.
//   3.0   ♒ YOUR STAR: "you love in winter on long starry walks."  Dots in the sky join up into a shape. "and THAT one…"
//   7.4   "big ideas. big sky. very cold hands."  "brrr."  Aquarius keeps going: "…and that's why stars twinkle!"
//  11.8   "hold the mitten, not just the conversation."  Aquarius looks over, notices, and takes the mitten. The shivering stops.
//  15.45  "Hold the | mitten, too."  The two of them tip in mitten, under the joined-up dots. Pisces: happy fountains.
import { winterGuide, drawStarChar, signStar, prog, ease, lerp, clamp, INK, R, box, BONE, GOLD, heart, heartsUp, shadow } from '../../ngwe25/scenes/gwkit.js'

const DATE = signStar('gemini')
const T0 = { dots: [3.6, 6.4], that: 5.0, brrr: 8.6, twinkle: 9.6, notice: 12.9, hold: 13.5 }
const DOTS = [[220, 560], [330, 500], [450, 590], [560, 520], [690, 600], [800, 540], [880, 650]]

function mitten(x, cx, cy, s = 1, rot = 0) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  R(x, INK, -26, -34, 52, 66); R(x, '#e23d4e', -20, -28, 40, 54); R(x, INK, -42, -20, 20, 30); R(x, '#e23d4e', -38, -16, 14, 22)
  R(x, '#ffffff', -20, 16, 40, 10); R(x, '#ff8a92', -14, -22, 10, 10)
  x.restore()
}

const F = winterGuide({
  sign: 'aquarius', note: 1, duration: 25,
  hook: '*Aquarius,* long | walk, cold hands.', hookSize: 92,
  lines: [
    { t: 3.0, text: 'you love in winter on long *starry* walks.' },
    { t: 7.4, text: 'big ideas. big sky. *very* cold hands.' },
    { t: 11.8, text: 'hold the mitten, not just the *conversation.*' },
  ],
  fact: 'AQUARIUS: FIXED AIR', factAt: 4.6, factDur: 2.2,
  last: 'Hold the | *mitten,* too.',
  tissues: false,
  pisces: (t, d) => ({ ...d, x: 985, s: 116 }),
  guide(t) {
    const near = ease.inOutCubic(prog(t, T0.notice, T0.hold))
    const mood = t < T0.notice ? (t > T0.twinkle && t < T0.twinkle + 1.4 ? 'sparkle' : 'happy') : t < T0.hold ? 'wide' : t < 15.45 ? 'heart' : 'happy'
    return { x: lerp(380, 430, near), y: 1150, size: 270, mood, look: t < T0.notice ? [0.4, -1] : [1, 0], squash: t < T0.notice ? 0.03 * Math.sin(t * 9) : 0, side: -1, lanternSize: 70,
      hops: t < T0.notice ? [0.4, 1.2, 2.0, 5.0, 9.6] : [T0.hold + 0.05] }
  },
  drawBack(x, t, K) {
    const o = K.outAll(t)
    // the dots join up
    const p = prog(t, ...T0.dots)
    x.save(); x.globalAlpha *= o
    const n = DOTS.length, seg = p * (n - 1)
    x.strokeStyle = 'rgba(191,232,255,0.8)'; x.lineWidth = 5
    for (let i = 0; i < n - 1; i++) {
      const f = clamp(seg - i); if (f <= 0) break
      const [a, b] = DOTS[i], [c, d] = DOTS[i + 1]
      x.beginPath(); x.moveTo(a, b); x.lineTo(lerp(a, c, f), lerp(b, d, f)); x.stroke()
    }
    DOTS.forEach(([a, b], i) => { const tw = 0.7 + 0.3 * Math.sin(t * 3 + i); R(x, '#ffffff', a - 7 * tw, b - 7 * tw, 14 * tw, 14 * tw); R(x, '#bfe8ff', a - 3, b - 14, 6, 28); R(x, '#bfe8ff', a - 14, b - 3, 28, 6) })
    x.restore()
  },
  drawFront(x, t, K) {
    const o = K.outAll(t)
    const held = t > T0.hold
    const shiv = held ? 0 : 0.06 * Math.sin(t * 40)
    x.save(); x.globalAlpha *= o
    shadow(x, 720, 1262, 170, 0.35)
    drawStarChar(x, 720, 1160, 220, t, { color: DATE.color, glyph: DATE.glyph, seed: 9, mood: held ? 'heart' : t > T0.brrr && t < T0.brrr + 1 ? 'squint' : 'neutral', look: [-1, -0.6], squash: shiv, bob: held ? undefined : 0, hops: [T0.hold + 0.1, 15.7] })
    // the mitten: dangling from the date's tip, then between the two
    if (!held) mitten(x, 620 + Math.sin(t * 40) * 3, 1150, 0.9, 0.2)
    else { const k = ease.outBack(prog(t, T0.hold, T0.hold + 0.4)); mitten(x, lerp(620, 580, k), lerp(1150, 1120, k), 1.05, -0.1) }
    x.restore()
    if (t > T0.that && t < T0.that + 1.5) K.bubble(380, 920, 'and THAT one...', { size: 40, k: K.pop01(t, T0.that, 0.3, 2.4) * (1 - prog(t, T0.that + 1.2, T0.that + 1.5)) })
    if (t > T0.brrr && t < T0.brrr + 1.3) K.bubble(740, 960, 'brrr.', { size: 42, k: K.pop01(t, T0.brrr, 0.25, 2.6) * (1 - prog(t, T0.brrr + 1.0, T0.brrr + 1.3)) })
    if (t > T0.twinkle && t < T0.twinkle + 2.0) K.bubble(400, 900, "...and that's why stars twinkle!", { size: 34, k: K.pop01(t, T0.twinkle, 0.3, 2.4) * (1 - prog(t, T0.twinkle + 1.7, T0.twinkle + 2.0)) })
    if (t > T0.notice && t < T0.hold + 0.4) K.bubble(430, 930, '!', { size: 48, k: K.pop01(t, T0.notice, 0.2, 2.6) })
    heartsUp(x, t, 580, 1000, T0.hold + 0.3, { n: 3, c: 6, col: '#ff8a92' })
    heartsUp(x, t, 580, 960, 16.3, { n: 3, c: 6 })
  },
  cues: [
    ['tick', 0.4, 0.03], ['tick', 1.2, 0.03], ['tick', 2.0, 0.03],
    ...DOTS.slice(1).map((_, i) => ['pluck', T0.dots[0] + (i + 1) * (T0.dots[1] - T0.dots[0]) / (DOTS.length - 1), [1174.66, 1318.51, 1567.98, 1760, 1975.53, 2349.32][i], 0.025, 0.6, (i - 3) * 0.12]),
    ['pop', T0.that, 880, 0.04, -0.3], ['tick', T0.brrr, 0.04], ['tick', T0.brrr + 0.08, 0.04], ['tick', T0.brrr + 0.16, 0.04],
    ['pop', T0.twinkle, 987.77, 0.04, -0.3], ['pop', T0.notice, 1318.51, 0.045, -0.2], ['pluck', T0.hold + 0.1, 1174.66, 0.045, 0.8, 0], ['glitter', T0.hold, T0.hold + 0.6],
  ],
})

export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
