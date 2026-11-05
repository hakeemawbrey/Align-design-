// ktte06: THIS OR THAT: LOVE EDITION, "Virgo Made a Pro and Con List" (~11 s vertical, star advice trial reel,
// chiptune · B). Loops. Rows: promo/films/month2/m29.md. Format: ../../ktte01/scenes/ttkit.js (read-only).
//   frame 0: Virgo mid-scribble, a pro/con list unrolling off the bottom of the frame, the timer nearly out; freeze.
//   REPLY NOW vs REREAD IT NINE TIMES → REREAD · PLAN EVERY MINUTE vs GO WITH IT → PLAN
//   twist: BE PERFECT vs BE THERE → Virgo tosses the list, BE THERE. Pisces happy-cries in the tissue cam.
//   Last: "Show up. *Skip the list.*" Seamless loop back to frame 0.
import { makeTT, R, INK, BONE, RED, MINT, ease, prog, lerp } from '../../ktte01/scenes/ttkit.js'

// the pro/con list: a long paper scroll unrolling from Virgo's hands (u = unroll 0…1, toss = 0…1 flies away)
function list(x, t, cx, cy, u, toss) {
  if (u <= 0) return
  x.save(); x.translate(cx + toss * 600, cy - toss * 500); x.rotate(-0.05 + toss * 2.2)
  const h = 120 + u * 900
  R(x, INK, -126, -6, 252, h + 12); R(x, BONE, -120, 0, 240, h)
  R(x, INK, -2, 10, 4, h - 20)
  x.font = "800 26px Inter, Arial"; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillStyle = MINT; x.fillText('PRO', -60, 30); x.fillStyle = RED; x.fillText('CON', 60, 30)
  for (let i = 0; i < Math.floor(h / 34) - 1; i++) { R(x, '#9a90b8', -104, 62 + i * 34, 80 + (i * 37) % 30, 6); R(x, '#9a90b8', 18, 62 + i * 34, 70 + (i * 53) % 34, 6) }
  x.restore()
  void t
}
const EP = makeTT({
  id: 'ktte06', mode: 'solo', signs: ['virgo'],
  hook: 'TWO OPTIONS. | VIRGO MADE *A LIST.*', accent: '#ef5c94',
  brk: { kind: 'scratch', t: 0.12, len: 0.6, cap: 'it has *tabs.*' },
  rounds: [
    { a: 'REPLY NOW', b: 'REREAD IT NINE TIMES', ia: 'bubble', ib: 'q', pick: 'b', d: 1.6 },
    { a: 'PLAN EVERY MINUTE', b: 'GO WITH IT', ia: 'cal', ib: 'spark', pick: 'a', d: 1.4 },
    { a: 'BE PERFECT', b: 'BE THERE', ia: 'star', ib: 'heart', pick: 'b', d: 2.7, pickAt: 2.0, hover: true },
  ],
  last: 'Show up. | *Skip the list.*',
  ending: 'loop', fin: 2.4,
  mid(x, t, S) {
    const R3 = S.T.rounds[2]
    const u = S.v < 0.2 ? 0.75 + S.v : S.v < R3.t0 + 0.4 ? 1 : 1
    const toss = ease.inCubic(prog(S.v, R3.t0 + 1.6, R3.t0 + 2.1))
    if (S.v < R3.t0 + 2.1) list(x, t, lerp(560, 640, toss), 1290, Math.min(1, u), toss)
  },
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const LIFT = +EP.T.realOf(EP.T.rounds[EP.T.rounds.length - 1].slam).toFixed(3)
