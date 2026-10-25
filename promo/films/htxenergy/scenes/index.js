// htxenergy · "They call Houston the energy capital." (30 s vertical Align ad). Story 0–25.6 (film.js), then the shared END CARD.
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { build, CUES as FILM_CUES } from './film.js'
export const DURATION = 30
const END = DURATION - ENDCARD_LEN          // 25.6
// card-motif cuts: each lands where one beat has cleared and the next is about to pop in
//   2.78  on the drop: the skyline is up → the surge blazes up every line (2.82)
//   5.55  the city sinks away (hook line out 5.4) → "But the energy that matters…" (5.62)
//   11.12 the arc fizzled, the pair leaves (10.95) → "When your planets line up…" (11.2) as they beam up into charts
//   17.64 "Sparks fly." out (17.4) → "Align reads the spark before you meet." (17.7)
//   22.50 Push/Pull/Align out (22.15) → "Find your spark." (22.6) as the charts rush together
//   (the end card does its own card flip at 25.6)
const CUTS = [{ t: 2.78, kind: 'flip' }, { t: 5.55, kind: 'deal' }, { t: 11.12, kind: 'fan' }, { t: 17.64, kind: 'shuffle' }, { t: 22.5, kind: 'flip', dir: -1 }]
export const CUES = [...FILM_CUES, ...cardCutCues(CUTS), ...endcardCues(END)]
export const SCENES = [
  build,
  (stage) => buildEndcard(stage, { start: END }),
  cardFrame({ start: 0, end: END }),
  cardCuts(CUTS),
]
