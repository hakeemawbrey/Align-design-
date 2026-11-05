// k3se05: 3-SECOND ADVICE · "Outfit Number Nine" (8.0 s vertical trial reel, loops, music: funk · E). Format: k3se01/threekit.js.
//   0.00  frame 0: ♌ Leo mid-spin, clothes flying round it (shirts, a sock, a hat), a "DATE IN 10 MIN" timer flashing.
//         Hook: "Outfit number *nine.* | Date in ten."  Pisces sniffles in the corner.
//   0.50  record scratch: freeze frame, a sock frozen mid-air.   0.95–2.45  3 · 2 · 1.
//   2.45  THE STARS: "Wear the one | you *feel like you* in."  The clothes drop into a pile; the comfy favourite sweater
//         floats in (FAVE tag); Leo hugs it, strolls to the mirror, the reflection sparkles: "this one. obviously."
//   7.55–8.0  loop: eases back into frame 0.
import { makeThree, R, box, bubble, label, shadow, drawBits, sparkles, star, lerp, prog, ease, clamp, INK, BONE, GOLD, RED, PINK, MINT, SKYB, INTER, MONO } from '../../k3se01/threekit.js'

const SHIRT = ['XX.XX', 'XXXXX', '.XXX.', '.XXX.']
const SOCK = ['XX.', 'XX.', 'XX.', 'XXX', 'XXX']
const HAT = ['.XXX.', '.XXX.', 'XXXXX']
const PANTS = ['XXXX', 'XXXX', 'X..X', 'X..X', 'X..X']
const SWEATER = ['XXX.XXX', 'XXXXXXX', 'XXXXXXX', '.XXXXX.', '.XXXXX.', '.XXXXX.']
const CLOTHES = [[SHIRT, SKYB], [SOCK, RED], [HAT, MINT], [PANTS, '#4f7cd8'], [SHIRT, PINK], [SOCK, GOLD], [SHIRT, '#9fe6b0'], [HAT, LAVC()]]
function LAVC() { return '#c9a6ff' }
function room(x) {
  R(x, '#211a3a', 0, 1150, 1080, 120); R(x, '#2e2650', 0, 1150, 1080, 10)
  // wardrobe (left), doors flung open
  box(x, 30, 640, 200, 510, '#6e4b33', { b: 7 }); R(x, '#1a1230', 50, 660, 160, 470)
  R(x, '#a07850', 60, 690, 140, 8)
  // mirror (right)
  box(x, 820, 600, 200, 550, '#c9a06a', { b: 7 }); R(x, '#9fc6e0', 840, 620, 160, 510)
  R(x, 'rgba(255,255,255,0.35)', 860, 640, 20, 160); R(x, 'rgba(255,255,255,0.25)', 890, 640, 10, 100)
}
function timer(x, t, frozen) {
  const on = frozen || Math.sin(t * 18) > -0.3
  box(x, 330, 490, 420, 80, on ? RED : '#7a1a2a', { b: 6 })
  x.font = `800 40px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = BONE; x.fillText('DATE IN 10 MIN', 540, 532)
}
function orbit(x, t) {
  CLOTHES.forEach(([bm, col], i) => {
    const a = t * 5.5 + i * (Math.PI * 2 / CLOTHES.length), r = 260 + 30 * Math.sin(i * 3)
    drawBits(x, bm, { X: col }, 480 + Math.cos(a) * r, 900 + Math.sin(a) * r * 0.45, 20, { rot: a * 1.5 + i })
  })
}

function scene(x, t, S) {
  const { phase, u, hero } = S
  room(x)
  if (phase === 'hook') {
    timer(x, t, false)
    shadow(x, 480, 1150, 280)
    // the spin: squash + flipping look
    hero(x, t, { x: 480, y: 940, s: 300, mood: 'wide', look: [Math.sin(t * 22) > 0 ? 1 : -1, -0.4], squash: 0.12 * Math.sin(t * 22) })
    orbit(x, t)
    return
  }
  // the clothes fall into a pile
  const fall = ease.inCubic(clamp(u / 0.45))
  CLOTHES.forEach(([bm, col], i) => {
    const a = 2.45 * 5.5 + i * (Math.PI * 2 / CLOTHES.length), r = 260 + 30 * Math.sin(i * 3)
    const x0 = 480 + Math.cos(a) * r, y0 = 900 + Math.sin(a) * r * 0.45
    const x1 = 120 + (i % 4) * 50, y1 = 1120 - Math.floor(i / 4) * 30
    drawBits(x, bm, { X: col }, lerp(x0, x1, fall), lerp(y0, y1, fall), 20, { rot: lerp(a * 1.5 + i, i * 0.4, fall) })
  })
  const walk = ease.inOutCubic(prog(u, 1.6, 2.6))
  const hx = lerp(480, 650, walk)
  shadow(x, hx, 1150, 270)
  // reflection in the mirror
  if (walk > 0.3) {
    x.save(); x.beginPath(); x.rect(840, 620, 160, 510); x.clip(); x.globalAlpha = 0.7 * clamp((walk - 0.3) / 0.4)
    star(x, t, 'leo', { x: 960, y: 930, s: 250, mood: 'sparkle', look: [-1, 0], seed: 4, glyph: false })
    drawBits(x, SWEATER, { X: '#e86a5a' }, 960, 1075, 17)
    x.restore()
  }
  hero(x, t, { x: hx, y: 940, s: 300, mood: u < 0.5 ? 'neutral' : u < 1.6 ? 'happy' : 'sparkle', look: walk > 0.5 ? [1, 0] : [0, -0.3], hops: [2.45 + 0.55, 2.45 + 1.15, 2.45 + 2.0, 2.45 + 2.4, 2.45 + 3.2] })
  // the comfy favourite floats in, Leo hugs it
  const sk = ease.outCubic(prog(u, 0.5, 1.1))
  if (sk > 0) {
    const sx = lerp(130, hx, sk), sy = lerp(700, 1095, sk) - 140 * Math.sin(Math.PI * sk)
    drawBits(x, SWEATER, { X: '#e86a5a' }, sx, sy, 21, { rot: 0.3 * (1 - sk) })
    if (sk < 1) box(x, sx + 60, sy - 80, 90, 40, GOLD, { b: 4 })
    if (sk < 1) label(x, 'FAVE', sx + 105, sy - 60, { size: 24, col: INK, font: INTER, weight: 800 })
    if (u > 1.1) sparkles(x, t, hx, 1000, 2.45 + 1.1, 8, 150, 1)
  }
  if (u > 2.6) sparkles(x, t, 920, 800, 2.45 + 2.6, 10, 160, 2, [GOLD, BONE, '#9fc6e0'])
  bubble(x, t, 520, 640, 2.45 + 2.8, 99, 'this one. obviously.', { size: 40, tail: 0.3 })
}

const EP = makeThree({
  id: 'k3se05', sign: 'leo', dur: 8.0, brk: 'freeze', ending: 'loop', focus: [480, 860],
  hook: 'Outfit number *nine.* | Date in ten.', accent: '#ffb24a',
  advice: 'Wear the one | you *feel like you* in.',
  scene,
  cues: [
    ['whoosh', 0.0, 0.4, 0.03], ['whoosh', 2.55, 0.35, 0.03], ['tick', 2.9, 0.06], ['tick', 2.95, 0.05],
    ['pluck', 3.0, 1174.66, 0.03, -0.3, 0.4], ['pop', 3.55, 1318.51, 0.035, 0], ['glitter', 3.55, 3.9],
    ['pop', 4.6, 880, 0.03, 0.2], ['glitter', 5.05, 5.5], ['pop', 5.25, 1567.98, 0.04, 0.3],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
