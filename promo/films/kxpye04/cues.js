// kxpye04 score: pop, E (style engine in promo/scripts/teaser-sound.mjs). No end card: the music runs to the end (hard cut).
//   drop 4.0: chapter 1 · breakdown 70.0: the last chapter · lift 83.2: the goodbye.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kxpye04', duration: DURATION, music: { style: 'pop', key: 'E', seed: 4314, sections: { drop: 4.0, breakdown: [70.0], lift: [83.2], outroAt: DURATION - 0.5 } }, cues: CUES }
