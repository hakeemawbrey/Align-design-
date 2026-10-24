// htxbrunch (30 s vertical Align ad): "Another Midtown brunch with someone who's 'just seeing where it goes.'" → the big
// questions show up late → on Align, dealbreakers come first + the Push/Pull/Align reading → "Brunch with intention."
// → shared end card ("come" + the Align logo, fade to black).
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import * as F from './film.js'
export const DURATION = 30
export const SCENES = [...F.SCENES, (stage) => buildEndcard(stage, { start: DURATION - ENDCARD_LEN })]
export const CUES = [...F.CUES, ...endcardCues(DURATION - ENDCARD_LEN)]
