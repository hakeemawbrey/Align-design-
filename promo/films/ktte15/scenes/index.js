// ktte15: THIS OR THAT: LOVE EDITION, "Gemini vs Sagittarius: The 2 A.M. Scroll" (~9 s vertical, star advice trial reel,
// house · D). Loops. Rows: promo/films/month2/m29.md. Format: ../../ktte01/scenes/ttkit.js (read-only).
//   frame 0: both mid-lunge into ONE MORE VIDEO, phones glowing, the clock reading 2:07; sudden silence (tape stop).
//   LOOK AT THE EX'S PROFILE vs PUT IT DOWN → both hover… both PUT IT DOWN.
//   twist: PHONE FACE DOWN vs ONE MORE SCROLL → both FACE DOWN; the lights go out. Pisces in the tissue cam, crying at a
//   puppy video. Last: "Put it down. *Tomorrow’s nicer.*" Seamless loop back to frame 0.
import { makeTT, label, R, INK, BONE, GOLD, prog, ease } from '../../ktte01/scenes/ttkit.js'

const EP = makeTT({
  id: 'ktte15', mode: 'duel', signs: ['gemini', 'sagittarius'],
  hook: 'IT’S 2 A.M. | *SCROLL OR SLEEP?*', accent: '#7fd0ff',
  brk: { kind: 'scratch', t: 0.12, len: 0.5, cap: '2:07 a.m. *again.*' },
  rounds: [
    { a: 'ONE MORE VIDEO', b: 'GO TO SLEEP', ia: 'phone', ib: 'zz', pick: ['a', 'a'] },
    { a: 'LOOK AT THE EX’S PROFILE', b: 'PUT IT DOWN', ia: 'phone', ib: 'hand', pick: ['b', 'b'], d: 2.1, pickAt: 1.6, hover: true },
    { a: 'PHONE FACE DOWN', b: 'ONE MORE SCROLL', ia: 'zz', ib: 'phone', pick: ['a', 'a'], d: 1.6 },
  ],
  last: 'Put it down. | *Tomorrow’s nicer.*',
  ending: 'loop', fin: 2.4, finSide: 'a',
  finPose: () => ({ mood: 'sleepy' }),
  mid(x, t, S) {
    // the 2:07 clock
    const E = S.T.E
    const m = S.v < S.T.rounds[1].t0 ? '2:07' : S.v < E ? '2:08' : '2:09'
    R(x, INK, 860, 1095, 170, 70); R(x, '#14102a', 866, 1101, 158, 58)
    label(x, m, 945, 1131, { size: 44, col: '#ff6b7f' })
    // lights out in the finale
    const d = ease.inOutQuad(prog(S.v, E + 0.1, E + 0.6))
    if (d > 0) { x.fillStyle = `rgba(4,2,12,${0.45 * d})`; x.fillRect(0, 0, 1080, 1920) }
    void BONE; void GOLD
  },
  camExtra(x, t, v) { x.save(); x.globalCompositeOperation = 'lighter'; x.fillStyle = 'rgba(160,200,255,0.12)'; x.fillRect(385, 1470, 310, 290); x.restore() },
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const LIFT = +EP.T.realOf(EP.T.rounds[EP.T.rounds.length - 1].slam).toFixed(3)
