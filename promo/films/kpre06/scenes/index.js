// kpre06: PISCES REACTS, "Their dogs met first" (10 s vertical trial reel, star_advice, music: funk · D). Loop.
// The look lives in ../../kpre01/scenes/reactkit.js.
//   0.00   frame 0: a park; Pisces on the bench mid-sob into its scarf; Taurus and Aries wound together by two
//          leashes, laughing, two dogs wagging. Hook: "Their dogs met *first.*" · 0.38 record scratch · 0.72 rewind
//   1.12   Taurus and Aries, two dogs · the dogs spot each other (!!) · they run circles, the leashes wind tight, the owners
//          bump together · both laugh · "same time next week?" "it's a date." · 6.32 Pisces: "THE DOGS KNEW." · 6.82 last
//          line "The dogs knew *before* they did." · loop.
import { makeReact, R, box, shadow, bubble, drawStarChar, signStar, drawBits, sparkles, prog, clamp, lerp, ease, INK, BONE, GOLD } from '../../kpre01/scenes/reactkit.js'

const SAG = signStar('taurus'), ARI = signStar('aries')
const U = { spot: 0.5, run: [1.0, 2.4], bump: 2.4, laugh: 2.7, ask: 3.4, yes: 4.2, END: 5.2 }
const DOG = ['....EE..', 'B..EEEE.', 'BBBBBBBN', '.BBBBBB.', '.B.B.B.B', '.K.K.K.K']

function set(x, c) {
  const g = x.createLinearGradient(0, 0, 0, 1920); g.addColorStop(0, '#7ab8e8'); g.addColorStop(0.45, '#bfe0f0'); g.addColorStop(0.46, '#5fae6a'); g.addColorStop(1, '#3f8a4f'); x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
  for (const [tx, s] of [[120, 1], [960, 0.8]]) { R(x, INK, tx - 18, 700, 36, 200 * s + 40); R(x, '#7a5a3a', tx - 12, 700, 24, 200 * s + 40); x.fillStyle = INK; x.beginPath(); x.arc(tx, 640, 150 * s + 6, 0, Math.PI * 2); x.fill(); x.fillStyle = '#3fb08a'; x.beginPath(); x.arc(tx, 640, 150 * s, 0, Math.PI * 2); x.fill() }
  R(x, '#e8d8b0', 0, 1120, 1080, 160); R(x, '#d0bf94', 0, 1120, 1080, 10)
  for (let i = 0; i < 4; i++) { const cx = ((i * 330 + c * 12) % 1300) - 120; R(x, 'rgba(255,255,255,0.8)', cx, 300 + i * 40, 160, 40); R(x, 'rgba(255,255,255,0.8)', cx + 30, 280 + i * 40, 90, 30) }
}
function dog(x, cx, cy, col, dir, c, wag) {
  drawBits(x, DOG, { B: col, E: col, N: INK, K: INK }, cx, cy + Math.abs(Math.sin(c * 12)) * -6 * wag, 14, { sx: dir })
  R(x, INK, cx - dir * 64, cy - 30 - 10 * Math.sin(c * 30) * wag, 10, 26)
}
function moment(x, c, u) {
  const run = prog(u, ...U.run), wound = ease.inOutCubic(run)
  const sx = lerp(220, 440, wound), ax = lerp(860, 640, wound)
  // dogs: walk in front, spot, then run circles around the middle
  let d1x = 360, d1y = 1220, d2x = 720, d2y = 1220, d1dir = 1, d2dir = -1
  if (u > U.run[0]) { const a = run * Math.PI * 4; d1x = 540 + Math.cos(a + Math.PI) * 170; d1y = 1220 + Math.sin(a) * 40; d2x = 540 + Math.cos(a) * 170; d2y = 1220 - Math.sin(a) * 40; d1dir = Math.sin(a) > 0 ? -1 : 1; d2dir = -d1dir }
  if (u >= U.run[1]) { d1x = 470; d2x = 610; d1y = d2y = 1230; d1dir = 1; d2dir = -1 }
  // leashes (wind into a spiral)
  x.strokeStyle = INK; x.lineWidth = 7
  for (const [hx, dx, dy, col] of [[sx + 60, d1x, d1y, '#ff6a6a'], [ax - 60, d2x, d2y, '#4f7cd8']]) {
    x.strokeStyle = col; x.beginPath(); x.moveTo(hx, 1050)
    if (wound > 0.05) for (let k = 0; k <= 12; k++) { const a = k * 0.9 * wound * 4, rr = 60 * (1 - k / 12) + 20; x.lineTo(540 + Math.cos(a) * rr * wound, 1080 + Math.sin(a) * rr * 0.4) }
    x.lineTo(dx, dy - 30); x.stroke()
  }
  shadow(x, sx, 1110, 220); shadow(x, ax, 1110, 220)
  const laughing = u > U.laugh
  drawStarChar(x, sx, 980, 240, c, { color: SAG.color, glyph: SAG.glyph, mood: u < U.spot ? 'neutral' : u < U.bump ? 'wide' : laughing ? 'happy' : 'wide', look: [1, 0], seed: 3, squash: laughing ? 0.06 * Math.sin(c * 24) : 0 })
  drawStarChar(x, ax, 980, 240, c, { color: ARI.color, glyph: ARI.glyph, mood: u < U.spot ? 'neutral' : u < U.bump ? 'wide' : u > U.yes ? 'heart' : laughing ? 'happy' : 'wide', look: [-1, 0], seed: 7, squash: laughing ? 0.06 * Math.sin(c * 24 + 1) : 0 })
  dog(x, d1x, d1y, '#c9894a', d1dir, c, u > U.spot ? 1 : 0.3)
  dog(x, d2x, d2y, '#efe6d6', d2dir, c, u > U.spot ? 1 : 0.3)
  if (u > U.spot && u < U.run[0] + 0.2) for (const [px, py] of [[360, 1100], [720, 1100]]) { x.font = '900 70px Inter'; x.fillStyle = '#ff4a5a'; x.textAlign = 'center'; x.lineWidth = 10; x.strokeStyle = INK; x.strokeText('!!', px, py); x.fillText('!!', px, py) }
  if (u > U.bump && u < U.bump + 0.5) sparkles(x, u, 540, 950, U.bump, 10, 160, 1, [GOLD, BONE])
  bubble(x, u, 330, 700, U.ask, U.END + 1, 'same time next week?', { size: 42, tail: 0.2 })
  bubble(x, u, 760, 800, U.yes, U.END + 1, 'it’s a date.', { size: 44, tail: -0.2, col: '#ffd8d0' })
  if (u > U.yes) for (let i = 0; i < 4; i++) { const ph = (((c * 0.8 + i / 4) % 1) + 1) % 1; drawBits(x, ['.HH.HH.', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: '#ff4f86' }, 540 + Math.sin(ph * 5 + i) * 90, 900 - ph * 200, 7, { alpha: Math.sin(Math.PI * ph) }) }
}
function bench(x) { box(x, 560, 1440, 500, 34, '#7a5a3a', { b: 6 }); R(x, INK, 600, 1474, 16, 120); R(x, INK, 1010, 1474, 16, 120) }
function front(x, c, u) {
  bench(x)
  // the scarf Pisces sobs into
  box(x, 700, 1430, 260, 46, '#ffb03a', { b: 6 })
  if (u >= U.END) { x.save(); x.translate(710, 1440); x.rotate(-0.6 + 0.2 * Math.sin(c * 10)); box(x, -160, -20, 160, 44, '#ffb03a', { b: 6 }); x.restore() }
}

const EP = makeReact({
  id: 'kpre06', D: 10, loop: true, END: U.END, accent: '#ffd23a', label: '8 SECONDS EARLIER',
  hook: 'Their dogs | met *first.*',
  set, moment, front,
  pis: { x: 830, y: 1330, s: 360, look: [-1, -1] },
  react: [[0, 0, 'neutral'], [U.spot, 1, 'wide'], [U.bump, 2, 'wide'], [U.ask, 3, 'sparkle']],
  line: { text: 'THE DOGS KNEW.', x: 420, y: 1300, size: 54, col: '#ffe9a8', tail: 0.6 },
  last: 'The dogs knew *before* they did.',
  cues: T => [
    ['pop', T.u(U.spot), 1318.51, 0.05, -0.3], ['pop', T.u(U.spot) + 0.05, 1318.51, 0.05, 0.3],
    ['whoosh', T.u(U.run[0]), 1.4, 0.035], ['riser', T.u(U.run[0]), T.u(U.run[1]), 0.03], ['tom', T.u(U.bump), 110, { gain: 0.2, decay: 0.2 }], ['tick', T.u(U.bump), 0.06],
    ['pop', T.u(U.laugh), 987.77, 0.03, 0.3], ['pop', T.u(U.laugh) + 0.2, 1174.66, 0.03, -0.3],
    ['pop', T.u(U.ask), 880, 0.04, -0.3], ['pluck', T.u(U.yes), 1318.51, 0.045, 0.5, 0.3], ['pluck', T.u(U.yes) + 0.12, 1760, 0.04, 0.5, 0.3],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [clamp]
