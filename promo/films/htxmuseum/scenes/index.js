// htxmuseum (30 s vertical Align ad): "Classic Houston first date: the Museum District." → "…and you're still guessing
// who they are." → on Align you see who they are first (the mystery card hangs in a gallery frame; Sun/Moon/Rising and
// dealbreaker placards; a talk card) → "Skip the guessing." → shared end card ("come" + the Align logo).
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import * as F from './film.js'
export const DURATION = 30
export const SCENES = [...F.SCENES, (stage) => buildEndcard(stage, { start: DURATION - ENDCARD_LEN })]
export const CUES = [...F.CUES, ...endcardCues(DURATION - ENDCARD_LEN)]
