// og-ktte15 (og social cut of ktte15): THIS OR THAT: LOVE EDITION, "Gemini vs Sagittarius: The 2 A.M. Scroll".
// Format: ./ttkit.js (the og social copy of ../../ktte01/scenes/ttkit.js).
// og: static HOOK (box) replaces the slammed title; no series bug; no loop (ends on the lights going out); Gemini has
// every tab open and Sagittarius is planning a trip at 2 a.m.; the clock sits centre, clear of the app buttons.
//   frame 0: both mid-lunge into ONE MORE VIDEO, phones glowing, the clock reading 2:07; the frame holds.
//   THE EX'S PROFILE vs PUT IT DOWN → both hover… both PUT IT DOWN.
//   twist: PHONE FACE DOWN vs ONE MORE SCROLL → both FACE DOWN; the lights go out. Pisces in the tissue cam, crying at a
//   puppy video. Last: "Put it down. *Tomorrow’s nicer.*"
import { makeTT, label, bubble, R, INK, CAM_DUEL, prog, ease } from './ttkit.js'

const EP = makeTT({
  id: 'og-ktte15', mode: 'duel', signs: ['gemini', 'sagittarius'],
  hook: 'IT’S 2 A.M. | *SCROLL OR SLEEP?*', accent: '#7fd0ff', hookUntil: 3.2,
  brk: { kind: 'scratch', t: 0.12, len: 0.5, cap: '2:07 a.m. *again.*' },
  rounds: [
    { a: 'ONE MORE VIDEO', b: 'SLEEP (LOL)', ia: 'phone', ib: 'zz', pick: ['a', 'a'] },
    { a: 'THE EX’S PROFILE (AGAIN)', b: 'PUT IT DOWN', ia: 'phone', ib: 'hand', pick: ['b', 'b'], d: 2.1, pickAt: 1.6, hover: true },
    { a: 'PHONE FACE DOWN', b: 'ONE MORE SCROLL (FOREVER)', ia: 'zz', ib: 'phone', pick: ['a', 'a'], d: 1.6 },
  ],
  last: 'Put it down. | *Tomorrow’s nicer.*',
  ending: 'cut', fin: 2.4, finSide: 'a',
  finPose: () => ({ mood: 'sleepy' }),
  mid(x, t, S) {
    // the clock (og: centre, between the cards and the heroes)
    const E = S.T.E
    const m = S.v < S.T.rounds[1].t0 ? '2:07' : S.v < E ? '2:08' : '2:09'
    R(x, INK, 455, 1088, 170, 70); R(x, '#14102a', 461, 1094, 158, 58)
    label(x, m, 540, 1124, { size: 44, col: '#ff6b7f' })
    // og: the two of them, at their most themselves
    const R0 = S.T.rounds[0], R1 = S.T.rounds[1]
    bubble(x, t, 230, 1450, S.T.realOf(R0.t0 + 0.9), S.T.realOf(R1.t0 + 1.2), 'tab 31 of 31', { size: 34, tail: -0.2 })
    bubble(x, t, 770, 1450, S.T.realOf(R0.t0 + 1.0), S.T.realOf(R1.t0 + 1.2), 'booking a flight??', { size: 34, tail: 0.2 })
    // lights out in the finale
    const d = ease.inOutQuad(prog(S.v, E + 0.1, E + 0.6))
    if (d > 0) { x.fillStyle = `rgba(4,2,12,${0.45 * d})`; x.fillRect(0, 0, 1080, 1920) }
  },
  camExtra(x, t, v) { x.save(); x.globalCompositeOperation = 'lighter'; x.fillStyle = 'rgba(160,200,255,0.12)'; x.fillRect(CAM_DUEL.x, CAM_DUEL.y, CAM_DUEL.w, CAM_DUEL.h); x.restore() },
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const LIFT = +EP.T.realOf(EP.T.rounds[EP.T.rounds.length - 1].slam).toFixed(3)
export const HOOK = 'It’s 2 a.m. | *One more video.*'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = +EP.T.realOf(EP.HOOK_UNTIL).toFixed(2)
