// ngfe09: 24 DAYS OF GREEN FLAGS, door 9: "Celebrates your small wins." (18 s vertical, cinematic · Eb)
//   hook "Their plant | *survived a week.*" · Gemini holds up a tiny pot: "look… a new leaf." Sagittarius gasps, an
//   "IT LIVES!!" banner unrolls, confetti: "best plant parent EVER!!" Gemini, embarrassed and delighted: "it's ONE
//   leaf." Last: "Small win. *Big* cheer."
import { makeDoor, room, windowFrame, bubble, shadow, confetti, sparkles, box, drawBits, R, INK, BONE, GOLD, GREEN, GREEN_L, INTER, prog, ease, lerp } from '../../ngfe01/scenes/advent.js'
function pot(x, t, cx, cy, s, leaf) {
  box(x, cx - 50 * s, cy, 100 * s, 80 * s, '#c86a4a', { b: 5, hi: '#e08a64' })
  R(x, INK, cx - 5 * s, cy - 70 * s, 10 * s, 70 * s); R(x, GREEN, cx - 2 * s, cy - 68 * s, 4 * s, 68 * s)
  drawBits(x, ['.GG', 'GGG', 'GG.'], { G: GREEN }, cx - 22 * s, cy - 40 * s, 9 * s)
  if (leaf > 0) drawBits(x, ['GG.', 'GGG', '.GG'], { G: GREEN_L }, cx + 22 * s, cy - 66 * s, 9 * s * leaf)
}
function scene(x, t, S) {
  const { u, hero, mate } = S
  room(x, { wall: '#2a2c52', wall2: '#30325e', floor: '#3a3458' })
  windowFrame(x, t, 380, 520, 320, 260)
  // the banner unrolls from the top
  const un = ease.outCubic(prog(u, 1.9, 2.4))
  if (un > 0) {
    R(x, INK, 120, 300, 840, 12)
    box(x, 150, 310, 780, 170 * un, '#ffe9a8', { b: 6 })
    if (un > 0.8) { x.save(); x.font = `800 110px ${INTER}`; x.fillStyle = '#d83a5a'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('IT LIVES!!', 540, 400 + 4 * Math.sin(t * 8)); x.restore() }
  }
  confetti(x, t, S.t0 + 2.0, 540, 500, { n: 34 })
  confetti(x, t, S.t0 + 2.4, 820, 700, { n: 20 })
  shadow(x, 280, 1160, 230); shadow(x, 800, 1160, 230)
  mate(x, t, { x: 280, y: 980, s: 260, mood: u < 4.2 ? 'happy' : 'squint', look: [1, -0.4], hops: [S.t0 + 0.4, S.t0 + 4.2], blush: u > 4.2 ? 1 : undefined })
  pot(x, t, 430, 1000, 1.3, ease.outBack(prog(u, 0.6, 0.9)))
  sparkles(x, t, 460, 900, S.t0 + 0.65, 8, 60, 1, [GREEN_L, BONE])
  hero(x, t, { x: 800, y: 980, s: 260, mood: u < 1.4 ? 'neutral' : u < 1.9 ? 'wide' : 'sparkle', look: [-1, 0], hops: [S.t0 + 1.5, S.t0 + 2.0, S.t0 + 2.3, S.t0 + 2.6, S.t0 + 3.0, S.t0 + 3.3] })
  bubble(x, t, 330, 700, S.t0 + 0.4, S.t0 + 1.9, 'look… a new leaf.', { size: 42, tail: -0.1 })
  bubble(x, t, 760, 640, S.t0 + 2.9, S.t0 + 4.3, 'best plant parent\nEVER!!', { size: 44, tail: 0.2, col: '#ffe0c2' })
  bubble(x, t, 330, 680, S.t0 + 4.3, S.t1 - 0.2, "it's ONE leaf.", { size: 46, tail: -0.1 })
  void GOLD; void lerp
}
const EP = makeDoor({
  day: 9, hero: 'sagittarius', mate: 'gemini', hook: 'Their plant | *survived a week.*',
  flag: 'celebrates your *small wins.*', scene, pis: { x: 950, y: 1715 },
  cues: [['pop', 0.4, 880, 0.035, -0.3], ['pluck', 0.65, 1567.98, 0.035, 0.4, -0.2], ['pop', 1.5, 1318.51, 0.04, 0.3], ['whoosh', 1.9, 0.35, 0.04], ['boom', 2.0, 0.2], ['glitter', 2.0, 2.8],
    ['clap', 2.3, { gain: 0.12, pan: 0.3 }], ['clap', 2.6, { gain: 0.12, pan: 0.3 }], ['pop', 2.9, 1174.66, 0.04, 0.3], ['pop', 4.3, 659.25, 0.04, -0.3]],
  last: 'Small win. *Big* cheer.',
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
