// voteballot score — house, E, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// Sections follow the picture: the groove drops as the ballot slams down (0.6), breaks down as the stars rise (4.42),
// lifts as the mystery card lands (7.27), and the outro is the end card (10.6).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'voteballot', duration: DURATION, music: { style: 'house', key: 'E', seed: 109, sections: { drop: 0.6, breakdown: 4.42, lift: 7.27, outroAt: DURATION - 4.4 } }, cues: CUES }
