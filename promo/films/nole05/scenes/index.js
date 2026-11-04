// nole05: ONE-LINE ADVICE FOR YOUR SIGN, "Leo, when they didn't notice the haircut." (10 s vertical, star_advice
// trial, music: funk · G). Story 0–7.6, then the shared end card. Format: ../../nole01/scenes/olkit.js.
//   0.0–3.6   "*Leo*, when they didn't | notice the *haircut.*"  Leo mid-hair-flip (a golden swoosh + sparkles), the date
//             reading a menu. At 1.8 a bigger flip under a spotlight … the date: "hm?"
//   3.6       white blink (no card cut).   3.6–7.6  THE STARS: "Hints are quiet. | *Say* it."  Leo: "i got a haircut!"  The date:
//             "IT LOOKS GREAT!"  Pisces cries ("it does!!").
import { makeOneLine, miniPhone, cloud, table, bubble, box, R, label, shadow, sparkles, hearts, snow, drawBits, HEART, starFrame, inSprite, tearsCells, shadesCells, scarfCells, tissues, prog, clamp, lerp, ease, pop01, outK, INK, BONE, GOLD, RED, PINK, LAV, SKYB, MINT, INTER, MONO, SERIF, r3 } from '../../nole01/scenes/olkit.js'
function swoosh(x, t, cx, cy, t0, big) {
  const p = prog(t, t0, t0 + 0.5)
  if (p <= 0 || p >= 1) return
  x.save(); x.globalAlpha = 1 - p
  for (let i = 0; i < 9; i++) { const a = -2.6 + i * 0.28 + p * 1.2; R(x, i % 2 ? GOLD : '#ffe8a8', cx + Math.cos(a) * (big ? 190 : 150) - 10, cy + Math.sin(a) * (big ? 190 : 150) - 10, 20, 20) }
  x.restore()
}
function spot(x, a) {
  if (a <= 0) return
  x.save(); x.globalCompositeOperation = 'lighter'
  const g = x.createLinearGradient(0, 400, 0, 1350); g.addColorStop(0, `rgba(255,236,180,${0.04 * a})`); g.addColorStop(1, `rgba(255,236,180,${0.25 * a})`)
  x.fillStyle = g; x.beginPath(); x.moveTo(290, 430); x.lineTo(350, 430); x.lineTo(500, 1340); x.lineTo(140, 1340); x.closePath(); x.fill(); x.restore()
}
function sit(x, t, S) {
  const { hero, date } = S
  spot(x, clamp(prog(t, 1.75, 1.9)))
  shadow(x, 320, 1340, 230)
  hero(x, t, { x: 320, y: 1160, s: 280, mood: t > 2.5 ? 'wide' : 'sparkle', look: t > 2.5 ? [1, 0] : [0, 0], hops: [-0.05, 1.8], squash: t < 0.25 ? -0.08 : 0 })
  swoosh(x, t, 320, 1080, -0.2, false); swoosh(x, t, 320, 1080, 1.8, true)
  sparkles(x, t, 320, 1080, 1.82, 10, 200, 1, [GOLD, BONE])
  shadow(x, 790, 1340, 190)
  date(x, t, { x: 790, y: 1180, s: 220, mood: 'neutral', look: [0, 1], hops: [2.5] })
  x.save(); x.translate(790, 1350); x.rotate(0.05); box(x, -110, -70, 220, 140, BONE, { b: 6 }); R(x, '#3a2d66', -110, -70, 220, 34)
  x.font = `700 20px ${MONO}`; x.fillStyle = GOLD; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('MENU', 0, -53); x.restore()
  bubble(x, t, 790, 980, 2.5, 3.6, 'hm?', { size: 32 })
  if (t > 2.0) label(x, '✦ NEW CUT ✦', 320, 880, { size: 26, col: GOLD, alpha: clamp((t - 2) * 4) })
}
function after(x, t, S) {
  const { hero, date, ok, T } = S
  const hk = pop01(t, T.heroIn, 0.38, 2.1) * ok
  shadow(x, 560, 1340, 210 * hk); shadow(x, 830, 1310, 180 * hk)
  hero(x, t, { x: 560, y: 1180, s: 230, pop: hk, mood: t > T.react + 0.7 ? 'sparkle' : 'happy', look: [1, 0], hops: [T.heroIn + 0.3, T.react, T.react + 0.7] })
  date(x, t, { x: 840, y: 1160, s: 200, pop: hk, mood: t > T.react + 0.7 ? 'wide' : 'neutral', look: [-1, -0.3], hops: [T.react + 0.7, T.react + 1.0] })
  bubble(x, t, 500, 980, T.react, T.out[1], 'i got a haircut!', { size: 28, col: '#fff1a8' })
  bubble(x, t, 820, 900, T.react + 0.7, T.out[1], 'IT LOOKS GREAT!', { size: 28 })
  sparkles(x, t, 560, 1140, T.react + 0.75, 10, 170, 2, [GOLD, BONE])
}
const EP = makeOneLine({
  id: 'nole05', sign: 'leo', name: 'Leo', len: 12,
  hook: '*Leo*, when they didn’t | notice the *haircut.*',
  line: 'Hints are quiet. | *Say* it.',
  sit, after, tagX: 560,
  cues: [['whoosh', 0, 0.3, 0.03], ['whoosh', 1.8, 0.4, 0.04], ['glitter', 1.82, 2.2], ['tick', 1.75, 0.05], ['pop', 2.5, 659.25, 0.035, 0.4], ['pop', 6.15, 1318.51, 0.04, 0.3]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const CUT = EP.T.cut
