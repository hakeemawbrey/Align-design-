// ngwe34 · Your Star Guide: Winter · ♐ Sagittarius, winter note 2 / 4: the holiday blind spot (25 s; story 0–20.6, then the end card)
//   0.00  "Sagittarius, read the room."  The holiday table: the host (♋) proudly holding a soup pot, Sag with a spoon up,
//         mid-verdict: "honestly? it's... a choice."
//   3.0   ♐ YOUR STAR: "you told the host the soup was 'a choice.'"  The whole table freezes: frost, icicles on every star.
//   7.4   "honest is great. honest and gentle is better."  Sag tries again: "it's... warm!"  (a tiny thaw)
//  11.8   "the truth lands softer with a thank you."  Sag: "thank you for cooking for us." The room thaws; the host beams.
//  15.45  card flip · "Honest and | gentle."  Everyone at the table, warm again. Pisces: happy fountains.
import { winterGuide, drawStarChar, signStar, prog, ease, lerp, clamp, INK, R, box, WOOD, WOOD_D, heartsUp, shadow } from '../../ngwe25/scenes/gwkit.js'

const HOST = signStar('cancer'), GUEST = signStar('taurus')
const T0 = { freeze: 4.6, warm: 9.4, thanks: 13.2, thaw: [13.6, 14.6] }

function icicles(x, cx, cy, s, k) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha *= k
  for (let i = -2; i <= 2; i++) { const L = s * (0.14 + 0.06 * ((i + 5) % 3)) * k; R(x, INK, cx + i * s * 0.12 - 7, cy, 14, L + 4); R(x, '#dff4ff', cx + i * s * 0.12 - 4, cy, 8, L) }
  R(x, INK, cx - s * 0.32, cy - 8, s * 0.64, 12); R(x, '#ffffff', cx - s * 0.3, cy - 6, s * 0.6, 8)
  x.restore()
}

const F = winterGuide({
  sign: 'sagittarius', note: 2, duration: 25,
  hook: '*Sagittarius,* | read the room.',
  lines: [
    { t: 3.0, text: "you told the host the soup was *'a choice.'*" },
    { t: 7.4, text: 'honest is great. honest *and gentle* is better.' },
    { t: 11.8, text: 'the truth lands softer with a *thank you.*' },
  ],
  fact: "SAGITTARIUS' SYMBOL:|THE ARCHER", factAt: 5.6, factDur: 1.6,
  last: 'Honest *and* | gentle.',
  tissues: false,
  pisces: (t, d) => ({ ...d, x: 985, y: 1240, s: 116 }),
  guide(t) {
    const frozen = t > T0.freeze && t < T0.thaw[0]
    return { x: 240, y: 1040, size: 300, mood: t < T0.freeze ? 'neutral' : frozen ? (t > T0.warm ? 'squint' : 'wide') : t < 15.45 ? 'sparkle' : 'happy',
      look: [1, -0.3], bob: frozen ? 0 : undefined, squash: t < 2.6 ? 0.04 * Math.sin(t * 12) : 0, lanternSize: 76 }
  },
  drawMid(x, t, K) {
    const o = K.outAll(t)
    const ice = clamp(prog(t, T0.freeze, T0.freeze + 0.6)) * (1 - prog(t, ...T0.thaw)) * (t > T0.warm && t < T0.warm + 1 ? 0.8 : 1)
    x.save(); x.globalAlpha *= o
    x.translate(540, 1290); x.scale(1.25, 1.25); x.translate(-540, -1290)
    // the guest and the host behind the table
    drawStarChar(x, 540, 1110, 170, t, { color: GUEST.color, glyph: null, seed: 5, mood: ice > 0.5 ? 'wide' : t > 15.45 ? 'happy' : 'neutral', look: [ice > 0.5 ? -1 : 1, -0.2], bob: ice > 0.5 ? 0 : undefined })
    const hostMood = t < T0.freeze ? 'sparkle' : ice > 0.5 ? (t > T0.warm + 0.3 ? 'squint' : 'wide') : 'heart'
    drawStarChar(x, 770, 1060, 240, t, { color: HOST.color, glyph: HOST.glyph, seed: 7, mood: hostMood, look: [-1, -0.2], bob: ice > 0.5 ? 0 : undefined, hops: [T0.thaw[0] + 0.1, 15.7] })
    // the table
    box(x, 120, 1180, 800, 40, WOOD, { b: 6, hi: '#b07a52' })
    R(x, WOOD_D, 160, 1226, 30, 70); R(x, WOOD_D, 850, 1226, 30, 70)
    R(x, '#f8f0dc', 140, 1172, 760, 12)
    // bowls
    for (const bx of [300, 540]) { box(x, bx - 50, 1140, 100, 34, '#f3e6d2', { b: 5 }); R(x, '#d9862e', bx - 44, 1140, 88, 10) }
    // the soup pot in the host's tips
    box(x, 600, 1010, 150, 110, '#6a6f8c', { b: 6, hi: '#9aa0bf' }); box(x, 580, 1000, 190, 22, '#4a4f6c', { b: 5 })
    if (ice < 0.5) for (let k = 0; k < 3; k++) { const ph = (t * 0.6 + k / 3) % 1; x.save(); x.globalAlpha *= Math.sin(Math.PI * ph) * 0.7; R(x, '#ffffff', 630 + k * 40 + Math.sin(ph * 6) * 8, 990 - ph * 90, 8, 18); x.restore() }
    // icicles on every star + the pot
    icicles(x, 300, 1000, 240, ice); icicles(x, 540, 1046, 170, ice); icicles(x, 770, 972, 240, ice); icicles(x, 675, 1124, 150, ice)
    x.restore()
    // the frost tint over the room
    if (ice > 0) { x.save(); x.globalAlpha *= 0.22 * ice * o; R(x, '#bfe8ff', 0, 0, 1080, 1920); x.restore() }
  },
  drawFront(x, t, K) {
    const o = K.outAll(t)
    if (t < 2.75) K.bubble(360, 800, "honestly? it's... a choice.", { size: 38, k: 1 - ease.inCubic(prog(t, 2.45, 2.75)) })
    K.burst(540, 760, 100, t, T0.freeze, { word: 'BRRR', size: 42, color: '#bfe8ff' })
    if (t > T0.warm && t < T0.warm + 1.8) K.bubble(320, 800, "it's... warm!", { size: 44, k: K.pop01(t, T0.warm, 0.3, 2.4) })
    if (t > T0.thanks && t < 15.4) K.bubble(400, 800, 'thank you for cooking for us.', { size: 36, k: K.pop01(t, T0.thanks, 0.3, 2.4) * (1 - prog(t, 15.1, 15.4)) })
    K.sparkles(t, 540, 1000, T0.thaw[0] + 0.3, 12, 330, 1)
    heartsUp(x, t, 770, 860, T0.thaw[0] + 0.3, { n: 3, c: 6, col: '#ff8fb1' })
    heartsUp(x, t, 540, 900, 16.3, { n: 3, c: 6 })
  },
  cues: [
    ['tick', 0.3, 0.02], ['pop', 0.5, 739.99, 0.03, -0.3],
    ['boom', T0.freeze, 0.15], ['glitter', T0.freeze, T0.freeze + 0.6], ['tick', T0.freeze + 0.2, 0.06], ['tick', T0.freeze + 0.4, 0.05],
    ['pop', T0.warm, 880, 0.04, -0.3], ['tick', T0.warm + 0.9, 0.04],
    ['pop', T0.thanks, 987.77, 0.04, -0.3], ['glitter', T0.thaw[0], T0.thaw[1]], ['pluck', T0.thaw[0] + 0.3, 1318.51, 0.04, 0.8, 0.3],
  ],
})

export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
