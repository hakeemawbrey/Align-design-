// htxheat score — funk, Bm, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// Sections follow the picture: the groove drops under the walk to the car (0.6), breaks down as the sun sets on the
// bad date (3.38), lifts on the first dealbreaker stamp (5.88), and the outro is the end card (10.6).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'htxheat', duration: DURATION, music: { style: 'funk', key: 'Bm', seed: 73, sections: { drop: 0.6, breakdown: 3.38, lift: 5.878, outroAt: DURATION - 4.4 } }, cues: CUES }
