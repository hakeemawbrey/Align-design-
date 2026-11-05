// ksge17 · SPOT THE GREEN FLAG: "Leo's Holiday Party" (trial reel, ≈ 10 s, house · G). Format: ../../ksge01/scenes/greenkit.js.
//   frame 0  both takes: Leo mid-entrance, a party hat mid-fly, the HOLIDAY PARTY banner swinging.
//   TAKE A   "be right back!!" … Leo works the room; you alone at the snack table: "…"
//   TAKE B   "everyone, this is my person!" then, quietly: "you good?" a thumbs up.
//   freeze, 3-2-1, GREEN FLAG: Take B. THE STARS: "Brought you. *Stayed with you.*"  Hard cut.
import { makeGreen, R, box, pbubble, hearts, drawBits, table, prog, clamp, lerp, ease, INK, BONE, GOLD, RED, GREEN } from '../../ksge01/scenes/greenkit.js'
import { party, balloonText } from '../../ksge02/scenes/sets.js'

function hat(x, cx, cy, rot) { x.save(); x.translate(cx, cy); x.rotate(rot); drawBits(x, ['..G..', '..R..', '.RRR.', '.GGG.', 'RRRRR'], { R: RED, G: GOLD }, 0, 0, 9); x.restore() }
function scene(x, tk, S, mode) {
  const { hero, you, other } = S
  const f = S.focus[mode]
  x.save(); x.translate(252, 0); x.rotate(0.03 * Math.sin(tk * 4) * (1 - clamp(tk / 1.5))); x.translate(-252, 0)
  party(x, tk, { banner: 'HOLIDAY PARTY', wall: '#2f4a5c', wall2: '#2a4354' })
  x.restore()
  const co = [other('capricorn', 21), other('virgo', 22), other('gemini', 23)]
  // the snack table on the left
  table(x, 120, 470, 200)
  drawBits(x, ['.CC.CC.', 'CCCCCCC'], { C: GOLD }, 110, 455, 8)
  // Leo: mid-entrance at frame 0 (from the right), hat flying off
  const enter = ease.outCubic(clamp(prog(tk, -0.3, 0.5)))
  let lx = lerp(560, 330, enter)
  if (mode === 'A') lx = lerp(lx, 430, ease.inOutCubic(prog(tk, 0.9, 1.3)))
  const youX = mode === 'A' ? 110 : lerp(110, 200, ease.inOutCubic(prog(tk, f[0] + 0.1, f[0] + 0.5)))
  if (mode === 'A') co.forEach((c, i) => c(x, tk, { x: 360 + i * 60, y: 430 - (i % 2) * 30, s: 100, mood: 'happy', hops: [1.3 + i * 0.1] }))
  else co.forEach((c, i) => c(x, tk, { x: 330 + i * 70, y: 330 - (i % 2) * 20, s: 90, mood: tk > f[0] + 0.5 ? 'sparkle' : 'happy' }))
  you(x, tk, { x: youX, y: 430, s: 150, mood: mode === 'A' ? (tk > 1.4 ? 'wide' : 'neutral') : (tk > f[0] + 0.5 ? 'happy' : 'neutral'), look: [1, 0] })
  hero(x, tk, { x: lx, y: 440, s: 180, mood: 'sparkle', look: mode === 'A' && tk > 1 ? [1, 0] : [-1, 0], hops: mode === 'A' ? [1.4, 1.7] : [f[0] + 0.3] })
  const hf = clamp(prog(tk, -0.4, 0.6))
  if (hf < 1) hat(x, lerp(400, 250, hf), lerp(330, 160, hf) + 200 * hf * hf, hf * 6)
  if (mode === 'A') { pbubble(x, tk, 340, 250, 0.7, 1.4, 'be right back!!', { size: 30, tail: 0.3 }); pbubble(x, tk, 120, 300, 1.5, 99, '…', { size: 34 }) }
  else {
    pbubble(x, tk, 280, 220, f[0] + 0.25, f[0] + 1.05, 'everyone, this\nis my person!', { size: 30, tail: 0.4, col: '#c9f2d4' })
    pbubble(x, tk, 300, 230, f[0] + 1.1, 99, '(quietly) you good?', { size: 28, tail: 0.4, col: '#c9f2d4' })
    hearts(x, tk, f[0] + 0.7, 200, 380, { n: 4, cell: 4 })
  }
  void box; void R; void BONE; void GREEN; void balloonText
}
const EP = makeGreen({
  id: 'ksge17', sign: 'leo', name: 'Leo', win: 'B', ending: 'cut',
  hook: 'THEIR WORK PARTY. | *YOU KNOW NOBODY.*',
  premise: 'Their *work* party. You know nobody.',
  takes: { A: { draw: (x, tk, S) => scene(x, tk, S, 'A') }, B: { draw: (x, tk, S) => scene(x, tk, S, 'B') } },
  last: 'Brought you. *Stayed with you.*',
  cues: [['whoosh', 0.0, 0.4, 0.035], ['pop', 0.15, 1567.98, 0.035, 0.3], ['pop', 0.7, 1174.66, 0.035, -0.4], ['whoosh', 0.9, 0.35, 0.025], ['pop', 1.5, 440, 0.03, -0.4], ['pop', 2.3, 1318.51, 0.04, 0.4], ['pop', 3.15, 987.77, 0.03, 0.4]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
