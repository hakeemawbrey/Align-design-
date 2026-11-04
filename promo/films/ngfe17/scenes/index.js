// ngfe17: 24 DAYS OF GREEN FLAGS, door 17: "Same with you around their friends." (18 s vertical, synthwave · Bm)
//   hook "In front of | *their friends…*" · Leo's crew of three bounces around; Sagittarius hangs back. Leo pulls Sag
//   in close: "everyone, this is Sag!" The crew: "hi Sag!!" Sag: "you didn't play it cool." Leo: "why would I?"
//   Last: "*Same* love in every room."
import { makeDoor, room, bubble, hearts, shadow, drawStarChar, drawBits, HEART, R, INK, GOLD, prog, ease, lerp, sparkles } from '../../ngfe01/scenes/advent.js'
const CREW = [{ x: 620, c: '#7fd0ff' }, { x: 790, c: '#ff9d6e' }, { x: 950, c: '#9be07a' }]
function scene(x, t, S) {
  const { u, hero, mate } = S
  room(x, { wall: '#2a1f4a', wall2: '#321f56', floor: '#3c2654' })
  // disco-ish party lights
  for (let i = 0; i < 6; i++) { const a = 0.12 + 0.1 * Math.sin(t * 3 + i); x.save(); x.globalAlpha = a; R(x, ['#ff7eb6', '#7fd0ff', '#f2c75c'][i % 3], i * 190 + 60 * Math.sin(t + i), 280, 90, 600); x.restore() }
  CREW.forEach((c, i) => {
    shadow(x, c.x, 1170, 150)
    drawStarChar(x, c.x, 1050, 160, t, { color: c.c, mood: u > 2.6 ? 'sparkle' : 'happy', look: [-1, 0], seed: 30 + i, glow: 0.8, hops: [S.t0 + 0.2 + i * 0.2, S.t0 + 0.8 + i * 0.2, S.t0 + 2.65 + i * 0.08, S.t0 + 3.2 + i * 0.1] })
  })
  const pull = ease.inOutCubic(prog(u, 0.9, 1.4))
  const sagX = lerp(160, 480, pull)
  shadow(x, 260, 1170, 220); shadow(x, sagX, 1170, 200)
  hero(x, t, { x: 250, y: 1000, s: 240, mood: 'sparkle', look: [1, 0], hops: [S.t0 + 1.4, S.t0 + 1.8, S.t0 + 4.8] })
  mate(x, t, { x: sagX, y: 1010, s: 220, mood: u < 1.4 ? 'squint' : u < 3.6 ? 'wide' : 'heart', look: [-1, 0], hops: [S.t0 + 1.45, S.t0 + 3.65] })
  if (pull > 0.9) drawBits(x, HEART, { H: '#ff5c8a' }, (250 + sagX) / 2, 1110, 7)
  sparkles(x, t, 320, 1000, S.t0 + 1.45, 10, 180, 1, [GOLD, '#ff8fb1'])
  if (u > 3.6) hearts(x, t, S.t0 + 3.7, sagX, 830)
  bubble(x, t, 330, 690, S.t0 + 1.45, S.t0 + 2.6, 'everyone, this\nis Sag!', { size: 46, tail: -0.3 })
  bubble(x, t, 790, 760, S.t0 + 2.65, S.t0 + 3.6, 'hi Sag!!', { size: 48, col: '#d8f5c8' })
  bubble(x, t, 420, 680, S.t0 + 3.65, S.t0 + 4.8, "you didn't play\nit cool.", { size: 42, tail: 0, col: '#ffe0c2' })
  bubble(x, t, 300, 690, S.t0 + 4.85, S.t1 - 0.2, 'why would I?', { size: 48, tail: -0.2 })
  void R; void INK
}
const EP = makeDoor({
  day: 17, hero: 'leo', mate: 'sagittarius', hook: 'In front of | *their friends…*', accent: '#f39a3a',
  flag: 'the same with you *around their friends.*', scene, pis: { x: 950, y: 1720 },
  cues: [['pop', 0.2, 880, 0.03, 0.4], ['pop', 0.4, 987.77, 0.03, 0.4], ['whoosh', 0.9, 0.4, 0.035], ['pop', 1.45, 1318.51, 0.045, -0.3], ['glitter', 1.45, 1.9],
    ['pop', 2.65, 1174.66, 0.04, 0.4], ['pop', 2.75, 1318.51, 0.04, 0.4], ['pop', 2.85, 1567.98, 0.04, 0.4], ['pop', 3.65, 880, 0.035, -0.2], ['pop', 4.85, 987.77, 0.04, -0.3]],
  last: '*Same* love in every room.',
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
