// ksge11 · SPOT THE GREEN FLAG: "Aquarius Disagrees" (trial reel, ≈ 10 s, synthwave · F#). Format: ../../ksge01/scenes/greenkit.js.
//   frame 0  both takes: your "LOVED IT!" and their "NOPE." bubbles mid-collision, pixels scattering; THE END on the screen.
//   TAKE A   "objectively? no." "and ALSO—" "and ANOTHER thing—"  you: "…okay."
//   TAKE B   "I saw it differently! tell me what you loved?"  you light up.
//   freeze, 3-2-1, GREEN FLAG: Take B. THE STARS: "Disagreed. *Still curious.*"  Hard cut.
import { makeGreen, R, box, pbubble, hearts, sparkles, prog, clamp, lerp, ease, INK, BONE, GOLD, INTER } from '../../ksge01/scenes/greenkit.js'
import { living, couch } from '../../ksge02/scenes/sets.js'

function screenTV(x) {
  box(x, 150, 110, 210, 130, '#14102a', { b: 7 }); x.font = `italic 600 34px 'EB Garamond', serif`; x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('The End', 255, 176)
  R(x, INK, 245, 246, 20, 30)
}
function clash(x, tk) {
  const k = clamp(prog(tk, -0.4, 0.2)), done = clamp(prog(tk, 0.25, 0.6))
  if (done >= 1) return
  const a = 1 - done
  x.save(); x.globalAlpha *= a
  pbubble(x, 9, lerp(60, 200, ease.inCubic(k)), 330, 0, 99, 'LOVED IT!', { size: 30, col: '#ffd98a' })
  pbubble(x, 9, lerp(440, 320, ease.inCubic(k)), 330, 0, 99, 'NOPE.', { size: 30 })
  if (k >= 1) for (let i = 0; i < 12; i++) { const ang = i / 12 * Math.PI * 2, r = 30 + 160 * done; R(x, [GOLD, BONE, '#7fd0f0'][i % 3], 260 + Math.cos(ang) * r, 330 + Math.sin(ang) * r, 10, 10) }
  x.restore()
}
function scene(x, tk, S, mode) {
  const { hero, you } = S
  const f = S.focus[mode]
  living(x, { lamp: false })
  screenTV(x)
  couch(x, 250, 560, 380)
  const shrink = mode === 'A' ? ease.outCubic(prog(tk, 1.5, 1.8)) : 0
  you(x, tk, { x: 130, y: 450 + 20 * shrink, s: 165 * (1 - 0.15 * shrink), mood: mode === 'A' ? (tk > 1.5 ? 'wide' : 'happy') : (tk > f[0] + 0.5 ? 'sparkle' : 'happy'), look: [1, 0], hops: mode === 'B' ? [f[0] + 0.6] : [] })
  hero(x, tk, { x: 380, y: 440, s: 190, mood: mode === 'A' ? (tk > 0.6 ? 'eyeroll' : 'wide') : (tk > f[0] + 0.2 ? 'happy' : 'wide'), look: [-1, 0], hops: mode === 'A' ? [0.7, 1.05, 1.4] : [] })
  clash(x, tk)
  if (mode === 'A') {
    pbubble(x, tk, 330, 120, 0.65, 99, 'objectively? no.', { size: 30, tail: 0.4 })
    pbubble(x, tk, 340, 200, 1.0, 99, 'and ALSO—', { size: 28, tail: 0.4 })
    pbubble(x, tk, 330, 280, 1.3, 99, 'and ANOTHER thing—', { size: 26, tail: 0.4 })
    pbubble(x, tk, 120, 330, 1.7, 99, '…okay.', { size: 26, tail: 0 })
  } else {
    pbubble(x, tk, 270, 170, f[0] + 0.25, 99, 'I saw it differently!\ntell me what you loved?', { size: 28, tail: 0.6, col: '#c9f2d4' })
    sparkles(x, tk, 130, 420, f[0] + 0.6, 8, 90, 1)
    hearts(x, tk, f[0] + 0.7, 250, 380, { n: 4, cell: 4 })
  }
  void INTER
}
const EP = makeGreen({
  id: 'ksge11', sign: 'aquarius', name: 'Aquarius', win: 'B', ending: 'cut',
  hook: 'YOU DISAGREED | *WITH AN AQUARIUS.*',
  premise: 'You loved the film. *They didn’t.*',
  takes: { A: { draw: (x, tk, S) => scene(x, tk, S, 'A') }, B: { draw: (x, tk, S) => scene(x, tk, S, 'B') } },
  last: 'Disagreed. *Still curious.*',
  cues: [['boom', 0.2, 0.14], ['glitter', 0.22, 0.5], ['pop', 0.65, 659.25, 0.035, -0.4], ['pop', 1.0, 698.46, 0.035, -0.4], ['pop', 1.3, 739.99, 0.035, -0.4], ['pop', 1.7, 440, 0.03, -0.3], ['pop', 2.3, 1318.51, 0.04, 0.4], ['glitter', 2.65, 3.0]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
