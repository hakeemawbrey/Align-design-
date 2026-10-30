// sr07aura score — pop, Dm, 108 bpm grid (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.27: the first flash · lift 10.6: "your aura says what your bio won't." · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'sr07aura', duration: DURATION, music: { style: 'pop', key: 'Dm', seed: 707, sections: { drop: 2.267, lift: 10.6, outroAt: DURATION - 4.4 } }, cues: CUES }
