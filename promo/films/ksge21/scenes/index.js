// ksge21 · SPOT THE GREEN FLAG: "Sagittarius and Your Errands" (trial reel, ≈ 10 s, funk · E). Format: ../../ksge01/scenes/greenkit.js.
//   frame 0  both takes: Sagittarius mid-tumble with your giant parcel, your to-do list unrolling.
//   TAKE A   "ugh, errands? text me after" … and off they go. You, the parcel and the list.
//   TAKE B   "I'm coming. it's a mission now."  snacks, a tiny map, the list starts getting ticks.
//   freeze, 3-2-1, GREEN FLAG: Take B. THE STARS: "They made *the errands* a date."  Loops back to frame 0.
import { makeGreen, R, box, pbubble, hearts, prog, clamp, lerp, ease, INK, BONE, GOLD, GREEN, RED, INTER } from '../../ksge01/scenes/greenkit.js'
import { street } from '../../ksge02/scenes/sets.js'

const TODO = ['post office', 'groceries', 'return jacket', 'pick up keys']
function list(x, tk, len, ticks) {
  x.save(); x.translate(60, 110)
  R(x, INK, -4, -4, 168, len + 8); R(x, '#f4f1ea', 0, 0, 160, len)
  x.font = `700 17px ${INTER}`; x.fillStyle = INK; x.textAlign = 'left'; x.textBaseline = 'middle'
  TODO.forEach((s, i) => { const y = 22 + i * 30; if (y > len - 10) return; R(x, INK, 10, y - 7, 14, 14); R(x, '#fff', 12, y - 5, 10, 10); if (i < ticks) { R(x, GREEN, 12, y - 5, 10, 10) } x.fillStyle = INK; x.fillText(s, 32, y) })
  x.restore()
}
function parcel(x, cx, cy, rot) { x.save(); x.translate(cx, cy); x.rotate(rot); box(x, -60, -45, 120, 90, '#c9a070', { b: 6 }); R(x, '#a07850', -60, -6, 120, 12); R(x, '#a07850', -6, -45, 12, 90); x.restore() }
function scene(x, tk, S, mode) {
  const { hero, you } = S
  const f = S.focus[mode]
  street(x, tk, { day: true })
  const unroll = ease.outCubic(clamp(prog(tk, -0.3, 0.6)))
  const ticks = mode === 'B' ? Math.min(4, Math.max(0, Math.floor((tk - f[0] - 0.6) / 0.25))) : 0
  list(x, tk, lerp(30, 140, unroll), ticks)
  you(x, tk, { x: 120, y: 470, s: 160, mood: mode === 'A' ? (tk > 1.4 ? 'wide' : 'neutral') : (tk > f[0] + 0.5 ? 'happy' : 'neutral'), look: [1, 0], hops: mode === 'B' ? [f[0] + 0.6] : [] })
  // Sagittarius tumbling with the parcel at frame 0
  const tum = clamp(prog(tk, -0.4, 0.4)), spin = (1 - ease.outCubic(tum)) * 2.2
  let sx = lerp(420, 360, tum)
  if (mode === 'A') sx = lerp(sx, 640, ease.inCubic(prog(tk, 1.2, 1.8)))
  parcel(x, mode === 'A' && tk > 0.9 ? 230 : sx - 20, mode === 'A' && tk > 0.9 ? 540 : 360 - 40 * Math.sin(Math.PI * tum), mode === 'A' && tk > 0.9 ? 0 : spin)
  x.save(); x.translate(sx, 460); x.rotate(spin); x.translate(-sx, -460)
  hero(x, tk, { x: sx, y: 460, s: 180, mood: tk < 0.4 ? 'wide' : mode === 'A' ? 'eyeroll' : 'sparkle', look: mode === 'A' && tk > 1.1 ? [1, 0] : [-1, 0] })
  x.restore()
  if (mode === 'A') pbubble(x, tk, 310, 290, 0.7, 99, 'ugh, errands?\ntext me after', { size: 30, tail: 0.5 })
  else {
    pbubble(x, tk, 300, 290, f[0] + 0.25, 99, 'I’m coming.\nit’s a mission now.', { size: 30, tail: 0.5, col: '#c9f2d4' })
    if (tk > f[0] + 0.5) { box(x, 410, 520, 50, 40, RED, { b: 4 }); box(x, 300, 540, 70, 46, BONE, { b: 4 }); R(x, '#9fe6b0', 310, 548, 24, 20) }
    hearts(x, tk, f[0] + 0.8, 120, 480, { n: 4, cell: 4 })
  }
  void GOLD
}
const EP = makeGreen({
  id: 'ksge21', sign: 'sagittarius', name: 'Sagittarius', win: 'B', ending: 'loop', you: '#8fd8f6',
  hook: 'YOU HAVE ERRANDS. | *SAG HAS OPINIONS.*',
  premise: 'You have errands *all Saturday.*',
  takes: { A: { draw: (x, tk, S) => scene(x, tk, S, 'A') }, B: { draw: (x, tk, S) => scene(x, tk, S, 'B') } },
  last: 'They made *the errands* a date.',
  cues: [['whoosh', 0.0, 0.4, 0.035], ['tom', 0.4, 90, { gain: 0.14, decay: 0.15 }], ['pop', 0.7, 523.25, 0.035, -0.4], ['whoosh', 1.2, 0.5, 0.025], ['pop', 2.3, 1318.51, 0.04, 0.4], ['tick', 2.65, 0.04], ['tick', 2.9, 0.04], ['tick', 3.15, 0.04], ['tick', 3.4, 0.04]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
