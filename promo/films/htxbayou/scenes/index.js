// htxbayou (15 s vertical Align ad): "Perfect date: a sunset walk on Buffalo Bayou." → "Who with?" → tonight's deck
// dealt from the stars → "Your walk partner is out there." → shared end card ("come" + the Align logo, fade to black).
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import * as F from './film.js'
export const DURATION = 15
export const SCENES = [...F.SCENES, (stage) => buildEndcard(stage, { start: DURATION - ENDCARD_LEN })]
export const CUES = [...F.CUES, ...endcardCues(DURATION - ENDCARD_LEN)]
