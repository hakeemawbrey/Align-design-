// cityatlanta (30 s vertical Align ad): "Atlanta: a city in a forest." → "So many trees. So hard to find the one." →
// tonight's deck falls through the canopy from the stars → a mystery card: "Chart first. Face last." →
// "Find your one in the forest." → shared end card ("come" + the Align logo + VOTE FOR YOUR CITY).
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import * as F from './film.js'
export const DURATION = 30
export const CTA = 'VOTE FOR YOUR CITY'
export const SCENES = [...F.SCENES, (stage) => buildEndcard(stage, { start: DURATION - ENDCARD_LEN, cta: CTA })]
export const CUES = [...F.CUES, ...endcardCues(DURATION - ENDCARD_LEN)]
