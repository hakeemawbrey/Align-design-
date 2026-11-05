// kgse10: GUESS THE SIGN, "Crying, penciled in for Thursday" (9 s vertical, star_advice trial, lofi · D, hard cut).
//   0.00  frame 0: the silhouette mid-scribble in a giant planner, the pencil snapping in two.
//         Hook: "Penciled in crying *for Thursday, 7 p.m.*"
//   0.35  colour flash · the planner: THU 7:00 "feelings (30 min)" · it's Monday… and the tears arrive early
//   C1 "a goat-shaped mug" · C2 "a five-year plan" · buzz · 3·2·1 · reveal: CAPRICORN · last line, hard cut
import { makeGuess, box, R, bubble, shadow, label, tears, pop01, outK, prog, ease, lerp, clamp, INK, BONE, GOLD, RED, CYAN, MINT, PINK, INTER, MONO } from '../../kgse01/scenes/guesskit.js'

const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI']
function planner(x, u, t) {
  x.save(); x.translate(760, 860); x.rotate(0.05)
  box(x, -200, -250, 400, 500, BONE, { b: 7 }); R(x, '#d94a5a', -200, -250, 400, 50)
  x.font = `900 28px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = BONE; x.fillText('THIS WEEK', 0, -224)
  DAYS.forEach((d, i) => {
    const y = -170 + i * 84
    R(x, 'rgba(27,18,54,0.15)', -180, y + 34, 360, 3)
    x.textAlign = 'left'; x.font = `800 22px ${MONO}`; x.fillStyle = i === 0 ? RED : INK; x.fillText(d, -176, y)
    x.font = `700 20px ${INTER}`; x.fillStyle = INK
    const items = ['gym 6:00 · emails', 'meeting · laundry', 'groceries · budget', '7:00 feelings (30 min)', 'meal prep']
    if (i !== 3 || u > 0.9) x.fillText(items[i], -100, y)
    if (i === 3 && u > 0.9) { x.strokeStyle = PINK; x.lineWidth = 4; x.strokeRect(-110, y - 22, 290, 44) }
  })
  if (u > 1.0 && u < 1.3) { x.fillStyle = 'rgba(255,255,255,0.5)'; x.fillRect(-200, -250 + 3 * 84, 400, 84) }
  // "TODAY" arrow on MON
  label(x, '◀ today', 120, -170, { size: 22, col: RED, font: MONO })
  x.restore()
}
function pencil(x, u) {
  // snapped in two at frame 0; halves fly off then land
  const p = clamp(u / 0.9)
  if (u > 1.1) return
  for (const d of [-1, 1]) {
    x.save(); x.globalAlpha = 1 - clamp((u - 0.8) / 0.3); x.translate(620 + d * (20 + 220 * p), 700 - 300 * Math.sin(Math.PI * p) + 380 * p * p); x.rotate(d * (0.5 + 6 * p))
    box(x, -60, -9, 120, 18, GOLD, { b: 4 }); R(x, d < 0 ? '#f0c8a0' : '#ff8fb1', d < 0 ? -64 : 52, -9, 12, 18)
    x.restore()
  }
}
function mug(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -50, -50, 100, 100, BONE, { b: 6 }); x.lineWidth = 12; x.strokeStyle = INK; x.beginPath(); x.arc(60, 0, 26, -1.2, 1.2); x.stroke()
  // goat horns + face
  for (const d of [-1, 1]) { x.save(); x.translate(d * 24, -54); x.rotate(d * 0.5); R(x, INK, -7, -36, 14, 40); R(x, '#a07850', -4, -33, 8, 34); x.restore() }
  R(x, INK, -22, -16, 10, 10); R(x, INK, 12, -16, 10, 10); R(x, INK, -6, 14, 12, 18)
  x.restore()
}
function fiveYear(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.08); x.scale(k, k)
  box(x, -90, -60, 180, 120, '#2fc79a', { b: 6 }); x.font = `900 24px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText('5-YEAR', 0, -14); x.fillText('PLAN', 0, 16); x.font = `700 14px ${MONO}`; x.fillText('vol. 3', 0, 42)
  x.restore()
}

export const EP = makeGuess({
  id: 'kgse10', sign: 'capricorn', D: 9, ending: 'cut', brk: 'flash', flashCol: '#9fe6b0',
  hook: 'Penciled in crying | *for Thursday, 7 p.m.*',
  clues: ['a goat-shaped mug', 'a five-year plan'],
  last: 'Feelings don’t wait | *for an invite.*',
  draw(x, S) {
    const { t, u, rv, T } = S
    planner(x, u, t)
    const o = { x: 380, y: 1010, s: 360, mood: rv > 0.5 ? 'sparkle' : u > 3.0 ? 'wide' : 'squint', look: [1, -0.2], hops: [0.05, 1.5, 3.0, 3.5].filter(h => h < S.R), rot: 0.2 * Math.exp(-u * 2.5) - 0.06 * clamp(prog(u, 3.0, 3.3)), squash: 0.08 * Math.exp(-u * 3) }
    shadow(x, 380, 1240, 290)
    S.sil(o)
    // Monday: the tears arrive early (on the silhouette), then a bubble
    if (u > 3.0 && rv < 1) { x.save(); x.globalAlpha = 1 - rv; tears(x, t, o, 2); x.restore() }
    if (rv > 0.5) tears(x, t, o, 1)
    if (u > 3.1 && rv < 0.5) bubble(x, t, 360, 700, 3.1, S.R, 'it’s… MONDAY??', { size: 34, tail: 0.1 })
    pencil(x, u)
    if (t > T.C1) mug(x, 760, 1180, pop01(t, T.C1 + 0.05, 0.3, 2.6))
    if (T.C2 != null) fiveYear(x, 150, 820, pop01(t, T.C2 + 0.05, 0.3, 2.6))
    if (rv > 0.5) bubble(x, t, 380, 700, S.R + 0.3, S.D + 1, 'okay. feeling it now.', { size: 32, tail: 0.1 })
  },
  cues: [['tick', 0.0, 0.12], ['pop', 0.02, 330, 0.06, 0], ['whoosh', 0.05, 0.5, 0.04], ['tick', 0.9, 0.06], ['pop', 1.0, 1174.66, 0.04, 0.3], ['pop', 3.1, 440, 0.05, -0.2], ['pop', 3.18, 392, 0.04, -0.2]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
