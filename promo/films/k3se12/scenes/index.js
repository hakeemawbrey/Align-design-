// k3se12: 3-SECOND ADVICE · "One Nice Text" (8.0 s vertical trial reel, loops, music: dreamy · Eb). Format: k3se01/threekit.js.
//   0.00  frame 0: ♓ Pisces mid-swoon, tipping over backwards, hearts and tiny wedding bells in the air, the phone
//         floating up: "had fun today :)"; a dream cloud already holds a puppy with a name tag (BISCUIT).
//         Hook: "One nice text. | Already *naming the dog.*"  Pisces is already crying happy tears.
//   0.50  record scratch: the swoon freezes mid-tip.   0.95–2.45  3 · 2 · 1.
//   2.45  THE STARS: "Enjoy it. | Let them *show you more.*"  Pisces sits back up, the dream cloud shrinks to one
//         small heart, Pisces types "me too! :)" and grins through happy tears.
//   7.55–8.0  loop: eases back into frame 0.
import { makeThree, R, box, bubble, label, shadow, drawBits, heartLoop, hearts, phone, chat, inSprite, starFrame, tearsCells, lerp, prog, ease, clamp, INK, BONE, GOLD, PINK, INTER } from '../../k3se01/threekit.js'

const BELL = ['..X..', '.XXX.', '.XXX.', 'XXXXX', '..X..']
const DOG = ['XX.....XX', 'XXXXXXXXX', '.XOXXXOX.', '.XXXNXXX.', '..XXXXX..', '.XXXXXXX.', '.XX...XX.']
function cloud(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  for (const [dx, dy, r] of [[-110, 10, 70], [0, -30, 90], [110, 10, 70], [0, 40, 80]]) { x.fillStyle = INK; x.beginPath(); x.arc(dx, dy, r + 7, 0, 7); x.fill() }
  for (const [dx, dy, r] of [[-110, 10, 70], [0, -30, 90], [110, 10, 70], [0, 40, 80]]) { x.fillStyle = '#f3ecff'; x.beginPath(); x.arc(dx, dy, r, 0, 7); x.fill() }
  drawBits(x, DOG, { X: '#c98a52', O: INK, N: INK }, -40, 0, 14)
  box(x, 40, -10, 130, 44, GOLD, { b: 4 })
  x.font = `800 26px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('BISCUIT', 105, 13)
  x.restore()
}
function pisces(x, t, cx, cy, rot, mood, tears, hops) {
  x.save(); x.translate(cx, cy + 120); x.rotate(rot); x.translate(-cx, -cy - 120)
  const o = { x: cx, y: cy, s: 360, mood, look: [0, -0.4], seed: 6, hops }
  const F = starFrame(o.x, o.y, o.s, t, o)
  S_star(x, t, o)
  inSprite(x, F, () => tearsCells(x, t, tears))
  x.restore()
}
let S_star = null

function scene(x, t, S) {
  const { phase, u } = S
  S_star = (c, tt, o) => S.star(c, tt, 'pisces', o)
  R(x, '#211a3a', 0, 1150, 1080, 120); R(x, '#2e2650', 0, 1150, 1080, 10)
  // a beanbag
  x.fillStyle = INK; x.beginPath(); x.ellipse(480, 1090, 250, 80, 0, 0, 7); x.fill(); x.fillStyle = '#5ab0a0'; x.beginPath(); x.ellipse(480, 1086, 240, 70, 0, 0, 7); x.fill()
  if (phase === 'hook') {
    cloud(x, 720, 620, 1.3)
    heartLoop(x, t, 480, 900, { n: 8, rate: 1.1, spread: 520, rise: 380, cell: 7 })
    for (let i = 0; i < 3; i++) { const a = t * 2 + i * 2.1; drawBits(x, BELL, { X: GOLD }, 480 + Math.cos(a) * 330, 820 + Math.sin(a) * 120, 10, { rot: 0.3 * Math.sin(t * 9 + i) }) }
    pisces(x, t, 420, 930, -0.45 - 0.08 * Math.sin(t * 5), 'heart', 3)
    phone(x, 850, 1000 - 20 * t, { w: 300, h: 420, rot: 0.25, draw: (c, w) => chat(c, w, 60, 'had fun today :)', { size: 34 }) })
    return
  }
  const up = ease.outBack(clamp(u / 0.5))
  cloud(x, 720, 620, 1.3 - 1.3 * ease.inCubic(clamp(prog(u, 0.2, 0.7))))
  if (u > 0.7) drawBits(x, ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: PINK }, 740, 620 - 10 * Math.sin(t * 3), 8 * clamp(prog(u, 0.7, 0.9)))
  pisces(x, t, 420, 930, lerp(-0.45, 0, up), u < 0.5 ? 'wide' : 'happy', u < 0.5 ? 2 : 3, [2.45 + 0.5, 2.45 + 1.6, 2.45 + 3.2])
  phone(x, 840, lerp(1000, 920, up), { w: 300, h: 420, rot: lerp(0.25, 0.05, up), draw: (c, w) => {
    chat(c, w, 60, 'had fun today :)', { size: 34 })
    if (u > 1.4) chat(c, w, 150, 'me too! :)', { mine: true, size: 36, k: clamp(prog(u, 1.4, 1.55)) })
  } })
  if (u > 1.6) hearts(x, t, 2.45 + 1.6, 460, 760, { n: 5, cell: 7 })
}

const EP = makeThree({
  id: 'k3se12', sign: 'pisces', dur: 8.0, brk: 'freeze', ending: 'loop', focus: [500, 860], pis: false,
  hook: 'One nice text. | Already *naming the dog.*', accent: '#c9a6ff',
  advice: 'Enjoy it. | Let them *show you more.*',
  scene,
  cues: [
    ['glitter', 0.0, 0.4], ['bell', 0.1, 2093, 0.02, 0.8, 0.3],
    ['whoosh', 2.5, 0.4, 0.03], ['pop', 2.9, 880, 0.035, 0], ['pop', 3.2, 1318.51, 0.035, 0.4],
    ['pop', 3.85, 1174.66, 0.04, 0.4], ['pop', 3.95, 1567.98, 0.04, 0.4], ['glitter', 4.05, 4.5],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
