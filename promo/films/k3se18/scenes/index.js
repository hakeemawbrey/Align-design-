// k3se18: 3-SECOND ADVICE · "Dating a Project" (8.0 s vertical trial reel, loops, music: cinematic · Gm).
// Format: k3se01/threekit.js.
//   0.00  frame 0: ♍ Virgo mid-swing with a giant pixel wrench at ♐ the date, who holds Virgo's clipboard
//         "FIX LIST: 1. the laugh 2. the jokes 3. the hair"; sparks fly.  Hook: "Dating a *project,* | not a person?"
//   0.50  record scratch: freeze mid-swing.   0.95–2.45  3 · 2 · 1.
//   2.45  THE STARS: "Love who they are, | *not who they could be.*"  The fix list rips in half, the wrench clunks
//         down; the date laughs that big laugh and Virgo: "ok your laugh is perfect, actually."  Hearts.
//   7.55–8.0  loop: eases back into frame 0.
import { makeThree, R, box, bubble, label, shadow, hearts, sparkles, star, lerp, prog, ease, clamp, INK, BONE, GOLD, RED, INTER, MONO } from '../../k3se01/threekit.js'

function wrench(x, cx, cy, rot) {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  box(x, -14, -20, 28, 220, '#9aa0b8', { b: 6 })
  box(x, -50, -90, 100, 70, '#9aa0b8', { b: 6 }); R(x, '#2a2448', -18, -96, 36, 42)
  x.restore()
}
function clipboard(x, cx, cy, rip) {
  const half = (side) => {
    x.save(); x.translate(cx + side * rip * 120, cy + rip * rip * 400); x.rotate(side * rip * 0.8)
    x.beginPath(); x.rect(side < 0 ? -120 : 0, -160, 120, 320); x.clip()
    box(x, -110, -150, 220, 300, BONE, { b: 6 }); R(x, '#a07850', -40, -164, 80, 26)
    x.font = `800 28px ${INTER}`; x.fillStyle = RED; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('FIX LIST', 0, -100)
    x.font = `700 24px ${MONO}`; x.fillStyle = INK; x.textAlign = 'left'
    ;['1. the laugh', '2. the jokes', '3. the hair'].forEach((l, i) => x.fillText(l, -94, -40 + i * 50))
    x.restore()
  }
  half(-1); half(1)
}

function scene(x, t, S) {
  const { phase, u, hero } = S
  R(x, '#211a3a', 0, 1150, 1080, 120); R(x, '#2e2650', 0, 1150, 1080, 10)
  const laugh = phase === 'fix' && u > 1.0
  shadow(x, 760, 1150, 250)
  star(x, t, 'sagittarius', { x: 760, y: 960, s: 270, mood: laugh ? 'happy' : 'wide', look: [-1, -0.2], seed: 15, hops: laugh ? [2.45 + 1.0, 2.45 + 1.3, 2.45 + 1.6, 2.45 + 1.9] : null })
  if (phase === 'hook') {
    clipboard(x, 760, 680, 0)
    shadow(x, 280, 1150, 250)
    hero(x, t, { x: 280, y: 960, s: 270, mood: 'squint', look: [1, -0.5], squash: -0.08 })
    const sw = -0.3 + 1.6 * ((t + 0.3) % 1)
    wrench(x, 430, 800, sw)
    for (let i = 0; i < 6; i++) { const a = i + t * 7, r = 40 + 60 * ((t * 3 + i / 6) % 1); R(x, GOLD, 610 + Math.cos(a) * r, 700 + Math.sin(a) * r, 10, 10) }
    label(x, 'CLANK', 560, 600, { size: 50, col: GOLD, font: INTER, weight: 800, rot: -0.15 })
    return
  }
  const rip = ease.inCubic(clamp(prog(u, 0.2, 0.9)))
  if (rip < 1) clipboard(x, 760, 680, rip)
  shadow(x, 280, 1150, 250)
  hero(x, t, { x: 280, y: 960, s: 270, mood: u < 0.3 ? 'wide' : u > 1.8 ? 'heart' : 'happy', look: [1, -0.1], hops: [2.45 + 0.25, 2.45 + 1.8] })
  if (u < 0.8) wrench(x, lerp(430, 380, u / 0.8), lerp(800, 1110, ease.inCubic(clamp(u / 0.6))), lerp(1.0, 1.57, clamp(u / 0.6)))
  else wrench(x, 380, 1110, 1.57)
  if (laugh) label(x, 'HA HA HA', 760, 720, { size: 46, col: GOLD, font: INTER, weight: 800, rot: 0.08 })
  bubble(x, t, 470, 640, 2.45 + 1.8, 99, 'ok your laugh is perfect, actually.', { size: 36, tail: -0.4 })
  if (u > 1.8) { hearts(x, t, 2.45 + 1.8, 280, 820, { n: 5, cell: 7, spread: 80 }); sparkles(x, t, 520, 900, 2.45 + 1.8, 8, 200, 1) }
}

const EP = makeThree({
  id: 'k3se18', sign: 'virgo', dur: 8.0, brk: 'freeze', ending: 'loop', focus: [520, 820],
  hook: 'Dating a *project,* | not a person?', accent: '#9fe6b0',
  advice: 'Love who they are, | *not who they could be.*',
  scene,
  cues: [
    ['tom', 0.05, 220, { gain: 0.14, decay: 0.1 }], ['tick', 0.07, 0.06],
    ['whoosh', 2.7, 0.3, 0.05], ['tick', 2.75, 0.08], ['tom', 3.0, 70, { gain: 0.2, decay: 0.25 }], ['tick', 3.02, 0.08],
    ['pop', 3.5, 880, 0.03, 0.4], ['pop', 3.8, 987.77, 0.03, 0.4], ['pop', 4.1, 880, 0.03, 0.4],
    ['pop', 4.3, 1318.51, 0.04, -0.3], ['glitter', 4.3, 4.8],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
