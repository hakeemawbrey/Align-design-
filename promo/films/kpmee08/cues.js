// kpmee08 score: screwed, C#m (style engine in promo/scripts/teaser-sound.mjs). Hard cut at 27.
//   drop 2.6: the chat · breakdown 6.5: the decoder · lift 15.5: the true reply · hit 25.3.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kpmee08', duration: DURATION, music: { style: 'screwed', key: 'C#m', seed: 3108, sections: { drop: 2.6, breakdown: [6.5], lift: [15.5], outroAt: DURATION - 0.8 }, hits: [25.3] }, cues: CUES }
