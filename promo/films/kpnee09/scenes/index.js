// kpnee09: PLANET TALK: NEPTUNE, "Neptune to Sagittarius: Coffee, Not a Flight" (24 s vertical, star_talk, house · A).
// Hard cut.
//   0.00  frame 0: an airport departures board; Neptune mid-surf on a comet's tail, Sag mid-sprint with a suitcase.
//         "Sagittarius. Put the | passport *down.*" · 0.5 whip zoom
//   2.6   the festival snapshot (string lights, one hour of talking): "we talked for an *hour.* I'm moving cities."
//         · Neptune: "a gorgeous meet-cute! *classic* act one."
//   9.0   the storyboard: the next scene is a coffee cup. "but the next scene isn't a flight. it's a *coffee.*"
//         · Sag: "…a *coffee?*"
//  15.0   "a coffee. then another. then *see.*" · Sag texts "coffee when you're back in town?" · "yes!! tuesday?"
//  21.6   the board flips: COFFEE · TUE · ON TIME. "Book a coffee. *Not* a flight." Hard cut.
import { episode, P, drawSpace, drawSign, pop01, outK, prog, ease, lerp, clamp, INK, BONE, GOLD, ROSE, NEP, MONO } from '../../kpnee01/scenes/nepkit.js'

const D = 24
const T = { fest: 2.6, nep1: 6.2, board: 9.0, coffee: 12.6, text: 15.0, reply: 19.8, end: 21.6 }

function departures(x, t, rows) {
  drawSpace(x, t, { planet: 'neptune', seed: 91 })
  P.box(x, 540, 830, 980, 480, '#0b0818', { r: 16, lw: 10 })
  P.mono(x, 'DEPARTURES', 540, 640, { color: GOLD, size: 40 })
  rows.forEach((r, i) => {
    const y = 720 + i * 82
    x.fillStyle = '#1c1636'; x.fillRect(80, y - 32, 920, 64)
    P.mono(x, r[0], 110, y, { color: r[2] || '#ffd98a', size: 34, align: 'left' })
    P.mono(x, r[1], 970, y, { color: r[2] || '#ffd98a', size: 30, align: 'right' })
  })
  x.fillStyle = '#2a1d4a'; x.fillRect(0, 1560, 1080, 360)
}
const ROWS0 = [['ANYWHERE', 'BOARDING'], ['THEIR CITY', 'NOW!!'], ['NEW LIFE', 'GATE 9'], ['FOREVER', 'ON TIME']]
function comet(x, t, cx, cy) {
  for (let i = 0; i < 14; i++) {
    const k = i / 14
    x.fillStyle = `rgba(160,220,255,${0.5 * (1 - k)})`; x.beginPath(); x.arc(cx - 120 - i * 50, cy + 70 + i * 26 + Math.sin(t * 9 + i) * 8, 90 * (1 - k * 0.8), 0, Math.PI * 2); x.fill()
  }
}
function suitcase(x, cx, cy, s = 1) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  P.box(x, 0, 0, 170, 220, '#e04a5f', { r: 20, lw: 8, shadow: false })
  x.strokeStyle = INK; x.lineWidth = 8; x.strokeRect(-40, -150, 80, 40)
  P.sticker(x, '✈', 0, 10, { col: BONE, size: 40 })
  x.restore()
}
function festival(x, t, k) {
  if (k <= 0.01) return
  x.save(); x.translate(470, 790); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-330, -330, 660, 700); x.fillStyle = BONE; x.fillRect(-320, -320, 640, 680)
  x.fillStyle = '#1d1640'; x.fillRect(-290, -290, 580, 500)
  for (let i = 0; i < 12; i++) { const px = -270 + i * 50, py = -230 + Math.sin(i * 0.9) * 20; x.fillStyle = ['#ffd98a', ROSE, '#9fc0ff'][i % 3]; x.beginPath(); x.arc(px, py, 12, 0, Math.PI * 2); x.fill() }
  drawSign(x, 'sagittarius', -90, 50, 190, 3, { mood: 'happy', glyph: false, blink: false })
  drawSign(x, 'libra', 100, 50, 190, 3, { mood: 'happy', glyph: false, blink: false, color: '#9fe6b0' })
  x.font = "italic 600 42px 'EB Garamond', Georgia, serif"; x.fillStyle = INK; x.textAlign = 'center'; x.fillText('festival · talked for 1 hour', 0, 290)
  x.restore()
}
function storyboard(x, t) {
  P.box(x, 470, 760, 820, 460, '#fbf6ea', { r: 10, lw: 8 })
  const cells = [['ACT I', 'the meet-cute'], ['NEXT', ''], ['LATER', '…we’ll see']]
  cells.forEach(([a, b], i) => {
    const cx = 210 + i * 260, k = pop01(t, T.board + 0.3 + i * 0.3, 0.3)
    P.box(x, cx, 790, 230 * k, 300 * k, i === 1 && t > T.board + 1.6 ? GOLD : '#efe6ff', { r: 14, lw: 6, shadow: false })
    if (k > 0.6) { P.mono(x, a, cx, 680, { color: INK, size: 30 }); if (b) P.txt(x, b, cx, 770, { size: 34, color: INK, shadow: false, maxW: 210 }) }
  })
  // the coffee cup in the NEXT cell
  const c = pop01(t, T.board + 1.0, 0.35)
  if (c > 0.01) {
    x.save(); x.translate(470, 820); x.scale(c, c)
    x.fillStyle = BONE; x.strokeStyle = INK; x.lineWidth = 7
    x.beginPath(); x.moveTo(-55, -50); x.lineTo(55, -50); x.lineTo(42, 60); x.lineTo(-42, 60); x.closePath(); x.fill(); x.stroke()
    x.fillStyle = '#c98b52'; x.fillRect(-55, -20, 110, 34); x.strokeRect(-55, -20, 110, 34)
    x.strokeStyle = 'rgba(239,230,214,0.8)'; x.lineWidth = 6; for (let i = 0; i < 3; i++) { x.beginPath(); x.moveTo(-25 + i * 25, -70); x.quadraticCurveTo(-10 + i * 25 + Math.sin(t * 5 + i) * 8, -100, -25 + i * 25, -130); x.stroke() }
    x.restore()
  }
}
const MSGS = [{ at: T.text + 3.0, side: 'R', text: "coffee when you're back in town?" }, { at: T.reply, side: 'L', text: 'yes!! tuesday?' }]
const ROWS1 = [['COFFEE', 'TUE · ON TIME', '#9fe6b0'], ['ANOTHER COFFEE', 'SOON', '#9fe6b0'], ['THEIR CITY', 'LATER, MAYBE'], ['FOREVER', 'NOT YET']]

const E = episode({
  sign: 'sagittarius', duration: D, ending: 'cut',
  entrance: { kind: 'zoom', at: -0.55, x: 540, y: 1270, size: 340 },
  hook: { text: 'Sagittarius. Put the | passport *down.*', out: [2.35, 2.55], size: 100 },
  fx: [{ kind: 'whip', at: 0.5 }],
  caps: [{ at: T.end, text: 'Book a coffee. | *Not* a flight.', top: 250, size: 104 }],
  cry: [[0, 2], [4.0, 3], [6.8, 2], [13.0, 2], [T.reply + 0.2, 3]],
  shots: [
    { a: -1, b: T.fest, bg: (x, t, S) => { departures(x, t, ROWS0); P.speed(x, t, 540, 1270, { a: 0.8 }) }, back: (x, t, S) => comet(x, t, S.nep.x, S.nep.y),
      front: (x, t) => suitcase(x, 960, 1640, 1),
      nep: { x: 540, y: 1270, size: 340, mood: 'wide', rot: -0.2 }, sign: { x: 780, y: 1600, size: 250, mood: 'wide', look: [-1, -1], squash: -0.08 } },
    { a: T.fest, b: T.board, bg: (x, t) => drawSpace(x, t, { planet: 'neptune', seed: 92 }), mid: (x, t) => festival(x, t, pop01(t, T.fest, 0.4)),
      nep: { x: 160, y: 1360, size: 230, mood: [[0, 'love'], [T.nep1, 'happy']] }, sign: { x: 820, y: 1400, size: 280, mood: 'sparkle', look: [-1, -1] } },
    { a: T.board, b: T.text, bg: (x, t) => drawSpace(x, t, { planet: 'neptune', seed: 93 }), mid: (x, t) => storyboard(x, t),
      nep: { x: 160, y: 1360, size: 230, mood: [[0, 'happy']] }, sign: { x: 820, y: 1400, size: 280, mood: [[0, 'neutral'], [T.coffee, 'wide']], look: [-1, -1] } },
    { a: T.text, b: T.end, bg: (x, t) => drawSpace(x, t, { planet: 'neptune', seed: 94 }),
      mid: (x, t) => { P.phone(x, t, 470, 820, { w: 540, h: 720, msgs: MSGS, title: 'festival person', k: pop01(t, T.text + 2.6, 0.4), typingAt: t < T.reply ? T.text + 3.6 : null }); P.hearts(x, t, T.reply + 0.1, 540, 1200, { n: 10, spread: 700 }) },
      nep: { x: 180, y: 1330, size: 260, mood: [[0, 'happy'], [T.reply, 'love']] }, sign: { x: 820, y: 1400, size: 280, mood: [[0, 'neutral'], [T.reply, 'heart']], look: [-1, -1] } },
    { a: T.end, b: D + 1, bg: (x, t) => departures(x, t, ROWS1), front: (x, t) => suitcase(x, 960, 1640, 1),
      nep: { x: 230, y: 1330, size: 260, mood: 'proud' }, sign: { x: 700, y: 1500, size: 280, mood: 'happy', look: [-0.5, -1] } },
  ],
  lines: [
    { t0: T.fest + 0.3, t1: T.nep1 - 0.25, who: 'sagittarius', text: "we talked for an *hour.* I'm moving cities.", x: 560, y: 1720, tailUp: true, tail: 220 },
    { t0: T.nep1, t1: T.board - 0.2, who: 'neptune', text: 'a gorgeous meet-cute! *classic* act one.', x: 520, y: 1720, tailUp: true, tail: -280 },
    { t0: T.board + 1.6, t1: T.coffee - 0.2, who: 'neptune', text: "but the next scene isn't a flight. it's a *coffee.*", x: 540, y: 1720, tailUp: true, tail: -280 },
    { t0: T.coffee, t1: T.text - 0.2, who: 'sagittarius', text: '…a *coffee?*', x: 700, y: 1720, tailUp: true, tail: 120 },
    { t0: T.text, t1: T.text + 2.5, who: 'neptune', text: 'a coffee. then another. then *see.*', x: 540, y: 1720, tailUp: true, tail: -280 },
  ],
  cues: [['whoosh', T.fest, 0.4, 0.04], ...Array.from({ length: 8 }, (_, i) => ['tick', +(0.05 + i * 0.07).toFixed(2), 0.03]), ['pop', T.board + 1.0, 1174.66, 0.04, 0], ['pop', T.text + 3.0, 1174.66, 0.05, 0.2], ['pop', T.reply, 1567.98, 0.06, -0.2], ['glitter', T.reply, T.reply + 0.5], ...Array.from({ length: 10 }, (_, i) => ['tick', +(T.end + i * 0.06).toFixed(2), 0.03])],
})
export const DURATION = E.DURATION, SCENES = E.SCENES, CUES = E.CUES
