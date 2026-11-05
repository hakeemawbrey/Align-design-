// kgse17: GUESS THE SIGN, "“I don't care.” Saved the playlist" (9 s vertical, star_advice trial, cinematic · Gm, hard cut).
//   0.00  frame 0: the silhouette mid-shrug, arms-crossed squash, a "SAVED ♥" toast popping behind it.
//         Hook: "Says ‘I don’t care.’ *Saved their playlist.*"
//   0.35  record scratch + freeze · caught with headphones on, swaying, mouthing every word
//   C1 "a dark hoodie" · C2 "a candle" · buzz · 3·2·1 · reveal: SCORPIO · last line, hard cut
import { makeGuess, box, R, bubble, shadow, label, drawBits, pop01, outK, prog, ease, lerp, clamp, INK, BONE, GOLD, CYAN, PINK, MINT, RED, INTER, MONO } from '../../kgse01/scenes/guesskit.js'

const NOTE = ['..XX', '..XX', '..X.', '..X.', 'XXX.', 'XXX.']
function toast(x, k) {
  if (k <= 0.01) return
  x.save(); x.translate(720, 620); x.rotate(0.05); x.scale(k, k)
  box(x, -190, -56, 380, 112, '#2a2148', { b: 6 })
  x.font = `900 30px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillStyle = MINT; x.fillText('SAVED ♥', -170, -18)
  x.font = `700 22px ${INTER}`; x.fillStyle = BONE; x.fillText('their playlist: “for u”', -170, 20)
  x.restore()
}
function headphones(x, o, k) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha = clamp(k * 2)
  x.lineWidth = 22; x.strokeStyle = INK; x.beginPath(); x.arc(o.x, o.y - 20, o.s * 0.42, Math.PI * 1.1, Math.PI * 1.9); x.stroke()
  x.lineWidth = 12; x.strokeStyle = '#5a5470'; x.stroke()
  for (const d of [-1, 1]) box(x, o.x + d * o.s * 0.42 - 26, o.y - 40, 52, 76, RED, { b: 5 })
  x.restore()
}
function candle(x, cx, cy, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -30, -60, 60, 120, '#5a2a4a', { b: 5 }); R(x, INK, -3, -76, 6, 18)
  x.fillStyle = '#ffcf6a'; x.beginPath(); x.ellipse(2 * Math.sin(t * 9), -88, 11, 20, 0, 0, Math.PI * 2); x.fill()
  x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(0, -88, 4, 0, -88, 120); g.addColorStop(0, 'rgba(255,200,120,0.35)'); g.addColorStop(1, 'rgba(255,200,120,0)'); x.fillStyle = g; x.fillRect(-120, -210, 240, 240); x.restore()
  x.restore()
}
function hood(x, o, k) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha = clamp(k * 2)
  x.fillStyle = INK; x.beginPath(); x.ellipse(o.x, o.y - o.s * 0.22, o.s * 0.36, o.s * 0.3, 0, Math.PI, 0); x.fill()
  x.fillStyle = '#2b2140'; x.beginPath(); x.ellipse(o.x, o.y - o.s * 0.22, o.s * 0.32, o.s * 0.26, 0, Math.PI, 0); x.fill()
  x.restore()
}

export const EP = makeGuess({
  id: 'kgse17', sign: 'scorpio', D: 9, ending: 'cut', brk: 'scratch', scratchCap: '“I don’t care.” *(cares a lot)*',
  hook: 'Says ‘I don’t care.’ | *Saved their playlist.*',
  clues: ['a dark hoodie', 'a candle'],
  last: 'Caring quietly | *still counts as caring.*',
  draw(x, S) {
    const { t, u, rv, T } = S
    toast(x, pop01(t, -0.5, 0.3, 2) * outK(t, [1.6, 1.8]))
    const sway = u > 1.3 ? 0.12 * Math.sin(u * 4) : 0
    const o = { x: 480, y: 1030, s: 360, mood: rv > 0.5 ? 'happy' : u > 1.3 ? 'sleepy' : 'squint', look: [0, 0], hops: [1.5, 2.0, 2.5, 3.0, 3.5, 4.0].filter(h => h < S.R), rot: sway, squash: u < 1.3 ? 0.1 : 0, zzz: false }
    shadow(x, 480, 1250, 290)
    S.sil(o)
    if (t > T.C1) hood(x, o, pop01(t, T.C1 + 0.05, 0.3, 2))
    headphones(x, o, clamp(prog(u, 1.2, 1.4)))
    if (u > 1.4) for (let i = 0; i < 4; i++) { const p = ((u * 0.7 + i / 4) % 1); x.save(); x.globalAlpha = 1 - p; drawBits(x, NOTE, { X: [GOLD, PINK, CYAN, MINT][i] }, o.x + 220 + 40 * Math.sin(i + u), o.y - 120 - p * 260, 8); x.restore() }
    if (u > 1.6 && rv < 0.5) label(x, '(mouthing every word)', 520, 1300 - 40, { size: 30, col: BONE, font: INTER, weight: 800, rot: -0.03 })
    if (T.C2 != null) candle(x, 180, 1180, pop01(t, T.C2 + 0.05, 0.3, 2.4), t)
    if (rv > 0.5) bubble(x, t, 480, 740, S.R + 0.3, S.D + 1, 'fine. I love this one.', { size: 32 })
  },
  cues: [['pop', 0.0, 1318.51, 0.05, 0.3], ['pop', 0.07, 1567.98, 0.035, 0.3], ['pluck', 1.4, 880, 0.03, 0.3, 0.4], ['pluck', 2.2, 987.77, 0.03, 0.3, 0.4], ['pluck', 3.0, 1174.66, 0.03, 0.3, 0.4]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
