// og-ktte06: social rework of ktte06 "Virgo Made a Pro and Con List" (static HOOK outline over a longer opening; no
// series bug, slam title or record scratch, no loop; Virgo pushed to laminated-binder levels; ends on the last line).
// Kit: ./ttkit.js (og social copy of ../../ktte01/scenes/ttkit.js). Was:
// ktte06: THIS OR THAT: LOVE EDITION, "Virgo Made a Pro and Con List" (~11 s vertical, star advice trial reel,
// chiptune · B).
//   frame 0: Virgo mid-scribble, a pro/con list unrolling off the bottom of the frame ("it has tabs. color-coded.").
//   REPLY NOW vs REREAD IT 47 TIMES → REREAD · SCHEDULE THE SMALL TALK vs GO WITH IT → SCHEDULE
//   twist: BE PERFECT vs BE THERE → Virgo tosses the list, BE THERE. Pisces happy-cries in the tissue cam.
//   Last: "Show up. *Skip the list.*" Hard cut.
import { makeTT, R, INK, BONE, RED, MINT, ease, prog, lerp, bubble } from './ttkit.js'

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
  id: 'og-ktte06', mode: 'solo', signs: ['virgo'],
  hook: '', accent: '#ef5c94',
  rounds: [
    { a: 'REPLY NOW', b: 'REREAD IT 47 TIMES', ia: 'bubble', ib: 'q', pick: 'b', d: 1.6, hover: true,
      extra(x, t, S) { bubble(x, t, 400, 1085, S.T.realOf(S.r.t0 + 0.8), S.T.realOf(S.r.t0 + 2.5), 'it has tabs.\ncolor-coded.', { size: 40 }) } },
    { a: 'REPLY NOW', b: 'SCHEDULE THE SMALL TALK', ia: 'bubble', ib: 'cal', pick: 'b', d: 1.5 },
    { a: 'BE PERFECT', b: 'BE THERE', ia: 'star', ib: 'heart', pick: 'b', d: 2.7, pickAt: 2.0, hover: true },
  ],
  last: 'Show up. | *Skip the list.*',
  ending: 'cut', fin: 2.4,
  mid(x, t, S) {
    const R3 = S.T.rounds[2]
    const u = clamp01(0.55 + S.v * 0.25)
    const toss = ease.inCubic(prog(S.v, R3.t0 + 1.6, R3.t0 + 2.1))
    if (S.v < R3.t0 + 2.1) list(x, t, lerp(215, 300, toss), 1250, u, toss)   // og social: beside Virgo, not over its face
  },
})
function clamp01(v) { return Math.max(0, Math.min(1, v)) }
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const LIFT = +EP.T.realOf(EP.T.rounds[EP.T.rounds.length - 1].slam).toFixed(3)
export const FIRST = +EP.T.realOf(EP.T.rounds[0].slam).toFixed(3)

export const HOOK = 'Two choices. | Virgo *laminated it.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 2.6
