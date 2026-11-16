// og-ktte03: social rework (static HOOK box 0–3.0 instead of the slammed title; no series bug, no whip / shake / flash,
// calm freeze captions; crazier picks; the This or That kit copied to ./ttkit.js and moved into the safe zones). Was:
// ktte03: THIS OR THAT: LOVE EDITION, "Gemini, Pick One" (~9 s vertical, star advice trial reel, funk · A). Loops.
// Rows: promo/films/month2/m29.md. Format: ../../ktte01/scenes/ttkit.js (read-only).
//   frame 0: Gemini mid-stretch, grabbing BOTH cards; screen shake. REPLY NOW vs REPLY LATER → both: BZZT "PICK ONE!"
//   VOICE NOTE vs ESSAY TEXT → both again: BZZT. Twist: SAY HOW YOU FEEL vs CHANGE THE SUBJECT → it lets go of one:
//   SAY IT. Pisces cries in the tissue cam. Last: "One answer. *The honest one.*" Seamless loop back to frame 0.
import { makeTT } from './ttkit.js'

const EP = makeTT({
  id: 'og-ktte03', mode: 'solo', signs: ['gemini'],
  hook: 'GEMINI, YOU HAVE | TO *PICK ONE.*', accent: '#f2cf4a',
  brk: { kind: 'shake', t: 0.12 },
  rounds: [
    { a: 'REPLY NOW', b: 'REPLY LATER', ia: 'bubble', ib: 'clock', pick: null, both: true, d: 1.6, pickAt: 0.5 },
    { a: 'SEVEN VOICE NOTES', b: 'ONE ESSAY TEXT', ia: 'phone', ib: 'bubble', pick: null, both: true, d: 1.7, pickAt: 1.0, alarm: 'ONE. PICK ONE.' },
    { a: 'SAY HOW YOU FEEL', b: 'CHANGE THE SUBJECT', ia: 'heart', ib: 'q', pick: 'a', d: 2.3, pickAt: 1.6, hover: true },
  ],
  last: 'One answer. | *The honest one.*',
  ending: 'cut',   // og: ends on the last beat (no loop back) fin: 2.4,
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const LIFT = +EP.T.realOf(EP.T.rounds[EP.T.rounds.length - 1].slam).toFixed(3)
export const HOOK = "Gemini, you have | to *pick one.*"
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 3.0
