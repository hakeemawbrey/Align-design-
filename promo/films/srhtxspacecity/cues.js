// srhtxspacecity score — chiptune, G minor, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// Square leads + arps under the skyline; the drop lands just after the rocket clears the tower (2.82); a breakdown under
// "Earth-bound?" and the swipe rain (5.04); the lift lands as the two wheels lock (11.71); sub hits on the first liftoff
// (1.71) and the second, after Pisces' early "LIFTOFF!!" (22.82); the tonic rings out under the end card (25.6).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'srhtxspacecity', duration: DURATION, music: { style: 'chiptune', key: 'Gm', seed: 18101, sections: { drop: 2.822, breakdown: 5.044, lift: 11.711, outroAt: DURATION - 4.4 }, hits: [1.711, 22.822] }, cues: CUES }
