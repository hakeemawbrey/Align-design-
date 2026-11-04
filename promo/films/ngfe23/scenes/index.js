// ngfe23: 24 DAYS OF GREEN FLAGS, door 23: "Remembers the thing you said once." (18 s vertical, chiptune · E)
//   hook "You mentioned it | *one time.*" · a flashback panel (OCTOBER): Virgo at a bus stop, "I love tangerines."
//   NOW: Aquarius rolls in a little crate of tangerines with a red bow. Virgo: "…you remembered?" Aquarius:
//   "October. the bus stop." Virgo melts. Last: "You said it *once.*"
import { makeDoor, room, windowFrame, bubble, hearts, shadow, label, box, drawStarChar, signStar, sparkles, R, INK, BONE, GOLD, RED, MONO, prog, ease, lerp } from '../../ngfe01/scenes/advent.js'
const VIR = signStar('virgo')
function tangerine(x, cx, cy, r) { R(x, INK, cx - r - 3, cy - r - 3, 2 * r + 6, 2 * r + 6); R(x, '#ff9a2e', cx - r, cy - r, 2 * r, 2 * r); R(x, '#ffc070', cx - r + 4, cy - r + 4, r * 0.6, r * 0.6); R(x, '#3fb070', cx - 4, cy - r - 8, 10, 8) }
function crate(x, cx, cy) {
  for (let i = 0; i < 5; i++) tangerine(x, cx - 110 + i * 55, cy - 70 + (i % 2) * 8, 24)
  box(x, cx - 150, cy - 50, 300, 130, '#b07a4c', { b: 7 }); R(x, '#8a5a36', cx - 150, cy - 10, 300, 12); R(x, '#8a5a36', cx - 150, cy + 30, 300, 12)
  R(x, RED, cx - 12, cy - 50, 24, 130)
  x.fillStyle = INK; x.fillRect(cx - 52, cy - 90, 104, 48); x.fillStyle = RED; x.fillRect(cx - 46, cy - 84, 40, 36); x.fillRect(cx + 6, cy - 84, 40, 36)
}
function scene(x, t, S) {
  const { u, hero, mate } = S
  room(x, { wall: '#2a2a52', wall2: '#303060', floor: '#3e3458' })
  windowFrame(x, t, 380, 680, 320, 240)
  // the flashback panel (top): OCTOBER, a bus stop, a tiny Virgo
  const fb = 1 - ease.inCubic(prog(u, 2.0, 2.3))
  if (fb > 0) {
    x.save(); x.globalAlpha = fb
    box(x, 120, 250, 840, 380, '#4a3a2a', { b: 8 })
    R(x, '#6a5238', 128, 258, 824, 364); R(x, '#7a6044', 128, 520, 824, 102)
    R(x, INK, 760, 300, 14, 230); box(x, 720, 290, 100, 60, '#c8b8a0', { b: 5 })
    x.font = `700 22px ${MONO}`; x.fillStyle = INK; x.textAlign = 'center'; x.fillText('BUS', 770, 322)
    drawStarChar(x, 420, 470, 150, t, { color: VIR.color, mood: 'happy', look: [1, 0], seed: 15, glow: 0.5, tips: false })
    label(x, 'OCTOBER', 240, 290, { size: 30, col: '#ffe0b0' })
    x.restore()
    bubble(x, t, 600, 400, S.t0 + 0.2, S.t0 + 2.1, 'I love tangerines.', { size: 38, tail: -0.5 })
  }
  if (u > 2.2) label(x, 'NOW', 540, 300, { size: 44, col: '#9fe6b0', alpha: ease.outCubic(prog(u, 2.2, 2.5)) })
  // now: Aquarius rolls the crate in
  const roll = ease.outCubic(prog(u, 2.3, 3.1))
  const ax = lerp(1300, 820, roll)
  shadow(x, 280, 1160, 230); shadow(x, ax, 1160, 230)
  mate(x, t, { x: 280, y: 990, s: 260, mood: u < 3.1 ? 'happy' : u < 4.6 ? 'wide' : 'heart', look: [1, 0.3], hops: [S.t0 + 3.15, S.t0 + 4.65] })
  crate(x, lerp(1100, 560, roll), 1110)
  hero(x, t, { x: ax, y: 990, s: 250, mood: 'sparkle', look: [-1, 0], hops: [S.t0 + 3.1, S.t0 + 4.6] })
  sparkles(x, t, 560, 1060, S.t0 + 3.1, 10, 170, 1, [GOLD, '#ff9a2e', BONE])
  if (u > 4.6) hearts(x, t, S.t0 + 4.65, 280, 820)
  bubble(x, t, 330, 700, S.t0 + 3.5, S.t0 + 4.6, '…you remembered?', { size: 42, tail: -0.1 })
  bubble(x, t, 780, 700, S.t0 + 4.6, S.t1 - 0.2, 'October.\nthe bus stop.', { size: 42, tail: 0.1, col: '#ffe0c2' })
}
const EP = makeDoor({
  day: 23, hero: 'aquarius', mate: 'virgo', hook: 'You mentioned it | *one time.*',
  flag: 'remembers the thing *you said once.*', scene, pis: { x: 120, y: 1715, look: [1, -0.6] },
  cues: [['pop', 0.2, 987.77, 0.035, -0.2], ['whoosh', 2.0, 0.35, 0.035], ['pop', 2.25, 1318.51, 0.035, 0], ...Array.from({ length: 6 }, (_, i) => ['tick', +(2.35 + i * 0.12).toFixed(2), 0.035]), ['pop', 3.1, 1567.98, 0.05, 0.2], ['glitter', 3.1, 3.5], ['pop', 3.5, 880, 0.035, -0.3], ['pop', 4.6, 1174.66, 0.04, 0.3], ['pluck', 4.65, 1567.98, 0.035, 0.5, -0.3]],
  last: 'You said it *once.*',
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
