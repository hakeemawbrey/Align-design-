// sxfriendhype score — house, F, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.16: the door bursts, Leo cannonballs in · breakdown 18.93: the curtains open (the awards) · lift 20.6: "YOU!" and
//   the trophy · breakdown 27.82: "it was… fine." (the quiet) · lift 29.49: the snack bowl pops up · crash hit at the
//   LESSON (32.83) · outro under the end card.
import { DURATION, CUES, T, BEAT, KEY } from './scenes/index.js'
export default { id: 'sxfriendhype', duration: DURATION, music: { style: 'house', key: KEY, seed: 311, sections: { drop: T.burst, breakdown: [BEAT(33), BEAT(49)], lift: [T.you2, T.snack], outroAt: DURATION - 4.4 }, hits: [T.lesson] }, cues: CUES }
