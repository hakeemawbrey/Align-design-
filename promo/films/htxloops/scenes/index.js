// htxloops (30s, vertical): "Inside the Loop. Outside the Beltway." → ring roads morph into a zodiac wheel → two dots
// across town connect in gold → "Align reads both charts…" → "Whatever side of the Loop you're on…" → shared END CARD.
import * as F from './film.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
export const DURATION = 30
export const SCENES = [...F.SCENES, (stage) => buildEndcard(stage, { start: DURATION - ENDCARD_LEN })]
export const CUES = [...F.CUES, ...endcardCues(DURATION - ENDCARD_LEN)]
