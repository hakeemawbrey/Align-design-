// htxlatenight (15 s vertical Align ad): "2 AM taco run. Alone. Again." → "Tonight's deck is already dealt." (card backs
// fan across the night sky, one glows) → "Next run's for two." → shared end card ("come" + the Align logo, fade to black).
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import * as F from './film.js'
export const DURATION = 15
export const SCENES = [...F.SCENES, (stage) => buildEndcard(stage, { start: DURATION - ENDCARD_LEN })]
export const CUES = [...F.CUES, ...endcardCues(DURATION - ENDCARD_LEN)]
