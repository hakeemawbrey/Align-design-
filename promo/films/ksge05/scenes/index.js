// ksge05 · SPOT THE GREEN FLAG: "Leo Gets a Compliment" (trial reel, ≈ 9 s, pop · G). Format: ../../ksge01/scenes/greenkit.js.
//   frame 0  both takes: your "you look great!" bubble mid-flight, hitting Leo; sparkles bursting.
//   TAKE A   Leo pulls out a hand mirror: "I know."        TAKE B   Leo: "stop!! thank you. and that jacket on you?!"
//   freeze, 3-2-1, GREEN FLAG: Take B. THE STARS: "Took the compliment. *Passed one back.*"  Hard cut.
import { makeGreen, R, box, pbubble, hearts, sparkles, pop01, prog, clamp, lerp, ease, INK, BONE, GOLD, PINK } from '../../ksge01/scenes/greenkit.js'
import { street } from '../../ksge02/scenes/sets.js'

function mirror(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(-0.2)
  R(x, INK, -8, 30, 16, 70); R(x, GOLD, -4, 30, 8, 66)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 40, 48, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = GOLD; x.beginPath(); x.ellipse(0, 0, 34, 42, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#bfe8ff'; x.beginPath(); x.ellipse(0, 0, 26, 34, 0, 0, Math.PI * 2); x.fill(); R(x, '#ffffff', -14, -18, 8, 14)
  x.restore()
}
function jacket(x, tk, cx, cy, k) {
  // a little sparkle tag on your jacket after Leo notices it
  if (k <= 0.01) return
  sparkles(x, tk, cx, cy, 0, 0, 0, 0)
}
function scene(x, tk, S, mode) {
  const { hero, you } = S
  const f = S.focus[mode]
  street(x, tk)
  // the compliment, mid-flight at frame 0
  const fl = ease.outCubic(clamp(prog(tk, -0.35, 0.3)))
  pbubble(x, tk, lerp(150, 310, fl), lerp(330, 260, fl), -1, 0.9, 'you look great!', { size: 32, tail: -0.6, col: '#ffd98a' })
  sparkles(x, tk, 360, 330, 0.25, 10, 110, 1)
  you(x, tk, { x: 120, y: 470, s: 170, mood: mode === 'B' && tk > f[0] + 0.6 ? 'heart' : 'happy', look: [1, 0], hops: mode === 'B' ? [f[0] + 0.7] : [] })
  const lMood = mode === 'A' ? (tk < f[0] + 0.2 ? 'wide' : 'wink') : (tk < f[0] + 0.2 ? 'wide' : 'happy')
  hero(x, tk, { x: 370, y: 460, s: 206, mood: lMood, look: mode === 'A' && tk > f[0] + 0.3 ? [1, -0.4] : [-1, 0], blush: mode === 'B' ? 1 : undefined, hops: [0.32, f[0] + 0.25] })
  if (mode === 'A') {
    mirror(x, 260, 380, pop01(tk, f[0] + 0.25, 0.3, 2.4))
    pbubble(x, tk, 300, 200, f[0] + 0.45, 99, 'I know.', { size: 46, tail: 0.5 })
  } else {
    pbubble(x, tk, 270, 190, f[0] + 0.25, 99, 'stop!! thank you.\nand that jacket on you?!', { size: 30, tail: 0.6, col: '#c9f2d4' })
    sparkles(x, tk, 120, 480, f[0] + 0.7, 8, 90, 2, [GOLD, PINK, BONE])
    hearts(x, tk, f[0] + 0.75, 250, 400, { n: 5, cell: 5 })
  }
  void box; void jacket
}
const EP = makeGreen({
  id: 'ksge05', sign: 'leo', name: 'Leo', win: 'B', ending: 'cut',
  hook: 'YOU COMPLIMENTED | *A LEO.*',
  premise: 'You told them they look *great.*',
  takes: { A: { draw: (x, tk, S) => scene(x, tk, S, 'A') }, B: { draw: (x, tk, S) => scene(x, tk, S, 'B') } },
  last: 'Took the compliment. *Passed one back.*',
  cues: [['whoosh', 0.0, 0.3, 0.03], ['glitter', 0.25, 0.6], ['pop', 0.3, 1318.51, 0.04, 0], ['pluck', 0.6, 1567.98, 0.035, -0.4, 0.3], ['pop', 0.8, 659.25, 0.04, -0.4], ['pop', 2.3, 1174.66, 0.04, 0.4], ['glitter', 2.75, 3.1]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
