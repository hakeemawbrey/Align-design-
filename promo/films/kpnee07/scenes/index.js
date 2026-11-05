// kpnee07: PLANET TALK: NEPTUNE, "Neptune to Libra: Just the Trailer" (23 s vertical, star_talk, synthwave · C). Hard cut.
//   0.00  frame 0: a projector beam hits Libra mid-swoon; Neptune mid-lean out of the projection booth.
//         "Libra. That was just | the *trailer.*" · 0.5 glitch flash
//   2.6   the profile on a fictional app (Swoonly): the coat, the playlist, the photos. "I'm in love. I've seen their
//         *profile.*" · Neptune: "gorgeous trailer. but you haven't seen the *film.*"
//   9.0   the trailer plays, epic: THIS SUMMER… / ONE SWIPE… / CHANGED EVERYTHING · Pisces sobs · Libra: "I'd *watch* it."
//  15.0   Neptune: "then go on the date. and *watch* the film." · a ticket: ADMIT ONE · FIRST DATE
//  20.8   "Buy the ticket. *Watch* the film." Hard cut.
import { episode, P, drawSpace, drawSign, pop01, outK, prog, ease, lerp, clamp, INK, BONE, GOLD, ROSE, NEP, MONO } from '../../kpnee01/scenes/nepkit.js'

const D = 23
const T = { prof: 2.6, nep1: 5.9, trailer: 9.0, watch: 12.4, go: 15.0, ticket: 18.6, end: 20.8 }

function booth(x, t) {
  drawSpace(x, t, { planet: 'neptune', seed: 71 })
  x.fillStyle = '#140f30'; x.fillRect(0, 380, 1080, 560)
  P.box(x, 290, 650, 460, 380, '#2b2350', { r: 12, lw: 10, shadow: false })
  x.fillStyle = '#0b0818'; x.fillRect(80, 480, 420, 340)
}
function profile(x, t, k) {
  if (k <= 0.01) return
  x.save(); x.translate(470, 790); x.scale(k, k)
  P.box(x, 0, 0, 600, 820, '#fbf6ea', { r: 40, lw: 10 })
  P.mono(x, 'Swoonly', 0, -350, { color: '#d0303f', size: 34 })
  x.fillStyle = '#c9a6ff'; x.fillRect(-250, -310, 500, 340)
  // the coat: a long camel coat silhouette on the profile photo
  x.fillStyle = '#c98b52'; x.beginPath(); x.moveTo(-70, -220); x.lineTo(70, -220); x.lineTo(110, 20); x.lineTo(-110, 20); x.closePath(); x.fill()
  x.fillStyle = '#efe6d6'; x.beginPath(); x.arc(0, -250, 44, 0, Math.PI * 2); x.fill()
  const tags = [['the coat', -30, 90, GOLD], ['the playlist ♪', 30, 180, ROSE], ['the photos (all 6)', -10, 270, '#9fc0ff']]
  tags.forEach(([s, ox, oy, c], i) => P.sticker(x, s, ox, oy, { k: pop01(t, T.prof + 0.6 + i * 0.7, 0.3), col: c, size: 34, rot: i % 2 ? 0.04 : -0.04 }))
  x.restore()
}
function trailer(x, t) {
  P.screen(x, 470, 760, 820, 560, sx => {
    sx.fillStyle = '#0b0818'; sx.fillRect(60, 480, 820, 560)
    const cards = ['THIS SUMMER…', 'ONE SWIPE…', 'CHANGED *EVERYTHING.*']
    const i = Math.min(2, Math.floor(Math.max(0, t - T.trailer - 0.3) / 1.1))
    const lt = t - T.trailer - 0.3 - i * 1.1
    if (t > T.trailer + 0.3) P.txt(sx, cards[i], 470, 720, { size: i === 2 ? 50 : 64, color: BONE, accentColor: GOLD, alpha: clamp(lt * 4) * (i < 2 ? 1 - prog(lt, 0.9, 1.1) : 1), maxW: 660 })
    P.glow(sx, 470, 760, 400, '#9fc0ff', 0.15 + 0.1 * Math.sin(t * 9))
  }, { curtain: 0.05 })
}
function ticket(x, t, k) {
  if (k <= 0.01) return
  x.save(); x.translate(470, 760); x.rotate(-0.08); x.scale(k, k)
  P.box(x, 0, 0, 640, 260, GOLD, { r: 18, lw: 10 })
  x.fillStyle = INK; for (let i = 0; i < 6; i++) { x.beginPath(); x.arc(-200, -100 + i * 40, 7, 0, Math.PI * 2); x.fill() }
  P.mono(x, 'ADMIT ONE', 60, -60, { color: INK, size: 44 })
  P.mono(x, 'FIRST DATE · SAT 7 PM', 60, 10, { color: INK, size: 30 })
  P.mono(x, 'SEAT: next to them', 60, 70, { color: '#8a1a38', size: 28 })
  x.restore()
}

const E = episode({
  sign: 'libra', duration: D, ending: 'cut',
  entrance: { kind: 'burst', at: -0.45, x: 290, y: 650, size: 330 },
  hook: { text: 'Libra. That was just | the *trailer.*', out: [2.35, 2.55], size: 104 },
  fx: [{ kind: 'glitch', at: 0.5, len: 0.6, dialog: false }],
  caps: [{ at: T.end, text: 'Buy the ticket. | *Watch* the film.', top: 250, size: 104 }],
  cry: [[0, 2], [4.0, 2], [9.6, 3], [12.0, 2], [T.ticket + 0.2, 3]],
  shots: [
    { a: -1, b: T.prof, bg: (x, t) => booth(x, t), mid: (x, t) => P.beam(x, 420, 690, 700, 1400, 520, 0.3, '#fff3c8'),
      nep: { x: 290, y: 650, size: 330, mood: 'wide', rot: 0.15 }, sign: { x: 720, y: 1420, size: 320, mood: 'love', look: [-0.6, -1], rot: -0.3 } },
    { a: T.prof, b: T.trailer, bg: (x, t) => drawSpace(x, t, { planet: 'neptune', seed: 72 }), mid: (x, t) => profile(x, t, pop01(t, T.prof, 0.4)),
      nep: { x: 150, y: 1380, size: 220, mood: [[0, 'love'], [T.nep1, 'sly']] }, sign: { x: 830, y: 1400, size: 270, mood: 'love', look: [-1, -1] } },
    { a: T.trailer, b: T.go, bg: (x, t) => drawSpace(x, t, { planet: 'neptune', seed: 73 }), mid: (x, t) => trailer(x, t),
      nep: { x: 180, y: 1380, size: 240, mood: [[0, 'love']], tears: [[T.trailer + 2.4, 1]] }, sign: { x: 830, y: 1400, size: 270, mood: [[0, 'wide'], [T.watch, 'sparkle']], look: [-1, -1] } },
    { a: T.go, b: T.end, bg: (x, t) => drawSpace(x, t, { planet: 'neptune', seed: 74 }), mid: (x, t) => ticket(x, t, pop01(t, T.ticket, 0.35)),
      nep: { x: 220, y: 1340, size: 280, mood: [[0, 'happy']] }, sign: { x: 800, y: 1400, size: 280, mood: [[0, 'neutral'], [T.ticket, 'happy']], look: [-1, -1] } },
    { a: T.end, b: D + 1, bg: (x, t) => { drawSpace(x, t, { planet: 'neptune', seed: 75 }); P.filmEdge(x, t, { alpha: 0.6 }) }, mid: (x, t) => ticket(x, t, 0.8),
      nep: { x: 220, y: 1340, size: 280, mood: 'proud' }, sign: { x: 800, y: 1400, size: 280, mood: 'happy', look: [-1, -1] } },
  ],
  lines: [
    { t0: T.prof + 0.3, t1: T.nep1 - 0.25, who: 'libra', text: "I'm in love. I've seen their *profile.*", x: 560, y: 1720, tailUp: true, tail: 250 },
    { t0: T.nep1, t1: T.trailer - 0.2, who: 'neptune', text: "gorgeous trailer. but you haven't seen the *film.*", x: 520, y: 1720, tailUp: true, tail: -280 },
    { t0: T.watch, t1: T.go - 0.2, who: 'libra', text: "I'd *watch* it.", x: 700, y: 1720, tailUp: true, tail: 120 },
    { t0: T.go + 0.2, t1: T.end - 0.2, who: 'neptune', text: 'then go on the date. and *watch* the film.', x: 540, y: 1720, tailUp: true, tail: -280 },
  ],
  cues: [['whoosh', T.prof, 0.4, 0.04], ['pop', T.prof + 0.6, 880, 0.04, 0], ['pop', T.prof + 1.3, 987.77, 0.04, 0], ['pop', T.prof + 2.0, 1174.66, 0.04, 0], ['boom', T.trailer + 0.3, 0.2], ['boom', T.trailer + 1.4, 0.2], ['boom', T.trailer + 2.5, 0.3], ['riser', T.trailer + 1.4, T.trailer + 2.5, 0.04], ['pop', T.ticket, 1567.98, 0.05, 0], ['glitter', T.ticket, T.ticket + 0.5]],
})
export const DURATION = E.DURATION, SCENES = E.SCENES, CUES = E.CUES
