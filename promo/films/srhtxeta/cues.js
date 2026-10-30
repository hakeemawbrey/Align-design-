// srhtxeta score — pop, D minor, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// The groove drops as "ok 10 more min" lands (3.378); it thins out while the star dozes through "Houston minutes" (5.45);
// the full band lifts as the phone rises and the talk card flips (9.5); the end card lands at 15.6.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'srhtxeta', duration: DURATION, music: { style: 'pop', key: 'Dm', seed: 21101, sections: { drop: 3.378, breakdown: 5.45, lift: 9.489, outroAt: DURATION - 4.4 } }, cues: CUES }
