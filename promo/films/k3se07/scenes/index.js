// k3se07: 3-SECOND ADVICE · "Where Do You Want to Eat?" (7.6 s vertical trial reel, loops, music: chiptune · G).
// Format: k3se01/threekit.js.
//   0.00  frame 0: ♎ Libra mid-spin between two signposts (← PIZZA · NOODLES →), dizzy swirls, a game HUD
//         "DECISION.EXE · LOADING" spinning; ♈ the date waits: "where do you want to eat?"
//         Hook: "'Where do you want to eat?' | *Silence.*"  Pisces sniffles in the corner.
//   0.50  record scratch: the spin freezes.   0.95–2.45  3 · 2 · 1.
//   2.45  THE STARS: "Just pick. Your choice | *won’t break anything.*"  Libra points: NOODLES. The sign lights up, the
//         HUD flips to DECIDED, the date cheers ("noodles!!"), confetti.
//   7.15–7.6  loop: eases back into frame 0.
import { makeThree, R, box, bubble, label, shadow, sparkles, confetti, lerp, prog, ease, clamp, INK, BONE, GOLD, MINT, PINK, INTER, MONO } from '../../k3se01/threekit.js'

function post(x, cx, text, dir, lit) {
  R(x, INK, cx - 12, 760, 24, 390); R(x, '#a07850', cx - 6, 764, 12, 386)
  const w = 280, y = 720
  x.save(); x.translate(cx, y)
  const col = lit ? GOLD : BONE
  x.fillStyle = INK; x.beginPath()
  if (dir < 0) { x.moveTo(-w / 2 - 50, 0); x.lineTo(-w / 2, -50); x.lineTo(w / 2 + 6, -50); x.lineTo(w / 2 + 6, 50); x.lineTo(-w / 2, 50) }
  else { x.moveTo(w / 2 + 50, 0); x.lineTo(w / 2, -50); x.lineTo(-w / 2 - 6, -50); x.lineTo(-w / 2 - 6, 50); x.lineTo(w / 2, 50) }
  x.closePath(); x.fill()
  x.fillStyle = col; x.beginPath()
  if (dir < 0) { x.moveTo(-w / 2 - 38, 0); x.lineTo(-w / 2, -40); x.lineTo(w / 2, -40); x.lineTo(w / 2, 40); x.lineTo(-w / 2, 40) }
  else { x.moveTo(w / 2 + 38, 0); x.lineTo(w / 2, -40); x.lineTo(-w / 2, -40); x.lineTo(-w / 2, 40); x.lineTo(w / 2, 40) }
  x.closePath(); x.fill()
  x.font = `800 46px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, dir * 10, 3)
  x.restore()
  if (lit) { x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(cx, y, 20, cx, y, 260); g.addColorStop(0, 'rgba(255,220,120,0.35)'); g.addColorStop(1, 'rgba(255,220,120,0)'); x.fillStyle = g; x.fillRect(cx - 260, y - 260, 520, 520); x.restore() }
}
function hud(x, t, decided) {
  box(x, 270, 480, 570, 76, '#0e1a14', { b: 6 })
  x.font = `700 32px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  x.fillStyle = decided ? MINT : GOLD; x.fillText(decided ? 'DECISION.EXE · DONE' : 'DECISION.EXE · LOADING', 296, 519)
  if (!decided) { const a = t * 8; x.strokeStyle = GOLD; x.lineWidth = 6; x.beginPath(); x.arc(810, 518, 16, a, a + 4.2); x.stroke() }
}
function swirls(x, t, cx, cy) {
  for (let i = 0; i < 4; i++) { const a = t * 9 + i * Math.PI / 2; R(x, GOLD, cx + Math.cos(a) * 110 - 7, cy + Math.sin(a) * 30 - 7, 14, 14) }
}

function scene(x, t, S) {
  const { phase, u, hero, star } = S
  R(x, '#211a3a', 0, 1150, 1080, 120); R(x, '#2e2650', 0, 1150, 1080, 10)
  const pick = phase === 'fix' && u > 0.4
  post(x, 190, 'PIZZA', -1, false)
  post(x, 890, 'NOODLES', 1, pick)
  hud(x, t, pick)
  // the date, far right in front of the post
  const cheer = phase === 'fix' && u > 1.0
  shadow(x, 860, 1150, 190)
  star(x, t, 'aries', { x: 860, y: 1040, s: 190, mood: cheer ? 'happy' : 'neutral', look: [-1, -0.2], seed: 8, hops: cheer ? [2.45 + 1.0, 2.45 + 1.4, 2.45 + 1.8] : null })
  if (phase === 'hook') {
    shadow(x, 460, 1150, 260)
    hero(x, t, { x: 460, y: 960, s: 290, mood: 'eyeroll', look: [Math.cos(t * 20), Math.sin(t * 20)], squash: 0.13 * Math.sin(t * 20) })
    swirls(x, t, 460, 760)
    bubble(x, t, 800, 905, 0, 0, 'where do you want to eat?', { size: 28, tail: 0.6, k: 1 })
    return
  }
  shadow(x, 520, 1150, 260)
  hero(x, t, { x: 520, y: 960, s: 290, mood: u < 0.4 ? 'wide' : 'happy', look: u < 0.4 ? [0, 0] : [1, -0.4], hops: [2.45 + 0.4, 2.45 + 1.2], squash: u < 0.4 ? 0.1 * Math.exp(-u * 8) * Math.sin(u * 40) : 0 })
  // the pointing arrow
  if (pick) {
    const k = clamp(prog(u, 0.4, 0.6))
    x.save(); x.translate(650, 940); x.scale(k, k)
    R(x, INK, -6, -18, 116, 36); R(x, GOLD, 0, -12, 100, 24)
    x.fillStyle = INK; x.beginPath(); x.moveTo(100, -36); x.lineTo(150, 0); x.lineTo(100, 36); x.fill()
    x.fillStyle = GOLD; x.beginPath(); x.moveTo(106, -24); x.lineTo(138, 0); x.lineTo(106, 24); x.fill()
    x.restore()
    label(x, 'NOODLES.', 520, 690, { size: 54, col: GOLD, font: INTER, weight: 800, alpha: k })
    sparkles(x, t, 890, 720, 2.45 + 0.42, 10, 200, 1)
  }
  if (cheer) { confetti(x, t, 2.45 + 1.0, 860, 900); bubble(x, t, 760, 860, 2.45 + 1.05, 99, 'noodles!!', { size: 40, tail: 0.5 }) }
}

const EP = makeThree({
  id: 'k3se07', sign: 'libra', dur: 7.6, brk: 'freeze', ending: 'loop', focus: [520, 860],
  hook: "'Where do you want to eat?' | *Silence.*", accent: '#ff9fc4', hookSize: 80,
  advice: 'Just pick. Your choice | *won’t break anything.*',
  scene,
  cues: [
    ['chip', 0.0, 659.25, 0.12, { gain: 0.03 }],
    ['pop', 2.87, 1567.98, 0.045, 0.3], ['tick', 2.88, 0.08], ['glitter', 2.9, 3.3], ['chip', 3.0, 1318.51, 0.15, { gain: 0.035 }],
    ['pop', 3.47, 1174.66, 0.04, 0.4], ['pop', 3.6, 1567.98, 0.04, 0.4], ['glitter', 3.5, 4.2],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
