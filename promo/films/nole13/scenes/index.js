// nole13: ONE-LINE ADVICE FOR YOUR SIGN, "Aries, when they're slow to share." (12 s vertical, star_advice trial,
// music: funk · E). Story 0–7.6, then the shared end card. Format: ../../nole01/scenes/olkit.js.
//   0.0–3.6   "*Aries*, when they're | *slow* to share."  Aries bounces beside a big stopwatch, racing it; the date holds
//             a little closed door. Aries knocks (1.5, 1.9): KNOCK KNOCK. The door stays shut.
//   3.6       card flip.   3.6–7.6  THE STARS: "Some hearts open | *slowly.*"  Aries sits down, calm; the little door
//             creaks open on a heart.  Pisces cries.
import { makeOneLine, miniPhone, cloud, table, bubble, box, R, label, shadow, sparkles, hearts, snow, drawBits, HEART, starFrame, inSprite, tearsCells, shadesCells, scarfCells, tissues, prog, clamp, lerp, ease, pop01, outK, INK, BONE, GOLD, RED, PINK, LAV, SKYB, MINT, INTER, MONO, SERIF, r3 } from '../../nole01/scenes/olkit.js'
function stopwatch(x, t, cx, cy, s = 1) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  R(x, INK, -22, -128, 44, 34); R(x, '#c9c3dd', -14, -122, 28, 22)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 104, 0, Math.PI * 2); x.fill()
  x.fillStyle = BONE; x.beginPath(); x.arc(0, 0, 92, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; R(x, INK, Math.cos(a) * 76 - 4, Math.sin(a) * 76 - 4, 8, 8) }
  const a = Math.floor(t * 6) / 6 * Math.PI * 2 * 0.5 - Math.PI / 2
  x.strokeStyle = RED; x.lineWidth = 8; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(a) * 70, Math.sin(a) * 70); x.stroke()
  x.restore()
}
function door(x, cx, cy, open, k = 1) {
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -50, -70, 100, 140, '#3a2d66', { b: 6 })
  if (open > 0) drawBits(x, HEART, { H: '#ff5c8a' }, 0, 0, 11)
  x.save(); x.translate(-50, 0); x.scale(1 - open * 0.85, 1)
  box(x, 0, -70, 100, 140, '#b98a5a', { b: 5, hi: '#cfa26f' }); R(x, GOLD, 78, -6, 12, 12)
  x.restore(); x.restore()
}
function sit(x, t, S) {
  const { hero, date } = S
  stopwatch(x, t, 300, 820, 1)
  shadow(x, 300, 1370, 230)
  hero(x, t, { x: 300, y: 1190, s: 260, mood: t > 1.4 && t < 2.6 ? 'wide' : 'neutral', look: [1, 0], hops: [-0.1, 0.3, 0.7, 1.1, 1.5, 1.9, 2.3, 2.7, 3.1] })
  shadow(x, 800, 1370, 200)
  date(x, t, { x: 800, y: 1170, s: 220, mood: 'neutral', look: [-1, 0.4] })
  door(x, 800, 1300, 0, 0.9)
  ;[1.5, 1.9].forEach((a, i) => { const k = pop01(t, a, 0.2, 3) * outK(t, [a + 0.6, a + 0.8]); if (k > 0.01) label(x, 'KNOCK', 640 + i * 40, 1150 - i * 70, { size: 38 * k, col: GOLD, font: INTER, weight: 800, rot: i ? 0.12 : -0.1 }) })
}
function after(x, t, S) {
  const { hero, date, ok, T } = S
  const hk = pop01(t, T.heroIn, 0.38, 2.1) * ok
  shadow(x, 560, 1340, 200 * hk); shadow(x, 830, 1330, 180 * hk)
  hero(x, t, { x: 560, y: 1210, s: 210, pop: hk, mood: t > T.react ? 'happy' : 'neutral', look: [1, -0.2], squash: 0.12 * hk, hops: [T.heroIn + 0.3] })
  date(x, t, { x: 830, y: 1150, s: 200, pop: hk, mood: t > T.react + 0.6 ? 'happy' : 'neutral', look: [-1, 0.3], hops: [T.react + 0.6] })
  door(x, 830, 1280, ease.inOutCubic(prog(t, T.react + 0.1, T.react + 0.9)), 0.8 * hk)
  hearts(x, t, T.react + 0.8, 830, 1220, { n: 4, spread: 50 })
}
const EP = makeOneLine({
  id: 'nole13', sign: 'aries', name: 'Aries', len: 12, date: 'capricorn',
  hook: '*Aries*, when they’re | *slow* to share.',
  line: 'Some hearts open | *slowly.*',
  sit, after, tagX: 560,
  cues: [...Array.from({ length: 18 }, (_, i) => ['tick', r3(i / 6), 0.02]), ['tom', 1.5, 140, { gain: 0.2, decay: 0.15 }], ['tom', 1.9, 150, { gain: 0.2, decay: 0.15 }]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const CUT = EP.T.cut
