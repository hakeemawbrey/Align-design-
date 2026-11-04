// nole18: ONE-LINE ADVICE FOR YOUR SIGN, "Virgo, when their place is a little messy." (12 s vertical, star_advice
// trial, music: lofi · D). Story 0–7.6, then the shared end card. Format: ../../nole01/scenes/olkit.js.
//   0.0–3.6   "*Virgo*, when their place | is a little… *messy.*"  Virgo perches on the edge of a couch, a sock on the
//             cushion beside it. The date: "make yourself at home!" (0.6). Virgo's eye twitches (1.4, 1.9); a duster
//             appears in its hand (2.4).
//   3.6       card flip.   3.6–7.6  THE STARS: "Notice the *person*, | not the socks."  The duster goes down; Virgo
//             laughs at the date's story ("…and the goat ate my hat!"). The sock stays.  Pisces cries.
import { makeOneLine, miniPhone, cloud, table, bubble, box, R, label, shadow, sparkles, hearts, snow, drawBits, HEART, starFrame, inSprite, tearsCells, shadesCells, scarfCells, tissues, prog, clamp, lerp, ease, pop01, outK, INK, BONE, GOLD, RED, PINK, LAV, SKYB, MINT, INTER, MONO, SERIF, r3 } from '../../nole01/scenes/olkit.js'
const SOCK = ['.SS', '.SS', '.SS', 'SSS', 'SS.']
function couch(x, cx, y) {
  box(x, cx - 330, y - 160, 660, 120, '#5b4a8a', { b: 7, hi: '#6f5ca3' })
  box(x, cx - 330, y - 40, 660, 90, '#4a3b75', { b: 7 })
  box(x, cx - 370, y - 110, 60, 160, '#5b4a8a', { b: 7 }); box(x, cx + 310, y - 110, 60, 160, '#5b4a8a', { b: 7 })
}
function duster(x, cx, cy, rot, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  R(x, INK, -6, 0, 12, 120); R(x, '#a07850', -3, 0, 6, 118)
  for (let i = 0; i < 7; i++) R(x, [PINK, '#ffd0e0', LAV][i % 3], -40 + i * 12 - 8, -60 + Math.abs(i - 3) * 8, 16, 64 - Math.abs(i - 3) * 10)
  x.restore()
}
function sit(x, t, S) {
  const { hero, date } = S
  couch(x, 480, 1300)
  drawBits(x, SOCK, { S: '#f2c75c' }, 620, 1240, 14, { rot: 0.4 })
  R(x, '#c9a07a', 380, 1360, 10, 10); R(x, '#c9a07a', 420, 1372, 8, 8)
  const tw = (t > 1.4 && t < 1.55) || (t > 1.9 && t < 2.05)
  hero(x, t, { x: 270, y: 1100, s: 240, mood: tw ? 'squint' : 'wide', look: [1, 0.6], blink: false, hops: [-0.1, 2.4], squash: -0.04 })
  duster(x, 400, 1040, 0.4 + 0.15 * Math.sin(t * 14) * (t > 2.4 ? 1 : 0), pop01(t, 2.4, 0.3, 2.4))
  shadow(x, 880, 1420, 170)
  date(x, t, { x: 880, y: 1280, s: 190, mood: 'happy', look: [-1, -0.3], hops: [0.6] })
  bubble(x, t, 820, 1080, 0.6, 3.6, 'make yourself at home!', { size: 26 })
  if (tw) label(x, '!', 330, 960, { size: 50, col: GOLD, font: INTER, weight: 800 })
}
function after(x, t, S) {
  const { hero, date, ok, T } = S
  const hk = pop01(t, T.heroIn, 0.38, 2.1) * ok
  drawBits(x, SOCK, { S: '#f2c75c' }, 700, 1390, 10 * hk, { rot: 0.4 })
  duster(x, 450, 1360, 1.4, 0.7 * hk)
  shadow(x, 560, 1340, 200 * hk); shadow(x, 840, 1330, 180 * hk)
  hero(x, t, { x: 560, y: 1180, s: 220, pop: hk, mood: t > T.react + 0.4 ? 'happy' : 'neutral', look: [1, -0.2], hops: [T.heroIn + 0.3, T.react + 0.4, T.react + 0.7] })
  date(x, t, { x: 850, y: 1160, s: 190, pop: hk, mood: 'sparkle', look: [-1, 0], hops: [T.react - 0.2, T.react + 0.1] })
  bubble(x, t, 820, 970, T.react - 0.3, T.out[1], '…and the goat ate my hat!', { size: 24 })
}
const EP = makeOneLine({
  id: 'nole18', sign: 'virgo', name: 'Virgo', len: 12, date: 'sagittarius',
  hook: '*Virgo*, when their place | is a little… *messy.*',
  line: 'Notice the *person*, | not the socks.',
  sit, after, tagX: 560, lineSize: 96, lineAccent: 136,
  cues: [['pop', 0.6, 880, 0.035, 0.4], ['tick', 1.4, 0.05], ['tick', 1.9, 0.05], ['pop', 2.4, 1318.51, 0.04, -0.2], ['glitter', 2.4, 2.7]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const CUT = EP.T.cut
