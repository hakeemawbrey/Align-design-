// srvotenext score — dreamy, C, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// Sections follow the picture: the drop lands on "first." as the star flares on the spire (2.27), it breaks down as the
// skyline sinks and the cards deal (4.49), lifts as the cards start flipping and the star's eyes chase them (5.88),
// hits on the "?" stamp (9.49) and "next." (11.16); outro = the end card (15.6).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'srvotenext', duration: DURATION, music: { style: 'dreamy', key: 'C', seed: 271, sections: { drop: 2.267, breakdown: 4.489, lift: 5.878, outroAt: DURATION - 4.4 }, hits: [9.489, 11.156] }, cues: CUES }
