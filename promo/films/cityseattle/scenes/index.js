// cityseattle · "Seattle: cloudy, rainy… you can never see the stars." (30 s vertical Align ad). Story 0–25.6 (story.js), then the shared END CARD.
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import * as S from './story.js'
export const DURATION = 30
export const CTA = 'VOTE FOR YOUR CITY'
export const CUES = [...S.CUES, ...endcardCues(DURATION - ENDCARD_LEN)]
export const SCENES = [...S.SCENES, (stage) => buildEndcard(stage, { start: DURATION - ENDCARD_LEN, cta: CTA })]
