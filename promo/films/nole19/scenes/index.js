// nole19: ONE-LINE ADVICE FOR YOUR SIGN, "Libra, choosing the holiday gift." (12 s vertical, star_advice trial,
// music: house · Bb). Story 0–7.6, then the shared end card. Format: ../../nole01/scenes/olkit.js.
//   0.0–3.6   "*Libra*, choosing their | holiday *gift.*"  Libra stands under a big balance: a wrapped box on one pan,
//             a little snow globe on the other, tipping back and forth. At 1.8 a third gift (a mug) drops onto the left
//             pan and the beam wobbles wildly; Libra goes wide-eyed.
//   3.6       card flip.   3.6–7.6  THE STARS: "Pick the one that | made you *smile.*"  Libra holds up the snow globe:
//             "this one!"  Pisces cries at the snow globe.
import { makeOneLine, miniPhone, cloud, table, bubble, box, R, label, shadow, sparkles, hearts, snow, drawBits, HEART, starFrame, inSprite, tearsCells, shadesCells, scarfCells, tissues, prog, clamp, lerp, ease, pop01, outK, drawStarChar, INK, BONE, GOLD, RED, PINK, LAV, SKYB, MINT, INTER, MONO, SERIF, r3 } from '../../nole01/scenes/olkit.js'
function globe(x, t, cx, cy, s = 1) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  box(x, -50, 30, 100, 30, '#8a5a3c', { b: 5 })
  x.fillStyle = INK; x.beginPath(); x.arc(0, -10, 56, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#bfe8ff'; x.beginPath(); x.arc(0, -10, 50, 0, Math.PI * 2); x.fill()
  drawBits(x, ['..G..', '.GGG.', 'GGGGG', '..B..'], { G: '#3fae6a', B: '#8a5a3c' }, 0, 0, 10, { outline: null })
  x.fillStyle = '#fff'; for (let i = 0; i < 6; i++) { const a = t * 1.5 + i; x.fillRect(Math.cos(a * 1.3 + i) * 34, -30 + ((t * 30 + i * 14) % 60) - 10, 5, 5) }
  x.restore()
}
function giftBox(x, cx, cy, col, s = 1) { x.save(); x.translate(cx, cy); x.scale(s, s); box(x, -55, -45, 110, 90, col, { b: 6 }); R(x, GOLD, -8, -45, 16, 90); R(x, GOLD, -55, -8, 110, 16); x.restore() }
function mug(x, cx, cy) { box(x, cx - 40, cy - 45, 80, 90, BONE, { b: 6 }); R(x, INK, cx + 40, cy - 20, 26, 40); R(x, BONE, cx + 46, cy - 12, 12, 24); drawBits(x, HEART, { H: RED }, cx, cy, 6, { outline: null }) }
function sit(x, t, S) {
  const { hero } = S
  const wild = t > 1.8 ? Math.exp(-(t - 1.8) * 1.2) : 0
  const ang = 0.22 * Math.sin(t * 2.4) + (t > 1.8 ? 0.25 : 0) + 0.35 * wild * Math.sin((t - 1.8) * 16)
  const px = 540, py = 700
  R(x, INK, px - 10, py, 20, 300); R(x, '#c9a07a', px - 5, py, 10, 296); box(x, px - 90, 990, 180, 30, '#8a5a3c', { b: 6 })
  x.save(); x.translate(px, py); x.rotate(ang); box(x, -330, -10, 660, 20, '#c9a07a', { b: 6 }); x.restore()
  for (const d of [-1, 1]) {
    const ex = px + d * 320 * Math.cos(ang), ey = py + d * 320 * Math.sin(ang)
    R(x, INK, ex - 3, ey, 6, 130); box(x, ex - 110, ey + 130, 220, 18, '#c9a07a', { b: 5 })
    if (d < 0) { giftBox(x, ex - 40, ey + 85, '#e8344e', 0.9); if (t > 1.8) { const p = ease.inQuad(clamp((t - 1.5) / 0.3)); mug(x, ex + 55, lerp(ey - 400, ey + 82, p)) } }
    else globe(x, t, ex, ey + 70, 0.9)
  }
  shadow(x, 540, 1440, 220)
  hero(x, t, { x: 540, y: 1270, s: 230, mood: t > 1.85 ? 'wide' : 'neutral', look: [Math.sin(t * 2.4), -1], hops: [-0.1, 1.85] })
}
function after(x, t, S) {
  const { hero, ok, T } = S
  const hk = pop01(t, T.heroIn, 0.38, 2.1) * ok
  shadow(x, 620, 1340, 210 * hk)
  hero(x, t, { x: 620, y: 1190, s: 230, pop: hk, mood: t > T.react ? 'happy' : 'neutral', look: [1, -1], hops: [T.heroIn + 0.3, T.react, T.react + 0.45] })
  const gk = pop01(t, T.react, 0.35, 2.4) * ok
  if (gk > 0.01) globe(x, t, 820, 990, 1.2 * gk)
  bubble(x, t, 820, 850, T.react + 0.3, T.out[1], 'this one!', { size: 30, col: '#fff1a8' })
  sparkles(x, t, 820, 980, T.react + 0.05, 10, 140, 1, [SKYB, BONE, GOLD])
}
const EP = makeOneLine({
  id: 'nole19', sign: 'libra', name: 'Libra', len: 12,
  hook: '*Libra*, choosing their | holiday *gift.*',
  line: 'Pick the one that | made you *smile.*',
  sit, after, tagX: 620, lineAccent: 140,
  cues: [['tick', 0.65, 0.03], ['tick', 1.95, 0.03], ['whoosh', 1.5, 0.3, 0.03], ['tom', 1.8, 130, { gain: 0.22, decay: 0.15 }], ['pop', 1.82, 1318.51, 0.04, -0.3], ['glitter', 6.1, 6.5]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const CUT = EP.T.cut
