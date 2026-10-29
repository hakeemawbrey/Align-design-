// st8wedding score — cinematic, F (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 5.4: the rooftop · breakdown 12.3: the vows · lift 25.0: married · lift 45.0: the last shot · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'st8wedding', duration: DURATION, music: { style: 'cinematic', key: 'F', seed: 8255, sections: { drop: 5.4, breakdown: 12.3, lift: 25.0, outroAt: DURATION - 4.4 } }, cues: CUES }
