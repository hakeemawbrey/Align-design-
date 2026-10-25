// htxlatenight (15 s vertical Align ad): "2 AM taco run. Alone. Again." → "Tonight's deck is already dealt." (card backs
// fan across the night sky, one glows) → "Next run's for two." → shared end card ("come" + the Align logo, fade to black).
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import * as F from './film.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
export const DURATION = 15
// card-motif cuts, just before each beat's headline: taco run → the deck in the sky → "Next run's for two."
const CUTS = [{ t: 3.56, kind: 'flip' }, { t: 7.64, kind: 'deal', from: 'right' }]
export const SCENES = [...F.SCENES, (stage) => buildEndcard(stage, { start: DURATION - ENDCARD_LEN }),
  cardFrame({ start: 0, end: DURATION - ENDCARD_LEN }), cardCuts(CUTS)]
export const CUES = [...F.CUES, ...cardCutCues(CUTS), ...endcardCues(DURATION - ENDCARD_LEN)]
