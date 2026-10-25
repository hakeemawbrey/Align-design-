// cityaustin (15 s vertical Align ad): "Austin: everyone's 'in a band' … and 'between things.'" → on Align, dealbreakers
// come first (✕ "BETWEEN THINGS", ✕ FLAKY PLANS, ✕ "WE'LL SEE") → "Know what they're about, first."
// → shared end card ("come" + the Align logo, VOTE FOR YOUR CITY).
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import * as F from './film.js'
export const DURATION = 15
export const CTA = 'VOTE FOR YOUR CITY'
// card-motif cuts, each just before the next headline pops:
//   2.63 hook type leaving (2.62) → "…and 'between things.'" (2.7)
//   5.15 band + type out (5.15) → "On Align, Dealbreakers come first." (5.22)
//   8.38 type out (8.44) → "Know what they're about, first." (8.45) · the end card flips in at 10.6
const CUTS = [{ t: 2.63, kind: 'flip' }, { t: 5.15, kind: 'deal' }, { t: 8.38, kind: 'shuffle' }]
export const SCENES = [...F.SCENES, (stage) => buildEndcard(stage, { start: DURATION - ENDCARD_LEN, cta: CTA }), cardFrame({ start: 0, end: DURATION - ENDCARD_LEN }), cardCuts(CUTS)]
export const CUES = [...F.CUES, ...cardCutCues(CUTS), ...endcardCues(DURATION - ENDCARD_LEN)]
