// htxeta (15 s vertical Align ad): "10 minutes away." → "5 min" → "almost there!" → "parking" → "ok 10 more min" →
// "Houston minutes." → "Make the wait worth it." (a real talk card flips in on a phone) → "Talk like you mean it." →
// shared end card ("come" + the Align logo, fade to black).
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import * as F from './film.js'
export const DURATION = 15
export const SCENES = [...F.SCENES, (stage) => buildEndcard(stage, { start: DURATION - ENDCARD_LEN })]
export const CUES = [...F.CUES, ...endcardCues(DURATION - ENDCARD_LEN)]
