// srpattern score — house, A, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// The drop lands on the turn (12.27): "What if you saw it coming?" and the Push / Pull / Align reading.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'srpattern', duration: DURATION, music: { style: 'house', key: 'A', seed: 233, sections: { drop: 12.27, outroAt: DURATION - 4.4 } }, cues: CUES }
