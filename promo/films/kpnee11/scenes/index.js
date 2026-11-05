// kpnee11: PLANET TALK: NEPTUNE, "Neptune to Aquarius: Caught Watching the Rom-Com" (25 s vertical, star_talk, chiptune · D).
// Loop.
//   0.00  frame 0: Neptune mid-drop through the ceiling, plaster flying; Aquarius mid-scramble hiding the remote under a
//         blanket, a rom-com on the TV. "Aquarius. I *saw* | that rom-com." · 0.9 CAUGHT IN 4K
//   2.6   "I don't do romance. it was *research.*" · Neptune: "you paused it on the *airport scene.*" (the TV: ❚❚ at the gate)
//   9.0   "fine. I want someone to be *weird* with." · Neptune, in tears: "that's the most romantic sentence I've *ever*
//         heard." · Pisces fountains
//  16.0   under the blanket together: "scoot over. play it from the *top.*" · "…okay. but I'm not *crying.*"
//  21.6   "Weird people get *love stories* too." The loop drops Neptune back through the ceiling.
import { episode, P, drawSpace, drawSign, pop01, outK, prog, ease, lerp, clamp, rng, INK, BONE, GOLD, ROSE, NEP, MONO } from '../../kpnee01/scenes/nepkit.js'

const D = 25
const T = { research: 2.6, airport: 6.1, weird: 9.0, sentence: 12.8, couch: 16.0, crying: 19.3, end: 21.6 }

function room(x, t, { tv = 'romcom', ceiling = false } = {}) {
  const g = x.createLinearGradient(0, 0, 0, 1920); g.addColorStop(0, '#1c1440'); g.addColorStop(1, '#2d2160'); x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
  // wallpaper stars
  for (let i = 0; i < 40; i++) { x.fillStyle = 'rgba(239,230,214,0.06)'; x.fillRect((i * 137) % 1080, 380 + (i * 89) % 900, 10, 10) }
  if (ceiling) {
    x.fillStyle = '#120c2c'; x.fillRect(0, 0, 1080, 160)
    const R = rng(3)
    for (let i = 0; i < 18; i++) { const px = 540 + (R() - 0.5) * 700, py = 160 + (t + 0.6) * (300 + R() * 600), r = 12 + R() * 22; x.fillStyle = '#c9c4e0'; x.fillRect(px - r, py - r, r * 2, r * 2) }
  }
  // the TV
  P.box(x, 540, 1000, 640, 400, '#0b0818', { r: 18, lw: 12 })
  x.save(); x.beginPath(); x.rect(240, 820, 600, 360); x.clip()
  if (tv === 'romcom') {
    const gg = x.createLinearGradient(0, 820, 0, 1180); gg.addColorStop(0, '#ffb3cf'); gg.addColorStop(1, '#ffd98a'); x.fillStyle = gg; x.fillRect(240, 820, 600, 360)
    x.fillStyle = '#4a3a78'; x.beginPath(); x.arc(540, 980, 120, Math.PI, 0); x.fill(); x.fillRect(536, 980, 8, 120)
    drawSign(x, 'libra', 490, 1070, 90, t, { color: '#9fc0ff', glyph: false, mood: 'heart', blink: false }); drawSign(x, 'libra', 590, 1070, 90, t, { color: '#ffb38a', glyph: false, mood: 'heart', blink: false })
    P.hearts(x, t, -1, 540, 1150, { n: 5, spread: 300, size: 16, life: 4 })
  } else {
    x.fillStyle = '#c9e0ff'; x.fillRect(240, 820, 600, 360)
    x.fillStyle = '#4a3a78'; x.fillRect(300, 880, 160, 260); P.mono(x, 'GATE 12', 380, 860, { color: INK, size: 26 })
    drawSign(x, 'libra', 620, 1080, 110, 4, { color: '#ffb38a', glyph: false, mood: 'wide', blink: false })
    x.fillStyle = 'rgba(11,8,24,0.5)'; x.fillRect(240, 820, 600, 360)
    x.fillStyle = BONE; x.fillRect(500, 940, 26, 100); x.fillRect(554, 940, 26, 100)
  }
  x.restore()
  // couch
  P.box(x, 540, 1620, 1000, 340, '#5a3a9a', { r: 60, lw: 10, shadow: false })
  P.box(x, 540, 1500, 900, 160, '#6e4ab8', { r: 40, lw: 8, shadow: false })
}
function blanket(x, t, cx, cy, w = 420) {
  x.save(); x.translate(cx, cy)
  x.fillStyle = '#ffd98a'; x.strokeStyle = INK; x.lineWidth = 8
  x.beginPath(); x.moveTo(-w / 2, -30); x.quadraticCurveTo(0, -80 + Math.sin(t * 3) * 6, w / 2, -30); x.lineTo(w / 2 + 20, 160); x.lineTo(-w / 2 - 20, 160); x.closePath(); x.fill(); x.stroke()
  x.strokeStyle = 'rgba(224,74,95,0.6)'; x.lineWidth = 10; for (let i = -2; i <= 2; i++) { x.beginPath(); x.moveTo(i * 80, -50); x.lineTo(i * 90, 160); x.stroke() }
  x.restore()
}
function remote(x, t, cx, cy, rot) { x.save(); x.translate(cx, cy); x.rotate(rot); P.box(x, 0, 0, 60, 160, '#2b2350', { r: 14, lw: 6, shadow: false }); x.fillStyle = '#e04a5f'; x.beginPath(); x.arc(0, -50, 10, 0, Math.PI * 2); x.fill(); x.restore() }

const E = episode({
  sign: 'aquarius', duration: D, ending: 'loop',
  entrance: { kind: 'crash', at: -0.62, x: 540, y: 650, size: 300 },
  hook: { text: 'Aquarius. I *saw* | that rom-com.', out: [2.35, 2.55], size: 112 },
  fx: [{ kind: 'caught', at: 0.9, x: 760, y: 1420, r: 170, out: [2.4, 2.6] }],
  caps: [{ at: T.end, text: 'Weird people get | *love stories* too.', top: 250, size: 104, out: [D - 0.5, D - 0.3] }],
  cry: [[0, 2], [4.0, 2], [10.2, 3], [13.0, 3], [16.6, 2], [T.crying, 3]],
  shots: [
    { a: -1, b: T.research, bg: (x, t) => room(x, t, { ceiling: true }), front: (x, t) => { blanket(x, t, 760, 1500); remote(x, t, 860, 1560 - (t + 1) * 20, 0.6 + t) },
      nep: { x: 540, y: 650, size: 300, mood: 'wide' }, sign: { x: 760, y: 1400, size: 260, mood: 'wide', look: [-1, -1] } },
    { a: T.research, b: T.weird, bg: (x, t) => room(x, t, { tv: t > T.airport ? 'paused' : 'romcom' }), front: (x, t) => blanket(x, t, 760, 1500),
      nep: { x: 200, y: 1300, size: 260, mood: [[0, 'sly'], [T.airport + 1.5, 'happy']] }, sign: { x: 760, y: 1400, size: 260, mood: [[0, 'proud'], [T.airport + 1.2, 'wide']], look: [-1, -0.3] } },
    { a: T.weird, b: T.couch, bg: (x, t) => room(x, t, { tv: 'paused' }), front: (x, t) => { blanket(x, t, 760, 1500); P.hearts(x, t, T.sentence, 300, 1200, { n: 8, spread: 400 }) },
      nep: { x: 200, y: 1300, size: 260, mood: [[0, 'neutral'], [T.sentence, 'love']], tears: [[T.sentence, 2]] }, sign: { x: 760, y: 1400, size: 260, mood: [[0, 'sad'], [T.sentence + 1, 'happy']], look: [0, 0] } },
    { a: T.couch, b: T.end, bg: (x, t) => room(x, t), front: (x, t) => blanket(x, t, 540, 1500, 760),
      nep: { x: 380, y: 1360, size: 240, mood: 'love' }, sign: { x: 700, y: 1400, size: 250, mood: [[0, 'happy'], [T.crying, 'squint']], tears: [[T.crying, 1]], look: [0, -1] } },
    { a: T.end, b: D + 1, bg: (x, t) => room(x, t), front: (x, t) => blanket(x, t, 540, 1500, 760),
      nep: { x: 380, y: 1360, size: 240, mood: 'love' }, sign: { x: 700, y: 1400, size: 250, mood: 'happy', tears: 1, look: [0, -1] } },
  ],
  lines: [
    { t0: T.research + 0.3, t1: T.airport - 0.25, who: 'aquarius', text: "I don't do romance. it was *research.*", x: 560, y: 640, tail: 200 },
    { t0: T.airport, t1: T.weird - 0.2, who: 'neptune', text: 'you paused it on the *airport scene.*', x: 520, y: 640, tail: -280 },
    { t0: T.weird + 0.3, t1: T.sentence - 0.2, who: 'aquarius', text: 'fine. I want someone to be *weird* with.', x: 560, y: 640, tail: 200 },
    { t0: T.sentence, t1: T.couch - 0.2, who: 'neptune', text: "that's the most romantic sentence I've *ever* heard.", x: 540, y: 640, tail: -280 },
    { t0: T.couch + 0.3, t1: T.crying - 0.2, who: 'neptune', text: 'scoot over. play it from the *top.*', x: 540, y: 640, tail: -160 },
    { t0: T.crying, t1: T.end - 0.2, who: 'aquarius', text: "…okay. but I'm not *crying.*", x: 600, y: 640, tail: 140 },
  ],
  cues: [['crash', 0.0, { gain: 0.06 }], ['whoosh', T.research, 0.4, 0.04], ['tick', T.airport + 0.3, 0.08], ['glitter', T.sentence, T.sentence + 0.8], ['whoosh', T.couch, 0.4, 0.04], ['pop', T.couch + 0.4, 880, 0.04, 0]],
})
export const DURATION = E.DURATION, SCENES = E.SCENES, CUES = E.CUES
