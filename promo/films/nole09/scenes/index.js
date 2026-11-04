// nole09: ONE-LINE ADVICE FOR YOUR SIGN, "Sagittarius, booking a trip on date two." (10 s vertical, star_advice trial,
// music: house · F). Story 0–7.6, then the shared end card. Format: ../../nole01/scenes/olkit.js.
//   0.0–3.6   "*Sagittarius*, booking | a trip on *date two.*"  Sag sits on an overstuffed suitcase, zipping, a ticket
//             waving in the air. At 1.8 the suitcase pops open and clothes fly. The date blinks: "we met tuesday."
//   3.6       white blink (no card cut).   3.6–7.6  THE STARS: "Take the trip. | *Later.*"  Sag pins the ticket to a board marked
//             SOMEDAY ♡.  Pisces cries at "someday".
import { makeOneLine, miniPhone, cloud, table, bubble, box, R, label, shadow, sparkles, hearts, snow, drawBits, HEART, starFrame, inSprite, tearsCells, shadesCells, scarfCells, tissues, prog, clamp, lerp, ease, pop01, outK, INK, BONE, GOLD, RED, PINK, LAV, SKYB, MINT, INTER, MONO, SERIF, r3 } from '../../nole01/scenes/olkit.js'
const CLOTH = [['#e8344e', -1.9], ['#7fd0ff', -1.4], ['#f2c75c', -0.9], ['#9fe6b0', -0.5], ['#ff8fb1', -2.3]]
function ticket(x, cx, cy, rot, k = 1) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  box(x, -90, -40, 180, 80, '#fff1c8', { b: 5 }); R(x, RED, -90, -40, 40, 80)
  x.font = `700 22px ${MONO}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('TICKET', 20, 2)
  x.restore()
}
function sit(x, t, S) {
  const { hero, date } = S
  const burst = t > 1.8
  // the suitcase
  const lid = burst ? -0.9 * ease.outBack(clamp((t - 1.8) / 0.3)) : 0
  box(x, 150, 1210, 360, 150, '#a35cf0', { b: 7, hi: '#c08bf5' })
  x.save(); x.translate(150, 1210); x.rotate(lid); box(x, 0, -70, 360, 70, '#8a48d8', { b: 7 }); x.restore()
  if (!burst) for (let i = 0; i < 4; i++) R(x, CLOTH[i][0], 190 + i * 80, 1196, 40, 18)
  else CLOTH.forEach(([c, a], i) => { const p = clamp((t - 1.8) / 1.2); R(x, c, 330 + Math.cos(a) * 520 * p - 20, 1190 + Math.sin(a) * 600 * p + 700 * p * p - 15, 46, 30) })
  hero(x, t, { x: 330, y: burst ? 1000 : 1060, s: 250, mood: burst ? 'wide' : 'happy', look: [0.6, 0.6], hops: [-0.1, 0.4, 0.9, 1.4, 1.8], squash: burst ? 0 : 0.1 })
  ticket(x, 520 + 10 * Math.sin(t * 5), 860, 0.2 * Math.sin(t * 4), 1)
  shadow(x, 840, 1360, 170)
  date(x, t, { x: 840, y: 1210, s: 190, mood: burst ? 'wide' : 'neutral', look: [-1, 0], hops: [2.4], blink: t > 2.2 && t < 2.35 ? 1 : undefined })
  bubble(x, t, 820, 1040, 2.4, 4, 'we met tuesday.', { size: 28 })
}
function after(x, t, S) {
  const { hero, ok, T } = S
  const hk = pop01(t, T.heroIn, 0.38, 2.1) * ok
  // the corkboard
  const bk = pop01(t, T.heroIn, 0.35, 2) * ok
  x.save(); x.translate(800, 960); x.scale(bk, bk)
  box(x, -150, -110, 300, 220, '#b98a5a', { b: 7, hi: '#cfa26f' })
  x.font = `800 30px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('SOMEDAY ♡', 0, -70)
  x.restore()
  const pk = ease.outCubic(prog(t, T.react, T.react + 0.4))
  if (bk > 0.5) { ticket(x, lerp(600, 800, pk), lerp(1080, 1000, pk), lerp(0.4, -0.06, pk), 0.9); if (pk >= 1) R(x, RED, 790, 960, 14, 14) }
  shadow(x, 560, 1340, 200 * hk)
  hero(x, t, { x: 560, y: 1190, s: 220, pop: hk, mood: t > T.react + 0.4 ? 'happy' : 'neutral', look: [1, -0.8], hops: [T.heroIn + 0.3, T.react, T.react + 0.45] })
  sparkles(x, t, 800, 1000, T.react + 0.4, 8, 120, 2)
}
const EP = makeOneLine({
  id: 'nole09', sign: 'sagittarius', name: 'Sagittarius', len: 12, date: 'cancer',
  hook: '*Sagittarius*, booking | a trip on *date two.*',
  line: 'Take the trip. | *Later.*',
  sit, after, tagX: 560,
  cues: [...[0.4, 0.9, 1.4].map(a => ['tick', a, 0.04]), ['boom', 1.8, 0.2], ['pop', 1.8, 1318.51, 0.05, 0], ['whoosh', 1.82, 0.5, 0.04], ['pop', 2.4, 659.25, 0.035, 0.4]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const CUT = EP.T.cut
