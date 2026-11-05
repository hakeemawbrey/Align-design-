// ksge18 · SPOT THE GREEN FLAG: "Virgo, the Coffee Spill" (trial reel, ≈ 9 s, chiptune · C). Format: ../../ksge01/scenes/greenkit.js.
//   frame 0  both takes: your coffee cup mid-air, the splash frozen over the table.
//   TAKE A   Virgo calmly tips their own cup over themselves: "now we match."  both laugh.
//   TAKE B   a napkin and a lecture: "you should really get a lid."
//   freeze, 3-2-1, GREEN FLAG: Take A. THE STARS: "They spilled theirs *so you weren't alone.*"  Loops back to frame 0.
import { makeGreen, R, box, pbubble, hearts, drawBits, table, prog, clamp, lerp, ease, INK, BONE } from '../../ksge01/scenes/greenkit.js'
import { cafe, cup, splash } from '../../ksge02/scenes/sets.js'

function stain(x, cx, cy, k) { if (k <= 0.01) return; drawBits(x, ['.SSS.', 'SSSSS', '.SS.S'], { S: '#8a5a34' }, cx, cy, 9 * k, { outline: null, alpha: 0.85 }) }
function scene(x, tk, S, mode) {
  const { hero, you } = S
  const f = S.focus[mode]
  cafe(x)
  table(x, 250, 470, 300)
  you(x, tk, { x: 100, y: 410, s: 165, mood: mode === 'A' ? (tk > 1.2 ? 'happy' : 'wide') : (tk > f[0] + 0.5 ? 'eyeroll' : 'wide'), look: [1, 0] })
  stain(x, 100, 450, clamp(prog(tk, 0.1, 0.3)))
  // your cup: mid-air at frame 0, tumbling onto the table
  const c = clamp(prog(tk, -0.4, 0.3))
  cup(x, lerp(160, 210, c), lerp(330, 450, ease.inQuad(c)), { rot: lerp(1.2, 2.4, c) })
  splash(x, 180, 400, c < 1 ? 0.6 + 0.4 * c : Math.max(0, 1 - (tk - 0.3) * 2))
  const vMood = mode === 'A' ? (tk > 1.1 ? 'happy' : 'neutral') : 'neutral'
  hero(x, tk, { x: 400, y: 410, s: 195, mood: vMood, look: [-1, 0], hops: mode === 'A' ? [1.15] : [] })
  if (mode === 'A') {
    const tip = ease.inOutCubic(prog(tk, 0.6, 0.9))
    cup(x, lerp(330, 420, tip), lerp(440, 300, tip), { col: '#c9a6ff', rot: lerp(0, 2.2, tip) })
    if (tk > 0.9) { splash(x, 410, 360, clamp(prog(tk, 0.9, 1.2)) * (1 - clamp(prog(tk, 1.3, 1.6)))); stain(x, 400, 450, clamp(prog(tk, 0.95, 1.15))) }
    pbubble(x, tk, 300, 220, 1.1, 99, 'now we match.', { size: 34, tail: 0.6, col: '#c9f2d4' })
    hearts(x, tk, 1.4, 250, 360, { n: 5, cell: 4 })
  } else {
    cup(x, 330, 440, { col: '#c9a6ff' })
    const nap = ease.outCubic(prog(tk, f[0] + 0.1, f[0] + 0.4)); box(x, lerp(330, 200, nap), 430, 50, 30, '#ffffff', { b: 4 })
    pbubble(x, tk, 300, 220, f[0] + 0.35, 99, 'you should really\nget a lid.', { size: 32, tail: 0.6 })
  }
  void R; void BONE; void INK
}
const EP = makeGreen({
  id: 'ksge18', sign: 'virgo', name: 'Virgo', win: 'A', ending: 'loop',
  hook: 'YOU SPILLED COFFEE | *ON DATE ONE.*',
  premise: 'You spilled coffee *on yourself.*',
  takes: { A: { draw: (x, tk, S) => scene(x, tk, S, 'A') }, B: { draw: (x, tk, S) => scene(x, tk, S, 'B') } },
  last: 'They spilled theirs *so you weren’t alone.*',
  cues: [['whoosh', 0.0, 0.3, 0.03], ['tick', 0.3, 0.07], ['pop', 0.32, 392, 0.04, -0.2], ['whoosh', 0.6, 0.3, 0.025], ['pop', 0.95, 392, 0.04, 0.2], ['pop', 1.1, 1318.51, 0.035, -0.4], ['glitter', 1.4, 1.7], ['pop', 2.4, 523.25, 0.035, 0.4]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
