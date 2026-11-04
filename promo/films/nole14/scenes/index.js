// nole14: ONE-LINE ADVICE FOR YOUR SIGN, "Taurus, when they ask for a bite." (12 s vertical, star_advice trial,
// music: jazzy · G). Story 0–7.6, then the shared end card. Format: ../../nole01/scenes/olkit.js.
//   0.0–3.6   "*Taurus*, when they ask | for a *bite.*"  Taurus hugs a plate of holiday cake; the date's fork inches in
//             ("one bite?"). At 1.8 Taurus swings the plate away, squinting.
//   3.6       card flip.   3.6–7.6  THE STARS: "Share the bite. | *Keep* the plate."  Taurus hands over one forkful,
//             keeps the plate; both beam.  Pisces cries at the sharing.
import { makeOneLine, miniPhone, cloud, table, bubble, box, R, label, shadow, sparkles, hearts, snow, drawBits, HEART, starFrame, inSprite, tearsCells, shadesCells, scarfCells, tissues, prog, clamp, lerp, ease, pop01, outK, INK, BONE, GOLD, RED, PINK, LAV, SKYB, MINT, INTER, MONO, SERIF, r3 } from '../../nole01/scenes/olkit.js'
const CAKE = ['......WW', '....WWRW', '..WWBBBB', 'WWBBBBBB', 'CCCCCCCC', 'BBBBBBBB', 'CCCCCCCC']
const CAKEC = { W: '#ffffff', R: '#e8344e', B: '#8a5a3c', C: '#fff1c8' }
function plate(x, cx, cy, k = 1) {
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 40, 130, 30, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = BONE; x.beginPath(); x.ellipse(0, 36, 120, 24, 0, 0, Math.PI * 2); x.fill()
  drawBits(x, CAKE, CAKEC, 0, -6, 16)
  x.restore()
}
function fork(x, tipX, tipY, rot, bit = false) {
  x.save(); x.translate(tipX, tipY); x.rotate(rot)
  R(x, INK, 0, -10, 240, 20); R(x, '#c9c3dd', 4, -5, 232, 10)
  for (let i = 0; i < 3; i++) { R(x, INK, -40, -16 + i * 12, 44, 8); R(x, '#c9c3dd', -36, -14 + i * 12, 40, 4) }
  if (bit) drawBits(x, ['WW', 'BB', 'CC'], CAKEC, -30, -26, 12)
  x.restore()
}
function sit(x, t, S) {
  const { hero, date } = S
  const sw = ease.inOutCubic(prog(t, 1.8, 2.1))
  shadow(x, 330, 1380, 230)
  hero(x, t, { x: 330, y: 1150, s: 260, mood: t > 1.8 ? 'squint' : 'sparkle', look: t > 1.8 ? [1, 0] : [0, 1], hops: [-0.1, 1.8] })
  plate(x, lerp(420, 230, sw), 1270, 1)
  fork(x, lerp(720, 500, ease.inOutCubic(prog(t, 0, 1.8))) + 200 * sw, 1180, 0.12)
  shadow(x, 860, 1380, 170)
  date(x, t, { x: 880, y: 1170, s: 190, mood: t > 2.1 ? 'wide' : 'sparkle', look: [-1, 0.5] })
  bubble(x, t, 800, 960, 0.5, 3.6, 'one bite?', { size: 30 })
}
function after(x, t, S) {
  const { hero, date, ok, T } = S
  const hk = pop01(t, T.heroIn, 0.38, 2.1) * ok
  shadow(x, 560, 1360, 200 * hk); shadow(x, 840, 1340, 170 * hk)
  hero(x, t, { x: 540, y: 1180, s: 210, pop: hk, mood: t > T.react ? 'happy' : 'neutral', look: [1, 0.3], hops: [T.heroIn + 0.3, T.react, T.react + 0.8] })
  plate(x, 500, 1290, 0.75 * hk)
  const p = ease.inOutCubic(prog(t, T.react, T.react + 0.6))
  if (hk > 0.5) fork(x, lerp(560, 760, p), lerp(1240, 1150, p), lerp(0.1, -0.3, p), p < 1)
  date(x, t, { x: 850, y: 1160, s: 190, pop: hk, mood: t > T.react + 0.6 ? 'heart' : 'sparkle', look: [-1, 0], hops: [T.react + 0.6, T.react + 1.0] })
  label(x, 'MY PLATE', 500, 1370, { size: 20, col: GOLD, alpha: clamp(hk) })
}
const EP = makeOneLine({
  id: 'nole14', sign: 'taurus', name: 'Taurus', len: 12, date: 'scorpio',
  hook: '*Taurus*, when they ask | for a *bite.*',
  line: 'Share the bite. | *Keep* the plate.',
  sit, after, tagX: 540, tagY: 1410,
  cues: [['pop', 0.5, 880, 0.035, 0.4], ['whoosh', 1.8, 0.3, 0.035], ['tick', 2.1, 0.05], ['pluck', 6.25, 1318.51, 0.035, 0.5, 0.3]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const CUT = EP.T.cut
