// htxloops (30s, vertical): "Inside the Loop. Outside the Beltway." → ring roads morph into a zodiac wheel → two dots
// across town connect in gold → "Align reads both charts…" → "Whatever side of the Loop you're on…" → shared END CARD.
import * as F from './film.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
export const DURATION = 30
const END = DURATION - ENDCARD_LEN
// card-motif cuts (all type is cleared at each one; the map/wheel carries on underneath):
//   7.30 hook type out (7.25) → the ring roads start morphing into the wheel (7.4)
//   9.42 wheel settled → "Somewhere in this city…" (9.49)
//  14.12 dots/line type out (14.05) → "Align reads both charts" (14.21)
//  18.68 charts type out (18.65) → the wheel morphs back to the map, "Whatever side of the Loop…" (19.77)
//   the finale (dots meet, 24.3–24.95) and the end card's own flip (25.6) stay uncut
const CUTS = [{ t: 7.3, kind: 'deal' }, { t: 9.42, kind: 'fan' }, { t: 14.12, kind: 'flip' }, { t: 18.68, kind: 'shuffle' }]
export const SCENES = [...F.SCENES, (stage) => buildEndcard(stage, { start: END }), cardFrame({ start: 0, end: END }), cardCuts(CUTS)]
export const CUES = [...F.CUES, ...cardCutCues(CUTS), ...endcardCues(END)]
