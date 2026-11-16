// og-srcitynyc: social rework of srcitynyc (story in film.js). Static HOOK (box) from frame 0 replaces the animated title +
// eyebrows; the skyline is up at frame 0; the set is lifted 230 px (ground filled below) so the box sits in the safe zone;
// the guide star sits under each headline; crazier lines; the film ends on the new pink windows.
// srcitynyc · "Millions of people in New York…" (Star Talk Remix of citynyc, 30 s vertical). Story 0–25.6 (film.js), then the
// shared END CARD (cta JOIN THE WAITLIST, as the original).
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { build, CUES as FILM_CUES, T } from './film.js'
export { T }
export const DURATION = 30
export const HOOK = 'Millions of people. | The *same five.*'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 3.5
const END = DURATION - ENDCARD_LEN          // 25.6
// card-motif candidate cuts (cardfx keeps 5.54 + 17.95):
//   2.78  on the drop: the skyline is up → the elevated train whooshes in (2.82)
//   5.54  box A shut (4.6), hook line out (5.3) → "…and the apps keep showing you the same five." (5.6)
//   12.17 "same five" out (11.85) → "Tonight's deck" (12.27) (the box stays open across it)
//   17.95 box B shut (17.75), deck line out (17.7) → the centre card lifts and flips / "Card first." (18.38)
//   22.20 box D shut (21.8), "Card first" out (22.05) → "Meet someone actually new." (22.27)
const CUTS = [{ t: 2.78, kind: 'shuffle' }, { t: 5.54, kind: 'flip' }, { t: 12.17, kind: 'deal' }, { t: 17.95, kind: 'flip', dir: -1 }, { t: 22.2, kind: 'flip' }]
export const CUES = [...FILM_CUES, ...cardCutCues(CUTS), ...endcardCues(END)]
export const SCENES = [
  build,
  (stage) => buildEndcard(stage, { start: END, cta: 'JOIN THE WAITLIST' }),
  cardFrame({ start: 0, end: END }),
  cardCuts(CUTS),
]
