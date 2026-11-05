// kgse07: GUESS THE SIGN, "Single at the couples' table" (10 s vertical, star_advice trial, jazzy · Bb, hard cut).
//   0.00  frame 0: the silhouette mid-bite of a bread roll at a long dinner table, three couples feeding each other.
//         Hook: "Single at the couples’ table. *Thriving.*"
//   0.35  sudden silence · the couples coo; the silhouette butters a second roll, blissful
//   C1 "a cosy scarf" · C2 "a cheese board" · buzz · Pisces happy-sobs · reveal: TAURUS · last line, hard cut
import { makeGuess, box, R, bubble, shadow, hearts, label, drawStage, pop01, outK, prog, ease, lerp, clamp, INK, BONE, GOLD, PINK, RED, CYAN, INTER } from '../../kgse01/scenes/guesskit.js'

const COUPLES = [['aries', 'libra', 150], ['gemini', 'sagittarius', 930]]
function roll(x, cx, cy, k = 1, bite = 0) {
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 50, 34, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#d9954a'; x.beginPath(); x.ellipse(0, -2, 44, 28, 0, 0, Math.PI * 2); x.fill()
  R(x, '#f0c27a', -26, -18, 16, 6); R(x, '#f0c27a', 4, -20, 16, 6)
  if (bite > 0) { x.fillStyle = '#1b1236'; x.beginPath(); x.arc(40, -10, 20 * bite, 0, Math.PI * 2); x.fill() }
  x.restore()
}
function scarf(x, o, k) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha = clamp(k)
  R(x, INK, o.x - 150, o.y + 30, 300, 52); R(x, '#d94a5a', o.x - 144, o.y + 36, 288, 40)
  for (let i = 0; i < 8; i++) R(x, '#f2c75c', o.x - 140 + i * 36, o.y + 36, 12, 40)
  R(x, INK, o.x + 60, o.y + 70, 56, 120); R(x, '#d94a5a', o.x + 66, o.y + 76, 44, 108)
  x.restore()
}
function cheese(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -120, -20, 240, 40, '#a07850', { b: 5 })
  for (const [dx, c] of [[-80, '#f2d36a'], [-20, '#f7e7a0'], [50, '#e9b24a']]) { x.fillStyle = INK; x.beginPath(); x.moveTo(dx - 34, -18); x.lineTo(dx + 34, -18); x.lineTo(dx, -70); x.closePath(); x.fill(); x.fillStyle = c; x.beginPath(); x.moveTo(dx - 27, -22); x.lineTo(dx + 27, -22); x.lineTo(dx, -62); x.closePath(); x.fill() }
  for (let i = 0; i < 4; i++) { x.fillStyle = '#9a4a8a'; x.beginPath(); x.arc(90 + (i % 2) * 14, -30 - Math.floor(i / 2) * 14, 8, 0, Math.PI * 2); x.fill() }
  x.restore()
}

export const EP = makeGuess({
  id: 'kgse07', sign: 'taurus', D: 10, ending: 'cut', brk: 'silence',
  hook: 'Single at the couples’ table. | *Thriving.*',
  clues: ['a cosy scarf', 'a cheese board'],
  last: 'Single at the table. | *Still the best seat.*',
  pisLine: 'PISCES? (sob)',
  bg(x, S) {
    drawStage(x, S.u, { spot: 1 })
    // the long table
    box(x, 40, 1150, 1000, 40, '#7a4a2a', { b: 7, hi: '#9a6a3a' }); R(x, '#efe6d6', 40, 1150, 1000, 14)
    R(x, INK, 90, 1190, 20, 70); R(x, INK, 970, 1190, 20, 70)
    // candles
    for (const cx of [340, 740]) { box(x, cx - 10, 1080, 20, 64, BONE, { b: 4 }); x.fillStyle = '#ffcf6a'; x.beginPath(); x.ellipse(cx, 1066 + Math.sin(S.u * 9 + cx) * 2, 9, 16, 0, 0, Math.PI * 2); x.fill() }
  },
  draw(x, S) {
    const { t, u, rv, T } = S
    // the couples feed each other bites and coo
    COUPLES.forEach(([a, b, cx], i) => {
      const lean = 8 * Math.sin(u * 2 + i)
      S.star(a, { x: cx - 60 + lean, y: 1040, s: 150, mood: 'heart', look: [1, 0], seed: 10 + i, hops: [1.5 + i * 0.4, 3.5 + i * 0.4] })
      S.star(b, { x: cx + 60 - lean, y: 1040, s: 150, mood: 'happy', look: [-1, 0], seed: 20 + i, hops: [2.2 + i * 0.4, 4.6] })
      hearts(x, t, 1.2 + i * 1.4, cx, 950, { n: 3, cell: 5 }); hearts(x, t, 4.0 + i, cx, 950, { n: 3, cell: 5 })
    })
    // the hero: mid-bite at frame 0, blissful buttering after
    const o = { x: 540, y: 1000, s: 300, mood: rv > 0.5 ? 'happy' : u < 0.4 ? 'wide' : 'happy', look: [0, 0.3], hops: [0.1, 2.1, 3.0, 4.4, 5.2].filter(h => h < S.R), rot: 0.1 * Math.exp(-u * 3), squash: 0.08 * Math.sin(u * 6) * 0.5 }
    if (t > T.C1) scarf(x, { x: o.x, y: o.y + 10 }, 0)
    S.sil(o)
    if (t > T.C1) scarf(x, { x: o.x, y: o.y + 18 }, pop01(t, T.C1 + 0.05, 0.3, 2))
    const r2 = u > 2.2
    roll(x, 650, 1020 - 20 * Math.exp(-u * 2), 1, r2 ? 0 : clamp(u * 2))
    if (r2) { R(x, INK, 690, 1060, 80, 12); R(x, '#c9c4d8', 694, 1063, 72, 6); R(x, '#fff1a8', 640, 1000, 30, 8) }
    if (T.C2 != null) cheese(x, 430, 1130, pop01(t, T.C2 + 0.05, 0.3, 2.4))
    if (u > 1.6 && u < 2.6) bubble(x, t, 170, 860, 1.6, 2.6, 'aww babe', { size: 28 })
    if (u > 3.0 && u < 4.2) bubble(x, t, 930, 860, 3.0, 4.2, 'no YOU', { size: 28 })
    if (u > 4.6 && rv < 0.5) bubble(x, t, 540, 760, 4.6, S.R, 'mm. bread.', { size: 32 })
    if (rv > 0.5) bubble(x, t, 540, 740, S.R + 0.3, S.D + 1, 'best seat in the house.', { size: 32 })
  },
  cues: [['pop', 0.05, 659.25, 0.05, 0], ['pluck', 1.6, 1174.66, 0.03, -0.4, 0.3], ['pluck', 3.0, 1318.51, 0.03, 0.4, 0.3], ['pop', 2.2, 880, 0.04, 0.2], ['tick', 4.6, 0.05]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
