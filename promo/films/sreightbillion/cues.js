// sreightbillion score — screwed, F, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// The drop lands on the turn (12.27): out past the Earth, into the sky, "Someone's sky lines up with yours."
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'sreightbillion', duration: DURATION, music: { style: 'screwed', key: 'F', seed: 808, sections: { drop: 12.27, outroAt: DURATION - 4.4 } }, cues: CUES }
