// nole12: ONE-LINE ADVICE FOR YOUR SIGN, "Pisces, when the first snow is too pretty." (11 s vertical, star_advice
// trial, music: lofi · Eb). Story 0–8.6, then the shared end card. Format: ../../nole01/scenes/olkit.js.
//   0.0–4.1   "*Pisces*, when the first | snow is too *pretty.*"  Pisces at a frosty window, already crying, snow
//             falling outside. At 1.8 the phone pings: "come see the snow with me?"  Pisces cries harder (fountains).
//   4.1       white blink (no card cut).   4.1–8.6  THE STARS: "Cry a little. Then | *go see it.*"  Pisces, in a scarf, hops out
//             into the snow beside the date, happy tears still going.
import { makeOneLine, miniPhone, cloud, table, bubble, box, R, label, shadow, sparkles, hearts, snow, drawBits, HEART, starFrame, inSprite, tearsCells, shadesCells, scarfCells, tissues, prog, clamp, lerp, ease, pop01, outK, INK, BONE, GOLD, RED, PINK, LAV, SKYB, MINT, INTER, MONO, SERIF, r3 } from '../../nole01/scenes/olkit.js'
function sit(x, t, S) {
  const { hero, pisces } = S
  // the window
  box(x, 220, 560, 640, 560, '#1a2450', { b: 10 })
  x.save(); x.beginPath(); x.rect(220, 560, 640, 560); x.clip(); snow(x, t, { x0: 220, y0: 560, w: 640, h: 560, n: 50 }); x.restore()
  R(x, INK, 532, 560, 16, 560); R(x, INK, 220, 832, 640, 16)
  R(x, '#e9eef8', 210, 1100, 660, 30); R(x, 'rgba(255,255,255,0.18)', 220, 1060, 640, 60)
  pisces(x, t, { x: 400, y: 1250, s: 280, hops: [-0.1, 1.85] }, t > 1.85 ? 3 : 2, 'sparkle', [0.4, -1])
  tissues(x, 600, 1360, 90)
  miniPhone(x, t, { cx: 820, cy: 1300, w: 300, h: 340, rot: 0.08, k: pop01(t, 1.75, 0.3, 2.2), title: 'THEM ♡', size: 22, buzz: [1.8], msgs: [{ at: 1.8, side: 'L', text: 'come see the snow with me?' }] })
}
function after(x, t, S) {
  const { pisces, date, ok, T } = S
  const hk = pop01(t, T.heroIn, 0.38, 2.1) * ok
  snow(x, t, { y0: 700, h: 900, n: 40, alpha: 0.6 })
  shadow(x, 560, 1340, 200 * hk); shadow(x, 820, 1320, 170 * hk)
  const o = { x: 560, y: 1190, s: 220, pop: hk, hops: [T.heroIn + 0.3, T.react, T.react + 0.45, T.react + 0.9] }
  const F = pisces(x, t, o, 2, 'happy', [1, 0])
  inSprite(x, F, () => scarfCells(x, '#e8344e', '#ffffff'))
  date(x, t, { x: 830, y: 1170, s: 190, pop: hk, mood: 'happy', look: [-1, 0], hops: [T.react + 0.2] })
  hearts(x, t, T.react + 0.3, 690, 1030, { n: 4, spread: 60 })
}
const EP = makeOneLine({
  id: 'nole12', sign: 'pisces', name: 'Pisces', len: 13, date: 'virgo',
  hook: '*Pisces*, when the first | snow is too *pretty.*',
  line: 'Cry a little. Then | *go see it.*',
  sit, after, tagX: 560, lineAccent: 140,
  cues: [['pop', 1.8, 1318.51, 0.045, 0.4], ['pop', 1.88, 1760, 0.03, 0.4], ['pluck', 1.95, 659.25, 0.03, 0.6, -0.2]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const CUT = EP.T.cut
