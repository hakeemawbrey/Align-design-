// nole17: ONE-LINE ADVICE FOR YOUR SIGN, "Leo, when they plan the date." (12 s vertical, star_advice trial,
// music: pop · A). Story 0–7.6, then the shared end card. Format: ../../nole01/scenes/olkit.js.
//   0.0–3.6   "*Leo*, when *they* | plan the date."  Leo scribbles all over a clipboard (the date's plan) while the date
//             holds up a MY TURN sign. At 2.0 the date sighs ("…can I?").
//   3.6       card flip.   3.6–7.6  THE STARS: "Let them *lead* | tonight."  The date has the clipboard; Leo follows,
//             wide-eyed and delighted: "ooh, where are we going?!"  Pisces cries.
import { makeOneLine, miniPhone, cloud, table, bubble, box, R, label, shadow, sparkles, hearts, snow, drawBits, HEART, starFrame, inSprite, tearsCells, shadesCells, scarfCells, tissues, prog, clamp, lerp, ease, pop01, outK, INK, BONE, GOLD, RED, PINK, LAV, SKYB, MINT, INTER, MONO, SERIF, r3 } from '../../nole01/scenes/olkit.js'
function clipboard(x, t, cx, cy, rot, scribble) {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  box(x, -100, -130, 200, 260, '#b98a5a', { b: 6 }); R(x, BONE, -84, -104, 168, 222); R(x, '#8c86a8', -40, -140, 80, 26)
  x.font = `800 22px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('THE PLAN', 0, -80)
  for (let i = 0; i < 4; i++) R(x, '#8c86a8', -64, -40 + i * 36, 128, 8)
  if (scribble > 0) { x.strokeStyle = RED; x.lineWidth = 6; x.beginPath(); for (let i = 0; i < 24 * scribble; i++) { const px = -70 + (i * 37 % 140), py = -50 + (i * 23 % 150); i ? x.lineTo(px, py) : x.moveTo(px, py) } x.stroke() }
  x.restore()
}
function sit(x, t, S) {
  const { hero, date } = S
  shadow(x, 300, 1370, 230)
  hero(x, t, { x: 300, y: 1180, s: 260, mood: 'sparkle', look: [1, 0.5], hops: [-0.1, 0.5, 1.0, 1.5, 2.6] })
  clipboard(x, t, 440, 1180, 0.1 + 0.05 * Math.sin(t * 12), clamp(0.2 + t / 2.5))
  shadow(x, 820, 1370, 190)
  date(x, t, { x: 820, y: 1190, s: 210, mood: t > 2.0 ? 'squint' : 'neutral', look: [-1, 0.4], squash: t > 2.0 && t < 2.6 ? 0.08 : 0 })
  x.save(); x.translate(820, 880); x.rotate(-0.06); R(x, INK, -8, 40, 16, 110); box(x, -120, -50, 240, 100, BONE, { b: 6 })
  x.font = `800 40px ${INTER}`; x.fillStyle = RED; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('MY TURN', 0, 3); x.restore()
  bubble(x, t, 840, 1030, 2.05, 3.6, '…can I?', { size: 28 })
}
function after(x, t, S) {
  const { hero, date, ok, T } = S
  const hk = pop01(t, T.heroIn, 0.38, 2.1) * ok
  shadow(x, 560, 1350, 200 * hk); shadow(x, 840, 1340, 180 * hk)
  date(x, t, { x: 850, y: 1170, s: 200, pop: hk, mood: 'happy', look: [-1, 0], hops: [T.react] })
  if (hk > 0.3) clipboard(x, t, 900, 1250, -0.1, 0)
  hero(x, t, { x: 560, y: 1180, s: 220, pop: hk, mood: t > T.react ? 'sparkle' : 'neutral', look: [1, 0], hops: [T.heroIn + 0.3, T.react + 0.3, T.react + 0.7] })
  bubble(x, t, 520, 990, T.react + 0.3, T.out[1], 'ooh, where are we going?!', { size: 26, col: '#fff1a8' })
}
const EP = makeOneLine({
  id: 'nole17', sign: 'leo', name: 'Leo', len: 12, date: 'aquarius',
  hook: '*Leo*, when *they* | plan the date.',
  line: 'Let them *lead* | tonight.',
  sit, after, tagX: 560,
  cues: [...Array.from({ length: 10 }, (_, i) => ['tick', r3(0.15 + i * 0.2), 0.02]), ['pluck', 2.05, 440, 0.03, 0.6, 0.4]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const CUT = EP.T.cut
