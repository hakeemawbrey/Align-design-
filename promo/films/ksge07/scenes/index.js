// ksge07 · SPOT THE GREEN FLAG: "Libra Meets Your Friends" (trial reel, ≈ 10 s, jazzy · Eb). Format: ../../ksge01/scenes/greenkit.js.
//   frame 0  both takes: Libra mid-twirl at your friends' party, confetti frozen in the air.
//   TAKE A   Libra charms only the loud two ("you two are SO fun!!"); the quiet friend alone in the corner: "…"
//   TAKE B   Libra crosses to the quiet friend: "wait, you paint? show me!"  the quiet friend lights up, holds up a canvas.
//   freeze, 3-2-1, GREEN FLAG: Take B. THE STARS: "They made room for *the quiet one.*"  Loops back to frame 0.
import { makeGreen, R, box, pbubble, hearts, sparkles, pop01, prog, clamp, lerp, ease, INK, BONE, GOLD, PINK, SKYB, GREEN } from '../../ksge01/scenes/greenkit.js'
import { party } from '../../ksge02/scenes/sets.js'

function frozenConfetti(x, tk) {
  const k = 1 - clamp(prog(tk, 0.1, 0.9))
  if (k <= 0) return
  for (let i = 0; i < 18; i++) { const px = (i * 83) % 480 + 12, py = 200 + (i * 47) % 260 + (1 - k) * 300; x.save(); x.globalAlpha *= k; x.translate(px, py); x.rotate(i); x.fillStyle = [GOLD, PINK, SKYB, GREEN][i % 4]; x.fillRect(-8, -3, 16, 6); x.restore() }
}
function canvas(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(-0.1)
  box(x, -46, -36, 92, 72, BONE, { b: 5 }); R(x, SKYB, -40, -30, 80, 30); R(x, GREEN, -40, 0, 80, 30); R(x, GOLD, 14, -24, 14, 14)
  x.restore()
}
function scene(x, tk, S, mode) {
  const { hero, other } = S
  const f = S.focus[mode]
  party(x, tk, { banner: null })
  const loud1 = other('leo', 4), loud2 = other('sagittarius', 8), quiet = other('aquarius', 11)
  loud1(x, tk, { x: 80, y: 480, s: 130, mood: 'happy', look: [1, 0], hops: [0.4, 1.0, 1.6] })
  loud2(x, tk, { x: 190, y: 490, s: 120, mood: 'happy', look: [1, 0], hops: [0.7, 1.3] })
  // Libra: mid-twirl at frame 0; in B crosses to the corner
  const go = mode === 'B' ? ease.inOutCubic(prog(tk, f[0] + 0.1, f[0] + 0.6)) : 0
  const twirl = (1 - ease.outCubic(clamp(prog(tk, -0.3, 0.45)))) * 0.9
  const lx = lerp(290, 340, go)
  x.save(); x.translate(lx, 440); x.rotate(twirl); x.translate(-lx, -440)
  hero(x, tk, { x: lx, y: 440, s: 170, mood: tk < 0.4 ? 'sparkle' : mode === 'A' ? 'happy' : (tk > f[0] + 0.5 ? 'sparkle' : 'happy'), look: mode === 'B' && tk > f[0] ? [1, 0.3] : [-1, 0], hops: mode === 'A' ? [0.9, 1.5] : [f[0] + 0.6] })
  x.restore()
  frozenConfetti(x, tk)
  // the quiet friend in the corner
  const qMood = mode === 'B' && tk > f[0] + 0.7 ? 'sparkle' : 'neutral'
  quiet(x, tk, { x: 440, y: 520, s: 100, mood: qMood, look: mode === 'B' && tk > f[0] + 0.5 ? [-1, 0] : [0, 0.6] })
  if (mode === 'A') {
    pbubble(x, tk, 190, 200, 0.85, 99, 'you two are\nSO fun!!', { size: 32, tail: -0.3 })
    pbubble(x, tk, 440, 400, 1.4, 99, '…', { size: 30, tail: 0 })
  } else {
    pbubble(x, tk, 300, 200, f[0] + 0.45, 99, 'wait, you paint?\nshow me!', { size: 32, tail: 0.6, col: '#c9f2d4' })
    canvas(x, 420, 340, pop01(tk, f[0] + 0.9, 0.3, 2.4))
    sparkles(x, tk, 420, 340, f[0] + 0.9, 8, 70, 1)
    hearts(x, tk, f[0] + 1.0, 400, 380, { n: 4, cell: 4 })
  }
}
const EP = makeGreen({
  id: 'ksge07', sign: 'libra', name: 'Libra', win: 'B', ending: 'loop',
  hook: 'LIBRA MET | *YOUR FRIENDS.*',
  premise: 'First time meeting *your friends.*',
  takes: { A: { draw: (x, tk, S) => scene(x, tk, S, 'A') }, B: { draw: (x, tk, S) => scene(x, tk, S, 'B') } },
  last: 'They made room for *the quiet one.*',
  cues: [['glitter', 0.0, 0.4], ['whoosh', 0.02, 0.3, 0.03], ['pop', 0.85, 1174.66, 0.04, -0.4], ['pop', 1.4, 440, 0.03, -0.2], ['whoosh', 2.15, 0.35, 0.03], ['pop', 2.5, 1318.51, 0.04, 0.4], ['glitter', 2.95, 3.3]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
