// stfairytale score — dreamy, Ab, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs). A storybook.
//   hit 0.6: the book opens · drop 4.489: chapter one, the ball · breakdown 28.378: meanwhile, in sweatpants
//   lift 37.267: someone loved this version · breakdown 45.6: LESSON UNLOCKED · lift 50.044: card first → after-hours · outro.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'stfairytale', duration: DURATION, music: { style: 'dreamy', key: 'Ab', seed: 131, sections: { drop: 4.489, breakdown: [28.378, 45.6], lift: [37.267, 50.044], outroAt: DURATION - 4.4 }, hits: [0.6, 42.3] }, cues: CUES }
