// torsorry (30 s vertical Align ad): "Toronto: so polite, nobody says what they want." → everyone's thinking it,
// nobody's saying it → on Align, dealbreakers come first + the Push/Pull/Align reading ("See how you fit, no guessing.")
// → "Say what you mean." → shared end card ("come" + the Align logo, VOTE FOR YOUR CITY).
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import * as F from './film.js'
export const DURATION = 30
export const CTA = 'VOTE FOR YOUR CITY'
const END = DURATION - ENDCARD_LEN          // 25.6
// card-motif cuts, each where one beat has cleared and the next headline is about to pop:
//   6.48  the polite pile has popped (6.16–6.6) → "Everyone's thinking it…" (6.6)
//  11.33  the date sinks away (10.95–11.3) → "On Align, dealbreakers come first." (11.4)
//  17.98  card out (17.75–18.1) → "See how you fit, no guessing." (18.05)
//  22.42  wheels out (21.85–22.25) → "Say what you mean." (22.5) · the end card flips in at 25.6
const CUTS = [{ t: 6.48, kind: 'flip' }, { t: 11.33, kind: 'deal' }, { t: 17.98, kind: 'flip', dir: -1 }, { t: 22.42, kind: 'shuffle' }]
export const SCENES = [...F.SCENES, (stage) => buildEndcard(stage, { start: END, cta: CTA }), cardFrame({ start: 0, end: END }), cardCuts(CUTS)]
export const CUES = [...F.CUES, ...cardCutCues(CUTS), ...endcardCues(END)]
