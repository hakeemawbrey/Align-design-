// kpre02: PISCES REACTS, "They saved me a seat" (8.5 s vertical trial reel, star_advice, music: pop · E). Hard cut.
// The look lives in ../../kpre01/scenes/reactkit.js.
//   0.00   frame 0: movie night, a packed couch; Pisces (front) mid-wail, popcorn flying; Cancer snug next to Taurus.
//          Hook: "They *saved* a seat."  · 0.38 record scratch, freeze · 0.72 rewind "◀◀ 6 SECONDS EARLIER"
//   1.12   Cancer bursts in late ("sorry sorry!"), the couch is full ("…oh.") · Taurus lifts a jacket off the one seat
//          left, pats it: "saved you one." · Cancer melts, sits, hearts · 6.52 Pisces: "THEY KEPT A SEAT." · 7.02 the last
//          line "A saved seat is a *love letter.*" · hard cut 8.5.
import { makeReact, R, box, shadow, bubble, drawStarChar, signStar, drawBits, sparkles, pop01, prog, clamp, lerp, ease, INK, BONE, GOLD } from '../../kpre01/scenes/reactkit.js'

const CAN = signStar('cancer'), TAU = signStar('taurus'), ARI = signStar('aries'), GEM = signStar('gemini')
const U = { burst: 0.2, oh: 1.4, lift: 2.4, sit: 3.7, END: 5.4 }

function set(x, c) {
  R(x, '#211838', 0, 0, 1080, 1920)
  R(x, '#2c2048', 0, 480, 1080, 1000)
  // the TV glow from the left, flickering
  const fl = 0.75 + 0.25 * Math.sin(c * 13) * Math.sin(c * 5.3)
  x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(-80, 900, 40, -80, 900, 900); g.addColorStop(0, `rgba(120,170,255,${0.35 * fl})`); g.addColorStop(1, 'rgba(120,170,255,0)'); x.fillStyle = g; x.fillRect(0, 300, 1080, 1300); x.restore()
  // the door, right
  box(x, 860, 560, 170, 420, '#5a3a5a', { b: 8 }); R(x, GOLD, 880, 770, 14, 14)
  // a framed picture, a lamp
  box(x, 360, 580, 220, 150, '#3a3060', { b: 8 }); R(x, '#ffb03a', 400, 630, 60, 50); R(x, '#5fd38a', 470, 650, 70, 30)
  R(x, '#191230', 0, 1480, 1080, 440); R(x, INK, 0, 1474, 1080, 10)
}
function couch(x) {
  box(x, 30, 900, 860, 150, '#7a3a5a', { b: 8, hi: 'rgba(255,255,255,0.15)' })
  box(x, 30, 1040, 860, 110, '#8f4a6a', { b: 8, hi: 'rgba(255,255,255,0.18)' })
  box(x, 0, 960, 70, 200, '#6a2f4f', { b: 8 }); box(x, 850, 960, 70, 200, '#6a2f4f', { b: 8 })
}
function moment(x, c, u) {
  couch(x)
  drawStarChar(x, 140, 980, 210, c, { color: ARI.color, glyph: ARI.glyph, mood: u > U.sit ? 'happy' : 'neutral', look: [1, 0], seed: 3 })
  drawStarChar(x, 330, 980, 210, c, { color: GEM.color, glyph: GEM.glyph, mood: u > U.sit ? 'sparkle' : 'neutral', look: [1, 0], seed: 5 })
  // the saved seat: a jacket on it until Taurus lifts it
  const lift = ease.outBack(prog(u, U.lift, U.lift + 0.4))
  if (u < U.lift + 0.8) { x.save(); x.translate(540, 1010 - lift * 220); x.rotate(-0.4 * lift); box(x, -80, -40, 160, 80, '#d8423a', { b: 6 }); R(x, '#a82a2a', -10, -40, 20, 80); x.restore() }
  drawStarChar(x, 740, 980, 220, c, { color: TAU.color, glyph: TAU.glyph, mood: u < U.lift ? 'neutral' : u < U.sit ? 'happy' : 'sparkle', look: [-1, 0], seed: 9, hops: [U.lift + 1.12, U.lift + 1.5, U.lift + 1.9] })
  // Cancer: bursts in, looks around, melts, sits
  const inK = ease.outCubic(prog(u, U.burst, U.burst + 0.6)), sitK = ease.inOutCubic(prog(u, U.sit, U.sit + 0.5))
  const cx = lerp(lerp(1150, 900, inK), 540, sitK), cy = lerp(840, 975, sitK)
  const cm = u < U.oh ? 'wide' : u < U.lift + 0.5 ? 'neutral' : 'heart'
  drawStarChar(x, cx, cy, 230, c, { color: CAN.color, glyph: CAN.glyph, mood: cm, look: u < U.oh ? [-1, 0] : u < U.lift ? [-1, 0.5] : [-1, 0], seed: 7, blush: u > U.lift ? 1 : undefined })
  if (u < U.oh + 0.2) bubble(x, u, 800, 640, U.burst + 0.4, U.oh - 0.1, 'sorry sorry!', { size: 44, tail: 0.3 })
  bubble(x, u, 820, 650, U.oh, U.lift - 0.05, '…oh.', { size: 50, tail: 0.3 })
  bubble(x, u, 660, 700, U.lift + 0.3, U.END + 0.5, 'saved you one.', { size: 48, tail: 0.4, col: '#c9f2d4' })
  if (u > U.sit + 0.3) for (let i = 0; i < 5; i++) { const ph = (((c * 0.8 + i / 5) % 1) + 1) % 1; drawBits(x, ['.HH.HH.', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: '#ff4f86' }, 560 + Math.sin(ph * 5 + i) * 90, 860 - ph * 220, 7, { alpha: Math.sin(Math.PI * ph) }) }
  sparkles(x, u, 540, 990, U.sit + 0.4, 10, 170, 2)
}
// Pisces's popcorn bowl (front), popcorn flying when it wails
function front(x, c, u) {
  box(x, 600, 1470, 230, 70, '#e0e0f0', { b: 7 }); R(x, '#d8423a', 600, 1490, 230, 16)
  for (let i = 0; i < 9; i++) R(x, '#fff6d8', 616 + i * 23, 1452 - (i % 3) * 8, 18, 16)
  if (u >= U.END) for (let i = 0; i < 14; i++) {
    const ph = (((c * 1.2 + i / 14) % 1) + 1) % 1, a = -Math.PI / 2 + (i - 7) * 0.2
    const px = 715 + Math.cos(a) * 520 * ph, py = 1450 + Math.sin(a) * 520 * ph + 600 * ph * ph
    R(x, INK, px - 11, py - 11, 22, 20); R(x, '#fff6d8', px - 8, py - 8, 16, 14)
  }
}

const EP = makeReact({
  id: 'kpre02', D: 8.5, loop: false, END: U.END, accent: '#ff8fb1', label: '6 SECONDS EARLIER',
  hook: 'They *saved* | a seat.',
  set, moment, front,
  pis: { x: 860, y: 1360, s: 380, look: [-1, -0.7] },
  react: [[0, 0, 'neutral'], [U.oh, 1, 'wide'], [U.lift + 0.3, 2, 'wide'], [U.sit, 3, 'sparkle']],
  line: { text: 'THEY KEPT A SEAT.', x: 430, y: 1250, size: 52, col: '#ffe9a8', tail: 0.6 },
  last: 'A saved seat is a *love letter.*',
  cues: T => [
    ['whoosh', T.u(U.burst), 0.4, 0.04], ['tick', T.u(U.burst) + 0.3, 0.06], ['pop', T.u(U.burst) + 0.45, 987.77, 0.035, 0.4],
    ['tick', T.u(U.oh), 0.03], ['pluck', T.u(U.oh) + 0.1, 440, 0.03, 0.4, 0.3],
    ['whoosh', T.u(U.lift), 0.3, 0.03], ['pop', T.u(U.lift) + 0.35, 1174.66, 0.04, 0.2], ['tick', T.u(U.lift) + 1.12, 0.03], ['tick', T.u(U.lift) + 1.5, 0.03],
    ['pluck', T.u(U.sit), 1174.66, 0.04, 0.5, 0], ['pluck', T.u(U.sit) + 0.12, 1567.98, 0.035, 0.5, 0], ['glitter', T.u(U.sit) + 0.4, T.u(U.sit) + 0.8],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [shadow, clamp]
