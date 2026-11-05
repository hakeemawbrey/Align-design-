// kine09: IS THIS NORMAL?, "Still thinking about a crush from years ago" (18.5 s vertical, star_advice post, music: lofi · Ab).
// The format lives in ../../kine01/normalkit.js. No end card, no card cut. Hard cut ending.
//   0.00       frame 0: "Years later. | Still thinking about *them.*" landed; ♉ Taurus mid-stir of a cocoa; an old photo
//              is rising out of the steam.
//   0.60       record scratch + freeze, caught circle on the photo: "the one who *borrowed my pen.*"
//   2.0–5.8    "One borrowed pen. | Years *ago.*"  A memory cloud: a desk, a pen passed across, a shy smile. The pen
//              is still missing. ♓ Pisces cries into its own cocoa.
//   5.95–9.7   NORMAL-O-METER: NORMAL.
//   9.8–17.0   THE STARS: "sometimes it's the person. often it's who *you* were then." → "keep the memory. then go
//              make *new* ones."  The photo gets pinned to a corkboard and new photos pop in around it (friends, a
//              trip, a picnic, a cat).
//  17.1–18.5   last line: "Keep the memory. | Live in *now.*"  Hard cut.
import {
  makeNormal, GOLD, BONE, PINK, INK, RED, MINT, CYAN, INTER, MONO, R, box, drawBits, sparkles, hearts, bubble, label, shadow, glowAt,
  room, pop01, outK, prog, lerp, clamp, ease, r3, drawStarChar,
} from '../../kine01/normalkit.js'

const D = 18.5, FLOOR = 1500
const T = {
  rec: 0.6, h0Out: [1.85, 2.0], h1: 2.0, h1Out: [5.6, 5.8], mem: 2.6, pass: 3.4, pisIn: 2.8,
  meter: 5.95, mOut: [9.55, 9.8],
  starsIn: 9.7, l1: 9.95, l2: 13.25, boxClose: 16.95, pin: 10.6, news: [13.6, 14.0, 14.4, 14.8],
  last: 17.1,
}
const REC = { at: T.rec, len: 1.25, caption: 'the one who *borrowed my pen.*', top: 1640 }

function kitchen(x, t) {
  room(x, { y: FLOOR, wall: '#2a1d3a', floor: '#3a2840' })
  box(x, 90, 480, 300, 280, '#2b3a6a', { b: 8 }); for (let i = 0; i < 5; i++) drawBits(x, ['W'], { W: '#e0e8ff' }, 130 + i * 55, 520 + ((t * 60 + i * 47) % 220), 6, { outline: null })
  R(x, INK, 0, 1260, 1080, 12); R(x, '#8a6440', 0, 1272, 1080, 50)    // the counter
}
function mug(x, cx, cy, col, s = 1) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  box(x, -60, -110, 120, 110, col, { b: 6 }); R(x, INK, 60, -90, 30, 60); R(x, col, 60, -80, 18, 40); R(x, '#7a4a2a', -54, -104, 108, 18)
  x.restore()
}
function steam(x, t, cx, cy) {
  x.save(); x.globalAlpha = 0.5
  for (let i = 0; i < 3; i++) { const p = ((t * 0.7 + i / 3) % 1); R(x, BONE, cx - 30 + i * 30 + 12 * Math.sin(t * 3 + i), cy - p * 160, 10, 26) }
  x.restore()
}
function photo(x, t, cx, cy, s, rot, alpha = 1) {
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  box(x, -90, -110, 180, 220, '#f4e8cc', { b: 6 }); R(x, '#8a7fb0', -74, -94, 148, 148)
  drawStarChar(x, 0, -10, 90, 0, { color: '#c9b48a', mood: 'happy', look: [0, 0], bob: 0, tips: false, glow: 0, blink: false })
  x.font = `700 18px ${MONO}`; x.fillStyle = INK; x.textAlign = 'center'; x.fillText('the pen thief', 0, 84)
  x.restore()
}
function memoryCloud(x, t, k) {
  if (k <= 0.01) return
  x.save(); x.translate(560, 820); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 330, 200, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = 'rgba(236,226,206,0.95)'; x.beginPath(); x.ellipse(0, 0, 318, 188, 0, 0, Math.PI * 2); x.fill()
  // two desks, two small stars, a pen passing across
  box(x, -230, 40, 180, 26, '#8a6440', { b: 4 }); box(x, 50, 40, 180, 26, '#8a6440', { b: 4 })
  drawStarChar(x, -140, -20, 110, t, { color: '#e9b24a', mood: 'sparkle', look: [1, 0], seed: 3, tips: false, glow: 0.4 })
  drawStarChar(x, 140, -20, 110, t, { color: '#c9b48a', mood: t > T.pass + 0.4 ? 'happy' : 'neutral', look: [-1, 0], seed: 8, tips: false, glow: 0.4, blush: t > T.pass + 0.4 })
  const p = ease.inOutCubic(prog(t, T.pass, T.pass + 0.6))
  x.save(); x.translate(lerp(-80, 80, p), 10 - 30 * Math.sin(Math.PI * p)); x.rotate(-0.6); R(x, INK, -8, -50, 16, 100); R(x, '#4f8df0', -4, -46, 8, 80); R(x, GOLD, -4, 34, 8, 12); x.restore()
  x.font = `700 22px ${MONO}`; x.fillStyle = INK; x.textAlign = 'center'; x.fillText('"can I borrow a pen?"', 0, 130)
  x.restore()
}
const NEWS = [
  { x: 330, y: 700, cap: 'friends', col: '#ff8fb1' }, { x: 760, y: 700, cap: 'the trip', col: '#7fd0ff' },
  { x: 330, y: 1000, cap: 'picnic', col: '#9fe6b0' }, { x: 760, y: 1000, cap: 'a cat!!', col: '#ffd27a' },
]
function snap(x, t, n, k) {
  if (k <= 0.01) return
  x.save(); x.translate(n.x, n.y); x.rotate(Math.sin(n.x) * 0.08); x.scale(k, k)
  box(x, -95, -105, 190, 210, '#f4e8cc', { b: 6 }); R(x, n.col, -80, -90, 160, 140)
  drawBits(x, ['.S.S.', 'SSSSS', '.SSS.'], { S: BONE }, 0, -24, 12)
  x.font = `700 20px ${MONO}`; x.fillStyle = INK; x.textAlign = 'center'; x.fillText(n.cap, 0, 82)
  R(x, RED, -8, -118, 16, 16)
  x.restore()
}

const EP = makeNormal({
  id: 'kine09', D, ending: 'cut', hero: 'taurus',
  hook: { text: 'Years later. | Still thinking about *them.*', out: T.h0Out, accentColor: GOLD },
  rec: REC,
  catch: { at: T.rec + 0.12, x: 700, y: 700, r: 160, out: [T.rec + 1.1, T.rec + 1.25], label: null, arrow: null },
  heads: [{ text: 'One borrowed pen. | Years *ago.*', at: T.h1, out: T.h1Out, size: 96, accent: GOLD, late: 1, lateAt: T.h1 + 0.5 }],
  meter: { at: T.meter, land: 'normal', out: T.mOut, cy: 1000 },
  lines: [
    { t: T.l1, text: "sometimes it's the person. often it's who *you* were then." },
    { t: T.l2, text: 'keep the memory. then go make *new* ones.' },
  ],
  box: { y: 1450, close: T.boxClose },
  stars: { in: T.starsIn },
  last: { text: 'Keep the memory. | Live in *now.*', at: T.last, lateAt: T.last + 0.45, accent: GOLD, size: 96 },
  punches: [T.h1, T.meter + 1.75, T.pin],
  scene(x, t, S) {
    if (t < T.meter) {
      kitchen(x, t)
      // Taurus mid-stir
      S.hero(x, t, { x: 330, y: 1100, s: 360, mood: t < 2 ? 'sparkle' : 'squint', look: [1, -0.7], hops: [0.05, T.pass + 0.4] })
      mug(x, 560, 1270, '#ff9f6a', 1.2)
      const st = Math.sin(t * 9) * 30
      x.save(); x.translate(560 + st, 1150); x.rotate(0.3 + st * 0.005); R(x, INK, -7, -90, 14, 110); R(x, '#cfc8e8', -3, -86, 6, 100); x.restore()
      steam(x, t, 560, 1110)
      // the photo rises out of the steam (mid-rise at frame 0), then the memory takes over
      const rise = ease.outCubic(clamp((t + 0.5) / 1.6))
      const pa = outK(t, [T.mem - 0.2, T.mem + 0.1])
      photo(x, t, lerp(600, 700, rise), lerp(1000, 700, rise), lerp(0.6, 1.1, rise), lerp(-0.3, 0.08, rise) + 0.03 * Math.sin(t * 2), pa)
      memoryCloud(x, t, pop01(t, T.mem, 0.4, 2) * outK(t, [T.meter - 0.25, T.meter]))
      // Pisces cries into its own cocoa
      const pk = pop01(t, T.pisIn, 0.35, 2.2)
      S.pis(x, t, { x: 870, y: 1130, s: 190, pop: pk, tears: 3, mood: 'sparkle', look: [-1, -0.3] })
      if (pk > 0.01) mug(x, 880, 1270, '#7fd0ff', 0.9 * pk)
      return
    }
    if (t < T.mOut[1]) {
      const k = outK(t, T.mOut), land = T.meter + 1.75
      S.hero(x, t, { x: 230, y: 1560, s: 170, mood: t > land ? 'happy' : 'squint', look: [1, -1], pop: k, hops: [land] })
      S.pis(x, t, { x: 850, y: 1560, s: 170, mood: t > land ? 'happy' : 'wide', look: [-1, -1], pop: k, tears: 3, hops: [land, land + 0.4] })
    }
    if (t >= T.mOut[0]) {
      kitchen(x, t)
      // the corkboard
      const bk = pop01(t, T.mOut[0] + 0.2, 0.35, 2)
      if (bk > 0.01) { x.save(); x.translate(540, 860); x.scale(bk, bk); box(x, -400, -320, 800, 640, '#b98a5a', { b: 10 }); x.fillStyle = 'rgba(0,0,0,0.08)'; for (let i = 0; i < 40; i++) x.fillRect(-380 + (i * 97) % 760, -300 + (i * 53) % 600, 8, 8); x.restore() }
      // the old photo, pinned in the middle
      const pin = ease.outCubic(prog(t, T.pin - 0.4, T.pin))
      if (t > T.pin - 0.4) { photo(x, t, lerp(540, 545, pin), lerp(1300, 850, pin), lerp(0.7, 0.85, pin), -0.05); if (t > T.pin) R(x, RED, 537, 740, 16, 16) }
      NEWS.forEach((n, i) => snap(x, t, n, pop01(t, T.news[i], 0.3, 2.4) * 0.8))
      const k = pop01(t, T.mOut[0] + 0.1, 0.35, 2.1)
      S.hero(x, t, { x: 300, y: 1260, s: 260, pop: k, mood: t > T.news[0] ? 'happy' : 'neutral', look: [1, -1], hops: [T.mOut[0] + 0.2, T.pin, ...T.news] })
      S.pis(x, t, { x: 780, y: 1270, s: 200, pop: pop01(t, T.mOut[0] + 0.3, 0.35, 2.2), tears: t > T.news[3] ? 3 : 2, mood: t > T.news[3] ? 'happy' : 'sparkle', look: [-1, -0.6], hops: [T.news[3] + 0.1, T.last + 0.4] })
      S.stars(x, t, { x: 960, y: 1290, s: 120, pop: pop01(t, T.starsIn, 0.35, 2.1), mood: t > T.news[0] ? 'happy' : 'neutral', look: [-1, -0.3] })
      if (t > T.news[3]) hearts(x, t, T.news[3] + 0.1, 760, 1100, { n: 4 })
    }
  },
  cues: [
    ...Array.from({ length: 6 }, (_, i) => ['tick', r3(0.04 + i * 0.35), 0.02]),
    ['whoosh', T.mem, 0.5, 0.04], ['whoosh', T.pass, 0.3, 0.03], ['pluck', T.pass + 0.45, 1318.51, 0.035, 0.5, 0.3],
    ['pop', T.pisIn + 0.05, 987.77, 0.035, 0.4], ['pluck', T.pisIn + 0.45, 1174.66, 0.03, 0.4, 0.4],
    ['whoosh', T.pin - 0.4, 0.3, 0.035], ['tick', T.pin, 0.08], ['pop', T.pin + 0.02, 880, 0.04, 0],
    ...T.news.map((n, i) => ['pop', n, [987.77, 1174.66, 1318.51, 1567.98][i], 0.04, i % 2 ? 0.3 : -0.3]),
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [PINK, MINT, CYAN, INTER, sparkles, bubble, label, shadow, glowAt]
