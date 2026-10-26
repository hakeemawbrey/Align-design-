// torpatio score — house, G, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// Sections follow the picture: the groove drops on the winter → patio flip (1.711), breaks down for the bad date (3.38),
// lifts on the first dealbreaker stamp (6.156), and the outro is the end card (10.6).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'torpatio', duration: DURATION, music: { style: 'house', key: 'G', seed: 81, sections: { drop: 1.711, breakdown: 3.38, lift: 6.156, outroAt: DURATION - 4.4 } }, cues: CUES }
