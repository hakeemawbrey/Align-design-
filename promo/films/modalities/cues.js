// modalities score — house, F major, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// Marimba + shaker under the hook; four-on-the-floor drops with CARDINAL (2.82); organ stabs lift in with MUTABLE
// (8.93); the final chord lands with all three icons firing (13.38).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'modalities', duration: DURATION, music: { style: 'house', key: 'F', seed: 41, sections: { drop: 2.82, lift: 8.93, outroAt: 13.38 } }, cues: CUES }
