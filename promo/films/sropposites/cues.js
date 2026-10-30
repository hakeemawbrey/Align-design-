// sropposites score — chiptune, E♭, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// The chip groove drops with the first seesaw slam (1.71); it thins to arps + bass while the referee star flips the coin
// (6.71) and kicks back as ♉/♏ split out of it (10.04); the outro lands under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'sropposites', duration: DURATION, music: { style: 'chiptune', key: 'Eb', seed: 151, sections: { drop: 1.71, breakdown: 6.71, lift: 10.04, outroAt: DURATION - 4.4 } }, cues: CUES }
