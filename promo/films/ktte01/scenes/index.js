// ktte01: THIS OR THAT: LOVE EDITION, "Aries Has One Second" (10 s vertical, star advice trial reel, chiptune · E).
// Rows: promo/films/month2/m29.md. The format lives in ./ttkit.js (shared read-only with ktte02–ktte24).
//   0.00  frame 0: Aries mid-lunge into the CALL card, the timer bar flashing, hook "ARIES. ONE SECOND PER CHOICE."
//   0.12  the slam + whip zoom (the pattern break).  CALL vs TEXT → CALL
//   ~1.0  FIRST MOVE vs WAIT FOR THEM → FIRST MOVE  ·  ~2.3  SURPRISE vs PLAN → SURPRISE
//   ~3.6  the twist: SAY SORRY FIRST vs WIN THE ARGUMENT: record scratch, freeze, the timer stalls, Aries sweats…
//         then taps SORRY FIRST. Pisces sobs proudly in the tissue cam.
//   finale: the SORRY FIRST card holds centre; THE STARS SAY "Fast at everything. *Even sorry.*" Hard cut.
import { makeTT } from './ttkit.js'

const EP = makeTT({
  id: 'ktte01', mode: 'solo', signs: ['aries'],
  hook: 'ARIES. *ONE SECOND* | PER CHOICE.', accent: '#ff7a52',
  brk: { kind: 'whip', t: 0.12 },
  rounds: [
    { a: 'CALL', b: 'TEXT', ia: 'phone', ib: 'bubble', pick: 'a' },
    { a: 'MAKE THE FIRST MOVE', b: 'WAIT FOR THEM', ia: 'heart', ib: 'clock', pick: 'a', d: 1.25 },
    { a: 'SURPRISE', b: 'PLAN IT', ia: 'spark', ib: 'cal', pick: 'a', d: 1.2 },
    { a: 'SAY SORRY FIRST', b: 'WIN THE ARGUMENT', ia: 'heart', ib: 'star', pick: 'a', d: 3.2, pickAt: 2.6, hover: true, freeze: [0.6, 1.5], freezeCap: 'oh no. *a hard one.*' },
  ],
  last: 'Fast at everything. | *Even sorry.*',
  ending: 'cut', fin: 2.1,
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
