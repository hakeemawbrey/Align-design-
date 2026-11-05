// ktte24 score: pop, D (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop on the first smash · breakdowns at the semis and the final · lift on the sudden-death winner · lands under the last line.
import { DURATION, CUES, CHAPTERS, LIFT } from './scenes/index.js'
export default { id: 'ktte24', duration: DURATION, music: { style: 'pop', key: 'D', seed: 2924, sections: { drop: 0.12, breakdown: [CHAPTERS[1], CHAPTERS[2]], lift: [LIFT], outroAt: DURATION - 2.2 }, hits: [LIFT] }, cues: CUES }
