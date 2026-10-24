// htxstars (45 s vertical): "In Houston, you can barely see the stars." → Hakeem's chart → the feature tour → "Look up." → END CARD.
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import * as S from './story.js'
export const DURATION = 45
export const SCENES = [...S.SCENES, (stage) => buildEndcard(stage, { start: DURATION - ENDCARD_LEN })]
export const CUES = [...S.CUES, ...endcardCues(DURATION - ENDCARD_LEN)]
