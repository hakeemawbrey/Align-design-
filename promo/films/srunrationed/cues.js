// srunrationed score — chiptune, C, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// The drop lands on the break (8.93): the padlock pops, the paywall shatters into stars.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'srunrationed', duration: DURATION, music: { style: 'chiptune', key: 'C', seed: 412, sections: { drop: 8.93, outroAt: DURATION - 4.4 } }, cues: CUES }
