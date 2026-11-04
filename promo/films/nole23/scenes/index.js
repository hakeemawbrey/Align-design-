// nole23: ONE-LINE ADVICE FOR YOUR SIGN, "Aquarius, when they remember your fun fact." (12 s vertical, star_advice
// trial, music: chiptune · D). Story 0–7.6, then the shared end card. Format: ../../nole01/scenes/olkit.js.
//   0.0–3.6   "*Aquarius*, when they | remember your *fun fact.*"  The date holds up a little drawing of an octopus:
//             "three hearts, right?" (octopuses really do have three hearts). Aquarius startles; a glitchy "???" (1.6).
//   3.6       card flip.   3.6–7.6  THE STARS: "Someone *listens.* | Let it land."  Aquarius goes heart-eyed:
//             "you remembered!!"  Pisces cries.
import { makeOneLine, miniPhone, cloud, table, bubble, box, R, label, shadow, sparkles, hearts, snow, drawBits, HEART, starFrame, inSprite, tearsCells, shadesCells, scarfCells, tissues, prog, clamp, lerp, ease, pop01, outK, drawStarChar, INK, BONE, GOLD, RED, PINK, LAV, SKYB, MINT, INTER, MONO, SERIF, r3 } from '../../nole01/scenes/olkit.js'
const OCTO = ['..PPPP..', '.PPPPPP.', 'PPWPPWPP', 'PPPPPPPP', '.PPPPPP.', 'P.P.P.P.', '.P.P.P.P']
function drawing(x, t, cx, cy, s = 1, rot = 0) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  box(x, -110, -100, 220, 200, '#fbf4e6', { b: 6 })
  drawBits(x, OCTO, { P: '#ff8fb1', W: INK }, 0, -16, 16)
  ;[-40, 0, 40].forEach(dx => drawBits(x, HEART, { H: RED }, dx, 66, 4))
  x.restore()
}
function sit(x, t, S) {
  const { hero, date } = S
  shadow(x, 290, 1370, 230)
  const jit = t > 1.6 && t < 2.6 ? (Math.floor(t * 20) % 2 ? 6 : -6) : 0
  hero(x, t, { x: 290 + jit, y: 1190, s: 260, mood: 'wide', look: [1, 0], blink: false, hops: [0.05], squash: t < 0.3 ? -0.1 : 0 })
  if (t > 1.6) { const g = Math.floor(t * 12) % 3; label(x, '???', 290 + (g - 1) * 6, 930, { size: 52, col: [SKYB, PINK, GOLD][g], font: INTER, weight: 800 }) }
  shadow(x, 800, 1370, 200)
  date(x, t, { x: 800, y: 1200, s: 210, mood: 'happy', look: [-1, 0], hops: [-0.1, 0.5] })
  drawing(x, t, 760, 960, 1, -0.06 + 0.03 * Math.sin(t * 4))
  bubble(x, t, 760, 780, -1, 3.6, 'three hearts, right?', { size: 28 })
}
function after(x, t, S) {
  const { hero, date, ok, T } = S
  const hk = pop01(t, T.heroIn, 0.38, 2.1) * ok
  shadow(x, 560, 1340, 200 * hk); shadow(x, 850, 1340, 180 * hk)
  hero(x, t, { x: 560, y: 1190, s: 220, pop: hk, mood: t > T.react ? 'heart' : 'wide', look: [1, 0], hops: [T.heroIn + 0.3, T.react, T.react + 0.45] })
  date(x, t, { x: 860, y: 1180, s: 180, pop: hk, mood: 'happy', look: [-1, 0] })
  drawing(x, t, 860, 990, 0.6 * hk, 0.05)
  bubble(x, t, 560, 1000, T.react + 0.1, T.out[1], 'you remembered!!', { size: 28, col: '#c9f2ff' })
  hearts(x, t, T.react + 0.2, 560, 1080, { n: 5, spread: 90 })
}
const EP = makeOneLine({
  id: 'nole23', sign: 'aquarius', name: 'Aquarius', len: 12, date: 'cancer',
  hook: '*Aquarius*, when they | remember your *fun fact.*',
  line: 'Someone *listens.* | Let it land.',
  sit, after, tagX: 560,
  cues: [['pop', 0.05, 1567.98, 0.04, -0.3], ...Array.from({ length: 8 }, (_, i) => ['tick', r3(1.6 + i * 0.12), 0.025]), ['pop', 1.6, 2093, 0.03, -0.3]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const CUT = EP.T.cut
