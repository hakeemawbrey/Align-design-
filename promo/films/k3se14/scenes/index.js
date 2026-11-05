// k3se14: 3-SECOND ADVICE · "Advice You'd Never Take" (8.0 s vertical trial reel, loops, music: lofi · G).
// Format: k3se01/threekit.js.
//   0.00  frame 0: on the couch ♉ Taurus mid-speech to a sobbing ♏ friend: "you deserve better!!" while Taurus' own
//         phone shows a text from the ex, "u up?", and Taurus typing "omw".
//         Hook: "Giving advice | you'd *never* take."  Pisces sniffles in the corner.
//   0.50  record scratch: freeze; a red "caught" circle lands on Taurus' phone.   0.95–2.45  3 · 2 · 1.
//   2.45  THE STARS: "Talk to yourself | like you *talk to them.*"  "omw" backspaces away; Taurus turns to the mirror:
//         "…you deserve better too."  The friend cheers.
//   7.55–8.0  loop: eases back into frame 0.
import { makeThree, R, box, bubble, label, shadow, phone, chat, star, sparkles, tissues, lerp, prog, ease, clamp, INK, BONE, GOLD, INTER } from '../../k3se01/threekit.js'
import { caught, caughtCues } from '../../hookkit.js'

const CAUGHT = { at: 0.62, x: 860, y: 900, r: 175, out: [2.3, 2.45], label: 'CAUGHT', arrow: 'bl', rec: false }
function couch(x) {
  R(x, '#211a3a', 0, 1150, 1080, 120); R(x, '#2e2650', 0, 1150, 1080, 10)
  box(x, 60, 900, 640, 150, '#4f6fb0', { b: 7, hi: '#6a88c8' }); box(x, 40, 1020, 680, 110, '#5a7cc0', { b: 7, hi: '#7393d0' })
  box(x, 20, 960, 60, 170, '#3f5c98', { b: 7 }); box(x, 680, 960, 60, 170, '#3f5c98', { b: 7 })
}
function mirror(x, k, t, mood) {
  if (k <= 0.01) return
  x.save(); x.translate(930, 860); x.scale(k, k)
  box(x, -110, -230, 220, 400, '#c9a06a', { b: 7 }); R(x, '#9fc6e0', -92, -212, 184, 364)
  x.save(); x.beginPath(); x.rect(-92, -212, 184, 364); x.clip(); x.globalAlpha = 0.75
  star(x, t, 'taurus', { x: 0, y: -10, s: 200, mood, look: [-1, 0], seed: 4, glyph: false })
  x.restore(); x.restore()
}
const screen = (u, phase) => (c, w) => {
  chat(c, w, 40, 'u up?', { size: 40 })
  const n = phase === 'hook' ? 3 : Math.max(0, 3 - Math.floor(prog(u, 0.3, 0.8) * 4))
  if (n > 0) { R(c, '#4f7cd8', 16, 200, w - 32, 54); c.font = `700 30px ${INTER}`; c.fillStyle = BONE; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText('omw'.slice(0, n) + '|', 30, 228) }
  else { R(c, '#2a2448', 16, 200, w - 32, 54); c.font = `700 26px ${INTER}`; c.fillStyle = 'rgba(239,230,214,0.5)'; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText('(deleted)', 30, 228) }
}

function scene(x, t, S) {
  const { phase, u, hero } = S
  couch(x)
  const cheer = phase === 'fix' && u > 2.4
  tissues(x, 120, 1000, 80)
  star(x, t, 'scorpio', { x: 230, y: 930, s: 220, mood: cheer ? 'happy' : 'wide', look: [1, 0], seed: 13, tears: cheer ? 0 : 2, hops: cheer ? [2.45 + 2.45, 2.45 + 2.8] : null })
  if (phase === 'hook') {
    hero(x, t, { x: 520, y: 900, s: 270, mood: 'wide', look: [-1, -0.2], squash: 0.05 * Math.sin(t * 30) })
    bubble(x, t, 400, 690, 0, 0, 'you deserve better!!', { size: 44, k: 1, tail: 0.2 })
    phone(x, 860, 900, { w: 300, h: 400, rot: 0.1, draw: screen(0, 'hook') })
    return
  }
  const turn = ease.inOutCubic(prog(u, 0.9, 1.4))
  mirror(x, clamp(prog(u, 0.9, 1.2)), t, u > 1.6 ? 'happy' : 'neutral')
  hero(x, t, { x: lerp(520, 640, turn), y: 900, s: 270, mood: u < 0.4 ? 'wide' : u > 1.6 ? 'happy' : 'neutral', look: turn > 0.5 ? [1, -0.2] : [1, 0.5], hops: [2.45 + 0.9, 2.45 + 1.6] })
  if (u < 1.0) phone(x, 860, lerp(900, 1300, ease.inCubic(prog(u, 0.85, 1.0))), { w: 300, h: 400, rot: 0.1, draw: screen(u, 'fix') })
  bubble(x, t, 600, 650, 2.45 + 1.6, 99, '…you deserve better too.', { size: 42, tail: 0.2 })
  if (cheer) { label(x, 'YES!!', 230, 740, { size: 52, col: GOLD, font: INTER, weight: 800, rot: -0.15 }); sparkles(x, t, 230, 900, 2.45 + 2.4, 8, 150, 1) }
}

const EP = makeThree({
  id: 'k3se14', sign: 'taurus', dur: 8.0, brk: 'freeze', ending: 'loop', focus: [700, 880],
  hook: "Giving advice | you'd *never* take.", accent: '#7fe0a0',
  advice: 'Talk to yourself | like you *talk to them.*',
  scene, extra: [caught(CAUGHT)], captionTop: 1600,
  cues: [
    ...caughtCues(CAUGHT),
    ['pop', 2.8, 659.25, 0.03, 0.4], ['tick', 2.95, 0.04], ['tick', 3.05, 0.04], ['tick', 3.15, 0.04],
    ['whoosh', 3.35, 0.4, 0.03], ['pop', 3.55, 1318.51, 0.04, 0.4], ['pop', 4.05, 1174.66, 0.04, 0.2],
    ['pop', 4.85, 1567.98, 0.04, -0.4], ['glitter', 4.85, 5.3],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
