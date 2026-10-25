// cityneworleans (30 s vertical Align ad): "New Orleans: someone's always reading your cards." → the cards say love's
// coming, never who → Align reads your chart, deals you a person; talk cards, not small talk; chart first, face last →
// "Let the cards decide." → shared end card ("come" + the Align logo + JOIN THE WAITLIST).
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import * as F from './film.js'
export const DURATION = 30
export const CTA = 'JOIN THE WAITLIST'
const END = DURATION - ENDCARD_LEN   // 25.6
// card-motif cuts, just before each beat's headline pops (old headline is out ~0.2 s earlier):
//   5.58 balcony out → "The cards say" (5.65) · 10.82 "?" bursts → "Align reads" (10.9) · 14.78 → "Talk cards," (14.85)
//   18.88 fan drops → "Chart first." (18.95) · 22.53 mystery card out → "Let the cards decide." (22.6) · end card flips at 25.6
//   (no 'deal' here: its last card lingers over the top headline zone for ~0.3 s after the cut)
const CUTS = [{ t: 5.58, kind: 'flip' }, { t: 10.82, kind: 'fan' }, { t: 14.78, kind: 'shuffle' }, { t: 18.88, kind: 'flip', dir: -1 }, { t: 22.53, kind: 'fan', dir: -1 }]
export const SCENES = [...F.SCENES, (stage) => buildEndcard(stage, { start: END, cta: CTA }), cardFrame({ start: 0, end: END }), cardCuts(CUTS)]
export const CUES = [...F.CUES, ...cardCutCues(CUTS), ...endcardCues(END)]
