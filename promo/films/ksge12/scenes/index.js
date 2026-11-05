// ksge12 · SPOT THE GREEN FLAG: "Pisces, You Cried First" (trial reel, ≈ 9 s, dreamy · Ab). Format: ../../ksge01/scenes/greenkit.js.
//   frame 0  both takes: a giant tear mid-fall in slow motion off your face, tissues flying; a sad puppy ad on the screen.
//   TAKE A   Pisces hands you a tissue and cries too: "here. (sniff) me too."
//   TAKE B   Pisces laughs: "wait, are you CRYING?" HA HA.
//   freeze, 3-2-1, GREEN FLAG: Take A. THE STARS: "Cried with you, *not at you.*"  Loops back to frame 0.
import { makeGreen, R, box, pbubble, hearts, drawBits, tissues, starFrame, inSprite, tearsCells, label, prog, clamp, lerp, ease, INK, BONE, GOLD, PINK } from '../../ksge01/scenes/greenkit.js'
import { living, couch, balloonText } from '../../ksge02/scenes/sets.js'

function tvPuppy(x, tk) {
  box(x, 150, 110, 210, 130, '#2a3b5c', { b: 7 }); R(x, INK, 245, 246, 20, 30)
  drawBits(x, ['.BB..BB.', 'BBBBBBBB', 'BWBBBBWB', 'BBBBBBBB', '.BBPPBB.', '..BBBB..'], { B: '#c9a070', W: INK, P: PINK }, 255, 175 + 3 * Math.sin(tk * 3), 10)
  label(x, 'adopt me', 255, 228, { size: 16, col: BONE })
}
function bigTear(x, tk) {
  const p = clamp(prog(tk, -0.6, 0.7))
  if (p >= 1) return
  drawBits(x, ['..T..', '.TTT.', 'TTTTT', 'TTWTT', '.TTT.'], { T: '#8fe3ff', W: '#ffffff' }, 150, lerp(330, 560, ease.inQuad(p)), 14, { alpha: 1 - p * 0.4 })
}
function flyingTissues(x, tk) {
  const p = clamp(prog(tk, -0.4, 0.9))
  if (p >= 1) return
  for (let i = 0; i < 4; i++) { const a = -1.2 + i * 0.8; R(x, '#ffffff', 250 + Math.cos(a) * 200 * p, 420 - Math.sin(a + 0.4) * 180 * p + 200 * p * p, 30, 22); R(x, INK, 250 + Math.cos(a) * 200 * p, 420 - Math.sin(a + 0.4) * 180 * p + 200 * p * p + 22, 30, 4) }
}
function scene(x, tk, S, mode) {
  const { hero, you } = S
  const f = S.focus[mode]
  living(x, { lamp: true })
  tvPuppy(x, tk)
  couch(x, 250, 560, 380)
  tissues(x, 250, 520, 60)
  // you, teary
  const yo = { x: 140, y: 450, s: 165, seed: 9 }
  you(x, tk, { ...yo, mood: mode === 'A' && tk > 1.4 ? 'happy' : 'wide', look: [0, 0.4] })
  inSprite(x, starFrame(yo.x, yo.y, yo.s, tk, { seed: 9 }), () => tearsCells(x, tk, mode === 'B' && tk > f[0] + 0.5 ? 2 : 1))
  bigTear(x, tk)
  // Pisces
  const po = { x: 370, y: 440, s: 190, seed: 3 }
  const pMood = mode === 'A' ? (tk > 0.8 ? 'sparkle' : 'wide') : (tk > f[0] + 0.2 ? 'happy' : 'wide')
  hero(x, tk, { ...po, mood: pMood, look: [-1, 0], hops: mode === 'B' ? [f[0] + 0.3, f[0] + 0.7, f[0] + 1.1] : [0.9] })
  if (mode === 'A') inSprite(x, starFrame(po.x, po.y, po.s, tk, { seed: 3, hops: [0.9] }), () => tearsCells(x, tk, tk > 1.0 ? 3 : 2))
  flyingTissues(x, tk)
  if (mode === 'A') {
    // the tissue, handed over
    const h = ease.inOutCubic(prog(tk, 0.8, 1.2)); R(x, '#ffffff', lerp(320, 220, h), 420, 34, 26)
    pbubble(x, tk, 300, 330, 1.0, 99, 'here. (sniff)\nme too.', { size: 30, tail: 0.5, col: '#c9f2d4' })
    hearts(x, tk, 1.5, 250, 470, { n: 4, cell: 4 })
  } else {
    pbubble(x, tk, 290, 330, f[0] + 0.25, 99, 'wait, are you\nCRYING?', { size: 32, tail: 0.5 })
    if (tk > f[0] + 0.6) balloonText(x, 'HA HA', 410, 300 + 6 * Math.sin(tk * 20), { size: 30, col: GOLD, rot: 0.1 })
  }
}
const EP = makeGreen({
  id: 'ksge12', sign: 'pisces', name: 'Pisces', win: 'A', ending: 'loop', you: '#9fe6b0',
  hook: 'YOU CRIED ON | *THE SECOND DATE.*',
  premise: 'You teared up at a *sad ad.*',
  takes: { A: { draw: (x, tk, S) => scene(x, tk, S, 'A') }, B: { draw: (x, tk, S) => scene(x, tk, S, 'B') } },
  last: 'Cried with you, *not at you.*',
  cues: [['pluck', 0.05, 1567.98, 0.03, 0, 0.6], ['whoosh', 0.0, 0.5, 0.03], ['pop', 1.0, 1174.66, 0.035, -0.4], ['pop', 2.3, 659.25, 0.035, 0.4], ['pop', 2.65, 880, 0.03, 0.4], ['pop', 2.95, 880, 0.03, 0.4]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
