// ngfe07: 24 DAYS OF GREEN FLAGS, door 7: "Puts the phone face down at dinner." (18 s vertical, house · G)
//   hook "Dinner date. | *Where's their phone?*" · a candlelit table: the phone buzzes (BZZ BZZ), Libra flips it face
//   down without looking. Gemini, mid-story, beams: "wait, you're not gonna check that?" Libra: "it can wait. this
//   can't." The candle flares. Last: "*Face down.* Eyes up."
import { makeDoor, room, windowFrame, table, bubble, hearts, shadow, label, box, glow, R, INK, BONE, GOLD, prog, ease, lerp } from '../../ngfe01/scenes/advent.js'
function candle(x, t, cx, y, k) {
  box(x, cx - 14, y - 70, 28, 70, BONE, { b: 4 })
  const fl = 1 + 0.12 * Math.sin(t * 17) + 0.5 * k
  x.save(); x.globalCompositeOperation = 'lighter'; glow(x, cx, y - 90, 200 * fl, 0.35 + 0.2 * k, '255,200,120'); x.restore()
  R(x, INK, cx - 10, y - 110 * fl + 4, 20, 40 * fl); R(x, '#ffb347', cx - 6, y - 106 * fl + 4, 12, 34 * fl); R(x, '#fff1a8', cx - 3, y - 96 * fl + 4, 6, 18 * fl)
}
function scene(x, t, S) {
  const { u, hero, mate } = S
  room(x, { wall: '#3a2240', wall2: '#432748', floor: '#3e2846' })
  windowFrame(x, t, 380, 280, 320, 280)
  shadow(x, 260, 1160, 230); shadow(x, 820, 1160, 230)
  mate(x, t, { x: 260, y: 960, s: 260, mood: u < 2.8 ? 'happy' : u < 4.2 ? 'wide' : 'heart', look: [1, -0.3], hops: [S.t0 + 0.4, S.t0 + 0.9, S.t0 + 2.9, S.t0 + 4.3] })
  hero(x, t, { x: 820, y: 960, s: 260, mood: u > 4.2 ? 'sparkle' : 'happy', look: [-1, -0.3], hops: [S.t0 + 1.9, S.t0 + 4.3] })
  table(x, 540, 1070, 820, { cloth: '#f0d8e0' })
  candle(x, t, 540, 1066, prog(u, 4.2, 4.5))
  // the phone: buzzing face up, then flipped face down
  const flip = ease.inOutCubic(prog(u, 1.9, 2.25)), buzz = u > 0.8 && u < 1.9 ? 5 * Math.sin(t * 70) : 0
  const sy = Math.abs(Math.cos(Math.PI * flip))
  x.save(); x.translate(700 + buzz, 1050); x.scale(1, Math.max(0.08, sy) * 0.35)
  box(x, -60, -100, 120, 200, flip < 0.5 ? '#2a2148' : '#4a4470', { b: 6 })
  if (flip < 0.5) R(x, u > 0.8 ? '#9fd8ff' : '#1a1440', -48, -88, 96, 176)
  x.restore()
  if (u > 0.8 && u < 1.9) label(x, 'BZZ BZZ', 720, 940, { size: 34, col: GOLD, rot: 0.08 * Math.sin(t * 30) })
  if (u > 4.3) hearts(x, t, S.t0 + 4.35, 260, 800)
  bubble(x, t, 330, 660, S.t0 + 0.3, S.t0 + 2.8, '…and THAT is why\nI love snow.', { size: 42, tail: -0.2 })
  bubble(x, t, 330, 640, S.t0 + 2.9, S.t0 + 4.2, "wait, you're not\ngonna check that?", { size: 40, tail: -0.2 })
  bubble(x, t, 760, 660, S.t0 + 4.3, S.t1 - 0.2, 'it can wait.\nthis can\'t.', { size: 46, tail: 0.2, col: '#ffe0c2' })
  void lerp
}
const EP = makeDoor({
  day: 7, hero: 'libra', mate: 'gemini', hook: "Dinner date. | *Where's their phone?*",
  flag: 'puts the phone *face down.*', scene, pis: { x: 950, y: 1715 },
  cues: [['pop', 0.3, 880, 0.035, -0.3], ...[0.8, 0.9, 1.0, 1.3, 1.4, 1.5].map(v => ['tick', v, 0.045]), ['whoosh', 1.9, 0.3, 0.03], ['tick', 2.25, 0.07],
    ['pop', 2.9, 1174.66, 0.04, -0.3], ['pop', 4.3, 987.77, 0.04, 0.3], ['glitter', 4.2, 4.6], ['pluck', 4.35, 1174.66, 0.035, 0.5, -0.3]],
  last: '*Face down.* Eyes up.',
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
