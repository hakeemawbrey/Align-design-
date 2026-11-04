// ngfe21: 24 DAYS OF GREEN FLAGS, door 21: "Does the dishes when you cook." (18 s vertical, jazzy · F)
//   hook "You cooked. | *Now the sink…*" · Cancer flops onto a chair after cooking (a pot still steaming). Sagittarius
//   pulls on yellow dish gloves and scrubs, soap bubbles everywhere. Cancer: "you don't have to—" Sag: "I want to."
//   Last: "You cooked. *I'll* wash."
import { makeDoor, room, windowFrame, bubble, hearts, shadow, label, box, drawBits, starFrame, mug, R, INK, BONE, GOLD, SNOW, prog, ease, lerp } from '../../ngfe01/scenes/advent.js'
const GLOVE = ['.YY..', 'YYYY.', 'YYYYY', 'YYYYY', '.YYY.']
function scene(x, t, S) {
  const { u, hero, mate } = S
  room(x, { wall: '#2a3a50', wall2: '#30425c', floor: '#3a3a52', stripes: false })
  for (let i = 0; i < 1080; i += 60) for (let j = 640; j < 960; j += 60) R(x, (i + j) % 120 ? '#344a64' : '#3a5270', i + 2, j + 2, 56, 56)
  windowFrame(x, t, 560, 280, 300, 260)
  // counter + sink on the right, stove + pot on the left
  box(x, 480, 960, 600, 220, '#c8b8a0', { b: 8 }); R(x, '#8aa0b8', 560, 960, 300, 40)
  box(x, 0, 960, 380, 220, '#6a5a7a', { b: 8 })
  box(x, 100, 880, 180, 90, '#5a5470', { b: 6 }); for (let i = 0; i < 3; i++) { const p = (t * 0.7 + i / 3) % 1; x.save(); x.globalAlpha = 0.5 * Math.sin(Math.PI * p); R(x, BONE, 140 + i * 40, 860 - p * 90, 14, 14); x.restore() }
  // Cancer flopped on a chair (front left)
  box(x, 120, 1220, 260, 30, '#7a4a2c', { b: 6 })
  shadow(x, 250, 1360, 220)
  mate(x, t, { x: 250, y: 1150, s: 230, mood: u < 2.0 ? 'sleepy' : u < 4.3 ? 'wide' : 'heart', look: [1, -0.6], hops: [S.t0 + 2.0, S.t0 + 4.35], zzz: false, squash: u < 2.0 ? 0.08 : 0 })
  // Sag at the sink, scrubbing
  const scrub = u > 1.2
  const so = { x: 720, y: 870, s: 240, mood: u < 1.2 ? 'happy' : u < 3.3 ? 'squint' : 'happy', look: u > 3.3 && u < 4.4 ? [-1, 0.4] : [0, 1], hops: [S.t0 + 0.8, S.t0 + 3.35] }
  hero(x, t, so)
  const F = starFrame(so.x, so.y, so.s, t, { hops: so.hops, seed: 3 })
  const gk = ease.outBack(prog(u, 0.8, 1.1))
  if (gk > 0) for (const d of [-1, 1]) drawBits(x, GLOVE, { Y: '#ffd23a' }, F.ox + d * F.S * 0.44 + (scrub ? 10 * Math.sin(t * 14 + d) : 0), F.cy + 4, 9 * gk, { sx: d })
  if (scrub) {
    // plate bobbing + soap bubbles
    R(x, INK, 640 + 20 * Math.sin(t * 7), 950, 160, 22); R(x, SNOW, 646 + 20 * Math.sin(t * 7), 954, 148, 14)
    for (let i = 0; i < 10; i++) { const p = (t * 0.6 + i / 10) % 1, bx = 600 + ((i * 47) % 240) + Math.sin(t * 2 + i) * 20, by = 940 - p * 360, r = 8 + (i % 3) * 5; x.save(); x.globalAlpha = 0.8 * (1 - p); x.strokeStyle = '#dff4ff'; x.lineWidth = 4; x.beginPath(); x.arc(bx, by, r, 0, Math.PI * 2); x.stroke(); x.restore() }
    if (u < 2.2) label(x, 'scrub scrub', 720, 600, { size: 34, col: '#bfe8ff' })
  }
  if (u > 4.3) hearts(x, t, S.t0 + 4.4, 250, 960)
  bubble(x, t, 330, 870, S.t0 + 2.1, S.t0 + 3.4, "you don't have to—", { size: 40, tail: -0.2 })
  bubble(x, t, 720, 600, S.t0 + 3.4, S.t1 - 0.2, 'I want to.', { size: 50, tail: 0 })
  void mug; void GOLD; void lerp
}
const EP = makeDoor({
  day: 21, hero: 'sagittarius', mate: 'cancer', hook: 'You cooked. | *Now the sink…*',
  flag: 'does the dishes *when you cook.*', scene, pis: { x: 950, y: 1720 },
  cues: [['tick', 0.1, 0.05], ['pop', 0.85, 1318.51, 0.04, 0.3], ['pop', 0.95, 1567.98, 0.035, 0.3], ...Array.from({ length: 10 }, (_, i) => ['pop', +(1.3 + i * 0.22).toFixed(2), 1760 + (i % 3) * 200, 0.012, 0.3]),
    ['pop', 2.1, 880, 0.035, -0.3], ['pop', 3.4, 1174.66, 0.045, 0.3], ['pluck', 4.4, 1567.98, 0.035, 0.5, -0.3]],
  last: "You cooked. *I'll* wash.",
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
