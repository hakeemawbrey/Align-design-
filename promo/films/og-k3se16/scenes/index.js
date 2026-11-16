// og-k3se16: the social rework of k3se16, 3-SECOND ADVICE · "Cereal for Dinner" (8.0 s vertical, dreamy · C).
// Same kitchen, Cancer and story. Static HOOK (outline) from frame 0 instead of the slammed title; no series bug; calm
// freeze; Cancer pushed further (sobbing through the crunch); ends on Cancer smiling through the tears (no loop-back).
// Uses ../threekit.js (og copy). Original notes:
//   0.00  frame 0: ♋ Cancer wailing on the kitchen floor, mid-pour of cereal into a bowl that is already overflowing,
//         cereal flying.  Hook: "Heartbroken. | Cereal for dinner. *Again.*"  Pisces sobs along in the corner.
//   0.50  record scratch: the cereal freezes mid-air.   0.95–2.45  3 · 2 · 1.
//   2.45  THE STARS: "Drink water. Call a friend. | *Sleep.*"  A glass of water slides in, Cancer sips; Cancer calls:
//         "can you come over?" and the friend: "on my way. bringing soup."  Cancer smiles through the tears.
//   7.55–8.0  loop: eases back into frame 0.
import { makeThree, R, box, bubble, label, shadow, hearts, lerp, prog, ease, clamp, INK, BONE, GOLD, INTER } from '../threekit.js'

function kitchen(x) {
  R(x, '#2a2246', 0, 1150, 1080, 120)
  for (let i = 0; i < 9; i++) R(x, i % 2 ? '#3a3260' : '#2f2852', i * 120, 1150, 120, 120)
  box(x, 640, 640, 400, 510, '#5c6a8a', { b: 7, hi: '#71809f' }); R(x, INK, 836, 660, 8, 470); R(x, '#c9cfe0', 800, 860, 12, 60); R(x, '#c9cfe0', 868, 860, 12, 60)
}
function cerealBox(x, cx, cy, rot) {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  box(x, -70, -110, 140, 220, '#f2c75c', { b: 6 }); R(x, '#e8344e', -60, -70, 120, 60)
  x.font = `800 28px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('O’s', 0, -40)
  x.restore()
}
function bowl(x, cx, cy) {
  x.fillStyle = INK; x.beginPath(); x.ellipse(cx, cy, 110, 40, 0, 0, Math.PI); x.fill(); x.fillRect(cx - 116, cy - 8, 232, 14)
  x.fillStyle = '#7fd0ff'; x.beginPath(); x.ellipse(cx, cy + 2, 100, 32, 0, 0, Math.PI); x.fill()
  for (let i = 0; i < 9; i++) { x.fillStyle = INK; x.beginPath(); x.arc(cx - 80 + i * 20, cy - 10 - (i % 3) * 12, 12, 0, 7); x.fill(); x.fillStyle = '#e0a860'; x.beginPath(); x.arc(cx - 80 + i * 20, cy - 10 - (i % 3) * 12, 8, 0, 7); x.fill() }
}
function cereal(x, t, cx, cy) {
  for (let i = 0; i < 16; i++) {
    const p = ((t * 1.4 + i / 16) % 1 + 1) % 1, a = -1.2 + (i % 5) * 0.55
    const px = cx + Math.cos(a) * 260 * p, py = cy - 120 * Math.sin(Math.PI * p) + 220 * p * p
    x.fillStyle = INK; x.beginPath(); x.arc(px, py, 12, 0, 7); x.fill(); x.fillStyle = '#e0a860'; x.beginPath(); x.arc(px, py, 8, 0, 7); x.fill()
  }
}
function glass(x, cx, cy) { box(x, cx - 34, cy - 70, 68, 120, 'rgba(190,230,255,0.55)', { b: 5 }); R(x, '#7fd0ff', cx - 34, cy - 20, 68, 70) }

function scene(x, t, S) {
  const { phase, u, hero } = S
  kitchen(x)
  bowl(x, 560, 1110)
  if (phase === 'hook') {
    shadow(x, 330, 1150, 260)
    hero(x, t, { x: 330, y: 990, s: 290, mood: 'wide', look: [0, -1], tears: 3, squash: 0.06 * Math.sin(t * 36) })
    cerealBox(x, 520, 840, 2.2)
    cereal(x, t, 520, 900)
    label(x, 'WAAAH (crunch)', 330, 720, { size: 60, col: '#7fd0ff', font: INTER, weight: 800, rot: -0.12 })
    return
  }
  const gk = ease.outCubic(prog(u, 0.3, 0.8))
  if (gk > 0) glass(x, lerp(1200, 520, gk), 1080)
  shadow(x, 330, 1150, 260)
  const smile = u > 2.9
  hero(x, t, { x: 330, y: 990, s: 290, mood: smile ? 'happy' : u < 0.4 ? 'wide' : 'neutral', look: [1, 0], tears: smile ? 1 : 2, hops: [2.45 + 0.9, 2.45 + 2.9] })
  if (u < 0.6) cerealBox(x, 520, lerp(840, 1300, ease.inCubic(clamp(u / 0.6))), 2.2 - 2 * clamp(u / 0.6))
  if (u > 0.9 && u < 1.5) label(x, 'sip. (hydrated?!)', 600, 940, { size: 36, col: BONE })
  bubble(x, t, 400, 700, 2.45 + 1.5, 99, 'can you come over? it’s bad.', { size: 38, tail: -0.3 })
  bubble(x, t, 560, 570, 2.45 + 2.6, 99, 'omw. bringing soup + a blanket.', { size: 34, tail: 0.3, col: '#c9f2d4' })
  if (smile) hearts(x, t, 2.45 + 2.9, 170, 900, { n: 5, cell: 7, spread: 80 })
}

const EP = makeThree({
  id: 'og-k3se16', sign: 'cancer', dur: 8.0, brk: 'freeze', ending: 'cut', focus: [430, 880], caption: 'put the spoon *down.*',
  hook: 'Heartbroken. | Cereal for dinner. *Again.*', accent: '#7fd0ff',
  advice: 'Drink water. Call a friend. | *Sleep.*',
  scene,
  cues: [
    ...[0.0, 0.08, 0.16, 0.24, 0.32, 0.4].map(t => ['tick', t, 0.03]),
    ['whoosh', 2.75, 0.5, 0.03], ['pop', 3.4, 659.25, 0.03, 0.2],
    ['pop', 3.95, 1174.66, 0.035, -0.3], ['pop', 5.05, 1318.51, 0.04, 0.3], ['glitter', 5.35, 5.8], ['pluck', 5.4, 1046.5, 0.035, -0.3, 0.5],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
// social hook: static caption from frame 0 (the kit's slammed title is gone in the og kit copy)
export const HOOK = 'Dinner: cereal. | Location: *floor.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 2.45
