// nole07: ONE-LINE ADVICE FOR YOUR SIGN, "Libra, when you said 'no worries'." (12 s vertical, star_advice trial,
// music: pop · D). Story 0–7.6, then the shared end card. Format: ../../nole01/scenes/olkit.js.
//   0.0–3.6   "*Libra*, when you said | 'no *worries!*'"  Libra smiles very hard at a phone: "sorry I forgot to call
//             back" → "no worries!!"  Grey worry clouds stack up behind it (0.6, 1.3, 2.0); the third drizzles on Libra.
//   3.6       card flip.   3.6–7.6  THE STARS: "Worries are allowed | *out loud.*"  Libra sends "actually, it bugged me
//             a little."  Reply: "thank you for telling me ♡".  Pisces cries.
import { makeOneLine, miniPhone, cloud, table, bubble, box, R, label, shadow, sparkles, hearts, snow, drawBits, HEART, starFrame, inSprite, tearsCells, shadesCells, scarfCells, tissues, prog, clamp, lerp, ease, pop01, outK, INK, BONE, GOLD, RED, PINK, LAV, SKYB, MINT, INTER, MONO, SERIF, r3 } from '../../nole01/scenes/olkit.js'
function worry(x, t, cx, cy, t0, rain) {
  const k = pop01(t, t0, 0.3, 2.4)
  if (k <= 0.01) return
  cloud(x, cx, cy + 4 * Math.sin(t * 3 + cx), 200, 110, k, { col: '#8c86a8' })
  label(x, '?', cx, cy + 6, { size: 52 * k, col: INK, font: INTER, weight: 800 })
  if (rain) for (let i = 0; i < 8; i++) { const p = ((t * 1.6 + i / 8) % 1); R(x, SKYB, cx - 70 + i * 20, cy + 60 + p * 200, 5, 14) }
}
function sit(x, t, S) {
  const { hero } = S
  worry(x, t, 170, 820, 0.6, false); worry(x, t, 420, 740, 1.3, false); worry(x, t, 300, 960, 2.0, true)
  shadow(x, 300, 1360, 230)
  hero(x, t, { x: 300, y: 1190, s: 270, mood: 'happy', look: [1, 0], hops: [-0.1, 0.6, 1.3, 2.0], squash: 0.04 * Math.sin(t * 14) })
  miniPhone(x, t, { cx: 790, cy: 960, w: 400, h: 520, rot: 0.05, title: 'THEM ♡', msgs: [
    { at: -1, side: 'L', text: 'sorry I forgot to call back' },
    { at: -1, side: 'R', text: 'no worries!!' },
  ] })
}
function after(x, t, S) {
  const { hero, ok, T } = S
  const hk = pop01(t, T.heroIn, 0.38, 2.1) * ok
  shadow(x, 560, 1340, 200 * hk)
  hero(x, t, { x: 560, y: 1190, s: 220, pop: hk, mood: t > T.react + 0.8 ? 'happy' : 'neutral', look: [1, -0.6], hops: [T.heroIn + 0.3, T.react, T.react + 0.8] })
  miniPhone(x, t, { cx: 830, cy: 1000, w: 360, h: 440, rot: 0.05, k: pop01(t, T.heroIn + 0.1, 0.35, 2) * ok, title: 'THEM ♡', size: 24, msgs: [
    { at: T.react, side: 'R', text: 'actually, it bugged me a little' },
    { at: T.react + 0.8, side: 'L', text: 'thank you for telling me ♡' },
  ] })
}
const EP = makeOneLine({
  id: 'nole07', sign: 'libra', name: 'Libra', len: 12, date: 'aquarius',
  hook: '*Libra*, when you said | ‘no *worries!*’',
  line: 'Worries are allowed | *out loud.*',
  sit, after, tagX: 560, lineAccent: 140,
  cues: [['pop', 0.6, 523.25, 0.035, -0.3], ['pop', 1.3, 587.33, 0.035, 0.1], ['pop', 2.0, 659.25, 0.04, -0.1], ['tick', 2.05, 0.03]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const CUT = EP.T.cut
