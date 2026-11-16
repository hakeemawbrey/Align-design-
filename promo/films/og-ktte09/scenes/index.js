// og-ktte09: social rework of ktte09 "Sagittarius Saw 'What Are We?'" (static HOOK box over a longer opening; no series
// bug, slam title or whip; Sagittarius pushed to passport-out levels; ends on the last line).
// Kit: ./ttkit.js (og social copy of ../../ktte01/scenes/ttkit.js). Was:
// ktte09: THIS OR THAT: LOVE EDITION, "Sagittarius Saw 'What Are We?'" (~10 s vertical, star advice trial reel,
// house · A).
//   frame 0: Sagittarius hovering toward LEAVE THE COUNTRY TONIGHT, a "so… what are we?" bubble beside it.
//   DEFINE IT vs KEEP IT VAGUE → hovers, sweats ("my passport is already out."), BZZT "TIME!".
//   twist: TOTAL FREEDOM vs SOMEONE TO TELL IT ALL TO → SOMEONE. Pisces cries in the tissue cam.
//   Last: "Adventures *land better shared.*" Hard cut.
import { makeTT, bubble } from './ttkit.js'

const EP = makeTT({
  id: 'og-ktte09', mode: 'solo', signs: ['sagittarius'],
  hook: '', accent: '#b98cff',
  rounds: [
    { a: 'LEAVE THE COUNTRY TONIGHT', b: 'PLANNED TRIP', ia: 'spark', ib: 'cal', pick: 'a', hover: true },
    { a: 'DEFINE IT', b: 'KEEP IT VAGUE', ia: 'heart', ib: 'q', pick: null, buzz: true, d: 2.1, pickAt: 1.5, hover: true, alarm: 'TIME!',
      extra(x, t, S) { bubble(x, t, 470, 1110, S.T.realOf(S.r.t0 + 0.3), S.T.realOf(S.r.t0 + 1.5), 'my passport is\nalready out.', { size: 40 }) } },
    { a: 'TOTAL FREEDOM', b: 'SOMEONE TO TELL IT ALL TO', ia: 'moon', ib: 'heart', pick: 'b', d: 2.4, pickAt: 1.8, hover: true },
  ],
  last: 'Adventures | *land better shared.*',
  ending: 'cut', fin: 2.4,
  over(x, t, S) { if (S.v < 1.7) bubble(x, t, 700, 1110, -1, 1.7, 'so… what are we?', { size: 46, col: '#ffd6e4' }) },
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const LIFT = +EP.T.realOf(EP.T.rounds[EP.T.rounds.length - 1].slam).toFixed(3)
export const FIRST = +EP.T.realOf(EP.T.rounds[0].slam).toFixed(3)

export const HOOK = '“What are we?” | Sag *booked a flight.*'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 2.6
