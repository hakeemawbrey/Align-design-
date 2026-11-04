// nole06: ONE-LINE ADVICE FOR YOUR SIGN, "Virgo, when the gift is almost right." (12 s vertical, star_advice trial,
// music: jazzy · Bb). Story 0–7.6, then the shared end card. Format: ../../nole01/scenes/olkit.js.
//   0.0–3.6   "*Virgo*, when the gift is… | *almost* right."  Virgo holds up a lumpy hand-knit scarf, one end much longer.
//             At 1.6 a ruler slides in under the ends: "UNEVEN." Then the tag flips round: "made it myself ♡".
//   3.6       card flip.   3.6–7.6  THE STARS: "Love the *thought* | first."  Virgo wears the scarf, ends uneven,
//             delighted.  Pisces weeps at "made it myself".
import { makeOneLine, miniPhone, cloud, table, bubble, box, R, label, shadow, sparkles, hearts, snow, drawBits, HEART, starFrame, inSprite, tearsCells, shadesCells, scarfCells, tissues, prog, clamp, lerp, ease, pop01, outK, INK, BONE, GOLD, RED, PINK, LAV, SKYB, MINT, INTER, MONO, SERIF, r3 } from '../../nole01/scenes/olkit.js'
const SC = ['#5fb08a', '#efe6d6']
function scarf(x, cx, y, lenL, lenR) {
  // a striped knit strip draped over (cx, y): two hanging ends
  for (const [dx, len] of [[-70, lenL], [70, lenR]]) {
    R(x, INK, cx + dx - 34, y - 6, 68, len + 12)
    for (let j = 0; j < len; j += 22) R(x, SC[(j / 22) % 2], cx + dx - 28 + ((j / 22) % 3 === 1 ? 3 : 0), y + j, 56, Math.min(22, len - j))
    for (let i = 0; i < 4; i++) R(x, SC[1], cx + dx - 26 + i * 16, y + len, 6, 22)
  }
  R(x, INK, cx - 104, y - 26, 208, 40); R(x, SC[0], cx - 98, y - 20, 196, 28)
}
function sit(x, t, S) {
  const { hero } = S
  shadow(x, 320, 1330, 230)
  hero(x, t, { x: 320, y: 1150, s: 260, mood: t < 1.6 ? 'wide' : t < 2.5 ? 'squint' : 'sparkle', look: t < 2.5 ? [1, 0.6] : [1, 0.2], hops: [-0.1, 1.6, 2.55] })
  scarf(x, 730, 760, 220, 420)
  const rk = ease.outCubic(prog(t, 1.55, 1.9))
  if (rk > 0) {
    x.save(); x.translate(lerp(1400, 730, rk), 1260)
    box(x, -200, -24, 400, 48, '#f2d37a', { b: 5 })
    for (let i = 0; i <= 20; i++) R(x, INK, -196 + i * 19.6, -24, 3, i % 5 ? 14 : 24)
    x.restore()
    if (t > 1.95) label(x, 'UNEVEN.', 730, 1330, { size: 32, col: RED, alpha: clamp((t - 1.95) * 4) })
  }
  // the tag, flipping round at 2.5
  const f = Math.cos(Math.PI * clamp(prog(t, 2.4, 2.7)))
  x.save(); x.translate(560, 900); x.rotate(0.1 + 0.05 * Math.sin(t * 3)); x.scale(Math.abs(f), 1)
  R(x, INK, -4, -60, 6, 40); box(x, -110, -26, 220, 70, f > 0 ? '#c9a07a' : BONE, { b: 5 })
  if (f <= 0) { x.font = `800 26px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('made it myself ♡', 0, 9) }
  x.restore()
}
function after(x, t, S) {
  const { hero, ok, T } = S
  const hk = pop01(t, T.heroIn, 0.38, 2.1) * ok
  shadow(x, 640, 1340, 220 * hk)
  const o = { x: 640, y: 1180, s: 250, pop: hk, mood: t > T.react ? 'happy' : 'sparkle', look: [0, 0], hops: [T.heroIn + 0.3, T.react, T.react + 0.45] }
  hero(x, t, o)
  const F = starFrame(o.x, o.y, o.s, t, o)
  inSprite(x, F, () => {
    for (let i = 0; i < 14; i++) { x.fillStyle = INK; x.fillRect(11 + i, 23.6, 1, 3.4); x.fillStyle = SC[i % 4 < 2 ? 0 : 1]; x.fillRect(11 + i, 24, 1, 2.6) }
    x.fillStyle = INK; x.fillRect(21.6, 25.6, 3.8, 10.8); x.fillStyle = SC[0]; x.fillRect(22, 26, 3, 10)
    x.fillStyle = INK; x.fillRect(12.6, 25.6, 3.8, 4.8); x.fillStyle = SC[1]; x.fillRect(13, 26, 3, 4)
  })
  bubble(x, t, 700, 960, T.react + 0.1, T.out[1], 'i love it.', { size: 30 })
}
const EP = makeOneLine({
  id: 'nole06', sign: 'virgo', name: 'Virgo', len: 12,
  hook: '*Virgo*, when the gift is… | *almost* right.',
  line: 'Love the *thought* | first.',
  sit, after,
  cues: [['whoosh', 1.55, 0.35, 0.03], ['tick', 1.9, 0.05], ['pop', 1.95, 523.25, 0.04, 0], ['whoosh', 2.4, 0.3, 0.02], ['pluck', 2.6, 1174.66, 0.035, 0.5, 0.3]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const CUT = EP.T.cut
