// srtorpatio score — house, F, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// The groove drops on the winter → patio flip (2.822), breaks down when the date says "k." and runs (5.3), lifts on the
// first dealbreaker stamp (10.322), hits on the clink (14.0); the outro is the end card (15.6).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'srtorpatio', duration: DURATION, music: { style: 'house', key: 'F', seed: 128, sections: { drop: 2.822, breakdown: 5.3, lift: 10.322, outroAt: DURATION - 4.4 }, hits: [14.0] }, cues: CUES }
