// nole16: ONE-LINE ADVICE FOR YOUR SIGN, "Cancer, when they forgot the one-month." (11 s vertical, star_advice trial,
// music: dreamy · F). Story 0–8.6, then the shared end card. Format: ../../nole01/scenes/olkit.js.
//   0.0–4.1   "*Cancer*, when they forgot | your *one-month.*"  Cancer holds a tiny cake with a "1" candle; the flame
//             flickers, the wax drips, sad little notes drift up. The date bounces in (2.2): "hey! what's up?"
//   4.1       white blink (no card cut).   4.1–8.6  THE STARS: "Tell them it | *mattered.* Kindly."  Cancer: "it mattered to me."
//             The date: "I'm sorry. tell me about it?"  They share the cake.  Pisces cries.
import { makeOneLine, miniPhone, cloud, table, bubble, box, R, label, shadow, sparkles, hearts, snow, drawBits, HEART, starFrame, inSprite, tearsCells, shadesCells, scarfCells, tissues, prog, clamp, lerp, ease, pop01, outK, INK, BONE, GOLD, RED, PINK, LAV, SKYB, MINT, INTER, MONO, SERIF, r3 } from '../../nole01/scenes/olkit.js'
function cake(x, t, cx, cy, k = 1, lit = 1) {
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -90, -40, 180, 80, '#ff8fb1', { b: 6, hi: '#ffc0d4' }); R(x, '#ffffff', -90, -40, 180, 14)
  box(x, -10, -110, 20, 66, BONE, { b: 4 })
  x.font = `800 30px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('1', 0, -76)
  if (lit) { const f = 1 + 0.2 * Math.sin(t * 23); R(x, '#ffd23a', -7, -140 - 6 * f, 14, 24 * f); R(x, '#ff8a3a', -4, -132, 8, 12) }
  R(x, BONE, 8, -60 + (t * 8 % 20), 8, 12)
  x.restore()
}
const NOTE = ['..XX', '..X.', '..X.', 'XXX.', 'XXX.']
function sit(x, t, S) {
  const { hero, date } = S
  shadow(x, 330, 1380, 230)
  hero(x, t, { x: 330, y: 1160, s: 260, mood: t > 2.3 ? 'wide' : 'sparkle', look: t > 2.3 ? [1, 0] : [0, 1], hops: [-0.1, 2.3] })
  cake(x, t, 360, 1300, 1)
  for (let i = 0; i < 3; i++) { const p = ((t * 0.5 + i / 3) % 1); drawBits(x, NOTE, { X: LAV }, 200 + i * 60 + Math.sin(t * 2 + i) * 20, 960 - p * 260, 8, { alpha: Math.sin(Math.PI * p) }) }
  const dk = pop01(t, 2.2, 0.35, 2.2)
  if (dk > 0.01) { shadow(x, 830, 1370, 180 * dk); date(x, t, { x: 830, y: 1180, s: 210, pop: dk, mood: 'happy', look: [-1, 0], hops: [2.5, 2.9] }) }
  bubble(x, t, 820, 980, 2.5, 4.1, 'hey! what’s up?', { size: 30 })
}
function after(x, t, S) {
  const { hero, date, ok, T } = S
  const hk = pop01(t, T.heroIn, 0.38, 2.1) * ok
  shadow(x, 540, 1350, 200 * hk); shadow(x, 840, 1340, 180 * hk)
  hero(x, t, { x: 540, y: 1170, s: 210, pop: hk, mood: t > T.react + 1.0 ? 'happy' : 'neutral', look: [1, 0], hops: [T.heroIn + 0.3, T.react] })
  date(x, t, { x: 850, y: 1160, s: 190, pop: hk, mood: t > T.react + 0.9 ? 'sparkle' : 'wide', look: [-1, 0], hops: [T.react + 0.9] })
  cake(x, t, 700, 1320, 0.7 * hk, 1)
  bubble(x, t, 500, 990, T.react, T.out[1], 'it mattered to me.', { size: 26 })
  bubble(x, t, 820, 900, T.react + 0.9, T.out[1], 'I’m sorry. tell me about it?', { size: 24, col: '#fff1c8' })
}
const EP = makeOneLine({
  id: 'nole16', sign: 'cancer', name: 'Cancer', len: 13, date: 'sagittarius',
  hook: '*Cancer*, when they forgot | your *one-month.*',
  line: 'Tell them it | *mattered.* Kindly.',
  sit, after, tagX: 540, tagY: 1390, lineAccent: 140,
  cues: [['pluck', 0.4, 659.25, 0.02, 0.8, -0.3], ['pluck', 1.1, 587.33, 0.02, 0.8, -0.3], ['pluck', 1.8, 523.25, 0.02, 0.8, -0.3], ['pop', 2.2, 1174.66, 0.04, 0.4], ['pop', 2.5, 880, 0.03, 0.4]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const CUT = EP.T.cut
