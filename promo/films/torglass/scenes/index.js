// torglass · "A city of glass towers… everyone in their own box." (30 s vertical Align ad). Story 0–25.6 (story.js), then the shared END CARD.
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import * as S from './story.js'
export const DURATION = 30
export const CTA = 'JOIN THE WAITLIST'
const END = DURATION - ENDCARD_LEN          // 25.6
// card-motif cuts, each where one beat has cleared and the next is about to pop in:
//   3.32  "A city of glass towers…" out (3.25), pushing into the facade → "…everyone in their own box." (3.4)
//   7.22  "box" / "Swipe. Sigh. Repeat." out (7.2) → "Tonight's deck floats window to window." (7.3)
//   10.22 the notes have landed, type out (10.2) → the gold windows / "Two windows. One line." (10.3)
//   14.72 type and charts out (14.65), the facade sinking → "Card first. Face last." (14.8)
//   19.8  the card out (19.75) → the skyline rises, "Come out of your box." (19.88) · the end card flips in at 25.6
const CUTS = [{ t: 3.32, kind: 'flip' }, { t: 7.22, kind: 'deal' }, { t: 10.22, kind: 'flip' }, { t: 14.72, kind: 'shuffle' }, { t: 19.8, kind: 'flip', dir: -1 }]
export const SCENES = [...S.SCENES, (stage) => buildEndcard(stage, { start: END, cta: CTA }), cardFrame({ start: 0, end: END }), cardCuts(CUTS)]
export const CUES = [...S.CUES, ...cardCutCues(CUTS), ...endcardCues(END)]
