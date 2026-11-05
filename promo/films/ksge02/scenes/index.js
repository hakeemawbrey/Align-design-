// ksge02 · SPOT THE GREEN FLAG: "Taurus Tries Your Favourite" (trial reel, ≈ 10 s, lofi · F). Format: ../../ksge01/scenes/greenkit.js.
//   frame 0  both takes: your spoon mid-air toward Taurus, steam rising. Slam title "THEY TRIED YOUR | *FAVOURITE* FOOD."
//   TAKE A   Taurus tastes: "mm!! okay, teach me how you make this"  hearts.
//   TAKE B   Taurus leans away, slides the plate back: "I'll just get a sandwich."
//   freeze, 3-2-1, GREEN FLAG: Take A. THE STARS: "Curious about your thing? *Keep them.*"  Loops back to frame 0.
import { makeGreen, R, pbubble, hearts, table, pop01, prog, clamp, lerp, ease, INK, BONE } from '../../ksge01/scenes/greenkit.js'
import { kitchen, plate } from './sets.js'

function spoon(x, X, Y, rot = 0, full = true) {
  x.save(); x.translate(X, Y); x.rotate(rot)
  R(x, INK, -60, -6, 70, 12); R(x, '#cfc8e8', -58, -3, 66, 6)
  R(x, INK, 6, -16, 36, 30); R(x, '#cfc8e8', 9, -12, 30, 22); if (full) R(x, '#e9b24a', 12, -10, 24, 14)
  x.restore()
}
function steam(x, t, cx, cy) { for (let i = 0; i < 3; i++) { const ph = (t * 0.9 + i / 3) % 1; x.save(); x.globalAlpha *= 0.7 * (1 - ph); R(x, BONE, cx - 12 + i * 12 + 6 * Math.sin(ph * 6 + i), cy - 20 - ph * 60, 6, 14); x.restore() } }

function scene(x, tk, S, mode) {
  const { hero, you } = S
  kitchen(x)
  table(x, 250, 470, 360)
  const f = S.focus[S.side]
  const reach = mode === 'A' ? ease.inOutCubic(prog(tk, 0.1, 0.85)) : ease.inOutCubic(prog(tk, -0.4, 0.2)) * (1 - ease.inOutCubic(prog(tk, f[0] + 0.3, f[0] + 0.7)) * 0.6)
  you(x, tk, { x: 110, y: 410, s: 176, mood: mode === 'A' ? (tk > 1.2 ? 'happy' : 'neutral') : (tk > f[0] + 0.5 ? 'wide' : 'neutral'), look: [1, 0] })
  // the plate on the table; in B Taurus slides it back toward you
  const slide = mode === 'B' ? ease.outCubic(prog(tk, f[0] + 0.45, f[0] + 0.8)) : 0
  plate(x, lerp(235, 150, slide), 456, { food: '#e9b24a', steam: 1, t: tk })
  // the spoon: mid-air at frame 0
  const sx = lerp(220, 290, reach), sy = lerp(330, 300, reach) - 14 * Math.sin(Math.PI * reach)
  spoon(x, sx, sy, -0.15 + 0.1 * reach, !(mode === 'A' && tk > 0.95))
  steam(x, tk, sx + 24, sy - 10)
  const tMood = mode === 'A' ? (tk < 0.9 ? 'neutral' : tk < 1.15 ? 'wide' : 'heart') : (tk < f[0] + 0.2 ? 'neutral' : 'eyeroll')
  const lean = mode === 'B' ? 30 * ease.outCubic(prog(tk, f[0] + 0.15, f[0] + 0.45)) : 0
  hero(x, tk, { x: 380 + lean, y: 400, s: 206, mood: tMood, look: mode === 'B' && tk > f[0] + 0.2 ? [1, -0.5] : [-1, 0], hops: mode === 'A' ? [1.15] : [], squash: mode === 'A' && tk > 0.9 && tk < 1.1 ? 0.06 : 0 })
  if (mode === 'A') {
    pbubble(x, tk, 300, 180, 1.2, 99, 'mm!! okay, teach me\nhow you make this', { size: 30, tail: 0.5 })
    hearts(x, tk, 1.25, 380, 300, { n: 6, cell: 5 })
  } else {
    pbubble(x, tk, 300, 180, f[0] + 0.3, 99, 'I’ll just get\na sandwich.', { size: 32, tail: 0.5 })
  }
  void clamp; void pop01
}

const EP = makeGreen({
  id: 'ksge02', sign: 'taurus', name: 'Taurus', win: 'A', ending: 'loop',
  hook: 'THEY TRIED YOUR | *FAVOURITE* FOOD.',
  premise: 'You made them your *favourite* dish.',
  takes: { A: { draw: (x, tk, S) => scene(x, tk, S, 'A') }, B: { draw: (x, tk, S) => scene(x, tk, S, 'B') } },
  last: 'Curious about your thing? *Keep them.*',
  cues: [['pop', 0.95, 880, 0.03, -0.4], ['pluck', 1.2, 1318.51, 0.035, -0.4, 0.3], ['glitter', 1.25, 1.6], ['whoosh', 2.5, 0.3, 0.03], ['pop', 2.38, 659.25, 0.035, 0.4]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
