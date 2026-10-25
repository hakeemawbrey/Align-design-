// cityatlanta (30 s vertical Align ad): "Atlanta: a city in a forest." → "So many trees. So hard to find the one." →
// tonight's deck falls through the canopy from the stars → a mystery card: "Chart first. Face last." →
// "Find your one in the forest." → shared end card ("come" + the Align logo + VOTE FOR YOUR CITY).
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import * as F from './film.js'
export const DURATION = 30
export const CTA = 'VOTE FOR YOUR CITY'
// card-motif cuts, each where one beat has cleared and the next is about to pop:
//   4.72 hook type out (4.75), camera starting its drop → "So many trees." (5.0)
//   7.36 type out (7.35) → the walker stops, "So hard to find the one." (7.42)
//   10.26 type out (10.25) → "Tonight's deck is dealt from the stars." (10.32), cards fall from 10.6
//   15.12 type out, the glowing centre card turning over → the veiled mystery card, "Chart first. Face last." (15.4)
//   20.17 type out (20.1), card shrinking to a star → "Find your one in the forest." (20.25) · the end card flips in at 25.6
const CUTS = [{ t: 4.72, kind: 'deal' }, { t: 7.36, kind: 'fan' }, { t: 10.26, kind: 'shuffle' }, { t: 15.12, kind: 'flip' }, { t: 20.17, kind: 'fan', dir: -1 }]
export const SCENES = [...F.SCENES, (stage) => buildEndcard(stage, { start: DURATION - ENDCARD_LEN, cta: CTA }), cardFrame({ start: 0, end: DURATION - ENDCARD_LEN }), cardCuts(CUTS)]
export const CUES = [...F.CUES, ...cardCutCues(CUTS), ...endcardCues(DURATION - ENDCARD_LEN)]
