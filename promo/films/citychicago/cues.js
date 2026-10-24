// citychicago score — jazzy, F, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// The groove drops as "cuffing season" lands (0.6); it thins to a breakdown as the turn starts and the charts spin in (3.38),
// and lifts with the full band when the gold line links the two charts and the snow turns to sparkles (5.6); end card at 10.6.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'citychicago', duration: DURATION, music: { style: 'jazzy', key: 'F', seed: 117, sections: { drop: 0.6, breakdown: 3.38, lift: 5.6, outroAt: DURATION - 4.4 } }, cues: CUES }
