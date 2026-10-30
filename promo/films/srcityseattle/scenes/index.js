// srcityseattle · "Seattle: you never see the stars" (Star Talk Remix of cityseattle, 30 s vertical, music: lofi, E).
// Story 0–25.6 (story.js), then the shared END CARD (cta VOTE FOR YOUR CITY, as the original).
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import * as S from './story.js'
export const DURATION = 30
export const CTA = 'VOTE FOR YOUR CITY'
export const T = S.T
// card-motif cuts, each just before the next headline pops (old type already out); the default selection keeps 6.53 + 19.42:
//   3.33 "Seattle: cloudy, rainy…" out → "You can never see the stars." · 6.53 "nope." out → "We'll show you yours."
//   12.52 chart labels out → "Then we find who lines up." · 19.42 charts out → the mystery card, "Card first. Face last."
//   22.62 type out, city rising → "The stars are still up there." · the end card flips in at 25.6
const CUTS = [{ t: 3.33, kind: 'flip' }, { t: 6.53, kind: 'fan' }, { t: 12.52, kind: 'deal' }, { t: 19.42, kind: 'shuffle' }, { t: 22.62, kind: 'flip', dir: -1 }]
export const SCENES = [...S.SCENES, (stage) => buildEndcard(stage, { start: DURATION - ENDCARD_LEN, cta: CTA }), cardFrame({ start: 0, end: DURATION - ENDCARD_LEN }), cardCuts(CUTS)]
export const CUES = [...S.CUES, ...cardCutCues(CUTS), ...endcardCues(DURATION - ENDCARD_LEN)]
