// htxbingo (30 s vertical Align ad): "Houston first-date bingo." — a 3×3 card fills up on the beat, BINGO! …again.
// → "Align skips the bingo.": talk cards, dealbreakers first, chart first / face last → "Get a real first date."
// → shared end card ("come" + the Align logo, fade to black).
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import * as F from './film.js'
export const DURATION = 30
const END = DURATION - ENDCARD_LEN          // 25.6
// card-motif cuts: each lands where one beat has cleared and the next is about to pop in
//   10.64 hook line + "…again." stack out (10.45) → "Align skips the bingo." (10.7)
//   13.14 the squares have flown off (12.95) → "Talk cards, not small talk." (13.3) / the small-talk tile (13.2)
//   16.44 the talk card out (16.2) → "Dealbreakers come first." (16.5)
//   19.74 the dealbreakers card out (19.5) → "Chart first. Face last." (19.8)
//   22.54 the mystery card out (22.3) → "Get a real first date." (22.6)  · the end card does its own card flip at 25.6
const CUTS = [{ t: 10.64, kind: 'fan' }, { t: 13.14, kind: 'shuffle' }, { t: 16.44, kind: 'deal' }, { t: 19.74, kind: 'flip' }, { t: 22.54, kind: 'fan', dir: -1 }]
export const SCENES = [...F.SCENES, (stage) => buildEndcard(stage, { start: END }), cardFrame({ start: 0, end: END }), cardCuts(CUTS)]
export const CUES = [...F.CUES, ...cardCutCues(CUTS), ...endcardCues(END)]
