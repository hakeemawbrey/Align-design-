// sr04chartcard score — chiptune, Bb (arranged by the style engine in promo/scripts/teaser-sound.mjs). The drop is the card flip.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'sr04chartcard', duration: DURATION, music: { style: 'chiptune', key: 'Bb', seed: 404, sections: { drop: 5.6, outroAt: DURATION - 4.4 } }, cues: CUES }
