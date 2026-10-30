// guidelibra3 (20 s vertical Align ad, Star Talk "Your Star Guide", ♎ note 3 / 3: try this week) · story 0–15.6, then the end card.
//   0.00  "Try this week, Libra."  The ♎ guide, lantern lit, trembles under a little open umbrella, peeking up at the sky:
//         "um… n-no?"
//   2.8   ♎ YOUR STAR: "say one honest 'no.' kindly."  Chip: Libra season starts near the September equinox.
//   5.6   Libra squeezes its eyes shut: "no, thank you."  A drum-roll… SKY STATUS: STILL UP ✓. It peeks with one eye.
//   7.2   "the sky won't fall. we checked."  The umbrella folds into a cane; a clipboard ticks: stars in place, moon in
//         place, you: still loved.
//  10.6   card flip · "No can be *lovely*."  The same pose as frame 0, umbrella shut, saying it with a smile: "no, thanks!"
// One canvas (sky + guide + props), DOM type above it. Pure f(t).
import { lerp, prog, ease, clamp } from '../../../src/lib.js'
import { signStar } from '../../startalk.js'
import { guideFilm, GOLD, BONE, INK, MONO, INTER } from './guidefilm.js'

const LIB = signStar('libra'), COL = LIB.color, ACC = '#f59be9'
const T = {
  hookOut: [2.5, 2.8], bub0Out: [2.45, 2.75], open: 2.8, l1: 3.0, fact: 3.7,
  brave: 5.6, roll: [5.95, 6.75], status: 6.8, peek: 7.0,
  l2: 7.25, fold: [8.4, 8.8], clip: 8.9, ticks: [9.3, 9.65, 10.0], close: 10.45,
  cut: 10.62, last: 10.7, lastLand: 11.1, again: 12.6, out: [15.15, 15.5],
}
const LINES = [
  { t: T.l1, text: "say one honest '*no.*' kindly." },
  { t: T.l2, text: "the sky won't fall. we *checked.*" },
]
const HX = 540, HY = 1150, HS = 330
const K_out = t => 1 - ease.inCubic(prog(t, ...T.out))

/** the umbrella: open = 1 → full canopy, 0 → furled into a cane; (cx, cy) = the top of its handle stick */
function drawUmbrella(x, cx, cy, open, rot, t) {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  const c = 10
  // shaft + J handle
  x.fillStyle = INK; x.fillRect(-c * 0.8, -c * 1, c * 1.6, c * 22)
  x.fillStyle = '#c9a24a'; x.fillRect(-c * 0.4, -c * 0.6, c * 0.8, c * 21.2)
  x.fillStyle = INK; x.fillRect(-c * 0.8, c * 20, c * 4.6, c * 1.6); x.fillRect(c * 2.6, c * 17.6, c * 1.6, c * 4)
  x.fillStyle = '#c9a24a'; x.fillRect(-c * 0.4, c * 20.4, c * 4, c * 0.8); x.fillRect(c * 3, c * 18, c * 0.8, c * 3)
  // canopy: a stepped pixel dome, five alternating panels; furls to a thin sleeve as open → 0
  const Wd = lerp(1.4, 16, open), Hd = lerp(14, 8, open), cols = [ACC, '#fff1fb']
  for (let pass = 0; pass < 2; pass++) for (let i = -Math.ceil(Wd); i < Math.ceil(Wd); i++) {
    const u = (i + 0.5) / Wd
    if (Math.abs(u) > 1) continue
    const hh = Math.max(1, Math.round(Hd * Math.sqrt(1 - u * u) * (open > 0.3 ? 1 : 1)))
    const lip = open > 0.3 && (i % 3 === 0) ? 1 : 0
    if (pass === 0) { x.fillStyle = INK; x.fillRect(i * c - 4, -hh * c - 4, c + 8, (hh + lip) * c + 8) }
    else { x.fillStyle = cols[Math.floor((u + 1) * 2.5) % 2]; x.fillRect(i * c, -hh * c, c + 0.5, (hh + lip) * c) }
  }
  const hgt = Hd
  x.fillStyle = INK; x.fillRect(-c * 0.6, -hgt * c - c * 2.6, c * 1.2, c * 2.6)
  x.restore()
}

/** the readout that the sky is, in fact, still up */
function drawStatus(x, t, K) {
  const k = K.pop01(t, T.status, 0.34, 2.6) * clamp(1 - prog(t, T.close - 0.2, T.close + 0.1))
  if (k <= 0.01) return
  x.save(); x.translate(800, 610); x.scale(k, k); x.rotate(0.05)
  x.fillStyle = INK; x.fillRect(-190, -66, 380, 132)
  x.fillStyle = '#123a2c'; x.fillRect(-182, -58, 364, 116)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillStyle = '#7dffb8'; x.font = `700 26px ${MONO}`; x.fillText('SKY STATUS', 0, -26)
  x.font = `800 44px ${MONO}`; x.fillText('STILL UP ✓', 0, 22)
  x.restore()
}

function drawClip(x, t, K) {
  const k = K.pop01(t, T.clip, 0.4, 2.0) * clamp(1 - prog(t, T.close - 0.15, T.close + 0.15))
  if (k <= 0.01) return
  x.save(); x.translate(250, 640 + (1 - k) * 160); x.rotate(-0.06); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -150, 340, 300)
  x.fillStyle = '#9c6a44'; x.fillRect(-162, -142, 324, 284)
  x.fillStyle = '#f5eedf'; x.fillRect(-146, -112, 292, 240)
  x.fillStyle = '#aab3c8'; x.fillRect(-50, -158, 100, 34); x.fillStyle = INK; x.fillRect(-40, -150, 80, 6)
  x.textAlign = 'left'; x.textBaseline = 'middle'
  x.fillStyle = '#7a6aa8'; x.font = `700 22px ${MONO}`; x.fillText('SKY INSPECTION', -126, -86)
  const rows = ['STARS: IN PLACE', 'MOON: IN PLACE', 'YOU: STILL LOVED']
  rows.forEach((r, i) => {
    const y = -36 + i * 56
    x.fillStyle = INK; x.font = `700 21px ${MONO}`; x.fillText(r, -96, y)
    x.strokeStyle = INK; x.lineWidth = 3; x.strokeRect(-130, y - 13, 24, 24)
    if (t > T.ticks[i]) { x.fillStyle = i === 2 ? ACC : '#2fa36a'; x.font = `800 34px ${INTER}`; x.fillText('✓', -132, y - 4) }
  })
  x.restore()
}

function moodAt(t) {
  if (t < T.bub0Out[0]) return { mood: 'wide', look: [0, -1], blink: false }
  if (t < T.brave) return { mood: 'neutral', look: [0, -0.6] }
  if (t < T.peek) return { mood: 'squint', look: [0, 0], blink: false }
  if (t < T.fold[0]) return { mood: 'wink', look: [0, -1] }
  if (t < T.again) return { mood: 'happy' }
  return { mood: 'sparkle', look: [0, 0] }
}

const F = guideFilm({
  duration: 20, speaker: '♎ YOUR STAR', color: COL, accent: ACC, glyph: LIB.glyph,
  chip: { sign: 'LIBRA', glyph: '♎', n: 3, of: 3 },
  hook: { text: 'Try this week, | *Libra.*', out: T.hookOut },
  lines: LINES, open: T.open, close: T.close,
  fact: { text: 'LIBRA SEASON STARTS NEAR|THE SEPTEMBER EQUINOX', at: T.fact, dur: T.brave - T.fact - 0.2, x: 540, y: 1356 },
  heads: [{ text: 'No can be | *lovely.*', at: T.last, out: T.out, top: 196, size: 120, accentSize: 190, accentColor: ACC, late: 1, lateAt: T.lastLand }],
  guide(t) {
    const scared = t < T.bub0Out[0] || (t > T.brave && t < T.status)
    const jit = scared ? Math.sin(t * 70) * 4 : 0
    const sq = scared ? 0.1 : 0
    return { x: HX + jit, y: HY, size: HS, ...moodAt(t), squash: sq, pop: K_out(t) }
  },
  drawMid(x, t, K) {
    const ko = K_out(t)
    if (ko <= 0.01) return
    // the umbrella, held up from the left tip (open while scared; furled into a cane from the fold)
    const scared = t < T.bub0Out[0] || (t > T.brave && t < T.status)
    const jit = scared ? Math.sin(t * 70) * 4 : 0
    const fp = ease.inOutCubic(prog(t, ...T.fold))
    const open = 1 - fp
    const raise = t < T.fold[0] ? 1 : 1 - fp
    // canopy over the head while open; then it drops to the side like a cane
    const cx = lerp(HX - 5, HX - 215, fp) + jit, cy = lerp(HY - 320, HY - 150, fp)
    const rot = lerp(0.42, -0.05, fp) + (t > T.fold[1] && t < T.clip ? 0.2 * Math.sin((t - T.fold[1]) * 10) * Math.exp(-(t - T.fold[1]) * 3) : 0)
    x.save(); x.globalAlpha = ko; drawUmbrella(x, cx, cy, open * raise + (1 - raise) * 0, rot, t); x.restore()
  },
  drawBack(x, t, K) {
    // rain of nothing: three tiny "is it falling?" stars that stay exactly where they are, with a dotted guide line
    drawStatus(x, t, K)
  },
  drawFront(x, t, K) {
    drawClip(x, t, K)
    const k0 = 1 - ease.inCubic(prog(t, ...T.bub0Out))
    if (k0 > 0.01) K.bubble(HX + 150, 880, 'um… n-no?', { size: 46, k: k0, tail: 'down' })
    const kb = K.pop01(t, T.brave, 0.3, 2.4) * (1 - ease.inCubic(prog(t, T.l2 - 0.3, T.l2)))
    if (kb > 0.01) K.bubble(HX + 150, 880, 'no, thank you.', { size: 50, k: kb, color: '#8a2a7e' })
    const k2 = K.pop01(t, T.again, 0.3, 2.4) * K_out(t)
    if (k2 > 0.01) K.bubble(HX + 150, 880, 'no, thanks!', { size: 52, k: k2, color: '#8a2a7e' })
    K.sparkles(t, HX + 150, 880, T.again + 0.05, 8, 200, 0.4, [GOLD, ACC, BONE])
    K.sparkles(t, 800, 610, T.status + 0.05, 10, 220, 0.1, ['#7dffb8', GOLD, BONE])
    // drum roll dots
    if (t > T.roll[0] && t < T.roll[1]) {
      const n = 1 + Math.floor(prog(t, ...T.roll) * 3)
      x.save(); x.fillStyle = BONE; x.font = `800 64px ${INTER}`; x.textAlign = 'center'
      x.fillText('.'.repeat(n), HX + 150, 770); x.restore()
    }
  },
  cues: [
    ['tick', 0.2, 0.02], ['tick', 0.5, 0.02], ['tick', 0.8, 0.02], ['pop', 1.2, 739.99, 0.03, 0.2],
    ['pop', T.brave, 880, 0.045, 0], ...Array.from({ length: 10 }, (_, i) => ['tick', +(T.roll[0] + i * 0.08).toFixed(2), 0.03 + i * 0.003]),
    ['bell', T.status, 1567.98, 0.04, 1.2, 0.3], ['glitter', T.status, T.status + 0.5], ['pop', T.peek, 1318.51, 0.03, 0],
    ['whoosh', T.fold[0], 0.4, 0.03], ['tick', T.fold[1], 0.05],
    ['whoosh', T.clip - 0.05, 0.3, 0.03], ...T.ticks.map((v, i) => ['pop', v, [987.77, 1174.66, 1567.98][i], 0.04, -0.3]),
    ['pop', T.again, 1174.66, 0.045, 0], ['glitter', T.again, T.again + 0.4], ...[]],
  cuts: [{ t: T.cut, kind: 'flip' }],
})

export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
