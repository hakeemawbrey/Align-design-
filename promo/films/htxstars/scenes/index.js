// htxstars (45 s vertical): "In Houston, you can barely see the stars." → Hakeem's chart → the feature tour → "Look up." → END CARD.
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import * as S from './story.js'
export const DURATION = 45
const END = DURATION - ENDCARD_LEN
// card-motif cuts, ~0.07 s before each beat's first headline (the old beat's type is out by then):
//   5.82 haze hook out (5.7) → "We'll show you yours." (5.9)    · 10.68 chart head out (10.65) → "Your chart says more…" (10.75)
//  15.53 selfie + chart + city out (15.5) → 01 mystery card (15.6) · 20.53 / 25.53 / 30.53 → features 02 / 03 / 04
//  35.48 the reading out (35.35) → skyline rises, "The stars are still up there." (35.6) · end card flips at 40.6
const F = S.T.feat
const CUTS = [
  { t: 5.82, kind: 'flip' }, { t: 10.68, kind: 'shuffle' }, { t: F[0] - 0.07, kind: 'fan' }, { t: F[1] - 0.07, kind: 'flip', dir: -1 },
  { t: F[2] - 0.07, kind: 'shuffle' }, { t: F[3] - 0.07, kind: 'fan', dir: -1 }, { t: 35.48, kind: 'flip' },
].map(c => ({ ...c, t: +c.t.toFixed(3) }))
export const SCENES = [...S.SCENES, (stage) => buildEndcard(stage, { start: END }), cardFrame({ start: 0, end: END }), cardCuts(CUTS)]
export const CUES = [...S.CUES, ...cardCutCues(CUTS), ...endcardCues(END)]
