// kgse19: GUESS THE SIGN, "Cancelled plans for a blanket" (10 s vertical, star_advice trial, jazzy · Eb, hard cut).
//   0.00  frame 0: the silhouette mid-dive into a blanket burrito, a "can't make it tonight" text flying.
//         Hook: "Cancelled plans for a blanket. *Zero regrets.*"
//   0.35  sudden silence · cosy montage: tea, slippers, a film on · the friends reply "rest up!!"
//   C1 "a houseplant" · C2 "a slice of cake" · buzz (happy tears) · 3·2·1 · reveal: TAURUS · last line, hard cut
import { makeGuess, box, R, phone, bubble, shadow, chat, label, hearts, pop01, outK, prog, ease, lerp, clamp, INK, BONE, GOLD, CYAN, PINK, MINT, RED, INTER, MONO } from '../../kgse01/scenes/guesskit.js'

function tv(x, u) {
  box(x, 640, 600, 360, 230, '#14102a', { b: 8 }); R(x, INK, 800, 830, 40, 50); R(x, INK, 740, 876, 160, 12)
  const on = u > 2.4
  R(x, on ? '#2e5a8a' : '#0a0818', 652, 612, 336, 206)
  if (on) { x.fillStyle = '#ffcf6a'; x.beginPath(); x.arc(760, 700, 40, 0, Math.PI * 2); x.fill(); R(x, '#5fae7a', 652, 760, 336, 58); label(x, '▶ a cosy film', 820, 640, { size: 22, col: BONE }) }
}
function burrito(x, o, k) {
  x.save(); x.globalAlpha = clamp(k)
  x.fillStyle = INK; x.beginPath(); x.ellipse(o.x, o.y + 150, 230, 90, -0.06, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#c86a8a'; x.beginPath(); x.ellipse(o.x, o.y + 150, 220, 80, -0.06, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 6; i++) R(x, '#e89ab0', o.x - 180 + i * 64, o.y + 120 + (i % 2) * 30, 30, 30)
  x.restore()
}
function plant(x, cx, cy, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -50, 0, 100, 80, '#c86a4a', { b: 5 })
  for (let i = 0; i < 5; i++) { x.save(); x.rotate(-0.9 + i * 0.45 + 0.05 * Math.sin(t * 2 + i)); x.fillStyle = INK; x.beginPath(); x.ellipse(0, -60, 22, 62, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#5fae7a'; x.beginPath(); x.ellipse(0, -60, 16, 56, 0, 0, Math.PI * 2); x.fill(); x.restore() }
  x.restore()
}
function cake(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-70, 40); x.lineTo(70, 40); x.lineTo(70, -10); x.lineTo(-70, -50); x.closePath(); x.fill()
  x.fillStyle = '#f7e7c0'; x.beginPath(); x.moveTo(-64, 34); x.lineTo(64, 34); x.lineTo(64, -6); x.lineTo(-64, -42); x.closePath(); x.fill()
  R(x, PINK, -64, 0, 128, 10); R(x, RED, 40, -30, 16, 16)
  x.restore()
}

export const EP = makeGuess({
  id: 'kgse19', sign: 'taurus', D: 10, ending: 'cut', brk: 'silence',
  hook: 'Cancelled plans for a blanket. | *Zero regrets.*',
  clues: ['a houseplant', 'a slice of cake'],
  last: 'Rest is | *a plan too.*',
  pisLine: 'PISCES? (so cosy, sob)',
  draw(x, S) {
    const { t, u, rv, T } = S
    tv(x, u)
    // the couch
    box(x, 80, 1080, 560, 150, '#5a4a8a', { b: 7, hi: '#7a6aaa' }); box(x, 60, 1000, 80, 230, '#5a4a8a', { b: 6 }); box(x, 580, 1000, 80, 230, '#5a4a8a', { b: 6 })
    const dive = clamp(u / 0.8)
    const o = { x: lerp(470, 360, ease.outCubic(dive)), y: lerp(860, 1000, ease.outCubic(dive)), s: 300, mood: rv > 0.5 ? 'happy' : u > 1.0 ? 'sleepy' : 'wide', look: [1, -0.3], hops: [0.8].filter(h => h < S.R), rot: lerp(-0.6, 0.05, ease.outCubic(dive)), squash: -0.1 * (1 - dive), zzz: false }
    S.sil(o)
    burrito(x, o, clamp(prog(u, 0.6, 1.0)))
    // the cancel text flies off at frame 0
    if (u < 1.2) phone(x, lerp(820, 1200, clamp(u / 1.2)), lerp(1000, 700, clamp(u / 1.2)), { w: 200, h: 140, rot: 0.3 + u, fn: (x2, w, h) => { R(x2, '#1a1634', 0, 0, w, h); chat(x2, 'can’t make it tonight,', 6, 14, { size: 13, me: false }); chat(x2, 'resting! have fun', 6, 50, { size: 13 }) } })
    // montage props
    if (u > 1.5) { box(x, 540, 1040 - 10 * pop01(u, 1.5, 0.3, 2), 70, 70, BONE, { b: 5 }); R(x, '#b8744a', 546, 1046, 58, 12) }
    if (u > 2.0) { const k = pop01(u, 2.0, 0.3, 2); box(x, 150, 1236, 90 * k, 34, PINK, { b: 4 }); box(x, 260, 1236, 90 * k, 34, PINK, { b: 4 }) }
    if (u > 3.0) phone(x, 880, 1120, { w: 190, h: 170, rot: -0.08, k: pop01(u, 3.0, 0.3, 2.4), fn: (x2, w, h) => { R(x2, '#1a1634', 0, 0, w, h); chat(x2, 'rest up!!', 8, 14, { size: 16 }); chat(x2, 'proud of u', 8, 56, { size: 16 }) } })
    if (t > T.C1) plant(x, 980, 880, pop01(t, T.C1 + 0.05, 0.3, 2.4) * 0.8, t)
    if (T.C2 != null) cake(x, 520, 1000, pop01(t, T.C2 + 0.05, 0.3, 2.4) * 0.8)
    hearts(x, t, 3.1, 880, 1000, { n: 4 })
    if (rv > 0.5) bubble(x, t, 380, 740, S.R + 0.3, S.D + 1, 'see them saturday. rested.', { size: 30 })
  },
  cues: [['whoosh', 0.0, 0.5, 0.05], ['boom', 0.8, 0.1], ['pop', 1.5, 659.25, 0.04, 0.2], ['pop', 2.0, 880, 0.04, -0.2], ['tick', 2.4, 0.06], ['pop', 3.0, 1174.66, 0.045, 0.4], ['pop', 3.08, 1567.98, 0.03, 0.4]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
