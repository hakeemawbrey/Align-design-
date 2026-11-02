// mlfight score: cinematic, F (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 10.0: Act 1 (the perfect night) · hit 43.9: "was that… the good bread?" (the zoom) · hit 59.6: opposite ends
//   breakdown 70.0: THE STARS ADVISE (the soft bed) · lift 90.0: Act 3 · hit 102.95: the reading lands on ALIGN · outro.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'mlfight', duration: DURATION, music: { style: 'cinematic', key: 'F', seed: 404, sections: { drop: 10.0, breakdown: [70.0], lift: [90.0], outroAt: DURATION - 4.4 }, hits: [43.9, 59.6, 102.95] }, cues: CUES }
