// nste12: SINGLE AND THRIVING, Ep 12 "Movie Night for One" (23 s vertical, Next 30 b33, music: dreamy · Db).
// Format kit: ../../nste01/singlekit.js (story 0–20.6, then the short end card). Rows: promo/films/next30/b33.md.
// The hero IS Pisces here (cfg.pisces), so Pisces cries front and centre the whole time.
//   0.0–6.8    hook "Crying at the movie. | *Alone.* Loving it." Pisces wrapped in a blanket on the couch, popcorn
//              bucket, the TV glowing (a little pixel dog runs home on screen), tears streaming: "they FOUND the DOG."
//              → "(sob) ten out of ten."
//   6.8        beat cut → THE STARS: "feeling it all on your own? *still* counts." / "your own company can be *cozy.*"
//   13.6       Pisces pauses the movie (II), refills the popcorn, presses play on movie two: "intermission!" →
//              "movie two. let's GO."  Meter fills.
//   17.4       "Pisces: *thriving.*" (still crying, happily). Last line: "Cry at it. *Love* it."
import { makeSingle, room, couch, box, R, ink, note, shadow, sparkles, glow, drawBits, pop01, prog, lerp, ease, T, INK, BONE, MONO } from '../../nste01/singlekit.js'

const DOG = ['..BB.....', '.BBBB...B', 'BBBBBBBBB', '.BBBBBBB.', '.B.B.B.B.']
function tv(x, t, { mode = 'dog', u = 0 } = {}) {
  box(x, 300, 520, 480, 300, '#1a1530', { b: 10 })
  R(x, '#2a3a6a', 314, 534, 452, 272)
  x.save(); x.globalCompositeOperation = 'lighter'; glow(x, 540, 670, 520, 0.18, '127,170,255'); x.restore()
  if (mode === 'dog') {
    R(x, '#3a6a4a', 314, 740, 452, 66)
    box(x, 640, 640, 90, 100, '#e8c27a', { b: 4 }); R(x, '#6b4a2f', 670, 690, 30, 50)
    drawBits(x, DOG, { B: '#f2a65a' }, lerp(360, 610, (u * 0.4) % 1), 720 - 6 * Math.abs(Math.sin(u * 12)), 8)
  } else if (mode === 'pause') {
    R(x, BONE, 500, 610, 26, 110); R(x, BONE, 554, 610, 26, 110)
  } else {
    ink(x, 'MOVIE 2', 540, 640, { size: 56, col: BONE, font: MONO, weight: 700 })
    x.fillStyle = BONE; x.beginPath(); x.moveTo(510, 690); x.lineTo(580, 725); x.lineTo(510, 760); x.fill()
  }
}
function popcorn(x, t, cx, cy, fill = 1, k = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  for (let i = 0; i < Math.round(9 * fill); i++) R(x, '#fff6d8', -46 + (i % 5) * 20 + (i > 4 ? 10 : 0), -96 - (i > 4 ? 18 : 0), 22, 22)
  box(x, -56, -80, 112, 110, BONE, { b: 5 }); for (let i = 0; i < 4; i++) R(x, '#e8344e', -48 + i * 28, -80, 14, 110)
  x.restore()
}
function blanket(x) { box(x, 230, 1250, 400, 120, '#c9a6ff', { b: 6 }); for (let i = 0; i < 6; i++) R(x, '#b08ae8', 240 + i * 66, 1260, 30, 100) }
const DARK = (x, t) => { room(x, t, { wall: '#1a1634', wall2: '#17132e', floor: '#221c38', win: null }) }

function s1(x, t, S) {
  const { u, pisces } = S
  DARK(x, t); tv(x, t, { mode: 'dog', u })
  couch(x, 440, 1440, 560, '#3a3070')
  pisces(x, t, { x: 420, y: 1110, s: 290, hops: [1.0, 3.9] }, u > 3.8 ? 3 : 2, u > 3.8 ? 'happy' : 'sparkle', [0.6, -1])
  blanket(x)
  popcorn(x, t, 720, 1300, 0.6)
}
function s2(x, t, S) {
  const { pisces } = S
  DARK(x, t); tv(x, t, { mode: 'pause' })
  x.fillStyle = 'rgba(5,4,12,0.45)'; x.fillRect(0, 420, 1080, 1500)
  pisces(x, t, { x: 250, y: 1170, s: 200, hops: [T.A + 0.4, T.B + 1.8] }, 1, t > T.B + 1.6 ? 'happy' : 'sparkle', [1, -1])
  note(x, 790, 1170, 'your company|is cozy', { w: 360, h: 150, col: '#ffe27a', rot: 0.05, size: 40, k: pop01(t, T.A + 1.5, 0.3, 2.4) })
  sparkles(x, t, 790, 1170, T.B + 1.3, 8, 180, 1)
}
function s3(x, t, S) {
  const { u, pisces } = S
  DARK(x, t); tv(x, t, { mode: u < 2.2 ? 'pause' : 'two' })
  couch(x, 440, 1440, 560, '#3a3070')
  pisces(x, t, { x: 420, y: 1110, s: 290, hops: [0.3, 1.0, 1.4, 2.2, 2.5].map(v => S.t0 + v) }, 2, u > 2.2 ? 'happy' : 'sparkle', [0.6, -0.6])
  blanket(x)
  popcorn(x, t, 720, 1300, Math.min(1.6, 0.6 + prog(u, 0.8, 1.6)))
  for (let i = 0; i < 6; i++) { const p = prog(u, 0.8 + i * 0.12, 1.3 + i * 0.12); if (p > 0 && p < 1) R(x, '#fff6d8', 700 + Math.sin(i * 2) * 50, 1180 - Math.sin(Math.PI * p) * 120, 20, 20) }
  sparkles(x, t, 540, 670, S.t0 + 2.2, 10, 220, 1)
}
function fin(x, t, S) {
  const { pisces, ok, u } = S
  shadow(x, 540, 1150, 260 * ok)
  pisces(x, t, { x: 540, y: 960, s: 300, pop: ok, hops: [S.t0 + 0.1, S.t0 + 0.6, T.last + 1.5] }, 3, u > 1.6 ? 'happy' : 'sparkle', [0, 0])
  popcorn(x, t, 770, 1110, 1.6, ok * 0.8)
}

const EP = makeSingle({
  id: 'nste12', sign: 'pisces', name: 'Pisces', pisces: true, accent: '#8fe3ff',
  hook: 'Crying at the movie. | *Alone.* Loving it.',
  h1: 'Feel it *all.*', h2: 'Movie *two.*',
  lines: ['feeling it all on your own? *still* counts.', 'your own company can be *cozy.*'],
  last: 'Cry at it. *Love* it.',
  bubbles: [
    { t0: 1.0, t1: 3.6, x: 450, y: 930, text: 'they FOUND the DOG.', size: 42, tail: -0.1 },
    { t0: 3.85, t1: 6.6, x: 450, y: 930, text: '(sob) ten out of ten.', size: 42, tail: -0.1 },
    { t0: 14.0, t1: 15.7, x: 430, y: 930, text: 'intermission!', size: 44, tail: 0 },
    { t0: 15.9, t1: 17.3, x: 450, y: 930, text: 'movie two. let’s GO.', size: 42, tail: 0, col: '#ffe2c4' },
  ],
  s1, s2, s3, fin,
  cues: [['tick', 13.75, 0.05], ...[0, 1, 2, 3, 4, 5].map(i => ['pop', 14.4 + i * 0.12, 1567.98 + i * 50, 0.025, (i % 2 ? 0.3 : -0.3)]), ['tick', 15.8, 0.05], ['pop', 15.82, 1174.66, 0.04, 0]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [ease]
