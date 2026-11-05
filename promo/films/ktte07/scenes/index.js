// ktte07: THIS OR THAT: LOVE EDITION, "Libra, Your Vote Counts" (~9 s vertical, star advice trial reel, jazzy · Bb).
// Rows: promo/films/month2/m29.md. Format: ../../ktte01/scenes/ttkit.js (read-only).
//   frame 0: Libra mid-spin between DINNER and MOVIE, the timer flashing empty: BZZT "TIME!" (the pattern break).
//   COZY vs FANCY → hovers… "whatever you want!" → BZZT again.
//   twist: WHAT YOU WANT vs WHAT THEY WANT → Libra picks WHAT I WANT and gasps at itself. Pisces cries proudly.
//   Last: "Your vote *counts too.*" Hard cut.
import { makeTT, bubble } from '../../ktte01/scenes/ttkit.js'

const EP = makeTT({
  id: 'ktte07', mode: 'solo', signs: ['libra'],
  hook: 'LIBRA. THREE SECONDS. | *GOOD LUCK.*', accent: '#e163d6',
  brk: { kind: 'flash', t: 0.12 },
  rounds: [
    { a: 'DINNER', b: 'MOVIE', ia: 'fork', ib: 'star', pick: null, buzz: true, d: 1.35, pickAt: 0.74, hover: true },
    { a: 'COZY', b: 'FANCY', ia: 'house', ib: 'spark', pick: null, buzz: true, d: 2.0, pickAt: 1.35, hover: true, alarm: 'TIME! AGAIN!',
      extra(x, t, S) { bubble(x, t, 470, 1080, S.T.realOf(S.r.t0 + 0.45), S.T.realOf(S.r.t0 + 1.35), 'whatever you want!', { size: 46 }) } },
    { a: 'WHAT YOU WANT', b: 'WHAT THEY WANT', ia: 'heart', ib: 'q', pick: 'a', d: 2.4, pickAt: 1.7, hover: true },
  ],
  last: 'Your vote | *counts too.*',
  ending: 'cut', fin: 2.3,
  mid(x, t, S) { const E = S.T.E; bubble(x, t, 540, 1520, S.T.realOf(E - 0.55), S.T.realOf(E + 0.8), 'wait… I picked ME?', { size: 44 }) },
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const LIFT = +EP.T.realOf(EP.T.rounds[EP.T.rounds.length - 1].slam).toFixed(3)
