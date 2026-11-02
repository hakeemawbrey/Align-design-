// mlfirst score — house, G, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.0: the cold open · hit 63.9: "I love… yogurt." · breakdown 70.0: THE STARS ADVISE (softer bed)
//   lift 90.0: Act 3 on the bench · hit 96.5: the sparkle fireworks · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'mlfirst', duration: DURATION, music: { style: 'house', key: 'G', seed: 909, sections: { drop: 2.0, breakdown: [70.0], lift: [90.0], outroAt: DURATION - 4.4 }, hits: [63.9, 96.5] }, cues: CUES }
