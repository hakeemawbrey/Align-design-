// nole21: ONE-LINE ADVICE FOR YOUR SIGN, "Sagittarius, when you were a little too honest." (11 s vertical,
// star_advice trial, music: funk · C). Story 0–8.6, then the shared end card. Format: ../../nole01/scenes/olkit.js.
//   0.0–4.1   "*Sagittarius*, when you were | a little *too* honest."  Sag mid-sentence: "your sweater is… a LOT."
//             The date (in a very busy holiday sweater) looks down at it (1.6) and wilts (2.2).
//   4.1       white blink (no card cut).   4.1–8.6  THE STARS: "Honest *and* gentle. | Both."  Sag: "a lot of FUN. i like it on you."
//             The date beams.  Pisces cries.
import { makeOneLine, miniPhone, cloud, table, bubble, box, R, label, shadow, sparkles, hearts, snow, drawBits, HEART, starFrame, inSprite, tearsCells, shadesCells, scarfCells, tissues, prog, clamp, lerp, ease, pop01, outK, drawStarChar, INK, BONE, GOLD, RED, PINK, LAV, SKYB, MINT, INTER, MONO, SERIF, r3 } from '../../nole01/scenes/olkit.js'
function sweater(x, F) {
  inSprite(x, F, () => {
    for (let j = 22; j < 30; j++) for (let i = 9; i < 27; i++) {
      if (Math.abs(i - 18) > 9 - (j - 22) * 0.2) continue
      x.fillStyle = (i + j) % 4 === 0 ? '#ffffff' : (j % 3 === 0 ? '#3fae6a' : '#e8344e'); x.fillRect(i, j, 1, 1)
    }
  })
}
function sit(x, t, S) {
  const { hero, date } = S
  shadow(x, 290, 1370, 230)
  hero(x, t, { x: 290, y: 1190, s: 260, mood: t > 2.2 ? 'wide' : 'happy', look: [1, 0], hops: [-0.2, 0.4, 0.8, 2.2] })
  bubble(x, t, 330, 960, -1, 4.1, 'your sweater is… a LOT.', { size: 30, tail: -0.4 })
  shadow(x, 800, 1370, 210)
  const wilt = 0.12 * ease.outCubic(prog(t, 2.2, 2.6))
  const o = { x: 800, y: 1190, s: 240, mood: t > 1.6 ? 'neutral' : 'happy', look: t > 1.6 ? [0, 1] : [-1, 0], squash: wilt, glow: 1 - wilt * 3 }
  date(x, t, o); sweater(x, starFrame(o.x, o.y, o.s, t, o))
  if (t > 2.3) label(x, '…oh.', 820, 1020, { size: 30, col: BONE, alpha: clamp((t - 2.3) * 4) })
}
function after(x, t, S) {
  const { hero, date, ok, T } = S
  const hk = pop01(t, T.heroIn, 0.38, 2.1) * ok
  shadow(x, 540, 1340, 200 * hk); shadow(x, 840, 1330, 190 * hk)
  hero(x, t, { x: 540, y: 1190, s: 210, pop: hk, mood: 'happy', look: [1, 0], hops: [T.heroIn + 0.3, T.react] })
  const o = { x: 850, y: 1160, s: 200, pop: hk, mood: t > T.react + 0.9 ? 'sparkle' : 'neutral', look: [-1, 0], hops: [T.react + 0.9, T.react + 1.3] }
  date(x, t, o); if (hk > 0.3) sweater(x, starFrame(o.x, o.y, o.s, t, o))
  bubble(x, t, 560, 990, T.react, T.out[1], 'a lot of FUN. i like it on you.', { size: 24, col: '#fff1a8' })
  hearts(x, t, T.react + 1.0, 850, 1000, { n: 4, spread: 60 })
}
const EP = makeOneLine({
  id: 'nole21', sign: 'sagittarius', name: 'Sagittarius', len: 13, date: 'taurus',
  hook: '*Sagittarius*, when you were | a little *too* honest.',
  line: 'Honest *and* gentle. | Both.',
  sit, after, tagX: 540,
  cues: [['pluck', 1.6, 659.25, 0.03, 0.4, 0.3], ['whoosh', 2.2, 0.4, 0.02], ['pluck', 2.3, 523.25, 0.03, 0.7, 0.3]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const CUT = EP.T.cut
