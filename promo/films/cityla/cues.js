// cityla score — pop, E, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// Sections follow the picture: the drop lands on the "1 MORE FILTER" flash (2.82), it breaks down as the aura veil
// washes the photo (3.93), lifts as the ring light becomes the chart (6.05), and the outro is the end card (10.6).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'cityla', duration: DURATION, music: { style: 'pop', key: 'E', seed: 67, sections: { drop: 2.82, breakdown: 3.93, lift: 6.05, outroAt: DURATION - 4.4 } }, cues: CUES }
