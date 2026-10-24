// htxrodeo score — funk, A, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// Sections follow the picture: the groove drops with the first hat (0.6), breaks down as the hats fly off (3.93),
// lifts as the mystery card lands (5.6), and the outro is the end card (10.6).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'htxrodeo', duration: DURATION, music: { style: 'funk', key: 'A', seed: 8, sections: { drop: 0.6, breakdown: 3.93, lift: 5.6, outroAt: DURATION - 4.4 } }, cues: CUES }
