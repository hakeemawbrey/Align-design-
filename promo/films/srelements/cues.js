// srelements score — cinematic, G, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// The groove drops on FIRE (2.82); the tonic lands under the end card (15.6).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'srelements', duration: DURATION, music: { style: 'cinematic', key: 'G', seed: 141, sections: { drop: 2.822, outroAt: DURATION - 4.4 } }, cues: CUES }
