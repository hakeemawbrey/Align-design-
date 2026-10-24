// citydallas score — chiptune, A, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// The groove drops as the giant star rises on "big expectations" (2.82); it thins to a breakdown as the truck peels off
// and "Meet someone who meets them" lands (4.05), and lifts as the two charts lock round the star (5.60); end card at 10.6.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'citydallas', duration: DURATION, music: { style: 'chiptune', key: 'A', seed: 107, sections: { drop: 2.822, breakdown: 4.05, lift: 5.6, outroAt: DURATION - 4.4 } }, cues: CUES }
