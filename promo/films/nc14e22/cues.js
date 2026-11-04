// nc14e22 score: screwed, Fm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 6.0: slow on purpose · breakdown 9.6: the snowflake stop · lift 13.4: THE STARS · hit 19.6: "it's a date." · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'nc14e22', duration: DURATION, music: { style: 'screwed', key: 'Fm', seed: 1422, sections: { drop: 6.0, breakdown: [9.6], lift: [13.4], outroAt: DURATION - 4.4 }, hits: [19.6] }, cues: CUES }
