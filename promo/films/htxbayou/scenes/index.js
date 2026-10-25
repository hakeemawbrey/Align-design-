// htxbayou (15 s vertical Align ad): "Perfect date: a sunset walk on Buffalo Bayou." → "Who with?" → tonight's deck
// dealt from the stars → "Your walk partner is out there." → shared end card ("come" + the Align logo, fade to black).
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import * as F from './film.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
export const DURATION = 15
// card-motif cuts, ~0.06 s before each beat's first pop: hook → "Who with?" → the deck in the stars → "Your walk partner"
const CUTS = [{ t: 3.06, kind: 'flip' }, { t: 4.92, kind: 'shuffle' }, { t: 8.36, kind: 'fan' }]
export const SCENES = [...F.SCENES, (stage) => buildEndcard(stage, { start: DURATION - ENDCARD_LEN }),
  cardFrame({ start: 0, end: DURATION - ENDCARD_LEN }), cardCuts(CUTS)]
export const CUES = [...F.CUES, ...cardCutCues(CUTS), ...endcardCues(DURATION - ENDCARD_LEN)]
