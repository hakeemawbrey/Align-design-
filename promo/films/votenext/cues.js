// votenext score — pop, A, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// Sections follow the picture: the drop lands on "first." as the star flares over Houston (2.27), it breaks down as the
// skyline sinks and the cards deal (3.12), lifts as the cards start flipping to cities (4.21), outro = the end card (10.6).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'votenext', duration: DURATION, music: { style: 'pop', key: 'A', seed: 89, sections: { drop: 2.267, breakdown: 3.12, lift: 4.211, outroAt: DURATION - 4.4 } }, cues: CUES }
