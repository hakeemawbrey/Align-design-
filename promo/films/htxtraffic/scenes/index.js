// htxtraffic (15 s vertical Align ad): "An hour on the Katy Freeway… for a date who just says 'hey'." → dealbreakers up
// front + a real talk card → "Know before you drive." → shared end card ("come Align." + logo, fade to black).
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import * as F from './film.js'
export const DURATION = 15
const END = DURATION - ENDCARD_LEN
// card-motif cuts, each where one beat has cleared and the next headline is about to pop (~0.06 s before it):
//   2.93 Katy Freeway hook out (2.95) → "…for a date who just says “hey.”" (3.0)
//   5.24 deflated bubble + road gone (5.25) → ON ALIGN "Dealbreakers, up front." (5.3)
//   8.24 dealbreaker + talk cards out (8.3) → "Know before you drive." + the empty freeway (8.3) · end card flips at 10.6
const CUTS = [{ t: 2.93, kind: 'shuffle' }, { t: 5.24, kind: 'flip' }, { t: 8.24, kind: 'fan', dir: -1 }]
export const SCENES = [...F.SCENES, (stage) => buildEndcard(stage, { start: END }), cardFrame({ start: 0, end: END }), cardCuts(CUTS)]
export const CUES = [...F.CUES, ...cardCutCues(CUTS), ...endcardCues(END)]
