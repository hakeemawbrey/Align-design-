// kgse08: GUESS THE SIGN, "Three drafts and a poll" (9 s vertical, star_advice trial, pop · G, loop).
//   0.00  frame 0: the silhouette mid-shrug between three floating draft replies, a poll bar spinning.
//         Hook: "Group chat, pick my reply. *Please.*"
//   0.35  whip zoom · the poll: A, B, C… the group votes split 1 · 1 · 1
//   C1 "a balance scale" · C2 "three drafts, all nice" · buzz · 3·2·1 · reveal: LIBRA · last line · loop
import { makeGuess, box, R, bubble, shadow, label, pop01, outK, prog, ease, lerp, clamp, INK, BONE, GOLD, PINK, CYAN, MINT, INTER, MONO } from '../../kgse01/scenes/guesskit.js'

const DRAFTS = [['A', 'had a lovely time!'], ['B', 'that was so fun :)'], ['C', 'let’s do it again?']]
function draft(x, i, cx, cy, k, t, votes) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy + 8 * Math.sin(t * 2.4 + i * 2)); x.rotate([-0.06, 0.04, -0.03][i]); x.scale(k, k)
  box(x, -170, -50, 340, 100, BONE, { b: 6 })
  box(x, -158, -36, 54, 72, [PINK, CYAN, MINT][i], { b: 4 })
  x.font = `900 40px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText(DRAFTS[i][0], -131, 2)
  x.font = `800 24px ${INTER}`; x.textAlign = 'left'; x.fillText(DRAFTS[i][1], -90, -8, 250)
  R(x, 'rgba(27,18,54,0.15)', -90, 18, 240, 14); R(x, [PINK, CYAN, MINT][i], -90, 18, 240 * votes, 14)
  x.font = `700 16px ${MONO}`; x.fillStyle = INK; x.fillText(`${Math.round(votes * 3)} vote`, 160 - 70, -30)
  x.restore()
}
function scale(x, cx, cy, k, t) {
  if (k <= 0.01) return
  const tilt = 0.12 * Math.sin(t * 2.6)
  x.save(); x.translate(cx, cy); x.scale(k, k)
  R(x, INK, -8, -100, 16, 200); box(x, -60, 96, 120, 18, GOLD, { b: 4 })
  x.save(); x.translate(0, -96); x.rotate(tilt); R(x, INK, -110, -6, 220, 12); R(x, GOLD, -106, -3, 212, 6)
  for (const d of [-1, 1]) { x.save(); x.translate(d * 100, 0); x.rotate(-tilt); R(x, INK, -2, 0, 4, 50); x.fillStyle = INK; x.beginPath(); x.ellipse(0, 54, 40, 12, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = GOLD; x.beginPath(); x.ellipse(0, 52, 34, 8, 0, 0, Math.PI * 2); x.fill(); x.restore() }
  x.restore(); x.restore()
}

export const EP = makeGuess({
  id: 'kgse08', sign: 'libra', D: 9, ending: 'loop', brk: 'whip',
  hook: 'Group chat, pick my reply. | *Please.*',
  clues: ['a balance scale', 'three drafts, all nice'],
  last: 'Your first draft | was *already kind.*',
  draw(x, S) {
    const { t, u, rv, T } = S
    const shrug = 0.12 * Math.sin(u * 2.2)
    shadow(x, 540, 1240, 290)
    S.sil({ x: 540, y: 1040, s: 330, mood: rv > 0.5 ? 'happy' : 'wide', look: [Math.sin(u * 1.7), -0.6], hops: [1.4, 2.3, 3.2, 4.1].filter(h => h < S.R), rot: shrug, squash: -0.1 * Math.exp(-u * 3) + 0.05 * Math.abs(Math.sin(u * 2.2)) })
    // drafts orbit above, votes tick in 1 · 1 · 1
    const vt = [1.3, 1.9, 2.5]
    ;[[290, 560], [790, 640], [300, 780]].forEach(([cx, cy], i) => draft(x, i, cx + (i === 1 ? 0 : 0), cy, 1, t, clamp(prog(u, vt[i], vt[i] + 0.3)) / 3))
    if (u > 2.9 && rv < 0.5) label(x, 'TIE. TIE. TIE.', 780, 830, { size: 40, col: GOLD, font: INTER, weight: 900, rot: 0.08, alpha: clamp((u - 2.9) * 4) })
    if (t > T.C1) scale(x, 860, 1080, pop01(t, T.C1 + 0.05, 0.3, 2.4) * 0.9, t)
    if (rv > 0.5) { x.save(); x.globalAlpha = 0.9; label(x, '✓', 150, 560, { size: 80, col: MINT, font: INTER, weight: 900 }); x.restore() }
    if (rv > 0.5) bubble(x, t, 560, 860, S.R + 0.35, S.D + 1, 'sending A. it was always A.', { size: 30 })
  },
  cues: [...[1.3, 1.9, 2.5].map((v, i) => ['pop', v, [880, 987.77, 1174.66][i], 0.05, [-0.3, 0.3, -0.1][i]]), ['tick', 2.9, 0.07], ['pop', 2.92, 440, 0.04, 0]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
