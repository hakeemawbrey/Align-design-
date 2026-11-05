// ksge20 · SPOT THE GREEN FLAG: "Scorpio Acts Chill" (trial reel, ≈ 10 s, cinematic · C#). Format: ../../ksge01/scenes/greenkit.js.
//   frame 0  both takes: Scorpio mid-zip into a hoodie hood, sunglasses mid-drop, on a park bench at night.
//   TAKE A   the shades come off: "honestly? I've been nervous all day. I like you."
//   TAKE B   shades on, hood up: "eh. it's whatever."
//   freeze, 3-2-1, GREEN FLAG: Take A. THE STARS: "They said *the nervous part* out loud."  Hard cut.
import { makeGreen, R, box, pbubble, hearts, sweat, starFrame, inSprite, prog, clamp, lerp, ease, INK, BONE } from '../../ksge01/scenes/greenkit.js'
import { park } from '../../ksge02/scenes/sets.js'

function shades(ctx, y) {
  for (const ex of [13.4, 22.6]) { ctx.fillStyle = INK; ctx.fillRect(ex - 3.6, y - 0.6, 7.2, 5.2); ctx.fillStyle = '#2b2140'; ctx.fillRect(ex - 3, y, 6, 4); ctx.fillStyle = 'rgba(255,255,255,0.75)'; ctx.fillRect(ex - 2.4, y + 0.6, 1.6, 0.8) }
  ctx.fillStyle = INK; ctx.fillRect(16.8, y + 0.4, 2.4, 1.2)
}
function hood(ctx, k) {
  if (k <= 0) return
  ctx.fillStyle = INK; ctx.fillRect(6, 4 + 6 * (1 - k), 24, 4); ctx.fillStyle = '#3a3a5c'; ctx.fillRect(7, 5 + 6 * (1 - k), 22, 3)
  ctx.fillStyle = INK; ctx.fillRect(5, 7 + 6 * (1 - k), 3, 10 * k); ctx.fillRect(28, 7 + 6 * (1 - k), 3, 10 * k)
}
function scene(x, tk, S, mode) {
  const { hero, you } = S
  const f = S.focus[mode]
  park(x, tk, { night: true, grass: '#2f6a4a' })
  box(x, 60, 470, 380, 30, '#7b5634', { b: 6 }); R(x, INK, 90, 506, 14, 90); R(x, INK, 396, 506, 14, 90)
  you(x, tk, { x: 140, y: 400, s: 165, mood: mode === 'A' ? (tk > 1.3 ? 'heart' : 'neutral') : (tk > f[0] + 0.5 ? 'wide' : 'neutral'), look: [1, 0] })
  const so = { x: 360, y: 400, s: 190, seed: 3 }
  const off = mode === 'A' ? ease.inOutCubic(prog(tk, 0.7, 1.0)) : 0
  const sMood = mode === 'A' ? (tk > 1.0 ? 'happy' : 'neutral') : 'neutral'
  hero(x, tk, { ...so, mood: sMood, look: [-1, 0], blush: mode === 'A' && tk > 1 ? 1 : 0 })
  const F = starFrame(so.x, so.y, so.s, tk, { seed: 3 })
  const drop = ease.outCubic(clamp(prog(tk, -0.3, 0.25)))
  inSprite(x, F, () => { hood(x, mode === 'A' ? 1 - off : clamp(prog(tk, -0.4, 0.2))); shades(x, lerp(4, 16.6, drop) - off * 14) })
  if (mode === 'A') { if (tk > 1.1) sweat(x, tk, so.x + 70, so.y - 70); pbubble(x, tk, 260, 200, 1.05, 99, 'honestly? I’ve been nervous\nall day. I like you.', { size: 26, tail: 0.6, col: '#c9f2d4' }); hearts(x, tk, 1.5, 150, 300, { n: 5, cell: 4 }) }
  else pbubble(x, tk, 300, 220, f[0] + 0.3, 99, 'eh. it’s whatever.', { size: 32, tail: 0.6 })
  void BONE
}
const EP = makeGreen({
  id: 'ksge20', sign: 'scorpio', name: 'Scorpio', win: 'A', ending: 'cut',
  hook: 'SCORPIO IS | *ACTING “CHILL.”*',
  premise: 'They’re clearly *nervous.*',
  takes: { A: { draw: (x, tk, S) => scene(x, tk, S, 'A') }, B: { draw: (x, tk, S) => scene(x, tk, S, 'B') } },
  last: 'They said *the nervous part* out loud.',
  cues: [['whoosh', 0.0, 0.3, 0.03], ['tick', 0.25, 0.07], ['whoosh', 0.7, 0.3, 0.025], ['pop', 1.05, 1174.66, 0.035, -0.4], ['glitter', 1.5, 1.8], ['pop', 2.35, 440, 0.035, 0.4]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
