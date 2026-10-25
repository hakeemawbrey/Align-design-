// htxonesky · "Every culture. Every language. One city." (30 s vertical Align ad). Story 0–25.6 (film.js), then the shared END CARD.
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { build, CUES as FILM_CUES } from './film.js'
export const DURATION = 30
const END = DURATION - ENDCARD_LEN          // 25.6
// card-motif cuts: each lands where one beat has cleared and the next is about to pop in
//   2.55  into the drop: "One city." (2.62/2.82) as the skyline springs up and the back row joins
//   6.38  hook line out (6.2) → "And one sky over all of it." (6.45)
//   11.44 the dome clears (11.35) → "Everyone has their own chart." (11.5)
//   15.06 "Everyone has their own chart." leaving (15.0) → "Align matches you by the stars…" (15.2)
//   20.18 "born under." out (20.0) → "Your person is under the same sky." (20.25) as the crowd sinks
//   (the end card does its own card flip at 25.6)
const CUTS = [{ t: 2.55, kind: 'deal' }, { t: 6.38, kind: 'fan' }, { t: 11.44, kind: 'flip' }, { t: 15.06, kind: 'shuffle' }, { t: 20.18, kind: 'fan', dir: -1 }]
export const CUES = [...FILM_CUES, ...cardCutCues(CUTS), ...endcardCues(END)]
export const SCENES = [
  build,
  (stage) => buildEndcard(stage, { start: END }),
  cardFrame({ start: 0, end: END }),
  cardCuts(CUTS),
]
