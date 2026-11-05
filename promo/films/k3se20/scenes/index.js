// k3se20: 3-SECOND ADVICE · "Walls Up Before the First Date" (8.0 s vertical trial reel, loops, music: screwed · Cm).
// Format: k3se01/threekit.js.
//   0.00  frame 0: ♏ Scorpio mid-build of a brick wall, bricks flying in; ♋ the date peeks hopefully over the top,
//         holding a little flower.  Hook: "Building walls before | the *first date.*"  Pisces sniffles.
//   0.50  whip zoom onto the date's hopeful face; the frame holds.   0.95–2.45  3 · 2 · 1.
//   2.45  THE STARS: "Guard your heart. | *Don't lock it.*"  Scorpio opens a little door in the wall (heart knob);
//         the date steps through with the flower; Scorpio blushes.
//   7.55–8.0  loop: eases back into frame 0.
import { makeThree, R, box, label, shadow, drawBits, HEART, hearts, sparkles, star, lerp, prog, ease, clamp, INK, BONE, GOLD, RED, PINK, INTER } from '../../k3se01/threekit.js'

const WX = 440, WW = 300, WT = 660
function wall(x, rows, door) {
  for (let r = 0; r < rows; r++) for (let c = 0; c < 5; c++) {
    const bx = WX + c * 60 + (r % 2 ? 30 : 0) - 30, by = 1150 - (r + 1) * 40
    if (bx < WX - 30 || bx + 60 > WX + WW + 30) continue
    if (door > 0 && bx + 60 > 520 && bx < 660 && by > 960) continue
    box(x, bx + 3, by + 3, 54, 34, (r + c) % 3 ? '#a8503c' : '#b85e48', { b: 3 })
  }
  if (door > 0) {
    R(x, '#1a1230', 520, 960, 140, 190)
    x.save(); x.translate(520, 960); x.scale(1 - 0.85 * door, 1)
    box(x, 0, 0, 140, 190, '#8a5a3a', { b: 5 }); drawBits(x, HEART, { H: RED }, 110, 100, 4)
    x.restore()
  }
}
function flower(x, cx, cy) { R(x, INK, cx - 4, cy, 8, 70); R(x, '#3fa07a', cx - 2, cy + 2, 4, 66); for (let i = 0; i < 6; i++) { const a = i * 1.05; x.fillStyle = INK; x.beginPath(); x.arc(cx + Math.cos(a) * 16, cy + Math.sin(a) * 16, 13, 0, 7); x.fill(); x.fillStyle = PINK; x.beginPath(); x.arc(cx + Math.cos(a) * 16, cy + Math.sin(a) * 16, 10, 0, 7); x.fill() } x.fillStyle = GOLD; x.beginPath(); x.arc(cx, cy, 10, 0, 7); x.fill() }

function scene(x, t, S) {
  const { phase, u, hero } = S
  R(x, '#211a3a', 0, 1150, 1080, 120); R(x, '#2e2650', 0, 1150, 1080, 10)
  if (phase === 'hook') {
    // the date behind the wall, peeking over
    star(x, t, 'cancer', { x: 590, y: 590, s: 230, mood: 'sparkle', look: [-0.5, 0.4], seed: 17 })
    flower(x, 730, 560)
    wall(x, 12, 0)
    shadow(x, 220, 1150, 250)
    hero(x, t, { x: 220, y: 960, s: 270, mood: 'squint', look: [1, 0], squash: 0.05 * Math.sin(t * 25) })
    for (let i = 0; i < 4; i++) { const p = ((t * 2 + i / 4) % 1 + 1) % 1; box(x, lerp(260, 470, p), 900 - 300 * Math.sin(Math.PI * p), 54, 34, '#b85e48', { b: 3 }) }
    label(x, 'SAFE.', 220, 720, { size: 46, col: BONE, font: INTER, weight: 800 })
    return
  }
  const door = ease.inOutCubic(prog(u, 0.4, 0.9))
  const step = ease.inOutCubic(prog(u, 1.2, 2.0))
  if (step < 0.5) { star(x, t, 'cancer', { x: 590, y: lerp(590, 1000, step * 2), s: 230, mood: 'sparkle', look: [-0.5, 0.4], seed: 17 }); }
  wall(x, 12, door)
  if (step >= 0.5) { shadow(x, lerp(590, 430, step), 1150, 220); star(x, t, 'cancer', { x: lerp(590, 430, step), y: 1000, s: 230, mood: 'happy', look: [-1, 0], seed: 17, hops: [2.45 + 1.6, 2.45 + 2.0] }); flower(x, lerp(520, 380, step), 860) }
  shadow(x, 220, 1150, 250)
  hero(x, t, { x: 220, y: 960, s: 270, mood: u < 0.4 ? 'wide' : u > 2.0 ? 'heart' : 'neutral', look: [1, 0], blush: u > 2.0 ? 1 : 0, hops: [2.45 + 0.4, 2.45 + 2.0] })
  if (u > 0.4 && u < 1.0) label(x, 'creak…', 590, 920, { size: 34, col: BONE })
  if (u > 2.0) { hearts(x, t, 2.45 + 2.0, 320, 800, { n: 6, cell: 7, spread: 160 }); sparkles(x, t, 590, 1040, 2.45 + 0.9, 8, 140, 1) }
}

const EP = makeThree({
  id: 'k3se20', sign: 'scorpio', dur: 8.0, brk: 'whip', ending: 'loop', focus: [590, 600],
  hook: 'Building walls before | the *first date.*', accent: '#ff6f8a',
  advice: "Guard your heart. | *Don't lock it.*",
  scene,
  cues: [
    ['tick', 0.0, 0.05], ['tick', 0.25, 0.05],
    ['tick', 2.85, 0.06], ['whoosh', 2.9, 0.5, 0.025], ['pop', 3.3, 659.25, 0.03, 0],
    ['pop', 4.05, 880, 0.03, -0.2], ['pop', 4.45, 987.77, 0.03, -0.3], ['pop', 4.45, 1318.51, 0.035, -0.3], ['glitter', 4.45, 4.9], ['pluck', 4.6, 1567.98, 0.035, -0.4, 0.4],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
