// cityneworleans (30 s vertical Align ad): "New Orleans: someone's always reading your cards." → the cards say love's
// coming, never who → Align reads your chart, deals you a person; talk cards, not small talk; chart first, face last →
// "Let the cards decide." → shared end card ("come" + the Align logo + JOIN THE WAITLIST).
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import * as F from './film.js'
export const DURATION = 30
export const CTA = 'JOIN THE WAITLIST'
export const SCENES = [...F.SCENES, (stage) => buildEndcard(stage, { start: DURATION - ENDCARD_LEN, cta: CTA })]
export const CUES = [...F.CUES, ...endcardCues(DURATION - ENDCARD_LEN)]
