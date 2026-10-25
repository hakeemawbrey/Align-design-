// htxeta (15 s vertical Align ad): "10 minutes away." → "5 min" → "almost there!" → "parking" → "ok 10 more min" →
// "Houston minutes." → "Make the wait worth it." (a real talk card flips in on a phone) → "Talk like you mean it." →
// shared end card ("come" + the Align logo, fade to black).
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import * as F from './film.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
export const DURATION = 15
// card-motif cuts, just before each beat's headline: thread → "Houston minutes." → the phone → "Talk like you mean it."
// (no flip kind near 6.6: the film flips its own talk card there)
const CUTS = [{ t: 3.8, kind: 'shuffle' }, { t: 5.79, kind: 'deal' }, { t: 8.44, kind: 'fan' }]
export const SCENES = [...F.SCENES, (stage) => buildEndcard(stage, { start: DURATION - ENDCARD_LEN }),
  cardFrame({ start: 0, end: DURATION - ENDCARD_LEN }), cardCuts(CUTS)]
export const CUES = [...F.CUES, ...cardCutCues(CUTS), ...endcardCues(DURATION - ENDCARD_LEN)]
