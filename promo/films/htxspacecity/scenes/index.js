// htxspacecity · "They call it Space City." (30 s vertical Align ad). Story 0–25.6 (film.js), then the shared END CARD.
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { build, CUES as FILM_CUES } from './film.js'
export const DURATION = 30
const END = DURATION - ENDCARD_LEN
// card-motif cuts at the four beat changes (the story has five beats), ~0.08 s before each new headline:
//   4.64 skyline sunk + rocket gone (4.75) → "…so… Earth-bound?" (4.72)
//   9.97 umbrella person + swipe rain out (9.82) → "Align matches you by your birth chart." (10.05)
//  16.32 wheels + lines out (16.22) → "Tonight's deck: dealt from the stars." (16.4)
//  21.68 deck fan flown off (21.62) → "Mission: find your person." countdown + skyline (21.75) · end card flips at 25.6
const CUTS = [{ t: 4.64, kind: 'flip' }, { t: 9.97, kind: 'shuffle' }, { t: 16.32, kind: 'fan' }, { t: 21.68, kind: 'flip', dir: -1 }]
export const CUES = [...FILM_CUES, ...cardCutCues(CUTS), ...endcardCues(END)]
export const SCENES = [
  build,
  (stage) => buildEndcard(stage, { start: END }),
  cardFrame({ start: 0, end: END }),
  cardCuts(CUTS),
]
