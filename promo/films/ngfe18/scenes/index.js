// ngfe18: 24 DAYS OF GREEN FLAGS, door 18: "Tilts the umbrella your way." (18 s vertical, cinematic · Cm)
//   hook "One umbrella. | *Whose side?*" · gentle snowfall on a quiet street; Virgo holds the umbrella tilted fully over
//   Aquarius, and a little pile of snow grows on Virgo's head. Aquarius notices: "your head is all SNOW." Virgo:
//   "worth it." Aquarius scoots in close and the umbrella covers both. Last: "Tilted *your* way."
import { makeDoor, snowGround, snowfall, bubble, hearts, shadow, starFrame, drawBits, R, INK, SNOW, prog, ease, lerp } from '../../ngfe01/scenes/advent.js'
function umbrella(x, cx, cy, rot) {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  R(x, INK, -6, 0, 12, 300); R(x, '#cfc8e8', -3, 0, 6, 296)
  drawBits(x, ['.......RRRRRRRRR.......', '....RRRRRRRRRRRRRRR....', '..RRRRRRRRRRRRRRRRRRR..', '.RRRRRRRRRRRRRRRRRRRRR.', 'RRRRRRRRRRRRRRRRRRRRRRR', 'R.R.R.R.R.R.R.R.R.R.R.R'], { R: '#e86a8a' }, 0, -36, 17)
  x.restore()
}
function scene(x, t, S) {
  const { u, hero, mate } = S
  snowGround(x, 1180)
  for (const lx of [140, 940]) { R(x, INK, lx - 9, 560, 18, 620); R(x, '#4a4470', lx - 5, 560, 10, 620); R(x, INK, lx - 40, 516, 80, 52); R(x, '#ffe9a8', lx - 34, 522, 68, 40) }
  snowfall(x, t, { n: 80, h: 1250, speed: 70, seed: 18 })
  const scoot = ease.inOutCubic(prog(u, 4.4, 4.9))
  const ax = lerp(720, 620, scoot), vx = 340
  shadow(x, vx, 1170, 220); shadow(x, ax, 1170, 220)
  const vo = { x: vx, y: 1010, s: 240, mood: u < 4.0 ? 'happy' : 'sparkle', look: u > 3.2 ? [1, -0.2] : [0, -1], hops: [S.t0 + 4.0, S.t0 + 4.6] }
  hero(x, t, vo)
  // the snow pile on Virgo's head grows
  const F = starFrame(vo.x, vo.y, vo.s, t, { hops: vo.hops, seed: 3 })
  const pile = Math.min(1, u / 4) * (1 - ease.inCubic(prog(u, 4.8, 5.2)))
  if (pile > 0.05) { const w = 40 + 70 * pile, h = 10 + 46 * pile; R(x, INK, F.ox - w / 2 - 5, F.cy - F.S * 0.48 - h - 4, w + 10, h + 8); R(x, SNOW, F.ox - w / 2, F.cy - F.S * 0.48 - h, w, h) }
  mate(x, t, { x: ax, y: 1010, s: 240, mood: u < 3.1 ? 'happy' : u < 4.4 ? 'wide' : 'heart', look: u > 3.1 ? [-1, -0.6] : [0, -1], hops: [S.t0 + 3.15, S.t0 + 4.45] })
  umbrella(x, lerp(560, 480, scoot), 770, lerp(0.38, 0.02, scoot))
  if (u > 4.5) hearts(x, t, S.t0 + 4.55, 480, 760)
  bubble(x, t, 780, 700, S.t0 + 3.15, S.t0 + 4.4, 'your head is\nall SNOW.', { size: 42, tail: -0.2, col: '#ffe0c2' })
  bubble(x, t, 260, 640, S.t0 + 4.05, S.t1 - 0.2, 'worth it.', { size: 48, tail: 0.1 })
}
const EP = makeDoor({
  day: 18, hero: 'virgo', mate: 'aquarius', hook: 'One umbrella. | *Whose side?*',
  flag: 'tilts the umbrella *your way.*', scene, pis: { x: 950, y: 1720 },
  cues: [['pluck', 0.8, 1174.66, 0.02, 0.6, -0.3], ['pluck', 1.8, 1318.51, 0.02, 0.6, -0.3], ['pluck', 2.8, 1567.98, 0.02, 0.6, -0.3], ['pop', 3.15, 880, 0.04, 0.3], ['pop', 4.05, 1174.66, 0.04, -0.3], ['whoosh', 4.4, 0.4, 0.03], ['pluck', 4.55, 1567.98, 0.035, 0.5, 0]],
  last: 'Tilted *your* way.',
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
