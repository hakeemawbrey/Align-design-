// htxbrunch (30 s vertical Align ad): "Another Midtown brunch with someone who's 'just seeing where it goes.'" → the big
// questions show up late → on Align, dealbreakers come first + the Push/Pull/Align reading → "Brunch with intention."
// → shared end card ("come" + the Align logo, fade to black).
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import * as F from './film.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
export const DURATION = 30
// card-motif cuts, just before each beat's headline: hook → late questions → dealbreakers → Push/Pull/Align → "Brunch with intention."
const CUTS = [{ t: 4.79, kind: 'flip' }, { t: 11.34, kind: 'deal' }, { t: 17.99, kind: 'fan' }, { t: 22.44, kind: 'shuffle' }]
export const SCENES = [...F.SCENES, (stage) => buildEndcard(stage, { start: DURATION - ENDCARD_LEN }),
  cardFrame({ start: 0, end: DURATION - ENDCARD_LEN }), cardCuts(CUTS)]
export const CUES = [...F.CUES, ...cardCutCues(CUTS), ...endcardCues(DURATION - ENDCARD_LEN)]
