// ksge04 · SPOT THE GREEN FLAG: "Cancer, the Cancelled Plans" (trial reel, ≈ 9 s, dreamy · D). Format: ../../ksge01/scenes/greenkit.js.
//   frame 0  both takes: the FRI 7 PM calendar page mid-rip, a CANCELLED stamp mid-slam; you wiped out on the couch.
//   TAKE A   Cancer (in a little call bubble): "rest!! rain check. want soup dropped off?"  a soup bowl pops in.
//   TAKE B   Cancer: "wow. ok. fine."  you shrink under the blanket.
//   freeze, 3-2-1, GREEN FLAG: Take A. THE STARS: "Cancelled plans. *Zero guilt trip.*"  Loops back to frame 0.
import { makeGreen, R, box, pbubble, hearts, phone, pop01, prog, clamp, ease, INK, BONE, GOLD, PINK } from '../../ksge01/scenes/greenkit.js'
import { living, couch, calendarPage, stamp } from '../../ksge02/scenes/sets.js'

function soup(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -50, -20, 100, 44, '#f39a3a', { b: 5 }); R(x, '#f2d58a', -44, -20, 88, 10)
  for (let i = 0; i < 3; i++) R(x, BONE, -24 + i * 20, -52 - (i % 2) * 10, 6, 22)
  x.restore()
}
function callBubble(x, tk, S, mood, k) {
  if (k <= 0.01) return
  x.save(); x.translate(392, 300); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 92, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#2e2656'; x.beginPath(); x.arc(0, 0, 84, 0, Math.PI * 2); x.fill()
  x.save(); x.beginPath(); x.arc(0, 0, 84, 0, Math.PI * 2); x.clip()
  S.hero(x, tk, { x: 0, y: 20, s: 150, mood, look: [-1, 0.3] })
  x.restore(); x.restore()
}
function scene(x, tk, S, mode) {
  const { you } = S
  const f = S.focus[mode]
  living(x, { lamp: true })
  // the calendar page rips at frame 0, the stamp slams
  calendarPage(x, 250, 175, { rot: -0.05, rip: clamp(prog(tk, -0.3, 0.4)), text: 'FRI', sub: '7 PM' })
  stamp(x, 'CANCELLED', 250, 185, clamp(prog(tk, -0.12, 0.2)), { rot: -0.22, size: 36 })
  couch(x, 200, 560, 300)
  const sink = mode === 'B' ? ease.outCubic(prog(tk, f[0] + 0.5, f[0] + 0.9)) : 0
  you(x, tk, { x: 140, y: 420 + 40 * sink, s: 170, mood: mode === 'A' && tk > f[0] + 0.6 ? 'happy' : mode === 'B' && tk > f[0] + 0.4 ? 'wide' : 'sleepy', look: [1, -0.5], zzz: false })
  // the blanket
  box(x, 60, 500 + 20 * sink, 220, 60, PINK, { b: 6, hi: '#ffb3c9' })
  phone(x, 270, 500, { w: 56, h: 96, rot: 0.3, glow: 0.6 })
  const ck = pop01(tk, f[0] + 0.1, 0.3, 2.2)
  callBubble(x, tk, S, mode === 'A' ? 'happy' : 'eyeroll', ck)
  if (mode === 'A') {
    pbubble(x, tk, 260, 440, f[0] + 0.3, 99, 'rest!! rain check.\nwant soup dropped off?', { size: 28, tail: 0.6, tailUp: true, col: '#c9f2d4' })
    soup(x, 380, 560, pop01(tk, f[0] + 1.0, 0.3, 2.4))
    hearts(x, tk, f[0] + 1.05, 380, 500, { n: 4, cell: 4 })
  } else {
    pbubble(x, tk, 300, 440, f[0] + 0.3, 99, 'wow. ok. fine.', { size: 34, tail: 0.6, tailUp: true })
  }
  void GOLD
}
const EP = makeGreen({
  id: 'ksge04', sign: 'cancer', name: 'Cancer', win: 'A', ending: 'loop',
  hook: 'YOU CANCELLED. | *THEY REPLIED.*',
  premise: 'You cancelled because you’re *wiped.*',
  takes: { A: { draw: (x, tk, S) => scene(x, tk, S, 'A') }, B: { draw: (x, tk, S) => scene(x, tk, S, 'B') } },
  last: 'Cancelled plans. *Zero guilt trip.*',
  cues: [['tick', 0.02, 0.06], ['boom', 0.03, 0.12], ['whoosh', 0.02, 0.3, 0.03], ['pop', 0.45, 987.77, 0.03, 0.3], ['pop', 0.65, 1318.51, 0.03, 0.3], ['pop', 1.35, 1567.98, 0.035, -0.3], ['pop', 2.2, 987.77, 0.03, 0.3], ['pop', 2.4, 523.25, 0.035, 0.3]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
