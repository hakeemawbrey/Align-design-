// ksge19 · SPOT THE GREEN FLAG: "Libra and the Bill" (trial reel, ≈ 10 s, jazzy · Bb). Format: ../../ksge01/scenes/greenkit.js.
//   frame 0  both takes: the receipt mid-unroll, flying over the table; a calculator mid-beep.
//   TAKE A   Libra on the calculator: "you had the extra side, so that's 2.40."
//   TAKE B   Libra slides the receipt over: "I've got this one. next one's yours?"
//   freeze, 3-2-1, GREEN FLAG: Take B. THE STARS: "No calculator. *Just 'next one's yours.'*"  Hard cut.
import { makeGreen, R, box, pbubble, hearts, table, prog, clamp, lerp, ease, INK, BONE, GOLD, MONO } from '../../ksge01/scenes/greenkit.js'
import { cafe } from '../../ksge02/scenes/sets.js'

function receipt(x, cx, top, len, rot) {
  x.save(); x.translate(cx, top); x.rotate(rot)
  R(x, INK, -44, -4, 88, len + 8); R(x, '#f4f1ea', -40, 0, 80, len)
  for (let y = 16; y < len - 10; y += 18) R(x, '#b8b0a0', -30, y, 40 + (y * 7) % 20, 5)
  x.restore()
}
function calculator(x, cx, cy, tk, beep) {
  box(x, cx - 50, cy - 70, 100, 140, '#3a3070', { b: 5 }); R(x, '#9fe6b0', cx - 40, cy - 60, 80, 30)
  x.font = `700 18px ${MONO}`; x.fillStyle = INK; x.textAlign = 'right'; x.textBaseline = 'middle'; x.fillText(beep ? '2.40' : '0.00', cx + 34, cy - 45)
  for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) R(x, (i + j + Math.floor(tk * 8)) % 5 === 0 ? GOLD : BONE, cx - 36 + i * 26, cy - 18 + j * 26, 20, 20)
}
function scene(x, tk, S, mode) {
  const { hero, you } = S
  const f = S.focus[mode]
  cafe(x)
  table(x, 250, 470, 320)
  you(x, tk, { x: 100, y: 410, s: 165, mood: mode === 'A' ? (tk > 1.2 ? 'wide' : 'neutral') : (tk > f[0] + 0.5 ? 'happy' : 'neutral'), look: [1, 0], hops: mode === 'B' ? [f[0] + 0.6] : [] })
  hero(x, tk, { x: 400, y: 410, s: 190, mood: mode === 'A' ? 'neutral' : (tk > f[0] + 0.2 ? 'happy' : 'neutral'), look: mode === 'A' ? [0, 1] : [-1, 0] })
  // the receipt unrolls in the air at frame 0
  const u = ease.outCubic(clamp(prog(tk, -0.4, 0.5)))
  if (mode === 'A') receipt(x, 260, 300, lerp(60, 300, u) + 60 * clamp(prog(tk, 0.8, 1.6)), lerp(-0.8, 0.05, u))
  else { const slide = ease.inOutCubic(prog(tk, f[0] + 0.1, f[0] + 0.4)); receipt(x, lerp(260, 380, slide), 300, lerp(60, 300, u) * (1 - 0.5 * slide), lerp(-0.8, 0.05, u)) }
  const beep = tk > 0.7
  if (mode === 'A' || tk < f[0]) calculator(x, mode === 'A' ? 400 : 420, 300, tk, beep)
  if (mode === 'A') pbubble(x, tk, 270, 170, 0.8, 99, 'you had the extra side,\nso that’s 2.40.', { size: 28, tail: 0.6 })
  else { pbubble(x, tk, 260, 170, f[0] + 0.3, 99, 'I’ve got this one.\nnext one’s yours?', { size: 30, tail: 0.6, col: '#c9f2d4' }); hearts(x, tk, f[0] + 0.7, 110, 340, { n: 4, cell: 4 }) }
}
const EP = makeGreen({
  id: 'ksge19', sign: 'libra', name: 'Libra', win: 'B', ending: 'cut',
  hook: 'THE BILL | *JUST LANDED.*',
  premise: 'The bill arrives. *Now what?*',
  takes: { A: { draw: (x, tk, S) => scene(x, tk, S, 'A') }, B: { draw: (x, tk, S) => scene(x, tk, S, 'B') } },
  last: 'No calculator. *Just “next one’s yours.”*',
  cues: [['whoosh', 0.0, 0.5, 0.03], ['pop', 0.7, 1760, 0.03, -0.3], ['pop', 0.78, 1760, 0.03, -0.3], ['pop', 0.86, 1760, 0.03, -0.3], ['pop', 0.85, 659.25, 0.035, -0.4], ['whoosh', 2.15, 0.3, 0.025], ['pop', 2.35, 1318.51, 0.04, 0.4]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
