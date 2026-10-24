// htxtraffic (15 s vertical Align ad): "An hour on the Katy Freeway… for a date who just says 'hey'." → dealbreakers up
// front + a real talk card → "Know before you drive." → shared end card ("come Align." + logo, fade to black).
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import * as F from './film.js'
export const DURATION = 15
export const SCENES = [...F.SCENES, (stage) => buildEndcard(stage, { start: DURATION - ENDCARD_LEN })]
export const CUES = [...F.CUES, ...endcardCues(DURATION - ENDCARD_LEN)]
