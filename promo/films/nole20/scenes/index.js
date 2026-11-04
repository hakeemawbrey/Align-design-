// nole20: ONE-LINE ADVICE FOR YOUR SIGN, "Scorpio, trying not to laugh." (10 s vertical, star_advice trial,
// music: synthwave · Am). Story 0–7.6, then the shared end card. Format: ../../nole01/scenes/olkit.js.
//   0.0–3.6   "*Scorpio*, trying | not to *laugh.*"  Scorpio in dark shades holds a perfectly straight face while the date
//             tells a joke ("…so the penguin says—"). It trembles; at 1.9 a "*snrk*" escapes and the shades slip.
//   3.6       white blink (no card cut).   3.6–7.6  THE STARS: "Let them *see* | you laugh."  Scorpio laughs out loud (HA HA HA),
//             shades up on its head; the date glows: "you LAUGHED!"  Pisces cries laughing.
import { makeOneLine, miniPhone, cloud, table, bubble, box, R, label, shadow, sparkles, hearts, snow, drawBits, HEART, starFrame, inSprite, tearsCells, shadesCells, scarfCells, tissues, prog, clamp, lerp, ease, pop01, outK, drawStarChar, INK, BONE, GOLD, RED, PINK, LAV, SKYB, MINT, INTER, MONO, SERIF, r3 } from '../../nole01/scenes/olkit.js'
function sit(x, t, S) {
  const { hero, date } = S
  shadow(x, 310, 1360, 230)
  const trem = t > 1.0 ? 0.03 * Math.sin(t * 40) * clamp((t - 1.0) * 2) : 0
  const o = { x: 310, y: 1180, s: 270, mood: 'neutral', look: [0, 0], squash: trem, hops: [1.9] }
  hero(x, t, o)
  const F = starFrame(o.x, o.y, o.s, t, o)
  const slip = ease.outBack(clamp((t - 1.9) / 0.3))
  inSprite(x, F, () => { x.save(); x.translate(0, slip * 3.5); x.rotate(slip * 0.12); shadesCells(x, 0); x.restore() })
  if (t > 1.9) label(x, '*snrk*', 330, 940, { size: 36, col: GOLD, font: INTER, weight: 800, alpha: clamp((t - 1.9) * 5) * (1 - clamp((t - 3.2) * 3)) })
  shadow(x, 800, 1360, 200)
  date(x, t, { x: 800, y: 1190, s: 220, mood: 'happy', look: [-1, 0], hops: [0.2, 0.6, 1.0, 1.4] })
  bubble(x, t, 770, 980, -1, 3.6, '…so the penguin says—', { size: 28, tail: 0.3 })
}
function after(x, t, S) {
  const { hero, date, ok, T } = S
  const hk = pop01(t, T.heroIn, 0.38, 2.1) * ok
  shadow(x, 560, 1340, 200 * hk); shadow(x, 840, 1330, 180 * hk)
  const laugh = t > T.react ? 0.06 * Math.sin(t * 30) : 0
  const o = { x: 560, y: 1190, s: 220, pop: hk, mood: t > T.react ? 'happy' : 'neutral', look: [0, 0], squash: laugh, hops: [T.heroIn + 0.3, T.react, T.react + 0.3, T.react + 0.6] }
  hero(x, t, o)
  const F = starFrame(o.x, o.y, o.s, t, o)
  if (hk > 0.3) inSprite(x, F, () => shadesCells(x, 1))
  ;['HA', 'HA', 'HA'].forEach((s, i) => { const k = pop01(t, T.react + i * 0.25, 0.2, 3); if (k > 0.01) label(x, s, 420 + i * 90, 1000 - i * 50, { size: 40 * k, col: GOLD, font: INTER, weight: 800, rot: (i - 1) * 0.15 }) })
  date(x, t, { x: 850, y: 1160, s: 190, pop: hk, mood: t > T.react + 0.6 ? 'heart' : 'happy', look: [-1, 0], glow: t > T.react + 0.6 ? 1.5 : 1, hops: [T.react + 0.6] })
  bubble(x, t, 840, 980, T.react + 0.7, T.out[1], 'you LAUGHED!', { size: 28 })
}
const EP = makeOneLine({
  id: 'nole20', sign: 'scorpio', name: 'Scorpio', len: 12, date: 'gemini',
  hook: '*Scorpio*, trying | not to *laugh.*',
  line: 'Let them *see* | you laugh.',
  sit, after, tagX: 560,
  cues: [['pop', 1.9, 1567.98, 0.045, -0.2], ['tick', 1.92, 0.05], ['whoosh', 1.95, 0.2, 0.02], ...[0, 0.25, 0.5].map(d => ['pop', r3(5.2 + d), 1174.66, 0.03, -0.2])],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const CUT = EP.T.cut
