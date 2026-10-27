// stair score — pop, B, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.82: the box opens (Gemini's "add a joke.") · breakdown 11.6: THE STARS · lift 14.65: "Say it plainly." · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'stair', duration: DURATION, music: { style: 'pop', key: 'B', seed: 241, sections: { drop: 2.82, breakdown: 11.6, lift: 14.65, outroAt: DURATION - 4.4 } }, cues: CUES }
