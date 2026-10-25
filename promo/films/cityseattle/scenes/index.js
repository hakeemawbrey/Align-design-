// cityseattle · "Seattle: cloudy, rainy… you can never see the stars." (30 s vertical Align ad). Story 0–25.6 (story.js), then the shared END CARD.
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import * as S from './story.js'
export const DURATION = 30
export const CTA = 'VOTE FOR YOUR CITY'
// card-motif cuts, each just before the next headline pops (old type already out):
//   3.33 "Seattle: cloudy, rainy…" out (3.3) → "You can never see the stars." (3.4)
//   6.53 "nope." out (6.5) → "We'll show you yours." (6.6), the clouds part
//   12.52 chart labels/type out (12.4), chart sliding left → "Then we find who lines up." (12.6)
//   19.42 charts out (19.1) → the mystery card drops, "Chart first. Face last." (19.49)
//   22.62 type out (22.55), city rising → "The stars are still up there." (22.7) · the end card flips in at 25.6
const CUTS = [{ t: 3.33, kind: 'flip' }, { t: 6.53, kind: 'fan' }, { t: 12.52, kind: 'deal' }, { t: 19.42, kind: 'shuffle' }, { t: 22.62, kind: 'flip', dir: -1 }]
export const SCENES = [...S.SCENES, (stage) => buildEndcard(stage, { start: DURATION - ENDCARD_LEN, cta: CTA }), cardFrame({ start: 0, end: DURATION - ENDCARD_LEN }), cardCuts(CUTS)]
export const CUES = [...S.CUES, ...cardCutCues(CUTS), ...endcardCues(DURATION - ENDCARD_LEN)]
