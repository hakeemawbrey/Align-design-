// kgse06: GUESS THE SIGN, "Texted first in four seconds" (7 s vertical, star_advice trial, house · C, loop).
//   0.00  frame 0: the silhouette mid-sprint, thumb slamming a giant SEND, a stopwatch frozen at 0:04.
//         Hook: "Texted first in *four seconds flat.*"
//   0.35  colour flash · SENT · then instant panic: pacing back and forth across the stage
//   C1 "a racing flag" · C2 "a stopwatch" · buzz · 3·2·1 · reveal: ARIES · last line · loop
import { makeGuess, box, R, phone, bubble, shadow, label, chat, drawBits, pop01, outK, prog, ease, lerp, clamp, INK, BONE, GOLD, RED, CYAN, MINT, INTER, MONO } from '../../kgse01/scenes/guesskit.js'

function scr(u) {
  return (x, w, h) => {
    R(x, '#1a1634', 0, 0, w, h)
    chat(x, 'hey! had fun today', w - 10, 30, { me: true, size: 18 })
    x.textAlign = 'right'; x.font = `700 14px ${MONO}`; x.fillStyle = MINT; x.fillText(u > 0.3 ? 'sent ✓' : 'sending…', w - 12, 82)
    // the big SEND button, slammed at frame 0
    const press = u < 0.25 ? 1 : 0
    box(x, 20, h - 90 + press * 6, w - 40, 64, press ? '#ff6b7f' : '#7c74f0', { b: 5 })
    x.textAlign = 'center'; x.textBaseline = 'middle'; x.font = `900 30px ${INTER}`; x.fillStyle = BONE; x.fillText('SEND', w / 2, h - 58 + press * 6)
  }
}
function stopwatch(x, cx, cy, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.1 * Math.sin(t * 4)); x.scale(k, k)
  box(x, -14, -112, 28, 24, '#c9c4d8', { b: 4 })
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 96, 0, Math.PI * 2); x.fill(); x.fillStyle = BONE; x.beginPath(); x.arc(0, 0, 84, 0, Math.PI * 2); x.fill()
  x.font = `900 52px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = RED; x.fillText('0:04', 0, 6)
  x.restore()
}
const FLAG = ['KWKWKW', 'WKWKWK', 'KWKWKW', 'WKWKWK']
export const EP = makeGuess({
  id: 'kgse06', sign: 'aries', D: 7, ending: 'loop', brk: 'flash', flashCol: '#ff8a5a',
  hook: 'Texted first in | *four seconds flat.*',
  clues: ['a racing flag', 'a stopwatch'],
  last: 'Brave. Now | *put the phone down.*',
  draw(x, S) {
    const { t, u, rv, T } = S
    // frame 0: mid-sprint toward the phone; then pacing (x swings) until the reveal calms it
    const pace = rv > 0.5 ? 0 : clamp(prog(u, 0.9, 1.3)) * Math.sin((u - 0.9) * 4.2)
    const X = 470 + 210 * pace
    const lean = u < 0.6 ? 0.32 * (1 - u / 0.6) : 0.18 * Math.cos((u - 0.9) * 4.2) * (1 - rv)
    shadow(x, X, 1240, 290)
    S.sil({ x: X, y: 1010, s: 360, mood: rv > 0.5 ? 'happy' : u < 0.8 ? 'wide' : 'squint', look: [pace > 0 ? -1 : 1, 0], hops: [1.1, 1.85, 2.6, 3.35].filter(h => h < S.R), rot: lean, squash: -0.1 * Math.exp(-u * 4) })
    phone(x, 810, 860, { w: 230, h: 360, rot: 0.12 - 0.08 * Math.exp(-u * 4), fn: scr(u) })
    if (u < 0.5) label(x, 'SLAM!', 700, 1100, { size: 60, col: GOLD, font: INTER, weight: 900, rot: -0.2, alpha: 1 - u * 2 })
    if (t > T.C1) drawBits(x, FLAG, { K: INK, W: BONE }, 180, 820 + 6 * Math.sin(t * 8), 22 * pop01(t, T.C1 + 0.05, 0.3, 2.6), { rot: 0.15 * Math.sin(t * 7) })
    if (t > T.C1) { const k = pop01(t, T.C1 + 0.05, 0.3, 2.6); R(x, INK, 116, 860, 10 * k, 300 * k) }
    if (T.C2 != null) stopwatch(x, 860, 1150, pop01(t, T.C2 + 0.05, 0.3, 2.6) * 0.8, t)
    if (rv > 0.5) bubble(x, t, 380, 690, S.R + 0.3, S.D + 1, 'phone down. snack up.', { size: 32, tail: 0.3 })
  },
  cues: [['pop', 0.0, 1318.51, 0.06, 0.3], ['boom', 0.0, 0.14], ['pop', 0.35, 1760, 0.04, 0.3], ...[1.1, 1.85, 2.6, 3.35].map(h => ['tick', h, 0.05])],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
