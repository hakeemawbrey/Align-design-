// htxbingo (30 s vertical Align ad): "Houston first-date bingo." — a 3×3 card fills up on the beat, BINGO! …again.
// → "Align skips the bingo.": talk cards, dealbreakers first, chart first / face last → "Get a real first date."
// → shared end card ("come" + the Align logo, fade to black).
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import * as F from './film.js'
export const DURATION = 30
export const SCENES = [...F.SCENES, (stage) => buildEndcard(stage, { start: DURATION - ENDCARD_LEN })]
export const CUES = [...F.CUES, ...endcardCues(DURATION - ENDCARD_LEN)]
