// htxsprawl · "Houston is huge." (30 s vertical Align ad). Story 0–25.6 (film.js), then the shared END CARD.
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { build, CUES as FILM_CUES } from './film.js'
export const DURATION = 30
export const CUES = [...FILM_CUES, ...endcardCues(DURATION - ENDCARD_LEN)]
export const SCENES = [
  build,
  (stage) => buildEndcard(stage, { start: DURATION - ENDCARD_LEN }),
]
