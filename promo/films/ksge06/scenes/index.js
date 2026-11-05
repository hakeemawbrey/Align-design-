// ksge06 · SPOT THE GREEN FLAG: "Virgo, Lost Together" (trial reel, ≈ 10 s, chiptune · B). Format: ../../ksge01/scenes/greenkit.js.
//   frame 0  both takes: a paper map mid-flip in the wind, Virgo mid-spin.
//   TAKE A   Virgo: "ooh, a detour. is that a bakery?"  a BAKERY sign pops.     TAKE B   Virgo sighs: "I said LEFT."
//   freeze, 3-2-1, GREEN FLAG: Take A. THE STARS: "Wrong turn. *No 'I told you so.'*"  Hard cut.
import { makeGreen, R, box, pbubble, hearts, pop01, prog, clamp, lerp, ease, INK, BONE, GOLD, RED, GREEN, INTER } from '../../ksge01/scenes/greenkit.js'
import { street } from '../../ksge02/scenes/sets.js'

function map(x, cx, cy, rot, k = 1) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k * (0.7 + 0.3 * Math.cos(rot * 2)))
  box(x, -80, -56, 160, 112, BONE, { b: 5 })
  for (let i = 1; i < 4; i++) R(x, '#c9bfa9', -80 + i * 40, -56, 3, 112)
  R(x, '#9fd8f6', -80, 10, 160, 10); R(x, '#9fe6b0', -50, -40, 40, 30)
  x.strokeStyle = RED; x.lineWidth = 4; x.setLineDash([8, 6]); x.beginPath(); x.moveTo(-60, 40); x.lineTo(-10, -10); x.lineTo(50, 30); x.stroke(); x.setLineDash([])
  x.restore()
}
function bakery(x, k) {
  if (k <= 0.01) return
  x.save(); x.translate(380, 250); x.scale(k, k)
  box(x, -90, -40, 180, 80, '#f39a3a', { b: 6 }); x.font = `800 32px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('BAKERY', 0, 2)
  R(x, INK, -6, 40, 12, 60)
  x.restore()
}
function scene(x, tk, S, mode) {
  const { hero, you } = S
  const f = S.focus[mode]
  street(x, tk, { day: true })
  if (mode === 'A') bakery(x, pop01(tk, 1.05, 0.3, 2.4))
  // the map flies in on the wind at frame 0, lands in your hands
  const m = ease.outCubic(clamp(prog(tk, -0.4, 0.75)))
  map(x, lerp(420, 150, m), lerp(160, 360, m), lerp(2.4, -0.1, m), lerp(0.8, 1, m))
  you(x, tk, { x: 130, y: 470, s: 170, mood: mode === 'A' ? (tk > 1.1 ? 'happy' : 'wide') : (tk > f[0] + 0.4 ? 'wide' : 'neutral'), look: [1, -0.3], hops: mode === 'A' ? [1.2] : [] })
  const spin = (1 - ease.outCubic(clamp(prog(tk, -0.2, 0.5)))) * 0.5
  const vMood = mode === 'A' ? (tk < 0.9 ? 'wide' : 'sparkle') : (tk < f[0] + 0.2 ? 'neutral' : 'eyeroll')
  x.save(); x.translate(370, 460); x.rotate(spin); x.translate(-370, -460)
  hero(x, tk, { x: 370, y: 460, s: 200, mood: vMood, look: mode === 'A' && tk > 0.9 ? [1, -1] : [-1, 0] })
  x.restore()
  if (mode === 'A') { pbubble(x, tk, 260, 130, 0.95, 99, 'ooh, a detour.\nis that a bakery?', { size: 30, tail: 0.6, col: '#c9f2d4' }); hearts(x, tk, 1.3, 380, 330, { n: 4, cell: 4 }) }
  else pbubble(x, tk, 300, 160, f[0] + 0.3, 99, '*sigh* I said LEFT.', { size: 32, tail: 0.5 })
  void GOLD; void GREEN
}
const EP = makeGreen({
  id: 'ksge06', sign: 'virgo', name: 'Virgo', win: 'A', ending: 'cut',
  hook: 'YOU GOT | *BOTH OF YOU LOST.*',
  premise: 'You picked the *wrong turn.*',
  takes: { A: { draw: (x, tk, S) => scene(x, tk, S, 'A') }, B: { draw: (x, tk, S) => scene(x, tk, S, 'B') } },
  last: 'Wrong turn. *No "I told you so."*',
  cues: [['whoosh', 0.0, 0.5, 0.035], ['tick', 0.75, 0.05], ['pop', 1.0, 1318.51, 0.04, -0.4], ['pop', 1.08, 1760, 0.03, -0.4], ['pop', 2.35, 440, 0.04, 0.4]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
