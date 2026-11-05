// kpvee12 score: dreamy, E (style engine in promo/scripts/teaser-sound.mjs). Hard cut at 28.2.
//   drop 0.35: Venus surfs in · breakdown 2.9: the record scratch · lift 14.2: "Dear me," · hits 21.0 (seal), 25.8.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kpvee12', duration: DURATION, music: { style: 'dreamy', key: 'E', seed: 4112, sections: { drop: 0.35, breakdown: [2.9], lift: [14.2], outroAt: DURATION - 0.6 }, hits: [21.0, 25.8] }, cues: CUES }
