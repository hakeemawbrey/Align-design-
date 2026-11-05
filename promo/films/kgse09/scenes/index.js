// kgse09: GUESS THE SIGN, "2 a.m. trip to forget them" (10 s vertical, star_advice trial, synthwave · F#m, hard cut).
//   0.00  frame 0: the silhouette mid-leap off a bed, a globe spinning, the clock at 2:00.
//         Hook: "2 a.m. planning *trips to forget them.*"
//   0.35  record scratch + freeze · map pins pop everywhere, a backpack zips itself
//   C1 "a compass" · C2 "a horse-shaped pillow" · buzz · 3·2·1 · reveal: SAGITTARIUS · last line, hard cut
import { makeGuess, box, R, bubble, shadow, label, pop01, outK, prog, ease, lerp, clamp, INK, BONE, GOLD, RED, CYAN, MINT, PINK, INTER, MONO } from '../../kgse01/scenes/guesskit.js'

const PINS = [[0.2, 0.3], [0.7, 0.25], [0.45, 0.6], [0.85, 0.55], [0.3, 0.75], [0.6, 0.4], [0.15, 0.55], [0.9, 0.3]]
function map(x, u, cx, cy, w, h) {
  box(x, cx - w / 2, cy - h / 2, w, h, '#2b5a8a', { b: 6 })
  const blobs = [[0.25, 0.4, 0.18, 0.2], [0.62, 0.35, 0.22, 0.18], [0.5, 0.7, 0.14, 0.14], [0.82, 0.65, 0.12, 0.16]]
  for (const [bx, by, bw, bh] of blobs) { x.fillStyle = '#5fae7a'; x.beginPath(); x.ellipse(cx - w / 2 + bx * w, cy - h / 2 + by * h, bw * w / 2, bh * h / 2, 0.3, 0, Math.PI * 2); x.fill() }
  PINS.forEach(([px, py], i) => {
    const k = pop01(u, 1.4 + i * 0.42, 0.25, 2.8)
    if (k <= 0.01) return
    const X = cx - w / 2 + px * w, Y = cy - h / 2 + py * h
    x.save(); x.translate(X, Y); x.scale(k, k); R(x, INK, -2, -30, 4, 30); x.fillStyle = INK; x.beginPath(); x.arc(0, -32, 13, 0, Math.PI * 2); x.fill(); x.fillStyle = RED; x.beginPath(); x.arc(0, -32, 9, 0, Math.PI * 2); x.fill(); x.restore()
  })
}
function bed(x) {
  box(x, 60, 1120, 420, 90, '#5a4a8a', { b: 6, hi: '#7a6aaa' }); box(x, 60, 1060, 120, 60, BONE, { b: 5 })
  R(x, INK, 70, 1210, 16, 40); R(x, INK, 454, 1210, 16, 40)
}
function clock(x, cx, cy, t) {
  box(x, cx - 90, cy - 40, 180, 80, '#14102a', { b: 6 })
  x.font = `900 52px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = Math.floor(t * 2) % 2 ? RED : '#ff7a8a'; x.fillText('2:00', cx, cy + 3)
}
function backpack(x, cx, cy, z) {
  box(x, cx - 70, cy - 90, 140, 180, '#d9824a', { b: 6, hi: '#f0a06a' }); box(x, cx - 50, cy + 10, 100, 60, '#b8683a', { b: 4 })
  R(x, INK, cx - 56, cy - 40, 112, 6); R(x, GOLD, cx - 56 + 106 * z, cy - 46, 10, 18)
}
function compass(x, cx, cy, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 64, 0, Math.PI * 2); x.fill(); x.fillStyle = GOLD; x.beginPath(); x.arc(0, 0, 56, 0, Math.PI * 2); x.fill(); x.fillStyle = BONE; x.beginPath(); x.arc(0, 0, 46, 0, Math.PI * 2); x.fill()
  x.rotate(Math.sin(t * 5) * 1.2); x.fillStyle = RED; x.beginPath(); x.moveTo(0, -40); x.lineTo(10, 0); x.lineTo(-10, 0); x.closePath(); x.fill(); x.fillStyle = INK; x.beginPath(); x.moveTo(0, 40); x.lineTo(10, 0); x.lineTo(-10, 0); x.closePath(); x.fill()
  x.restore()
}
function horsePillow(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -70, -30, 140, 70, '#c9a6ff', { b: 5 }); box(x, 40, -80, 40, 60, '#c9a6ff', { b: 5 }); box(x, 60, -96, 50, 34, '#c9a6ff', { b: 5 })
  R(x, INK, 88, -86, 8, 8); R(x, '#8a5ad0', 40, -84, 12, 50)
  x.restore()
}

export const EP = makeGuess({
  id: 'kgse09', sign: 'sagittarius', D: 10, ending: 'cut', brk: 'scratch', scratchCap: 'it’s 2 a.m. *where to?*',
  hook: '2 a.m. planning | *trips to forget them.*',
  clues: ['a compass', 'a horse-shaped pillow'],
  last: 'Feelings always take | *the window seat.*',
  draw(x, S) {
    const { t, u, rv, T } = S
    bed(x)
    clock(x, 900, 500, t)
    map(x, u, 760, 760, 400, 260)
    backpack(x, 870, 1100, clamp(prog(u, 3.0, 3.8)))
    // frame 0: mid-leap off the bed (high, tilted); lands at 0.9 then bounces with each pin
    const air = u < 0.9 ? Math.sin(Math.PI * clamp((u + 0.45) / 1.35)) : 0
    const X = lerp(300, 450, clamp(u / 1.0)), Y = 1010 - 260 * air
    shadow(x, X, 1240, 290 * (1 - 0.4 * air))
    S.sil({ x: X, y: Y, s: 340, mood: rv > 0.5 ? 'happy' : 'wide', look: [1, -0.4], hops: PINS.map((_, i) => 1.4 + i * 0.42).filter(h => h < S.R), rot: -0.3 * air + 0.05 * Math.sin(u * 3), squash: -0.12 * air })
    if (t > T.C1) compass(x, 170, 860, pop01(t, T.C1 + 0.05, 0.3, 2.6), t)
    if (T.C2 != null) horsePillow(x, 270, 1040, pop01(t, T.C2 + 0.05, 0.3, 2.6))
    if (u > 1.4 && rv < 0.5) label(x, `${Math.min(8, Math.floor((u - 1.4) / 0.42) + 1)} TRIPS`, 760, 600, { size: 34, col: GOLD, font: INTER, weight: 900 })
    if (rv > 0.5) bubble(x, t, 470, 700, S.R + 0.3, S.D + 1, 'okay. one trip. with friends.', { size: 30 })
  },
  cues: [['whoosh', 0.0, 0.5, 0.05], ...PINS.map((_, i) => ['pop', +(1.4 + i * 0.42).toFixed(3), [880, 987.77, 1174.66, 1318.51][i % 4], 0.04, (i % 2 ? 0.3 : -0.3)]), ['riser', 3.0, 3.8, 0.03]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
