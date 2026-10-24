// cityaustin (15 s vertical Align ad): "Austin: everyone's 'in a band' … and 'between things.'" → on Align, dealbreakers
// come first (✕ "BETWEEN THINGS", ✕ FLAKY PLANS, ✕ "WE'LL SEE") → "Know what they're about, first."
// → shared end card ("come" + the Align logo, VOTE FOR YOUR CITY).
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import * as F from './film.js'
export const DURATION = 15
export const CTA = 'VOTE FOR YOUR CITY'
export const SCENES = [...F.SCENES, (stage) => buildEndcard(stage, { start: DURATION - ENDCARD_LEN, cta: CTA })]
export const CUES = [...F.CUES, ...endcardCues(DURATION - ENDCARD_LEN)]
