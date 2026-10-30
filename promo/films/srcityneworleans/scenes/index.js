// srcityneworleans · "New Orleans reads your cards" (Star Talk Remix of cityneworleans, 30 s vertical, music: cinematic, Cm).
// Story 0–25.6 (film.js), then the shared END CARD (cta JOIN THE WAITLIST, as the original).
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import * as F from './film.js'
export const DURATION = 30
export const CTA = 'JOIN THE WAITLIST'
export const T = F.T
const END = DURATION - ENDCARD_LEN   // 25.6
// card-motif cuts, just before each beat's headline pops (the default selection keeps 10.82 + 18.88):
//   5.58 → "The cards say" · 10.82 "?" bursts → "Align reads" · 14.78 → "Talk cards," · 18.88 → "Card first." · 22.53 → "Let the cards decide."
const CUTS = [{ t: 5.58, kind: 'flip' }, { t: 10.82, kind: 'fan' }, { t: 14.78, kind: 'shuffle' }, { t: 18.88, kind: 'flip', dir: -1 }, { t: 22.53, kind: 'fan', dir: -1 }]
export const SCENES = [...F.SCENES, (stage) => buildEndcard(stage, { start: END, cta: CTA }), cardFrame({ start: 0, end: END }), cardCuts(CUTS)]
export const CUES = [...F.CUES, ...cardCutCues(CUTS), ...endcardCues(END)]
