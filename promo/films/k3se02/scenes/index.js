// k3se02: 3-SECOND ADVICE · "Their Song Came On" (7.6 s vertical trial reel, music: dreamy · F). Format: k3se01/threekit.js.
//   0.00  frame 0: ♉ Taurus mid-scream in a grocery aisle, headphones on, pixel music notes glitching round its head.
//         Hook: "*Their* song came on. Spiral incoming."  Pisces sniffles in the corner.
//   0.50  whip zoom onto the headphones; the frame holds.   0.95–2.45  3 · 2 · 1.
//   2.45  THE STARS: "Feel it all the way. | Just *don't text it.*"  Taurus slides the headphones down, hugs a loaf of
//         bread, breathes ("in…" "out…"); the notes slow into hearts.
//   5.90  a draft pops on Taurus' phone ("i miss u"); Taurus drops the phone into the cart and hugs the bread: "not today."
//   6.70  punchline holds; hard cut at 7.6.
import { makeThree, R, box, bubble, label, shadow, drawBits, NOTE_BM, heartLoop, phone, chat, inSprite, lerp, prog, ease, clamp, INK, BONE, GOLD, RED, PINK, INTER } from '../../k3se01/threekit.js'

const PUNCH = 6.7
function aisle(x) {
  for (const sx of [40, 700]) {
    box(x, sx, 560, 340, 590, '#3b3160', { b: 7 })
    for (let r = 0; r < 4; r++) {
      R(x, '#5a4d8a', sx, 680 + r * 135, 340, 12)
      for (let i = 0; i < 5; i++) box(x, sx + 14 + i * 64, 600 + r * 135, 48, 70, ['#e8705a', '#7fd0ff', '#f2c75c', '#9fe6b0', '#ff8fb1'][(i + r * 2 + (sx > 400 ? 1 : 0)) % 5], { b: 4 })
    }
  }
  x.fillStyle = 'rgba(12,8,30,0.45)'; x.fillRect(33, 553, 354, 604); x.fillRect(693, 553, 354, 604)
  R(x, '#2a2244', 0, 1150, 1080, 120); R(x, '#3a3058', 0, 1150, 1080, 8)
}
function cart(x, cx, cy) {
  x.save(); x.translate(cx, cy)
  R(x, INK, -110, -110, 220, 12); for (let i = 0; i < 6; i++) R(x, INK, -100 + i * 40, -110, 8, 100); R(x, INK, -110, -14, 220, 12)
  R(x, INK, 110, -150, 12, 50); R(x, INK, 100, -150, 50, 10)
  for (const d of [-80, 80]) { x.fillStyle = INK; x.beginPath(); x.arc(d, 14, 16, 0, 7); x.fill() }
  x.restore()
}
function headphones(x, F, down) {
  inSprite(x, F, () => {
    const y = down ? 14 : 0
    x.fillStyle = INK
    if (!down) { x.fillRect(5, 6, 26, 2.2); x.fillRect(4, 7, 2.2, 8); x.fillRect(29.8, 7, 2.2, 8) }
    else { x.fillRect(6, 30, 24, 2) }
    for (const cx of [3, 30]) { x.fillStyle = INK; x.fillRect(cx - 0.6, 12.4 + y, 4.2, 7.2); x.fillStyle = '#e8344e'; x.fillRect(cx, 13 + y, 3, 6) }
  })
}
function bread(x, cx, cy, s = 1) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  box(x, -80, -40, 160, 80, '#d99a52', { b: 6, hi: '#f0be78' })
  for (let i = 0; i < 3; i++) R(x, '#b57a3a', -50 + i * 40, -30, 12, 30)
  x.restore()
}
function notes(x, t, cx, cy, calm) {
  for (let i = 0; i < 7; i++) {
    const a = t * (calm ? 0.6 : 2.4) + i * 0.9, r = (calm ? 260 : 210) + 30 * Math.sin(t * 3 + i)
    const gx = calm ? 0 : (Math.sin(t * 47 + i * 5) > 0.6 ? 18 : 0)
    drawBits(x, NOTE_BM, { X: [PINK, GOLD, '#7fd0ff'][i % 3] }, cx + Math.cos(a) * r + gx, cy + Math.sin(a) * r * 0.55 - 40, calm ? 7 : 9, { rot: 0.2 * Math.sin(t * 5 + i) })
    if (!calm && gx) { x.save(); x.globalAlpha = 0.5; R(x, '#ff3b8a', cx + Math.cos(a) * r - 20, cy + Math.sin(a) * r * 0.55 - 50, 40, 6); x.restore() }
  }
}

function scene(x, t, S) {
  const { phase, u, hero } = S
  aisle(x)
  cart(x, 860, 1110)
  if (phase === 'hook') {
    shadow(x, 520, 1150, 270)
    const F = hero(x, t, { x: 520, y: 960, s: 320, mood: 'wide', look: [0, -1], squash: -0.06 + 0.05 * Math.sin(t * 42) })
    headphones(x, F, false)
    notes(x, t, 520, 900, false)
    label(x, 'NOOO', 560, 560 + 6 * Math.sin(t * 50), { size: 72, col: RED, font: INTER, weight: 800, rot: 0.14 })
    return
  }
  const down = u > 0.25
  const calmMood = u < 0.4 ? 'neutral' : u < 3.3 ? 'squint' : 'happy'
  shadow(x, 520, 1150, 270)
  const F = hero(x, t, { x: 520, y: 960, s: 320, mood: calmMood, look: [0, 0], squash: u > 0.6 && u < 3.3 ? 0.05 * Math.sin((u - 0.6) * 2.6) : 0, hops: [2.45 + 0.6, 2.45 + 3.6] })
  headphones(x, F, down)
  notes(x, t, 520, 900, true)
  heartLoop(x, t, 520, 760, { n: 4, rate: 0.4, spread: 300 })
  // the bread hug
  const bk = ease.outBack ? clamp(prog(u, 0.4, 0.7)) : clamp(prog(u, 0.4, 0.7))
  if (bk > 0) bread(x, 520, 1120 - 20 * Math.sin(Math.min(1, bk) * Math.PI / 2), 0.85 * bk)
  if (u > 0.9 && u < 3.3) {
    const inn = Math.floor((u - 0.9) / 0.8) % 2 === 0
    label(x, inn ? 'in…' : 'out…', 790, 820, { size: 48, col: BONE, font: INTER, weight: 800 })
  }
  // the draft
  const pu = u - 3.45
  if (pu > 0) {
    const drop = clamp(prog(pu, 0.75, 1.05))
    const px = lerp(780, 860, drop), py = lerp(800, 1060, ease.inCubic(drop))
    if (drop < 1) phone(x, px, py, { w: 170, h: 290, rot: lerp(0.1, 0.9, drop), sc: Math.min(1, pu / 0.15), draw: (c, w) => { chat(c, w, 40, 'i miss u', { mine: true, size: 24 }); c.fillStyle = BONE; c.fillRect(20, 150, 4, 30 * (Math.sin(t * 12) > 0 ? 1 : 0)) } })
    if (pu > 0.85) bubble(x, t, 330, 640, 2.45 + 3.45 + 0.85, 99, 'not today.', { size: 40, tail: 0.5 })
  }
}

const EP = makeThree({
  id: 'k3se02', sign: 'taurus', dur: 7.6, brk: 'whip', ending: 'cut', focus: [520, 860],
  hook: '*Their* song came on. | Spiral incoming.', accent: '#7fe0a0',
  advice: 'Feel it all the way. | Just *don’t text it.*',
  scene,
  cues: [
    ['pop', 2.9, 659.25, 0.03, -0.3], ['pop', 3.6, 880, 0.03, 0.3], ['pluck', 3.4, 1046.5, 0.03, 0.2, 0.4], ['pluck', 4.2, 880, 0.03, -0.2, 0.4], ['pluck', 5.0, 1046.5, 0.03, 0.2, 0.4],
    ['pop', 5.92, 1318.51, 0.04, 0.3], ['tick', 5.95, 0.06], ['whoosh', 6.65, 0.3, 0.035], ['tom', 6.95, 90, { gain: 0.2, decay: 0.2 }], ['pop', 6.97, 987.77, 0.04, -0.3],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
