// htxeta score — chiptune, G, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// The groove drops as the second "on my way" text lands (0.93); it thins out for "Houston minutes." (3.93); the full band
// lifts as the phone rises and the talk card flips in (5.72), and lands under the end card (10.6).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'htxeta', duration: DURATION, music: { style: 'chiptune', key: 'G', seed: 63, sections: { drop: 0.93, breakdown: 3.93, lift: 5.72, outroAt: DURATION - 4.4 } }, cues: CUES }
