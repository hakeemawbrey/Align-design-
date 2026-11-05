// kxpye06 score: cinematic, Eb (style engine in promo/scripts/teaser-sound.mjs). No end card: the music runs to the end (hard cut).
//   drop 4.0: chapter 1 · breakdown 70.0: the last chapter · lift 83.2: the goodbye.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kxpye06', duration: DURATION, music: { style: 'cinematic', key: 'Eb', seed: 4316, sections: { drop: 4.0, breakdown: [70.0], lift: [83.2], outroAt: DURATION - 0.5 } }, cues: CUES }
