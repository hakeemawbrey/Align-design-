// ngfe03: 24 DAYS OF GREEN FLAGS, door 3: "Kind to the server." (18 s vertical, jazzy · Bb)
//   hook "Watch how they talk | to the *server.*" · café table: a server star brings Gemini the wrong drink ("one mint
//   tea!"); Gemini: "no worries, this looks great. thank you!!" · Capricorn ticks KIND TO STAFF on a little clipboard…
//   then drops the clipboard and just smiles. Last: "Kind to *everyone*. Not just you."
import { makeDoor, room, windowFrame, table, mug, bubble, hearts, shadow, label, box, drawStarChar, R, INK, BONE, GREEN, INTER, MONO, prog, ease, lerp, clamp, sparkles } from '../../ngfe01/scenes/advent.js'
function clipboard(x, cx, cy, rot, ticked) {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  box(x, -70, -90, 140, 180, '#a07850', { b: 5 }); R(x, BONE, -58, -70, 116, 150); R(x, '#5a5470', -30, -100, 60, 20)
  x.font = `700 15px ${MONO}`; x.fillStyle = INK; x.textAlign = 'left'; x.textBaseline = 'middle'
  ;['POLITE', 'FUNNY', 'KIND TO', 'STAFF'].forEach((s, i) => x.fillText(s, -30, -48 + i * 30 + (i > 2 ? -8 : 0)))
  for (const [i, on] of [[0, 1], [1, 1], [2, ticked]]) { R(x, INK, -50, -56 + i * 30, 14, 14); if (on) R(x, GREEN, -48, -54 + i * 30, 10, 10) }
  x.restore()
}
function scene(x, t, S) {
  const { u, hero, mate } = S
  room(x, { wall: '#3a2448', wall2: '#432a54', floor: '#4a2f50' })
  windowFrame(x, t, 340, 300, 400, 280)
  // the server: in, sets the drink down, out
  const sIn = ease.outCubic(prog(u, 0.4, 1.0)), sOut = ease.inCubic(prog(u, 3.3, 3.9))
  const sx = lerp(1250, 560, sIn) + sOut * 700
  shadow(x, 280, 1160, 230); shadow(x, 800, 1160, 230)
  // the drink: a mint tea that wasn't ordered
  const placed = u > 1.25
  if (u > 0.4 && u < 3.95) {
    const tray = { x: sx - 120, y: 860 }
    drawStarChar(x, sx, 930, 230, t, { color: '#b9a7e8', mood: u > 2.4 ? 'happy' : 'neutral', look: [-1, 0.3], hops: [S.t0 + 1.2, S.t0 + 3.2], seed: 11, glow: 0.7 })
    if (!placed) { R(x, INK, tray.x - 70, tray.y - 6, 140, 14); mug(x, t, tray.x, tray.y - 8, 1, '#7fe0a8') }
  }
  hero(x, t, { x: 280, y: 960, s: 250, mood: u < 1.6 ? 'happy' : u < 2.0 ? 'wide' : 'happy', look: u < 3.3 ? [1, -0.6] : [1, 0], hops: [S.t0 + 1.9, S.t0 + 2.4, S.t0 + 4.5] })
  const tick = prog(u, 3.0, 3.1) > 0, drop = ease.inCubic(prog(u, 4.0, 4.5))
  mate(x, t, { x: 800, y: 960, s: 250, mood: u < 4.0 ? 'neutral' : 'heart', look: u < 2.8 ? [-1, 0] : u < 4.0 ? [0, 1] : [-1, 0], hops: [S.t0 + 3.0, S.t0 + 4.05] })
  if (drop < 1) clipboard(x, 930, lerp(900, 1500, drop), lerp(-0.1, 1.3, drop), tick)
  sparkles(x, t, 880, 860, S.t0 + 3.02, 8, 80, 2, [GREEN, BONE])
  if (u > 4.0) hearts(x, t, S.t0 + 4.1, 800, 800)
  table(x, 540, 1060, 760, { cloth: '#d8c7e8' })
  mug(x, t, 760, 1046, 1.1, '#5fb0d8')
  if (placed) mug(x, t, 330, 1046, 1.1, '#7fe0a8')
  bubble(x, t, 640, 700, S.t0 + 1.25, S.t0 + 2.2, 'one mint tea!', { size: 40, tail: 0.3 })
  if (u > 1.6 && u < 2.1) label(x, '(ordered cocoa)', 280, 700, { size: 28, col: '#ffd0a8' })
  bubble(x, t, 400, 660, S.t0 + 2.15, S.t0 + 4.4, 'no worries, this looks\ngreat. thank you!!', { size: 42, tail: -0.4 })
  bubble(x, t, 760, 640, S.t0 + 4.5, S.t1 - 0.2, 'noted. forever.', { size: 40, tail: 0.1, col: '#ffe0c2' })
  void INTER; void clamp
}
const EP = makeDoor({
  day: 3, hero: 'gemini', mate: 'capricorn', hook: 'Watch how they talk | to the *server.*',
  flag: 'kind to the *server.*', scene, pis: { x: 120, y: 1715, look: [1, -0.6] },
  cues: [['whoosh', 0.4, 0.4, 0.03], ['tick', 1.25, 0.06], ['pop', 1.25, 880, 0.04, 0.3], ['pop', 1.65, 659.25, 0.03, -0.3], ['pop', 2.15, 1174.66, 0.04, -0.3],
    ['pop', 3.0, 1567.98, 0.045, 0.4], ['tick', 3.02, 0.05], ['whoosh', 3.3, 0.35, 0.03], ['whoosh', 4.0, 0.3, 0.03], ['tick', 4.45, 0.06], ['pluck', 4.1, 1174.66, 0.04, 0.5, 0.3], ['pop', 4.5, 987.77, 0.04, 0.3]],
  last: 'Kind to *everyone*. Not just you.',
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
