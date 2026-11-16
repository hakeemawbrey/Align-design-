// og-ksge08: the social rework of ksge08 ("Scorpio, About Your Ex"), star_advice. Same set, cast and story; static HOOK
// (outline) from frame 0 instead of the slam title, no series bug, a more extreme Scorpio. Kit: ./greenkit.js (og social copy of ../../ksge01/scenes/greenkit.js).
// Original notes:
// ksge08 · SPOT THE GREEN FLAG: "Scorpio, About Your Ex" (trial reel, ≈ 10 s, synthwave · C#). Format: ../../ksge01/scenes/greenkit.js.
//   frame 0  both takes: a giant "?" mid-slam onto the table between you and Scorpio, everything shaking.
//   TAKE A   Scorpio: "we wanted different things. I learned a lot."   TAKE B   "ugh. they were the WORST." (a little storm cloud)
//   freeze, 3-2-1, GREEN FLAG: Take A. THE STARS: "Kind about the ex. *Kind to you.*"  Hard cut.
import { makeGreen, R, pbubble, hearts, drawBits, table, prog, clamp, lerp, ease, INK, BONE, GOLD } from './greenkit.js'
import { cafe, cup } from '../../ksge02/scenes/sets.js'

const Q = ['.QQQQ.', 'QQ..QQ', '....QQ', '...QQ.', '..QQ..', '..QQ..', '......', '..QQ..']
function cloud(x, tk, cx, cy, k) {
  if (k <= 0.01) return
  drawBits(x, ['..CCC...', '.CCCCCC.', 'CCCCCCCC', '.CCCCCC.'], { C: '#6a6488' }, cx, cy, 12 * k)
  for (let i = 0; i < 3; i++) { const ph = (tk * 2 + i / 3) % 1; R(x, '#8fe3ff', cx - 30 + i * 30, cy + 30 + ph * 50, 5, 12) }
}
function scene(x, tk, S, mode) {
  const { hero, you } = S
  const f = S.focus[mode]
  cafe(x)
  table(x, 250, 470, 300)
  cup(x, 180, 440); cup(x, 320, 440, { col: '#c9a6ff' })
  // the question slams down at frame 0
  const d = ease.inCubic(clamp(prog(tk, -0.3, 0.12))), shake = tk > 0.12 && tk < 0.5 ? 8 * Math.sin(tk * 70) * (0.5 - tk) * 2 : 0
  const qk = 1 - clamp(prog(tk, 0.9, 1.1))
  if (qk > 0) drawBits(x, Q, { Q: GOLD }, 250 + shake, lerp(-100, 280, d), 24 * qk)
  you(x, tk, { x: 100, y: 410 + shake, s: 170, mood: mode === 'A' ? (tk > f[0] + 0.8 ? 'happy' : 'neutral') : (tk > f[0] + 0.5 ? 'wide' : 'neutral'), look: [1, 0] })
  const sMood = tk < 0.4 ? 'wide' : mode === 'A' ? (tk > f[0] + 0.4 ? 'happy' : 'neutral') : (tk > f[0] + 0.2 ? 'eyeroll' : 'neutral')
  hero(x, tk, { x: 400, y: 410 - shake, s: 200, mood: sMood, look: [-1, 0] })
  if (mode === 'A') { pbubble(x, tk, 260, 170, 0.95, 99, 'we wanted different things.\nI hope they are THRIVING.', { size: 28, tail: 0.6, col: '#c9f2d4' }); hearts(x, tk, 1.6, 120, 300, { n: 3, cell: 4 }) }
  else { pbubble(x, tk, 280, 170, f[0] + 0.3, 99, 'they are DEAD to me.\nlike, ceremonially.', { size: 34, tail: 0.6 }); cloud(x, tk, 400, 260, clamp(prog(tk, f[0] + 0.5, f[0] + 0.8))) }
  void BONE; void INK
}
const EP = makeGreen({
  id: 'og-ksge08', sign: 'scorpio', name: 'Scorpio', win: 'A', ending: 'cut',
  hook: '',   // og social: the static HOOK below replaces the slam title
  premise: 'You asked about their *ex.*',
  takes: { A: { draw: (x, tk, S) => scene(x, tk, S, 'A') }, B: { draw: (x, tk, S) => scene(x, tk, S, 'B') } },
  last: 'Kind about the ex. *Kind to you.*',
  cues: [['boom', 0.12, 0.2], ['tom', 0.12, 80, { gain: 0.2, decay: 0.25 }], ['pop', 0.95, 987.77, 0.035, -0.4], ['pop', 2.35, 523.25, 0.035, 0.4], ['whoosh', 2.55, 0.3, 0.02]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES

// social hook: static caption from frame 0 (the kit's animated slam title is removed in ./greenkit.js)
export const HOOK = 'Ask a Scorpio | about their *ex.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 3.4
