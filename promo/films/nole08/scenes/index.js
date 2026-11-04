// nole08: ONE-LINE ADVICE FOR YOUR SIGN, "Scorpio, when they say 'I'm fine'." (12 s vertical, star_advice trial,
// music: synthwave · Cm). Story 0–7.6, then the shared end card. Format: ../../nole01/scenes/olkit.js.
//   0.0–3.6   "*Scorpio*, when they say | 'I'm *fine.*'"  Scorpio squints at a phone: "i'm fine". Thought bubbles
//             pile up: "fine?" (0.7), "FINE??" (1.4), "fine…" (2.1).
//   3.6       card flip.   3.6–7.6  THE STARS: "Ask *once*. Then | believe them."  Scorpio sends "want to talk about
//             it? no pressure."  Reply: "later? thank you ♡".  Scorpio nods.  Pisces sniffles.
import { makeOneLine, miniPhone, cloud, table, bubble, box, R, label, shadow, sparkles, hearts, snow, drawBits, HEART, starFrame, inSprite, tearsCells, shadesCells, scarfCells, tissues, prog, clamp, lerp, ease, pop01, outK, INK, BONE, GOLD, RED, PINK, LAV, SKYB, MINT, INTER, MONO, SERIF, r3 } from '../../nole01/scenes/olkit.js'
function sit(x, t, S) {
  const { hero } = S
  shadow(x, 300, 1360, 230)
  hero(x, t, { x: 300, y: 1190, s: 270, mood: t > 1.4 && t < 2.0 ? 'wide' : 'squint', look: [1, -0.3], hops: [-0.1, 1.4] })
  miniPhone(x, t, { cx: 790, cy: 1000, w: 380, h: 440, rot: 0.05, title: 'THEM ♡', msgs: [{ at: -1, side: 'L', text: 'i’m fine' }] })
  bubble(x, t, 230, 940, 0.7, 4, 'fine?', { size: 32, rot: -0.06 })
  bubble(x, t, 430, 820, 1.4, 4, 'FINE??', { size: 40, col: '#ffd0da', rot: 0.05 })
  bubble(x, t, 220, 700, 2.1, 4, 'fine…', { size: 32, rot: -0.03 })
}
function after(x, t, S) {
  const { hero, ok, T } = S
  const hk = pop01(t, T.heroIn, 0.38, 2.1) * ok
  shadow(x, 560, 1340, 200 * hk)
  const nod = t > T.react + 1.0 ? 0.08 * Math.max(0, Math.sin((t - T.react - 1.0) * 10)) * (t < T.react + 1.6 ? 1 : 0) : 0
  hero(x, t, { x: 560, y: 1190, s: 220, pop: hk, mood: t > T.react + 0.9 ? 'happy' : 'neutral', look: [1, -0.5], hops: [T.heroIn + 0.3, T.react], squash: nod })
  miniPhone(x, t, { cx: 830, cy: 1000, w: 360, h: 460, rot: 0.05, k: pop01(t, T.heroIn + 0.1, 0.35, 2) * ok, title: 'THEM ♡', size: 24, msgs: [
    { at: -1, side: 'L', text: 'i’m fine' },
    { at: T.react, side: 'R', text: 'want to talk about it? no pressure.' },
    { at: T.react + 0.9, side: 'L', text: 'later? thank you ♡' },
  ] })
}
const EP = makeOneLine({
  id: 'nole08', sign: 'scorpio', name: 'Scorpio', len: 12,
  hook: '*Scorpio*, when they say | ‘I’m *fine.*’',
  line: 'Ask *once*. Then | believe them.',
  sit, after, tagX: 560,
  cues: [['pop', 0.7, 659.25, 0.035, -0.3], ['pop', 1.4, 880, 0.045, 0.1], ['tick', 1.42, 0.05], ['pop', 2.1, 587.33, 0.03, -0.2]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const CUT = EP.T.cut
