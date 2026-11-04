// nole03: ONE-LINE ADVICE FOR YOUR SIGN, "Gemini, when you're both mid-story." (13 s vertical, star_advice trial,
// music: chiptune · A). Story 0–8.6, then the shared end card. Format: ../../nole01/scenes/olkit.js.
//   0.0–4.1   "*Gemini*, when you're both | *mid-story.*"  Gemini and its date talk at once; their bubbles collide in the
//             middle. Gemini's keeps growing ("and THEN—", "wait, AND—"), the date's shrinks ("so my sister—", "so…").
//   4.1       card flip.   4.1–8.6  THE STARS: "Let them *finish* | the story."  Gemini leans in, the date finishes
//             ("…and she said YES!"), Gemini: "NO WAY!"  Pisces cries at the plot twist.
import { makeOneLine, miniPhone, cloud, table, bubble, box, R, label, shadow, sparkles, hearts, snow, drawBits, HEART, starFrame, inSprite, tearsCells, shadesCells, scarfCells, tissues, prog, clamp, lerp, ease, pop01, outK, INK, BONE, GOLD, RED, PINK, LAV, SKYB, MINT, INTER, MONO, SERIF, r3 } from '../../nole01/scenes/olkit.js'
function sit(x, t, S) {
  const { hero, date } = S
  shadow(x, 280, 1330, 220); shadow(x, 800, 1330, 200)
  hero(x, t, { x: 280, y: 1150, s: 270, mood: t > 2.2 ? 'wide' : 'happy', look: [1, 0], hops: [-0.15, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5] })
  const sh = t > 2.4 ? 1 : 0
  date(x, t, { x: 800, y: 1170, s: 230, mood: t > 2.4 ? 'neutral' : 'happy', look: [-1, 0], hops: [-0.05, 0.7, 1.4], squash: sh * 0.08 })
  // the colliding bubbles: Gemini's grows, the date's shrinks
  const g = lerp(1, 1.35, ease.inOutCubic(prog(t, 1.8, 3.2))), d = lerp(1, 0.6, ease.inOutCubic(prog(t, 1.8, 3.2)))
  const gt = t < 1.9 ? 'and THEN—' : 'wait, AND—'
  const dt = t < 1.9 ? 'so my sister—' : 'so…'
  bubble(x, t, 380, 880 - (g - 1) * 60, -1, 9, gt, { size: 40 * g, tail: -0.6, col: '#fff1a8', rot: -0.04 })
  bubble(x, t, 760, 990 + 6 * Math.sin(t * 20) * (t > 1.9 ? 1 : 0), -1, 9, dt, { size: 36 * d, tail: 0.5, rot: 0.05 })
  // impact stars where the bubbles meet
  for (let i = 0; i < 3; i++) { const p = (t * 2 + i / 3) % 1; label(x, '✶', 600 + Math.cos(i * 2.1) * 60 * p, 930 + Math.sin(i * 2.1) * 60 * p, { size: 34, col: GOLD, alpha: 1 - p }) }
}
function after(x, t, S) {
  const { hero, date, ok, T } = S
  const hk = pop01(t, T.heroIn, 0.38, 2.1) * ok
  shadow(x, 560, 1340, 200 * hk); shadow(x, 820, 1300, 180 * hk)
  hero(x, t, { x: 560, y: 1190, s: 220, pop: hk, mood: t > T.react + 0.6 ? 'wide' : 'happy', look: [1, -0.4], hops: [T.heroIn + 0.3, T.react + 0.6, T.react + 1.0] })
  date(x, t, { x: 830, y: 1150, s: 200, pop: hk, mood: 'sparkle', look: [-1, 0], hops: [T.react - 0.2, T.react + 0.1] })
  bubble(x, t, 800, 960, T.react - 0.3, T.out[1], '…and she said YES!', { size: 28, tail: 0.3 })
  bubble(x, t, 470, 1010, T.react + 0.6, T.out[1], 'NO WAY!', { size: 34, col: '#fff1a8', tail: 0.2 })
  sparkles(x, t, 560, 1160, T.react + 0.6, 8, 150, 3)
}
const EP = makeOneLine({
  id: 'nole03', sign: 'gemini', name: 'Gemini', len: 13,
  hook: '*Gemini*, when you’re both | *mid-story.*',
  line: 'Let them *finish* | the story.',
  sit, after, tagX: 560, lineAccent: 140,
  cues: [...Array.from({ length: 8 }, (_, i) => ['pop', r3(0.3 + i * 0.45), [880, 659.25][i % 2], 0.022, i % 2 ? 0.3 : -0.3]), ['tick', 1.9, 0.04], ['pop', 1.9, 1318.51, 0.035, -0.3], ['pop', 7.0, 1567.98, 0.04, -0.2]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const CUT = EP.T.cut
