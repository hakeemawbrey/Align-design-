// srmoonphases score — pop, E, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// The groove drops on NEW MOON (2.82), lifts on FULL MOON (7.27); the tonic lands under the end card (15.6).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'srmoonphases', duration: DURATION, music: { style: 'pop', key: 'E', seed: 143, sections: { drop: 2.822, lift: 7.267, outroAt: DURATION - 4.4 } }, cues: CUES }
