// htxsprawl · "Houston is huge." (30 s vertical Align ad). Story 0–25.6 (film.js), then the shared END CARD.
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { build, CUES as FILM_CUES } from './film.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
// card-motif cuts: the drop's zoom-out (2.86) and just before each later headline: search → sky → lines up → somewhere
const CUTS = [{ t: 2.86, kind: 'flip' }, { t: 5.14, kind: 'deal' }, { t: 11.08, kind: 'fan' }, { t: 15.4, kind: 'shuffle' }, { t: 20.95, kind: 'flip', dir: -1 }]
export const DURATION = 30
export const CUES = [...FILM_CUES, ...cardCutCues(CUTS), ...endcardCues(DURATION - ENDCARD_LEN)]
export const SCENES = [
  build,
  (stage) => buildEndcard(stage, { start: DURATION - ENDCARD_LEN }),
  cardFrame({ start: 0, end: DURATION - ENDCARD_LEN }),
  cardCuts(CUTS),
]
