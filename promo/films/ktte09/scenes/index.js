// ktte09: THIS OR THAT: LOVE EDITION, "Sagittarius Saw 'What Are We?'" (~10 s vertical, star advice trial reel,
// house · A). Rows: promo/films/month2/m29.md. Format: ../../ktte01/scenes/ttkit.js (read-only).
//   frame 0: Sagittarius mid-gallop into SPONTANEOUS TRIP, a "so… what are we?" bubble flipping in; whip zoom.
//   DEFINE IT vs KEEP IT VAGUE → hovers, sweats, BZZT "TIME!".
//   twist: FREEDOM vs SOMEONE TO TELL IT ALL TO → SOMEONE. Pisces cries in the tissue cam.
//   Last: "Adventures *land better shared.*" Hard cut.
import { makeTT, bubble } from '../../ktte01/scenes/ttkit.js'

const EP = makeTT({
  id: 'ktte09', mode: 'solo', signs: ['sagittarius'],
  hook: 'SAGITTARIUS SAW | *“WHAT ARE WE?”*', accent: '#b98cff',
  brk: { kind: 'whip', t: 0.12 },
  rounds: [
    { a: 'SPONTANEOUS TRIP', b: 'PLANNED TRIP', ia: 'spark', ib: 'cal', pick: 'a' },
    { a: 'DEFINE IT', b: 'KEEP IT VAGUE', ia: 'heart', ib: 'q', pick: null, buzz: true, d: 2.1, pickAt: 1.5, hover: true, alarm: 'TIME!' },
    { a: 'TOTAL FREEDOM', b: 'SOMEONE TO TELL IT ALL TO', ia: 'moon', ib: 'heart', pick: 'b', d: 2.4, pickAt: 1.8, hover: true },
  ],
  last: 'Adventures | *land better shared.*',
  ending: 'cut', fin: 2.4,
  over(x, t, S) { if (S.v < 0.9) bubble(x, t, 760, 1110, -1, 0.9, 'so… what are we?', { size: 48, col: '#ffd6e4' }) },
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const LIFT = +EP.T.realOf(EP.T.rounds[EP.T.rounds.length - 1].slam).toFixed(3)
